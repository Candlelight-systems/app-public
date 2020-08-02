import React from 'react';
import { ipcRenderer } from 'electron';
import urllib from 'url-lib';
import environment from '../../../../../app/environment.json';

class HeatStatus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);

    this.setTargetTemperature = this.setTargetTemperature.bind(this);
    this.changeTargetTemperature = this.changeTargetTemperature.bind(this);
    this.setPower = this.setPower.bind(this);
    this.setPIDParameters = this.setPIDParameters.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (this.state.heater_cooling) {
      if (name == 'Ki') {
        this.setState({ Ki_cooling: value });
      } else if (name == 'Kp') {
        this.setState({ Kp_cooling: value });
      } else if (name == 'Kd') {
        this.setState({ Kd_cooling: value });
      } else if (name == 'bias') {
        this.setState({ bias_cooling: value });
      }
    } else {
      if (name == 'Ki') {
        this.setState({ Ki_heating: value });
      } else if (name == 'Kp') {
        this.setState({ Kp_heating: value });
      } else if (name == 'Kd') {
        this.setState({ Kd_heating: value });
      } else if (name == 'bias') {
        this.setState({ bias_heating: value });
      }
    }

    this.setState({ [name]: value });
  }

  componentDidMount() {
    ipcRenderer.on(
      'group.update.' + this.props.instrumentId + '.' + this.props.name,
      this.wsUpdate
    );

    fetch(
      `http://${this.props.config.trackerHost}:${
        this.props.config.trackerPort
      }/heat.getPIDParameters?instrumentId=${
        this.props.instrumentId
      }&groupName=${this.props.name}`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          Kp_heating: response.heating.Kp,
          Kp_cooling: response.cooling.Kp,
          Kd_heating: response.heating.Kd,
          Kd_cooling: response.cooling.Kd,
          Ki_heating: response.heating.Ki,
          Ki_cooling: response.cooling.Ki,

          bias_heating: response.heating.bias,
          bias_cooling: response.cooling.bias
        });
      });
  }

  setPIDParameters() {
    try {
      fetch(
        urllib.formatUrl(
          `http://${this.props.config.trackerHost}:${
            this.props.config.trackerPort
          }/heat.setPIDParameters`,
          {
            instrumentId: this.props.instrumentId,
            groupName: this.props.name,

            Kp_h: this.state.Kp_heating,
            Kp_c: this.state.Kp_cooling,
            Kd_h: this.state.Kd_heating,
            Kd_c: this.state.Kd_cooling,
            Ki_h: this.state.Ki_heating,
            Ki_c: this.state.Ki_cooling,

            bias_h: this.state.bias_heating,
            bias_c: this.state.bias_cooling
          }
        )
      ).then(response => {
        if (response.status !== 200) {
          throw 'Error';
        }
      });

      this.setState({ pid_error: false, pid_success: true });
    } catch (e) {
      console.error(e);
      this.setState({ pid_error: e, pid_success: false });
    }
  }

  setPower() {
    try {
      fetch(
        urllib.formatUrl(
          `http://${this.props.config.trackerHost}:${
            this.props.config.trackerPort
          }/heat.setPower`,
          {
            instrumentId: this.props.instrumentId,
            groupName: this.props.name,
            power: this.state.newpower / 100
          }
        )
      ).then(response => {
        if (response.status !== 200) {
          throw 'Error';
        }
      });

      this.setState({ power_error: false, power_success: true });
    } catch (e) {
      console.error(e);
      this.setState({ power_error: e, power_success: false });
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      'group.update.' + this.props.instrumentId + '.' + this.props.name,
      this.wsUpdate
    );
  }

  wsUpdate(event, data) {
    // Update directly the state
    this.setState(data.data);

    // New state means re-enabling
    /*if( this.toggleLightMode ) {
      $( this.toggleLightMode ).bootstrapToggle('enable');
    }*/
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  changeTargetTemperature(e) {
    this.setState({
      input_heater_target_temperature: e.target.value
    });
  }

  setTargetTemperature() {
    fetch(
      `http://${this.props.config.trackerHost}:${
        this.props.config.trackerPort
      }/heat.setTarget?instrumentId=${this.props.instrumentId}&groupName=${
        this.props.name
      }&target=${this.state.input_heater_target_temperature}`,
      {
        method: 'GET'
      }
    ).then(response => {});
  }

  componentDidUpdate(prevProps) {
    if (this.buttonHeatCool && !this.transformed) {
      $(this.buttonHeatCool)
        .bootstrapToggle({
          on: 'Cooling',
          off: 'Heating'
        })
        .change(() => {
          $(this.buttonHeatCool).bootstrapToggle('disable');

          fetch(
            `http://${this.props.config.trackerHost}:${
              this.props.config.trackerPort
            }/heat.${
              this.buttonHeatCool.checked ? 'setCooling' : 'setHeating'
            }?instrumentId=${this.props.instrumentId}&groupName=${
              this.props.name
            }`,
            {
              method: 'GET'
            }
          )
            .then(response => {
              $(this.buttonHeatCool).bootstrapToggle('enable');
            })
            .catch(() => {
              ipcRenderer.send(
                'reportError',
                'Unable to switch the heater polarity'
              );
            });
        });
    }

    if (this.buttonFans && !this.transformed) {
      $(this.buttonFans)
        .bootstrapToggle({
          on: 'On',
          off: 'Off'
        })
        .change(() => {
          $(this.buttonFans).bootstrapToggle('disable');

          fetch(
            `http://${this.props.config.trackerHost}:${
              this.props.config.trackerPort
            }/heat.${
              this.buttonFans.checked ? 'fansOn' : 'fansOff'
            }?instrumentId=${this.props.instrumentId}&groupName=${
              this.props.name
            }`,
            {
              method: 'GET'
            }
          )
            .then(response => {
              $(this.buttonFans).bootstrapToggle('enable');
            })
            .catch(() => {
              ipcRenderer.send('reportError', 'Unable to switch the fans');
            });
        });
    }

    if (this.buttonMode && !this.transformed) {
      $(this.buttonMode)
        .bootstrapToggle({
          on: 'PID',
          off: 'Set power'
        })
        .change(() => {
          $(this.buttonMode).bootstrapToggle('disable');

          fetch(
            `http://${this.props.config.trackerHost}:${
              this.props.config.trackerPort
            }/heat.setMode?mode=${
              this.buttonMode.checked ? 'pid' : 'fixedPower'
            }&instrumentId=${this.props.instrumentId}&groupName=${
              this.props.name
            }`,
            {
              method: 'GET'
            }
          )
            .then(response => {
              $(this.buttonMode).bootstrapToggle('enable');
            })
            .catch(() => {
              ipcRenderer.send(
                'reportError',
                'Unable to change the heating mode'
              );
            });
        });
    }

    if (!this.transformed) {
      this.transformed = true;
    }
    if (this.buttonFans) {
      $(this.buttonFans)
        .data('bs.toggle')
        [this.state.fanswitch ? 'on' : 'off'](true);
    }
    if (this.buttonHeatCool) {
      $(this.buttonHeatCool)
        .data('bs.toggle')
        [this.state.heater_cooling ? 'on' : 'off'](true);
    }

    if (this.buttonMode) {
      $(this.buttonMode)
        .data('bs.toggle')
        [this.state.heater_mode == 'pid' ? 'on' : 'off'](true);
    }
  }

  render() {
    return (
      <div>
        {this.props.serverState.heatController ? (
          <div>
            <div className="row">
              <div className="col-lg-5">Temperature (ref.) :</div>
              <div className="col-lg-4">
                {this.state.heater_reference_temperature
                  ? this.state.heater_reference_temperature + '°C'
                  : 'N/A'}
              </div>
            </div>

            <h4>Control</h4>

            {environment.statuses.heat.fanswitch !== false && (
              <div className="row">
                <div className="col-lg-5">Sample holder fans</div>
                <div className="col-lg-4">
                  <label>
                    <input
                      data-toggle="toggle"
                      type="checkbox"
                      ref={el => (this.buttonFans = el)}
                      checked={this.state.fanswitch}
                      data-width="100"
                      data-height="25"
                    />
                  </label>
                </div>
              </div>
            )}

            {environment.statuses.heat.switch !== false && (
              <div className="row">
                <div className="col-lg-5">Polarity</div>
                <div className="col-lg-4">
                  <label>
                    <input
                      data-toggle="toggle"
                      type="checkbox"
                      ref={el => (this.buttonHeatCool = el)}
                      checked={this.state.heater_cooling}
                      data-width="100"
                      data-height="25"
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-5">Mode</div>
              <div className="col-lg-4">
                <label>
                  <input
                    data-toggle="toggle"
                    type="checkbox"
                    ref={el => (this.buttonMode = el)}
                    checked={this.state.heater_mode == 'pid'}
                    data-width="100"
                    data-height="25"
                  />
                </label>
              </div>
            </div>

            {this.state.heater_mode == 'pid' ? (
              <div>
                <h5>PID control</h5>

                {this.state.pid_error && (
                  <div className="alert alert-danger">
                    Error in setting the PID parameters.
                  </div>
                )}
                {this.state.pid_success && (
                  <div className="alert alert-success">
                    PID parameters updated !
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-5">Target temperature:</div>
                  <div className="col-lg-4">
                    {this.state.heater_target_temperature
                      ? this.state.heater_target_temperature + ' °C'
                      : 'N/A'}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-5">New target temperature:</div>
                  <div className="col-lg-3">
                    <div className="input-group input-group-sm">
                      <input
                        type="number"
                        onChange={this.changeTargetTemperature}
                        className="form-control"
                        min="10"
                        max="85"
                        step="0.5"
                        value={this.state.input_heater_target_temperature}
                      />
                      <span className="input-group-addon">°C</span>
                      <span className="input-group-btn">
                        <button
                          className="btn btn-default"
                          onClick={this.setTargetTemperature}
                          type="button">
                          Set
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="row">
                    <div className="col-lg-5">
                      <small>Output:</small>
                    </div>
                    <div className="col-lg-4">
                      <small>
                        <em>Duty cycle (0.0 - 1.0) </em>
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      <small>Input:</small>
                    </div>
                    <div className="col-lg-4">
                      <small>
                        <em>Temperature error in °C</em>
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      <small>Time unit:</small>
                    </div>
                    <div className="col-lg-4">
                      <small>
                        <em>Seconds</em>
                      </small>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5">Kp (Prop.)</div>
                    <div className="col-lg-4">
                      <input
                        className="form-control input-sm"
                        name="Kp"
                        value={
                          this.state.heater_cooling
                            ? this.state.Kp_cooling
                            : this.state.Kp_heating
                        }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5">Kd (Differential)</div>
                    <div className="col-lg-4">
                      <input
                        className="form-control input-sm"
                        name="Kd"
                        value={
                          this.state.heater_cooling
                            ? this.state.Kd_cooling
                            : this.state.Kd_heating
                        }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5">Ki (Integral)</div>
                    <div className="col-lg-4">
                      <input
                        className="form-control input-sm"
                        name="Ki"
                        value={
                          this.state.heater_cooling
                            ? this.state.Ki_cooling
                            : this.state.Ki_heating
                        }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5">Bias</div>
                    <div className="col-lg-4">
                      <input
                        className="form-control input-sm"
                        name="bias"
                        value={
                          this.state.heater_cooling
                            ? this.state.bias_cooling
                            : this.state.bias_heating
                        }
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5" />
                    <div className="col-lg-4">
                      <button
                        className="btn btn-default btn-sm"
                        onClick={this.setPIDParameters}
                        type="button">
                        Update PID parameters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5>Fixed power</h5>
                {this.state.power_error && (
                  <div className="alert alert-danger">
                    Error in setting the powers.
                  </div>
                )}
                {this.state.power_success && (
                  <div className="alert alert-success">Power updated !</div>
                )}

                <div>
                  <div className="row">
                    <div className="col-lg-5">Current power</div>
                    <div className="col-lg-4">
                      {this.state.heater_power
                        ? this.state.heater_power * 100 + '%'
                        : 'N/A'}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-5">New power</div>
                    <div className="col-lg-3 input-group input-group-sm">
                      <input
                        className="form-control"
                        type="number"
                        name="newpower"
                        value={this.state.newpower}
                        onChange={this.handleInputChange}
                      />
                      <span className="input-group-addon">%</span>
                      <span className="input-group-btn">
                        <button
                          className="btn btn-default"
                          onClick={this.setPower}
                          type="button">
                          Set
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeatStatus;
