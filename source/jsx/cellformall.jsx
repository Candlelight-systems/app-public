import React from 'react';
import CellFormTracking from "./cellformtracking.jsx"
import CellFormIV from "./cellformjv.jsx"
import CellFormLight from "./cellformlight.jsx"
import CellForm from "./cellform.jsx"

class CellFormAll extends CellForm {
	
	handleInputChange(event) {

	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}

	componentDidMount() {

		super.componentDidMount();
		this.newProps( this.props );
	}

	componentWillReceiveProps( nextProps ) {

		super.componentWillReceiveProps( ...arguments );
		this.newProps( this.props );
	}

	newProps( props ) {

		var stateObj = {};

		props.channelIds.forEach( ( chanId ) => {

			for( var i in props.allStatuses ) {

				if( props.allStatuses[ i ].chanId == chanId ) {
					stateObj[ '__cellName_' + chanId ] = props.allStatuses[ i ].cellName;
					stateObj[ '__cellActive_' + chanId ] = !! props.allStatuses[ i ].enable && props.allStatuses[ i ].tracking_mode > 0;
					break;
				}
			}			
		});

		Object.assign( stateObj, props.formState );
		this.setState( stateObj );
	}

	render() {	 

		var unique = "";

		return (
		<div className="container-fluid">

				<form onSubmit={ this.submit } className="form-horizontal">

				<ul className="nav nav-tabs formTabs" ref={ el => this.tabs = el }>
				  <li role="presentation" className="active"><a data-target={ "#cell_" + unique } data-toggle="tab">Cell configuration</a></li>
				  <li role="presentation"><a data-target={ "#tracker_" + unique } data-toggle="tab">Tracker</a></li>
				  <li role="presentation"><a data-target={ "#iv_" + unique } data-toggle="tab">j(V) curves</a></li>
				  <li role="presentation"><a data-target={ "#light_" + this.state.unique } data-toggle="tab">Light reference</a></li>
				</ul>


				<div className="tab-content">

					<div className="tab-pane active" id={ "cell_" + unique }>
						<h3>Cell name</h3>

						{ this.props.channelIds.map( ( chanId ) => 

							<div className="form-group" key={ chanId }>
								<label className="col-sm-3">Channel { chanId }</label>
								<div className="col-sm-9">
									<input type="text" name={"__cellName_" + chanId } id={"__cellName_" + chanId } className="form-control" placeholder="Device name" disabled={ this.state[ "__cellActive_" + chanId ] } value={ this.state["__cellName_" + chanId ] } onChange={this.handleInputChange} />
								</div>
							</div>
						) }

						<div className="form-group">
							<h3 htmlFor="cellArea" className="col-sm-3">Cell area</h3>
							<div className="col-sm-9">
								<div className="input-group">
									<input type="number" step="0.01" name="cellArea" id="cellArea" className="form-control col-sm-9" placeholder="Cell area" value={this.state.cellArea} onChange={this.handleInputChange} />
									<span className="input-group-addon">mA cm<sup>-2</sup></span>
								</div>
							</div>
						</div>
					</div>

					<div className="tab-pane" id={ "tracker_" + unique }>

						<CellFormTracking {...this.state} onFormChange={ this.subFormChanged } />
					</div>

					<div className="tab-pane" id={ "iv_" + unique }>

						<CellFormIV {...this.state} photodiodeRefs={ this.props.photodiodeRefs } onFormChange={ this.subFormChanged } />
					</div>


					<div className="tab-pane" id={ "light_" + this.state.unique }>

						<CellFormLight {...this.state} photodiodeRefs={ this.props.photodiodeRefs } onFormChange={ this.subFormChanged } />
					</div>
				
			
				</div>
			</form>
			
			<div className="btn-group pull-right">
	          <button type="button" className="btn btn-default"name="update"  onClick={this.close}>Close</button>
			  <button type="button" className="btn btn-primary" name="update" onClick={this.validateConfig}>Update channels</button>
	      	</div>
	      </div>
		);
	}
}

export default CellFormAll;