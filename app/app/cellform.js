'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));

var statuses={light:{version:"2.0",readonly:!1},heat:{version:"ssr_1.0",switch:!1}};var instrument={"Small cells":{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:30,LSB:1.22,LSBValue:1,voltageRange:2.5,autoZero:"device",groups:{"Slot Left":{resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}},"Slot Right":{resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}},"Modules A":{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:400,LSB:4.88,LSBValue:1,voltageRange:10,autoZero:"device",groups:{"Module 1":{manualLightIntensity:!0,resettable:!1,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}},"Module 2":{resettable:!1,manualLightIntensity:!0,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}},"Modules B":{ADC:{model:"ADS1259"},changeSpeed:!1,fsr:400,LSB:4.88,LSBValue:1,voltageRange:10,autoZero:"device",groups:{"Module 3":{resettable:!1,manualLightIntensity:!0,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}},"Module 4":{resettable:!1,manualLightIntensity:!0,displayDeviceInformation:{time_ellapsed:!0,pce:!0,power:!1,sun:!0,voc:!0,jsc:!0,ff:!0,vnow:!0,jnow:!0,temperature:!0,humidity:!0,kwh_yr:!1}}}}};var environment = {ageing:!0,statuses:statuses,instrument:instrument};

class CellFormTracking extends React.Component{constructor(a){super(a), this.handleInputChange=this.handleInputChange.bind(this);}handleInputChange(a){const b=a.target,c='checkbox'===b.type?b.checked:b.value,d=b.name;this.props.onFormChange(d,c);}componentDidUpdate(){}render(){!!this.props.enable&&0<this.props.tracking_mode;const a=environment.instrument[this.props.instrumentConfig.instrumentId].LSB||1.22,b=environment.instrument[this.props.instrumentConfig.instrumentId].LSBValue||.001;let c=[];switch(environment.instrument[this.props.instrumentConfig.instrumentId].ADC.model){case'ADS1259':c=[[0,1/8],[1,1/4],[2,1/2],[3,1],[4,2],[5,4],[6,8],[7,16],[8,32],[9,64],[10,128]];break;case'ADS1147':c=[[1,1],[2,2],[4,4],[8,8],[16,16],[32,32],[64,64],[128,128]];}return c=c.map(([a,b],c)=>React.createElement('option',{key:c,value:a},'+/- ',parseFloat((environment.instrument[this.props.instrumentConfig.instrumentId].fsr/b).toPrecision(2)),' mA')), c.unshift(React.createElement('option',{key:'auto',value:'-1'},'Auto')), React.createElement('div',null,React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_mode',className:'col-sm-3'},'Tracking mode'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_mode',id:'tracking_mode',className:'form-control',value:this.props.tracking_mode,onChange:this.handleInputChange},React.createElement('option',{key:'0',value:'0'},'No tracking'),React.createElement('option',{key:'1',value:'1'},'Maximum power point'),React.createElement('option',{key:'2',value:'2'},'Open circuit voltage'),React.createElement('option',{key:'3',value:'3'},'Short circuit current'),React.createElement('option',{key:'4',value:'4'},'Constant voltage')))),4==this.props.tracking_mode?React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_mode',className:'col-sm-3'},'Voltage'),React.createElement('div',{className:'col-sm-9'},React.createElement('input',{type:'number',min:-environment.instrument[this.props.instrumentConfig.instrumentId].voltageRange,max:+environment.instrument[this.props.instrumentConfig.instrumentId].voltageRange,className:'form-control',name:'tracking_voltage',value:this.props.tracking_voltage,onChange:this.handleInputChange}))):null,React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_step',className:'col-sm-3'},'Tracking step'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_stepsize',id:'tracking_stepsize',className:'form-control',value:this.props.tracking_step,onChange:this.handleInputChange},React.createElement('option',{key:'mv1',value:1*b},1*a,' mV'),React.createElement('option',{key:'mv2',value:2*b},2*a,' mV'),React.createElement('option',{key:'mv3',value:3*b},3*a,' mV'),React.createElement('option',{key:'mv4',value:4*b},4*a,' mV'),React.createElement('option',{key:'mv5',value:5*b},5*a,' mV')))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_interval',className:'col-sm-3'},'Sampling rate'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_interval',id:'tracking_interval',className:'form-control',value:this.props.tracking_interval,onChange:this.handleInputChange},React.createElement('option',{key:'0sps',value:'0'},'As fast as possible'),React.createElement('option',{key:'100sps',value:'100'},'10 samples per second'),React.createElement('option',{key:'1000sps',value:'1000'},'1 sample per second'),React.createElement('option',{key:'10000sps',value:'10000'},'6 samples per minute'),React.createElement('option',{key:'60000sps',value:'60000'},'1 sample per minute'),React.createElement('option',{key:'600000sps',value:'600000'},'6 samples per hour'),React.createElement('option',{key:'3600000sps',value:'3600000'},'1 sample per hour'))),React.createElement('div',{className:'help-block col-sm-9'},'The number of points per second sampled by the tracking algorithm. This value is not guaranteed. It depends on the aquistion speed and the number of channels enabled.')),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_fwbwthreshold',className:'col-sm-3'},'Forward to backward threshold'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_fwbwthreshold',id:'tracking_fwbwthreshold',className:'form-control',value:this.props.tracking_fwbwthreshold,onChange:this.handleInputChange},React.createElement('option',{key:'0',value:'0'},'0%'),React.createElement('option',{key:'0.0004',value:'0.0004'},'0.04%'),React.createElement('option',{key:'0.0008',value:'0.0008'},'0.08%'),React.createElement('option',{key:'0.0016',value:'0.0016'},'0.16%'),React.createElement('option',{key:'0.0032',value:'0.0032'},'0.32%'),React.createElement('option',{key:'0.0064',value:'0.0064'},'0.64%'),React.createElement('option',{key:'0.0128',value:'0.0128'},'1.3%'),React.createElement('option',{key:'0.0256',value:'0.0256'},'2.6%'),React.createElement('option',{key:'0.0512',value:'0.0512'},'5.1%'),React.createElement('option',{key:'0.1024',value:'0.1024'},'10.2%'),React.createElement('option',{key:'0.2048',value:'0.2048'},'20.4%')))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_bwfwthreshold',className:'col-sm-3'},'Backward to forward threshold'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_bwfwthreshold',id:'tracking_bwfwthreshold',className:'form-control',value:this.props.tracking_bwfwthreshold,onChange:this.handleInputChange},React.createElement('option',{value:'0'},'0%'),React.createElement('option',{value:'0.0004'},'0.04%'),React.createElement('option',{value:'0.0008'},'0.08%'),React.createElement('option',{value:'0.0016'},'0.16%'),React.createElement('option',{value:'0.0032'},'0.32%'),React.createElement('option',{value:'0.0064'},'0.64%'),React.createElement('option',{value:'0.0128'},'1.3%'),React.createElement('option',{value:'0.0256'},'2.6%'),React.createElement('option',{value:'0.0512'},'5.1%'),React.createElement('option',{value:'0.1024'},'10.2%'),React.createElement('option',{value:'0.2048'},'20.4%')))),1==!!this.props.tracking_mode&&React.createElement('div',null,React.createElement('div',{className:'form-group row'},React.createElement('div',null,React.createElement('label',{className:'col-sm-9'},React.createElement('input',{type:'checkbox',name:'tracking_measure_voc',checked:!!this.props.tracking_measure_voc,onChange:this.handleInputChange}),' Measure V',React.createElement('sub',null,'oc'),' periodically'))),!!this.props.tracking_measure_voc&&React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_measure_voc_interval',className:'col-sm-3'},'Measure every'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_measure_voc_interval',id:'tracking_measure_voc_interval',className:'form-control',value:this.props.tracking_measure_voc_interval,onChange:this.handleInputChange},React.createElement('option',{value:'60000'},'Every minute'),React.createElement('option',{value:'600000'},'Every 10 minutes'),React.createElement('option',{value:'3600000'},'Every hour'),React.createElement('option',{value:'10800000'},'Every 3 hours'),React.createElement('option',{value:'43200000'},'Every 12 hours'),React.createElement('option',{value:'86400000'},'Every day'),React.createElement('option',{value:'604800000'},'Every week')))),React.createElement('div',{className:'form-group row'},React.createElement('div',null,React.createElement('label',{className:'col-sm-9'},React.createElement('input',{type:'checkbox',name:'tracking_measure_jsc',checked:!!this.props.tracking_measure_jsc,onChange:this.handleInputChange}),' Measure J',React.createElement('sub',null,'sc'),' periodically'))),!!this.props.tracking_measure_jsc&&React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_measure_jsc_interval',className:'col-sm-3'},'Measure every'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_measure_jsc_interval',id:'tracking_measure_jsc_interval',className:'form-control',value:this.props.tracking_measure_jsc_interval,onChange:this.handleInputChange},React.createElement('option',{value:'60000'},'Every minute'),React.createElement('option',{value:'600000'},'Every 10 minutes'),React.createElement('option',{value:'3600000'},'Every hour'),React.createElement('option',{value:'10800000'},'Every 3 hours'),React.createElement('option',{value:'43200000'},'Every 12 hours'),React.createElement('option',{value:'86400000'},'Every day'),React.createElement('option',{value:'604800000'},'Every week'))))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'tracking_record_interval',className:'col-sm-3'},'Recording rate'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'tracking_record_interval',id:'tracking_record_interval',className:'form-control',value:this.props.tracking_record_interval,onChange:this.handleInputChange},React.createElement('option',{key:'1000sps_record',value:'1000'},'1 point per second'),React.createElement('option',{key:'10000sps_record',value:'10000'},'6 points per minute'),React.createElement('option',{key:'60000sps_record',value:'60000'},'1 point per minute'),React.createElement('option',{key:'600000sps_record',value:'600000'},'6 points per hour'),React.createElement('option',{key:'3600000sps_record',value:'3600000'},'1 point per hour'))),React.createElement('div',{className:'help-block col-sm-9'},'The number of points per second recorded into the database.')))}}

class CellFormTracking$2 extends React.Component{constructor(a){super(a), this.handleInputChange=this.handleInputChange.bind(this);}handleInputChange(a){const b=a.target,c='checkbox'===b.type?b.checked:b.value,d=b.name;this.props.onFormChange(d,c);}componentDidUpdate(){}render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Starting voltage'),React.createElement('div',{className:'col-sm-9'},React.createElement('div',{className:'input-group'},React.createElement('span',{className:'input-group-addon'},React.createElement('label',null,React.createElement('input',{type:'checkbox',name:'iv_autostart',id:'iv_autostart',onClick:this.handleInputChange,checked:!!this.props.iv_autostart}),'\xA0V',React.createElement('sub',null,'oc'))),React.createElement('input',{type:'number',min:'-2.5',max:'2.5',step:'0.001',name:'iv_start',id:'iv_start',disabled:!!this.props.iv_autostart,className:'form-control',placeholder:'1',value:this.props.iv_start,onChange:this.handleInputChange}),React.createElement('span',{className:'input-group-addon'},'V')),React.createElement('div',{className:'help-block'},'Click on "Voc" for an auto-start voltage value of the j-V curve. The Voc will be determined and the j-V curve will start at (Voc + 20mV).'))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Ending voltage'),React.createElement('div',{className:'col-sm-9'},React.createElement('div',{className:'input-group'},React.createElement('input',{type:'number',min:'-2.5',max:'2.5',step:'0.001',name:'iv_stop',id:'iv_stop',className:'form-control',placeholder:'1',value:this.props.iv_stop,onChange:this.handleInputChange}),React.createElement('span',{className:'input-group-addon'},'V')),React.createElement('div',{className:'help-block'},'We recommend stopping the sweep slightly below 0V (e.g. -0.1V) to allow a Jsc determination.'))),React.createElement('div',{className:'form-group'},React.createElement('label',{className:'col-sm-3'},'Sweep rate'),React.createElement('div',{className:'col-sm-9'},React.createElement('div',{className:'input-group'},React.createElement('input',{type:'number',min:'0.0005',max:'0.1',step:'0.0001',name:'iv_rate',id:'iv_rate',className:'form-control',placeholder:'0.01',value:this.props.iv_rate,onChange:this.handleInputChange}),React.createElement('span',{className:'input-group-addon'},'V/s')))),React.createElement('div',{className:'form-group row'},React.createElement('div',null,React.createElement('label',{className:'col-sm-9'},React.createElement('input',{type:'checkbox',name:'iv_hysteresis',checked:!!this.props.iv_hysteresis,onChange:this.handleInputChange}),' Scan in both directions'))),React.createElement('h3',null,'Measurement intervals'),React.createElement('div',{className:'form-group row'},React.createElement('div',null,React.createElement('label',{className:'col-sm-9'},React.createElement('input',{value:'fixed',type:'radio',name:'iv_measurement_interval_type',checked:'fixed'==this.props.iv_measurement_interval_type,onChange:this.handleInputChange}),' Measure at fixed intervals'))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'iv_interval',className:'col-sm-3'},'Measurement interval'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{disabled:'auto'==this.props.iv_measurement_interval_type,name:'iv_interval',id:'iv_interval',className:'form-control',value:this.props.iv_interval,onChange:this.handleInputChange},React.createElement('option',{value:'60000'},'Every minute'),React.createElement('option',{value:'600000'},'Every 10 minutes'),React.createElement('option',{value:'3600000'},'Every hour'),React.createElement('option',{value:'10800000'},'Every 3 hours'),React.createElement('option',{value:'43200000'},'Every 12 hours'),React.createElement('option',{value:'86400000'},'Every day'),React.createElement('option',{value:'604800000'},'Every week')))),React.createElement('div',{className:'form-group row'},React.createElement('div',null,React.createElement('label',{className:'col-sm-9'},React.createElement('input',{type:'radio',value:'auto',name:'iv_measurement_interval_type',checked:'auto'==this.props.iv_measurement_interval_type,onChange:this.handleInputChange}),' Automatic intervals'))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'iv_interval',className:'col-sm-3'},'Measure upon efficiency drop'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{name:'iv_measurement_interval_auto_pdrop',id:'iv_measurement_interval_auto_pdrop',className:'form-control',value:this.props.iv_measurement_interval_auto_pdrop,onChange:this.handleInputChange},React.createElement('option',{value:'0.25'},'0.25%'),React.createElement('option',{value:'0.5'},'0.5%'),React.createElement('option',{value:'1'},'1%'),React.createElement('option',{value:'2'},'2%'),React.createElement('option',{value:'3'},'3%')),React.createElement('div',{className:'help-block'},'A j-V curve measurement will be triggered when the PCE of the device changes by X percentage point. Only works with MPP tracking.'))),React.createElement('div',{className:'col-sm-9'},React.createElement('div',{className:'help-block'},React.createElement('small',null,'The following intervals are checked for each tracking point that is recorded (see the "record interval" in the "Tracking" tab.) For example, if the recording interval is set to 1 point every 10 minutes, setting the minimum interval to 1 minute will have the same effect as setting it to every 10 minutes.'))),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'iv_interval',className:'col-sm-3'},'With a minimum interval of'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{disabled:'fixed'==this.props.iv_measurement_interval_type,name:'iv_measurement_interval_auto_minTime',id:'iv_measurement_interval_auto_minTime',className:'form-control',value:this.props.iv_interval,onChange:this.handleInputChange},React.createElement('option',{value:'60000'},'1 minute'),React.createElement('option',{value:'600000'},'10 minutes'),React.createElement('option',{value:'3600000'},'1 hour'),React.createElement('option',{value:'10800000'},'3 hours'),React.createElement('option',{value:'43200000'},'12 hours'),React.createElement('option',{value:'86400000'},'1 day'),React.createElement('option',{value:'604800000'},'1 week'))),React.createElement('div',{className:'help-block'},'Sets a minimum interval under which the j-V curve will not be measured, even if the PCE has changed above the threshold.')),React.createElement('div',{className:'form-group'},React.createElement('label',{htmlFor:'iv_interval',className:'col-sm-3'},'With a maximum interval of'),React.createElement('div',{className:'col-sm-9'},React.createElement('select',{disabled:'fixed'==this.props.iv_measurement_interval_type,name:'iv_measurement_interval_auto_maxTime',id:'iv_measurement_interval_auto_maxTime',className:'form-control',value:this.props.iv_interval,onChange:this.handleInputChange},React.createElement('option',{value:'600000'},'10 minutes'),React.createElement('option',{value:'3600000'},'1 hour'),React.createElement('option',{value:'10800000'},'3 hours'),React.createElement('option',{value:'43200000'},'12 hours'),React.createElement('option',{value:'86400000'},'1 day'),React.createElement('option',{value:'604800000'},'1 week'),React.createElement('option',{value:'-1'},'Never'))),React.createElement('div',{className:'help-block'},'Sets a maximum time interval. Even if the power hasn\'t changed above the threshold, the j-V curve will be measured at this interval.')))}}

var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c], b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};class CellForm extends React.Component{constructor(a){super(a), this.handleInputChange=this.handleInputChange.bind(this), this.subFormChanged=this.subFormChanged.bind(this), this.validateConfig=this.validateConfig.bind(this), this.state={cellArea:0,cellName:"",connection:"group",lightSource:"pd_pyr",correctionFactor_type:"factory",correctionFactor_value:1}, this.close=this.close.bind(this);}validateConfig(){this.props.onValidate(this.state), this.close();}close(){this.props.onClose();}subFormChanged(a,b){this.setState({[a]:b});}handleInputChange(a){const b=a.target,c="checkbox"===b.type?b.checked:b.value,d=b.name;this.setState({[d]:c});}componentDidMount(){$("a",this.tabs).click(function(a){a.preventDefault(), $(this).tab("show");}), this.setState(this.props.formState), this.setState({lightSource:0<this.props.formState.lightRefValue?"manual":"pd_pyr"});}componentWillReceiveProps(a){this.setState(a.formState), this.setState({lightSource:0<a.formState.lightRefValue?"manual":"pd_pyr"});}render(){let a=!!this.state.enable&&0<this.state.tracking_mode,b=this.props.instrumentConfig.groups,c=!1,d=environment.instrument[this.props.instrumentConfig.instrumentId].groups[this.props.groupName].manualLightIntensity,e="N/A";for(var f=0;f<b.length;f++)if(b[f].groupName==this.props.groupName){c=b[f].dualOutput||b[f].relayController;for(var g=0;g<b[f].channels.length;g++)b[f].channels[g].chanId==this.props.formState.chanId&&(e=b[f].channels[g].correctionFactor);}return React.createElement("div",{className:"container-fluid"},React.createElement("form",{onSubmit:this.submit,className:"form-horizontal"},React.createElement("ul",{className:"nav nav-tabs formTabs",ref:a=>this.tabs=a},React.createElement("li",{role:"presentation",className:"active"},React.createElement("a",{"data-target":"#cell_"+this.state.unique,"data-toggle":"tab"},"Cell configuration")),React.createElement("li",{role:"presentation"},React.createElement("a",{"data-target":"#tracker_"+this.state.unique,"data-toggle":"tab"},"Tracker")),React.createElement("li",{role:"presentation"},React.createElement("a",{"data-target":"#iv_"+this.state.unique,"data-toggle":"tab"},"j(V) curves"))),React.createElement("div",{className:"tab-content"},React.createElement("div",{className:"tab-pane active",id:"cell_"+this.state.unique},React.createElement("div",{className:"form-group"},React.createElement("label",{className:"col-sm-3"},"Device name"),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"text",name:"cellName",id:"cellName",className:"form-control",placeholder:"Device name",disabled:a,value:this.state.cellName,onChange:this.handleInputChange}),a?React.createElement("div",{className:"help-block"},"The device name cannot be changed once the device is in active mode"):null)),React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"cellarea",className:"col-sm-3"},"Active area"),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"input-group"},React.createElement("input",{type:"number",step:"0.01",disabled:a,name:"cellArea",id:"cellArea",className:"form-control col-sm-9",placeholder:"Cell area",value:this.state.cellArea,onChange:this.handleInputChange}),React.createElement("span",{className:"input-group-addon"},"cm",React.createElement("sup",null,"2"))),a?React.createElement("div",{className:"help-block"},"The area cannot be changed once the device is in active mode"):null)),c&&React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"cellarea",className:"col-sm-3"},"Connection"),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"connection",value:"group",onClick:this.handleInputChange,checked:"group"==this.state.connection})," Cell enclosure")),React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"connection",value:"external",onClick:this.handleInputChange,checked:"external"==this.state.connection})," External connection")))),d&&React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"cellarea",className:"col-sm-3"},"Light source"),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"lightSource",value:"pd_pyr",onClick:this.handleInputChange,checked:"pd_pyr"==this.state.lightSource})," Photodiode / Pyranometer")),React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"lightSource",value:"manual",onClick:this.handleInputChange,checked:"manual"==this.state.lightSource})," Manual value")))),"external"==this.state.connection||"manual"==this.state.lightSource?React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"cellarea",className:"col-sm-3"},"Light intensity"),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"input-group"},React.createElement("input",{type:"number",className:"form-control",name:"lightRefValue",value:this.state.lightRefValue,onChange:this.handleInputChange}),React.createElement("span",{className:"input-group-addon"},"W m",React.createElement("sup",null,"-2"))))):React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"cellarea",className:"col-sm-3"},"Correction factor"),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"correctionFactor_type",value:"factory",onClick:this.handleInputChange,checked:"factory"==this.state.correctionFactor_type})," Factory settings (",e,")")),React.createElement("div",{className:"radio"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"correctionFactor_type",value:"manual",onClick:this.handleInputChange,checked:"manual"==this.state.correctionFactor_type})," Manual value ",React.createElement("input",{type:"text",className:"form-control",disabled:"factory"==this.state.correctionFactor_type,name:"correctionFactor_value",onChange:this.handleInputChange,value:this.state.correctionFactor_value}))),React.createElement("div",{className:"help-block"},"Correction factor to the sun intensity. Use it to account for the geometrical uniformity of the light source, such as the edge effects. The correction goes as effective_sun = measured_sun / correction_factor.")))),React.createElement("div",{className:"tab-pane",id:"tracker_"+this.state.unique},React.createElement(CellFormTracking,_extends({},this.props,this.state,{onFormChange:this.subFormChanged}))),React.createElement("div",{className:"tab-pane",id:"iv_"+this.state.unique},React.createElement(CellFormTracking$2,_extends({},this.state,{onFormChange:this.subFormChanged}))))),React.createElement("div",{className:"btn-group pull-right"},React.createElement("button",{type:"button",className:"btn btn-default",name:"update",onClick:this.close},"Close"),React.createElement("button",{type:"button",className:"btn btn-primary",name:"update",onClick:this.validateConfig},"Update channel")))}}

const {ipcRenderer}=require('electron');ipcRenderer.on('loadForm',(a,b)=>{render(b);});function onValidate(a){ipcRenderer.send('validateForm',a);}function onClose(){ipcRenderer.send('closeForm');}function render(a){ReactDOM.render(React.createElement(CellForm,{instrumentConfig:a.instrumentConfig,groupName:a.groupName,formState:a.channelState,onValidate:onValidate,onClose:onClose}),document.getElementById('root'));}

//# sourceMappingURL=cellform.js.map