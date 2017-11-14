
const PythonShell = require("python-shell");
const path = require('path');
import Graph from 'node-jsgraph/dist/jsgraph-es6';

class KeithleySMU {

	  static list() {

        return new Promise((resolver, rejecter) => {

        	var list = new PythonShell('script.list', {

                pythonOptions: ['-m'],
				cwd: path.join( __dirname.replace("app.asar", "app.asar.unpacked" ), '../util/pyvisa/' ),
               	mode: "text" // Text mode
            } );

            list.once( "error", ( error ) => {
            	error = error.toString('utf-8');
            	list.removeAllListeners( "message" );
            	rejecter( error );
            });

            list.once("message", ( results ) => {

            	results = results.toString('utf-8');

            	list.removeAllListeners( "error" );
            	if( Array.isArray( results ) ) {
		            results = results[ 0 ]; 
		        }
		   			   		
		        let resultsParsed = /\((.*)\)/gim.exec(results);

		        if( ! resultsParsed || ! resultsParsed[ 1 ] ) {
		        	return rejecter();
		        }

		        if( resultsParsed[ 1 ].length == 0 ) {
		        	rejecter();
		        	return;
		        }
		        
		        resultsParsed = resultsParsed[1].split(',').map(result => {
		        	
		        	result = /u'(.*)'/g.exec( result );
		        	
		        	if( ! result || ! result[ 1 ] ) {
		        		return null;
		        	}

		            return result[ 1 ];
		        });

		        resolver( resultsParsed );
            });
        });
    }

	constructor( host ) {
		this.host = host;
	}

	connect( ) {

		if( this.visaShell ) {
			this.visaShell.removeAllListeners( "message" );
			this.visaShell.removeAllListeners( "error" );
			this.visaShell = null;
		}

		return new Promise( ( resolver, rejecter ) => {

			var timeout = setTimeout( () => {

				this.visaShell.end( () => {
					
					rejecter("Cannot connect");
				});

			}, 1000 );

			try {

				this.visaShell = new PythonShell( 'script.iovisa', {
					
					cwd: path.join( __dirname.replace("app.asar", "app.asar.unpacked" ), '../util/pyvisa/' ),
					pythonOptions: [ '-m' ],
					args: [ this.host ], // Pass the VISA address
					mode: "text" // Text mode

				} );

			} catch( error ) {

				clearTimeout( timeout );
				rejecter( error );
				return;
			}

			this.visaShell.once( "error", ( error ) => {
			//	this.visaShell.removeAllListeners("message");

				error = error.toString('utf-8');
				clearTimeout( timeout );
				rejecter( error );
			});

			this.visaShell.once( "message", async ( message ) => {

				message = message.toString('utf-8');
				this.visaShell.removeAllListeners("error");

				
				await this.command(":FORM:BORD SWAP");
				await this.command(":FORM:DATA REAL,32");
				await this.command(":FORM:ELEM VOLT,CURR");
				await this.command("*rst; status:preset; *cls");
				clearTimeout( timeout );
				resolver( message );
			});
			

			this.visaShell.send( "connect" );
		} );
	}

	delay( time ) {
		return new Promise( ( resolver, rejecter ) => {
			setTimeout( () => { resolver(); }, time );
		});
	}

	command( command ) {

		return new Promise( ( resolver, rejecter ) => {

			this.visaShell.once( "message", async ( message ) => {
				message = message.toString('utf-8');
				await this.delay( 20 );
	            resolver( message );
	        } );	

	        
	        this.visaShell.send( command );

		} );
	}

	query( command ) {

		return new Promise( ( resolver, rejecter ) => {

			this.visaShell.once( "message", async ( message ) => {
				message = message.toString('utf-8');
				await this.delay( 20 );

				if( message.indexOf("ERROR") > -1 ) {
					rejecter( message );
					return;
				}

	            resolver( message );
	        } );

	        
	        this.visaShell.send( command );

		} );
	}


	async getIVTrace() {

		var wave = Graph.newWaveform(),
			v;

		var data = await this
						.query("TRAC:DATA?")
						.then( ( data ) => {

							return data
								.replace("[", "")
								.replace("]", "")
								.split(',')
								.map( ( d ) => parseFloat( d ) )
								.forEach( ( d, index ) => {

									if( index % 2 == 0 ) {
										v = d;
									}

									if( index % 2 == 1 ) {
										wave.append( v, d );
									}
								});
						} );

	    
	    var power = wave.duplicate().math( ( y, x ) => y * x );

	    return { dataiv: wave, poweriv: power };
	}

}

export default KeithleySMU;