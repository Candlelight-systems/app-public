import React from 'react';
import { ipcRenderer } from "electron";

class HeatStatus extends React.Component {

  constructor() {

    super( ...arguments );
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind( this );
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


  componentDidUpdate( prevProps ) {
/*
    if( this.toggleLightMode && ! this.transformed ) {

      $( this.toggleLightMode ).bootstrapToggle({
        on: 'Auto',
        off: 'Manual'
      }).change( () => {

        $( this.toggleLightMode ).bootstrapToggle('disable');

        let data = {
          instrumentId: this.props.instrumentId,
          groupName: this.props.name,
          lightController: {
            modeAutomatic: this.toggleLightMode.checked
          }  
        };

        let body = JSON.stringify( data );
        let headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": body.length.toString()
        });


        fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.saveController", {

          headers: headers,
          method: 'POST',
          body: body

        } ).then( ( response ) => {

          $( this.toggleLightMode ).bootstrapToggle('enable');

          
        } ).catch( () => {

          ipcRenderer.send("reportError", "Unable to change the light mode" );

        } );
      } );      
      this.transformed = true;
    }

    if( this.toggleLightMode ) {
     $( this.toggleLightMode ).data('bs.toggle')[( this.state.lightAutomatic ? 'on' : 'off' ) ]( true );
    }*/
  }

  render() {

    return null;

    /*
    return (
          { this.props.serverState.heatController ?
            <div>
              <div className="row">
                <div className="col-lg-5">
                  Heater
                </div>
                <div className="col-lg-4">

                  <label>
                    <input data-toggle="toggle" type="checkbox" ref={ ( el ) => this.toggleHeater = el } disabled={ this.state.heater_status_updating } checked={ this.state.heater_status } data-width="100" data-height="25" />
                  </label>
                </div>
              </div>

              { this.state.heater_status ? 

                <div>
                
                  <div className="row">
                    <div className="col-lg-5">
                      Heating power: { this.state.heating_power + " W" }
                    </div>
                
                    <div className="col-lg-4">
                        <div className="btn-group">
                          <button type="button" className="btn-sm btn btn-default" onClick={ this.increaseHeatingPower }>+</button>&nbsp;
                          <button type="button" className="btn-sm btn btn-default" onClick={ this.decreaseHeatingPower }>-</button>
                        </div>
                    </div>
                
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      Current: { this.state.heating_current + " A" }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      Voltage: { this.state.heating_voltage + " V" }
                    </div>
                  </div>

                  { heating_problem ? 
                    <div className="row">
                      <span className="grey"><span className="glyphicon glyphicon-warning"></span> The calculated heater resistance is off. Check that the pins are properly contacting the window</span>
                    </div> : null
                  }
              </div> : null }
          </div>
        : null }
        );*/
      }
}

export default HeatStatus