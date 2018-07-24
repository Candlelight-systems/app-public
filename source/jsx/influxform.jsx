import React from 'react';
import $ from "jquery";
import fetch from 'node-fetch'
import { shell } from 'electron'
import { postJSON } from '../../app/util/fetch'
import { ping, checkAuth, checkDB } from '../influx'

const openDocs = () => {
	shell.openExternal( 'https://docs.influxdata.com/influxdb/v1.5/query_language/authentication_and_authorization' );
}



class AppForm extends React.Component {
	

	constructor( props ) {

		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateConfig = this.validateConfig.bind( this );
		this.verifyConfig = this.verifyConfig.bind( this );
		this.createDB = this.createDB.bind( this );
		this.close = this.close.bind( this );
		this.state = {};
	}

	validateConfig() {
		
		this.props.onValidate( this.state );
		
	//	$( this.modal ).modal('hide');
	}

	async createDB() {

		const state = {};
		const u = this.state.username;
		const p = this.state.password;
		const db = this.state.db;

		let address = `http://${ this.state.host }:${ this.state.port }/query?u=${u}&p=${p}`;
		
		try {
			const reply = await postJSON( address + `&q=${ encodeURIComponent( `CREATE DATABASE "${ db }"` ) }` );
			

			const reply_privileges = await postJSON( address + `&q=${ encodeURIComponent( `GRANT ALL ON "${ db }" TO ${ u }` ) }` );
			
			this.verifyConfig();

		} catch( e ) {

			state.db_dbexists = e;
			this.setState( state );
		}

		
	}

	async verifyConfig() {

		const u = this.state.username;
		const p = this.state.password;
		const db = this.state.db;



		let address = `http://${ this.state.host }:${ this.state.port }`;
		//let query = `${address}/ping`;
		//let query_auth = `${address}/query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW GRANTS FOR "${ u }"` ) }`;
		//let query_db = `${address}/query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW DATABASES` ) }`;
//

		const state = {};

		state.db_authentication = null;

//		this.setState( { await fetch( address + "ping" ) ;
		try {

			if( this.state.host == 'localhost' || this.state.host.slice( 0, 3 ) == '127' ) {
				state.db_connection = 'error';
				throw "The address must not be local (the tracker must also access it)";	
			}

			await ping( this.state );
		//	await fetch( query );
			state.db_connection = 'ok';
			


			try {
				const dbs = await checkDB( this.state, u, p, db );
				state.db_dbexists = 'ok';
			} catch( e ) {
				state.db_dbexists = e.toString();
			}

			
			try {
				
				await checkAuth( this.state, u, p, db );
				state.db_authentication = 'ok';

			} catch( e ) {
				
				state.db_authentication = e.toString();
			}

		} catch( e ) {
			console.log( e );
			state.db_connection = e.toString();
		}

		this.setState( state );
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
	}

	componentDidMount() {

		this.setState( this.props.formState );
	}

	render() {	 

		let status_class_db_connection, status_text_db_connection;
		let status_class_db_dbexists, status_text_db_dbexists;
		let status_class_db_auth, status_text_db_auth;

		switch( this.state.db_connection ) {

			case 'ok':
				status_class_db_connection = 'alert-success';
				status_text_db_connection = <span>Database connection successful</span>;
			break;


			case undefined:
			case null:
				status_class_db_connection = 'alert-default';
				status_text_db_connection = null;
			break;

			case 'error':
				status_class_db_connection = 'alert-danger';
				status_text_db_connection = <span>Could not connect to the database</span>;
			break;

			default:
				status_class_db_connection = 'alert-danger';
				status_text_db_connection = <span>{ this.state.db_connection }</span>;
			break;
		}

		switch( this.state.db_authentication ) {

			case 'ok':
				status_class_db_auth = 'alert-success';
				status_text_db_auth = <span>Database authentication successful</span>;
			break;

			case undefined:
			case null:
				status_class_db_auth = 'alert-default';
				status_text_db_auth = null;
			break;

			case "No user defined":
				status_class_db_auth = 'alert-warning';
				status_text_db_auth = <span>No user was defined. If no authentication to the DB is required, this warning may be ignored.</span>;
			break;

			default:
				status_class_db_auth = 'alert-danger';
				status_text_db_auth = <span>{ this.state.db_authentication }</span>;
			break;
		}

		switch( this.state.db_dbexists ) {

			case 'ok':
				status_class_db_dbexists = 'alert-success';
				status_text_db_dbexists = <span>Database exists</span>;
			break;

			case undefined:
			case null:
				status_class_db_dbexists = 'alert-default';
				status_text_db_dbexists = null;
			break;


			default:
				status_class_db_dbexists = 'alert-danger';
				status_text_db_dbexists = <span>{ this.state.db_dbexists }<button className="btn btn-default" onClick={ this.createDB }>Create</button></span>;
			break;
		}

			
		let status_progress;

		if( this.props.uploading ) {


			switch( this.props.uploading.status ) {

				case 'progress':

					status_progress = <div className="alert alert-info">Uploading to { this.props.uploading.host } in progress</div>

				break;


				case 'done':

					status_progress = <div className="alert alert-success">Uploaded to the instruments</div>

				break;


				case 'error':

					status_progress = <div className="alert alert-danger">Error while uploading to { this.props.uploading.host }. Check that the host is running</div>

				break;

			}
		}
		return (
	
			<div className="container-fluid">

				{ this.props.uploading ? status_progress : null }

				{ status_text_db_connection && <div className={ "alert " + status_class_db_connection }>{ status_text_db_connection }</div> }
				{ status_text_db_auth && <div className={ "alert " + status_class_db_auth }>{ status_text_db_auth }</div> }
				{ status_text_db_dbexists && <div className={ "alert " + status_class_db_dbexists }>{ status_text_db_dbexists }</div> }

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

						<div className="alert alert-info">If the authentication is disabled in influxDB, credentials are not checked. Read <a href="#" onClick={ openDocs }>this</a> for further information.</div>
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
				  <button type="button" className="btn btn-primary" name="update" onClick={ this.verifyConfig }>Verify configuration</button>
				  <button type="button" className="btn btn-primary" name="update" onClick={ this.validateConfig }>Update</button>
				  <button type="button" className="btn btn-default"name="update"  onClick={ this.close }>Close</button>

		      	</div>
			</div>
		);
	}
}

export default AppForm;