/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_jsx__ = __webpack_require__(5);



const { ipcRenderer } = __webpack_require__(1);

let data = {
	cellInfo: {}
};
let config = {};

ipcRenderer.on("loadData", (event, dta) => {
	data = dta;
	render();
});

ipcRenderer.on("config", (event, cfg) => {
	config = cfg;
	render();
});

function render() {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_jsx__["a" /* default */], { config: config, db: data.db, measurementName: data.measurementName, cellInfo: data.cellInfo, chanId: data.chanId }), document.getElementById('root'));
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__influx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_util_iv__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_electron__);






const colors = {
	'pce': '#ae1826',
	'power': '#2618ae',
	'voltage': '#18ae77',
	'current': '#d59a1c',
	'jsc': '#9017c3',
	'voc': '#1770c3',
	'ff': '#719f40',
	'humidity': '#5ca1b2',
	'temperature': '#b44736',
	'light': '#8a9609'
};

const pageHeight = 745; //window.pageY;

const graphsCfg = [{
	graphRef: 'graph_pce',
	type: 'pce'
}, {
	graphRef: 'graph_power',
	type: 'power'
}, {
	graphRef: 'graph_current',
	type: 'current'
}, {
	graphRef: 'graph_voltage',
	type: 'voltage'
}, {
	graphRef: 'graph_jsc',
	type: 'jsc'
}, {
	graphRef: 'graph_voc',
	type: 'voc'
}, {
	graphRef: 'graph_light',
	type: 'light'
}, {
	graphRef: 'graph_temperature',
	type: 'temperature'
}, {
	graphRef: 'graph_humidity',
	type: 'humidity'
}];

const possibleGraphs = {
	pce: { name: 'pce', label: "Power conversion efficiency" },
	power: { name: 'power', label: "Power output" },
	current: { name: 'current', label: "Current output" },
	voltage: { name: 'voltage', label: "Voltage output" },
	jsc: { name: 'jsc', label: "Short circuit current" },
	voc: { name: 'voc', label: "Open circuit voltage" },
	light: { name: 'light', label: "Light intensity" },
	temperature: { name: 'temperature', label: "Temperature" },
	humidity: { name: 'humidity', label: "Humidity" }
};

const toDate = date => {

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const pad = val => {
		if (val < 10) {
			return '0' + val;
		}
		return val;
	};
	return date.getDate() + " " + months[date.getMonth()] + "." + date.getFullYear() + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
};

class HTMLReport extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.graphs = {};
		this.graphsRefs = {};
	}

	close() {
		this.props.onClose();
	}

	componentWillUnmount() {
		__WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].removeListener("savePDF", this.savePDF);
	}

	/*********************/
	/** PCE **************/
	/*********************/

	makePCEGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Power conversion efficiency (PCE)");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("PCE").setUnit("%").setUnitWrapper("(", ")").forceMin(0).setLineAt([0]);

		return g;
	}

	updatePCEGraph(graph) {

		if (!this.data.pce) {
			return;
		}

		graph.newSerie("efficiency").setLabel("PCE").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.pce);

		this.redrawGraph(graph);
	}

	/*********************/
	/** POWER ************/
	/*********************/

	makePowerGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Power output");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Power output").setUnit("W").setUnitDecade(true).setUnitWrapper("(", ")").forceMin(0).setLineAt([0]);

		return g;
	}

	updatePowerGraph(graph) {

		if (!this.data.power) {
			return;
		}

		graph.newSerie("power").setLabel("Power").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.power);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Jsc **************/
	/*********************/

	makeJscGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Short circuit current");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Jsc").setUnit("mA cm^-2").setUnitWrapper("(", ")");

		return g;
	}

	updateJscGraph(graph) {

		if (!this.data.jsc) {
			return;
		}

		graph.newSerie("jsc").setLabel("Jsc").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.jsc);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Voc **************/
	/*********************/

	makeVocGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Open circuit voltage");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Voc").setUnit("V").setUnitWrapper("(", ")");

		return g;
	}

	updateVocGraph(graph) {

		if (!this.data.voc) {
			return;
		}

		graph.newSerie("voc").setLabel("Voc").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.voc);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Voltage **********/
	/*********************/

	makeVoltageGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Voltage");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Voltage").setUnit("V").setUnitWrapper("(", ")");

		return g;
	}

	updateVoltageGraph(graph) {

		if (!this.data.voltage) {
			return;
		}

		graph.newSerie("voltage").setLabel("Voltage").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.voltage);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Current **********/
	/*********************/

	makeCurrentGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Current");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Current").setUnit("mA cm^-2").setUnitWrapper("(", ")");

		return g;
	}

	updateCurrentGraph(graph) {

		if (!this.data.current) {
			return;
		}

		graph.newSerie("current").setLabel("Current").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.current);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Light ************/
	/*********************/

	makeLightGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Light intensity");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Light intensity").setUnit("W m^-2").setUnitWrapper("(", ")");

		return g;
	}

	updateLightGraph(graph) {

		if (!this.data.light) {
			return;
		}

		graph.newSerie("light").setLabel("Light intensity").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.light);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Temperature ******/
	/*********************/

	makeTemperatureGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Temperature");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Temperature").setUnit("°C").setUnitWrapper("(", ")");

		return g;
	}

	updateTemperatureGraph(graph) {

		if (!this.data.temperature) {
			return;
		}

		graph.newSerie("temperature").setLabel("Temperature").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.temperature);

		this.redrawGraph(graph);
	}

	/*********************/
	/** Humidity *********/
	/*********************/

	makeHumidityGraph(dom) {

		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(dom);
		g.setTitle("Humidity");

		this.graph_cfg_setBottomAxisTime(g);
		this.graph_cfg_general(g);

		g.getLeftAxis(0).setLabel("Humidity").setUnit("%").setUnitWrapper("(", ")");

		return g;
	}

	updateHumidityGraph(graph) {

		if (!this.data.humidity) {
			return;
		}

		graph.newSerie("humidity").setLabel("Humidity").autoAxis().setLineColor("#1f1fae").setLineWidth(2).setWaveform(this.data.humidity);

		this.redrawGraph(graph);
	}

	redrawGraph(g) {
		g.autoscaleAxes();
		g.redraw();
	}

	makeGraphs() {

		const axis = [];
		const g = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(this.domGraph, {
			fontSize: 14,
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 10,
			paddingBottom: 0,
			close: false
		});

		g.setWidth(600);
		g.setHeight(pageHeight);

		g.getBottomAxis().setLabel("Time").setUnit("h").setUnitWrapper("(", ")").secondaryGridOff().setNbTicksSecondary(5);

		g.getBottomAxis(1).setLabel("Time").setUnit("h").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(5);

		g.getBottomAxis(2).setLabel("Time").setUnit("h").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(5);

		g.getBottomAxis(3).setLabel("Time").setUnit("h").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(5);

		axis['pce'] = g.getLeftAxis(0).setLabel("PCE").setUnit("%").setColor(colors.pce).setUnitDecade(true).setUnitWrapper("(", ")").setSpan(0.75, 1).forceMin(0).setLineAt([0]);

		g.getBottomAxis(1).setFloating(axis.pce, 0);

		axis['power'] = g.getLeftAxis(1).setLabel("Power output").setUnit("W").gridsOff().setColor(colors.power).setScientific(true).setUnitDecade(true).setUnitWrapper("(", ")").setSpan(0.5, 0.7).forceMin(0).setLineAt([0]);

		g.getBottomAxis(2).setFloating(axis.power, 0);

		axis['j'] = g.getRightAxis(0).setLabel("Current density").setUnit("A cm^-2").gridsOff().setScientific(true).setUnitDecade(true).setColor(colors.current).setUnitWrapper("(", ")").setSpan(0.5, 0.7).forceMin(0);

		axis['v'] = g.getRightAxis(1).setLabel("Voltage").setUnit("V").gridsOff().setColor(colors.voltage).setUnitDecade(true).setUnitWrapper("(", ")").setSpan(0.5, 0.7).forceMin(0);

		axis['jsc'] = g.getRightAxis(2).setLabel("Short circuit current").setUnit("A cm^-2").gridsOff().setScientific(true).setUnitDecade(true).setColor(colors.jsc).setUnitWrapper("(", ")").setSpan(0.25, 0.45).forceMin(0);

		axis['voc'] = g.getRightAxis(3).setLabel("Open circuit voltage").setUnit("V").gridsOff().setUnitDecade(true).setColor(colors.voc).setUnitWrapper("(", ")").setSpan(0.25, 0.45).forceMin(0);

		axis['ff'] = g.getLeftAxis(2).setLabel("Fill factor").setUnit("%").gridsOff().setUnitDecade(true).setColor(colors.ff).setUnitWrapper("(", ")").setSpan(0.25, 0.45).forceMin(0);

		g.getBottomAxis(3).setFloating(axis.voc, 0);

		axis['light'] = g.getLeftAxis(3).setLabel("Sun intensity").setUnit("W m^-2").gridsOff().setUnitDecade(true).setColor(colors.light).setUnitWrapper("(", ")").setSpan(0, 0.2).forceMin(0);

		axis['humidity'] = g.getRightAxis(4).setLabel("Humidity").setUnit("%").setColor(colors.humidity).setUnitDecade(true).gridsOff().setUnitWrapper("(", ")").setSpan(0, 0.2).forceMin(0);

		axis['temperature'] = g.getRightAxis(5).setLabel("Temperature").setUnit("°C").setColor(colors.temperature).setUnitDecade(true).gridsOff().setUnitWrapper("(", ")").setSpan(0, 0.2).forceMin(0);

		this.axis = axis;

		return g;

		/*
  		this.graphs['pce'] = this.makePCEGraph( this.graphsRefs[ 'pce' ] );
  		this.graphs['power'] = this.makePowerGraph( this.graphsRefs[ 'power' ] );
  		this.graphs['jscvocff'] = this.makeJscVocFFGraph( this.graphsRefs[ 'jscvocff' ] );
  		this.graphs['lightTH'] = this.makeLightTemperatureHumidityGraph( this.graphsRefs[ g.graphRef ] );
  */
	}

	updateGraphs() {

		const graph = this.graph;

		graph.newSerie("pce").setLabel("PCE").setXAxis(graph.getBottomAxis(1)).setYAxis(this.axis.pce).setLineColor(colors.pce).setLineWidth(2).setWaveform(this.data.pce);

		graph.newSerie("power").setLabel("power").setXAxis(graph.getBottomAxis(2)).setYAxis(this.axis.power).setLineColor(colors.power).setLineWidth(2).setWaveform(this.data.power);

		graph.newSerie("current").setLabel("Current").setXAxis(graph.getBottomAxis(2)).setYAxis(this.axis.j).setLineColor(colors.current).setLineWidth(2).setWaveform(this.data.current);

		graph.newSerie("voltage").setLabel("Voltage").setXAxis(graph.getBottomAxis(2)).setYAxis(this.axis.v).setLineColor(colors.voltage).setLineWidth(2).setWaveform(this.data.voltage);

		graph.newSerie("ff").setLabel("Fill factor").setXAxis(graph.getBottomAxis(3)).setYAxis(this.axis.ff).setLineColor(colors.ff).setLineWidth(2).setWaveform(this.data.ff);

		graph.newSerie("jsc").setLabel("Short circuit current").setXAxis(graph.getBottomAxis(3)).setYAxis(this.axis.jsc).setLineColor(colors.jsc).setLineWidth(2).setWaveform(this.data.jsc);

		graph.newSerie("voc").setLabel("Open circuit voltage").setXAxis(graph.getBottomAxis(3)).setYAxis(this.axis.voc).setLineColor(colors.voc).setLineWidth(2).setWaveform(this.data.voc);

		graph.newSerie("temperature").setLabel("Temperature").autoAxis().setYAxis(this.axis.temperature).setLineColor(colors.temperature).setLineWidth(2).setWaveform(this.data.temperature);

		graph.newSerie("sun").setLabel("Sun intensity").autoAxis().setYAxis(this.axis.light).setLineColor(colors.light).setLineWidth(2).setWaveform(this.data.light);

		graph.newSerie("humidity").setLabel("Humidity").autoAxis().setYAxis(this.axis.humidity).setLineColor(colors.humidity).setLineWidth(2).setWaveform(this.data.humidity);

		graph.autoscaleAxes();
		graph.draw();
		/*var nbShown = 0;
  		graphsCfg.forEach( ( g, index ) => {
  			if( this.props.config[ g.graphRef ] ) {
  		nbShown++;
  	}
  	switch (g.type) {
  				case 'pce':
  			this.updatePCEGraph( this.graphs[ g.graphRef ] );
  		break;
  
  		case 'power':
  			this.updatePowerGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'jsc':
  			this.updateJscGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'voc':
  			this.updateVocGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'voltage':
  			this.updateVoltageGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'current':
  			this.updateCurrentGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'light':
  			this.updateLightGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'humidity':
  			this.updateHumidityGraph( this.graphs[ g.graphRef ] );
  		break;
  				case 'temperature':
  			this.updateTemperatureGraph( this.graphs[ g.graphRef ] );
  		break;
  	}
  } );
  		for( let ref in this.graphsRefs ) {
  			if( this.props.config[ ref ] ) { // Ask for display
  		this.graphs[ ref ].setHeight( pageHeight / nbShown );
  		this.graphs[ ref ].draw();
  	}
  }*/
	}

	graph_cfg_setBottomAxisTime(graph) {

		graph.getBottomAxis().setLabel("Time").setUnit("h").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(0);
	}

	graph_cfg_setBottomAxisNothing(graph) {

		this.setBottomAxisTime(graph);
		graph.getBottomAxis().hide();
	}

	graph_cfg_general(graph) {

		graph.setWidth(600);
	}

	updateGraphJV(data) {

		if (!this.graphJV || !data || !data.jv) {
			return;
		}

		const graph = this.graphJV;

		graph.resize(420, 240);

		graph.getBottomAxis().setLabel("Voltage").setUnit("V").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(0);

		graph.getLeftAxis().setLabel("Current").setUnit("A").setScientific(true).setUnitDecade(true).setSpan(0, 1.00).setUnitWrapper("(", ")").gridsOff().setLineAt([0]).setNbTicksSecondary(0);

		graph.killSeries();

		data.jv.map((jv, index) => {

			graph.newSerie("jv_" + jv.time).setLabel(jv.ellapsed + "h").autoAxis().setLineWidth(2).setWaveform(jv.waveform);
		});

		graph.getPlugin('makeTracesDifferent').colorizeAll({
			affect: 'h',
			startingColorHSL: { h: 0, s: 0.5, l: 0.5 },
			endingColorHSL: { h: 270, s: 0.5, l: 0.5 }
		}, (index, color) => {

			const table = document.getElementById('ivTable');

			if (this.jvDom[index]) {
				this.jvDom[index].style.color = color;
			}

			//	table.children[ index + 1 ].style.color = color;
		});

		//graph.makeLegend( { isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 } ).setAutoPosition( "bottom" );
		//graph.updateLegend();
		graph.autoscaleAxes();
		graph.draw();
		//graph.updateLegend();
	}

	componentDidMount() {
		this.updateProps(this.props);
		//	ipcRenderer.on( "savePDF", this.savePDF );
		this.graph = this.makeGraphs();
	}

	componentWillReceiveProps(nextProps) {
		this.updateProps(nextProps);
	}

	componentDidUpdate() {
		this.updateGraphJV(this.state.data);
	}

	async updateProps(props = this.props) {

		this.data = {};

		try {
			await this.getTrackData(props);
		} catch (e) {
			console.warn(e);
		}

		try {
			await this.getVocData(props);
		} catch (e) {
			console.warn(e);
		}

		try {
			await this.getJscData(props);
		} catch (e) {
			console.warn(e);
		}

		this.data.ff = this.data.power.duplicate().divide(this.data.voc.duplicate().multiply(this.data.jsc)).multiply(100);

		while (this.domJV.firstChild) {
			this.domJV.removeChild(this.domJV.firstChild);
		}

		this.graphJV = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(this.domJV, {
			fontSize: 14,
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 10,
			paddingBottom: 0,
			plugins: {
				'makeTracesDifferent': {}
			}
		});

		this.updateGraphs();

		this.setState({ data: this.data });
	}

	getIVInformation() {
		return null;
	}

	async getVocData(props = this.props) {

		if (!props.measurementName) {
			return;
		}

		var db = props.db.db;
		let time,
		    wave = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		return Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(`SELECT time,voc FROM "${props.measurementName}_voc" ORDER BY time`, db, props.db).then(async results => {

			if (!results[0].series) {
				this.data.voc = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
				throw new Error(`No Voc data with the name "${props.measurementName}"`);
			}

			let values = results[0].series[0].values;

			values.forEach((value, index) => {

				let date = new Date(value[0]),
				    time = (date.getTime() - this.offset) / 1000 / 3600;

				wave.append(time, value[1]);
			});

			this.data.voc = wave;
		});
	}

	async getJscData(props = this.props) {

		if (!props.measurementName) {

			return;
		}

		var db = props.db.db;
		let time,
		    wave = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		return Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(`SELECT time,jsc FROM "${props.measurementName}_jsc" ORDER BY time`, db, props.db).then(async results => {

			if (!results[0].series) {
				this.data.jsc = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
				throw new Error(`No Jsc data with the name "${props.measurementName}"`);
			}

			let values = results[0].series[0].values;

			values.forEach((value, index) => {

				let date = new Date(value[0]),
				    time = (date.getTime() - this.offset) / 1000 / 3600;

				wave.append(time, value[1]);
			});

			this.data.jsc = wave;
		});
	}

	async getTrackData(props = this.props) {

		if (!props.measurementName) {
			return;
		}

		var db = props.db.db;
		let jvCfg = props.config.jv || [];

		await Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(`SELECT time,efficiency FROM "${props.measurementName}" ORDER BY time ASC limit 1; SELECT time,efficiency FROM "${props.measurementName}" ORDER BY time DESC limit 1;`, db, props.db).then(async results => {

			if (!results[0].series) {
				throw "No measurement with the name " + props.measurementName + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000,
			    grouping = Math.max(1, Math.round(timeDifference / 2000));

			let qString = "SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff FROM \"" + props.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;";

			let toReturn = await Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(qString, db, props.db).then(results => {

				if (!results[0].series) {
					console.warn("Could not find any information linked to this serie");
					console.warn("Query string: " + qString);
					return;
				}

				let values = results[0].series[0].values,
				    offset,
				    waveEfficiency = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    wavePower = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveVoltage = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveCurrent = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

				waveEfficiency.setUnit("%");
				waveEfficiency.setXUnit("h");
				wavePower.setXUnit("W");
				waveVoltage.setUnit("V");
				waveCurrent.setUnit("mA cm-2");

				waveSun.setUnit("mW cm-2");
				waveTemperature.setUnit("°C");
				waveHumidity.setUnit("%");

				let maxEfficiency = 0;
				let finalEfficiency = 0;

				values.forEach((value, index) => {

					let date = new Date(value[0]),
					    time;

					if (index == 0) {
						this.offset = date.getTime();
						time = 0;
					} else {
						time = (date.getTime() - this.offset) / 1000 / 3600;
					}

					//	if( value[ 1 ] > 35 || value[ 1 ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
					//	value[ 1 ] = NaN;
					//value[ 2 ] = NaN;
					//	}

					waveEfficiency.append(time, value[1]);
					wavePower.append(time, value[2] * value[3]);
					waveVoltage.append(time, value[2]);
					waveCurrent.append(time, value[3]);

					waveSun.append(time, value[5]);
					waveHumidity.append(time, value[4]);
					waveTemperature.append(time, value[6]);

					maxEfficiency = Math.max(maxEfficiency, value[7]);
				});

				finalEfficiency = values[values.length - 1][7];

				this.data.pce = waveEfficiency;
				this.data.power = wavePower;
				this.data.voltage = waveVoltage;
				this.data.current = waveCurrent;
				this.data.ff = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
				this.data.light = waveSun;
				this.data.temperature = waveTemperature;
				this.data.humidity = waveHumidity;

				this.data.maxEfficiency = Math.round(100 * maxEfficiency) / 100;
				this.data.finalEfficiency = Math.round(100 * finalEfficiency) / 100;
				this.data.ellapsed = Math.round(10 * timeDifference / 3600) / 10;
				this.data.start_date = new Date(timefrom);
				this.data.end_date = new Date(timeto);
			});

			let tfrom = new Date(timefrom).getTime() * 1000000;

			let time_1h = tfrom + 1000000000 * 3600;
			let time_24h = tfrom + 1000000000 * 3600 * 24;
			let time_100h = tfrom + 1000000000 * 3600 * 100;
			let time_500h = tfrom + 1000000000 * 3600 * 500;
			let time_1000h = tfrom + 1000000000 * 3600 * 1000;

			this.data.timeEfficiencies = await Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(`
				SELECT efficiency FROM "${props.measurementName}" WHERE time > ${time_1h} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${props.measurementName}" WHERE time > ${time_24h} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${props.measurementName}" WHERE time > ${time_100h} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${props.measurementName}" WHERE time > ${time_500h} ORDER BY time ASC LIMIT 1;
				SELECT efficiency FROM "${props.measurementName}" WHERE time > ${time_1000h} ORDER BY time ASC LIMIT 1;
			`, db, props.db).then(results => {

				return results.map(result => {

					if (!result.series) {
						return;
					}

					return Math.round(100 * result.series[0].values[0][1]) / 100;
				});
			});

			let jvQuery = jvCfg.map(time => `SELECT * FROM "${props.measurementName}_iv" WHERE time='${time}'`).join(";");

			if (jvQuery.length > 0) {

				this.data.jv = await Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(jvQuery, db, props.db).then(results => {

					return results.map((result, index) => {

						if (!result.series) {
							return;
						}

						let jv = result.series[0].values[0][1].replace('"', '').split(',');
						let waveform = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

						for (var i = 0; i < jv.length; i += 2) {
							waveform.append(parseFloat(jv[i]), parseFloat(jv[i + 1]));
						}

						var power = waveform.duplicate().math((y, x) => y * x);

						return {
							time: result.series[0].values[0][0],
							ellapsed: Math.round((new Date(result.series[0].values[0][0]) - new Date(timefrom)) / 1000 / 3600 * 10) / 10,
							waveform: waveform,
							waveInfo: Object(__WEBPACK_IMPORTED_MODULE_3__app_util_iv__["a" /* getIVParameters */])(waveform, power, parseFloat(this.props.cellInfo.cellArea), result.series[0].values[0][2] * 1000, true)
						};
					});
				});
			} else {
				this.data.jv = [];
			}
		});
	}

	render() {

		this.jvDom = [];

		let indexSpacing,
		    lastIndex = 0;

		try {
			indexSpacing = this.state.data.jv.length / 9;
		} catch (e) {
			indexSpacing = 1;
		}

		if (indexSpacing < 1) {
			indexSpacing = 0;
		}

		console.log(indexSpacing);

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ ref: el => this.dom = el, className: 'container-fluid' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'row' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-xs-4' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'logos' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: 'images/logo_client.png', width: '120' }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'pull-right' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: 'images/logo.png', width: '120' })
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h3',
						null,
						'Device name: \xA0',
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'strong',
							null,
							this.props.cellInfo.cellName
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Timing'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Start date: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							!!this.state.data && !!this.state.data.start_date && toDate(this.state.data.start_date)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'End date: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							!!this.state.data && !!this.state.data.end_date && toDate(this.state.data.end_date)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Ageing time: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							!!this.state.data && !!this.state.data.ellapsed && this.state.data.ellapsed,
							' hours'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Device parameters'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Cell active area: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.props.cellInfo.cellArea,
							' cm',
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'sup',
								null,
								'2'
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Comment: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5' },
							this.props.config.comment
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Power conversion efficiencies (MPP)'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Highest efficiency: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							!!this.state.data && this.state.data.maxEfficiency,
							'%'
						)
					),
					!!this.state.data && !!this.state.data.timeEfficiencies && [this.state.data.timeEfficiencies[0] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Efficiency after 1h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.state.data.timeEfficiencies[0],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[1] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Efficiency after 24h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.state.data.timeEfficiencies[1],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[2] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Efficiency after 100h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.state.data.timeEfficiencies[2],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[3] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Efficiency after 500h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.state.data.timeEfficiencies[3],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[4] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Efficiency after 1\'000h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							this.state.data.timeEfficiencies[4],
							'%'
						)
					) : ''],
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-3' },
							'Final efficiency: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-5 info' },
							!!this.state.data && this.state.data.finalEfficiency,
							'%'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'j-V sweeps'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ id: 'ivTable' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'row ivData', id: 'ivHead' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-3' },
								'Time',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(h)'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'V',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'sub',
									null,
									'oc'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(V)'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'J',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'sub',
									null,
									'sc'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(mA cm',
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'sup',
										null,
										'-2'
									),
									')'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'P',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'sub',
									null,
									'out'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(mW cm',
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'sup',
										null,
										'-2'
									),
									')'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'P',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'sub',
									null,
									'in'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(mW cm',
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'sup',
										null,
										'-2'
									),
									')'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'Fill factor',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(%)'
								)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'col-xs-1' },
								'PCE',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'nobr',
									null,
									'(%)'
								)
							)
						),
						!!this.state.data && !!this.state.data.jv && this.state.data.jv.map((jv, index) => {

							if (!lastIndex || index - lastIndex >= indexSpacing) {

								lastIndex = lastIndex + indexSpacing;
								return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'div',
									{ className: 'row ivData', ref: el => this.jvDom[index] = el },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-3' },
										jv.ellapsed,
										' h'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.voc) ? 'N/A' : jv.waveInfo.voc.toPrecision(3)
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.jsc) ? 'N/A' : jv.waveInfo.jsc.toPrecision(3)
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.power) ? 'N/A' : jv.waveInfo.power.toPrecision(3)
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.powerin) ? 'N/A' : (jv.waveInfo.powerin / 10).toPrecision(3)
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.ff) ? 'N/A' : jv.waveInfo.ff.toPrecision(2)
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'div',
										{ className: 'col-xs-1' },
										isNaN(jv.waveInfo.pce) ? 'N/A' : jv.waveInfo.pce.toPrecision(3)
									)
								);
							} else {
								return null;
							}
						})
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { ref: el => this.domJV = el })
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-xs-5' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { id: 'graph', ref: el => this.domGraph = el })
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'row footer' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'pull-right' },
					'Generated on : ',
					new Date().toString(),
					' '
				),
				'\xA9 Candlelight systems ltd.'
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (HTMLReport);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return query; });
/* unused harmony export ping */
/* unused harmony export checkAuth */
/* unused harmony export checkDB */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);




let query = function (query, db, cfg) {

	return new Promise((resolver, rejecter) => {

		let params = {};
		params.q = query;
		params.db = db;
		params.u = cfg.username;
		params.p = cfg.password;

		__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.get("http://" + cfg.host + ":" + cfg.port + "/query", params, function (results) {
			resolver(results.results);
		});
	});
};

const address = cfg => {
	return "http://" + cfg.host + ":" + cfg.port + "/";
};

let ping = cfg => {

	return new Promise((resolver, rejecter) => {
		fetch(address(cfg) + "ping", { method: 'GET' }).then(data => resolver(data));
		setTimeout(rejecter, 1000);
	});
};

let checkAuth = async (cfg, u, p, db) => {

	const query_auth = `${address(cfg)}query?u=${u}&p=${p}&q=${encodeURIComponent(`SHOW GRANTS FOR "${u}"`)}`;

	const auth = await fetch(query_auth).then(r => r.json());

	if (auth.error) {
		throw "Bad credentials";
	}

	if (auth.results[0].error) {
		if (u == "") {
			throw "No user defined";
		}
		throw "User not found";
	}

	if (!auth.results[0].series[0] || !auth.results[0].series[0].values) {
		throw "No privileges found";
	}

	let accept = false;
	auth.results[0].series[0].values.forEach(v => {

		if (v[0] == db && v[1] == "ALL PRIVILEGES") {
			accept = true;
		}
	});

	if (!accept) {
		throw `Wrong privileges were found for user ${u}`;
	}
};

let checkDB = async (cfg, u, p, db) => {

	if (u == null || u.length == 0) {
		return;
	}

	const query_db = `${address(cfg)}query?u=${u}&p=${p}&q=${encodeURIComponent(`SHOW DATABASES`)}`;
	const dbs = await fetch(query_db).then(r => r.json());

	if (!dbs.results[0].series) {
		throw "Database not found";
	}

	if (!dbs.results[0].series[0].values) {
		throw "Database not found";
	}

	let accept = false;
	dbs.results[0].series[0].values.forEach(v => {

		if (v[0] == db) {
			accept = true;
		}
	});

	if (!accept) {
		throw "Database not found";
	}
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getIVParameters; });

let getIVParameters = (waveform, powerwaveform, area, powin, inverted = false) => {

  let jsc, voc;

  // Let's try to find the jsc. If we cannot find it, it's no big deal. Silent fail
  try {
    jsc = waveform.getY(waveform.getIndexFromX(0));
  } catch (e) {
    jsc = NaN;
  }

  // Let's try to find the voc. If we cannot find it, it's no big deal. Silent fail
  try {
    voc = waveform.getX(waveform.findLevel(0));
  } catch (e) {
    voc = NaN;
  }

  let maxpower;

  if (inverted) {
    maxpower = powerwaveform.getMaxY();
  } else {
    maxpower = powerwaveform.getMinY();
  }

  let ff = maxpower / (jsc * voc);
  let pce = Math.round(maxpower * 1000 / area / (powin / 10) * 100 * 100) / 100 * (inverted ? 1 : -1);

  let maxIndex = powerwaveform.findLevel(maxpower);
  let vmax = powerwaveform.getX(maxIndex);

  return {
    isc: jsc * 1000 * (inverted ? 1 : -1),
    jsc: jsc / area * 1000 * (inverted ? 1 : -1),
    voc: voc,
    ff: ff * 100,
    powerin: powin,
    power: maxpower * 1000,
    pce: pce,
    jmax: 0,
    vmax: vmax
  };
};

/***/ })
/******/ ]);