import { httpquery, httppost } from './trackerQuery';
import { ivReceived } from '../actions/Data';
import JV from '../util/jv';

const executeIV = async (
  store,
  jvConfig,
  channels,
  instrumentId,
  tracker,
  stopPromise
) => {
  await Promise.all(
    channels.map(channel => {
      return httppost(tracker, instrumentId, 'setStatus', {
        enable: true,
        iv_start: jvConfig.start,
        iv_stop: jvConfig.end,
        iv_rate: jvConfig.scanRate,
        chanId: channel.chanId
      });
    })
  );

  return httpquery(
    tracker,
    instrumentId,
    'executeIVs',
    {
      chanId: channels.map(chan => chan.chanId)
    },
    stopPromise
  );
};

const execute = async (
  store,
  queueId,
  queueElement,
  channels,
  instrumentId,
  tracker,
  stopPromise
) => {
  for (let i = 0; i < queueElement.jvStopValues.length; i++) {
    await executeIV(
      store,
      queueElement.jvStopValues[i],
      channels,
      instrumentId,
      tracker,
      stopPromise
    )
      .then(response => response.json())
      .then(response => {
        for (let channel in response) {
          store.dispatch(
            ivReceived(queueId, parseInt(channel), {
              chanId: parseInt(channel),
              jvId: i,
              jv: new JV().setData(response[channel].y, response[channel].x)
            })
          );
        }
      });
  }
};

export default execute;
