export default {
  // Simply push the new JV curve into the array. Not overwriting anything
  DATA_IV_RECEIVED: (state, action) => {
    const copiedState = [...state];

    copiedState[action.queueId] = [
      ...(copiedState[action.queueId] || []),
      action.data
    ];
    return copiedState;
  },

  // Overwrites the data for a specific channel
  DATA_MPP_RECEIVED: (state, action) => {
    const copiedState = [...state];
    copiedState[action.queueId] = copiedState[action.queueId] || {};
    copiedState[action.queueId][action.channelId] = action.data;

    return copiedState;
  },

  EMPTY_DATA: (state, action) => {
    return [];
  }
};
