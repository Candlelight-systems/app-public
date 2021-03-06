import React from 'react';
import ReactDOM from 'react-dom';	
import InfluxForm from "./jsx/influxform.jsx"
import { query as influxquery } from "./jsx/influx";
import { ipcRenderer, remote } from 'electron';
const dialog = remote.dialog;
	
let data;
ipcRenderer.on("loadForm", ( event, d ) => {

	data = d;
	render( );
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


function removeData( measurementName ) {

  dialog.showMessageBox( {
    type: 'question',
    message: 'Are you sure that you want to delete this measurement ?',
    cancelId: 0,
    defaultId: 0,
    title: "Delete this measurement ?",
    buttons: [ "Cancel", "Yes" ]    
  }, async ( index ) => {

    if( index == 1 ) {

    	try {

    		await fetch(`http://${ data.config.trackerHost }:${ data.config.trackerPort }/dropMeasurement?measurementName=${measurementName}`)
    		await influxquery(`DROP MEASUREMENT ${ measurementName };`)
    		render();

    	} catch ( e ) { 

    		dialog.showMessageBox( {
			    type: 'error',
			    message: `Error in removing the measurement. The error was :${ e.toString() }. Make sure that the database and the server can be accessed.`,
			    cancelId: 0,
			    defaultId: 0,
			    title: "Error",
			    buttons: [ "Ok" ]   
			} );
    	}
    }
  } );
}


function formatDate( dateVal ) {
	let d = new Date( dateVal );
	return d.getDate() + "/" + ( d.getMonth() + 1 ) + "/" + d.getFullYear() + " " + pad( d.getHours() ) + ":" + pad( d.getMinutes() );
}

async function render( ) {

	let json = await fetch( "http://" + data.config.trackerHost + ":" + data.config.trackerPort + "/getAllMeasurements", {
		
		method: 'GET'

	} )
	.then( ( response ) => response.json() );

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
						{ val.endDate && <button className="btn btn-sm btn-danger" onClick={ () => removeData( val.measurementName ) }>Delete data</button> }
					</div>

					<div>
						<strong>{ val.cellInfo.cellName }</strong>
					</div>

					<div>
						{ formatDate( val.startDate ) } <span className="glyphicon glypicon-arrow-left"></span> { val.endDate ? formatDate( val.endDate ) : '(Running)' }
					</div>
					
				</li> )
			} ) }
			</ul>
		</div>,
		document.getElementById('root')
	);


}