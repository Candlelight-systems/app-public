import React from 'react';
import ReactDOM from 'react-dom';	
import HtmlReport from "./jsx/htmlreport.jsx"
const { ipcRenderer } = require('electron');
	
let data = {
	cellInfo: {}
};
let config = {};

ipcRenderer.on("loadData", ( event, dta ) => {
  data = dta;
  render( );
});

ipcRenderer.on("config", ( event, cfg ) => {
  config = cfg;
  render( );
});

function render( ) {

	ReactDOM.render(
		<HtmlReport config={ config } db={ data.db } measurementName={ data.measurementName } cellInfo={ data.cellInfo } instrumentId={ data.instrumentId } chanId={ data.chanId } />,
		document.getElementById('root')
	);
}