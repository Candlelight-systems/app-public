import React from 'react';
import ReactDOM from 'react-dom';	
import HtmlReportControl from "./jsx/htmlreport_control.jsx"


const { ipcRenderer } = require('electron');

ipcRenderer.on("loadForm", ( event, data ) => {
  render( data );
});

function render( props ) {

	ReactDOM.render(
		<HtmlReportControl db={ props.db } measurementName={ props.measurementName } cellInfo={ props.cellInfo } instrumentId={ props.instrumentId } chanId={ props.chanId } />,
		document.getElementById('root')
	);
}