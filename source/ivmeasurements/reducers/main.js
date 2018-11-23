import { combineReducers } from 'redux';
import { createReducer } from './util/createReducer';

import QueueReducers from './queue/all';
import ChannelsViewDataReducers from './data/channels';
import JVViewDataReducers from './data/jv';
import ViewDataReducer from './data/data';
import channelsAvailable from '../channelsAvailable';
import ChannelsReducers from './Channels';
import ReducedAppState from './AppState';
import ReducedRunState from './RunState';

import defaultsMeasurementActions from '../measurementActions';

function queueAddElement(state, action) {
  let stateCopy = [...state];
  stateCopy.push(
    Object.assign({}, action.newElement, { removableSafe: false })
  );
  return stateCopy;
}

function queueUpElement(state, action) {
  let stateCopy = [...state];
  if (action.index == 0) {
    return stateCopy;
  }
  const tmp = stateCopy[action.index];
  const tmp2 = stateCopy[action.index - 1];
  stateCopy[action.index - 1] = tmp;
  stateCopy[action.index] = tmp2;
  return stateCopy;
}
function queueDownElement(state, action) {
  let stateCopy = [...state];
  if (action.index == stateCopy.length - 1) {
    return stateCopy;
  }
  const tmp = stateCopy[action.index];
  const tmp2 = stateCopy[action.index + 1];
  stateCopy[action.index + 1] = tmp;
  stateCopy[action.index] = tmp2;
  return stateCopy;
}

function queueRemoveElement(state, action) {
  return [...state].filter(el => el.id !== action.id);
}

function queueRemoveElementSafe(state, action) {
  return [...state].map(el => {
    if (el.id == action.id) {
      return Object.assign({}, el, { removableSafe: true });
    }

    return el;
  });
}

const app = combineReducers({
  queue: createReducer(
    [
      {
        ...defaultsMeasurementActions[0],
        ...defaultsMeasurementActions[0].defaults
      },
      {
        ...defaultsMeasurementActions[1],
        ...defaultsMeasurementActions[1].defaults
      }
    ],
    {
      QUEUE_ADD_ELEMENT: queueAddElement,
      QUEUE_REMOVE_ELEMENT: queueRemoveElement,
      QUEUE_REMOVE_ELEMENT_SAFE: queueRemoveElementSafe,
      QUEUE_UP_ELEMENT: queueUpElement,
      QUEUE_DOWN_ELEMENT: queueDownElement,
      ...QueueReducers
    }
  ),

  currentQueueElement: createReducer(0, {
    QUEUE_SELECT_ELEMENT: (state, action) => {
      return action.index;
    }
  }),

  sunIntensity: createReducer(100, {
    SUN_CHANGE_INTENSITY: (state, action) => {
      return action.newValue;
    }
  }),

  channels: ChannelsReducers,

  viewData: combineReducers({
    channels: createReducer([], ChannelsViewDataReducers),
    jvs: createReducer([], JVViewDataReducers),
    data: createReducer([], {
      ...ViewDataReducer,

      QUEUE_UP_ELEMENT: queueUpElement,
      QUEUE_DOWN_ELEMENT: queueDownElement
    })
  }),

  appState: ReducedAppState,
  runState: ReducedRunState
});

export default app;
