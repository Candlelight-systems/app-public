export default {
  MPPT_CHANGE_DURATION: (state, action) => {
    return state.map((queue, index) => {
      if (index == action.index) {
        return Object.assign({}, queue, { duration: action.value });
      }
      return queue;
    });
  },

  MPPT_CHANGE_DURATION_UNIT: (state, action) => {
    return state.map((queue, index) => {
      if (index == action.index) {
        return Object.assign({}, queue, { durationUnit: action.value });
      }
      return queue;
    });
  },

  MPPT_CHANGE_STEP_SIZE: (state, action) => {
    return state.map((queue, index) => {
      if (index == action.index) {
        return Object.assign({}, queue, { stepSize: action.value });
      }
      return queue;
    });
  }
};
