import React from 'react';
import Graph from 'node-jsgraph/dist/jsgraph-es6';

class DetailedGraphs extends React.PureComponent {
  /*
   *	props.current
   *	props.start
   *	props.change
   *	props.arrowstatus
   */
  constructor(props) {
    super(props);
    this.graphs = {};
  }

  componentDidMount() {
    const axisWidth = 40;

    const opts = {
      paddingTop: 2,
      paddingBottom: 0
    };

    const legendOptions = {
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5,
      frame: true,
      backgroundColor: 'rgba(255, 255, 255, 0.6 )',
      frameColor: 'grey'
    };

    this.graphs.pce = new Graph(this.graphPCE, opts);

    this.graphs.pce
      .getLeftAxis()
      .setLabel('PCE')
      .setUnit('%')
      .forceWidth(axisWidth)
      .setUnitWrapper('(', ')');
    this.graphs.pce.getBottomAxis({ hideTicks: true });

    this.graphs.v = new Graph(this.graphVoltage, opts);

    this.graphs.v
      .getLeftAxis()
      .setLabel('Voltage')
      .setUnit('V')
      .forceWidth(axisWidth)
      .setUnitWrapper('(', ')');
    this.graphs.v.getBottomAxis({ hideTicks: true });

    this.graphs.j = new Graph(this.graphCurrent, opts);

    this.graphs.j
      .getLeftAxis()
      .setLabel('Current')
      .setUnit('A')
      .forceWidth(axisWidth)
      .setUnitDecade(true)
      .setScientific(true)
      .setUnitWrapper('(', ')');
    this.graphs.j.getBottomAxis({ hideTicks: true });

    this.graphs.jvFF = new Graph(this.graphJVFF, opts);

    this.graphs.jvFF
      .getLeftAxis()
      .setLabel('FF')
      .setUnit('%')
      .forceWidth(axisWidth)
      .setUnitWrapper('(', ')');
    this.graphs.jvFF
      .getBottomAxis()
      .setLabel('Time')
      .setUnit('h')
      .setUnitWrapper('(', ')');

    for (let g in this.graphs) {
      this.graphs[g].resize(this.props.width, this.props.height);
    }

    this.makeSeries(this.graphs.pce, ['MPPT', 'PCE-jV']);
    this.makeSeries(this.graphs.v, ['MPPT', 'Voc-jV', 'Voc-QSS']);
    this.makeSeries(this.graphs.j, ['MPPT', 'Jsc-jV', 'Jsc-QSS']);
    this.makeSeries(this.graphs.jvFF, ['FF-jV']);

    for (var i in this.graphs) {
      let legend = this.graphs[i].makeLegend(legendOptions);
      legend.setPosition(
        { x: 'max', y: 'max', dy: '10px', dx: '-10px' },
        'right',
        'top'
      );
      legend.notHideable();
      legend.update();
    }

    /*      this.graph
        .getXAxis()
        .setUnitInTicks(true)
        .setTickLabelOffset(-60)
        .setTickPosition(Graph.TICKS_INSIDE)
        .secondaryGridOff()
        .setPrimaryTicksColor('__THEME_GRAPH_EFFICIENCY_TICKCOLOR')
        .setSecondaryTicksColor('__THEME_GRAPH_EFFICIENCY_TICKCOLOR')
        .setTicksLabelColor('__THEME_GRAPH_EFFICIENCY_TICKLABELCOLOR')
        .setNbTicksSecondary(0)
        .setUnit('h')
        .setPrimaryGridColor('__THEME_GRAPH_EFFICIENCY_AXISCOLOR');

      this.graph.getYAxis().hide();

      this.graph
        .getYAxis()
        .setLabel(this.props.axisLabel)
        .setUnit(this.props.axisUnit)
        .setUnitWrapper('(', ')');

      this.graph.getXAxis();
      this.graph.getXAxis();
      this.graph.getRightAxis(0).forceMin(0);
    }

    this.graph.getXAxis().setAxisDataSpacing(0.001, 0.001);
    this.graph.getYAxis().setAxisDataSpacing(0.001, 0.001);

    this.graph.getYAxis().forceMin(0);
*/
    this.setAllData();
  }

  makeSeries(graph, labels) {
    const colors = ['#000000', '#a03314', '#142f9b'];
    labels.forEach((l, index) =>
      graph
        .newSerie('d_' + index, {}, 'line')
        .autoAxis()
        .setLabel(l)
        .setLineColor(colors[index])
        .setLineWidth(2)
    );
  }

  setData(graph, waveforms) {
    waveforms.forEach((wf, index) => {
      if (!wf) {
        return;
      }
      wf.filterNaN();
      wf.filterInfinity();
      graph.getSerie('d_' + index).setWaveform(wf);
    });
  }

  componentDidUpdate() {
    this.setAllData();
  }

  setAllData() {
    if (!this.props.ivData) {
      return;
    }
    const jvJscs = Graph.newWaveform(),
      jvVocs = Graph.newWaveform(),
      jvFF = Graph.newWaveform(),
      jvPCE = Graph.newWaveform();

    this.props.ivData.forEach(data => {
      jvJscs.append(data[0], data[2].jsc);
      jvVocs.append(data[0], data[2].voc);
      jvPCE.append(data[0], data[2].pce);
      jvFF.append(data[0], data[2].ff);
    });

    this.setData(this.graphs.pce, [this.props.pce, jvPCE]);
    this.setData(this.graphs.j, [this.props.current, jvJscs, this.props.jscs]);
    this.setData(this.graphs.v, [this.props.voltage, jvVocs, this.props.vocs]);
    this.setData(this.graphs.jvFF, [jvFF]);

    for (var i in this.graphs) {
      this.graphs[i].autoscaleAxes();
      this.graphs[i].draw();
      this.graphs[i].updateLegend();
    }
  }

  render() {
    return (
      <div className="cellGraph">
        <div
          id="graph-snippet"
          className="graph-snippet"
          ref={el => (this.graphPCE = el)}
        />
        <div
          id="graph-snippet"
          className="graph-snippet"
          ref={el => (this.graphVoltage = el)}
        />
        <div
          id="graph-snippet"
          className="graph-snippet"
          ref={el => (this.graphCurrent = el)}
        />
        <div
          id="graph-snippet"
          className="graph-snippet"
          ref={el => (this.graphJVFF = el)}
        />
      </div>
    );
  }
}

export default DetailedGraphs;
