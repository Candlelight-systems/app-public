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
			
		let trackers = [];

		for( var i in json ) {

			trackers.push(
				<div key={ i } className="container-fluid">
					<TrackerInstrument instrumentId={ i } trackerConfig={ json } config={ tracker } configDB={ db } />
				</div>
    		);
		}

	  ReactDOM.render(
	    <div>
			{ trackers }
	    </div>,
	    document.getElementById('root')
	  );

    });
}