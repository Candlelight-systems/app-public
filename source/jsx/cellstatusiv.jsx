

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
			
			paddingTop: 5,
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: 5,

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
			.setUnit("A")
			.setUnitDecade( true );


		this.graph.getXAxis()
			.setLabel("Voltage")
			.setUnitWrapper("(", ")")
			.setUnit("V");


		var legend = this.graph.makeLegend();
			legend.notHideable();
			legend.setAutoPosition( "right" );  
			legend.update(); 

			
			

	}

	componentDidUpdate() {

		this.props.data.sort( ( a, b ) => {
			return a.time - b.time;
		} );

		this.graph.resetSeries();

		let color = 'red';
		let maxY = 0;

		let indices = [];
		
		const firstTime = this.props.data[ 0 ].time;
		const lastTime = this.props.data[ this.props.data.length - 1 ].time;
		const idealInterval = ( lastTime - firstTime ) / 4; // 5 iv curves

		let lastInterval = 0;

		this.props.data.forEach( ( data, index ) => {

			if( data.time - lastInterval > idealInterval ) {
				lastInterval = data.time;
				indices.push( index ); 
			}
		});

		indices.push( this.props.data.length - 1 );

		const colors = [ '#ae182d', '#6d18ae', '#1834ae', '#1897ae', '#18ae22', '#acae18' ];
		let k = 0;

		this.props.data.forEach( ( data, index ) => {

			if( indices.indexOf( index ) == -1 ) {
				return;
			}

			let s = this.graph.newSerie( "iv_" + index );
			s.setLabel( Math.round( ( data.time - firstTime ) / 1000 / 3600 * 10 ) / 10 + "h" );
			s.setLineColor( colors[ k ] );
			s.autoAxis();
			s.setLineWidth( 2 );

			let s2 = this.graph.newSerie( "power_" + index );
			s2.setLineColor( colors[ k ] );
			s2.setLineStyle( 2 );
			s2.excludedFromLegend = true;
			s2.autoAxis();
			s2.setLineWidth( 2 );

			s.setWaveform( data.iv );
			s2.setWaveform( data.iv.duplicate().math( ( y, x ) => y * x ) );

			maxY = Math.max( maxY, data.iv.getMaxY() );
			k++;
		});

		this.serieIV = this.graph.newSerie( "iv_time" );
		this.serieIV.autoAxes();
		this.serieIV.setLineColor("black").setLineWidth( 2 );

		this.ellipse = this.graph.newShape( "ellipse" );
		this.ellipse.setR( 3, 3 );
	
		this.ellipse.setFillColor('black');
		this.ellipse.setStrokeColor('black');
		this.ellipse.draw();
			
		if( this.props.dataIV ) {
			this.serieIV.setWaveform( this.props.dataIV );
		}

		this.graph.autoscaleAxes();
		this.graph.show();
		
		this.graph.getYAxis().forceMin( - maxY * 0.5 );	
		this.ellipse.setPosition( { x: this.props.voltage, y: this.props.current / 1000 } );
		this.ellipse.redraw();

		this.graph.autoscaleAxes();
		this.graph.draw();
		this.graph.updateLegend();
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