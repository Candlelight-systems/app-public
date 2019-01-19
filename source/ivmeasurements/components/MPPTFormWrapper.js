import { connect } from 'react-redux';
import {
  MPPTChangeDuration,
  MPPTChangeDurationUnit,
  MPPTChangeStepSize
} from '../actions/MPPT';
import MPPTForm from './formElements/MPPTForm.jsx';

const mapDispatchToProps = dispatch => {
  return {
    changeDuration: (newDuration, queueId) => {
      dispatch(MPPTChangeDuration(newDuration, queueId));
    },

    changeDurationUnit: (newDurationUnit, queueId) => {
      dispatch(MPPTChangeDurationUnit(newDurationUnit, queueId));
    },

    changeStepSize: (newStepSize, queueId) => {
      dispatch(MPPTChangeStepSize(newStepSize, queueId));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    locked: state.runState.status,
    id: state.currentQueueElement
  };
};

const MPPTWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(MPPTForm);

export default MPPTWrapper;
