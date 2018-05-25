import React from 'react';
import fs from 'fs';
import { query as influxquery } from "./influx";
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import { getIVParameters } from '../../app/util/iv'
import { ipcRenderer } from 'electron';
const { dialog }  = require('electron').remote;


const pageHeight = 795;//window.pageY;

const graphsCfg = [
	{
		graphRef: 'graph_pce',
		type: 'pce'
	},

	{
		graphRef: 'graph_power',
		type: 'power'
	},

	{
		graphRef: 'graph_current',
		type: 'current'
	},

	{
		graphRef: 'graph_voltage',
		type: 'voltage'
	},

	{
		graphRef: 'graph_jsc',
		type: 'jsc'
	},

	{
		graphRef: 'graph_voc',
		type: 'voc'
	},

	{
		graphRef: 'graph_light',
		type: 'light'
	},
	{
		graphRef: 'graph_temperature',
		type: 'temperature'
	},
	{
		graphRef: 'graph_humidity',
		type: 'humidity'
	}
];


const possibleGraphs = {
	pce: 				{ name: 'pce', 			label: "Power conversion efficiency" },
	power: 				{ name: 'power', 		label: "Power output" },
	current: 			{ name: 'current', 		label: "Current output" },
	voltage: 			{ name: 'voltage', 		label: "Voltage output" },
	jsc: 				{ name: 'jsc', 			label: "Short circuit current" },
	voc: 				{ name: 'voc', 			label: "Open circuit voltage" },
	light: 				{ name: 'light', 		label: "Light intensity" },
	temperature: 		{ name: 'temperature', 	label: "Temperature" },
	humidity: 			{ name: 'humidity', 	label: "Humidity" }
};



const toDate = ( date ) => {

	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	const pad = ( val ) => {
		if( val < 10 ) {
			return '0' + val;
		}
		return val;
	}
	return date.getDate() + " " + months[ date.getMonth() ] + "." + date.getFullYear() + " " + pad( date.getHours() ) + ":" + pad( date.getMinutes() ) + ":" + pad( date.getSeconds() );
}


class HTMLReport extends React.Component {
	
	constructor( props ) {
		super( props );
		this.state = {};
		this.graphs = {};
		this.graphsRefs = {};
	}

	close() {
		this.props.onClose();
	}

	componentWillUnmount() {
		ipcRenderer.removeListener( "savePDF", this.savePDF );
	}


	/*********************/
	/** PCE **************/
	/*********************/

	makePCEGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Power conversion efficiency (PCE)");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("PCE")
				.setUnit("%")
				.setUnitWrapper("(", ")")
				.forceMin( 0 )
				.setLineAt( [ 0 ] );

		return g;
	}



	updatePCEGraph( graph ) {

		if( ! this.data.pce ) {
			return;
		}

		graph
			.newSerie("efficiency")
			.setLabel("PCE")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.pce );

		this.redrawGraph( graph );
	}



	/*********************/
	/** POWER ************/
	/*********************/

	makePowerGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Power output");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Power output")
				.setUnit("W")
				.setUnitDecade( true )
				.setUnitWrapper("(", ")")
				.forceMin( 0 )
				.setLineAt( [ 0 ] );

		return g;
	}


	updatePowerGraph( graph ) {


		if( ! this.data.power ) {
			return;
		}

		graph
			.newSerie("power")
			.setLabel("Power")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.power );

		this.redrawGraph( graph );
	}




	/*********************/
	/** Jsc **************/
	/*********************/
	
	makeJscGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Short circuit current");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Jsc")
				.setUnit("mA cm^-2")
				.setUnitWrapper("(", ")")

		return g;
	}


	updateJscGraph( graph ) {

		if( ! this.data.jsc ) {
			return;
		}

		graph
			.newSerie("jsc")
			.setLabel("Jsc")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.jsc );

		this.redrawGraph( graph );
	}

	/*********************/
	/** Voc **************/
	/*********************/

	makeVocGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Open circuit voltage");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Voc")
				.setUnit("V")
				.setUnitWrapper("(", ")");

		return g;
	}


	updateVocGraph( graph ) {


		if( ! this.data.voc ) {
			return;
		}

		graph
			.newSerie("voc")
			.setLabel("Voc")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.voc );

		this.redrawGraph( graph );
	}




	/*********************/
	/** Voltage **********/
	/*********************/

	makeVoltageGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Voltage");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Voltage")
				.setUnit("V")
				.setUnitWrapper("(", ")");

		return g;
	}


	updateVoltageGraph( graph ) {


		if( ! this.data.voltage ) {
			return;
		}

		graph
			.newSerie("voltage")
			.setLabel("Voltage")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.voltage );

		this.redrawGraph( graph );
	}



	/*********************/
	/** Current **********/
	/*********************/

	makeCurrentGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Current");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Current")
				.setUnit("mA cm^-2")
				.setUnitWrapper("(", ")");

		return g;
	}


	updateCurrentGraph( graph ) {

		if( ! this.data.current ) {
			return;
		}

		graph
			.newSerie("current")
			.setLabel("Current")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.current );

		this.redrawGraph( graph );
	}


	/*********************/
	/** Light ************/
	/*********************/

	makeLightGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Light intensity");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Light intensity")
				.setUnit("W m^-2")
				.setUnitWrapper("(", ")");

		return g;
	}

	updateLightGraph( graph ) {


		if( ! this.data.light ) {
			return;
		}

		graph
			.newSerie("light")
			.setLabel("Light intensity")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.light );

		this.redrawGraph( graph );
	}


	/*********************/
	/** Temperature ******/
	/*********************/

	makeTemperatureGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Temperature");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Temperature")
				.setUnit("°C")
				.setUnitWrapper("(", ")");

		return g;
	}

	updateTemperatureGraph( graph ) {

		if( ! this.data.temperature ) {
			return;
		}

		graph
			.newSerie("temperature")
			.setLabel("Temperature")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.temperature );

		this.redrawGraph( graph );
	}




	/*********************/
	/** Humidity *********/
	/*********************/

	makeHumidityGraph( dom ) {

		const g = new Graph( dom );
		g.setTitle("Humidity");
		
		this.graph_cfg_setBottomAxisTime( g );
		this.graph_cfg_general( g );

		g.getLeftAxis( 0 )
				.setLabel("Humidity")
				.setUnit("%")
				.setUnitWrapper("(", ")");

		return g;
	}


	updateHumidityGraph( graph ) {

		if( ! this.data.humidity ) {
			return;
		}

		graph
			.newSerie("humidity")
			.setLabel("Humidity")
			.autoAxis()
			.setLineColor("#1f1fae")
			.setLineWidth( 2 )
			.setWaveform( this.data.humidity );

		this.redrawGraph( graph );
	}


	redrawGraph( g ) {
		g.autoscaleAxes();
		g.redraw();
	}


	makeGraphs() {
		graphsCfg.map( ( g ) => {

			this.graphs[ g.graphRef ] = ( () => {

				if( ! this.graphsRefs[ g.graphRef ] ) {
					return;
				}

				switch (g.type) {

					case 'pce':
						return this.makePCEGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'power':
						return this.makePowerGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'jsc':
						return this.makeJscGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'voc':
						return this.makeVocGraph( this.graphsRefs[ g.graphRef ] );
					break;


					case 'current':
						return this.makeCurrentGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'voltage':
						return this.makeVoltageGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'light':
						return this.makeLightGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'humidity':
						return this.makeHumidityGraph( this.graphsRefs[ g.graphRef ] );
					break;

					case 'temperature':
						return this.makeTemperatureGraph( this.graphsRefs[ g.graphRef ] );
					break;
				}
			})()
		} );
	}

	updateGraphs() {


		var nbShown = 0;

		graphsCfg.forEach( ( g, index ) => {

			if( this.props.config[ g.graphRef ] ) {
				nbShown++;
			}
			switch (g.type) {

				case 'pce':
					this.updatePCEGraph( this.graphs[ g.graphRef ] );
				break;


				case 'power':
					this.updatePowerGraph( this.graphs[ g.graphRef ] );
				break;

				case 'jsc':
					this.updateJscGraph( this.graphs[ g.graphRef ] );
				break;

				case 'voc':
					this.updateVocGraph( this.graphs[ g.graphRef ] );
				break;

				case 'voltage':
					this.updateVoltageGraph( this.graphs[ g.graphRef ] );
				break;

				case 'current':
					this.updateCurrentGraph( this.graphs[ g.graphRef ] );
				break;

				case 'light':
					this.updateLightGraph( this.graphs[ g.graphRef ] );
				break;

				case 'humidity':
					this.updateHumidityGraph( this.graphs[ g.graphRef ] );
				break;

				case 'temperature':
					this.updateTemperatureGraph( this.graphs[ g.graphRef ] );
				break;
			}
		} );

		for( let ref in this.graphsRefs ) {

			if( this.props.config[ ref ] ) { // Ask for display
				this.graphs[ ref ].setHeight( pageHeight / nbShown );
				this.graphs[ ref ].draw();
			}
		}
	}



	graph_cfg_setBottomAxisTime( graph ) {
		
		graph.getBottomAxis()
				.setLabel("Time")
				.setUnit("h")
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setNbTicksSecondary( 0 );
	}

	graph_cfg_setBottomAxisNothing( graph ) {

		this.setBottomAxisTime( graph );
		graph.getBottomAxis().hide();
	}

	graph_cfg_general( graph ) {

		graph.setWidth( 600 );
	}


	updateGraphJV( data ) {

		if( ! this.graphJV || ! data || ! data.jv ) {
			return;
		}

		const graph = this.graphJV;
		
		graph.resize( 420, 240 );

		graph.getBottomAxis()
				.setLabel("Voltage")
				.setUnit("V")
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setNbTicksSecondary( 0 );

		graph.getLeftAxis( )
				.setLabel("Current")
				.setUnit("A")
				.setScientific( true )
				.setUnitDecade( true )
				.setSpan( 0, 1.00 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setLineAt( [ 0 ] )
				.setNbTicksSecondary( 0 );

		graph.killSeries();

		data.jv.map( ( jv, index ) => {

			graph
				.newSerie("jv_" + jv.time )
				.setLabel( jv.ellapsed + "h")
				.autoAxis()
				.setLineWidth(2)
				.setWaveform( jv.waveform );

		} );

		graph.getPlugin('makeTracesDifferent').colorizeAll( {
			affect: 'h',
			startingColorHSL: { h: 0, s: 0.5, l: 0.5 },
			endingColorHSL: { h: 270, s: 0.5, l: 0.5 }
		}, ( index, color ) => {

			const table = document.getElementById('ivTable');
			table.children[ index + 1 ].style.color = color;
		} );

		//graph.makeLegend( { isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 } ).setAutoPosition( "bottom" );
		//graph.updateLegend();
		graph.autoscaleAxes();
		graph.draw();
		//graph.updateLegend();
	}

	componentDidMount() {
		this.updateProps( this.props );
	//	ipcRenderer.on( "savePDF", this.savePDF );
		this.makeGraphs();
	}

	componentWillReceiveProps( nextProps ) {
		this.updateProps( nextProps );		
	}

	componentDidUpdate() {

	}

	async updateProps( props = this.props ) {

		this.data = {};

		try {
			await this.getTrackData( props );
		} catch( e ) {
			console.warn( e );
		}

		try {
			await this.getVocData( props );
		} catch( e ) {
			console.warn( e );
		}

		try {
			await this.getJscData( props );
		} catch( e ) {
			console.warn( e );
		}
			
		while( this.domJV.firstChild ) {
			this.domJV.removeChild( this.domJV.firstChild );
		}

		this.graphJV = new Graph( this.domJV, { 
			fontSize: 15, 
			paddingLeft: 0, 
			paddingRight: 0, 
			paddingTop: 10, 
			paddingBottom: 0,
			plugins: {
				'makeTracesDifferent': {}
			}
		} );

		this.updateGraphs();
		this.updateGraphJV( this.data );
		this.setState( { data: this.data } );
	}

	getIVInformation() {
		return null;
	}

	async getVocData( props = this.props ) {

		if( ! props.measurementName ) {
			return;
		}

		var db = props.db.db;		
		let time, wave = Graph.newWaveform();

		return influxquery( `SELECT time,voc FROM "${ props.measurementName }_voc" ORDER BY time`, db, props.db ).then( async ( results ) => {

			if( ! results[ 0 ].series ) {
				throw new Error(`No Voc data with the name "${props.measurementName}"`);
			}

			let values = results[ 0 ].series[ 0 ].values;
			
			values.forEach( ( value, index ) => {
				
				let date = new Date( value[ 0 ] ),
					time = ( date.getTime() - this.offset ) / 1000 / 3600;

				wave.append( time, value[ 1 ] );
			} );

			this.data.voc = wave;
		} );
	}


	async getJscData( props = this.props ) {
		
		if( ! props.measurementName ) {

			return;
		}

		var db = props.db.db;		
		let time, wave = Graph.newWaveform();

		return influxquery( `SELECT time,jsc FROM "${ props.measurementName }_jsc" ORDER BY time`, db, props.db ).then( async ( results ) => {

			if( ! results[ 0 ].series ) {
				throw new Error(`No Jsc data with the name "${props.measurementName}"`);
			}

			let values = results[ 0 ].series[ 0 ].values;
			
			values.forEach( ( value, index ) => {
				
				let date = new Date( value[ 0 ] ),
					time = ( date.getTime() - this.offset ) / 1000 / 3600;

				wave.append( time, value[ 1 ] );
			} );

			this.data.jsc = wave;
		} );
	}

	async getTrackData( props = this.props ) {

		if( ! props.measurementName ) {
			return;
		}

		var db = props.db.db;
		let jvCfg = props.config.jv || [];

		await influxquery(`SELECT time,efficiency FROM "${ props.measurementName }" ORDER BY time ASC limit 1; SELECT time,efficiency FROM "${ props.measurementName }" ORDER BY time DESC limit 1;`, db, props.db ).then( async ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + props.measurementName + " or no associated data";
			}


			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timeDifference = ( new Date( timeto ) - new Date( timefrom ) ) / 1000,
				grouping = Math.max( 1, Math.round( timeDifference / 2000 ) );

			let qString = "SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff FROM \"" + props.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;";

			let toReturn = await influxquery(qString, db, props.db ).then( ( results ) => {
				
				if( ! results[ 0 ].series ) {
					console.warn("Could not find any information linked to this serie");
					console.warn("Query string: " + qString );
					return;
				}

				let values = results[ 0 ].series[ 0 ].values,
					offset,
					waveEfficiency = Graph.newWaveform(),
					wavePower = Graph.newWaveform(),
					waveVoltage = Graph.newWaveform(),
					waveCurrent = Graph.newWaveform(),
					waveSun = Graph.newWaveform(),
					waveTemperature = Graph.newWaveform(),
					waveHumidity = Graph.newWaveform();

				waveEfficiency.setUnit("%");
				waveEfficiency.setXUnit("h");
				wavePower.setXUnit("W");
				waveVoltage.setUnit("V");
				waveCurrent.setUnit("mA cm-2");

				waveSun.setUnit("mW cm-2");
				waveTemperature.setUnit("°C");
				waveHumidity.setUnit("%");

				let maxEfficiency = 0;
				let finalEfficiency = 0;


				values.forEach( ( value, index ) => {
					
					let date = new Date( value[ 0 ] ),
						time;

					if( index == 0 ) {
						this.offset = date.getTime();
						time = 0;
					} else {
						time = ( date.getTime() - this.offset ) / 1000 / 3600;
					}

					if( value[ 1 ] > 35 || value[ 1 ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
					//	value[ 1 ] = NaN;
						//value[ 2 ] = NaN;
					}

					waveEfficiency.append( time, value[ 1 ] );					
					wavePower.append( time, value[ 2 ] * value[ 3 ] );					
					waveVoltage.append( time, value[ 2 ] );					
					waveCurrent.append( time, value[ 3 ] );

					waveSun.append( time, value[ 5 ] );
					waveHumidity.append( time, value[ 4 ] );
					waveTemperature.append( time, value[ 6 ] );		

					maxEfficiency = Math.max( maxEfficiency, value[ 7 ] );
				} );

				finalEfficiency = values[ values.length - 1 ][ 7 ];

				this.data.pce = waveEfficiency;
				this.data.power = wavePower;
				this.data.voltage = waveVoltage;
				this.data.current = waveCurrent;
				this.data.light = waveSun;
				this.data.temperature = waveTemperature;
				this.data.humidity = waveHumidity;

				this.data.maxEfficiency = Math.round( 100 * maxEfficiency ) / 100;
				this.data.finalEfficiency = Math.round( 100 * finalEfficiency ) / 100;
				this.data.ellapsed = Math.round( 10 * timeDifference / 3600 ) / 10;
				this.data.start_date = new Date( timefrom );
				this.data.end_date = new Date( timeto );
				
			} );



			let tfrom = new Date( timefrom ).getTime() * 1000000;

			let time_1h = tfrom + 1000000000 * 3600;
			let time_24h = tfrom + 1000000000 * 3600 * 24;
			let time_100h = tfrom + 1000000000 * 3600 * 100;
			let time_500h = tfrom + 1000000000 * 3600 * 500;
			let time_1000h = tfrom + 1000000000 * 3600 * 1000;
			
			this.data.timeEfficiencies = await influxquery(`
				SELECT efficiency FROM "${ props.measurementName }" WHERE time > ${ time_1h } ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${ props.measurementName }" WHERE time > ${ time_24h } ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${ props.measurementName }" WHERE time > ${ time_100h } ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${ props.measurementName }" WHERE time > ${ time_500h } ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${ props.measurementName }" WHERE time > ${ time_1000h } ORDER BY time ASC LIMIT 1;
			`, db, props.db ).then( ( results ) => {
			
				return results.map( ( result ) => {

					if( ! result.series ) {
						return;
					}

					return Math.round( 100 * result.series[ 0 ].values[ 0 ][ 1 ] ) / 100;
				} );

			});

			let jvQuery = jvCfg.map( time => `SELECT * FROM "${ props.measurementName }_iv" WHERE time='${ time }'` ).join( ";" );

			if( jvQuery.length > 0 ) {

				this.data.jv = await influxquery( jvQuery, db, props.db ).then( ( results ) => {
				
					return results.map( ( result, index ) => {


						if( ! result.series ) {
							return;
						}
						
						let jv = result.series[ 0 ].values[ 0 ][ 1 ].replace('"', '').split(',');
						let waveform = Graph.newWaveform();
						
						for( var i = 0; i < jv.length; i += 2 ) {
							waveform.append( parseFloat( jv[ i ] ), parseFloat( jv[ i + 1 ] ) );
						}

					    var power = waveform.duplicate().math( ( y, x ) => y * x );

						return {
							time: result.series[ 0 ].values[ 0 ][ 0 ],
							ellapsed: Math.round( ( new Date( result.series[ 0 ].values[ 0 ][ 0 ] ) - new Date( timefrom ) ) / 1000 / 3600 * 10 ) / 10,
							waveform: waveform,
							waveInfo: getIVParameters( waveform, power, parseFloat( this.props.cellInfo.cellArea ), result.series[ 0 ].values[ 0 ][ 2 ] * 1000, true )
						}
					} );

				});
			} else {

				this.data.jv = [];
			}

			
		});
	}

	render() {	 


		return (
				
			<div ref={ el => this.dom = el } className="container-fluid">

				<div className="row">
					<div className="col-xs-4">

						<div className="logos">
							<img src="images/logo_client.png" width="120" />
							<div className="pull-right">
								<img src="images/logo.png" width="120" />
							</div>
						</div>
						<h3>
							Device name: &nbsp;
							<strong>{ this.props.cellInfo.cellName }</strong>
						</h3>

						<h4>Timing</h4>
						<div className="row">
							<div className="col-xs-4">Start date: </div><div className="col-xs-5 info">{ !!this.state.data && !! this.state.data.start_date && toDate( this.state.data.start_date ) }</div>
						</div>
						
						<div className="row">
							<div className="col-xs-4">End date: </div><div className="col-xs-5 info">{ !!this.state.data && !! this.state.data.end_date && toDate( this.state.data.end_date ) }</div>
						</div>

						<div className="row">
							<div className="col-xs-4">Ageing time: </div><div className="col-xs-5 info">{ !!this.state.data &&  !! this.state.data.ellapsed && this.state.data.ellapsed } hours</div>
						</div>
						

						<h4>Device parameters</h4>

						<div className="row">
							<div className="col-xs-4">Cell active area: </div><div className="col-xs-5 info">{ this.props.cellInfo.cellArea } cm<sup>2</sup></div>
						</div>

						<div className="row">
							<div className="col-xs-4">Comment: </div><div className="col-xs-5">{ this.props.config.comment }</div>
						</div>
	

						<h4>Power conversion efficiencies</h4>

						<div className="row">
							<div className="col-xs-4">Highest efficiency: </div><div className="col-xs-5 info">{ !!this.state.data && this.state.data.maxEfficiency }%</div>
						</div>	
						{!! this.state.data && !! this.state.data.timeEfficiencies && [					
							( this.state.data.timeEfficiencies[ 0 ] ? <div className="row"><div className="col-xs-4">Efficiency after 1h:</div><div className="col-xs-5 info">{ this.state.data.timeEfficiencies[ 0 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 1 ] ? <div className="row"><div className="col-xs-4">Efficiency after 24h:</div><div className="col-xs-5 info">{ this.state.data.timeEfficiencies[ 1 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 2 ] ? <div className="row"><div className="col-xs-4">Efficiency after 100h:</div><div className="col-xs-5 info">{ this.state.data.timeEfficiencies[ 2 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 3 ] ? <div className="row"><div className="col-xs-4">Efficiency after 500h:</div><div className="col-xs-5 info">{ this.state.data.timeEfficiencies[ 3 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 4 ] ? <div className="row"><div className="col-xs-4">Efficiency after 1'000h:</div><div className="col-xs-5 info">{ this.state.data.timeEfficiencies[ 4 ] }%</div></div> : '' )
						] }
						<div className="row"><div className="col-xs-4">Final efficiency: </div><div className="col-xs-5 info">{ !!this.state.data && this.state.data.finalEfficiency }%</div></div>

						<h4>j-V sweeps</h4>	
						<div id="ivTable">
							<div className="row ivData" id="ivHead">
								<div className="col-xs-3">Time<br /><nobr>(h)</nobr></div>
								<div className="col-xs-1">V<sub>oc</sub><br /><nobr>(V)</nobr></div>
								<div className="col-xs-1">J<sub>sc</sub><br /><nobr>(mA cm<sup>-2</sup>)</nobr></div>
								<div className="col-xs-1">P<sub>out</sub><br /><nobr>(mW cm<sup>-2</sup>)</nobr></div>
								<div className="col-xs-1">P<sub>in</sub><br /><nobr>(mW cm<sup>-2</sup>)</nobr></div>
								<div className="col-xs-1">Fill factor<br /><nobr>(%)</nobr></div>
								<div className="col-xs-1">PCE<br /><nobr>(%)</nobr></div>
							</div>

							{
								!! this.state.data && !! this.state.data.jv && this.state.data.jv.map( ( jv, index ) => {
									
									if( index > 4 ) {
										return null;
									}

									return ( 

									<div className="row ivData">
										<div className="col-xs-3">{ jv.ellapsed } h</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.voc ) ? 'N/A' :  jv.waveInfo.voc.toPrecision( 3 ) }</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.jsc ) ? 'N/A' : jv.waveInfo.jsc.toPrecision( 3 ) }</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.power ) ? 'N/A' :  jv.waveInfo.power.toPrecision( 3 ) }</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.powerin ) ? 'N/A' :  ( jv.waveInfo.powerin / 10 ).toPrecision( 3 ) }</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.ff ) ? 'N/A' : jv.waveInfo.ff.toPrecision( 2 ) }</div>
										<div className="col-xs-1">{ isNaN( jv.waveInfo.pce ) ? 'N/A' : jv.waveInfo.pce.toPrecision( 3 ) }</div>
									</div> 
									);
								} )


							}
						</div>

						<div ref={ el => this.domJV = el }></div>

					</div>	
					<div className="col-xs-5">

						{
							graphsCfg.map( g => <div className={ this.props.config && this.props.config[ g.graphRef ] ? 'show' : 'hidden' } key={ g.graphRef } ref={ el => this.graphsRefs[ g.graphRef ] = el } /> )
						}

					</div>
				</div>
				<div className="row footer">
				<div className="pull-right">Generated on : { new Date().toString() } </div>&copy; Candlelight systems ltd. 
				</div>
			</div>
		);
	}
}

export default HTMLReport;