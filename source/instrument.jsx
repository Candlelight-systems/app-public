import React from 'react';
import ReactDOM from 'react-dom';
import TrackerInstrument from "./jsx/tracker/instrument.jsx"

import { ipcRenderer } from "electron";

//import cellstatusrender from "./cellstatusrender.jsx"
  
let config;
let tracker;
let db;

ipcRenderer.on("reloadDB", ( event, cfg ) => {
	
	db = cfg.db;
	render();
});

ipcRenderer.on( "loadInstrument", ( event, cfg ) => {

	tracker = cfg.tracker;
	db = cfg.db;
	render();
});

function render( cfg ) {

	fetch( "http://" + tracker.trackerHost + ":" + tracker.trackerPort + "/getInstruments", {
      method: 'GET'
    }).then( ( response ) => response.json() ).then( ( json ) => {
		
		  ReactDOM.render(
		    <div>
				{ json.map( ( json ) => {

					return <div key={ json.instrumentId }>
    					<h3>{ json.instrumentId }</h3>
    					<TrackerInstrument instrumentId={ json.instrumentId } fullScaleCurrent={ json.fullScaleCurrent } config={ tracker } configDB={ db } />
    				</div> } ) }
		    </div>,
		    document.getElementById('root')
		  );

    });
}