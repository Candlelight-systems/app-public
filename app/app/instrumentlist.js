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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_header_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jsx_instrumentlist_jsx__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_environment_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__influx__ = __webpack_require__(12);








let influx_error = undefined;
let influx_warning = undefined;

__WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].on("reloadInstruments", () => {
  render();
});

__WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].on("dbInformation", async (event, db) => {

  influx_error = false;

  try {
    console.log(db);

    await Object(__WEBPACK_IMPORTED_MODULE_6__influx__["c" /* ping */])(db);
    await Object(__WEBPACK_IMPORTED_MODULE_6__influx__["b" /* checkDB */])(db, db.username, db.password, db.db);
    await Object(__WEBPACK_IMPORTED_MODULE_6__influx__["a" /* checkAuth */])(db, db.username, db.password, db.db);

    influx_warning = false;
    influx_error = false;
  } catch (e) {

    // No privileges doesn't mean no write access...
    if (e === "No user defined" || e === "User not found" || e === "No privileges found" || e === "Bad credentials") {
      // Ok that's fine
      influx_warning = true;
      influx_error = false;
    } else {
      influx_warning = false;
      influx_error = true;
    }
  }

  render();
});

function mppt_keithley_2400() {
  __WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].send("mppt", "keithley2400");
}

function edit_influxdb() {
  __WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].send("editInfluxDB");
}

function render() {

  let status = null;

  if (influx_error !== undefined && influx_warning !== undefined) {

    if (influx_error) {
      status = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'text-danger' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-remove' }),
        ' Cannot connect'
      );
    } else if (influx_warning) {
      status = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'text-warning' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-warning-sign' }),
        ' Partial DB access'
      );
    } else {
      status = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'text-success' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-check' }),
        ' Connection ok'
      );
    }
  }

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
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'pull-right' },
            'InfluxDB status: ',
            status,
            ' \xA0 ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { className: 'btn btn-default', onClick: edit_influxdb },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '#' },
                'Edit InfluxDB connection'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h4',
            null,
            'Ageing setups'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__jsx_instrumentlist_jsx__["a" /* default */], { mode: 'ageing' })
      ),
      __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.measurement && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h4',
            null,
            'Precision measurements'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__jsx_instrumentlist_jsx__["a" /* default */], { mode: 'measurement' })
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(8);
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

/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(3);
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

  loadInstrument(event, mode) {

    let instrumentHost = event.currentTarget.getAttribute('id');

    if (!this.state["status_" + instrumentHost]) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("loadInstrument", { host: instrumentHost, mode: mode });
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
          onClick: e => this.loadInstrument(e, this.props.mode),
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
/* 11 */
/***/ (function(module, exports) {

module.exports = {"ageing":true,"statuses":{"light":{"version":"2.0","readonly":false},"heat":{"version":"ssr_1.0","switch":false}},"instrument":{"Small cells":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":30,"LSB":1.22,"LSBValue":1,"voltageRange":2.5,"autoZero":"device","groups":{"Slot Left":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}},"Slot Right":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}},"Modules A":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":400,"LSB":4.88,"LSBValue":1,"voltageRange":10,"autoZero":"devices","groups":{"Module 1":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}},"Module 2":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}},"Modules B":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":400,"LSB":4.88,"LSBValue":1,"voltageRange":10,"autoZero":"devices","groups":{"Module 3":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}},"Module 4":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}}}}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export query */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkDB; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
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

/***/ })
/******/ ]);