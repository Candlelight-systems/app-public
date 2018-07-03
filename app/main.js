const electron=require('electron'),{Menu,ipcMain,dialog}=require('electron'),app=electron.app,BrowserWindow=electron.BrowserWindow,path=require('path'),url=require('url'),fs=require('fs'),request=require('request'),fix=require('fix-path'),fetch=require('node-fetch'),environment=require('./environment.json');fix();let currentInstrument;const configPath=path.join(__dirname.replace('app.asar','app.asar.unpacked'),'/config.json');let config=JSON.parse(fs.readFileSync(configPath)),windows={};ipcMain.on('addInstrument',addInstrument),ipcMain.on('editInstrument',editInstrument),ipcMain.on('removeInstrument',removeInstrument),ipcMain.on('loadInstrument',loadInstrument),ipcMain.on('editInfluxDB',editInfluxDB),ipcMain.on('updateInfluxDB',updateInfluxDB),ipcMain.on('downloadData',downloadData),ipcMain.on('htmlReport',htmlReport),ipcMain.on('configChannel',configChannel),ipcMain.on('configChannels',configChannels),ipcMain.on('mppt',openMPPT),ipcMain.on('bugReport',openBugReport),ipcMain.on('calibratePD',openCalibratePD),ipcMain.on('scheduleLight',openScheduleLight);function makeInstrumentMenu(){return{label:'Instrument',submenu:[{label:'Add a new instrument',click(){addInstrument()}},{label:'Edit instrument',click(){editInstrument(currentInstrument)}},{label:'Edit database config',click(){editInfluxDB()}},{label:'Show all measurements',click(){showAllMeasurements(currentInstrument)}},{type:'separator'},{label:'Cut',accelerator:'CmdOrCtrl+X',selector:'cut:'},{label:'Copy',accelerator:'CmdOrCtrl+C',selector:'copy:'},{label:'Paste',accelerator:'CmdOrCtrl+V',selector:'paste:'},...config.instruments.map(a=>({label:a.trackerName,checked:currentInstrument==a.trackerHost,click(b){loadInstrument(b,a.trackerHost)}}))]}}function doMenu(){const a=[];environment.ageing&&a.push(makeInstrumentMenu()),a.unshift({label:app.getName(),submenu:[{role:'about'},{type:'separator'},{role:'services',submenu:[]},{type:'separator'},{role:'hide'},{role:'hideothers'},{role:'unhide'},{type:'separator'},{role:'quit'}]}),a[0].submenu.push({role:'toggledevtools'});const b=Menu.buildFromTemplate(a);Menu.setApplicationMenu(b)}function saveConfig(){fs.writeFile(configPath,JSON.stringify(config,void 0,'\t'),a=>{a?reportError(a):config=JSON.parse(fs.readFileSync(configPath))})}function createMainWindow(){windows.instrumentList=new BrowserWindow({width:800,height:700,resizable:!1}),windows.instrumentList.loadURL(url.format({pathname:path.join(__dirname,'app/instrumentlist.html'),protocol:'file:',slashes:!0})),windows.instrumentList.on('closed',function(){windows.instrumentList=null}),doMenu()}app.on('ready',createMainWindow),app.on('window-all-closed',function(){'darwin'!==process.platform&&app.quit()}),app.on('activate',function(){null===windows.instrumentList&&createMainWindow()});function downloadData(a,b,c,d){openForm(null,'downloadform',{measurementName:d,db:config.database,cellInfo:b,chanId:c},{width:850,height:800,resizable:!1}).then(a=>{config.instruments.push(a),saveConfig(),reloadInstruments()}).catch(()=>{})}function htmlReport(a,b,c,d){let e,f;ipcMain.on('htmlReport.config',e=(a,b)=>{windows.htmlReport&&windows.htmlReport.webContents.send('config',b)}),ipcMain.on('htmlReport.savePDF',f=(a,b)=>{windows.htmlReport&&dialog.showSaveDialog({message:'Save the report for device '+b.cellName,defaultPath:'~/'+b.cellName+'.pdf'},a=>{windows.htmlReport.webContents.printToPDF({marginsType:1,pageSize:'A4',landscape:!0},(b,c)=>{fs.writeFile(a,c,()=>{console.log(b)})})})}),openForm(null,'htmlreport_control',{measurementName:d,db:config.database,cellInfo:b,chanId:c},{width:400,height:595,x:50,y:100,center:!1,resizable:!1},()=>{ipcMain.removeListener('htmlReport.config',e),ipcMain.removeListener('htmlReport.savePDF',f)}),windows.htmlReport=new BrowserWindow({width:1122,height:795,x:500,y:100,center:!1,resizable:!1}),windows.htmlReport.webContents.once('dom-ready',()=>{windows.htmlReport.webContents.send('loadData',{measurementName:d,db:config.database,cellInfo:b,chanId:c})}),windows.htmlReport.loadURL(url.format({pathname:path.join(__dirname,'app/htmlreport.html'),protocol:'file:',slashes:!0}))}function openBugReport(){openForm(null,'bugreport',{},{width:540,height:600,resizable:!1})}function openMPPT(){windows.mppt=new BrowserWindow({width:1400,height:1024,center:!0,resizable:!1}),windows.mppt.loadURL(url.format({pathname:path.join(__dirname,'app/mppt.html'),protocol:'file:',slashes:!0}))}async function openCalibratePD(a,b){openForm(null,'calibratepd',{instrumentId:b.instrumentId,groupName:b.groupName,config:b.config},{width:800,height:600,resizable:!1})}async function openScheduleLight(a,b){let c;ipcMain.on('light.updated',c=()=>{windows.instrumentMain.webContents.send('light.updated')}),openForm(null,'scheduleLight',{instrumentId:b.instrumentId,groupName:b.groupName,config:b.config},{width:800,height:600,resizable:!1},function(){ipcMain.removeListener('light.updated',c)})}function removeInstrument(a,b){dialog.showMessageBox({type:'question',message:'Are you sure that you want to remove this instrument ?',cancelId:0,defaultId:0,title:'Remove the instrument',buttons:['Cancel','Yes']},a=>{1==a&&(config.instruments.forEach((a,c)=>{a.trackerHost==b&&config.instruments.splice(c,1)}),saveConfig(),reloadInstruments())})}function reportError(a){dialog.showMessageBox({type:'error',message:'An error has happened: '+a.toString(),cancelId:0,defaultId:0,title:'Error',buttons:['Ok']},()=>{})}function reloadInstruments(){windows.instrumentList.webContents.send('reloadInstruments'),doMenu()}function addInstrument(){openForm(null,'instrumentform',{},{width:850,height:800,resizable:!1}).then(a=>{try{config.instruments.push(a),saveConfig(),reloadInstruments()}catch(a){reportError(a)}}).catch(()=>{})}function loadInstrument(a,b){windows.instrumentMain||(windows.instrumentMain=new BrowserWindow({width:1400,height:1024,center:!0,resizable:!1}),windows.instrumentMain.loadURL(url.format({pathname:path.join(__dirname,'app/instrument.html'),protocol:'file:',slashes:!0}))),windows.instrumentList&&windows.instrumentList.close();let c;config.instruments.forEach(a=>{a.trackerHost==b&&(c=a,currentInstrument=a)}),windows.instrumentMain.webContents.isLoading()?windows.instrumentMain.webContents.once('dom-ready',()=>{windows.instrumentMain.webContents.send('loadInstrument',{tracker:c,db:config.database})}):windows.instrumentMain.webContents.send('loadInstrument',{tracker:c,db:config.database}),windows.instrumentMain.once('close',()=>{windows.instrumentMain=null})}function editInstrument(a,b){let c;if(config.instruments.forEach(a=>{a.trackerHost==b&&(c=a)}),!c)throw'Could not find the data corresponding to this instrument';openForm(null,'instrumentform',c,{width:850,height:800,resizable:!1}).then(a=>{Object.assign(c,a),saveConfig(),windows.instrumentMain&&windows.instrumentMain.webContents.send('loadInstrument',{tracker:c,db:config.database}),reloadInstruments()}).catch(()=>{})}function editInfluxDB(){let a=config.database;openForm(null,'influxdbform',a,{width:600,height:700,resizable:!1}).then(a=>{config.database=a,saveConfig(),updateInfluxDB(),windows.instrumentMain&&windows.instrumentMain.webContents.send('reloadDB',{db:config.database})}).catch(()=>{})}function showAllMeasurements(a){openForm(null,'showallmeasurements',{config:a},{width:600,height:700,resizable:!1}).then(()=>{}).catch(()=>{})}function updateInfluxDB(){config.instruments.forEach(a=>{request.post({url:'http://'+a.trackerHost+':'+a.trackerPort+'/setInfluxDB',form:config.database},function(){})})}async function configChannel(a,b){config.database;var c=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getChannelConfig?instrumentId='+b.instrumentId+'&chanId='+b.chanId,{method:'GET'}).then(a=>a.json()),d=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getInstrumentConfig?instrumentId='+b.instrumentId,{method:'GET'}).then(a=>a.json()),e=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&chanId='+b.chanId,{method:'GET'}).then(a=>a.json());return openForm(null,'cellform',{instrumentConfig:d,channelConfig:c,channelState:e[b.groupName].channels[b.chanId]},{width:600,height:800}).then(b=>(console.log(b),a.sender.send('channelConfigured',b),b)).catch(()=>{})}async function configChannels(a,b){config.database;var c=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&groupName='+b.groupName,{method:'GET'}).then(a=>a.json()),d=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getInstrumentConfig?instrumentId='+b.instrumentId,{method:'GET'}).then(a=>a.json()),e=await fetch('http://'+b.trackerHost+':'+b.trackerPort+'/getStatus?instrumentId='+b.instrumentId+'&chanId='+b.chanIds[0],{method:'GET'}).then(a=>a.json());return openForm(null,'cellformall',{channelState:e[b.groupName].channels[b.chanId],channelsState:c[b.groupName].channels,instrumentConfig:d,channelIds:b.chanIds},{width:600,height:800}).then(b=>(a.sender.send('channelsConfigured',b),b)).catch(()=>{})}let windowForm;function openForm(a,b,c,d={width:300,height:420},e){return windowForm&&(windowForm._rejecter&&windowForm._rejecter(),windowForm.close()),windowForm=new BrowserWindow(d),windowForm.loadURL(url.format({pathname:path.join(__dirname,'app/'+b+'.html'),protocol:'file:',slashes:!0})),windows.form=windowForm,windowForm.once('closed',()=>{windows.form=null,windowForm&&windowForm._rejecter&&windowForm._rejecter(),windowForm=null,'function'==typeof e&&e()}),new Promise((a,b)=>{ipcMain.once('validateForm',(b,c)=>{a(c)}),ipcMain.once('closeForm',()=>{windowForm&&(windowForm.close(),windowForm=null)}),windowForm.webContents.once('dom-ready',()=>{windowForm.webContents.send('loadForm',c)}),windowForm._rejecter=b})}
//# sourceMappingURL=main.js.map
