
import React from 'react';


class CellButtons extends React.Component {

	/*
	 *	props.current
	 *	props.start
	 *	props.change
	 *	props.arrowstatus
	 */
	constructor( props ) {
		super( props );
	}

	render() {
		
		return (
			<div>
			{ !! this.props.cfg && 
				<button className="btn btn-sm btn-default" onClick={ this.props.cfg }>
					<span className="glyphicon glyphicon-cog"></span>
				</button>
			}

			{ !! this.props.start && 
				<button className="btn btn-sm btn-success" onClick={ this.props.start }>
					<span className="glyphicon glyphicon-play"></span>
				</button> 
			}

				{ !! this.props.button_stop && <button className="btn btn-sm btn-danger" onClick={ this.props.stop }><span className="glyphicon glyphicon-stop"></span></button>  }
				{ !! this.props.button_jsc && <button type="button" className={ ( ( this.props.button_jsc_disabled ? 'disabled ' : '' ) + "btn btn-primary btn-sm" ) } onClick={ this.props.recordJsc }><span className="glyphicon glyphicon-record"></span> J<sub>sc</sub></button> }
				{ !! this.props.button_voc && <button type="button" className={ ( ( this.props.button_voc_disabled ? 'disabled ' : '' ) + "btn btn-primary btn-sm" ) } onClick={ this.props.recordVoc }><span className="glyphicon glyphicon-record"></span> V<sub>oc</sub></button> }
				{ !! this.props.button_iv && <button type="button" className={ ( ( this.props.button_iv_disabled ? 'disabled ' : '' ) + "btn btn-primary btn-sm" ) } onClick={ this.props.recordIV }><span className="glyphicon glyphicon-record"></span> IV</button> }
				{ !! this.props.button_download && <button type="button" className="btn btn-primary btn-sm" onClick={ this.props.downloadData }><span className="glyphicon glyphicon-download"></span></button> }
				{ !! this.props.button_details && <button type="button" className="btn btn-primary btn-sm" onClick={ this.props.details }><span className="glyphicon glyphicon-chevron-down"></span></button> }

			</div>
		);
	}
}

export default CellButtons