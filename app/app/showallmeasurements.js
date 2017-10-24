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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_influxform_jsx__ = __webpack_require__(4);




const { ipcRenderer } = __webpack_require__(6);

ipcRenderer.on("loadForm", (event, data) => {
	render(data);
});

function onValidate(formData) {

	ipcRenderer.send('validateForm', formData);
}

function onClose() {

	ipcRenderer.send('closeForm');
}

function pad(number) {

	if (number < 10) {
		return "0" + number;
	}
	return number;
}

function downloadData(measurementName, cellInfo) {

	ipcRenderer.send("downloadData", cellInfo, undefined, measurementName);
}

function formatDate(dateVal) {
	let d = new Date(dateVal);
	return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

async function render(props) {

	console.log(props);
	let json = await fetch("http://" + props.config.trackerHost + ":" + props.config.trackerPort + "/getAllMeasurements", {

		method: 'GET'

	}).then(response => response.json());

	console.log(json);

	let jsonArray = [];
	for (var i in json) {
		jsonArray.push({
			measurementName: i,
			startDate: json[i].startDate,
			endDate: json[i].endDate,
			cellInfo: json[i].cellInfo });
	}

	jsonArray.sort((a, b) => {

		return a.startDate - b.startDate;
	});

	console.log(jsonArray);

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'container-fluid' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'ul',
			{ className: 'list-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'li',
				{ className: 'list-group-item list-group-item-success list-group-item-heading' },
				'All existing measurements'
			),
			jsonArray.map(val => {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					{ className: 'list-group-item', key: val.measurementName },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'pull-right' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'button',
							{ className: 'btn btn-sm btn-primary', onClick: () => downloadData(val.measurementName, val.cellInfo) },
							'Download data'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'strong',
							null,
							val.cellInfo.cellName
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						null,
						formatDate(val.startDate),
						' ',
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glypicon-arrow-left' }),
						' ',
						val.endDate ? formatDate(val.endDate) : 'Now'
					)
				);
			})
		)
	), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);



class AppForm extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {

		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateConfig = this.validateConfig.bind(this);
		this.close = this.close.bind(this);
		this.state = {};
	}

	validateConfig() {

		this.props.onValidate(this.state);
		this.close();
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
		console.log(this.state);
	}

	componentWillReceiveProps(nextProps) {

		this.setState(nextProps.formState);
	}

	componentDidMount() {

		this.setState(this.props.formState);
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'container-fluid' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'form',
				{ onSubmit: this.submit, className: 'form-horizontal' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h2',
					null,
					'Influx DB connection'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Host'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', name: 'host', id: 'host', className: 'form-control', placeholder: '', value: this.state.host, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'help-block' },
							'Most likely the ip address of the server running the database'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Port'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', name: 'port', id: 'port', className: 'form-control', placeholder: '8086', value: this.state.port, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'help-block' },
							'The connection port (by default, InfluxDB runs on 8086)'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Username'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', name: 'username', id: 'username', className: 'form-control', placeholder: '', value: this.state.username, onChange: this.handleInputChange })
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Password'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', name: 'password', id: 'password', className: 'form-control', placeholder: '', value: this.state.password, onChange: this.handleInputChange })
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Database name'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-9' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', name: 'db', id: 'db', className: 'form-control', placeholder: '', value: this.state.db, onChange: this.handleInputChange }),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'help-block' },
							'The name of the default database'
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'btn-group pull-right' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ type: 'button', className: 'btn btn-default', name: 'update', onClick: this.close },
					'Close'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ type: 'button', className: 'btn btn-primary', name: 'update', onClick: this.validateConfig },
					'Update'
				)
			)
		);
	}
}

/* unused harmony default export */ var _unused_webpack_default_export = (AppForm);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })
/******/ ]);