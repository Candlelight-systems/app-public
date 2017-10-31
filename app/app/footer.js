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

module.exports = require("shell");

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_instrumentform_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(7);

function bugReport() {
	ipcRenderer.send("bugReport");
}

function onValidate(formData) {

	ipcRenderer.send('validateForm', formData);
}

function onClose() {

	ipcRenderer.send('closeForm');
}

if (document.getElementById('footer')) {
	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		null,
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'row' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-xs-8' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'logo' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: './images/logo_footer.png', width: '220' })
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'pull-right footer-info' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					'\xA9 Candlelight systems, 2017'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'a',
						{ onClick: bugReport },
						'Report a bug'
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					'Privacy Policy'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					'About'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'row borderTop' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-xs-5' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'small',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'a',
						{ onClick: () => __webpack_require__(1).openExternal("http://candlelight-systems.com") },
						'http://candlelight-systems.com'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-xs-6' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'small',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'a',
						{ onClick: () => __webpack_require__(1).openExternal("mailto://contact@candlelight-systems.com") },
						'contact@candlelight-systems.com'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-xs-3' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'small',
					null,
					'+ 41 21 693 2105'
				)
			)
		)
	), document.getElementById('footer'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);



class InstrumentForm extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateConfig = this.validateConfig.bind(this);
		this.close = this.close.bind(this);
		this.state = {

			trackerPort: 8080,
			buttonValue: "Add",
			title: "Add a Candlelight instrument"
		};

		this.connectAttempt = this.connectAttempt.bind(this);
	}

	connectAttempt() {
		fetch("http://" + this.state.trackerHost + ":" + this.state.trackerPort + "/idn", { method: 'GET' }).then(response => {

			if (response.status !== 200) {
				throw "Error returned by host.";
			}

			return response.text().then(text => {
				this.setState({ connect: "Success ! Instrument response: " + text, connectstate: "success" });
			});
		}).catch(error => {
			this.setState({ connect: "Error. Cannot reach the instrument (" + error + ")", connectstate: "warning" });
		});

		this.setState({ connect: "Connection in progress...", connectstate: "default" });
	}

	validateConfig() {

		this.props.onValidate(this.state);
		this.props.onClose();
		//	$( this.modal ).modal('hide');
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

	componentWillReceiveProps(nextProps) {

		this.setState(nextProps.formState);
		this.edit();
	}

	componentDidMount() {

		if (this.props.formState.trackerHost) {
			this.edit();
		}

		this.setState(this.props.formState);
	}

	edit() {

		this.setState(prevState => ({
			buttonValue: "Update",
			title: "Edit a Candlelight instrument"
		}));
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container-fluid" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"form",
				{ onSubmit: this.submit, className: "form-horizontal" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h3",
					null,
					this.state.title
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"Name"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "trackerName", id: "trackerName", className: "form-control", placeholder: "", value: this.state.trackerName, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							{ className: "help-block" },
							"Give your instrument a generic name so that you can recognize it in the future."
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"IP address"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "trackerHost", id: "trackerHost", className: "form-control", placeholder: "", value: this.state.trackerHost, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							{ className: "help-block" },
							"Connect your instrument to the network and enter here its ip address. Refer to the document to determine your instruments IP address."
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"Port"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "trackerPort", id: "trackerPort", className: "form-control", placeholder: "", value: this.state.trackerPort, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							{ className: "help-block" },
							"8080 is the default communication port."
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ className: "col-sm-3" },
						"Attempt to connect"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "col-sm-9" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"p",
							null,
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"button",
								{ type: "button", className: "btn btn-primary", name: "connect", onClick: this.connectAttempt },
								"Connect"
							)
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"p",
							{ className: "state-message bg-" + this.state.connectstate },
							this.state.connect
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "btn-group pull-right" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-primary", name: "update", onClick: this.validateConfig },
					this.state.buttonValue
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-default", name: "update", onClick: this.close },
					"Close"
				)
			)
		);
	}
}

/* unused harmony default export */ var _unused_webpack_default_export = (InstrumentForm);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })
/******/ ]);