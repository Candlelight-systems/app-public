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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(19);
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

module.exports = {"ageing":true,"statuses":{"light":{"version":"2.0"},"heat":{"version":"2.0"}},"instrument":{"Small cells":{"ADC":{"model":"ADS1259"},"fsr":30},"Small modules":{"ADC":{"model":"ADS1147"},"fsr":100}}}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class GraphComponent extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

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
		console.log(props);
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
/* 7 */
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
			!!this.props.button_start && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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

/* unused harmony default export */ var _unused_webpack_default_export = (CellButtons);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
  @preserve Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(factory) {
    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        window.urllib = factory();
    }
})(function() {
    'use strict';

    var immutableEmptyObject = {},
        immutableEmptyArray = [],
        hasOwnProperty = immutableEmptyObject.hasOwnProperty;

    function _decode(str) {
        return str != null ? decodeURIComponent(str) : '';
    }

    function _encode(str) {
        return encodeURIComponent(str + '');
    }

    // Simplified Object.assign polyfill
    function _merge(target) {
        var output = new Object(target),
            argNo = 0,
            source,
            sourceKey;

        for (; ++argNo < arguments.length;) {
            source = arguments[argNo];

            if (source) {
                for (sourceKey in source) {
                    /* istanbul ignore else  */
                    if (hasOwnProperty.call(source, sourceKey)) {
                        output[sourceKey] = source[sourceKey];
                    }
                }
            }
        }

        return output;
    }

    function _splitOnQuery(url, favorQuery) {
        var urlString = (url || '') + '', // default to a string & then coerce to a string
            queryPos = urlString.indexOf('?');

        // If the URL doesn't have a "?" we have to decide how we want to handle the string.
        // If favorQuery === true, then we'll assume the entire string is the query string.
        // If !favorQuery then we set the queryPos to the end of the string (meaning the
        // query string is empty)
        if (queryPos < 0 && !favorQuery) {
            queryPos = urlString.length;
        }

        return {
            urlPath: urlString.slice(0, queryPos),
            queryString: urlString.slice(queryPos + 1)
        };
    }

    /**
    * Serializes the properties of a params object to produce a URL query string.
    * @param {object|object[]} urlParams - An object (or array of objects) representing the query params to serialize
    * @returns {string} Serialized query string
    */
    function formatQuery(urlParams) {
        var paramsObj = urlParams;

        if (Array.isArray(paramsObj)) {
            paramsObj = paramsObj.length < 2
                ? paramsObj[0]
                : _merge.apply(null, paramsObj);
        }

        paramsObj = paramsObj || immutableEmptyObject;

        return Object.keys(paramsObj)
            .reduce(function(prevUrlParamPairs, paramName) {
                var urlParamPairs = prevUrlParamPairs,
                    paramValue;

                if (paramName) {
                    paramValue = paramsObj[paramName];

                    if (paramValue != null) {
                        urlParamPairs.push(_encode(paramName) + '=' + _encode(paramValue));
                    }
                }

                return urlParamPairs;
            }, [])
            .join('&');
    }

    /**
    * Parses query parameters from a string, returning the query parameters as an object.
    * @param {string} strToParse - The string from which to parse query parameters
    * @param {boolean} [favorQuery=true] - Whether or not to treat the full string to parse as query parameters when it doesn't have "?" in it
    * @returns {object} Parsed query parameters
    */
    function parseQuery(strToParse, favorQuery) {
        // Ensure that all we parse is a query string
        var queryString = _splitOnQuery(strToParse, favorQuery !== false).queryString || '';

        return queryString
            .split('&')
            .reduce(function(prevUrlParams, serializedUrlParamPair) {
                var urlParams = prevUrlParams,
                    urlParamPair = serializedUrlParamPair.split('='),
                    urlParamNameEncoded = urlParamPair[0];

                if (urlParamNameEncoded) {
                    urlParams[_decode(urlParamNameEncoded)] = _decode(urlParamPair[1]);
                }

                return urlParams;
            }, {});
    }

    /**
    * Serializes the specified URL path with properties of a params object to produce a URL.
    * @param {string | array} urlPath - Base URL path
    * @param {object | object[]} urlParams - Query params to combine with base URL
    * @returns {string} Serialized URL
    */
    function formatUrl(urlPath, urlParams) {
        var formattedUrl = urlPath,
            queryParams = urlParams,
            parsedQueryParamsFromUrl,
            normalizedQueryParams,
            queryString;

        // if they passed an array as the first parameter, separate out the first
        // element (url) from the other elements (query params list)
        if (Array.isArray(formattedUrl)) {
            queryParams = formattedUrl.slice(1).concat(queryParams || immutableEmptyArray);
            formattedUrl = formattedUrl[0];
        }

        // Pull out any query params from the URL
        parsedQueryParamsFromUrl = parseQuery(formattedUrl, false);

        // Convert the query params into an array (if it already isn't)
        normalizedQueryParams = Array.isArray(queryParams) ? queryParams : [queryParams];

        // Merge the URL query params to the additional query params
        queryParams = [parsedQueryParamsFromUrl].concat(normalizedQueryParams);

        // Serialize the query params to a query string
        queryString = formatQuery(queryParams);

        // Finally build the URL by stripping out any query string from the URL and
        // appending the query string
        return _splitOnQuery(formattedUrl).urlPath
            + (queryString ? '?' : '')
            + queryString;
    }

    return {
        parseQuery: parseQuery,
        formatUrl: formatUrl,
        formatQuery: formatQuery
    };
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__ = __webpack_require__(11);
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

		let trackers = [];

		for (var i in json) {

			trackers.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ key: i, className: 'container-fluid' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__["a" /* default */], { instrumentId: i, trackerConfig: json, fullScaleCurrent: json.fullScaleCurrent, config: tracker, configDB: db })
			));
		}

		__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			trackers
		), document.getElementById('root'));
	});
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group_jsx__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error_jsx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_debounce__ = __webpack_require__(29);
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
      this.ping();
    });

    window.addEventListener("offline", () => {
      this.updateStatus();
      this.ping();
    });

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("light.updated", () => {
      this.updateInstrument();
    });
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

    }).then(response => {
      if (response.status !== 200) throw "500 Internal server error";else return response;
    }).then(response => response.json()).catch(error => {

      setTimeout(() => {

        this.updateInstrument();
      }, 3000);

      this.setState({
        error: `Error while retrieving the instrument status. The returned error was ${error.toString()}.`,
        errorMethods: [["Retry", this.updateInstrument]]
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

  getConfig(props = this.props) {

    return fetch("http://" + this.state.cfg.trackerHost + ":" + this.state.cfg.trackerPort + "/getInstrumentConfig?instrumentId=" + props.instrumentId, { method: 'GET' }).then(response => {
      if (response.status !== 200) throw "500 Internal server error";else return response;
    }).then(response => response.json()).catch(error => {

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

    if (this.state.error || !this.state.serverState) {

      content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__error_jsx__["a" /* default */], { message: this.state.error || this.state.error_influxdb || this.state.error_tracker, methods: this.state.errorMethods })
      );
    } else if (this.state.groups) {

      var groupsDoms = this.state.groups.map((group, i) => {

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__group_jsx__["a" /* default */], {

          showHeader: this.state.groups.length > 1,
          key: group.groupID,
          instrumentId: this.props.instrumentId,
          id: group.groupID,
          name: group.groupName,
          channels: group.channels,
          groupConfig: group,
          config: this.props.config,
          configDB: this.props.configDB,
          serverState: this.state.serverState[group.groupName],
          update: this.updateInstrument,
          getStatus: this.updateStatus,

          error_influxdb: this.state.error_influxdb,
          error_tracker: this.state.error_tracker,
          paused: this.state.paused
        });
      });

      content = groupsDoms;
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "h3",
        null,
        "Instrument: ",
        this.props.instrumentId
      ),
      content
    );
  }
}

var _initialiseProps = function () {
  this.updateInstrument = __WEBPACK_IMPORTED_MODULE_4_lodash_debounce___default()((props = this.props) => {

    return Promise.all([this.getConfig(props), this.getStatus(props), this.ping(props)]).then(args => {

      let groups = args[0],
          status = args[1],
          ping = args[2];

      this.setState({
        groups: groups.groups,
        serverState: status,
        paused: status.paused,
        error_influxdb: false,
        error_tracker: false,
        error: false
      });
    }).catch(e => {});
  }, 100);
};

/* harmony default export */ __webpack_exports__["a"] = (TrackerInstrument);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device_jsx__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__influx__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_light_main_jsx__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__status_heat_main_jsx__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__status_instrument_main_jsx__ = __webpack_require__(27);









class TrackerGroupDevices extends __WEBPACK_IMPORTED_MODULE_1_react___default.a.Component {

  constructor(props) {

    super(props);
    this.state = {
      channelChecked: {}
    };

    this.toggleChannelCheck = this.toggleChannelCheck.bind(this);
    this.cfgAll = this.cfgAll.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.resetSlave = this.resetSlave.bind(this);
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {

    this.initCheckChannels(this.props);

    this.setState({
      paused: this.props.paused,
      heatingPower: this.props.serverState ? this.props.serverState.heatingPower : 'N/A'
    });

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
    this.doEnvironmentalSensing();
  }

  componentWillUnmount() {

    __WEBPACK_IMPORTED_MODULE_3_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {}
  /*
        this.setState( {
  
          sun: Math.round( values[ 1 ] * 100 ) / 100,
          temperature: values[ 2 ],
          humidity: values[ 3 ]
        
        } );
        */

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

  doEnvironmentalSensing() {

    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/environmentalSensing?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

      method: 'GET'

    }).then(response => {});
  }

  resetSlave() {
    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/resetSlave?instrumentId=${this.props.instrumentId}`, {

      method: 'GET'

    }).then(response => {});
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

    let heatingClass = 'glyphicon glyphicon-';

    switch (this.state.heating_status) {

      case 1:
        heatingClass += "check";
        break;

      case 2:
        heatingClass += 'updating';
        break;

      case 3:
        heatingClass += 'cross';
        break;

      default:
        heatingClass += 'questionmark';
        break;
    }

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "div",
      { className: "cl-group" },
      !!this.props.showHeader && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "h4",
        null,
        "Group: ",
        this.props.name
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        { className: "row statuses" },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__status_instrument_main_jsx__["a" /* default */], this.props),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__status_light_main_jsx__["a" /* default */], this.props),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__status_heat_main_jsx__["a" /* default */], this.props),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", { className: "clearfix" })
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          { className: "cell-configure-all col-lg-9" },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "button",
            { className: "btn btn-default btn-cl", onClick: this.checkAll },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
            " ",
            this.state.checkAll ? 'Deselect all' : 'Select all'
          ),
          "\xA0",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "button",
            { className: "btn btn-default btn-cl", onClick: this.cfgAll },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
            " Configure selected"
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_jsx__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__influx__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pgasettings__ = __webpack_require__(20);











//import cfg from "./config"

const initialState = {

	display: 'eff',
	ellapsed: false,
	wsEllapsed: false,
	changeRate: false,
	absChangeRate: false,
	changeUnit: false,
	iv: null,
	data: null,
	data_IV: null,
	iv: null,
	efficiency: false,
	start_value: false,
	highest_value: false,
	voltage: false,
	ff: false,
	current: false,
	currentdensity: false,
	voc: false,
	jsc: false,
	sun: false,
	start: false,
	current: false,
	arrowstatus: false,
	change: false,
	showDetails: false,
	last_time: 0,

	_last_iv_time: false,
	_last_iv: null,
	_fist_iv: null,

	ivCurves: [],
	serverState: {}
};

function round(value, digits) {

	return Math.round(value * 10 ** digits) / 10 ** digits;
}

class TrackerDevice extends __WEBPACK_IMPORTED_MODULE_6_react___default.a.Component {

	/**
  *	@param props.name The name of the cell
  */
	constructor(props) {
		super(props);

		this.unit = {
			"voltage": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"V"
			),
			"currentdensity": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"mA cm",
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			),
			"current": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"mA"
			),
			"efficiency": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"fillfactor": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"sun": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"sun"
			),
			"area": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"cm",
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"sup",
					null,
					"2"
				)
			),
			"temperature": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"\xB0C"
			),
			"humidity": __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				"%"
			)
		};

		this.state = Object.assign({}, initialState);
		this.state.data = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		this.cfg = this.cfg.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.pause = this.pause.bind(this);
		this.recordIV = this.recordIV.bind(this);
		this.recordJsc = this.recordJsc.bind(this);
		this.recordVoc = this.recordVoc.bind(this);

		this.showEfficiencies = this.showEfficiencies.bind(this);
		this.showSummary = this.showSummary.bind(this);

		this.downloadData = this.downloadData.bind(this);

		this.wsUpdate = this.wsUpdate.bind(this);

		//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};		
	}

	shouldComponentUpdate(props, state) {

		return true;
	}
	componentWillReceiveProps(nextProps) {

		this.setState({ updating: false });

		/**
   *  Norman, 4 January 2017:
   *	Some explaining might be useful here.
   *  We need to chose the source of truth of the channel status. Either it defines itself (see this.getStatus) or the group and in turn the instrument sets it
   *  But it can't be both, otherwise, if they are different (and they can be, at least temporarily), they will overwrite each other
   */

		//  	this.setState( { serverState: nextProps.serverState } );

		// If the state has changed, we trigger a new query to the server to fetch the latest. This might be redundant though.
		if (this.props.serverState !== nextProps.serverState) {
			this.getStatus();
		}

		if (nextProps.serverState.tracking_mode > 0 && nextProps.measurementName && nextProps.measurementName !== this.props.measurementName || !this.state.serverState) {

			this.updateInfluxData(nextProps.serverState);
		}
	}

	componentDidMount() {

		this.setState({ updating: false });
		this.setState({ serverState: this.props.serverState });

		if (this.props.serverState.tracking_mode > 0) {
			this.updateInfluxData(this.props.serverState);
		}

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].on("channel.update." + this.props.instrumentId + "." + this.props.chanId, this.wsUpdate);
	}

	componentWillUnmount() {

		if (this.refreshInterval) {
			clearTimeout(this.refreshInterval);
			this.refreshInterval = true;
		}

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].removeListener("channel.update." + this.props.instrumentId + "." + this.props.chanId, this.wsUpdate);
	}

	async wsUpdate(event, data) {

		let newState = {};

		data.state = data.state || {};
		data.timer = data.timer || {};
		data.action = data.action || {};

		if (data.state.efficiency) {
			newState.efficiency = round(data.state.efficiency, 2);
		}

		if (data.state.current) {
			// Convert to mA
			newState.current = round(data.state.current * 1000, 2);
			newState.currentdensity = data.state.current * 1000 / this.state.serverState.cellArea;
		}

		if (data.state.voltage) {
			newState.voltage = round(data.state.voltage, 2);
		}

		if (data.state.voltage && data.state.current && this.state.data_IV) {

			this.state.data_IV.append(data.state.voltage, data.state.current);
			newState.data_IV = this.state.data_IV;
		}

		if (data.state.power) {
			newState.power = round(data.state.power, 2);
		}

		if (data.state.voc) {
			newState.voc = round(data.state.voc, 2);
		}

		if (data.state.sun) {
			newState.sun = round(data.state.sun, 2);
		}

		if (data.state.jsc) {
			newState.jsc = data.state.jsc * 1000 / this.state.serverState.cellArea;
		}

		if (data.state.temperature) {
			newState.temperature = data.state.temperature;
		}

		if (data.state.temperature_junction) {
			newState.temperature_junction = data.state.temperature_junction;
		}

		if (data.state.humidity) {
			newState.humidity = data.state.humidity;
		}

		if (!isNaN(data.timer.iv)) {
			// Timer for the next IV curve
			newState.timer_nextIV = { time: data.timer.iv, updated: Date.now() };
		}

		if (!isNaN(data.timer.jsc)) {
			// Timer for the next JSC measurement
			newState.timer_nextJsc = { time: data.timer.jsc, updated: Date.now() };
		}

		if (!isNaN(data.timer.voc)) {
			// Timer for the next Voc curve
			newState.timer_nextVoc = { time: data.timer.voc, updated: Date.now() };
		}

		if (!isNaN(data.timer.aquisition)) {
			// Timer for the last aquisition
			newState.timer_aquisition = { time: data.timer.aquisition, updated: Date.now() };
		}

		if (!isNaN(data.timer.ellapsed)) {

			newState.timer_ellapsed = { time: data.timer.ellapsed, updated: Date.now() };
		}

		if (data.action.data && this.state.data) {

			let lastTime;

			if (this.state.data.getLength && this.state.data.getLength() > 0) {
				lastTime = this.state.data.xdata.data[this.state.data.getLength() - 1];
				lastTime += this.state.serverState.tracking_record_interval / 1000;
			} else {
				lastTime = 0;
			}

			if (!this.state.data) {
				newState.data = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
			} else {

				this.state.data.append(lastTime, data.action.data);
				newState.data = this.state.data;
			}
		}

		if (data.action.ivCurve) {
			this.updateInfluxData();
		}

		if (data.action.saved) {
			// Data has just been saved into the DB => reload it into the renderer
			this.updateInfluxData();
		}

		if (data.action.update) {
			await this.getStatus();
		}

		if (data.action.stopped) {
			await this.getStatus();
			newState = Object.assign({}, initialState);
			this.state = newState; // Force-remove all the other state that will pollute the new channel
		}

		this.setState(newState);
	}

	saveStatus(newState) {

		let body = JSON.stringify(newState);

		let headers = new Headers({
			"Content-Type": "application/json",
			"Content-Length": body.length.toString()
		});

		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/setStatus", {
			headers: headers,
			method: 'POST',
			body: body
		});
	}

	resetChannel() {

		/*
  		this.state.serverState.measurementName = false;
  		this.state.serverState.cellName = "";
  		this.state.serverState.cellArea = 0;
  		this.state.serverState.tracking_mode = 0;
  		this.state.serverState.enable = 0;
  
  */
		fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/resetStatus?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId, {

			method: 'GET'

		});
	}

	async recordIV() {

		if (this.state.processing_iv) {
			return;
		}
		this.setState({ processing_iv: true, error_iv: false });
		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/executeIV?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).catch(() => {
			this.setState({ error_iv: true });
		});
		this.setState({ processing_iv: false });
	}

	async recordVoc() {

		if (this.state.processing_voc) {
			return;
		}
		this.setState({ processing_voc: true, error_voc: false });
		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordVoc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).catch(() => {
			this.setState({ error_voc: true });
		});
		this.setState({ processing_voc: false });
	}

	async recordJsc() {

		if (this.state.processing_jsc) {
			return;
		}
		this.setState({ processing_jsc: true, error_jsc: false });
		await fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/recordJsc?instrumentId=" + this.props.instrumentId + "&chanId=" + this.props.chanId).catch(() => {
			this.setState({ error_jsc: true });
		});
		this.setState({ processing_jsc: false });
	}

	//formChanged( name, value ) {

	//	this.state.tmpServerState[ name ] = value;
	//this.setState( { tmpServerState: this.state.tmpServerState } );
	//this.state.tmpServerState = Object.assign( {}, this.state.tmpServerState );
	//}

	downloadData() {

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].send("downloadData", this.state.serverState, this.props.chanId, this.state.serverState.measurementName);
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
		}, this.props.refreshRate * 1000 || 60000);
	}

	pause() {
		this.state.serverState.enable = 0;
		this.saveStatus(this.state.serverState);
	}

	start() {

		this.saveStatus(Object.assign({}, this.state.serverState, { enable: 1, measurementName: this.state.serverState.cellName + "_" + Date.now() }));
	}

	stop() {

		this.data_sun = false;
		this.data_humidity = false;
		this.data_temperature = false;

		this.resetChannel();
	}

	cfg() {

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].once("channelConfigured", (event, data) => {

			if (data.chanId != this.props.chanId) {
				return;
			}

			this.saveStatus(data);
		});

		__WEBPACK_IMPORTED_MODULE_7_electron__["ipcRenderer"].send("configChannel", {

			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			chanId: this.props.chanId,

			trackerHost: this.props.config.trackerHost,
			trackerPort: this.props.config.trackerPort
		});
	}

	getStatus() {

		return fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/getStatus?instrumentId=" + this.props.instrumentId + "&channelId=" + this.props.chanId, {

			method: 'GET'

		}).then(response => response.json()).then(response => {

			this.setState({ serverState: response[this.props.groupName].channels[this.props.chanId] });
			//this.updateInfluxData( response );
		}).catch(error => {

			this.setState({
				error: error
			});
		});
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

	showSummary() {

		if (!this.wrapper || !this.wrapper.classList.contains('show-second')) {
			return;
		}

		this.wrapper.classList.add("show-first");
		this.wrapper.classList.remove("show-second");
	}

	readIV(value) {

		if (!value) {
			return;
		}

		let iv = value.replace("\"", "").split(",").map(el => parseFloat(el)),
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

		switch (this.state.serverState.tracking_mode) {

			case 3:
				parameter = "current_mean";
				break;

			case 2:
				parameter = "voltage_mean";
				break;

			default:
			case 1:
				parameter = "efficiency";
				break;
		}

		let queries = ["SELECT time, efficiency FROM \"" + serverState.measurementName + "\" ORDER BY time ASC limit 1", "SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM \"" + serverState.measurementName + "\" ORDER BY time DESC limit 1", `SELECT time, iv FROM "${serverState.measurementName}_iv" ${this.state._last_iv_time ? `WHERE time > '${this.state._last_iv_time}'` : ''} ORDER BY time ASC`, `SELECT voc FROM "${serverState.measurementName}_voc" ORDER BY time DESC LIMIT 1`, "SELECT jsc FROM \"" + serverState.measurementName + "_jsc\" ORDER BY time DESC LIMIT 1"];

		let newIvCurves = false;

		Object(__WEBPACK_IMPORTED_MODULE_5__influx__["b" /* query */])(queries.join(";"), db, this.props.configDB).then(results => {

			if (results[2].series && results[2].series[0]) {

				newState.ivCurves = this.state.ivCurves.splice(0);
				newState.ivCurves = newState.ivCurves.concat(results[2].series[0].values.map((value, index) => {

					if (index == results[2].series[0].values.length - 1) {
						newState._last_iv_time = value[0];
					}

					return {
						time: new Date(value[0]),
						iv: this.readIV(value[1])
					};
				}));
			}

			// Even if the series don't exist, we can still update the j-V curve
			// The only thing we have to do is not throw any error and handle gracefully the lack of data
			if (!results[0].series) {
				return; //throw "No measurement with the name " + serverState.measurementName + " or no associated data";
			}

			let timefrom = results[0].series[0].values[0][0],
			    timeto = results[1].series[0].values[0][0],
			    timefrom_date = new Date(timefrom),
			    timeto_date = new Date(timeto);

			newState.latest = timeto_date.getTime();
			newState.start_value = Math.round(results[0].series[0].values[0][1] * 100) / 100;
			newState.efficiency = round(results[1].series[0].values[0][1], 2);

			newState.power = results[1].series[0].values[0][2];
			newState.current = results[1].series[0].values[0][3] * 1000;
			newState.currentdensity = results[1].series[0].values[0][3] * 1000 / serverState.cellArea;
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
			newState.ellapsed = timeDifference;

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

			if (results[3] && results[3].series && this.state.serverState.tracking_mode == 1) {
				newState.voc = Math.round(results[3].series[0].values[0][1] * 1000) / 1000;
			}

			if (results[4] && results[4].series && this.state.serverState.tracking_mode == 1) {
				newState.jsc = results[4].series[0].values[0][1] / serverState.cellArea * 1000;
			}

			query = "SELECT MEAN(" + parameter + ") as param, MAX(" + parameter + ") as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( sun ) as sMean FROM \"" + serverState.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC;";

			queue.push(Object(__WEBPACK_IMPORTED_MODULE_5__influx__["b" /* query */])(query, db_ds, this.props.configDB).then(results => {

				let values = results[0].series[0].values,
				    offset,
				    wave = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveIV = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    highest_value = 0,
				    highest_value_time = 0;

				// First point gives the initial efficiency, 2nd row
				if (values.length < 2) {
					newState.data = false;
					return;
				}

				let valueIndex = 1;

				values.forEach((value, index) => {

					let date = new Date(value[0]),
					    time;

					if (index == 0) {
						offset = date.getTime();
						time = 0;
					} else {
						time = (date.getTime() - offset) / 1000;
					}

					//value[ valueIndex ] += 2;
					if (this.state.serverState.tracking_mode == 1) {
						if (value[valueIndex] > 35 || value[valueIndex] < 0) {
							// Higher than 35% => fail. Lower than 0% => fail.
							return;
						}
					} else if (this.state.serverState.tracking_mode == 3) {
						value[valueIndex] *= 1000; // In current mode, show mAmps
					}

					wave.append(time, value[valueIndex]);
					waveSun.append(time, value[5]);

					if (index > values.length * 0.8) {
						waveIV.append(value[3], value[4]);
					}

					waveTemperature.append(time, value[6]);
					waveHumidity.append(time, value[7]);

					if (this.state.serverState.tracking_mode == 1) {
						if (value[2] > highest_value && !isNaN(value[2])) {
							highest_value = value[2];
							highest_value_time = time;
						}
					}
				});

				if (this.state.serverState.tracking_mode == 2) {
					newState.voc = Math.round(values[values.length - 1][2] * 1000) / 1000;
				}

				if (this.state.serverState.tracking_mode == 3) {
					newState.jsc = Math.round(values[values.length - 1][2] * 100) / 100;
				}

				newState.highest_value = Math.round(highest_value * 100) / 100;
				newState.highest_value_time = highest_value_time;
				newState.data = wave;

				newState.data_sun = waveSun;
				newState.data_temperature = waveTemperature;
				newState.data_humidity = waveHumidity;
				newState.data_IV = waveIV;
			}));

			return Promise.all(queue).then(() => {

				newState.ff = Math.round(newState.power / serverState.cellArea / (newState.voc * newState.jsc / 1000) * 100);
				newState.updating = false;
			}).catch(error => {

				console.error("Could not process influx DB request.");
				console.error(error);
			}).then(() => {

				this.setState(newState);
			});
		}).catch(error => {

			console.error("Could not process influx DB request.");
			console.error(error);
		}).then(() => {

			this.setState(newState);

			this.scheduleRefresh();
		});
	}

	processCurrent(value) {

		if (isNaN(value) || value === false) {
			return;
		}

		if (Math.abs(value) < 0.1) {
			return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				(Math.round(value * 10000) / 10).toFixed(1),
				"\xA0\u03BCA\xA0cm",
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			);
		} else {
			return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"span",
				null,
				(Math.round(value * 100) / 100).toFixed(1),
				"\xA0mA\xA0cm",
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			);
		}
	}

	render() {

		let unit, arrowstatus, change, changeUnit, currVal, startVal, startValPos, trackingMode, statusGraphAxisLabel, statusGraphAxisUnit, statusGraphSerieLabelLegend;

		switch (this.state.serverState.tracking_mode) {

			case 0:
				trackingMode = "No tracking";
				break;

			case 1:
				unit = "%";
				startVal = this.state.highest_value;
				startValPos = this.state.highest_value_time;
				currVal = this.state.efficiency;

				trackingMode = "MPPT";
				statusGraphAxisLabel = "Efficiency";
				statusGraphAxisUnit = "%";
				statusGraphSerieLabelLegend = "PCE";

				break;

			case 2:
				unit = "V";
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.voc;

				trackingMode = "Voc";
				statusGraphAxisLabel = "Voltage";
				statusGraphAxisUnit = "V";
				statusGraphSerieLabelLegend = "Voc";
				break;

			case 3:
				unit = this.unit.currentdensity;
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.jsc;

				trackingMode = "Jsc";
				statusGraphAxisLabel = "Current density";
				statusGraphAxisUnit = "mA cm^-2";
				statusGraphSerieLabelLegend = "Jsc";
				break;
		}

		let active = this.state.serverState.enable > 0 && this.state.serverState.tracking_mode > 0;
		let notavailable = "N/A";

		const j_currentdensity = this.processCurrent(this.state.currentdensity);
		const jsc_currentdensity = this.processCurrent(this.state.jsc);

		if (active) {

			return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"div",
				{ ref: el => this.wrapper = el, className: 'cl-device ' + (active ? 'cell-running' : 'cell-stopped') + ' show-details' },
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"div",
					{ className: "col-lg-7" },
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "cell-name cell-main-info row" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-9" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"span",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", { type: "checkbox", className: "channel-check", onClick: this.props.toggleChannelCheck, checked: !!this.props.channelChecked })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"span",
								{ className: "label" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-tags" })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.serverState.cellName
							),
							" ",
							this.state.serverState.cellArea ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"span",
								{ className: "cell-area" },
								"( ",
								this.state.serverState.cellArea,
								" cm",
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"sup",
									null,
									"2"
								),
								" )"
							) : ""
						)
					),
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "cell-timing row" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								"Last data"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 1, direction: "ascending", timerValue: this.state.timer_aquisition })
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_iv ? ' processing' : '') + (this.state.error_iv ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordIV })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								"Next IV curve"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 2, direction: "descending", timerValue: this.state.timer_nextIV })
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_voc ? ' processing' : '') + (this.state.error_voc ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordVoc })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								"Next Voc"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 2, direction: "descending", timerValue: this.state.timer_nextVoc })
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_jsc ? ' processing' : '') + (this.state.error_jsc ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordJsc })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								"Next Jsc"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 2, direction: "descending", timerValue: this.state.timer_nextJsc })
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "cell-summary row" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: `col-lg-1 cell-status ${active ? 'active' : ''}` },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								active ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }) : __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" })
							),
							trackingMode
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-hourglass" })
								),
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "value" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 1, maxLevel: 3, spacer: " ", direction: "ascending", timerValue: this.state.timer_ellapsed })
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "label" },
									"\u03B7"
								),
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "value" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
										"strong",
										null,
										!isNaN(this.state.efficiency) && this.state.efficiency !== false ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
											"span",
											null,
											this.state.efficiency,
											" ",
											this.unit.efficiency
										) : 'N/A'
									)
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" })
								),
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "value" },
									!isNaN(this.state.sun) && this.state.sun !== false ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
										"span",
										null,
										this.state.sun,
										" ",
										this.unit.sun
									) : 'N/A'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_voc ? ' processing' : '') + (this.state.error_voc ? ' error' : '') },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordVoc })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "label" },
								"V",
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"sub",
									null,
									"oc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.voc) && this.state.voc !== false ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"span",
									null,
									this.state.voc,
									" ",
									this.unit.voltage
								) : 'N/A'
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_jsc ? ' processing' : '') + (this.state.error_jsc ? ' error' : '') },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordJsc })
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "label" },
								"J",
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"sub",
									null,
									"sc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "value" },
								jsc_currentdensity || 'N/A'
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "label" },
								"FF"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.ff) && this.state.ff !== false ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"span",
									null,
									this.state.ff,
									" ",
									this.unit.fillfactor
								) : 'N/A'
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "label" },
								"V",
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"sub",
									null,
									"now"
								)
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.voltage) && this.state.voltage !== false ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"span",
									null,
									this.state.voltage,
									" ",
									this.unit.voltage
								) : 'N/A'
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "label" },
								"J",
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"sub",
									null,
									"now"
								)
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								{ className: "value" },
								j_currentdensity || 'N/A'
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-grain" })
								),
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "value" },
									this.state.temperature && this.state.temperature > 0 ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
										"span",
										{ title: "Base temperature (local temperature on the chip just under the device)" },
										this.state.temperature
									) : 'N/A',
									"\xA0/\xA0",
									this.state.temperature_junction && this.state.temperature_junction > 0 ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
										"span",
										{ title: "Estimated junction temperature (base temperature + thermopile voltage)" },
										this.state.temperature_junction,
										" ",
										this.unit.temperature
									) : 'N/A'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-tint" })
								),
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
									"div",
									{ className: "value" },
									this.state.humidity && this.state.humidity > 0 ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
										"span",
										null,
										this.state.humidity,
										" ",
										this.unit.humidity
									) : 'N/A'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "cell-efficiency col-lg-6" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__["a" /* default */], {
								shown: true,
								width: "720",
								height: "60",
								mode: "default",
								key: this.props.instrumentId + this.props.chanId + "_graph",
								data: this.state.data,
								data_sun: this.state.data_sun,
								data_humidity: this.state.data_humidity,
								data_temperature: this.state.data_temperature,
								flag1: startVal,
								flag1_pos: startValPos,
								unit: unit,
								axisLabel: statusGraphAxisLabel,
								axisUnit: statusGraphAxisUnit,
								serieLabelLegend: statusGraphSerieLabelLegend,
								flag2: currVal })
						)
					),
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "row cell-actions" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 label" },
							"Actions"
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"div",
							{ className: "col-lg-8" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.downloadData },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-download-alt" }),
								" Download"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.stop },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" }),
								" Stop"
							),
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.cfg },
								__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
								" Configure"
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"div",
					{ className: "col-lg-2 cell-iv" },
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__["a" /* default */], {
						width: "290",
						height: "230",
						shown: true,
						key: this.props.instrumentId + this.props.chanId + "_iv",
						data: this.state.ivCurves,
						dataIV: this.state.data_IV,
						voltage: this.state.voltage,
						current: this.state.current,
						cellarea: this.state.serverState.cellArea
					})
				)
			);
		} else {

			return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
				"div",
				{ ref: el => this.wrapper = el, className: "cl-device cell-unknown" },
				__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
					"div",
					{ className: "cell-name cell-main-info row" },
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "col-lg-4" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", { type: "checkbox", className: "channel-check", onClick: this.props.toggleChannelCheck, checked: !!this.props.channelChecked })
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"span",
							{ className: "label" },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-tags" })
						),
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"span",
							{ className: "value" },
							!this.state.serverState.cellName ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
								"span",
								null,
								"Channel #",
								this.props.chanId
							) : this.state.serverState.cellName
						)
					),
					__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
						"div",
						{ className: "col-lg-4" },
						__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"button",
							{ className: "btn btn-cl btn-sm", onClick: this.cfg },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
							" Configure"
						),
						!!(this.state.serverState.cellName && this.state.serverState.cellName.length > 0 && !active && this.state.serverState.tracking_mode > 0) && __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
							"button",
							{ className: "btn btn-cl btn-sm", onClick: this.start },
							__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span", { className: "glyphicon glyphicon-start" }),
							" Start"
						)
					)
				)
			);
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (TrackerDevice);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_extend__ = __webpack_require__(15);
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
			paddingTop: 4,
			paddingLeft: 9,
			paddingRight: 4,
			paddingBottom: 2
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
		this.serie.setLineColor('#55310d');
		this.serie.autoAxis();
		this.serie.setLineWidth(2);

		this.serie.setLabel(this.props.serieLabelLegend);

		if (this.props.mode == 'sparkline') {

			this.graph.getYAxis().turnGridsOff();
			this.graph.getXAxis().hide();
			this.graph.getYAxis().hide();
		} else {

			this.graph.getXAxis().setUnitInTicks(true).setTickLabelOffset(-60).setTickPosition(__WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6___default.a.TICKS_INSIDE).secondaryGridOff().setPrimaryTicksColor('#6c5e47').setSecondaryTicksColor('#6c5e47').setTicksLabelColor('#55310d').setNbTicksSecondary(0).setUnit('h').setPrimaryGridColor('#d3c3a9');

			this.graph.getYAxis().hide();

			this.graph.getYAxis().setLabel(this.props.axisLabel).setUnit(this.props.axisUnit).setUnitWrapper("(", ")");

			this.graph.getXAxis();
			this.graph.getXAxis();
			this.graph.getRightAxis(0).forceMin(0);
		}

		this.graph.getXAxis().setAxisDataSpacing(0.001, 0.001);
		this.graph.getYAxis().setAxisDataSpacing(0.001, 0.001);

		this.graph.getYAxis().forceMin(0);

		this.serieZone = this.graph.newSerie("zone", {}, "zone");
		this.serieZone.setLineColor("#c0c0c0");
		this.serieZone.setFillColor("#f0f0f0");
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
					{ className: 'graph_tooltip medium' },
					__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
						'div',
						{ className: 'top' },
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
					{ className: 'graph_tooltip medium' },
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
			this.graph.draw();
			//this.graph.updateLegend();

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

		if (nextProps.mode !== 'sparkline') {

			this.graph.getYAxis().setLabel(nextProps.axisLabel).setUnit(nextProps.axisUnit);

			this.serie.setLabel(this.props.serieLabelLegend);
		}
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);






const color = '#55310d';

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
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: 5,

			closeColor: color
		});

		this.resize(this.props);

		this.serie = [];

		this.graph.setBackgroundColor("rgba( 255, 255, 255, 0.2 )");

		this.graph.getLeftAxis().setLineAt([0]).gridsOff().setAxisColor(color).setPrimaryTicksColor(color).setSecondaryTicksColor(color).setTicksLabelColor(color).setLabelColor(color);

		this.graph.getBottomAxis().gridsOff().setAxisColor(color).setPrimaryTicksColor(color).setSecondaryTicksColor(color).setLabelColor(color).setTicksLabelColor(color);

		//	this.graph.setTitle("Latest j(V) curve")
		this.graph.getYAxis().flip().setLabel("Current").setUnitWrapper("(", ")").setEngineering(true).setUnit("A").setUnitDecade(true);

		this.graph.getXAxis().setLabel("Voltage").setUnitWrapper("(", ")").setUnit("V");

		var legend = this.graph.makeLegend({
			paddingLeft: 0,
			paddingRight: 2,
			paddingTop: 10,
			paddingBottom: 0,
			frame: false,
			backgroundColor: 'transparent',
			color: color
		});

		legend.setPosition({ x: 'max', y: 'max' }, 'right', 'top');

		legend.notHideable();
		legend.update();

		this.ellipse = this.graph.newShape("ellipse");
		this.ellipse.setR("3px", "3px");

		this.ellipse.setFillColor(color);
		this.ellipse.setStrokeColor(color);
		this.ellipse.draw();
	}

	componentDidUpdate() {

		this.props.data.sort((a, b) => {
			return a.time - b.time;
		});

		this.graph.resetSeries();

		let maxY = 0;

		let indices = [];

		if (!this.props.data[0]) {
			return;
		}
		const firstTime = this.props.data[0].time;
		const lastTime = this.props.data[this.props.data.length - 1].time;
		const idealInterval = (lastTime - firstTime) / 4; // 5 iv curves

		let lastInterval = 0;

		this.props.data.forEach((data, index) => {

			if (data.time - lastInterval > idealInterval) {
				lastInterval = data.time;
				indices.push(index);
			}
		});

		indices.push(this.props.data.length - 1);

		const colors = ['#ae182d', '#6d18ae', '#1834ae', '#1897ae', '#18ae22', '#acae18'];
		let k = 0;

		this.props.data.forEach((data, index) => {

			if (indices.indexOf(index) == -1) {
				return;
			}

			let s = this.graph.newSerie("iv_" + index);
			s.setLabel(Math.round((data.time - firstTime) / 1000 / 3600 * 10) / 10 + "h");
			s.setLineColor(colors[k]);
			s.autoAxis();
			s.setLineWidth(2);

			let s2 = this.graph.newSerie("power_" + index);
			s2.setLineColor(colors[k]);
			s2.setLineStyle(2);
			s2.excludedFromLegend = true;
			s2.autoAxis();
			s2.setLineWidth(2);

			s.setWaveform(data.iv);
			s2.setWaveform(data.iv.duplicate().math((y, x) => y * x));

			maxY = Math.max(maxY, data.iv.getMaxY());
			k++;
		});

		this.serieIV = this.graph.newSerie("iv_time").setLabel("MPPT");
		this.serieIV.autoAxes();
		this.serieIV.setLineColor(color).setLineWidth(2);

		if (this.props.dataIV) {
			this.serieIV.setWaveform(this.props.dataIV);
		}

		this.graph.autoscaleAxes();
		this.graph.show();

		this.graph.getYAxis().forceMin(-maxY * 0.5);
		this.ellipse.setPosition({ x: this.props.voltage, y: this.props.current / 1000 });
		this.ellipse.redraw();

		this.graph.autoscaleAxes();
		this.graph.draw();
		this.graph.updateLegend();
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



class Timer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);
    this.state = {
      now: Date.now()
    };
  }

  componentDidMount() {

    this.interval = setInterval(() => {

      if (this.props.timerValue === undefined || isNaN(this.props.timerValue.time)) {
        return;
      }

      if (this.props.direction == 'ascending') {

        this.setState({
          timerValue: Date.now() - this.props.timerValue.updated + this.props.timerValue.time
        });
      } else {

        this.setState({
          timerValue: this.props.timerValue.time - (Date.now() - this.props.timerValue.updated)
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {}

  processTime(value) {

    let str = [];
    let spacer = this.props.spacer || "";

    value /= 1000;
    if (value > 60 && (this.props.maxLevel > 1 || !this.props.maxLevel)) {
      // minutes

      if (value > 3600 && (this.props.maxLevel > 2 || !this.props.maxLevel)) {
        // hours

        if (value > 3600 * 24 && (this.props.maxLevel > 3 || !this.props.maxLevel)) {
          // days

          str.push(Math.floor(value / (3600 * 24)) + spacer + "d");
          value = value % (3600 * 24);
        }

        str.push(Math.floor(value / 3600) + spacer + "h");
        value = value % 3600;
      }

      str.push(Math.floor(value / 60) + spacer + "m");
      value = value % 60;
    }

    str.push(Math.floor(value) + spacer + "s");
    str = str.splice(0, this.props.precision || 1);
    return str.join(" ");
  }

  render() {

    if (!this.state.timerValue || isNaN(this.state.timerValue)) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'N/A'
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      this.processTime(this.state.timerValue)
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Timer);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pgaValueToRange */

let pgaValueToRange = (pgaValue, fsr) => {
	// FSR is in A
	let str = "";
	fsr = 20e-3;
	// Convert to mA
	str += Math.round(fsr / parseInt(pgaValue) * 1000 * 1000) / 1000;

	return str;
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lightstatus_1_0_jsx__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lightstatus_2_0_jsx__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_environment_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__app_environment_json__);






class LightStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.light_calibrate = this.light_calibrate.bind(this);
    this.light_controller_config = this.light_controller_config.bind(this);
  }

  light_calibrate() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("calibratePD", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    });
  }

  light_controller_config() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("scheduleLight", {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name,
      config: this.props.config
    });
  }

  render() {

    let content = null;
    switch (__WEBPACK_IMPORTED_MODULE_4__app_environment_json___default.a.statuses.light.version) {

      case "1.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__lightstatus_1_0_jsx__["a" /* default */], this.props);
          break;
        }

      default:
      case "2.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__lightstatus_2_0_jsx__["a" /* default */], this.props);
        }
    };

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "group-status group-status-light col-lg-2" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "h4",
        null,
        "Light bias"
      ),
      this.props.serverState.lightController ? content : "No light control is available for this group",
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-9" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "button",
            { type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.light_controller_config },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
            " Configure"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "button",
            { type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.light_calibrate },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" }),
            " Calibrate"
          )
        )
      )
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LightStatus);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);



class LightStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {

    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    // New state means re-enabling
    if (this.toggleLightMode) {
      $(this.toggleLightMode).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {

    if (this.toggleLightMode && !this.transformed) {

      $(this.toggleLightMode).bootstrapToggle({
        on: 'Auto',
        off: 'Manual'
      }).change(() => {

        $(this.toggleLightMode).bootstrapToggle('disable');

        let data = {
          instrumentId: this.props.instrumentId,
          groupName: this.props.name,
          control: {
            modeAutomatic: this.toggleLightMode.checked
          }
        };

        let body = JSON.stringify(data);
        let headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": body.length.toString()
        });

        fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/lightSetControl", {

          headers: headers,
          method: 'POST',
          body: body

        }).then(response => {

          $(this.toggleLightMode).bootstrapToggle('enable');
        }).catch(() => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to change the light mode");
        });
      });
      this.transformed = true;
    }

    if (this.toggleLightMode) {
      $(this.toggleLightMode).data('bs.toggle')[this.state.lightAutomatic ? 'on' : 'off'](true);
    }
  }

  render() {

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-5" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "span",
            { className: "grey" },
            "Mode:"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-4" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "label",
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { "data-toggle": "toggle", type: "checkbox", ref: el => this.toggleLightMode = el, "data-width": "100", "data-height": "25" })
          )
        )
      ),
      this.state.lightAutomatic && this.state.lightSetpoint !== undefined ? // In case the light is in automatic mode

      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-5" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "span",
            { className: "grey" },
            "Set point:"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-4" },
          this.state.lightSetpoint,
          " sun"
        )
      ) : null,
      this.state.lightValue !== undefined ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-5" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "span",
            { className: "grey" },
            "Live value:"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-4" },
          Math.round(this.state.lightValue[0] * 100) / 100,
          " sun"
        )
      ) : null
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LightStatus);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);



class LightStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {
    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    // New state means re-enabling
    if (this.toggleLightEnable) {
      $(this.toggleLightEnable).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {

    if (this.toggleLightEnable && !this.transformed) {

      $(this.toggleLightEnable).bootstrapToggle({
        on: 'On',
        off: 'Off'
      }).change(() => {

        $(this.toggleLightEnable).bootstrapToggle('disable');

        return fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/light.${this.toggleLightEnable.checked ? 'enable' : 'disable'}?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {
          method: 'GET'
        }).then(() => {}).catch(error => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to change the light mode");
        }).then(() => {});
      });
      this.transformed = true;
    }

    if (this.toggleLightEnable) {
      $(this.toggleLightEnable).data('bs.toggle')[this.state.lightOnOff ? 'on' : 'off'](true);
    }
  }

  render() {

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-5" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "span",
            { className: "grey" },
            "On/Off:"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "col-lg-4" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "label",
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { "data-toggle": "toggle", type: "checkbox", ref: el => this.toggleLightEnable = el, "data-width": "70", "data-height": "25" })
          )
        )
      ),
      this.state.lightOnOff ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        this.state.lightOnOffButton !== this.state.lightOnOff ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-9" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "grey" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "em",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "small",
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-danger" }),
                  "The light switch is off. Push it to turn the light on."
                )
              )
            )
          )
        ) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-5" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "grey" },
              "Control mode:"
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-4" },
            this.state.lightMode == 'auto' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              null,
              "Automatic"
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              null,
              "Manual"
            )
          )
        ),
        this.state.lightMode == 'auto' && this.state.lightSetpoint !== undefined ? // In case the light is in automatic mode

        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-5" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "grey" },
              "Set point:"
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-4" },
            this.state.lightSetpoint,
            " sun"
          )
        ) : null,
        this.state.lightValue !== undefined ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-5" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "grey" },
              "Current value:"
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-4" },
            Math.round(this.state.lightValue * 100) / 100,
            " sun"
          )
        ) : null
      ) : null
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LightStatus);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heatstatus_1_0_jsx__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heatstatus_2_0_jsx__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_environment_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__app_environment_json__);






class HeatStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  render() {

    let content = null;

    switch (__WEBPACK_IMPORTED_MODULE_4__app_environment_json___default.a.statuses.heat.version) {

      case "1.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__heatstatus_1_0_jsx__["a" /* default */], this.props);
          break;
        }

      default:
      case "2.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__heatstatus_2_0_jsx__["a" /* default */], this.props);
        }
    };

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "group-status group-status-temperature col-lg-2" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "h4",
        null,
        "Temperature & Heating"
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        this.state.temperature !== undefined && this.state.temperature !== false ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-5" },
            "Environment temperature:"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-4" },
            this.state.temperature,
            " \xB0C"
          )
        ) : null
      ),
      content || null
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (HeatStatus);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url_lib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_url_lib__);




class HeatStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {

    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);

    // Heat change methods. Bind them to this
    this.increaseHeatingPower = this.increaseHeatingPower.bind(this);
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind(this);
  }

  increaseHeatingPower() {

    this.setState({
      heating_status: 'updating'
    });

    fetch(__WEBPACK_IMPORTED_MODULE_2_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.increasePower`, {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name
    })).then(() => {
      this.setState({
        heater_error: false
      });
    }).catch(error => {
      this.setState({
        heater_error: 'Cannot increase the heating power. Internal error'
      });
    });
  }

  decreaseHeatingPower() {

    this.setState({
      heating_status: 'updating'
    });

    fetch(__WEBPACK_IMPORTED_MODULE_2_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.decreasePower`, {
      instrumentId: this.props.instrumentId,
      groupName: this.props.name
    })).then(() => {
      this.setState({
        heater_error: false
      });
    }).catch(error => {
      this.setState({
        heater_error: 'Cannot decrease the heating power. Internal error'
      });
    });
  }

  componentDidMount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    // New state means re-enabling
    if (this.toggleHeater) {
      $(this.toggleHeater).bootstrapToggle('enable');
    }
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {

    if (this.toggleHeater && !this.transformed) {

      $(this.toggleHeater).bootstrapToggle({
        on: 'On',
        off: 'Off'
      }).change(() => {

        $(this.toggleHeater).bootstrapToggle('disable');

        fetch(__WEBPACK_IMPORTED_MODULE_2_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.${this.toggleHeater.checked ? 'enable' : 'disable'}`, {
          instrumentId: this.props.instrumentId,
          groupName: this.props.name
        })).then(response => {

          $(this.toggleHeater).bootstrapToggle('enable');
        }).catch(() => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to change the heater state");
        });
      });

      this.transformed = true;
    }

    if (this.toggleHeater) {
      $(this.toggleHeater).data('bs.toggle')[this.state.heater_status ? 'on' : 'off'](true);
    }
  }

  render() {

    console.log(this.state);
    return this.props.serverState.heatController ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-lg-5' },
          'Heater'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-lg-4' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { 'data-toggle': 'toggle', type: 'checkbox', ref: el => this.toggleHeater = el, disabled: this.state.heater_status_updating, checked: this.state.heater_status, 'data-width': '100', 'data-height': '25' })
          )
        )
      ),
      this.state.heater_error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'error' },
        this.state.heater_error
      ) : null,
      this.state.heater_status ? this.state.heater_power !== undefined ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-5' },
            'Heating power: ',
            Math.round(this.state.heater_power * 100) + " %"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-4' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'btn-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'button', className: 'btn-sm btn btn-default', onClick: this.increaseHeatingPower },
                '+'
              ),
              '\xA0',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'button', className: 'btn-sm btn btn-default', onClick: this.decreaseHeatingPower },
                '-'
              )
            )
          )
        )
      ) : null : null
    ) : null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeatStatus);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);



class HeatStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {

    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);
  }

  componentDidMount() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  wsUpdate(event, data) {

    // Update directly the state
    this.setState(data.data);

    // New state means re-enabling
    /*if( this.toggleLightMode ) {
      $( this.toggleLightMode ).bootstrapToggle('enable');
    }*/
    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {
    /*
        if( this.toggleLightMode && ! this.transformed ) {
    
          $( this.toggleLightMode ).bootstrapToggle({
            on: 'Auto',
            off: 'Manual'
          }).change( () => {
    
            $( this.toggleLightMode ).bootstrapToggle('disable');
    
            let data = {
              instrumentId: this.props.instrumentId,
              groupName: this.props.name,
              lightController: {
                modeAutomatic: this.toggleLightMode.checked
              }  
            };
    
            let body = JSON.stringify( data );
            let headers = new Headers({
              "Content-Type": "application/json",
              "Content-Length": body.length.toString()
            });
    
    
            fetch( "http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/light.saveController", {
    
              headers: headers,
              method: 'POST',
              body: body
    
            } ).then( ( response ) => {
    
              $( this.toggleLightMode ).bootstrapToggle('enable');
    
              
            } ).catch( () => {
    
              ipcRenderer.send("reportError", "Unable to change the light mode" );
    
            } );
          } );      
          this.transformed = true;
        }
    
        if( this.toggleLightMode ) {
         $( this.toggleLightMode ).data('bs.toggle')[( this.state.lightAutomatic ? 'on' : 'off' ) ]( true );
        }*/
  }

  render() {

    return null;

    /*
    return (
          { this.props.serverState.heatController ?
            <div>
              <div className="row">
                <div className="col-lg-5">
                  Heater
                </div>
                <div className="col-lg-4">
                   <label>
                    <input data-toggle="toggle" type="checkbox" ref={ ( el ) => this.toggleHeater = el } disabled={ this.state.heater_status_updating } checked={ this.state.heater_status } data-width="100" data-height="25" />
                  </label>
                </div>
              </div>
               { this.state.heater_status ? 
                 <div>
                
                  <div className="row">
                    <div className="col-lg-5">
                      Heating power: { this.state.heating_power + " W" }
                    </div>
                
                    <div className="col-lg-4">
                        <div className="btn-group">
                          <button type="button" className="btn-sm btn btn-default" onClick={ this.increaseHeatingPower }>+</button>&nbsp;
                          <button type="button" className="btn-sm btn btn-default" onClick={ this.decreaseHeatingPower }>-</button>
                        </div>
                    </div>
                
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      Current: { this.state.heating_current + " A" }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      Voltage: { this.state.heating_voltage + " V" }
                    </div>
                  </div>
                   { heating_problem ? 
                    <div className="row">
                      <span className="grey"><span className="glyphicon glyphicon-warning"></span> The calculated heater resistance is off. Check that the pins are properly contacting the window</span>
                    </div> : null
                  }
              </div> : null }
          </div>
        : null }
        );*/
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeatStatus);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_environment_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_url_lib__);






//import { default as InstrumentStatus_1_0 } from "./instrumentstatus_1.0.jsx"


let speedOptions = [];

/*
	ADS1259
	0b00000000 ==> 10SPS
	0b00000001 ==> 16SPS
	0b00000010 ==> 50SPS
	0b00000011 ==> 60SPS
	0b00000100 ==> 400SPS
	0b00000101 ==> 1.2kSPS
	0b00000110 ==> 3.6kSPS
	0b00000111 ==> 14kSPS

	ADS1147
	0b00000000 ==> 5SPS
	0b00000001 ==> 10SPS
	0b00000010 ==> 20SPS
	0b00000011 ==> 40SPS
	0b00000100 ==> 80SPS
	0b00000101 ==> 160SPS
	0b00000110 ==> 320SPS
	0b00000111 ==> 640SPS
	0b00000111 ==> 1000SPS
	0b00000111 ==> 2000SPS
*/

class InstrumentStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor() {

		super(...arguments);
		this.state = {};
		this.togglePause = this.togglePause.bind(this);
		this.changeAcquisitionSpeed = this.changeAcquisitionSpeed.bind(this);
	}

	componentDidMount() {

		switch (__WEBPACK_IMPORTED_MODULE_2__app_environment_json___default.a.instrument[this.props.instrumentId].ADC.model) {

			case 'ADS1259':
				speedOptions = [0, 2, 4, 5, 7];
				break;

			default:
			case 'ADS1147':
				speedOptions = [1, 3, 6, 8, 9];
				break;
		}
	}
	async changeAcquisitionSpeed(event) {

		let val = event.target.value;
		let result = await fetch(__WEBPACK_IMPORTED_MODULE_3_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/instrument.setAcquisitionSpeed`, {

			instrumentId: this.props.instrumentId,
			speed: val
		}));
		console.log(result);
		await this.props.update();
	}

	togglePause() {

		let url;
		if (this.state.paused) {
			url = "resumeChannels";
		} else {
			url = "pauseChannels";
		}
		return fetch("http://" + this.props.config.trackerHost + ":" + this.props.config.trackerPort + "/" + url + "?instrumentId=" + encodeURIComponent(this.props.instrumentId), { method: 'GET' });
	}

	render() {

		console.log(this.props, __WEBPACK_IMPORTED_MODULE_2__app_environment_json___default.a.instrument);
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "col-lg-2 group-status group-status-instrument" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"h4",
				null,
				"Instrument status"
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" + (this.props.error_influxdb ? ' status-error' : '') },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-5" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { title: this.props.error_influxdb || "", className: "glyphicon glyphicon-" + (this.props.error_influxdb ? 'warning-sign' : 'check') }),
					" InfluxDB server"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-4" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-cl btn-default btn-sm", onClick: () => {
								__WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("editInfluxDB");
							} },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
						" Configure"
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" + (this.props.error_tracker ? ' status-error' : '') },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-5" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { title: this.props.error_tracker || "", className: "glyphicon glyphicon-" + (this.props.error_tracker ? 'warning-sign' : 'check') }),
					" MPP Tracker"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-4" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-cl btn-default btn-sm", onClick: () => {
								__WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("editInstrument", this.props.config.trackerHost);
							} },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
						" Configure"
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" + (this.state.paused ? ' status-error' : '') },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-5" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-" + (this.state.paused ? 'warning-sign' : 'check') }),
					" ",
					this.state.paused ? "Tracking paused" : "Tracking enabled"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-4" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.togglePause },
						this.state.paused ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-start" }),
							"Resume"
						) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-pause" }),
							"Pause"
						)
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-5" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.resetSlave },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							null,
							"Reset enclosure(s)"
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "col-lg-4" })
			),
			speedOptions.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "form-group" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"label",
					{ htmlFor: "tracking_speed", className: "col-sm-9" },
					"Acquisition speed ",
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"sup",
						{ title: "This option directly affects the acquisition speed of the instrument, and therefore has a significant impact on the tracking efficiency when the light bias is noisy. The slower the better for the convergence, but it will limit the overall tracking speed." },
						"?"
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-sm-9" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"select",
						{ name: "tracking_speed", id: "tracking_speed", className: "form-control", value: this.props.serverState.acquisition_speed, onChange: this.changeAcquisitionSpeed },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"option",
							{ key: "0", value: speedOptions[4] },
							"Maximum"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"option",
							{ key: "1", value: speedOptions[3] },
							"Fast"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"option",
							{ key: "2", value: speedOptions[2] },
							"Average"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"option",
							{ key: "3", value: speedOptions[1] },
							"Slow"
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"option",
							{ key: "4", value: speedOptions[0] },
							"Very slow"
						)
					)
				)
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (InstrumentStatus);

/***/ }),
/* 28 */
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
/* 29 */
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