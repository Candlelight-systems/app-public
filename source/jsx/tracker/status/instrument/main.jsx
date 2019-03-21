import React from 'react';
import { ipcRenderer } from 'electron';
import environment from '../../../../../app/environment.json';
import urllib from 'url-lib';
import { autoZero, autoZeroMaster } from '../../../../queries';

//import { default as InstrumentStatus_1_0 } from "./instrumentstatus_1.0.jsx"

let speedOptions = [];

/*
	ADS1259
	0b00000000 ==> 10SPS
	0b00000001 ==> 16SPS
	0b00000010 ==> 50SPS
	0b00000011 ==> 60SPS
	0b00000100 ==> 400SPS
	0b00000101 ==> 1.2kSPS
	0b00000110 ==> 3.6kSPS
	0b00000111 ==> 14kSPS

	ADS1147
	0b00000000 ==> 5SPS
	0b00000001 ==> 10SPS
	0b00000010 ==> 20SPS
	0b00000011 ==> 40SPS
	0b00000100 ==> 80SPS
	0b00000101 ==> 160SPS
	0b00000110 ==> 320SPS
	0b00000111 ==> 640SPS
	0b00000111 ==> 1000SPS
	0b00000111 ==> 2000SPS
*/

class InstrumentStatus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.togglePause = this.togglePause.bind(this);
    this.restartSoftware = this.restartSoftware.bind(this);
    this.changeAcquisitionSpeed = this.changeAcquisitionSpeed.bind(this);
    this.autoZero = this.autoZero.bind(this);
    this.autoZeroMaster = this.autoZeroMaster.bind(this);

    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      'group.update.' + this.props.instrumentId + '.' + this.props.name,
      this.wsUpdate
    );
  }

  wsUpdate(event, data) {
    this.setState(data.data);
  }

  componentDidMount() {
    ipcRenderer.on(
      'group.update.' + this.props.instrumentId + '.' + this.props.name,
      this.wsUpdate
    );

    if (!environment.instrument[this.props.instrumentId]) {
      return;
    }

    switch (environment.instrument[this.props.instrumentId].ADC.model) {
      case 'ADS1259':
        speedOptions = [0, 2, 4, 5, 7];
        break;

      default:
      case 'ADS1147':
        speedOptions = [1, 3, 6, 8, 9];
        break;
    }
  }

  async autoZero(event) {
    await autoZero(this.props.config, this.props.instrumentId);
  }

  async autoZeroMaster(event) {
    await autoZeroMaster(this.props.config, this.props.instrumentId);
  }

  async changeAcquisitionSpeed(event) {
    let val = event.target.value;
    let result = await fetch(
      urllib.formatUrl(
        `http://${this.props.config.trackerHost}:${
          this.props.config.trackerPort
        }/instrument.setAcquisitionSpeed`,
        {
          instrumentId: this.props.instrumentId,
          speed: val
        }
      )
    );

    await this.props.update();
  }

  togglePause() {
    let url;
    if (this.state.paused) {
      url = 'resumeChannels';
    } else {
      url = 'pauseChannels';
    }
    return fetch(
      'http://' +
        this.props.config.trackerHost +
        ':' +
        this.props.config.trackerPort +
        '/' +
        url +
        '?instrumentId=' +
        encodeURIComponent(this.props.instrumentId),
      { method: 'GET' }
    );
  }

  restartSoftware() {
    return fetch(
      'http://' +
        this.props.config.trackerHost +
        ':' +
        this.props.config.trackerPort +
        '/restart',
      { method: 'GET' }
    );
  }

  render() {
    if (!environment.instrument[this.props.instrumentId]) {
      return (
        <div className="alert alert-danger">
          Instrument could not be found in software config. Expecting "
          {this.props.instrumentId}". Available in environment:{' '}
          {Object.keys(environment.instrument).join(', ')}.{' '}
        </div>
      );
    }

    if (
      !environment.instrument[this.props.instrumentId].groups[this.props.name]
    ) {
      return (
        <div className="alert alert-danger">
          Group could not be found in software config. Expecting "
          {this.props.name}". Available in environment:{' '}
          {Object.keys(
            environment.instrument[this.props.instrumentId].groups
          ).join(', ')}
          .{' '}
        </div>
      );
    }

    return (
      <div className="col-lg-2 group-status group-status-instrument">
        <h4>Instrument status</h4>
        <div
          className={
            'row' + (this.props.error_influxdb ? ' status-error' : '')
          }>
          <div className="col-lg-5">
            <span
              title={this.props.error_influxdb || ''}
              className={
                'glyphicon glyphicon-' +
                (this.props.error_influxdb ? 'warning-sign' : 'check')
              }
            />{' '}
            InfluxDB server
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-cl btn-default btn-sm"
              onClick={() => {
                ipcRenderer.send('editInfluxDB');
              }}>
              <span className="glyphicon glyphicon-cog" /> Configure
            </button>
          </div>
        </div>

        <div
          className={'row' + (this.props.error_tracker ? ' status-error' : '')}>
          <div className="col-lg-5">
            <span
              title={this.props.error_tracker || ''}
              className={
                'glyphicon glyphicon-' +
                (this.props.error_tracker ? 'warning-sign' : 'check')
              }
            />{' '}
            MPP Tracker
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-cl btn-default btn-sm"
              onClick={() => {
                ipcRenderer.send(
                  'editInstrument',
                  this.props.config.trackerHost
                );
              }}>
              <span className="glyphicon glyphicon-cog" /> Configure
            </button>
          </div>
        </div>

        <div className={'row' + (this.state.paused ? ' status-error' : '')}>
          <div className="col-lg-5">
            <span
              className={
                'glyphicon glyphicon-' +
                (this.state.paused ? 'warning-sign' : 'check')
              }
            />{' '}
            {this.state.paused ? 'Tracking paused' : 'Tracking enabled'}
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-cl btn-default btn-sm"
              onClick={this.togglePause}>
              {this.state.paused ? (
                <span>
                  <span className="glyphicon glyphicon-start" />
                  Resume
                </span>
              ) : (
                <span>
                  <span className="glyphicon glyphicon-pause" />
                  Pause
                </span>
              )}
            </button>
          </div>
        </div>

        {environment.instrument[this.props.instrumentId].autoZero ===
          'instrument' && (
          <div className="row">
            <div className="col-lg-5">
              <button
                type="button"
                className="btn btn-cl btn-default btn-sm"
                onClick={this.autoZero}>
                <span>Auto-zero</span>
              </button>
              <button
                type="button"
                className="btn btn-cl btn-default btn-sm"
                onClick={this.autoZeroMaster}>
                <span>Master Auto-zero</span>
              </button>
            </div>
            <div className="col-lg-4" />
          </div>
        )}

        {environment.instrument[this.props.instrumentId].groups[this.props.name]
          .resettable !== false && (
          <div className="row">
            <div className="col-lg-5">
              <button
                type="button"
                className="btn btn-cl btn-default btn-sm"
                onClick={this.resetSlave}>
                <span>Reset enclosure(s)</span>
              </button>
            </div>
            <div className="col-lg-4" />
          </div>
        )}

        <div className="row">
          <div className="col-lg-5">
            <button
              type="button"
              className="btn btn-cl btn-default btn-sm"
              onClick={this.restartSoftware}>
              <span>Restart instrument firmware</span>
            </button>
          </div>
          <div className="col-lg-4" />
        </div>

        {speedOptions.length > 0 &&
          environment.instrument[this.props.instrumentId].changeSpeed !==
            false && (
            <div className="form-group">
              <label htmlFor="tracking_speed" className="col-sm-9">
                Acquisition speed{' '}
                <sup title="This option directly affects the acquisition speed of the instrument, and therefore has a significant impact on the tracking efficiency when the light bias is noisy. The slower the better for the convergence, but it will limit the overall tracking speed.">
                  ?
                </sup>
              </label>
              <div className="col-sm-9">
                <select
                  name="tracking_speed"
                  id="tracking_speed"
                  className="form-control"
                  value={this.props.serverState.acquisition_speed}
                  onChange={this.changeAcquisitionSpeed}>
                  <option key="0" value={speedOptions[4]}>
                    Maximum
                  </option>
                  <option key="1" value={speedOptions[3]}>
                    Fast
                  </option>
                  <option key="2" value={speedOptions[2]}>
                    Average
                  </option>
                  <option key="3" value={speedOptions[1]}>
                    Slow
                  </option>
                  <option key="4" value={speedOptions[0]}>
                    Very slow
                  </option>
                </select>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default InstrumentStatus;
