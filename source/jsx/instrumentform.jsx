import React from 'react';
import $ from "jquery";

class InstrumentForm extends React.Component {
	

	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateConfig = this.validateConfig.bind( this );
		this.close = this.close.bind( this );
		this.state = {

			trackerPort: 8080,
			trackerPortWS: 8081,
			buttonValue: "Add",
			title: "Add a Candlelight instrument"
		};
		
		this.connectAttempt = this.connectAttempt.bind( this );
	}

	connectAttempt() {
		fetch( "http://" + this.state.trackerHost + ":" + this.state.trackerPort + "/idn", { method: 'GET' } ).then( ( response ) => {
			
			if( response.status !== 200 ) {
				throw "Error returned by host.";
			}

			return response.text().then( ( text ) => {
				this.setState( { connect: "Success ! Instrument response: " + text, connectstate: "success" } );	
			} );
			
		} ).catch( ( error ) => {
			this.setState( { connect: "Error. Cannot reach the instrument (" + error + ")", connectstate: "warning" } );
		} );

		this.setState( { connect: "Connection in progress...", connectstate: "default" } );
	}

	validateConfig() {
		
		this.props.onValidate( this.state );
		this.props.onClose();
	//	$( this.modal ).modal('hide');
	}

	close() {
		this.props.onClose();
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}

	componentWillReceiveProps( nextProps ) {

		this.setState( nextProps.formState );
		this.edit();
		
	}

	componentDidMount() {

		if( this.props.formState.trackerHost ) {
			this.edit();
		}

		this.setState( this.props.formState );
	}

	edit() {

		this.setState( ( prevState ) => ( { 
			buttonValue: "Update",
			title: "Edit a Candlelight instrument"
		} ) );
	}

	render() {	 

		return (
	
			<div className="container-fluid">
				<form onSubmit={ this.submit } className="form-horizontal">

						<h3>{ this.state.title }</h3>
						<div className="form-group">
							<label className="col-sm-3">Name</label>
							<div className="col-sm-9">
								<input type="text" name="trackerName" id="trackerName" className="form-control" placeholder="" value={this.state.trackerName} onChange={this.handleInputChange} />
								<span className="help-block">Give your instrument a generic name so that you can recognize it in the future.</span>
							</div>
							
						</div>

						<div className="form-group">
							<label className="col-sm-3">IP address</label>
							<div className="col-sm-9">
								<input type="text" name="trackerHost" id="trackerHost" className="form-control" placeholder="" value={this.state.trackerHost} onChange={this.handleInputChange} />
								<span className="help-block">Connect your instrument to the network and enter here its ip address. Refer to the document to determine your instruments IP address.</span>
							</div>
						</div>
						
						<div className="form-group">
							<label className="col-sm-3">Port</label>
							<div className="col-sm-9">
								<input type="text" name="trackerPort" id="trackerPort" className="form-control" placeholder="" value={this.state.trackerPort} onChange={this.handleInputChange} />
								<span className="help-block">8080 is the default communication port.</span>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Websocket Port</label>
							<div className="col-sm-9">
								<input type="text" name="trackerPortWS" id="trackerPortWS" className="form-control" placeholder="" value={this.state.trackerPortWS} onChange={this.handleInputChange} />
								<span className="help-block">8081 is the default websocket communication port.</span>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Attempt to connect</label>
							<div className="col-sm-9">
								<p>
									<button type="button" className="btn btn-primary" name="connect" onClick={this.connectAttempt}>Connect</button>
								</p>
								<p className={ "state-message bg-" + this.state.connectstate } >{ this.state.connect }</p>
							</div>
						</div>
				</form>

				<div className="btn-group pull-right">
		          <button type="button" className="btn btn-primary" name="update" onClick={this.validateConfig}>{ this.state.buttonValue }</button>
		          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
		      	</div>
			</div>
		);
	}
}

export default InstrumentForm;