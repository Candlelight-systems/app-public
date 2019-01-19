import React from 'react';
import ReactDOM from 'react-dom';	
import ScheduleLight from "./jsx/scheduleLight.jsx"

const {ipcRenderer} = require('electron')

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", ( event, data ) => {
	
  render( data );
});


function onClose() {
	ipcRenderer.send('closeForm');
}

function render( data ) {

	ReactDOM.render(
	<ScheduleLight instrumentId={ data.instrumentId } groupName={ data.groupName } config={ data.config } onClose={ onClose }  />,
	document.getElementById('root')
	);
}