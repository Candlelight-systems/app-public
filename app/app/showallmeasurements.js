'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var $ = _interopDefault(require('jquery'));
var nodeFetch = _interopDefault(require('node-fetch'));
var electron = require('electron');
var fs = _interopDefault(require('fs'));

function postJSON(a,b){return fetch(a,{body:JSON.stringify(b),headers:{"content-type":'application/json'},method:'POST'}).then(a=>a.json())}

let query=function(a,b,c){return new Promise(d=>{let e={};e.q=a, e.db=b, e.u=c.username, e.p=c.password, $.get("http://"+c.host+":"+c.port+"/query",e,function(a){d(a.results);});})};const address=a=>"http://"+a.host+":"+a.port+"/";let ping=a=>new Promise((b,c)=>{fetch(address(a)+"ping",{method:"GET"}).then(a=>b(a)), setTimeout(c,1e3);});let checkAuth=async(a,b,c,d)=>{const e=`${address(a)}query?u=${b}&p=${c}&q=${encodeURIComponent(`SHOW GRANTS FOR "${b}"`)}`,f=await fetch(e).then(a=>a.json());if(f.error)throw"Bad credentials";if(f.results[0].error){if(""==b)throw"No user defined";throw"User not found"}if(!f.results[0].series[0]||!f.results[0].series[0].values)throw"No privileges found";let g=!1;if(f.results[0].series[0].values.forEach(a=>{a[0]==d&&"ALL PRIVILEGES"==a[1]&&(g=!0);}), !g)throw`Wrong privileges were found for user ${b}`};let checkDB=async(a,b,c,d)=>{if(null==b||0==b.length)return;const e=`${address(a)}query?u=${b}&p=${c}&q=${encodeURIComponent(`SHOW DATABASES`)}`,f=await fetch(e).then(a=>a.json());if(!f.results[0].series)throw"Database not found";if(!f.results[0].series[0].values)throw"Database not found";let g=!1;if(f.results[0].series[0].values.forEach(a=>{a[0]==d&&(g=!0);}), !g)throw"Database not found"};

const openDocs=()=>{electron.shell.openExternal('https://docs.influxdata.com/influxdb/v1.5/query_language/authentication_and_authorization');};class AppForm extends React.Component{constructor(a){super(a), this.handleInputChange=this.handleInputChange.bind(this), this.validateConfig=this.validateConfig.bind(this), this.verifyConfig=this.verifyConfig.bind(this), this.createDB=this.createDB.bind(this), this.close=this.close.bind(this), this.state={};}validateConfig(){this.props.onValidate(this.state);}async createDB(){const a={},b=this.state.username,c=this.state.password,d=this.state.db;let e=`http://${this.state.host}:${this.state.port}/query?u=${b}&p=${c}`;try{const a=await postJSON(e+`&q=${encodeURIComponent(`CREATE DATABASE "${d}"`)}`),c=await postJSON(e+`&q=${encodeURIComponent(`GRANT ALL ON "${d}" TO ${b}`)}`);this.verifyConfig();}catch(b){a.db_dbexists=b, this.setState(a);}}async verifyConfig(){const a=this.state.username,b=this.state.password,c=this.state.db;`http://${this.state.host}:${this.state.port}`;const d={db_authentication:null};try{if('localhost'==this.state.host||'127'==this.state.host.slice(0,3))throw d.db_connection='error', 'The address must not be local (the tracker must also access it)';await ping(this.state), d.db_connection='ok';try{await checkDB(this.state,a,b,c);d.db_dbexists='ok';}catch(a){d.db_dbexists=a.toString();}try{await checkAuth(this.state,a,b,c), d.db_authentication='ok';}catch(a){d.db_authentication=a.toString();}}catch(a){console.log(a), d.db_connection=a.toString();}this.setState(d);}close(){this.props.onClose();}handleInputChange(a){const b=a.target,c='checkbox'===b.type?b.checked:b.value,d=b.name;this.setState({[d]:c});}componentWillReceiveProps(a){this.setState(a.formState);}componentDidMount(){this.setState(this.props.formState);}render(){let a,b,c,d,e,f;switch(this.state.db_connection){case'ok':a='alert-success', b=React.createElement('span',null,'Database connection successful');break;case void 0:case null:a='alert-default', b=null;break;case'error':a='alert-danger', b=React.createElement('span',null,'Could not connect to the database');break;default:a='alert-danger', b=React.createElement('span',null,this.state.db_connection);}switch(this.state.db_authentication){case'ok':e='alert-success', f=React.createElement('span',null,'Database authentication successful');break;case void 0:case null:e='alert-default', f=null;break;case'No user defined':e='alert-warning', f=React.createElement('span',null,'No user was defined. If no authentication to the DB is required, this warning may be ignored.');break;default:e='alert-danger', f=React.createElement('span',null,this.state.db_authentication);}switch(this.state.db_dbexists){case'ok':c='alert-success', d=React.createElement('span',null,'Database exists');break;case void 0:case null:c='alert-default', d=null;break;default:c='alert-danger', d=React.createElement('span',null,this.state.db_dbexists,React.createElement('button',{className:'btn btn-default',onClick:this.createDB},'Create'));}let g;if(this.props.uploading)switch(this.props.uploading.status){case'progress':g=React.createElement('div',{className:'alert alert-info'},'Uploading to ',this.props.uploading.host,' in progress');break;case'done':g=React.createElement('div',{className:'alert alert-success'},'Uploaded to the instruments');break;case'error':g=React.createElement('div',{className:'alert alert-danger'},'Error while uploading to ',this.props.uploading.host,'. Check that the host is running');}return React.createElement('div',{className:'container-fluid'},this.props.uploading?g:null,b&&React.createElement('div',{className:'alert '+a},b),f&&React.createElement('div',{className:'alert '+e},f),d&&React.createElement('div',{className:'alert '+c},d),React.createElement('form',{onSubmit:this.submit,className:'form-horizontal'},React.createElement('h2',null,'Influx DB connection'),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Host'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'text',name:'host',id:'host',className:'form-control',placeholder:'',value:this.state.host,onChange:this.handleInputChange}),React.createElement('span',{className:'help-block'},'Most likely the ip address of the server running the database'))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Port'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'text',name:'port',id:'port',className:'form-control',placeholder:'8086',value:this.state.port,onChange:this.handleInputChange}),React.createElement('span',{className:'help-block'},'The connection port (by default, InfluxDB runs on 8086)'))),React.createElement('div',{className:'alert alert-info'},'If the authentication is disabled in influxDB, credentials are not checked. Read ',React.createElement('a',{href:'#',onClick:openDocs},'this'),' for further information.'),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Username'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'text',name:'username',id:'username',className:'form-control',placeholder:'',value:this.state.username,onChange:this.handleInputChange}))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Password'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'text',name:'password',id:'password',className:'form-control',placeholder:'',value:this.state.password,onChange:this.handleInputChange}))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Database name'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'text',name:'db',id:'db',className:'form-control',placeholder:'',value:this.state.db,onChange:this.handleInputChange}),React.createElement('span',{className:'help-block'},'The name of the default database')))),React.createElement('div',{className:'btn-group pull-right'},React.createElement('button',{type:'button',className:'btn btn-primary',name:'update',onClick:this.verifyConfig},'Verify configuration'),React.createElement('button',{type:'button',className:'btn btn-primary',name:'update',onClick:this.validateConfig},'Update'),React.createElement('button',{type:'button',className:'btn btn-default',name:'update',onClick:this.close},'Close')))}}

class ErrorMessage extends React.Component{constructor(a){super(a);}render(){var a=[];if(this.props.methods&&Array.isArray(this.props.method))for(var b=0;b<this.props.methods.length;b++)a.push(React.createElement("div",{key:this.props.methods[b][0]},React.createElement("a",{href:"#",onClick:this.props.methods[b][1]},this.props.methods[b][0])));return!this.props.method||[React.createElement("br",null)], React.createElement("div",{className:"error"},"The system encountered an unfortunate error: ",React.createElement("br",null)," ",this.props.message," ",a," ")}}

const dialog=electron.remote.dialog;let data;electron.ipcRenderer.on('loadForm',(a,b)=>{data=b, render();});function pad(a){return 10>a?'0'+a:a}function downloadData(a){electron.ipcRenderer.send('downloadData',data.config,a);}function removeData(a){dialog.showMessageBox({type:'question',message:'Are you sure that you want to delete this measurement ?',cancelId:0,defaultId:0,title:'Delete this measurement ?',buttons:['Cancel','Yes']},async b=>{if(1==b){try{await fetch(`http://${data.config.trackerHost}:${data.config.trackerPort}/dropMeasurement?measurementName=${a}`), render();}catch(a){dialog.showMessageBox({type:'error',message:`Error in removing the measurement. The error was :${a.toString()}. Make sure that the database and the server can be accessed.`,cancelId:0,defaultId:0,title:'Error',buttons:['Ok']});}try{await query(`DROP MEASUREMENT ${a};`,data.configDB.db,data.configDB);}catch(a){}}});}function formatDate(a){let b=new Date(a);return b.getDate()+'/'+(b.getMonth()+1)+'/'+b.getFullYear()+' '+pad(b.getHours())+':'+pad(b.getMinutes())}async function render(){try{if(!data.config)throw new ErrorMessage(`The tracker host is not defined. Open an instrument first before selecting this menu.`);let b=await fetch('http://'+data.config.trackerHost+':'+data.config.trackerPort+'/getAllMeasurements',{method:'GET'}).then(a=>a.json()).catch(()=>{throw new ErrorMessage(`Error while connecting to the instrument. Check that you are online and that the instrument is available on your network.`)}),c=[];for(var a in b)c.push({measurementName:a,startDate:b[a].startDate,endDate:b[a].endDate,cellInfo:b[a].cellInfo});c.sort((c,a)=>c.startDate-a.startDate);let d;ReactDOM.render(React.createElement('div',{className:'container-fluid'},React.createElement('ul',{className:'list-group'},React.createElement('h2',null,'Showing all existing measurements'),c.map(a=>{switch(a.cellInfo.trackingMode){case'CONSTV':d=`Constant voltage`;break;case'JSC':d=`Short circuit current`;break;case'VOC':d=`Open circuit voltage`;break;case'MPP':d='Maximum power point';break;default:d='N/A';}return React.createElement('li',{className:'list-group-item',key:a.measurementName},React.createElement('div',{className:'pull-right'},React.createElement('button',{className:'btn btn-sm btn-primary',onClick:()=>downloadData(a.measurementName)},'Download data'),a.endDate&&React.createElement('button',{className:'btn btn-sm btn-danger',onClick:()=>removeData(a.measurementName)},'Delete data')),React.createElement('div',null,React.createElement('strong',null,a.cellInfo.cellName)),React.createElement('div',null,formatDate(a.startDate),' ',React.createElement('span',{className:'glyphicon glypicon-arrow-left'}),' ',a.endDate?formatDate(a.endDate)+' ('+Math.round(10*((a.endDate-a.startDate)/1e3/3600))/10+'h)':'(Running)'),React.createElement('div',null,'Tracking mode: ',d))}))),document.getElementById('root'));}catch(a){console.log(a), ReactDOM.render(React.createElement('div',null,React.createElement(ErrorMessage,{message:a.props,errorMethods:[['Try again',render]]})),document.getElementById('root'));}}

//# sourceMappingURL=showallmeasurements.js.map