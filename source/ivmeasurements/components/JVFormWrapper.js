import { connect } from 'react-redux';
import { AddJVElement, RemoveJVElement, ChangeJVElement } from '../actions/JV';
import JVForm from './formElements/JVForm.jsx';

const mapDispatchToProps = dispatch => {
  return {
    addElement: (id, queueId) => {
      dispatch(AddJVElement(id, queueId));
    },

    removeElement: (id, queueId) => {
      dispatch(RemoveJVElement(id, queueId));
    },

    changeElement: (id, name, newValue, queueId) => {
      dispatch(ChangeJVElement(id, name, newValue, queueId));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    locked: state.runState.status,
    id: state.currentQueueElement
  };
};

const JVWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(JVForm);

export default JVWrapper;
