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

    this.pauseAll = this.pauseAll.bind( this );
    this.resumeAll = this.resumeAll.bind( this );
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

    setInterval( () => {
      
      this.updateGroupStatus();
    }, 60000 );


    ipcRenderer.on("light.updated", this.updateGroupStatus );
  }

  componentDidMount() {
    this.updateGroupStatus();
    this.initCheckChannels( this.props );
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
      heatingPower: nextProps.serverState.heatingPower
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


  pauseAll() {

    fetch( "http://" + this.props.cfg.trackerHost + ":" + this.props.cfg.trackerPort + "/pauseChannels", {

      method: 'GET'
    
    }).then( ( response ) => {

      this.setState( { paused: true } );
    });
  }


  resumeAll() {

    fetch( "http://" + this.props.cfg.trackerHost + ":" + this.props.cfg.trackerPort + "/resumeChannels", {
      method: 'GET'
    }).then( ( response ) => {

      this.setState( { paused: false } );
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
      
          <div className="group-status group-status-light col-lg-3">
            <h3>Light bias</h3>

              <div className="col-lg-6">Intensity: { this.state.sun } sun</div>
              <div className="col-lg-6">
                <button type="button" className="btn btn-default btn-sm" onClick={ this.light_calibrate }>Calibrate</button>
              </div>
                

            { !! this.props.serverState.lightController && <div>
                <div className="col-lg-6">Setpoint: { this.props.serverState.lightSetpoint } sun</div>
                <div className="col-lg-6"><button type="button" className="btn btn-default btn-sm"  onClick={ this.light_controller_config }>Configure</button></div>
              </div>
            }

          </div>

           
          <div className="group-status group-status-temperature col-lg-3">
         
            { this.state.temperature !== -1 && 
              <div>
                <div className="col-lg-6">Temperature: { this.state.temperature } &deg;C</div>
              </div> }


            { this.props.groupConfig.heatController &&
              <div>
                <div className="col-lg-6">
                  Heating power: { this.state.heatingPower == -1 ? 'Off' : Math.round( this.state.heatingPower * 100 ) + " %" }
                </div>
                <div className="col-lg-6">
                    <button type="button" className="btn-sm btn btn-default" onClick={ this.increaseHeatingPower }>+</button>&nbsp;
                    <button type="button" className="btn-sm btn btn-default" onClick={ this.decreaseHeatingPower }>-</button>
                </div>
            </div>
          }
        </div>


        { 
          this.state.humidity !== -1 && 
          <div className="group-status group-status-temperature col-lg-3">
              <div>
                <div className="col-lg-6">Humidity: { this.state.humidity } %</div>
              </div>
          </div> 
        }

        <div className="clearfix"></div>
        </div>

        <div className="cell toprow">
          <div className="row">
            <div className="col-sm-2">
              <span>
                <input className="channel-check" type="checkbox" onClick={ this.checkAll } checked={ this.state.checkAll } /> 
                 &nbsp;<a href="#" onClick={ this.cfgAll }>Configure</a>
              </span>
            </div>
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