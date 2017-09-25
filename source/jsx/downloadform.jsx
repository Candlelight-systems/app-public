import React from 'react';
const {dialog} = require('electron').remote;
import fs from 'fs';
import { CSVBuilder, ITXBuilder } from "../../app/util/filebuilder"
import { query as influxquery } from "./influx";
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import svgToPDF from "../../app/util/svgToPDF"
import PDFDocument from 'pdfkit'
import { ipcRenderer } from "electron";

class DownloadForm extends React.Component {
	

	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.downloadTrack = this.downloadTrack.bind( this );
		this.downloadIV = this.downloadIV.bind( this );
		this.downloadVocJsc = this.downloadVocJsc.bind( this );
		this.downloadPDF = this.downloadPDF.bind( this );
		this.close = this.close.bind( this );
		this.state = {
			dl_format: 'itx'
		};
	}

	close() {
		this.props.onClose();
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}

	componentWillReceiveProps( nextProps ) {

	}

	componentDidMount() {

	}

	async downloadTrack() {

		let data = await this.getTrackData();

		var outputfile;

		if( this.state.dl_format == "itx" ) {
			outputfile = new ITXBuilder();	
		} else {
			outputfile = new CSVBuilder();	
		}
		
		outputfile.addWaveform( data.efficiency, { 
			waveName: "Efficiency",
			waveNameX: "Time_h"
		} );

		outputfile.addWaveform( data.voltage, { 
			waveName: "Voltage",
			noXWave: true
		} );

		outputfile.addWaveform( data.current, { 
			waveName: "Current",
			noXWave: true
		} );

		outputfile.addWaveform( data.temperature, { 
			waveName: "Temperature",
			noXWave: true
		} );

		outputfile.addWaveform( data.sun, { 
			waveName: "Sun",
			noXWave: true
		} );

		outputfile.addWaveform( data.humidity, { 
			waveName: "Humidity",
			noXWave: true
		} );

		dialog.showSaveDialog( {

			message: "Save the tracking data for the cell \"" + this.props.cellInfo.cellName + "\"",
			defaultPath: "~/" + this.props.cellInfo.cellName + "_track.itx"

		}, ( fileName ) => {

			console.log( fileName );	
			fs.writeFileSync(fileName, outputfile.build() );
		});
	}


	plotMPPT( data ) {

		let graph, serie;
		graph = this.newTimeGraph();
		graph.getLeftAxis( 0 )
				.setLabel("Efficiency")
				.setUnit("%")
				.setSpan( 0.75, 1.00 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setLineAt( [ 0 ] );

		graph.newSerie("efficiency").setLabel("PCE").autoAxis().setYAxis( graph.getLeftAxis( 0 ) ).setLineColor("#1f1fae").setLineWidth(2).setWaveform( data.efficiency );
		
		graph.getLeftAxis( 1 )
				.setLabel("Vmpp")
				.setUnit("V")
				.setSpan( 0.6, 0.73 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setLineAt( [ 0 ] );

		graph.newSerie("Voltage").autoAxis().setYAxis( graph.getLeftAxis( 1 ) ).setLineColor("#1f8eae").setLineWidth(2).setWaveform( data.voltage );
		
		graph.getLeftAxis( 2 )
				.setLabel("Jmpp")
				.setUnit("A")
				.setSpan( 0.45, 0.58 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.setScientific( true )
				.setUnitDecade( true )
				.setLineAt( [ 0 ] );


		graph.newSerie("Current").autoAxis().setYAxis( graph.getLeftAxis( 2 ) ).setLineColor("#1fae76").setLineWidth(2).setWaveform( data.current );
		
		graph.getLeftAxis( 3 )
				.setLabel("Sun")
				.setUnit("-")
				.setSpan( 0.3, 0.43 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.forceMin( 0 )
				.setLineAt( [ 0 ] );

		graph.newSerie("sun").autoAxis().setLabel("Sun").setYAxis( graph.getLeftAxis( 3 ) ).setLineColor("#7aae1f").setLineWidth(2).setWaveform( data.sun );
		
		graph.getLeftAxis( 4 )
				.setLabel("Humidity")
				.setUnit("%")
				.setSpan( 0.15, 0.28 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.forceMin( 0 )
				.forceMax( 100 )
				.setLineAt( [ 0 ] );

		graph.newSerie("humidity").autoAxis().setLabel("Hum.").setYAxis( graph.getLeftAxis( 4 ) ).setLineColor("#ae9b1f").setLineWidth(2).setWaveform( data.humidity );
		
		graph.getLeftAxis( 5 )
				.setLabel("Temperature")
				.setUnit("°C")
				.setSpan( 0.0, 0.13 )
				.setUnitWrapper("(", ")")
				.gridsOff()
				.forceMin( 0 )
				.forceMax( 90 )
				.setLineAt( [ 0 ] );

		graph.newSerie("temeprature").autoAxis().setLabel("Temp.").setYAxis( graph.getLeftAxis( 5 ) ).setLineColor("#ae441f").setLineWidth(2).setWaveform( data.temperature );
		
		graph.makeLegend().setAutoPosition( "bottom" );
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();

		return svgToPDF( graph.getWrapper(), 600, 600 ).then( results => {

			this.emptyFakeGraph();
			return results;
		} );
	}

	newTimeGraph() {
		let graph = new Graph( this.fakeDom );
		graph.resize( 600, 600 );
		graph.getBottomAxis()
				.setLabel("Time")
				.setUnit("h")
				.setUnitWrapper("(", ")")
				.gridsOff();
				

		return graph;
	}

	emptyFakeGraph() {
		while( this.fakeDom.firstChild ) {
			this.fakeDom.removeChild( this.fakeDom.firstChild );
		}
	}

	getTrackData( getEfficiencyAtIntervals ) {

		var db = this.props.db.db;

		return influxquery("SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time DESC limit 1;", db, this.props.db ).then( async ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + this.props.measurementName + " or no associated data";
			}

			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timeDifference = ( new Date( timeto ) - new Date( timefrom ) ) / 1000,
				grouping = Math.max( 1, Math.round( timeDifference / 1000 ) );

			let toReturn = await influxquery("SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff FROM \"" + this.props.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;", db, this.props.db ).then( ( results ) => {
	
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

				waveSun.setUnit("-");
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

					maxEfficiency: maxEfficiency,
					finalEfficiency: finalEfficiency,
					ellapsed: timeDifference / 3600 // in hours
				};
			});



			if( getEfficiencyAtIntervals ) {

				let tfrom = new Date( timefrom ).getTime() * 1000000;

				let time_1h = tfrom + 1000000000 * 3600;
				let time_24h = tfrom + 1000000000 * 3600 * 24;
				let time_100h = tfrom + 1000000000 * 3600 * 100;
				let time_500h = tfrom + 1000000000 * 3600 * 500;
				let time_1000h = tfrom + 1000000000 * 3600 * 1000;
				
				toReturn.timeEfficiencies = await influxquery(`
					SELECT efficiency FROM "${ this.props.measurementName }" WHERE time > ${ time_1h } ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${ this.props.measurementName }" WHERE time > ${ time_24h } ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${ this.props.measurementName }" WHERE time > ${ time_100h } ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${ this.props.measurementName }" WHERE time > ${ time_500h } ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${ this.props.measurementName }" WHERE time > ${ time_1000h } ORDER BY time ASC LIMIT 1;
				`, db, this.props.db ).then( ( results ) => {
				
					return results.map( ( result ) => {

						if( ! result.series ) {
							return;
						}

						return result.series[ 0 ].values[ 0 ][ 1 ];
					} );

				});
			}

			return toReturn;

		});
	}

	downloadVocJsc() {

	}

	downloadIV() {

	}

	async downloadPDF() {

		ipcRenderer.send( "htmlReport", this.props.cellInfo, this.props.instrumentId, this.props.chanId, this.props.measurementName );
	
	}

	render() {	 

		return (
	
			<div className="container-fluid">
				<form onSubmit={ this.submit } className="form-horizontal">

						<h3>Download data for channel { this.props.cellInfo.cellName } ( channel { this.props.chanId } )</h3>

						<div className="form-group">
							<label className="col-sm-3">Format</label>
							<div className="col-sm-9">
								<select name="dl_track_format" id="dl_format" className="form-control" value={this.state.dl_format} onChange={this.handleInputChange}>
									<option value="csv">Comma separated (.csv)</option>
									<option value="itx">Igor text file (.itx)</option>
								</select>
							</div>
						</div>

						<h4>Tracking data</h4>
						
						<div className="form-group">
							<label className="col-sm-3">Number of points</label>
							<div className="col-sm-9">
								<select name="dl_track_nb" id="dl_track_nb" className="form-control" value={this.state.dl_track_nb} onChange={this.handleInputChange}>
									<option value="100">100</option>
									<option value="300">300</option>
									<option value="1000">1000</option>
									<option value="3000">3000</option>
									<option value="10000">10000</option>
								</select>
							</div>
						</div>


						<div className="form-group">
							<label className="col-sm-3">Humidity</label>
							<div className="col-sm-9 checkbox">
								<label>
									<input type="checkbox" name="dl_track_humidity" checked={ !! this.state.dl_track_humidity } onChange={ this.handleInputChange } />
								</label>
							</div>
						</div>


						<div className="form-group">
							<label className="col-sm-3">Cell temperature</label>
							<div className="col-sm-9 checkbox">
								<label>
									<input type="checkbox" name="dl_track_celltemp" checked={ !! this.state.dl_track_celltemp } onChange={ this.handleInputChange } />
								</label>
							</div>
						</div>


						<div className="form-group">
							<label className="col-sm-3">Box temperature</label>
							<div className="col-sm-9 checkbox">
								<label>
									<input type="checkbox" name="dl_track_boxtemp" checked={ !! this.state.dl_track_boxtemp } onChange={ this.handleInputChange } />
								</label>
							</div>
						</div>

						<div className="form-group">
							
							<div className="col-sm-9">
								<button  className="btn btn-primary"  type="button" onClick={ this.downloadTrack }>Download</button>
							</div>
							<div className="col-sm-9">
								<button  className="btn btn-primary"  type="button" onClick={ this.downloadPDF }>Make PDF</button>
							</div>
						</div>


						<h4>V<sub>oc</sub> and J<sub>sc</sub></h4>


						<div className="form-group">
							
							<div className="col-sm-9">
								<button  className="btn btn-primary"  type="button" onClick={ this.downloadVocJsc }>Download</button>
							</div>
						</div>
						

						<h4>j-V curve data</h4>


						<div className="form-group">
							
							<div className="col-sm-9">
								<button className="btn btn-primary" type="button" onClick={ this.downloadIV }>Download</button>
							</div>
						</div>
						
						<div ref={ ( el ) => this.fakeDom = el } />
				</form>

				<div className="btn-group pull-right">
		          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
		      	</div>
			</div>
		);
	}
}

export default DownloadForm;