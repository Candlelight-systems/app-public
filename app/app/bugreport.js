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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_config__);




class BugReportForm extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor() {
		super(...arguments);

		this.state = {
			pending: false,
			issueTitle: "",
			issue: ""
		};
		this.submitBug = this.submitBug.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	submitBug() {

		var content = JSON.stringify({

			title: this.state.issueTitle,
			body: this.state.issue
		});

		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Content-Length", content.length.toString());
		headers.append("Accept", "application/vnd.github.v3+json");

		this.setState({ pending: true, failed: false });

		fetch("https://api.github.com/repos/Candlelight-systems/app-issues/issues?access_token=" + __WEBPACK_IMPORTED_MODULE_2__app_config___default.a.githubtokens.issuetracker, {

			method: "POST",
			headers: headers,
			body: content

		}).then(response => {

			var contenttype = response.headers.get("content-type");

			if (contenttype && contenttype.includes("application/json")) {

				return response.json();
			}
		}).then(json => {
			console.log(json);
			this.setState({ failed: false, success: true });
		}).catch(() => {

			this.setState({ failed: true, success: false });
		}).then(() => {

			this.setState({ pending: false });
		});
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "container" },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"form",
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"h3",
					null,
					"Report a bug"
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ htmlFor: "issueTitle" },
						"What is the name of your problem ?"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", name: "issueTitle", value: this.state.issueTitle, id: "issueTitle", className: "form-control", placeholder: "Name of the issue", onChange: this.handleInputChange })
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"label",
						{ htmlFor: "issue" },
						"Tell us about your problem"
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { id: "issue", name: "issue", value: this.state.issue, className: "form-control", rows: "12", placeholder: "Describe your issue here...", onChange: this.handleInputChange }),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"span",
						{ id: "helpBlock", className: "help-block" },
						"Try to be as comprehensive while describing your issue. This will help us find and fix the issue as soon as possible"
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"div",
					{ className: "form-group" },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						"button",
						{ type: "button", className: "btn btn-default " + (this.state.pending ? 'disabled' : ''), onClick: this.submitBug },
						"Submit bug"
					)
				),
				this.state.failed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"p",
					{ className: "bg-danger" },
					"Error in submitting the issue. Verify your internet connection. You may contact us at contact@candlelight-systems.com to report this problem"
				),
				this.state.success && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"p",
					{ className: "bg-success" },
					"Thank you for your contribution. We will review this issue as soon as possible."
				)
			)
		);
	}
}

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(BugReportForm, null), document.getElementById("root"));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"instruments":[{"trackerHost":"192.168.1.33","trackerName":"Main Instrument","trackerPort":8080,"trackerPortWS":8081}],"database":{"host":"192.168.1.34","username":"","password":"","port":8086,"db":"matahari"},"githubtokens":{"issuetracker":"81d7cb9ad6905e5a4e0cffbd4f47de13b0a2de4f"}}

/***/ })
/******/ ]);