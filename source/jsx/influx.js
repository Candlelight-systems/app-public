
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

export let ping = function( cfg ) {
	return fetch( "http://" + cfg.host + ":" + cfg.port + "/ping", { method: 'GET' } );
}