import React from 'react';
import { ipcRenderer } from "electron";
import Graph from 'node-jsgraph/dist/jsgraph-es6';

class ScheduleLight extends React.Component {
	
	/**
	 *	@param props.name The name of the cell
	 */
	constructor( props ) {
		super( props );
		
		this.state = {
			controller: false,
			fixed_intensity: {},
    		fixed_intensity_val: {},
    		schedule_basis: {},
    		schedule_values: {},
    		error: false
		};

		this.apply = this.apply.bind( this );
		this.close = this.close.bind( this );
		this.save = this.save.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
		
	}

	handleFocus( event ) {
		event.target.select();
	}

	async save() {

		let state = await this.apply();
		
		//this.close();
	}

	async apply() {

		let saveJSON = {
			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			control: {
				setPoint: this.state.fixed_intensity ? parseFloat( this.state.fixed_intensity_val ) : false,
				scheduling: {
					enable: ! this.state.fixed_intensity,
					basis: this.state.schedule_basis,
					intensities: this.state.schedule_values.split("\n").map( ( val ) => parseFloat( val ) )
				}
			}
		};

		if( this.state.uv ) {
			saveJSON.control.uv = {
				setPoint: parseFloat( this.state.fixed_uv_intensity_val )
			};
		}

		let body = JSON.stringify( saveJSON );

		var headers = new Headers( {
			"Content-Type": "application/json",
			"Content-Length": body.length.toString()
		});

		this.setState( { 
			message: "Saving light controllers and setting new light intensity. This may take a while...", 
			error: false, 
			success: false 
		} );

		return fetch( `http://${ this.props.config.trackerHost }:${ this.props.config.trackerPort }/lightSetControl`, {

			method: 'POST',
			headers: headers,
			body: body

		} ).then( ( response ) => {

			if ( ! response.ok ) {
	            throw Error( response.statusText );
	        }
	        
			this.setState( {
				error: false,
				success: "Success !"
			} );

			ipcRenderer.send("light.updated");

		} ).catch( ( error ) => {

			this.setState( { 
				error: "Error while saving the controller data" ,
				success: false
			} );

			return Promise.reject();

		} ).then( ( value ) => {

			this.setState( { 
				message: false
			} );

			return value;

		} );
	}
	
	close() {
		this.props.onClose();
	}

	async componentDidMount() {

		this.graph = new Graph( this.graphDom, { paddingBottom: 40 } );
		
		this.graph.resize( 400, 300 );
		this.graph.newSerie("schedule").autoAxis();
		this.graph.getBottomAxis().setLabel("Time").setUnitWrapper( '(', ')' );
		this.graph.getLeftAxis().setLabel("Sun intensity").forceMin( -0.1 ).forceMax( 2.1 );

		this.setState( { message: "Fetching light controllers..." } );

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/lightGetControl?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {

			method: 'GET',

		} )
		.then( ( values ) => values.json() )
		.then( ( controller ) => {
		   	

		   	return this.setState( ( state ) => ( {		   	
		   		error: false,
		   		controller: controller,
		   		fixed_intensity: ! controller.scheduling.enable,
		   		fixed_intensity_val: parseFloat( controller.setPoint ),
		   		schedule_basis: controller.scheduling.basis,
		   		schedule_values: controller.scheduling.intensities.join("\n"),
		   		uv: controller.uv,
		   		fixed_uv_intensity_val: controller.uv ? controller.uv.setPoint : null
	    	} ) );
	   	} )
		.catch( ( error ) => {

			// Catching JSON or request errors
			console.error( error );
			let errorMessage = "Error in getting the controller for group name \"" + this.props.groupName + "\"";
			this.setState( {
				success: false,
				error: errorMessage
			} );

		} ).then( () => {

			this.setState( { 
				message: false,
				success: false
			});
		});

	}

	componentDidUpdate() {

		var waveform = Graph.newWaveform( ).setData( [ ] );

		if( this.state.fixed_intensity ) {

			waveform.setData( [ this.state.fixed_intensity_val, this.state.fixed_intensity_val ], [ 0, 10 ] );	

		} else {

			if( this.state.schedule_values ) {

				
				let values = this.state.schedule_values.split("\n").map( ( val ) => parseFloat( val ) ),
					length = values.length;

				let data = [],
					dataX = [],
					scaling;


				switch( this.state.schedule_basis ) {
					case 3600: // in minutes
						scaling = 60 / length;
						this.graph.getBottomAxis().setUnit('minutes'); 
					break;

					case 86400: // in minutes
						scaling = 24 / length;
						this.graph.getBottomAxis().setUnit('hours'); 
					break;
				}

				values.forEach( ( val, index ) => {

					if( index > 0 ) {
						data.push( values[ index - 1 ] );	
						dataX.push( index * scaling );	
					}

					data.push( val );
					dataX.push( index * scaling );
				} );


				data.push( values[ values.length - 1 ] );	
				dataX.push( values.length * scaling );	

				data.push( values[ 0 ] );	
				dataX.push( values.length * scaling );	


				waveform.setData( data, dataX );
			}
		}

		if( this.graph ) {
			this.graph.getSerie( "schedule" ).setWaveform( waveform );
			this.graph.autoscaleAxes();
			this.graph.draw();
		}
	}



	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
    	this.setState( { [name]: value } );
	}


	render() {

		var fixed_intensity_error = this.state.fixed_intensity_val > 0 && this.state.fixed_intensity_val < 0.25;

		return (
			<div className="container-fluid" id="calib_light_list">

				{ !! this.state.success && <div className="alert alert-success">{ this.state.success }</div> }
				{ !! this.state.error && <div className="alert alert-danger">{ this.state.error }</div> }
				{ !! this.state.message && <div className="alert alert-info"><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> { this.state.message }</div> }

				<div className="col-sm-4">

					{ !! this.state.controller && 
						<div>
							<div className="form-group">
								<label>Light controller :</label> { this.props.groupName }
							</div>
					
							<div className="form-group">
								<div className="checkbox"><label><input type="checkbox" name="fixed_intensity" checked={ this.state.fixed_intensity } onChange={ this.handleInputChange } /> Fixed intensity</label></div>
							</div>

							{ this.state.fixed_intensity ?

							<div className={ "form-group " + ( fixed_intensity_error ? 'has-error' : '' ) }>
								<label>Intensity</label>
								<input className="form-control" type="number" min="0" max="1.5" step="0.01" name="fixed_intensity_val" value={ this.state.fixed_intensity_val } onChange={ this.handleInputChange } />
								{ fixed_intensity_error ? <span className="help-block alert-danger">The power supply cannot sustain light intensities below 0.25 sun. It will automatically turn off</span> : "" }
							</div>

							:

							<div>
								<div className="form-group">
									<label>Time basis :</label>
								
									<select className="form-control" name="schedule_basis" value={ this.state.schedule_basis } onChange={ this.handleInputChange }>
										<option value="null" disabled="disabled">Choose a time basis</option>
										<option value="3600">1 hour</option>
										<option value="86400">1 day</option>
									</select>
								
								</div>

								<div className="form-group">
									<label>Light intensities :</label>
									
									<textarea className="form-control" name="schedule_values" value={ this.state.schedule_values } onChange={ this.handleInputChange } onFocus={this.handleFocus}>
									</textarea>
									<span className="help-block">Enter values (in suns) separated by new lines. Check the graph on the right</span>							

								</div>
							</div>

							}

							{ this.state.uv ? 
								<div className={ "form-group " + ( fixed_intensity_error ? 'has-error' : '' ) }>
									<label>UV Intensity</label>
									<div className="input-group">
										<input className="form-control" type="number" min="0" max="1.5" step="0.01" name="fixed_uv_intensity_val" value={ this.state.fixed_uv_intensity_val } onChange={ this.handleInputChange } />
										<span class="input-group-addon">mW cm<sup>-2</sup></span>
									</div>
									<div className="help-block">Minimum value: 0 mW cm<sup>-2</sup>. Maximum value: 30 mW cm<sup>-2</sup></div>
								</div>
								: null
							}
						</div>
					}


					<div className="btn-group">
						<button className="btn-primary btn" onClick={ this.apply }>Apply</button>
						<button className="btn-primary btn" onClick={ this.save }>Validate</button>
						<button className="btn-default btn" onClick={ this.close }>Close</button>
					</div>

					</div>
					
					<div className="col-sm-5">

						<label>Light profile vs time</label>
						<div ref={ ( el ) => { this.graphDom = el } }></div>

					</div>
				</div>
					
		
		);
	}
}


export default ScheduleLight;