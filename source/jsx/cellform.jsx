import React from 'react';
import CellFormTracking from "./cellformtracking.jsx"
import CellFormIV from "./cellformjv.jsx"
import environment from "../../app/environment.json"

class CellForm extends React.Component {
	

	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.subFormChanged = this.subFormChanged.bind( this );
		this.validateConfig = this.validateConfig.bind( this );
		this.state = {
			cellArea: 0,
			cellName: "",
			connection: "group",
			lightSource: "pd_pyr",
			correctionFactor_type: "factory",
			correctionFactor_value: 1,
		};
		this.close = this.close.bind( this );
	}

	validateConfig() {
		this.props.onValidate( this.state );
		this.close();
	}

	close() {
		this.props.onClose();
	}

	subFormChanged( name, value ) {	
		this.setState( { [name]: value } );
	}


	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}


	componentDidMount() {

		$( "a", this.tabs ).click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});


		this.setState( this.props.formState );
		this.setState( { lightSource: this.props.formState.lightRefValue > 0  ? 'manual' : 'pd_pyr' } );

	
	}

	componentWillReceiveProps( nextProps ) {

		this.setState( nextProps.formState );
		this.setState( { lightSource: nextProps.formState.lightRefValue > 0  ? 'manual' : 'pd_pyr' } );

	
	}

	render() {	 

		let active = !! this.state.enable && this.state.tracking_mode > 0;
		let groups = this.props.instrumentConfig.groups;
		let relayController = false;
		
		let lightSourceSelect = environment.instrument[ this.props.instrumentConfig.instrumentId ].groups[ this.props.groupName ].manualLightIntensity;
		let correctionFactor = 'N/A';

		for( var i = 0; i < groups.length; i ++ ) {
			if( groups[ i ].groupName == this.props.groupName ) {
				relayController = groups[ i ].dualOutput || groups[ i ].relayController;

				for( var j = 0; j < groups[ i ].channels.length; j ++ ) {

					if( groups[ i ].channels[ j ].chanId == this.props.formState.chanId ) {
						correctionFactor = groups[ i ].channels[ j ].correctionFactor;
					}
				}
			}
		}


		return (
			<div className="container-fluid">
				<form onSubmit={ this.submit } className="form-horizontal">

				<ul className="nav nav-tabs formTabs" ref={ el => this.tabs = el }>
				  <li role="presentation" className="active"><a data-target={ "#cell_" + this.state.unique } data-toggle="tab">Cell configuration</a></li>
				  <li role="presentation"><a data-target={ "#tracker_" + this.state.unique } data-toggle="tab">Tracker</a></li>
				  <li role="presentation"><a data-target={ "#iv_" + this.state.unique } data-toggle="tab">j(V) curves</a></li>
				</ul>


				<div className="tab-content">

				<div className="tab-pane active" id={ "cell_" + this.state.unique }>
					<div className="form-group">
						<label className="col-sm-3">Device name</label>
						<div className="col-sm-9">
							<input type="text" name="cellName" id="cellName" className="form-control" placeholder="Device name" disabled={ active } value={this.state.cellName} onChange={this.handleInputChange} />
							{ active ? <div className="help-block">The device name cannot be changed once the device is in active mode</div> : null }
						</div>
						
					</div>

					<div className="form-group">
						<label htmlFor="cellarea" className="col-sm-3">Active area</label>
						<div className="col-sm-9">
							<div className="input-group">
								<input type="number" step="0.01" disabled={active} name="cellArea" id="cellArea" className="form-control col-sm-9" placeholder="Cell area" value={this.state.cellArea} onChange={this.handleInputChange} />
								<span className="input-group-addon">cm<sup>2</sup></span>
							</div>
							{ active ? <div className="help-block">The area cannot be changed once the device is in active mode</div> : null }
						</div>
					</div>

					{ relayController &&
						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Connection</label>
							<div className="col-sm-9">
								<div className="radio">
									<label>
										<input type="radio" name="connection" value="group" onClick={ this.handleInputChange } checked={ this.state.connection == 'group' } /> Cell enclosure
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="connection" value="external" onClick={ this.handleInputChange }  checked={ this.state.connection == 'external' } /> External connection
									</label>
								</div>
							</div>
						</div>
					}

					{ lightSourceSelect &&
						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Light source</label>
							<div className="col-sm-9">

								<div className="radio">
									<label>
										<input type="radio" name="lightSource" value="pd_pyr" onClick={ this.handleInputChange } checked={ this.state.lightSource == 'pd_pyr' } /> Photodiode / Pyranometer
									</label>
								</div>
							
								<div className="radio">
									<label>
										<input type="radio" name="lightSource" value="manual" onClick={ this.handleInputChange } checked={ this.state.lightSource == 'manual' } /> Manual value
									</label>
								</div>
							</div>
						</div>
					}

					{ ( this.state.connection ==  "external" || this.state.lightSource == "manual" ) ?
						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Light intensity</label>
							<div className="col-sm-9">
								<div className="input-group">
									<input type="number" className="form-control" name="lightRefValue" value={ this.state.lightRefValue } onChange={ this.handleInputChange } />
									<span className="input-group-addon">
										W m<sup>-2</sup>
									</span>
								</div>
							</div>
						</div> :

						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Correction factor</label>
							<div className="col-sm-9">

								<div className="radio">
									<label>
										<input type="radio" name="correctionFactor_type" value="factory" onClick={ this.handleInputChange } checked={ this.state.correctionFactor_type == 'factory' } /> Factory settings ({ correctionFactor })
									</label>
								</div>

								<div className="radio">
									<label>
										<input type="radio" name="correctionFactor_type" value="manual" onClick={ this.handleInputChange } checked={ this.state.correctionFactor_type == 'manual' } /> Manual value <input type="text" className="form-control" disabled={ this.state.correctionFactor_type == 'factory' } name="correctionFactor_value" onChange={ this.handleInputChange } value={ this.state.correctionFactor_value } />
									</label>
								</div>
								
								<div className="help-block">Correction factor to the sun intensity. Use it to account for the geometrical uniformity of the light source, such as the edge effects. The correction goes as effective_sun = measured_sun / correction_factor.</div>
							</div>
							
						</div>
					}

				</div>

				<div className="tab-pane" id={ "tracker_" + this.state.unique }>

					<CellFormTracking {...this.props} {...this.state} onFormChange={ this.subFormChanged } />
				</div>

				<div className="tab-pane" id={ "iv_" + this.state.unique }>

					<CellFormIV {...this.state} onFormChange={ this.subFormChanged } />
				</div>
			
				</div>
			</form>

			<div className="btn-group pull-right">
	          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
			  <button type="button" className="btn btn-primary" name="update" onClick={this.validateConfig}>Update channel</button>
	      	</div>
		</div>
		);
	}
}

export default CellForm;