import TrackerDevice from "./device.jsx"
import React from 'react';
import CellButtons from "../cellbuttons.jsx"
import { ipcRenderer } from "electron";
import { query as influxquery } from "../influx";

class TrackerGroupDevices extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      channelChecked: {}
    };  

    this.toggleChannelCheck = this.toggleChannelCheck.bind( this );

    this.cfgAll = this.cfgAll.bind( this );
    this.measureIVAll = this.cfgAll.bind( this );
    this.measureVocAll = this.cfgAll.bind( this );
    this.measureJscAll = this.cfgAll.bind( this );
    this.checkAll = this.checkAll.bind( this );

    this.light_calibrate = this.light_calibrate.bind( this );
    this.light_controller_config = this.light_controller_config.bind( this );
    this.updateGroupStatus = this.updateGroupStatus.bind( this );

    this.heatingPowerChange = this.heatingPowerChange.bind( this );
    this.setHeatingPower = this.setHeatingPower.bind( this );
    this.increaseHeatingPower = this.increaseHeatingPower.bind( this );
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind( this );
    this.resetSlave = this.resetSlave.bind( this );

    this.togglePause = this.togglePause.bind( this );
    this.wsUpdate = this.wsUpdate.bind( this );

    setInterval( () => {
      
      this.updateGroupStatus();
    }, 60000 );


    ipcRenderer.on("light.updated", this.updateGroupStatus );
  }

  componentDidMount() {
    this.updateGroupStatus();
    this.initCheckChannels( this.props );

    this.setState( {
        paused: this.props.paused,
        heatingPower: this.props.serverState ? this.props.serverState.heatingPower : 'N/A',
    });

    ipcRenderer.on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );
  }

  componentWillUnmount() {

    ipcRenderer.removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );  
  }

  wsUpdate( event, data ) {

    if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }
  }



  componentDidUpdate( prevProps ) {

    if( ! this.transformed && this.toggleLightMode ) {

      $( this.toggleLightMode ).bootstrapToggle({
        on: 'Automatic',
        off: 'Manual'
      }).change( () => {

        // Propagate the information to the server
      let saveJSON = {
        instrumentId: this.props.instrumentId,
        groupName: this.props.name,
        lightController: {
          modeAutomatic: !! this.toggleLightMode.checked
        }
      };

      let body = JSON.stringify( saveJSON );
      var headers = new Headers( {
        "Content-Type": "application/json",
        "Content-Length": body.length.toString()
      });

      return fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.saveController", {

        method: 'POST',
        headers: headers,
        body: body

      } ).then( () => {

      } ).catch( ( error ) => {

        ipcRenderer.send("reportError", "Unable to change the light mode" );

      } );

      
    } );
      this.transformed = true;
    }
  }

  updateGroupStatus() {
 
    influxquery( "SELECT time, light1, temperature, humidity FROM \"" + encodeURIComponent( this.props.instrumentId + "_" + this.props.id ) + "\" ORDER BY time DESC limit 1", this.props.configDB.db, this.props.configDB ).then( ( results ) => {

      if( ! results[ 0 ] || !results[ 0 ].series || !results[ 0 ].series[ 0 ] ) {
        return;
      }

      let values = results[ 0 ].series[ 0 ].values[ 0 ];

      this.setState( {

        sun: Math.round( values[ 1 ] * 100 ) / 100,
        temperature: values[ 2 ],
        humidity: values[ 3 ]
      
      } );

    } ).catch( ( error ) => {
      console.error( error );

    } );
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


  cfgAll() {

    var chanIds = [];
    for( var i in this.state.channelChecked ) {
      if( this.state.channelChecked[ i ] ) {
        chanIds.push( parseInt( i ) );
      }
    }

    ipcRenderer.once( "channelsConfigured", ( event, response ) => {
      
      this.setState( { updating: true } );
      
      var data = { 
        instrumentId: this.props.instrumentId, 
        groupName: this.props.name,
        chanIds: chanIds,
        chanStatuses: {}
      };

      delete response.measurementName;
      delete response.enable;
      
      for( var i = 0; i < chanIds.length; i ++ ) {

        data.chanStatuses[ chanIds[ i ] ] = Object.assign( {}, response, { cellName: response["__cellName_" + chanIds[ i ] ] } );;

        //delete response["__cellName_" + chanIds[ i ] ];
      }

      let body = JSON.stringify( data );
      let headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": body.length.toString()
      });


      fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setStatuses", {

        headers: headers,
        method: 'POST',
        body: body

      } ).then( ( response ) => {

        this.props.getStatus();

      } ).catch( () => {

      } );
    });

  
    ipcRenderer.send( "configChannels", {

      instrumentId: this.props.instrumentId, 
      groupName: this.props.name,
      chanIds: chanIds,

      trackerHost: this.props.config.trackerHost,
      trackerPort: this.props.config.trackerPort
    } );
  }

  componentWillReceiveProps( nextProps ) {

    this.initCheckChannels( nextProps );

    this.setState( {
      heatingPower: nextProps.serverState.heatingPower,
      paused: nextProps.paused
    });
  }

  initCheckChannels( nextProps ) {

    let channelChecked = {};
    nextProps.channels.forEach( ( chan ) => {
      channelChecked[ chan.chanId ] = this.state.channelChecked[ chan.chanId ] || false;
    });
    this.setState( { channelChecked: channelChecked } );
  }


  toggleChannelCheck( chanId ) {

    this.setState( 
      ( state ) => { 
        
        state.channelChecked[ chanId ] = ! state.channelChecked[ chanId ];  
        return { channelChecked: state.channelChecked }; 
      } );
  }

  checkAll() {

    for( var i in this.state.channelChecked ) {
      this.state.channelChecked[ i ] = ! this.state.checkAll;
    }

    this.setState( ( state ) => ({

      channelChecked: this.state.channelChecked,
      checkAll: ! this.state.checkAll

    } ) );
  }


  resetSlave() {
    fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/resetSlave?instrumentId=" + this.props.instrumentId, {

      method: 'GET'
    
    }).then( ( response ) => {

    });

  }



  heatingPowerChange( e ) {
      
      const target = event.target;
      const value = target.value;
      const intValue = parseInt( value );
      const name = target.name;

      if( value == "" || ! isNaN( intValue ) ) {
        return;
      }

      this.setState( { [name]: intValue } );
  }

  setHeatingPower( ) {
    
    let power = this.inputHeatingPower.value;
    power /= 100;

    var data = { 
      instrumentId: this.props.instrumentId, 
      groupName: this.props.name,
      power: power
    };

    let body = JSON.stringify( data );
    let headers = new Headers({
      "Content-Type": "application/json",
      "Content-Length": body.length.toString()
    });

    this.setState( { 
      heating_status: 'updating'
    } );

    fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/heat.setPower", {

      method: 'POST',
      headers: headers,
      body: body

    }).then( response => response.json() )
    .then( response => {

      this.props.update();

    }).catch( error => {

      this.setState( { 
        heating_status: 'error'
      } );
    });;
  }


  increaseHeatingPower( ) {
    
    this.setState( { 
      heating_status: 'updating'
    } );

    fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/heat.increasePower?instrumentId=" + encodeURIComponent( this.props.instrumentId ) + "&groupName=" + encodeURIComponent( this.props.name ) )
      .then( response => response.json() )
      .then( response => {

        this.setState( {
          heatingPower: response.heatingPower
        } );

      })
      .catch( error => {

        this.setState( { 
          heating_status: 'error'
        } );

      } );
  }


  decreaseHeatingPower( ) {
    
    this.setState( { 
      heating_status: 'updating'
    } );

    fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/heat.decreasePower?instrumentId=" + encodeURIComponent( this.props.instrumentId ) + "&groupName=" + encodeURIComponent( this.props.name ) )
      .then( response => response.json() )
      .then( response => {

        this.setState( {
          heatingPower: response.heatingPower
        } );

      } ).catch( error => {

        this.setState( { 
          heating_status: 'error'
        } );
    } );

  }

  togglePause() {

    let url;

    if( this.state.paused ) {
      url = "resumeChannels"; 
    } else {
      url = "pauseChannels";
    }
    return fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/" + url + "?instrumentId=" + encodeURIComponent( this.props.instrumentId ), { method: 'GET'  } );

  }


  render() {

    if( this.props.channels ) {
      
      var channelDoms = this.props.channels.map( (chan, i) => {
        
       if( ! this.props.serverState || ! this.props.serverState.channels || ! this.props.serverState.channels[ chan.chanId ] ) {
        return;
       }

       return <TrackerDevice 
          key={ this.props.instrumentId + "_" + chan.chanId } 
          instrumentId={ this.props.instrumentId } 
          groupName={ this.props.name }
          config={ this.props.config } 
          configDB={ this.props.configDB } 
          chanId={ chan.chanId } 
          serverState={ this.props.serverState.channels[ chan.chanId ] }
          updateStatus={ this.props.getStatus }
          toggleChannelCheck={ () => this.toggleChannelCheck( chan.chanId ) }
          channelChecked={ this.state.channelChecked[ chan.chanId ]}  />
      });
    }

    let heatingClass = 'glyphicon glyphicon-';
  
    switch ( this.state.heating_status ) {

      case 1:
        heatingClass += "check";
      break;

      case 2:
        heatingClass += 'updating';
      break;

      case 3:
        heatingClass += 'cross';
      break;

      default:
        heatingClass += 'questionmark';
      break;
    }

    return (
      <div>
      <h4>Group: { this.props.name }</h4>


        <div className="row statuses">
        
        <div className="col-lg-2 group-status group-status-instrument">
          <h4>Instrument status</h4>
          <div className={ "row" + ( this.props.error_influxdb ? ' status-error' : '' ) }>
            <div className="col-lg-5">
              <span title={ this.state.error_influxdb || "" } className={ "glyphicon glyphicon-" + ( this.state.error_influxdb ? 'warning-sign' : 'check' ) }></span> InfluxDB server
            </div>
            <div className="col-lg-4">
              <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ () => { ipcRenderer.send("editInfluxDB" ) } }><span className="glyphicon glyphicon-cog"></span> Configure</button>
            </div>
          </div>

          <div className={ "row" + ( this.props.error_tracker ? ' status-error' : '' ) }>
            <div className="col-lg-5">
              <span title={ this.props.error_tracker || "" } className={ "glyphicon glyphicon-" + ( this.props.error_tracker ? 'warning-sign' : 'check' ) }></span> MPP Tracker
            </div>
            <div className="col-lg-4">
              <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ () => { ipcRenderer.send( "editInstrument", this.props.config.trackerHost ) } }><span className="glyphicon glyphicon-cog"></span> Configure</button>
            </div>
          </div>

          <div className={ "row" + ( this.state.paused ? ' status-error' : '' ) }>
            <div className="col-lg-5">
              <span className={ "glyphicon glyphicon-" + ( this.state.paused ? 'warning-sign' : 'check' ) }></span> { this.state.paused ? "Tracking paused" : "Tracking enabled" }
            </div>
            <div className="col-lg-4">
              <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ this.togglePause }>{ this.state.paused ? <span><span className="glyphicon glyphicon-start"></span>Resume</span> : <span><span className="glyphicon glyphicon-pause"></span>Pause</span> }</button>
            </div>
          </div>

           <div className="row">
            <div className="col-lg-5">
                <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ this.resetSlave }><span>Reset enclosure(s)</span></button>              
            </div>
            <div className="col-lg-4">

            </div>
          </div>


        </div>


          <div className="group-status group-status-light col-lg-2">
              <h4>Light bias</h4>
              <div className="row">
              <div className="col-lg-5">Intensity: { this.state.sun } sun</div>
              <div className="col-lg-4">
                <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ this.light_calibrate }><span className="glyphicon glyphicon-scale"></span> Calibrate</button>
              </div>
              </div>

              <div className={ this.props.serverState.lightController ? 'visible' : 'hidden' }>
                <div className="row">
                  <div className="col-lg-5"><span className="grey">Setpoint:</span> { this.props.serverState.lightSetpoint } sun</div>
                  <div className="col-lg-4"><button type="button" className="btn btn-cl btn-default btn-sm"  onClick={ this.light_controller_config }><span className="glyphicon glyphicon-cog"></span> Configure</button></div>
                </div>
                <div className="row">
                  <div className="col-lg-5"><span className="grey">Mode</span></div>
                  <div className="col-lg-4">
                    <label className="checkbox-inline">
                      <input type="checkbox" ref={ ( el ) => this.toggleLightMode = el } checked={ this.props.serverState.lightModeAutomatic } data-width="100" data-height="25" />
                    </label>
                  </div>
                </div>
              </div>
              

          </div>

           
          <div className="group-status group-status-temperature col-lg-2">
            <h4>Temperature</h4>
            { this.state.temperature !== -1 && 
              <div>
                <div className="col-lg-9">Box temperature: { this.state.temperature } &deg;C</div>
              </div> }


            { this.props.groupConfig.heatController &&
              <div>
                <div className="col-lg-5">
                  Heating power: { this.state.heatingPower == -1 ? 'Off' : Math.round( this.state.heatingPower * 100 ) + " %" }
                </div>
                <div className="col-lg-4">
                    <button type="button" className="btn-sm btn btn-default" onClick={ this.increaseHeatingPower }>+</button>&nbsp;
                    <button type="button" className="btn-sm btn btn-default" onClick={ this.decreaseHeatingPower }>-</button>
                </div>
            </div>
          }
        </div>



        <div className="clearfix"></div>
        </div>

        
        <div className="row">
            
          <div className="cell-configure-all col-lg-9">
            
            <button className="btn btn-default btn-cl" onClick={ this.checkAll }><span className="glyphicon glyphicon-cog"></span> { this.state.checkAll ? 'Deselect all' : 'Select all'}</button>
             &nbsp;
            <button className="btn btn-default btn-cl" onClick={ this.cfgAll }><span className="glyphicon glyphicon-cog"></span> Configure selected</button>
          </div>
        </div>

        <div>
        { channelDoms }
        </div>
      </div>
    );
  }

}

export default TrackerGroupDevices;