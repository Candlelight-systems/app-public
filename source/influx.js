
import $ from "jquery";
import fs from "fs";
	
export let query = function( query, db, cfg ) {

	return new Promise( ( resolver, rejecter ) => {

		let params = {};
		params.q = query;
		params.db = db;
		params.u = cfg.username;
		params.p = cfg.password;

		$.get(
			"http://" + cfg.host + ":" + cfg.port + "/query",
			params,
			function( results ) {
				resolver( results.results );
			}
		);
	} );
};

const address = ( cfg ) => {
	return "http://" + cfg.host + ":" + cfg.port + "/";
}

export let ping = ( cfg ) => {
	return fetch( address( cfg ) + "ping", { method: 'GET' } );
}

export let checkAuth = async ( cfg, u, p, db ) => {

	const query_auth = `${ address( cfg ) }query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW GRANTS FOR "${ u }"` ) }`;
	
	const auth = await fetch( query_auth ).then( r => r.json() );

	if( auth.error ) {
		throw "Bad credentials";
	}


	if( auth.results[ 0 ].error ) {
		if( u == "" ) {
			throw "No user defined";	
		}
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



}

export let checkDB = async ( cfg, u, p, db ) => {

	if( u == null || u.length == 0 ) {
		return;
	}

	const query_db = `${ address( cfg ) }query?u=${ u }&p=${ p }&q=${ encodeURIComponent( `SHOW DATABASES` ) }`;
	const dbs = await fetch( query_db ).then( r => r.json() );

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

}