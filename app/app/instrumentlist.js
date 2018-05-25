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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_header_jsx__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jsx_instrumentlist_jsx__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_environment_json__);







__WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].on("reloadInstruments", () => {
  render();
});

function mppt_keithley_2400() {
  __WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].send("mppt", "keithley2400");
}

function render() {

  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_header_jsx__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'container' },
      __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.ageing && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h4',
          null,
          'Candlelight ageing setups'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__jsx_instrumentlist_jsx__["a" /* default */], null)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h4',
        null,
        'Maximum power point tracking'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: 'list-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item', onClick: mppt_keithley_2400 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#' },
            'Keithley 2400'
          )
        )
      )
    )
  ), document.getElementById('root'));
}

render();

/**/

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url__ = __webpack_require__(7);
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

/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);






class InstrumentList extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {
    super(...arguments);

    setInterval(() => {

      this.readConfig().instruments.forEach(cfg => {

        let stateName = "status_" + cfg.trackerHost;

        fetch("http://" + cfg.trackerHost + ":" + cfg.trackerPort + "/idn").then(response => {

          this.setState({ [stateName]: true });
        }).catch(() => {

          this.setState({ [stateName]: false });
        });
      });
    }, 1000);

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("instrumentUpdated", () => {
      // When the instrument has been changed through the config, we need to trigger a new rendering
      this.render();
    });

    this.state = {};
    this.loadInstrument = this.loadInstrument.bind(this);
    this.addInstrument = this.addInstrument.bind(this);
    this.removeInstrument = this.removeInstrument.bind(this);
    this.editInstrument = this.editInstrument.bind(this);
  }
  addInstrument() {
    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("addInstrument");
  }

  loadInstrument(event) {

    let instrumentHost = event.currentTarget.getAttribute('id');

    if (!this.state["status_" + instrumentHost]) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("loadInstrument", instrumentHost);
  }

  removeInstrument(event) {
    event.stopPropagation();
    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("removeInstrument", event.target.parentNode.parentNode.parentNode.getAttribute('id'));
  }

  editInstrument(event) {
    event.stopPropagation();
    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("editInstrument", event.target.parentNode.parentNode.parentNode.getAttribute('id'));
  }

  readConfig() {

    let cfg;

    try {
      console.log(__dirname, __WEBPACK_IMPORTED_MODULE_2_fs___default.a.readFileSync(__dirname + '/../config.json'));
      cfg = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_fs___default.a.readFileSync(__dirname + '/../config.json'));
      console.log(cfg);
      cfg.instruments = cfg.instruments || [];
    } catch (e) {
      console.error(e);
      return null;
    }

    return cfg;
  }

  render() {

    const config = this.readConfig();
    console.log(config);
    if (config === null) {
      return null;
    }

    let instruments = config.instruments.map(config => {

      let connected = !!this.state['status_' + config.trackerHost];

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "li",
        {
          className: "list-group-item " + (connected ? 'bg-success' : 'bg-danger'),
          id: config.trackerHost,
          onClick: this.loadInstrument,
          key: config.trackerHost },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "pull-right" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "#" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-remove", onClick: this.removeInstrument })
          ),
          "\xA0",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "#" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-edit", onClick: this.editInstrument })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-" + (connected ? 'ok text-success' : 'warning-sign text-danger') }),
        "\xA0 ",
        config.trackerName
      );
    });

    instruments.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "li",
      { className: "list-group-item", onClick: this.addInstrument, key: "__new" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "a",
        { href: "#" },
        "+ Add an instrument"
      )
    ));

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "ul",
      { id: "instrumentList", className: "list-group" },
      instruments
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (InstrumentList);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"ageing":true}

/***/ })
/******/ ]);