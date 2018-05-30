import React from 'react';
import { ipcRenderer } from "electron";
import { default as HeatStatus_1_0 } from "./heatstatus_1.0.jsx"
import { default as HeatStatus_2_0 } from "./heatstatus_2.0.jsx"
import { default as HeatStatus_ssr_1_0 } from "./heatstatus_ssr_1.0.jsx"
import environment from "../../../../../app/environment.json"

class HeatStatus extends React.Component {

  constructor( props ) {
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

    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  render() {

    let content = null;
    if( ! environment.statuses.heat  ) {
      return null;
    }
        

    switch( environment.statuses.heat.version ) {

      case "1.0": {
        content = ( <HeatStatus_1_0 {...this.props } /> );
        break;
      }

      case "ssr_1.0": {
        content = ( <HeatStatus_ssr_1_0 {...this.props } /> );
        break;
      }

      default:
      case "2.0": {
        content = ( <HeatStatus_2_0 {...this.props} /> );
      }
    };

    return ( 
      
          <div className="group-status group-status-temperature col-lg-2">
            <h4>Temperature & Heating</h4>
            <div>
              { 
                this.state.temperature !== undefined && this.state.temperature !== false ? 
                <div className="row">
                  <div className="col-lg-5">Temperature (env.) :</div>
                  <div className="col-lg-4">{ this.state.temperature } &deg;C</div>
                </div> 
                : null 
              }
            </div>
            { content || null }
        </div>

    );
  }

}

export default HeatStatus;