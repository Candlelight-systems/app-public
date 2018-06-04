import TrackerDevice from "./device.jsx"
import React from 'react';
import { ipcRenderer } from "electron";
import LightStatus from './status/light/main.jsx';
import HeatStatus from './status/heat/main.jsx';
import InstrumentStatus from './status/instrument/main.jsx'


import { setChannelStatuses } from '../../queries'

class TrackerGroupDevices extends React.Component {

  constructor( props ) {


    super( props );
    this.state = {
      channelChecked: {}
    };  

    this.toggleChannelCheck = this.toggleChannelCheck.bind( this );
    this.cfgAll = this.cfgAll.bind( this );
    this.checkAll = this.checkAll.bind( this );
    this.resetSlave = this.resetSlave.bind( this );
    this.wsUpdate = this.wsUpdate.bind( this );
  }

  componentDidMount() {

    this.initCheckChannels( this.props );

    this.setState( {
        paused: this.props.paused,
        heatingPower: this.props.serverState ? this.props.serverState.heatingPower : 'N/A',
    });

    ipcRenderer.on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate );
    this.doEnvironmentalSensing();
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



  componentDidUpdate( prevProps ) {

  }
/*
      this.setState( {

        sun: Math.round( values[ 1 ] * 100 ) / 100,
        temperature: values[ 2 ],
        humidity: values[ 3 ]
      
      } );
      */


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
        data.chanStatuses[ chanIds[ i ] ] = Object.assign( {}, response, { cellName: response["__cellName_" + chanIds[ i ] ] } );
        //delete response["__cellName_" + chanIds[ i ] ];
      }

      return setChannelStatuses( this.props.config, data )
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


  doEnvironmentalSensing() {

    fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/environmentalSensing?instrumentId=${ this.props.instrumentId }&groupName=${ this.props.name }`, {

      method: 'GET'
    
    }).then( ( response ) => {

    });

  }


  resetSlave() {
    fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/resetSlave?instrumentId=${ this.props.instrumentId }`, {

      method: 'GET'
    
    }).then( ( response ) => {

    });

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
          <InstrumentStatus {...this.props } />
          <LightStatus {...this.props } />
          <HeatStatus {...this.props } />
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