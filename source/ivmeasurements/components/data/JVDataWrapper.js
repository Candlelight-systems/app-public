import { connect } from 'react-redux';
import JVData from './JVData.jsx';

const mapStateToProps = state => {
  const data = state.viewData.data[state.currentQueueElement] || [];
  const channels = state.viewData.channels;
  const jvs = state.viewData.jvs;

  return {
    data: data,
    jvs: jvs,
    channels: channels
  };
};

const JVDataWrapper = connect(mapStateToProps)(JVData);

export default JVDataWrapper;
