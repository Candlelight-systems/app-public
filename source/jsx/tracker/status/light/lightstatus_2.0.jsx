import React from 'react';
import { ipcRenderer } from 'electron';

class LightStatus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(
      'group.update.' + this.props.instrumentId + '.' + this.props.name,
      this.wsUpdate
    );
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
    console.log(data.data);
    // New state means re-enabling
    if (this.toggleLightEnable) {
      $(this.toggleLightEnable).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {
    if (this.toggleLightEnable && !this.transformed) {
      $(this.toggleLightEnable)
        .bootstrapToggle({
          on: 'On',
          off: 'Off'
        })
        .change(() => {
          $(this.toggleLightEnable).bootstrapToggle('disable');

          return fetch(
            `http://${this.props.config.trackerHost}:${
              this.props.config.trackerPort
            }/light.${
              this.toggleLightEnable.checked ? 'enable' : 'disable'
            }?instrumentId=${this.props.instrumentId}&groupName=${
              this.props.name
            }`,
            {
              method: 'GET'
            }
          )
            .then(() => {})
            .catch(error => {
              ipcRenderer.send(
                'reportError',
                'Unable to change the light mode'
              );
            })
            .then(() => {});
        });
      this.transformed = true;
    }

    if (this.toggleLightEnable) {
      $(this.toggleLightEnable)
        .data('bs.toggle')
        [this.state.lightOnOff ? 'on' : 'off'](true);
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-5">
            <span className="grey">On/Off:</span>
          </div>
          <div className="col-lg-4">
            <label>
              <input
                data-toggle="toggle"
                type="checkbox"
                ref={el => (this.toggleLightEnable = el)}
                data-width="70"
                data-height="25"
              />
            </label>
          </div>
        </div>

        {this.state.lightOnOff ? (
          <div>
            {this.state.lightOnOffButton !== this.state.lightOnOff ? (
              <div className="row">
                <div className="col-lg-9">
                  <span className="grey">
                    <em>
                      <small>
                        <span className="glyphicon glyphicon-danger" />
                        The light switch is off. Push it to turn the light on.
                      </small>
                    </em>
                  </span>
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-lg-5">
                <span className="grey">Control mode:</span>
              </div>
              <div className="col-lg-4">
                {this.state.lightMode == 'auto' ? (
                  <span>Automatic</span>
                ) : (
                  <span>Manual</span>
                )}
              </div>
            </div>

            {this.state.lightMode == 'auto' &&
            this.state.lightSetpoint !== undefined ? ( // In case the light is in automatic mode
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">Set point:</span>
                </div>
                <div className="col-lg-4">{this.state.lightSetpoint} sun</div>
              </div>
            ) : null}

            {this.state.lightValue !== undefined ? (
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">Current value:</span>
                </div>
                <div className="col-lg-4">
                  {this.state.lightValue < 0
                    ? 0
                    : this.state.lightValue.toPrecision(3)}{' '}
                  sun
                </div>
              </div>
            ) : null}

            {this.state.lightTemperature ? (
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">LED temperature:</span>
                </div>
                <div className="col-lg-4">
                  {this.state.lightTemperature}
                  °C
                </div>
              </div>
            ) : null}

            {this.state.lightMode == 'auto' &&
            this.state.lightUVSetpoint !== undefined ? ( // In case the light is in automatic mode
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">UV(A) set point:</span>
                </div>
                <div className="col-lg-4">
                  {this.state.lightUVSetpoint} mW cm<sup>-2</sup>
                </div>
              </div>
            ) : null}

            {this.state.lightUVValue !== undefined ? (
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">UV(A) intensity:</span>
                </div>
                {}
                <div className="col-lg-4">
                  {isNaN(this.state.lightUVValue) ||
                  this.state.lightUVValue !==
                    parseFloat(this.state.lightUVValue) ? (
                    this.state.lightUVValue
                  ) : this.state.lightUVValue < 0 ? (
                    0
                  ) : (
                    <span>
                      {Math.round(this.state.lightUVValue * 1000) / 1000} mW cm
                      <sup>-2</sup>
                    </span>
                  )}
                </div>
                <div class="text-warning">
                  <strong>
                    <span className="glyphicon glyphicon-danger" /> Caution !
                  </strong>{' '}
                  UV sensor readout can be influenced by the white light
                  intensity
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default LightStatus;
