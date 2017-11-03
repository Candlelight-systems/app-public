
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
			paddingLeft: 4,
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
		this.serie.setLineColor( "white" );
		this.serie.autoAxis();
		this.serie.setLineWidth( 2 );		

		this.serie.setLabel( this.props.serieLabelLegend );

		if( this.props.mode == 'sparkline' ) {
				
			this.graph.getYAxis().turnGridsOff();
			this.graph.getXAxis().hide();
			this.graph.getYAxis().hide();

		} else {

			this.graph.getXAxis().hide();
			this.graph.getYAxis().hide();

			this.graph.getYAxis()
				.setLabel( this.props.axisLabel )
				.setUnit( this.props.axisUnit )
				.setUnitWrapper("(", ")");
			
			this.graph
				.getRightAxis( 0, { hideWhenNoSeriesShown: true } )
				.setLabel('Sun')
				.forceMin( 0 )
				.setTickPosition( Graph.TICKS_OUTSIDE )
				.setAxisColor( 'white' )
				.setPrimaryTicksColor( 'white' );

			this.graph.getXAxis().setLabel('Time');
			this.graph.getXAxis().setUnit('h').setUnitWrapper("(", ")");


			this.graph.getRightAxis( 0 ).forceMin( 0 );

		}

		this.graph.getXAxis().turnGridsOff();

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
					ReactDOM.render( <div className="graph_tooltip medium"><div className="right"><span>{ this.props.flag1} { this.props.unit }</span></div></div>, dom )
				} );
			
			
			this.flag1.setSerie( this.serie );
			this.flag1.setWidth( 100 );
			this.flag1.setHeight( 100 );




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
		}

	}

	componentDidUpdate() {

		if( ! this.serie ) {
			return;
		}

		if( this.graph && this.props.data ) {

			this.serie.setWaveform( this.props.data.setXScale( 1 / 3600 ) );
			this.serieZone.setWaveform( this.props.data.duplicate( true ).prepend( 0, 0 ).append( ( wave ) => wave.getXRaw( wave.getLength() - 1 ), 0 ) );
			this.graph.autoscaleAxes();

		
			this.graph.autoscaleAxes();
			this.graph.draw();
			//this.graph.updateLegend();

			if( this.flag1 && this.flag2 ) {
				this.flag1.draw();
				this.flag2.draw();

				this.flag1.setPosition( { x: this.props.flag1_pos / 3600 } );
				this.flag1.redraw();
				
				this.flag2.setPosition( { x: this.serie.getMaxX() } );
				this.flag2.redraw();

				this.flag1.show();
				this.flag2.show();
			}

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