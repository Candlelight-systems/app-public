import React from 'react';
import PropTypes from 'prop-types';
import Graph from 'node-jsgraph';
import { colors } from '../../channelColors';

class MPPData extends React.Component {
  componentDidMount() {
    this.graphs = {
      efficiency: new Graph(this.graphDOMEfficiency)
    };

    this.graphs.efficiency
      .getLeftAxis()
      .setLabel('PCE')
      .setUnit('%')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(false)
      .setLineAt([0])
      .setSpan(0.600001, 1);

    this.graphs.efficiency
      .getLeftAxis(1)
      .setLabel('Power')
      .setUnit('W')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(true)
      .setLineAt([0])
      .setSpan(0.400001, 0.6);

    this.graphs.efficiency
      .getLeftAxis(2)
      .setLabel('Voltage')
      .setUnit('V')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(true)
      .setLineAt([0])
      .setSpan(0.200001, 0.4);

    this.graphs.efficiency
      .getLeftAxis(3)
      .setLabel('Current')
      .setUnit('A')
      .setUnitWrapper('(', ')')
      .setScientific(true)
      .setUnitDecade(true)
      .setLineAt([0])
      .setSpan(0, 0.2);

    this.graphs.efficiency
      .getBottomAxis()
      .setLabel('Time')
      .setUnit('s')
      .setUnitWrapper('(', ')');

    this.graphs.efficiency.resize(900, 600);

    this.legend = this.graphs.efficiency.makeLegend();
    this.legend.setAutoPosition('left');
  }

  componentWillReceiveProps(nextProps) {
    for (var i in this.props.data) {
      if (!nextProps.data[i]) {
        this.graphs.efficiency.getSerie('pce_' + i).kill();
        this.graphs.efficiency.getSerie('j' + i).kill();
        this.graphs.efficiency.getSerie('v' + i).kill();
        this.graphs.efficiency.getSerie('p' + i).kill();
      }
    }

    for (var i in nextProps.data) {
      if (!this.props.data[i]) {
        this.graphs.efficiency
          .newSerie('pce_' + nextProps.data[i].chanId)
          .autoAxis()
          .setLabel('Ch' + nextProps.data[i].chanId)
          .setLineColor('#' + colors[nextProps.data[i].chanId - 1])
          .setInfo('channel', nextProps.data[i].chanId);

        this.graphs.efficiency
          .newSerie('p' + nextProps.data[i].chanId)
          .autoAxis()
          .excludeFromLegend(true)
          .setYAxis(this.graphs.efficiency.getLeftAxis(1))
          .setLabel('Ch' + nextProps.data[i].chanId)
          .setLineColor('#' + colors[nextProps.data[i].chanId - 1])
          .setInfo('channel', nextProps.data[i].chanId);

        this.graphs.efficiency
          .newSerie('v' + nextProps.data[i].chanId)
          .autoAxis()
          .excludeFromLegend(true)
          .setYAxis(this.graphs.efficiency.getLeftAxis(2))
          .setLabel('Ch' + nextProps.data[i].chanId)
          .setLineColor('#' + colors[nextProps.data[i].chanId - 1])
          .setInfo('channel', nextProps.data[i].chanId);

        this.graphs.efficiency
          .newSerie('j' + nextProps.data[i].chanId)
          .autoAxis()
          .excludeFromLegend(true)
          .setYAxis(this.graphs.efficiency.getLeftAxis(3))
          .setLabel('Ch' + nextProps.data[i].chanId)
          .setLineColor('#' + colors[nextProps.data[i].chanId - 1])
          .setInfo('channel', nextProps.data[i].chanId);
      }
    }
  }

  componentDidUpdate() {
    //this.graphs.efficiency.removeSeries();
    console.log('a');
    for (var i in this.props.data) {
      const waveform_pce = Graph.newWaveform();
      waveform_pce.setData(
        this.props.data[i].data.efficiency,
        this.props.data[i].data.time
      );

      const waveform_v = Graph.newWaveform();
      waveform_v.setData(
        this.props.data[i].data.voltage,
        this.props.data[i].data.time
      );

      const waveform_p = Graph.newWaveform();
      waveform_p.setData(
        this.props.data[i].data.power,
        this.props.data[i].data.time
      );

      const waveform_j = Graph.newWaveform();
      waveform_j.setData(
        this.props.data[i].data.current,
        this.props.data[i].data.time
      );

      this.graphs.efficiency
        .newSerie('pce_' + this.props.data[i].chanId)
        .setWaveform(waveform_pce);

      this.graphs.efficiency
        .newSerie('p' + this.props.data[i].chanId)
        .setWaveform(waveform_p);

      this.graphs.efficiency
        .newSerie('v' + this.props.data[i].chanId)
        .setWaveform(waveform_v);

      this.graphs.efficiency
        .newSerie('j' + this.props.data[i].chanId)
        .setWaveform(waveform_j);
    }

    const series = this.graphs.efficiency.getSeries().forEach(serie => {
      if (!this.props.data[serie.getInfo('channel')]) {
        serie.kill();
      }
    });

    this.graphs.efficiency.autoscaleAxes();
    this.graphs.efficiency.draw();
  }

  render() {
    return <div ref={el => (this.graphDOMEfficiency = el)} />;
  }
}

MPPData.propTypes = {};

export default MPPData;
