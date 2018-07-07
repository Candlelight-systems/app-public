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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

module.exports = {"ageing":true,"statuses":{"light":{"version":"2.0","readonly":false},"heat":{"version":"ssr_1.0","switch":false}},"instrument":{"Small cells":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":30,"LSB":0.33,"LSBValue":1,"voltageRange":2.5,"autoZero":"device","groups":{"Slot A":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}},"Module":{"ADC":{"model":"ADS1259"},"changeSpeed":false,"fsr":30,"LSB":4.88,"LSBValue":1,"voltageRange":10,"autoZero":"device","groups":{"Module slot":{"resettable":false,"displayDeviceInformation":{"time_ellapsed":true,"pce":true,"power":false,"sun":true,"voc":true,"jsc":true,"ff":true,"vnow":true,"jnow":true,"temperature":true,"humidity":true,"kwh_yr":false}}}}}}

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_lib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url_lib__);


const buildURL = urlProps => {
	return `http://${urlProps.trackerHost}:${urlProps.trackerPort}/`;
};

const fetchGET = url => {

	return fetch(url, {
		method: 'GET'
	});
};

const fetchGETJson = url => {
	return fetchGET(url).then(response => response.json());
};

const fetchPOST = (url, bodyObject) => {

	const bodyJSON = JSON.stringify(bodyObject);
	const headers = new Headers({
		"Content-Type": "application/json",
		"Content-Length": bodyJSON.length.toString()
	});

	fetch(url, {
		headers: headers,
		method: 'POST',
		body: bodyJSON
	});
};

const autoZero = (urlProps, instrumentId, chanId) => {
	return fetchGET(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}instrument.autoZero`, {
		instrumentId: instrumentId,
		channelId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = autoZero;


const getChannelStatus = (urlProps, instrumentId, chanId) => {
	return fetchGETJson(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}getStatus`, {
		instrumentId: instrumentId,
		chanId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["e"] = getChannelStatus;


const saveChannelStatus = (urlProps, newStatus) => {
	return fetchPOST(`${buildURL(urlProps)}setStatus`, newStatus);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = saveChannelStatus;


const saveChannelStatuses = (urlProps, newStatuses) => {
	return fetchPOST(`${buildURL(urlProps)}setStatuses`, newStatuses);
};
/* harmony export (immutable) */ __webpack_exports__["h"] = saveChannelStatuses;


const resetChannelStatus = (urlProps, instrumentId, chanId) => {

	return fetchGET(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}resetStatus`, {
		instrumentId: instrumentId,
		chanId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["f"] = resetChannelStatus;


const channelExecuteIV = (urlProps, instrumentId, chanId) => {

	return fetchGET(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}executeIV`, {
		instrumentId: instrumentId,
		chanId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = channelExecuteIV;


const channelExecuteVoc = (urlProps, instrumentId, chanId) => {

	return fetchGET(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}recordVoc`, {
		instrumentId: instrumentId,
		chanId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["d"] = channelExecuteVoc;


const channelExecuteJsc = (urlProps, instrumentId, chanId) => {

	return fetchGET(__WEBPACK_IMPORTED_MODULE_0_url_lib___default.a.formatUrl(`${buildURL(urlProps)}recordJsc`, {
		instrumentId: instrumentId,
		chanId: chanId
	}));
};
/* harmony export (immutable) */ __webpack_exports__["c"] = channelExecuteJsc;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("node-jsgraph/dist/jsgraph-es6");

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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ping; });
/* unused harmony export checkAuth */
/* unused harmony export checkDB */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(21);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__ = __webpack_require__(12);
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
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__jsx_tracker_instrument_jsx__["a" /* default */], { instrumentId: i, trackerConfig: json, config: tracker, configDB: db })
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group_jsx__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__status_activity_main_jsx__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_jsx__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_debounce__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__influx__ = __webpack_require__(9);











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
    }, 10000);

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

    __WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].on("light.updated", () => {
      this.updateInstrument();
    });
  }

  async ping(props = this.props) {
    return Object(__WEBPACK_IMPORTED_MODULE_6__influx__["a" /* ping */])(this.props.configDB).then(() => {

      this.setState({
        error_influxdb: false
      });
    }).catch(error => {

      console.warn("Cannot reach influx DB. Error was: ", error);

      this.setState({
        error_influxdb: "Connection to influxDB has failed: \"" + error + "\""
      });

      return Promise.resolve();
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
    }).then(response => response.json()).then(response => {

      // An error has been notified on the server side
      if (response.error) {
        this.setState({ error: `An error has occured: ${error.toString}` });
      }

      return response;
    }).catch(error => {

      /*
            setTimeout( () => {
              
              this.updateInstrument();
            }, 3000 );
      */
      this.setState({
        error: `Error while retrieving the instrument status. The returned error was ${error.toString()}.`,
        errorMethods: [["Retry", this.updateInstrument]]
      });
    });
  }

  editInstrument() {
    __WEBPACK_IMPORTED_MODULE_4_electron__["ipcRenderer"].send("editInstrument", this.props.config.trackerHost);
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

      setTimeout(() => {
        this.updateInstrument();
      }, 3000);

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
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__error_jsx__["a" /* default */], { message: this.state.error || this.state.error_influxdb || this.state.error_tracker, methods: this.state.errorMethods })
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

      content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row statuses' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__status_activity_main_jsx__["a" /* default */], this.props),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'clearfix' })
        ),
        groupsDoms
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h3',
        null,
        'Instrument: ',
        this.props.instrumentId
      ),
      content
    );
  }
}

var _initialiseProps = function () {
  this.updateInstrument = __WEBPACK_IMPORTED_MODULE_5_lodash_debounce___default()((props = this.props) => {

    return Promise.all([this.getConfig(props), this.getStatus(props), this.ping(props)]).then(args => {

      let groups = args[0],
          status = args[1],
          ping = args[2];

      this.setState({
        groups: groups.groups,
        serverState: status,
        paused: status.paused,

        error: false
      });
    }).catch(e => {});
  }, 100);
};

/* harmony default export */ __webpack_exports__["a"] = (TrackerInstrument);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device_jsx__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__status_light_main_jsx__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__status_heat_main_jsx__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_instrument_main_jsx__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__queries__ = __webpack_require__(4);









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

    __WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
    this.doEnvironmentalSensing();
  }

  componentWillUnmount() {

    __WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
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

    __WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].once("channelsConfigured", (event, response) => {

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
        data.chanStatuses[chanIds[i]] = Object.assign({}, response, { cellName: response["__cellName_" + chanIds[i]] });
        //delete response["__cellName_" + chanIds[ i ] ];
      }
      console.log(data);
      return Object(__WEBPACK_IMPORTED_MODULE_6__queries__["h" /* saveChannelStatuses */])(this.props.config, data);
    });

    __WEBPACK_IMPORTED_MODULE_2_electron__["ipcRenderer"].send("configChannels", {

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
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__status_instrument_main_jsx__["a" /* default */], this.props),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__status_light_main_jsx__["a" /* default */], this.props),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__status_heat_main_jsx__["a" /* default */], this.props),
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cellbuttons_jsx__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_jsx__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_extend__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_util_iv__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__influx__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__app_environment_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__queries__ = __webpack_require__(4);













var instrumentEnvironment = __WEBPACK_IMPORTED_MODULE_10__app_environment_json___default.a.instrument;

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

class TrackerDevice extends __WEBPACK_IMPORTED_MODULE_8_react___default.a.Component {

	/**
  *	@param props.name The name of the cell
  */
	constructor(props) {
		super(props);

		this.unit = {
			"voltage": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"V"
			),
			"currentdensity": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"mA cm",
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			),
			"current": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"mA"
			),
			"efficiency": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"fillfactor": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"%"
			),
			"power": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"W"
			),
			"sun": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"sun"
			),
			"area": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"cm",
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"sup",
					null,
					"2"
				)
			),
			"temperature": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"\xB0C"
			),
			"humidity": __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				"%"
			)
		};

		this.state = __WEBPACK_IMPORTED_MODULE_5_extend___default()(true, {}, initialState);
		this.state.data = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		this.cfg = this.cfg.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.pause = this.pause.bind(this);
		this.recordIV = this.recordIV.bind(this);
		this.recordJsc = this.recordJsc.bind(this);
		this.recordVoc = this.recordVoc.bind(this);

		this.downloadData = this.downloadData.bind(this);
		this.autoZero = this.autoZero.bind(this);

		this.wsUpdate = this.wsUpdate.bind(this);

		//	this.formChanged = this.formChanged.bind( this );
		//this.state.tmpServerState = {};		
	}

	componentWillReceiveProps(nextProps) {

		this.setState({ updating: false });

		/**
   *  Norman, 4 January 2017:
   *	Some explaining might be useful here.
   *  We need to chose the source of truth of the channel status. Either it defines itself (see this.getStatus) or the group and in turn the instrument sets it
   *  But it can't be both, otherwise, if they are different (and they can be, at least temporarily), they will overwrite each other
   */

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

		__WEBPACK_IMPORTED_MODULE_9_electron__["ipcRenderer"].on("channel.update." + this.props.instrumentId + "." + this.props.chanId, this.wsUpdate);
	}

	componentWillUnmount() {

		if (this.refreshInterval) {
			clearTimeout(this.refreshInterval);
			this.refreshInterval = true;
		}

		__WEBPACK_IMPORTED_MODULE_9_electron__["ipcRenderer"].removeListener("channel.update." + this.props.instrumentId + "." + this.props.chanId, this.wsUpdate);
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
			newState.power = round(data.state.power, 5);
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
		} else if (data.timer.iv === null) {
			newState.timer_nextIV = { time: null, updated: Date.now() };
		}

		if (!isNaN(data.timer.jsc)) {
			// Timer for the next JSC measurement
			newState.timer_nextJsc = { time: data.timer.jsc, updated: Date.now() };
		} else if (data.timer.jsc === null) {
			newState.timer_nextJsc = { time: null, updated: Date.now() };
		}

		if (!isNaN(data.timer.voc)) {
			// Timer for the next Voc curve
			newState.timer_nextVoc = { time: data.timer.voc, updated: Date.now() };
		} else if (data.timer.voc === null) {
			newState.timer_nextVoc = { time: null, updated: Date.now() };
		}

		if (!isNaN(data.timer.aquisition)) {
			// Timer for the last aquisition
			newState.timer_aquisition = { time: data.timer.aquisition, updated: Date.now() };
		}

		if (!isNaN(data.timer.ellapsed)) {

			newState.timer_ellapsed = { time: data.timer.ellapsed, updated: Date.now() };
		}

		if (data.action.data) {

			let lastTime;

			if (this.state.data && this.state.data.getLength && this.state.data.getLength() > 0) {
				lastTime = this.state.data.xdata.data[this.state.data.getLength() - 1];
				lastTime += this.state.serverState.tracking_record_interval / 1000 / 3600;
			} else {
				lastTime = 0;
			}

			let statedata;
			if (this.state.data) {
				statedata = this.state.data;
			} else {
				statedata = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();
			}

			switch (this.parameter) {

				case "efficiency":
					statedata.append(lastTime, data.state.efficiency);
					break;

				case "voltage_mean":
					statedata.append(lastTime, data.state.voltage);
					break;

				case "current_mean":
					statedata.append(lastTime, data.state.curent);
					break;

				case "power_mean":
					statedata.append(lastTime, data.state.power);
					break;

				default:
					break;
			}

			//if( ! this.state.data ) {
			newState.data = statedata;
			//}
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
			newState = __WEBPACK_IMPORTED_MODULE_5_extend___default()(true, {}, initialState);
			this.state = newState; // Force-remove all the other state that will pollute the new channel
		}

		this.setState(newState);
	}

	saveStatus(newState) {

		return Object(__WEBPACK_IMPORTED_MODULE_11__queries__["g" /* saveChannelStatus */])(this.props.config, newState);
	}

	resetChannel() {

		/*
  		this.state.serverState.measurementName = false;
  		this.state.serverState.cellName = "";
  		this.state.serverState.cellArea = 0;
  		this.state.serverState.tracking_mode = 0;
  		this.state.serverState.enable = 0;
  
  */

		return Object(__WEBPACK_IMPORTED_MODULE_11__queries__["f" /* resetChannelStatus */])(this.props.config, this.props.instrumentId, this.props.chanId);
	}

	async recordIV() {

		if (this.state.processing_iv) {
			return;
		}
		this.setState({ processing_iv: true, error_iv: false });
		try {

			await Object(__WEBPACK_IMPORTED_MODULE_11__queries__["b" /* channelExecuteIV */])(this.props.config, this.props.instrumentId, this.props.chanId);
		} catch (e) {
			this.setState({ error_iv: true });
		}

		this.setState({ processing_iv: false });
	}

	async recordVoc() {

		if (this.state.processing_voc) {
			return;
		}

		this.setState({ processing_voc: true, error_voc: false });

		try {
			await Object(__WEBPACK_IMPORTED_MODULE_11__queries__["d" /* channelExecuteVoc */])(this.props.config, this.props.instrumentId, this.props.chanId);
		} catch (e) {
			this.setState({ error_voc: true });
		}

		this.setState({ processing_voc: false });
	}

	async recordJsc() {

		if (this.state.processing_jsc) {
			return;
		}

		this.setState({ processing_jsc: true, error_jsc: false });

		try {
			await Object(__WEBPACK_IMPORTED_MODULE_11__queries__["c" /* channelExecuteJsc */])(this.props.config, this.props.instrumentId, this.props.chanId);
		} catch (e) {
			this.setState({ error_jsc: true });
		}

		this.setState({ processing_jsc: false });
	}

	//formChanged( name, value ) {

	//	this.state.tmpServerState[ name ] = value;
	//this.setState( { tmpServerState: this.state.tmpServerState } );
	//this.state.tmpServerState = Object.assign( {}, this.state.tmpServerState );
	//}

	downloadData() {

		__WEBPACK_IMPORTED_MODULE_9_electron__["ipcRenderer"].send("downloadData", this.props.config, this.state.serverState.measurementName, this.props.chanId);
	}

	autoZero() {

		return Object(__WEBPACK_IMPORTED_MODULE_11__queries__["a" /* autoZero */])(this.props.config, this.props.instrumentId, this.props.chanId).catch(error => {

			this.setState({
				error: error
			});
		});
	}

	componentDidUpdate() {}

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

		__WEBPACK_IMPORTED_MODULE_9_electron__["ipcRenderer"].once("channelConfigured", (event, data) => {

			if (data.chanId != this.props.chanId) {
				return;
			}

			if (data.lightSource !== "manual") {
				data.lightRefValue = 0;
			}

			this.saveStatus(data);
		});

		__WEBPACK_IMPORTED_MODULE_9_electron__["ipcRenderer"].send("configChannel", {

			instrumentId: this.props.instrumentId,
			groupName: this.props.groupName,
			chanId: this.props.chanId,

			trackerHost: this.props.config.trackerHost,
			trackerPort: this.props.config.trackerPort
		});
	}

	getStatus() {

		return Object(__WEBPACK_IMPORTED_MODULE_11__queries__["e" /* getChannelStatus */])(this.props.config, this.props.instrumentId, this.props.chanId).then(response => {

			this.setState({ serverState: response[this.props.groupName].channels[this.props.chanId] });
			//this.updateInfluxData( response );
		}).catch(error => {

			this.setState({
				error: error
			});
		});
	}

	readIV(value) {

		if (!value) {
			return;
		}

		let iv = value.replace("\"", "").split(",").map(el => parseFloat(el)),
		    wave = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform();

		for (var i = 2; i < iv.length - 1; i += 2) {
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
		console.log('update influx');
		let parameter,
		    parameter_jv,
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
				parameter_jv = 'jsc';
				break;

			case 2:
				parameter = "voltage_mean";
				parameter_jv = 'voc';
				break;

			default:
			case 1:
				parameter = "efficiency";
				parameter_jv = 'pce';
				break;
		}
		this.parameter = parameter;

		let queries = [`SELECT time, efficiency, power FROM "${serverState.measurementName}" ORDER BY time ASC limit 1`, `SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM "${serverState.measurementName}" ORDER BY time DESC limit 1`, `SELECT time, iv, sun FROM "${serverState.measurementName}_iv" ${this.state._last_iv_time ? `WHERE time > '${this.state._last_iv_time}'` : ''} ORDER BY time ASC`, `SELECT voc FROM "${serverState.measurementName}_voc" ORDER BY time DESC LIMIT 1`, `SELECT jsc FROM "${serverState.measurementName}_jsc" ORDER BY time DESC LIMIT 1`];

		let newIvCurves = false;
		//console.log( `SELECT time, iv, sun FROM "${ serverState.measurementName }_iv" ${ this.state._last_iv_time ? `WHERE time > ${ this.state._last_iv_time.getTime() * 1000 }` : '' } ORDER BY time ASC`);
		Object(__WEBPACK_IMPORTED_MODULE_7__influx__["b" /* query */])(queries.join(";"), db, this.props.configDB).then(results => {

			if (results[2].series && results[2].series[0]) {

				newState.ivCurves = this.state.ivCurves.splice(0);
				newState.ivCurves = newState.ivCurves.concat(results[2].series[0].values.map((value, index) => {

					if (index == results[2].series[0].values.length - 1) {
						newState._last_iv_time = value[0];
					}

					return {
						time: new Date(value[0]),
						iv: this.readIV(value[1]),
						sun: value[2]
					};
				}));

				//console.log( newState.ivCurves );

				newState.iv_values = newState.ivCurves.map(ivCurve => {

					const p = ivCurve.iv.duplicate().math((x, y) => x * y);
					const parameters = Object(__WEBPACK_IMPORTED_MODULE_6__app_util_iv__["a" /* getIVParameters */])(ivCurve.iv, p, this.state.serverState.cellArea, ivCurve.sun * 1000, false);
					return parameters[parameter_jv];
				});
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
			//console.log( results[ 1 ].series[ 0 ].values[ 0 ][ 2 ] );
			newState.power = Math.round(results[1].series[0].values[0][2] * 1000000) / 1000000;
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
			//console.log( results[ 1 ].series[ 0 ].values[ 0 ][ 1 ] );
			if (results[1].series[0].values[0][1] == -1 || results[1].series[0].values[0][5] < 0.001) {
				parameter = 'power_mean';
			}

			this.parameter = parameter;
			query = "SELECT MEAN(" + parameter + ") as param, MAX(" + parameter + ") as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( power_mean ) as pMean  FROM \"" + serverState.measurementName + "\" WHERE time >= '" + timefrom + "' and time <= '" + timeto + "'  GROUP BY time(" + grouping + "s) FILL(none) ORDER BY time ASC; SELECT " + parameter + " FROM \"" + serverState.measurementName + "\" ORDER BY time ASC LIMIT 1;";

			queue.push(Object(__WEBPACK_IMPORTED_MODULE_7__influx__["b" /* query */])(query, db_ds, this.props.configDB).then(results => {

				let values = results[0].series[0].values,
				    offset,
				    wave = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveIV = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveSun = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveHumidity = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    waveTemperature = __WEBPACK_IMPORTED_MODULE_3_node_jsgraph_dist_jsgraph_es6___default.a.newWaveform(),
				    highest_value = 0,
				    highest_value_time = 0;

				newState.start_value = Math.round(results[1].series[0].values[0][1] * 100) / 100;

				// First point gives the initial efficiency, 2nd row
				if (values.length < 2) {
					newState.data = false;
					return;
				}

				let valueIndex = 1;
				let totalEnergyJoules = 0;
				let last_power;

				values.forEach((value, index) => {

					let date = new Date(value[0]),
					    time;

					if (index == 0) {
						offset = date.getTime();
						time = 0;
					} else {
						time = (date.getTime() - offset) / 1000 / 3600;
					}

					// Power is in index 8
					/*
     	y1	|`
     		|  `
     		|	 `
     		|	   `| y2
     		|		|
     		|		|
     		|		|
     		|		|
     		|		|
     		|		|
     		|		|
     		x1      x2
     	Area = ( ( x2 - x1 ) * ( y1 + y2 ) ) / 2
     */

					if (time > 0) {
						totalEnergyJoules += (time - wave.getX(wave.getLength() - 1)) * (value[8] + last_power) / 2 * 3600;
					}

					last_power = value[8];

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

				// totalEnergyKWh is in watt * hour (see unit analysis)
				let totalEnergykWh = totalEnergyJoules / 3600000; // Get the value in kWh

				const totalEnergykWh_per_year = totalEnergykWh / wave.getX(wave.getLength() - 1) * (24 * 365); // Times the number of ellapsed hours divided by the number of hours in a year
				const totalEnergykWh_per_year_per_m2 = totalEnergykWh_per_year / (serverState.cellArea / 10000);

				newState.highest_value = Math.round(highest_value * 100) / 100;
				newState.highest_value_time = highest_value_time;
				newState.data = wave;

				newState.data_sun = waveSun;
				newState.data_temperature = waveTemperature;
				newState.data_humidity = waveHumidity;
				newState.data_IV = waveIV;
				newState.kwh_yr_m2 = Math.round(totalEnergykWh_per_year_per_m2 * 100) / 100;
			}));

			return Promise.all(queue).then(() => {
				//console.log( newState.power, serverState.cellArea, newState.voc, newState.jsc );
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

			//			this.scheduleRefresh();
		});
	}

	processCurrent(value) {

		if (isNaN(value) || value === false) {
			return;
		}

		if (Math.abs(value) < 0.8) {
			return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				(Math.round(value * 10000) / 10).toPrecision(3),
				"\xA0\u03BCA\xA0cm",
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			);
		} else {
			return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"span",
				null,
				(Math.round(value * 100) / 100).toPrecision(3),
				"\xA0mA\xA0cm",
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"sup",
					null,
					"-2"
				)
			);
		}
	}

	render() {

		let unit, arrowstatus, change, changeUnit, currVal, startVal, startValPos, trackingMode, statusGraphAxisLabel, statusGraphAxisUnit, statusGraphSerieLabelLegend;

		switch (this.parameter) {

			case "efficiency":
				unit = "%";
				startVal = this.state.highest_value;
				startValPos = this.state.highest_value_time;
				currVal = this.state.efficiency;

				trackingMode = "MPPT";
				statusGraphAxisLabel = "Efficiency";
				statusGraphAxisUnit = "%";
				statusGraphSerieLabelLegend = "PCE";

				break;

			case "voltage_mean":
				unit = "V";
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.voc;

				trackingMode = "Voc";
				statusGraphAxisLabel = "Voltage";
				statusGraphAxisUnit = "V";
				statusGraphSerieLabelLegend = "Voc";
				break;

			case "current_mean":
				unit = this.unit.currentdensity;
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.jsc;

				trackingMode = "Jsc";
				statusGraphAxisLabel = "Current density";
				statusGraphAxisUnit = "mA cm^-2";
				statusGraphSerieLabelLegend = "Jsc";
				break;

			case "power_mean":
				unit = this.unit.power;
				startVal = this.state.start_value;
				startValPos = 0;
				currVal = this.state.power;

				trackingMode = "MPPT";
				statusGraphAxisLabel = "Power";
				statusGraphAxisUnit = "W";
				statusGraphSerieLabelLegend = "Pout";
				break;

			default:
				trackingMode = "No tracking";
				break;
		}

		let active = this.state.serverState.enable > 0 && this.state.serverState.tracking_mode > 0;
		let notavailable = "N/A";

		const j_currentdensity = this.processCurrent(this.state.currentdensity);
		const jsc_currentdensity = this.processCurrent(this.state.jsc);

		//console.log( this.props, instrumentEnvironment );
		const displayElements = instrumentEnvironment[this.props.instrumentId].groups[this.props.groupName].displayDeviceInformation;
		const button_autozero = instrumentEnvironment[this.props.instrumentId].autoZero == "device" ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
			"button",
			{ className: "btn btn-cl", onClick: this.autoZero },
			" Auto zero"
		) : null;

		if (active) {

			return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"div",
				{ ref: el => this.wrapper = el, className: 'cl-device ' + (active ? 'cell-running' : 'cell-stopped') + ' show-details' },
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"div",
					{ className: "col-lg-7" },
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "cell-name cell-main-info row" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-9" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"span",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("input", { type: "checkbox", className: "channel-check", onClick: this.props.toggleChannelCheck, checked: !!this.props.channelChecked })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"span",
								{ className: "label" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-tags" })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"span",
								{ className: "value" },
								this.state.serverState.cellName
							),
							" ",
							this.state.serverState.cellArea ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"span",
								{ className: "cell-area" },
								"( ",
								this.state.serverState.cellArea,
								" cm",
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"sup",
									null,
									"2"
								),
								" )"
							) : ""
						)
					),
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "cell-timing row" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								"Last data"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 1, direction: "ascending", timerValue: this.state.timer_aquisition })
							)
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_iv ? ' processing' : '') + (this.state.error_iv ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordIV })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								"Next IV curve"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { negative: "Overdue", precision: 2, direction: "descending", timerValue: this.state.timer_nextIV })
							)
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_voc ? ' processing' : '') + (this.state.error_voc ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordVoc })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								"Next Voc"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { negative: "Overdue", precision: 2, direction: "descending", timerValue: this.state.timer_nextVoc })
							)
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_jsc ? ' processing' : '') + (this.state.error_jsc ? ' processing-error' : '') },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordJsc })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								"Next Jsc"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { negative: "Overdue", precision: 2, direction: "descending", timerValue: this.state.timer_nextJsc })
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "cell-summary row" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: `col-lg-1 cell-status ${active ? 'active' : ''}` },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								active ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record" }) : __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" })
							),
							trackingMode
						),
						displayElements.time_ellapsed && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-hourglass" })
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__timer_jsx__["a" /* default */], { precision: 1, maxLevel: 3, spacer: " ", direction: "ascending", timerValue: this.state.timer_ellapsed })
								)
							)
						),
						displayElements.pce && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									"\u03B7"
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"strong",
										null,
										!isNaN(this.state.efficiency) && this.state.efficiency !== false && this.state.efficiency >= 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
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
						displayElements.power && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									"P",
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"sub",
										null,
										"out"
									)
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"strong",
										null,
										!isNaN(this.state.power) && this.state.power !== false ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
											"span",
											null,
											this.state.power,
											" ",
											this.unit.power
										) : 'N/A'
									)
								)
							)
						),
						displayElements.sun && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" })
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									!isNaN(this.state.sun) && this.state.sun !== false && this.state.sun >= 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"span",
										null,
										this.state.sun,
										" ",
										this.unit.sun
									) : 'N/A'
								)
							)
						),
						displayElements.voc && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_voc ? ' processing' : '') + (this.state.error_voc ? ' error' : '') },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordVoc })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "label" },
								"V",
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"sub",
									null,
									"oc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.voc) && this.state.voc !== false ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"span",
									null,
									this.state.voc,
									" ",
									this.unit.voltage
								) : 'N/A'
							)
						),
						displayElements.jsc && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" + (this.state.processing_jsc ? ' processing' : '') + (this.state.error_jsc ? ' error' : '') },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "record" },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-record", onClick: this.recordJsc })
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "label" },
								"J",
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"sub",
									null,
									"sc"
								)
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "value" },
								jsc_currentdensity || 'N/A'
							)
						),
						displayElements.ff && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "label" },
								"FF"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.ff) && this.state.ff !== false ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"span",
									null,
									this.state.ff,
									" ",
									this.unit.fillfactor
								) : 'N/A'
							)
						),
						displayElements.vnow && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "label" },
								"V",
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"sub",
									null,
									"now"
								)
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "value" },
								!isNaN(this.state.voltage) && this.state.voltage !== false ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"span",
									null,
									this.state.voltage,
									" ",
									this.unit.voltage
								) : 'N/A'
							)
						),
						displayElements.jnow && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-xs-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "label" },
								"J",
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"sub",
									null,
									"now"
								)
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								{ className: "value" },
								j_currentdensity || 'N/A'
							)
						),
						displayElements.temperature && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-grain" })
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									this.state.temperature && this.state.temperature > 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"span",
										{ title: "Base temperature (local temperature on the chip just under the device)" },
										this.state.temperature
									) : 'N/A',
									"\xA0/\xA0",
									this.state.temperature_junction && this.state.temperature_junction > 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"span",
										{ title: "Estimated junction temperature (base temperature + thermopile voltage)" },
										this.state.temperature_junction,
										" ",
										this.unit.temperature
									) : 'N/A'
								)
							)
						),
						displayElements.humidity && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-tint" })
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									this.state.humidity && this.state.humidity > 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"span",
										null,
										this.state.humidity,
										" ",
										this.unit.humidity
									) : 'N/A'
								)
							)
						),
						displayElements.kwh_yr && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 propElement" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"div",
								null,
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "label" },
									"kWh yr",
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"sup",
										null,
										"-1"
									),
									"m",
									__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"sup",
										null,
										"-2"
									)
								),
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
									"div",
									{ className: "value" },
									this.state.kwh_yr_m2 && this.state.kwh_yr_m2 > 0 ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
										"span",
										null,
										this.state.kwh_yr_m2
									) : 'N/A'
								)
							)
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "cell-efficiency col-lg-6" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__cellstatusgraph_jsx__["a" /* default */], {
								shown: true,
								width: "720",
								height: "60",
								mode: "default",
								key: this.props.instrumentId + this.props.chanId + "_graph",
								data: this.state.data,
								flag1: startVal,
								flag1_pos: startValPos,
								unit: unit,
								axisLabel: statusGraphAxisLabel,
								axisUnit: statusGraphAxisUnit,
								serieLabelLegend: statusGraphSerieLabelLegend,
								flag2: currVal,
								data_IV: this.state.iv_values

							})
						)
					),
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "row cell-actions" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-1 label" },
							"Actions"
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							{ className: "col-lg-8" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.downloadData },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-download-alt" }),
								" Download"
							),
							button_autozero,
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.stop },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-stop" }),
								" Stop"
							),
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl", onClick: this.cfg },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
								" Configure"
							)
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"div",
					{ className: "col-lg-2 cell-iv" },
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__cellstatusiv_jsx__["a" /* default */], {
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

			return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
				"div",
				{ ref: el => this.wrapper = el, className: "cl-device cell-unknown" },
				__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
					"div",
					{ className: "cell-name cell-main-info row" },
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "col-lg-4" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"span",
							null,
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("input", { type: "checkbox", className: "channel-check", onClick: this.props.toggleChannelCheck, checked: !!this.props.channelChecked })
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"span",
							{ className: "label" },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-tags" })
						),
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"span",
							{ className: "value" },
							!this.state.serverState.cellName ? __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"span",
								null,
								"Channel #",
								this.props.chanId
							) : this.state.serverState.cellName
						)
					),
					__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
						"div",
						{ className: "col-lg-4" },
						__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"button",
							{ className: "btn btn-cl btn-sm", onClick: this.cfg },
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
							" Configure"
						),
						!!(this.state.serverState.cellName && this.state.serverState.cellName.length > 0 && !active && this.state.serverState.tracking_mode > 0) && __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
							"div",
							null,
							__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
								"button",
								{ className: "btn btn-cl btn-sm", onClick: this.start },
								__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span", { className: "glyphicon glyphicon-start" }),
								" Start"
							),
							" ",
							button_autozero
						)
					)
				)
			);
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (TrackerDevice);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_extend__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(5);
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
		this.shapes_IV = [];
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
			this.flag1.draw();

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
			this.flag2.draw();
		}
	}

	componentDidUpdate() {

		if (!this.serie) {
			return;
		}

		/*
  		this.shapes_IV.map( ( shape ) => {
  			shape.kill();
  		});
  */
		if (this.props.data_IV) {

			this.shapes_IV = this.props.data_IV.map(data_IV => {
				//	console.log( data_IV );
				/*let shape = this.graph.newShape( 'ellipse', { rx: '3px', ry: '3px', position: { x: data_IV.x, y: data_IV.y } } );
    shape.draw();
    shape.redraw();
    return shape;*/
			});
		}

		if (this.graph && this.props.data) {

			this.serie.setWaveform(this.props.data);
			this.serieZone.setWaveform(this.props.data.duplicate(true).prepend(0, 0).append(wave => wave.getXRaw(wave.getLength() - 1), 0));
			this.graph.autoscaleAxes();

			//this.graph.updateLegend();

			if (this.flag1 && this.flag2) {
				//this.flag1.draw();
				//this.flag2.draw();


				this.flag1.show();
				this.flag2.show();

				this.flag1.setPosition({ x: this.props.flag1_pos });
				this.flag1.redraw();

				this.flag2.setPosition({ x: this.serie.getMaxX() });
				this.flag2.redraw();
			}
			this.graph.draw();
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphcomponent_jsx__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_jsgraph_dist_jsgraph_es6__ = __webpack_require__(5);
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

			if (data.time - lastInterval > idealInterval || this.props.data.length <= 5 || index == this.props.data.length - 1) {
				lastInterval = data.time;
				indices.push(index);
			}
		});

		const colors = ['#ae182d', '#6d18ae', '#1834ae', '#1897ae', '#18ae22', '#acae18'];
		let k = 0;

		this.props.data.forEach((data, index) => {

			if (indices.indexOf(index) == -1) {
				return;
			}

			if (data.iv.getLength() == 0) {
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
/* 18 */
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

      if (this.props.timerValue.time === null) {
        this.setState({ timerValue: NaN });
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

    if (value < 0 && this.props.negative) {
      return this.props.negative;
    }

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
/* 19 */
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

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lightstatus_1_0_jsx__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lightstatus_2_0_jsx__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lightstatus_readonly_jsx__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_environment_json__);







class LightStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.light_calibrate = this.light_calibrate.bind(this);
    this.light_controller_config = this.light_controller_config.bind(this);
  }

  light_calibrate(calibrateMethod) {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send(calibrateMethod, {
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

    if (!__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.light) {
      return null;
    }

    switch (__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.light.version) {

      case "1.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__lightstatus_1_0_jsx__["a" /* default */], this.props);
          break;
        }

      case "readonly":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__lightstatus_readonly_jsx__["a" /* default */], this.props);
          break;
        }

      default:
      case "2.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__lightstatus_2_0_jsx__["a" /* default */], this.props);
        }
    };

    let button_calibrate;
    switch (__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.light.type) {

      case 'pyranometer':

        button_calibrate = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "button",
          { type: "button", className: "btn btn-cl btn-default btn-sm", onClick: () => this.light_calibrate("calibratePyranometer") },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" }),
          " Calibrate pyranometer"
        );

        break;

      case 'photodiode':
      default:

        button_calibrate = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "button",
          { type: "button", className: "btn btn-cl btn-default btn-sm", onClick: () => this.light_calibrate("calibratePD") },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-scale" }),
          " Calibrate photodiode"
        );

        break;
    }

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
          !__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.light.readonly && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "button",
            { type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.light_controller_config },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-cog" }),
            " Configure"
          ),
          button_calibrate
        )
      )
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
/* 24 */
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
            Math.round(this.state.lightValue * 1000) / 1000,
            " sun"
          )
        ) : null
      ) : null
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LightStatus);

/***/ }),
/* 25 */
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

    /*if( data.state.hasOwnProperty( 'paused' ) ) {
      this.setState( { paused: data.state.paused } );
    }*/
  }

  componentDidUpdate(prevProps) {}

  render() {

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      this.state.lightValue !== undefined && this.state.lightValue !== null ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
          Math.round(this.state.lightValue * 100) / 100,
          " sun"
        )
      ) : "Current value unknown"
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LightStatus);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heatstatus_1_0_jsx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heatstatus_2_0_jsx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__heatstatus_ssr_1_0_jsx__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_environment_json__);







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
    if (!__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.heat) {
      return null;
    }

    switch (__WEBPACK_IMPORTED_MODULE_5__app_environment_json___default.a.statuses.heat.version) {

      case "1.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__heatstatus_1_0_jsx__["a" /* default */], this.props);
          break;
        }

      case "ssr_1.0":
        {
          content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__heatstatus_ssr_1_0_jsx__["a" /* default */], this.props);
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
            "Temperature (env.) :"
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url_lib__ = __webpack_require__(3);
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
/* 28 */
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

    this.increaseHeatingPower = this.increaseHeatingPower.bind(this);
    this.decreaseHeatingPower = this.decreaseHeatingPower.bind(this);
  }

  componentDidMount() {

    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  componentWillUnmount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);
  }

  increaseHeatingPower() {

    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.increasePower?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

      method: 'GET'

    }).then(response => {

      $(this.enableDCDC).bootstrapToggle('enable');
    }).catch(() => {

      __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to enable / disable the heater");
    });
  }

  decreaseHeatingPower() {

    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.decreasePower?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

      method: 'GET'

    }).then(response => {

      $(this.enableDCDC).bootstrapToggle('enable');
    }).catch(() => {

      __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to enable / disable the heater");
    });
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

    if (this.enableDCDC && !this.transformed) {

      $(this.enableDCDC).bootstrapToggle({
        on: 'On',
        off: 'Off'
      }).change(() => {

        $(this.enableDCDC).bootstrapToggle('disable');

        fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.${this.enableDCDC.checked ? 'enable' : 'disable'}?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

          method: 'GET'

        }).then(response => {

          $(this.enableDCDC).bootstrapToggle('enable');
        }).catch(() => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to enable / disable the heater");
        });
      });
      this.transformed = true;
    }

    if (this.enableDCDC) {
      $(this.enableDCDC).data('bs.toggle')[this.state.heater_status ? 'on' : 'off'](true);
    }
  }

  render() {

    let heating_problem = this.state.heating_voltage / this.state.heating_current > 20;
    if (this.state.heating_voltage < 1 || !this.state.heating_voltage) {
      // For low voltage, let's not flag anything
      heating_problem = false;
    }
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      this.props.serverState.heatController ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "row" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-5" },
            "Heater"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-lg-4" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "label",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { "data-toggle": "toggle", type: "checkbox", ref: el => this.enableDCDC = el, checked: this.state.heater_status, "data-width": "100", "data-height": "25" })
            )
          )
        ),
        this.state.heater_status ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "row" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "col-lg-5" },
              "Heating power: ",
              this.state.heater_power + " W"
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "col-lg-4" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "btn-group" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { type: "button", className: "btn-sm btn btn-default", onClick: this.increaseHeatingPower },
                  "+"
                ),
                "\xA0",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "button",
                  { type: "button", className: "btn-sm btn btn-default", onClick: this.decreaseHeatingPower },
                  "-"
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
              "Current: ",
              this.state.heater_current + " A"
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "row" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "col-lg-5" },
              "Voltage: ",
              this.state.heater_voltage + " V"
            )
          ),
          heating_problem ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "row" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "grey" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "glyphicon glyphicon-warning" }),
              " The calculated heater resistance is off. Check that the pins are properly contacting the window"
            )
          ) : null
        ) : null
      ) : null
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeatStatus);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url_lib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_url_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__app_environment_json__);





class HeatStatus extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor() {

    super(...arguments);
    this.state = {};
    this.wsUpdate = this.wsUpdate.bind(this);

    this.setTargetTemperature = this.setTargetTemperature.bind(this);
    this.changeTargetTemperature = this.changeTargetTemperature.bind(this);
    this.setPower = this.setPower.bind(this);
    this.setPIDParameters = this.setPIDParameters.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (this.state.heater_cooling) {
      if (name == 'Ki') {
        this.setState({ 'Ki_cooling': value });
      } else if (name == 'Kp') {
        this.setState({ 'Kp_cooling': value });
      } else if (name == 'Kd') {
        this.setState({ 'Kd_cooling': value });
      } else if (name == 'bias') {
        this.setState({ 'bias_cooling': value });
      }
    } else {

      if (name == 'Ki') {
        this.setState({ 'Ki_heating': value });
      } else if (name == 'Kp') {
        this.setState({ 'Kp_heating': value });
      } else if (name == 'Kd') {
        this.setState({ 'Kd_heating': value });
      } else if (name == 'bias') {
        this.setState({ 'bias_heating': value });
      }
    }

    this.setState({ [name]: value });
  }

  componentDidMount() {
    __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("group.update." + this.props.instrumentId + "." + this.props.name, this.wsUpdate);

    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.getPIDParameters?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, { method: 'GET' }).then(response => response.json()).then(response => {

      this.setState({

        Kp_heating: response.heating.Kp,
        Kp_cooling: response.cooling.Kp,
        Kd_heating: response.heating.Kd,
        Kd_cooling: response.cooling.Kd,
        Ki_heating: response.heating.Ki,
        Ki_cooling: response.cooling.Ki,

        bias_heating: response.heating.bias,
        bias_cooling: response.cooling.bias

      });
    });
  }

  setPIDParameters() {

    try {
      fetch(__WEBPACK_IMPORTED_MODULE_2_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.setPIDParameters`, {

        instrumentId: this.props.instrumentId,
        groupName: this.props.name,

        Kp_h: this.state.Kp_heating,
        Kp_c: this.state.Kp_cooling,
        Kd_h: this.state.Kd_heating,
        Kd_c: this.state.Kd_cooling,
        Ki_h: this.state.Ki_heating,
        Ki_c: this.state.Ki_cooling,

        bias_h: this.state.bias_heating,
        bias_c: this.state.bias_cooling

      })).then(response => {
        if (response.status !== 200) {
          throw "Error";
        }
      });

      this.setState({ pid_error: false, pid_success: true });
    } catch (e) {
      console.error(e);
      this.setState({ pid_error: e, pid_success: false });
    }
  }

  setPower() {

    try {
      fetch(__WEBPACK_IMPORTED_MODULE_2_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.setPower`, {

        instrumentId: this.props.instrumentId,
        groupName: this.props.name,
        power: this.state.newpower / 100

      })).then(response => {
        if (response.status !== 200) {
          throw "Error";
        }
      });

      this.setState({ power_error: false, power_success: true });
    } catch (e) {
      console.error(e);
      this.setState({ power_error: e, power_success: false });
    }
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

  changeTargetTemperature(e) {

    this.setState({
      input_heater_target_temperature: e.target.value
    });
  }

  setTargetTemperature() {
    fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.setTarget?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}&target=${this.state.input_heater_target_temperature}`, {

      method: 'GET'

    }).then(response => {});
  }

  componentDidUpdate(prevProps) {

    if (this.buttonHeatCool && !this.transformed) {

      $(this.buttonHeatCool).bootstrapToggle({
        on: 'Cooling',
        off: 'Heating'
      }).change(() => {

        $(this.buttonHeatCool).bootstrapToggle('disable');

        fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.${this.buttonHeatCool.checked ? 'setCooling' : 'setHeating'}?instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

          method: 'GET'

        }).then(response => {

          $(this.buttonHeatCool).bootstrapToggle('enable');
        }).catch(() => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to switch the heater polarity");
        });
      });
    }

    if (this.buttonMode && !this.transformed) {

      $(this.buttonMode).bootstrapToggle({
        on: 'PID',
        off: 'Set power'
      }).change(() => {

        $(this.buttonMode).bootstrapToggle('disable');

        fetch(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/heat.setMode?mode=${this.buttonMode.checked ? 'pid' : 'fixedPower'}&instrumentId=${this.props.instrumentId}&groupName=${this.props.name}`, {

          method: 'GET'

        }).then(response => {

          $(this.buttonMode).bootstrapToggle('enable');
        }).catch(() => {

          __WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].send("reportError", "Unable to change the heating mode");
        });
      });
    }

    if (!this.transformed) {
      this.transformed = true;
    }
    if (this.buttonHeatCool) {
      $(this.buttonHeatCool).data('bs.toggle')[this.state.heater_cooling ? 'on' : 'off'](true);
    }

    if (this.buttonMode) {
      $(this.buttonMode).data('bs.toggle')[this.state.heater_mode == 'pid' ? 'on' : 'off'](true);
    }
  }

  render() {

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      this.props.serverState.heatController ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-5' },
            'Temperature (ref.) :'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-4' },
            this.state.heater_reference_temperature ? this.state.heater_reference_temperature + "°C" : "N/A"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h4',
          null,
          'Control'
        ),
        __WEBPACK_IMPORTED_MODULE_3__app_environment_json___default.a.statuses.heat.switch !== false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-5' },
            'Polarity'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-4' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { 'data-toggle': 'toggle', type: 'checkbox', ref: el => this.buttonHeatCool = el, checked: this.state.heater_cooling, 'data-width': '100', 'data-height': '25' })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-5' },
            'Mode'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-lg-4' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { 'data-toggle': 'toggle', type: 'checkbox', ref: el => this.buttonMode = el, checked: this.state.heater_mode == 'pid', 'data-width': '100', 'data-height': '25' })
            )
          )
        ),
        this.state.heater_mode == 'pid' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            null,
            'PID control'
          ),
          this.state.pid_error && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert alert-danger' },
            'Error in setting the PID parameters.'
          ),
          this.state.pid_success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert alert-success' },
            'PID parameters updated !'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-lg-5' },
              'Target temperature:'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-lg-4' },
              this.state.heater_target_temperature ? this.state.heater_target_temperature + " °C" : 'N/A'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-lg-5' },
              'New target temperature:'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-lg-3' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'input-group input-group-sm' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', onChange: this.changeTargetTemperature, className: 'form-control', min: '10', max: '85', step: '0.5', value: this.state.input_heater_target_temperature }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  '\xB0C'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'input-group-btn' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.setTargetTemperature, type: 'button' },
                    'Set'
                  )
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  'Output:'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'em',
                    null,
                    'Duty cycle (0.0 - 1.0) '
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  'Input:'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'em',
                    null,
                    'Temperature error in \xB0C'
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  'Time unit:'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'small',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'em',
                    null,
                    'Seconds'
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'Kp (Prop.)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control input-sm', name: 'Kp', value: this.state.heater_cooling ? this.state.Kp_cooling : this.state.Kp_heating, onChange: this.handleInputChange })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'Kd (Differential)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control input-sm', name: 'Kd', value: this.state.heater_cooling ? this.state.Kd_cooling : this.state.Kd_heating, onChange: this.handleInputChange })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'Ki (Integral)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control input-sm', name: 'Ki', value: this.state.heater_cooling ? this.state.Ki_cooling : this.state.Ki_heating, onChange: this.handleInputChange })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'Bias'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control input-sm', name: 'bias', value: this.state.heater_cooling ? this.state.bias_cooling : this.state.bias_heating, onChange: this.handleInputChange })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-lg-5' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'button',
                  { className: 'btn btn-default btn-sm', onClick: this.setPIDParameters, type: 'button' },
                  'Update PID parameters'
                )
              )
            )
          )
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            null,
            'Fixed power'
          ),
          this.state.power_error && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert alert-danger' },
            'Error in setting the powers.'
          ),
          this.state.power_success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert alert-success' },
            'Power updated !'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'Current power'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-4' },
                this.state.heater_power ? this.state.heater_power * 100 + "%" : 'N/A'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-5' },
                'New power'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col-lg-3 input-group input-group-sm' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control', type: 'number', name: 'newpower', value: this.state.newpower, onChange: this.handleInputChange }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  '%'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'input-group-btn' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.setPower, type: 'button' },
                    'Set'
                  )
                )
              )
            )
          )
        )
      ) : null
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeatStatus);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_environment_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_url_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__queries__ = __webpack_require__(4);







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
		this.autoZero = this.autoZero.bind(this);
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

	async autoZero(event) {
		await Object(__WEBPACK_IMPORTED_MODULE_4__queries__["a" /* autoZero */])(this.props.config, this.props.instrumentId);
	}

	async changeAcquisitionSpeed(event) {

		let val = event.target.value;
		let result = await fetch(__WEBPACK_IMPORTED_MODULE_3_url_lib___default.a.formatUrl(`http://${this.props.config.trackerHost}:${this.props.config.trackerPort}/instrument.setAcquisitionSpeed`, {

			instrumentId: this.props.instrumentId,
			speed: val
		}));

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

		console.log(this.props);
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
			__WEBPACK_IMPORTED_MODULE_2__app_environment_json___default.a.instrument[this.props.instrumentId].autoZero === "instrument" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "row" },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "col-lg-5" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-cl btn-default btn-sm", onClick: this.autoZero },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							"span",
							null,
							"Auto-zero"
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "col-lg-4" })
			),
			__WEBPACK_IMPORTED_MODULE_2__app_environment_json___default.a.instrument[this.props.instrumentId].groups[this.props.name].resettable !== false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
			speedOptions.length > 0 && __WEBPACK_IMPORTED_MODULE_2__app_environment_json___default.a.instrument[this.props.instrumentId].changeSpeed !== false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_environment_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_environment_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_url_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_url_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__queries__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messages_jsx__ = __webpack_require__(32);









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
		this.state = {
			messages: []
		};

		this.wsUpdate = this.wsUpdate.bind(this);
	}

	componentDidUpdate() {
		if (this.atBottom) {
			this.logDiv.scrollTop = this.logDiv.scrollHeight;
		}
	}

	componentWillUpdate() {

		this.atBottom = this.logDiv.scrollTop >= this.logDiv.scrollHeight - 150;
	}

	componentDidMount() {

		__WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].on("instrument.log." + this.props.instrumentId, this.wsUpdate);
	}

	componentWillUnmount() {

		__WEBPACK_IMPORTED_MODULE_1_electron__["ipcRenderer"].removeListener("instrument.log." + this.props.instrumentId, this.wsUpdate);
	}

	wsUpdate(event, message) {

		this.state.messages.push(message);
		if (this.state.messages.length > 100) {
			this.state.messages.shift();
		}

		this.setState({
			message: this.state.message
		});
	}

	render() {

		const messages = this.state.messages.map(message => {

			switch (message.type) {

				case 'info':
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__messages_jsx__["b" /* MessageInfo */], message);
					break;

				case 'warning':
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__messages_jsx__["c" /* MessageWarning */], message);
					break;

				case 'error':
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__messages_jsx__["a" /* MessageError */], message);
					break;
			}
		});

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "col-lg-2 group-status group-status-instrument" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"h4",
				null,
				"Activity log"
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"div",
				{ className: "activityLog", ref: el => this.logDiv = el },
				messages.length > 0 ? messages : 'No message to display'
			)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (InstrumentStatus);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MessageWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MessageInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


const pad = val => {
	if (val < 10) {
		return "0" + val;
	}
	return val;
};

class Message extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor() {
		super();
	}

	render() {

		const time = this.props.time;
		const date = new Date(time);

		const timeText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
		const channel = this.props.channel ? `(Chan ${this.props.channel})` : ``;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: this.divClass },
			"[ ",
			timeText,
			" ]: ",
			channel,
			" ",
			this.props.message
		);
	}
}

class MessageError extends Message {
	constructor() {
		super();
		this.divClass = "text-danger";
	}
}

class MessageWarning extends Message {
	constructor() {
		super();
		this.divClass = "text-warning";
	}
}

class MessageInfo extends Message {
	constructor() {
		super();
		this.divClass = "text-info";
	}
}



/***/ }),
/* 33 */
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
/* 34 */
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