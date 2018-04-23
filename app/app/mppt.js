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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("python-shell");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_header_jsx__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jsx_mppt_jsx__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_electron__);






function render() {

  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__jsx_mppt_jsx__["a" /* default */], { model: 'keithley2400' })
  ), document.getElementById('root'));
}

render();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_url__);




class Header extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let busy = 0;
		let total = 0;
		if (this.props.channels) {
			total = this.props.channels.length;
			let chan;

			for (chan of this.props.channels) {

				chan.busy && busy++;
			}
		}

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'nav',
			{ className: 'header navbar navbar-default' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'container-fluid' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'navbar-left' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: './images/logo.png', width: '350' })
				)
			)
		); // /*<div><small>{ this.props.channels ? "Running " + busy + "/" + total : "" } channels</small></div>*/
	}
}

/* unused harmony default export */ var _unused_webpack_default_export = (Header);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_external_keithleySMU__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_external_verasol__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfkit__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfkit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pdfkit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_util_filebuilder__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_util_svgToPDF__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_util_iv__ = __webpack_require__(18);













const { dialog } = __webpack_require__(2).remote;

let iv_height = 400,
    iv_width = 550;

class MPPTJV extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {
    super(...arguments);

    // List all GPIB resources


    this.connectKeithleyToGPIB = this.connectKeithleyToGPIB.bind(this);

    this.connectLampToGPIB = this.connectLampToGPIB.bind(this);
    this.iv = this.iv.bind(this);
    this.mppt = this.mppt.bind(this);
    this.stop_mppt = this.stop_mppt.bind(this);

    this.form_iv_change = this.handleInputChange.bind(this);
    this.form_mppt_change = this.handleInputChange.bind(this);
    this.form_gpib_change = this.handleInputChange.bind(this);
    this.form_ext_change = this.handleInputChange.bind(this);

    this.downloadPDF = this.downloadPDF.bind(this);
    this.downloadITX = this.downloadITX.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);

    this.state = {
      gpib_resources: [],
      iv_starting_voltage: 1,
      iv_stopping_voltage: 0,
      iv_hysteresis: 0,
      iv_scan_rate: 0.1,
      mppt_duration: 500,
      area: 0.5,
      powin: 1000,

      connected_keithley: false,
      connected_lamp: false
    };
  }

  async connectKeithleyToGPIB() {

    var resource = this.state.gpib_resource_keithley;
    this.instrument = new __WEBPACK_IMPORTED_MODULE_4__app_external_keithleySMU__["a" /* default */](resource);

    this.instrument.connect().then(message => {

      this.setState({ connected_keithley: message, connectionerror_keithley: false });
    }).catch(error => {

      console.log(error);
      this.setState({ connectionerror_keithley: error.toString(), connected_keithley: false });
    });
  }

  async connectLampToGPIB() {

    var resource = this.state.gpib_resource_lamp;
    this.instrument_lamp = new __WEBPACK_IMPORTED_MODULE_5__app_external_verasol__["a" /* default */](resource);

    this.instrument_lamp.connect().then(message => {

      this.setState({ connected_lamp: message, connectionerror_lamp: false });
    }).catch(error => {

      console.log(error);
      this.setState({ connectionerror_lamp: error.toString(), connected_lamp: false });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });

    this.getAverageIVParameters();
  }

  async downloadPDF() {

    var pdfdoc = new __WEBPACK_IMPORTED_MODULE_7_pdfkit___default.a({
      autoFirstPage: false
    });

    pdfdoc.pipe(__WEBPACK_IMPORTED_MODULE_2_fs___default.a.createWriteStream('./output.pdf'));

    pdfdoc.addPage({ layout: 'landscape' });

    pdfdoc.image((await Object(__WEBPACK_IMPORTED_MODULE_9__app_util_svgToPDF__["a" /* default */])(this.graph_iv_dom, iv_width, iv_height)), 200, 15, { width: iv_width });
    if (this.state.mppt_j) {
      pdfdoc.image((await Object(__WEBPACK_IMPORTED_MODULE_9__app_util_svgToPDF__["a" /* default */])(this.graph_mppt_dom, mppt_width, mppt_height)), 200, 150, { width: iv_width });
    }

    pdfdoc.font("Times-Roman");

    pdfdoc.fontSize(15).text("Device name: " + this.state.samplename, 0, 15, { underline: true }).fontSize(12).text("Active area: " + this.state.area.toPrecision(3) + "cm", 0, 35).moveUp().fontSize(8).text(2, 120, 35);

    var printInfo = (waveform, waveformPower, marginLeft, yPosition) => {

      var params = this.getIVParameters(waveform, waveformPower, this.state.area, this.state.powin);

      pdfdoc.fontSize(14).text("Forward scan", 0, yPosition, { underline: true }).fontSize(12).text("V", marginLeft, yPosition + 20).fontSize(8).moveUp().text("oc", 8 + marginLeft).fontSize(12).text("J", marginLeft).fontSize(8).moveUp().text("sc", 6 + marginLeft).fontSize(12).text("I", marginLeft).fontSize(8).moveUp().text("sc", 6 + marginLeft).fontSize(12).text("V", marginLeft).fontSize(8).moveUp().text("pmax", 6 + marginLeft).fontSize(12).text("I", marginLeft).fontSize(8).moveUp().text("pmax", 8 + marginLeft).fontSize(12).text("P", marginLeft).fontSize(8).moveUp().text("out", 8 + marginLeft).fontSize(12).text("FF", marginLeft).text("PCE", marginLeft);

      pdfdoc.text(Math.round(params.voc * 1000) / 1000 + " V", marginLeft + 35, yPosition + 20).text(Math.round(params.isc * 100) / 100 + " mA", marginLeft + 35).fontSize(8).moveUp().text("-2", 25 + marginLeft + 35 - 8).fontSize(12).text(Math.round(params.jsc * 100) / 100 + " mA cm", marginLeft + 35).fontSize(8).moveUp().text("-2", 25 + marginLeft + 35 - 8).fontSize(12).text(Math.round(params.vmax * 1000) / 1000 + "V", marginLeft + 35).text(Math.round(params.jmax * 100) / 100 + "mA cm", marginLeft + 35).fontSize(8).moveUp().text("-2", 25 + marginLeft + 35 - 8).fontSize(12).text(Math.round(params.power * 100) / 100 + " mW cm", marginLeft + 35).fontSize(8).moveUp().text("-2", 25 + marginLeft + 35 - 8).fontSize(12).text(Math.round(params.ff * 10) / 10 + " %", marginLeft + 35).text(Math.round(params.pce * 100) / 100 + " %", marginLeft + 35);
    };

    printInfo(this.state.data_iv_forward, this.state.data_iv_forward_power, 20, 60);

    pdfdoc.end();
  }

  downloadCSV() {}

  downloadITX() {

    var outputfile;
    outputfile = new __WEBPACK_IMPORTED_MODULE_8__app_util_filebuilder__["a" /* ITXBuilder */]();

    if (this.state.data_iv_forward) {
      outputfile.addWaveform(this.state.data_iv_forward, {
        waveName: "Photocurrent_fw",
        waveNameX: "Photocurrent_fw_voltage"
      });

      outputfile.addWaveform(this.state.data_iv_forward_power, {
        waveName: "Power_fw",
        noXWave: true
      });
    }

    if (this.state.data_iv_backward) {

      outputfile.addWaveform(this.state.data_iv_backward, {
        waveName: "Photocurrent_fw",
        waveNameX: "Photocurrent_fw_backward"
      });

      outputfile.addWaveform(this.state.data_iv_backward_power, {
        waveName: "Power_fw",
        noXWave: true
      });
    }

    if (this.state.mppt_j) {

      outputfile.addWaveform(this.state.mppt_j, {
        waveName: "MPPT_current",
        waveNameX: "MPPT_Time_s"
      });

      outputfile.addWaveform(this.state.mppt_v, {
        waveName: "MPPT_voltage",
        noXWave: true
      });

      outputfile.addWaveform(this.state.mppt_p, {
        waveName: "MPPT_voltage",
        noXWave: true
      });
    }

    dialog.showSaveDialog({

      message: "Save the data for the cell \"" + this.state.samplename + "\"",
      defaultPath: "~/" + this.state.samplename + ".itx"

    }, fileName => {

      __WEBPACK_IMPORTED_MODULE_2_fs___default.a.writeFileSync(fileName, outputfile.build());
    });
  }

  async iv() {

    if (!this.instrument) {
      throw "Cannot initiate a j-V curve. No instrument is connected.";
    }

    var numPoints = 100;
    var step = (this.state.iv_stopping_voltage - this.state.iv_starting_voltage) / (numPoints - 1);
    var settling = 0.01;
    var currMax = 0.1;

    var dataiv, poweriv;

    await this.instrument_lamp.command("AMPLitude 1");
    await this.instrument_lamp.command("OUTput ON");

    this.setState({ iv_making: true });
    await this.instrument.command(":STAT:MEAS:ENAB 512; *SRE 1; *CLS");
    //await this.instrument.command(":*SRE 1;");
    await this.instrument.command(":FORM:ELEM VOLT,CURR");
    await this.instrument.command(":SOUR:VOLT:MODE SWE");
    await this.instrument.command(":SOUR:VOLT:START " + this.state.iv_starting_voltage + "; STOP " + this.state.iv_stopping_voltage + "; STEP " + step + "");
    await this.instrument.command(":TRAC:CLE");
    await this.instrument.command(":TRAC:POIN " + numPoints + ";:TRIG:COUN " + numPoints + ""); // # of Triggers
    await this.instrument.command(":TRAC:FEED:CONT NEXT");

    await this.instrument.command(":SOUR:DEL " + settling + "");
    await this.instrument.command(":SENS:CURR:PROT " + currMax + "");
    await this.instrument.command(":SENS:CURR:RANGE:UPP " + currMax);

    await this.instrument.command(":SENS:CURR:RANGE:AUTO 1");
    await this.instrument.command(":OUTP:STAT ON"); // Switch Output ON, yet again

    await this.instrument.command(":INIT"); // Reset time to zero

    await this.instrument.delay(5000);
    await this.instrument.query("_wait_stb");

    ({ dataiv, poweriv } = await this.instrument.getIVTrace());

    this.setState({
      data_iv_forward: dataiv,
      data_iv_forward_power: poweriv,
      data_iv_backward: null,
      data_iv_backward_power: null
    });

    //console.log( this.state.iv_hysteresis );
    if (this.state.iv_hysteresis) {

      await this.instrument.command(":STAT:MEAS:ENAB 512; *SRE 1; *CLS");
      await this.instrument.command(":TRAC:CLE");
      await this.instrument.command(":SOUR:VOLT:START " + this.state.iv_stopping_voltage + "; STOP " + this.state.iv_starting_voltage + "; STEP " + -step + "");
      await this.instrument.command(":TRAC:POIN " + numPoints + ";:TRIG:COUN " + numPoints + ""); // # of Triggers
      await this.instrument.command(":TRAC:FEED:CONT NEXT");
      await this.instrument.command(":INIT");

      //await this.instrument.query("*OPC?")  

      await this.instrument.delay(2000);
      await this.instrument.query("_wait_stb");

      ({ dataiv, poweriv } = await this.instrument.getIVTrace());
      this.setState({ data_iv_backward: dataiv, data_iv_backward_power: poweriv });
    }

    await this.instrument.command(":OUTP:STAT OFF");

    await this.instrument_lamp.command("OUTput OFF");

    this.getAverageIVParameters();

    this.setState({ iv_making: false });
  }

  getAverageIVParameters() {
    var paramFW = this.getIVParameters(this.state.data_iv_forward, this.state.data_iv_forward_power);

    if (this.state.data_iv_backward) {

      var paramBW = this.getIVParameters(this.state.data_iv_backward, this.state.data_iv_backward_power);

      for (var i in paramBW) {
        paramFW[i] = (paramBW[i] + paramFW[i]) / 2;
      }
    }

    paramFW.jsc = Math.round(paramFW.jsc * 100) / 100;
    paramFW.voc = Math.round(paramFW.voc * 1000) / 1000;
    paramFW.ff = Math.round(paramFW.ff * 10) / 10;
    paramFW.pce = Math.round(paramFW.pce * 1000) / 1000;

    this.setState(paramFW);
  }

  getIVParameters(waveform, powerwaveform) {

    return Object(__WEBPACK_IMPORTED_MODULE_10__app_util_iv__["a" /* getIVParameters */])(waveform, powerwaveform);
  }

  setVoltage(v) {
    this.instrument.command(":SOUR:VOLT:LEV:IMM:AMPL " + voltage); // Set current Voltage
  }

  async iv_prepare(compliance) {

    await this.instrument.command("*CLS");
    await this.instrument.command(":STAT:MEAS:ENAB 512"); // Set SRQ
    await this.instrument.command(":TRAC:FEED:CONT NEVER");
    await this.instrument.command(":TRAC:CLE");
    await this.instrument.command("*SRE 1");
    await this.instrument.command(":SOUR:VOLT:MODE SWE");
    await this.instrument.command(":FORM:ELEM VOLT,CURR");
    await this.instrument.command(":SENS:CURR:PROT " + (compliance / 1000).toPrecision(4));
  }

  async _iv(fromV, toV, nbPoints, scanRate) {

    // TODO: ADD SCAN RATE


    var stepV = (toV - fromV) / (nbPoints - 1);
    //await this.instrument.command("*SRE 1")  
    await this.instrument.command("*CLS");
    await this.instrument.command(":SOUR:VOLT:START " + fromV + "; STOP " + toV + "; STEP " + stepV);
    await this.instrument.command(":TRAC:CLE; :TRAC:POIN " + nbPoints + ";:TRIG:COUN " + nbPoints + "; :TRAC:FEED:CONT NEXT");
    await this.instrument.command(":INIT");

    await this.instrument.delay(10);
    await this.instrument.query("_wait_stb");

    return this.instrument.getIVTrace();
  }

  async mppt() {

    var settlingTime = 0;

    await this.instrument_lamp.command("AMPLitude 1");
    await this.instrument_lamp.command("OUTput ON");

    await this.instrument.command(":SOUR:DEL " + this.state.equilibration);
    await this.instrument.command(":OUTP:STAT ON");

    this.iv_prepare(this.state.compliance);

    this.setState({ running_mpp: true });
    await this.instrument.command(":SENS:CURR:PROT " + 0.1);
    await this.instrument.command(":SENS:CURR:RANGE:UPP " + 0.1); // Select expected current
    await this.instrument.command(":SENS:CURR:RANGE:AUTO 1");

    await this.instrument.command(":OUTP:STAT ON");

    //{ dataiv, poweriv } = iv( from, to, 10 );

    let mppt_j = __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
        mppt_v = __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
        mppt_p = __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
    // Clear Buffer
    let vfrom = 0,
        vto,
        direction = 1,
        vdelta = 5e-3,
        start = Date.now(),
        now,
        now2,
        i,
        dataiv,
        poweriv,
        t;

    while (true) {

      now = Date.now();
      vto = vfrom + vdelta * direction;

      ({ dataiv, poweriv } = await this._iv(vfrom, vto, 5));

      now2 = Date.now();

      for (i = 0; i < dataiv.getLength(); i++) {

        t = (i * (now2 - now) / dataiv.getLength() + now - start) / 1000;

        mppt_j.append(t, dataiv.getY(i));
        mppt_v.append(t, dataiv.getX(i));
        mppt_p.append(t, dataiv.getY(i) * dataiv.getX(i));
      }

      var slope = await mppt_p.fit({

        params: [0, 0],
        subsetIndex: [mppt_p.getLength() - dataiv.getLength(), mppt_p.getLength() - 1],
        function: (x, params) => {
          return (x - mppt_p.getX(mppt_p.getLength() - dataiv.getLength())) * params[0] + params[1];
        }
      }).then(params => {
        return params[0];
      });

      var maxPower = mppt_p.getMinY() * 1000 * 100 / 100;
      var maxEfficiency = -Math.round(mppt_p.getMinY() * 1000 / this.state.area / (this.state.powin / 10) * 100 * 100) / 100;

      this.setState({

        mppt_v: mppt_v,
        mppt_j: mppt_j,
        mppt_p: mppt_p,

        mppt_max_power: maxPower,
        mppt_max_efficiency: maxEfficiency

      });

      if (slope > 0) {
        direction *= -1;
      }

      vfrom = vto;

      if (this.stopMPP) {
        this.stopMPP = false;
        break;
      }

      if (now - start > this.state.mppt_duration * 1000) {
        break;
      }
    }

    await this.instrument.command(":OUTP:STAT OFF");
    await this.instrument_lamp.command("OUTput ON");

    this.setState({ running_mpp: false });
  }

  stop_mppt() {

    this.stopMPP = true;
  }

  componentDidMount() {

    this.graph_iv_instance = new __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default.a(this.graph_iv_dom);
    this.graph_iv_instance.resize(iv_width, iv_height);

    this.legend = this.graph_iv_instance.makeLegend({
      frame: false,
      backgroundColor: "transparent"
    });

    this.legend.setAutoPosition('bottom');
    this.legend.notHideable();

    this.graph_iv_instance.getLeftAxis().setUnit("A").setUnitWrapper("(", ")").gridsOff().setUnitDecade(true).setScientific(true).setLabel("Current density");

    this.graph_iv_instance.getBottomAxis().setUnit("V").setUnitWrapper("(", ")").gridsOff().setLabel("Voltage");

    this.graph_iv_instance.getRightAxis().setUnit("W").setUnitWrapper("(", ")").setUnitDecade(true).setScientific(true).gridsOff().setLabel("Power");

    this.graph_iv_instance.draw();
    this.legend.update();

    this.serie_iv_forward = this.graph_iv_instance.newSerie("iv-fw").setLabel("j(V) fw").autoAxis().setLineColor('blue');

    this.serie_iv_backward = this.graph_iv_instance.newSerie("iv-bw").setLabel("j(V) bw").autoAxis().setLineColor('red');

    this.serie_iv_forward_power = this.graph_iv_instance.newSerie("pow-fw").setLabel("P(V) fw").autoAxis().setYAxis(this.graph_iv_instance.getRightAxis()).setLineColor('blue').setLineStyle(2);

    this.serie_iv_backward_power = this.graph_iv_instance.newSerie("pow-bw").setLabel("P(V) bw").autoAxis().setYAxis(this.graph_iv_instance.getRightAxis()).setLineColor('red').setLineStyle(2);

    this.shape_mpp_backward = this.graph_iv_instance.newShape("ellipse").setR("3px", "3px").setFillColor('black').draw().setSerie(this.serie_iv_backward_power);

    this.shape_mpp_forward = this.graph_iv_instance.newShape("ellipse").setR("3px", "3px").setFillColor('black').draw().setSerie(this.serie_iv_forward_power);

    this.graph_mppt_instance = new __WEBPACK_IMPORTED_MODULE_6_node_jsgraph_dist_jsgraph_es6___default.a(this.graph_mppt_dom);
    this.graph_mppt_instance.resize(550, 300);

    this.graph_mppt_instance.getLeftAxis(0).setUnit("A").setUnitWrapper("(", ")").setUnitDecade(true).setScientific(true).gridsOff().setLabel("Current");

    this.graph_mppt_instance.getLeftAxis(1).setUnit("V").setUnitWrapper("(", ")").setUnitDecade(true).setScientific(true).gridsOff().setLabel("Voltage");

    this.graph_mppt_instance.getLeftAxis(2).setUnit("W").setUnitWrapper("(", ")").setUnitDecade(true).setScientific(true).gridsOff().setLabel("Power");

    this.graph_mppt_instance.getBottomAxis().setUnit("s").setUnitWrapper("(", ")").gridsOff().setLabel("Time");

    this.graph_mppt_instance.getLeftAxis(0).setSpan(0, 0.3);
    this.graph_mppt_instance.getLeftAxis(1).setSpan(0.35, 0.65);
    this.graph_mppt_instance.getLeftAxis(2).setSpan(0.7, 1);

    this.serie_mppt_j = this.graph_mppt_instance.newSerie("mppt_i").autoAxis().setYAxis(this.graph_mppt_instance.getLeftAxis(0));
    this.serie_mppt_v = this.graph_mppt_instance.newSerie("mppt_v").autoAxis().setYAxis(this.graph_mppt_instance.getLeftAxis(1));
    this.serie_mppt_p = this.graph_mppt_instance.newSerie("mppt_p").autoAxis().setYAxis(this.graph_mppt_instance.getLeftAxis(2));

    this.graph_mppt_instance.autoscaleAxes().draw();

    this.doListInstruments();

    //   this.state.data_iv_forward = Graph.newWaveform().setData([ 0.00159047, 0.00137599, 0.00116845, 0.000966239, 0.000768515, 0.000573518, 0.000380705, 0.000197053, 1.69232e-05, -0.000160399, -0.000333588, -0.000497843, -0.000664469, -0.000819633, -0.00097038, -0.0011206, -0.00126473, -0.00140276, -0.00153492, -0.00166282, -0.00178445, -0.00190068, -0.0020134, -0.00211749, -0.00222306, -0.00232323, -0.00241041, -0.00250073, -0.00257734, -0.00265292, -0.00273215, -0.00279307, -0.00285689, -0.00291986, -0.00297507, -0.00302145, -0.00306849, -0.00310677, -0.00315721, -0.00319512, -0.00323154, -0.00327204, -0.00329976, -0.00331859, -0.00334243, -0.00336161, -0.00337943, -0.00340376, -0.00342808, -0.00344035, -0.0034578, -0.00347864, -0.00348327, -0.00348974, -0.00350606, -0.00351705, -0.00352489, -0.003535, -0.00354604, -0.00354704, -0.00356564, -0.00356582, -0.00356452, -0.00355965, -0.00358025, -0.00358969, -0.00358747, -0.00360011, -0.00360075, -0.00359804, -0.00361004, -0.00360675, -0.00361336, -0.0036207, -0.00362369, -0.00362688, -0.00363007, -0.00362537, -0.00362981, -0.00362558, -0.0036274, -0.00363489, -0.00363401, -0.0036317, -0.00363843, -0.00364736, -0.00363954, -0.00363407, -0.00364801, -0.00364133, -0.00363788, -0.00365436, -0.00364088, -0.00364797, -0.00363684, -0.00364537, -0.00364988, -0.00364615, -0.0036536, -0.00365154, -0.00364875, -0.00366419, -0.0036478, -0.00365334, -0.00365336, -0.00365423, -0.00366708, -0.00364507, -0.00366117, -0.00366083, -0.00365518, -0.00364931, -0.00365207, -0.00366019, -0.0036408, -0.00366224, -0.00365427, -0.00364991, -0.00365051, -0.00364705, -0.00365731, -0.00364347, -0.00365904, -0.00366021, -0.003658, -0.00366524, -0.00366347, -0.00365046, -0.0036635, -0.00366383, -0.00365939, -0.00365331, -0.00365609, -0.00365287, -0.00365572, -0.00365494, -0.0036538, -0.00365581, -0.00366109, -0.00366263, -0.00366145, -0.00365647, -0.00366035, -0.00365679, -0.00366961, -0.00365212, -0.0036645, -0.00365376, -0.00365547, -0.00365083, -0.00364956, -0.0036563, -0.00366769, -0.00366565, -0.00366528, -0.00365187, -0.00367057, -0.00366705, -0.00366124, -0.00365905, -0.0036608, -0.00365811, -0.00366258, -0.00365181, -0.00365048, -0.0036648, -0.00365531, -0.00367345, -0.00366403, -0.00365175, -0.00365491, -0.00366593, -0.00366296, -0.0036618, -0.00366139, -0.00365608, -0.00365766, -0.00367779, -0.00365661, -0.00365323, -0.00366134, -0.00365836, -0.00366565, -0.00365922, -0.00366088, -0.00365118, -0.00366221, -0.00366016, -0.00366639, -0.00365931, -0.00365406, -0.00366611, -0.0036621, -0.00366975, -0.00366627, -0.0036627, -0.00365175, -0.00366242, -0.00366046, -0.00364766, -0.00366264, -0.00366809, -0.0036576, -0.00367803, -0.00367317, -0.00365774, -0.00366222, -0.0036634, -0.00366293, -0.0036669, -0.00366489, -0.00366211, -0.00367056, -0.00366424, -0.00366067 ] ).rescaleX( 1.07, - 0.005 );
    //   this.state.data_iv_forward_power = this.state.data_iv_forward.duplicate().math( ( y, x ) => y * x );
    //   this.getAverageIVParameters();


    this.componentDidUpdate();
  }

  placeMaxPowerShape(waveform, shape) {

    if (!shape) {
      return;
    }

    if (!waveform) {
      shape.hide();
      return;
    }

    let maxPowerXMin = waveform.findLocalMinMaxIndex(0, waveform.getLength() - 1, "min");
    let maxPower = waveform.getY(waveform.getIndexFromX(maxPowerXMin));

    shape.show().setPosition({ x: maxPowerXMin, y: maxPower }).redraw();
  }

  componentDidUpdate() {

    if (!this.graph_iv_instance || !this.graph_mppt_instance) {
      return;
    }

    if (this.state.data_iv_forward) {
      this.serie_iv_forward.setWaveform(this.state.data_iv_forward);
    }

    if (this.state.data_iv_forward_power) {
      this.serie_iv_forward_power.setWaveform(this.state.data_iv_forward_power);
    }
    this.placeMaxPowerShape(this.state.data_iv_forward_power, this.shape_mpp_forward);

    if (this.state.data_iv_backward) {
      this.serie_iv_backward.setWaveform(this.state.data_iv_backward);
    }

    if (this.state.data_iv_backward_power) {
      this.serie_iv_backward_power.setWaveform(this.state.data_iv_backward_power);
    }
    this.placeMaxPowerShape(this.state.data_iv_backward_power, this.shape_mpp_backward);

    this.graph_iv_instance.autoscaleAxes().draw();
    this.legend.update();

    this.graph_iv_instance.getLeftAxis().forceMax(-this.graph_iv_instance.getLeftAxis().getDataMin());
    this.graph_iv_instance.getRightAxis().forceMax(-this.graph_iv_instance.getRightAxis().getDataMin());

    if (this.state.mppt_p) {
      this.serie_mppt_p.setWaveform(this.state.mppt_p);
    }

    if (this.state.mppt_j) {
      this.serie_mppt_j.setWaveform(this.state.mppt_j);
    }

    if (this.state.mppt_v) {
      this.serie_mppt_v.setWaveform(this.state.mppt_v);
    }

    this.graph_mppt_instance.autoscaleAxes().draw();
  }

  scheduleListInstruments() {
    setTimeout(() => {
      this.doListInstruments();
    }, 5000);
  }

  doListInstruments() {

    __WEBPACK_IMPORTED_MODULE_4__app_external_keithleySMU__["a" /* default */].list().then(results => {

      this.setState({ gpib_resources: results });
      this.scheduleListInstruments();
    }).catch(() => {
      this.scheduleListInstruments();
    });
  }

  render() {

    let list_gpibresources = [];
    for (var i = 0; i < this.state.gpib_resources.length; i++) {
      list_gpibresources.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "option",
        { value: this.state.gpib_resources[i], key: this.state.gpib_resources[i] },
        this.state.gpib_resources[i]
      ));
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "container-fluid" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-xs-2" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "container-fluid" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "h3",
              null,
              "j(V) and MPP tracker"
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "form",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  { htmlFor: "gpib_resource" },
                  "Keithley GPIB resource"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "select",
                    { name: "gpibresource", id: "gpib_resource_keithley", name: "gpib_resource_keithley", className: "form-control", value: this.state.gpib_resource_keithley, onChange: this.form_gpib_change },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "option",
                      { value: "-1" },
                      "Select the Keithley"
                    ),
                    list_gpibresources
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "input-group-btn" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "button",
                      { type: "button", className: "btn btn-primary", onClick: this.connectKeithleyToGPIB },
                      "Connect"
                    )
                  )
                )
              ),
              this.state.connectionerror_keithley && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "p",
                { className: "bg-danger" },
                "Problem connecting to GPIB resource. Check Keithley parameters. The returned error was : ",
                this.state.connectionerror,
                " "
              ),
              this.state.connected_keithley && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "p",
                { className: "bg-success" },
                "Successfully connected to remote host (IDN ",
                this.state.connected_keithley,
                ")"
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  { htmlFor: "gpib_resource" },
                  "Verasol GPIB resource"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "select",
                    { name: "gpibresource", id: "gpib_resource_lamp", name: "gpib_resource_lamp", className: "form-control", value: this.state.gpib_resource_lamp, onChange: this.form_gpib_change },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "option",
                      { value: "-1" },
                      "Select the Verasol lamp"
                    ),
                    list_gpibresources
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "input-group-btn" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "button",
                      { type: "button", className: "btn btn-primary", onClick: this.connectLampToGPIB },
                      "Connect"
                    )
                  )
                )
              ),
              this.state.connectionerror_lamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "p",
                { className: "bg-danger" },
                "Problem connecting to GPIB resource. Check Verasol parameters. The returned error was : ",
                this.state.connectionerror,
                " "
              ),
              this.state.connected_lamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "p",
                { className: "bg-success" },
                "Successfully connected to remote host (IDN ",
                this.state.connected_lamp,
                ")"
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "form",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Sample name"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "form-control", name: "samplename", value: this.state.samplename, onChange: this.form_ext_change })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Light intensity"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "powin", value: this.state.powin, onChange: this.form_ext_change }),
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
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Device area"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "area", value: this.state.area, onChange: this.form_ext_change }),
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
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "form",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Starting voltage"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "iv_starting_voltage", value: this.state.iv_starting_voltage, onChange: this.form_iv_change }),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    { className: "input-group-addon" },
                    "V"
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Stopping voltage"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "iv_stopping_voltage", value: this.state.iv_stopping_voltage, onChange: this.form_iv_change }),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    { className: "input-group-addon" },
                    "V"
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "checkbox" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "checkbox" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "label",
                      null,
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox", name: "iv_hysteresis", value: this.state.iv_hysteresis, onChange: this.form_iv_change }),
                      " Hysteresis"
                    )
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Scan rate"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "input-group" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "iv_scan_rate", type: "number", max: "1", min: "0.0001", step: "0.0001", value: this.state.iv_scan_rate, onChange: this.form_iv_change }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "span",
                      { className: "input-group-addon" },
                      "V s",
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "sup",
                        null,
                        "-1"
                      )
                    )
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Current compliance"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "input-group" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "compliance", type: "number", max: "1000", min: "0", step: "10", value: this.state.compliance, onChange: this.form_iv_change }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "span",
                      { className: "input-group-addon" },
                      "mA"
                    )
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "Equilibration time"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "input-group" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", className: "form-control", name: "equilibration", type: "number", max: "100", min: "0", step: "0.5", value: this.state.equilibration, onChange: this.form_iv_change }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "span",
                      { className: "input-group-addon" },
                      "s"
                    )
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "form",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "form-group row" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "label",
                  null,
                  "MPPT duration"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "input-group" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "form-control", name: "mppt_duration", type: "number", max: "1000", min: "10", step: "1", value: this.state.mppt_duration, onChange: this.form_mppt_change }),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    { className: "input-group-addon" },
                    "s"
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "row" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "btn-group form-group" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { onClick: this.iv, className: "btn btn-primary" + (this.state.iv_making || !this.state.connected_keithley || !this.state.connected_lamp ? ' disabled' : ''), type: "button" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }),
                  " Record IV"
                ),
                !this.state.running_mpp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { onClick: this.mppt, className: "btn btn-primary" + (!this.state.connected_keithley || !this.state.connected_lamp ? ' disabled' : ''), type: "button" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }),
                  " Record MPP"
                ),
                !!this.state.running_mpp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { onClick: this.stop_mppt, className: "btn btn-danger", type: "button" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" }),
                  " Stop MPP"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "clearfix visible-xs-block" })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "row" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "btn-group form-group" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { onClick: this.downloadITX, className: "btn btn-default", type: "button" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-download" }),
                  " Download ITX"
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "clearfix visible-xs-block" })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-xs-4" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "row" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "graph", ref: el => {
                this.graph_iv_dom = el;
              } })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "row" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "graph", ref: el => {
                this.graph_mppt_dom = el;
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-xs-3" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "h3",
            null,
            "Extracted data"
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
                "J",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "sub",
                  null,
                  "sc"
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.jsc }),
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
            )
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
                "V",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "sub",
                  null,
                  "oc"
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.voc }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "input-group-addon" },
                "V"
              )
            )
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
                "FF"
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", max: "100", step: "0.1", className: "form-control", readOnly: true, value: this.state.ff }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "input-group-addon" },
                "%"
              )
            )
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
                "PCE"
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "number", min: "0", max: "35", step: "0.01", className: "form-control", readOnly: true, value: this.state.pce }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "input-group-addon" },
                "%"
              )
            )
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
                "MPPT PCE"
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.mppt_max_efficiency }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "input-group-addon" },
                "%"
              )
            )
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MPPTJV);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_jsgraph_dist_jsgraph_es6__);

const PythonShell = __webpack_require__(3);
const path = __webpack_require__(1);


class KeithleySMU {

	static list() {

		return new Promise((resolver, rejecter) => {

			var list = new PythonShell('script.list', {

				pythonOptions: ['-m'],
				cwd: path.join(__dirname.replace("app.asar", "app.asar.unpacked"), '../util/pyvisa/'),
				mode: "text" // Text mode
			});

			list.once("error", error => {
				error = error.toString('utf-8');
				list.removeAllListeners("message");
				rejecter(error);
			});

			list.once("message", results => {

				results = results.toString('utf-8');

				list.removeAllListeners("error");
				if (Array.isArray(results)) {
					results = results[0];
				}

				let resultsParsed = /\((.*)\)/gim.exec(results);

				if (!resultsParsed || !resultsParsed[1]) {
					return rejecter();
				}

				if (resultsParsed[1].length == 0) {
					rejecter();
					return;
				}

				resultsParsed = resultsParsed[1].split(',').map(result => {

					result = /u'(.*)'/g.exec(result);

					if (!result || !result[1]) {
						return null;
					}

					return result[1];
				});

				resolver(resultsParsed);
			});
		});
	}

	constructor(host) {
		this.host = host;
	}

	connect() {

		if (this.visaShell) {
			this.visaShell.removeAllListeners("message");
			this.visaShell.removeAllListeners("error");
			this.visaShell = null;
		}

		return new Promise((resolver, rejecter) => {

			var timeout = setTimeout(() => {

				this.visaShell.end(() => {

					rejecter("Cannot connect");
				});
			}, 1000);

			try {

				this.visaShell = new PythonShell('script.iovisa', {

					cwd: path.join(__dirname.replace("app.asar", "app.asar.unpacked"), '../util/pyvisa/'),
					pythonOptions: ['-m'],
					args: [this.host], // Pass the VISA address
					mode: "text" // Text mode

				});
			} catch (error) {

				clearTimeout(timeout);
				rejecter(error);
				return;
			}

			this.visaShell.once("error", error => {
				//	this.visaShell.removeAllListeners("message");

				error = error.toString('utf-8');
				clearTimeout(timeout);
				rejecter(error);
			});

			this.visaShell.once("message", async message => {

				message = message.toString('utf-8');
				this.visaShell.removeAllListeners("error");

				await this.command(":FORM:BORD SWAP");
				await this.command(":FORM:DATA REAL,32");
				await this.command(":FORM:ELEM VOLT,CURR");
				await this.command("*rst; status:preset; *cls");
				clearTimeout(timeout);
				resolver(message);
			});

			this.visaShell.send("connect");
		});
	}

	delay(time) {
		return new Promise((resolver, rejecter) => {
			setTimeout(() => {
				resolver();
			}, time);
		});
	}

	command(command) {

		return new Promise((resolver, rejecter) => {

			this.visaShell.once("message", async message => {
				message = message.toString('utf-8');
				await this.delay(20);
				resolver(message);
			});

			this.visaShell.send(command);
		});
	}

	query(command) {

		return new Promise((resolver, rejecter) => {

			this.visaShell.once("message", async message => {
				message = message.toString('utf-8');
				await this.delay(20);

				if (message.indexOf("ERROR") > -1) {
					rejecter(message);
					return;
				}

				resolver(message);
			});

			this.visaShell.send(command);
		});
	}

	async getIVTrace() {

		var wave = __WEBPACK_IMPORTED_MODULE_0_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
		    v;

		var data = await this.query("TRAC:DATA?").then(data => {

			return data.replace("[", "").replace("]", "").split(',').map(d => parseFloat(d)).forEach((d, index) => {

				if (index % 2 == 0) {
					v = d;
				}

				if (index % 2 == 1) {
					wave.append(v, d);
				}
			});
		});

		var power = wave.duplicate().math((y, x) => y * x);

		return { dataiv: wave, poweriv: power };
	}

}

/* harmony default export */ __webpack_exports__["a"] = (KeithleySMU);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const PythonShell = __webpack_require__(3);
const path = __webpack_require__(1);

class KeithleySMU {

	static list() {

		return new Promise((resolver, rejecter) => {

			var list = new PythonShell('script.list', {

				pythonOptions: ['-m'],
				cwd: path.join(__dirname.replace("app.asar", "app.asar.unpacked"), '../util/pyvisa/'),
				mode: "text" // Text mode
			});

			list.once("error", error => {
				error = error.toString('utf-8');
				list.removeAllListeners("message");
				rejecter(error);
			});

			list.once("message", results => {

				results = results.toString('utf-8');

				list.removeAllListeners("error");
				if (Array.isArray(results)) {
					results = results[0];
				}

				let resultsParsed = /\((.*)\)/gim.exec(results);

				if (!resultsParsed || !resultsParsed[1]) {
					return rejecter();
				}

				if (resultsParsed[1].length == 0) {
					rejecter();
					return;
				}

				resultsParsed = resultsParsed[1].split(',').map(result => {

					result = /u'(.*)'/g.exec(result);

					if (!result || !result[1]) {
						return null;
					}

					return result[1];
				});

				resolver(resultsParsed);
			});
		});
	}

	constructor(host) {
		this.host = host;
	}

	connect() {

		if (this.visaShell) {
			this.visaShell.removeAllListeners("message");
			this.visaShell.removeAllListeners("error");
			this.visaShell = null;
		}

		return new Promise((resolver, rejecter) => {

			var timeout = setTimeout(() => {

				this.visaShell.end(() => {

					rejecter("Cannot connect");
				});
			}, 1000);

			try {

				this.visaShell = new PythonShell('script.iovisa', {

					cwd: path.join(__dirname.replace("app.asar", "app.asar.unpacked"), '../util/pyvisa/'),
					pythonOptions: ['-m'],
					args: [this.host], // Pass the VISA address
					mode: "text" // Text mode

				});
			} catch (error) {

				clearTimeout(timeout);
				rejecter(error);
				return;
			}

			this.visaShell.once("error", error => {
				//	this.visaShell.removeAllListeners("message");

				error = error.toString('utf-8');
				clearTimeout(timeout);
				rejecter(error);
			});

			this.visaShell.once("message", async message => {

				message = message.toString('utf-8');
				this.visaShell.removeAllListeners("error");

				clearTimeout(timeout);
				resolver(message);
			});

			this.visaShell.send("connect");
		});
	}

	delay(time) {
		return new Promise((resolver, rejecter) => {
			setTimeout(() => {
				resolver();
			}, time);
		});
	}

	command(command) {

		return new Promise((resolver, rejecter) => {

			this.visaShell.once("message", async message => {
				message = message.toString('utf-8');
				await this.delay(20);
				resolver(message);
			});

			this.visaShell.send(command);
		});
	}

	query(command) {

		return new Promise((resolver, rejecter) => {

			this.visaShell.once("message", async message => {
				message = message.toString('utf-8');
				await this.delay(20);

				if (message.indexOf("ERROR") > -1) {
					rejecter(message);
					return;
				}

				resolver(message);
			});

			this.visaShell.send(command);
		});
	}

}

/* harmony default export */ __webpack_exports__["a"] = (KeithleySMU);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("pdfkit");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CSVBuilder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ITXBuilder; });

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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = svgToPDF;

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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getIVParameters; });

let getIVParameters = (waveform, powerwaveform, area, powin, inverted = false) => {

  let jsc, voc;

  // Let's try to find the jsc. If we cannot find it, it's no big deal. Silent fail
  try {
    jsc = waveform.getY(waveform.getIndexFromX(0));
  } catch (e) {
    jsc = NaN;
  }

  // Let's try to find the voc. If we cannot find it, it's no big deal. Silent fail
  try {
    voc = waveform.getX(waveform.findLevel(0));
  } catch (e) {
    voc = NaN;
  }

  let maxpower;

  if (inverted) {
    maxpower = powerwaveform.getMaxY();
  } else {
    maxpower = powerwaveform.getMinY();
  }

  let ff = maxpower / (jsc * voc);
  let pce = Math.round(maxpower * 1000 / area / (powin / 10) * 100 * 100) / 100 * (inverted ? 1 : -1);

  let maxIndex = powerwaveform.findLevel(maxpower);
  let vmax = powerwaveform.getX(maxIndex);

  return {
    isc: jsc * 1000 * (inverted ? 1 : -1),
    jsc: jsc / area * 1000 * (inverted ? 1 : -1),
    voc: voc,
    ff: ff * 100,
    powerin: powin,
    power: maxpower * 1000,
    pce: pce,
    jmax: 0,
    vmax: vmax
  };
};

/***/ })
/******/ ]);