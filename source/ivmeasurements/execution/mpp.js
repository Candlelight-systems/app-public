import { httpquery, httppost } from './trackerQuery';
import { mppReceived } from '../actions/Data';
import { delay } from '../util/delay';
import { ipcRenderer } from 'electron';
//import Waveform from '../util/jv';

const executeMPP = async (
  store,
  mppConfig,
  channels,
  instrumentId,
  tracker,
  stopPromise
) => {
  await Promise.all(
    channels.map(channel => {
      return httppost(tracker, instrumentId, 'setStatus', {
        chanId: channel.chanId,

        tracking_mode: 1, // MPP tracking
        tracking_record_interval: 200,
        tracking_interval: 0,
        tracking_bwfwthreshold: 0,
        tracking_fwbwthreshold: 0,
        tracking_step: mppConfig.stepSize,
        tracking_switchdelay: 1,

        noIV: true
      });
    })
  );

  try {
    await delay(
      mppConfig.duration * 1000 * mppConfig.durationUnit,
      stopPromise
    );
  } catch (e) {
    console.error(e);
  } finally {
    await Promise.all(
      channels.map(channel => {
        return httppost(tracker, instrumentId, 'setStatus', {
          chanId: channel.chanId,

          enable: true,
          tracking_mode: 0, // MPP tracking

          noIV: true
        });
      })
    );
  }
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
  const mppData = {};
  const listeners = {};
  channels.forEach((channel, index) => {
    ipcRenderer.on(
      'channel.update.' + instrumentId + '.' + channel.chanId,
      (event, data) => {
        if (!mppData[channel.chanId]) {
          mppData[channel.chanId] = {
            current: [],
            voltage: [],
            power: [],
            efficiency: [],
            time: [],
            startTime: Date.now()
          };
        }

        if (data.state) {
          mppData[channel.chanId].current.push(data.state.current);
          mppData[channel.chanId].voltage.push(data.state.voltage);
          mppData[channel.chanId].power.push(data.state.power);
          mppData[channel.chanId].efficiency.push(data.state.efficiency);
          mppData[channel.chanId].time.push(
            (Date.now() - mppData[channel.chanId].startTime) / 1000
          );
        }

        store.dispatch(
          mppReceived(queueId, channel.chanId, {
            chanId: channel.chanId,
            data: {
              current: mppData[channel.chanId].current,
              voltage: mppData[channel.chanId].voltage,
              power: mppData[channel.chanId].power,
              efficiency: mppData[channel.chanId].efficiency,
              time: mppData[channel.chanId].time
            }
          })
        );
      }
    );
  });

  await executeMPP(
    store,
    queueElement,
    channels,
    instrumentId,
    tracker,
    stopPromise
  );

  channels.forEach((channel, index) => {
    ipcRenderer.removeAllListeners(
      'channel.update.' + instrumentId + '.' + channel.chanId
    );
  });

  return mppData;
};

export default execute;
