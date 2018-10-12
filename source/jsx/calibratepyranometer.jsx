import React from 'react';
import { ipcRenderer } from "electron";

class CalibratePyranometer extends React.Component {
	
	/**
	 *	@param props.name The name of the cell
	 */
	constructor( props ) {
		super( props );
		
		this.unit = {
			"voltage": <span>V</span>,
			"currentdensity": <span>mA cm<sup>-2</sup></span>,
			"current": <span>mA</span>,
			"efficiency": <span>%</span>,
			"fillfactor": <span>%</span>,
			"sun": <span>sun</span>,
			"area": <span>cm<sup>2</sup></span>
		};

		this.state = {
			scale: 0,
			offset: 0
		};

		this.handleInputChange = this.handleInputChange.bind( this );
		this.applyScaling = this.applyScaling.bind( this );
		this.close = this.close.bind( this );
	}

	close() {
		this.props.onClose();
	}


	async applyScaling( pyranoSensitivity, ampBoxGain ) {

		try {
			let body = JSON.stringify( {
				instrumentId: this.props.instrumentId,
				groupName: this.props.groupName,
				ampBoxGain: ampBoxGain,
				pyranoSensitivity: pyranoSensitivity
			});

			let headers = new Headers({
			  "Content-Type": "application/json",
			  "Content-Length": body.length.toString()
			});

			await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.setPyranometerScaling", {
				method: 'POST',
				headers: headers,
				body: body
			} ).then( response => {

				if( response.status !== 200 ) {
					throw "Response error";
				}
			} );

			this.setState( {
				rescaling_success: true,
				rescaling_error: false
			});
		} catch ( e ) {

			this.setState( {
				rescaling_success: false,
				rescaling_error: true
			});
		}

	}
	
	


	async componentDidMount() {
	
		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.getPyranometerScaling?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName , {

			method: 'GET',

		} ).then( response => response.json() )
		   .then( response => {
		   	
		   	this.setState( { pyranoSensitivity: response.pyranoSensitivity, ampBoxGain: response.ampBoxGain } );
		   	this.setState( { rescaling_error_read: false } );

		} ).catch( ( error ) => {

			// Catching JSON or request errors
			console.error( error );
			console.error( "Error in getting pyranometer information" );

			this.setState( { rescaling_error_read: true } );
		} );

	}


	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}


	render() {

		let jsc;
		const control = this.state.control;

		return (
			<div className="container-fluid" id="calib_light_list">
				
				<h4>Pyranometer linear calibration settings</h4>

				{ this.state.rescaling_success && <div className="alert alert-success">Pyranometer has been rescaled.</div> }
				{ this.state.rescaling_error && <div className="alert alert-danger">Error in rescaling the pyranometer. Make sure the host is running.</div> }
				{ this.state.rescaling_error_read && <div className="alert alert-danger">Error in retrieving the pyranometer scaling.</div> }

				<div className="alert alert-info"><span className="glyphicon glyphicon-info"></span> The result of the equation should be in sun intensity (where 1 sun = 1'000 W m<sup>-2</sup>)</div>

				<div className="row">
					<div className="col-sm-3">
						<label>Pyranometer Sensitivity</label>
					</div>
					<div className="col-sm-3">
						<input type="text" name="pyranoSensitivity" value={ this.state.pyranoSensitivity } onChange={ this.handleInputChange } /> V / ( W m<sup>-2</sup> )
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<label>AmpBox gain</label>
					</div>
					<div className="col-sm-3">
						<input type="text" name="ampBoxGain" value={ this.state.ampBoxGain } onChange={ this.handleInputChange } /> mV / mA
					</div>
				</div>

				<br />
				<div className="row">
					<div className="col-sm-9">
						<div className="btn-group">
							<button type="button" className="btn btn-primary" onClick={ () => this.applyScaling( this.state.scale, this.state.offset ) }>Apply scaling</button>
							<button type="button" className="btn btn-default" onClick={this.close}>Close</button>
						</div>
					</div>
				</div>
			</div>

		);
	}
}


export default CalibratePyranometer;