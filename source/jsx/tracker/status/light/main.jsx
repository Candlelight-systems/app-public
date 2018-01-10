import React from 'react';
import { ipcRenderer } from "electron";
import { default as LightStatus_1_0 } from "./lightstatus_1.0.jsx"
import { default as LightStatus_2_0 } from "./lightstatus_2.0.jsx"
import environment from "../../../../../app/environment.json"

class LightStatus extends React.Component {

  constructor( props ) {
    super( props );

    this.light_calibrate = this.light_calibrate.bind( this );
    this.light_controller_config = this.light_controller_config.bind( this );    

  }

  light_calibrate() {

    ipcRenderer.send( "calibratePD", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    } );
  }

  light_controller_config() {

    ipcRenderer.send( "scheduleLight", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    } );
  }

  render() {

    let content = null;
    switch( environment.statuses.light.version ) {

      case "1.0": {
        content = ( <LightStatus_1_0 {...this.props } /> );
        break;
      }

      default:
      case "2.0": {
        content = ( <LightStatus_2_0 {...this.props} /> );
      }
    };

    return ( 
      <div className="group-status group-status-light col-lg-2">
        <h4>Light bias</h4>
        { this.props.serverState.lightController ?
          content : 
          "No light control is available for this group"
        }

        <div className="row">
            <div className="col-lg-9">
              <button type="button" className="btn btn-cl btn-default btn-sm"  onClick={ this.light_controller_config }>
                <span className="glyphicon glyphicon-cog"></span> Configure
              </button>
              <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ this.light_calibrate }><span className="glyphicon glyphicon-scale"></span> Calibrate</button>
            </div>
          </div>

      </div> 
    );
  }

}

export default LightStatus;