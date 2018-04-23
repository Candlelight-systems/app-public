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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_cellform_jsx__ = __webpack_require__(4);




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
	;
	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_cellform_jsx__["a" /* default */], {
		instrumentConfig: data.instrumentConfig,
		formState: data.channelState,
		onValidate: onValidate,
		onClose: onClose }), document.getElementById('root'));
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellformtracking_jsx__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellformjv_jsx__ = __webpack_require__(7);
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
			connection: "group"
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
	}

	componentWillReceiveProps(nextProps) {

		this.setState(nextProps.formState);
	}

	render() {

		let active = !!this.state.enable && this.state.tracking_mode > 0;

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
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "cellName", id: "cellName", className: "form-control", placeholder: "Device name", disabled: active, value: this.state.cellName, onChange: this.handleInputChange })
							),
							active ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								"div",
								{ className: "help-block" },
								"The device name cannot be changed once the device is in active mode"
							) : null
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
										"mA cm",
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
						this.props.instrumentConfig.relayController && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
						this.state.connection == "external" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment_json__ = __webpack_require__(6);
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
							{ key: 'mv1', value: '0.001' },
							'1 mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv2', value: '0.002' },
							'2 mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv3', value: '0.003' },
							'3 mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv4', value: '0.004' },
							'4 mV'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'mv5', value: '0.005' },
							'5 mV'
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
					'Tracking interval'
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
					'This value is not guaranteed. It depends on the aquistion speed and the number of channels enabled.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'tracking_record_interval', className: 'col-sm-3' },
					'Record interval'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'tracking_record_interval', id: 'tracking_record_interval', className: 'form-control', value: this.props.tracking_record_interval, onChange: this.handleInputChange },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: 'never_record', value: 'null' },
							'Never'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '500sps_record', value: '500' },
							'2 sample per second'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '1000sps_record', value: '1000' },
							'1 sample per second'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '10000sps_record', value: '10000' },
							'6 samples per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '60000sps_record', value: '60000' },
							'1 sample per minute'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '600000sps_record', value: '600000' },
							'6 samples per hour'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'option',
							{ key: '3600000sps_record', value: '3600000' },
							'1 sample per hour'
						)
					)
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
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CellFormTracking);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"ageing":true,"statuses":{"light":{"version":"readonly","readonly":true},"heat":{}},"instrument":{"Outdoor modules":{"ADC":{"model":"ADS1259"},"fsr":30,"voltageRange":2.5,"groups":{"Box 1":{"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":true,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":true}}}}}}

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
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ className: 'col-sm-3' },
					'Measure in both directions'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'iv_hysteresis', checked: !!this.props.iv_hysteresis, onChange: this.handleInputChange })
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					{ htmlFor: 'iv_interval', className: 'col-sm-3' },
					'Measure every'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'col-sm-9' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ name: 'iv_interval', id: 'iv_interval', className: 'form-control', value: this.props.iv_interval, onChange: this.handleInputChange },
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