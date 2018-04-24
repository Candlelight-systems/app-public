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

    
  }

  render() {

    return (
        <div>
            { this.state.lightValue !== undefined && this.state.lightValue !== null ?
              <div className="row">
                <div className="col-lg-5">
                  <span className="grey">
                    Live value:
                  </span> 
                </div> 
                <div className="col-lg-4">
                  { Math.round( this.state.lightValue * 100 ) / 100 } sun
                </div>
              </div> : "Current value unknown" 
            }
        </div> );
  }
}

export default LightStatus