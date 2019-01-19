import { connect } from 'react-redux';
import React from 'react';
import JVChannelTable from './JVChannelTable.jsx';

const mapStateToProps = (state, ownProps) => {
  const data = state.viewData.data[state.currentQueueElement] || [];
  const jvs = state.viewData.jvs;
  const queueDetails = state.queue[state.currentQueueElement];

  if (!queueDetails) {
    return {};
  }

  return {
    jvs: data,
    jvToDisplay: ownProps.jvs,
    jvElements: queueDetails.jvStopValues,
    cellArea: ownProps.config.area,
    sunIntensity: state.sunIntensity
  };
};

const mapDispathToProps = dispatch => {
  return {};
};

const JVChannelTableWrapper = connect(
  mapStateToProps,
  mapDispathToProps
)(JVChannelTable);

export default JVChannelTableWrapper;
