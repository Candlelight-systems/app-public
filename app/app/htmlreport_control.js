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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_control_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(1);

ipcRenderer.on("loadForm", (event, data) => {
	render(data);
});

function render(props) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_htmlreport_control_jsx__["a" /* default */], { db: props.db, measurementName: props.measurementName, cellInfo: props.cellInfo, instrumentId: props.instrumentId, chanId: props.chanId }), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_electron__);




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

class HTMLReportControl extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {},
			comment: ""
		};

		this.close = this.close.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.savePDF = this.savePDF.bind(this);
		this.printPDF = this.printPDF.bind(this);
	}

	validateConfig() {
		this.props.onValidate(this.state);
		this.close();
	}

	savePDF() {
		__WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].send("htmlReport.savePDF", { cellName: this.props.cellInfo.cellName });
	}

	printPDF() {
		__WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].send("htmlReport.printPDF", { cellName: this.props.cellInfo.cellName });
	}

	close() {
		this.props.onClose();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	handleSelectChange(event) {

		var options = event.target.options;
		var value = [];
		const name = event.target.name;

		for (var i = 0, l = options.length; i < l; i++) {

			if (options[i].selected) {
				value.push(options[i].value);
			}
		}

		this.setState({ [name]: value });
	}

	componentDidUpdate() {
		__WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].send("htmlReport.config", this.state);
	}

	componentDidMount() {
		this.getTrackData();
	}

	getTrackData() {

		var db = this.props.db.db;

		return Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])("SELECT time,efficiency FROM \"" + encodeURIComponent(this.props.measurementName) + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + encodeURIComponent(this.props.measurementName) + "\" ORDER BY time DESC limit 1;", db, this.props.db).then(async results => {

			if (!results[0].series) {
				throw "No measurement with the name " + encodeURIComponent(this.props.measurementName) + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000,
			    grouping = Math.max(1, Math.round(timeDifference / 1000));

			Object(__WEBPACK_IMPORTED_MODULE_1__influx__["a" /* query */])(`SELECT time,iv from "${encodeURIComponent(this.props.measurementName)}_iv" ORDER BY time ASC;`, db, this.props.db).then(results => {

				if (!results[0].series) {
					console.warn("No IV curves for this serie");
					this.state.data.jv_available = [];
					this.setState({ data: this.state.data });
					return;
				}

				let values = results[0].series[0].values;
				this.state.data.jv_available = values.map((value, index) => {

					return {
						ellapsed: Math.round((new Date(value[0]) - new Date(timefrom)) / 3600 / 1000 * 10) / 10,
						time: value[0]
					};
				});

				this.setState({ data: this.state.data });
			});
		});
	}

	render() {
		// test6_1494506615016_iv
		if (!this.state.data.jv_available) {
			return null;
		}

		const availableGraphs = [];

		switch (this.props.cellInfo.trackingMode) {

			case 'MPP':

				if (this.props.cellInfo.lightMonitoring) {
					availableGraphs.push(possibleGraphs.pce);
				}

			case 'CONSTV':
				availableGraphs.push(possibleGraphs.power);
				availableGraphs.push(possibleGraphs.current);
				availableGraphs.push(possibleGraphs.voltage);
				availableGraphs.push(possibleGraphs.jsc);
				availableGraphs.push(possibleGraphs.voc);
				break;

			case 'JSC':
				availableGraphs.push(possibleGraphs.jsc);
				break;

			case 'VOC':
				availableGraphs.push(possibleGraphs.voc);
				break;
		}

		if (this.props.cellInfo.lightMonitoring) {
			availableGraphs.push(possibleGraphs.light);
		}

		if (this.props.cellInfo.temperatureMonitoring) {
			availableGraphs.push(possibleGraphs.temperature);
		}

		if (this.props.cellInfo.humidityMonitoring) {
			availableGraphs.push(possibleGraphs.humidity);
		}

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container-fluid" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"form",
				{ className: "form-horizontal" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h3",
					null,
					"j-V curves"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"Select the j-V curves for the report"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"select",
							{ className: "form-control", multiple: "multiple", name: "jv", value: this.state.jv, onChange: this.handleSelectChange },
							this.state.data.jv_available.map(jv => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"option",
								{ key: jv.time, value: jv.time },
								jv.ellapsed,
								" hours"
							))
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h3",
					null,
					"General"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"Comment"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { className: "form-control", name: "comment", value: this.state.comment, onChange: this.handleInputChange })
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "btn-group pull-right" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-primary", onClick: this.printPDF },
					"Print PDF"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-primary", onClick: this.savePDF },
					"Save PDF"
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (HTMLReportControl);

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

/***/ })
/******/ ]);