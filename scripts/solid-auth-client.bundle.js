(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fetch"), require("window"), require("crypto"), require("TextEncoder"));
	else if(typeof define === 'function' && define.amd)
		define(["fetch", "window", "crypto", "TextEncoder"], factory);
	else if(typeof exports === 'object')
		exports["solid-auth-client"] = factory(require("fetch"), require("window"), require("crypto"), require("TextEncoder"));
	else
		root["solid"] = root["solid"] || {}, root["solid"]["auth"] = factory(root["fetch"], root["window"], root["crypto"], root["TextEncoder"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__47__, __WEBPACK_EXTERNAL_MODULE__49__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const SolidAuthClient = __webpack_require__(1).default; // Export a singleton instance of SolidAuthClient


const auth = new SolidAuthClient(); // Bind methods to instance, so they can be invoked as regular functions
// (e.g., to pass around the fetch function)

Object.getOwnPropertyNames(SolidAuthClient.prototype).forEach(property => {
  const value = auth[property];

  if (typeof value === 'function') {
    auth[property] = value.bind(auth);
  }
}); // Export the instance as an object for backward compatibility
// (should become a default export)

module.exports = auth; // Expose window.SolidAuthClient for backward compatibility

if (typeof window !== 'undefined') {
  if ('SolidAuthClient' in window) {
    console.warn('Caution: multiple versions of solid-auth-client active.');
  } else {
    let warned = false;
    Object.defineProperty(window, 'SolidAuthClient', {
      enumerable: true,
      get: () => {
        if (!warned) {
          warned = true;
          console.warn('window.SolidAuthClient has been deprecated.');
          console.warn('Please use window.solid.auth instead.');
        }

        return auth;
      }
    });
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SolidAuthClient; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _authn_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _url_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _webid_oidc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);


/* global fetch */






 // Store the global fetch, so the user is free to override it

const globalFetch = fetch;
class SolidAuthClient extends events__WEBPACK_IMPORTED_MODULE_1___default.a {
  fetch(input, options) {
    return Object(_authn_fetch__WEBPACK_IMPORTED_MODULE_2__["authnFetch"])(Object(_storage__WEBPACK_IMPORTED_MODULE_5__["defaultStorage"])(), globalFetch, input, options);
  }

  login(idp, options) {
    options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultLoginOptions(Object(_url_util__WEBPACK_IMPORTED_MODULE_6__["currentUrlNoParams"])()), options);
    return _webid_oidc__WEBPACK_IMPORTED_MODULE_7__["login"](idp, options);
  }

  async popupLogin(options) {
    options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultLoginOptions(), options);

    if (!/https?:/.test(options.popupUri)) {
      options.popupUri = new URL(options.popupUri || '/.well-known/solid/login', window.location).toString();
    }

    if (!options.callbackUri) {
      options.callbackUri = options.popupUri;
    }

    const popup = Object(_popup__WEBPACK_IMPORTED_MODULE_3__["openIdpPopup"])(options.popupUri);
    const session = await Object(_popup__WEBPACK_IMPORTED_MODULE_3__["obtainSession"])(options.storage, popup, options);
    this.emit('login', session);
    this.emit('session', session);
    return session;
  }

  async currentSession(storage = Object(_storage__WEBPACK_IMPORTED_MODULE_5__["defaultStorage"])()) {
    let session = await Object(_session__WEBPACK_IMPORTED_MODULE_4__["getSession"])(storage);

    if (!session) {
      try {
        session = await _webid_oidc__WEBPACK_IMPORTED_MODULE_7__["currentSession"](storage);
      } catch (err) {
        console.error(err);
      }

      if (session) {
        this.emit('login', session);
        this.emit('session', session);
        await Object(_session__WEBPACK_IMPORTED_MODULE_4__["saveSession"])(storage)(session);
      }
    }

    return session;
  }

  async trackSession(callback) {
    /* eslint-disable standard/no-callback-literal */
    callback((await this.currentSession()));
    this.on('session', callback);
  }

  async logout(storage = Object(_storage__WEBPACK_IMPORTED_MODULE_5__["defaultStorage"])()) {
    const session = await Object(_session__WEBPACK_IMPORTED_MODULE_4__["getSession"])(storage);

    if (session) {
      try {
        await _webid_oidc__WEBPACK_IMPORTED_MODULE_7__["logout"](storage);
        this.emit('logout');
        this.emit('session', null);
      } catch (err) {
        console.warn('Error logging out:');
        console.error(err);
      }

      await Object(_session__WEBPACK_IMPORTED_MODULE_4__["clearSession"])(storage);
    }
  }

}

function defaultLoginOptions(url) {
  return {
    callbackUri: url ? url.split('#')[0] : '',
    popupUri: '',
    storage: Object(_storage__WEBPACK_IMPORTED_MODULE_5__["defaultStorage"])()
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(3);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authnFetch", function() { return authnFetch; });
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _host__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _webid_oidc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);





async function authnFetch(storage, fetch, input, options) {
  // If not authenticated, perform a regular fetch
  const session = await Object(_session__WEBPACK_IMPORTED_MODULE_3__["getSession"])(storage);

  if (!session) {
    return fetch(input, options);
  } // If we know the server expects credentials, send them


  if (await shouldShareCredentials(storage, input)) {
    return Object(_webid_oidc__WEBPACK_IMPORTED_MODULE_4__["fetchWithCredentials"])(session, fetch, input, options);
  } // If we don't know for sure, try a regular fetch first


  let resp = await fetch(input, options); // If the server then requests credentials, send them

  if (resp.status === 401) {
    await Object(_host__WEBPACK_IMPORTED_MODULE_2__["updateHostFromResponse"])(storage)(resp);

    if (await shouldShareCredentials(storage, input)) {
      resp = Object(_webid_oidc__WEBPACK_IMPORTED_MODULE_4__["fetchWithCredentials"])(session, fetch, input, options);
    }
  }

  return resp;
}

async function shouldShareCredentials(storage, input) {
  const requestHost = await Object(_host__WEBPACK_IMPORTED_MODULE_2__["getHost"])(storage)(Object(_url_util__WEBPACK_IMPORTED_MODULE_1__["toUrlString"])(input));
  return requestHost != null && requestHost.requiresAuth;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentUrl", function() { return currentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentUrlNoParams", function() { return currentUrlNoParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return navigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "originOf", function() { return originOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUrlString", function() { return toUrlString; });
/* eslint-env browser */
const currentUrl = () => window.location.href;
const currentUrlNoParams = () => window.location.origin + window.location.pathname;
const navigateTo = url => {
  window.location.href = url;
};
const originOf = url => new URL(url).origin;
const toUrlString = url => {
  if (typeof url !== 'string') {
    url = 'url' in url ? url.url : url.toString();
  }

  return new URL(url, currentUrl()).toString();
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHost", function() { return getHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveHost", function() { return saveHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHostFromResponse", function() { return updateHostFromResponse; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _webid_oidc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);


/* globalRequest, Response, URL */



function getHost(storage) {
  return async url => {
    const _ref = new URL(url),
          host = _ref.host;

    const session = await Object(_session__WEBPACK_IMPORTED_MODULE_1__["getSession"])(storage);

    if (session && host === new URL(session.idp).host) {
      return {
        url: host,
        requiresAuth: true
      };
    }

    const _ref2 = await Object(_storage__WEBPACK_IMPORTED_MODULE_2__["getData"])(storage),
          hosts = _ref2.hosts;

    return hosts && hosts[host];
  };
}
function saveHost(storage) {
  return async ({
    url,
    requiresAuth
  }) => {
    await Object(_storage__WEBPACK_IMPORTED_MODULE_2__["updateStorage"])(storage, data => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
      hosts: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data.hosts, {
        [url]: {
          requiresAuth
        }
      })
    }));
  };
}
function updateHostFromResponse(storage) {
  return async resp => {
    if (_webid_oidc__WEBPACK_IMPORTED_MODULE_3__["requiresAuth"](resp)) {
      const _ref3 = new URL(resp.url),
            host = _ref3.host;

      await saveHost(storage)({
        url: host,
        requiresAuth: true
      });
    }
  };
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSession", function() { return getSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSession", function() { return saveSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSession", function() { return clearSession; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);


async function getSession(storage) {
  const data = await Object(_storage__WEBPACK_IMPORTED_MODULE_1__["getData"])(storage);
  return data.session || null;
}
function saveSession(storage) {
  return async session => {
    const data = await Object(_storage__WEBPACK_IMPORTED_MODULE_1__["updateStorage"])(storage, data => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
      session
    }));
    return data.session;
  };
}
async function clearSession(storage) {
  await Object(_storage__WEBPACK_IMPORTED_MODULE_1__["updateStorage"])(storage, data => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
    session: null
  }));
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMESPACE", function() { return NAMESPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultStorage", function() { return defaultStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStorage", function() { return updateStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncStorage", function() { return asyncStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memStorage", function() { return memStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ipcStorage", function() { return ipcStorage; });
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);

const NAMESPACE = 'solid-auth-client';
const defaultStorage = () => {
  try {
    if (window && window.localStorage) {
      return asyncStorage(window.localStorage);
    }
  } catch (e) {
    if (!(e instanceof ReferenceError)) {
      throw e;
    }
  }

  console.warn(`'window.localStorage' unavailable.  ` + `Creating a (not very useful) in-memory storage object as the default storage interface.`);
  return asyncStorage(memStorage());
};
/**
 * Gets the deserialized stored data
 */

async function getData(store) {
  let serialized;
  let data;

  try {
    serialized = await store.getItem(NAMESPACE);
    data = JSON.parse(serialized || '{}');
  } catch (e) {
    console.warn('Could not deserialize data:', serialized);
    console.error(e);
    data = {};
  }

  return data;
}
/**
 * Updates a Storage object without mutating its intermediate representation.
 */

async function updateStorage(store, update) {
  const currentData = await getData(store);
  const newData = update(currentData);
  await store.setItem(NAMESPACE, JSON.stringify(newData));
  return newData;
}
/**
 * Takes a synchronous storage interface and wraps it with an async interface.
 */

function asyncStorage(storage) {
  return {
    getItem: key => {
      return Promise.resolve(storage.getItem(key));
    },
    setItem: (key, val) => {
      return Promise.resolve(storage.setItem(key, val));
    },
    removeItem: key => {
      return Promise.resolve(storage.removeItem(key));
    }
  };
}
const memStorage = () => {
  const store = {};
  return {
    getItem: key => {
      if (typeof store[key] === 'undefined') return null;
      return store[key];
    },
    setItem: (key, val) => {
      store[key] = val;
    },
    removeItem: key => {
      delete store[key];
    }
  };
};
function ipcStorage(client) {
  return {
    getItem: key => client.request('storage/getItem', key),
    setItem: (key, val) => client.request('storage/setItem', key, val),
    removeItem: key => client.request('storage/removeItem', key)
  };
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Server", function() { return Server; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return Client; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


/*
  This module describes a simple IPC interface for communicating between browser windows.
  window.postMessage() is the transport interface, and a request/response interface
  is defined on top of it as follows:

  const request = {
    'solid-auth-client': {
      id: 1234,
      method: 'doSomethingPlease',
      args: [ 'one', 'two', 'three' ]
    }
  }

  const response = {
    'solid-auth-client': {
      id: 1234,
      ret: 'the_value'
    }
  }
*/
const NAMESPACE = 'solid-auth-client';
/**
 * Receives and handles remote procedure calls.
 */

class Server {
  constructor(clientWindow, clientOrigin, handle) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_clientWindow", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_clientOrigin", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_handler", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_messageListener", void 0);

    this._clientWindow = clientWindow;
    this._clientOrigin = clientOrigin;
    this._handler = handle;

    this._messageListener = event => this._handleMessage(event);
  }

  async _handleMessage({
    data,
    origin
  }) {
    // Ensure we can post to the origin
    if (origin !== this._clientOrigin) {
      console.warn(`solid-auth-client is listening to ${this._clientOrigin} ` + `so ignored a message received from ${origin}.`);
      return;
    } // Parse the request and send it to the handler


    const req = data && data[NAMESPACE];

    if (req && req.method) {
      const _ref = req,
            id = _ref.id,
            method = _ref.method,
            args = _ref.args;
      const ret = await this._handler(method, ...args);

      this._clientWindow.postMessage({
        [NAMESPACE]: {
          id,
          ret
        }
      }, this._clientOrigin);
    }
  }

  start() {
    window.addEventListener('message', this._messageListener);
  }

  stop() {
    window.removeEventListener('message', this._messageListener);
  }

}
/**
 * Makes remote procedure calls.
 */

class Client {
  constructor(serverWindow, serverOrigin) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_serverWindow", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_serverOrigin", void 0);

    this._serverWindow = serverWindow;
    this._serverOrigin = serverOrigin;
  }

  request(method, ...args) {
    // Send the request as a message to the server window
    const id = Math.random();

    this._serverWindow.postMessage({
      [NAMESPACE]: {
        id,
        method,
        args
      }
    }, this._serverOrigin); // Create a promise that resolves to the request's return value


    return new Promise((resolve, reject) => {
      // Listen for responses to the request
      window.addEventListener('message', responseListener); // Cancel if the response takes too long

      const timeout = setTimeout(() => {
        reject(new Error('Could not connect to main window.'));
        window.removeEventListener('message', responseListener);
      }, 2000); // Processes a possible response to the request

      function responseListener({
        data
      }) {
        const resp = data && data[NAMESPACE];

        if (resp && resp.id === id && resp.hasOwnProperty('ret')) {
          resolve(resp.ret);
          clearTimeout(timeout);
          window.removeEventListener('message', responseListener);
        }
      }
    });
  }

}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentSession", function() { return currentSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegisteredRp", function() { return getRegisteredRp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requiresAuth", function() { return requiresAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWithCredentials", function() { return fetchWithCredentials; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auth_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var auth_header__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth_header__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solid_oidc_rp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _solid_oidc_rp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_solid_oidc_rp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _solid_oidc_rp_lib_PoPToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78);
/* harmony import */ var _solid_oidc_rp_lib_PoPToken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_solid_oidc_rp_lib_PoPToken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _url_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);


/* global RequestInfo, Response */





async function login(idp, options) {
  try {
    const rp = await getRegisteredRp(idp, options);
    await saveAppHashFragment(options.storage);
    return sendAuthRequest(rp, options);
  } catch (err) {
    console.warn('Error logging in with WebID-OIDC');
    console.error(err);
    return null;
  }
}
async function currentSession(storage = Object(_storage__WEBPACK_IMPORTED_MODULE_5__["defaultStorage"])()) {
  try {
    const rp = await getStoredRp(storage);

    if (!rp) {
      return null;
    }

    const url = Object(_url_util__WEBPACK_IMPORTED_MODULE_4__["currentUrl"])();

    if (!/#(.*&)?access_token=/.test(url)) {
      return null;
    }

    const storeData = await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["getData"])(storage);
    const session = await rp.validateResponse(url, storeData);

    if (!session) {
      return null;
    }

    await restoreAppHashFragment(storage);
    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, session, {
      webId: session.idClaims.sub,
      idp: session.issuer
    });
  } catch (err) {
    console.warn('Error finding a WebID-OIDC session');
    console.error(err);
    return null;
  }
}
async function logout(storage) {
  const rp = await getStoredRp(storage);

  if (rp) {
    try {
      rp.logout();
    } catch (err) {
      console.warn('Error logging out of the WebID-OIDC session');
      console.error(err);
    }
  }
}
async function getRegisteredRp(idp, options) {
  // To reuse a possible previous RP,
  // it be for the same IDP and redirect URI
  let rp = await getStoredRp(options.storage);

  if (!rp || rp.provider.url !== idp || !rp.registration.redirect_uris.includes(options.callbackUri)) {
    // Register a new RP
    rp = await registerRp(idp, options);
    await storeRp(options.storage, idp, rp);
  }

  return rp;
}

async function getStoredRp(storage) {
  const data = await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["getData"])(storage);
  const rpConfig = data.rpConfig;

  if (rpConfig) {
    rpConfig.store = storage;
    return _solid_oidc_rp__WEBPACK_IMPORTED_MODULE_2___default.a.from(rpConfig);
  } else {
    return null;
  }
}

async function storeRp(storage, idp, rp) {
  await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["updateStorage"])(storage, data => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
    rpConfig: rp
  }));
  return rp;
}

function registerRp(idp, {
  storage,
  callbackUri
}) {
  const responseType = 'id_token token';
  const registration = {
    issuer: idp,
    grant_types: ['implicit'],
    redirect_uris: [callbackUri],
    response_types: [responseType],
    scope: 'openid profile'
  };
  const options = {
    defaults: {
      authenticate: {
        redirect_uri: callbackUri,
        response_type: responseType
      }
    },
    store: storage
  };
  return _solid_oidc_rp__WEBPACK_IMPORTED_MODULE_2___default.a.register(idp, registration, options);
}

async function sendAuthRequest(rp, {
  callbackUri,
  storage
}) {
  const data = await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["getData"])(storage);
  const url = await rp.createRequest({
    redirect_uri: callbackUri
  }, data);
  await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["updateStorage"])(storage, () => data);
  return Object(_url_util__WEBPACK_IMPORTED_MODULE_4__["navigateTo"])(url);
}

async function saveAppHashFragment(store) {
  await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["updateStorage"])(store, data => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, data, {
    appHashFragment: window.location.hash
  }));
}

async function restoreAppHashFragment(store) {
  await Object(_storage__WEBPACK_IMPORTED_MODULE_5__["updateStorage"])(store, data => {
    window.location.hash = data.appHashFragment;
    delete data.appHashFragment;
    return data;
  });
}
/**
 * Answers whether a HTTP response requires WebID-OIDC authentication.
 */


function requiresAuth(resp) {
  if (resp.status !== 401) {
    return false;
  }

  const wwwAuthHeader = resp.headers.get('www-authenticate');

  if (!wwwAuthHeader) {
    return false;
  }

  const auth = auth_header__WEBPACK_IMPORTED_MODULE_1__["parse"](wwwAuthHeader);
  return auth.scheme === 'Bearer' && auth.params && auth.params.scope === 'openid webid';
}
/**
 * Fetches a resource, providing the WebID-OIDC ID Token as authentication.
 * Assumes that the resource has requested those tokens in a previous response.
 */

async function fetchWithCredentials(session, fetch, input, options) {
  const popToken = await _solid_oidc_rp_lib_PoPToken__WEBPACK_IMPORTED_MODULE_3___default.a.issueFor(Object(_url_util__WEBPACK_IMPORTED_MODULE_4__["toUrlString"])(input), session);

  const authenticatedOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options, {
    credentials: 'include',
    headers: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options && options.headers ? options.headers : {}, {
      authorization: `Bearer ${popToken}`
    })
  });

  return fetch(input, authenticatedOptions);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function get() {
    return _format.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
});

var _format = _interopRequireDefault(__webpack_require__(14));

var _parse = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__(15);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var xxx = function xxx(key) {
  return function (value) {
    return `${key}=${value && !(0, _util.isToken)(value) ? (0, _util.quote)(value) : value}`;
  };
};

var build = function build(params) {
  return params.reduce(function (prev, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        values = _ref2[1];

    var transform = xxx(key);

    if (!(0, _util.isToken)(key)) {
      throw new TypeError();
    }

    if (Array.isArray(values)) {
      return _toConsumableArray(prev).concat(_toConsumableArray(values.map(transform)));
    }

    return _toConsumableArray(prev).concat([transform(values)]);
  }, []);
};

var challenge = function challenge(params, options) {
  if (Array.isArray(params)) {
    return build(params);
  } else if (typeof params === 'object') {
    var entries = params;
    return challenge(Object.keys(params).map(function (key) {
      return [key, entries[key]];
    }), options);
  }

  throw new TypeError();
};

var _default = function _default(scheme, token, params) {
  var obj = typeof scheme === 'string' ? {
    scheme,
    token,
    params
  } : scheme;

  if (typeof obj !== 'object') {
    throw new TypeError();
  } else if (!(0, _util.isScheme)(obj.scheme)) {
    throw new TypeError('Invalid scheme.');
  }

  return [obj.scheme].concat(_toConsumableArray(typeof obj.token !== 'undefined' ? [obj.token] : []), _toConsumableArray(typeof obj.params !== 'undefined' ? challenge(obj.params) : [])).join(' ');
};

exports.default = _default;
//# sourceMappingURL=format.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unquote = exports.quote = exports.isScheme = exports.isToken = void 0;
var token = /^[^\u0000-\u001F\u007F()<>@,;:\\"/?={}\[\]\u0020\u0009]+$/;

var isToken = function isToken(str) {
  return typeof str === 'string' && token.test(str);
};

exports.isToken = isToken;
var isScheme = isToken;
exports.isScheme = isScheme;

var quote = function quote(str) {
  return `"${str.replace(/"/g, '\\"')}"`;
};

exports.quote = quote;

var unquote = function unquote(str) {
  return str.substr(1, str.length - 2).replace(/\\"/g, '"');
};

exports.unquote = unquote;
//# sourceMappingURL=util.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__(15);

// lol dis
var body = /((?:[a-zA-Z0-9._~+\/-]+=*(?:\s+|$))|[^\u0000-\u001F\u007F()<>@,;:\\"/?={}\[\]\u0020\u0009]+)(?:=([^\\"=\s,]+|"(?:[^"\\]|\\.)*"))?/g; // eslint-disable-line

var normalize = function normalize(prev, _cur) {
  // Fixup quoted strings and tokens with spaces around them
  var cur = _cur.charAt(0) === '"' ? (0, _util.unquote)(_cur) : _cur.trim(); // Marshal

  if (Array.isArray(prev)) {
    return prev.concat(cur);
  } else if (typeof prev === 'string') {
    return [prev, cur];
  }

  return cur;
};

var parseProperties = function parseProperties(scheme, string) {
  var token = null;
  var params = {}; // eslint-disable-next-line no-constant-condition

  while (true) {
    var res = body.exec(string);

    if (res === null) {
      break;
    }

    if (res[2]) {
      params[res[1]] = normalize(params[res[1]], res[2]);
    } else {
      token = normalize(token, res[1]);
    }
  }

  return {
    scheme,
    params,
    token
  };
};

var _default = function _default(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Header value must be a string.');
  }

  var start = str.indexOf(' ');
  var scheme = str.substr(0, start);

  if (!(0, _util.isScheme)(scheme)) {
    throw new TypeError(`Invalid scheme ${scheme}`);
  }

  return parseProperties(scheme, str.substr(start));
};

exports.default = _default;
//# sourceMappingURL=parse.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Dependencies
 */
const assert = __webpack_require__(20);

const fetch = __webpack_require__(6);

const {
  URL
} = __webpack_require__(25);

const Headers = fetch.Headers ? fetch.Headers : global.Headers;

const {
  JSONDocument
} = __webpack_require__(26);

const {
  JWKSet
} = __webpack_require__(35);

const AuthenticationRequest = __webpack_require__(66);

const AuthenticationResponse = __webpack_require__(68);

const RelyingPartySchema = __webpack_require__(77);

const onHttpError = __webpack_require__(72);

const FormUrlEncoded = __webpack_require__(67);
/**
 * RelyingParty
 *
 * @class
 * Client interface for OpenID Connect Relying Party.
 *
 * @example
 *  let client = RelyingParty({
 *    provider: {
 *      name: 'Anvil Research, Inc.',
 *      url: 'https://forge.anvil.io'
 *      // configuration
 *      // jwks
 *    },
 *    defaults: {
 *      popToken: false,
 *      authenticate: {
 *        response_type: 'code',
 *        display: 'popup',
 *        scope: 'openid profile email'
 *      },
 *      register: {
 *        client_name: 'Example',
 *        client_uri: 'https://example.com',
 *        logo_uri: 'https://example.com/assets/logo.png',
 *        redirect_uris: ['https://app.example.com/callback'],
 *        response_types: ['code', 'code id_token token'],
 *        grant_types: ['authorization_code'],
 *        default_max_age: 7200,
 *        post_logout_redirect_uris: ['https://app.example.com']
 *      },
 *    },
 *    registration: {
 *      // if you have it saved somewhere
 *    },
 *    store: localStorage || req.session
 *  })
 *
 *  client.discover() => Promise
 *  client.jwks() => Promise
 *  client.authenticate()
 *  client.authenticateUri()
 *  client.validateResponse(uri) => Promise
 *  client.userinfo() => Promise
 *  client.logout()
 */


class RelyingParty extends JSONDocument {
  /**
   * Schema
   */
  static get schema() {
    return RelyingPartySchema;
  }
  /**
   * from
   *
   * @description
   * Create a RelyingParty instance from a previously registered client.
   *
   * @param {Object} data
   * @returns {Promise<RelyingParty>}
   */


  static from(data) {
    let rp = new RelyingParty(data);
    let validation = rp.validate(); // schema validation

    if (!validation.valid) {
      return Promise.reject(new Error(JSON.stringify(validation)));
    }

    let jwks = rp.provider.jwks; // request the JWK Set if missing

    if (!jwks) {
      return rp.jwks().then(() => rp);
    } // otherwise import the JWK Set to webcrypto


    return JWKSet.importKeys(jwks).then(jwks => {
      rp.provider.jwks = jwks;
      return rp;
    });
  }
  /**
   * register
   *
   * @param issuer {string} Provider URL
   * @param registration {Object} Client dynamic registration options
   * @param options {Object}
   * @param options.defaults
   * @param [options.store] {Session|Storage}
   * @returns {Promise<RelyingParty>} RelyingParty instance, registered.
   */


  static register(issuer, registration, options) {
    let rp = new RelyingParty({
      provider: {
        url: issuer
      },
      defaults: Object.assign({}, options.defaults),
      store: options.store
    });
    return Promise.resolve().then(() => rp.discover()).then(() => rp.jwks()).then(() => rp.register(registration)).then(() => rp);
  }
  /**
   * Discover
   *
   * @description Fetches the issuer's OpenID Configuration.
   * @returns {Promise<Object>} Resolves with the provider configuration response
   */


  discover() {
    try {
      let issuer = this.provider.url;
      assert(issuer, 'RelyingParty provider must define "url"');
      let url = new URL(issuer);
      url.pathname = '.well-known/openid-configuration';
      return fetch(url.toString()).then(onHttpError('Error fetching openid configuration')).then(response => {
        return response.json().then(json => this.provider.configuration = json);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * Register
   *
   * @description Register's a client with provider as a Relying Party
   *
   * @param options {Object}
   * @returns {Promise<Object>} Resolves with the registration response object
   */


  register(options) {
    try {
      let configuration = this.provider.configuration;
      assert(configuration, 'OpenID Configuration is not initialized.');
      assert(configuration.registration_endpoint, 'OpenID Configuration is missing registration_endpoint.');
      let uri = configuration.registration_endpoint;
      let method = 'post';
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let params = this.defaults.register;
      let body = JSON.stringify(Object.assign({}, params, options));
      return fetch(uri, {
        method,
        headers,
        body
      }).then(onHttpError('Error registering client')).then(response => {
        return response.json().then(json => this.registration = json);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  serialize() {
    return JSON.stringify(this);
  }
  /**
   * jwks
   *
   * @description Promises the issuer's JWK Set.
   * @returns {Promise}
   */


  jwks() {
    try {
      let configuration = this.provider.configuration;
      assert(configuration, 'OpenID Configuration is not initialized.');
      assert(configuration.jwks_uri, 'OpenID Configuration is missing jwks_uri.');
      let uri = configuration.jwks_uri;
      return fetch(uri).then(onHttpError('Error resolving provider keys')).then(response => {
        return response.json().then(json => JWKSet.importKeys(json)).then(jwks => this.provider.jwks = jwks);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * createRequest
   *
   * @param options {Object} Authn request options hashmap
   * @param options.redirect_uri {string}
   * @param options.response_type {string} e.g. 'code' or 'id_token token'
   * @param session {Session|Storage} req.session or localStorage
   * @returns {Promise<string>} Authn request URL
   */


  createRequest(options, session) {
    return AuthenticationRequest.create(this, options, session || this.store);
  }
  /**
   * Validate Response
   *
   * @param response {string} req.query or req.body.text
   * @param session {Session|Storage} req.session or localStorage or similar
   *
   * @returns {Promise<Session>}
   */


  validateResponse(response, session = this.store) {
    let options;

    if (response.match(/^http(s?):\/\//)) {
      options = {
        rp: this,
        redirect: response,
        session
      };
    } else {
      options = {
        rp: this,
        body: response,
        session
      };
    }

    const authResponse = new AuthenticationResponse(options);
    return AuthenticationResponse.validateResponse(authResponse);
  }
  /**
   * userinfo
   *
   * @description Promises the authenticated user's claims.
   * @returns {Promise}
   */


  userinfo() {
    try {
      let configuration = this.provider.configuration;
      assert(configuration, 'OpenID Configuration is not initialized.');
      assert(configuration.userinfo_endpoint, 'OpenID Configuration is missing userinfo_endpoint.');
      let uri = configuration.userinfo_endpoint;
      let access_token = this.store.access_token;
      assert(access_token, 'Missing access token.');
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      });
      return fetch(uri, {
        headers
      }).then(onHttpError('Error fetching userinfo')).then(response => response.json());
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * logoutRequest
   *
   * Composes and returns the logout request URI, based on the OP's
   * `end_session_endpoint`, with appropriate parameters.
   *
   * Note: Calling client code has the responsibility to clear the local
   * session state (for example, by calling `rp.clearSession()`). In addition,
   * some IdPs (such as Google) may not provide an `end_session_endpoint`,
   * in which case, this method will return null.
   *
   * @see https://openid.net/specs/openid-connect-session-1_0.html#RPLogout
   *
   * @throws {Error} If provider config is not initialized
   *
   * @throws {Error} If `post_logout_redirect_uri` was provided without a
   *   corresponding `id_token_hint`
   *
   * @param [options={}] {object}
   *
   * @param [options.id_token_hint] {string} RECOMMENDED.
   *   Previously issued ID Token passed to the logout endpoint as
   *   a hint about the End-User's current authenticated session with the
   *   Client. This is used as an indication of the identity of the End-User
   *   that the RP is requesting be logged out by the OP. The OP *need not* be
   *   listed as an audience of the ID Token when it is used as an
   *   `id_token_hint` value.
   *
   * @param [options.post_logout_redirect_uri] {string} OPTIONAL. URL to which
   *   the RP is requesting that the End-User's User Agent be redirected after
   *   a logout has been performed. The value MUST have been previously
   *   registered with the OP, either using the `post_logout_redirect_uris`
   *   Registration parameter or via another mechanism. If supplied, the OP
   *   SHOULD honor this request following the logout.
   *
   *   Note: The requirement to validate the uri for previous registration means
   *   that, in practice, the `id_token_hint` is REQUIRED if
   *   `post_logout_redirect_uri` is used. Otherwise, the OP has no way to get
   *   the `client_id` to load the saved client registration, to validate the
   *   uri. The only way it can get it is by decoding the `id_token_hint`.
   *
   * @param [options.state] {string} OPTIONAL. Opaque value used by the RP to
   *   maintain state between the logout request and the callback to the
   *   endpoint specified by the `post_logout_redirect_uri` query parameter. If
   *   included in the logout request, the OP passes this value back to the RP
   *   using the `state` query parameter when redirecting the User Agent back to
   *   the RP.
   *
   * TODO: In the future, consider adding `response_mode` param, for the OP to
   *   determine how to return the `state` back the RP.
   *   @see http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes
   *
   * TODO: Handle special cases for popular providers (Google, MSFT)
   *
   * @returns {string|null} Logout uri (or null if no end_session_endpoint was
   *   provided in the IdP config)
   */


  logoutRequest(options = {}) {
    const {
      id_token_hint,
      post_logout_redirect_uri,
      state
    } = options;
    let configuration;
    assert(this.provider, 'OpenID Configuration is not initialized');
    configuration = this.provider.configuration;
    assert(configuration, 'OpenID Configuration is not initialized');

    if (!configuration.end_session_endpoint) {
      console.log(`OpenId Configuration for ` + `${configuration.issuer} is missing end_session_endpoint`);
      return null;
    }

    if (post_logout_redirect_uri && !id_token_hint) {
      throw new Error('id_token_hint is required when using post_logout_redirect_uri');
    }

    const params = {};

    if (id_token_hint) {
      params.id_token_hint = id_token_hint;
    }

    if (post_logout_redirect_uri) {
      params.post_logout_redirect_uri = post_logout_redirect_uri;
    }

    if (state) {
      params.state = state;
    }

    const url = new URL(configuration.end_session_endpoint);
    url.search = FormUrlEncoded.encode(params);
    return url.href;
  }
  /**
   * Logout
   *
   * @deprecated
   *
   * TODO: Add deprecation warnings, then remove. Client code should
   *   use `logoutRequest()` instead
   *
   * @returns {Promise}
   */


  logout() {
    let configuration;

    try {
      assert(this.provider, 'OpenID Configuration is not initialized.');
      configuration = this.provider.configuration;
      assert(configuration, 'OpenID Configuration is not initialized.');
      assert(configuration.end_session_endpoint, 'OpenID Configuration is missing end_session_endpoint.');
    } catch (error) {
      return Promise.reject(error);
    }

    if (!configuration.end_session_endpoint) {
      this.clearSession();
      return Promise.resolve(undefined);
    }

    let uri = configuration.end_session_endpoint;
    let method = 'get';
    return fetch(uri, {
      method,
      credentials: 'include'
    }).then(onHttpError('Error logging out')).then(() => this.clearSession()); // TODO: Validate `frontchannel_logout_uri` if necessary

    /**
     * frontchannel_logout_uri - OPTIONAL. RP URL that will cause the RP to log
     * itself out when rendered in an iframe by the OP.
     *
     * An `iss` (issuer) query parameter and a `sid`
     * (session ID) query parameter MAY be included by the OP to enable the RP
     * to validate the request and to determine which of the potentially
     * multiple sessions is to be logged out. If a sid (session ID) query
     * parameter is included, an iss (issuer) query parameter MUST also be
     * included.
     * @see https://openid.net/specs/openid-connect-frontchannel-1_0.html#RPLogout
     */
  }

  clearSession() {
    let session = this.store;

    if (!session) {
      return;
    }

    delete session[SESSION_PRIVATE_KEY];
  }
  /**
   * @param uri {string} Target Resource Server URI
   * @param idToken {IDToken} ID Token to be embedded in the PoP token
   *
   * @returns {Promise<PoPToken>}
   */


  popTokenFor(uri, idToken) {
    return PoPToken.issueFor(uri, idToken);
  }

}

const SESSION_PRIVATE_KEY = 'oidc.session.privateKey';
RelyingParty.SESSION_PRIVATE_KEY = SESSION_PRIVATE_KEY;
module.exports = RelyingParty;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(21);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(23);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(24);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19), __webpack_require__(22)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Formats: __webpack_require__(27),
  Initializer: __webpack_require__(28),
  JSONDocument: __webpack_require__(29),
  JSONMapping: __webpack_require__(32),
  JSONPatch: __webpack_require__(30),
  JSONPointer: __webpack_require__(31),
  JSONSchema: __webpack_require__(33),
  Validator: __webpack_require__(34)
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * JSON Schema Formats
 *
 * TODO
 * Is there a good way to express these over multiple lines with comments
 * for easier debugging and auditing?
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DATETIME_REGEXP = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i;
var URI_REGEXP = /^(?:[a-z][a-z0-9+-.]*)?(?:\:|\/)\/?[^\s]*$/i;
var EMAIL_REGEXP = /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
var IPV4_REGEXP = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var IPV6_REGEXP = /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i;
var HOSTNAME_REGEXP = /^[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?(\.[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?)*$/i;

/**
 * Formats
 */

var Formats = function () {
  function Formats() {
    _classCallCheck(this, Formats);
  }

  _createClass(Formats, [{
    key: 'register',


    /**
     * Register
     *
     * @description
     * Register a new mapping from named format to RegExp instance
     *
     * TODO
     * We can do some extra validation of the RegExp to
     * ensure it's the acceptable subset of RegExps allowed
     * by JSON Schema.
     *
     * @param {string} name
     * @param {RegExp} pattern
     * @returns {RegExp}
     */
    value: function register(name, pattern) {
      // verify name is a string
      if (typeof name !== 'string') {
        throw new Error('Format name must be a string');
      }

      // cast a string to RegExp
      if (typeof pattern === 'string') {
        pattern = new RegExp(pattern);
      }

      return this[name] = pattern;
    }

    /**
     * Resolve
     *
     * @description
     * Given a format name, return the corresponding registered validation. In the
     * event a format is not registered, throw an error.
     *
     * @param {string} name
     * @returns {RegExp}
     */

  }, {
    key: 'resolve',
    value: function resolve(name) {
      var format = this[name];

      if (!format) {
        throw new Error('Unknown JSON Schema format.');
      }

      return format;
    }

    /**
     * Test
     *
     * @description
     * Test that a value conforms to a format.
     *
     * @param {string} name
     * @param {string} value
     * @returns {Boolean}
     */

  }, {
    key: 'test',
    value: function test(name, value) {
      var format = this.resolve(name);
      return format.test(value);
    }
  }], [{
    key: 'initialize',


    /**
     * Initialize
     *
     * @description
     * Create a new Formats instance and register default formats
     *
     * @returns {Formats}
     */
    value: function initialize() {
      var formats = new Formats();
      formats.register('date-time', DATETIME_REGEXP);
      formats.register('uri', URI_REGEXP);
      formats.register('email', EMAIL_REGEXP);
      formats.register('ipv4', IPV4_REGEXP);
      formats.register('ipv6', IPV6_REGEXP);
      formats.register('hostname', HOSTNAME_REGEXP);
      return formats;
    }
  }]);

  return Formats;
}();

/**
 * Export
 */


module.exports = Formats.initialize();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Initializer
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Initializer = function () {

  /**
   * constructor
   */
  function Initializer(schema, options) {
    _classCallCheck(this, Initializer);

    Object.assign(this, options || {});
    this.root = this.root || this;

    this.root.depth = this.root.depth || 1;

    if (this.level > this.root.depth) {
      this.root.depth = this.level;
    }

    this.level = this.level || 0;
    this.schema = schema;
  }

  /**
   * compile (static)
   */


  _createClass(Initializer, [{
    key: 'compile',


    /**
     * compile
     */
    value: function compile() {
      var root = this.root,
          depth = this.depth,
          level = this.level;

      var declarations = '';
      var body = '';

      // traverse the schema and generate code
      body += this.default();
      body += this.properties();
      //body += this.additionalProperties()
      body += this.items();
      //body += this.additionalItems()


      // value
      body += this.member();
      body += this.item();

      // after traversing the schema
      // generate the variable declarations
      if (root === this) {
        for (var i = 1; i <= this.root.depth; i++) {
          declarations += this.declaration(i);
        }

        return '\n        options = options || {}\n\n        if (options.filter === false) {\n          Object.assign(target, JSON.parse(JSON.stringify(source)))\n        }\n\n        ' + declarations + '\n        ' + body + '\n      ';
      }

      return body;
    }

    /**
     * declaration
     */

  }, {
    key: 'declaration',
    value: function declaration(level) {
      return '\n      var target' + level + '\n      var source' + level + '\n      var count' + level + '\n    ';
    }

    /**
     * default
     */

  }, {
    key: 'default',
    value: function _default() {
      var schema = this.schema,
          level = this.level,
          key = this.key,
          index = this.index;
      var value = schema.default; // rename default to value because it's a keyword and syntax highlighter breaks

      var block = '';

      if (schema.hasOwnProperty('default')) {

        if (key) {
          block += '\n          target' + level + '[\'' + key + '\'] = ' + JSON.stringify(value) + '\n        ';
        }

        if (index) {
          block += '\n          target' + level + '[' + index + '] = ' + JSON.stringify(value) + '\n        ';
        }

        if (level > 1) {
          block += '\n          count' + level + '++\n        ';
        }

        block = '\n        if (options.defaults !== false) {\n          ' + block + '\n        }\n      ';
      }

      return block;
    }

    /**
     * member
     */

  }, {
    key: 'member',
    value: function member() {
      var schema = this.schema,
          root = this.root,
          level = this.level,
          key = this.key;
      var properties = schema.properties,
          additionalProperties = schema.additionalProperties,
          items = schema.items,
          additionalItems = schema.additionalItems;

      var block = '';

      // `key` tells us to treat this subschema as an object member vs an array item
      // and the absence of the other values here indicates we are dealing with a
      // primitive value
      if (key && !properties && !additionalProperties && !items && !additionalItems) {

        // first generate the assignment statement
        block += '\n        target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n      ';

        // for nested container objects, add the counter incrementing statement
        if (level > 1) {
          block += '\n          count' + level + '++\n        ';
        }

        // wrap the foregoing in a check for presence on the source
        block = '\n        if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n          ' + block + '\n        }\n      ';
      }

      return block;
    }

    /**
     * item
     */

  }, {
    key: 'item',
    value: function item() {
      var schema = this.schema,
          root = this.root,
          level = this.level,
          index = this.index;
      var properties = schema.properties,
          additionalProperties = schema.additionalProperties,
          items = schema.items,
          additionalItems = schema.additionalItems;

      var block = '';

      if (index && !properties && !additionalProperties && !items && !additionalItems) {

        block += '\n        target' + level + '[' + index + '] = source' + level + '[' + index + ']\n      ';

        if (level > 1) {
          block += '\n          count' + level + '++\n        ';
        }

        block = '\n        if (' + index + ' < len) {\n          ' + block + '\n        }\n      ';
      }

      return block;
    }

    /**
     * properties
     */

  }, {
    key: 'properties',
    value: function properties() {
      var schema = this.schema,
          root = this.root,
          level = this.level,
          key = this.key,
          index = this.index;
      var properties = schema.properties;

      var block = '';

      if (properties) {
        Object.keys(properties).forEach(function (key) {
          var subschema = properties[key];
          var initializer = new Initializer(subschema, { key: key, root: root, level: level + 1 });

          block += initializer.compile();
        });

        // root-level properties boilerplate
        if (root === this) {
          block = '\n          if (typeof source === \'object\' && source !== null && !Array.isArray(source)) {\n            if (typeof target !== \'object\') {\n              throw new Error(\'?\')\n            }\n\n            source1 = source\n            target1 = target\n            count1 = 0\n\n            ' + block + '\n          }\n        ';

          // nested properties boilerplate
        } else {

          if (index) {
            block = '\n            if (' + index + ' < source' + level + '.length || typeof source' + level + '[' + index + '] === \'object\') {\n\n              source' + (level + 1) + ' = source' + level + '[' + index + '] || {}\n              count' + (level + 1) + ' = 0\n\n              if (' + index + ' < target' + level + '.length || typeof target' + level + '[' + index + '] !== \'object\') {\n                target' + (level + 1) + ' = {}\n                if (' + index + ' < source' + level + '.length) {\n                  count' + (level + 1) + '++\n                }\n              } else {\n                target' + (level + 1) + ' = target' + level + '[' + index + ']\n              }\n\n              ' + block + '\n\n              if (count' + (level + 1) + ' > 0) {\n                target' + level + '[' + index + '] = target' + (level + 1) + '\n                count' + level + '++\n              }\n\n            } else {\n              target' + level + '[' + index + '] = source' + level + '[' + index + ']\n              count' + level + '++\n            }\n          ';
          }

          if (key) {
            block = '\n            if ((typeof source' + level + '[\'' + key + '\'] === \'object\'\n                  && source' + level + '[\'' + key + '\'] !== null\n                  && !Array.isArray(source' + level + '[\'' + key + '\']))\n                || !source' + level + '.hasOwnProperty(\'' + key + '\')) {\n\n              source' + (level + 1) + ' = source' + level + '[\'' + key + '\'] || {}\n              count' + (level + 1) + ' = 0\n\n              if (!target' + level + '.hasOwnProperty(\'' + key + '\')\n                  || typeof target' + level + '[\'' + key + '\'] !== \'object\'\n                  || target' + level + '[\'' + key + '\'] === null\n                  || Array.isArray(target' + level + '[\'' + key + '\'])) {\n                target' + (level + 1) + ' = {}\n                if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n                  count' + (level + 1) + '++\n                }\n              } else {\n                target' + (level + 1) + ' = target' + level + '[\'' + key + '\']\n                count' + (level + 1) + '++\n              }\n\n              ' + block + '\n\n              if (count' + (level + 1) + ' > 0) {\n                target' + level + '[\'' + key + '\'] = target' + (level + 1) + '\n                count' + level + '++\n              }\n\n            } else {\n              target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n              count' + level + '++\n            }\n          ';
          }
        }
      }

      return block;
    }

    /**
     *
     */

  }, {
    key: 'additionalProperties',
    value: function additionalProperties() {}

    /**
     * items
     */

  }, {
    key: 'items',
    value: function items() {
      var schema = this.schema,
          root = this.root,
          level = this.level,
          key = this.key,
          index = this.index;
      var items = schema.items;

      var block = '';

      if (items) {

        if (Array.isArray(items)) {
          // TODO
          //
          //
          //
          //
          //
          // ...

        } else if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null) {
          var _index = 'i' + (level + 1);
          var initializer = new Initializer(items, { index: _index, root: root, level: level + 1 });

          block += '\n          var sLen = source' + (level + 1) + '.length || 0\n          var tLen = target' + (level + 1) + '.length || 0\n          var len = 0\n\n          if (sLen > len) { len = sLen }\n          // THIS IS WRONG, CAUSED SIMPLE ARRAY INIT TO FAIL (OVERWRITE\n          // EXISTING TARGET VALUES WITH UNDEFINED WHEN SOURCE IS SHORTER THAN\n          // TARGET). LEAVING HERE UNTIL WE FINISH TESTING AND SEE WHY IT MIGHT\n          // HAVE BEEN HERE IN THE FIRST PLACE.\n          //\n          // if (tLen > len) { len = tLen }\n\n          for (var ' + _index + ' = 0; ' + _index + ' < len; ' + _index + '++) {\n            ' + initializer.compile() + '\n          }\n        ';
        }

        // root-level properties boilerplate
        if (root === this) {
          block = '\n          if (Array.isArray(source)) {\n            if (!Array.isArray(target)) {\n              throw new Error(\'?\')\n            }\n\n            source1 = source\n            target1 = target\n\n            ' + block + '\n          }\n        ';

          // nested properties boilerplate
        } else {
          block = '\n          if (Array.isArray(source' + level + '[\'' + key + '\']) || !source' + level + '.hasOwnProperty(\'' + key + '\')) {\n\n            source' + (level + 1) + ' = source' + level + '[\'' + key + '\'] || []\n            count' + (level + 1) + ' = 0\n\n            if (!target' + level + '.hasOwnProperty(\'' + key + '\') || !Array.isArray(target' + level + '[\'' + key + '\'])) {\n              target' + (level + 1) + ' = []\n                if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n                  count' + (level + 1) + '++\n                }\n\n            } else {\n              target' + (level + 1) + ' = target' + level + '[\'' + key + '\']\n              count' + (level + 1) + '++\n            }\n\n            ' + block + '\n\n            if (count' + (level + 1) + ' > 0) {\n              target' + level + '[\'' + key + '\'] = target' + (level + 1) + '\n              count' + level + '++\n            }\n\n          } else {\n            target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n            count' + level + '++\n          }\n        ';
        }
      }

      return block;
    }

    /**
     *
     */

  }, {
    key: 'additionalItems',
    value: function additionalItems() {}
  }], [{
    key: 'compile',
    value: function compile(schema) {
      var initializer = new Initializer(schema);
      var block = initializer.compile();

      //console.log(beautify(block))
      try {
        return new Function('target', 'source', 'options', block);
      } catch (e) {
        console.log(e, e.stack);
      }
    }
  }]);

  return Initializer;
}();

module.exports = Initializer;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPatch = __webpack_require__(30);

/**
 * JSONDocument
 *
 * @class
 * JSONDocument is a high level interface that binds together all other features of
 * this package and provides the principle method of data modeling.
 */

var JSONDocument = function () {
  _createClass(JSONDocument, null, [{
    key: 'schema',


    /**
     * Schema
     */
    get: function get() {
      throw new Error('Schema must be defined by classes extending JSONDocument');
    }

    /**
     * Constructor
     *
     * @param {Object} data
     * @param {Object} options
     */

  }]);

  function JSONDocument() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JSONDocument);

    this.initialize(data, options);
  }

  /**
   * Initialize
   *
   * @param {Object} data
   * @param {Object} options
   */


  _createClass(JSONDocument, [{
    key: 'initialize',
    value: function initialize() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var schema = this.constructor.schema;

      schema.initialize(this, data, options);
    }

    /**
     * Validate
     *
     * @param {JSONSchema} alternate - OPTIONAL alternate schema
     * @returns {Object}
     */

  }, {
    key: 'validate',
    value: function validate(alternate) {
      var schema = this.constructor.schema;

      return (alternate || schema).validate(this);
    }

    /**
     * Patch
     *
     * @param {Array} ops
     */

  }, {
    key: 'patch',
    value: function patch(ops) {
      var patch = new JSONPatch(ops);
      patch.apply(this);
    }

    /**
     * Select
     */

  }, {
    key: 'select',
    value: function select() {}

    /**
     * Project
     *
     * @description
     * Given a mapping, return an object projected from the current instance.
     *
     * @example
     * let schema = new JSONSchema({
     *   properties: {
     *     foo: { type: 'Array' }
     *   }
     * })
     *
     * let mapping = new JSONMapping({
     *   '/foo/0': '/bar/baz'
     * })
     *
     * class FooTracker extends JSONDocument {
     *   static get schema () { return schema }
     * }
     *
     * let instance = new FooTracker({ foo: ['qux'] })
     * instance.project(mapping)
     * // => { bar: { baz: 'qux' } }
     *
     * @param {JSONMapping} mapping
     * @return {Object}
     */

  }, {
    key: 'project',
    value: function project(mapping) {
      return mapping.project(this);
    }

    /**
     * Serialize
     *
     * @param {Object} object
     * @returns {string}
     */

  }], [{
    key: 'serialize',
    value: function serialize(object) {
      return JSON.stringify(object);
    }

    /**
     * Deserialize
     *
     * @param {string} data
     * @return {*}
     */

  }, {
    key: 'deserialize',
    value: function deserialize(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        throw new Error('Failed to parse JSON');
      }
    }
  }]);

  return JSONDocument;
}();

/**
 * Export
 */


module.exports = JSONDocument;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPointer = __webpack_require__(31);

/**
 * Modes
 */
var THROW = 0;
var RECOVER = 1;
var SILENT = 2;

/**
 * Operations list
 */
var OPERATIONS = ['add', 'remove', 'replace', 'move', 'copy', 'test'];

/**
 * Patch
 *
 * @class
 * Implements RFC 6902: JavaScript Object Notation (JSON) Patch
 * https://tools.ietf.org/html/rfc6902
 */

var JSONPatch = function () {

  /**
   * Constructor
   *
   * @param {Array} ops
   */
  function JSONPatch(ops) {
    _classCallCheck(this, JSONPatch);

    this.ops = ops || [];
  }

  /**
   * Apply
   *
   * @todo handle errors/roll back
   * @todo protect properties that are private in the schema
   * @todo map JSON Pointers real property names
   *
   * @param {Object} target
   */


  _createClass(JSONPatch, [{
    key: 'apply',
    value: function apply(target) {
      var _this = this;

      this.ops.forEach(function (operation) {
        var op = operation.op;

        if (!op) {
          throw new Error('Missing "op" in JSON Patch operation');
        }

        if (OPERATIONS.indexOf(op) === -1) {
          throw new Error('Invalid "op" in JSON Patch operation');
        }

        if (!operation.path) {
          throw new Error('Missing "path" in JSON Patch operation');
        }

        _this[op](operation, target);
      });
    }

    /**
     * Add
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'add',
    value: function add(op, target) {
      if (op.value === undefined) {
        throw new Error('Missing "value" in JSON Patch add operation');
      }

      var pointer = new JSONPointer(op.path, SILENT);
      pointer.add(target, op.value);
    }

    /**
     * Remove
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'remove',
    value: function remove(op, target) {
      var pointer = new JSONPointer(op.path);
      pointer.remove(target);
    }

    /**
     * Replace
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'replace',
    value: function replace(op, target) {
      if (op.value === undefined) {
        throw new Error('Missing "value" in JSON Patch replace operation');
      }

      var pointer = new JSONPointer(op.path);
      pointer.replace(target, op.value);
    }

    /**
     * Move
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'move',
    value: function move(op, target) {
      if (op.from === undefined) {
        throw new Error('Missing "from" in JSON Patch move operation');
      }

      if (op.path.match(new RegExp('^' + op.from))) {
        throw new Error('Invalid "from" in JSON Patch move operation');
      }

      var pointer = new JSONPointer(op.path);
      var from = new JSONPointer(op.from);
      var value = from.get(target);

      from.remove(target);
      pointer.add(target, value);
    }

    /**
     * Copy
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'copy',
    value: function copy(op, target) {
      if (op.from === undefined) {
        throw new Error('Missing "from" in JSON Patch copy operation');
      }

      var pointer = new JSONPointer(op.path);
      var from = new JSONPointer(op.from);
      var value = from.get(target);

      pointer.add(target, value);
    }

    /**
     * Test
     *
     * @param {Object} op
     * @param {Object} target
     */

  }, {
    key: 'test',
    value: function test(op, target) {
      if (op.value === undefined) {
        throw new Error('Missing "value" in JSON Patch test operation');
      }

      var pointer = new JSONPointer(op.path);
      var value = pointer.get(target);

      switch (_typeof(op.value)) {
        //case 'string':
        //case 'number':
        //case 'boolean':
        //  if (value !== op.value) {
        //    throw new Error('Mismatching JSON Patch test value')
        //  }
        default:
          if (value !== op.value) {
            throw new Error('Mismatching JSON Patch test value');
          }
      }
    }
  }]);

  return JSONPatch;
}();

/**
 * Exports
 */


module.exports = JSONPatch;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Mode enumeration
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var THROW = 0;
var RECOVER = 1;
var SILENT = 2;

/**
 * JSONPointer
 *
 * @class
 * Implements RFC 6901: JavaScript Object Notation (JSON) Pointer
 * https://tools.ietf.org/html/rfc6901
 */

var JSONPointer = function () {

  /**
   * Constructor
   */
  function JSONPointer(expr, mode) {
    _classCallCheck(this, JSONPointer);

    this.expr = expr;
    this.mode = mode || THROW;
    this.tokens = expr && expr.charAt(0) === '#' ? this.parseURIFragmentIdentifier(expr) : this.parseJSONString(expr);
  }

  /**
   * Escape
   */


  _createClass(JSONPointer, [{
    key: 'escape',
    value: function escape(expr) {
      return expr.replace(/~/g, '~0').replace(/\//g, '~1');
    }

    /**
     * Unescape
     */

  }, {
    key: 'unescape',
    value: function unescape(expr) {
      return expr.replace(/~1/g, '/').replace(/~0/g, '~');
    }

    /**
     * Parse
     */

  }, {
    key: 'parseJSONString',


    /**
     * Parse JSON String
     *
     * @description Parse an expression into a list of tokens
     * @param {string} expr
     * @returns {Array}
     */
    value: function parseJSONString(expr) {
      if (typeof expr !== 'string') {
        throw new Error('JSON Pointer must be a string');
      }

      if (expr === '') {
        return [];
      }

      if (expr.charAt(0) !== '/') {
        throw new Error('Invalid JSON Pointer');
      }

      if (expr === '/') {
        return [''];
      }

      return expr.substr(1).split('/').map(this.unescape);
    }

    /**
     * To JSON String
     *
     * @description Render a JSON string representation of a pointer
     * @returns {string}
     */

  }, {
    key: 'toJSONString',
    value: function toJSONString() {
      return '/' + this.tokens.map(this.escape).join('/');
    }

    /**
     * Parse URI Fragment Identifer
     */

  }, {
    key: 'parseURIFragmentIdentifier',
    value: function parseURIFragmentIdentifier(expr) {
      if (typeof expr !== 'string') {
        throw new Error('JSON Pointer must be a string');
      }

      if (expr.charAt(0) !== '#') {
        throw new Error('Invalid JSON Pointer URI Fragment Identifier');
      }

      return this.parseJSONString(decodeURIComponent(expr.substr(1)));
    }

    /**
     * To URI Fragment Identifier
     *
     * @description Render a URI Fragment Identifier representation of a pointer
     * @returns {string}
     */

  }, {
    key: 'toURIFragmentIdentifier',
    value: function toURIFragmentIdentifier() {
      var _this = this;

      var value = this.tokens.map(function (token) {
        return encodeURIComponent(_this.escape(token));
      }).join('/');

      return '#/' + value;
    }

    /**
     * Get
     *
     * @description Get a value from the source object referenced by the pointer
     * @param {Object} source
     * @returns {*}
     */

  }, {
    key: 'get',
    value: function get(source) {
      var current = source;
      var tokens = this.tokens;

      for (var i = 0; i < tokens.length; i++) {
        if (!current || current[tokens[i]] === undefined) {
          if (this.mode !== THROW) {
            return undefined;
          } else {
            throw new Error('Invalid JSON Pointer reference');
          }
        }

        current = current[tokens[i]];
      }

      return current;
    }

    /**
     * Add
     *
     * @description Set a value on a target object referenced by the pointer. Put
     * will insert an array element. To change an existing array elemnent, use
     * `pointer.set()`
     * @param {Object} target
     * @param {*} value
     */

  }, {
    key: 'add',
    value: function add(target, value) {
      var tokens = this.tokens;
      var current = target;

      // iterate through the tokens
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        // set the property on the target location
        if (i === tokens.length - 1) {
          if (token === '-') {
            current.push(value);
          } else if (Array.isArray(current)) {
            current.splice(token, 0, value);
          } else if (value !== undefined) {
            current[token] = value;
          }

          // handle missing target location based on "mode"
        } else if (!current[token]) {
          switch (this.mode) {
            case THROW:
              throw new Error('Invalid JSON Pointer reference');

            case RECOVER:
              current = current[token] = parseInt(token) ? [] : {};
              break;

            case SILENT:
              return;

            default:
              throw new Error('Invalid pointer mode');
          }

          // reference the next object in the path
        } else {
          current = current[token];
        }
      }
    }

    /**
     * Replace
     *
     * @description Set a value on a target object referenced by the pointer. Set will
     * overwrite an existing array element at the target location.
     * @param {Object} target
     * @param {*} value
     */

  }, {
    key: 'replace',
    value: function replace(target, value) {
      var tokens = this.tokens;
      var current = target;

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (i === tokens.length - 1) {
          current[token] = value;
        } else if (!current[token]) {
          current = current[token] = parseInt(token) ? [] : {};
        } else {
          current = current[token];
        }
      }
    }

    /**
     * Del
     *
     * - if this is an array it should splice the value out
     */

  }, {
    key: 'remove',
    value: function remove(target) {
      var tokens = this.tokens;
      var current = target;

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (current === undefined || current[token] === undefined) {
          return undefined;
        } else if (Array.isArray(current)) {
          current.splice(token, 1);
          return undefined;
        } else if (i === tokens.length - 1) {
          delete current[token];
        }

        current = current[token];
      }

      // delete from the target
    }
  }], [{
    key: 'parse',
    value: function parse(expr) {
      return new JSONPointer(expr);
    }
  }]);

  return JSONPointer;
}();

/**
 * Exports
 */


module.exports = JSONPointer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPointer = __webpack_require__(31);

/**
 * JSONPointer mode
 */
var RECOVER = 1;

/**
 * JSONMapping
 *
 * @class
 * Defines a means to declaratively translate between object
 * representations using JSON Pointer syntax.
 */

var JSONMapping = function () {

  /**
   * Constructor
   *
   * @description Translate pointers from JSON Strings into Pointer objects
   * @param {Object} mapping
   */
  function JSONMapping(mapping) {
    var _this = this;

    _classCallCheck(this, JSONMapping);

    Object.defineProperty(this, 'mapping', {
      enumerable: false,
      value: new Map()
    });

    Object.keys(mapping).forEach(function (key) {
      var value = mapping[key];
      _this.mapping.set(new JSONPointer(key, RECOVER), new JSONPointer(value, RECOVER));
    });
  }

  /**
   * Map
   *
   * @description Assign values from source to target by reading the mapping
   * from right to left.
   * @param {Object} target
   * @param {Object} source
   */


  _createClass(JSONMapping, [{
    key: 'map',
    value: function map(target, source) {
      this.mapping.forEach(function (right, left) {
        left.add(target, right.get(source));
      });
    }

    /**
     * Project
     *
     * @description Assign values from source to target by reading the mapping
     * from left to right.
     * @param {Object} source
     * @param {Object} target
     */

  }, {
    key: 'project',
    value: function project(source, target) {
      this.mapping.forEach(function (right, left) {
        right.add(target, left.get(source));
      });
    }
  }]);

  return JSONMapping;
}();

/**
 * Exports
 */


module.exports = JSONMapping;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Initializer = __webpack_require__(28);
var Validator = __webpack_require__(34);

/**
 * JSONSchema
 *
 * @class
 * Compiles JSON Schema documents to an object with object initialization
 * and validation methods.
 */

var JSONSchema = function () {

  /**
   * Constructor
   *
   * @param {Object} schema
   */
  function JSONSchema(schema) {
    _classCallCheck(this, JSONSchema);

    // TODO: optionally parse JSON string?
    Object.assign(this, schema);

    // add schema-derived initialize and validate methods
    Object.defineProperties(this, {
      initialize: {
        enumerable: false,
        writeable: false,
        value: Initializer.compile(schema)
      },
      validate: {
        enumerable: false,
        writeable: false,
        value: Validator.compile(schema)
      }
    });
  }

  /**
   * Extend
   *
   * @description
   * ...
   * Dear future,
   *
   * This function was meticulously plagiarized from some curious amalgam of
   * stackoverflow posts whilst dozing off at my keyboard, too deprived of REM-
   * sleep to recurse unassisted. If it sucks, you have only yourself to blame.
   *
   * Goodnight.
   *
   * @param {Object} schema
   * @returns {JSONSchema}
   */


  _createClass(JSONSchema, [{
    key: 'extend',
    value: function extend(schema) {
      function isObject(data) {
        return data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null && !Array.isArray(data);
      }

      function extender(target, source) {
        var result = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
          Object.keys(source).forEach(function (key) {
            if (isObject(source[key])) {
              if (!(key in target)) {
                Object.assign(result, _defineProperty({}, key, source[key]));
              } else {
                result[key] = extender(target[key], source[key]);
              }
            } else {
              Object.assign(result, _defineProperty({}, key, source[key]));
            }
          });
        }
        return result;
      }

      var descriptor = extender(this, schema);
      return new JSONSchema(descriptor);
    }
  }]);

  return JSONSchema;
}();

/**
 * Export
 */


module.exports = JSONSchema;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var formats = __webpack_require__(27);

/**
 * For variable iterator counter
 *
 * @type {number}
 */
var indexCount = 0;

/**
 * Validator
 *
 * Compile an object describing a JSON Schema into a validation function.
 */

var Validator = function () {
  _createClass(Validator, null, [{
    key: 'compile',


    /**
     * Compile (static)
     *
     * @description
     * Compile an object describing a JSON Schema into a validation function.
     *
     * @param {Object} schema
     * @returns {Function}
     */
    value: function compile(schema) {
      var validator = new Validator(schema);

      var body = '\n      // "cursor"\n      let value = data\n      let container\n      let stack = []\n      let top = -1\n\n      // error state\n      let valid = true\n      let errors = []\n\n      // complex schema state\n      let initialValidity\n      let anyValid\n      let notValid\n      let countOfValid\n      let initialErrorCount\n      let accumulatedErrorCount\n\n      // validation code\n      ' + validator.compile() + '\n\n      // validation result\n      return {\n        valid,\n        errors\n      }\n    ';

      return new Function('data', body);
    }

    /**
     * Return current iterator index counter and increase value
     *
     * @returns {number}
     */

  }, {
    key: 'counter',
    get: function get() {
      return indexCount++;
    }

    /**
     * Constructor
     *
     * @param {Object} schema - object representation of a schema
     * @param {string} options - compilation options
     */

  }]);

  function Validator(schema) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Validator);

    // assign schema to this
    this.schema = schema;

    // assign all options to this
    Object.assign(this, options);

    // ensure address is defined
    if (!this.address) {
      this.address = '';
    }

    // ensure require is boolean
    if (this.require !== true) {
      this.require = false;
    }
  }

  /**
   * Compile
   *
   * @description
   * The instance compile method is "dumb". It only sequences invocation of
   * more specific compilation methods. It generates code to
   *
   *  - read a value from input
   *  - validate type(s) of input
   *  - validate constraints described by various schema keywords
   *
   * Conditional logic related to code generation is pushed downsteam to
   * type-specific methods.
   */


  _createClass(Validator, [{
    key: 'compile',
    value: function compile() {
      var block = '';

      if (this.require) {
        block += this.required();
      }

      // type validation
      block += this.type();

      // type specific validation generators
      // null and boolean are covered by this.type()
      // integer should be covered by number and this.type()
      block += this.array();
      block += this.number();
      block += this.object();
      block += this.string();

      // non-type-specific validation generators
      block += this.enum();
      block += this.anyOf();
      block += this.allOf();
      block += this.not();
      block += this.oneOf();

      return block;
    }

    /**
     * push
     */

  }, {
    key: 'push',
    value: function push() {
      return '\n      stack.push(value)\n      container = value\n      top++\n    ';
    }

    /**
     * pop
     */

  }, {
    key: 'pop',
    value: function pop() {
      return '\n      if (stack.length > 1) {\n        top--\n        stack.pop()\n      }\n\n      value = container = stack[top]\n    ';
    }

    /**
     * type
     *
     * @description
     * > An instance matches successfully if its primitive type is one of the
     * > types defined by keyword. Recall: "number" includes "integer".
     * > JSON Schema Validation Section 5.5.2
     *
     * @returns {string}
     */

  }, {
    key: 'type',
    value: function type() {
      var type = this.schema.type,
          address = this.address;

      var block = '';

      if (type) {
        var types = Array.isArray(type) ? type : [type];
        var conditions = types.map(function (type) {
          // TODO: can we make a mapping object for this to clean it up?
          if (type === 'array') return '!Array.isArray(value)';
          if (type === 'boolean') return 'typeof value !== \'boolean\'';
          if (type === 'integer') return '!Number.isInteger(value)';
          if (type === 'null') return 'value !== null';
          if (type === 'number') return 'typeof value !== \'number\'';
          if (type === 'object') return '(typeof value !== \'object\' || Array.isArray(value) || value === null)';
          if (type === 'string') return 'typeof value !== \'string\'';
        }).join(' && ');

        block += '\n      // ' + address + ' type checking\n      if (value !== undefined && ' + conditions + ') {\n        valid = false\n        errors.push({\n          keyword: \'type\',\n          message: \'invalid type\'\n        })\n      }\n      ';
      }

      return block;
    }

    /**
     * Type-specific validations
     *
     * Type checking is optional in JSON Schema, and a schema can allow
     * multiple types. Generated code needs to apply type-specific validations
     * only to appropriate values, and ignore everything else. Type validation
     * itself is handled separately from other validation keywords.
     *
     * The methods `array`, `number`, `object`, `string` generate type-specific
     * validation code blocks, wrapped in a conditional such that they will
     * only be applied to values of that type.
     *
     * For example, the `number` method, given the schema
     *
     *     { minimum: 3 }
     *
     * will generate
     *
     *     if (typeof value === 'number') {
     *       if (value < 3) {
     *         valid = false
     *         errors.push({ message: '...' })
     *       }
     *     }
     *
     * Integer values are also numbers, and are validated the same as numbers
     * other than the type validation itself. Therefore no `integer` method is
     * needed.
     */

    /**
     * array
     *
     * @description
     * Invoke methods for array-specific keywords and wrap resulting code in
     * type-checking conditional so that any resulting validations are only
     * applied to array values.
     *
     * @returns {string}
     */

  }, {
    key: 'array',
    value: function array() {
      var keywords = ['additionalItems', 'items', 'minItems', 'maxItems', 'uniqueItems'];
      var validations = this.validations(keywords);
      var block = '';

      if (validations.length > 0) {
        block += '\n      /**\n       * Array validations\n       */\n      if (Array.isArray(value)) {\n      ' + validations + '\n      }\n      ';
      }

      return block;
    }

    /**
     * number
     *
     * @description
     * Invoke methods for number-specific keywords and wrap resulting code in
     * type-checking conditional so that any resulting validations are only
     * applied to number values.
     *
     * @returns {string}
     */

  }, {
    key: 'number',
    value: function number() {
      var keywords = ['minimum', 'maximum', 'multipleOf'];
      var validations = this.validations(keywords);
      var block = '';

      if (validations.length > 0) {
        block += '\n      /**\n       * Number validations\n       */\n      if (typeof value === \'number\') {\n      ' + validations + '\n      }\n      ';
      }

      return block;
    }

    /**
     * object
     *
     * @description
     * Invoke methods for object-specific keywords and wrap resulting code in
     * type-checking conditional so that any resulting validations are only
     * applied to object values.
     *
     * @returns {string}
     */

  }, {
    key: 'object',
    value: function object() {
      var keywords = ['maxProperties', 'minProperties', 'additionalProperties', 'properties', 'patternProperties', 'dependencies', 'schemaDependencies', 'propertyDependencies'];
      var validations = this.validations(keywords);
      var block = '';

      if (validations.length > 0) {
        block += '\n      /**\n       * Object validations\n       */\n      if (typeof value === \'object\' && value !== null && !Array.isArray(value)) {\n      ' + validations + '\n      }\n      ';
      }

      return block;
    }

    /**
     * string
     *
     * @description
     * Invoke methods for string-specific keywords and wrap resulting code in
     * type-checking conditional so that any resulting validations are only
     * applied to string values.
     *
     * @returns {string}
     */

  }, {
    key: 'string',
    value: function string() {
      var keywords = ['maxLength', 'minLength', 'pattern', 'format'];
      var validations = this.validations(keywords);
      var block = '';

      if (validations.length > 0) {
        block += '\n      /**\n       * String validations\n       */\n      if (typeof value === \'string\') {\n      ' + validations + '\n      }\n      ';
      }

      return block;
    }

    /**
     * validations
     *
     * @description
     * Iterate over an array of keywords and invoke code generator methods
     * for each. Concatenate the results together and return. Used by "type"
     * methods such as this.array() and this.string()
     *
     * @param {Array} keywords
     * @returns {string}
     */

  }, {
    key: 'validations',
    value: function validations(keywords) {
      var _this = this;

      var schema = this.schema;

      var block = '';

      var constraints = Object.keys(schema).filter(function (key) {
        return keywords.indexOf(key) !== -1;
      });

      constraints.forEach(function (keyword) {
        block += _this[keyword]();
      });

      return block;
    }

    /**
     * enum
     *
     * @description
     * > An instance validates successfully against this keyword if its value
     * > is equal to one of the elements in this keyword's array value.
     * > JSON Schema Validation Section 5.5.1
     *
     * @returns {string}
     */

  }, {
    key: 'enum',
    value: function _enum() {
      var enumerated = this.schema.enum,
          address = this.address;

      var conditions = ['value !== undefined'];
      var block = '';

      if (enumerated) {
        enumerated.forEach(function (value) {
          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'boolean':
              conditions.push('value !== ' + value);
              break;

            case 'number':
              conditions.push('value !== ' + value);
              break;

            case 'string':
              conditions.push('value !== "' + value + '"');
              break;

            case 'object':
              if (value === null) {
                conditions.push('value !== null');
              } else {
                conditions.push('\'' + JSON.stringify(value) + '\' !== JSON.stringify(value)');
              }
              break;

            default:
              throw new Error('Things are not well in the land of enum');

          }
        });

        block += '\n      /**\n       * Validate "' + address + '" enum\n       */\n      if (' + conditions.join(' && ') + ') {\n        valid = false\n        errors.push({\n          keyword: \'enum\',\n          message: JSON.stringify(value) + \' is not an enumerated value\'\n        })\n      }\n      ';
      }

      return block;
    }

    /**
     * anyOf
     *
     * @description
     * > An instance validates successfully against this keyword if it
     * > validates successfully against at least one schema defined by this
     * > keyword's value.
     * > JSON Schema Validation Section 5.5.4
     *
     * @returns {string}
     */

  }, {
    key: 'anyOf',
    value: function anyOf() {
      var anyOf = this.schema.anyOf,
          address = this.address;

      var block = '';

      if (Array.isArray(anyOf)) {
        block += '\n        initialValidity = valid\n        initialErrorCount = errors.length\n        anyValid = false\n      ';

        anyOf.forEach(function (subschema) {
          var validator = new Validator(subschema, { address: address });
          block += '\n        accumulatedErrorCount = errors.length\n        ' + validator.compile() + '\n        if (accumulatedErrorCount === errors.length) {\n          anyValid = true\n        }\n        ';
        });

        block += '\n          if (anyValid === true) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          }\n      ';
      }

      return block;
    }

    /**
     * allOf
     *
     * @description
     * > An instance validates successfully against this keyword if it
     * > validates successfully against all schemas defined by this keyword's
     * > value.
     * > JSON Schema Validation Section 5.5.3
     *
     * @returns {string}
     */

  }, {
    key: 'allOf',
    value: function allOf() {
      var allOf = this.schema.allOf,
          address = this.address;

      var block = '';

      if (Array.isArray(allOf)) {
        allOf.forEach(function (subschema) {
          var validator = new Validator(subschema, { address: address });
          block += '\n        ' + validator.compile() + '\n        ';
        });
      }

      return block;
    }

    /**
     * oneOf
     *
     * @description
     * > An instance validates successfully against this keyword if it
     * > validates successfully against exactly one schema defined by this
     * > keyword's value.
     * > JSON Schema Validation Section 5.5.5
     *
     * @returns {string}
     */

  }, {
    key: 'oneOf',
    value: function oneOf() {
      var oneOf = this.schema.oneOf,
          address = this.address;

      var block = '';

      if (Array.isArray(oneOf)) {
        block += '\n        /**\n         * Validate ' + address + ' oneOf\n         */\n        initialValidity = valid\n        initialErrorCount = errors.length\n        countOfValid = 0\n      ';

        oneOf.forEach(function (subschema) {
          var validator = new Validator(subschema, { address: address });
          block += '\n        accumulatedErrorCount = errors.length\n        ' + validator.compile() + '\n        if (accumulatedErrorCount === errors.length) {\n          countOfValid += 1\n        }\n        ';
        });

        block += '\n          if (countOfValid === 1) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          } else {\n            valid = false\n            errors.push({\n              keyword: \'oneOf\',\n              message: \'what is a reasonable error message for this case?\'\n            })\n          }\n      ';
      }

      return block;
    }

    /**
     * not
     *
     * @description
     * > An instance is valid against this keyword if it fails to validate
     * > successfully against the schema defined by this keyword.
     * > JSON Schema Validation Section 5.5.6
     *
     * @returns {string}
     */

  }, {
    key: 'not',
    value: function not() {
      var not = this.schema.not,
          address = this.address;

      var block = '';

      if ((typeof not === 'undefined' ? 'undefined' : _typeof(not)) === 'object' && not !== null && !Array.isArray(not)) {
        var subschema = not;
        var validator = new Validator(subschema, { address: address });

        block += '\n        /**\n         * NOT\n         */\n        if (value !== undefined) {\n          initialValidity = valid\n          initialErrorCount = errors.length\n          notValid = true\n\n          accumulatedErrorCount = errors.length\n\n          ' + validator.compile() + '\n\n          if (accumulatedErrorCount === errors.length) {\n            notValid = false\n          }\n\n          if (notValid === true) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          } else {\n            valid = false\n            errors = errors.slice(0, initialErrorCount)\n            errors.push({\n              keyword: \'not\',\n              message: \'hmm...\'\n            })\n          }\n        }\n      ';
      }

      return block;
    }

    /**
     * properties
     *
     * @description
     * Iterate over the `properties` schema property if it is an object. For each
     * key, initialize a new Validator for the subschema represented by the property
     * value and invoke compile. Append the result of compiling each subschema to
     * the block of code being generated.
     *
     * @returns {string}
     */

  }, {
    key: 'properties',
    value: function properties() {
      var schema = this.schema,
          address = this.address;
      var properties = schema.properties,
          required = schema.required;

      var block = this.push();

      // ensure the value of "required" schema property is an array
      required = Array.isArray(required) ? required : [];

      if ((typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object') {
        Object.keys(properties).forEach(function (key) {
          var subschema = properties[key];
          var isRequired = required.indexOf(key) !== -1;
          // TODO
          // how should we be calculating these things? should be json pointer?
          // needs a separate function
          var pointer = [address, key].filter(function (segment) {
            return !!segment;
          }).join('.');
          var validation = new Validator(subschema, { address: pointer, require: isRequired });

          // read the value
          block += '\n        value = container[\'' + key + '\']\n        ';

          block += validation.compile();
        });
      }

      block += this.pop();

      return block;
    }

    /**
     * Other Properties
     *
     * @description
     * This method is not for a keyword. It wraps validations for
     * patternProperties and additionalProperties in a single iteration over
     * an object-type value's properties.
     *
     * It should only be invoked once for a given subschema.
     *
     * @returns {string}
     */

  }, {
    key: 'otherProperties',
    value: function otherProperties() {
      return '\n      /**\n       * Validate Other Properties\n       */\n      ' + this.push() + '\n\n      for (let key in container) {\n        value = container[key]\n        matched = false\n\n        ' + this.patternValidations() + '\n        ' + this.additionalValidations() + '\n      }\n\n      ' + this.pop() + '\n    ';
    }

    /**
     * Pattern Validations
     *
     * @description
     * Generate validation code from a subschema for properties matching a
     * regular expression.
     *
     * @returns {string}
     */

  }, {
    key: 'patternValidations',
    value: function patternValidations() {
      var patternProperties = this.schema.patternProperties;

      var block = '';

      if ((typeof patternProperties === 'undefined' ? 'undefined' : _typeof(patternProperties)) === 'object') {
        Object.keys(patternProperties).forEach(function (pattern) {
          var subschema = patternProperties[pattern];
          var validator = new Validator(subschema);
          block += '\n          if (key.match(\'' + pattern + '\')) {\n            matched = true\n            ' + validator.compile() + '\n          }\n        ';
        });
      }

      return block;
    }

    /**
     * Additional Validations
     *
     * @description
     * Generate validation code, either from a subschema for properties not
     * defined in the schema, or to disallow properties not defined in the
     * schema.
     *
     * @returns {string}
     */

  }, {
    key: 'additionalValidations',
    value: function additionalValidations() {
      var _schema = this.schema,
          properties = _schema.properties,
          additionalProperties = _schema.additionalProperties,
          address = this.address;

      var validations = '';
      var block = '';

      // catch additional unmatched properties
      var conditions = ['matched !== true'];

      // ignore defined properties
      Object.keys(properties || {}).forEach(function (key) {
        conditions.push('key !== \'' + key + '\'');
      });

      // validate additional properties
      if ((typeof additionalProperties === 'undefined' ? 'undefined' : _typeof(additionalProperties)) === 'object') {
        var subschema = additionalProperties;
        var validator = new Validator(subschema, { address: address + '[APKey]' });
        block += '\n        // validate additional properties\n        if (' + conditions.join(' && ') + ') {\n          ' + validator.compile() + '\n        }\n      ';
      }

      // error for additional properties
      if (additionalProperties === false) {
        block += '\n        // validate non-presence of additional properties\n        if (' + conditions.join(' && ') + ') {\n          valid = false\n          errors.push({\n            keyword: \'additionalProperties\',\n            message: key + \' is not a defined property\'\n          })\n        }\n      ';
      }

      return block;
    }

    /**
     * patternProperties
     *
     * @description
     * Generate validation code for properties matching a pattern
     * defined by the property name (key), which must be a string
     * representing a valid regular expression.
     *
     * @returns {string}
     */

  }, {
    key: 'patternProperties',
    value: function patternProperties() {
      var block = '';

      if (!this.otherPropertiesCalled) {
        this.otherPropertiesCalled = true;
        block += this.otherProperties();
      }

      return block;
    }

    /**
     * additionalProperties
     *
     * @description
     * Generate validation code for additional properties not defined
     * in the schema, or disallow additional properties if the value of
     * `additionalProperties` in the schema is `false`.
     *
     * @returns {string}
     */

  }, {
    key: 'additionalProperties',
    value: function additionalProperties() {
      var block = '';

      if (!this.otherPropertiesCalled) {
        this.otherPropertiesCalled = true;
        block += this.otherProperties();
      }

      return block;
    }

    /**
     * minProperties
     *
     * @description
     * > An object instance is valid against "minProperties" if its number of
     * > properties is greater than, or equal to, the value of this keyword.
     * > JSON Schema Validation Section 5.4.2
     *
     * @returns {string}
     */

  }, {
    key: 'minProperties',
    value: function minProperties() {
      var minProperties = this.schema.minProperties,
          address = this.address;


      return '\n        // ' + address + ' min properties\n        if (Object.keys(value).length < ' + minProperties + ') {\n          valid = false\n          errors.push({\n            keyword: \'minProperties\',\n            message: \'too few properties\'\n          })\n        }\n    ';
    }

    /**
     * maxProperties
     *
     * @description
     * > An object instance is valid against "maxProperties" if its number of
     * > properties is less than, or equal to, the value of this keyword.
     * > JSON Schema Validation Section 5.4.1
     *
     * @returns {string}
     */

  }, {
    key: 'maxProperties',
    value: function maxProperties() {
      var maxProperties = this.schema.maxProperties,
          address = this.address;


      return '\n        // ' + address + ' max properties\n        if (Object.keys(value).length > ' + maxProperties + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxProperties\',\n            message: \'too many properties\'\n          })\n        }\n    ';
    }

    /**
     * Dependencies
     *
     * @description
     * > For all (name, schema) pair of schema dependencies, if the instance has
     * > a property by this name, then it must also validate successfully against
     * > the schema.
     * >
     * > Note that this is the instance itself which must validate successfully,
     * > not the value associated with the property name.
     * >
     * > For each (name, propertyset) pair of property dependencies, if the
     * > instance has a property by this name, then it must also have properties
     * > with the same names as propertyset.
     * > JSON Schema Validation Section 5.4.5.2
     *
     * @returns {string}
     */

  }, {
    key: 'dependencies',
    value: function dependencies() {
      var dependencies = this.schema.dependencies,
          address = this.address;


      var block = this.push();

      if ((typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)) === 'object') {
        Object.keys(dependencies).forEach(function (key) {
          var dependency = dependencies[key];
          var conditions = [];

          if (Array.isArray(dependency)) {
            dependency.forEach(function (item) {
              conditions.push('container[\'' + item + '\'] === undefined');
            });

            block += '\n            if (container[\'' + key + '\'] !== undefined && (' + conditions.join(' || ') + ')) {\n              valid = false\n              errors.push({\n                keyword: \'dependencies\',\n                message: \'unmet dependencies\'\n              })\n            }\n          ';
          } else if ((typeof dependency === 'undefined' ? 'undefined' : _typeof(dependency)) === 'object') {
            var subschema = dependency;
            var validator = new Validator(subschema, { address: address });

            block += '\n            if (container[\'' + key + '\'] !== undefined) {\n              ' + validator.compile() + '\n            }\n          ';
          }
        });
      }

      block += this.pop();

      return block;
    }

    /**
     * Required
     *
     * @description
     * > An object instance is valid against this keyword if its property set
     * > contains all elements in this keyword's array value.
     * > JSON Schema Validation Section 5.4.3
     *
     * @returns {string}
     */

  }, {
    key: 'required',
    value: function required() {
      var properties = this.schema.properties,
          address = this.address;

      var block = '';

      block += '\n      // validate ' + address + ' presence\n      if (value === undefined) {\n        valid = false\n        errors.push({\n          keyword: \'required\',\n          message: \'is required\'\n        })\n      }\n    ';

      return block;
    }

    /**
     * additionalItems
     *
     * @description
     * > Successful validation of an array instance with regards to these two
     * > keywords is determined as follows: if "items" is not present, or its
     * > value is an object, validation of the instance always succeeds,
     * > regardless of the value of "additionalItems"; if the value of
     * > "additionalItems" is boolean value true or an object, validation of
     * > the instance always succeeds; if the value of "additionalItems" is
     * > boolean value false and the value of "items" is an array, the
     * > instance is valid if its size is less than, or equal to, the size
     * > of "items".
     * > JSON Schema Validation Section 5.3.1
     *
     * @returns {string}
     */

  }, {
    key: 'additionalItems',
    value: function additionalItems() {
      var _schema2 = this.schema,
          items = _schema2.items,
          additionalItems = _schema2.additionalItems,
          address = this.address;

      var block = '';

      if (additionalItems === false && Array.isArray(items)) {
        block += '\n        // don\'t allow additional items\n        if (value.length > ' + items.length + ') {\n          valid = false\n          errors.push({\n            keyword: \'additionalItems\',\n            message: \'additional items not allowed\'\n          })\n        }\n      ';
      }

      if ((typeof additionalItems === 'undefined' ? 'undefined' : _typeof(additionalItems)) === 'object' && additionalItems !== null && Array.isArray(items)) {
        var subschema = additionalItems;
        var validator = new Validator(subschema);
        var counter = Validator.counter;

        block += '\n        // additional items\n        ' + this.push() + '\n\n        for (var i' + counter + ' = ' + items.length + '; i' + counter + ' <= container.length; i' + counter + '++) {\n          value = container[i' + counter + ']\n          ' + validator.compile() + '\n        }\n\n        ' + this.pop() + '\n      ';
      }

      return block;
    }

    /**
     * Items
     *
     * @description
     * > Successful validation of an array instance with regards to these two
     * > keywords is determined as follows: if "items" is not present, or its
     * > value is an object, validation of the instance always succeeds,
     * > regardless of the value of "additionalItems"; if the value of
     * > "additionalItems" is boolean value true or an object, validation of
     * > the instance always succeeds; if the value of "additionalItems" is
     * > boolean value false and the value of "items" is an array, the
     * > instance is valid if its size is less than, or equal to, the size
     * > of "items".
     * > JSON Schema Validation Section 5.3.1
     *
     * Code to generate
     *
     *     // this outer conditional is generated by this.array()
     *     if (Array.isArray(value) {
     *       let parent = value
     *       for (let i = 0; i < parent.length; i++) {
     *         value = parent[i]
     *         // other validation code depending on value here
     *       }
     *       value = parent
     *     }
     *
     *
     * @returns {string}
     */

  }, {
    key: 'items',
    value: function items() {
      var items = this.schema.items,
          address = this.address;

      var block = '';

      // if items is an array
      if (Array.isArray(items)) {
        block += this.push();

        items.forEach(function (item, index) {
          var subschema = item;
          var validator = new Validator(subschema, { address: address + '[' + index + ']' });

          block += '\n          // item #' + index + '\n          value = container[' + index + ']\n          ' + validator.compile() + '\n        ';
        });

        block += this.pop();

        // if items is an object
      } else if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null) {
        var subschema = items;
        var validator = new Validator(subschema);
        var counter = Validator.counter;

        block += '\n        // items\n        ' + this.push() + '\n\n        for (var i' + counter + ' = 0; i' + counter + ' < container.length; i' + counter + '++) {\n          // read array element\n          value = container[i' + counter + ']\n          ' + validator.compile() + '\n        }\n\n        ' + this.pop() + '\n      ';
      }

      return block;
    }

    /**
     * minItems
     *
     * @description
     * > An array instance is valid against "minItems" if its size is greater
     * > than, or equal to, the value of this keyword.
     * > JSON Schema Validation Section 5.3.3
     *
     * @returns {string}
     */

  }, {
    key: 'minItems',
    value: function minItems() {
      var minItems = this.schema.minItems,
          address = this.address;


      return '\n        // ' + address + ' min items\n        if (value.length < ' + minItems + ') {\n          valid = false\n          errors.push({\n            keyword: \'minItems\',\n            message: \'too few properties\'\n          })\n        }\n    ';
    }

    /**
     * maxItems
     *
     * @description
     * > An array instance is valid against "maxItems" if its size is less
     * > than, or equal to, the value of this keyword.
     * > JSON Schema Validation Section 5.3.2
     *
     * @returns {string}
     */

  }, {
    key: 'maxItems',
    value: function maxItems() {
      var maxItems = this.schema.maxItems,
          address = this.address;


      return '\n        // ' + address + ' max items\n        if (value.length > ' + maxItems + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxItems\',\n            message: \'too many properties\'\n          })\n        }\n    ';
    }

    /**
     * uniqueItems
     *
     * @description
     * > If this keyword has boolean value false, the instance validates
     * > successfully. If it has boolean value true, the instance validates
     * > successfully if all of its elements are unique.
     * > JSON Schema Validation Section 5.3.4
     *
     * TODO
     * optimize
     *
     * @returns {string}
     */

  }, {
    key: 'uniqueItems',
    value: function uniqueItems() {
      var uniqueItems = this.schema.uniqueItems,
          address = this.address;

      var block = '';

      if (uniqueItems === true) {
        block += '\n        // validate ' + address + ' unique items\n        let values = value.map(v => JSON.stringify(v)) // TODO: optimize\n        let set = new Set(values)\n        if (values.length !== set.size) {\n          valid = false\n          errors.push({\n            keyword: \'uniqueItems\',\n            message: \'items must be unique\'\n          })\n        }\n      ';
      }

      return block;
    }

    /**
     * minLength
     *
     * @description
     * > A string instance is valid against this keyword if its length is
     * > greater than, or equal to, the value of this keyword. The length of
     * > a string instance is defined as the number of its characters as
     * > defined by RFC 4627 [RFC4627].
     * > JSON Schema Validation Section 5.2.2
     *
     * @returns {string}
     */

  }, {
    key: 'minLength',
    value: function minLength() {
      var minLength = this.schema.minLength,
          address = this.address;


      return '\n        // ' + address + ' validate minLength\n        if (Array.from(value).length < ' + minLength + ') {\n          valid = false\n          errors.push({\n            keyword: \'minLength\',\n            message: \'too short\'\n          })\n        }\n    ';
    }

    /**
     * maxLength
     *
     * @description
     * > A string instance is valid against this keyword if its length is less
     * > than, or equal to, the value of this keyword. The length of a string
     * > instance is defined as the number of its characters as defined by
     * > RFC 4627 [RFC4627].
     * > JSON Schema Validation Section 5.2.1
     *
     * @returns {string}
     */

  }, {
    key: 'maxLength',
    value: function maxLength() {
      var maxLength = this.schema.maxLength,
          address = this.address;


      return '\n        // ' + address + ' validate maxLength\n        if (Array.from(value).length > ' + maxLength + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxLength\',\n            message: \'too long\'\n          })\n        }\n    ';
    }

    /**
     * Pattern
     *
     * @description
     * > A string instance is considered valid if the regular expression
     * > matches the instance successfully.
     * > JSON Schema Validation Section 5.2.3
     *
     * @returns {string}
     */

  }, {
    key: 'pattern',
    value: function pattern() {
      var pattern = this.schema.pattern,
          address = this.address;


      if (pattern) {
        return '\n          // ' + address + ' validate pattern\n          if (!value.match(new RegExp(\'' + pattern + '\'))) {\n            valid = false\n            errors.push({\n              keyword: \'pattern\',\n              message: \'does not match the required pattern\'\n            })\n          }\n      ';
      }
    }

    /**
     * Format
     *
     * @description
     * > Structural validation alone may be insufficient to validate that
     * > an instance meets all the requirements of an application. The
     * > "format" keyword is defined to allow interoperable semantic
     * > validation for a fixed subset of values which are accurately
     * > described by authoritative resources, be they RFCs or other
     * > external specifications.
     * > JSON Schema Validation Section 7.1
     *
     * @returns {string}
     */

  }, {
    key: 'format',
    value: function format() {
      var format = this.schema.format,
          address = this.address;

      var matcher = formats.resolve(format);

      if (matcher) {
        return '\n      // ' + address + ' validate format\n      if (!value.match(' + matcher + ')) {\n        valid = false\n        errors.push({\n          keyword: \'format\',\n          message: \'is not "' + format + '" format\'\n        })\n      }\n      ';
      }
    }

    /**
     * Minimum
     *
     * @description
     * > Successful validation depends on the presence and value of
     * > "exclusiveMinimum": if "exclusiveMinimum" is not present, or has
     * > boolean value false, then the instance is valid if it is greater
     * > than, or equal to, the value of "minimum"; if "exclusiveMinimum" is
     * > present and has boolean value true, the instance is valid if it is
     * > strictly greater than the value of "minimum".
     * > JSON Schema Validation Section 5.1.3
     *
     * @returns {string}
     */

  }, {
    key: 'minimum',
    value: function minimum() {
      var _schema3 = this.schema,
          minimum = _schema3.minimum,
          exclusiveMinimum = _schema3.exclusiveMinimum,
          address = this.address;

      var operator = exclusiveMinimum === true ? '<=' : '<';

      return '\n        // ' + address + ' validate minimum\n        if (value ' + operator + ' ' + minimum + ') {\n          valid = false\n          errors.push({\n            keyword: \'minimum\',\n            message: \'too small\'\n          })\n        }\n    ';
    }

    /**
     * Maximum
     *
     * @description
     * > Successful validation depends on the presence and value of
     * > "exclusiveMaximum": if "exclusiveMaximum" is not present, or has
     * > boolean value false, then the instance is valid if it is lower than,
     * > or equal to, the value of "maximum"; if "exclusiveMaximum" has
     * > boolean value true, the instance is valid if it is strictly lower
     * > than the value of "maximum".
     * > JSON Schema Validation Section 5.1.2
     *
     * @returns {string}
     */

  }, {
    key: 'maximum',
    value: function maximum() {
      var _schema4 = this.schema,
          maximum = _schema4.maximum,
          exclusiveMaximum = _schema4.exclusiveMaximum,
          address = this.address;

      var operator = exclusiveMaximum === true ? '>=' : '>';

      return '\n        // ' + address + ' validate maximum\n        if (value ' + operator + ' ' + maximum + ') {\n          valid = false\n          errors.push({\n            keyword: \'maximum\',\n            message: \'too large\'\n          })\n        }\n    ';
    }

    /**
     * multipleOf
     *
     * @description
     * > A numeric instance is valid against "multipleOf" if the result of
     * > the division of the instance by this keyword's value is an integer.
     * > JSON Schema Validation Section 5.1.1
     *
     * @returns {string}
     */

  }, {
    key: 'multipleOf',
    value: function multipleOf() {
      var multipleOf = this.schema.multipleOf;

      var block = '';

      if (typeof multipleOf === 'number') {
        var length = multipleOf.toString().length;
        var decimals = length - multipleOf.toFixed(0).length - 1;
        var pow = decimals > 0 ? Math.pow(10, decimals) : 1;
        var condition = void 0;

        if (decimals > 0) {
          condition = '(value * ' + pow + ') % ' + multipleOf * pow + ' !== 0';
        } else {
          condition = 'value % ' + multipleOf + ' !== 0';
        }

        block += '\n        if (' + condition + ') {\n          valid = false\n          errors.push({\n            keyword: \'multipleOf\',\n            message: \'must be a multiple of ' + multipleOf + '\'\n          })\n        }\n      ';
      }

      return block;
    }
  }]);

  return Validator;
}();

/**
 * Export
 */


module.exports = Validator;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module JSON Object Signing and Encryption (JOSE)
 */
var JWA = __webpack_require__(36);
var JWK = __webpack_require__(55);
var JWKSet = __webpack_require__(58);
var JWT = __webpack_require__(60);
var JWS = __webpack_require__(65);
var Base64URLSchema = __webpack_require__(62);
var JOSEHeaderSchema = __webpack_require__(64);
var JWKSchema = __webpack_require__(56);
var JWKSetSchema = __webpack_require__(59);
var JWTClaimsSetSchema = __webpack_require__(63);
var JWTSchema = __webpack_require__(61);

/**
 * Export
 */
module.exports = {
  JWA: JWA,
  JWK: JWK,
  JWKSet: JWKSet,
  JWT: JWT,
  JWS: JWS,
  Base64URLSchema: Base64URLSchema,
  JOSEHeaderSchema: JOSEHeaderSchema,
  JWKSchema: JWKSchema,
  JWKSetSchema: JWKSetSchema,
  JWTClaimsSetSchema: JWTClaimsSetSchema,
  JWTSchema: JWTSchema
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 *
 * TODO
 * - switch between Node.js webcrypto package and browser implementation
 */
var base64url = __webpack_require__(37);
var supportedAlgorithms = __webpack_require__(44);

var _require = __webpack_require__(53),
    NotSupportedError = _require.NotSupportedError;

/**
 * JWA
 * https://tools.ietf.org/html/rfc7518
 */


var JWA = function () {
  function JWA() {
    _classCallCheck(this, JWA);
  }

  _createClass(JWA, null, [{
    key: 'sign',


    /**
     * Sign
     *
     * @description
     * Create a digital signature.
     *
     * @param {string} alg
     * @param {CryptoKey} key
     * @param {string|Buffer} data
     *
     * @return {Promise}
     */
    value: function sign(alg, key, data) {
      // normalize the algorithm
      var normalizedAlgorithm = supportedAlgorithms.normalize('sign', alg);

      // validate algorithm is supported
      if (normalizedAlgorithm instanceof Error) {
        return Promise.reject(new NotSupportedError(alg));
      }

      // validate type of key
      // TODO
      //  - is the key suitable for the algorithm?
      //  - does that get validated in webcrypto?
      //if (key instanceof CryptoKey) {
      //  return Promise.reject(new InvalidKeyError())
      //}

      // sign the data
      return normalizedAlgorithm.sign(key, data);
    }

    /**
     * Verify
     *
     * @description
     * Verify a digital signature.
     *
     * @param {string} alg
     * @param {CryptoKey} privateKey
     * @param {string|Buffer} signature
     * @param {string|Buffer} data
     *
     * @return {Promise}
     */

  }, {
    key: 'verify',
    value: function verify(alg, key, signature, data) {
      var normalizedAlgorithm = supportedAlgorithms.normalize('verify', alg);

      if (normalizedAlgorithm instanceof Error) {
        return Promise.reject(new NotSupportedError(alg));
      }

      // TODO
      // validate publicKey

      // verify the signature
      return normalizedAlgorithm.verify(key, signature, data);
    }

    /**
     * Encrypt
     */

    /**
     * Decrypt
     */

    /**
     * Import
     */

  }, {
    key: 'importKey',
    value: function importKey(key) {
      try {
      var normalizedAlgorithm = supportedAlgorithms.normalize('importKey', key.alg);
      return normalizedAlgorithm.importKey(key);
      } catch(err) {
      }
    }
  }]);

  return JWA;
}();

/**
 * Export
 */


module.exports = JWA;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38).default;
module.exports.default = module.exports;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
const pad_string_1 = __webpack_require__(43);
function encode(input, encoding = "utf8") {
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(Buffer.from(input, encoding).toString("base64"));
}
;
function decode(base64url, encoding = "utf8") {
    return Buffer.from(toBase64(base64url), "base64").toString(encoding);
}
function toBase64(base64url) {
    base64url = base64url.toString();
    return pad_string_1.default(base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
}
function fromBase64(base64) {
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function toBuffer(base64url) {
    return Buffer.from(toBase64(base64url), "base64");
}
let base64url = encode;
base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;
exports.default = base64url;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39).Buffer))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(40)
var ieee754 = __webpack_require__(41)
var isArray = __webpack_require__(42)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
function padString(input) {
    let segmentLength = 4;
    let stringLength = input.length;
    let diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    let position = stringLength;
    let padLength = segmentLength - diff;
    let paddedStringLength = stringLength + padLength;
    let buffer = Buffer.alloc(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}
exports.default = padString;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39).Buffer))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */
var None = __webpack_require__(45);
var HMAC = __webpack_require__(46);
var RSASSA_PKCS1_v1_5 = __webpack_require__(50);
var SupportedAlgorithms = __webpack_require__(51);

/**
 * Register Supported Algorithms
 */
var supportedAlgorithms = new SupportedAlgorithms();

/**
 * Sign
 */
supportedAlgorithms.define('HS256', 'sign', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-256'
  }
}));

supportedAlgorithms.define('HS384', 'sign', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-384'
  }
}));

supportedAlgorithms.define('HS512', 'sign', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-512'
  }
}));

supportedAlgorithms.define('RS256', 'sign', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-256'
  }
}));

supportedAlgorithms.define('RS384', 'sign', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-384'
  }
}));

supportedAlgorithms.define('RS512', 'sign', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-512'
  }
}));
//supportedAlgorithms.define('ES256', 'sign', {})
//supportedAlgorithms.define('ES384', 'sign', {})
//supportedAlgorithms.define('ES512', 'sign', {})
//supportedAlgorithms.define('PS256', 'sign', {})
//supportedAlgorithms.define('PS384', 'sign', {})
//supportedAlgorithms.define('PS512', 'sign', {})

supportedAlgorithms.define('none', 'sign', new None({
  // nothing goes here
}));

/**
 * Verify
 */
supportedAlgorithms.define('HS256', 'verify', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-256'
  }
}));

supportedAlgorithms.define('HS384', 'verify', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-384'
  }
}));

supportedAlgorithms.define('HS512', 'verify', new HMAC({
  name: 'HMAC',
  hash: {
    name: 'SHA-512'
  }
}));

supportedAlgorithms.define('RS256', 'verify', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-256'
  }
}));

supportedAlgorithms.define('RS384', 'verify', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-384'
  }
}));

supportedAlgorithms.define('RS512', 'verify', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-512'
  }
}));
//supportedAlgorithms.define('ES256', 'verify', {})
//supportedAlgorithms.define('ES384', 'verify', {})
//supportedAlgorithms.define('ES512', 'verify', {})
//supportedAlgorithms.define('PS256', 'verify', {})
//supportedAlgorithms.define('PS384', 'verify', {})
//supportedAlgorithms.define('PS512', 'verify', {})

supportedAlgorithms.define('none', 'verify', new None({
  // nothing goes here
}));

supportedAlgorithms.define('RS256', 'importKey', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-256'
  }
}));

supportedAlgorithms.define('RS384', 'importKey', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-384'
  }
}));

supportedAlgorithms.define('RS512', 'importKey', new RSASSA_PKCS1_v1_5({
  name: 'RSASSA-PKCS1-v1_5',
  hash: {
    name: 'SHA-512'
  }
}));

/**
 * Export
 */
module.exports = supportedAlgorithms;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * None
 */
var None = function () {
  function None() {
    _classCallCheck(this, None);
  }

  _createClass(None, [{
    key: 'sign',

    /**
     * sign
     */
    value: function sign() {
      return Promise.resolve('');
    }

    /**
     * verify
     */

  }, {
    key: 'verify',
    value: function verify() {
      // this will never get called. but you looked.
    }
  }]);

  return None;
}();

/**
 * Export
 */


module.exports = None;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/**
 * Dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base64url = __webpack_require__(37);
var crypto = __webpack_require__(47);
var TextEncoder = __webpack_require__(48);

/**
 * HMAC with SHA-2 Functions
 */

var HMAC = function () {

  /**
   * Constructor
   *
   * @param {string} bitlength
   */
  function HMAC(params) {
    _classCallCheck(this, HMAC);

    this.params = params;
  }

  /**
   * Sign
   *
   * @description
   * Generate a hash-based message authentication code for a
   * given input and key. Enforce the key length is equal to
   * or greater than the bitlength.
   *
   * @param {CryptoKey} key
   * @param {string} data
   *
   * @returns {string}
   */


  _createClass(HMAC, [{
    key: 'sign',
    value: function sign(key, data) {
      var algorithm = this.params;

      // TODO: validate key length

      data = new TextEncoder().encode(data);

      return crypto.subtle.sign(algorithm, key, data).then(function (signature) {
        return base64url(Buffer.from(signature));
      });
    }

    /**
     * Verify
     *
     * @description
     * Verify a digital signature for a given input and private key.
     *
     * @param {CryptoKey} key
     * @param {string} signature
     * @param {string} data
     *
     * @returns {Boolean}
     */

  }, {
    key: 'verify',
    value: function verify(key, signature, data) {
      var algorithm = this.params;

      if (typeof signature === 'string') {
        signature = Uint8Array.from(base64url.toBuffer(signature));
      }

      if (typeof data === 'string') {
        data = new TextEncoder().encode(data);
      }

      return crypto.subtle.verify(algorithm, key, signature, data);
    }

    /**
     * Assert Sufficient Key Length
     *
     * @description Assert that the key length is sufficient
     * @param {string} key
     */

  }, {
    key: 'assertSufficientKeyLength',
    value: function assertSufficientKeyLength(key) {
      if (key.length < this.bitlength) {
        throw new Error('The key is too short.');
      }
    }
  }]);

  return HMAC;
}();

/**
 * Export
 */


module.exports = HMAC;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39).Buffer))

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__47__;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TextEncoder = global.TextEncoder ? global.TextEncoder // browser
: __webpack_require__(49).TextEncoder; // node shim
module.exports = TextEncoder;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__49__;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/**
 * Dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base64url = __webpack_require__(37);
var crypto = __webpack_require__(47);
var TextEncoder = __webpack_require__(48);

/**
 * RSASSA-PKCS1-v1_5
 */

var RSASSA_PKCS1_v1_5 = function () {

  /**
   * constructor
   *
   * @param {string} bitlength
   */
  function RSASSA_PKCS1_v1_5(params) {
    _classCallCheck(this, RSASSA_PKCS1_v1_5);

    this.params = params;
  }

  /**
   * sign
   *
   * @description
   * Generate a digital signature for a given input and private key.
   *
   * @param {CryptoKey} key
   * @param {BufferSource} data
   *
   * @returns {Promise}
   */


  _createClass(RSASSA_PKCS1_v1_5, [{
    key: 'sign',
    value: function sign(key, data) {
      var algorithm = this.params;

      // TODO
      //if (!this.sufficientKeySize()) {
      //  return Promise.reject(
      //    new Error(
      //      'A key size of 2048 bits or larger must be used with RSASSA-PKCS1-v1_5'
      //    )
      //  )
      //}

      data = new TextEncoder().encode(data);

      return crypto.subtle.sign(algorithm, key, data).then(function (signature) {
        return base64url(Buffer.from(signature));
      });
    }

    /**
     * verify
     *
     * @description
     * Verify a digital signature for a given input and private key.
     *
     * @param {CryptoKey} key
     * @param {BufferSource} signature
     * @param {BufferSource} data
     *
     * @returns {Promise}
     */

  }, {
    key: 'verify',
    value: function verify(key, signature, data) {
      var algorithm = this.params;

      if (typeof signature === 'string') {
        signature = Uint8Array.from(base64url.toBuffer(signature));
      }

      if (typeof data === 'string') {
        data = new TextEncoder().encode(data);
      }
      // ...

      return crypto.subtle.verify(algorithm, key, signature, data);
    }

    /**
     * importKey
     *
     * @param {JWK} key
     * @returns {Promise}
     */

  }, {
    key: 'importKey',
    value: function importKey(key) {
      var jwk = Object.assign({}, key);
      var algorithm = this.params;
      var usages = key['key_ops'] || [];

      if (key.use === 'sig') {
        usages.push('verify');
      }

      if (key.use === 'enc') {
        // TODO: handle encryption keys
        return Promise.resolve(key);
      }

      if (key.key_ops) {
        usages = key.key_ops;
      }

      return crypto.subtle.importKey('jwk', jwk, algorithm, true, usages).then(function (cryptoKey) {
        Object.defineProperty(jwk, 'cryptoKey', {
          enumerable: false,
          value: cryptoKey
        });

        return jwk;
      });
    }
  }]);

  return RSASSA_PKCS1_v1_5;
}();

/**
 * Export
 */


module.exports = RSASSA_PKCS1_v1_5;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39).Buffer))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var NotSupportedError = __webpack_require__(52);

/**
 * Operations
 */
var operations = ['sign', 'verify', 'encrypt', 'decrypt', 'importKey'];

/**
 * SupportedAlgorithms
 */

var SupportedAlgorithms = function () {

  /**
   * constructor
   */
  function SupportedAlgorithms() {
    var _this = this;

    _classCallCheck(this, SupportedAlgorithms);

    operations.forEach(function (op) {
      _this[op] = {};
    });
  }

  /**
   * Supported Operations
   */


  _createClass(SupportedAlgorithms, [{
    key: 'define',


    /**
     * define
     *
     * @description
     * Register Web Crypto API algorithm parameter for an algorithm
     * and operation.
     *
     * @param {string} alg
     * @param {string} op
     * @param {Object} argument
     */
    value: function define(alg, op, argument) {
      var registeredAlgorithms = this[op];
      registeredAlgorithms[alg] = argument;
    }

    /**
     * normalize
     *
     * @description
     * Map JWA alg name to Web Crypto API algorithm parameter
     *
     * @param {string} op
     * @param {Object} alg
     *
     * @returns {Object}
     */

  }, {
    key: 'normalize',
    value: function normalize(op, alg) {
      var registeredAlgorithms = this[op];

      if (!registeredAlgorithms) {
        return new SyntaxError(); // what kind of error should this be?
      }

      var argument = registeredAlgorithms[alg];

      if (!argument) {
        return new NotSupportedError(alg);
      }

      return argument;
    }
  }], [{
    key: 'operations',
    get: function get() {
      return operations;
    }
  }]);

  return SupportedAlgorithms;
}();

/**
 * Export
 */


module.exports = SupportedAlgorithms;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * NotSupportedError
 */
var NotSupportedError = function (_Error) {
  _inherits(NotSupportedError, _Error);

  function NotSupportedError(alg) {
    _classCallCheck(this, NotSupportedError);

    var _this = _possibleConstructorReturn(this, (NotSupportedError.__proto__ || Object.getPrototypeOf(NotSupportedError)).call(this));

    _this.message = alg + " is not a supported algorithm";
    return _this;
  }

  return NotSupportedError;
}(Error);

/**
 * Export
 */


module.exports = NotSupportedError;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  DataError: __webpack_require__(54),
  NotSupportedError: __webpack_require__(52)
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DataError
 */
var DataError = function (_Error) {
  _inherits(DataError, _Error);

  function DataError(message) {
    _classCallCheck(this, DataError);

    return _possibleConstructorReturn(this, (DataError.__proto__ || Object.getPrototypeOf(DataError)).call(this, message));
  }

  return DataError;
}(Error);

/**
 * Export
 */


module.exports = DataError;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(26),
    JSONDocument = _require.JSONDocument;

var JWKSchema = __webpack_require__(56);
var JWA = __webpack_require__(36);

/**
 * JWK Class
 */

var JWK = function (_JSONDocument) {
  _inherits(JWK, _JSONDocument);

  function JWK() {
    _classCallCheck(this, JWK);

    return _possibleConstructorReturn(this, (JWK.__proto__ || Object.getPrototypeOf(JWK)).apply(this, arguments));
  }

  _createClass(JWK, null, [{
    key: 'importKey',


    /**
     * importKey
     *
     * TODO:
     * - should this be on JWA?
     */
    value: function importKey(jwk) {
      return JWA.importKey(jwk);
    }
  }, {
    key: 'schema',


    /**
     * Schema
     */
    get: function get() {
      return JWKSchema;
    }
  }]);

  return JWK;
}(JSONDocument);

/**
 * Export
 */


module.exports = JWK;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 * @ignore
 */

var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

var _require2 = __webpack_require__(57),
    BASE64_REGEXP = _require2.BASE64_REGEXP;

/**
 * JWK Schema
 */


var JWKSchema = new JSONSchema({
  type: 'object',
  properties: {

    kty: {
      type: 'string',
      //format: 'case-sensitive',
      enum: ['RSA', 'EC', 'oct'] // other values MAY be used
    },

    use: {
      type: 'string',
      //format: 'case-sensitive',
      enum: ['sig', 'enc'] // other values MAY be used
    },

    key_ops: {
      type: 'array',
      //format: 'case-sensitive',
      items: {
        enum: ['sign', 'verify', 'encrypt', 'decrypt', 'wrapKey', 'unwrapKey', 'deriveKey', 'deriveBits'] // other values MAY be used
      }
    },

    alg: {
      type: 'string',
      //format: 'case-sensitive',
      enum: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'PS256', 'PS384', 'PS512', 'none'] // other values MAY be used
    },

    kid: {
      type: 'string'
    },

    x5u: {
      type: 'string'
      //format: 'url'
    },

    x5c: {
      type: 'array'
      //format: BASE64_REGEXP
    },

    x5t: {
      type: 'string'
      //format: BASE64_REGEXP
    }

    //'x5t#S256': {
    //  type: 'string',
    //  //format: BASE64_REGEXP
    //}
  }
});

/**
 * Export
 */
module.exports = JWKSchema;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Package dependencies
 */
var _require = __webpack_require__(26),
    Formats = _require.Formats;

/**
 * Format extensions
 */


Formats.register('StringOrURI', new RegExp());
Formats.register('NumericDate', new RegExp());
Formats.register('URI', new RegExp());
Formats.register('url', new RegExp());
Formats.register('base64', new RegExp());
Formats.register('base64url', new RegExp());
Formats.register('MediaType', new RegExp());

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(26),
    JSONDocument = _require.JSONDocument;

var JWKSetSchema = __webpack_require__(59);
var JWK = __webpack_require__(55);

/**
 * JWKSet
 *
 * @class
 * JWKSet represents a JSON Web Key Set as described in Section 5 of RFC 7517:
 * https://tools.ietf.org/html/rfc7517#section-5
 */

var JWKSet = function (_JSONDocument) {
  _inherits(JWKSet, _JSONDocument);

  function JWKSet() {
    _classCallCheck(this, JWKSet);

    return _possibleConstructorReturn(this, (JWKSet.__proto__ || Object.getPrototypeOf(JWKSet)).apply(this, arguments));
  }

  _createClass(JWKSet, null, [{
    key: 'importKeys',


    /**
     * importKeys
     */
    value: function importKeys(jwks) {
      var validation = this.schema.validate(jwks);

      if (!validation.valid) {
        return Promise.reject(new Error('Invalid JWKSet: ' + JSON.stringify(validation, null, 2)));
      }

      if (!jwks.keys) {
        return Promise.reject(new Error('Cannot import JWKSet: keys property is empty'));
      }

      var imported = void 0,
          importing = void 0;

      try {
        imported = new JWKSet(jwks);
        importing = jwks.keys.map(function (key) {
          return JWK.importKey(key);
        });
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.all(importing).then(function (keys) {
        imported.keys = keys;
        return imported;
      });
    }
  }, {
    key: 'schema',


    /**
     * schema
     */
    get: function get() {
      return JWKSetSchema;
    }
  }]);

  return JWKSet;
}(JSONDocument);

/**
 * Export
 */


module.exports = JWKSet;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

var JWKSchema = __webpack_require__(56);

/**
 * JWKSetSchema
 */
var JWKSetSchema = new JSONSchema({
  type: 'object',
  properties: {
    keys: {
      type: 'array',
      items: JWKSchema
    }
  }
});

/**
 * Export
 */
module.exports = JWKSetSchema;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dependencies
 */
var base64url = __webpack_require__(37);

var _require = __webpack_require__(26),
    JSONDocument = _require.JSONDocument;

var JWTSchema = __webpack_require__(61);
var JWS = __webpack_require__(65);
var DataError = __webpack_require__(54);

/**
 * JWT
 */

var JWT = function (_JSONDocument) {
  _inherits(JWT, _JSONDocument);

  function JWT() {
    _classCallCheck(this, JWT);

    return _possibleConstructorReturn(this, (JWT.__proto__ || Object.getPrototypeOf(JWT)).apply(this, arguments));
  }

  _createClass(JWT, [{
    key: 'isJWE',


    /**
     * isJWE
     */
    value: function isJWE() {
      return !!this.header.enc;
    }

    /**
     * resolveKeys
     */

  }, {
    key: 'resolveKeys',
    value: function resolveKeys(jwks) {
      var kid = this.header.kid;
      var keys = void 0,
          match = void 0;

      // treat an array as the "keys" property of a JWK Set
      if (Array.isArray(jwks)) {
        keys = jwks;
      }

      // presence of keys indicates object is a JWK Set
      if (jwks.keys) {
        keys = jwks.keys;
      }

      // wrap a plain object they is not a JWK Set in Array
      if (!jwks.keys && (typeof jwks === 'undefined' ? 'undefined' : _typeof(jwks)) === 'object') {
        keys = [jwks];
      }

      // ensure there are keys to search
      if (!keys) {
        throw new DataError('Invalid JWK argument');
      }

      // match by "kid" or "use" header
      if (kid) {
        match = keys.find(function (jwk) {
          return jwk.kid === kid;
        });
      } else {
        match = keys.find(function (jwk) {
          return jwk.use === 'sig';
        });
      }

      // assign matching key to JWT and return a boolean
      if (match) {
        this.key = match.cryptoKey;
        return true;
      } else {
        return false;
      }
    }

    /**
     * encode
     *
     * @description
     * Encode a JWT instance
     *
     * @returns {Promise}
     */

  }, {
    key: 'encode',
    value: function encode() {
      // validate
      var validation = this.validate();

      if (!validation.valid) {
        return Promise.reject(validation);
      }

      var token = this;

      if (this.isJWE()) {
        return JWE.encrypt(token);
      } else {
        return JWS.sign(token);
      }
    }

    /**
     * verify
     *
     * @description
     * Verify a decoded JWT instance
     *
     * @returns {Promise}
     */

  }, {
    key: 'verify',
    value: function verify() {
      var validation = this.validate();

      if (!validation.valid) {
        return Promise.reject(validation);
      }

      return JWS.verify(this);
    }
  }], [{
    key: 'decode',


    /**
     * decode
     *
     * @description
     * Decode a JSON Web Token
     *
     * @param {string} data
     * @returns {JWT}
     */
    value: function decode(data) {
      var ExtendedJWT = this;
      var jwt = void 0;

      if (typeof data !== 'string') {
        throw new DataError('JWT must be a string');
      }

      // JSON of Flattened JSON Serialization
      if (data.startsWith('{')) {
        try {
          data = JSON.parse(data, function () {});
        } catch (error) {
          throw new DataError('Invalid JWT serialization');
        }

        if (data.signatures || data.recipients) {
          data.serialization = 'json';
        } else {
          data.serialization = 'flattened';
        }

        jwt = new ExtendedJWT(data, { filter: false });

        // Compact Serialization
      } else {
        try {
          var serialization = 'compact';
          var segments = data.split('.');
          var length = segments.length;

          if (length !== 3 && length !== 5) {
            throw new Error('Malformed JWT');
          }

          var header = JSON.parse(base64url.decode(segments[0]));

          // JSON Web Signature
          if (length === 3) {
            var type = 'JWS';
            var payload = JSON.parse(base64url.decode(segments[1]));
            var signature = segments[2];

            jwt = new ExtendedJWT({ type: type, segments: segments, header: header, payload: payload, signature: signature, serialization: serialization }, { filter: false });
          }

          // JSON Web Encryption
          if (length === 5) {
            //let type = 'JWE'
            //let [protected, encryption_key, iv, ciphertext, tag] = segments

            //jwt = new ExtendedJWT({
            //  type,
            //  protected: base64url.decode(JSON.parse(protected)),
            //  encryption_key,
            //  iv,
            //  ciphertext,
            //  tag,
            //  serialization
            //})
          }
        } catch (error) {
          throw new DataError('Invalid JWT compact serialization');
        }
      }

      return jwt;
    }

    /**
     * encode
     *
     * @description
     * Encode a JSON Web Token
     *
     * @param {Object} header
     * @param {Object} payload
     * @param {CryptoKey} key
     *
     * @returns {Promise}
     */

  }, {
    key: 'encode',
    value: function encode(header, payload, key) {
      var jwt = new JWT(header, payload);
      return jwt.encode(key);
    }

    /**
     * verify
     *
     * @description
     *
     * @param {CryptoKey} key
     * @param {string} token
     *
     * @returns {Promise}
     */

  }, {
    key: 'verify',
    value: function verify(key, token) {
      var jwt = JWT.decode(token);
      jwt.key = key;
      return jwt.verify().then(function (verified) {
        return jwt;
      });
    }
  }, {
    key: 'schema',


    /**
     * schema
     */
    get: function get() {
      return JWTSchema;
    }
  }]);

  return JWT;
}(JSONDocument);

/**
 * Export
 */


module.exports = JWT;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var Base64URLSchema = __webpack_require__(62);
var JWTClaimsSetSchema = __webpack_require__(63);
var JOSEHeaderSchema = __webpack_require__(64);

var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

/**
 * JWTSchema
 *
 * @description
 * This schema represents all the things a deserialized JWT can be, i.e.,
 * either a JWS or JWE, and any serialization of them. Validation of well-
 * formedness for a given serialization is accomplished at the time of
 * encoding.
 */


var JWTSchema = new JSONSchema({
  type: 'object',
  properties: {

    /**
     * type
     */
    type: {
      type: 'string',
      enum: ['JWS', 'JWE']
    },

    /**
     * segments
     */
    segments: {
      type: 'array'
    },

    /**
     * header
     */
    header: JOSEHeaderSchema,

    /**
     * protected
     */
    protected: JOSEHeaderSchema,

    /**
     * unprotected
     */
    unprotected: JOSEHeaderSchema,

    /**
     * iv
     */
    iv: Base64URLSchema,

    /**
     * aad
     */
    aad: Base64URLSchema,

    /**
     * ciphertext
     */
    ciphertext: Base64URLSchema,

    /**
     * tag
     */
    tag: Base64URLSchema,

    /**
     * recipients
     */
    recipients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          header: JOSEHeaderSchema,
          encrypted_key: Base64URLSchema
        }
      }
    },

    /**
     * payload
     */
    payload: JWTClaimsSetSchema,

    /**
     * signatures
     */
    signatures: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          protected: JOSEHeaderSchema,
          header: JOSEHeaderSchema,
          signature: Base64URLSchema,
          key: { type: 'object' }
        }
      }
    },

    /**
     * signature
     */
    signature: Base64URLSchema,

    /**
     * verified
     */
    verified: {
      type: 'boolean',
      default: false
    },

    /**
     * key
     */
    key: {
      type: 'object'
    },

    /**
     * serialization
     */
    serialization: {
      type: 'string',
      enum: ['compact', 'json', 'flattened'],
      default: 'compact'
    }
  }
});

/**
 * Export
 */
module.exports = JWTSchema;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

/**
 * Base64URLSchema
 */


var Base64URLSchema = new JSONSchema({
  type: 'string',
  format: 'base64url'
});

/**
 * Export
 */
module.exports = Base64URLSchema;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

/**
 * JWTClaimsSetSchema
 *
 * JSON Web Token (JWT)
 * https://tools.ietf.org/html/rfc7519#section-4
 *
 * 4.  JWT Claims
 *
 *   The JWT Claims Set represents a JSON object whose members are the
 *   claims conveyed by the JWT.  The Claim Names within a JWT Claims Set
 *   MUST be unique; JWT parsers MUST either reject JWTs with duplicate
 *   Claim Names or use a JSON parser that returns only the lexically last
 *   duplicate member name, as specified in Section 15.12 ("The JSON
 *   Object") of ECMAScript 5.1 [ECMAScript].
 *
 *   The set of claims that a JWT must contain to be considered valid is
 *   context dependent and is outside the scope of this specification.
 *   Specific applications of JWTs will require implementations to
 *   understand and process some claims in particular ways.  However, in
 *   the absence of such requirements, all claims that are not understood
 *   by implementations MUST be ignored.
 *
 *   There are three classes of JWT Claim Names: Registered Claim Names,
 *   Public Claim Names, and Private Claim Names.
 */


var JWTClaimsSetSchema = new JSONSchema({
  properties: {

    /**
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1
     *
     * 4.1.  Registered Claim Names
     *
     *   The following Claim Names are registered in the IANA "JSON Web Token
     *   Claims" registry established by Section 10.1.  None of the claims
     *   defined below are intended to be mandatory to use or implement in all
     *   cases, but rather they provide a starting point for a set of useful,
     *   interoperable claims.  Applications using JWTs should define which
     *   specific claims they use and when they are required or optional.  All
     *   the names are short because a core goal of JWTs is for the
     *   representation to be compact.
     */

    /**
     * iss
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.1
     *
     * 4.1.1.  "iss" (Issuer) Claim
     *
     *   The "iss" (issuer) claim identifies the principal that issued the
     *   JWT.  The processing of this claim is generally application specific.
     *   The "iss" value is a case-sensitive string containing a StringOrURI
     *   value.  Use of this claim is OPTIONAL.
     */
    iss: {
      type: 'string',
      format: 'StringOrURI'
    },

    /**
     * sub
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.2
     *
     * 4.1.2.  "sub" (Subject) Claim
     *
     *   The "sub" (subject) claim identifies the principal that is the
     *   subject of the JWT.  The claims in a JWT are normally statements
     *   about the subject.  The subject value MUST either be scoped to be
     *   locally unique in the context of the issuer or be globally unique.
     *   The processing of this claim is generally application specific.  The
     *   "sub" value is a case-sensitive string containing a StringOrURI
     *   value.  Use of this claim is OPTIONAL.
     */
    sub: {
      type: 'string',
      format: 'StringOrURI'
    },

    /**
     * aud
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.3
     *
     * 4.1.3.  "aud" (Audience) Claim
     *
     *   The "aud" (audience) claim identifies the recipients that the JWT is
     *   intended for.  Each principal intended to process the JWT MUST
     *   identify itself with a value in the audience claim.  If the principal
     *   processing the claim does not identify itself with a value in the
     *   "aud" claim when this claim is present, then the JWT MUST be
     *   rejected.  In the general case, the "aud" value is an array of case-
     *   sensitive strings, each containing a StringOrURI value.  In the
     *   special case when the JWT has one audience, the "aud" value MAY be a
     *   single case-sensitive string containing a StringOrURI value.  The
     *   interpretation of audience values is generally application specific.
     *   Use of this claim is OPTIONAL.
     */
    aud: {
      type: ['array', 'string'],
      format: 'StringOrURI',
      items: {
        format: 'StringOrURI'
      }
    },

    /**
     * exp
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.4
     *
     * 4.1.4.  "exp" (Expiration Time) Claim
     *
     *   The "exp" (expiration time) claim identifies the expiration time on
     *   or after which the JWT MUST NOT be accepted for processing.  The
     *   processing of the "exp" claim requires that the current date/time
     *   MUST be before the expiration date/time listed in the "exp" claim.
     *
     *   Implementers MAY provide for some small leeway, usually no more than
     *   a few minutes, to account for clock skew.  Its value MUST be a number
     *   containing a NumericDate value.  Use of this claim is OPTIONAL.
     *
     */
    exp: {
      type: 'number',
      format: 'NumericDate'
    },

    /**
     * nbf
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.5
     *
     * 4.1.5.  "nbf" (Not Before) Claim
     *
     *   The "nbf" (not before) claim identifies the time before which the JWT
     *   MUST NOT be accepted for processing.  The processing of the "nbf"
     *   claim requires that the current date/time MUST be after or equal to
     *   the not-before date/time listed in the "nbf" claim.  Implementers MAY
     *   provide for some small leeway, usually no more than a few minutes, to
     *   account for clock skew.  Its value MUST be a number containing a
     *   NumericDate value.  Use of this claim is OPTIONAL.
     */
    nbf: {
      type: 'number',
      format: 'NumericDate'
    },

    /**
     * iat
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.6
     *
     * 4.1.6.  "iat" (Issued At) Claim
     *
     *   The "iat" (issued at) claim identifies the time at which the JWT was
     *   issued.  This claim can be used to determine the age of the JWT.  Its
     *   value MUST be a number containing a NumericDate value.  Use of this
     *   claim is OPTIONAL.
     */
    iat: {
      type: 'number',
      format: 'NumericDate'
    },

    /**
     * jti
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-4.1.7
     *
     * 4.1.7.  "jti" (JWT ID) Claim
     *
     *   The "jti" (JWT ID) claim provides a unique identifier for the JWT.
     *   The identifier value MUST be assigned in a manner that ensures that
     *   there is a negligible probability that the same value will be
     *   accidentally assigned to a different data object; if the application
     *   uses multiple issuers, collisions MUST be prevented among values
     *   produced by different issuers as well.  The "jti" claim can be used
     *   to prevent the JWT from being replayed.  The "jti" value is a case-
     *   sensitive string.  Use of this claim is OPTIONAL.
     */
    jti: {
      type: 'string'
    }
  }
});

/**
 * Export
 */
module.exports = JWTClaimsSetSchema;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var JWKSchema = __webpack_require__(56);

var _require = __webpack_require__(26),
    JSONSchema = _require.JSONSchema;

/**
 * JOSEHeaderSchema
 *
 * JSON Web Token (JWT)
 * https://tools.ietf.org/html/rfc7519#section-5
 *
 * 5.  JOSE Header
 *
 *   For a JWT object, the members of the JSON object represented by the
 *   JOSE Header describe the cryptographic operations applied to the JWT
 *   and optionally, additional properties of the JWT.  Depending upon
 *   whether the JWT is a JWS or JWE, the corresponding rules for the JOSE
 *   Header values apply.
 */


var JOSEHeaderSchema = new JSONSchema({
  type: 'object',
  properties: {

    /**
     * typ
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-5.1
     *
     * 5.1.  "typ" (Type) Header Parameter
     *
     *   The "typ" (type) Header Parameter defined by [JWS] and [JWE] is used
     *   by JWT applications to declare the media type [IANA.MediaTypes] of
     *   this complete JWT.  This is intended for use by the JWT application
     *   when values that are not JWTs could also be present in an application
     *   data structure that can contain a JWT object; the application can use
     *   this value to disambiguate among the different kinds of objects that
     *   might be present.  It will typically not be used by applications when
     *   it is already known that the object is a JWT.  This parameter is
     *   ignored by JWT implementations; any processing of this parameter is
     *   performed by the JWT application.  If present, it is RECOMMENDED that
     *   its value be "JWT" to indicate that this object is a JWT.  While
     *   media type names are not case sensitive, it is RECOMMENDED that "JWT"
     *   always be spelled using uppercase characters for compatibility with
     *   legacy implementations.  Use of this Header Parameter is OPTIONAL.
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.9
     *
     * 4.1.9.  "typ" (Type) Header Parameter
     *
     *   The "typ" (type) Header Parameter is used by JWS applications to
     *   declare the media type [IANA.MediaTypes] of this complete JWS.  This
     *   is intended for use by the application when more than one kind of
     *   object could be present in an application data structure that can
     *   contain a JWS; the application can use this value to disambiguate
     *   among the different kinds of objects that might be present.  It will
     *   typically not be used by applications when the kind of object is
     *   already known.  This parameter is ignored by JWS implementations; any
     *   processing of this parameter is performed by the JWS application.
     *   Use of this Header Parameter is OPTIONAL.
     *
     *   Per RFC 2045 [RFC2045], all media type values, subtype values, and
     *   parameter names are case insensitive.  However, parameter values are
     *   case sensitive unless otherwise specified for the specific parameter.
     *
     *   To keep messages compact in common situations, it is RECOMMENDED that
     *   producers omit an "application/" prefix of a media type value in a
     *   "typ" Header Parameter when no other '/' appears in the media type
     *   value.  A recipient using the media type value MUST treat it as if
     *   "application/" were prepended to any "typ" value not containing a
     *   '/'.  For instance, a "typ" value of "example" SHOULD be used to
     *   represent the "application/example" media type, whereas the media
     *   type "application/example;part="1/2"" cannot be shortened to
     *   "example;part="1/2"".
     *
     *   The "typ" value "JOSE" can be used by applications to indicate that
     *   this object is a JWS or JWE using the JWS Compact Serialization or
     *   the JWE Compact Serialization.  The "typ" value "JOSE+JSON" can be
     *   used by applications to indicate that this object is a JWS or JWE
     *   using the JWS JSON Serialization or the JWE JSON Serialization.
     *   Other type values can also be used by applications.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.11
     *
     * 4.1.11.  "typ" (Type) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "typ" Header Parameter defined in Section 4.1.9 of [JWS], except
     *   that the type is that of this complete JWE.
     */
    typ: {
      type: 'string'
    },

    /**
     * cty
     *
     * JSON Web Token (JWT)
     * https://tools.ietf.org/html/rfc7519#section-5.2
     *
     * 5.2.  "cty" (Content Type) Header Parameter
     *
     *   The "cty" (content type) Header Parameter defined by [JWS] and [JWE]
     *   is used by this specification to convey structural information about
     *   the JWT.
     *
     *   In the normal case in which nested signing or encryption operations
     *   are not employed, the use of this Header Parameter is NOT
     *   RECOMMENDED.  In the case that nested signing or encryption is
     *   employed, this Header Parameter MUST be present; in this case, the
     *   value MUST be "JWT", to indicate that a Nested JWT is carried in this
     *   JWT.  While media type names are not case sensitive, it is
     *   RECOMMENDED that "JWT" always be spelled using uppercase characters
     *   for compatibility with legacy implementations.  See Appendix A.2 for
     *   an example of a Nested JWT.
     *
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.10
     *
     * 4.1.10.  "cty" (Content Type) Header Parameter
     *
     *   The "cty" (content type) Header Parameter is used by JWS applications
     *   to declare the media type [IANA.MediaTypes] of the secured content
     *   (the payload).  This is intended for use by the application when more
     *   than one kind of object could be present in the JWS Payload; the
     *   application can use this value to disambiguate among the different
     *   kinds of objects that might be present.  It will typically not be
     *   used by applications when the kind of object is already known.  This
     *   parameter is ignored by JWS implementations; any processing of this
     *   parameter is performed by the JWS application.  Use of this Header
     *   Parameter is OPTIONAL.
     *
     *   Per RFC 2045 [RFC2045], all media type values, subtype values, and
     *   parameter names are case insensitive.  However, parameter values are
     *   case sensitive unless otherwise specified for the specific parameter.
     *
     *   To keep messages compact in common situations, it is RECOMMENDED that
     *   producers omit an "application/" prefix of a media type value in a
     *   "cty" Header Parameter when no other '/' appears in the media type
     *   value.  A recipient using the media type value MUST treat it as if
     *   "application/" were prepended to any "cty" value not containing a
     *   '/'.  For instance, a "cty" value of "example" SHOULD be used to
     *   represent the "application/example" media type, whereas the media
     *   type "application/example;part="1/2"" cannot be shortened to
     *   "example;part="1/2"".
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.12
     *
     * 4.1.12.  "cty" (Content Type) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "cty" Header Parameter defined in Section 4.1.10 of [JWS], except
     *   that the type is that of the secured content (the plaintext).
     */
    cty: {
      type: 'string',
      enum: ['JWT']
    },

    /**
     * alg
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.1
     *
     * 4.1.1.  "alg" (Algorithm) Header Parameter
     *
     *   The "alg" (algorithm) Header Parameter identifies the cryptographic
     *   algorithm used to secure the JWS.  The JWS Signature value is not
     *   valid if the "alg" value does not represent a supported algorithm or
     *   if there is not a key for use with that algorithm associated with the
     *   party that digitally signed or MACed the content.  "alg" values
     *   should either be registered in the IANA "JSON Web Signature and
     *   Encryption Algorithms" registry established by [JWA] or be a value
     *   that contains a Collision-Resistant Name.  The "alg" value is a case-
     *   sensitive ASCII string containing a StringOrURI value.  This Header
     *   Parameter MUST be present and MUST be understood and processed by
     *   implementations.
     *
     *   A list of defined "alg" values for this use can be found in the IANA
     *   "JSON Web Signature and Encryption Algorithms" registry established
     *   by [JWA]; the initial contents of this registry are the values
     *   defined in Section 3.1 of [JWA].
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.1
     *
     * 4.1.1.  "alg" (Algorithm) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "alg" Header Parameter defined in Section 4.1.1 of [JWS], except
     *   that the Header Parameter identifies the cryptographic algorithm used
     *   to encrypt or determine the value of the CEK.  The encrypted content
     *   is not usable if the "alg" value does not represent a supported
     *   algorithm, or if the recipient does not have a key that can be used
     *   with that algorithm.
     *
     *   A list of defined "alg" values for this use can be found in the IANA
     *   "JSON Web Signature and Encryption Algorithms" registry established
     *   by [JWA]; the initial contents of this registry are the values
     *   defined in Section 4.1 of [JWA].
     */
    alg: {
      type: 'string',
      format: 'StringOrURI'
    },

    /**
     * jku
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.2
     *
     * 4.1.2.  "jku" (JWK Set URL) Header Parameter (JWS)
     *
     *   The "jku" (JWK Set URL) Header Parameter is a URI [RFC3986] that
     *   refers to a resource for a set of JSON-encoded public keys, one of
     *   which corresponds to the key used to digitally sign the JWS.  The
     *   keys MUST be encoded as a JWK Set [JWK].  The protocol used to
     *   acquire the resource MUST provide integrity protection; an HTTP GET
     *   request to retrieve the JWK Set MUST use Transport Layer Security
     *   (TLS) [RFC2818] [RFC5246]; and the identity of the server MUST be
     *   validated, as per Section 6 of RFC 6125 [RFC6125].  Also, see
     *   Section 8 on TLS requirements.  Use of this Header Parameter is
     *   OPTIONAL.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.4
     *
     * 4.1.4.  "jku" (JWK Set URL) Header Parameter (JWE)
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "jku" Header Parameter defined in Section 4.1.2 of [JWS], except
     *   that the JWK Set resource contains the public key to which the JWE
     *   was encrypted; this can be used to determine the private key needed
     *   to decrypt the JWE.
     */
    jku: {
      type: 'string',
      format: 'URI'
    },

    /**
     * jwk
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.3
     *
     * 4.1.3.  "jwk" (JSON Web Key) Header Parameter
     *
     *   The "jwk" (JSON Web Key) Header Parameter is the public key that
     *   corresponds to the key used to digitally sign the JWS.  This key is
     *   represented as a JSON Web Key [JWK].  Use of this Header Parameter is
     *   OPTIONAL.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.5
     *
     * 4.1.5.  "jwk" (JSON Web Key) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "jwk" Header Parameter defined in Section 4.1.3 of [JWS], except
     *   that the key is the public key to which the JWE was encrypted; this
     *   can be used to determine the private key needed to decrypt the JWE.
     */
    //jwk: JWKSchema,

    /**
     * kid
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.4
     *
     * 4.1.4.  "kid" (Key ID) Header Parameter
     *
     *   The "kid" (key ID) Header Parameter is a hint indicating which key
     *   was used to secure the JWS.  This parameter allows originators to
     *   explicitly signal a change of key to recipients.  The structure of
     *   the "kid" value is unspecified.  Its value MUST be a case-sensitive
     *   string.  Use of this Header Parameter is OPTIONAL.
     *
     *   When used with a JWK, the "kid" value is used to match a JWK "kid"
     *   parameter value.
     *
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.6
     *
     * 4.1.6.  "kid" (Key ID) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "kid" Header Parameter defined in Section 4.1.4 of [JWS], except
     *   that the key hint references the public key to which the JWE was
     *   encrypted; this can be used to determine the private key needed to
     *   decrypt the JWE.  This parameter allows originators to explicitly
     *   signal a change of key to JWE recipients.
     */
    kid: {
      type: 'string'
    },

    /**
     * x5u
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.5
     *
     * 4.1.5.  "x5u" (X.509 URL) Header Parameter
     *
     *   The "x5u" (X.509 URL) Header Parameter is a URI [RFC3986] that refers
     *   to a resource for the X.509 public key certificate or certificate
     *   chain [RFC5280] corresponding to the key used to digitally sign the
     *   JWS.  The identified resource MUST provide a representation of the
     *   certificate or certificate chain that conforms to RFC 5280 [RFC5280]
     *   in PEM-encoded form, with each certificate delimited as specified in
     *   Section 6.1 of RFC 4945 [RFC4945].  The certificate containing the
     *   public key corresponding to the key used to digitally sign the JWS
     *   MUST be the first certificate.  This MAY be followed by additional
     *   certificates, with each subsequent certificate being the one used to
     *   certify the previous one.  The protocol used to acquire the resource
     *   MUST provide integrity protection; an HTTP GET request to retrieve
     *   the certificate MUST use TLS [RFC2818] [RFC5246]; and the identity of
     *   the server MUST be validated, as per Section 6 of RFC 6125 [RFC6125].
     *   Also, see Section 8 on TLS requirements.  Use of this Header
     *   Parameter is OPTIONAL.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.7
     *
     * 4.1.7.  "x5u" (X.509 URL) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "x5u" Header Parameter defined in Section 4.1.5 of [JWS], except
     *   that the X.509 public key certificate or certificate chain [RFC5280]
     *   contains the public key to which the JWE was encrypted; this can be
     *   used to determine the private key needed to decrypt the JWE.
     */
    x5u: {
      type: 'string',
      format: 'URI'
    },

    /**
     * x5c
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.6
     *
     * 4.1.6.  "x5c" (X.509 Certificate Chain) Header Parameter
     *
     *   The "x5c" (X.509 certificate chain) Header Parameter contains the
     *   X.509 public key certificate or certificate chain [RFC5280]
     *   corresponding to the key used to digitally sign the JWS.  The
     *   certificate or certificate chain is represented as a JSON array of
     *   certificate value strings.  Each string in the array is a
     *   base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER
     *   [ITU.X690.2008] PKIX certificate value.  The certificate containing
     *   the public key corresponding to the key used to digitally sign the
     *   JWS MUST be the first certificate.  This MAY be followed by
     *   additional certificates, with each subsequent certificate being the
     *   one used to certify the previous one.  The recipient MUST validate
     *   the certificate chain according to RFC 5280 [RFC5280] and consider
     *   the certificate or certificate chain to be invalid if any validation
     *   failure occurs.  Use of this Header Parameter is OPTIONAL.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.8
     *
     * 4.1.8.  "x5c" (X.509 Certificate Chain) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "x5c" Header Parameter defined in Section 4.1.6 of [JWS], except
     *   that the X.509 public key certificate or certificate chain [RFC5280]
     *   contains the public key to which the JWE was encrypted; this can be
     *   used to determine the private key needed to decrypt the JWE.
     */
    x5c: {
      type: 'array',
      items: {
        type: 'string',
        format: 'base64'
      }
    },

    /**
     * x5t
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.7
     *
     * 4.1.7.  "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter
     *
     *   The "x5t" (X.509 certificate SHA-1 thumbprint) Header Parameter is a
     *   base64url-encoded SHA-1 thumbprint (a.k.a. digest) of the DER
     *   encoding of the X.509 certificate [RFC5280] corresponding to the key
     *   used to digitally sign the JWS.  Note that certificate thumbprints
     *   are also sometimes known as certificate fingerprints.  Use of this
     *   Header Parameter is OPTIONAL.
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.9
     *
     * 4.1.9.  "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "x5t" Header Parameter defined in Section 4.1.7 of [JWS], except
     *   that the certificate referenced by the thumbprint contains the public
     *   key to which the JWE was encrypted; this can be used to determine the
     *   private key needed to decrypt the JWE.  Note that certificate
     *   thumbprints are also sometimes known as certificate fingerprints.
     */
    x5t: {
      type: 'string',
      format: 'base64url'
    },

    /**
     * x5t#S256
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.8
     *
     * 4.1.8.  "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Header
     *         Parameter
     *
     *   The "x5t#S256" (X.509 certificate SHA-256 thumbprint) Header
     *   Parameter is a base64url-encoded SHA-256 thumbprint (a.k.a. digest)
     *   of the DER encoding of the X.509 certificate [RFC5280] corresponding
     *   to the key used to digitally sign the JWS.  Note that certificate
     *   thumbprints are also sometimes known as certificate fingerprints.
     *   Use of this Header Parameter is OPTIONAL.
     *
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.10
     *
     * 4.1.10.  "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Header
     *          Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "x5t#S256" Header Parameter defined in Section 4.1.8 of [JWS],
     *   except that the certificate referenced by the thumbprint contains the
     *   public key to which the JWE was encrypted; this can be used to
     *   determine the private key needed to decrypt the JWE.  Note that
     *   certificate thumbprints are also sometimes known as certificate
     *   fingerprints.
     */
    //'x5t#S256': {
    //  type: 'string',
    //  format: 'base64url'
    //},

    /**
     * crit
     *
     * JSON Web Signature (JWS)
     * https://tools.ietf.org/html/rfc7515#section-4.1.11
     *
     * 4.1.11.  "crit" (Critical) Header Parameter
     *
     *   The "crit" (critical) Header Parameter indicates that extensions to
     *   this specification and/or [JWA] are being used that MUST be
     *   understood and processed.  Its value is an array listing the Header
     *   Parameter names present in the JOSE Header that use those extensions.
     *   If any of the listed extension Header Parameters are not understood
     *   and supported by the recipient, then the JWS is invalid.  Producers
     *   MUST NOT include Header Parameter names defined by this specification
     *   or [JWA] for use with JWS, duplicate names, or names that do not
     *   occur as Header Parameter names within the JOSE Header in the "crit"
     *   list.  Producers MUST NOT use the empty list "[]" as the "crit"
     *   value.  Recipients MAY consider the JWS to be invalid if the critical
     *   list contains any Header Parameter names defined by this
     *   specification or [JWA] for use with JWS or if any other constraints
     *   on its use are violated.  When used, this Header Parameter MUST be
     *   integrity protected; therefore, it MUST occur only within the JWS
     *   Protected Header.  Use of this Header Parameter is OPTIONAL.  This
     *   Header Parameter MUST be understood and processed by implementations.
     *
     *   An example use, along with a hypothetical "exp" (expiration time)
     *   field is:
     *
     *     {"alg":"ES256",
     *     "crit":["exp"],
     *     "exp":1363284000
     *     }
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.13
     *
     *   4.1.13.  "crit" (Critical) Header Parameter
     *
     *   This parameter has the same meaning, syntax, and processing rules as
     *   the "crit" Header Parameter defined in Section 4.1.11 of [JWS],
     *   except that Header Parameters for a JWE are being referred to, rather
     *   than Header Parameters for a JWS.
     */
    crit: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1
    },

    /**
     * enc
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.2
     *
     * 4.1.2.  "enc" (Encryption Algorithm) Header Parameter
     *
     *   The "enc" (encryption algorithm) Header Parameter identifies the
     *   content encryption algorithm used to perform authenticated encryption
     *   on the plaintext to produce the ciphertext and the Authentication
     *   Tag.  This algorithm MUST be an AEAD algorithm with a specified key
     *   length.  The encrypted content is not usable if the "enc" value does
     *   not represent a supported algorithm.  "enc" values should either be
     *   registered in the IANA "JSON Web Signature and Encryption Algorithms"
     *   registry established by [JWA] or be a value that contains a
     *   Collision-Resistant Name.  The "enc" value is a case-sensitive ASCII
     *   string containing a StringOrURI value.  This Header Parameter MUST be
     *   present and MUST be understood and processed by implementations.
     *
     *   A list of defined "enc" values for this use can be found in the IANA
     *   "JSON Web Signature and Encryption Algorithms" registry established
     *   by [JWA]; the initial contents of this registry are the values
     *   defined in Section 5.1 of [JWA].
     */
    enc: {
      type: 'string',
      format: 'StringOrURI'
    },

    /**
     * zip
     *
     * JSON Web Encryption (JWE)
     * https://tools.ietf.org/html/rfc7516#section-4.1.3
     *
     * 4.1.3.  "zip" (Compression Algorithm) Header Parameter
     *
     *   The "zip" (compression algorithm) applied to the plaintext before
     *   encryption, if any.  The "zip" value defined by this specification
     *   is:
     *
     *   o  "DEF" - Compression with the DEFLATE [RFC1951] algorithm
     *
     *   Other values MAY be used.  Compression algorithm values can be
     *   registered in the IANA "JSON Web Encryption Compression Algorithms"
     *   registry established by [JWA].  The "zip" value is a case-sensitive
     *   string.  If no "zip" parameter is present, no compression is applied
     *   to the plaintext before encryption.  When used, this Header Parameter
     *   MUST be integrity protected; therefore, it MUST occur only within the
     *   JWE Protected Header.  Use of this Header Parameter is OPTIONAL.
     *   This Header Parameter MUST be understood and processed by
     *   implementations.
     */
    zip: {
      type: 'string'
    }
  }
});

/**
 * Export
 */
module.exports = JOSEHeaderSchema;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var base64url = __webpack_require__(37);
var JWA = __webpack_require__(36);

var _require = __webpack_require__(53),
    DataError = _require.DataError;

/**
 * JWS
 */


var JWS = function () {
  function JWS() {
    _classCallCheck(this, JWS);
  }

  _createClass(JWS, null, [{
    key: 'sign',


    /**
     * sign
     *
     * @description
     * Encode a JWT instance
     *
     * @param {Object} token
     * @returns {Promise}
     */
    value: function sign(token) {
      var payload = base64url(JSON.stringify(token.payload));

      // compact serialization
      if (token.serialization === 'compact') {
        var key = token.key,
            alg = token.header.alg;

        var header = base64url(JSON.stringify(token.header));
        var data = header + '.' + payload;

        return JWA.sign(alg, key, data).then(function (signature) {
          return data + '.' + signature;
        });
      }

      // JSON serialization
      if (token.serialization === 'json') {}

      // Flattened serialization
      if (token.serialization === 'flattened') {}

      return Promise.reject(new DataError('Unsupported serialization'));
    }

    /**
     * verify
     */

  }, {
    key: 'verify',
    value: function verify(jwt) {
      // multiple signatures
      if (jwt.signatures) {
        // ...
      }

      var key = jwt.key,
          signature = jwt.signature,
          alg = jwt.header.alg;

      // one signature

      if (jwt.signature) {
        var _jwt$segments = _slicedToArray(jwt.segments, 2),
            header = _jwt$segments[0],
            payload = _jwt$segments[1];

        var data = header + '.' + payload;

        if (alg === 'none') {
          return Promise.reject(new DataError('Signature provided to verify with alg: none'));
        }

        return JWA.verify(alg, key, signature, data).then(function (verified) {
          jwt.verified = verified;
          return verified;
        });
      }

      if (alg === 'none') {
        if (!key && !signature) {
          jwt.verified = true;

          return Promise.resolve(true);
        }

        if (key) {
          return Promise.reject(new DataError('Key provided to verify signature with alg: none'));
        }
      }

      // no signatures to verify
      return Promise.reject(new DataError('Missing signature(s)'));
    }
  }]);

  return JWS;
}();

/**
 * Export
 */


module.exports = JWS;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Dependencies
 */
const assert = __webpack_require__(20);

const base64url = __webpack_require__(37);

const crypto = __webpack_require__(47);

const {
  JWT
} = __webpack_require__(35);

const FormUrlEncoded = __webpack_require__(67);

const {
  URL
} = __webpack_require__(25);
/**
 * Authentication Request
 */


class AuthenticationRequest {
  /**
   * create
   *
   * @description
   * Create a new authentication request with generated state and nonce,
   * validate presence of required parameters, serialize the request data and
   * persist it to the session, and return a promise for an authentication
   * request URI.
   *
   * @param {RelyingParty} rp – instance of RelyingParty
   * @param {Object} options - optional request parameters
   * @param {Object} session – reference to localStorage or other session object
   *
   * @returns {Promise}
   */
  static create(rp, options, session) {
    const {
      provider,
      defaults,
      registration
    } = rp;
    let issuer, endpoint, client, params;
    return Promise.resolve().then(() => {
      // validate presence of OP configuration, RP client registration,
      // and default parameters
      assert(provider.configuration, 'RelyingParty provider OpenID Configuration is missing');
      assert(defaults.authenticate, 'RelyingParty default authentication parameters are missing');
      assert(registration, 'RelyingParty client registration is missing'); // define basic elements of the request

      issuer = provider.configuration.issuer;
      endpoint = provider.configuration.authorization_endpoint;
      client = {
        client_id: registration.client_id
      };
      params = Object.assign(defaults.authenticate, client, options); // validate presence of required configuration and parameters

      assert(issuer, 'Missing issuer in provider OpenID Configuration');
      assert(endpoint, 'Missing authorization_endpoint in provider OpenID Configuration');
      assert(params.scope, 'Missing scope parameter in authentication request');
      assert(params.response_type, 'Missing response_type parameter in authentication request');
      assert(params.client_id, 'Missing client_id parameter in authentication request');
      assert(params.redirect_uri, 'Missing redirect_uri parameter in authentication request'); // generate state and nonce random octets

      params.state = Array.from(crypto.getRandomValues(new Uint8Array(16)));
      params.nonce = Array.from(crypto.getRandomValues(new Uint8Array(16))); // hash the state and nonce parameter values

      return Promise.all([crypto.subtle.digest({
        name: 'SHA-256'
      }, new Uint8Array(params.state)), crypto.subtle.digest({
        name: 'SHA-256'
      }, new Uint8Array(params.nonce))]);
    }) // serialize the request with original values, store in session by
    // encoded state param, and replace state/nonce octets with encoded
    // digests
    .then(digests => {
      let state = base64url(Buffer.from(digests[0]));
      let nonce = base64url(Buffer.from(digests[1]));
      let key = `${issuer}/requestHistory/${state}`; // store the request params for response validation
      // with serialized octet values for state and nonce

      session[key] = JSON.stringify(params); // replace state and nonce octets with base64url encoded digests

      params.state = state;
      params.nonce = nonce;
    }).then(() => AuthenticationRequest.generateSessionKeys()).then(sessionKeys => {
      AuthenticationRequest.storeSessionKeys(sessionKeys, params, session);
    }) // optionally encode a JWT with the request parameters
    // and replace params with `{ request: <jwt> }
    .then(() => {
      if (provider.configuration.request_parameter_supported) {
        return AuthenticationRequest.encodeRequestParams(params).then(encodedParams => {
          params = encodedParams;
        });
      }
    }) // render the request URI and terminate the algorithm
    .then(() => {
      let url = new URL(endpoint);
      url.search = FormUrlEncoded.encode(params);
      return url.href;
    });
  }

  static generateSessionKeys() {
    return crypto.subtle.generateKey({
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {
        name: "SHA-256"
      }
    }, true, ["sign", "verify"]).then(keyPair => {
      // returns a keypair object
      return Promise.all([crypto.subtle.exportKey('jwk', keyPair.publicKey), crypto.subtle.exportKey('jwk', keyPair.privateKey)]);
    }).then(jwkPair => {
      let [publicJwk, privateJwk] = jwkPair;
      return {
        public: publicJwk,
        private: privateJwk
      };
    });
  }

  static storeSessionKeys(sessionKeys, params, session) {
    // store the private one in session, public one goes into params
    session['oidc.session.privateKey'] = JSON.stringify(sessionKeys.private);
    params.key = sessionKeys.public;
  }

  static encodeRequestParams(params) {
    const excludeParams = ['scope', 'client_id', 'response_type', 'state'];
    const keysToEncode = Object.keys(params).filter(key => !excludeParams.includes(key));
    let payload = {};
    keysToEncode.forEach(key => {
      payload[key] = params[key];
    });
    let requestParamJwt = new JWT({
      header: {
        alg: 'none'
      },
      payload
    }, {
      filter: false
    });
    return requestParamJwt.encode().then(requestParamCompact => {
      let newParams = {
        scope: params['scope'],
        client_id: params['client_id'],
        response_type: params['response_type'],
        request: requestParamCompact,
        state: params['state']
      };
      return newParams;
    });
  }

}
/**
 * Export
 */


module.exports = AuthenticationRequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(39).Buffer))

/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Dependencies
 */

/**
 * FormUrlEncoded
 */
class FormUrlEncoded {
  /**
   * Encode
   *
   * @description
   * Represent an object as x-www-form-urlencoded string.
   *
   * @param {Object} data
   * @returns {string}
   */
  static encode(data) {
    let pairs = [];
    Object.keys(data).forEach(function (key) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    });
    return pairs.join('&');
  }
  /**
   * Decode
   *
   * @description
   * Parse a x-www-form-urlencoded into an object.
   *
   * @param {string} data
   * @returns {Object}
   */


  static decode(data) {
    let obj = {};
    data.split('&').forEach(function (property) {
      let pair = property.split('=');
      let key = decodeURIComponent(pair[0]);
      let val = decodeURIComponent(pair[1]);
      obj[key] = val;
    });
    return obj;
  }

}
/**
 * Export
 */


module.exports = FormUrlEncoded;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {/**
 * Dependencies
 */
const {
  URL
} = __webpack_require__(25);

const assert = __webpack_require__(20);

const crypto = __webpack_require__(47);

const base64url = __webpack_require__(37);

const fetch = __webpack_require__(6);

const Headers = fetch.Headers ? fetch.Headers : global.Headers;

const FormUrlEncoded = __webpack_require__(67);

const IDToken = __webpack_require__(69);

const Session = __webpack_require__(71);

const onHttpError = __webpack_require__(72);

const HttpError = __webpack_require__(74);
/**
 * AuthenticationResponse
 */


class AuthenticationResponse {
  /**
   * @param rp {RelyingParty}
   * @param [redirect] {string} req.query
   * @param [body] {string} req.body.text
   * @param session {Session|Storage} req.session or localStorage or similar
   * @param params {object} hashmap
   * @param mode {string} 'query'/'fragment'/'form_post',
   *   determined in `parseResponse()`
   */
  constructor({
    rp,
    redirect,
    body,
    session,
    mode,
    params = {}
  }) {
    this.rp = rp;
    this.redirect = redirect;
    this.body = body;
    this.session = session;
    this.mode = mode;
    this.params = params;
  }
  /**
   * validateResponse
   *
   * @description
   * Authentication response validation.
   *
   * @param {string|Object} response
   *
   * @returns {Promise<Session>}
   */


  static validateResponse(response) {
    return Promise.resolve(response).then(this.parseResponse).then(this.errorResponse).then(this.matchRequest).then(this.validateStateParam).then(this.validateResponseMode).then(this.validateResponseParams).then(this.exchangeAuthorizationCode).then(this.validateIDToken).then(Session.fromAuthResponse);
  }
  /**
   * parseResponse
   *
   * @param {object} response
   *
   * @returns {object}
   */


  static parseResponse(response) {
    let {
      redirect,
      body
    } = response; // response must be either a redirect uri or request body, but not both

    if (redirect && body || !redirect && !body) {
      throw new HttpError(400, 'Invalid response mode');
    } // parse redirect uri


    if (redirect) {
      let url = new URL(redirect);
      let {
        search,
        hash
      } = url;

      if (search && hash || !search && !hash) {
        throw new HttpError(400, 'Invalid response mode');
      }

      if (search) {
        response.params = FormUrlEncoded.decode(search.substring(1));
        response.mode = 'query';
      }

      if (hash) {
        response.params = FormUrlEncoded.decode(hash.substring(1));
        response.mode = 'fragment';
      }
    } // parse request form body


    if (body) {
      response.params = FormUrlEncoded.decode(body);
      response.mode = 'form_post';
    }

    return response;
  }
  /**
   * errorResponse
   *
   * @param {AuthenticationResponse} response
   *
   * @throws {Error} If response params include the OAuth2 'error' param,
   *   throws an error based on it.
   *
   * @returns {AuthenticationResponse} Chainable
   *
   * @todo Figure out HTTP status code (typically 400, 401 or 403)
   *   based on the OAuth2/OIDC `error` code, probably using an external library
   */


  static errorResponse(response) {
    const errorCode = response.params.error;

    if (errorCode) {
      const errorParams = {};
      errorParams['error'] = errorCode;
      errorParams['error_description'] = response.params['error_description'];
      errorParams['error_uri'] = response.params['error_uri'];
      errorParams['state'] = response.params['state'];
      const error = new Error(`AuthenticationResponse error: ${errorCode}`);
      error.info = errorParams;
      throw error;
    }

    return response;
  }
  /**
   * matchRequest
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static matchRequest(response) {
    let {
      rp,
      params,
      session
    } = response;
    let state = params.state;
    let issuer = rp.provider.configuration.issuer;

    if (!state) {
      throw new Error('Missing state parameter in authentication response');
    }

    let key = `${issuer}/requestHistory/${state}`;
    let request = session[key];

    if (!request) {
      throw new Error('Mismatching state parameter in authentication response');
    }

    response.request = JSON.parse(request);
    return response;
  }
  /**
   * validateStateParam
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateStateParam(response) {
    let octets = new Uint8Array(response.request.state);
    let encoded = response.params.state;
    return crypto.subtle.digest({
      name: 'SHA-256'
    }, octets).then(digest => {
      if (encoded !== base64url(Buffer.from(digest))) {
        throw new Error('Mismatching state parameter in authentication response');
      }

      return response;
    });
  }
  /**
   * validateResponseMode
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateResponseMode(response) {
    if (response.request.response_type !== 'code' && response.mode === 'query') {
      throw new Error('Invalid response mode');
    }

    return response;
  }
  /**
   * validateResponseParams
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateResponseParams(response) {
    let {
      request,
      params
    } = response;
    let expectedParams = request.response_type.split(' ');

    if (expectedParams.includes('code')) {
      assert(params.code, 'Missing authorization code in authentication response'); // TODO assert novelty of code
    }

    if (expectedParams.includes('id_token')) {
      assert(params.id_token, 'Missing id_token in authentication response');
    }

    if (expectedParams.includes('token')) {
      assert(params.access_token, 'Missing access_token in authentication response');
      assert(params.token_type, 'Missing token_type in authentication response');
    }

    return response;
  }
  /**
   * exchangeAuthorizationCode
   *
   * @param {Object} response
   * @returns {Promise} response object
   */


  static exchangeAuthorizationCode(response) {
    let {
      rp,
      params,
      request
    } = response;
    let code = params.code; // only exchange the authorization code when the response type is "code"

    if (!code || request['response_type'] !== 'code') {
      return Promise.resolve(response);
    }

    let {
      provider,
      registration
    } = rp;
    let id = registration['client_id'];
    let secret = registration['client_secret']; // verify the client is not public

    if (!secret) {
      return Promise.reject(new Error('Client cannot exchange authorization code because ' + 'it is not a confidential client'));
    } // initialize token request arguments


    let endpoint = provider.configuration.token_endpoint;
    let method = 'POST'; // initialize headers

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }); // initialize the token request parameters

    let bodyContents = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': request['redirect_uri'] // determine client authentication method

    };
    let authMethod = registration['token_endpoint_auth_method'] || 'client_secret_basic'; // client secret basic authentication

    if (authMethod === 'client_secret_basic') {
      let credentials = new Buffer(`${id}:${secret}`).toString('base64');
      headers.set('Authorization', `Basic ${credentials}`);
    } // client secret post authentication


    if (authMethod === 'client_secret_post') {
      bodyContents['client_id'] = id;
      bodyContents['client_secret'] = secret;
    }

    let body = FormUrlEncoded.encode(bodyContents); // TODO
    // client_secret_jwt authentication
    // private_key_jwt
    // make the token request

    return fetch(endpoint, {
      method,
      headers,
      body
    }).then(onHttpError('Error exchanging authorization code')).then(tokenResponse => tokenResponse.json()).then(tokenResponse => {
      assert(tokenResponse['access_token'], 'Missing access_token in token response');
      assert(tokenResponse['token_type'], 'Missing token_type in token response');
      assert(tokenResponse['id_token'], 'Missing id_token in token response'); // anything else?
      // IS THIS THE RIGHT THING TO DO HERE?

      response.params = Object.assign(response.params, tokenResponse);
      return response;
    });
  }
  /**
   * validateIDToken
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateIDToken(response) {
    // only validate the ID Token if present in the response
    if (!response.params.id_token) {
      return Promise.resolve(response);
    }

    return Promise.resolve(response).then(AuthenticationResponse.decryptIDToken).then(AuthenticationResponse.decodeIDToken).then(AuthenticationResponse.validateIssuer).then(AuthenticationResponse.validateAudience).then(AuthenticationResponse.resolveKeys).then(AuthenticationResponse.verifySignature).then(AuthenticationResponse.validateExpires).then(AuthenticationResponse.verifyNonce).then(AuthenticationResponse.validateAcr).then(AuthenticationResponse.validateAuthTime).then(AuthenticationResponse.validateAccessTokenHash).then(AuthenticationResponse.validateAuthorizationCodeHash);
  }
  /**
   * decryptIDToken
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static decryptIDToken(response) {
    // TODO
    return Promise.resolve(response);
  }
  /**
   * decodeIDToken
   *
   * Note: If the `id_token` is not present in params, this method does not
   * get called (short-circuited in `validateIDToken()`).
   *
   * @param response {AuthenticationResponse}
   * @param response.params {object}
   * @param [response.params.id_token] {string} IDToken encoded as a JWT
   *
   * @returns {AuthenticationResponse} Chainable
   */


  static decodeIDToken(response) {
    let jwt = response.params.id_token;

    try {
      response.decoded = IDToken.decode(jwt);
    } catch (decodeError) {
      const error = new HttpError(400, 'Error decoding ID Token');
      error.cause = decodeError;
      error.info = {
        id_token: jwt
      };
      throw error;
    }

    return response;
  }
  /**
   * validateIssuer
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateIssuer(response) {
    let configuration = response.rp.provider.configuration;
    let payload = response.decoded.payload; // validate issuer of token matches this relying party's provider

    if (payload.iss !== configuration.issuer) {
      throw new Error('Mismatching issuer in ID Token');
    }

    return response;
  }
  /**
   * validateAudience
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateAudience(response) {
    let registration = response.rp.registration;
    let {
      aud,
      azp
    } = response.decoded.payload; // validate audience includes this relying party

    if (typeof aud === 'string' && aud !== registration['client_id']) {
      throw new Error('Mismatching audience in id_token');
    } // validate audience includes this relying party


    if (Array.isArray(aud) && !aud.includes(registration['client_id'])) {
      throw new Error('Mismatching audience in id_token');
    } // validate authorized party is present if required


    if (Array.isArray(aud) && !azp) {
      throw new Error('Missing azp claim in id_token');
    } // validate authorized party is this relying party


    if (azp && azp !== registration['client_id']) {
      throw new Error('Mismatching azp claim in id_token');
    }

    return response;
  }
  /**
   * resolveKeys
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static resolveKeys(response) {
    let rp = response.rp;
    let provider = rp.provider;
    let decoded = response.decoded;
    return Promise.resolve(provider.jwks).then(jwks => jwks ? jwks : rp.jwks()).then(jwks => {
      if (decoded.resolveKeys(jwks)) {
        return Promise.resolve(response);
      } else {
        throw new Error('Cannot resolve signing key for ID Token');
      }
    });
  }
  /**
   * verifySignature
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static verifySignature(response) {
    let alg = response.decoded.header.alg;
    let registration = response.rp.registration;
    let expectedAlgorithm = registration['id_token_signed_response_alg'] || 'RS256'; // validate signing algorithm matches expectation

    if (alg !== expectedAlgorithm) {
      throw new Error(`Expected ID Token to be signed with ${expectedAlgorithm}`);
    }

    return response.decoded.verify().then(verified => {
      if (!verified) {
        throw new Error('Invalid ID Token signature');
      }

      return response;
    });
  }
  /**
   * validateExpires
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateExpires(response) {
    let exp = response.decoded.payload.exp; // validate expiration of token

    if (exp <= Math.floor(Date.now() / 1000)) {
      throw new Error('Expired ID Token');
    }

    return response;
  }
  /**
   * verifyNonce
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static verifyNonce(response) {
    let octets = new Uint8Array(response.request.nonce);
    let nonce = response.decoded.payload.nonce;

    if (!nonce) {
      throw new Error('Missing nonce in ID Token');
    }

    return crypto.subtle.digest({
      name: 'SHA-256'
    }, octets).then(digest => {
      if (nonce !== base64url(Buffer.from(digest))) {
        throw new Error('Mismatching nonce in ID Token');
      }

      return response;
    });
  }
  /**
   * validateAcr
   *
   * @param {Object} response
   * @returns {Object}
   */


  static validateAcr(response) {
    // TODO
    return response;
  }
  /**
   * validateAuthTime
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateAuthTime(response) {
    // TODO
    return response;
  }
  /**
   * validateAccessTokenHash
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateAccessTokenHash(response) {
    // TODO
    return response;
  }
  /**
   * validateAuthorizationCodeHash
   *
   * @param {Object} response
   * @returns {Promise}
   */


  static validateAuthorizationCodeHash(response) {
    // TODO
    return response;
  }

}
/**
 * Export
 */


module.exports = AuthenticationResponse;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19), __webpack_require__(39).Buffer))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Local dependencies
 */
const {
  JWT
} = __webpack_require__(35);

const IDTokenSchema = __webpack_require__(70);
/**
 * IDToken
 */


class IDToken extends JWT {
  /**
   * Schema
   */
  static get schema() {
    return IDTokenSchema;
  }

}
/**
 * Export
 */


module.exports = IDToken;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Local dependencies
 */
const {
  JWTSchema
} = __webpack_require__(35);
/**
 * IDToken Schema
 */


const IDTokenSchema = JWTSchema.extend({
  properties: {
    /**
     * header
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken
     * ID Tokens SHOULD NOT use the JWS or JWE x5u, x5c, jku, or jwk Header
     * Parameter fields. Instead, references to keys used are communicated in
     * advance using Discovery and Registration parameters, per Section 10.
     */
    header: {//not: { required: ['x5u', 'x5c', 'jku', 'jwk'] }
    },

    /**
     * payload
     */
    payload: {
      properties: {
        /**
         * iss
         *
         * REQUIRED. Issuer Identifier for the Issuer of the response.
         * The iss value is a case sensitive URL using the https scheme
         * that contains scheme, host, and optionally, port number and
         * path components and no query or fragment components.
         */
        iss: {
          type: 'string',
          format: 'url'
        },

        /**
         * sub
         *
         * REQUIRED. Subject Identifier. A locally unique and never
         * reassigned identifier within the Issuer for the End-User, which
         * is intended to be consumed by the Client, e.g., 24400320 or
         * AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255
         * ASCII characters in length. The sub value is a case sensitive
         * string.
         */
        sub: {
          type: 'string',
          maxLength: 255
        },

        /**
         * aud
         *
         * REQUIRED. Audience(s) that this ID Token is intended for. It
         * MUST contain the OAuth 2.0 client_id of the Relying Party as an
         * audience value. It MAY also contain identifiers for other audiences.
         * In the general case, the aud value is an array of case sensitive
         * strings. In the common special case when there is one audience,
         * the aud value MAY be a single case sensitive string.
         */
        // inherited from JWTClaimsSetSchema

        /**
         * exp
         *
         * REQUIRED. Expiration time on or after which the ID Token MUST NOT
         * be accepted for processing. The processing of this parameter
         * requires that the current date/time MUST be before the expiration
         * date/time listed in the value. Implementers MAY provide for some
         * small leeway, usually no more than a few minutes, to account for
         * clock skew. Its value is a JSON number representing the number of
         * seconds from 1970-01-01T0:0:0Z as measured in UTC until the
         * date/time. See RFC 3339 [RFC3339] for details regarding date/times
         * in general and UTC in particular.
         */
        // inherited from JWTClaimsSetSchema

        /**
         * iat
         *
         * REQUIRED. Time at which the JWT was issued. Its value is a
         * JSON number representing the number of seconds from
         * 1970-01-01T0:0:0Z as measured in UTC until the date/time.
         */
        // inherited from JWTClaimsSetSchema

        /**
         * auth_time
         *
         * Time when the End-User authentication occurred. Its value is a
         * JSON number representing the number of seconds from
         * 1970-01-01T0:0:0Z as measured in UTC until the date/time. When a
         * max_age request is made or when auth_time is requested as an
         * Essential Claim, then this Claim is REQUIRED; otherwise, its
         * inclusion is OPTIONAL. (The auth_time Claim semantically
         * corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] auth_time
         * response parameter.)
         */
        auth_time: {
          type: 'integer',
          format: 'NumericDate'
        },

        /**
         * nonce
         *
         * String value used to associate a Client session with an ID Token,
         * and to mitigate replay attacks. The value is passed through
         * unmodified from the Authentication Request to the ID Token. If
         * present in the ID Token, Clients MUST verify that the nonce Claim
         * Value is equal to the value of the nonce parameter sent in the
         * Authentication Request. If present in the Authentication Request,
         * Authorization Servers MUST include a nonce Claim in the ID Token
         * with the Claim Value being the nonce value sent in the
         * Authentication Request. Authorization Servers SHOULD perform no
         * other processing on nonce values used. The nonce value is a case
         * sensitive string.
         */
        nonce: {
          type: 'string'
        },

        /**
         * acr
         *
         * OPTIONAL. Authentication Context Class Reference. String
         * specifying an Authentication Context Class Reference value that
         * identifies the Authentication Context Class that the authentication
         * performed satisfied. The value "0" indicates the End-User
         * authentication did not meet the requirements of ISO/IEC 29115
         * [ISO29115] level 1. Authentication using a long-lived browser
         * cookie, for instance, is one example where the use of "level 0" is
         * appropriate. Authentications with level 0 SHOULD NOT be used to
         * authorize access to any resource of any monetary value. (This
         * corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] nist_auth_level
         * 0.) An absolute URI or an RFC 6711 [RFC6711] registered name
         * SHOULD be used as the acr value; registered names MUST NOT be used
         * with a different meaning than that which is registered. Parties
         * using this claim will need to agree upon the meanings of the
         * values used, which may be context-specific. The acr value is a
         * case sensitive string.
         */
        acr: {
          type: 'string'
        },

        /**
         * amr
         * OPTIONAL. Authentication Methods References. JSON array of strings
         * that are identifiers for authentication methods used in the
         * authentication. For instance, values might indicate that both
         * password and OTP authentication methods were used. The definition
         * of particular values to be used in the amr Claim is beyond the
         * scope of this specification. Parties using this claim will need to
         * agree upon the meanings of the values used, which may be context-
         * specific. The amr value is an array of case sensitive strings.
         */
        amr: {
          type: 'array',
          items: {
            type: 'string'
          }
        },

        /**
         * azp
         * OPTIONAL. Authorized party - the party to which the ID Token was
         * issued. If present, it MUST contain the OAuth 2.0 Client ID of this
         * party. This Claim is only needed when the ID Token has a single
         * audience value and that audience is different than the authorized
         * party. It MAY be included even when the authorized party is the
         * same as the sole audience. The azp value is a case sensitive string
         * containing a StringOrURI value.
         */
        azp: {
          type: 'string',
          format: 'StringOrURI'
        }
      },

      /**
       * Required Claims
       */
      required: ['iss', 'sub', 'aud', 'exp', 'iat']
    }
  }
});
/**
 * Export
 */

module.exports = IDTokenSchema;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fetch = __webpack_require__(6);

const onHttpError = __webpack_require__(72);

const PoPToken = __webpack_require__(73);

class Session {
  /**
   * @param options {Object}
   *
   * @param options.credentialType {string} 'access_token' or 'pop_token'
   *
   * @param options.issuer {string} Identity provider (issuer of ID/Access Token)
   *
   * @param options.authorization {object}
   * @param options.authorization.client_id {string} OIDC/OAuth2 client id
   * @param [options.authorization.id_token] {string} Compact-serialized id_token param
   * @param [options.authorization.access_token] {string} Compact-serialized access_token param
   * @param [options.authorization.refresh_token] {string} Compact-serialized refresh_token
   *
   * @param [options.sessionKey] {string} Serialized client session key generated
   *   during the Authentication Request, used to issue PoPTokens
   *
   * @param [options.idClaims] {object} Decoded/verified ID Token JWT payload
   *
   * @param [options.accessClaims] {object} Decoded/verified Access Token JWT payload
   */
  constructor(options) {
    this.credentialType = options.credentialType || 'access_token';
    this.issuer = options.issuer;
    this.authorization = options.authorization || {};
    this.sessionKey = options.sessionKey;
    this.idClaims = options.idClaims;
    this.accessClaims = options.accessClaims;
  }

  static from(options) {
    return new Session(options);
  }
  /**
   * @param response {AuthenticationResponse}
   *
   * @returns {Session} RelyingParty Session object
   */


  static fromAuthResponse(response) {
    const RelyingParty = __webpack_require__(18); // import here due to circular dep


    let idClaims = response.decoded && response.decoded.payload || {};
    let {
      rp
    } = response;
    let registration = rp.registration;
    let rpAuthOptions = rp.defaults.authenticate || {};
    let credentialType = rpAuthOptions['credential_type'] || rp.defaults.popToken ? 'pop_token' : 'access_token';
    let sessionKey = response.session[RelyingParty.SESSION_PRIVATE_KEY];
    let options = {
      credentialType,
      sessionKey,
      issuer: idClaims.iss,
      idClaims,
      authorization: {
        client_id: registration['client_id'],
        access_token: response.params['access_token'],
        id_token: response.params['id_token'],
        refresh_token: response.params['refresh_token']
      }
    };
    return Session.from(options);
  }
  /**
   * Authenticated fetch() getter
   *
   * @returns {function}
   */


  get fetch() {
    /**
     * fetch() function signature
     *
     * @param url {RequestInfo|string}
     * @param options {object}
     *
     * @returns {Function<Promise<Response>>}
     */
    return (url, options) => {
      return Promise.resolve().then(() => {
        if (this.hasCredentials()) {
          return this.fetchWithCredentials(url, options);
        } else {
          return fetch(url, options);
        }
      }).then(onHttpError('Error while fetching resource'));
    };
  }
  /**
   * bearerTokenFor
   *
   * @param url {string}
   *
   * @returns {Promise<string>}
   */


  bearerTokenFor(url) {
    switch (this.credentialType) {
      case 'pop_token':
        return PoPToken.issueFor(url, this);

      default:
        // 'access_token' etc
        return Promise.resolve(this.authorization[this.credentialType]);
    }
  }
  /**
   * hasCredentials
   *
   * @returns {boolean}
   */


  hasCredentials() {
    switch (this.credentialType) {
      case 'pop_token':
        return !!this.authorization['id_token'];

      default:
        // 'access_token' etc
        return !!this.authorization[this.credentialType];
    }
  }
  /**
   * fetchWithCredentials
   *
   * @param url {RequestInfo|string}
   * @param options {object}
   *
   * @returns {Promise<Response>}
   */


  fetchWithCredentials(url, options = {}) {
    options.headers = options.headers || {};
    return this.bearerTokenFor(url).then(token => {
      options.headers.authorization = `Bearer ${token}`;
      return fetch(url, options);
    });
  }

}

module.exports = Session;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Throws an error when a fetch response status code indicates a 400 or 500
 * HTTP error. (The whatwg fetch api does not normally reject on http error
 * responses).
 *
 * Usage:
 *
 * ```
 * return fetch(url)
 *   .then(onHttpError('Error while fetching resource')
 *   .catch(err => console.log(err))
 *
 * // -> 'Error while fetching resource: 404 Not Found' error
 * // if a 404 response is encountered
 * ```
 *
 * @param [message] {string} Optional error message to clarify context
 *
 * @throws {Error} For http status codes > 300
 *
 * @return {Object} fetch response object (passed through if no error)
 */

function onHttpError(message = 'fetch error') {
  return response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    let errorMessage = `${message}: ${response.status} ${response.statusText}`;
    let error = new Error(errorMessage);
    error.response = response;
    error.statusCode = response.status;
    throw error;
  };
}

module.exports = onHttpError;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  URL
} = __webpack_require__(25);

const {
  JWT,
  JWK
} = __webpack_require__(35);

const DEFAULT_MAX_AGE = 3600; // Default token expiration, in seconds

class PoPToken extends JWT {
  /**
   * @param resourceServerUri {string} RS URI for which this token is intended
   *
   * @param session {Session}
   * @param session.sessionKey {string}
   * @param session.authorization.client_id {string}
   * @param session.authorization.id_token {string}
   *
   * @returns {Promise<string>} PoPToken, encoded as compact JWT
   */
  static issueFor(resourceServerUri, session) {
    if (!resourceServerUri) {
      throw new Error('Cannot issue PoPToken - missing resource server URI');
    }

    if (!session.sessionKey) {
      throw new Error('Cannot issue PoPToken - missing session key');
    }

    if (!session.authorization.id_token) {
      throw new Error('Cannot issue PoPToken - missing id token');
    }

    let jwk = JSON.parse(session.sessionKey);
    return JWK.importKey(jwk).then(importedSessionJwk => {
      let options = {
        aud: new URL(resourceServerUri).origin,
        key: importedSessionJwk,
        iss: session.authorization.client_id,
        id_token: session.authorization.id_token
      };
      return PoPToken.issue(options);
    }).then(jwt => {
      return jwt.encode();
    });
  }
  /**
   * issue
   *
   * @param options {Object}
   * @param options.iss {string} Token issuer (RP client_id)
   * @param options.aud {string|Array<string>} Audience for the token
   *   (such as the Resource Server url)
   * @param options.key {JWK} Proof of Possession (private) signing key, see
   *   https://tools.ietf.org/html/rfc7800#section-3.1
   *
   * @param options.id_token {string} JWT compact encoded ID Token
   *
   * Optional:
   * @param [options.iat] {number} Issued at timestamp (in seconds)
   * @param [options.max] {number} Max token lifetime in seconds
   *
   * @returns {PoPToken} Proof of Possession Token (JWT instance)
   */


  static issue(options) {
    let {
      aud,
      iss,
      key
    } = options;
    let alg = key.alg;
    let iat = options.iat || Math.floor(Date.now() / 1000);
    let max = options.max || DEFAULT_MAX_AGE;
    let exp = iat + max; // token expiration

    let header = {
      alg
    };
    let payload = {
      iss,
      aud,
      exp,
      iat,
      id_token: options.id_token,
      token_type: 'pop'
    };
    let jwt = new PoPToken({
      header,
      payload,
      key: key.cryptoKey
    }, {
      filter: false
    });
    return jwt;
  }

}

module.exports = PoPToken;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = HttpError
var StandardError = __webpack_require__(75)
var STATUS_CODE_TO_NAME = __webpack_require__(76)
var STATUS_NAME_TO_CODE = exports

function HttpError(code, msg, props) {
  if (typeof code == "string") code = STATUS_NAME_TO_CODE[code]
  if (typeof code != "number") throw new TypeError("Non-numeric HTTP code")
  if (typeof msg == "object" && msg != null) { props = msg; msg = null }
  StandardError.call(this, msg || STATUS_CODE_TO_NAME[code], props)
  this.code = code
}

HttpError.prototype = Object.create(StandardError.prototype, {
  constructor: {value: HttpError, configurable: true, writable: true}
})

// Set name explicitly for when the code gets minified.
HttpError.prototype.name = "HttpError"

Object.defineProperties(HttpError.prototype, {
  statusCode: alias("code"),
  statusMessage: alias("message"),

  status: {
    configurable: true,
    get: function() { return this.code },
    set: function(value) {
      Object.defineProperty(this, "status", {
        value: value, configurable: true, enumerable: true, writable: true
      })
    }
  }
})

HttpError.prototype.toString = function() {
  return this.name + ": " + this.code + " " + this.message
}

for (var code in STATUS_CODE_TO_NAME) {
  var name = STATUS_CODE_TO_NAME[code]
  exports[name.replace("'", "").replace(/[- ]/g, "_").toUpperCase()] = +code
}

function alias(name) {
  return {
    configurable: true,
    get: function() { return this[name] },
    set: function(value) { return this[name] = value }
  }
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

var has = Object.hasOwnProperty
var proto = Object.getPrototypeOf
var trace = Error.captureStackTrace
module.exports = StandardError

function StandardError(msg, props) {
  // Let all properties be enumerable for easier serialization.
  if (msg && typeof msg == "object") props = msg, msg = undefined
  else this.message = msg

  // Name has to be an own property (or on the prototype a single step up) for
  // the stack to be printed with the correct name.
  if (props) for (var key in props) this[key] = props[key]
  if (!has.call(this, "name"))
    this.name = has.call(proto(this), "name")? this.name : this.constructor.name

  if (trace && !("stack" in this)) trace(this, this.constructor)
}

StandardError.prototype = Object.create(Error.prototype, {
  constructor: {value: StandardError, configurable: true, writable: true}
})

// Set name explicitly for when the code gets minified.
StandardError.prototype.name = "StandardError"


/***/ }),
/* 76 */
/***/ (function(module) {

module.exports = {"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Dependencies
 */
const {
  JSONSchema
} = __webpack_require__(26);
/**
 * RelyingParty Schema
 *
 * This schema initializes and verifies Relying Party client configuration.
 * RelyingParty objects can be persisted and rehydrated. By encapsulating this data in
 * it's own class, it's possible to have multiple RP configurations running
 * simultaneously.
 */


const RelyingPartySchema = new JSONSchema({
  type: 'object',
  properties: {
    /**
     * provider
     *
     * Information about the provider, including issuer URL, human readable name,
     * and any configuration or provider metadata retrieved from the OP.
     */
    provider: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        url: {
          type: 'string',
          format: 'uri'
        },
        // NOTE:
        // OpenID Configuration (discovery response) and JSON Web Keys Set for an
        // issuer can be cached here. However the cache should not be persisted or
        // relied upon.
        //
        configuration: {},
        // .well-known/openid-configuration
        jwks: {} // /jwks

      },
      required: ['url']
    },

    /**
     * defaults
     *
     * Default request parameters for authentication and dynamic registration requests.
     * These values can be extended or overridden via arguments to the respective
     * request methods.
     *
     * These are part of the relying party client configuration and can be serialized
     * and persisted.
     */
    defaults: {
      type: 'object',
      properties: {
        /**
         * Use Proof of Possession token semantics for the ID Token
         */
        popToken: {
          type: 'boolean',
          default: false
        },

        /**
         * Default authentication request parameters
         */
        authenticate: {
          type: 'object',
          properties: {
            redirect_uri: {
              type: 'string',
              format: 'uri'
            },
            response_type: {
              type: 'string',
              default: 'id_token token',
              // browser detection
              enum: ['code', 'token', 'id_token token', 'id_token token code']
            },
            display: {
              type: 'string',
              default: 'page',
              enum: ['page', 'popup']
            },
            scope: {
              type: ['string', 'array'],
              default: ['openid']
            }
          }
        },

        /**
         * Default client registration parameters
         */
        register: {}
      }
    },

    /**
     * registration
     *
     * This is the client registration response from dynamic registration. It should
     * always reflect the client configuration on the openid provider. A client access
     * token is stored here
     */
    registration: {},
    // ClientMetadataSchema

    /**
     * store
     */
    store: {
      type: 'object',
      default: {}
    }
  }
});
/**
 * Export
 */

module.exports = RelyingPartySchema;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _require = __webpack_require__(25),
    URL = _require.URL;

var _require2 = __webpack_require__(35),
    JWT = _require2.JWT,
    JWK = _require2.JWK;

var DEFAULT_MAX_AGE = 3600; // Default token expiration, in seconds

var PoPToken = function (_JWT) {
  _inherits(PoPToken, _JWT);

  function PoPToken() {
    _classCallCheck(this, PoPToken);

    return _possibleConstructorReturn(this, (PoPToken.__proto__ || Object.getPrototypeOf(PoPToken)).apply(this, arguments));
  }

  _createClass(PoPToken, null, [{
    key: 'issueFor',

    /**
     * @param resourceServerUri {string} RS URI for which this token is intended
     *
     * @param session {Session}
     * @param session.sessionKey {string}
     * @param session.authorization.client_id {string}
     * @param session.authorization.id_token {string}
     *
     * @returns {Promise<string>} PoPToken, encoded as compact JWT
     */
    value: function issueFor(resourceServerUri, session) {
      if (!resourceServerUri) {
        throw new Error('Cannot issue PoPToken - missing resource server URI');
      }

      if (!session.sessionKey) {
        throw new Error('Cannot issue PoPToken - missing session key');
      }

      if (!session.authorization.id_token) {
        throw new Error('Cannot issue PoPToken - missing id token');
      }

      var jwk = JSON.parse(session.sessionKey);
      return JWK.importKey(jwk).then(function (importedSessionJwk) {
        var options = {
          aud: new URL(resourceServerUri).origin,
          key: importedSessionJwk,
          iss: session.authorization.client_id,
          id_token: session.authorization.id_token
        };
        return PoPToken.issue(options);
      }).then(function (jwt) {
        return jwt.encode();
      });
    }
    /**
     * issue
     *
     * @param options {Object}
     * @param options.iss {string} Token issuer (RP client_id)
     * @param options.aud {string|Array<string>} Audience for the token
     *   (such as the Resource Server url)
     * @param options.key {JWK} Proof of Possession (private) signing key, see
     *   https://tools.ietf.org/html/rfc7800#section-3.1
     *
     * @param options.id_token {string} JWT compact encoded ID Token
     *
     * Optional:
     * @param [options.iat] {number} Issued at timestamp (in seconds)
     * @param [options.max] {number} Max token lifetime in seconds
     *
     * @returns {PoPToken} Proof of Possession Token (JWT instance)
     */

  }, {
    key: 'issue',
    value: function issue(options) {
      var aud = options.aud,
          iss = options.iss,
          key = options.key;
      var alg = key.alg;
      var iat = options.iat || Math.floor(Date.now() / 1000);
      var max = options.max || DEFAULT_MAX_AGE;
      var exp = iat + max; // token expiration

      var header = {
        alg: alg
      };
      var payload = {
        iss: iss,
        aud: aud,
        exp: exp,
        iat: iat,
        id_token: options.id_token,
        token_type: 'pop'
      };
      var jwt = new PoPToken({
        header: header,
        payload: payload,
        key: key.cryptoKey
      }, {
        filter: false
      });
      return jwt;
    }
  }]);

  return PoPToken;
}(JWT);

module.exports = PoPToken;

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openIdpPopup", function() { return openIdpPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obtainSession", function() { return obtainSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popupHandler", function() { return popupHandler; });
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _url_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


function openIdpPopup(popupUri) {
  const width = 650;
  const height = 400;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;
  const settings = `width=${width},height=${height},left=${left},top=${top}`;
  return window.open(popupUri, 'solid-auth-client', settings);
}
function obtainSession(store, popup, options) {
  return new Promise((resolve, reject) => {
    const popupServer = new _ipc__WEBPACK_IMPORTED_MODULE_0__["Server"](popup, Object(_url_util__WEBPACK_IMPORTED_MODULE_1__["originOf"])(options.popupUri || ''), popupHandler(store, options, session => {
      popupServer.stop();
      resolve(session);
    }));
    popupServer.start();
  });
}
function popupHandler(store, {
  popupUri,
  callbackUri
}, foundSessionCb) {
  return async (method, ...args) => {
    switch (method) {
      // Origin
      case 'getAppOrigin':
        return window.location.origin;
      // Storage

      case 'storage/getItem':
        return store.getItem(...args);

      case 'storage/setItem':
        return store.setItem(...args);

      case 'storage/removeItem':
        return store.removeItem(...args);
      // Login

      case 'getLoginOptions':
        return {
          popupUri,
          callbackUri
        };

      case 'foundSession':
        foundSessionCb(...args);
    }
  };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=solid-auth-client.bundle.js.map