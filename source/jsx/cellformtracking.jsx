
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
console.log( this.props );
		return (

			<div>
				<div className="form-group">
					<label htmlFor="tracking_mode" className="col-sm-3">Tracking mode</label>
					<div className="col-sm-9">
						<select name="tracking_mode" id="tracking_mode" className="form-control" value={this.props.tracking_mode} onChange={this.handleInputChange}>
								<option key="0" value="0">No tracking</option>
								<option key="1" value="1">Maximum power point</option>
								<option key="2" value="2">Open circuit voltage</option>
								<option key="3" value="3">Short circuit current</option>
						</select>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="tracking_mode" className="col-sm-3">Current range</label>
					<div className="col-sm-9">
						<select name="tracking_gain" id="tracking_gain" className="form-control" value={this.props.tracking_gain} onChange={this.handleInputChange}>
								<option key="0" value="-1">Auto</option>
								<option key="1" value="1">+/- 20mA</option>
								<option key="2" value="2">+/- 10mA</option>
								<option key="3" value="4">+/- 5mA</option>
								<option key="4" value="8">+/- 2.5mA</option>
								<option key="5" value="16">+/- 1.25mA</option>
								<option key="6" value="32">+/- 0.625mA</option>
								<option key="7" value="64">+/- 0.313mA</option>
								<option key="8" value="128">+/- 0.156mA</option>
						</select>
					</div>
				</div>


				<div className="form-group">
					<label htmlFor="tracking_step" className="col-sm-3">Tracking step</label>
					<div className="col-sm-9">
						<select name="tracking_step" id="tracking_step" className="form-control" value={this.props.tracking_step} onChange={this.handleInputChange}>
								<option key="mv1" value="1">1 mV</option>
								<option key="mv2" value="2">2 mV</option>
								<option key="mv3" value="3">3 mV</option>
								<option key="mv4" value="4">4 mV</option>
								<option key="mv5" value="5">5 mV</option>
						</select>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="tracking_interval" className="col-sm-3">Tracking interval</label>
					<div className="col-sm-9">
						<select name="tracking_interval" id="tracking_interval" className="form-control" value={this.props.tracking_interval} onChange={this.handleInputChange}>
							<option key="never" value="null">Never</option>
							<option key="100sps" value="100">10 samples per second</option>
							<option key="1000sps" value="1000">1 sample per second</option>
							<option key="10000sps" value="10000">6 samples per minute</option>
							<option key="60000sps" value="60000">1 sample per minute</option>
							<option key="600000sps" value="600000">6 samples per hour</option>
							<option key="3600000sps" value="3600000">1 sample per hour</option>
						</select>
					</div>
				</div>


				<div className="form-group">
					<label htmlFor="tracking_record_interval" className="col-sm-3">Record interval</label>
					<div className="col-sm-9">
						<select name="tracking_record_interval" id="tracking_record_interval" className="form-control" value={this.props.tracking_record_interval} onChange={this.handleInputChange}>
							<option key="never_record" value="null">Never</option>
							<option key="1000sps_record" value="1000">1 sample per second</option>
							<option key="10000sps_record" value="10000">6 samples per minute</option>
							<option key="60000sps_record" value="60000">1 sample per minute</option>
							<option key="600000sps_record" value="600000">6 samples per hour</option>
							<option key="3600000sps_record" value="3600000">1 sample per hour</option>
						</select>
					</div>
				</div>


				<div className="form-group">
					<label htmlFor="tracking_fwbwthreshold" className="col-sm-3">Forward to backward threshold</label>
					<div className="col-sm-9">
						<select name="tracking_fwbwthreshold" id="tracking_fwbwthreshold" className="form-control" value={this.props.tracking_fwbwthreshold} onChange={this.handleInputChange}>
							<option key="0" value="0">0%</option>
							<option key="0.0004" value="0.0004">0.04%</option>
							<option key="0.0008" value="0.0008">0.08%</option>
							<option key="0.0016" value="0.0016">0.16%</option>
							<option key="0.0032" value="0.0032">0.32%</option>
							<option key="0.0064" value="0.0064">0.64%</option>
							<option key="0.0128" value="0.0128">1.3%</option>
							<option key="0.0256" value="0.0256">2.6%</option>
							<option key="0.0512" value="0.0512">5.1%</option>
							<option key="0.1024" value="0.1024">10.2%</option>
							<option key="0.2048" value="0.2048">20.4%</option>
						</select>
					</div>
				</div>


				<div className="form-group">
					<label htmlFor="tracking_bwfwthreshold" className="col-sm-3">Backward to forward threshold</label>
					<div className="col-sm-9">
						<select name="tracking_bwfwthreshold" id="tracking_bwfwthreshold" className="form-control" value={this.props.tracking_bwfwthreshold} onChange={this.handleInputChange}>
							<option value="0">0%</option>
							<option value="0.0004">0.04%</option>
							<option value="0.0008">0.08%</option>
							<option value="0.0016">0.16%</option>
							<option value="0.0032">0.32%</option>
							<option value="0.0064">0.64%</option>
							<option value="0.0128">1.3%</option>
							<option value="0.0256">2.6%</option>
							<option value="0.0512">5.1%</option>
							<option value="0.1024">10.2%</option>
							<option value="0.2048">20.4%</option>
						</select>
					</div>
				</div>

				{ !! this.props.tracking_mode == 1 &&

					<div>
					<div className="form-group">
						<div>
							<label className="col-sm-14"><input type="checkbox" name="tracking_measure_voc" checked={ !! this.props.tracking_measure_voc } onChange={ this.handleInputChange } /> Measure V<sub>oc</sub> periodically</label>
						</div>
					</div>

					{ !! this.props.tracking_measure_voc &&
					<div className="form-group">
						<label htmlFor="tracking_measure_voc_interval" className="col-sm-3">Measure every</label>
						<div className="col-sm-9">
							<select name="tracking_measure_voc_interval" id="tracking_measure_voc_interval" className="form-control" value={ this.props.tracking_measure_voc_interval} onChange={this.handleInputChange}>
								<option value="600000">Every 10 minutes</option>
								<option value="3600000">Every hour</option>
								<option value="10800000">Every 3 hours</option>
								<option value="43200000">Every 12 hours</option>
								<option value="86400000">Every day</option>
								<option value="604800000">Every week</option>
							</select>
						</div>
					</div> }
			

					<div className="form-group">
						<div>
							<label className="col-sm-14"><input type="checkbox" name="tracking_measure_jsc" checked={ !! this.props.tracking_measure_jsc } onChange={ this.handleInputChange } /> Measure J<sub>sc</sub> periodically</label>
						</div>
					</div>

					{ !! this.props.tracking_measure_jsc &&
					<div className="form-group">
						<label htmlFor="tracking_measure_jsc_interval" className="col-sm-3">Measure every</label>
						<div className="col-sm-9">
							<select name="tracking_measure_jsc_interval" id="tracking_measure_jsc_interval" className="form-control" value={ this.props.tracking_measure_jsc_interval} onChange={this.handleInputChange}>
								<option value="600000">Every 10 minutes</option>
								<option value="3600000">Every hour</option>
								<option value="10800000">Every 3 hours</option>
								<option value="43200000">Every 12 hours</option>
								<option value="86400000">Every day</option>
								<option value="604800000">Every week</option>
							</select>
						</div>
					</div> }
				</div> }
			</div> );
	}
}

export default CellFormTracking