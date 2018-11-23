import { connect } from 'react-redux';
import JVTable from './JVTable.jsx';

// XLSX must run in background in electron
//import XLSX from 'xlsx'
import { ipcRenderer } from 'electron';

const exportToXLS = () => {
  if (ELECTRON) {
    ipcRenderer.send('export', {
      type: 'jv',
      data: jvs
    });
  }
  /*	var ws = XLSX.utils.aoa_to_sheet([[1,2,3],[4,5,6],[7,8,9]]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet( wb, ws, "JV");
   XLSX.writeFile(wb, "myfile.xlsx");*/
};

const mapStateToProps = state => {
  const data = state.viewData.data[state.currentQueueElement] || [];
  const channels = state.viewData.channels;
  const channelsConfig = state.channels;
  const jvs = state.viewData.jvs;

  return {
    channels: channels,
    channelsConfig: channelsConfig,
    jvs: jvs,
    exportToXLS: exportToXLS
  };
};

const JVTableWrapper = connect(mapStateToProps)(JVTable);

export default JVTableWrapper;
