const { ipcMain, dialog } = require('electron');
const fetch = require('node-fetch');
const { openForm, sendToForm } = require('../util/windows');
const fs = require('fs');

const processRestart = tracker => {
  return fetch(
    `http://${tracker.trackerHost}:${
      tracker.trackerPortDiagnosis
    }/processRestart`,
    {
      method: 'GET',
      timeout: 2000
    }
  ).then(text => text.text());
};

const processStart = tracker => {
  return fetch(
    `http://${tracker.trackerHost}:${
      tracker.trackerPortDiagnosis
    }/processStart`,
    {
      method: 'GET',
      timeout: 2000
    }
  ).then(text => text.text());
};

const processPing = tracker => {
  return fetch(
    `http://${tracker.trackerHost}:${tracker.trackerPortDiagnosis}/ping`,
    {
      method: 'GET',
      timeout: 2000
    }
  ).then(text => text.text());
};

const processBoardList = tracker => {
  return fetch(
    `http://${tracker.trackerHost}:${tracker.trackerPortDiagnosis}/listBoards`,
    {
      method: 'GET',
      timeout: 2000
    }
  ).then(json => json.json());
};

const processStatus = tracker => {
  return fetch(
    `http://${tracker.trackerHost}:${
      tracker.trackerPortDiagnosis
    }/processStatus`,
    {
      method: 'GET',
      timeout: 2000
    }
  ).then(json => json.json());
};

ipcMain.on('diagnostic-restart', (event, tracker) => {
  processRestart(tracker)
    .then(() => {
      event.sender.send('diagnostic-restart', {
        instrument: tracker,
        result: true
      });
    })
    .catch(error => {
      console.error(error);
      event.sender.send('diagnostic-restart', {
        instrument: tracker,
        error: error
      });
    });
});

ipcMain.on('diagnostic-start', (event, tracker) => {
  processRestart(tracker)
    .then(() => {
      event.sender.send('diagnostic-start', {
        instrument: tracker,
        result: true
      });
    })
    .catch(error => {
      console.error(error);
      event.sender.send('diagnostic-start', {
        instrument: tracker,
        error: error
      });
    });
});

ipcMain.on('diagnostic-ping', (event, tracker) => {
  processPing(tracker)
    .then(() => {
      console.log('a');
      event.sender.send('diagnostic-ping', {
        instrument: tracker,
        result: true
      });
    })
    .catch(error => {
      console.error(error);
      console.log('b');
      event.sender.send('diagnostic-ping', {
        instrument: tracker,
        error: error
      });
    });
});

ipcMain.on('diagnostic-boardList', (event, tracker) => {
  processBoardList(tracker)
    .then(list => {
      event.sender.send('diagnostic-boardList', {
        instrument: tracker,
        result: list
      });
    })
    .catch(error => {
      console.error(error);
      event.sender.send('diagnostic-boardList', {
        instrument: tracker,
        error: error
      });
    });
});

ipcMain.on('diagnostic-status', (event, tracker) => {
  processStatus(tracker)
    .then(element => {
      event.sender.send('diagnostic-status', {
        instrument: tracker,
        result: element
      });
    })
    .catch(error => {
      console.error(error);
      event.sender.send('diagnostic-status', {
        instrument: tracker,
        error: error
      });
    });
});

ipcMain.on('diagnostic-log', (event, tracker) => {
  dialog.showSaveDialog(
    {
      message: 'Save the log',
      defaultPath: '~/log.txt'
    },
    fileName => {
      if (!fileName) {
        return;
      }

      return fetch(
        `http://${tracker.trackerHost}:${
          tracker.trackerPortDiagnosis
        }/downloadLog`,
        {
          method: 'GET',
          timeout: 10000
        }
      )
        .then(text => text.text())
        .then(text => {
          fs.writeFile(fileName, text, error => {
            console.log(error);
          });
        });
    }
  );
});

ipcMain.on('diagnostic-errorlog', (event, tracker) => {
  dialog.showSaveDialog(
    {
      message: 'Save the error log',
      defaultPath: '~/errorlog.txt'
    },
    fileName => {
      if (!fileName) {
        return;
      }
      return fetch(
        `http://${tracker.trackerHost}:${
          tracker.trackerPortDiagnosis
        }/downloadErrorLog`,
        {
          method: 'GET',
          timeout: 10000
        }
      )
        .then(text => text.text())
        .then(text => {
          fs.writeFile(fileName, text, error => {
            console.log(error);
          });
        });
    }
  );
});

function openDiagnostics() {
  openForm(
    null,
    'diagnostics',
    {},
    {
      width: 540,
      height: 600,
      resizable: false
    }
  );
}

ipcMain.on('openDiagnostics', openDiagnostics);

module.exports = {
  openDiagnostics: openDiagnostics
};
