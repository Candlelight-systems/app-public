

import GraphComponent from './graphcomponent.jsx';
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import React from 'react';

class statusIV extends GraphComponent {

	/*
	 *	props.current
	 *	props.start
	 *	props.change
	 *	props.arrowstatus
	 */
	constructor( props ) {
		super( props );
	}

	componentDidMount() {

		if( ! this.graphDOM ) {
			return;
		}

		this.graph = new Graph( this.graphDOM, {
			
			paddingTop: 10,
			paddingLeft: 25,
			paddingRight: 25,
			paddingBottom: 10,

			closeColor: "#303030"
		});

		this.resize( this.props );
		
		this.serie = [];

		this.graph.getLeftAxis()
			.setLineAt( [ 0 ] )
			.gridsOff()
			.setAxisColor("#303030")
			.setPrimaryTicksColor("#303030")
			.setSecondaryTicksColor("#303030") 
			.setTicksLabelColor("#303030") 
			.setLabelColor("#303030");
	

		this.graph.getBottomAxis()
			.gridsOff()
			.setAxisColor("#303030")
			.setPrimaryTicksColor("#303030")
			.setSecondaryTicksColor("#303030")
			.setLabelColor("#303030")
			.setTicksLabelColor("#303030");


	//	this.graph.setTitle("Latest j(V) curve")
		this.graph.getYAxis()
			.flip()
			.setLabel("Current")
			.setUnitWrapper("(", ")")
			.setEngineering( true )
			.setUnit("A cm^-2")
			.setUnitDecade( true );


		this.graph.getXAxis()
			.setLabel("Voltage")
			.setUnitWrapper("(", ")")
			.setUnit("V");


		this.serieIV = this.graph.newSerie( "iv_time" );
		this.serieIV.autoAxes();
		this.serieIV.setLineColor("#be2d2d").setLineWidth( 2 );

		this.serie[ 0 ] = this.graph.newSerie( "iv_0" );
		this.serie[ 0 ].setLineColor( "#303030" );
		this.serie[ 0 ].autoAxis();
		this.serie[ 0 ].setLineWidth( 2 );

		this.serie[ 1 ] = this.graph.newSerie( "iv_1" );
		this.serie[ 1 ].setLineColor( "#303030" );
		this.serie[ 1 ].setLineStyle( 2 );
		this.serie[ 1 ].autoAxis();
		this.serie[ 1 ].setLineWidth( 2 );

		this.ellipse = this.graph.newShape( "ellipse" );
		this.ellipse.setR( 3, 3 );
	
		this.ellipse.setFillColor('#be2d2d');
		this.ellipse.setStrokeColor('#303030');
		this.ellipse.draw();
	}

	componentDidUpdate() {

		if( this.graph && this.props.data ) {

			this.props.data.forEach( ( data, index ) => {

				if( ! data || ! data.getLength ) {
					this.serie[ index ].setWaveform( Graph.newWaveform().setData( [ ] ) );
					return;
				}

				if( index > 1 ) {
					return;

				}
				this.serie[ index ].setWaveform( data );
			});
				
			if( this.props.dataIV ) {
				this.serieIV.setWaveform( this.props.dataIV );
			}

			this.graph.autoscaleAxes();
			this.graph.show();
			
			if( this.props.data[ 0 ] ) {
				this.graph.getYAxis().forceMin( - this.props.data[ 0 ].getMaxY() * 0.5 );	
			}
			
			this.ellipse.setPosition( { x: this.props.voltage, y: this.props.current / 1000 } );
			this.ellipse.redraw();
			this.graph.autoscaleAxes();
			this.graph.draw();
		}

		if( ! this.props.data ) {

			this.serie.forEach( ( serie ) => {
				serie.setWaveform( Graph.newWaveform().setData( [] ) );
			});

			this.serieIV.setWaveform( Graph.newWaveform().setData( [] ) );
			this.graph.draw();
			this.graph.hide();
		}
	}
	
	render() {


		return (
			<div className="cellIV">
				<div id="graph-snippet" className="graph-snippet" ref={el => this.graphDOM = el}>
				</div> 
			</div>
		);
	}
}

export default statusIV;