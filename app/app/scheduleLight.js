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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_scheduleLight_jsx__ = __webpack_require__(5);




const { ipcRenderer } = __webpack_require__(1);

//var arg = ipcRenderer.sendSync("loadCellForm");

ipcRenderer.on("loadForm", (event, data) => {

	render(data);
});

function onClose() {
	ipcRenderer.send('closeForm');
}

function render(data) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_scheduleLight_jsx__["a" /* default */], { instrumentId: data.instrumentId, groupName: data.groupName, config: data.config, onClose: onClose }), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6__);




class ScheduleLight extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	/**
  *	@param props.name The name of the cell
  */
	constructor(props) {
		super(props);

		this.state = {
			controller: false,
			fixed_intensity: {},
			fixed_intensity_val: {},
			schedule_basis: {},
			schedule_values: {},
			error: false
		};

		this.apply = this.apply.bind(this);
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleFocus(event) {
		event.target.select();
	}

	async save() {

		let state = await this.apply();

		//this.close();
	}

	async apply() {

		let saveJSON = {
			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			control: {
				setPoint: this.state.fixed_intensity ? parseFloat(this.state.fixed_intensity_val) : false,
				scheduling: {
					enable: !this.state.fixed_intensity,
					basis: this.state.schedule_basis,
					intensities: this.state.schedule_values.split("\n").map(val => parseFloat(val))
				}
			}
		};

		let body = JSON.stringify(saveJSON);

		var headers = new Headers({
			"Content-Type": "application/json",
			"Content-Length": body.length.toString()
		});

		this.setState({
			message: "Saving light controllers and setting new light intensity. This may take a while...",
			error: false,
			success: false
		});

		return fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/lightSetControl`, {

			method: 'POST',
			headers: headers,
			body: body

		}).then(response => {

			if (!response.ok) {
				throw Error(response.statusText);
			}

			this.setState({
				error: false,
				success: "Success !"
			});

			__WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("light.updated");
		}).catch(error => {

			this.setState({
				error: "Error while saving the controller data",
				success: false
			});

			return Promise.reject();
		}).then(value => {

			this.setState({
				message: false
			});

			return value;
		});
	}

	close() {
		this.props.onClose();
	}

	async componentDidMount() {

		this.graph = new __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a(this.graphDom, { paddingBottom: 40 });

		this.graph.resize(400, 300);
		this.graph.newSerie("schedule").autoAxis();
		this.graph.getBottomAxis().setLabel("Time").setUnitWrapper('(', ')');
		this.graph.getLeftAxis().setLabel("Sun intensity").forceMin(-0.1).forceMax(2.1);

		this.setState({ message: "Fetching light controllers..." });

		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/lightGetControl?instrumentId=" + this.props.instrumentId + "&groupName=" + this.props.groupName, {

			method: 'GET'

		}).then(values => values.json()).then(controller => {

			return this.setState(state => ({
				error: false,
				controller: controller,
				fixed_intensity: !controller.scheduling.enable,
				fixed_intensity_val: parseFloat(controller.setPoint),
				schedule_basis: controller.scheduling.basis,
				schedule_values: controller.scheduling.intensities.join("\n")
			}));
		}).catch(error => {

			// Catching JSON or request errors
			console.error(error);
			let errorMessage = "Error in getting the controller for group name \"" + this.props.groupName + "\"";
			this.setState({
				success: false,
				error: errorMessage
			});
		}).then(() => {

			this.setState({
				message: false,
				success: false
			});
		});
	}

	componentDidUpdate() {

		var waveform = __WEBPACK_IMPORTED_MODULE_2_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]);

		if (this.state.fixed_intensity) {

			waveform.setData([this.state.fixed_intensity_val, this.state.fixed_intensity_val], [0, 10]);
		} else {

			if (this.state.schedule_values) {

				let values = this.state.schedule_values.split("\n").map(val => parseFloat(val)),
				    length = values.length;

				let data = [],
				    dataX = [],
				    scaling;

				switch (this.state.schedule_basis) {
					case 3600:
						// in minutes
						scaling = 60 / length;
						this.graph.getBottomAxis().setUnit('minutes');
						break;

					case 86400:
						// in minutes
						scaling = 24 / length;
						this.graph.getBottomAxis().setUnit('hours');
						break;
				}

				values.forEach((val, index) => {

					if (index > 0) {
						data.push(values[index - 1]);
						dataX.push(index * scaling);
					}

					data.push(val);
					dataX.push(index * scaling);
				});

				data.push(values[values.length - 1]);
				dataX.push(values.length * scaling);

				data.push(values[0]);
				dataX.push(values.length * scaling);

				waveform.setData(data, dataX);
			}
		}

		if (this.graph) {
			this.graph.getSerie("schedule").setWaveform(waveform);
			this.graph.autoscaleAxes();
			this.graph.draw();
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	render() {

		var fixed_intensity_error = this.state.fixed_intensity_val > 0 && this.state.fixed_intensity_val < 0.25;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'container-fluid', id: 'calib_light_list' },
			!!this.state.success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'alert alert-success' },
				this.state.success
			),
			!!this.state.error && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'alert alert-danger' },
				this.state.error
			),
			!!this.state.message && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'alert alert-info' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-info-sign', 'aria-hidden': 'true' }),
				' ',
				this.state.message
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-sm-4' },
				!!this.state.controller && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'form-group' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'label',
							null,
							'Light controller :'
						),
						' ',
						this.props.groupName
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'form-group' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'checkbox' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'label',
								null,
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'fixed_intensity', checked: this.state.fixed_intensity, onChange: this.handleInputChange }),
								' Fixed intensity'
							)
						)
					),
					this.state.fixed_intensity ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: "form-group " + (fixed_intensity_error ? 'has-error' : '') },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'label',
							null,
							'Intensity'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control', type: 'number', min: '0', max: '1.5', step: '0.01', name: 'fixed_intensity_val', value: this.state.fixed_intensity_val, onChange: this.handleInputChange }),
						fixed_intensity_error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'help-block alert-danger' },
							'The power supply cannot sustain light intensities below 0.25 sun. It will automatically turn off'
						) : ""
					) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'form-group' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'label',
								null,
								'Time basis :'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'select',
								{ className: 'form-control', name: 'schedule_basis', value: this.state.schedule_basis, onChange: this.handleInputChange },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'option',
									{ value: 'null', disabled: 'disabled' },
									'Choose a time basis'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'option',
									{ value: '3600' },
									'1 hour'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'option',
									{ value: '86400' },
									'1 day'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'form-group' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'label',
								null,
								'Light intensities :'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { className: 'form-control', name: 'schedule_values', value: this.state.schedule_values, onChange: this.handleInputChange, onFocus: this.handleFocus }),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'span',
								{ className: 'help-block' },
								'Enter values (in suns) separated by new lines. Check the graph on the right'
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'btn-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'button',
						{ className: 'btn-primary btn', onClick: this.apply },
						'Apply'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'button',
						{ className: 'btn-primary btn', onClick: this.save },
						'Validate'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'button',
						{ className: 'btn-default btn', onClick: this.close },
						'Close'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'col-sm-5' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'label',
					null,
					'Light profile vs time'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { ref: el => {
						this.graphDom = el;
					} })
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (ScheduleLight);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ })
/******/ ]);