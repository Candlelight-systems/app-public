import React from 'react';
import { ipcRenderer } from "electron";


//import cfg from "./config"

const initialState = {


};

class lightIntensity extends React.Component {
	
	/**
	 *	@param props.name The name of the cell
	 */
	constructor( props ) {
		super( props );
		
		this.unit = {
			"voltage": <span>V</span>,
			"currentdensity": <span>mA cm<sup>-2</sup></span>,
			"current": <span>mA</span>,
			"efficiency": <span>%</span>,
			"fillfactor": <span>%</span>,
			"sun": <span>sun</span>,
			"area": <span>cm<sup>2</sup></span>
		};

		this.state = initialState;

		this.getState = {
			calib_0sun: false,
			calib_1sun: false
		};


		this.handleInputChange = this.handleInputChange.bind( this );
		this.calib_0sun = this.calib_0sun.bind( this );
		this.calib_1sun = this.calib_1sun.bind( this );

		this.setRequestTimeout();
	
	//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};
	}

	calib_0sun() {}
	calib_1sun() {}

	setRequestTimeout() {

		setTimeout( () => {
			var str = [];
			for( var i in this.getState ) {
				if( this.getState[ i ] ) {
					str.push( i );
				}
			}

			if( str.length == 0 ) {
				this.setRequestTimeout();
				return;
			}


			fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getCurrent?instrumentId=" + this.props.instrumentId + "&channels=" + str.join(","), {

				method: 'GET',

			} ).then( ( values ) => values.json() )
			   .then( ( json ) => {

			   	this.setState( { channelsJsc: json } );

			} ).catch( () => {

				// Catching JSON or request errors

			} ).then( () => {

				this.setRequestTimeout();
			});

		}, 1000 );
	}

	componentWillReceiveProps( nextProps ) {

	}

	componentDidMount() {

		
	}


	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}

	enablePD( pdElement ) {

		this.getState[ 'pd_' + pdElement ] = true;
	}

	disablePD( pdElement ) {

		this.getState[ 'pd_' + pdElement ] = false;
	}

	async enableChannel( chanId ) {

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/enableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId, {
			method: 'GET'
		} );

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setVoltage?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId + "&voltage=0", {
			method: 'GET'
		} );

		this.getState[ chanId ] = true;
	}

	async disableChannel( chanId ) {

		await fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/disableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId, {
			method: 'GET'
		} );

		this.getState[ chanId ] = false;
	}

	componentDidUpdate( nextProps, nextState ) {

		if( nextState.mon_pd1 && ! this.state.mon_pd1 ) {
			this.enablePD( 1 );
		} else if( ! nextState.mon_pd1 && this.state.mon_pd1 ) {
			this.disablePD( 1 );
		}

		if( nextState.mon_pd2 && ! this.state.mon_pd2 ) {
			this.enablePD( 1 );
		} else if( ! nextState.mon_pd2 && this.state.mon_pd2 ) {
			this.disablePD( 1 );
		}

		for( var i in this.state.channels ) {

			let chanId = this.state.channels[ i ].chanId,
				strObj = 'mon_' + chanId;

			if( this.state[ strObj ] && ! nextState[ strObj ] ) {

				this.disableChannel( chanId );

			} else if( ! this.state[ strObj ] && nextState[ strObj ] ) {

				this.enableChannel( chanId );
			}
		}
	}

	render() {


		return (
			<div className="container-fluid">
				<div clasName="col-sm-7">
					<h4>Monitor short circuit currents</h4>
					<div className="row">
						<div className="col-xs-4">Photodiode 1</div>
						<div className="col-xs-4">
							<input type="checkbox" checked data-toggle="toggle" data-on="Enabled" data-off="Disabled" name="mon_pd1" checked={ this.state.mon_pd1 } onClick={ this.handleInputChange } />
						</div>
						<div className="col-xs-4">J<sub>sc</sub>: { this.state.channelsJsc[ 'pd1' ] }</div>
					</div>
					<div className="row">
						<div className="col-xs-4">Photodiode 2</div>
						<div className="col-xs-4">
							<input type="checkbox" checked data-toggle="toggle" data-on="Enabled" data-off="Disabled" name="mon_pd2" checked={ this.state.mon_pd2 } onClick={ this.handleInputChange } />
						</div>
						<div className="col-xs-4">J<sub>sc</sub>: { this.state.channelsJsc[ channel.chanId ] }</div>
					</div>
					{ this.props.channels.map( ( channel ) => {

						<div className="row">
							<div className="col-xs-4">Channel { channel.chanId }</div>
							<div className="col-xs-4">
								<input type="checkbox" checked data-toggle="toggle" data-on="Enabled" data-off="Disabled" name={"mon_" + channel.chanId } checked={ this.state[ "mon_" + channel.chanId ] } onClick={ this.handleInputChange } />
							</div>
							<div className="col-xs-4">J<sub>sc</sub>: { this.state.channelsJsc[ channel.chanId ] }</div>
						</div>
					} ) }
				</div>
				<div className="col-sm-7">
					<h4>2-point calibration</h4>
					<div className="row">
						<div className="col-xs-4">
							<input type="radio" name="calib" value="pd1" onClick={ this.handleInputChange } checked={ this.state.calib } /> Photodiode 1
						</div>
					</div>
					<div className="row">
						<div className="col-xs-4">
							<input type="radio" name="calib" value="pd2" onClick={ this.handleInputChange } checked={ this.state.calib } /> Photodiode 1
						</div>
					</div>

					<div className="col-xs-2">
							<button type="button" className={ 'btn ' + this.state.calib_0sun ? 'btn-success' : 'btn-primary' } onClick={ this.calib_0sun }>Dark</button>
					</div>
					<div className="col-xs-2">
						<button type="button" className={ 'btn ' + this.state.calib_1sun ? 'btn-success' : 'btn-primary' } onClick={ this.calib_1sun }>1 sun</button>
					</div>
				</div>
			</div>
		);
	}
}


export default cellStatus;