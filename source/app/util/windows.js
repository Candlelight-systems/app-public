const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');

var windowForm;

const sendToForm = (label, obj) => {
  if (!windowForm) {
    return;
  }

  windowForm.webContents.send(label, obj);
};

const openForm = (
  windowName,
  pageName,
  formData,
  options = { width: 300, height: 420 },
  onClose
) => {
  if (windowForm) {
    windowForm._rejecter && windowForm._rejecter();
    windowForm.close();
  }
  // Create the browser window.
  windowForm = new BrowserWindow(options);

  // and load the index.html of the app.
  windowForm.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../' + pageName + '.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  //windows['form'] = windowForm;

  windowForm.once('closed', () => {
    windowForm = null;
    windowForm && windowForm._rejecter && windowForm._rejecter();
    windowForm = null;

    if (typeof onClose == 'function') {
      onClose();
    }
  });


  return new Promise((resolver, rejecter) => {

    ipcMain.once('validateForm', (event, data) => {
      resolver(data);
    });

    ipcMain.once('closeForm', (event, data) => {
      if (windowForm) {
        windowForm.close();
        windowForm = null;
      }
    });
    
    windowForm.webContents.once('dom-ready', () => {
      windowForm.webContents.send('loadForm', formData);
    });

    windowForm._rejecter = rejecter;
  });
};

module.exports = {
  openForm: openForm,
  sendToForm: sendToForm
};
