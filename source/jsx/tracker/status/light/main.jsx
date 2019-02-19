import React from 'react';
import { ipcRenderer } from "electron";
import { default as LightStatus_1_0 } from "./lightstatus_1.0.jsx"
import { default as LightStatus_2_0 } from "./lightstatus_2.0.jsx"
import { default as LightStatus_readonly } from "./lightstatus_readonly.jsx"
import environment from "../../../../../app/environment.json"

class LightStatus extends React.Component {

  constructor( props ) {
    super( props );

    this.light_calibrate = this.light_calibrate.bind( this );
    this.light_controller_config = this.light_controller_config.bind( this );    
    this.light_controller_setuv = this.light_controller_setuv.bind( this );
    this.wsUpdate = this.wsUpdate.bind( this );
    this.state = {};
  }
  

  componentDidMount() {

    ipcRenderer.on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );
  }

  componentWillUnmount() {

    ipcRenderer.removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );  
  }


  wsUpdate( event, data ) {
    // Update directly the state
    this.setState( data.data );
  }



  light_calibrate( calibrateMethod ) {

    ipcRenderer.send( calibrateMethod, {
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

  light_controller_setuv() {

    fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/light.applyUV?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }`, {
      method: 'GET'
    })
  }

  render() {

    let content = null;

    if( ! environment.statuses.light  ) {
      return null;
    }
    
    switch( environment.statuses.light.version ) {

      case "1.0": {
        content = ( <LightStatus_1_0 {...this.props } /> );
        break;
      }

      case "readonly": {
        content = ( <LightStatus_readonly {...this.props } /> );
        break;
      }

      default:
      case "2.0": {
        content = ( <LightStatus_2_0 {...this.props} /> );
      }
    };

    let button_calibrate;
    switch( environment.statuses.light.type ) {

      case 'pyranometer':

        button_calibrate = <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ () => this.light_calibrate("calibratePyranometer") }><span className="glyphicon glyphicon-scale"></span> Calibrate pyranometer</button>

      break;

      case 'photodiode':
      default:

        button_calibrate = <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ () => this.light_calibrate("calibratePD") }><span className="glyphicon glyphicon-scale"></span> Calibrate photodiode</button>
            
      break;
    }

    let button_uv_set = null;
    if( this.state.lightUVSetpoint !== null && ! isNaN( this.state.lightUVSetpoint ) ) {
      button_uv_set = <button className="btn btn-cl btn-default btn-small" onClick= { this.light_controller_setuv } >Apply UV intensity</button>
    }

    return ( 
      <div className="group-status group-status-light col-lg-2">
        <h4>Light bias</h4>
        { this.props.serverState.lightController ?
          content : 
          "No light control is available for this group"
        }


        <div className="row">
            <div className="col-lg-9">

            { ! environment.statuses.light.readonly && 

              <button type="button" className="btn btn-cl btn-default btn-sm"  onClick={ this.light_controller_config }>
                <span className="glyphicon glyphicon-cog"></span> Configure
              </button>
            }

            { button_calibrate } { button_uv_set }
            </div>
          </div>
      </div> 
    );
  }

}

export default LightStatus;