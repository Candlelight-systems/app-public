import React from 'react';
import ReactDOM from 'react-dom';	
import CellForm from "./jsx/cellform.jsx"

const {ipcRenderer} = require('electron')

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", ( event, data ) => {
  render( data );
});


function onValidate( formData ) {

	ipcRenderer.send('validateForm', formData );
}

function onClose() {

	ipcRenderer.send('closeForm');
}


function render( data ) {
;
	ReactDOM.render(
	<CellForm 
		instrumentConfig={ data.instrumentConfig } 
		formState={ data.channelState } 
		onValidate={ onValidate } 
		onClose={ onClose } />,
	document.getElementById('root')
	);
}