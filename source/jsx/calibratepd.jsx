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
			channelsJsc: {}
		};

		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleInputChangeLi = this.handleInputChangeLi.bind( this );
		this.scalePD = this.scalePD.bind( this );
		this.close = this.close.bind( this );

		
		this.setRequestTimeout();
		
		
	}



	close() {
		this.props.onClose();
	}

	async scalePD( pdRef, sunValue ) {

		let scalingFactor;

		if( ! this.state.photodiodes || ! Array.isArray( this.state.photodiodes ) ) {
			console.error("Cannot rescale photodiodes");
		}

		for( var i = 0; i < this.state.photodiodes.length; i ++ ) {
			if( this.state.photodiodes[ i ].ref == pdRef ) {

				if( ! sunValue ) {
					scalingFactor = this.state.photodiodes[ i ].factory_scaling_ma_to_sun;
				} else {
					scalingFactor = sunValue / this.state.channelsJsc[ this.state.photodiodes[ i ].ref ];
				}

				let body = JSON.stringify( {
					pdRef: this.state.photodiodes[ i ].ref,
					pdScale: scalingFactor,
					instrumentId: this.props.instrumentId,
					groupName: this.props.groupName
				});

				let headers = new Headers({
				  "Content-Type": "application/json",
				  "Content-Length": body.length.toString()
				});

				await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setPDScaling", {
					method: 'POST',
					headers: headers,
					body: body
				} );

				await this.getPD();

				return;
			}
		}


	}
	
	setRequestTimeout() {

		setTimeout( () => {

			var str = [];

			for( var i = 0; i < this.state.photodiodes.length; i ++ ) {
				
				if( this.state[ 'mon_' + this.state.photodiodes[ i ].ref ] ) {
					console.log('there');
					str.push( this.state.photodiodes[ i ].ref );
				}
			}

			for( var i = 0; i < this.state.channels.length; i ++ ) {
				if( this.state[ 'mon_' + this.state.channels[ i ].chanId ] ) {
					str.push( this.state.channels[ i ].chanId );
				}
			}
		
			if( str.length == 0 ) {
				this.setRequestTimeout();
				return;
			}


			fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/measureCurrent?instrumentId=" + encodeURIComponent( this.props.instrumentId ) + "&chanIds=" + str.join(","), {

				method: 'GET',

			} ).then( ( values ) => values.json() )
			   .then( ( json ) => {

			   	for( var i in json ) {
			   		if( i.indexOf( 'pd' ) == -1 ) {
			   			json[ i ] = json[ i ] * 1000
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

		} ).then( ( values ) => values.json() )
		   .then( ( photodiodes ) => {

		   	this.setState( { photodiodes: photodiodes } );
		   	
		   	photodiodes.map( ( pd ) => {
		   		
		   		this.setState( ( state ) => ( { [ 'mon_' + pd.ref ]: true } ) );
		   	});
		
		} ).catch( ( error ) => {

			// Catching JSON or request errors
			console.error( error );
			console.error("Error in getting photodiodes JSON");
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

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/enableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId, {
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

		/*if( this.state.photodiodes && Array.isArray( this.state.photodiodes ) ) {
			this.state.photodiodes.map( ( pd ) => {

				if( nextState[ "mon_" + pd.ref ] && ! this.state[ "mon_" + pd.ref ] ) {
					
					this.enablePD( pd.ref );

				} else if( ! nextState[ "mon_" + pd.ref ] && this.state[ "mon_" + pd.ref ] ) {

					this.disablePD( pf.ref );
				}
			});
		}*/

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

			return null;
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

		return (
			<div className="container-fluid" id="calib_light_list">

				<div className="col-sm-15">
					<div className="alert alert-info"> <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Switch to manual mode in order to gain control of the light intensity</div>
				</div>


				{/*<div className="row">
					<div className="alert alert-warning"><span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> <strong>Warning !</strong> As long as this page is open, the light intensity will be fixed. Close this window to resume the automatic light program.</div>
				</div>*/}

				<div className="col-sm-8">
					<h4>Monitor short circuit currents</h4>

					<div className="form-group">
						<div className="input-group">
							<span className="input-group-addon">Cell area :</span>
							<input type="number" min="0" max="2" step="0.01" className="form-control" name="size" value={ this.state.size } onChange={ this.handleInputChange } />
							<span className="input-group-addon">cm<sup>-2</sup></span>
						</div>
					</div>

						<ul className="list-group">

						{ !! this.state.photodiodes && this.state.photodiodes.map( ( photodiode ) =>

							<li key={ photodiode.ref } data-name={ "mon_" + photodiode.ref } className={ "list-group-item " + ( this.state[ "mon_" + photodiode.ref ] ? 'active' : '' ) } onClick={ this.handleInputChangeLi }>
								{ this.jsc( photodiode.ref, true, false, photodiode.scaling_ma_to_sun ) }
								{ photodiode.name }
							</li>

						) }


						{ !! this.state.channels && this.state.channels.map( ( channel ) =>

							<li key={ channel.chanId } data-name={ "mon_" + channel.chanId } className={ "list-group-item " + ( this.state[ "mon_" + channel.chanId ] ? 'active' : '' ) } onClick={ this.handleInputChangeLi }>
								{ this.jsc( channel.chanId, true, true ) }
								Channel { channel.chanId }
							</li>

						) }
					</ul>
				</div>
				<div className="col-sm-6">
					<h4>2-point calibration</h4>
					<p>
						To calibrate the light intensity with respect to the short circuit of your device, manually adjust the light intensity such that the short circuit current of the solar cells corresponds to the one measured on an AM1.5G source.<br />
						You can also reset the default settings to the factory calibrated reference photodiode short circuit currents.
					</p>

					{ !! this.state.photodiodes && this.state.photodiodes.map( ( photodiode ) => {
						
						let jsc;

						if( ! this.state.channelsJsc[ photodiode.ref ] ) {
							return;
						}

						return (
						<div key={ photodiode.ref }>
							<div className="form-group">
								<label>{ photodiode.name }</label>
								<input className="form-control" readOnly="readonly" value={ ( jsc = this.jsc( photodiode.ref, false ) ).toPrecision( 4 ) ? jsc + " mA" : "" } />
							</div>

							<div className="form-group">
								<div className="btn-group">
									<button className="btn btn-default" type="button" onClick={ () => this.scalePD( photodiode.ref, 1 ) }>Set as 1 sun</button>
							        <button className="btn btn-default" type="button" onClick={ () => this.scalePD( photodiode.ref ) }>Factory reset ({ Math.round( 100 * this.state.channelsJsc[ photodiode.ref ] * photodiode.factory_scaling_ma_to_sun ) / 100 } sun)</button>
							    </div>
							</div>
						</div> ) }
					) }

					<div className="btn-group">
						<button type="button" className="btn btn-default" onClick={this.close}>Close</button>
					</div>

				</div>
			</div>
		);
	}
}


export default CalibratePD;