import React from 'react';
import ReactDOM from 'react-dom';
import CellFormAll from './jsx/cellformall.jsx';

const { ipcRenderer } = require('electron');

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on('loadForm', (event, data) => {
  render(data);
});

function onValidate(formData) {
  ipcRenderer.send('validateForm', formData);
}

function onClose() {
  ipcRenderer.send('closeForm');
}

function render(data) {
  console.log(data);
  ReactDOM.render(
    <CellFormAll
      tracker={data.tracker}
      instrumentConfig={data.instrumentConfig}
      allStatuses={data.channelsState}
      channelIds={data.channelIds}
      formState={data.channelState}
      groupName={data.groupName}
      onValidate={onValidate}
      onClose={onClose}
    />,
    document.getElementById('root')
  );
}
