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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_jsx__ = __webpack_require__(6);



const { ipcRenderer } = __webpack_require__(0);

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

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_jsx__["a" /* default */], { config: config, db: data.db, measurementName: data.measurementName, cellInfo: data.cellInfo, instrumentId: data.instrumentId, chanId: data.chanId }), document.getElementById('root'));
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__influx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_html_pdf__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_html_pdf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_html_pdf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_util_iv__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);







const { dialog } = __webpack_require__(0).remote;

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

const jvColors = ["#9f1616", "#9f8016", "#8a9f16", "#169f3a", "#16949f", "#16409f"];

class HTMLReport extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.savePDF = this.savePDF.bind(this);
	}

	savePDF() {
		console.log('saving');

		dialog.showSaveDialog({

			message: "Save the report for the device \"" + this.props.cellInfo.cellName + "\"",
			defaultPath: "~/" + this.props.cellInfo.cellName + ".itx"

		}, fileName => {

			__WEBPACK_IMPORTED_MODULE_4_html_pdf___default.a.create(document.documentElement.outerHTML, {
				format: 'A4',
				orientation: 'landscape',
				base: "file://" + __dirname + "/"

			}).toFile(fileName, function (err, res) {

				if (err) return console.log(err);
				console.log(res); // { filename: '/app/businesscard.pdf' }
			});

			//		fs.writeFileSync( fileName, outputfile.build() );
		});
	}

	close() {
		this.props.onClose();
	}

	componentWillUnmount() {
		__WEBPACK_IMPORTED_MODULE_6_electron__["ipcRenderer"].removeListener("savePDF", this.savePDF);
	}

	updateGraphStability(data) {

		if (!this.graphStability || !data) {
			return;
		}

		const graph = this.graphStability;

		graph.resize(450, 550);

		graph.getBottomAxis().setLabel("Time").setUnit("h").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(0);

		graph.getLeftAxis(0).setLabel("Efficiency").setUnit("%").setSpan(0.75, 1.00).setUnitWrapper("(", ")").gridsOff().setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("efficiency").setLabel("PCE").autoAxis().setYAxis(graph.getLeftAxis(0)).setLineColor("#1f1fae").setLineWidth(2).setWaveform(data.efficiency);

		graph.getLeftAxis(1).setLabel("Vmpp").setUnit("V").setSpan(0.6, 0.73).setUnitWrapper("(", ")").gridsOff().setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("Voltage").autoAxis().setYAxis(graph.getLeftAxis(1)).setLineColor("#1f8eae").setLineWidth(2).setWaveform(data.voltage);

		graph.getLeftAxis(2).setLabel("Jmpp").setUnit("A").setSpan(0.45, 0.58).setUnitWrapper("(", ")").gridsOff().setScientific(true).setUnitDecade(true).setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("Current").autoAxis().setYAxis(graph.getLeftAxis(2)).setLineColor("#1fae76").setLineWidth(2).setWaveform(data.current);

		graph.getLeftAxis(3).setLabel("Sun").setUnit("-").setSpan(0.3, 0.43).setUnitWrapper("(", ")").gridsOff().forceMin(0).setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("sun").autoAxis().setLabel("Sun").setYAxis(graph.getLeftAxis(3)).setLineColor("#7aae1f").setLineWidth(2).setWaveform(data.sun);

		graph.getLeftAxis(4).setLabel("Humid.").setUnit("%").setSpan(0.15, 0.28).setUnitWrapper("(", ")").gridsOff().forceMin(0).forceMax(100).setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("humidity").autoAxis().setLabel("Hum.").setYAxis(graph.getLeftAxis(4)).setLineColor("#ae9b1f").setLineWidth(2).setWaveform(data.humidity);

		graph.getLeftAxis(5).setLabel("Temp.").setUnit("°C").setSpan(0.0, 0.13).setUnitWrapper("(", ")").gridsOff().forceMin(0).forceMax(90).setLineAt([0]).setNbTicksSecondary(0);

		graph.newSerie("temperature").autoAxis().setLabel("Temp.").setYAxis(graph.getLeftAxis(5)).setLineColor("#ae441f").setLineWidth(2).setWaveform(data.temperature);

		graph.makeLegend({ isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 }).setAutoPosition("bottom");
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();
	}

	updateGraphJV(data) {

		if (!this.graphJV || !data) {
			return;
		}

		const graph = this.graphJV;

		graph.resize(300, 140);

		graph.getBottomAxis().setLabel("Voltage").setUnit("V").setUnitWrapper("(", ")").gridsOff().setNbTicksSecondary(0);

		graph.getLeftAxis().setLabel("Current").setUnit("A").setScientific(true).setUnitDecade(true).setSpan(0, 1.00).setUnitWrapper("(", ")").gridsOff().setLineAt([0]).setNbTicksSecondary(0);

		graph.killSeries();

		data.jv.map((jv, index) => {
			graph.newSerie("jv_" + jv.time).setLabel(jv.ellapsed + "h").autoAxis().setLineColor(jvColors[index]).setLineWidth(2).setWaveform(jv.waveform);
		});

		graph.makeLegend({ isSerieHideable: false, frame: false, paddingTop: 5, paddingBottom: 0 }).setAutoPosition("bottom");
		graph.updateLegend();
		graph.draw();
		graph.updateLegend();
	}

	componentDidMount() {
		this.updateProps(this.props);
		__WEBPACK_IMPORTED_MODULE_6_electron__["ipcRenderer"].on("savePDF", this.savePDF);
	}

	componentWillReceiveProps(nextProps) {

		this.updateProps(nextProps);
	}

	async updateProps(props = this.props) {

		let data = await this.getTrackData(props);

		if (!data) {
			return;
		}

		while (this.domStability.firstChild) {
			this.domStability.removeChild(this.domStability.firstChild);
		}

		while (this.domJV.firstChild) {
			this.domJV.removeChild(this.domJV.firstChild);
		}

		this.graphStability = new __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a(this.domStability, {
			fontSize: 9,
			paddingTop: 5,
			paddingLeft: 5,
			paddingRight: 5,
			paddingBottom: 0
		});

		this.graphJV = new __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a(this.domJV, {
			fontSize: 9,
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 10,
			paddingBottom: 0,
			plugins: {
				'makeTracesDifferent': {}
			}
		});

		this.updateGraphStability(data);
		this.updateGraphJV(data);

		this.setState({ data: data });
	}

	getIVInformation() {
		return null;
	}

	getTrackData(props = this.props) {

		if (!props.measurementName) {
			return;
		}

		var db = props.db.db;
		let jvCfg = props.config.jv || [];

		return Object(__WEBPACK_IMPORTED_MODULE_2__influx__["a" /* query */])("SELECT time,efficiency FROM \"" + props.measurementName + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + props.measurementName + "\" ORDER BY time DESC limit 1;", db, props.db).then(async results => {

			if (!results[0].series) {
				throw "No measurement with the name " + props.measurementName + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000,
			    grouping = Math.max(1, Math.round(timeDifference / 1000));

			let qString = "SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff FROM \"" + props.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;";

			let toReturn = await Object(__WEBPACK_IMPORTED_MODULE_2__influx__["a" /* query */])(qString, db, props.db).then(results => {

				if (!results[0].series) {
					console.warn("Could not find any information linked to this serie");
					console.warn("Query string: " + qString);
					return;
				}

				let values = results[0].series[0].values,
				    offset,
				    waveEfficiency = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveVoltage = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveCurrent = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

				waveEfficiency.setUnit("%");
				waveEfficiency.setXUnit("h");
				waveVoltage.setUnit("V");
				waveCurrent.setUnit("mA cm-2");

				waveSun.setUnit("-");
				waveTemperature.setUnit("°C");
				waveHumidity.setUnit("%");

				let maxEfficiency = 0;
				let finalEfficiency = 0;

				values.forEach((value, index) => {

					let date = new Date(value[0]),
					    time;

					if (index == 0) {
						offset = date.getTime();
						time = 0;
					} else {
						time = (date.getTime() - offset) / 1000 / 3600;
					}

					if (value[1] > 35 || value[1] < 0) {
						// Higher than 35% => fail. Lower than 0% => fail.
						value[1] = NaN;
						value[2] = NaN;
					}

					waveEfficiency.append(time, value[1]);
					waveVoltage.append(time, value[2]);
					waveCurrent.append(time, value[3]);

					waveSun.append(time, value[4]);
					waveHumidity.append(time, value[5]);
					waveTemperature.append(time, value[6]);

					maxEfficiency = Math.max(maxEfficiency, value[7]);
				});

				finalEfficiency = values[values.length - 1][7];

				return {
					efficiency: waveEfficiency,
					voltage: waveVoltage,
					current: waveCurrent,
					sun: waveSun,
					temperature: waveTemperature,
					humidity: waveHumidity,

					maxEfficiency: Math.round(100 * maxEfficiency) / 100,
					finalEfficiency: Math.round(100 * finalEfficiency) / 100,
					ellapsed: Math.round(10 * timeDifference / 3600) / 10, // in hours
					start_date: new Date(timefrom),
					end_date: new Date(timeto)
				};
			});

			let tfrom = new Date(timefrom).getTime() * 1000000;

			let time_1h = tfrom + 1000000000 * 3600;
			let time_24h = tfrom + 1000000000 * 3600 * 24;
			let time_100h = tfrom + 1000000000 * 3600 * 100;
			let time_500h = tfrom + 1000000000 * 3600 * 500;
			let time_1000h = tfrom + 1000000000 * 3600 * 1000;

			toReturn.timeEfficiencies = await Object(__WEBPACK_IMPORTED_MODULE_2__influx__["a" /* query */])(`
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

				toReturn.jv = await Object(__WEBPACK_IMPORTED_MODULE_2__influx__["a" /* query */])(jvQuery, db, props.db).then(results => {

					return results.map((result, index) => {

						if (!result.series) {
							return;
						}

						if (index > 4) {
							return null;
						}

						let jv = result.series[0].values[0][1].replace('"', '').split(',');
						let waveform = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

						for (var i = 0; i < jv.length; i += 2) {
							waveform.append(parseFloat(jv[i]), parseFloat(jv[i + 1]));
						}

						var power = waveform.duplicate().math((y, x) => y * x);

						return {
							time: result.series[0].values[0][0],
							ellapsed: Math.round((new Date(result.series[0].values[0][0]) - new Date(timefrom)) / 1000 / 3600 * 10) / 10,
							waveform: waveform,
							waveInfo: Object(__WEBPACK_IMPORTED_MODULE_5__app_util_iv__["a" /* getIVParameters */])(waveform, power, parseFloat(this.props.cellInfo.cellArea), 100, true)
						};
					});
				});
			} else {

				toReturn.jv = [];
			}

			return toReturn;
		});
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ ref: el => this.dom = el, className: 'container-fluid' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'row' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-xs-6' },
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
							{ className: 'col-xs-7' },
							'Start date: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							!!this.state.data && toDate(this.state.data.start_date)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'End date: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							!!this.state.data && toDate(this.state.data.end_date)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Ageing time: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							!!this.state.data && this.state.data.ellapsed,
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
							{ className: 'col-xs-7' },
							'Cell active area: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7  info' },
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
							{ className: 'col-xs-7' },
							'Comment: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							this.props.config.comment
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Power conversion efficiencies'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Highest efficiency: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							!!this.state.data && this.state.data.maxEfficiency,
							'%'
						)
					),
					!!this.state.data && !!this.state.data.timeEfficiencies && [this.state.data.timeEfficiencies[0] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Efficiency after 1h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							this.state.data.timeEfficiencies[0],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[1] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Efficiency after 24h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							this.state.data.timeEfficiencies[1],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[2] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Efficiency after 100h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							this.state.data.timeEfficiencies[2],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[3] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Efficiency after 500h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							this.state.data.timeEfficiencies[3],
							'%'
						)
					) : '', this.state.data.timeEfficiencies[4] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Efficiency after 1\'000h:'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
							this.state.data.timeEfficiencies[4],
							'%'
						)
					) : ''],
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'row' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7' },
							'Final efficiency: '
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'col-xs-7 info' },
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
						{ className: 'row ivData ivHead' },
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
							{ className: 'col-xs-2' },
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
							{ className: 'col-xs-2' },
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
							{ className: 'col-xs-2' },
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
							{ className: 'col-xs-2' },
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
							{ className: 'col-xs-2' },
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
							{ className: 'col-xs-2' },
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

						if (index > 4) {
							return null;
						}

						return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'row ivData' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-3 color-series-style-" + index },
								jv.ellapsed,
								' h'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-2 color-series-style-" + index },
								isNaN(jv.waveInfo.voc) ? 'N/A' : jv.waveInfo.voc.toPrecision(3)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-2 color-series-style-" + index },
								isNaN(jv.waveInfo.jsc) ? 'N/A' : jv.waveInfo.jsc.toPrecision(3)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-2 color-series-style-" + index },
								isNaN(jv.waveInfo.power) ? 'N/A' : jv.waveInfo.power.toPrecision(3)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: "col-xs-2 color-series-style-" + index }),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-2 color-series-style-" + index },
								isNaN(jv.waveInfo.ff) ? 'N/A' : jv.waveInfo.ff.toPrecision(2)
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: "col-xs-2 color-series-style-" + index },
								isNaN(jv.waveInfo.pce) ? 'N/A' : jv.waveInfo.pce.toPrecision(3)
							)
						);
					}),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { ref: el => this.domJV = el })
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-xs-8', ref: el => this.domStability = el })
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return query; });
/* unused harmony export ping */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(2);
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

let ping = function (cfg) {
	return fetch("http://" + cfg.host + ":" + cfg.port + "/ping", { method: 'GET' });
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("html-pdf");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getIVParameters; });

let getIVParameters = (waveform, powerwaveform, area, powin, inverted = false) => {

  let jsc = waveform.getY(waveform.getIndexFromX(0));
  let voc = waveform.getX(waveform.findLevel(0));

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
    power: maxpower * 1000,
    pce: pce,
    jmax: 0,
    vmax: vmax
  };
};

/***/ })
/******/ ]);