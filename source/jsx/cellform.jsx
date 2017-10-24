import React from 'react';
import CellFormTracking from "./cellformtracking.jsx"
import CellFormIV from "./cellformjv.jsx"

import {remote} from "electron"
	
const dialog = remote.dialog;

class CellForm extends React.Component {
	

	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.subFormChanged = this.subFormChanged.bind( this );
		this.validateConfig = this.validateConfig.bind( this );
		this.state = {

			cellArea: 0,
			cellName: ""
		};
		this.close = this.close.bind( this );
	}

	validateConfig() {
		this.props.onValidate( this.state );
		this.close();
	}

	close() {
		this.props.onClose();
	}

	subFormChanged( name, value ) {	
		this.setState( { [name]: value } );
	}


	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}


	componentDidMount() {

		$( "a", this.tabs ).click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});

		this.setState( this.props.formState );
	}

	componentWillReceiveProps( nextProps ) {

		this.setState( nextProps.formState );
	}

	render() {	 
console.log( this.state.connection );
		return (
			<div className="container-fluid">
				<form onSubmit={ this.submit } className="form-horizontal">

				<ul className="nav nav-tabs formTabs" ref={ el => this.tabs = el }>
				  <li role="presentation" className="active"><a data-target={ "#cell_" + this.state.unique } data-toggle="tab">Cell configuration</a></li>
				  <li role="presentation"><a data-target={ "#tracker_" + this.state.unique } data-toggle="tab">Tracker</a></li>
				  <li role="presentation"><a data-target={ "#iv_" + this.state.unique } data-toggle="tab">j(V) curves</a></li>
				</ul>


				<div className="tab-content">

				<div className="tab-pane active" id={ "cell_" + this.state.unique }>
					<div className="form-group">
						<label className="col-sm-3">Cell name</label>
						<div className="col-sm-9">
							<input type="text" name="cellName" id="cellName" className="form-control" placeholder="Device name" value={this.state.cellName} onChange={this.handleInputChange} />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="cellarea" className="col-sm-3">Cell area</label>
						<div className="col-sm-9">
							<div className="input-group">
								<input type="number" step="0.01" name="cellArea" id="cellArea" className="form-control col-sm-9" placeholder="Cell area" value={this.state.cellArea} onChange={this.handleInputChange} />
								<span className="input-group-addon">mA cm<sup>-2</sup></span>
							</div>
						</div>
					</div>

					{ this.props.instrumentConfig.relayController &&
						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Connection</label>
							<div className="col-sm-9">
								<div className="radio">
									<label>
										<input type="radio" name="connection" value="group" onClick={ this.handleInputChange } checked={ this.state.connection == 'group' } /> Cell enclosure
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="connection" value="external" onClick={ this.handleInputChange }  checked={ this.state.connection == 'external' } /> External connection
									</label>
								</div>
							</div>
						</div>
					}

					{ this.state.connection ==  "external" &&
						<div className="form-group">
							<label htmlFor="cellarea" className="col-sm-3">Light intensity</label>
							<div className="col-sm-9">
								<div className="input-group">
									<input type="number" className="form-control" name="lightRefValue" value={ this.state.lightRefValue } onChange={ this.handleInputChange } />
									<span className="input-group-addon">
										W m<sup>-2</sup>
									</span>
								</div>
							</div>
						</div>
					}

				</div>

				<div className="tab-pane" id={ "tracker_" + this.state.unique }>

					<CellFormTracking {...this.state} onFormChange={ this.subFormChanged } />
				</div>

				<div className="tab-pane" id={ "iv_" + this.state.unique }>

					<CellFormIV {...this.state} onFormChange={ this.subFormChanged } />
				</div>
			
			

				</div>
			</form>

			<div className="btn-group pull-right">
	          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
			  <button type="button" className="btn btn-primary" name="update" onClick={this.validateConfig}>Update channel</button>
	      	</div>
		</div>
		);
	}
}

export default CellForm;