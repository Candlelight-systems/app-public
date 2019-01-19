import React from 'react';
import { ipcRenderer } from 'electron';
import environment from '../../../../../app/environment.json';

class LightStatus extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      lightValue: 0
    };
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

    // New state means re-enabling

    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {}

  render() {
    let lightValue;
    if (environment.lightUnit == 'Wm2') {
      lightValue = (
        <span>
          {(this.state.lightValue * 1000).toPrecision(3)} W m<sup>-2</sup>
        </span>
      );
    } else {
      lightValue = <span>{this.state.lightValue.toPrecision(3)} sun</span>;
    }

    return (
      <div>
        {this.state.lightValue !== undefined &&
        this.state.lightValue !== null ? (
          <div className="row">
            <div className="col-lg-5">
              <span className="grey">Live value:</span>
            </div>
            <div className="col-lg-4">{lightValue}</div>
          </div>
        ) : (
          'Current value unknown'
        )}
      </div>
    );
  }
}

export default LightStatus;
