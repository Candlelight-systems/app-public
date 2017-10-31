
import React from 'react';
import $ from "jquery";
import fs from "fs";
import { ipcRenderer } from "electron";

class InstrumentList extends React.Component {
  
  constructor() {
    super( ...arguments );

    setInterval( () => {

      this.readConfig().instruments.forEach( ( cfg ) => {

        let stateName = ( "status_" + cfg.trackerHost );

        fetch( "http://" + cfg.trackerHost + ":" + cfg.trackerPort + "/idn" ).then( ( response ) => {

          this.setState( { [ stateName ]: true } );
        
        }).catch( () => {

          this.setState( { [ stateName ]: false } );

        });

      });

    }, 1000 );

    this.state = {};
    this.loadInstrument = this.loadInstrument.bind( this );
    this.addInstrument = this.addInstrument.bind( this );
    this.removeInstrument = this.removeInstrument.bind( this );
    this.editInstrument = this.editInstrument.bind( this );

  }
  addInstrument() {
    ipcRenderer.send("addInstrument");
  }

  loadInstrument( event ) {

    let instrumentHost = event.currentTarget.getAttribute('id')
    
    if( ! this.state[ "status_" + instrumentHost ] ) {
      return;
    }

    ipcRenderer.send("loadInstrument", instrumentHost );
  }

  removeInstrument( event ) {
    event.stopPropagation();
    ipcRenderer.send("removeInstrument", event.target.parentNode.parentNode.parentNode.getAttribute('id') );
  }

  editInstrument( event ) {
    event.stopPropagation();
    ipcRenderer.send("editInstrument", event.target.parentNode.parentNode.parentNode.getAttribute('id') );
  }

  readConfig() {

    let cfg;

    try {
      
      cfg = JSON.parse( fs.readFileSync( __dirname + '/../config.json') );
      
      cfg.instruments = cfg.instruments || [];

    } catch( e ) {
      return null;
    }

    return cfg;
  }

  render() {

    const config = this.readConfig();

    if( config === null ) {
      return null;
    }

    let instruments = config.instruments.map( ( config ) => {
console.log( config.trackerHost );
        let connected = !! this.state[ 'status_' + config.trackerHost ];

        return (
          <li 
            className = { ( "list-group-item " + ( connected ? 'bg-success' : 'bg-danger' ) ) } 
            id =        { config.trackerHost } 
            onClick =   { this.loadInstrument } 
            key =       { config.trackerHost } >
            
            <div className="pull-right">
              <a href="#"><span className="glyphicon glyphicon-remove" onClick={this.removeInstrument}></span></a>&nbsp;
              <a href="#"><span className="glyphicon glyphicon-edit" onClick={this.editInstrument}></span></a>
            </div>

            <span className={ ( "glyphicon glyphicon-" + ( connected ? 'ok text-success' : 'warning-sign text-danger' ) ) }></span>
            &nbsp; {config.trackerName}

          </li> );
    } );

    
    instruments.push(<li className="list-group-item" onClick={this.addInstrument} key="__new"><a href="#">+ Add an instrument</a></li>)

    return (
        <ul id="instrumentList" className="list-group">{ instruments }</ul>
    );
  }
}

export default InstrumentList;