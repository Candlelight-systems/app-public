import { combineReducers } from 'redux';

export default combineReducers({
  param1Name: (state, action) => {
    if (state === undefined) {
      return '';
    }

    if (action.type == 'CHANGE_PARAM_NAME' && action.paramId == 1) {
      return action.newValue;
    }

    return state;
  },

  param2Name: (state, action) => {
    if (state === undefined) {
      return '';
    }

    if (action.type == 'CHANGE_PARAM_NAME' && action.paramId == 2) {
      return action.newValue;
    }

    return state;
  },

  channelsView: (state, action) => {
    if (state === undefined) {
      return false;
    }

    if (action.type == 'CHANNELS_VIEWCONFIG_TOGGLE') {
      return !state;
    }

    return state;
  }
});
