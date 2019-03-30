import React from 'react';
const { dialog } = require('electron').remote;
import fs from 'fs';
import path from 'path';
import { CSVBuilder, ITXBuilder } from '../../app/util/filebuilder';
import { ipcRenderer } from 'electron';
import {
  getTrackData,
  getVocJscData,
  getJVWaveforms
} from '../../app/util/download';

class DownloadForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeDownload = this.makeDownload.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      dl_format: 'csv',
      dl_track_nb: 3000,
      error_track: false,
      error_vocjsc: false,
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

    if (vocjsc) {
      await this.downloadVocJsc(outputfile);
      fileappend.push('vocjsc');
    }

    if (jv) {
      await this.downloadIV(outputfile);
      fileappend.push('jv');
    }

    dialog.showSaveDialog(
      {
        message:
          'Save the data for the cell "' + this.props.cellInfo.cellName + '"',
        defaultPath: `${this.props.defaultPath || '~'}/${
          this.props.cellInfo.cellName
        }_${fileappend.join('_')}.${this.state.dl_format}`
      },
      fileName => {
        const filePath = path.parse(fileName);
        fs.writeFileSync(fileName, outputfile.build());
        ipcRenderer.send('set-preference', {
          name: 'defaultSavePath',
          value: filePath.dir
        });
      }
    );
  }

  async downloadTrack(outputfile) {
    let data;
    try {
      data = await getTrackData(
        this.props.db,
        this.props.measurementName,
        this.props.cellInfo,
        this.state.dl_track_nb
      );
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
      data = await getVocJscData(
        this.props.db,
        this.props.measurementName,
        this.props.cellInfo
      );
    } catch (e) {
      this.setState({ error_vocjsc: true });
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
    let waveforms;
    try {
      waveforms = await getJVWaveforms(
        this.props.db,
        this.props.measurementName,
        this.props.cellInfo
      );
    } catch (e) {
      this.setState({ error_jv: true });
      console.error(e);
      return;
    }

    waveforms.jv.forEach(data => {
      outputfile.addWaveform(data.wave, {
        waveName: 'Current_' + data.time_h + 'h',
        waveNameX: 'Voltage_' + data.time_h + 'h'
      });
    });

    outputfile.addWaveform(waveforms.vocs, {
      waveName: 'Voc JV (V)',
      waveNameX: 'Time_JV (h)'
    });

    outputfile.addWaveform(waveforms.jscs, {
      waveName: 'Jsc JV (A)',
      noXWave: true
    });

    outputfile.addWaveform(waveforms.ffs, {
      waveName: 'FF JV (%)',
      noXWave: true
    });

    outputfile.addWaveform(waveforms.pces, {
      waveName: 'PCE JV (%)',
      noXWave: true
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
