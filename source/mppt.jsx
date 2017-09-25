import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./jsx/header.jsx";
import MPPT from "./jsx/mppt.jsx";
import { ipcRenderer } from "electron";


function render( ) {

  ReactDOM.render(
    <div>
      <MPPT model="keithley2400" />
    </div> ,
    document.getElementById('root')
  );
}

render();

