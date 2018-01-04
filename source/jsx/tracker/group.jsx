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
    

    this.heatingPowerChange = this.heatingPowerChange.bind( this );
    this.setHeatingPower = this.setHeatingPower.bind( this );
    this.increaseHeatingPower = this.increaseHeatingPower.bind( this );
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind( this );
    this.resetSlave = this.resetSlave.bind( this );

    this.togglePause = this.togglePause.bind( this );
    this.wsUpdate = this.wsUpdate.bind( this );

  }

  componentDidMount() {

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
console.log( data, "UPDATING !!!" );
    // Update directly the state
    this.setState( data.data );

    // New state means re-enabling
    if( this.toggleLightEnable ) {
      $( this.toggleLightEnable ).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }



  componentDidUpdate( prevProps ) {

    if( this.toggleLightEnable && ! this.transformed ) {

      $( this.toggleLightEnable ).bootstrapToggle({
        on: 'On',
        off: 'Off'
      }).change( () => {

        $( this.toggleLightEnable ).bootstrapToggle('disable');

        return fetch( `http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/light.${ this.toggleLightEnable.checked ? 'enable' : 'disable'}?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }`, {
          method: 'GET',
        } ).then( () => {

        } ).catch( ( error ) => {

          ipcRenderer.send("reportError", "Unable to change the light mode" );

        } ).then( () => {


        } );
      } );      
      this.transformed = true;
    }

    if( this.toggleLightEnable ) {
     $( this.toggleLightEnable ).data('bs.toggle')[( this.state.lightOnOff ? 'on' : 'off' ) ]( true );
    }
  }
/*
      this.setState( {

        sun: Math.round( values[ 1 ] * 100 ) / 100,
        temperature: values[ 2 ],
        humidity: values[ 3 ]
      
      } );
      */

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
      <div className="cl-group">
      { !!this.props.showHeader && <h4>Group: { this.props.name }</h4> }

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
              
              <div className={ this.props.serverState.lightController ? 'visible' : 'hidden' }>


                <div className="row">
                  <div className="col-lg-5">
                    <span className="grey">On/Off:</span>
                  </div>
                  <div className="col-lg-4">
                    <label>
                      <input data-toggle="toggle" type="checkbox" ref={ ( el ) => this.toggleLightEnable = el } data-width="70" data-height="25" />
                    </label>
                  </div>
                </div>
                  
                { this.state.lightOnOff ? 
                  
                  <div>
                    { this.state.lightOnOffButton !== this.state.lightOnOff ? 
                    <div className="row">
                      <div className="col-lg-9">
                        <span className="grey"><em><small><span className="glyphicon glyphicon-danger"></span>The light switch is off. Push it to turn the light on.</small></em></span>
                      </div>
                    </div> 
                    : 
                    null }
                  

                  <div className="row">
                    <div className="col-lg-5">
                      <span className="grey">Control mode:</span>
                    </div>
                    <div className="col-lg-4">
                      { this.state.lightMode == 'auto' ? <span>Automatic</span> : <span>Manual</span> }
                    </div>
                  </div> 


                  { 
                    this.state.lightMode == 'auto' && this.state.lightSetpoint !== undefined ? // In case the light is in automatic mode

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
                          Current value:
                        </span> 
                      </div> 
                      <div className="col-lg-4">
                        { this.state.lightValue } sun
                      </div>
                    </div> : null 
                  }</div> : null }

                <div className="row">
                  <div className="col-lg-9">
                    <button type="button" className="btn btn-cl btn-default btn-sm"  onClick={ this.light_controller_config }>
                      <span className="glyphicon glyphicon-cog"></span> Configure
                    </button>
                    <button type="button" className="btn btn-cl btn-default btn-sm" onClick={ this.light_calibrate }><span className="glyphicon glyphicon-scale"></span> Calibrate</button>
                  </div>
                </div>

              </div>
          </div>

           
          <div className="group-status group-status-temperature col-lg-2">
            <h4>Temperature</h4>
            <div>
              { 
                this.state.temperature !== -1 && this.state.temperature !== undefined ? 
                <div>
                  <div className="col-lg-9">Box temperature: { /*this.state.temperature*/ } &deg;C</div>
                </div> 
                : null 
              }
            </div>

            { this.props.groupConfig.heat ?
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