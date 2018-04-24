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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_calibratepyranometer_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(1);

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", (event, data) => {

	render(data);
});

function onClose() {
	ipcRenderer.send('closeForm');
}

function render(data) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_calibratepyranometer_jsx__["a" /* default */], { instrumentId: data.instrumentId, groupName: data.groupName, config: data.config, onClose: onClose }), document.getElementById('root'));
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



class CalibratePyranometer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

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
			scale: 0,
			offset: 0
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.applyScaling = this.applyScaling.bind(this);
		this.close = this.close.bind(this);
	}

	close() {
		this.props.onClose();
	}

	async applyScaling(scale, offset) {

		try {
			let body = JSON.stringify({
				instrumentId: this.props.instrumentId,
				groupName: this.props.groupName,
				scale: scale,
				offset: offset
			});

			let headers = new Headers({
				"Content-Type": "application/json",
				"Content-Length": body.length.toString()
			});

			await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.setPyranometerScaling", {
				method: 'POST',
				headers: headers,
				body: body
			}).then(response => {

				if (response.status !== 200) {
					throw "Response error";
				}
			});

			this.setState({
				rescaling_success: true,
				rescaling_error: false
			});
		} catch (e) {

			this.setState({
				rescaling_success: false,
				rescaling_error: true
			});
		}
	}

	async componentDidMount() {

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.getPyranometerScaling?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {

			method: 'GET'

		}).then(response => response.json()).then(response => {

			this.setState({ scale: response.scale, offset: response.offset });
			this.setState({ rescaling_error_read: false });
		}).catch(error => {

			// Catching JSON or request errors
			console.error(error);
			console.error("Error in getting pyranometer information");

			this.setState({ rescaling_error_read: true });
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	render() {

		let jsc;
		const control = this.state.control;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container-fluid", id: "calib_light_list" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"h4",
				null,
				"Pyranometer linear calibration settings"
			),
			this.state.rescaling_success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "alert alert-success" },
				"Pyranometer has been rescaled."
			),
			this.state.rescaling_error && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "alert alert-danger" },
				"Error in rescaling the pyranometer. Make sure the host is running."
			),
			this.state.rescaling_error_read && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "alert alert-danger" },
				"Error in retrieving the pyranometer scaling."
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "alert alert-info" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-info" }),
				" The result of the equation should be in sun intensity (where 1 sun = 1'000 W m",
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"sup",
					null,
					"-2"
				),
				")"
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-sm-9" },
					"sun = ",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "scale", value: this.state.scale, onChange: this.handleInputChange }),
					" * [Pyranometer current 4-20mA] + ",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "offset", value: this.state.offset, onChange: this.handleInputChange })
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-sm-9" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "btn-group" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"button",
							{ type: "button", className: "btn btn-primary", onClick: () => this.applyScaling(this.state.scale, this.state.offset) },
							"Apply scaling"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"button",
							{ type: "button", className: "btn btn-default", onClick: this.close },
							"Close"
						)
					)
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CalibratePyranometer);

/***/ })
/******/ ]);