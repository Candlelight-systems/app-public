import executeIV from './iv';
import executeMPP from './mpp';
import executeTCP from './tcp';
import {
  setCurrentQueueElement,
  lockQueue,
  unlockQueue,
  stopping
} from '../actions/Run';

import { emptyData } from '../actions/Data';

import { httpquery, httppost } from './trackerQuery';

let stopPromise, stopResolver, stopTriggered;

const executeQueueElement = async (
  store,
  queueId,
  queueElement,
  channels,
  instrumentId,
  tracker,
  stopPromise
) => {
  switch (queueElement.type) {
    case 'JV':
      return executeIV(
        store,
        queueId,
        queueElement,
        channels,
        instrumentId,
        tracker,
        stopPromise
      );
      break;

    case 'MPPT':
      return executeMPP(
        store,
        queueId,
        queueElement,
        channels,
        instrumentId,
        tracker,
        stopPromise
      );
      break;

    case 'tcp':
      return executeTCP(
        store,
        queueId,
        queueElement,
        channels,
        instrumentId,
        tracker,
        stopPromise
      );
      break;

    default:
      throw `Type ${queueElement.type} was not found`;
      break;
  }

  return;
};

const execution = async (store, instrumentId, tracker) => {
  const { queue, runState, channels, sunIntensity } = store.getState();

  store.dispatch(emptyData());

  stopTriggered = false;
  stopPromise = new Promise((resolver, rejecter) => {
    stopResolver = resolver;
  });

  let activeChannels = channels.filter(chan => chan.active);
  store.dispatch(lockQueue());

  await Promise.all(
    activeChannels.map(channel => {
      return httppost(tracker, instrumentId, 'setStatus', {
        chanId: channel.chanId,
        enable: 1,
        cellArea: channel.area,
        lightRefValue: sunIntensity,
        tracking_mode: 0 // No tracking just yet
      });
    })
  );

  for (let i = 0; i < queue.length; i++) {
    let queueElement = queue[i];

    store.dispatch(setCurrentQueueElement(i));
    await executeQueueElement(
      store,
      i,
      queueElement,
      activeChannels,
      instrumentId,
      tracker,
      stopPromise
    );

    if (stopTriggered && stopResolver) {
      console.log('INMAIN');
      return;
    }
  }

  await Promise.all(
    activeChannels.map(channel => {
      return httppost(tracker, instrumentId, 'setStatus', {
        chanId: channel.chanId,
        enable: false,
        tracking_mode: 0 // No tracking just yet
      });
    })
  );

  store.dispatch(unlockQueue());
};

const executionStop = store => {
  stopTriggered = true;
  store.dispatch(stopping());
  stopResolver();
  store.dispatch(unlockQueue());
};

export { execution, executionStop };
export default execution;
