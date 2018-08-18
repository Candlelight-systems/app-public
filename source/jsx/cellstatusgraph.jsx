
import GraphComponent from './graphcomponent.jsx';
import ReactDOM from "react-dom";
import React from 'react';
import extend from 'extend';
import Graph from 'node-jsgraph/dist/jsgraph-es6';


var modes = {

	sparkline: {

		graphConstructor: {

			paddingTop: 4,
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: 0
		}
	},

	default: {

		graphConstructor: {
			paddingTop: 4,
			paddingLeft: 9,
			paddingRight: 4,
			paddingBottom: 2
		}
	}
}


class statusGraph extends GraphComponent {

	/*
	 *	props.current
	 *	props.start
	 *	props.change
	 *	props.arrowstatus
	 */
	constructor( props ) {
		super( props );
		this.shapes_IV = [];
	}

	componentDidMount() {

		if( ! this.graphDOM ) {
			return;
		}

		this.graph = new Graph( this.graphDOM, extend( true, {}, modes[ this.props.mode ].graphConstructor, {

			close: {
				left: false,
				right: false,
				top: false,
				bottom: false
			}
		} ) );

		this.resize( this.props );


		this.serie = this.graph.newSerie();
		this.serie.setLineColor( __THEME_GRAPH_EFFICIENCY_LINECOLOR );
		this.serie.autoAxis();
		this.serie.setLineWidth( 2 );		

		this.serie.setLabel( this.props.serieLabelLegend );

		if( this.props.mode == 'sparkline' ) {
				
			this.graph.getYAxis().turnGridsOff();
			this.graph.getXAxis().hide();
			this.graph.getYAxis().hide();

		} else {

			this.graph.getXAxis()
						.setUnitInTicks( true )
						.setTickLabelOffset( -60 )
						.setTickPosition( Graph.TICKS_INSIDE )
						.secondaryGridOff()
						.setPrimaryTicksColor( __THEME_GRAPH_EFFICIENCY_TICKCOLOR )
						.setSecondaryTicksColor( __THEME_GRAPH_EFFICIENCY_TICKCOLOR )
						.setTicksLabelColor( __THEME_GRAPH_EFFICIENCY_TICKLABELCOLOR )
						.setNbTicksSecondary( 0 )
						.setUnit( 'h' )
						.setPrimaryGridColor( __THEME_GRAPH_EFFICIENCY_AXISCOLOR );
						
			this.graph.getYAxis().hide();

			this.graph.getYAxis()
				.setLabel( this.props.axisLabel )
				.setUnit( this.props.axisUnit )
				.setUnitWrapper("(", ")");
			
			this.graph.getXAxis();
			this.graph.getXAxis();
			this.graph.getRightAxis( 0 ).forceMin( 0 );

		}

		this.graph.getXAxis().setAxisDataSpacing( 0.001, 0.001 );
		this.graph.getYAxis().setAxisDataSpacing( 0.001, 0.001 );

		this.graph.getYAxis().forceMin( 0 );


		this.serieZone = this.graph.newSerie( "zone", {}, "zone" );
		this.serieZone.setLineColor( "#c0c0c0" );
		this.serieZone.setFillColor( "#f0f0f0" );
		this.serieZone.setFillOpacity( 0.2 );
		this.serieZone.autoAxis();
		this.serieZone.setLineWidth( 0 );

		this.serieZone.excludedFromLegend = true;


		//this.serie.setData();

		if( this.props.mode !== 'sparkline' ) {
				
			this.flag1 = this.graph.newShape("html");
			this.flag1.addTransform("translate", this.graph.newPosition( { dx: "-60px", dy: "0px"} ) );
			this.flag1.setRenderer( ( dom ) => 
				{ 
					ReactDOM.render( <div className="graph_tooltip medium"><div className="top"><span>{ this.props.flag1} { this.props.unit }</span></div></div>, dom )
				} );
			
			
			this.flag1.setSerie( this.serie );
			this.flag1.setWidth( 100 );
			this.flag1.setHeight( 100 );
			this.flag1.draw();




			this.flag2 = this.graph.newShape("html");
			this.flag2.addTransform("translate", this.graph.newPosition( { dx: "-80px", dy: "-5px"} ) );
			this.flag2.setRenderer( ( dom, xpos, ypos ) => 
				{ 	
					ReactDOM.render( <div className="graph_tooltip medium"><div className="top"><span>{ this.props.flag2 } { this.props.unit }</span></div></div>, dom )
				} );
			
			//this.flag2.setPosition( { x: 0, dx: "180px", dy: "-7px" } );
			this.flag2.setSerie( this.serie );
			this.flag2.setWidth( 100 );
			this.flag2.setHeight( 100 );
			this.flag2.draw();
		}

	}

	componentDidUpdate() {

		if( ! this.serie ) {
			return;
		}

/*
		this.shapes_IV.map( ( shape ) => {
			shape.kill();
		});
*/
		

		if( this.graph && this.props.data ) {

			this.serie.setWaveform( this.props.data );
			this.serieZone.setWaveform( this.props.data.duplicate( true ).prepend( 0, 0 ).append( ( wave ) => wave.getXRaw( wave.getLength() - 1 ), 0 ) );
			

			this.graph.autoscaleAxes();
			
			//this.graph.updateLegend();

			if( this.flag1 && this.flag2 ) {
				//this.flag1.draw();
				//this.flag2.draw();


				this.flag1.show();
				this.flag2.show();

				this.flag1.setPosition( { x: this.props.flag1_pos } );
				this.flag1.redraw();
				
				this.flag2.setPosition( { x: this.serie.getMaxX() } );
				this.flag2.redraw();
			}
			this.graph.draw();

		} else {

			this.serie.setWaveform( Graph.newWaveform().setData( [] ) );
			this.serieZone.setWaveform( Graph.newWaveform().setData( [] ) );

		
			this.graph.draw();

			if( this.flag1 && this.flag2 ) {
				this.flag1.hide();
				this.flag2.hide();
			}
		}

	}	

	componentWillReceiveProps( nextProps ) {
		super.componentWillReceiveProps( nextProps );

		if( nextProps.mode !== 'sparkline' ) {

			this.graph.getYAxis()
				.setLabel( nextProps.axisLabel )
				.setUnit( nextProps.axisUnit );

			this.serie.setLabel( this.props.serieLabelLegend );
		}


		if( nextProps.data_IV && nextProps.data_IV !== this.props.data_IV ) {

			this.shapes_IV.map( shape => shape.kill() );

			this.shapes_IV = nextProps.data_IV.map( ( data_IV ) => {
				
				if( data_IV[ 0 ] === null ) {
					return;
				}

				let shape = this.graph.newShape( 'ellipse', { position: [ { x: data_IV[ 0 ], y: data_IV[ 1 ] } ] } );

				shape.setFillColor( 'black' );
				shape.setR( '2px' );
				shape.draw();
				shape.redraw();
				return shape;
			} );
		}
	}

	shouldComponentUpdate( nextProps ) {
		return super.shouldComponentUpdate( nextProps );
	}

	render() {


		return (
			<div className="cellGraph">
				<div id="graph-snippet" className="graph-snippet" ref={el => this.graphDOM = el}>
				</div> 
			</div>
		);
	}
}

export default statusGraph;