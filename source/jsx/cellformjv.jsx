import React from 'react';

class CellFormJV extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onFormChange(name, value);
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="col-sm-3">Starting voltage</label>
          <div className="col-sm-9">
            <div className="input-group">
              <span className="input-group-addon">
                <label>
                  <input
                    type="checkbox"
                    name="iv_autostart"
                    id="iv_autostart"
                    onClick={this.handleInputChange}
                    checked={!!this.props.iv_autostart}
                  />
                  &nbsp;V<sub>oc</sub>
                </label>
              </span>
              <input
                type="number"
                min="-2.5"
                max="2.5"
                step="0.001"
                name="iv_start"
                id="iv_start"
                disabled={!!this.props.iv_autostart}
                className="form-control"
                placeholder="1"
                value={this.props.iv_start}
                onChange={this.handleInputChange}
              />
              <span className="input-group-addon">V</span>
            </div>
            <div className="help-block">
              Click on "Voc" for an auto-start voltage value of the j-V curve.
              The Voc will be determined and the j-V curve will start at (Voc +
              20mV).
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-3">Ending voltage</label>
          <div className="col-sm-9">
            <div className="input-group">
              <span className="input-group-addon">
                <label>
                  <input
                    type="checkbox"
                    name="iv_autostop"
                    id="iv_autostop"
                    onClick={this.handleInputChange}
                    checked={!!this.props.iv_autostop}
                  />
                  &nbsp;Auto polarity
                </label>
              </span>
              <input
                type="number"
                min="-2.5"
                max="2.5"
                step="0.001"
                name="iv_stop"
                id="iv_stop"
                className="form-control"
                placeholder="1"
                value={this.props.iv_stop}
                onChange={this.handleInputChange}
              />
              <span className="input-group-addon">V</span>
            </div>
            <div className="help-block">
              Check the "auto polarity" checkbox to automatically change the
              sign of the stopping voltage to cross 0V.
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-3">Sweep rate</label>
          <div className="col-sm-9">
            <div className="input-group">
              <input
                type="number"
                min="0.0005"
                max="0.1"
                step="0.0001"
                name="iv_rate"
                id="iv_rate"
                className="form-control"
                placeholder="0.01"
                value={this.props.iv_rate}
                onChange={this.handleInputChange}
              />
              <span className="input-group-addon">V/s</span>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div>
            <label className="col-sm-9">
              <input
                type="checkbox"
                name="iv_hysteresis"
                checked={!!this.props.iv_hysteresis}
                onChange={this.handleInputChange}
              />{' '}
              Scan in both directions
            </label>
          </div>
        </div>

        <h3>Measurement intervals</h3>

        <div className="form-group row">
          <div>
            <label className="col-sm-9">
              <input
                value="fixed"
                type="radio"
                name="iv_measurement_interval_type"
                checked={this.props.iv_measurement_interval_type == 'fixed'}
                onChange={this.handleInputChange}
              />{' '}
              Measure at fixed intervals
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="iv_interval" className="col-sm-3">
            Measurement interval
          </label>
          <div className="col-sm-9">
            <select
              disabled={this.props.iv_measurement_interval_type == 'auto'}
              name="iv_interval"
              id="iv_interval"
              className="form-control"
              value={this.props.iv_interval}
              onChange={this.handleInputChange}>
              <option value="60000">Every minute</option>
              <option value="600000">Every 10 minutes</option>
              <option value="3600000">Every hour</option>
              <option value="10800000">Every 3 hours</option>
              <option value="43200000">Every 12 hours</option>
              <option value="86400000">Every day</option>
              <option value="604800000">Every week</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div>
            <label className="col-sm-9">
              <input
                type="radio"
                value="auto"
                name="iv_measurement_interval_type"
                checked={this.props.iv_measurement_interval_type == 'auto'}
                onChange={this.handleInputChange}
              />{' '}
              Automatic intervals
            </label>
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="iv_measurement_interval_auto_pdrop"
            className="col-sm-3">
            Measure upon efficiency drop
          </label>
          <div className="col-sm-9">
            <select
              disabled={this.props.iv_measurement_interval_type == 'fixed'}
              name="iv_measurement_interval_auto_pdrop"
              id="iv_measurement_interval_auto_pdrop"
              className="form-control"
              value={this.props.iv_measurement_interval_auto_pdrop}
              onChange={this.handleInputChange}>
              <option value="0.25">0.25%</option>
              <option value="0.5">0.5%</option>
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
            </select>
            <div className="help-block">
              A j-V curve measurement will be triggered when the PCE of the
              device changes by X percentage point. Only works with MPP
              tracking.
            </div>
          </div>
        </div>

        <div className="col-sm-9">
          <div className="help-block">
            <small>
              The following intervals are checked for each tracking point that
              is recorded (see the "record interval" in the "Tracking" tab.) For
              example, if the recording interval is set to 1 point every 10
              minutes, setting the minimum interval to 1 minute will have the
              same effect as setting it to every 10 minutes.
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="iv_interval" className="col-sm-3">
            With a minimum interval of
          </label>
          <div className="col-sm-9">
            <select
              disabled={this.props.iv_measurement_interval_type == 'fixed'}
              name="iv_measurement_interval_auto_minTime"
              id="iv_measurement_interval_auto_minTime"
              className="form-control"
              value={this.props.iv_measurement_interval_auto_minTime}
              onChange={this.handleInputChange}>
              <option value="60000">1 minute</option>
              <option value="600000">10 minutes</option>
              <option value="3600000">1 hour</option>
              <option value="10800000">3 hours</option>
              <option value="43200000">12 hours</option>
              <option value="86400000">1 day</option>
              <option value="604800000">1 week</option>
            </select>
            <div className="help-block">
              Sets a minimum interval under which the j-V curve will not be
              measured, even if the PCE has changed above the threshold.
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="iv_interval" className="col-sm-3">
            With a maximum interval of
          </label>
          <div className="col-sm-9">
            <select
              disabled={this.props.iv_measurement_interval_type == 'fixed'}
              name="iv_measurement_interval_auto_maxTime"
              id="iv_measurement_interval_auto_maxTime"
              className="form-control"
              value={this.props.iv_measurement_interval_auto_minTime}
              onChange={this.handleInputChange}>
              <option value="600000">10 minutes</option>
              <option value="3600000">1 hour</option>
              <option value="10800000">3 hours</option>
              <option value="43200000">12 hours</option>
              <option value="86400000">1 day</option>
              <option value="604800000">1 week</option>
              <option value="-1">Never</option>
            </select>
            <div className="help-block">
              Sets a maximum time interval. Even if the power hasn't changed
              above the threshold, the j-V curve will be measured at this
              interval.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CellFormJV;
