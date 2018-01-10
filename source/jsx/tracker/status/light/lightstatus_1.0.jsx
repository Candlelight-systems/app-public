import React from 'react';
import { ipcRenderer } from "electron";

class LightStatus extends React.Component {

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
    if( this.toggleLightMode ) {
      $( this.toggleLightMode ).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }


  componentDidUpdate( prevProps ) {

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
    }
  }

  render() {

    return (
        <div>
         <div className="row">
            <div className="col-lg-5">
              <span className="grey">Mode:</span>
            </div>
            <div className="col-lg-4">
              <label>
                <input data-toggle="toggle" type="checkbox" ref={ ( el ) => this.toggleLightMode = el } data-width="100" data-height="25" />
              </label>
            </div>
          </div>

            { 
              this.state.lightAutomatic && this.state.lightSetpoint !== undefined ? // In case the light is in automatic mode

              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">
                    Set point:
                  </span> 
                    
                </div> 
                <div className="col-lg-4">
                  { this.state.lightSetpoint } sun
                </div>
              </div>
              : 
              null 
            }

            { this.state.lightValue !== undefined ?
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">
                    Live value:
                  </span> 
                </div> 
                <div className="col-lg-4">

                  { this.state.lightValue.map( ( value, index ) => <span key={ index }>{ value } sun</span> ).reduce( ( prev, curr ) => [ prev, <br key="-1"  />, curr ] ) }
                </div>
              </div> : null 
            }

          </div>
          
      );
  }
}

export default LightStatus