import { connect } from 'react-redux';
import JVList from './JVList.jsx';
import { JVToggleViewData } from '../actions/JV';

const mapStateToProps = state => {
  return {
    jvEnabled: state.viewData.jvs,
    jvList:
      state.queue[state.currentQueueElement] &&
      state.queue[state.currentQueueElement].type == 'JV'
        ? state.queue[state.currentQueueElement].jvStopValues
        : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleJV: (jvId, force) => {
      dispatch(JVToggleViewData(jvId, force));
    }
  };
};

const JVListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(JVList);

export default JVListWrapper;
