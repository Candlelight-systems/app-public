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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_calibratepd_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(1);

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", (event, data) => {

	render(data);
});

function onClose() {
	ipcRenderer.send('closeForm');
}

function render(data) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_calibratepd_jsx__["a" /* default */], { instrumentId: data.instrumentId, groupName: data.groupName, config: data.config, onClose: onClose }), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);



class CalibratePD extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	/**
  *	@param props.name The name of the cell
  */
	constructor(props) {
		super(props);

		this.unit = {
			"voltage": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"V"
			),
			"currentdensity": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"mA cm",
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			),
			"current": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"mA"
			),
			"efficiency": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"fillfactor": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"sun": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"sun"
			),
			"area": __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				null,
				"cm",
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"sup",
					null,
					"2"
				)
			)
		};

		this.state = {
			channelsJsc: {}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputChangeLi = this.handleInputChangeLi.bind(this);
		this.scalePD = this.scalePD.bind(this);
		this.close = this.close.bind(this);
		this.setRequestTimeout();
	}

	close() {
		this.props.onClose();
	}

	async scalePD(sunValue) {

		let scalingFactor;

		this.setState({
			rescaling_success: false
		});

		if (!sunValue) {
			scalingFactor = this.state.control.factory_scaling_ma_to_sun;
		} else {
			scalingFactor = sunValue / this.state.channelsJsc["pd"];
		}

		let body = JSON.stringify({
			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			pdScale: scalingFactor
		});

		let headers = new Headers({
			"Content-Type": "application/json",
			"Content-Length": body.length.toString()
		});

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setPDScaling", {
			method: 'POST',
			headers: headers,
			body: body
		});

		this.setState({
			rescaling_success: true
		});

		await this.getPD();
	}

	setRequestTimeout() {

		setTimeout(() => {

			var str = [];

			for (var i = 0; i < this.state.channels.length; i++) {
				if (this.state['mon_' + this.state.channels[i].chanId]) {
					str.push(this.state.channels[i].chanId);
				}
			}

			fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/measureCurrent?instrumentId=${encodeURIComponent(this.props.instrumentId)}&groupName=${this.props.groupName}&chanIds=${str.join(",")}`, {
				method: 'GET'
			}).then(values => values.json()).then(json => {

				for (var i in json) {
					if (i == 'pd') {
						json.pd = json.pd[0];
					} else {
						json[i] *= 1000;
					}
				}
				this.setState({ channelsJsc: json });
			}).catch(() => {

				// Catching JSON or request errors

			}).then(() => {

				this.setRequestTimeout();
			});
		}, 2000);
	}

	async componentDidMount() {

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getChannels?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {

			method: 'GET'

		}).then(values => values.json()).then(channels => {

			this.setState({ channels: channels });

			channels.forEach(chan => {
				this.setState({ ["size_" + chan.chanId]: null });
			});
		}).catch(error => {

			// Catching JSON or request errors
			console.error(error);
			console.error("Error in getting channels JSON");
		});

		await this.getPD();
	}

	getPD() {

		return fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getPDOptions?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {
			method: 'GET'
		}).then(values => values.json()).then(control => {
			console.log(control);
			this.setState({ control: control });
		}).catch(error => {
			console.error(error);
			console.error("Error in getting light controller");
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	handleInputChangeLi(event) {
		const target = event.target;
		const value = !target.classList.contains('active');
		const name = target.getAttribute('data-name');
		this.setState({ [name]: value });
	}

	async enableChannel(chanId) {

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/enableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId + "&noIV=true", {
			method: 'GET'
		});

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setVoltage?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId + "&voltage=0", {
			method: 'GET'
		});

		//		this.getState[ chanId ] = true;
	}

	async disableChannel(chanId) {

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/disableChannel?instrumentId=" + this.props.instrumentId + "&chanId=" + chanId, {
			method: 'GET'
		});

		//		this.getState[ chanId ] = false;
	}

	componentWillUpdate(nextProps, nextState) {

		if (this.state.channels && Array.isArray(this.state.channels)) {
			for (var i in this.state.channels) {

				let chanId = this.state.channels[i].chanId,
				    strObj = 'mon_' + chanId;

				if (this.state[strObj] && !nextState[strObj]) {

					this.disableChannel(chanId);
				} else if (!this.state[strObj] && nextState[strObj]) {

					this.enableChannel(chanId);
				}
			}
		}
	}

	jsc(key, wrapper, density, sunRatio) {

		if (this.state.channelsJsc[key] === undefined) {
			if (wrapper) {
				return "";
			}

			return 0;
		}

		let val = this.state.channelsJsc[key];

		if (val === null || val === undefined) {
			if (wrapper) {
				return "";
			}
			return 0;
		}

		if (density && this.state.size && this.state.size > 0) {
			val /= this.state.size;
		} else {
			density = false;
		}

		let valTxt = val.toPrecision(4);

		if (wrapper) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"span",
				{ className: "badge" },
				valTxt,
				" mA ",
				density ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"span",
					null,
					"cm",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"sup",
						null,
						"-2"
					)
				) : "",
				" ",
				sunRatio ? ' / ' + Math.round(100 * val * sunRatio) / 100 + " sun" : ""
			);
		}

		return val;
	}

	render() {

		let jsc;
		const control = this.state.control;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container-fluid", id: "calib_light_list" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "col-sm-9" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "alert alert-info" },
					" ",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-info-sign", "aria-hidden": "true" }),
					" Switch to manual mode in order to gain control of the light intensity"
				)
			),
			!!this.state.rescaling_success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "col-sm-9" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "alert alert-success" },
					" ",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-check-sign", "aria-hidden": "true" }),
					" Successfully updated the photodiode scaling factor"
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "col-sm-5" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h4",
					null,
					"Monitor short circuit currents"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "input-group" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							{ className: "input-group-addon" },
							"Cell area :"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", min: "0", max: "2", step: "0.01", className: "form-control", name: "size", value: this.state.size, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							{ className: "input-group-addon" },
							"cm",
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"sup",
								null,
								"-2"
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"ul",
					{ className: "list-group" },
					control ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"li",
						{ key: "_photodiode", "data-name": "pd", className: "list-group-item active" },
						this.jsc("pd", true, false, control.scaling),
						"Photodiode"
					) : null,
					!!this.state.channels && this.state.channels.map(channel => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"li",
						{ key: channel.chanId, "data-name": "mon_" + channel.chanId, className: "list-group-item " + (this.state["mon_" + channel.chanId] ? 'active' : ''), onClick: this.handleInputChangeLi },
						this.jsc(channel.chanId, true, true),
						"Channel ",
						channel.chanId
					))
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "col-sm-4" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h4",
					null,
					"2-point calibration"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"p",
					null,
					"To calibrate the light intensity with respect to the short circuit of your device, manually adjust the light intensity such that the short circuit current of the solar cells corresponds to the one measured on an AM1.5G source.",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
					"You can also reset the default settings to the factory calibrated reference photodiode short circuit current."
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "form-group" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"label",
							null,
							"Photodiode"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "form-control", readOnly: "readonly", value: (jsc = this.jsc("pd", false)).toPrecision(4) ? jsc + " mA" : "" })
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "form-group" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "btn-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"button",
								{ className: "btn btn-default", type: "button", onClick: () => this.scalePD(1) },
								"Set as 1 sun"
							),
							!!this.state.control && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"button",
								{ className: "btn btn-default", type: "button", onClick: () => this.scalePD() },
								"Factory reset (",
								Math.round(100 * this.state.channelsJsc["pd"] * control.factory_scaling_ma_to_sun) / 100,
								" sun)"
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "btn-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-default", onClick: this.close },
						"Close"
					)
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CalibratePD);

/***/ })
/******/ ]);