import { connect } from 'react-redux';
import {
  queueSelectElement,
  queueRemoveElement,
  queueRemoveElementSafe,
  queueAddElement,
  queueUpElement,
  queueDownElement
} from '../actions/queue';
import { changeSunIntensity } from '../actions/general';
import { Queue } from './Queue.jsx';
import measurementActions from '../measurementActions';

let elementType = null;

const mapDispatchToProps = dispatch => {
  return {
    removeElementConfirm: id => {
      dispatch(queueRemoveElement(id));
    },

    removeElement: id => {
      dispatch(queueRemoveElementSafe(id));
    },

    addElement: () => {
      if (elementType !== null) {
        const details = measurementActions.filter(
          el => el.type == elementType
        )[0];
        dispatch(
          queueAddElement(
            Date.now(),
            elementType,
            details.name,
            details.defaults
          )
        );
      }
    },
    upElement: id => {
      dispatch(queueUpElement(id));
    },

    downElement: id => {
      dispatch(queueDownElement(id));
    },

    selectElement: id => {
      dispatch(queueSelectElement(id));
    },

    changeSunIntensity: val => {
      dispatch(changeSunIntensity(val));
    }
  };
};

const mapStateToProps = state => {
  return {
    queueElements: state.queue,
    selectedElement: state.currentQueueElement,
    runningElement: state.runState.currentQueueElement,
    changeAddElementType: e => {
      elementType = e.target.value;
    },

    sunIntensity: state.sunIntensity,
    locked: state.runState.status
  };
};

const QueueWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);

export default QueueWrapper;
