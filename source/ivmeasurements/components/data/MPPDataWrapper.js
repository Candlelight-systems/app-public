import { connect } from 'react-redux';
import MPPData from './MPPData.jsx';

const mapStateToProps = state => {
  const data = state.viewData.data[state.currentQueueElement] || [];
  const channels = state.viewData.channels;

  const filteredData = {};
  for (let d in data) {
    if (channels.indexOf(parseInt(d)) > -1) {
      filteredData[d] = data[d];
    }
  }

  return {
    data: filteredData
  };
};

const MPPDataWrapper = connect(mapStateToProps)(MPPData);

export default MPPDataWrapper;
