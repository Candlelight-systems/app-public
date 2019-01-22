'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var fs = _interopDefault(require('fs'));
var $ = _interopDefault(require('jquery'));
var Graph = _interopDefault(require('node-jsgraph/dist/jsgraph-es6'));
var pdfkit = _interopDefault(require('pdfkit'));
var electron = require('electron');

class FileBuilder{constructor(){this.waves=[];}addWaveform(a,b){this.waves.push({data:a,options:b});}}class ITXBuilder extends FileBuilder{constructor(){super(...arguments);}build(){let a="IGOR\n";return a+=this.waves.map(a=>this.buildWave(a.data,a.options)).join("\n"), a}buildWave(a,b){let c="";if(c+="WAVES/D\t'"+b.waveName+"'", a.hasXWaveform()&&!b.noXWave&&(c+=" '"+(b.waveNameX||b.waveName+"_x")+"'"), c+="\n", c+="BEGIN\n", a.hasXWaveform()&&!b.noXWave)for(var d=0,e=a.getLength();d<e;d++)c+=a.getY(d)+" "+a.getX(d)+"\n";else c+=a.getData().join("\n"), c+="\n";if(c+="END\n", !a.hasXWaveform()||a.hasXUnit()){let d="x SetScale/";d+=a.hasXWaveform()?"P 0, 1":"P x "+a.xOffset+","+a.xScale, d+=", \""+(a.getXUnit()||"")+"\"", d+=", '"+b.waveName+"'", d+="\n", c+=d;}return a.hasUnit()&&(c+="x SetScale y 0, 0,\""+(a.getUnit()||"")+"\", '"+b.waveName+"'\n"), c}}class CSVBuilder extends FileBuilder{constructor(){super(...arguments);}build(){const a=",";let b="";b+=this.waves.map(b=>{let c="";return b.options.waveNameX&&(c+=b.options.waveNameX+(b.data.getXWaveform().hasUnit()?" ("+b.data.getXWaveform().getUnit()+")":"")+a), c+b.options.waveName+(b.data.hasUnit()?" ("+b.data.getUnit()+")":"")}).join(",");for(let c,d=0;c=!1, b+="\n", b+=this.waves.map(b=>{let e,f="";return e=b.data.getY(d), void 0===e||isNaN(e)?b.options.waveNameX?",":"":(c=!0, b.options.waveNameX&&(f+=b.data.getX(d)+a), f+e)}).join(a), d++, c&&1e5!=d;);return b}}

let query=function(a,b,c){return new Promise(d=>{let e={};e.q=a, e.db=b, e.u=c.username, e.p=c.password, $.get("http://"+c.host+":"+c.port+"/query",e,function(a){d(a.results);});})};

const {dialog}=require('electron').remote;class DownloadForm extends React.Component{constructor(a){super(a), this.handleInputChange=this.handleInputChange.bind(this), this.makeDownload=this.makeDownload.bind(this), this.downloadPDF=this.downloadPDF.bind(this), this.close=this.close.bind(this), this.state={dl_format:'itx',error_track:!1,error_vocjs:!1,error_jv:!1};}close(){this.props.onClose();}handleInputChange(a){const b=a.target,c='checkbox'===b.type?b.checked:b.value,d=b.name;this.setState({[d]:c});}componentWillReceiveProps(){}componentDidMount(){}async makeDownload(a=!0,b=!0,c=!0){let d='itx'==this.state.dl_format?new ITXBuilder:new CSVBuilder;let e=[];a&&(await this.downloadTrack(d), e.push('track')), b&&(await this.downloadIV(d), e.push('jv')), c&&(await this.downloadVocJsc(d), e.push('vocjsc')), dialog.showSaveDialog({message:'Save the data for the cell "'+this.props.cellInfo.cellName+'"',defaultPath:`~/${this.props.cellInfo.cellName}_${e.join('_')}.${this.state.dl_format}`},a=>{fs.writeFileSync(a,d.build());});}async downloadTrack(a){let b;try{b=await this.getTrackData();}catch(a){return this.setState({error_track:!0}), void console.error(a)}a.addWaveform(b.date,{waveName:'Date'}), a.addWaveform(b.efficiency,{waveName:'Efficiency',waveNameX:'Time_MPP_h'}), a.addWaveform(b.power,{waveName:'Power',noXWave:!0}), a.addWaveform(b.voltage,{waveName:'Voltage',noXWave:!0}), a.addWaveform(b.current,{waveName:'Current',noXWave:!0}), a.addWaveform(b.temperature,{waveName:'Temperature',noXWave:!0}), a.addWaveform(b.sun,{waveName:'Sun',noXWave:!0}), a.addWaveform(b.humidity,{waveName:'Humidity',noXWave:!0});}async downloadVocJsc(a){let b;try{b=await this.getVocJscData();}catch(a){return this.setState({error_vocjs:!0}), void console.error(a)}a.addWaveform(b.waveVoc,{waveName:'Voc',waveNameX:'Time_voc_h'}), a.addWaveform(b.waveJsc,{waveName:'Jsx',waveNameX:'Time_jsc_h'});}async downloadIV(a){let b;try{b=await this.getJVData();}catch(a){return this.setState({error_jv:!0}), void console.error(a)}b[0].map(b=>{b.wave&&a.addWaveform(b.wave,{waveName:'Current_'+b.time_h+'h',waveNameX:'Voltage_'+b.time_h+'h'});});}getTrackData(a){var b=this.props.db.db;return query('SELECT time,efficiency FROM "'+encodeURIComponent(this.props.measurementName)+'" ORDER BY time ASC limit 1;SELECT time,efficiency FROM "'+encodeURIComponent(this.props.measurementName)+'" ORDER BY time DESC limit 1;',b,this.props.db).then(async c=>{var d=Math.max;if(!c[0].series)throw'No measurement with the name '+encodeURIComponent(this.props.measurementName)+' or no associated data';let e=c[0].series[0].values[0][0],f=c[1].series[0].values[0][0],g=(new Date(f)-new Date(e))/1e3,h=d(1,Math.round(g/1e3)),i=await query('SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff, MEAN(power_mean) as pMean, MEAN(temperature_base) as tMean2 FROM "'+encodeURIComponent(this.props.measurementName)+'" WHERE time >= \''+e+'\' and time <= \''+f+'\'  GROUP BY time('+h+'s) FILL(none) ORDER BY time ASC;',b,this.props.db).then(a=>{let b,c=a[0].series[0].values,e=Graph.newWaveform(),f=Graph.newWaveform(),h=Graph.newWaveform(),i=Graph.newWaveform(),j=Graph.newWaveform(),k=Graph.newWaveform(),l=Graph.newWaveform(),m=Graph.newWaveform();f.setUnit('%'), f.setXUnit('h'), h.setUnit('V'), j.setUnit('W'), i.setUnit('mA cm-2'), k.setUnit('-'), l.setUnit('\xB0C'), m.setUnit('%');let n=0,o=0;return c.forEach((a,c)=>{let g,o=new Date(a[0]);0==c?(b=o.getTime(), g=0):g=(o.getTime()-b)/1e3/3600, e.append(g,o.getDate()+'.'+o.getMonth()+'.'+o.getFullYear()+' '+o.getHours()+':'+o.getMinutes()+':'+o.getSeconds()), f.append(g,a[1]), h.append(g,a[2]), i.append(g,a[3]), j.append(g,a[8]), m.append(g,a[4]), k.append(g,a[5]), null===a[6]?null!==a[9]&&l.append(g,a[9]):l.append(g,a[6]), n=d(n,a[7]);}), o=c[c.length-1][7], {efficiency:f,voltage:h,current:i,sun:k,temperature:l,humidity:m,power:j,date:e,maxEfficiency:n,finalEfficiency:o,ellapsed:g/3600}});if(a){let a=1e6*new Date(e).getTime();i.timeEfficiencies=await query(`
					SELECT efficiency FROM "${encodeURIComponent(this.props.measurementName)}" WHERE time > ${a+3600000000000} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(this.props.measurementName)}" WHERE time > ${a+86400000000000} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(this.props.measurementName)}" WHERE time > ${a+360000000000000} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(this.props.measurementName)}" WHERE time > ${a+1800000000000000} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${encodeURIComponent(this.props.measurementName)}" WHERE time > ${a+3600000000000000} ORDER BY time ASC LIMIT 1;
				`,b,this.props.db).then(a=>a.map(a=>a.series?a.series[0].values[0][1]:void 0));}return i})}getVocJscData(){var a=this.props.db.db;let b,c=Graph.newWaveform(),d=Graph.newWaveform();return query(`
			SELECT time,efficiency FROM "${encodeURIComponent(this.props.measurementName)}" ORDER BY time ASC limit 1;
			SELECT time,voc FROM "${encodeURIComponent(this.props.measurementName)}_voc" ORDER BY time ASC;
			SELECT time,jsc FROM "${encodeURIComponent(this.props.measurementName)}_jsc" ORDER BY time ASC;`,a,this.props.db).then(async a=>(a.map((a,e)=>0==e?void(b=new Date(a.series[0].values[0][0])):a.series?a.series[0].values.map(a=>{let f=new Date(a[0]),g=Math.round(10*((f.getTime()-b.getTime())/1e3/3600))/10,h=a[1];1==e?c.append(g,h):2==e&&d.append(g,h);}):[]), {waveVoc:c,waveJsc:d}))}getJVData(){var a=this.props.db.db;let b;return query(`
			SELECT time,iv FROM "${encodeURIComponent(this.props.measurementName)}_iv" ORDER BY time ASC;`,a,this.props.db).then(async a=>a.map((a,c)=>a.series?(0==c&&(b=new Date(a.series[0].values[0][0])), a.series[0].values.map(a=>{let c=new Date(a[0]),d=a[1].split(','),e=Graph.newWaveform();for(let b=0;b<d.length-1;b+=2)e.append(parseFloat(d[b].replace('"','')),parseFloat(d[b+1].replace('"','')));return{wave:e,time_h:Math.round(10*((c.getTime()-b.getTime())/1e3/3600))/10}})):{}))}async downloadPDF(){electron.ipcRenderer.send('htmlReport',this.props.cellInfo,this.props.chanId,this.props.measurementName,this.props.instrumentId);}render(){return React.createElement('div',{className:'container-fluid'},React.createElement('form',{onSubmit:this.submit,className:'form-horizontal'},React.createElement('h4',null,'Download data for device "',this.props.cellInfo.cellName,'" ',this.props.chanId&&React.createElement('span',null,'( channel ',this.props.chanId,' )')),this.state.error_track?React.createElement('div',{className:'alert alert-warning'},React.createElement('strong',null,React.createElement('span',{className:'glyphicon glyphicon-warning'})),' Could not download tracking data. It could be that no data exists in the database.'):null,this.state.error_jv?React.createElement('div',{className:'alert alert-warning'},React.createElement('strong',null,React.createElement('span',{className:'glyphicon glyphicon-warning'})),' Could not download IV data. It could be that no data exists in the database.'):null,this.state.error_vocjsc?React.createElement('div',{className:'alert alert-warning'},React.createElement('strong',null,React.createElement('span',{className:'glyphicon glyphicon-warning'})),' Could not download Voc/Jsc data. It could be that no data exists in the database.'):null,React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Format'),React.createElement('div',{className:'col-sm-6'},React.createElement('select',{name:'dl_format',id:'dl_format',className:'form-control',value:this.state.dl_format,onChange:this.handleInputChange},React.createElement('option',{value:'csv'},'Comma separated (.csv)'),React.createElement('option',{value:'itx'},'Igor text file (.itx)')))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Number of points'),React.createElement('div',{className:'col-sm-6'},React.createElement('select',{name:'dl_track_nb',id:'dl_track_nb',className:'form-control',value:this.state.dl_track_nb,onChange:this.handleInputChange},React.createElement('option',{value:'100'},'100'),React.createElement('option',{value:'300'},'300'),React.createElement('option',{value:'1000'},'1000'),React.createElement('option',{value:'3000'},'3000'),React.createElement('option',{value:'10000'},'10000')))),React.createElement('div',{className:'form-group'},React.createElement('div',{className:'col-sm-3'}),React.createElement('div',{className:'col-sm-6'},React.createElement('div',{className:'btn-group'},React.createElement('button',{className:'btn btn-primary',type:'button',onClick:()=>{this.makeDownload(!0,!1,!1);}},'Download MPP'),React.createElement('button',{className:'btn btn-primary',type:'button',onClick:()=>{this.makeDownload(!1,!1,!0);}},'Download Voc and Jsc'),React.createElement('button',{className:'btn btn-primary',type:'button',onClick:()=>{this.makeDownload(!1,!0,!1);}},'Download JV'),React.createElement('button',{className:'btn btn-primary',type:'button',onClick:()=>{this.makeDownload(!0,!0,!0);}},'Download All')))),React.createElement('div',{className:'form-group'},React.createElement('div',{className:'col-sm-3'}),React.createElement('div',{className:'col-sm-6'},React.createElement('div',{className:'btn-group'},React.createElement('button',{className:'btn btn-success',type:'button',onClick:this.downloadPDF},'Make PDF report'),React.createElement('button',{type:'button',className:'btn btn-default',name:'update',onClick:this.close},'Close'))))),React.createElement('div',{className:'btn-group pull-right'}))}}

const {ipcRenderer: ipcRenderer$1}=require('electron');ipcRenderer$1.on('loadForm',(a,b)=>{render(b);});function onValidate(a){ipcRenderer$1.send('validateForm',a);}function onClose(){ipcRenderer$1.send('closeForm');}function render(a){ReactDOM.render(React.createElement(DownloadForm,{db:a.db,measurementName:a.measurementName,cellInfo:a.cellInfo,instrumentId:a.instrumentId,chanId:a.chanId,onValidate:onValidate,onClose:onClose}),document.getElementById('root'));}

//# sourceMappingURL=downloadform.js.map