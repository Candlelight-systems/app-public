const electron=require('electron'),{Menu,ipcMain,dialog}=require('electron'),app=electron.app,BrowserWindow=electron.BrowserWindow,path=require('path'),url=require('url'),fs=require('fs'),request=require('request-promise-native'),fix=require('fix-path'),fetch=require('node-fetch'),WebSocket=require('ws'),environment=require('./environment.json');fix();let currentInstrument;const configPath=path.join(__dirname.replace('app.asar','app.asar.unpacked'),'/config.json');let config=JSON.parse(fs.readFileSync(configPath)),windows={};ipcMain.on('addInstrument',addInstrument),ipcMain.on('editInstrument',editInstrument),ipcMain.on('removeInstrument',removeInstrument),ipcMain.on('loadInstrument',loadInstrument),ipcMain.on('editInfluxDB',editInfluxDB),ipcMain.on('updateInfluxDB',updateInfluxDB),ipcMain.on('downloadData',downloadData),ipcMain.on('htmlReport',htmlReport),ipcMain.on('configChannel',configChannel),ipcMain.on('configChannels',configChannels),ipcMain.on('mppt',openMPPT),ipcMain.on('bugReport',openBugReport),ipcMain.on('calibratePD',openCalibratePD),ipcMain.on('calibratePyranometer',openCalibratePyranometer),ipcMain.on('scheduleLight',openScheduleLight),ipcMain.on('reportError',reportError);function makeInstrumentMenu(){return{label:'Instrument',submenu:[{label:'Add a new instrument',click(){addInstrument()}},{label:'Edit instrument',click(){editInstrument(currentInstrument)}},{label:'Edit database config',click(){editInfluxDB()}},{label:'Show all measurements',click(){showAllMeasurements(currentInstrument)}},{type:'separator'},{label:'Cut',accelerator:'CmdOrCtrl+X',selector:'cut:'},{label:'Copy',accelerator:'CmdOrCtrl+C',selector:'copy:'},{label:'Paste',accelerator:'CmdOrCtrl+V',selector:'paste:'},...config.instruments.map((a)=>{return{label:a.trackerName,checked:currentInstrument==a.trackerHost,click(b){loadInstrument(b,a.trackerHost)}}})]}}function openSocket(a){const b=new WebSocket('ws://'+a.trackerHost+':'+a.trackerPortWS);b.on('open',function(){console.log('Socket is open')}),b.on('close',function(){console.log('Socket is closed'),setTimeout(()=>openSocket(a),1e3)}),b.on('error',function a(){console.log('Socket is in error state: '+a.code)}),b.on('message',wsIncoming),b.isAlive=!0,b.on('pong',()=>b.isAlive=!0);(()=>{let a=setInterval(()=>{b.isAlive||b.terminate(),b.readyState==WebSocket.CLOSED&&clearInterval(a),b.isAlive=!1,b.ping('',!1,!0)},3e4)})()}function wsIncoming(a){a=JSON.parse(a),a.instrumentId&&windows.instrumentMain&&(a.chanId&&windows.instrumentMain.webContents.send(`channel.update.${a.instrumentId}.${a.chanId}`,a),a.groupName&&windows.instrumentMain.webContents.send(`group.update.${a.instrumentId}.${a.groupName}`,a),a.log&&(a.log.time=Date.now(),windows.instrumentMain.webContents.send(`instrument.log.${a.instrumentId}`,a.log)))}function doMenu(){const a=[];environment.ageing&&a.push(makeInstrumentMenu()),a.unshift({label:app.getName(),submenu:[{role:'about'},{type:'separator'},{role:'services',submenu:[]},{type:'separator'},{role:'hide'},{role:'hideothers'},{role:'unhide'},{type:'separator'},{role:'quit'}]}),a[0].submenu.push({role:'toggledevtools'});const b=Menu.buildFromTemplate(a);Menu.setApplicationMenu(b)}function saveConfig(){fs.writeFile(configPath,JSON.stringify(config,void 0,'\t'),(a)=>{a?reportError(a):config=JSON.parse(fs.readFileSync(configPath))})}function createMainWindow(){windows.instrumentList=new BrowserWindow({width:800,height:700,resizable:!1}),windows.instrumentList.webContents.once('dom-ready',()=>{windows.instrumentList.webContents.send('dbInformation',config.database)}),windows.instrumentList.loadURL(url.format({pathname:path.join(__dirname,'app/instrumentlist.html'),protocol:'file:',slashes:!0})),windows.instrumentList.on('closed',function(){windows.instrumentList=null}),doMenu()}app.on('ready',createMainWindow),app.on('window-all-closed',function(){'darwin'!==process.platform&&app.quit()}),app.on('activate',function(){null===windows.instrumentList&&createMainWindow()});async function downloadData(a,b,c,d){let e=await fetch(`http://${b.trackerHost}:${b.trackerPort}/getMeasurement?measurementName=${c}`,{method:'GET'}).then((a)=>a.json()).catch(()=>{throw new Error(`Error while connecting to the instrument. Check that you are online and that the instrument is available on your network.`)});openForm(null,'downloadform',{measurementName:c,db:config.database,cellInfo:e.cellInfo,chanId:d},{width:850,height:800,resizable:!1}).then((a)=>{config.instruments.push(a),saveConfig(),reloadInstruments()}).catch(()=>{})}function htmlReport(a,b,c,d){let e,f;ipcMain.on('htmlReport.config',e=(a,b)=>{windows.htmlReport&&windows.htmlReport.webContents.send('config',b)}),ipcMain.on('htmlReport.savePDF',f=(a,b)=>{windows.htmlReport&&dialog.showSaveDialog({message:'Save the report for device '+b.cellName,defaultPath:'~/'+b.cellName+'.pdf'},(a)=>{windows.htmlReport.webContents.printToPDF({marginsType:1,pageSize:'A4',landscape:!0},(b,c)=>{fs.writeFile(a,c,()=>{console.log(b)})})})}),openForm(null,'htmlreport_control',{measurementName:d,db:config.database,cellInfo:b,chanId:c},{width:400,height:595,x:50,y:100,center:!1,resizable:!1},()=>{ipcMain.removeListener('htmlReport.config',e),ipcMain.removeListener('htmlReport.savePDF',f)}),windows.htmlReport=new BrowserWindow({width:1122,height:795,x:500,y:100,center:!1,resizable:!1}),windows.htmlReport.webContents.once('dom-ready',()=>{windows.htmlReport.webContents.send('loadData',{measurementName:d,db:config.database,cellInfo:b,chanId:c})}),windows.htmlReport.loadURL(url.format({pathname:path.join(__dirname,'app/htmlreport.html'),protocol:'file:',slashes:!0}))}function openBugReport(){openForm(null,'bugreport',{},{width:540,height:600,resizable:!1})}function openMPPT(){windows.mppt=new BrowserWindow({width:1400,height:1024,center:!0,resizable:!1}),windows.mppt.loadURL(url.format({pathname:path.join(__dirname,'app/mppt.html'),protocol:'file:',slashes:!0}))}async function openCalibratePD(a,b){openForm(null,'calibratepd',{instrumentId:b.instrumentId,groupName:b.groupName,config:b.config},{width:800,height:600,resizable:!1},async()=>{await fetch('http://'+b.config.trackerHost+':'+b.config.trackerPort+'/resetAllChannels?instrumentId='+b.instrumentId+'&groupName='+b.groupName,{method:'GET'}).then((a)=>a.json())})}async function openCalibratePyranometer(a,b){openForm(null,'calibratepyranometer',{instrumentId:b.instrumentId,groupName:b.groupName,config:b.config},{width:800,height:600,resizable:!1},async()=>{})}async function openScheduleLight(a,b){let c;ipcMain.on('light.updated',c=()=>{windows.instrumentMain.webContents.send('light.updated')}),openForm(null,'scheduleLight',{instrumentId:b.instrumentId,groupName:b.groupName,config:b.config},{width:800,height:600,resizable:!1},function(){ipcMain.removeListener('light.updated',c)})}function removeInstrument(a,b){dialog.showMessageBox({type:'question',message:'Are you sure that you want to remove this instrument ?',cancelId:0,defaultId:0,title:'Remove the instrument',buttons:['Cancel','Yes']},(a)=>{1==a&&(config.instruments.forEach((a,c)=>{a.trackerHost==b&&config.instruments.splice(c,1)}),saveConfig(),reloadInstruments())})}function reportError(a){console.log('Error reporting !'),dialog.showMessageBox({type:'error',message:'An error has happened: '+a.toString(),cancelId:0,defaultId:0,title:'Error',buttons:['Ok']},()=>{})}function reloadInstruments(){windows.instrumentList.webContents.send('reloadInstruments'),doMenu()}function addInstrument(){openForm(null,'instrumentform',{},{width:850,height:800,resizable:!1}).then((a)=>{try{config.instruments.push(a),saveConfig(),reloadInstruments()}catch(a){reportError(a)}}).catch(()=>{})}function loadInstrument(a,b){const c=b.host,d=b.mode;windows.instrumentMain||(windows.instrumentMain=new BrowserWindow({width:1400,height:1024,center:!0,resizable:!1}));'ageing'===d?windows.instrumentMain.loadURL(url.format({pathname:path.join(__dirname,'app/instrument.html'),protocol:'file:',slashes:!0})):'measurement'===d?windows.instrumentMain.loadURL(url.format({pathname:path.join(__dirname,'app/instrument.html'),protocol:'file:',slashes:!0})):void 0;windows.instrumentList&&windows.instrumentList.close();let e;config.instruments.forEach((a)=>{a.trackerHost==c&&(e=a,currentInstrument=a)}),windows.instrumentMain.webContents.isLoading()?windows.instrumentMain.webContents.once('dom-ready',()=>{windows.instrumentMain.webContents.send('loadInstrument',{tracker:e,db:config.database})}):windows.instrumentMain.webContents.send('loadInstrument',{tracker:e,db:config.database}),windows.instrumentMain.once('close',()=>{windows.instrumentMain=null}),openSocket(e)}function editInstrument(a,b){let c;if(config.instruments.forEach((a)=>{a.trackerHost==b&&(c=a)}),!c)throw'Could not find the data corresponding to this instrument';openForm(null,'instrumentform',c,{width:600,height:800,resizable:!1}).then((a)=>{Object.assign(c,a),saveConfig(),windows.instrumentMain&&windows.instrumentMain.webContents.send('loadInstrument',{tracker:c,db:config.database}),windows.instrumentList&&windows.instrumentList.webContents.send('instrumentUpdated'),reloadInstruments()}).catch(()=>{})}function editInfluxDB(){let a=config.database;openForm(null,'influxdbform',a,{width:600,height:700,resizable:!1}).then(async(a)=>{config.database=a,saveConfig(),windows.form.webContents.send('uploading',{status:'progress',host:config.instruments.map((a)=>a.trackerHost).join(', ')}),updateInfluxDB().then(()=>{windows.form.webContents.send('uploading',{status:'done',host:instrument.trackerHost})}).catch((a)=>{windows.form.webContents.send('uploading',{status:'error',error:a,host:a.options.form.host})}),windows.instrumentMain&&windows.instrumentMain.webContents.send('reloadDB',{db:config.database})}).catch(()=>{})}function showAllMeasurements(a){openForm(null,'showallmeasurements',{config:a,configDB:config.database},{width:600,height:700,resizable:!1}).then(()=>{}).catch(()=>{})}function updateInfluxDB(){return Promise.all(config.instruments.map((a)=>{return request.post({url:'http://'+a.trackerHost+':'+a.trackerPort+'/setInfluxDB',form:config.database,timeout:1e3})}))}async function configChannel(a,b){config.database;var c=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getChannelConfig?instrumentId='+b.instrumentId+'&chanId='+b.chanId,{method:'GET'}).then((a)=>a.json()),d=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getInstrumentConfig?instrumentId='+b.instrumentId,{method:'GET'}).then((a)=>a.json()),e=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&chanId='+b.chanId,{method:'GET'}).then((a)=>a.json());return d.instrumentId=b.instrumentId,openForm(null,'cellform',{instrumentConfig:d,groupName:b.groupName,channelConfig:c,channelState:e[b.groupName].channels[b.chanId]},{width:600,height:800}).then((b)=>{return a.sender.send('channelConfigured',b),b}).catch(()=>{})}async function configChannels(a,b){config.database;var c=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&groupName='+b.groupName,{method:'GET'}).then((a)=>a.json()),d=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getInstrumentConfig?instrumentId='+b.instrumentId,{method:'GET'}).then((a)=>a.json()),e=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&chanId='+b.chanIds[0],{method:'GET'}).then((a)=>a.json());return d.instrumentId=b.instrumentId,openForm(null,'cellformall',{channelState:e[b.groupName].channels[b.chanIds[0]],channelsState:c[b.groupName].channels,groupName:b.groupName,instrumentConfig:d,channelIds:b.chanIds},{width:600,height:800}).then((b)=>{return a.sender.send('channelsConfigured',b),b}).catch(()=>{})}let windowForm;function openForm(a,b,c,d={width:300,height:420},e){return windowForm&&(windowForm._rejecter&&windowForm._rejecter(),windowForm.close()),windowForm=new BrowserWindow(d),windowForm.loadURL(url.format({pathname:path.join(__dirname,'app/'+b+'.html'),protocol:'file:',slashes:!0})),windows.form=windowForm,windowForm.once('closed',()=>{windows.form=null,windowForm&&windowForm._rejecter&&windowForm._rejecter(),windowForm=null,'function'==typeof e&&e()}),new Promise((a,b)=>{ipcMain.once('validateForm',(b,c)=>{a(c)}),ipcMain.once('closeForm',()=>{windowForm&&(windowForm.close(),windowForm=null)}),windowForm.webContents.once('dom-ready',()=>{windowForm.webContents.send('loadForm',c)}),windowForm._rejecter=b})}
//# sourceMappingURL=main.js.map
