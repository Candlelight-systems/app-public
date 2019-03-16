import React from 'react';
const { dialog } = require('electron').remote;
import fs from 'fs';
import { CSVBuilder, ITXBuilder } from '../../app/util/filebuilder';
import { query as influxquery } from '../influx';
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import svgToPDF from '../../app/util/svgToPDF';
import PDFDocument from 'pdfkit';
import { ipcRenderer } from 'electron';

class DownloadForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeDownload = this.makeDownload.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      dl_format: 'itx',
      dl_track_nb: 100,
      error_track: false,
      error_vocjs: false,
      error_jv: false
    };
  }

  close() {
    this.props.onClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {}

  async makeDownload(track = true, jv = true, vocjsc = true) {
    let outputfile;

    if (this.state.dl_format == 'itx') {
      outputfile = new ITXBuilder();
    } else {
      outputfile = new CSVBuilder();
    }

    let fileappend = [];
    if (track) {
      await this.downloadTrack(outputfile);
      fileappend.push('track');
    }

    if (jv) {
      await this.downloadIV(outputfile);
      fileappend.push('jv');
    }

    if (vocjsc) {
      await this.downloadVocJsc(outputfile);
      fileappend.push('vocjsc');
    }

    dialog.showSaveDialog(
      {
        message:
          'Save the data for the cell "' + this.props.cellInfo.cellName + '"',
        defaultPath: `~/${this.props.cellInfo.cellName}_${fileappend.join(
          '_'
        )}.${this.state.dl_format}`
      },
      fileName => {
        fs.writeFileSync(fileName, outputfile.build());
      }
    );
  }

  async downloadTrack(outputfile) {
    let data;
    try {
      data = await this.getTrackData();
    } catch (e) {
      this.setState({ error_track: true });
      console.error(e);
      return;
    }

    outputfile.addWaveform(data.date, {
      waveName: 'Date'
    });

    outputfile.addWaveform(data.efficiency, {
      waveName: 'Efficiency',
      waveNameX: 'Time_MPP_h'
    });

    outputfile.addWaveform(data.power, {
      waveName: 'Power',
      noXWave: true
    });

    outputfile.addWaveform(data.voltage, {
      waveName: 'Voltage',
      noXWave: true
    });

    outputfile.addWaveform(data.current, {
      waveName: 'Current',
      noXWave: true
    });

    outputfile.addWaveform(data.temperature, {
      waveName: 'Temperature',
      noXWave: true
    });

    outputfile.addWaveform(data.sun, {
      waveName: 'Sun',
      noXWave: true
    });

    outputfile.addWaveform(data.humidity, {
      waveName: 'Humidity',
      noXWave: true
    });
  }

  async downloadVocJsc(outputfile) {
    let data;

    try {
      data = await this.getVocJscData();
    } catch (e) {
      this.setState({ error_vocjs: true });
      console.error(e);
      return;
    }

    outputfile.addWaveform(data.waveVoc, {
      waveName: 'Voc',
      waveNameX: 'Time_voc_h'
    });

    outputfile.addWaveform(data.waveJsc, {
      waveName: 'Jsx',
      waveNameX: 'Time_jsc_h'
    });
  }

  async downloadIV(outputfile) {
    let data;
    try {
      data = await this.getJVData();
    } catch (e) {
      this.setState({ error_jv: true });
      console.error(e);
      return;
    }
    data[0].map(data => {
      if (!data.wave) {
        return;
      }

      outputfile.addWaveform(data.wave, {
        waveName: 'Current_' + data.time_h + 'h',
        waveNameX: 'Voltage_' + data.time_h + 'h'
      });
    });
  }
  /*
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

		graph.newSerie("temperature").autoAxis().setLabel("Temp.").setYAxis( graph.getLeftAxis( 5 ) ).setLineColor("#ae441f").setLineWidth(2).setWaveform( data.temperature );

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
	}*/

  getTrackData(getEfficiencyAtIntervals) {
    var db = this.props.db.db;

    return influxquery(
      'SELECT time,efficiency FROM "' +
        encodeURIComponent(this.props.measurementName) +
        '" ORDER BY time ASC limit 1;SELECT time,efficiency FROM "' +
        encodeURIComponent(this.props.measurementName) +
        '" ORDER BY time DESC limit 1;',
      db,
      this.props.db
    ).then(async results => {
      if (!results[0].series) {
        throw 'No measurement with the name ' +
          encodeURIComponent(this.props.measurementName) +
          ' or no associated data';
      }

      let timefrom = results[0].series[0].values[0][0],
        timeto = results[1].series[0].values[0][0],
        timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000;

let query;
      if( this.state.dl_track_nb == 'all' ) {

        query = `SELECT efficiency, voltage_mean, current_mean, humidity, sun, temperature_junction, efficiency, power_mean, temperature_base FROM
        "${ encodeURIComponent(this.props.measurementName) }"
        WHERE time >= '${ timefrom }' and time <= '${ timeto }' ORDER BY time ASC`;

      } else {
        const grouping = Math.max(1, Math.round(timeDifference / parseInt( this.state.dl_track_nb ) ) );
        query = `SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff, MEAN(power_mean) as pMean, MEAN(temperature_base) as tMean2 FROM
        "${ encodeURIComponent(this.props.measurementName) }"
        WHERE time >= '${ timefrom }' and time <= '${ timeto }' GROUP BY time(${ grouping }s) FILL(none) ORDER BY time ASC`;
      }

      let toReturn = await influxquery(
        query,
        db,
        this.props.db
      ).then(results => {
        let values = results[0].series[0].values,
          offset,
          waveDate = Graph.newWaveform(),
          waveEfficiency = Graph.newWaveform(),
          waveVoltage = Graph.newWaveform(),
          waveCurrent = Graph.newWaveform(),
          wavePower = Graph.newWaveform(),
          waveSun = Graph.newWaveform(),
          waveTemperature = Graph.newWaveform(),
          waveHumidity = Graph.newWaveform();

        waveEfficiency.setUnit('%');
        waveEfficiency.setXUnit('h');
        waveVoltage.setUnit('V');
        wavePower.setUnit('W');
        waveCurrent.setUnit('mA cm-2');

        waveSun.setUnit('-');
        waveTemperature.setUnit('°C');
        waveHumidity.setUnit('%');

        let maxEfficiency = 0;
        let finalEfficiency = 0;

        values.forEach((value, index) => {
          let date = new Date(value[0]),
            time;

          if (index == 0) {
            offset = date.getTime();
            time = 0;
          } else {
            time = (date.getTime() - offset) / 1000 / 3600;
          }

          /*if( value[ 1 ] > 35 || value[ 1 ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
						value[ 1 ] = NaN;
						value[ 2 ] = NaN;
					}*/

          waveDate.append(
            time,
            date.getDate() +
              '.' +
              date.getMonth() +
              '.' +
              date.getFullYear() +
              ' ' +
              date.getHours() +
              ':' +
              date.getMinutes() +
              ':' +
              date.getSeconds()
          );
          waveEfficiency.append(time, value[1]);
          waveVoltage.append(time, value[2]);
          waveCurrent.append(time, value[3]);
          wavePower.append(time, value[8]);
          waveHumidity.append(time, value[4]);
          waveSun.append(time, value[5]);

          if (value[6] !== null) {
            waveTemperature.append(time, value[6]);
          } else if (value[9] !== null) {
            waveTemperature.append(time, value[9]);
          }

          maxEfficiency = Math.max(maxEfficiency, value[7]);
        });

        finalEfficiency = values[values.length - 1][7];

        return {
          efficiency: waveEfficiency,
          voltage: waveVoltage,
          current: waveCurrent,
          sun: waveSun,
          temperature: waveTemperature,
          humidity: waveHumidity,
          power: wavePower,
          date: waveDate,

          maxEfficiency: maxEfficiency,
          finalEfficiency: finalEfficiency,
          ellapsed: timeDifference / 3600 // in hours
        };
      });

      if (getEfficiencyAtIntervals) {
        let tfrom = new Date(timefrom).getTime() * 1000000;

        let time_1h = tfrom + 1000000000 * 3600;
        let time_24h = tfrom + 1000000000 * 3600 * 24;
        let time_100h = tfrom + 1000000000 * 3600 * 100;
        let time_500h = tfrom + 1000000000 * 3600 * 500;
        let time_1000h = tfrom + 1000000000 * 3600 * 1000;

        toReturn.timeEfficiencies = await influxquery(
          `
					SELECT efficiency FROM "${encodeURIComponent(
            this.props.measurementName
          )}" WHERE time > ${time_1h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(
            this.props.measurementName
          )}" WHERE time > ${time_24h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(
            this.props.measurementName
          )}" WHERE time > ${time_100h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(
            this.props.measurementName
          )}" WHERE time > ${time_500h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(
            this.props.measurementName
          )}" WHERE time > ${time_1000h} ORDER BY time ASC LIMIT 1;
				`,
          db,
          this.props.db
        ).then(results => {
          return results.map(result => {
            if (!result.series) {
              return;
            }

            return result.series[0].values[0][1];
          });
        });
      }

      return toReturn;
    });
  }

  getVocJscData(getEfficiencyAtIntervals) {
    var db = this.props.db.db;

    let waveVoc = Graph.newWaveform(),
      waveJsc = Graph.newWaveform(),
      timefrom;

    return influxquery(
      `
			SELECT time,efficiency FROM "${encodeURIComponent(
        this.props.measurementName
      )}" ORDER BY time ASC limit 1;
			SELECT time,voc FROM "${encodeURIComponent(
        this.props.measurementName
      )}_voc" ORDER BY time ASC;
			SELECT time,jsc FROM "${encodeURIComponent(
        this.props.measurementName
      )}_jsc" ORDER BY time ASC;`,
      db,
      this.props.db
    ).then(async results => {
      results.map((results, index) => {
        if (index == 0) {
          timefrom = new Date(results.series[0].values[0][0]);
          return;
        }

        if (!results.series) {
          return [];
        }

        return results.series[0].values.map(value => {
          let date = new Date(value[0]),
            time =
              Math.round(
                ((date.getTime() - timefrom.getTime()) / 1000 / 3600) * 10
              ) / 10,
            val = value[1];

          if (index == 1) {
            waveVoc.append(time, val);
          } else if (index == 2) {
            waveJsc.append(time, val);
          }
        });
      });

      return {
        waveVoc: waveVoc,
        waveJsc: waveJsc
      };
    });
  }

  getJVData() {
    var db = this.props.db.db;

    let timefrom;

    return influxquery(
      `
			SELECT time,iv FROM "${encodeURIComponent(
        this.props.measurementName
      )}_iv" ORDER BY time ASC;`,
      db,
      this.props.db
    ).then(async results => {
      return results.map((results, index) => {
        if (!results.series) {
          return {};
        }

        if (index == 0) {
          timefrom = new Date(results.series[0].values[0][0]);
        }

        return results.series[0].values.map(value => {
          let date = new Date(value[0]),
            data = value[1].split(','),
            wave = Graph.newWaveform();

          for (let i = 0; i < data.length - 1; i += 2) {
            wave.append(
              parseFloat(data[i].replace('"', '')),
              parseFloat(data[i + 1].replace('"', ''))
            );
          }

          return {
            wave: wave,
            time_h:
              Math.round(
                ((date.getTime() - timefrom.getTime()) / 1000 / 3600) * 10
              ) / 10
          };
        });
      });
    });
  }

  async downloadPDF() {
    ipcRenderer.send(
      'htmlReport',
      this.props.cellInfo,
      this.props.chanId,
      this.props.measurementName,
      this.props.instrumentId
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={this.submit} className="form-horizontal">
          <h4>
            Download data for device "{this.props.cellInfo.cellName}"{' '}
            {this.props.chanId && <span>( channel {this.props.chanId} )</span>}
          </h4>

          {this.state.error_track ? (
            <div className="alert alert-warning">
              <strong>
                <span className="glyphicon glyphicon-warning" />
              </strong>{' '}
              Could not download tracking data. It could be that no data exists
              in the database.
            </div>
          ) : null}
          {this.state.error_jv ? (
            <div className="alert alert-warning">
              <strong>
                <span className="glyphicon glyphicon-warning" />
              </strong>{' '}
              Could not download IV data. It could be that no data exists in the
              database.
            </div>
          ) : null}
          {this.state.error_vocjsc ? (
            <div className="alert alert-warning">
              <strong>
                <span className="glyphicon glyphicon-warning" />
              </strong>{' '}
              Could not download Voc/Jsc data. It could be that no data exists
              in the database.
            </div>
          ) : null}

          <div className="form-group">
            <label className="col-sm-3">Format</label>
            <div className="col-sm-6">
              <select
                name="dl_format"
                id="dl_format"
                className="form-control"
                value={this.state.dl_format}
                onChange={this.handleInputChange}>
                <option value="csv">Comma separated (.csv)</option>
                <option value="itx">Igor text file (.itx)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3">Number of points</label>
            <div className="col-sm-6">
              <select
                name="dl_track_nb"
                id="dl_track_nb"
                className="form-control"
                value={this.state.dl_track_nb}
                onChange={this.handleInputChange}>
                <option value="100">100</option>
                <option value="300">300</option>
                <option value="1000">1000</option>
                <option value="3000">3000</option>
                <option value="10000">10000</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <div className="btn-group">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    this.makeDownload(true, false, false);
                  }}>
                  Download MPP
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    this.makeDownload(false, false, true);
                  }}>
                  Download Voc and Jsc
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    this.makeDownload(false, true, false);
                  }}>
                  Download JV
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    this.makeDownload(true, true, true);
                  }}>
                  Download All
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <div className="btn-group">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.downloadPDF}>
                  Make PDF report
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  name="update"
                  onClick={this.close}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="btn-group pull-right" />
      </div>
    );
  }
}

export default DownloadForm;
