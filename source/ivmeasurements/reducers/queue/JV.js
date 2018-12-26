export default {
  ADD_JV_FORM_ELEMENT: (state, action) => {
    return state.map((queue, index) => {
      if (index == action.queueId) {
        return {
          ...queue,
          jvStopValues: [
            ...queue.jvStopValues.splice(0, action.index + 1),
            { start: 0, end: 0, scanRate: 0.1 },
            ...queue.jvStopValues.splice(0)
          ]
        };
      }
      return queue;
    });
  },

  REMOVE_JV_FORM_ELEMENT: (state, action) => {
    return state.map((queue, index) => {
      if (index == action.queueId) {
        return {
          ...queue,
          jvStopValues: queue.jvStopValues.filter(
            (val, index) => index !== action.index
          )
        };
      }
      return queue;
    });
  },

  CHANGE_JV_FORM_ELEMENT: (state, action) => {
    return state.map((queue, index) => {
      if (index !== action.queueId) {
        return queue;
      }

      return {
        ...queue,
        jvStopValues: queue.jvStopValues.map((element, index) => {
          let copyElement = Object.assign({}, element);

          if (index !== action.index) {
            return copyElement;
          }

          switch (action.fieldName) {
            case 'fromV':
              copyElement.start = action.newValue;
              break;

            case 'toV':
              copyElement.end = action.newValue;
              break;

            case 'scanRate':
              copyElement.scanRate = action.newValue;
              break;
          }

          return copyElement;
        })
      };
    });
  }
};
