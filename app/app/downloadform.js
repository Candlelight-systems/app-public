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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_downloadform_jsx__ = __webpack_require__(6);




const { ipcRenderer } = __webpack_require__(0);

ipcRenderer.on("loadForm", (event, data) => {
	render(data);
});

function onValidate(formData) {

	ipcRenderer.send('validateForm', formData);
}

function onClose() {

	ipcRenderer.send('closeForm');
}

function render(props) {

	__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_downloadform_jsx__["a" /* default */], { db: props.db, measurementName: props.measurementName, cellInfo: props.cellInfo, instrumentId: props.instrumentId, chanId: props.chanId, onValidate: onValidate, onClose: onClose }), document.getElementById('root'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_util_filebuilder__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__influx__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_util_svgToPDF__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfkit__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfkit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfkit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_electron__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_electron__);

const { dialog } = __webpack_require__(0).remote;








class DownloadForm extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.makeDownload = this.makeDownload.bind(this);
		this.downloadPDF = this.downloadPDF.bind(this);
		this.close = this.close.bind(this);
		this.state = {
			dl_format: 'itx'
		};
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

	componentWillReceiveProps(nextProps) {}

	componentDidMount() {}

	async makeDownload(track = true, jv = true, vocjsc = true) {

		let outputfile;

		if (this.state.dl_format == "itx") {
			outputfile = new __WEBPACK_IMPORTED_MODULE_2__app_util_filebuilder__["b" /* ITXBuilder */]();
		} else {
			outputfile = new __WEBPACK_IMPORTED_MODULE_2__app_util_filebuilder__["a" /* CSVBuilder */]();
		}

		let fileappend = [];
		if (track) {
			await this.downloadTrack(outputfile);
			fileappend.push("track");
		}

		if (jv) {
			await this.downloadIV(outputfile);
			fileappend.push("jv");
		}

		if (vocjsc) {
			await this.downloadVocJsc(outputfile);
			fileappend.push("vocjsc");
		}

		dialog.showSaveDialog({

			message: "Save the data for the cell \"" + this.props.cellInfo.cellName + "\"",
			defaultPath: `~/${this.props.cellInfo.cellName}_${fileappend.join("_")}.${this.state.dl_format}`

		}, fileName => {

			__WEBPACK_IMPORTED_MODULE_1_fs___default.a.writeFileSync(fileName, outputfile.build());
		});
	}

	async downloadTrack(outputfile) {

		let data = await this.getTrackData();
		outputfile.addWaveform(data.efficiency, {
			waveName: "Efficiency",
			waveNameX: "Time_MPP_h"
		});

		outputfile.addWaveform(data.power, {
			waveName: "Power",
			noXWave: true
		});

		outputfile.addWaveform(data.voltage, {
			waveName: "Voltage",
			noXWave: true
		});

		outputfile.addWaveform(data.current, {
			waveName: "Current",
			noXWave: true
		});

		outputfile.addWaveform(data.temperature, {
			waveName: "Temperature",
			noXWave: true
		});

		outputfile.addWaveform(data.sun, {
			waveName: "Sun",
			noXWave: true
		});

		outputfile.addWaveform(data.humidity, {
			waveName: "Humidity",
			noXWave: true
		});
	}

	async downloadVocJsc(outputfile) {

		let data = await this.getVocJscData();

		outputfile.addWaveform(data.waveVoc, {
			waveName: "Voc",
			waveNameX: "Time_voc_h"
		});

		outputfile.addWaveform(data.waveJsc, {
			waveName: "Jsx",
			waveNameX: "Time_jsc_h"
		});
	}

	async downloadIV(outputfile) {

		let data = await this.getJVData();
		data[0].map(data => {

			if (!data.wave) {
				return;
			}

			outputfile.addWaveform(data.wave, {
				waveName: "Current_" + data.time_h + "h",
				waveNameX: "Voltage_" + data.time_h + "h"
			});
		});
	}

	/*
 	plotMPPT( data ) {
 
 		let graph, serie;
 		graph = this.newTimeGraph();
 		graph.getLeftAxis( 0 )
 				.setLabel("Efficiency")
 				.setUnit("%")
 				.setSpan( 0.75, 1.00 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.setLineAt( [ 0 ] );
 
 		graph.newSerie("efficiency").setLabel("PCE").autoAxis().setYAxis( graph.getLeftAxis( 0 ) ).setLineColor("#1f1fae").setLineWidth(2).setWaveform( data.efficiency );
 		
 		graph.getLeftAxis( 1 )
 				.setLabel("Vmpp")
 				.setUnit("V")
 				.setSpan( 0.6, 0.73 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.setLineAt( [ 0 ] );
 
 		graph.newSerie("Voltage").autoAxis().setYAxis( graph.getLeftAxis( 1 ) ).setLineColor("#1f8eae").setLineWidth(2).setWaveform( data.voltage );
 		
 		graph.getLeftAxis( 2 )
 				.setLabel("Jmpp")
 				.setUnit("A")
 				.setSpan( 0.45, 0.58 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.setScientific( true )
 				.setUnitDecade( true )
 				.setLineAt( [ 0 ] );
 
 
 		graph.newSerie("Current").autoAxis().setYAxis( graph.getLeftAxis( 2 ) ).setLineColor("#1fae76").setLineWidth(2).setWaveform( data.current );
 		
 		graph.getLeftAxis( 3 )
 				.setLabel("Sun")
 				.setUnit("-")
 				.setSpan( 0.3, 0.43 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.forceMin( 0 )
 				.setLineAt( [ 0 ] );
 
 		graph.newSerie("sun").autoAxis().setLabel("Sun").setYAxis( graph.getLeftAxis( 3 ) ).setLineColor("#7aae1f").setLineWidth(2).setWaveform( data.sun );
 		
 		graph.getLeftAxis( 4 )
 				.setLabel("Humidity")
 				.setUnit("%")
 				.setSpan( 0.15, 0.28 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.forceMin( 0 )
 				.forceMax( 100 )
 				.setLineAt( [ 0 ] );
 
 		graph.newSerie("humidity").autoAxis().setLabel("Hum.").setYAxis( graph.getLeftAxis( 4 ) ).setLineColor("#ae9b1f").setLineWidth(2).setWaveform( data.humidity );
 		
 		graph.getLeftAxis( 5 )
 				.setLabel("Temperature")
 				.setUnit("°C")
 				.setSpan( 0.0, 0.13 )
 				.setUnitWrapper("(", ")")
 				.gridsOff()
 				.forceMin( 0 )
 				.forceMax( 90 )
 				.setLineAt( [ 0 ] );
 
 		graph.newSerie("temeprature").autoAxis().setLabel("Temp.").setYAxis( graph.getLeftAxis( 5 ) ).setLineColor("#ae441f").setLineWidth(2).setWaveform( data.temperature );
 		
 		graph.makeLegend().setAutoPosition( "bottom" );
 		graph.updateLegend();
 		graph.draw();
 		graph.updateLegend();
 		graph.draw();
 		graph.updateLegend();
 
 		return svgToPDF( graph.getWrapper(), 600, 600 ).then( results => {
 
 			this.emptyFakeGraph();
 			return results;
 		} );
 	}
 
 	newTimeGraph() {
 		let graph = new Graph( this.fakeDom );
 		graph.resize( 600, 600 );
 		graph.getBottomAxis()
 				.setLabel("Time")
 				.setUnit("h")
 				.setUnitWrapper("(", ")")
 				.gridsOff();
 				
 
 		return graph;
 	}
 
 	emptyFakeGraph() {
 		while( this.fakeDom.firstChild ) {
 			this.fakeDom.removeChild( this.fakeDom.firstChild );
 		}
 	}*/

	getTrackData(getEfficiencyAtIntervals) {

		var db = this.props.db.db;

		return Object(__WEBPACK_IMPORTED_MODULE_3__influx__["a" /* query */])("SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time ASC limit 1;SELECT time,efficiency FROM \"" + this.props.measurementName + "\" ORDER BY time DESC limit 1;", db, this.props.db).then(async results => {

			if (!results[0].series) {
				throw "No measurement with the name " + this.props.measurementName + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000,
			    grouping = Math.max(1, Math.round(timeDifference / 1000));

			let toReturn = await Object(__WEBPACK_IMPORTED_MODULE_3__influx__["a" /* query */])("SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff, MEAN(power_mean) as pMean FROM \"" + this.props.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;", db, this.props.db).then(results => {

				let values = results[0].series[0].values,
				    offset,
				    waveEfficiency = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveVoltage = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveCurrent = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    wavePower = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

				waveEfficiency.setUnit("%");
				waveEfficiency.setXUnit("h");
				waveVoltage.setUnit("V");
				wavePower.setUnit("W");
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

					/*if( value[ 1 ] > 35 || value[ 1 ] < 0 ) { // Higher than 35% => fail. Lower than 0% => fail.
     	value[ 1 ] = NaN;
     	value[ 2 ] = NaN;
     }*/

					waveEfficiency.append(time, value[1]);
					waveVoltage.append(time, value[2]);
					waveCurrent.append(time, value[3]);
					wavePower.append(time, value[8]);
					waveHumidity.append(time, value[4]);
					waveSun.append(time, value[5]);
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
					power: wavePower,

					maxEfficiency: maxEfficiency,
					finalEfficiency: finalEfficiency,
					ellapsed: timeDifference / 3600 // in hours
				};
			});

			if (getEfficiencyAtIntervals) {

				let tfrom = new Date(timefrom).getTime() * 1000000;

				let time_1h = tfrom + 1000000000 * 3600;
				let time_24h = tfrom + 1000000000 * 3600 * 24;
				let time_100h = tfrom + 1000000000 * 3600 * 100;
				let time_500h = tfrom + 1000000000 * 3600 * 500;
				let time_1000h = tfrom + 1000000000 * 3600 * 1000;

				toReturn.timeEfficiencies = await Object(__WEBPACK_IMPORTED_MODULE_3__influx__["a" /* query */])(`
					SELECT efficiency FROM "${this.props.measurementName}" WHERE time > ${time_1h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${this.props.measurementName}" WHERE time > ${time_24h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${this.props.measurementName}" WHERE time > ${time_100h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${this.props.measurementName}" WHERE time > ${time_500h} ORDER BY time ASC LIMIT 1;
					SELECT efficiency FROM "${this.props.measurementName}" WHERE time > ${time_1000h} ORDER BY time ASC LIMIT 1;
				`, db, this.props.db).then(results => {

					return results.map(result => {

						if (!result.series) {
							return;
						}

						return result.series[0].values[0][1];
					});
				});
			}

			return toReturn;
		});
	}

	getVocJscData(getEfficiencyAtIntervals) {

		var db = this.props.db.db;

		let waveVoc = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
		    waveJsc = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
		    timefrom;

		return Object(__WEBPACK_IMPORTED_MODULE_3__influx__["a" /* query */])(`
			SELECT time,efficiency FROM "${this.props.measurementName}" ORDER BY time ASC limit 1;
			SELECT time,voc FROM "${this.props.measurementName}_voc" ORDER BY time ASC;
			SELECT time,jsc FROM "${this.props.measurementName}_jsc" ORDER BY time ASC;`, db, this.props.db).then(async results => {

			results.map((results, index) => {

				if (index == 0) {
					timefrom = new Date(results.series[0].values[0][0]);
					return;
				}

				if (!results.series) {
					return [];
				}

				return results.series[0].values.map(value => {

					let date = new Date(value[0]),
					    time = Math.round((date.getTime() - timefrom.getTime()) / 1000 / 3600 * 10) / 10,
					    val = value[1];

					if (index == 1) {
						waveVoc.append(time, val);
					} else if (index == 2) {
						waveJsc.append(time, val);
					}
				});
			});

			return {
				waveVoc: waveVoc,
				waveJsc: waveJsc
			};
		});
	}

	getJVData() {

		var db = this.props.db.db;

		let timefrom;

		return Object(__WEBPACK_IMPORTED_MODULE_3__influx__["a" /* query */])(`
			SELECT time,iv FROM "${this.props.measurementName}_iv" ORDER BY time ASC;`, db, this.props.db).then(async results => {

			return results.map((results, index) => {

				if (!results.series) {
					return {};
				}

				if (index == 0) {
					timefrom = new Date(results.series[0].values[0][0]);
				}

				return results.series[0].values.map(value => {

					let date = new Date(value[0]),
					    data = value[1].split(","),
					    wave = __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

					for (let i = 0; i < data.length; i += 2) {
						wave.append(parseFloat(data[i].replace('"', '')), parseFloat(data[i + 1].replace('"', '')));
					}

					return {
						wave: wave,
						time_h: Math.round((date.getTime() - timefrom.getTime()) / 1000 / 3600 * 10) / 10
					};
				});
			});
		});
	}

	async downloadPDF() {

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].send("htmlReport", this.props.cellInfo, this.props.chanId, this.props.measurementName);
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'container-fluid' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'form',
				{ onSubmit: this.submit, className: 'form-horizontal' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h3',
					null,
					'Download data for device "',
					this.props.cellInfo.cellName,
					'" ',
					this.props.chanId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						null,
						'( channel ',
						this.props.chanId,
						' )'
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'col-sm-3' },
						'Format'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-6' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'select',
							{ name: 'dl_format', id: 'dl_format', className: 'form-control', value: this.state.dl_format, onChange: this.handleInputChange },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: 'csv' },
								'Comma separated (.csv)'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: 'itx' },
								'Igor text file (.itx)'
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
						'Number of points'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-6' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'select',
							{ name: 'dl_track_nb', id: 'dl_track_nb', className: 'form-control', value: this.state.dl_track_nb, onChange: this.handleInputChange },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '100' },
								'100'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '300' },
								'300'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '1000' },
								'1000'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '3000' },
								'3000'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ value: '10000' },
								'10000'
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-sm-3' }),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-6' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'btn-group' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-primary', type: 'button', onClick: () => {
										this.makeDownload(true, false, false);
									} },
								'Download MPP'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-primary', type: 'button', onClick: () => {
										this.makeDownload(false, false, true);
									} },
								'Download Voc and Jsc'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-primary', type: 'button', onClick: () => {
										this.makeDownload(false, true, false);
									} },
								'Download JV'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-primary', type: 'button', onClick: () => {
										this.makeDownload(true, true, true);
									} },
								'Download All'
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'form-group' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-sm-3' }),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'col-sm-6' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'btn-group' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ className: 'btn btn-success', type: 'button', onClick: this.downloadPDF },
								'Make PDF report'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default', name: 'update', onClick: this.close },
								'Close'
							)
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'btn-group pull-right' })
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (DownloadForm);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CSVBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ITXBuilder; });

class FileBuilder {

	constructor() {

		this.waves = [];
	}

	addWaveform(waveform, options) {

		this.waves.push({
			data: waveform,
			options: options
		});
	}
}

class ITXBuilder extends FileBuilder {

	constructor() {
		super(...arguments);
	}

	build() {

		let output = "IGOR\n";
		output += this.waves.map(wave => {

			return this.buildWave(wave.data, wave.options);
		}).join("\n");

		return output;
	}

	buildWave(waveData, waveOptions) {

		let output = "";
		output += "WAVES/D	'" + waveOptions.waveName + "'";

		if (waveData.hasXWaveform() && !waveOptions.noXWave) {
			output += " '" + (waveOptions.waveNameX || waveOptions.waveName + "_x") + "'";
		}

		output += "\n";
		output += "BEGIN\n";

		if (waveData.hasXWaveform() && !waveOptions.noXWave) {

			for (var i = 0, l = waveData.getLength(); i < l; i++) {
				output += waveData.getY(i) + " " + waveData.getX(i) + "\n";
			}
		} else {

			output += waveData.getData().join("\n");
			output += "\n";
		}

		output += "END\n";

		// If we have scaling or x axis unit
		if (!waveData.hasXWaveform() || waveData.hasXUnit()) {

			// Then we call the setscale
			let stringScaling = "x SetScale/";

			// If we have actually scaling, let's parse it
			if (!waveData.hasXWaveform()) {

				stringScaling += "P x " + waveData.xOffset + "," + waveData.xScale;

				// In case of no scaling, default is delta mode with x0 = 0, xDelta = 1
			} else {
				stringScaling += "P 0, 1";
			}

			// Adding the x axis unit
			stringScaling += ", \"" + (waveData.getXUnit() || "") + "\"";
			stringScaling += ", '" + waveOptions.waveName + "'";
			stringScaling += "\n";

			output += stringScaling;
		}

		if (waveData.hasUnit()) {
			output += "x SetScale y 0, 0,\"" + (waveData.getUnit() || "") + "\", '" + waveOptions.waveName + "'\n";
		}

		return output;
	}
}

class CSVBuilder extends FileBuilder {

	constructor() {
		super(...arguments);
	}

	build() {

		const separator = ",";
		let output = "";
		output += this.waves.map(wave => {

			let string = "";
			if (wave.options.waveNameX) {
				string += wave.options.waveNameX + (wave.data.getXWaveform().hasUnit() ? " (" + wave.data.getXWaveform().getUnit() + ")" : "") + separator;
			}
			return string + wave.options.waveName + (wave.data.hasUnit() ? " (" + wave.data.getUnit() + ")" : "");
		}).join(separator);

		let i = 0,
		    iterating,
		    data;

		while (true) {

			iterating = false;

			output += "\n";

			output += this.waves.map(wave => {

				let string = "",
				    data;

				data = wave.data.getY(i);

				if (data !== undefined && !isNaN(data)) {
					iterating = true;

					if (wave.options.waveNameX) {
						string += wave.data.getX(i) + separator;
					}

					return string + data;
				}

				return "";
			}).join(",");

			i++;

			if (!iterating || i == 100000) {
				break;
			}
		}

		return output;
	}
}



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return query; });
/* unused harmony export ping */
/* unused harmony export checkAuth */
/* unused harmony export checkDB */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(9);
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
/* 9 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */

function svgToPDF(domElement, width, height) {

    return new Promise((resolver, rejecter) => {

        var canvas = document.createElement('canvas');
        canvas.width = width * 4;
        canvas.height = height * 4;
        var ctx = canvas.getContext('2d');

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svg = new Blob([domElement.innerHTML], { type: 'image/svg+xml' });
        var url = DOMURL.createObjectURL(svg);

        img.onload = function () {
            ctx.drawImage(img, 0, 0, width * 4, height * 4);
            resolver(canvas.toDataURL());
            DOMURL.revokeObjectURL(url);
        };

        img.src = url;
    });
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("pdfkit");

/***/ })
/******/ ]);