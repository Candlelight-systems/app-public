'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var path = _interopDefault(require('path'));
var url = _interopDefault(require('url'));
var fs = _interopDefault(require('fs'));
var electron = require('electron');
var $ = _interopDefault(require('jquery'));

class Header extends React.Component{constructor(a){super(a);}render(){let a=0;if(this.props.channels){this.props.channels.length;let b;for(b of this.props.channels)b.busy&&a++;}return React.createElement('nav',{className:'header navbar navbar-default'},React.createElement('div',{className:'container-fluid'},React.createElement('div',{className:'navbar-left'},React.createElement('img',{src:'./images/logo.png',width:'350'}))))}}

class InstrumentList extends React.Component{constructor(){super(...arguments), setInterval(()=>{this.readConfig().instruments.forEach(a=>{let b="status_"+a.trackerHost;fetch("http://"+a.trackerHost+":"+a.trackerPort+"/idn").then(()=>{this.setState({[b]:!0});}).catch(()=>{this.setState({[b]:!1});});});},1e3), electron.ipcRenderer.on("instrumentUpdated",()=>{this.render();}), this.state={}, this.loadInstrument=this.loadInstrument.bind(this), this.addInstrument=this.addInstrument.bind(this), this.removeInstrument=this.removeInstrument.bind(this), this.editInstrument=this.editInstrument.bind(this);}addInstrument(){electron.ipcRenderer.send("addInstrument");}loadInstrument(a,b){let c=a.currentTarget.getAttribute("id");this.state["status_"+c]&&electron.ipcRenderer.send("loadInstrument",{host:c,mode:b});}removeInstrument(a){a.stopPropagation(), electron.ipcRenderer.send("removeInstrument",a.target.parentNode.parentNode.parentNode.getAttribute("id"));}editInstrument(a){a.stopPropagation(), electron.ipcRenderer.send("editInstrument",a.target.parentNode.parentNode.parentNode.getAttribute("id"));}readConfig(){let a;try{console.log(__dirname,fs.readFileSync(__dirname+"/../config.json")), a=JSON.parse(fs.readFileSync(__dirname+"/../config.json")), console.log(a), a.instruments=a.instruments||[];}catch(a){return console.error(a), null}return a}render(){const a=this.readConfig();if(null===a)return null;let b=a.instruments.map(a=>{let b=!!this.state["status_"+a.trackerHost];return React.createElement("li",{className:"list-group-item "+(b?"bg-success":"bg-danger"),id:a.trackerHost,onClick:a=>this.loadInstrument(a,this.props.mode),key:a.trackerHost},React.createElement("div",{className:"pull-right"},React.createElement("a",{href:"#"},React.createElement("span",{className:"glyphicon glyphicon-remove",onClick:this.removeInstrument})),"\xA0",React.createElement("a",{href:"#"},React.createElement("span",{className:"glyphicon glyphicon-edit",onClick:this.editInstrument}))),React.createElement("span",{className:"glyphicon glyphicon-"+(b?"ok text-success":"warning-sign text-danger")}),"\xA0 ",a.trackerName)});return b.push(React.createElement("li",{className:"list-group-item",onClick:this.addInstrument,key:"__new"},React.createElement("a",{href:"#"},"+ Add an instrument"))), React.createElement("ul",{id:"instrumentList",className:"list-group"},b)}}

var statuses={light:{version:"2.0",readonly:!1}};var instrument={"Small cells":{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:30,LSB:1.22,LSBValue:1,voltageRange:2.5,autoZero:"instrument",groups:{"Sample holder":{resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}}};var environment = {ageing:!0,ivmeasurement:!0,statuses:statuses,instrument:instrument};

const address=a=>"http://"+a.host+":"+a.port+"/";let ping=a=>new Promise((b,c)=>{fetch(address(a)+"ping",{method:"GET"}).then(a=>b(a)), setTimeout(c,1e3);});let checkAuth=async(a,b,c,d)=>{const e=`${address(a)}query?u=${b}&p=${c}&q=${encodeURIComponent(`SHOW GRANTS FOR "${b}"`)}`,f=await fetch(e).then(a=>a.json());if(f.error)throw"Bad credentials";if(f.results[0].error){if(""==b)throw"No user defined";throw"User not found"}if(!f.results[0].series[0]||!f.results[0].series[0].values)throw"No privileges found";let g=!1;if(f.results[0].series[0].values.forEach(a=>{a[0]==d&&"ALL PRIVILEGES"==a[1]&&(g=!0);}), !g)throw`Wrong privileges were found for user ${b}`};let checkDB=async(a,b,c,d)=>{if(null==b||0==b.length)return;const e=`${address(a)}query?u=${b}&p=${c}&q=${encodeURIComponent(`SHOW DATABASES`)}`,f=await fetch(e).then(a=>a.json());if(!f.results[0].series)throw"Database not found";if(!f.results[0].series[0].values)throw"Database not found";let g=!1;if(f.results[0].series[0].values.forEach(a=>{a[0]==d&&(g=!0);}), !g)throw"Database not found"};

let influx_error; let influx_warning;electron.ipcRenderer.on('reloadInstruments',()=>{render();}), electron.ipcRenderer.on('dbInformation',async(a,b)=>{influx_error=!1;try{console.log(b), await ping(b), await checkDB(b,b.username,b.password,b.db), await checkAuth(b,b.username,b.password,b.db), influx_warning=!1, influx_error=!1;}catch(a){'No user defined'===a||'User not found'===a||'No privileges found'===a||'Bad credentials'===a?(influx_warning=!0, influx_error=!1):(influx_warning=!1, influx_error=!0);}render();});function mppt_keithley_2400(){electron.ipcRenderer.send('mppt','keithley2400');}function edit_influxdb(){electron.ipcRenderer.send('editInfluxDB');}function render(){let a=null;influx_error!==void 0&&influx_warning!==void 0&&(influx_error?a=React.createElement('span',{className:'text-danger'},React.createElement('span',{className:'glyphicon glyphicon-remove'}),' Cannot connect'):influx_warning?a=React.createElement('span',{className:'text-warning'},React.createElement('span',{className:'glyphicon glyphicon-warning-sign'}),' Partial DB access'):a=React.createElement('span',{className:'text-success'},React.createElement('span',{className:'glyphicon glyphicon-check'}),' Connection ok')), ReactDOM.render(React.createElement('div',null,React.createElement(Header,null),React.createElement('div',{className:'container'},environment.ageing&&React.createElement('div',null,React.createElement('div',{className:'row'},React.createElement('div',{className:'pull-right'},'InfluxDB status: ',a,' \xA0',' ',React.createElement('button',{className:'btn btn-default',onClick:edit_influxdb},React.createElement('a',{href:'#'},'Edit InfluxDB connection'))),React.createElement('h4',null,'Ageing setups')),React.createElement(InstrumentList,{mode:'ageing'})),environment.ivmeasurement&&React.createElement('div',null,React.createElement('div',{className:'row'},React.createElement('h4',null,'Precision measurements')),React.createElement(InstrumentList,{mode:'measurement'})),React.createElement('h4',null,'Maximum power point tracking'),React.createElement('ul',{className:'list-group'},React.createElement('li',{className:'list-group-item',onClick:mppt_keithley_2400},React.createElement('a',{href:'#'},'Keithley 2400'))))),document.getElementById('root'));}render();

//# sourceMappingURL=instrumentlist.js.map