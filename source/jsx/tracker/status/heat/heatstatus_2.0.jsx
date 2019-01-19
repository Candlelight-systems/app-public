import React from 'react';
import { ipcRenderer } from "electron";

class HeatStatus extends React.Component {

  constructor() {

    super( ...arguments );
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind( this );

    this.increaseHeatingPower = this.increaseHeatingPower.bind( this );
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind( this );
  }

  componentDidMount() {

    ipcRenderer.on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );  
  }

  increaseHeatingPower() {

    fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/heat.increasePower?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }` , {

        method: 'GET',
        
      } ).then( ( response ) => {

        $( this.enableDCDC ).bootstrapToggle('enable');

      } ).catch( () => {

        ipcRenderer.send("reportError", "Unable to enable / disable the heater" );

      } );

  }

  decreaseHeatingPower() {

     fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/heat.decreasePower?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }` , {

        method: 'GET',
        
      } ).then( ( response ) => {

        $( this.enableDCDC ).bootstrapToggle('enable');

      } ).catch( () => {

        ipcRenderer.send("reportError", "Unable to enable / disable the heater" );

      } );

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

    if( this.enableDCDC && ! this.transformed ) {

      $( this.enableDCDC ).bootstrapToggle({
        on: 'On',
        off: 'Off'
      }).change( () => {

        $( this.enableDCDC ).bootstrapToggle('disable');

        fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/heat.${ this.enableDCDC.checked ? 'enable' : 'disable'}?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }` , {

          method: 'GET',
          
        } ).then( ( response ) => {

          $( this.enableDCDC ).bootstrapToggle('enable');

        } ).catch( () => {

          ipcRenderer.send("reportError", "Unable to enable / disable the heater" );

        } );
      } );      
      this.transformed = true;
    }

    if( this.enableDCDC ) {
     $( this.enableDCDC ).data('bs.toggle')[( this.state.heater_status ? 'on' : 'off' ) ]( true );
    }
  }

  render() {

    let heating_problem = this.state.heating_voltage / this.state.heating_current > 20;
    if( this.state.heating_voltage < 1 || ! this.state.heating_voltage ) { // For low voltage, let's not flag anything
      heating_problem = false;
    }
    return ( <div>
          { this.props.serverState.heatController ?
            <div>
              <div className="row">
                <div className="col-lg-5">
                  Heater
                </div>
                <div className="col-lg-4">

                  <label>
                    <input data-toggle="toggle" type="checkbox" ref={ ( el ) => this.enableDCDC = el }  checked={ this.state.heater_status } data-width="100" data-height="25" />
                  </label>
                </div>
              </div>

              { this.state.heater_status ? 

                <div>
                
                  <div className="row">
                    <div className="col-lg-5">
                      Heating power: { this.state.heater_power + " W" }
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
                      Current: { this.state.heater_current + " A" }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      Voltage: { this.state.heater_voltage + " V" }
                    </div>
                  </div>

                  { heating_problem ? 
                    <div className="row">
                      <span className="grey"><span className="glyphicon glyphicon-warning"></span> The calculated heater resistance is off. Check that the pins are properly contacting the window</span>
                    </div> : null
                  }
              </div> : null }
          </div>
        : null }</div>
        );
      }
}

export default HeatStatus