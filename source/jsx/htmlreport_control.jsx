import React from 'react';
import { query as influxquery } from "./influx";
import { ipcRenderer } from "electron";


class HTMLReportControl extends React.Component {
	
	constructor( props ) {
		super( props );
		this.state = {
			data: {} ,
			comment: ""
		};

		this.close= this.close.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleSelectChange = this.handleSelectChange.bind( this );
		this.savePDF = this.savePDF.bind( this );
		this.printPDF = this.printPDF.bind( this );
	}

	validateConfig() {
		
		this.props.onValidate( this.state );
		this.close();
	//	$( this.modal ).modal('hide');
	}

	savePDF() {
		ipcRenderer.send( "htmlReport.savePDF", { cellName: this.props.cellInfo.cellName } );
	}

	printPDF() {
		ipcRenderer.send( "htmlReport.printPDF", { cellName: this.props.cellInfo.cellName } );
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

	handleSelectChange( event ) {

	  var options = event.target.options;
	  var value = [];
	  const name =  event.target.name;

	  for (var i = 0, l = options.length; i < l; i++) {

	    if ( options[ i ].selected ) {
	      value.push(options[i].value);
	    }
	  }


	  this.setState( { [ name ]: value } );
	}

	componentDidUpdate() {

	    ipcRenderer.send( "htmlReport.config", this.state );
	}

	componentDidMount() {
		this.getTrackData();
	}

	getTrackData( ) {

		var db = this.props.db.db;

		return influxquery("SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time DESC limit 1;", db, this.props.db ).then( async ( results ) => {
			
			if( ! results[ 0 ].series ) {
				throw "No measurement with the name " + this.props.measurementName + " or no associated data";
			}

			let timefrom = results[ 0 ].series[ 0 ].values[ 0 ][ 0 ],
				timeto = results[ 1 ].series[ 0 ].values[ 0 ][ 0 ],
				timeDifference = ( new Date( timeto ) - new Date( timefrom ) ) / 1000,
				grouping = Math.max( 1, Math.round( timeDifference / 1000 ) );

			influxquery("SELECT time,iv from \"" + this.props.measurementName + "_iv\" ORDER BY time ASC;", db, this.props.db ).then( ( results ) => {
				
				if( ! results[ 0 ].series ) {
					console.warn("No IV curves for this serie");
					this.state.data.jv_available = [];
					this.setState( { data: this.state.data } );
					return;
				}



				let values = results[ 0 ].series[ 0 ].values;
				this.state.data.jv_available = values.map( ( value, index ) => {
				
					return {
						ellapsed: Math.round( ( new Date( value[ 0 ] ) - new Date( timefrom ) ) / 3600 / 1000 * 10 ) / 10,
						time: value[ 0 ]
					};
				} );

				this.setState( { data: this.state.data } );
			} );
		} );
	}



	render() {	 
// test6_1494506615016_iv
		if( ! this.state.data.jv_available ) {
			return null;
		}

		return (
			
			<div className="container-fluid">
				<form className="form-horizontal">
						<h2>General</h2>
					
						<div className="form-group">
							
							<div className="col-sm-13 checkbox">
								<label>
									<input type="checkbox" checked={ this.state.humidity } name="humidity" onClick={ this.handleInputChange } /> Humidity
								</label>
							</div>
						</div>

						<div className="form-group">
							<div className="col-sm-13 checkbox">
								<label>
									<input type="checkbox" checked={ this.state.temeprature } name="temperature" onClick={ this.handleInputChange } /> Temperature
								</label>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-3">Comment</label>
							<div className="col-sm-9">
								<textarea className="form-control" name="comment" value={ this.state.comment } onChange={ this.handleInputChange }>
								</textarea>
							</div>
						</div>

						<h2>j-V curves</h2>
						<div className="form-group">
							<label className="col-sm-3">Select the j-V curves for the report</label>
							<div className="col-sm-9">
								<select className="form-control" multiple="multiple" name="jv" value={ this.state.jv } onChange={ this.handleSelectChange }>
									{ this.state.data.jv_available.map( ( jv ) => 
										<option key={ jv.time } value={ jv.time }>{ jv.ellapsed } hours</option>
									) }
								</select>
								<div className="help-block">Select up to 5 i-V curves. Any additional one will not be reported for space reasons.</div>
							</div>
						</div>
				</form>

				<div className="btn-group pull-right">
					<button type="button" className="btn btn-primary" onClick={ this.printPDF }>Print PDF</button>
					<button type="button" className="btn btn-primary" onClick={ this.savePDF }>Save PDF</button>
		      	</div>
			</div>
		);
	}
}

export default HTMLReportControl;