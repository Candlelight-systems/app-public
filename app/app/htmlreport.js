'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var $ = _interopDefault(require('jquery'));
var fs = _interopDefault(require('fs'));
var Graph = _interopDefault(require('node-jsgraph/dist/jsgraph-es6'));
var electron = require('electron');

let query=function(a,b,c){return new Promise(d=>{let e={};e.q=a, e.db=b, e.u=c.username, e.p=c.password, $.get("http://"+c.host+":"+c.port+"/query",e,function(a){d(a.results);});})};

let getIVParameters=(a,b,c,d,e=!1)=>{let f,g;try{f=a.getY(a.getIndexFromX(0));}catch(a){f=NaN;}try{g=a.getX(a.findLevel(0));}catch(a){g=NaN;}let h=e?b.getMaxY():b.getMinY();let i=h/(f*g),j=Math.round(100*(100*(1e3*h/c/(d/10))))/100*(e?1:-1),k=b.findLevel(h),l=b.getX(k);return{isc:1e3*f*(e?1:-1),jsc:1e3*(f/c)*(e?1:-1),voc:g,ff:100*i,powerin:d,power:1e3*h,pce:j,jmax:0,vmax:l}};

var statuses={light:{version:"2.0",readonly:!1},heat:{version:"ssr_1.0",switch:!1}};var instrument={"Small cells":{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:30,LSB:.33,LSBValue:1,voltageRange:2.5,autoZero:"device",groups:{"Slot A":{resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}},Module:{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:30,LSB:4.88,LSBValue:1,voltageRange:10,autoZero:"device",groups:{"Module slot":{resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}}};var environment = {ageing:!0,statuses:statuses,instrument:instrument};

const colors={pce:'#ae1826',power:'#2618ae',voltage:'#18ae77',current:'#d59a1c',jsc:'#9017c3',voc:'#1770c3',ff:'#719f40',humidity:'#5ca1b2',temperature:'#b44736',light:'#8a9609'}; const pageHeight=745; const toDate=a=>{const b=a=>10>a?'0'+a:a;return a.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][a.getMonth()]+'.'+a.getFullYear()+' '+b(a.getHours())+':'+b(a.getMinutes())+':'+b(a.getSeconds())};class HTMLReport extends React.Component{constructor(a){super(a), this.state={}, this.graphs={}, this.graphsRefs={};}close(){this.props.onClose();}componentWillUnmount(){electron.ipcRenderer.removeListener('savePDF',this.savePDF);}makePCEGraph(a){const b=new Graph(a);return b.setTitle('Power conversion efficiency (PCE)'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('PCE').setUnit('%').setUnitWrapper('(',')').forceMin(0).setLineAt([0]), b}updatePCEGraph(a){this.data.pce&&(a.newSerie('efficiency').setLabel('PCE').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.pce), this.redrawGraph(a));}makePowerGraph(a){const b=new Graph(a);return b.setTitle('Power output'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Power output').setUnit('W').setUnitDecade(!0).setUnitWrapper('(',')').forceMin(0).setLineAt([0]), b}updatePowerGraph(a){this.data.power&&(a.newSerie('power').setLabel('Power').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.power), this.redrawGraph(a));}makeJscGraph(a){const b=new Graph(a);return b.setTitle('Short circuit current'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Jsc').setUnit('mA cm^-2').setUnitWrapper('(',')'), b}updateJscGraph(a){this.data.jsc&&(a.newSerie('jsc').setLabel('Jsc').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.jsc), this.redrawGraph(a));}makeVocGraph(a){const b=new Graph(a);return b.setTitle('Open circuit voltage'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Voc').setUnit('V').setUnitWrapper('(',')'), b}updateVocGraph(a){this.data.voc&&(a.newSerie('voc').setLabel('Voc').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.voc), this.redrawGraph(a));}makeVoltageGraph(a){const b=new Graph(a);return b.setTitle('Voltage'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Voltage').setUnit('V').setUnitWrapper('(',')'), b}updateVoltageGraph(a){this.data.voltage&&(a.newSerie('voltage').setLabel('Voltage').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.voltage), this.redrawGraph(a));}makeCurrentGraph(a){const b=new Graph(a);return b.setTitle('Current'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Current').setUnit('mA cm^-2').setUnitWrapper('(',')'), b}updateCurrentGraph(a){this.data.current&&(a.newSerie('current').setLabel('Current').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.current), this.redrawGraph(a));}makeLightGraph(a){const b=new Graph(a);return b.setTitle('Light intensity'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Light intensity').setUnit('W m^-2').setUnitWrapper('(',')'), b}updateLightGraph(a){this.data.light&&(a.newSerie('light').setLabel('Light intensity').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.light), this.redrawGraph(a));}makeTemperatureGraph(a){const b=new Graph(a);return b.setTitle('Temperature'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Temperature').setUnit('\xB0C').setUnitWrapper('(',')'), b}updateTemperatureGraph(a){this.data.temperature&&(a.newSerie('temperature').setLabel('Temperature').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.temperature), this.redrawGraph(a));}makeHumidityGraph(a){const b=new Graph(a);return b.setTitle('Humidity'), this.graph_cfg_setBottomAxisTime(b), this.graph_cfg_general(b), b.getLeftAxis(0).setLabel('Humidity').setUnit('%').setUnitWrapper('(',')'), b}updateHumidityGraph(a){this.data.humidity&&(a.newSerie('humidity').setLabel('Humidity').autoAxis().setLineColor('#1f1fae').setLineWidth(2).setWaveform(this.data.humidity), this.redrawGraph(a));}redrawGraph(a){a.autoscaleAxes(), a.redraw();}makeGraphs(){const a=[],b=new Graph(this.domGraph,{fontSize:14,paddingLeft:0,paddingRight:0,paddingTop:10,paddingBottom:0,close:!1});return b.setWidth(600), b.setHeight(pageHeight), b.getBottomAxis().setLabel('Time').setUnit('h').setUnitWrapper('(',')').secondaryGridOff().setNbTicksSecondary(5), b.getBottomAxis(1).setLabel('Time').setUnit('h').setUnitWrapper('(',')').gridsOff().setNbTicksSecondary(5), b.getBottomAxis(2).setLabel('Time').setUnit('h').setUnitWrapper('(',')').gridsOff().setNbTicksSecondary(5), b.getBottomAxis(3).setLabel('Time').setUnit('h').setUnitWrapper('(',')').gridsOff().setNbTicksSecondary(5), a.pce=b.getLeftAxis(0).setLabel('PCE').setUnit('%').setColor(colors.pce).setUnitDecade(!0).setUnitWrapper('(',')').setSpan(.75,1).forceMin(0).setLineAt([0]), b.getBottomAxis(1).setFloating(a.pce,0), a.power=b.getLeftAxis(1).setLabel('Power output').setUnit('W').gridsOff().setColor(colors.power).setScientific(!0).setUnitDecade(!0).setUnitWrapper('(',')').setSpan(.5,.7).forceMin(0).setLineAt([0]), b.getBottomAxis(2).setFloating(a.power,0), a.j=b.getRightAxis(0).setLabel('Current density').setUnit('A cm^-2').gridsOff().setScientific(!0).setUnitDecade(!0).setColor(colors.current).setUnitWrapper('(',')').setSpan(.5,.7).forceMin(0), a.v=b.getRightAxis(1).setLabel('Voltage').setUnit('V').gridsOff().setColor(colors.voltage).setUnitDecade(!0).setUnitWrapper('(',')').setSpan(.5,.7).forceMin(0), a.jsc=b.getRightAxis(2).setLabel('Short circuit current').setUnit('A cm^-2').gridsOff().setScientific(!0).setUnitDecade(!0).setColor(colors.jsc).setUnitWrapper('(',')').setSpan(.25,.45).forceMin(0), a.voc=b.getRightAxis(3).setLabel('Open circuit voltage').setUnit('V').gridsOff().setUnitDecade(!0).setColor(colors.voc).setUnitWrapper('(',')').setSpan(.25,.45).forceMin(0), a.ff=b.getLeftAxis(2).setLabel('Fill factor').setUnit('%').gridsOff().setUnitDecade(!0).setColor(colors.ff).setUnitWrapper('(',')').setSpan(.25,.45).forceMin(0), b.getBottomAxis(3).setFloating(a.voc,0), a.light=b.getLeftAxis(3).setLabel('Sun intensity').setUnit('W m^-2').gridsOff().setUnitDecade(!0).setColor(colors.light).setUnitWrapper('(',')').setSpan(0,.2).forceMin(0), a.humidity=b.getRightAxis(4).setLabel('Humidity').setUnit('%').setColor(colors.humidity).setUnitDecade(!0).gridsOff().setUnitWrapper('(',')').setSpan(0,.2).forceMin(0), a.temperature=b.getRightAxis(5).setLabel('Temperature').setUnit('\xB0C').setColor(colors.temperature).setUnitDecade(!0).gridsOff().setUnitWrapper('(',')').setSpan(0,.2).forceMin(0), this.axis=a, b}updateGraphs(){const a=this.graph;a.newSerie('pce').setLabel('PCE').setXAxis(a.getBottomAxis(1)).setYAxis(this.axis.pce).setLineColor(colors.pce).setLineWidth(2).setWaveform(this.data.pce), a.newSerie('power').setLabel('power').setXAxis(a.getBottomAxis(2)).setYAxis(this.axis.power).setLineColor(colors.power).setLineWidth(2).setWaveform(this.data.power), a.newSerie('current').setLabel('Current').setXAxis(a.getBottomAxis(2)).setYAxis(this.axis.j).setLineColor(colors.current).setLineWidth(2).setWaveform(this.data.current), a.newSerie('voltage').setLabel('Voltage').setXAxis(a.getBottomAxis(2)).setYAxis(this.axis.v).setLineColor(colors.voltage).setLineWidth(2).setWaveform(this.data.voltage), a.newSerie('ff').setLabel('Fill factor').setXAxis(a.getBottomAxis(3)).setYAxis(this.axis.ff).setLineColor(colors.ff).setLineWidth(2).setWaveform(this.data.ff), a.newSerie('jsc').setLabel('Short circuit current').setXAxis(a.getBottomAxis(3)).setYAxis(this.axis.jsc).setLineColor(colors.jsc).setLineWidth(2).setWaveform(this.data.jsc), a.newSerie('voc').setLabel('Open circuit voltage').setXAxis(a.getBottomAxis(3)).setYAxis(this.axis.voc).setLineColor(colors.voc).setLineWidth(2).setWaveform(this.data.voc), a.newSerie('temperature').setLabel('Temperature').autoAxis().setYAxis(this.axis.temperature).setLineColor(colors.temperature).setLineWidth(2).setWaveform(this.data.temperature), a.newSerie('sun').setLabel('Sun intensity').autoAxis().setYAxis(this.axis.light).setLineColor(colors.light).setLineWidth(2).setWaveform(this.data.light), a.newSerie('humidity').setLabel('Humidity').autoAxis().setYAxis(this.axis.humidity).setLineColor(colors.humidity).setLineWidth(2).setWaveform(this.data.humidity), a.autoscaleAxes(), a.draw();}graph_cfg_setBottomAxisTime(a){a.getBottomAxis().setLabel('Time').setUnit('h').setUnitWrapper('(',')').gridsOff().setNbTicksSecondary(0);}graph_cfg_setBottomAxisNothing(a){this.setBottomAxisTime(a), a.getBottomAxis().hide();}graph_cfg_general(a){a.setWidth(600);}updateGraphJV(a){if(!this.graphJV||!a||!a.jv)return;const b=this.graphJV;b.resize(420,240), b.getBottomAxis().setLabel('Voltage').setUnit('V').setUnitWrapper('(',')').gridsOff().setNbTicksSecondary(0), b.getLeftAxis().setLabel('Current').setUnit('A').setScientific(!0).setUnitDecade(!0).setSpan(0,1).setUnitWrapper('(',')').gridsOff().setLineAt([0]).setNbTicksSecondary(0), b.killSeries(), a.jv.map(a=>{b.newSerie('jv_'+a.time).setLabel(a.ellapsed+'h').autoAxis().setLineWidth(2).setWaveform(a.waveform);}), b.getPlugin('makeTracesDifferent').colorizeAll({affect:'h',startingColorHSL:{h:0,s:.5,l:.5},endingColorHSL:{h:270,s:.5,l:.5}},(a,b)=>{document.getElementById('ivTable');this.jvDom[a]&&(this.jvDom[a].style.color=b);}), b.autoscaleAxes(), b.draw();}componentDidMount(){this.updateProps(this.props), this.graph=this.makeGraphs();}componentWillReceiveProps(a){this.updateProps(a);}componentDidUpdate(){this.updateGraphJV(this.state.data);}async updateProps(a=this.props){this.data={};try{await this.getTrackData(a);}catch(a){console.warn(a);}try{await this.getVocData(a);}catch(a){console.warn(a);}try{await this.getJscData(a);}catch(a){console.warn(a);}for(this.data.ff=this.data.power.duplicate().divide(this.data.voc.duplicate().multiply(this.data.jsc)).multiply(100);this.domJV.firstChild;)this.domJV.removeChild(this.domJV.firstChild);this.graphJV=new Graph(this.domJV,{fontSize:14,paddingLeft:0,paddingRight:0,paddingTop:10,paddingBottom:0,plugins:{makeTracesDifferent:{}}}), this.updateGraphs(), this.setState({data:this.data});}getIVInformation(){return null}async getVocData(a=this.props){if(!a.measurementName)return;var b=a.db.db;let c=Graph.newWaveform();return query(`SELECT time,voc FROM "${encodeURIComponent(a.measurementName)}_voc" ORDER BY time`,b,a.db).then(async b=>{if(!b[0].series)throw this.data.voc=Graph.newWaveform(), new Error(`No Voc data with the name "${a.measurementName}"`);let d=b[0].series[0].values;d.forEach(a=>{let b=new Date(a[0]),d=(b.getTime()-this.offset)/1e3/3600;c.append(d,a[1]);}), this.data.voc=c;})}async getJscData(a=this.props){if(!a.measurementName)return;var b=a.db.db;let c=Graph.newWaveform();return query(`SELECT time,jsc FROM "${encodeURIComponent(a.measurementName)}_jsc" ORDER BY time`,b,a.db).then(async b=>{if(!b[0].series)throw this.data.jsc=Graph.newWaveform(), new Error(`No Jsc data with the name "${a.measurementName}"`);let d=b[0].series[0].values;d.forEach(a=>{let b=new Date(a[0]),d=(b.getTime()-this.offset)/1e3/3600;c.append(d,a[1]);}), this.data.jsc=c;})}async getTrackData(a=this.props){if(!a.measurementName)return;var b=a.db.db;let c=a.config.jv||[];await query(`SELECT time,efficiency FROM "${encodeURIComponent(a.measurementName)}" ORDER BY time ASC limit 1; SELECT time,efficiency FROM "${encodeURIComponent(a.measurementName)}" ORDER BY time DESC limit 1;`,b,a.db).then(async d=>{var e=Math.max,f=Math.round;if(!d[0].series)throw'No measurement with the name '+a.measurementName+' or no associated data';let g=d[0].series[0].values[0][0],h=d[1].series[0].values[0][0],i=(new Date(h)-new Date(g))/1e3,j=e(1,f(i/2e3)),k='SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff, MEAN(temperature_base) as tMean2 FROM "'+encodeURIComponent(a.measurementName)+'" WHERE time >= \''+g+'\' and time <= \''+h+'\'  GROUP BY time('+j+'s) FILL(none) ORDER BY time ASC;',l=await query(k,b,a.db).then(a=>{if(!a[0].series)return console.warn('Could not find any information linked to this serie'), void console.warn('Query string: '+k);let b=a[0].series[0].values,c=Graph.newWaveform(),d=Graph.newWaveform(),j=Graph.newWaveform(),l=Graph.newWaveform(),m=Graph.newWaveform(),n=Graph.newWaveform(),o=Graph.newWaveform();c.setUnit('%'), c.setXUnit('h'), d.setXUnit('W'), j.setUnit('V'), l.setUnit('mA cm-2'), m.setUnit('mW cm-2'), n.setUnit('\xB0C'), o.setUnit('%');let p=0,q=0;b.forEach((a,b)=>{var f=Math.abs;let g,h=new Date(a[0]);0==b?(this.offset=h.getTime(), g=0):g=(h.getTime()-this.offset)/1e3/3600, 100>a[1]&&0<a[1]&&c.append(g,a[1]), (!this.props.instrumentId||f(1e3*(a[2]*a[3]))<environment.instrument[this.props.instrumentId].voltageRange*environment.instrument[this.props.instrumentId].fsr)&&d.append(g,a[2]*a[3]), (!this.props.instrumentId||f(a[2])<environment.instrument[this.props.instrumentId].voltageRange)&&j.append(g,a[2]), (!this.props.instrumentId||f(1e3*a[3])<environment.instrument[this.props.instrumentId].fsr)&&l.append(g,a[3]), m.append(g,a[5]), 100>=a[4]&&0<=a[4]&&o.append(g,a[4]), null===a[6]?null!==a[8]&&n.append(g,a[8]):n.append(g,a[6]), p=e(p,a[7]);}), q=b[b.length-1][7], this.data.pce=c, this.data.power=d, this.data.voltage=j, this.data.current=l, this.data.ff=Graph.newWaveform(), this.data.light=m, this.data.temperature=n, this.data.humidity=o, this.data.maxEfficiency=f(100*p)/100, this.data.finalEfficiency=f(100*q)/100, this.data.ellapsed=f(10*i/3600)/10, this.data.start_date=new Date(g), this.data.end_date=new Date(h);}),m=1e6*new Date(g).getTime();this.data.timeEfficiencies=await query(`
				SELECT efficiency FROM "${encodeURIComponent(a.measurementName)}" WHERE time > ${m+3600000000000} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${encodeURIComponent(a.measurementName)}" WHERE time > ${m+86400000000000} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${encodeURIComponent(a.measurementName)}" WHERE time > ${m+360000000000000} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${encodeURIComponent(a.measurementName)}" WHERE time > ${m+1800000000000000} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${encodeURIComponent(a.measurementName)}" WHERE time > ${m+3600000000000000} ORDER BY time ASC LIMIT 1;
			`,b,a.db).then(a=>a.map(a=>a.series?f(100*a.series[0].values[0][1])/100:void 0));let n=c.map(b=>`SELECT * FROM "${encodeURIComponent(a.measurementName)}_iv" WHERE time='${b}'`).join(';');this.data.jv=0<n.length?await query(n,b,a.db).then(a=>a.map(a=>{if(a.series){let d=a.series[0].values[0][1].replace('"','').split(','),e=Graph.newWaveform();for(var b=0;b<d.length;b+=2)e.append(parseFloat(d[b]),parseFloat(d[b+1]));var c=e.duplicate().math((a,b)=>a*b);return{time:a.series[0].values[0][0],ellapsed:f(10*((new Date(a.series[0].values[0][0])-new Date(g))/1e3/3600))/10,waveform:e,waveInfo:getIVParameters(e,c,parseFloat(this.props.cellInfo.cellArea),1e3*a.series[0].values[0][2],!0)}}})):[];});}render(){this.jvDom=[];let a,b=0;try{a=this.state.data.jv.length/9;}catch(b){a=1;}return 1>a&&(a=0), console.log(a), React.createElement('div',{ref:a=>this.dom=a,className:'container-fluid'},React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-4'},React.createElement('div',{className:'logos'},React.createElement('img',{src:'images/logo_client.png',width:'120'}),React.createElement('div',{className:'pull-right'},React.createElement('img',{src:'images/logo.png',width:'120'}))),React.createElement('h3',null,'Device name: \xA0',React.createElement('strong',null,this.props.cellInfo.cellName)),React.createElement('h4',null,'Timing'),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Start date: '),React.createElement('div',{className:'col-xs-5 info'},!!this.state.data&&!!this.state.data.start_date&&toDate(this.state.data.start_date))),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'End date: '),React.createElement('div',{className:'col-xs-5 info'},!!this.state.data&&!!this.state.data.end_date&&toDate(this.state.data.end_date))),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Ageing time: '),React.createElement('div',{className:'col-xs-5 info'},!!this.state.data&&!!this.state.data.ellapsed&&this.state.data.ellapsed,' hours')),React.createElement('h4',null,'Device parameters'),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Cell active area: '),React.createElement('div',{className:'col-xs-5 info'},this.props.cellInfo.cellArea,' cm',React.createElement('sup',null,'2'))),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Comment: '),React.createElement('div',{className:'col-xs-5'},this.props.config.comment)),React.createElement('h4',null,'Power conversion efficiencies (MPP)'),React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Highest efficiency: '),React.createElement('div',{className:'col-xs-5 info'},!!this.state.data&&this.state.data.maxEfficiency,'%')),!!this.state.data&&!!this.state.data.timeEfficiencies&&[this.state.data.timeEfficiencies[0]?React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Efficiency after 1h:'),React.createElement('div',{className:'col-xs-5 info'},this.state.data.timeEfficiencies[0],'%')):'',this.state.data.timeEfficiencies[1]?React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Efficiency after 24h:'),React.createElement('div',{className:'col-xs-5 info'},this.state.data.timeEfficiencies[1],'%')):'',this.state.data.timeEfficiencies[2]?React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Efficiency after 100h:'),React.createElement('div',{className:'col-xs-5 info'},this.state.data.timeEfficiencies[2],'%')):'',this.state.data.timeEfficiencies[3]?React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Efficiency after 500h:'),React.createElement('div',{className:'col-xs-5 info'},this.state.data.timeEfficiencies[3],'%')):'',this.state.data.timeEfficiencies[4]?React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Efficiency after 1\'000h:'),React.createElement('div',{className:'col-xs-5 info'},this.state.data.timeEfficiencies[4],'%')):''],React.createElement('div',{className:'row'},React.createElement('div',{className:'col-xs-3'},'Final efficiency: '),React.createElement('div',{className:'col-xs-5 info'},!!this.state.data&&this.state.data.finalEfficiency,'%')),React.createElement('h4',null,'j-V sweeps'),React.createElement('div',{id:'ivTable'},React.createElement('div',{className:'row ivData',id:'ivHead'},React.createElement('div',{className:'col-xs-3'},'Time',React.createElement('br',null),React.createElement('nobr',null,'(h)')),React.createElement('div',{className:'col-xs-1'},'V',React.createElement('sub',null,'oc'),React.createElement('br',null),React.createElement('nobr',null,'(V)')),React.createElement('div',{className:'col-xs-1'},'J',React.createElement('sub',null,'sc'),React.createElement('br',null),React.createElement('nobr',null,'(mA cm',React.createElement('sup',null,'-2'),')')),React.createElement('div',{className:'col-xs-1'},'P',React.createElement('sub',null,'out'),React.createElement('br',null),React.createElement('nobr',null,'(mW cm',React.createElement('sup',null,'-2'),')')),React.createElement('div',{className:'col-xs-1'},'P',React.createElement('sub',null,'in'),React.createElement('br',null),React.createElement('nobr',null,'(mW cm',React.createElement('sup',null,'-2'),')')),React.createElement('div',{className:'col-xs-1'},'Fill factor',React.createElement('br',null),React.createElement('nobr',null,'(%)')),React.createElement('div',{className:'col-xs-1'},'PCE',React.createElement('br',null),React.createElement('nobr',null,'(%)'))),!!this.state.data&&!!this.state.data.jv&&this.state.data.jv.map((c,d)=>!b||d-b>=a?(b+=a, React.createElement('div',{className:'row ivData',ref:a=>this.jvDom[d]=a},React.createElement('div',{className:'col-xs-3'},c.ellapsed,' h'),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.voc)?'N/A':c.waveInfo.voc.toPrecision(3)),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.jsc)?'N/A':c.waveInfo.jsc.toPrecision(3)),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.power)?'N/A':c.waveInfo.power.toPrecision(3)),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.powerin)?'N/A':(c.waveInfo.powerin/10).toPrecision(3)),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.ff)?'N/A':c.waveInfo.ff.toPrecision(2)),React.createElement('div',{className:'col-xs-1'},isNaN(c.waveInfo.pce)?'N/A':c.waveInfo.pce.toPrecision(3)))):null)),React.createElement('div',{ref:a=>this.domJV=a})),React.createElement('div',{className:'col-xs-5'},React.createElement('div',{id:'graph',ref:a=>this.domGraph=a}))),React.createElement('div',{className:'row footer'},React.createElement('div',{className:'pull-right'},'Generated on : ',new Date().toString(),' '),'\xA9 Candlelight systems ltd.'))}}

const {ipcRenderer: ipcRenderer$1}=require('electron');let data={cellInfo:{}}; let config={};ipcRenderer$1.on('loadData',(a,b)=>{data=b, render();}), ipcRenderer$1.on('config',(a,b)=>{config=b, render();});function render(){ReactDOM.render(React.createElement(HTMLReport,{instrumentId:data.instrumentId,config:config,db:data.db,measurementName:data.measurementName,cellInfo:data.cellInfo,chanId:data.chanId}),document.getElementById('root'));}

//# sourceMappingURL=htmlreport.js.map