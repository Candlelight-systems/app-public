
import React from 'react';

class CellFormLight extends React.Component {
	

	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.props.onFormChange( name, value );
	}

	componentDidUpdate() {

	}

	render() {	 

		return (
			<div>

				<div className="form-group">
					<label htmlFor="lightRefV" className="col-sm-3">Reference light</label>
					<div className="col-sm-9">
						<select name="lightRef" id="lightRef" className="form-control" value={ this.props.lightRef } onChange={ this.handleInputChange }>
							<option value="" ref="">Select a light reference</option>
							{ ( this.props.photodiodeRefs || [] ).map( ( light ) => <option value={ light.ref } key={ light.ref }>{ light.name }</option> ) }
							<option value="manual" ref="manual">Manual value</option>
						</select>
					</div>
				</div>

				{ this.props.lightRef == 'manual' && 
				<div className="form-group">
					<label className="col-sm-3" htmlFor="lightRefValue">Light value</label>
					<div className="col-sm-9">
						<div className="input-group">
							<input type="number" min="0" max="2.5" step="0.001" name="lightRefValue" id="lightRefValue" className="form-control" placeholder="1" value={this.props.lightRefValue} onChange={this.handleInputChange} />
							<span className="input-group-addon">sun</span>
						</div>
					</div>
				</div> }
			</div> );
	}
}

export default CellFormLight