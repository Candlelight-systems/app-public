
import React from 'react';
import environment from "../../app/environment.json"

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

		let active = !! this.props.enable && this.props.tracking_mode > 0;
		const LSB = environment.instrument[ this.props.instrumentConfig.instrumentId ].LSB || 1.22;
		const LSBVal = environment.instrument[ this.props.instrumentConfig.instrumentId ].LSBValue || 0.001;
		let gainOptions = [];
		
		switch( environment.instrument[ this.props.instrumentConfig.instrumentId ].ADC.model ) {

			case 'ADS1259':
				gainOptions = [
					[ 0, 1/8 ],
					[ 1, 1/4 ],
					[ 2, 1/2 ],
					[ 3, 1 ],
					[ 4, 2 ],
					[ 5, 4 ],
					[ 6, 8 ],
					[ 7, 16 ],
					[ 8, 32 ],
					[ 9, 64 ],
					[ 10, 128 ]
				];
			break;


			case 'ADS1147':
				gainOptions = [
					[ 1, 1 ],
					[ 2, 2 ],
					[ 4, 4 ],
					[ 8, 8 ],
					[ 16, 16 ],
					[ 32, 32 ],
					[ 64, 64 ],
					[ 128, 128 ]
				];
			break;
		}

		gainOptions = gainOptions.map( ( [ code, gain ], index ) => {
			return <option key={index} value={code}>+/- { parseFloat( ( environment.instrument[ this.props.instrumentConfig.instrumentId ].fsr / gain ).toPrecision( 2 ) ) } mA</option>
		});

		gainOptions.unshift( <option key="auto" value="-1">Auto</option> );


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
								<option key="4" value="4">Constant voltage</option>
						</select>
					</div>
				</div>


				{ this.props.tracking_mode == 4 ? 

					<div className="form-group">
						<label htmlFor="tracking_mode" className="col-sm-3">Voltage</label>
						<div className="col-sm-9">
							<input type="number" min={ - environment.instrument[ this.props.instrumentConfig.instrumentId ].voltageRange } max={ + environment.instrument[ this.props.instrumentConfig.instrumentId ].voltageRange } className="form-control" name="tracking_voltage" value={ this.props.tracking_voltage } onChange={ this.handleInputChange } />
						</div>
					</div>
					: 
					null
				}
{/*
				<div className="form-group">
					<label htmlFor="tracking_mode" className="col-sm-3">Current range</label>
					<div className="col-sm-9">
						<select name="tracking_gain" id="tracking_gain" className="form-control" value={this.props.tracking_gain} onChange={this.handleInputChange}>
							{ gainOptions }
						</select>
					</div>
				
					<div className="help-block col-sm-9">
						This value is independent of the maximumm current output of your device. Any gain range is safe to use, but <div className="text-danger">do not exceed the current capabilities of your device (+/- { environment.instrument[ this.props.instrumentConfig.instrumentId ].fsr } mA)</div>
					</div>
					
				</div>

*/ }
				<div className="form-group">
					<label htmlFor="tracking_step" className="col-sm-3">Tracking step</label>
					<div className="col-sm-9">
						<select name="tracking_stepsize" id="tracking_stepsize" className="form-control" value={this.props.tracking_step} onChange={this.handleInputChange}>
								<option key="mv1" value={ LSBVal * 1 }>{ LSB * 1 } mV</option>
								<option key="mv2" value={ LSBVal * 2 }>{ LSB * 2 } mV</option>
								<option key="mv3" value={ LSBVal * 3 }>{ LSB * 3 } mV</option>
								<option key="mv4" value={ LSBVal * 4 }>{ LSB * 4 } mV</option>
								<option key="mv5" value={ LSBVal * 5 }>{ LSB * 5 } mV</option>
						</select>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="tracking_interval" className="col-sm-3">Tracking interval</label>
					<div className="col-sm-9">
						<select name="tracking_interval" id="tracking_interval" className="form-control" value={this.props.tracking_interval} onChange={this.handleInputChange}>
							<option key="0sps" value="0">As fast as possible</option>
							<option key="100sps" value="100">10 samples per second</option>
							<option key="1000sps" value="1000">1 sample per second</option>
							<option key="10000sps" value="10000">6 samples per minute</option>
							<option key="60000sps" value="60000">1 sample per minute</option>
							<option key="600000sps" value="600000">6 samples per hour</option>
							<option key="3600000sps" value="3600000">1 sample per hour</option>
						</select>
					</div>
					
					<div className="help-block col-sm-9">
						This value is not guaranteed. It depends on the aquistion speed and the number of channels enabled.
					</div>

				</div>


				<div className="form-group">
					<label htmlFor="tracking_record_interval" className="col-sm-3">Record interval</label>
					<div className="col-sm-9">
						<select name="tracking_record_interval" id="tracking_record_interval" className="form-control" value={this.props.tracking_record_interval} onChange={this.handleInputChange}>
							<option key="never_record" value="null">Never</option>
							<option key="500sps_record" value="500">2 sample per second</option>
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
					<div className="form-group row">
						<div>
							<label className="col-sm-9"><input type="checkbox" name="tracking_measure_voc" checked={ !! this.props.tracking_measure_voc } onChange={ this.handleInputChange } /> Measure V<sub>oc</sub> periodically</label>
						</div>
					</div>

					{ !! this.props.tracking_measure_voc &&
					<div className="form-group">
						<label htmlFor="tracking_measure_voc_interval" className="col-sm-3">Measure every</label>
						<div className="col-sm-9">
							<select name="tracking_measure_voc_interval" id="tracking_measure_voc_interval" className="form-control" value={ this.props.tracking_measure_voc_interval} onChange={this.handleInputChange}>
								<option value="60000">Every minute</option>
								<option value="600000">Every 10 minutes</option>
								<option value="3600000">Every hour</option>
								<option value="10800000">Every 3 hours</option>
								<option value="43200000">Every 12 hours</option>
								<option value="86400000">Every day</option>
								<option value="604800000">Every week</option>
							</select>
						</div>
					</div> }
			

					<div className="form-group row">
						<div>
							<label className="col-sm-9"><input type="checkbox" name="tracking_measure_jsc" checked={ !! this.props.tracking_measure_jsc } onChange={ this.handleInputChange } /> Measure J<sub>sc</sub> periodically</label>
						</div>
					</div>

					{ !! this.props.tracking_measure_jsc &&
					<div className="form-group">
						<label htmlFor="tracking_measure_jsc_interval" className="col-sm-3">Measure every</label>
						<div className="col-sm-9">
							<select name="tracking_measure_jsc_interval" id="tracking_measure_jsc_interval" className="form-control" value={ this.props.tracking_measure_jsc_interval} onChange={this.handleInputChange}>
								<option value="60000">Every minute</option>
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