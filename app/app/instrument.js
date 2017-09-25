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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ping; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(16);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class GraphComponent extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
			this.resize(nextProps);
		}
	}

	shouldComponentUpdate(nextProps) {

		if (!nextProps.shown) {
			return false;
		}

		return true;
	}

	resize(props) {
		this.graph.resize(props.width || 300, props.height || 130);
	}

	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "cellGraph" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { ref: el => this.graphDOM = el })
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (GraphComponent);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class CellButtons extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	/*
  *	props.current
  *	props.start
  *	props.change
  *	props.arrowstatus
  */
	constructor(props) {
		super(props);
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			null,
			!!this.props.cfg && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ className: "btn btn-sm btn-default", onClick: this.props.cfg },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" })
			),
			!!this.props.start && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ className: "btn btn-sm btn-success", onClick: this.props.start },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-play" })
			),
			!!this.props.button_stop && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ className: "btn btn-sm btn-danger", onClick: this.props.stop },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" })
			),
			!!this.props.button_jsc && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ type: "button", className: (this.props.button_jsc_disabled ? 'disabled ' : '') + "btn btn-primary btn-sm", onClick: this.props.recordJsc },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }),
				" J",
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"sub",
					null,
					"sc"
				)
			),
			!!this.props.button_voc && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ type: "button", className: (this.props.button_voc_disabled ? 'disabled ' : '') + "btn btn-primary btn-sm", onClick: this.props.recordVoc },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }),
				" V",
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"sub",
					null,
					"oc"
				)
			),
			!!this.props.button_iv && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ type: "button", className: (this.props.button_iv_disabled ? 'disabled ' : '') + "btn btn-primary btn-sm", onClick: this.props.recordIV },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }),
				" IV"
			),
			!!this.props.button_download && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ type: "button", className: "btn btn-primary btn-sm", onClick: this.props.downloadData },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-download" })
			),
			!!this.props.button_details && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"button",
				{ type: "button", className: "btn btn-primary btn-sm", onClick: this.props.details },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-chevron-down" })
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CellButtons);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);






//import cellstatusrender from "./cellstatusrender.jsx"

let config;
let tracker;
let db;

__WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("reloadDB", (event, cfg) => {

	db = cfg.db;
	render();
});

__WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("loadInstrument", (event, cfg) => {

	tracker = cfg.tracker;
	db = cfg.db;
	render();
});

function render(cfg) {

	fetch("http://" + tracker.trackerHost + ":" + tracker.trackerPort + "/getInstruments", {
		method: 'GET'
	}).then(response => response.json()).then(json => {

		__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			json.map(json => {

				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ key: json.instrumentId },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h3',
						null,
						json.instrumentId
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__["a" /* default */], { instrumentId: json.instrumentId, fullScaleCurrent: json.fullScaleCurrent, config: tracker, configDB: db })
				);
			})
		), document.getElementById('root'));
	});
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group_jsx__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error_jsx__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_debounce__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__influx__ = __webpack_require__(3);










class TrackerInstrument extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {

    super(props);

    _initialiseProps.call(this);

    this.state = {
      cfg: props.config,
      paused: false,
      serverState: {}
    };

    if (!props.config) {
      this.state.error = "No configuration file was found for this instrument.";
    }

    setInterval(() => {
      this.updateInstrument();
      this.updateStatus();
    }, 60000);

    this.configure = this.configure.bind(this);
    this.editInstrument = this.editInstrument.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    //    this.checkAll = this.checkAll.bind( this );

    window.addEventListener("online", () => {
      this.updateStatus();
    });

    window.addEventListener("offline", () => {
      this.updateStatus();
    });

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("light.updated", this.updateInstrument);
  }

  async ping(props = this.props) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__influx__["a" /* ping */])(this.props.configDB).catch(error => {

      console.warn("Cannot reach influx DB. Error was: ", error);

      this.setState({
        error_influxdb: "Connection to influxDB has failed: \"" + error + "\""
      });

      return Promise.reject();
    });
  }

  async updateStatus() {
    this.getStatus().then(serverState => {

      this.setState({
        serverState: serverState,
        error_tracker: false
      });
    }).catch(error => {

      console.warn("Cannot retrieve channel statuses. Error was: ", error);
      // TODO something
      this.setState({ error_tracker: error });
    });
  }

  async getStatus(props = this.props) {

    return fetch("http://" + props.config.trackerHost + ":" + props.config.trackerPort + "/getStatus?instrumentId=" + props.instrumentId, {

      method: 'GET'

    }).then(response => response.json()).catch(error => {

      this.setState({
        error_tracker: error
      });
    });
  }

  editInstrument() {
    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("editInstrument", this.props.config.trackerHost);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ cfg: nextProps.config });

    this.updateInstrument(nextProps);
  }

  configure() {
    $(this.modal).modal('show');
  }

  componentDidMount() {
    this.ipChanged();
  }

  ipChanged() {
    this.updateInstrument();
  }

  getGroups(props = this.props) {

    return fetch("http://" + this.state.cfg.trackerHost + ":" + this.state.cfg.trackerPort + "/getGroups?instrumentId=" + props.instrumentId, { method: 'GET' }).then(response => response.json()).catch(error => {

      this.setState({
        error: error.message || "The connection to the tracker has failed. Check that the ip address (" + this.state.cfg.trackerHost + ") is correct and that you have access to the network",
        errorMethods: [["Edit the instrument config", this.editInstrument], ["Retry", this.updateInstrument]]
      });

      return Promise.reject();
    });
  }

  refreshrateChanged(rate) {

    this.setState({
      refreshRate: rate
    });
  }

  render() {

    let content;

    if (this.state.groups) {

      var groupsDoms = this.state.groups.map((group, i) => {

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__group_jsx__["a" /* default */], {

          key: group.groupID,
          instrumentId: this.props.instrumentId,
          id: group.groupID,
          name: group.groupName,
          channels: group.channels,
          config: this.props.config,
          configDB: this.props.configDB,
          serverState: this.state.serverState[group.groupName],
          updateState: this.updateInstrument,
          getStatus: this.updateStatus
        });
      });
    }

    if (groupsDoms) {
      content = groupsDoms;
    } else if (this.state.error) {

      content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__error_jsx__["a" /* default */], { message: this.state.error || this.state.error_influxdb, errorMethods: this.state.errorMethods })
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "container-fluid" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row statuses" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-sm-4 alert " + (this.state.error_influxdb ? ' alert-danger' : 'alert-success') },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { title: this.state.error_influxdb || "", className: "glyphicon glyphicon-" + (this.state.error_influxdb ? 'warning-sign' : 'check') }),
          "\xA0 InfluxDB server",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "pull-right" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "button",
              { type: "button", className: "btn btn-default btn-sm", onClick: () => {
                  __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("editInfluxDB");
                } },
              "Config"
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-sm-4 alert " + (this.state.error_tracker ? ' alert-danger' : 'alert-success') },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { title: this.state.error_tracker || "", className: "glyphicon glyphicon-" + (this.state.error_tracker ? 'warning-sign' : 'check') }),
          "\xA0 Instrument connection",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "pull-right" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "button",
              { type: "button", className: "btn btn-default btn-sm", onClick: this.editInstrument },
              "Config"
            )
          )
        )
      ),
      content
    );
  }
}

/*
    

*/

var _initialiseProps = function () {
  this.updateInstrument = __WEBPACK_IMPORTED_MODULE_4_lodash_debounce___default()((props = this.props) => {

    return Promise.all([this.getGroups(props), this.getStatus(props), this.ping(props)]).then(args => {

      let groups = args[0],
          status = args[1],
          ping = args[2];

      this.setState({
        groups: groups,
        serverState: status,
        error_influxdb: false,
        error_tracker: false
      });
    }).catch(e => {});
  }, 100);
};

/* harmony default export */ __webpack_exports__["a"] = (TrackerInstrument);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device_jsx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__influx__ = __webpack_require__(3);






class TrackerGroupDevices extends __WEBPACK_IMPORTED_MODULE_1_react___default.a.Component {

  constructor(props) {
    super(props);
    this.state = {
      channelChecked: {}
    };

    this.pauseAll = this.pauseAll.bind(this);
    this.resumeAll = this.resumeAll.bind(this);
    this.toggleChannelCheck = this.toggleChannelCheck.bind(this);

    this.cfgAll = this.cfgAll.bind(this);
    this.measureIVAll = this.cfgAll.bind(this);
    this.measureVocAll = this.cfgAll.bind(this);
    this.measureJscAll = this.cfgAll.bind(this);
    this.checkAll = this.checkAll.bind(this);

    this.light_calibrate = this.light_calibrate.bind(this);
    this.light_controller_config = this.light_controller_config.bind(this);
    this.updateGroupStatus = this.updateGroupStatus.bind(this);

    setInterval(() => {

      this.updateGroupStatus();
    }, 60000);

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("light.updated", this.updateGroupStatus);
  }

  componentDidMount() {
    this.updateGroupStatus();
    this.initCheckChannels(this.props);
  }

  updateGroupStatus() {

    Object(__WEBPACK_IMPORTED_MODULE_4__influx__["b" /* query */])("SELECT time, light1, temperature, humidity FROM \"" + this.props.instrumentId + "_" + this.props.id + "\" ORDER BY time DESC limit 1", this.props.configDB.db, this.props.configDB).then(results => {

      if (!results[0] || !results[0].series || !results[0].series[0]) {
        return;
      }

      let values = results[0].series[0].values[0];

      this.setState({

        sun: values[1],
        temperature: values[2],
        humidity: values[3]

      });
    }).catch(error => {
      console.error(error);
    });
  }

  light_calibrate() {

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("calibratePD", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    });
  }

  light_controller_config() {

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("scheduleLight", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    });
  }

  cfgAll() {

    var chanIds = [];
    for (var i in this.state.channelChecked) {
      if (this.state.channelChecked[i]) {
        chanIds.push(parseInt(i));
      }
    }

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].once("channelsConfigured", (event, response) => {

      this.setState({ updating: true });

      var data = {
        instrumentId: this.props.instrumentId,
        groupName: this.props.name,
        chanIds: chanIds,
        chanStatuses: {}
      };

      delete response.measurementName;
      delete response.enable;

      for (var i = 0; i < chanIds.length; i++) {

        data.chanStatuses[chanIds[i]] = Object.assign({}, response, { cellName: response["__cellName_" + chanIds[i]] });;

        //delete response["__cellName_" + chanIds[ i ] ];
      }

      let body = JSON.stringify(data);
      let headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": body.length.toString()
      });

      fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setStatuses", {

        headers: headers,
        method: 'POST',
        body: body

      }).then(response => {

        this.props.getStatus();
      }).catch(() => {});
    });

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].send("configChannels", {

      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      chanIds: chanIds,

      trackerHost: this.props.config.trackerHost,
      trackerPort: this.props.config.trackerPort
    });
  }

  componentWillReceiveProps(nextProps) {

    this.initCheckChannels(nextProps);
  }

  initCheckChannels(nextProps) {

    let channelChecked = {};
    nextProps.channels.forEach(chan => {
      channelChecked[chan.chanId] = this.state.channelChecked[chan.chanId] || false;
    });
    this.setState({ channelChecked: channelChecked });
  }

  toggleChannelCheck(chanId) {

    this.setState(state => {

      state.channelChecked[chanId] = !state.channelChecked[chanId];
      return { channelChecked: state.channelChecked };
    });
  }

  checkAll() {

    for (var i in this.state.channelChecked) {
      this.state.channelChecked[i] = !this.state.checkAll;
    }

    this.setState(state => ({

      channelChecked: this.state.channelChecked,
      checkAll: !this.state.checkAll

    }));
  }

  pauseAll() {

    fetch("http://" + this.state.cfg.trackerHost + ":" + this.state.cfg.trackerPort + "/pauseChannels", {

      method: 'GET'

    }).then(response => {

      this.setState({ paused: true });
    });
  }

  resumeAll() {

    fetch("http://" + this.state.cfg.trackerHost + ":" + this.state.cfg.trackerPort + "/resumeChannels", {
      method: 'GET'
    }).then(response => {

      this.setState({ paused: false });
    });
  }

  render() {

    if (this.props.channels) {

      var channelDoms = this.props.channels.map((chan, i) => {

        if (!this.props.serverState || !this.props.serverState.channels || !this.props.serverState.channels[chan.chanId]) {
          return;
        }

        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__device_jsx__["a" /* default */], {
          key: this.props.instrumentId + "_" + chan.chanId,
          instrumentId: this.props.instrumentId,
          groupName: this.props.name,
          config: this.props.config,
          configDB: this.props.configDB,
          chanId: chan.chanId,
          serverState: this.props.serverState.channels[chan.chanId],
          updateStatus: this.props.getStatus,
          toggleChannelCheck: () => this.toggleChannelCheck(chan.chanId),
          channelChecked: this.state.channelChecked[chan.chanId] });
      });
    }

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "div",
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "h4",
        null,
        "Group: ",
        this.props.name
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        { className: "statuses" },
        !!this.props.serverState.lightController && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "alert alert-info col-sm-4" },
          "Light setpoint: ",
          this.props.serverState.lightSetpoint,
          " sun",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "div",
            { className: "pull-right" },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              "button",
              { type: "button", className: "btn btn-default btn-sm", onClick: this.light_controller_config },
              "Configure"
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "alert alert-info col-sm-4" },
          "Light intensity: ",
          this.state.sun,
          " sun",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "div",
            { className: "pull-right" },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              "button",
              { type: "button", className: "btn btn-default btn-sm", onClick: this.light_calibrate },
              "Calibrate"
            )
          )
        ),
        this.state.temperature !== -1 && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "alert alert-info col-sm-3" },
          "Temperature: ",
          this.state.temperature,
          " \xB0C"
        ),
        this.state.humidity !== -1 && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "alert alert-info col-sm-3" },
          "Humidity: ",
          this.state.humidity,
          " %"
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", { className: "clearfix" })
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        { className: "cell toprow" },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "div",
            { className: "col-sm-2" },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              "span",
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("input", { className: "channel-check", type: "checkbox", onClick: this.checkAll, checked: this.state.checkAll }),
              "\xA0",
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                "a",
                { href: "#", onClick: this.cfgAll },
                "Configure"
              )
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        null,
        channelDoms
      )
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TrackerGroupDevices);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__influx__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pgasettings__ = __webpack_require__(17);










//import cfg from "./config"

const initialState = {
	unknown: true,
	display: 'eff',
	ellapsed: 0,
	ellapsedUnit: 'min.',
	changeRate: false,
	absChangeRate: false,
	changeUnit: false,
	iv: null,
	data: null,
	data_IV: null,
	iv: null,
	efficiency: false,
	start_efficiency: false,
	highest_efficiency: false,
	voltage: false,
	ff: false,
	current: false,
	voc: false,
	jsc: false,
	sun: false,
	start: false,
	current: false,
	arrowstatus: false,
	change: false,
	showDetails: false,

	serverState: {}

};

class TrackerDevice extends __WEBPACK_IMPORTED_MODULE_5_react___default.a.Component {

	/**
  *	@param props.name The name of the cell
  */
	constructor(props) {
		super(props);
		console.log('create');
		this.unit = {
			"voltage": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"V"
			),
			"currentdensity": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"mA cm",
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			),
			"current": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"mA"
			),
			"efficiency": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"fillfactor": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"sun": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"sun"
			),
			"area": __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"span",
				null,
				"cm",
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"sup",
					null,
					"2"
				)
			)
		};

		this.state = initialState;

		this.cfg = this.cfg.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.pause = this.pause.bind(this);
		this.recordIV = this.recordIV.bind(this);
		this.recordJsc = this.recordJsc.bind(this);
		this.recordVoc = this.recordVoc.bind(this);

		this.showEfficiencies = this.showEfficiencies.bind(this);
		this.showSummary = this.showSummary.bind(this);
		this.showDetails = this.showDetails.bind(this);
		this.hideDetails = this.hideDetails.bind(this);
		this.downloadData = this.downloadData.bind(this);

		this.formValidated = this.formValidated.bind(this);
		this.toggleDetails = this.toggleDetails.bind(this);
		//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};

		this._last_iv_time = 0;
		this._last_iv = null;
		this._first_iv = null;
		console.log('create');
	}

	shouldComponentUpdate(props, state) {

		console.log(props, state);
		return true;
	}
	componentWillReceiveProps(nextProps) {

		this.setState({ updating: false, unknown: false });
		this.setState({ serverState: nextProps.serverState });

		if (nextProps.serverState.tracking_mode > 0 && nextProps.measurementName && nextProps.measurementName !== this.props.measurementName || !this.state.serverState) {

			this.updateInfluxData(nextProps.serverState);
		}
	}

	componentDidMount() {

		this.setState({ updating: false, unknown: false });
		this.setState({ serverState: this.props.serverState });

		if (this.props.serverState.tracking_mode > 0) {
			this.updateInfluxData(this.props.serverState);
		}
	}

	componentWillUnmount() {

		if (this.refreshInterval) {
			clearTimeout(this.refreshInterval);
			this.refreshInterval = true;
		}
	}

	formValidated(el) {
		/*	
  	el.tracking_mode = parseInt( el.tracking_mode );
  	el.tracking_step = parseInt( el.tracking_step );
  	el.tracking_fw = parseInt( el.tracking_step );
  	el.tracking_interval = parseInt( el.tracking_interval );
  	el.tracking_record_interval = parseInt( el.tracking_record_interval );
  		el.tracking_bwfwthreshold = parseFloat( el.tracking_bwfwthreshold );
  	el.tracking_fwbwthreshold = parseFloat( el.tracking_fwbwthreshold );
  	el.tracking_measure_voc_interval = parseInt( el.tracking_measure_voc_interval );
  	el.tracking_measure_jsc_interval = parseInt( el.tracking_measure_jsc_interval );
  		el.tracking_measure_voc = +el.tracking_measure_voc;
  	el.tracking_measure_jsc = +el.tracking_measure_jsc;
  	
  		el.cellArea = parseFloat( el.cellArea );
  		el.iv_start = parseFloat( el.iv_start );
  	el.iv_stop = parseFloat( el.iv_stop );
  	el.iv_hysteresis = +el.iv_hysteresis;
  		el.iv_interval = parseInt( el.iv_interval );
  	el.iv_rate = parseFloat( el.iv_rate );
  */

		this.saveStatus(el);
	}

	saveStatus(newState) {

		//	this.setState( { updating: true } );

		let body = JSON.stringify(newState);
		let headers = new Headers({
			"Content-Type": "application/json",
			"Content-Length": body.length.toString()
		});

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setStatus", {

			headers: headers,
			method: 'POST',
			body: body

		}).then(response => {

			this.getStatus();
		}).catch(() => {

			this.setState({ unknown: true, updating: false });
		});
	}

	resetChannel() {

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/resetStatus?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId, {

			method: 'GET'

		}).then(response => {

			this.getStatus();
		}).catch(() => {

			this.setState({ unknown: true, updating: false });
		});
	}

	recordIV() {

		this.setState({ updating: true });
		let body = JSON.stringify({ instrumentId: this.props.instrumentId, chanId: this.props.chanId });

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/executeIV?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).then(response => {

			this.getStatus();
		}).catch(() => {

			this.setState({ unkown: true, updating: false });
		});
	}

	recordVoc() {

		this.setState({ updating: true });

		let body = JSON.stringify({ instrumentId: this.props.instrumentId, chanId: this.props.chanId });

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordVoc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).then(response => {

			this.getStatus();
		}).catch(() => {

			this.setState({ unkown: true, updating: false });
		});
	}

	recordJsc() {

		this.setState({ updating: true });
		let body = JSON.stringify({ instrumentId: this.props.instrumentId, chanId: this.props.chanId });

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordJsc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).then(response => {

			this.getStatus();
		}).catch(() => {

			this.setState({ unkown: true, updating: false });
		});
	}

	//formChanged( name, value ) {

	//	this.state.tmpServerState[ name ] = value;
	//this.setState( { tmpServerState: this.state.tmpServerState } );
	//this.state.tmpServerState = Object.assign( {}, this.state.tmpServerState );
	//}

	downloadData() {

		__WEBPACK_IMPORTED_MODULE_6_electron__["ipcRenderer"].send("downloadData", this.state.serverState, this.props.instrumentId, this.props.chanId, this.state.serverState.measurementName);
	}

	componentDidUpdate() {

		//		this.getStatus();

		this.scheduleRefresh();
	}

	scheduleRefresh() {

		if (this.refreshInterval) {
			return;
		}

		this.refreshInterval = setTimeout(() => {

			this.refreshInterval = false;
			if (this.state.updating) {
				return;
			}

			this.updateInfluxData();
		}, this.props.refreshRate * 1000 || 10000);
	}

	pause() {
		this.state.serverState.enable = 0;
		this.saveStatus(this.state.serverState);
	}

	start() {

		this.state.serverState.measurementName = this.state.serverState.cellName + "_" + Date.now();
		this.state.serverState.enable = 1;
		this.saveStatus(this.state.serverState);
	}

	stop() {
		this.state.serverState.measurementName = false;
		this.state.serverState.cellName = "";
		this.state.serverState.cellArea = 0;
		this.state.serverState.tracking_mode = 0;
		this.state.serverState.enable = 0;

		this._last_iv_time = false;
		this._last_iv = false;
		this._first_iv = false;
		this.data_sun = false;
		this.data_humidity = false;
		this.data_temperature = false;

		this.setState(initialState);
		this.resetChannel();
	}

	cfg() {

		__WEBPACK_IMPORTED_MODULE_6_electron__["ipcRenderer"].once("channelConfigured", (event, data) => {

			if (data.chanId !== this.state.serverState.chanId) {
				return;
			}

			this.formValidated(data);
		});

		__WEBPACK_IMPORTED_MODULE_6_electron__["ipcRenderer"].send("configChannel", {

			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			chanId: this.props.chanId,

			trackerHost: this.props.config.trackerHost,
			trackerPort: this.props.config.trackerPort
		});
	}

	getStatus() {

		this.props.updateStatus();
	}

	tooltip(message, color) {

		return e => {
			if (message.length == 0) {
				this._tooltip.style.display = 'none';
			} else {

				this._tooltip.setAttribute('data-color', color);
				this._tooltip.style.display = 'block';
				this._tooltipcontent.innerHTML = message;
			}
		};
	}

	showEfficiencies() {

		if (this.wrapper.classList.contains('show-second')) {
			return;
		}
		this.wrapper.classList.add("show-second");
		this.wrapper.classList.remove("show-first");
	}

	toggleDetails() {
		this.setState(state => ({ showDetails: !state.showDetails }));
	}
	showDetails() {
		this.setState({ showDetails: true });
	}

	hideDetails() {
		this.setState({ showDetails: false });
	}

	showSummary() {

		if (!this.wrapper || !this.wrapper.classList.contains('show-second')) {
			return;
		}

		this.wrapper.classList.add("show-first");
		this.wrapper.classList.remove("show-second");
	}

	readIVs(results) {

		return results.map((result, index) => {

			return this.readIV(result);

			/*if( index == 1 ) {
   	ivtime = new Date( esult.series[ 0 ].values[ 0 ][ 0 ] )
   }*/
		});
	}

	readIV(result) {

		if (!result.series) {
			return;
		}

		let iv = result.series[0].values[0][1].replace("\"", "").split(",").map(el => parseFloat(el)),
		    wave = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		for (var i = 0; i < iv.length - 1; i += 2) {
			wave.append(iv[i], iv[i + 1]);
		}
		return wave;
	}

	updateInfluxData(serverState = this.state.serverState) {

		/*
  *	Procedure:
  *		1. Get number of points
  *		2. Use grouping to get 100 points
  *		3. Get latest vocs, jscs
  */

		let parameter,
		    newState = {},
		    db = this.props.configDB.db,
		    db_ds,
		    grouping,
		    timeQuery,
		    query,
		    queue = [];

		if (!serverState.measurementName) {
			return;
		}

		switch (this.state.display) {

			case "voc":
				parameter = "voltage_mean";
				break;

			default:
			case "eff":
				parameter = "efficiency";
				break;

		}

		let queries = ["SELECT time, efficiency FROM \"" + serverState.measurementName + "\" ORDER BY time ASC limit 1", "SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM \"" + serverState.measurementName + "\" ORDER BY time DESC limit 1", "SELECT time, iv FROM \"" + serverState.measurementName + "_iv\" ORDER BY time DESC limit 1", "SELECT voc FROM \"" + serverState.measurementName + "_voc\" ORDER BY time DESC LIMIT 1", "SELECT jsc FROM \"" + serverState.measurementName + "_jsc\" ORDER BY time DESC LIMIT 1"];

		Object(__WEBPACK_IMPORTED_MODULE_4__influx__["b" /* query */])(queries.join(";"), db, this.props.configDB).then(results => {

			if (!results[0].series) {
				throw "No measurement with the name " + serverState.measurementName + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timefrom_date = new Date(timefrom),
			    timeto_date = new Date(timeto);

			let last_iv = new Date(results[2].series[0].values[0][0]);

			newState.start_efficiency = Math.round(results[0].series[0].values[0][1] * 100) / 100;
			newState.efficiency = Math.round(results[1].series[0].values[0][1] * 100) / 100;

			newState.power = results[1].series[0].values[0][2];
			newState.current = (results[1].series[0].values[0][3] * 1000).toPrecision(3);
			newState.voltage = parseFloat(results[1].series[0].values[0][4]).toPrecision(3);
			newState.sun = Math.round(results[1].series[0].values[0][5] * 100) / 100;
			newState.pga = results[1].series[0].values[0][6];
			newState.temperature_base = results[1].series[0].values[0][7];
			newState.temperature_vsensor = results[1].series[0].values[0][8];
			newState.temperature_junction = results[1].series[0].values[0][9];
			newState.humidity = results[1].series[0].values[0][10];

			//	let cnt = results[ 2 ].series[ 0 ].values[ 0 ][ 1 ];


			let timeDifference = (timeto_date - timefrom_date) / 1000;

			newState.last_time = timeto_date;
			newState.ellapsed = Math.round(timeDifference / 3600 * 10) / 10;

			if (timeDifference < 3600) {
				newState.ellapsed = Math.round(timeDifference / 60);
				newState.ellapsedUnit = "min.";
			} else {
				newState.ellapsed = Math.round(newState.ellapsed);
				newState.ellapsedUnit = "h";
			}

			grouping = Math.max(1, Math.round(timeDifference / 100));

			if (timeDifference > 3 * 24 * 3600) {
				// Display in days
				db_ds = db; // + "_downsampled_1h";
			} else if (timeDifference > 300) {
				db_ds = db; // + "_downsampled_1min";
			} else {
				db_ds = db;
			}

			//query = "SELECT time, MAX(efficiency) as effMax FROM \"" + this.state.serverState.measurementName + "\" ORDER BY time ASC limit 1;"
			//queue.push( influxquery( query, db_ds ).then( ( results ) => {
			let changeUnit,
			    changeUnitVal,
			    prev_time = timeto_date.getTime() - (timeto_date.getTime() - timefrom_date.getTime()) / 10;

			if (timeto_date.getTime() - timefrom_date.getTime() > 12 * 3600 * 1000) {
				// Display in days

				changeUnitVal = 24 * 3600;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 day
				changeUnit = " &#951;% / day";
			} else if (timeto_date.getTime() - timefrom_date.getTime() > 600 * 1000) {

				changeUnitVal = 3600;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 hour
				changeUnit = " &#951;% / hour";
			} else if (timeto_date.getTime() - timefrom_date.getTime() > 300 * 1000) {

				changeUnitVal = 60;
				//prev_time = timeto_date.getTime() - changeUnitVal * 1000; // 1 minute
				changeUnit = " &#951;% / minute";
			}

			if (results[3].series) {
				newState.voc = Math.round(results[3].series[0].values[0][1] * 1000) / 1000;
			}

			if (results[4].series) {
				newState.jsc = Math.round(results[4].series[0].values[0][1] / serverState.cellArea * 1000 * 1000) / 1000;
			}

			query = "SELECT MEAN(" + parameter + ") as param, MAX(efficiency) as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( sun ) as sMean FROM \"" + serverState.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;";

			queue.push(Object(__WEBPACK_IMPORTED_MODULE_4__influx__["b" /* query */])(query, db_ds, this.props.configDB).then(results => {

				let values = results[0].series[0].values,
				    offset,
				    wave = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveIV = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    highest_efficiency = 0,
				    highest_efficiency_time = 0;

				// First point gives the initial efficiency, 2nd row
				if (values.length < 2) {
					newState.data = false;
					return;
				}

				let effIndex = 2;

				values.forEach((value, index) => {

					let date = new Date(value[0]),
					    time;

					if (index == 0) {
						offset = date.getTime();
						time = 0;
					} else {
						time = (date.getTime() - offset) / 1000;
					}

					if (value[effIndex] > 35 || value[effIndex] < 0) {
						// Higher than 35% => fail. Lower than 0% => fail.
						return;
					}

					wave.append(time, value[effIndex]);
					waveSun.append(time, value[5]);
					waveIV.append(value[3], value[4]);
					waveTemperature.append(time, value[6]);
					waveHumidity.append(time, value[7]);

					if (value[2] > highest_efficiency && !isNaN(value[2])) {
						highest_efficiency = value[2];
						highest_efficiency_time = time;
					}
				});

				if (prev_time && changeUnitVal) {

					wave.fit({

						params: [0, 0],
						subsetIndex: [wave.getIndexFromX((prev_time - offset) / 1000), wave.getIndexFromX((timeto_date.getTime() - offset) / 1000)],
						function: (x, params) => {
							return x * params[0] + params[1];
						}
					}).then(params => {

						newState.changeRate = Math.round(params[0] * changeUnitVal * 1000) / 1000;
						newState.absChangeRate = params[0];
						newState.changeUnit = changeUnit;
					});
				} else {

					newState.changeRate = undefined;
					newState.absChangeRate = undefined;
					newState.changeUnit = undefined;
				}

				newState.highest_efficiency = Math.round(highest_efficiency * 100) / 100;
				newState.highest_efficiency_time = highest_efficiency_time;
				newState.data = wave;
				newState.data_sun = waveSun;
				newState.data_temperature = waveTemperature;
				newState.data_humidity = waveHumidity;
				newState.data_IV = waveIV;
			}));

			if (!this._first_iv && last_iv) {
				query = "SELECT time, iv FROM \"" + serverState.measurementName + "_iv\" ORDER BY time ASC limit 1";
				queue.push(Object(__WEBPACK_IMPORTED_MODULE_4__influx__["b" /* query */])(query, db, this.props.configDB).then(this.readIVs.bind(this)).then(iv => {

					this._first_iv = iv[0];
				}));
			}

			if (last_iv.getTime() > this._last_iv_time) {

				this._last_iv_time = last_iv.getTime();
				this._last_iv = this.readIV(results[2]);
			}

			return Promise.all(queue).then(() => {

				newState.ff = Math.round(newState.power / serverState.cellArea / (newState.voc * newState.jsc / 1000) * 100);
				newState.updating = false;
				console.log('newstate');
				this.setState(newState);
			}).catch(error => {

				console.error("Could not process influx DB request.");
				console.error(error);
			});
		}).catch(error => {

			console.error("Could not process influx DB request.");
			console.error(error);
		}).then(() => {

			this.scheduleRefresh();
		});
	}

	render() {

		let unit, arrowstatus, change, changeUnit, currVal, startVal, startValPos;

		switch (this.state.display) {

			case "eff":
				unit = "%";
				startVal = this.state.highest_efficiency;
				startValPos = this.state.highest_efficiency_time;
				currVal = this.state.efficiency;
				change = this.state.efficiency - this.state.prev_efficiency;

				break;

			case "voc":
				unit = "V";
				startVal = this.state.start_voc;
				startValPos = 0;
				currVal = this.state.voc;
				change = this.state.voc - this.state.prev_voc;
				break;
		}

		if (this.state.absChangeRate) {

			change = this.state.absChangeRate * 3600 * 24;

			//let changeDecision = change / this.state.prev_unit_ms * ( 3600 * 1000 );
			if (change > 0.05) {
				arrowstatus = 'up';
			} else if (change < -0.05) {
				arrowstatus = 'down';
			} else if (change > 0) {
				arrowstatus = 'flatup';
			} else {
				arrowstatus = 'flatdown';
			}
		}

		let notavailable = "N/A";

		let arrowClassWrapper = "arrow " + arrowstatus;
		let arrowClass = "glyphicon glyphicon-arrow-left";

		let active = this.state.serverState.enable && this.state.serverState.tracking_mode > 0;

		let trackingMode;

		if (this.state.serverState.enable == 0) {
			trackingMode = "Off";
		} else {

			if (this.state.serverState.tracking_mode == 1) {
				trackingMode = "MPPT";
			} else if (this.state.serverState.tracking_mode == 2) {
				trackingMode = "Voc";
			} else if (this.state.serverState.tracking_mode == 3) {
				trackingMode = "Jsc";
			} else {
				trackingMode = "No tracking";
			}
		}

		return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
			"div",
			{ ref: el => this.wrapper = el, className: 'cell ' + (this.state.unknown ? 'cell-unknown' : active ? 'cell-running' : 'cell-stopped') + (this.state.showDetails && active ? ' show-details' : '') },
			__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"div",
				{ className: "row cell-element" },
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "summary", ref: el => this.rowSummary = el },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-2 propElement" },
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("input", { type: "checkbox", className: "channel-check", onClick: this.props.toggleChannelCheck, checked: !!this.props.channelChecked }),
							" ",
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("span", { className: "glyphicon glyphicon-tags" })
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.serverState.cellName || "Ch " + this.state.serverState.chanId,
								" (",
								trackingMode,
								")"
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-1 propElement" },
						!!this.state.ellapsed && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("span", { className: "glyphicon glyphicon-hourglass" })
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.ellapsed
							),
							"\xA0 ",
							this.state.ellapsedUnit
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-1 propElement" },
						!!this.state.sun && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" })
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.sun
							),
							"\xA0",
							this.unit.sun
						),
						" "
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-1 propElement" },
						this.state.efficiency !== undefined && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								"\u03B7"
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.efficiency
							),
							this.unit.efficiency
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-1 propElement" },
						!!this.state.voc && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								"V",
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"sub",
									null,
									"oc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.voc
							),
							" ",
							this.unit.voltage
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-2 propElement" },
						!!this.state.jsc && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								"J",
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"sub",
									null,
									"sc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.jsc
							),
							" ",
							this.unit.currentdensity
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-1 propElement" },
						!!this.state.ff && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "label" },
								"FF"
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.ff
							),
							this.unit.fillfactor
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-2 propElement" },
						!!active && !!arrowstatus && this.state.serverState.tracking_mode == 1 && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: arrowClassWrapper },
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("span", { className: arrowClass }),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"span",
								null,
								this.state.changeRate,
								" ",
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.changeUnit } })
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"div",
						{ className: "col-xs-4 propElement" },
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__["a" /* default */], {
							cfg: () => {
								this.cfg();
							},
							stop: this.stop,
							start: !this.state.serverState.enable && !!this.state.serverState.cellName && this.state.serverState.cellName.length > 0 ? this.start : undefined,
							recordJsc: this.recordJsc,
							recordVoc: this.recordVoc,
							recordIV: this.recordIV,
							downloadData: this.downloadData,
							button_jsc: active,
							button_voc: active,
							button_iv: active,
							button_download: active,
							button_start: !active && this.props.cellName,
							button_stop: active,
							button_details: active,
							details: this.toggleDetails,

							button_jsc_disabled: this.props.serverState.jsc_booked || this.state.updating,
							button_voc_disabled: this.props.serverState.voc_booked || this.state.updating,
							button_iv_disabled: this.props.serverState.iv_booked || this.state.updating
						})
					)
				),
				!!active && this.state.efficiency !== undefined && !!this.state.highest_efficiency && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "bar", onClick: this.showEfficiencies },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("div", { className: "barGreen", style: { width: this.state.efficiency / 25 * 100 + "%" } }),
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("div", { className: "barRed", style: { width: (this.state.highest_efficiency - this.state.efficiency) / 25 * 100 + "%" } })
				)
			),
			__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"div",
				{ className: "row efficiency cell-element", onClick: this.showSummary, ref: el => this.rowEfficiency = el },
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-2 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"span",
						null,
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "label" },
							"Current efficiency"
						),
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "value" },
							this.state.efficiency,
							" ",
							this.unit.efficiency
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-2 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"span",
						null,
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "label" },
							"Highest efficiency"
						),
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "value" },
							this.state.highest_efficiency,
							" ",
							this.unit.efficiency
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-2 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"span",
						null,
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "label" },
							"Actual voltage"
						),
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "value" },
							this.state.voltage,
							" ",
							this.unit.voltage
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-3 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"span",
						null,
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "label" },
							"Actual current density"
						),
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "value" },
							this.state.current,
							" ",
							this.unit.currentdensity
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-3 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"span",
						null,
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "label" },
							"Current range"
						),
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"span",
							{ className: "value" },
							"\xB1 ",
							Object(__WEBPACK_IMPORTED_MODULE_7__pgasettings__["a" /* pgaValueToRange */])(this.state.pga, this.props.config.fullScaleCurrent),
							" ",
							this.unit.currentdensity
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-xs-3 propElement fullHeight" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__["a" /* default */], { shown: true, mode: "sparkline", width: "180", height: "43", data: this.state.data, unit: unit })
				)
			),
			__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("div", { className: "clearfix" }),
			__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"div",
				{ className: "row cell-element" },
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-sm-3" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
						"table",
						{ cellPadding: "0", cellSpacing: "0", className: "parameters" },
						__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
							"tbody",
							null,
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"Cell name"
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									this.state.serverState.cellName || "Ch " + this.props.chanId
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"Area"
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									this.state.serverState.cellArea ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
										"span",
										null,
										this.state.serverState.cellArea,
										" cm",
										__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
											"sup",
											null,
											"2"
										)
									) : ""
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"PCE"
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									this.state.efficiency ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
										"span",
										null,
										this.state.efficiency,
										" ",
										this.unit.efficiency
									) : notavailable
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"Humidity"
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									!isNaN(this.state.humidity) ? this.state.humidity + "%" : "N/A"
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"Board temp."
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									!isNaN(this.state.temperature_base) ? this.state.temperature_base + "\u00B0C" : "N/A"
								)
							),
							__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
								"tr",
								null,
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									"Est. junction temp."
								),
								__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
									"td",
									null,
									!isNaN(this.state.temperature_junction) ? this.state.temperature_junction + "\u00B0C" : "N/A"
								)
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-sm-6" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__["a" /* default */], {
						shown: this.state.showDetails,
						width: "500",
						height: "220",
						mode: "default",
						key: this.props.instrumentId + this.props.chanId + "_graph",
						data: this.state.data,
						data_sun: this.state.data_sun,
						data_humidity: this.state.data_humidity,
						data_temperature: this.state.data_temperature,
						flag1: startVal,
						flag1_pos: startValPos,
						unit: unit,
						flag2: currVal })
				),
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					"div",
					{ className: "col-sm-6" },
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__["a" /* default */], {
						width: "500",
						height: "220",
						shown: this.state.showDetails,
						key: this.props.instrumentId + this.props.chanId + "_iv",
						data: [this._first_iv, this._last_iv],
						dataIV: this.state.data_IV,
						voltage: this.state.voltage,
						current: this.state.current
					})
				)
			)
		);
	}
}

/*		
				

				<div className="col-sm-3">
					<h3>Real-time information</h3>

					<div className="tag blue"><span>Current</span><a>{ this.state.currentdensity }</a></div>
					<div className="tag blue"><span>Voltage</span><a>{ this.state.voltage }</a></div>
					<div className="tag green"><span>Tracking mode</span><a>{ this.state.tracking_mode }</a></div>
				</div>


				<StatusRender key={ this.props.instrumentId + this.props.chanId + "_status" } tracking_mode={this.state.tracking_mode} start={ startVal } ellapsed={ this.state.ellapsed } ellapsedUnit={ this.state.ellapsedUnit } current={ currVal } arrowstatus={ arrowstatus } change={ change } unit={ unit } changeUnit={ changeUnit } />

				<div className="cellActions pull-right">
					

					
				</div>


				*/
/*
						<div className={ 'action update' + ( this.state.updating ? ' rotating': '' ) } onClick={ this.update }>
							<span><span className="glyphicon glyphicon-refresh"></span></span> <a>Update</a>
						</div>

*/
/*{ ( !! this.state.enable && !!  this.state.measurementName ) && 
		<div className="config" onClick={ this.pause }>
			<span className="glyphicon glyphicon-pause"></span> <a>Pause channel</a>
		</div>
	}

*/
/* harmony default export */ __webpack_exports__["a"] = (TrackerDevice);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_extend__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6__);







var modes = {

	sparkline: {

		graphConstructor: {

			paddingTop: 4,
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: 0

		}

	},

	default: {

		graphConstructor: {
			paddingTop: 5,
			paddingLeft: 30,
			paddingRight: 30,
			paddingBottom: 0
		}
	}
};

class statusGraph extends __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__["a" /* default */] {

	/*
  *	props.current
  *	props.start
  *	props.change
  *	props.arrowstatus
  */
	constructor(props) {
		super(props);
	}

	componentDidMount() {

		if (!this.graphDOM) {
			return;
		}

		this.graph = new __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a(this.graphDOM, __WEBPACK_IMPORTED_MODULE_3_extend___default()(true, {}, modes[this.props.mode].graphConstructor, {

			close: {
				left: false,
				right: false,
				top: false,
				bottom: false
			}
		}));

		this.resize(this.props);

		this.serie = this.graph.newSerie();
		this.serie.setLineColor("#413ca5");
		this.serie.autoAxis();
		this.serie.setLineWidth(2);
		this.serie.setLabel("PCE");

		if (this.props.mode == 'sparkline') {

			this.graph.getYAxis().turnGridsOff();

			this.graph.getXAxis().hide();
			this.graph.getYAxis().hide();
		} else {

			this.graph.getYAxis().secondaryGridOff();

			this.graph.getYAxis().setLabel('Efficiency').setUnit('%').setUnitWrapper("(", ")");

			var legend = this.graph.makeLegend();
			legend.setAutoPosition("bottom");
			legend.update();

			this.graph.getRightAxis(0, { hideWhenNoSeriesShown: true }).setLabel('Sun').setTickPosition(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.TICKS_OUTSIDE);
			this.graph.getRightAxis(1, { hideWhenNoSeriesShown: true }).setLabel('Temperature').setUnit("&#xb0;C").setUnitWrapper("(", ")").setTickPosition(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.TICKS_OUTSIDE);

			this.graph.getRightAxis(2, { hideWhenNoSeriesShown: true }).setLabel('Humidity').setUnit("%").setUnitWrapper("(", ")").forceMin(0).forceMax(100).setTickPosition(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.TICKS_OUTSIDE);

			this.graph.getXAxis().setLabel('Time');
			this.graph.getXAxis().setUnit('h').setUnitWrapper("(", ")");

			this.serie_sun = this.graph.newSerie("sun").setLabel("Sun");
			this.serie_sun.autoAxis().setYAxis(this.graph.getRightAxis(0)).setLineColor("#109046");

			this.graph.getRightAxis(0).forceMin(0);

			this.serie_temperature = this.graph.newSerie("temperature").setLabel("Temp.");
			this.serie_temperature.autoAxis().setYAxis(this.graph.getRightAxis(1)).setLineColor("#b57e14");

			this.serie_humidity = this.graph.newSerie("humidity").setLabel("Hum.");
			this.serie_humidity.autoAxis().setYAxis(this.graph.getRightAxis(2)).setLineColor("#901241");
		}

		this.graph.getXAxis().turnGridsOff();

		this.graph.getXAxis().setAxisDataSpacing(0.001, 0.001);
		this.graph.getYAxis().setAxisDataSpacing(0.001, 0.001);

		this.graph.getYAxis().forceMin(0);

		this.serieZone = this.graph.newSerie("zone", {}, "zone");
		this.serieZone.setLineColor("#413ca5");
		this.serieZone.setFillColor("#413ca5");
		this.serieZone.setFillOpacity(0.2);
		this.serieZone.autoAxis();
		this.serieZone.setLineWidth(0);

		this.serieZone.excludedFromLegend = true;

		//this.serie.setData();

		if (this.props.mode !== 'sparkline') {

			this.flag1 = this.graph.newShape("html");
			this.flag1.addTransform("translate", this.graph.newPosition({ dx: "-60px", dy: "0px" }));
			this.flag1.setRenderer(dom => {
				__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
					'div',
					{ className: 'graph_tooltip' },
					__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
						'div',
						{ className: 'right' },
						__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
							'span',
							null,
							this.props.flag1,
							' ',
							this.props.unit
						)
					)
				), dom);
			});

			this.flag1.setSerie(this.serie);
			this.flag1.setWidth(100);
			this.flag1.setHeight(100);

			this.flag2 = this.graph.newShape("html");
			this.flag2.addTransform("translate", this.graph.newPosition({ dx: "-80px", dy: "-5px" }));
			this.flag2.setRenderer((dom, xpos, ypos) => {
				__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
					'div',
					{ className: 'graph_tooltip' },
					__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
						'div',
						{ className: 'top' },
						__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
							'span',
							null,
							this.props.flag2,
							' ',
							this.props.unit
						)
					)
				), dom);
			});

			//this.flag2.setPosition( { x: 0, dx: "180px", dy: "-7px" } );
			this.flag2.setSerie(this.serie);
			this.flag2.setWidth(100);
			this.flag2.setHeight(100);
		}
	}

	componentDidUpdate() {

		if (!this.serie) {
			return;
		}

		if (this.graph && this.props.data) {

			this.serie.setWaveform(this.props.data.setXScale(1 / 3600));
			this.serieZone.setWaveform(this.props.data.duplicate(true).prepend(0, 0).append(wave => wave.getXRaw(wave.getLength() - 1), 0));
			this.graph.autoscaleAxes();

			if (this.serie_sun) {
				console.log(this.props.data_sun);
				this.serie_sun.setWaveform(this.props.data_sun.setXScale(1 / 3600));
			}

			if (this.serie_temperature) {
				this.serie_temperature.setWaveform(this.props.data_temperature.setXScale(1 / 3600));
			}

			if (this.serie_humidity) {
				this.serie_humidity.setWaveform(this.props.data_humidity.setXScale(1 / 3600));
			}

			this.graph.autoscaleAxes();
			this.graph.draw();
			this.graph.updateLegend();

			if (this.flag1 && this.flag2) {
				this.flag1.draw();
				this.flag2.draw();

				this.flag1.setPosition({ x: this.props.flag1_pos / 3600 });
				this.flag1.redraw();

				this.flag2.setPosition({ x: this.serie.getMaxX() });
				this.flag2.redraw();

				this.flag1.show();
				this.flag2.show();
			}
		} else {

			this.serie.setWaveform(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]));
			this.serieZone.setWaveform(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]));

			this.graph.draw();

			if (this.flag1 && this.flag2) {
				this.flag1.hide();
				this.flag2.hide();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
	}

	shouldComponentUpdate(nextProps) {
		return super.shouldComponentUpdate(nextProps);
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
			'div',
			{ className: 'cellGraph' },
			__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div', { id: 'graph-snippet', className: 'graph-snippet', ref: el => this.graphDOM = el })
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (statusGraph);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);






class statusIV extends __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__["a" /* default */] {

	/*
  *	props.current
  *	props.start
  *	props.change
  *	props.arrowstatus
  */
	constructor(props) {
		super(props);
	}

	componentDidMount() {

		if (!this.graphDOM) {
			return;
		}

		this.graph = new __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default.a(this.graphDOM, {

			paddingTop: 10,
			paddingLeft: 25,
			paddingRight: 25,
			paddingBottom: 10,

			closeColor: "#303030"
		});

		this.resize(this.props);

		this.serie = [];

		this.graph.getLeftAxis().setLineAt([0]).gridsOff().setAxisColor("#303030").setPrimaryTicksColor("#303030").setSecondaryTicksColor("#303030").setTicksLabelColor("#303030").setLabelColor("#303030");

		this.graph.getBottomAxis().gridsOff().setAxisColor("#303030").setPrimaryTicksColor("#303030").setSecondaryTicksColor("#303030").setLabelColor("#303030").setTicksLabelColor("#303030");

		//	this.graph.setTitle("Latest j(V) curve")
		this.graph.getYAxis().flip().setLabel("Current").setUnitWrapper("(", ")").setEngineering(true).setUnit("A cm^-2").setUnitDecade(true);

		this.graph.getXAxis().setLabel("Voltage").setUnitWrapper("(", ")").setUnit("V");

		this.serieIV = this.graph.newSerie("iv_time");
		this.serieIV.autoAxes();
		this.serieIV.setLineColor("#be2d2d").setLineWidth(2);

		this.serie[0] = this.graph.newSerie("iv_0");
		this.serie[0].setLineColor("#303030");
		this.serie[0].autoAxis();
		this.serie[0].setLineWidth(2);

		this.serie[1] = this.graph.newSerie("iv_1");
		this.serie[1].setLineColor("#303030");
		this.serie[1].setLineStyle(2);
		this.serie[1].autoAxis();
		this.serie[1].setLineWidth(2);

		this.ellipse = this.graph.newShape("ellipse");
		this.ellipse.setR(3, 3);

		this.ellipse.setFillColor('#be2d2d');
		this.ellipse.setStrokeColor('#303030');
		this.ellipse.draw();
	}

	componentDidUpdate() {

		if (this.graph && this.props.data) {

			this.props.data.forEach((data, index) => {

				if (!data || !data.getLength) {
					this.serie[index].setWaveform(__WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]));
					return;
				}

				if (index > 1) {
					return;
				}
				this.serie[index].setWaveform(data);
			});

			if (this.props.dataIV) {
				this.serieIV.setWaveform(this.props.dataIV);
			}

			this.graph.autoscaleAxes();
			this.graph.show();

			if (this.props.data[0]) {
				this.graph.getYAxis().forceMin(-this.props.data[0].getMaxY() * 0.5);
			}

			this.ellipse.setPosition({ x: this.props.voltage, y: this.props.current / 1000 });
			this.ellipse.redraw();
			this.graph.autoscaleAxes();
			this.graph.draw();
		}

		if (!this.props.data) {

			this.serie.forEach(serie => {
				serie.setWaveform(__WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]));
			});

			this.serieIV.setWaveform(__WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform().setData([]));
			this.graph.draw();
			this.graph.hide();
		}
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
			'div',
			{ className: 'cellIV' },
			__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div', { id: 'graph-snippet', className: 'graph-snippet', ref: el => this.graphDOM = el })
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (statusIV);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pgaValueToRange; });

let pgaValueToRange = (pgaValue, fsr) => {
	// FSR is in A
	let str = "";
	fsr = 20e-3;
	// Convert to mA
	str += Math.round(fsr / parseInt(pgaValue) * 1000 * 1000) / 1000;

	return str;
};

/***/ }),
/* 18 */
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
    if (this.props.methods) {

      for (var i = 0; i < this.props.methods.length; i++) {
        messages.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          null,
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
/* 19 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ })
/******/ ]);