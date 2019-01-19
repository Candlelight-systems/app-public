import { changeItemInArray } from './util';
import { createReducer } from './util/createReducer';
import channelsAvailable from '../channelsAvailable';

const ChannelReducer = createReducer(
  channelsAvailable.map(chan => ({
    chanId: chan.chanId,
    active: true,
    name: '',
    param1: '',
    param2: '',
    id: '',
    area: 0.1
  })),
  {
    CHANNELS_LIST_CHANGE: (state, action) => {
      return changeItemInArray(
        state,
        'chanId',
        action.chanId,
        action.field,
        action.value
      );
    },

    CHANNELS_CHANGE_STATE: (state, action) => {
      return state.map(queue => {
        if (queue.id == action.index) {
          return Object.assign({}, queue, { state: action.newState });
        }
        return queue;
      });
    }
  }
);

export default ChannelReducer;
