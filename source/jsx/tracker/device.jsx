import StatusGraph from "../cellstatusgraph.jsx";
import StatusIV from "../cellstatusiv.jsx";
import CellButtons from "../cellbuttons.jsx";
import Graph from 'node-jsgraph/dist/jsgraph-es6';

import { query as influxquery } from "../influx";
import React from 'react';
import { ipcRenderer } from "electron";
import { pgaValueToRange } from "../../pgasettings"

//import cfg from "./config"

const initialState = {
	unknown: true,
	display: 'eff',
	ellapsed: 0,
	ellapsedUnit: 'min.',
	changeRate: false,
	absChangeRate: false,
	changeUnit: false,
	iv: null,
	data: null,
	data_IV: null,
	iv: null,
	efficiency: false,
	start_efficiency: false,
	highest_efficiency: false,
	voltage: false,
	ff: false,
	current: false,
	voc: false,
	jsc: false,
	sun: false,
	start: false,
	current: false,
	arrowstatus: false,
	change: false,
	showDetails: false,

	serverState: {},

};

class TrackerDevice extends React.Component {
	
	/**
	 *	@param props.name The name of the cell
	 */
	constructor( props ) {
		super( props );
		console.log('create');
		this.unit = {
			"voltage": <span>V</span>,
			"currentdensity": <span>mA cm<sup>-2</sup></span>,
			"current": <span>mA</span>,
			"efficiency": <span>%</span>,
			"fillfactor": <span>%</span>,
			"sun": <span>sun</span>,
			"area": <span>cm<sup>2</sup></span>
		};

		this.state = initialState;

		this.cfg = this.cfg.bind( this );
		this.start = this.start.bind( this );
		this.stop = this.stop.bind( this );
		this.pause = this.pause.bind( this );
		this.recordIV = this.recordIV.bind( this );
		this.recordJsc = this.recordJsc.bind( this );
		this.recordVoc = this.recordVoc.bind( this );

		this.showEfficiencies = this.showEfficiencies.bind( this );
		this.showSummary = this.showSummary.bind( this );
		this.showDetails = this.showDetails.bind( this );
		this.hideDetails = this.hideDetails.bind( this );
		this.downloadData = this.downloadData.bind( this );

		this.formValidated = this.formValidated.bind( this );
		this.toggleDetails = this.toggleDetails.bind( this );
	//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};

		this._last_iv_time = 0;
		this._last_iv = null;
		this._first_iv = null;
		console.log( 'create' );
	}

	shouldComponentUpdate( props, state ) {

		console.log( props, state );
		return true;
	}
	componentWillReceiveProps( nextProps ) {

		this.setState( { updating: false, unknown: false } );
      	this.setState( { serverState: nextProps.serverState } );
  	
      	if( 
      		nextProps.serverState.tracking_mode > 0 && 
      		nextProps.measurementName && 
      		nextProps.measurementName !== this.props.measurementName ||
      		! this.state.serverState ) {
     
        	this.updateInfluxData( nextProps.serverState );
      	}
	}

	componentDidMount() {

		this.setState( { updating: false, unknown: false } );
      	this.setState( { serverState: this.props.serverState } );
  	
      	if( this.props.serverState.tracking_mode > 0 ) {
        	this.updateInfluxData( this.props.serverState );
      	}

	}

	componentWillUnmount() {

		if( this.refreshInterval ) {
			clearTimeout( this.refreshInterval );
			this.refreshInterval = true;
		}
	}

	formValidated( el ) {
	/*	
		el.tracking_mode = parseInt( el.tracking_mode );
		el.tracking_step = parseInt( el.tracking_step );
		el.tracking_fw = parseInt( el.tracking_step );
		el.tracking_interval = parseInt( el.tracking_interval );
		el.tracking_record_interval = parseInt( el.tracking_record_interval );

		el.tracking_bwfwthreshold = parseFloat( el.tracking_bwfwthreshold );
		el.tracking_fwbwthreshold = parseFloat( el.tracking_fwbwthreshold );
		el.tracking_measure_voc_interval = parseInt( el.tracking_measure_voc_interval );
		el.tracking_measure_jsc_interval = parseInt( el.tracking_measure_jsc_interval );

		el.tracking_measure_voc = +el.tracking_measure_voc;
		el.tracking_measure_jsc = +el.tracking_measure_jsc;
		

		el.cellArea = parseFloat( el.cellArea );

		el.iv_start = parseFloat( el.iv_start );
		el.iv_stop = parseFloat( el.iv_stop );
		el.iv_hysteresis = +el.iv_hysteresis;

		el.iv_interval = parseInt( el.iv_interval );
		el.iv_rate = parseFloat( el.iv_rate );
*/

		this.saveStatus( el );
	}

	saveStatus( newState ) {

	//	this.setState( { updating: true } );
		
		let body = JSON.stringify( newState );
		let headers = new Headers({
		  "Content-Type": "application/json",
		  "Content-Length": body.length.toString()
		});

		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setStatus", {

			headers: headers,
			method: 'POST',
			body: body

		} ).then( ( response ) => {

			this.getStatus();

		} ).catch( () => {

			this.setState( { unknown:true, updating: false } );
		} );
	}

	resetChannel() {


		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/resetStatus?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId , {

			method: 'GET'

		} ).then( ( response ) => {

			this.getStatus();

		} ).catch( () => {

			this.setState( { unknown:true, updating: false } );
		} );

	}

	recordIV() {

		this.setState( { updating: true } );
		let body = JSON.stringify( { instrumentId: this.props.instrumentId, chanId: this.props.chanId } );

		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/executeIV?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId ).then( ( response ) => {

			this.getStatus();

		} ).catch( () => {

			this.setState( { unkown:true, updating: false } );
		} );
	}


	recordVoc() {

		this.setState( { updating: true } );

		let body = JSON.stringify( { instrumentId: this.props.instrumentId, chanId: this.props.chanId } );

		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordVoc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId ).then( ( response ) => {

			this.getStatus();

		} ).catch( () => {

			this.setState( { unkown:true, updating: false } );
		} );
	}


	recordJsc() {

		this.setState( { updating: true } );
		let body = JSON.stringify( { instrumentId: this.props.instrumentId, chanId: this.props.chanId } );

		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordJsc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId ).then( ( response ) => {

			this.getStatus();

		} ).catch( () => {

			this.setState( { unkown:true, updating: false } );
		} );
	}

	//formChanged( name, value ) {
		
	//	this.state.tmpServerState[ name ] = value;
		//this.setState( { tmpServerState: this.state.tmpServerState } );
		//this.state.tmpServerState = Object.assign( {}, this.state.tmpServerState );
	//}

	downloadData() {

		ipcRenderer.send( "downloadData", this.state.serverState, this.props.instrumentId, this.props.chanId, this.state.serverState.measurementName );
	}


	componentDidUpdate() {
		
//		this.getStatus();

		this.scheduleRefresh();
	}

	scheduleRefresh() {

		if( this.refreshInterval ) {
			return;
		}


		this.refreshInterval = setTimeout( () => {

			this.refreshInterval = false;
			if( this.state.updating ) {
				return;
			}

			this.updateInfluxData();	

		}, this.props.refreshRate * 1000 || 10000 );
	}


	pause() {
		this.state.serverState.enable = 0;
		this.saveStatus( this.state.serverState );
	}

	start() {
		
		this.state.serverState.measurementName = this.state.serverState.cellName + "_" + Date.now();
		this.state.serverState.enable = 1;
		this.saveStatus( this.state.serverState );
	}

	stop() {
		this.state.serverState.measurementName = false;
		this.state.serverState.cellName = "";
		this.state.serverState.cellArea = 0;
		this.state.serverState.tracking_mode = 0;
		this.state.serverState.enable = 0;

		this._last_iv_time = false;
		this._last_iv = false;
		this._first_iv = false;
		this.data_sun = false;
		this.data_humidity = false;
		this.data_temperature = false;

		this.setState( initialState );
		this.resetChannel();
	}

	cfg() {
		
		ipcRenderer.once( "channelConfigured", ( event, data ) => {

			if( data.chanId !== this.state.serverState.chanId ) {
				return;
			}

			this.formValidated( data );
		});

		ipcRenderer.send( "configChannel", { 

			instrumentId: this.props.instrumentId, 
			groupName: this.props.groupName,
			chanId: this.props.chanId,

			trackerHost: this.props.config.trackerHost,
			trackerPort: this.props.config.trackerPort
		} );

	}

	getStatus() {

		this.props.updateStatus();
	}

	tooltip( message, color ) {

		return ( e ) => {
			if( message.length == 0 ) {
				this._tooltip.style.display = 'none';
			} else {

				this._tooltip.setAttribute('data-color', color );
				this._tooltip.style.display = 'block';
				this._tooltipcontent.innerHTML = message;
			}
		}
	}

	showEfficiencies() {


		if( this.wrapper.classList.contains('show-second')) {
			return;
		}
		this.wrapper.classList.add("show-second");
		this.wrapper.classList.remove("show-first");
	}

	toggleDetails() {
		this.setState( ( state ) => ( { showDetails: ! state.showDetails } ) );
	}
	showDetails() {
		this.setState( { showDetails: true } );
	}

	hideDetails() {
		this.setState( { showDetails: false } );
	}

	showSummary() {

		if( ! this.wrapper || ! this.wrapper.classList.contains('show-second')) {
			return;
		}

		this.wrapper.classList.add("show-first");
		this.wrapper.classList.remove("show-second");	
	}

	readIVs( results ) {

		
		return results.map( ( result, index ) => {

			return this.readIV( result );
			
			/*if( index == 1 ) {
				ivtime = new Date( esult.series[ 0 ].values[ 0 ][ 0 ] )
			}*/
			
		} );
	}

	readIV( result ) {

		if( ! result.series ) {
			return;
		}

		let iv = result.series[ 0 ].values[ 0 ][ 1 ].replace("\"", "").split(",").map( (el) => parseFloat( el ) ),
			wave = Graph.newWaveform();

		for( var i = 0; i < iv.length - 1; i += 2 ) {
			wave.append( iv[ i ], iv[ i + 1 ] );
		}
		return wave;
	}

	updateInfluxData( serverState = this.state.serverState ) {


		/*
		*	Procedure:
		*		1. Get number of points
		*		2. Use grouping to get 100 points
		*		3. Get latest vocs, jscs
		*/

		let parameter,
			newState = {},
			db = this.props.configDB.db,
			db_ds,
			grouping,
			timeQuery,
			query,
			queue = [];


		if( ! serverState.measurementName ) {
			return;
		}

		switch( this.state.display ) {

			case "voc":
				parameter = "voltage_mean";
			break;

			default:
			case "eff":
				parameter = "efficiency";
			break;

		}

		let queries = [
		"SELECT time, efficiency FROM \"" + serverState.measurementName + "\" ORDER BY time ASC limit 1",
		"SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM \"" + serverState.measurementName + "\" ORDER BY time DESC limit 1",
		"SELECT time, iv FROM \"" + serverState.measurementName + "_iv\" ORDER BY time DESC limit 1",
		"SELECT voc FROM \"" + serverState.measurementName + "_voc\" ORDER BY time DESC LIMIT 1",
		"SELECT jsc FROM \"" + serverState.measurementName + "_jsc\" ORDER BY time DESC LIMIT 1"
		];
		
		influxquery( queries.join(";"), db, this.props.configDB ).then( ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + serverState.measurementName + " or no associated data";
			}

			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timefrom_date = new Date( timefrom ),
				timeto_date = new Date( timeto );

			let last_iv = new Date( results[ 2 ].series[ 0 ].values[ 0 ][ 0 ] );

			newState.start_efficiency = Math.round( results[ 0 ].series[ 0 ].values[ 0 ][ 1 ] * 100 ) / 100;
			newState.efficiency = Math.round( results[ 1 ].series[ 0 ].values[ 0 ][ 1 ] * 100 ) / 100;

			newState.power = results[ 1 ].series[ 0 ].values[ 0 ][ 2 ];
			newState.current = ( results[ 1 ].series[ 0 ].values[ 0 ][ 3 ] * 1000 ).toPrecision( 3 );
			newState.voltage = parseFloat( results[ 1 ].series[ 0 ].values[ 0 ][ 4 ] ).toPrecision( 3 );
			newState.sun = Math.round( results[ 1 ].series[ 0 ].values[ 0 ][ 5 ] * 100 ) / 100;
			newState.pga = results[ 1 ].series[ 0 ].values[ 0 ][ 6 ];
			newState.temperature_base = results[ 1 ].series[ 0 ].values[ 0 ][ 7 ];
			newState.temperature_vsensor = results[ 1 ].series[ 0 ].values[ 0 ][ 8 ];
			newState.temperature_junction = results[ 1 ].series[ 0 ].values[ 0 ][ 9 ];
			newState.humidity = results[ 1 ].series[ 0 ].values[ 0 ][ 10 ];

		//	let cnt = results[ 2 ].series[ 0 ].values[ 0 ][ 1 ];

			
			let timeDifference = ( timeto_date - timefrom_date ) / 1000;

			newState.last_time = timeto_date;
			newState.ellapsed = Math.round( timeDifference / ( 3600 ) * 10 ) / 10;

			if( timeDifference < 3600 ) {
				newState.ellapsed = Math.round( timeDifference / ( 60 ) );
				newState.ellapsedUnit = "min.";
			} else {
				newState.ellapsed = Math.round( newState.ellapsed );
				newState.ellapsedUnit = "h";
			}

			grouping = Math.max( 1, Math.round( timeDifference / 100 ) );

			if( timeDifference > 3 * 24 * 3600 ) { // Display in days
				db_ds = db;// + "_downsampled_1h";
			} else if( timeDifference > 300 ) {
				db_ds = db;// + "_downsampled_1min";
			} else {
				db_ds = db;
			}

			//query = "SELECT time, MAX(efficiency) as effMax FROM \"" + this.state.serverState.measurementName + "\" ORDER BY time ASC limit 1;"
			//queue.push( influxquery( query, db_ds ).then( ( results ) => {
			let changeUnit, 
				changeUnitVal,
				prev_time = timeto_date.getTime() - ( timeto_date.getTime() - timefrom_date.getTime() ) / 10;

			if( timeto_date.getTime() - timefrom_date.getTime() > 12 * 3600 * 1000 ) { // Display in days

				changeUnitVal = 24 * 3600;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 day
				changeUnit = " &#951;% / day";

			} else if( timeto_date.getTime() - timefrom_date.getTime() > 600 * 1000 ) {

				changeUnitVal = 3600;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 hour
				changeUnit = " &#951;% / hour";

			}  else if( timeto_date.getTime() - timefrom_date.getTime() > 300 * 1000 ) {

				changeUnitVal = 60;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 minute
				changeUnit = " &#951;% / minute";
			}


			if( results[ 3 ].series ) {
				newState.voc = Math.round( results[ 3 ].series[ 0 ].values[ 0 ][ 1 ] * 1000 ) / 1000;
			}	

			if( results[ 4 ].series ) {
				newState.jsc = Math.round( results[ 4 ].series[ 0 ].values[ 0 ][ 1 ] / serverState.cellArea * 1000 * 1000 ) / 1000;
			}


			query = "SELECT MEAN(" + parameter + ") as param, MAX(efficiency) as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( sun ) as sMean FROM \"" + serverState.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;"

			queue.push( influxquery( query, db_ds, this.props.configDB ).then( ( results ) => {
				
				let values = results[ 0 ].series[ 0 ].values,
					offset,
					wave = Graph.newWaveform(),
					waveIV = Graph.newWaveform(),
					waveSun = Graph.newWaveform(),
					waveHumidity = Graph.newWaveform(),
					waveTemperature = Graph.newWaveform(),
					highest_efficiency = 0, 
					highest_efficiency_time = 0;

				// First point gives the initial efficiency, 2nd row
				if( values.length < 2 ) {
					newState.data = false;
					return;
				}

				let effIndex = 2;

				values.forEach( ( value, index ) => {
					
					let date = new Date( value[ 0 ] ),
						time;

					if( index == 0 ) {
						offset = date.getTime();
						time = 0;
					} else {
						time = ( date.getTime() - offset ) / 1000;
					}

					if( value[ effIndex ] > 35 || value[ effIndex ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
						return;
					}

					wave.append( time, value[ effIndex ] );
					waveSun.append( time, value[ 5 ] );
					waveIV.append( value[ 3 ], value[ 4 ] );
					waveTemperature.append( time, value[ 6 ] );
					waveHumidity.append( time, value[ 7 ] );
					
					if( value[ 2 ] > highest_efficiency && !isNaN( value[ 2 ] ) ) {
						highest_efficiency = value[ 2 ];
						highest_efficiency_time = time;
					}
				} );

				if( prev_time && changeUnitVal ) {
				
					wave.fit( {

						params: [ 0, 0 ],
						subsetIndex: [ wave.getIndexFromX( ( prev_time - offset ) / 1000 ), wave.getIndexFromX( ( timeto_date.getTime() - offset ) / 1000 ) ],
						function: ( x, params ) => {
							return x * params[ 0 ] + params[ 1 ]
						}
					}).then( ( params ) => {

						newState.changeRate = Math.round( params[ 0 ] * changeUnitVal * 1000 ) / 1000;
						newState.absChangeRate = params[ 0 ];
						newState.changeUnit = changeUnit;
					});

				} else {

					newState.changeRate = undefined;
					newState.absChangeRate = undefined;
					newState.changeUnit = undefined;
	
				}

				newState.highest_efficiency = Math.round( highest_efficiency * 100 ) / 100;
				newState.highest_efficiency_time = highest_efficiency_time;
				newState.data = wave;
				newState.data_sun = waveSun;
				newState.data_temperature = waveTemperature;
				newState.data_humidity = waveHumidity;
				newState.data_IV = waveIV;

				
			} ) );



			if( ! this._first_iv && last_iv ) {
				query = "SELECT time, iv FROM \"" + serverState.measurementName + "_iv\" ORDER BY time ASC limit 1";
				queue.push( influxquery( query, db, this.props.configDB ).then( this.readIVs.bind( this ) ).then( ( iv ) => {

					this._first_iv = iv[ 0 ];
					
				}) );
			}

			if( last_iv.getTime() > this._last_iv_time ) {

				this._last_iv_time = last_iv.getTime();
				this._last_iv = this.readIV( results[ 2 ] );
				
			}



			return Promise.all( queue ).then( () => {

				newState.ff = Math.round( newState.power / serverState.cellArea / ( newState.voc * newState.jsc / 1000 ) * 100 );
				newState.updating = false;
				console.log('newstate');
				this.setState( newState );

			}).catch( ( error ) => {
				
				console.error( "Could not process influx DB request." );
				console.error( error );

			});

		}).catch( ( error ) => {

			console.error( "Could not process influx DB request." );
			console.error( error );
			
		}).then( () => {

			this.scheduleRefresh();
		});
	}


	render() {

		let unit,
			arrowstatus,
			change,
			changeUnit,
			currVal,
			startVal,
			startValPos;

		switch( this.state.display ) {

			case "eff":
				unit = "%";
				startVal = this.state.highest_efficiency;
				startValPos = this.state.highest_efficiency_time;
				currVal = this.state.efficiency;
				change = ( this.state.efficiency - this.state.prev_efficiency );

			break;


			case "voc":
				unit = "V";
				startVal = this.state.start_voc;
				startValPos = 0;
				currVal = this.state.voc;
				change = ( this.state.voc - this.state.prev_voc );
			break;
		}


		if( this.state.absChangeRate ) {

			change = this.state.absChangeRate * 3600 * 24;

			//let changeDecision = change / this.state.prev_unit_ms * ( 3600 * 1000 );
			if( change > 0.05 ) {
				arrowstatus = 'up';
			} else if( change < -0.05 ) {
				arrowstatus = 'down';
			} else if ( change > 0 ) {
				arrowstatus = 'flatup';
			} else {
				arrowstatus = 'flatdown';
			}
		}

		let notavailable = "N/A";

		let arrowClassWrapper = "arrow " + arrowstatus;
		let arrowClass ="glyphicon glyphicon-arrow-left";
	
		let active = this.state.serverState.enable && this.state.serverState.tracking_mode > 0;

		let trackingMode;

		if( this.state.serverState.enable == 0 ) {
			trackingMode = "Off";
		} else {

			if( this.state.serverState.tracking_mode == 1 ) {
				trackingMode = "MPPT";
			} else if ( this.state.serverState.tracking_mode == 2 ) {
				trackingMode = "Voc";
			} else if ( this.state.serverState.tracking_mode == 3 ) {
				trackingMode = "Jsc";
			} else { 
				trackingMode = "No tracking";
			}
		}


		return (
			<div ref={ ( el ) => this.wrapper = el } className={'cell ' + ( this.state.unknown ? 'cell-unknown' : ( active ? 'cell-running' : 'cell-stopped' ) ) + ( this.state.showDetails && active ? ' show-details' : '' ) }>

				<div className="row cell-element">
				<div className="summary" ref={ (el) => this.rowSummary = el }>
					<div className="col-xs-2 propElement">
						<span><input type="checkbox" className="channel-check" onClick={ this.props.toggleChannelCheck } checked={ !! this.props.channelChecked } /> <span className="label"><span className="glyphicon glyphicon-tags"></span></span><span className="value">{ this.state.serverState.cellName || "Ch " + this.state.serverState.chanId } ({ trackingMode })</span></span>
					</div>

					<div className="col-xs-1 propElement">{ 
						! ! this.state.ellapsed && 
						<span>
							<span className="label">
								<span className="glyphicon glyphicon-hourglass"></span>
							</span>
							<span className="value">
								{this.state.ellapsed}
							</span>&nbsp; { this.state.ellapsedUnit }
						</span> }
					</div>
					<div className="col-xs-1 propElement">{ !!this.state.sun && <span><span className="label"><span className="glyphicon glyphicon-scale"></span></span><span className="value">{this.state.sun}</span>&nbsp;{this.unit.sun}</span>} </div>
					<div className="col-xs-1 propElement">{ this.state.efficiency !== undefined && <span><span className="label">&eta;</span><span className="value">{ this.state.efficiency }</span>{ this.unit.efficiency }</span>}</div>
					<div className="col-xs-1 propElement">{ !!this.state.voc && 
						<span>
							<span className="label">V<sub>oc</sub></span>
							<span className="value">{ this.state.voc }</span> { this.unit.voltage }
						</span>}
					</div>

					<div className="col-xs-2 propElement">{ !!this.state.jsc && 
						<span>
							<span className="label">J<sub>sc</sub></span>
							<span className="value">{ this.state.jsc }</span> { this.unit.currentdensity }
						</span>
					}
					</div>
					<div className="col-xs-1 propElement">{ !!this.state.ff && <span><span className="label">FF</span><span className="value">{ this.state.ff }</span>{this.unit.fillfactor}</span>}</div>

					<div className="col-xs-2 propElement">
					{ !! active && !! arrowstatus && this.state.serverState.tracking_mode == 1 && 
						<span className={ arrowClassWrapper }><span className={ arrowClass }></span><span>{ this.state.changeRate } <span dangerouslySetInnerHTML={ { __html: this.state.changeUnit } } /></span></span>
					}
					</div>

					<div className="col-xs-4 propElement">
						
						<CellButtons 
							cfg 			= { () => { this.cfg(); } }
							stop 			= { this.stop } 
							start 			= { ( ( ! this.state.serverState.enable && !! this.state.serverState.cellName && this.state.serverState.cellName.length > 0 ) ) ? this.start : undefined }
							recordJsc 		= { this.recordJsc } 
							recordVoc 		= { this.recordVoc }
							recordIV  		= { this.recordIV }
							downloadData 	= { this.downloadData }
							button_jsc 		= { active }
							button_voc 		= { active }
							button_iv 		= { active }
							button_download = { active }
							button_start 	= { ! active && this.props.cellName }
							button_stop 	= { active }
							button_details	= { active }
							details 		= { this.toggleDetails }


							button_jsc_disabled = { this.props.serverState.jsc_booked || this.state.updating }
							button_voc_disabled = { this.props.serverState.voc_booked || this.state.updating }
							button_iv_disabled = { this.props.serverState.iv_booked || this.state.updating }
						/>

					</div>
					</div>

					{ !!active && this.state.efficiency !== undefined && !!this.state.highest_efficiency &&
						<div className="bar" onClick={ this.showEfficiencies }>
							<div className="barGreen" style={ { width: this.state.efficiency / 25 * 100 + "%" } }></div>
							<div className="barRed" style={ { width: ( this.state.highest_efficiency - this.state.efficiency ) / 25 * 100 + "%" } }></div>
						</div>
					}
				</div>

				<div className="row efficiency cell-element" onClick={ this.showSummary } ref={ (el) => this.rowEfficiency = el }>
					
					<div className="col-xs-2 propElement fullHeight">

						<span>
							<span className="label">Current efficiency</span>
							<span className="value">{ this.state.efficiency } { this.unit.efficiency }</span>
						</span>
					</div>


					<div className="col-xs-2 propElement fullHeight">

						<span>
							<span className="label">Highest efficiency</span>
							<span className="value">{ this.state.highest_efficiency } { this.unit.efficiency }</span>
						</span>
					</div>


					<div className="col-xs-2 propElement fullHeight">

						<span>
							<span className="label">Actual voltage</span>
							<span className="value">{ this.state.voltage } { this.unit.voltage }</span>
						</span>
					</div>


					<div className="col-xs-3 propElement fullHeight">

						<span>
							<span className="label">Actual current density</span>
							<span className="value">{ this.state.current } { this.unit.currentdensity }</span>
						</span>
					</div>

					<div className="col-xs-3 propElement fullHeight">

						<span>
							<span className="label">Current range</span>
							<span className="value">&plusmn; { pgaValueToRange( this.state.pga, this.props.config.fullScaleCurrent ) } { this.unit.currentdensity }</span>
						</span>
					</div>


					<div className="col-xs-3 propElement fullHeight">

						<StatusGraph shown={ true } mode="sparkline" width="180" height="43" data={ this.state.data } unit={unit} />
					</div>

				</div>

				<div className="clearfix"></div>

				<div className="row cell-element">

					<div className="col-sm-3">
						<table cellPadding="0" cellSpacing="0" className="parameters">
							<tbody>
								<tr>
									<td>Cell name</td>
									<td>{ this.state.serverState.cellName || "Ch " + this.props.chanId }</td>
								</tr>
								<tr>
									<td>Area</td>
									<td>{ this.state.serverState.cellArea ? <span>{ this.state.serverState.cellArea } cm<sup>2</sup></span> :"" }</td>
								</tr>
								<tr>
									<td>PCE</td>
									<td>{ this.state.efficiency ? <span>{this.state.efficiency} {this.unit.efficiency}</span> : notavailable }</td>
								</tr>
								<tr>
									<td>Humidity</td>
									<td>{ ! isNaN( this.state.humidity ) ? this.state.humidity + "%" : "N/A"}</td>
								</tr>
								<tr>
									<td>Board temp.</td>
									<td>{ ! isNaN( this.state.temperature_base ) ? this.state.temperature_base + "\u00B0C" : "N/A"}</td>
								</tr>
								
								<tr>
									<td>Est. junction temp.</td>
									<td>{ ! isNaN( this.state.temperature_junction ) ? this.state.temperature_junction + "\u00B0C" : "N/A"}</td>
								</tr>
							</tbody>
						</table>
					</div>

					
					<div className="col-sm-6">
					
						<StatusGraph 
							shown={this.state.showDetails} 
							width="500" 
							height="220" 
							mode="default" 
							key={ this.props.instrumentId + this.props.chanId + "_graph" } 
							data={ this.state.data } 
							data_sun={ this.state.data_sun } 
							data_humidity={ this.state.data_humidity } 
							data_temperature={ this.state.data_temperature } 
							flag1={startVal} 
							flag1_pos={startValPos} 
							unit={unit} 
							flag2={currVal} />
					</div>

					<div className="col-sm-6">
					
						<StatusIV 
							width="500"
							height="220"
							shown={this.state.showDetails} 
							key={ this.props.instrumentId + this.props.chanId + "_iv" } 
							data={ [ this._first_iv, this._last_iv ] } 
							dataIV={ this.state.data_IV } 
							voltage={ this.state.voltage } 
							current={ this.state.current } 
							/>
					</div>


				</div>

			</div>
		

		);
	}
}


/*		
				

				<div className="col-sm-3">
					<h3>Real-time information</h3>

					<div className="tag blue"><span>Current</span><a>{ this.state.currentdensity }</a></div>
					<div className="tag blue"><span>Voltage</span><a>{ this.state.voltage }</a></div>
					<div className="tag green"><span>Tracking mode</span><a>{ this.state.tracking_mode }</a></div>
				</div>


				<StatusRender key={ this.props.instrumentId + this.props.chanId + "_status" } tracking_mode={this.state.tracking_mode} start={ startVal } ellapsed={ this.state.ellapsed } ellapsedUnit={ this.state.ellapsedUnit } current={ currVal } arrowstatus={ arrowstatus } change={ change } unit={ unit } changeUnit={ changeUnit } />

				<div className="cellActions pull-right">
					

					
				</div>


				*/
/*
						<div className={ 'action update' + ( this.state.updating ? ' rotating': '' ) } onClick={ this.update }>
							<span><span className="glyphicon glyphicon-refresh"></span></span> <a>Update</a>
						</div>

*/
/*{ ( !! this.state.enable && !!  this.state.measurementName ) && 
		<div className="config" onClick={ this.pause }>
			<span className="glyphicon glyphicon-pause"></span> <a>Pause channel</a>
		</div>
	}

*/
export default TrackerDevice;