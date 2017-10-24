import React from 'react';
import ReactDOM from 'react-dom';	
import CellFormAll from "./jsx/cellformall.jsx"

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

	ReactDOM.render(
	<CellFormAll 
		instrumentConfig={ data.instrumentConfig } 
		allStatuses={ data.allStatuses } 
		channelIds={ data.channelIds } 
		formState={ data.cellData } 
		onValidate={ onValidate } 
		onClose={ onClose } />,
	document.getElementById('root')
	);
}