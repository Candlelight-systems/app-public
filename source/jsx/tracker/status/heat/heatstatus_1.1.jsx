import React from 'react'
import { ipcRenderer } from "electron"
import urllib from 'url-lib'


class HeatStatus extends React.Component {

  constructor() {

    super( ...arguments );
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind( this );

    // Heat change methods. Bind them to this
    this.increaseHeatingPower = this.increaseHeatingPower.bind( this );
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind( this );
  }



  increaseHeatingPower( ) {
    
    this.setState( { 
      heating_status: 'updating'
    } );

    fetch( urllib.formatUrl( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort}/heat.increasePower`, {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name
    } ) )
      .then( () => {
        this.setState( { 
          heater_error: false
        } );
      }).catch( error => {
        this.setState( { 
          heater_error: 'Cannot increase the heating power. Internal error'
        } );
      } );
  }


  decreaseHeatingPower( ) {
    
    this.setState( { 
      heating_status: 'updating'
    } );

    fetch( urllib.formatUrl( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort}/heat.decreasePower`, {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name
    } ) )
      .then( () => {
        this.setState( { 
          heater_error: false
        } );
      }).catch( error => {
        this.setState( { 
          heater_error: 'Cannot decrease the heating power. Internal error'
        } );
    } );
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
    if( this.toggleHeater ) {
      $( this.toggleHeater ).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate( prevProps ) {

  }

  render() {

    console.log( this.state );
    return (
          this.props.serverState.heatController ?
            <div>
              <div className="row">
                <div className="col-lg-5">
                  Heater
                </div>
              </div>

              { this.state.heater_error ?
                <div className="error">{ this.state.heater_error}</div> : null
              }

              {
                this.state.heater_power !== undefined ? 

                  <div>
                    <div className="row">
                      <div className="col-lg-5">
                        Heating power: { Math.round( this.state.heater_power * 100 ) + " %" }
                      </div>
                  
                      <div className="col-lg-4">
                          <div className="btn-group">
                            <button type="button" className="btn-sm btn btn-default" onClick={ this.increaseHeatingPower }>+</button>&nbsp;
                            <button type="button" className="btn-sm btn btn-default" onClick={ this.decreaseHeatingPower }>-</button>
                          </div>
                      </div>
                    </div>
                    
                </div> : null }
          </div>
        : null
        );
  }
}

export default HeatStatus