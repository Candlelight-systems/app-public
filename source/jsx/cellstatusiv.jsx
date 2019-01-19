

import GraphComponent from './graphcomponent.jsx';
import Graph from 'node-jsgraph/dist/jsgraph-es6';
import React from 'react';
import environment from "../../app/environment.json"


const color = "__THEME_GRAPH_IV_MAINCOLOR";

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

			closeColor: color
		});

		this.resize( this.props );
		
		this.serie = [];

		this.graph.setBackgroundColor( "rgba( 255, 255, 255, 0.2 )" );

		this.graph.getLeftAxis()
			.setLineAt( [ 0 ] )
			.gridsOff()
			.setAxisColor(color)
			.setPrimaryTicksColor(color)
			.setSecondaryTicksColor(color) 
			.setTicksLabelColor(color) 
			.setLabelColor(color);


		this.graph.getBottomAxis()
			.gridsOff()
			.setAxisColor(color)
			.setPrimaryTicksColor(color)
			.setSecondaryTicksColor(color)
			.setLabelColor(color)
			.setTicksLabelColor(color);


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


		var legend = this.graph.makeLegend( {
			paddingLeft: 0,
			paddingRight: 2,
			paddingTop: 10,
			paddingBottom: 0,
			frame: false,
			backgroundColor: 'transparent',
			color: color
		});

		legend.setPosition( { x: 'max', y: 'max' }, 'right', 'top' );

		legend.notHideable();
		legend.update(); 

		this.ellipse = this.graph.newShape( "ellipse" );
		this.ellipse.setR( "3px", "3px" );
	
		this.ellipse.setFillColor( color );
		this.ellipse.setStrokeColor( color );	
		this.ellipse.draw();
	}

<<<<<<< HEAD

	componentWillUpdate( nextProps ) {

		let shouldUpdateIV = false;

		if( nextProps.updatedTime !== this.props.updatedTime ) {
			shouldUpdateIV = true;
		} else if( this.props.data.length !== nextProps.data.length ) {
			shouldUpdateIV = true;
		} else {
			nextProps.data.map( ( el, index ) => {

				if( ! this.props.data[ index ] || el.time != this.props.data[ index ].time ) {
					shouldUpdateIV = true;
				}
			});
		}
=======

	componentWillUpdate( nextProps ) {

		let shouldUpdateIV = false;

		if( nextProps.updatedTime !== this.props.updatedTime ) {
			shouldUpdateIV = true;
		} else if( this.props.data.length !== nextProps.data.length ) {
			shouldUpdateIV = true;
		} else {
			nextProps.data.map( ( el, index ) => {

				if( ! this.props.data[ index ] || el.time != this.props.data[ index ].time ) {
					shouldUpdateIV = true;
				}
			});
		}

		console.log( shouldUpdateIV );
>>>>>>> a862b52bbda128ce9575ae7e639cf9615f539e8e

		if( shouldUpdateIV ) {

			nextProps.data.sort( ( a, b ) => {
				return a.time - b.time;
			} );

		//	this.graph.resetSeries();
			
			//let maxY = 0;

			let indices = [];
			
			if( ! nextProps.data[ 0 ] ) {
				return;
			}
			
			const firstTime = nextProps.data[ 0 ].time;
			const lastTime = nextProps.data[ nextProps.data.length - 1 ].time;
			const idealInterval = ( lastTime - firstTime ) / 4; // 5 iv curves

			let lastInterval = 0;

			nextProps.data.forEach( ( data, index ) => {

				if( data.time - lastInterval > idealInterval || nextProps.data.length <= 5 || index == nextProps.data.length - 1 ) {
					lastInterval = data.time;
					indices.push( index ); 
				}
			});

			const colors = [ '#ae182d', '#6d18ae', '#1834ae', '#1897ae', '#18ae22', '#acae18' ];
			let k = 0;

			nextProps.data.forEach( ( data, index ) => {

				if( indices.indexOf( index ) == -1 ) {
					return;
				}

				if( data.iv.getLength() == 0 ) {
					return;
				}

				let s = this.graph.newSerie( "iv_" + k );
<<<<<<< HEAD

				const ellapsed =  ( data.time - firstTime ) / 1000 / 3600;

				if( ellapsed < 1 ) {
					s.setLabel( Math.round( ellapsed * 60 ) + "min" );
				} else {
					s.setLabel( Math.round( ellapsed * 10 ) / 10 + "h" );
				}

				s.setLineColor( colors[ k ] );
				s.autoAxis();
				s.setLineWidth( 2 );
				s.ellapsed = ellapsed;
=======
				s.setLabel( Math.round( ( data.time - firstTime ) / 1000 / 3600 * 10 ) / 10 + "h" );
				s.setLineColor( colors[ k ] );
				s.autoAxis();
				s.setLineWidth( 2 );

>>>>>>> a862b52bbda128ce9575ae7e639cf9615f539e8e
				let s2 = this.graph.newSerie( "power_" + k );
				s2.setLineColor( colors[ k ] );
				s2.setLineStyle( 2 );
				s2.excludedFromLegend = true;
				s2.autoAxis();
				s2.setLineWidth( 2 );

<<<<<<< HEAD
				s2.ellapsed = ellapsed;
=======
>>>>>>> a862b52bbda128ce9575ae7e639cf9615f539e8e
				s.setWaveform( data.iv );
				s2.setWaveform( data.iv.duplicate().math( ( y, x ) => y * x ) );
	//			maxY = Math.max( maxY, data.iv.getMaxY() );
				k++;
			});

			this.serieIV = this.graph.newSerie( "iv_time" ).setLabel("MPPT");
			this.serieIV.autoAxes();
			this.serieIV.setLineColor( color ).setLineWidth( 2 );

				
			if( nextProps.dataIV ) {
				this.serieIV.setWaveform( nextProps.dataIV );
			}

<<<<<<< HEAD
			this.graph.sortSeries( ( sA, sB ) => {
console.log( sA.ellapsed, sB.ellapsed, sA.getLabel(), sB.getLabel() );
				if( typeof sA.ellapsed == 'undefined' ) {
					return 1;
				}

				if( typeof sB.ellapsed == 'undefined' ) {
					return -1;
				}

				return sA.ellapsed < sB.ellapsed ? -1 : 1
			} );
			
			this.graph.getYAxis().setLowestMin( - environment.instrument[ nextProps.instrumentId ].fsr * 1e-3 );	
			this.graph.getYAxis().setHighestMax( environment.instrument[ nextProps.instrumentId ].fsr * 1e-3 );
			this.graph.getXAxis().setLowestMin( - environment.instrument[ nextProps.instrumentId ].voltageRange );
			this.graph.getXAxis().setHighestMax( environment.instrument[ nextProps.instrumentId ].voltageRange );	

			
			this.graph.show();
			this.graph.autoscaleAxes();
			this.graph.draw();
			this.graph.updateLegend();

		}

	}

	componentDidUpdate() {

=======
			
			this.graph.getYAxis().setLowestMin( - environment.instrument[ nextProps.instrumentId ].fsr * 1e-3 );	
			this.graph.getYAxis().setHighestMax( environment.instrument[ nextProps.instrumentId ].fsr * 1e-3 );
			this.graph.getXAxis().setLowestMin( - environment.instrument[ nextProps.instrumentId ].voltageRange );
			this.graph.getXAxis().setHighestMax( environment.instrument[ nextProps.instrumentId ].voltageRange );	

			
			this.graph.show();
			this.graph.autoscaleAxes();
			this.graph.draw();
			this.graph.updateLegend();

		}

	}

	componentDidUpdate() {

>>>>>>> a862b52bbda128ce9575ae7e639cf9615f539e8e
		this.ellipse.setPosition( { x: this.props.voltage, y: this.props.current / 1000 } );
		this.ellipse.redraw();

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