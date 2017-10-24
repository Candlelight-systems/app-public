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

function pad( number ) {

	if( number < 10 ) {
		return "0" + number;
	}
	return number;
}

function downloadData( measurementName, cellInfo ) {

	ipcRenderer.send( "downloadData", cellInfo, undefined, measurementName );
}




function formatDate( dateVal ) {
	let d = new Date( dateVal );
	return d.getDate() + "/" + ( d.getMonth() + 1 ) + "/" + d.getFullYear() + " " + pad( d.getHours() ) + ":" + pad( d.getMinutes() );
}

async function render( props ) {

console.log( props );
	let json = await fetch( "http://" + props.config.trackerHost + ":" + props.config.trackerPort + "/getAllMeasurements", {
		
		method: 'GET'

	} )
	.then( ( response ) => response.json() );

console.log( json );

	let jsonArray = [];
	for( var i in json ) {
		jsonArray.push( { 
			measurementName: i, 
			startDate: json[ i ].startDate, 
			endDate: json[ i ].endDate,
			cellInfo: json[ i ].cellInfo } );
	}

	jsonArray.sort( ( a, b ) => {

		return a.startDate - b.startDate;
	} );

console.log( jsonArray );

	ReactDOM.render(
		<div className="container-fluid">
			<ul className="list-group">
			<li className="list-group-item list-group-item-success list-group-item-heading">
				All existing measurements
			</li>
			{ jsonArray.map( ( val ) => { return (

				<li className="list-group-item" key={ val.measurementName } >
					
					<div className="pull-right">
						<button className="btn btn-sm btn-primary" onClick={ () => downloadData( val.measurementName, val.cellInfo ) }>Download data</button>
					</div>

					<div>
						<strong>{ val.cellInfo.cellName }</strong>
					</div>

					<div>
						{ formatDate( val.startDate ) } <span className="glyphicon glypicon-arrow-left"></span> { val.endDate ? formatDate( val.endDate ) : 'Now' }
					</div>
					
				</li> )
			} ) }
			</ul>
		</div>,
		document.getElementById('root')
	);


}