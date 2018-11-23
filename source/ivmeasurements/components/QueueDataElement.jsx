
import React from 'react'
import { connect } from 'react-redux'
import MPPTData from './data/MPPTWrapper'
import JVData from './data/JVFormWrapper'

const mapStateToProps = state => {
	return {
		queueElement: state.queue[ state.currentQueueElement ]
	}
}

const QueueConfigElement = ( { dispatch, queueElement } ) => {

	if( ! queueElement ) {
		return null;
	}

	return ( <div>
		{ (() => {

			switch( queueElement.type ) {

				case 'JV':
					return <JVData { ...queueElement } />;
				break;

				case 'MPPT':
					return <MPPTData { ...queueElement } />;
				break;

				case 'CHAN':
					return null;
				break;
			} 
		} )() }
	</div> );
	
}

export default connect( mapStateToProps )( QueueDataElement )