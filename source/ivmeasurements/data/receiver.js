import { ipcRenderer } from 'electron';
import channelsAvailable from '../channelsAvailable';

const callbacks = [];

var wsUpdate = (chanId, data) => {
  if (callbacks[chanId]) {
    callbacks[chanId](data);
  }
};

ipcRenderer.on('loadInstrument', (event, cfg) => {
  const tracker = cfg.tracker;
  const db = cfg.db;
  console.log(tracker, db);

  fetch(
    'http://' +
      tracker.trackerHost +
      ':' +
      tracker.trackerPort +
      '/getInstruments',
    {
      method: 'GET'
    }
  )
    .then(response => response.json())
    .then(json => {
      for (var j in json) {
        // Attach listeners
        for (var i = 0; i < channelsAvailable.length; i++) {
          console.log(channelsAvailable);

          const i2 = i;
          ipcRenderer.on(
            'channel.update.' + j + '.' + channelsAvailable[i2].chanId,
            data => {
              wsUpdate(channelsAvailable[i2].chanId, data);
            }
          );
        }
      }
    });
});

const attach = (chanId, callback) => {
  callbacks[chanId] = callback;
};

const detatch = chanId => {
  callbacks[chanId] = null;
};

export { attach, detach };
