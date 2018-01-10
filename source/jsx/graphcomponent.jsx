
import React from 'react';

class GraphComponent extends React.PureComponent {


	constructor( props ) {
		super( props );
	}

	componentWillReceiveProps( nextProps ) {
		if( nextProps.width !== this.props.width || nextProps.height !== this.props.height ) {
			this.resize( nextProps );
		}
	}

	shouldComponentUpdate( nextProps ) {

		if( ! nextProps.shown ) {
			return false;
		}

		return true;
	}

	resize( props ) {
		console.log( props );
		this.graph.resize( props.width || 300, props.height || 130 );
	}

	render() {
		return (
			<div className="cellGraph">
				<div ref={el => this.graphDOM = el}>
				</div> 
			</div>
		);
	}
}

export default GraphComponent;
