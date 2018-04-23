import React from 'react';
import $ from "jquery";
import fetch from 'node-fetch'
import { shell } from 'electron'
import { postJSON } from '../../app/util/fetch'

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
		this.close();
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
		let query = `${address}/ping`;
		let query_auth = `${address}/query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW GRANTS FOR "${ u }"` ) }`;
		let query_db = `${address}/query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW DATABASES` ) }`;
//

		const state = {};

		state.db_authentification = null;

//		this.setState( { await fetch( address + "ping" ) ;
		try {
			await fetch( query );
			console.log('exists');
			state.db_connection = 'ok';
		} catch( e ) {
			console.log( e );
			state.db_connection = 'error';
		}
		
		try {
			
			const auth = await fetch( query_auth ).then( response => response.json() );

			if( auth.error ) {
				throw "Bad credentials";
			}


			try {
				
				const dbs = await fetch( query_db ).then( response => response.json() );

				if( ! dbs.results[ 0 ].series ) {
					throw "Database not found";
				}

				if( ! dbs.results[ 0 ].series[ 0 ].values ) {
					throw "Database not found";
				}


				let accept = false;
				dbs.results[ 0 ].series[ 0 ].values.forEach( ( v ) => {

					if( v[ 0 ] == db ) {
						accept = true;
					}
				});

				if( ! accept ) {
					throw "Database not found";
				}

				state.db_dbexists = 'ok';
			} catch( e ) {
				
				state.db_dbexists = e.toString();
			}


			if( auth.results[ 0 ].error ) {
				throw "User not found";
			}

			if( ! auth.results[ 0 ].series[ 0 ] || ! auth.results[ 0 ].series[ 0 ].values ) {
				throw "No privileges found";
			}

			let accept = false;
			auth.results[ 0 ].series[ 0 ].values.forEach( v => {
				
				if( v[ 0 ] == db && v[ 1 ] == "ALL PRIVILEGES" ) {
					accept = true;
				}
			} );

			if( ! accept ) {
				throw `Wrong privileges were found for user ${ u }`;
			}

			state.db_authentification = 'ok';



		} catch( e ) {
			
			state.db_authentification = e.toString();
		}

		

		console.log( state );
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
	    console.log( this.state );
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

			case 'error':
				status_class_db_connection = 'alert-danger';
				status_text_db_connection = <span>Could not connect to the database</span>;
			break;

			default:
				status_class_db_connection = 'alert-default';
				status_text_db_connection = null;
			break;
		}

		switch( this.state.db_authentification ) {

			case 'ok':
				status_class_db_auth = 'alert-success';
				status_text_db_auth = <span>Database authentification successful</span>;
			break;

			case undefined:
			case null:
				status_class_db_auth = 'alert-default';
				status_text_db_auth = null;
			break;

			default:
				status_class_db_auth = 'alert-danger';
				status_text_db_auth = <span>{ this.state.db_authentification }</span>;
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

		return (
	
			<div className="container-fluid">


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

						<div className="alert alert-info">If the authentification is disabled in influxDB, credentials are not checked. Read <a href="#" onClick={ openDocs }>this</a> for further information.</div>
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