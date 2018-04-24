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


	async applyScaling( scale, offset ) {

		try {
			let body = JSON.stringify( {
				instrumentId: this.props.instrumentId,
				groupName: this.props.groupName,
				scale: scale,
				offset: offset
			});

			let headers = new Headers({
			  "Content-Type": "application/json",
			  "Content-Length": body.length.toString()
			});

			await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setPyranometerScaling", {
				method: 'POST',
				headers: headers,
				body: body
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
	
		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getPyranometerScaling?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName , {

			method: 'GET',

		} ).then( response => response.json() )
		   .then( response => {
		   	
		   	this.setState( { scale: response.scale, offset: response.offset } );

		} ).catch( ( error ) => {

			// Catching JSON or request errors
			console.error( error );
			console.error("Error in getting pyranometer information");
		} );

		await this.getPD();
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
				{ this.state.rescaling_error && <div className="alert alert-error">Error in rescaling the pyranometer. Make sure the host is running.</div> }

				<div className="alert alert-info"><span className="glyphicon glyphicon-info"></span> The result of the equation should be in sun intensity (where 1 sun = 1'000 W m<sup>-2</sup></div>

				sun = <input type="text" name="offset" value={ this.state.scale } onChange={ this.handleInputChange } /> * [Pyranometer current 4-20mA] + <input type="text" name="offset" value={ this.state.offset } onChange={ this.handleInputChange } />
			
				<div className="btn-group">
					<button type="button" className="btn btn-default" onClick={ () => this.applyScaling( this.status.scale, this.status.offset ) }>Apply scaling</button>
					<button type="button" className="btn btn-default" onClick={this.close}>Close</button>
				</div>

			</div>

		);
	}
}


export default CalibratePD;