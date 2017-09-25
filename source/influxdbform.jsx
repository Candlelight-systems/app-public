import React from 'react';
import ReactDOM from 'react-dom';	
import InfluxForm from "./jsx/influxform.jsx"

const {ipcRenderer} = require('electron');

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
		<InfluxForm formState={props} onValidate={ onValidate } onClose={ onClose } />,
		document.getElementById('root')
	);


}