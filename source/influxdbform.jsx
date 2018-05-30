import React from 'react';
import ReactDOM from 'react-dom';	
import InfluxForm from "./jsx/influxform.jsx"

const {ipcRenderer} = require('electron');

let formState, uploadingState;

ipcRenderer.on("loadForm", ( event, data ) => {
  formState = data;
  render( );
});

ipcRenderer.on("uploading", ( event, data ) => {
  uploadingState = data;
  render( );
});

function onValidate( formData ) {

	ipcRenderer.send('validateForm', formData );
}

function onClose() {

	ipcRenderer.send('closeForm');
}


function render( form = formState, upload = uploadingState ) {

	ReactDOM.render(
		<InfluxForm formState={ form } uploading={ upload } onValidate={ onValidate } onClose={ onClose } />,
		document.getElementById('root')
	);


}