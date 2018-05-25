import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./jsx/header.jsx";
import InstrumentList from "./jsx/instrumentlist.jsx";
import { ipcRenderer } from "electron";
import environment from "../app/environment.json"

ipcRenderer.on("reloadInstruments", () => {
  render();
});

function mppt_keithley_2400() {
  ipcRenderer.send("mppt", "keithley2400");
}


function edit_influxdb() {
  ipcRenderer.send("editInfluxDB");
}


function render( ) {

  ReactDOM.render(
    <div>
      <Header />
      <div className="container">

      
      { environment.ageing && <div>
          <div className="row">
            <div className="pull-right">
                <button className="btn btn-default" onClick={ edit_influxdb }><a href="#">Edit InfluxDB connection</a></button>
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