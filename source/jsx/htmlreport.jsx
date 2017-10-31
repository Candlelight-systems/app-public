import React from 'react';
import fs from 'fs';
import { query as influxquery } from "./influx";
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import htmlToPDF from 'html-pdf';
import { getIVParameters } from '../../app/util/iv'
import { ipcRenderer } from 'electron';
const { dialog }  = require('electron').remote;
	

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

const jvColors = [
	"#9f1616",
	"#9f8016",
	"#8a9f16",
	"#169f3a",
	"#16949f",
	"#16409f"
];

class HTMLReport extends React.Component {
	
	constructor( props ) {
		super( props );
		this.state = {
			
		};
//		this.savePDF = this.savePDF.bind( this );

	}

	close() {
		this.props.onClose();
	}


	componentWillUnmount() {
		ipcRenderer.removeListener( "savePDF", this.savePDF );
	}

	updateGraphStability( data ) {

		if( ! this.graphStability || ! data ) {
			return;
		}

		let numGraphs = 4;
		if( this.props.config.humidity ) {
			numGraphs++;
		}
		if( this.props.config.temperature ) {
			numGraphs++;
		}

		const graph = this.graphStability;
		const span = 1 / ( numGraphs + 1 );

		graph.resize( 650, 750 );

		graph.getBottomAxis()
				.setLabel("Time")
				.setUnit("h")
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setNbTicksSecondary( 0 );

		graph.getLeftAxis( 0 )
				.setLabel("Efficiency")
				.setUnit("%")
				.setSpan( 1 - 2 * span, 1.00 - 0 * span )
				.setUnitWrapper("(", ")")
				.forceMin( 0 )
				.setLineAt( [ 0 ] )
				.setNbTicksSecondary( 5 );

		graph.newSerie("efficiency").setLabel("PCE").autoAxis().setYAxis( graph.getLeftAxis( 0 ) ).setLineColor("#1f1fae").setLineWidth(2).setWaveform( data.efficiency );
		
		graph.getLeftAxis( 1 )
				.setLabel("Vmpp")
				.setUnit("V")
				.setSpan( 1 - 3 * span, 1.00 - 2 * span - 0.01 )
				.setUnitWrapper("(", ")")
				.setLineAt( [ 0 ] )
				.forceMin( 0 )
				.setNbTicksSecondary( 5 );

		graph.newSerie("Voltage").autoAxis().setYAxis( graph.getLeftAxis( 1 ) ).setLineColor("#1f8eae").setLineWidth(2).setWaveform( data.voltage );
		
		graph.getLeftAxis( 2 )
				.setLabel("Jmpp")
				.setUnit("A")
				.setSpan( 1 - 4 * span, 1.00 - 3 * span - 0.01 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.forceMin( 0 )
				.setScientific( true )
				.setUnitDecade( true )
				.setLineAt( [ 0 ] )
				.setNbTicksSecondary( 5 );

		graph.newSerie("Current").autoAxis().setYAxis( graph.getLeftAxis( 2 ) ).setLineColor("#1fae76").setLineWidth(2).setWaveform( data.current );
		
		graph.getLeftAxis( 3 )
				.setLabel("Irradiance")
				.setUnit("mW cm^-2")
				.setSpan( 1 - 5 * span, 1.00 - 4 * span - 0.01 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.forceMin( 0 )
				.setLineAt( [ 0 ] )
				.setNbTicksSecondary( 0 );

		graph.newSerie("sun").autoAxis().setLabel("Sun").setYAxis( graph.getLeftAxis( 3 ) ).setLineColor("#7aae1f").setLineWidth(2).setWaveform( data.sun );
		
		if( this.props.config.humidity ) {
			
			graph.getLeftAxis( 4 )
					.setLabel("Humid.")
					.setUnit("%")
					.setSpan( 1 - 6 * span, 1.00 - 5 * span - 0.01 )
					.setUnitWrapper("(", ")")
					.gridsOff()
					.forceMin( 0 )
					.forceMax( 100 )
					.setLineAt( [ 0 ] )
					.setNbTicksSecondary( 0 );

			graph.newSerie("humidity").autoAxis().setLabel("Hum.").setYAxis( graph.getLeftAxis( 4 ) ).setLineColor("#ae9b1f").setLineWidth(2).setWaveform( data.humidity );
		}


		if( this.props.config.temperature ) {
				
			graph.getLeftAxis( 5 )
					.setLabel("Temp.")
					.setUnit("°C")
					.setSpan( 1 - 7 * span, 1.00 - 6 * span - 0.01 )
					.setUnitWrapper("(", ")")
					.gridsOff()
					.forceMin( 0 )
					.forceMax( 90 )
					.setLineAt( [ 0 ] )
					.setNbTicksSecondary( 0 );

			graph.newSerie("temperature").autoAxis().setLabel("Temp.").setYAxis( graph.getLeftAxis( 5 ) ).setLineColor("#ae441f").setLineWidth(2).setWaveform( data.temperature );
		}

		graph.makeLegend( { isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 } ).setAutoPosition( "bottom" );
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();

	}



	updateGraphJV( data ) {


		if( ! this.graphJV || ! data  ) {
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
				.setLineColor( jvColors[ index ] )
				.setLineWidth(2)
				.setWaveform( jv.waveform );
		} );

		graph.makeLegend( { isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 } ).setAutoPosition( "bottom" );
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();
	}




	componentDidMount() {
		this.updateProps( this.props );
		ipcRenderer.on( "savePDF", this.savePDF );

	}

	componentWillReceiveProps( nextProps ) {

		this.updateProps( nextProps );
	}

	async updateProps( props = this.props ) {

		let data = await this.getTrackData( props );

		if( ! data ) {
			return;
		}

		while( this.domStability.firstChild ) {
			this.domStability.removeChild( this.domStability.firstChild );
		}

		while( this.domJV.firstChild ) {
			this.domJV.removeChild( this.domJV.firstChild );
		}


		this.graphStability = new Graph( this.domStability, { 
			fontSize: 9, 
			paddingTop: 5, 
			paddingLeft: 5, 
			paddingRight: 5, 
			paddingBottom: 0 
		} );

		this.graphJV = new Graph( this.domJV, { 
			fontSize: 9, 
			paddingLeft: 0, 
			paddingRight: 0, 
			paddingTop: 10, 
			paddingBottom: 0,
			plugins: {
				'makeTracesDifferent': {}
			}
		} );

		this.updateGraphStability( data );
		this.updateGraphJV( data );

			this.setState( { data: data } );
	}


	getIVInformation() {
		return null;
	}

	getTrackData( props = this.props ) {

		if( ! props.measurementName ) {
			return;
		}

		var db = props.db.db;
		let jvCfg = props.config.jv || [];

			
		return influxquery("SELECT time,efficiency FROM \"" + props.measurementName + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + props.measurementName + "\" ORDER BY time DESC limit 1;", db, props.db ).then( async ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + props.measurementName + " or no associated data";
			}

			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timeDifference = ( new Date( timeto ) - new Date( timefrom ) ) / 1000,
				grouping = Math.max( 1, Math.round( timeDifference / 1000 ) );

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
					waveVoltage = Graph.newWaveform(),
					waveCurrent = Graph.newWaveform(),
					waveSun = Graph.newWaveform(),
					waveTemperature = Graph.newWaveform(),
					waveHumidity = Graph.newWaveform();

				waveEfficiency.setUnit("%");
				waveEfficiency.setXUnit("h");
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
						offset = date.getTime();
						time = 0;
					} else {
						time = ( date.getTime() - offset ) / 1000 / 3600;
					}

					if( value[ 1 ] > 35 || value[ 1 ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
						value[ 1 ] = NaN;
						value[ 2 ] = NaN;
					}

					waveEfficiency.append( time, value[ 1 ] );					
					waveVoltage.append( time, value[ 2 ] );					
					waveCurrent.append( time, value[ 3 ] );

					waveSun.append( time, value[ 4 ] );
					waveHumidity.append( time, value[ 5 ] );
					waveTemperature.append( time, value[ 6 ] );		

					maxEfficiency = Math.max( maxEfficiency, value[ 7 ] );
				} );

				finalEfficiency = values[ values.length - 1 ][ 7 ];

				return {
					efficiency: waveEfficiency,
					voltage: waveVoltage,
					current: waveCurrent,
					sun: waveSun,
					temperature: waveTemperature, 
					humidity: waveHumidity,

					maxEfficiency: Math.round( 100 * maxEfficiency ) / 100,
					finalEfficiency: Math.round( 100 * finalEfficiency ) / 100,
					ellapsed: Math.round( 10 * timeDifference / 3600 ) / 10, // in hours
					start_date: new Date( timefrom ),
					end_date: new Date( timeto )
				};
			});



			let tfrom = new Date( timefrom ).getTime() * 1000000;

			let time_1h = tfrom + 1000000000 * 3600;
			let time_24h = tfrom + 1000000000 * 3600 * 24;
			let time_100h = tfrom + 1000000000 * 3600 * 100;
			let time_500h = tfrom + 1000000000 * 3600 * 500;
			let time_1000h = tfrom + 1000000000 * 3600 * 1000;
			
			toReturn.timeEfficiencies = await influxquery(`
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

				toReturn.jv = await influxquery( jvQuery, db, props.db ).then( ( results ) => {
				
					return results.map( ( result, index ) => {


						if( ! result.series ) {
							return;
						}
						
						if( index > 4 ) {
							return null;
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

				toReturn.jv = [];
			}

			return toReturn;

		});
	}

	render() {	 

		return (
				
			<div ref={ el => this.dom = el } className="container-fluid">

				<div className="row">
					<div className="col-xs-6">

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
							<div className="col-xs-7">Start date: </div><div className="col-xs-7 info">{ !!this.state.data && toDate( this.state.data.start_date ) }</div>
						</div>
						
						<div className="row">
							<div className="col-xs-7">End date: </div><div className="col-xs-7 info">{ !!this.state.data && toDate( this.state.data.end_date ) }</div>
						</div>

						<div className="row">
							<div className="col-xs-7">Ageing time: </div><div className="col-xs-7 info">{ !!this.state.data && this.state.data.ellapsed } hours</div>
						</div>
						

						<h4>Device parameters</h4>

						<div className="row">
							<div className="col-xs-7">Cell active area: </div><div className="col-xs-7  info">{ this.props.cellInfo.cellArea } cm<sup>2</sup></div>
						</div>

						<div className="row">
							<div className="col-xs-7">Comment: </div><div className="col-xs-7">{ this.props.config.comment }</div>
						</div>
	

						<h4>Power conversion efficiencies</h4>

						<div className="row">
							<div className="col-xs-7">Highest efficiency: </div><div className="col-xs-7 info">{ !!this.state.data && this.state.data.maxEfficiency }%</div>
						</div>	
						{!! this.state.data && !! this.state.data.timeEfficiencies && [					
							( this.state.data.timeEfficiencies[ 0 ] ? <div className="row"><div className="col-xs-7">Efficiency after 1h:</div><div className="col-xs-7 info">{ this.state.data.timeEfficiencies[ 0 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 1 ] ? <div className="row"><div className="col-xs-7">Efficiency after 24h:</div><div className="col-xs-7 info">{ this.state.data.timeEfficiencies[ 1 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 2 ] ? <div className="row"><div className="col-xs-7">Efficiency after 100h:</div><div className="col-xs-7 info">{ this.state.data.timeEfficiencies[ 2 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 3 ] ? <div className="row"><div className="col-xs-7">Efficiency after 500h:</div><div className="col-xs-7 info">{ this.state.data.timeEfficiencies[ 3 ] }%</div></div> : '' ),
							( this.state.data.timeEfficiencies[ 4 ] ? <div className="row"><div className="col-xs-7">Efficiency after 1'000h:</div><div className="col-xs-7 info">{ this.state.data.timeEfficiencies[ 4 ] }%</div></div> : '' )
						] }
						<div className="row"><div className="col-xs-7">Final efficiency: </div><div className="col-xs-7 info">{ !!this.state.data && this.state.data.finalEfficiency }%</div></div>

						<h4>j-V sweeps</h4>	
						<div className="row ivData ivHead">
							<div className="col-xs-3">Time<br /><nobr>(h)</nobr></div>
							<div className="col-xs-2">V<sub>oc</sub><br /><nobr>(V)</nobr></div>
							<div className="col-xs-2">J<sub>sc</sub><br /><nobr>(mA cm<sup>-2</sup>)</nobr></div>
							<div className="col-xs-2">P<sub>out</sub><br /><nobr>(mW cm<sup>-2</sup>)</nobr></div>
							<div className="col-xs-2">P<sub>in</sub><br /><nobr>(mW cm<sup>-2</sup>)</nobr></div>
							<div className="col-xs-2">Fill factor<br /><nobr>(%)</nobr></div>
							<div className="col-xs-2">PCE<br /><nobr>(%)</nobr></div>
						</div>

						{
							!! this.state.data && !! this.state.data.jv && this.state.data.jv.map( ( jv, index ) => {
								
								if( index > 4 ) {
									return null;
								}

								return ( 

								<div className="row ivData">
									<div className={ "col-xs-3 color-series-style-" + index }>{ jv.ellapsed } h</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.voc ) ? 'N/A' :  jv.waveInfo.voc.toPrecision( 3 ) }</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.jsc ) ? 'N/A' : jv.waveInfo.jsc.toPrecision( 3 ) }</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.power ) ? 'N/A' :  jv.waveInfo.power.toPrecision( 3 ) }</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.powerin ) ? 'N/A' :  ( jv.waveInfo.powerin / 10 ).toPrecision( 3 ) }</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.ff ) ? 'N/A' : jv.waveInfo.ff.toPrecision( 2 ) }</div>
									<div className={ "col-xs-2 color-series-style-" + index }>{ isNaN( jv.waveInfo.pce ) ? 'N/A' : jv.waveInfo.pce.toPrecision( 3 ) }</div>
								</div> 
								);
							} )


						}

						<div ref={ el => this.domJV = el }></div>

					</div>	
					<div className="col-xs-9" ref={ el => this.domStability = el }></div>
				</div>
				<div className="row footer">
				<div className="pull-right">Generated on : { new Date().toString() } </div>&copy; Candlelight systems ltd. 
				</div>
			</div>
		);
	}
}

export default HTMLReport;