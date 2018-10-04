import React from 'react';
import { ipcRenderer } from "electron";

class CalibratePD extends React.Component {
	
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
			channelsJsc: {},
			sunIntensity: 1000,
			darkOffset: 0
		};

		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleInputChangeLi = this.handleInputChangeLi.bind( this );
		this.scalePD = this.scalePD.bind( this );
		this.close = this.close.bind( this );	
		this.setRequestTimeout();		
	}

	close() {

		if( this.state.channels && Array.isArray( this.state.channels ) ) {
			for( var i in this.state.channels ) {
				let chanId = this.state.channels[ i ].chanId,
					strObj = 'mon_' + chanId;

				if( this.state[ strObj ] ) {
					this.disableChannel( chanId );
				}
			}
		}

		this.props.onClose();
	}

	async offsetPD( ) {

		const offset = this.state.channelsJsc[ "pd" ];

		let body = JSON.stringify( {
			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			pdOffset: offset
		});

		let headers = new Headers({
		  "Content-Type": "application/json",
		  "Content-Length": body.length.toString()
		});

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.setPDOffset", {
			method: 'POST',
			headers: headers,
			body: body
		} );

		this.setState( {
			rescaling_success: true,
			darkOffset: this.state.channelsJsc[ 'pd' ]
		});

		await this.getPD();
	}

	async scalePD( sunValue ) {

		let scalingFactor;


		this.setState( {
			rescaling_success: false
		});

		if( ! sunValue ) {
			scalingFactor = this.state.control.factory_scaling_ma_to_sun;
		} else {
			scalingFactor = sunValue / 1000 / ( this.state.channelsJsc[ "pd" ] - this.state.darkOffset );
		}


		scalingFactor = Math.round( scalingFactor * 1000 ) / 1000;
		
		let body = JSON.stringify( {
			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			pdScale: scalingFactor
		});

		let headers = new Headers({
		  "Content-Type": "application/json",
		  "Content-Length": body.length.toString()
		});

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.setPDScaling", {
			method: 'POST',
			headers: headers,
			body: body
		} );

		this.setState( {
			rescaling_success: true
		});

		await this.getPD();
	}
	
	setRequestTimeout() {

		setTimeout( () => {

			var str = [ ];

			for( var i = 0; i < this.state.channels.length; i ++ ) {
				if( this.state[ 'mon_' + this.state.channels[ i ].chanId ] ) {
					str.push( this.state.channels[ i ].chanId );
				}
			}
		

			fetch( `http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/measureCurrent?instrumentId=${encodeURIComponent( this.props.instrumentId )}&groupName=${ this.props.groupName }&chanIds=${str.join(",")}`, {
				method: 'GET',
			} ).then( ( values ) => values.json() )
			   .then( ( json ) => {

			   	for( var i in json ) {
			   		if( i == 'pd' ) {
			   			json.pd = json.pd;
			   		} else {
			   			json[ i ] *= 1000;
			   		}
			   	}
			   	this.setState( { channelsJsc: json } );

			} ).catch( () => {

				// Catching JSON or request errors

			} ).then( () => {

				this.setRequestTimeout();
			});

		}, 2000 );
	}


	async componentDidMount() {
	
		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getChannels?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName , {

			method: 'GET',

		} ).then( ( values ) => values.json() )
		   .then( ( channels ) => {
		   	
		   	this.setState( { channels: channels } );

		   	channels.forEach( ( chan ) => {
		   		this.setState( { [ "size_" + chan.chanId ]: null } );
		   	});

		} ).catch( ( error ) => {

			// Catching JSON or request errors
			console.error( error );
			console.error("Error in getting channels JSON");
		} );

		await this.getPD();
	}

	getPD() {

		return fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getPDOptions?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {
			method: 'GET',
		} )
		.then( ( values ) => values.json() )
		.then( ( control ) => {
			
			this.setState( { control: control } );
		} ).catch( ( error ) => {
			console.error( error );
			console.error("Error in getting light controller");
		} );
	}


	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}


	handleInputChangeLi(event) {
	    const target = event.target;
	    const value = ! target.classList.contains('active');
	    const name = target.getAttribute('data-name');
	    this.setState( { [name]: value } );
	}

	

	async enableChannel( chanId ) {

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/enableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId + "&noIV=true", {
			method: 'GET'
		} );

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setVoltage?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId + "&voltage=0", {
			method: 'GET'
		} );



//		this.getState[ chanId ] = true;
	}

	async disableChannel( chanId ) {

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/disableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId, {
			method: 'GET'
		} );

//		this.getState[ chanId ] = false;
	}

	componentWillUpdate( nextProps, nextState ) {

		if( this.state.channels && Array.isArray( this.state.channels ) ) {
			for( var i in this.state.channels ) {

				let chanId = this.state.channels[ i ].chanId,
					strObj = 'mon_' + chanId;

				if( this.state[ strObj ] && ! nextState[ strObj ] ) {

					this.disableChannel( chanId );

				} else if( ! this.state[ strObj ] && nextState[ strObj ] ) {

					this.enableChannel( chanId );
				}
			}
		}
	}

	jsc( key, wrapper, density, sunRatio ) {

		if( this.state.channelsJsc[ key ] === undefined ) {
			if( wrapper ) {
				return "";
			}

			return 0;
		}

		let val = this.state.channelsJsc[ key ];

		if( val === null || val === undefined ) {
			if( wrapper ) {
				return "";
			}
			return 0;
		}

		if( density && this.state.size && this.state.size > 0 ) {
			val /= this.state.size;
		} else {
			density = false;
		}

		let valTxt = val.toPrecision( 4 );

		if( wrapper ) {
			return ( <span className="badge">{ valTxt } mA { density ? <span>cm<sup>-2</sup></span> : "" } { sunRatio ? ' / ' + ( Math.round( 100 * val * sunRatio ) / 100 ) + " sun" : "" }</span> );
		}

		return val;
	}


	render() {

		let jsc;
		const control = this.state.control;

		return (
			<div className="container-fluid" id="calib_light_list">

				<div className="col-sm-9">
					<div className="alert alert-info"> <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Switch to manual mode in order to gain control of the light intensity</div>
				</div>
				{ !! this.state.rescaling_success &&		
					<div className="col-sm-9">
						<div className="alert alert-success"> <span className="glyphicon glyphicon-check-sign" aria-hidden="true"></span> Successfully updated the photodiode scaling factor</div>
					</div>
				}

				{/*<div className="row">
					<div className="alert alert-warning"><span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> <strong>Warning !</strong> As long as this page is open, the light intensity will be fixed. Close this window to resume the automatic light program.</div>
				</div>*/}

				<div className="col-sm-5">
					<h4>Monitor short circuit currents</h4>

					<div className="form-group">
						<div className="input-group">
							<span className="input-group-addon">Cell area :</span>
							<input type="number" min="0" max="2" step="0.01" className="form-control" name="size" value={ this.state.size } onChange={ this.handleInputChange } />
							<span className="input-group-addon">cm<sup>-2</sup></span>
						</div>
					</div>

						<ul className="list-group">
						
						{ control ? 
							<li key="_photodiode" data-name="pd" className="list-group-item active">
								{ this.jsc( "pd", true, false, control.scaling ) }
								Photodiode
							</li>
							: null
						}

						{ !! this.state.channels && this.state.channels.map( ( channel ) =>

							<li key={ channel.chanId } data-name={ "mon_" + channel.chanId } className={ "list-group-item " + ( this.state[ "mon_" + channel.chanId ] ? 'active' : '' ) } onClick={ this.handleInputChangeLi }>
								{ this.jsc( channel.chanId, true, true ) }
								Channel { channel.chanId }
							</li>

						) }
					</ul>
				</div>
				<div className="col-sm-4">
					<h4>2-point calibration</h4>
					<p>
						To calibrate the light intensity with respect to the short circuit of your device, manually adjust the light intensity such that the short circuit current of the solar cells corresponds to the one measured on an AM1.5G source.<br />
						You can also reset the default settings to the factory calibrated reference photodiode short circuit current.
					</p>

					<div>
						<div className="form-group">
							<label>Photodiode current</label>
							<input className="form-control" readOnly="readonly" value={ ( jsc = this.jsc( "pd", false ) ).toPrecision( 4 ) ? jsc + " mA" : "" } />
						</div>

						<h4>1. Calibration of the dark offset</h4>
						<div className="form-group">
							<div className="btn-group">
								<button className="btn btn-default" type="button" onClick={ () => this.offsetPD( ) }>Calibrate</button>
						    </div>
						</div>
						{ this.state.darkOffset ?
							<div>
								<h4>2. Calibration of the sun intensity</h4>
								<div className="form-group">
									<label>Sun intensity</label>
									<div className="input-group">
										<input type="text" className="form-control" name="sunIntensity" value={ this.state.sunIntensity } onChange={ this.handleInputChange } />
										<span className="input-group-addon">W m<sup>-2</sup></span>
									</div>
								</div>

							<div className="btn-group">
								<button className="btn btn-default" type="button" onClick={ () => this.scalePD( this.state.sunIntensity ) }>Calibrate</button>
						        { !! this.state.control && <button className="btn btn-default" type="button" onClick={ () => this.scalePD( ) } >Factory reset ({ Math.round( 100 * this.state.channelsJsc[ "pd" ] * control.factory_scaling_ma_to_sun ) / 100 } sun)</button> }
						    </div>
						 </div> : null }
					</div>

					<div className="btn-group">
						<button type="button" className="btn btn-default" onClick={this.close}>Close</button>
					</div>

				</div>
			</div>
		);
	}
}


export default CalibratePD;