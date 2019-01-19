import { combineReducers } from 'redux';
import { createReducer } from './util/createReducer';

export default combineReducers({
  status: (state, action) => {
    if (state === undefined) {
      return false;
    }

    if (action.type == 'RUN_STOPPING') {
      return 'stopping';
    }

    if (action.type == 'RUN_LOCK') {
      return true;
    }

    if (action.type == 'RUN_UNLOCK') {
      return false;
    }

    return state;
  },

  currentQueueElement: createReducer(false, {
    SET_RUNNING_QUEUE_ELEMENT: (state, action) => {
      if (action.currentQueueElement === undefined) {
        return state;
      }

      return action.currentQueueElement;
    }
  }),

  messages: createReducer([], {
    MESSAGE_RECEIVED: (state, action) => {
      state.slice().push(action.message);
    }
  })
});
