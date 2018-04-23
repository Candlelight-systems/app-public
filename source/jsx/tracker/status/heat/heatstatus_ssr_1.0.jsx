import React from 'react';
import { ipcRenderer } from "electron";

class HeatStatus extends React.Component {

  constructor() {

    super( ...arguments );
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind( this );

    this.setTargetTemperature = this.setTargetTemperature.bind( this );
    this.changeTargetTemperature = this.changeTargetTemperature.bind( this );
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

    // New state means re-enabling
    /*if( this.toggleLightMode ) {
      $( this.toggleLightMode ).bootstrapToggle('enable');
    }*/
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }


  changeTargetTemperature( e ) {

    this.setState( { 
      input_heater_target_temperature: e.target.value
    });
  }

  setTargetTemperature() {
    fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/heat.setTarget?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }&target=${ this.state.input_heater_target_temperature }` , {

        method: 'GET',
        
    } ).then( ( response ) => {

    } );
  }

  componentDidUpdate( prevProps ) {

    if( this.buttonHeatCool && ! this.transformed ) {

      $( this.buttonHeatCool ).bootstrapToggle({
        on: 'Cooling',
        off: 'Heating'
      }).change( () => {

        $( this.buttonHeatCool ).bootstrapToggle('disable');

        fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/heat.${ this.buttonHeatCool.checked ? 'setCooling' : 'setHeating'}?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }` , {

          method: 'GET',
          
        } ).then( ( response ) => {

          $( this.buttonHeatCool ).bootstrapToggle('enable');

        } ).catch( () => {

          ipcRenderer.send("reportError", "Unable to switch the heater polarity" );

        } );
      } );      
      this.transformed = true;
    }

    if( this.buttonHeatCool ) {
     $( this.buttonHeatCool ).data('bs.toggle')[( this.state.heater_status ? 'on' : 'off' ) ]( true );
    }
  }

  render() {

    return ( <div>
          { this.props.serverState.heatController ?
            <div>
              <div className="row">
                <div className="col-lg-5">
                  Mode
                </div>
                <div className="col-lg-4">

                  <label>
                    <input data-toggle="toggle" disabled="disabled" type="checkbox" ref={ ( el ) => this.buttonHeatCool = el }  checked={ this.state.heater_status } data-width="100" data-height="25" />
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-5">
                  Reference temperature
                </div>
                <div className="col-lg-4">
                    { ( this.state.heater_reference_temperature || "N/A" ) + " °C" }
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  Target temperature:
                </div>
                <div>{ this.state.heater_target_temperature || 'N/A' } °C</div>
              </div>

              <div className="row">
                <div className="col-lg-5">
                  New target temperature:
                </div>
                <div className="col-lg-4">
                    <div className="input-group">
                      <input type="number" onChange={ this.changeTargetTemperature } className="form-control" min="10" max="85" step="0.5" value={ this.state.input_heater_target_temperature } />
                      <span className="input-group-addon">°C</span>
                      <span className="input-btn-group">
                        <button className="btn btn-default" onClick={ this.setTargetTemperature } type="button">Set temperature</button>
                      </span>
                    </div>
                </div>
                  
                  </div>
          </div>
        : null }</div>
        );
      }
}

export default HeatStatus