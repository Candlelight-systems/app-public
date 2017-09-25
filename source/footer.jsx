import React from 'react';
import ReactDOM from 'react-dom';	
import InstrumentForm from "./jsx/instrumentform.jsx"

const {ipcRenderer} = require('electron');

function bugReport() {
	ipcRenderer.send("bugReport");
}

function onValidate( formData ) {

	ipcRenderer.send('validateForm', formData );
}

function onClose() {

	ipcRenderer.send('closeForm');
}


if( document.getElementById('footer') ) {
	ReactDOM.render(
		<div>
		<div className="row">

			<div className="col-xs-8">
				<div className="logo"><img src="./images/logo_footer.png" width="220" /></div>
		
			</div>


			<div className="pull-right footer-info">
				<div>&copy; Candlelight systems, 2017</div>
				<div>
					<a onClick={ bugReport }>
						Report a bug
					</a>
				</div>
				<div>
					Privacy Policy
				</div>
				<div>
					About
				</div>
			</div>
		
		</div>


		<div className="row borderTop">

			<div className="col-xs-5">
				<small>
					<a onClick={ () => require("shell").openExternal("http://candlelight-systems.com") }>http://candlelight-systems.com</a>
				</small>
			</div>
			<div className="col-xs-6">
				<small>
					<a onClick={ () => require("shell").openExternal("mailto://contact@candlelight-systems.com") }>contact@candlelight-systems.com</a>
				</small>
			</div>
			<div className="col-xs-3">
				<small>
					+ 41 21 693 2105
				</small>
			</div>

		</div>

		</div>,
		document.getElementById('footer')
	);
}