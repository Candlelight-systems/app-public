import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./jsx/header.jsx";
import InstrumentList from "./jsx/instrumentlist.jsx";
import { ipcRenderer } from "electron";
import environment from "../app/environment.json"
import { ping, checkAuth, checkDB } from "./influx"

let influx_error = undefined;
let influx_warning = undefined;

ipcRenderer.on("reloadInstruments", () => {
  render();
});
 
ipcRenderer.on("dbInformation", async ( event, db ) => {

  influx_error = false;

  try {
    console.log( db );

      await ping( db );
      await checkDB( db, db.username, db.password, db.db );
      await checkAuth( db, db.username, db.password, db.db );

      influx_warning = false;
      influx_error = false;

    } catch( e ) {
      
      // No privileges doesn't mean no write access...
      if( e === "No user defined" || e === "User not found" || e === "No privileges found" || e === "Bad credentials" ) {
        // Ok that's fine
        influx_warning = true;
        influx_error = false;
      } else {
        influx_warning = false;
        influx_error = true;
      }
    }

  render();
});


function mppt_keithley_2400() {
  ipcRenderer.send("mppt", "keithley2400");
}


function edit_influxdb() {
  ipcRenderer.send("editInfluxDB");
}


function render( ) {

  let status = null;

  if( influx_error !== undefined && influx_warning !== undefined ) {
    
      if( influx_error ) {
        status = <span className="text-danger"><span className="glyphicon glyphicon-remove"></span> Cannot connect</span>;
      } else if ( influx_warning ) {
        status = <span className="text-warning"><span className="glyphicon glyphicon-warning-sign"></span> Partial DB access</span>;
      } else {
        status = <span className="text-success"><span className="glyphicon glyphicon-check"></span> Connection ok</span>;
      }
  }

  ReactDOM.render(
    <div>
      <Header />
      <div className="container">

      
      { environment.ageing && <div>
          <div className="row">
            <div className="pull-right">
                InfluxDB status: { status } &nbsp; <button className="btn btn-default" onClick={ edit_influxdb }><a href="#">Edit InfluxDB connection</a></button>
            </div>
            <h4>Ageing setups</h4>
          </div>
          <InstrumentList mode="ageing" />
        </div>
      }

      { environment.measurement && <div>
          <div className="row">
            <h4>Precision measurements</h4>
          </div>
          <InstrumentList mode="measurement" />
        </div>
      }
        <h4>Maximum power point tracking</h4>
        <ul className="list-group">
          <li className="list-group-item" onClick={ mppt_keithley_2400 }><a href="#">Keithley 2400</a></li>
        </ul>
      </div>
    </div> ,
    document.getElementById('root')
  );
}

render();

/**/