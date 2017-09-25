import React from 'react';
import $ from "jquery";

class AppForm extends React.Component {
	

	constructor( props ) {

		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateConfig = this.validateConfig.bind( this );
		this.close = this.close.bind( this );
		this.state = {};
	}

	validateConfig() {
		
		this.props.onValidate( this.state );
		this.close();
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
	    console.log( this.state );
	}

	componentWillReceiveProps( nextProps ) {

		this.setState( nextProps.formState );
	}

	componentDidMount() {

		this.setState( this.props.formState );
	}

	render() {	 

		return (
	
			<div className="container-fluid">
				<form onSubmit={ this.submit } className="form-horizontal">

						<h2>Influx DB connection</h2>
						<div className="form-group">
							<label className="col-sm-3">Host</label>
							<div className="col-sm-9">
								<input type="text" name="host" id="host" className="form-control" placeholder="" value={this.state.host} onChange={this.handleInputChange} />
								<span className="help-block">Most likely the ip address of the server running the database</span>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Port</label>
							<div className="col-sm-9">
								<input type="text" name="port" id="port" className="form-control" placeholder="8086" value={this.state.port} onChange={this.handleInputChange} />
								<span className="help-block">The connection port (by default, InfluxDB runs on 8086)</span>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Username</label>
							<div className="col-sm-9">
								<input type="text" name="username" id="username" className="form-control" placeholder="" value={this.state.username} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Password</label>
							<div className="col-sm-9">
								<input type="text" name="password" id="password" className="form-control" placeholder="" value={this.state.password} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Database name</label>
							<div className="col-sm-9">
								<input type="text" name="db" id="db" className="form-control" placeholder="" value={this.state.db} onChange={this.handleInputChange} />
								<span className="help-block">The name of the default database</span>
							</div>
						</div>
				</form>

				<div className="btn-group pull-right">
		          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
				  <button type="button" className="btn btn-primary" name="update" onClick={this.validateConfig}>Update</button>
		      	</div>
			</div>
		);
	}
}

export default AppForm;