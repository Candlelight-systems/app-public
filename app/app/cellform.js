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

module.exports = {"ageing":true,"statuses":{"light":{"version":"2.0","readonly":false}},"instrument":{"Top port":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":30,"LSB":1.22,"LSBValue":1,"voltageRange":2.5,"autoZero":"instrument","groups":{"Sample holder":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}},"Bottom port":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":30,"LSB":1.22,"LSBValue":1,"voltageRange":2.5,"autoZero":"instrument","groups":{"Sample holder":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}}}}

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_cellform_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(8);

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", (event, data) => {
	render(data);
});

function onValidate(formData) {

	ipcRenderer.send('validateForm', formData);
}

function onClose() {

	ipcRenderer.send('closeForm');
}

function render(data) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_cellform_jsx__["a" /* default */], {
		instrumentConfig: data.instrumentConfig,
		groupName: data.groupName,
		formState: data.channelState,
		onValidate: onValidate,
		onClose: onClose }), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellformtracking_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellformjv_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_environment_json__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__app_environment_json__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






class CellForm extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.subFormChanged = this.subFormChanged.bind(this);
		this.validateConfig = this.validateConfig.bind(this);
		this.state = {
			cellArea: 0,
			cellName: "",
			connection: "group",
			lightSource: "pd_pyr",
			correctionFactor_type: "factory",
			correctionFactor_value: 1
		};
		this.close = this.close.bind(this);
	}

	validateConfig() {
		this.props.onValidate(this.state);
		this.close();
	}

	close() {
		this.props.onClose();
	}

	subFormChanged(name, value) {
		this.setState({ [name]: value });
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	componentDidMount() {

		$("a", this.tabs).click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});

		this.setState(this.props.formState);
		this.setState({ lightSource: this.props.formState.lightRefValue > 0 ? 'manual' : 'pd_pyr' });
	}

	componentWillReceiveProps(nextProps) {

		this.setState(nextProps.formState);
		this.setState({ lightSource: nextProps.formState.lightRefValue > 0 ? 'manual' : 'pd_pyr' });
	}

	render() {

		let active = !!this.state.enable && this.state.tracking_mode > 0;
		let groups = this.props.instrumentConfig.groups;
		let relayController = false;

		let lightSourceSelect = __WEBPACK_IMPORTED_MODULE_3__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].groups[this.props.groupName].manualLightIntensity;
		let correctionFactor = 'N/A';

		for (var i = 0; i < groups.length; i++) {
			if (groups[i].groupName == this.props.groupName) {
				relayController = groups[i].dualOutput || groups[i].relayController;

				for (var j = 0; j < groups[i].channels.length; j++) {

					if (groups[i].channels[j].chanId == this.props.formState.chanId) {
						correctionFactor = groups[i].channels[j].correctionFactor;
					}
				}
			}
		}

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container-fluid" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"form",
				{ onSubmit: this.submit, className: "form-horizontal" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"ul",
					{ className: "nav nav-tabs formTabs", ref: el => this.tabs = el },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"li",
						{ role: "presentation", className: "active" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"a",
							{ "data-target": "#cell_" + this.state.unique, "data-toggle": "tab" },
							"Cell configuration"
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"li",
						{ role: "presentation" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"a",
							{ "data-target": "#tracker_" + this.state.unique, "data-toggle": "tab" },
							"Tracker"
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"li",
						{ role: "presentation" },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"a",
							{ "data-target": "#iv_" + this.state.unique, "data-toggle": "tab" },
							"j(V) curves"
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "tab-content" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "tab-pane active", id: "cell_" + this.state.unique },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ className: "col-sm-3" },
								"Device name"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "cellName", id: "cellName", className: "form-control", placeholder: "Device name", disabled: active, value: this.state.cellName, onChange: this.handleInputChange }),
								active ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "help-block" },
									"The device name cannot be changed once the device is in active mode"
								) : null
							)
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ htmlFor: "cellarea", className: "col-sm-3" },
								"Device area"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "input-group" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", step: "0.01", disabled: active, name: "cellArea", id: "cellArea", className: "form-control col-sm-9", placeholder: "Cell area", value: this.state.cellArea, onChange: this.handleInputChange }),
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
								),
								active ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "help-block" },
									"The area cannot be changed once the device is in active mode"
								) : null
							)
						),
						relayController && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ htmlFor: "cellarea", className: "col-sm-3" },
								"Connection"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "connection", value: "group", onClick: this.handleInputChange, checked: this.state.connection == 'group' }),
										" Cell enclosure"
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "connection", value: "external", onClick: this.handleInputChange, checked: this.state.connection == 'external' }),
										" External connection"
									)
								)
							)
						),
						lightSourceSelect && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ htmlFor: "cellarea", className: "col-sm-3" },
								"Light source"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "lightSource", value: "pd_pyr", onClick: this.handleInputChange, checked: this.state.lightSource == 'pd_pyr' }),
										" Photodiode / Pyranometer"
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "lightSource", value: "manual", onClick: this.handleInputChange, checked: this.state.lightSource == 'manual' }),
										" Manual value"
									)
								)
							)
						),
						this.state.connection == "external" || this.state.lightSource == "manual" ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ htmlFor: "cellarea", className: "col-sm-3" },
								"Light intensity"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "input-group" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "lightRefValue", value: this.state.lightRefValue, onChange: this.handleInputChange }),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"span",
										{ className: "input-group-addon" },
										"W m",
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											"sup",
											null,
											"-2"
										)
									)
								)
							)
						) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"div",
							{ className: "form-group" },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"label",
								{ htmlFor: "cellarea", className: "col-sm-3" },
								"Correction factor"
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "col-sm-9" },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "correctionFactor_type", value: "factory", onClick: this.handleInputChange, checked: this.state.correctionFactor_type == 'factory' }),
										" Factory settings (",
										correctionFactor,
										")"
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "radio" },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										"label",
										null,
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio", name: "correctionFactor_type", value: "manual", onClick: this.handleInputChange, checked: this.state.correctionFactor_type == 'manual' }),
										" Manual value ",
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "form-control", disabled: this.state.correctionFactor_type == 'factory', name: "correctionFactor_value", onChange: this.handleInputChange, value: this.state.correctionFactor_value })
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									"div",
									{ className: "help-block" },
									"Correction factor to the sun intensity. Use it to account for the geometrical uniformity of the light source, such as the edge effects. The correction goes as effective_sun = measured_sun / correction_factor."
								)
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "tab-pane", id: "tracker_" + this.state.unique },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__cellformtracking_jsx__["a" /* default */], _extends({}, this.props, this.state, { onFormChange: this.subFormChanged }))
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"div",
						{ className: "tab-pane", id: "iv_" + this.state.unique },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__cellformjv_jsx__["a" /* default */], _extends({}, this.state, { onFormChange: this.subFormChanged }))
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "btn-group pull-right" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-default", name: "update", onClick: this.close },
					"Close"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"button",
					{ type: "button", className: "btn btn-primary", name: "update", onClick: this.validateConfig },
					"Update channel"
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CellForm);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment_json__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__app_environment_json__);




class CellFormTracking extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.onFormChange(name, value);
	}

	componentDidUpdate() {}

	render() {

		let active = !!this.props.enable && this.props.tracking_mode > 0;
		const LSB = __WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].LSB || 1.22;
		const LSBVal = __WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].LSBValue || 0.001;
		let gainOptions = [];

		switch (__WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].ADC.model) {

			case 'ADS1259':
				gainOptions = [[0, 1 / 8], [1, 1 / 4], [2, 1 / 2], [3, 1], [4, 2], [5, 4], [6, 8], [7, 16], [8, 32], [9, 64], [10, 128]];
				break;

			case 'ADS1147':
				gainOptions = [[1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [32, 32], [64, 64], [128, 128]];
				break;
		}

		gainOptions = gainOptions.map(([code, gain], index) => {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'option',
				{ key: index, value: code },
				'+/- ',
				parseFloat((__WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].fsr / gain).toPrecision(2)),
				' mA'
			);
		});

		gainOptions.unshift(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'option',
			{ key: 'auto', value: '-1' },
			'Auto'
		));

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_mode', className: 'col-sm-3' },
					'Tracking mode'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_mode', id: 'tracking_mode', className: 'form-control', value: this.props.tracking_mode, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0', value: '0' },
							'No tracking'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '1', value: '1' },
							'Maximum power point'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '2', value: '2' },
							'Open circuit voltage'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '3', value: '3' },
							'Short circuit current'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '4', value: '4' },
							'Constant voltage'
						)
					)
				)
			),
			this.props.tracking_mode == 4 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_mode', className: 'col-sm-3' },
					'Voltage'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', min: -__WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].voltageRange, max: +__WEBPACK_IMPORTED_MODULE_1__app_environment_json___default.a.instrument[this.props.instrumentConfig.instrumentId].voltageRange, className: 'form-control', name: 'tracking_voltage', value: this.props.tracking_voltage, onChange: this.handleInputChange })
				)
			) : null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_step', className: 'col-sm-3' },
					'Tracking step'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_stepsize', id: 'tracking_stepsize', className: 'form-control', value: this.props.tracking_step, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv1', value: LSBVal * 1 },
							LSB * 1,
							' mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv2', value: LSBVal * 2 },
							LSB * 2,
							' mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv3', value: LSBVal * 3 },
							LSB * 3,
							' mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv4', value: LSBVal * 4 },
							LSB * 4,
							' mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv5', value: LSBVal * 5 },
							LSB * 5,
							' mV'
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_interval', className: 'col-sm-3' },
					'Sampling rate'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_interval', id: 'tracking_interval', className: 'form-control', value: this.props.tracking_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0sps', value: '0' },
							'As fast as possible'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '100sps', value: '100' },
							'10 samples per second'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '1000sps', value: '1000' },
							'1 sample per second'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '10000sps', value: '10000' },
							'6 samples per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '60000sps', value: '60000' },
							'1 sample per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '600000sps', value: '600000' },
							'6 samples per hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '3600000sps', value: '3600000' },
							'1 sample per hour'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'help-block col-sm-9' },
					'The number of points per second sampled by the tracking algorithm. This value is not guaranteed. It depends on the aquistion speed and the number of channels enabled.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_fwbwthreshold', className: 'col-sm-3' },
					'Forward to backward threshold'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_fwbwthreshold', id: 'tracking_fwbwthreshold', className: 'form-control', value: this.props.tracking_fwbwthreshold, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0', value: '0' },
							'0%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0004', value: '0.0004' },
							'0.04%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0008', value: '0.0008' },
							'0.08%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0016', value: '0.0016' },
							'0.16%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0032', value: '0.0032' },
							'0.32%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0064', value: '0.0064' },
							'0.64%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0128', value: '0.0128' },
							'1.3%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0256', value: '0.0256' },
							'2.6%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.0512', value: '0.0512' },
							'5.1%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.1024', value: '0.1024' },
							'10.2%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '0.2048', value: '0.2048' },
							'20.4%'
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_bwfwthreshold', className: 'col-sm-3' },
					'Backward to forward threshold'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_bwfwthreshold', id: 'tracking_bwfwthreshold', className: 'form-control', value: this.props.tracking_bwfwthreshold, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0' },
							'0%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0004' },
							'0.04%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0008' },
							'0.08%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0016' },
							'0.16%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0032' },
							'0.32%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0064' },
							'0.64%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0128' },
							'1.3%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0256' },
							'2.6%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.0512' },
							'5.1%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.1024' },
							'10.2%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.2048' },
							'20.4%'
						)
					)
				)
			),
			!!this.props.tracking_mode == 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group row' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'label',
							{ className: 'col-sm-9' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'tracking_measure_voc', checked: !!this.props.tracking_measure_voc, onChange: this.handleInputChange }),
							' Measure V',
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'sub',
								null,
								'oc'
							),
							' periodically'
						)
					)
				),
				!!this.props.tracking_measure_voc && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ htmlFor: 'tracking_measure_voc_interval', className: 'col-sm-3' },
						'Measure every'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'select',
							{ name: 'tracking_measure_voc_interval', id: 'tracking_measure_voc_interval', className: 'form-control', value: this.props.tracking_measure_voc_interval, onChange: this.handleInputChange },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '60000' },
								'Every minute'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '600000' },
								'Every 10 minutes'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '3600000' },
								'Every hour'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '10800000' },
								'Every 3 hours'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '43200000' },
								'Every 12 hours'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '86400000' },
								'Every day'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '604800000' },
								'Every week'
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group row' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'label',
							{ className: 'col-sm-9' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'tracking_measure_jsc', checked: !!this.props.tracking_measure_jsc, onChange: this.handleInputChange }),
							' Measure J',
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'sub',
								null,
								'sc'
							),
							' periodically'
						)
					)
				),
				!!this.props.tracking_measure_jsc && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ htmlFor: 'tracking_measure_jsc_interval', className: 'col-sm-3' },
						'Measure every'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'select',
							{ name: 'tracking_measure_jsc_interval', id: 'tracking_measure_jsc_interval', className: 'form-control', value: this.props.tracking_measure_jsc_interval, onChange: this.handleInputChange },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '60000' },
								'Every minute'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '600000' },
								'Every 10 minutes'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '3600000' },
								'Every hour'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '10800000' },
								'Every 3 hours'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '43200000' },
								'Every 12 hours'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '86400000' },
								'Every day'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '604800000' },
								'Every week'
							)
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_record_interval', className: 'col-sm-3' },
					'Recording rate'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_record_interval', id: 'tracking_record_interval', className: 'form-control', value: this.props.tracking_record_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '1000sps_record', value: '1000' },
							'1 point per second'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '10000sps_record', value: '10000' },
							'6 points per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '60000sps_record', value: '60000' },
							'1 point per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '600000sps_record', value: '600000' },
							'6 points per hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '3600000sps_record', value: '3600000' },
							'1 point per hour'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'help-block col-sm-9' },
					'The number of points per second recorded into the database.'
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CellFormTracking);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class CellFormTracking extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.props.onFormChange(name, value);
	}

	componentDidUpdate() {}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ className: 'col-sm-3' },
					'Starting voltage'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'input-group' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'input-group-addon' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'label',
								null,
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'iv_autostart', id: 'iv_autostart', onClick: this.handleInputChange, checked: !!this.props.iv_autostart }),
								'\xA0V',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'sub',
									null,
									'oc'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', min: '-2.5', max: '2.5', step: '0.001', name: 'iv_start', id: 'iv_start', disabled: !!this.props.iv_autostart, className: 'form-control', placeholder: '1', value: this.props.iv_start, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'input-group-addon' },
							'V'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'help-block' },
						'Click on "Voc" for an auto-start voltage value of the j-V curve. The Voc will be determined and the j-V curve will start at (Voc + 20mV).'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ className: 'col-sm-3' },
					'Ending voltage'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'input-group' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', min: '-2.5', max: '2.5', step: '0.001', name: 'iv_stop', id: 'iv_stop', className: 'form-control', placeholder: '1', value: this.props.iv_stop, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'input-group-addon' },
							'V'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'help-block' },
						'We recommend stopping the sweep slightly below 0V (e.g. -0.1V) to allow a Jsc determination.'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ className: 'col-sm-3' },
					'Sweep rate'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'input-group' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', min: '0.0005', max: '0.1', step: '0.0001', name: 'iv_rate', id: 'iv_rate', className: 'form-control', placeholder: '0.01', value: this.props.iv_rate, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'input-group-addon' },
							'V/s'
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group row' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'iv_hysteresis', checked: !!this.props.iv_hysteresis, onChange: this.handleInputChange }),
						' Scan in both directions'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'Measurement intervals'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group row' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { value: 'fixed', type: 'radio', name: 'iv_measurement_interval_type', checked: this.props.iv_measurement_interval_type == 'fixed', onChange: this.handleInputChange }),
						' Measure at fixed intervals'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'iv_interval', className: 'col-sm-3' },
					'Measurement interval'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ disabled: this.props.iv_measurement_interval_type == 'auto', name: 'iv_interval', id: 'iv_interval', className: 'form-control', value: this.props.iv_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '60000' },
							'Every minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '600000' },
							'Every 10 minutes'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '3600000' },
							'Every hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '10800000' },
							'Every 3 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '43200000' },
							'Every 12 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '86400000' },
							'Every day'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '604800000' },
							'Every week'
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group row' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'radio', value: 'auto', name: 'iv_measurement_interval_type', checked: this.props.iv_measurement_interval_type == 'auto', onChange: this.handleInputChange }),
						' Automatic intervals'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'iv_interval', className: 'col-sm-3' },
					'Measure upon efficiency drop'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'iv_measurement_interval_auto_pdrop', id: 'iv_measurement_interval_auto_pdrop', className: 'form-control', value: this.props.iv_measurement_interval_auto_pdrop, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.25' },
							'0.25%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '0.5' },
							'0.5%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '1' },
							'1%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '2' },
							'2%'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '3' },
							'3%'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'help-block' },
						'A j-V curve measurement will be triggered when the PCE of the device changes by X percentage point. Only works with MPP tracking.'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-sm-9' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'help-block' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'small',
						null,
						'The following intervals are checked for each tracking point that is recorded (see the "record interval" in the "Tracking" tab.) For example, if the recording interval is set to 1 point every 10 minutes, setting the minimum interval to 1 minute will have the same effect as setting it to every 10 minutes.'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'iv_interval', className: 'col-sm-3' },
					'With a minimum interval of'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ disabled: this.props.iv_measurement_interval_type == 'fixed', name: 'iv_measurement_interval_auto_minTime', id: 'iv_measurement_interval_auto_minTime', className: 'form-control', value: this.props.iv_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '60000' },
							'1 minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '600000' },
							'10 minutes'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '3600000' },
							'1 hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '10800000' },
							'3 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '43200000' },
							'12 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '86400000' },
							'1 day'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '604800000' },
							'1 week'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'help-block' },
					'Sets a minimum interval under which the j-V curve will not be measured, even if the PCE has changed above the threshold.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'iv_interval', className: 'col-sm-3' },
					'With a maximum interval of'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ disabled: this.props.iv_measurement_interval_type == 'fixed', name: 'iv_measurement_interval_auto_maxTime', id: 'iv_measurement_interval_auto_maxTime', className: 'form-control', value: this.props.iv_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '600000' },
							'10 minutes'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '3600000' },
							'1 hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '10800000' },
							'3 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '43200000' },
							'12 hours'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '86400000' },
							'1 day'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '604800000' },
							'1 week'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ value: '-1' },
							'Never'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'help-block' },
					'Sets a maximum time interval. Even if the power hasn\'t changed above the threshold, the j-V curve will be measured at this interval.'
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CellFormTracking);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })
/******/ ]);