import StatusGraph from "../cellstatusgraph.jsx";
import StatusIV from "../cellstatusiv.jsx";
import CellButtons from "../cellbuttons.jsx";
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import Timer from '../timer.jsx';

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
	start_value: false,
	highest_value: false,
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

	_last_iv_time: false,
	_last_iv: null,
	_fist_iv: null,

	ivCurves: [],
	serverState: {}
};

class TrackerDevice extends React.Component {
	
	/**
	 *	@param props.name The name of the cell
	 */
	constructor( props ) {
		super( props );
		
		this.unit = {
			"voltage": <span>V</span>,
			"currentdensity": <span>mA cm<sup>-2</sup></span>,
			"current": <span>mA</span>,
			"efficiency": <span>%</span>,
			"fillfactor": <span>%</span>,
			"sun": <span>sun</span>,
			"area": <span>cm<sup>2</sup></span>,
			"temperature": <span>°C</span>,
			"humidity": <span>%</span>
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

		
		this.toggleDetails = this.toggleDetails.bind( this );
	//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};		
	}

	shouldComponentUpdate( props, state ) {

		
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


	saveStatus( newState ) {

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

/*
		this.state.serverState.measurementName = false;
		this.state.serverState.cellName = "";
		this.state.serverState.cellArea = 0;
		this.state.serverState.tracking_mode = 0;
		this.state.serverState.enable = 0;

*/
		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/resetStatus?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId , {

			method: 'GET'

		} ).then( ( response ) => {

			this.setState( Object.assign( {}, initialState ) );
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

		fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordVoc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId  + "&extend=" + !!! this.state.voc ).then( ( response ) => {

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

		ipcRenderer.send( "downloadData", this.state.serverState, this.props.chanId, this.state.serverState.measurementName );
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

		this.data_sun = false;
		this.data_humidity = false;
		this.data_temperature = false;

		this.resetChannel();
	}

	cfg() {
		
		ipcRenderer.once( "channelConfigured", ( event, data ) => {

			if( data.chanId != this.state.serverState.chanId ) {
				return;
			}

			this.saveStatus( data );
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


	readIV( value ) {

		if( ! value ) {
			return;
		}

		let iv = value.replace("\"", "").split(",").map( (el) => parseFloat( el ) ),
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

		switch( this.state.serverState.tracking_mode ) {

			case 3:
				parameter = "current_mean";
			break;

			case 2:
				parameter = "voltage_mean";
			break;

			default:
			case 1:
				parameter = "efficiency";
			break;
		}

		let queries = [
		"SELECT time, efficiency FROM \"" + serverState.measurementName + "\" ORDER BY time ASC limit 1",
		"SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM \"" + serverState.measurementName + "\" ORDER BY time DESC limit 1",
		`SELECT time, iv FROM "${ serverState.measurementName }_iv" ${ this.state._last_iv_time ? `WHERE time > '${ this.state._last_iv_time }'` : '' } ORDER BY time ASC`,
		`SELECT voc FROM "${serverState.measurementName}_voc" ORDER BY time DESC LIMIT 1`,
		"SELECT jsc FROM \"" + serverState.measurementName + "_jsc\" ORDER BY time DESC LIMIT 1"
		];
		
		let newIvCurves = false;

		influxquery( queries.join(";"), db, this.props.configDB ).then( ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + serverState.measurementName + " or no associated data";
			}

			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timefrom_date = new Date( timefrom ),
				timeto_date = new Date( timeto ),
				last_iv;


			if( results[ 2 ].series && results[ 2 ].series[ 0 ] ) {
				
				newState.ivCurves = this.state.ivCurves.splice( 0 );
				newState.ivCurves = newState.ivCurves.concat( results[ 2 ].series[ 0 ].values.map( ( value, index ) => {

						
					if( index == results[ 2 ].series[ 0 ].values.length - 1 ) {
						newState._last_iv_time = value[ 0 ];
					}	

					return {
						time: new Date( value[ 0 ] ),
						iv: this.readIV( value[ 1 ] )
					}

				} ) );
			}

			newState.latest = timeto_date.getTime();
			newState.start_value = Math.round( results[ 0 ].series[ 0 ].values[ 0 ][ 1 ] * 100 ) / 100;
			newState.efficiency = Math.round( results[ 1 ].series[ 0 ].values[ 0 ][ 1 ] * 100 ) / 100;

			newState.power = results[ 1 ].series[ 0 ].values[ 0 ][ 2 ];
			newState.current = results[ 1 ].series[ 0 ].values[ 0 ][ 3 ] * 1000;
			newState.currentdensity = results[ 1 ].series[ 0 ].values[ 0 ][ 3 ] * 1000 / serverState.cellArea;
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
				newState.ellapsedUnit = "m";
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


			if( results[ 3 ] && results[ 3 ].series && this.state.serverState.tracking_mode == 1 ) {
				newState.voc = Math.round( results[ 3 ].series[ 0 ].values[ 0 ][ 1 ] * 1000 ) / 1000;
			}	

			if( results[ 4 ] && results[ 4 ].series && this.state.serverState.tracking_mode == 1 ) {
				newState.jsc = results[ 4 ].series[ 0 ].values[ 0 ][ 1 ] / serverState.cellArea * 1000;
			}

			query = "SELECT MEAN(" + parameter + ") as param, MAX(" + parameter + ") as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( sun ) as sMean FROM \"" + serverState.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;"

			queue.push( influxquery( query, db_ds, this.props.configDB ).then( ( results ) => {
				
				let values = results[ 0 ].series[ 0 ].values,
					offset,
					wave = Graph.newWaveform(),
					waveIV = Graph.newWaveform(),
					waveSun = Graph.newWaveform(),
					waveHumidity = Graph.newWaveform(),
					waveTemperature = Graph.newWaveform(),
					highest_value = 0, 
					highest_value_time = 0;

				// First point gives the initial efficiency, 2nd row
				if( values.length < 2 ) {
					newState.data = false;
					return;
				}

				let valueIndex = 2;

				values.forEach( ( value, index ) => {
					
					let date = new Date( value[ 0 ] ),
						time;

					if( index == 0 ) {
						offset = date.getTime();
						time = 0;
					} else {
						time = ( date.getTime() - offset ) / 1000;
					}

					if( this.state.serverState.tracking_mode == 1 ) {
						if( value[ valueIndex ] > 35 || value[ valueIndex ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
							return;
						}
					} else if ( this.state.serverState.tracking_mode == 3 ) {
						value[ valueIndex ] *= 1000; // In current mode, show mAmps
					}

					wave.append( time, value[ valueIndex ] );
					waveSun.append( time, value[ 5 ] );					
					waveIV.append( value[ 3 ], value[ 4 ] );
					waveTemperature.append( time, value[ 6 ] );
					waveHumidity.append( time, value[ 7 ] );
						
					if( this.state.serverState.tracking_mode == 1 ) {
						if( value[ 2 ] > highest_value && !isNaN( value[ 2 ] ) ) {
							highest_value = value[ 2 ];
							highest_value_time = time;
						}
					}

				} );


				if( this.state.serverState.tracking_mode == 2 ) {
					newState.voc = Math.round( values[ values.length - 1 ][ 2 ] * 1000 ) / 1000;	
				}

				if( this.state.serverState.tracking_mode == 3 ) {
					newState.jsc = Math.round( values[ values.length - 1 ][ 2 ]  * 100 ) / 100;
				}
				
				

				newState.highest_value = Math.round( highest_value * 100 ) / 100;
				newState.highest_value_time = highest_value_time;
				newState.data = wave;
				newState.data_sun = waveSun;
				newState.data_temperature = waveTemperature;
				newState.data_humidity = waveHumidity;
				newState.data_IV = waveIV;

			} ) );



			return Promise.all( queue ).then( () => {

				newState.ff = Math.round( newState.power / serverState.cellArea / ( newState.voc * newState.jsc / 1000 ) * 100 );
				newState.updating = false;
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

	processCurrent( value ) {

		if( isNaN( value ) ) {
			return;
		}

		if( Math.abs( value ) < 0.1 ) {
			return ( <span>{ ( Math.round( value * 10000 ) / 10 ).toFixed( 1 ) }&mu;Acm<sup>-2</sup></span> );
		} else {
			return ( <span>{ ( Math.round( value * 100 ) / 100 ).toFixed( 1 ) }mAcm<sup>-2</sup></span> );
		}
	}

	render() {

		let unit,
			arrowstatus,
			change,
			changeUnit,
			currVal,
			startVal,
			startValPos,
			trackingMode,
			statusGraphAxisLabel,
			statusGraphAxisUnit,
			statusGraphSerieLabelLegend;


		switch( this.state.serverState.tracking_mode ) {

			case 0:
				trackingMode = "No tracking";
			break;

			case 1:
				unit = "%";
				startVal = this.state.highest_value;
				startValPos = this.state.highest_value_time;
				currVal = this.state.efficiency;
				

				trackingMode = "MPPT";
				statusGraphAxisLabel = "Efficiency";
				statusGraphAxisUnit = "%";
				statusGraphSerieLabelLegend = "PCE";

			break;


			case 2:
				unit = "V";
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.voc;
				

				trackingMode = "Voc";
				statusGraphAxisLabel = "Voltage";
				statusGraphAxisUnit = "V";
				statusGraphSerieLabelLegend = "Voc";
			break;


			case 3:
				unit = this.unit.currentdensity;
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.jsc;
				

				trackingMode = "Jsc";
				statusGraphAxisLabel = "Current density";
				statusGraphAxisUnit = "mA cm^-2";
				statusGraphSerieLabelLegend = "Jsc";
			break;
		}

		let active = this.state.serverState.enable > 0 && this.state.serverState.tracking_mode > 0;
		let notavailable = "N/A";

		const j_currentdensity = this.processCurrent( this.state.currentdensity );
		const jsc_currentdensity = this.processCurrent( this.state.jsc );

		return (
			<div ref={ ( el ) => this.wrapper = el } className={'cell ' + ( this.state.unknown ? 'cell-unknown' : ( active ? 'cell-running' : 'cell-stopped' ) ) + ( this.state.showDetails && active ? ' show-details' : '' ) }>

			
				<div className="cell-name cell-main-info">
					
					<div className="col-lg-9">
						<span>
							<input type="checkbox" className="channel-check" onClick={ this.props.toggleChannelCheck } checked={ !! this.props.channelChecked } /> 
						</span>
						<span className="label">
							<span className="glyphicon glyphicon-tags"></span>
						</span>
						<span className="value">{ this.state.serverState.cellName || "Ch " + this.state.serverState.chanId }</span> { this.state.serverState.cellArea ? <span className="cell-area">( { this.state.serverState.cellArea } cm<sup>2</sup> )</span> :"" }
		
					</div>


					<div className="cell-iv pull-right col-lg-3">

						<StatusIV 
							width="290"
							height="190"
							shown={ true } 
							key={ this.props.instrumentId + this.props.chanId + "_iv" } 
							data={ this.state.ivCurves } 
							dataIV={ this.state.data_IV } 
							voltage={ this.state.voltage } 
							current={ this.state.current } 
							cellarea={ this.props.serverState.cellArea }
							/>

					</div>

				</div>

{/*	
				<div className="row">
				
					<div className="col-lg-1">
						<div>Last data</div>
						<div><Timer latest={ this.state.latest } /></div>
					</div>

					<div className="col-lg-1">
						<div>Next IV curve</div>
						<div><Timer latest={ this.state.latest } /></div>
					</div>

					<div className="col-lg-1">
						<div>Next Voc</div>
						<div><Timer latest={ this.state.latest } /></div>
					</div>

					<div className="col-lg-1">
						<div>Next Jsc</div>
						<div><Timer latest={ this.state.latest } /></div>
					</div>
				</div>
				*/ }


				<div className="cell-summary">
					

					<div className={ `col-lg-1 cell-status ${ active ? 'active' : ''}`}>
						<div>{ active ? <span className="glyphicon glyphicon-record"></span> : <span className="glyphicon glyphicon-stop"></span> }</div>
						{ trackingMode }
					</div>

					<div className="col-lg-1 propElement">{ 
						! ! this.state.ellapsed && 
						<div>
							<div className="label">
								<span className="glyphicon glyphicon-hourglass"></span>
							</div>
							<div className="value">
								{this.state.ellapsed}{ this.state.ellapsedUnit }
							</div>
						</div> }
					</div>
					<div className="col-lg-1 propElement">
						<div className="record">
							<span className="glyphicon glyphicon-record"></span>
						</div>

						{ 
						!!this.state.sun && 
						<div>
							<div className="label">
								<span className="glyphicon glyphicon-scale"></span>
							</div>
							<div className="value">
								{ this.state.sun } {this.unit.sun}
							</div>
						</div>} 
					</div>
					<div className="col-lg-1 propElement">{ 
						! isNaN( this.state.efficiency ) && 
						<div>
							<div className="label">&eta;</div>
							<div className="value">{ this.state.efficiency }{ this.unit.efficiency }</div>
						</div> }
					</div>
					<div className="col-lg-1 propElement">
						<div className="record">
							<span className="glyphicon glyphicon-record"></span>
						</div>
						<div className="label">
							V<sub>oc</sub>
						</div>
						<div className="value">
							{ !!this.state.voc ? <span>{ this.state.voc }{ this.unit.voltage }</span> : 'N/A' }
						</div>
						
					</div>

					<div className="col-xs-1 propElement">
						<div className="record">
							<span className="glyphicon glyphicon-record"></span>
						</div>
						<div className="label">
							J<sub>sc</sub>
						</div>
						<div className="value">
							{ !!this.state.jsc ? jsc_currentdensity : 'N/A' }
						</div>
						
					</div>

					<div className="col-xs-1 propElement">
						<div className="label">FF</div>
						<div className="value">
							{ !!this.state.ff ?  this.state.ff : 'N/A' }
						</div>
					</div>




					<div className="col-xs-1 propElement">
						<div className="label">V<sub>now</sub></div>
						<div className="value">
							{ this.state.voltage } { this.unit.voltage }
						</div>
					</div>



					<div className="col-xs-1 propElement">
						<div className="label">J<sub>now</sub></div>
						<div className="value">
							{ j_currentdensity }
						</div>
					</div>
					
{ /*
				<div className="row cell-element">

					<div className="col-sm-3">
						<table cellPadding="0" cellSpacing="0" className="parameters">
							<tbody>
								
								<tr>
									<td>PCE</td>
									<td>{ this.state.efficiency ? <span>{this.state.efficiency} {this.unit.efficiency}</span> : notavailable }</td>
								</tr>
								<tr>
									<td>Humidity</td>
									<td>{ ! isNaN( this.state.humidity )  && this.state.humidity !== -1 ? this.state.humidity + "%" : "N/A"}</td>
								</tr>
								<tr>
									<td>Board temp.</td>
									<td>{ ! isNaN( this.state.temperature_base ) && this.state.temperature_base !== -1 ? this.state.temperature_base + "\u00B0C" : "N/A"}</td>
								</tr>
									
								<tr>
									<td>Est. junction temp.</td>
									<td>{ ! isNaN( this.state.temperature_junction ) && this.state.temperature_junction !== -1 ? this.state.temperature_junction + "\u00B0C" : "N/A"}</td>
								</tr>
							</tbody>
						</table>
					</div>
*/ }
						

					<div className="col-lg-1 propElement">
						<div>
							<div className="label">
								<span className="glyphicon glyphicon-grain"></span>
							</div>
							<div className="value">
								{ this.state.temperature_junction ? <span>{ this.state.temperature_junction } { this.unit.temperature }</span> : 'N/A' }
							</div>
						</div>
					</div>
					<div className="col-lg-1 propElement">
						<div>
							<div className="label">
								<span className="glyphicon glyphicon-tint"></span>
							</div>
							<div className="value">
								{ this.state.humidity ? <span>{ this.state.humidity } { this.unit.humidity }</span> : 'N/A' }
							</div>
						</div>
					</div>

				
					<div className="cell-efficiency col-lg-6">

						<StatusGraph 
							shown={ true } 
							width="600" 
							height="60" 
							mode="default" 
							key={ this.props.instrumentId + this.props.chanId + "_graph" } 
							data={ this.state.data } 
							data_sun={ this.state.data_sun } 
							data_humidity={ this.state.data_humidity } 
							data_temperature={ this.state.data_temperature } 
							flag1={startVal} 
							flag1_pos={startValPos} 
							unit={unit} 
							axisLabel={statusGraphAxisLabel}
							axisUnit={statusGraphAxisUnit}
							serieLabelLegend={statusGraphSerieLabelLegend}
							flag2={currVal} />
					
					</div>
				
				</div>


				<div className="row cell-actions">
					
					<div className="col-lg-1">
						Actions
					</div>


					<div className="col-lg-1">

						<button className="btn btn-cl"><span className="glyphicon glyphicon-download-alt"></span> Download</button>
						<button className="btn btn-cl"><span className="glyphicon stop"></span> Stop</button>
					</div>


				</div>

			</div>

		);
	}
}

export default TrackerDevice;