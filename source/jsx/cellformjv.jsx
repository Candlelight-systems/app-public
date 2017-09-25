
import React from 'react';

class CellFormTracking extends React.Component {
	

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
					<label className="col-sm-3">Starting voltage</label>
					<div className="col-sm-9">
						<div className="input-group">
							<span className="input-group-addon"><label><input type="checkbox" name="iv_autostart" id="iv_autostart" onClick={this.handleInputChange} checked={this.props.iv_autostart} />&nbsp;V<sub>oc</sub></label></span>
							<input type="number" min="-2.5" max="2.5" step="0.001" name="iv_start" id="iv_start" disabled={!!this.props.iv_autostart} className="form-control" placeholder="1" value={this.props.iv_start} onChange={this.handleInputChange} />
							<span className="input-group-addon">V</span>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-3">Ending voltage</label>
					<div className="col-sm-9">
						<div className="input-group">
							<input type="number" min="-2.5" max="2.5" step="0.001" name="iv_stop" id="iv_stop" className="form-control" placeholder="1" value={this.props.iv_stop} onChange={this.handleInputChange} />
							<span className="input-group-addon">V</span>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-3">Sweep rate</label>
					<div className="col-sm-9">
						<div className="input-group">
							<input type="number" min="0.0005" max="0.1" step="0.0001" name="iv_rate" id="iv_rate" className="form-control" placeholder="0.01" value={this.props.iv_rate} onChange={this.handleInputChange} />
							<span className="input-group-addon">V/s</span>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-3">Measure in both directions</label>
					<div className="col-sm-9">
						<input type="checkbox" name="iv_hysteresis" checked={ !! this.props.iv_hysteresis } onChange={ this.handleInputChange } />
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="iv_interval" className="col-sm-3">Measure every</label>
					<div className="col-sm-9">
						<select name="iv_interval" id="iv_interval" className="form-control" value={ this.props.iv_interval } onChange={ this.handleInputChange }>
							<option value="600000">Every 10 minutes</option>
							<option value="3600000">Every hour</option>
							<option value="10800000">Every 3 hours</option>
							<option value="43200000">Every 12 hours</option>
							<option value="86400000">Every day</option>
							<option value="604800000">Every week</option>
						</select>
					</div>
				</div>
			</div> );
	}
}

export default CellFormTracking