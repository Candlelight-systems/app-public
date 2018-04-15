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

module.exports = jQuery;

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_influxform_jsx__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jsx_error_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jsx_influx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_electron__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_electron__);






const dialog = __WEBPACK_IMPORTED_MODULE_5_electron__["remote"].dialog;

let data;
__WEBPACK_IMPORTED_MODULE_5_electron__["ipcRenderer"].on("loadForm", (event, d) => {

	data = d;
	render();
});

function onValidate(formData) {

	__WEBPACK_IMPORTED_MODULE_5_electron__["ipcRenderer"].send('validateForm', formData);
}

function onClose() {

	__WEBPACK_IMPORTED_MODULE_5_electron__["ipcRenderer"].send('closeForm');
}

function pad(number) {

	if (number < 10) {
		return "0" + number;
	}
	return number;
}

function downloadData(measurementName) {

	__WEBPACK_IMPORTED_MODULE_5_electron__["ipcRenderer"].send("downloadData", data.config, this.state.serverState.measurementName);
}

function removeData(measurementName) {

	dialog.showMessageBox({
		type: 'question',
		message: 'Are you sure that you want to delete this measurement ?',
		cancelId: 0,
		defaultId: 0,
		title: "Delete this measurement ?",
		buttons: ["Cancel", "Yes"]
	}, async index => {

		if (index == 1) {

			try {

				await fetch(`http://${data.config.trackerHost}:${data.config.trackerPort}/dropMeasurement?measurementName=${measurementName}`);
				await Object(__WEBPACK_IMPORTED_MODULE_4__jsx_influx__["a" /* query */])(`DROP MEASUREMENT ${measurementName};`, data.configDB.db, data.configDB);
				render();
			} catch (e) {

				dialog.showMessageBox({
					type: 'error',
					message: `Error in removing the measurement. The error was :${e.toString()}. Make sure that the database and the server can be accessed.`,
					cancelId: 0,
					defaultId: 0,
					title: "Error",
					buttons: ["Ok"]
				});
			}
		}
	});
}

function formatDate(dateVal) {
	let d = new Date(dateVal);
	return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

async function render() {

	try {

		if (!data.config) {
			throw new __WEBPACK_IMPORTED_MODULE_3__jsx_error_jsx__["a" /* default */](`The tracker host is not defined. Open an instrument first before selecting this menu.`);
		}

		let json = await fetch("http://" + data.config.trackerHost + ":" + data.config.trackerPort + "/getAllMeasurements", {
			method: 'GET'
		}).then(response => response.json()).catch(() => {
			throw new __WEBPACK_IMPORTED_MODULE_3__jsx_error_jsx__["a" /* default */](`Error while connecting to the instrument. Check that you are online and that the instrument is available on your network.`);
		});

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

					switch (val.cellInfo.trackingMode) {
						case 'MPP':
							tracking = 'Maximum power point';
							break;

						case 'CONSTV':
							tracking = `Constant voltage`;
							break;

						case 'JSC':
							tracking = `Short circuit current`;
							break;

						case 'VOC':
							tracking = `Open circuit voltage`;
							break;
					}

					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'li',
						{ className: 'list-group-item', key: val.measurementName },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'pull-right' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-sm btn-primary', onClick: () => downloadData(val.measurementName) },
								'Download data'
							),
							val.endDate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-sm btn-danger', onClick: () => removeData(val.measurementName) },
								'Delete data'
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
							val.endDate ? formatDate(val.endDate) + " (" + Math.round((val.endDate - val.startDate) / 1000 / 3600 * 10) / 10 + "h)" : '(Running)'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							null,
							'Tracking mode: ',
							tracking
						)
					);
				})
			)
		), document.getElementById('root'));
	} catch (error) {

		__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__jsx_error_jsx__["a" /* default */], { message: error.props, errorMethods: [["Try again", render]] })
		), document.getElementById('root'));
	}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(1);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class Error extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var messages = [];
    if (this.props.methods && Array.isArray(this.props.method)) {

      for (var i = 0; i < this.props.methods.length; i++) {
        messages.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { key: this.props.methods[i][0] },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "#", onClick: this.props.methods[i][1] },
            this.props.methods[i][0]
          )
        ));
      }
    }
    {
      !!this.props.method && [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null)];
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "error" },
      "The system encountered an unfortunate error: ",
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
      " ",
      this.props.message,
      " ",
      messages,
      " "
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Error);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return query; });
/* unused harmony export ping */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
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

let ping = function (cfg) {
	return fetch("http://" + cfg.host + ":" + cfg.port + "/ping", { method: 'GET' });
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })
/******/ ]);