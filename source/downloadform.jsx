import React from 'react';
import ReactDOM from 'react-dom';	
import DownloadForm from "./jsx/downloadform.jsx"


const { ipcRenderer } = require('electron');

ipcRenderer.on("loadForm", ( event, data ) => {
  render( data );
});

function onValidate( formData ) {

	ipcRenderer.send('validateForm', formData );
}

function onClose() {

	ipcRenderer.send('closeForm');
}


function render( props ) {

	ReactDOM.render(
		<DownloadForm db={ props.db } measurementName={ props.measurementName } cellInfo={ props.cellInfo } instrumentId={ props.instrumentId } chanId={ props.chanId } onValidate={ onValidate } onClose={ onClose } />,
		document.getElementById('root')
	);
}