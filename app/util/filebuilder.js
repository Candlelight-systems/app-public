
class FileBuilder {

	constructor() {

		this.waves = [];
	}

	addWaveform( waveform, options ) {

		this.waves.push( { 
			data: waveform,
			options: options 
		});
	}
}

class ITXBuilder extends FileBuilder {

	constructor() {
		super( ...arguments );
	}

	build() {

		let output = "IGOR\n";
		output += this.waves.map( ( wave ) => {

			return this.buildWave( wave.data, wave.options );

		}).join("\n");

		return output;
	}

	buildWave( waveData, waveOptions ) {

		let output = "";
		output += "WAVES/D	'" + waveOptions.waveName + "'";

		if( waveData.hasXWaveform() && ! ( waveOptions.noXWave ) ) {
			output += " '" + ( waveOptions.waveNameX || waveOptions.waveName + "_x" ) + "'";
		}

		output += "\n";
		output += "BEGIN\n";

		if( waveData.hasXWaveform() && ! ( waveOptions.noXWave ) ) {

			for( var i = 0, l = waveData.getLength(); i < l ; i ++ ) {
				output += waveData.getY( i ) + " " + waveData.getX( i ) + "\n";
			}

		} else {

			output += waveData.getData().join("\n");
			output += "\n";
		}


		output += "END\n";

		// If we have scaling or x axis unit
		if( ! waveData.hasXWaveform() || waveData.hasXUnit() ) {

			// Then we call the setscale
			let stringScaling = "x SetScale/";

			// If we have actually scaling, let's parse it
			if( ! waveData.hasXWaveform() ) {

				stringScaling += "P x " + waveData.xOffset + "," + waveData.xScale;

			// In case of no scaling, default is delta mode with x0 = 0, xDelta = 1
			} else {
				stringScaling += "P 0, 1";
			}

			// Adding the x axis unit
			stringScaling += ", \"" + ( waveData.getXUnit( ) || "" ) + "\"";
			stringScaling += ", '" + waveOptions.waveName + "'";
			stringScaling += "\n";

			output += stringScaling
		}

		if( waveData.hasUnit( ) ) {
			output += "x SetScale y 0, 0,\"" + ( waveData.getUnit( ) || "" ) + "\", '" + waveOptions.waveName + "'\n";
		}

		return output;
	}
}

class CSVBuilder extends FileBuilder {

	constructor() {
		super( ...arguments );
	}

	build() {

		let output = "";
		output += this.waves.map( ( wave ) => {


			return wave.options.waveName + ( wave.data.hasUnit() ? " (" + wave.data.getUnit() + ")" : "" );

		}).join(",");

		let i = 0, iterating, data;

		while( true ) {

			iterating = false;

			output += "\n";

			output += this.waves.map( ( wave ) => {

				data = wave.data.get( i );

				if( data !== undefined ) {
					iterating = true;
					return data;
				}

				return "";

			} ).join(",");

			if( ! iterating ) {
				break;
			}
		}

		return output;
	}
}

export { CSVBuilder, ITXBuilder }

