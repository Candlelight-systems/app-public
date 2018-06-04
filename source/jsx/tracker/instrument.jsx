
import React from 'react';

import TrackerGroupDevices from "./group.jsx"
import Error from "../error.jsx"
import { ipcRenderer } from "electron";

import debounce from "lodash.debounce"
import { ping } from "../../influx";

class TrackerInstrument extends React.Component {

  constructor( props ) {

    super( props );

    this.state = {
      cfg: props.config,
      paused: false,
      serverState: {}
    };

    if( ! props.config ) {
      this.state.error = "No configuration file was found for this instrument."
    }

    setInterval( () => {
      this.updateInstrument();
      this.updateStatus();
    }, 10000 );


    this.configure = this.configure.bind( this );
    this.editInstrument = this.editInstrument.bind( this );
    this.updateInstrument = this.updateInstrument.bind( this );
    this.getStatus = this.getStatus.bind( this );
    this.updateStatus = this.updateStatus.bind( this );
    
//    this.checkAll = this.checkAll.bind( this );

    window.addEventListener("online", ( ) => {
      this.updateStatus();
      this.ping();
    });

    window.addEventListener("offline", ( ) => {
      this.updateStatus();
      this.ping();
    });

    ipcRenderer.on("light.updated", () => { this.updateInstrument() } );


  }

  async ping( props = this.props ) {
    return ping( this.props.configDB ).catch( ( error ) => { 

      console.warn("Cannot reach influx DB. Error was: ", error );
      
      this.setState( {
        error_influxdb: "Connection to influxDB has failed: \"" + error + "\""
      } );

      return Promise.reject();

    } );
  }

  async updateStatus() {
    this.getStatus().then( ( serverState ) => {

     this.setState( { 
      serverState: serverState, 
      error_tracker: false 
    } ); 
   } ).catch( ( error ) => {

    console.warn("Cannot retrieve channel statuses. Error was: ", error );
      // TODO something
      this.setState( { error_tracker: error } );
    } );
  }

  async getStatus( props = this.props ) {

    return fetch( "http://" + props.config.trackerHost + ":" + props.config.trackerPort + "/getStatus?instrumentId=" + props.instrumentId, {

      method: 'GET'

    } )
    .then( ( response ) => { if( response.status !== 200 ) throw "500 Internal server error"; else return response; } )
    .then( response => response.json() )
    .catch( error => {

/*
      setTimeout( () => {
        
        this.updateInstrument();
      }, 3000 );
*/
      this.setState( {
        error: `Error while retrieving the instrument status. The returned error was ${ error.toString() }.`,
        errorMethods: [ [ "Retry", this.updateInstrument ] ] 
      } );

    } );
  }

  editInstrument() {
    ipcRenderer.send( "editInstrument", this.props.config.trackerHost );
  }

  componentWillReceiveProps( nextProps ) {

    this.setState( { cfg: nextProps.config } );

    this.updateInstrument( nextProps );
  }

  configure() {
    $( this.modal ).modal( 'show' );
  }

  componentDidMount() {
    this.ipChanged( );
  }

  ipChanged( ) {
    this.updateInstrument();
  }

  getConfig( props = this.props ) {

    return fetch( "http://" + this.state.cfg.trackerHost + ":" + this.state.cfg.trackerPort + "/getInstrumentConfig?instrumentId=" + props.instrumentId, { method: 'GET'  } )
    .then( ( response ) => { if( response.status !== 200 ) throw "500 Internal server error"; else return response; } )
    .then( ( response ) => response.json() )
    .catch( error => {

      setTimeout( () => {        
        this.updateInstrument();
      }, 3000 );

      this.setState( { 
        error: error.message || "The connection to the tracker has failed. Check that the ip address (" + this.state.cfg.trackerHost + ") is correct and that you have access to the network", 
        errorMethods: [ [ "Edit the instrument config", this.editInstrument ], [ "Retry", this.updateInstrument ] ] 
      } ); 



      return Promise.reject();
    } );
  }

  updateInstrument = debounce( ( props = this.props ) => {

    return Promise.all( [

      this.getConfig( props ),

      this.getStatus( props ),

      this.ping( props )

      ] ).then( ( args ) => {

        let groups = args[ 0 ],
        status = args[ 1 ],
        ping = args[ 2 ];


        this.setState( { 
          groups: groups.groups,
          serverState: status,
          paused: status.paused,
          error_influxdb: false,
          error_tracker: false,
          error: false
        } );

      } ).catch( ( e ) => { } );

    }, 100 )

  refreshrateChanged( rate ) {

    this.setState( {
      refreshRate: rate 
    } );
  }

  
  render() {

    let content;
    
    if( this.state.error || ! this.state.serverState ) {
      
      content = (
        <div>
          <Error message={ this.state.error || this.state.error_influxdb || this.state.error_tracker } methods={ this.state.errorMethods } />
        </div> 
      );

    } else if( this.state.groups ) {


        var groupsDoms = this.state.groups.map( ( group, i ) => {

         return <TrackerGroupDevices 

           showHeader={this.state.groups.length > 1}
           key={ group.groupID } 
           instrumentId={ this.props.instrumentId } 
           id={ group.groupID } 
           name={ group.groupName }
           channels={ group.channels }
           groupConfig={ group }
           config={ this.props.config } 
           configDB={ this.props.configDB } 
           serverState={ this.state.serverState[ group.groupName ] }
           update={ this.updateInstrument }
           getStatus={ this.updateStatus }

           error_influxdb={ this.state.error_influxdb }
           error_tracker={ this.state.error_tracker }
           paused={ this.state.paused }
         />
       } );
    

      content = groupsDoms;

    }

    return (
      <div>
        <h3>Instrument: { this.props.instrumentId }</h3>
        { content }
      </div> 
    );
  }
}


export default TrackerInstrument