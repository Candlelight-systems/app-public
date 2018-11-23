import { connect } from 'react-redux';
import Run from './Run.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.runState.status,
    messages: state.runState.messages,
    runStart: ownProps.runStart,
    runStop: ownProps.runStop
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const RunMeasurement = connect(
  mapStateToProps,
  mapDispatchToProps
)(Run);

export default RunMeasurement;
