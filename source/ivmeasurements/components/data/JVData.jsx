import React from 'react';
import PropTypes from 'prop-types';
import Graph from 'node-jsgraph';
import { colors } from '../../channelColors';

class JVData extends React.PureComponent {
  componentDidMount() {
    this.graph = new Graph(this.graphDOM);
    this.graph
      .getLeftAxis()
      .setLabel('Current density')
      .setUnit('A')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(true)
      .setLineAt([0]);

    this.graph
      .getBottomAxis()
      .setLabel('Voltage')
      .setUnit('V')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(true);

    this.graph.resize(900, 400);

    this.legend = this.graph.makeLegend();
    this.legend.notHideable(false);
    this.legend.setAutoPosition('bottom');
  }

  componentWillReceiveProps(nextProps) {
    // We don't want to remove all series and create them all over again. That would be the ideal way to achieve status-driven rendering, but that's too much load for jsGraph.
    // Let's be clever and look up what's gone and what's created.
    let serie;
    for (var i in this.props.data) {
      if (
        nextProps.channels.indexOf(this.props.data[i].chanId) == -1 ||
        nextProps.jvs.indexOf(this.props.data[i].jvId) == -1
      ) {
        if (
          (serie = this.graph.getSerie(
            this.props.data[i].chanId + '_' + this.props.data[i].jvId
          ))
        ) {
          serie.kill();
        }
      }
    }

    for (var i in nextProps.data) {
      if (
        !this.graph.getSerie(
          nextProps.data[i].chanId + '_' + nextProps.data[i].jvId
        )
      ) {
        if (
          nextProps.channels.indexOf(nextProps.data[i].chanId) > -1 &&
          nextProps.jvs.indexOf(nextProps.data[i].jvId) > -1
        ) {
          console.log('create');
          this.graph
            .newSerie(nextProps.data[i].chanId + '_' + nextProps.data[i].jvId)
            .autoAxis()
            .setLabel('Ch' + nextProps.data[i].chanId)
            .setLineColor('#' + colors[nextProps.data[i].chanId - 1])
            .setLineStyle(nextProps.data[i].jvId + 1);
        }
      }
    }
  }

  componentDidUpdate() {
    this.props.data.map(jv => {
      if (
        this.props.channels.indexOf(jv.chanId) == -1 ||
        this.props.jvs.indexOf(jv.jvId) == -1
      ) {
        return;
      }

      this.graph
        .getSerie(jv.chanId + '_' + jv.jvId)
        .autoAxis()
        .setWaveform(jv.jv);
    });

    this.graph.autoscaleAxes();
    this.graph.draw();
  }

  render() {
    return <div ref={el => (this.graphDOM = el)} />;
  }
}

JVData.propTypes = {
  jvs: PropTypes.arrayOf(
    PropTypes.shape({
      chanId: PropTypes.number.isRequired,
      jvId: PropTypes.number.isRequired,
      jv: PropTypes.array.isRequired
    })
  ).isRequired
};

export default JVData;
