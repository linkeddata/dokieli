(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("window"), require("fetch"), require("crypto"), require("TextEncoder"));
	else if(typeof define === 'function' && define.amd)
		define(["window", "fetch", "crypto", "TextEncoder"], factory);
	else if(typeof exports === 'object')
		exports["DO"] = factory(require("window"), require("fetch"), require("crypto"), require("TextEncoder"));
	else
		root["DO"] = factory(root["window"], root["fetch"], root["crypto"], root["TextEncoder"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_67__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Formats: __webpack_require__(22),
  Initializer: __webpack_require__(23),
  JSONDocument: __webpack_require__(56),
  JSONMapping: __webpack_require__(57),
  JSONPatch: __webpack_require__(24),
  JSONPointer: __webpack_require__(14),
  JSONSchema: __webpack_require__(58),
  Validator: __webpack_require__(25)
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module JSON Object Signing and Encryption (JOSE)
 */
var JWA = __webpack_require__(15);
var JWK = __webpack_require__(30);
var JWKSet = __webpack_require__(71);
var JWT = __webpack_require__(72);
var JWS = __webpack_require__(36);
var Base64URLSchema = __webpack_require__(33);
var JOSEHeaderSchema = __webpack_require__(35);
var JWKSchema = __webpack_require__(12);
var JWKSetSchema = __webpack_require__(31);
var JWTClaimsSetSchema = __webpack_require__(34);
var JWTSchema = __webpack_require__(32

/**
 * Export
 */
);module.exports = {
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
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(59).default;
module.exports.default = module.exports;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(60)
var ieee754 = __webpack_require__(61)
var isArray = __webpack_require__(62)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Configuration
 */
module.exports = {
  Lang: document.documentElement.lang,
  DocRefType: '',
  RefType: {
    LNCS: { InlineOpen: '[', InlineClose: ']' },
    ACM: { InlineOpen: '[', InlineClose: ']' }
  },
  Stylesheets: [],
  User: {
    IRI: null,
    Role: null
  },
  LocalDocument: false,
  UseStorage: false,
  AutoSaveId: '',
  AutoSaveTimer: 60000,
  DisableStorageButtons: '<button class="local-storage-disable-html" title="Disable local storage (temporary) in the browser"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
  EnableStorageButtons: '<button class="local-storage-enable-html" title="Enable local storage (temporary) in the browser"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
  CDATAStart: '//<![CDATA[',
  CDATAEnd: '//]]>',
  SortableList: false,
  GraphViewerAvailable: (typeof d3 !== 'undefined'),
  MathAvailable: (typeof MathJax !== 'undefined'),
  EditorAvailable: (typeof MediumEditor !== 'undefined'),
  EditorEnabled: false,
  Editor: {
    headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
    regexEmptyHTMLTags: /<[^\/>][^>]*><\/[^>]+>/gim,
    ButtonLabelType: (((window.chrome && chrome.runtime && chrome.runtime.id) || (typeof browser !== 'undefined' && browser.runtime && browser.runtime.id)) ? 'fontawesome' : (document.querySelector('head link[rel~="stylesheet"][href*="font-awesome"]') ? (!navigator.onLine && document.querySelector('head link[rel~="stylesheet"][href*="font-awesome"][href^="http"]') ? '': 'fontawesome') : '' )),
    DisableReviewButton: '<button class="review-disable" title="Disable review"><i class="fa fa-balance-scale fa-2x"></i>Review</button>',
    EnableReviewButton: '<button class="review-enable" title="Enable review"><i class="fa fa-balance-scale fa-2x"></i>Review</button>',
    DisableEditorButton: '<button class="editor-disable" title="Disable editor"><i class="fa fa-i-cursor fa-2x"></i>Edit</button>',
    EnableEditorButton: '<button class="editor-enable" title="Enable editor"><i class="fa fa-i-cursor fa-2x"></i>Edit</button>'
  },
  DOMNormalisation: {
    'selfClosing': "area base basefont br col colgroup embed hr img input isindex link meta metadata param source wbr",
    'skipAttributes': "contenteditable spellcheck medium-editor-index data-medium-editor-element data-medium-editor-editor-index data-medium-focused data-placeholder role aria-multiline style",
    'sortAttributes': true,
    'skipNodeWithClass': 'do',
    'classWithChildText': {
      'class': '.do.ref',
      'element': 'mark'
    },
    'replaceClassItemWith': {
      'source': "on-document-menu medium-editor-element",
      'target': ''
    },
    'skipClassWithValue': ''
  },

  SelectorSign: {
    "*": "🔗",
    "aside": "†",
    "audio": "🔊",
    "code": "#",
    "dl#document-annotation-service": "※",
    "dl#document-license": "🌻",
    "dl#document-identifier": "🚩",
    "dl#document-inbox": "📥",
    "dl#document-in-reply-to": "⮪",
    "dl#document-modified": "📅",
    "dl#document-published": "📅",
    "dfn": "📇",
    "figure": "❦",
    "footer": "⸙",
    "img": "🖼",
    "nav": "☛",
    "p": "¶",
    "pre": "🖩",
    "section": "§",
    "section#acknowledgements": "☺",
    "section#conclusions": "∴",
    "section#keywords": "🏷",
    "section#references": "☛",
    "section#related-work": "⌘",
    "section#results": "∞",
    "table": "𝄜",
    "video": "🎞"
  },

  ContextLength: 32,
  InteractionPath: 'i/',
  ProxyURL: ((window.location.hostname == 'localhost' || !navigator.onLine) ? window.location.protocol + '//' + window.location.host + '/proxy?uri=' : 'https://dokie.li/proxy?uri='),
  AuthEndpoint: ((window.location.hostname == 'localhost' || !navigator.onLine) ? window.location.protocol + '//' + window.location.host + '/' : 'https://dokie.li/'),
  NotificationLicense: 'https://creativecommons.org/publicdomain/zero/1.0/',
  License: {
    "NoLicense": { 'name': 'No license', 'description': 'No license' },
    "https://creativecommons.org/publicdomain/zero/1.0/": {'name': 'CC0 1.0', 'description': 'Creative Commons Zero'},
    "https://creativecommons.org/licenses/by/4.0/": {'name': 'CC BY 4.0', 'description': 'Creative Commons Attribution'},
    "https://creativecommons.org/licenses/by-sa/4.0/": {'name': 'CC BY-SA 4.0', 'description': 'Creative Commons Attribution-ShareAlike'},
    "https://creativecommons.org/licenses/by-nc/4.0/": {'name': 'CC BY-NC 4.0', 'description': 'Creative Commons Attribution-NonCommercial'},
    "https://creativecommons.org/licenses/by-nd/4.0/": {'name': 'CC BY-ND 4.0', 'description': 'Creative Commons Attribution-NoDerivatives'},
    "https://creativecommons.org/licenses/by-nc-sa/4.0/": {'name': 'CC BY-NC-SA 4.0', 'description': 'Creative Commons Attribution-NonCommercial-ShareAlike'},
    "https://creativecommons.org/licenses/by-nc-nd/4.0/": {'name': 'CC BY-NC-ND 4.0', 'description': 'Creative Commons Attribution-NonCommercial-NoDerivates'}
  },
  Citation: {
    'http://purl.org/spar/cito/agreesWith': 'agrees with',
    'http://purl.org/spar/cito/cites': 'cites',
    'http://purl.org/spar/cito/citesAsAuthority': 'cites as authority',
    'http://purl.org/spar/cito/citesAsDataSource': 'cites as data source',
    'http://purl.org/spar/cito/citesAsEvidence': 'cites as evidence',
    'http://purl.org/spar/cito/citesAsMetadataDocument': 'cites as metadata document',
    'http://purl.org/spar/cito/citesAsPotentialSolution': 'cites as potential solution',
    'http://purl.org/spar/cito/citesAsRecommendedReading': 'cites as potential reading',
    'http://purl.org/spar/cito/citesAsRelated': 'cites as related',
    'http://purl.org/spar/cito/citesAsSourceDocument': 'cites as source document',
    'http://purl.org/spar/cito/citesForInformation': 'cites for information',
    'http://purl.org/spar/cito/compiles': 'compiles',
    'http://purl.org/spar/cito/confirms': 'confirms',
    'http://purl.org/spar/cito/containsAssertionFrom': 'contains assertion from',
    'http://purl.org/spar/cito/corrects': 'corrects',
    'http://purl.org/spar/cito/credits': 'credits',
    'http://purl.org/spar/cito/critiques': 'critiques',
    'http://purl.org/spar/cito/derides': 'derides',
    'http://purl.org/spar/cito/describes': 'describes',
    'http://purl.org/spar/cito/disagreesWith': 'disagrees with',
    'http://purl.org/spar/cito/discusses': 'discusses',
    'http://purl.org/spar/cito/disputes': 'disputes',
    'http://purl.org/spar/cito/documents': 'documents',
    'http://purl.org/spar/cito/extends': 'extends',
    'http://purl.org/spar/cito/includesExcerptFrom': 'includes excerpt from',
    'http://purl.org/spar/cito/includesQuotationFrom': 'includes quotation from',
    'http://purl.org/spar/cito/obtainsBackgroundFrom': 'obtains background from',
    'http://purl.org/spar/cito/obtainsSupportFrom': 'obtains support from',
    'http://purl.org/spar/cito/parodies': 'parodies',
    'http://purl.org/spar/cito/plagiarizes': 'plagiarizes',
    'http://purl.org/spar/cito/qualifies': 'qualifies',
    'http://purl.org/spar/cito/refutes': 'refutes',
    'http://purl.org/spar/cito/repliesTo': 'replies to',
    'http://purl.org/spar/cito/retracts': 'retracts',
    'http://purl.org/spar/cito/reviews': 'reviews',
    'http://purl.org/spar/cito/ridicules': 'ridicules',
    'http://purl.org/spar/cito/speculatesOn': 'speculates on',
    'http://purl.org/spar/cito/supports': 'supports',
    'http://purl.org/spar/cito/updates': 'updates',
    'http://purl.org/spar/cito/usesConclusionsFrom': 'uses conclusions from',
    'http://purl.org/spar/cito/usesDataFrom': 'uses data from',
    'http://purl.org/spar/cito/usesMethodIn': 'uses method in'
  },

  AvailableMediaTypes: ['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/xhtml+xml', 'text/html'],

  AcceptBinaryTypes: ['image/png', 'image/jpeg', 'image/gif'],

  Prefixes: {
    'xsd': 'http://www.w3.org/2001/XMLSchema#',
    'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    'as': 'https://www.w3.org/ns/activitystreams#',
    'oa': 'http://www.w3.org/ns/oa#',
    'schema': 'http://schema.org/'
  },

  Vocab: {
    "rdftype": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", "@type": "@id", "@array": true },
    "rdffirst": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#first", "@type": "@id" },
    "rdfrest": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest", "@type": "@id" },
    "rdfvalue": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
    "rdfslabel": { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
    "rdfsseeAlso": { "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlso", "@type": "@id", "@array": true },

    "owlsameAs": { "@id": "http://www.w3.org/2002/07/owl#sameAs", "@type": "@id", "@array": true },

    "foafname": "http://xmlns.com/foaf/0.1/name",
    "foaffamilyName": "http://xmlns.com/foaf/0.1/familyName",
    "foafgivenName": "http://xmlns.com/foaf/0.1/givenName",
    "foafhomepage": { "@id": "http://xmlns.com/foaf/0.1/homepage", "@type": "@id" },
    "foafimg": { "@id": "http://xmlns.com/foaf/0.1/img", "@type": "@id" },
    "foafdepiction": { "@id": "http://xmlns.com/foaf/0.1/depiction", "@type": "@id" },
    "foafnick": "http://xmlns.com/foaf/0.1/nick",
    "foafmaker": { "@id": "http://xmlns.com/foaf/0.1/maker", "@type": "@id" },
    "foafknows": { "@id": "http://xmlns.com/foaf/0.1/knows", "@type": "@id", "@array": true },

    "schemaname": "http://schema.org/name",
    "schemafamilyName": "http://schema.org/familyName",
    "schemagivenName": "http://schema.org/givenName",
    "schemaurl": { "@id": "http://schema.org/url", "@type": "@id" },
    "schemaimage": { "@id": "http://schema.org/image", "@type": "@id" },
    "schemacreator": { "@id": "http://schema.org/creator", "@type": "@id", "@array": true },
    "schemaauthor": { "@id": "http://schema.org/author", "@type": "@id", "@array": true },
    "schemacontributor": { "@id": "http://schema.org/contributor", "@type": "@id", "@array": true },
    "schemaeditor": { "@id": "http://schema.org/editor", "@type": "@id", "@array": true },
    "schemalicense": { "@id": "http://schema.org/license", "@type": "@id" },
    "schemacitation": { "@id": "http://schema.org/citation", "@type": "@id", "@array": true },
    "schemaknows": { "@id": "http://schema.org/knows", "@type": "@id", "@array": true },
    "schemadatePublished": "http://schema.org/datePublished",
    "schemadescription": "http://schema.org/description",

    "dctermstitle": "http://purl.org/dc/terms/title",
    "dctermsdescription": "http://purl.org/dc/terms/description",
    "dctermscreator": { "@id": "http://purl.org/dc/terms/creator", "@type": "@id", "@array": true },
    "dctermsdate": "http://purl.org/dc/terms/date",
    "dctermsissued": "http://purl.org/dc/terms/issued",
    "dctermscreated": "http://purl.org/dc/terms/created",
    "dctermsrights": { "@id": "http://purl.org/dc/terms/rights", "@type": "@id" },

    "skosprefLabel": { "@id": "http://www.w3.org/2004/02/skos/core#prefLabel", "@type": "@id", "@array": true },

    "refPeriod": "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod",
    "obsValue": "http://purl.org/linked-data/sdmx/2009/measure#obsValue",

    "biboauthorList": { "@id": "http://purl.org/ontology/bibo/authorList", "@type": "@id" },

    "storage": { "@id": "http://www.w3.org/ns/pim/space#storage", "@type": "@id", "@array": true },
    "preferencesFile": { "@id": "http://www.w3.org/ns/pim/space#preferencesFile", "@type": "@id" },
    "workspace": { "@id": "http://www.w3.org/ns/pim/space#workspace", "@type": "@id", "@array": true },
    "masterWorkspace": { "@id": "http://www.w3.org/ns/pim/space#masterWorkspace", "@type": "@id" },

    "ldpinbox": { "@id": "http://www.w3.org/ns/ldp#inbox", "@type": "@id", "@array": true },

    "oaannotation": { "@id": "http://www.w3.org/ns/oa#Annotation", "@type": "@id" },
    "oahasBody": { "@id": "http://www.w3.org/ns/oa#hasBody", "@type": "@id" },
    "oahasTarget": { "@id": "http://www.w3.org/ns/oa#hasTarget", "@type": "@id" },
    "oahasSource": { "@id": "http://www.w3.org/ns/oa#hasSource", "@type": "@id" },
    "oahasSelector": { "@id": "http://www.w3.org/ns/oa#hasSelector", "@type": "@id" },
    "oaexact": "http://www.w3.org/ns/oa#exact",
    "oaprefix": "http://www.w3.org/ns/oa#prefix",
    "oasuffix": "http://www.w3.org/ns/oa#suffix",
    "oamotivatedBy": { "@id": "http://www.w3.org/ns/oa#motivatedBy", "@type": "@id" },
    "oaannotationService": { "@id": "http://www.w3.org/ns/oa#annotationService", "@type": "@id", "@array": true },

    "assubject": { "@id": "https://www.w3.org/ns/activitystreams#subject", "@type": "@id", "@array": true },
    "asobject": { "@id": "https://www.w3.org/ns/activitystreams#object", "@type": "@id", "@array": true },
    "astarget": { "@id": "https://www.w3.org/ns/activitystreams#target", "@type": "@id", "@array": true },
    "asrelationship": { "@id": "https://www.w3.org/ns/activitystreams#relationship", "@type": "@id", "@array": true },
    "ascontext": { "@id": "https://www.w3.org/ns/activitystreams#context", "@type": "@id", "@array": true },
    "asinReplyTo": { "@id": "https://www.w3.org/ns/activitystreams#inReplyTo", "@type": "@id", "@array": true },
    "asactor": { "@id": "https://www.w3.org/ns/activitystreams#actor", "@type": "@id" },
    "asupdated": "https://www.w3.org/ns/activitystreams#updated",
    "aspublished": "https://www.w3.org/ns/activitystreams#published",
    "ascontent": "https://www.w3.org/ns/activitystreams#content",
    "asname": "https://www.w3.org/ns/activitystreams#name",
    "asimage": { "@id": "https://www.w3.org/ns/activitystreams#image", "@type": "@id" },

    "siocreplyof": { "@id": "http://rdfs.org/sioc/ns#reply_of", "@type": "@id", "@array": true },
    "siocavatar": { "@id": "http://rdfs.org/sioc/ns#avatar", "@type": "@id" },

    "ldpcontains": { "@id": "http://www.w3.org/ns/ldp#contains", "@type": "@id", "@array": true },
    "ldpresource": { "@id": "http://www.w3.org/ns/ldp#Resource", "@type": "@id", "@array": true  },
    "ldpcontainer": { "@id": "http://www.w3.org/ns/ldp#Container", "@type": "@id", "@array": true  }
  },

  SecretAgentNames: ['Abraham Lincoln', 'Admiral Awesome', 'Anonymous Coward', 'Believe it or not', 'Creative Monkey', 'Senegoid', 'Dog from the Web', 'Ekrub', 'Elegant Banana', 'Foo Bar', 'Lbmit', 'Lunatic Scholar', 'NahuLcm', 'Noslen', 'Okie Dokie', 'Samurai Cat', 'Vegan Superstar'],

  RefAreas: {"AF":"Afghanistan","A9":"Africa","AL":"Albania","DZ":"Algeria","AS":"American Samoa","L5":"Andean Region","AD":"Andorra","AO":"Angola","AG":"Antigua and Barbuda","1A":"Arab World","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas, The","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BR":"Brazil","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","CV":"Cabo Verde","KH":"Cambodia","CM":"Cameroon","CA":"Canada","S3":"Caribbean small states","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","JG":"Channel Islands","CL":"Chile","CN":"China","CO":"Colombia","KM":"Comoros","CD":"Congo, Dem. Rep.","CG":"Congo, Rep.","CR":"Costa Rica","CI":"Cote d'Ivoire","HR":"Croatia","CU":"Cuba","CW":"Curacao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","Z4":"East Asia & Pacific (all income levels)","4E":"East Asia & Pacific (developing only)","C4":"East Asia and the Pacific (IFC classification)","EC":"Ecuador","EG":"Egypt, Arab Rep.","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","XC":"Euro area","Z7":"Europe & Central Asia (all income levels)","7E":"Europe & Central Asia (developing only)","C5":"Europe and Central Asia (IFC classification)","EU":"European Union","FO":"Faeroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","PF":"French Polynesia","GA":"Gabon","GM":"Gambia, The","GE":"Georgia","DE":"Germany","GH":"Ghana","GR":"Greece","GL":"Greenland","GD":"Grenada","GU":"Guam","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","XE":"Heavily indebted poor countries (HIPC)","XD":"High income","XS":"High income: OECD","XR":"High income: nonOECD","HN":"Honduras","HK":"Hong Kong SAR, China","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Rep.","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Dem. Rep.","KR":"Korea, Rep.","KV":"Kosovo","KW":"Kuwait","KG":"Kyrgyz Republic","LA":"Lao PDR","ZJ":"Latin America & Caribbean (all income levels)","XJ":"Latin America & Caribbean (developing only)","L4":"Latin America and the Caribbean","C6":"Latin America and the Caribbean (IFC classification)","LV":"Latvia","XL":"Least developed countries: UN classification","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","XO":"Low & middle income","XM":"Low income","XN":"Lower middle income","LU":"Luxembourg","MO":"Macao SAR, China","MK":"Macedonia, FYR","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MR":"Mauritania","MU":"Mauritius","MX":"Mexico","L6":"Mexico and Central America","FM":"Micronesia, Fed. Sts.","ZQ":"Middle East & North Africa (all income levels)","XQ":"Middle East & North Africa (developing only)","C7":"Middle East and North Africa (IFC classification)","XP":"Middle income","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","M2":"North Africa","XU":"North America","MP":"Northern Mariana Islands","NO":"Norway","XY":"Not classified","OE":"OECD members","OM":"Oman","S4":"Other small states","S2":"Pacific island small states","PK":"Pakistan","PW":"Palau","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten (Dutch part)","SK":"Slovak Republic","SI":"Slovenia","S1":"Small states","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","8S":"South Asia","C8":"South Asia (IFC classification)","SS":"South Sudan","L7":"Southern Cone Extended","ES":"Spain","LK":"Sri Lanka","KN":"St. Kitts and Nevis","LC":"St. Lucia","MF":"St. Martin (French part)","VC":"St. Vincent and the Grenadines","C9":"Sub-Saharan Africa (IFC classification)","ZG":"Sub-Saharan Africa (all income levels)","ZF":"Sub-Saharan Africa (developing only)","A4":"Sub-Saharan Africa excluding South Africa","A5":"Sub-Saharan Africa excluding South Africa and Nigeria","SD":"Sudan","SR":"Suriname","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","XT":"Upper middle income","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela, RB","VN":"Vietnam","VI":"Virgin Islands (U.S.)","PS":"West Bank and Gaza","1W":"World","YE":"Yemen, Rep.","ZM":"Zambia","ZW":"Zimbabwe"}
}


/***/ }),
/* 8 */
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

var util = __webpack_require__(52);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Config = __webpack_require__(7)
const uri = __webpack_require__(11)
const graph = __webpack_require__(13)
const regex = __webpack_require__(44)

const DEFAULT_CONTENT_TYPE = 'text/html; charset=utf-8'
const LDP_RESOURCE = '<http://www.w3.org/ns/ldp#Resource>; rel="type"'

var fetch = __webpack_require__(4)  // Uses native fetch() in the browser

module.exports = {
  copyResource,
  currentLocation,
  deleteResource,
  getAcceptPostPreference,
  getResource,
  getResourceHead,
  getResourceGraph,
  getResourceOptions,
  initFetch,
  parseLinkHeader,
  patchResource,
  postResource,
  putResource,
  putResourceACL
}

function initFetch (authenticatedFetch) {
  fetch = authenticatedFetch || __webpack_require__(4)
}

// I want HTTP COPY and I want it now!
function copyResource (fromURL, toURL, options = {}) {
  let headers = { 'Accept': '*/*' }
  let contentType

  if (!fromURL || !toURL) {
    return Promise.reject(new Error('Missing fromURL or toURL in copyResource'))
  }

  return getResource(fromURL, headers, options)
    .then(response => {
      contentType = response.headers.get('Content-Type')

      return (Config.AcceptBinaryTypes.indexOf(contentType))
        ? response.arrayBuffer()
        : response.text()
    })
    .then(contents => {
      return putResource(toURL, contents, contentType, null, options)
        .catch(error => {
          if (error.status === 0) {
            // Retry with no credentials
            options.noCredentials = true
            return putResource(toURL, contents, contentType, null, options)
          }

          throw error  // re-throw error
        })
    })
}

/**
 * @returns {string}
 */
function currentLocation () {
  return window.location.origin + window.location.pathname
}

/**
 * deleteResource
 *
 * @param url {string}
 * @param options {object}
 *
 * @returns {Promise<Response>}
 */
function deleteResource (url, options = {}) {
  if (!url) {
    return Promise.reject(new Error('Cannot DELETE resource - missing url'))
  }

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.method = 'DELETE'

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error deleting resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

function getAcceptPostPreference (url) {
  const pIRI = uri.getProxyableIRI(url)

  return getResourceOptions(pIRI, {'header': 'Accept-Post'})
    .catch(error => {
      console.error(error)

      return {'headers': 'application/ld+json'}
    })
    .then(result => {
      let header = result.headers.trim().split(/\s*, \s*/)

      if (header.indexOf('text/html') > -1 || header.indexOf('application/xhtml+xml') > -1) {
        return 'text/html'
      } else if (header.indexOf('text/turtle') > -1 || header.indexOf('*/*') > -1) {
        return 'text/turtle'
      } else if (header.indexOf('application/ld+json') > -1 || header.indexOf('application/json') > -1) {
        return 'application/ld+json'
      } else {
        console.log('Accept-Post contains unrecognised media-range; ' + result.headers)
        return result.headers
      }
    })
}

/**
 * getResource
 *
 * @param url {string}
 *
 * @param headers {object}
 * @param [headers.accept='text/turtle'] {string}
 *
 * @param options {object}
 *
 * @returns {Promise<string>|Promise<ArrayBuffer>}
 */
function getResource (url, headers = {}, options = {}) {
  url = url || currentLocation()

  options.method = 'GET'

  if (!headers['Accept']) {
    headers['Accept'] = 'text/turtle'
  }

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = Object.assign({}, headers)

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * getResourceHead
 *
 * @param [url] {string}
 *
 * @param options {object}
 * @param options.header {string}
 *
 * @returns {Promise<string>} Resolves with contents of specified header
 */
function getResourceHead (url, options = {}) {
  url = url || currentLocation()

  if (!options.header) {
    return Promise.reject(new Error('options.header not specified'))
  }

  options.method = 'HEAD'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource HEAD: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      let header = response.headers.get(options.header)

      if (!header) {
        throw new Error("'" + options.header + "' header not found")
      }

      return { 'headers': header }
    })
}

function getResourceGraph (iri, headers, options = {}) {
  let defaultHeaders = {'Accept': Config.AvailableMediaTypes.join(',')}
  headers = headers || defaultHeaders
  if (!('Accept' in headers)) {
    Object.assign(headers, defaultHeaders)
  }

  if (iri.slice(0, 5).toLowerCase() === 'http:') {
    options['noCredentials'] = true

    if (document.domain !== iri.split('/')[2]) {
      options['forceProxy'] = true
    }
  }

  let pIRI = uri.getProxyableIRI(iri, options)

  return getResource(pIRI, headers, options)
    .then(response => {
      let cT = response.headers.get('Content-Type')
      options.contentType = (cT) ? cT.split(';')[ 0 ].trim() : 'text/turtle'

      options.subjectURI = uri.stripFragmentFromString(iri)

      return response.text()
    })
    .then(data => {
      // FIXME: This is a dirty filthy fugly but a *fix* to get around the baseURI not being passed to the DOM parser. This injects the `base` element into the document so that the RDFa parse fallsback to that. The actual fix should happen upstream. See related issues:
      // https://github.com/linkeddata/dokieli/issues/132
      // https://github.com/rdf-ext/rdf-parser-dom/issues/2
      // https://github.com/rdf-ext/rdf-parser-rdfa/issues/3
      // https://github.com/simplerdf/simplerdf/issues/19

      if (options.contentType === 'text/html' || options.contentType === 'application/xhtml+xml') {
        let template = document.implementation.createHTMLDocument('template')
        template.documentElement.innerHTML = data
        template.contentType = options.contentType
        let base = template.querySelector('head base[href]')
        if (!base) {
          template.querySelector('head').insertAdjacentHTML('afterbegin', '<base href="' + options.subjectURI + '" />')
          data = template.documentElement.outerHTML
        }
      }

      return graph.getGraphFromData(data, options)
    })
    .then(g => {
      let fragment = (iri.lastIndexOf('#') >= 0) ? iri.substr(iri.lastIndexOf('#')) : ''

      return SimpleRDF(Config.Vocab, options[ 'subjectURI' ], g, ld.store).child(pIRI + fragment)
    })
}

/**
 * getResourceOptions
 *
 * @param [url] {string} Defaults to current url
 *
 * @param [options={}] {object}
 * @param [options.header] {string} Specific response header to return
 * @param [options.noCredentials] {boolean}
 *
 * @returns {Promise} Resolves with `{ headers: ... }` object
 */
function getResourceOptions (url, options = {}) {
  url = url || currentLocation()

  options.method = 'OPTIONS'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource OPTIONS: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      if (options.header) {  // specific header requested
        return { headers: response.headers.get(options.header) }
      }

      return { headers: response.headers }  // Not currently used anywhere
    })
}

function parseLinkHeader (link) {
  if (!link) {
    return {}
  }

  var matches = link.match(regex.linkexp)
  var rels = {}
  for (var i = 0; i < matches.length; i++) {
    var split = matches[i].split('>')
    var href = split[0].substring(1)
    var ps = split[1]
    var s = ps.match(regex.paramexp)
    for (var j = 0; j < s.length; j++) {
      var p = s[j]
      var paramsplit = p.split('=')
      // var name = paramsplit[0]
      var rel = paramsplit[1].replace(/["']/g, '')
      if (!rels[rel]) {
        rels[rel] = []
      }
      rels[rel].push(href)
      if (rels[rel].length > 1) {
        rels[rel].sort()
      }
    }
  }
  return rels
}

function patchResource (url, deleteBGP, insertBGP, options = {}) {
  // insertBGP and deleteBGP are basic graph patterns.
  if (deleteBGP) {
    deleteBGP = 'DELETE DATA { ' + deleteBGP + ' };'
  }

  if (insertBGP) {
    insertBGP = 'INSERT DATA { ' + insertBGP + ' };'
  }

  options.body = deleteBGP + insertBGP

  options.method = 'PATCH'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = 'application/sparql-update; charset=utf-8'

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error patching resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

function postResource (url, slug, data, contentType, links, options = {}) {
  if (!url) {
    return Promise.reject(new Error('Cannot POST resource - missing url'))
  }

  options.method = 'PUT'

  options.body = data

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = contentType || DEFAULT_CONTENT_TYPE

  links = links
    ? LDP_RESOURCE + ', ' + links
    : LDP_RESOURCE

  options.headers['Link'] = links

  if (slug) {
    options.headers['Slug'] = slug
  }

  return fetch(url, options)

    .catch(error => {
      if (error.status === 0 && !options.noCredentials) {
        // Possible CORS error, retry with no credentials
        options.noCredentials = true
        return postResource(url, slug, data, contentType, options)
      }

      throw error
    })

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error creating resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * putResource
 *
 * @param url {string}
 *
 * @param data {string|object}
 *
 * @param [contentType=DEFAULT_CONTENT_TYPE] {string}
 *
 * @param [links=LDP_RESOURCE] {string}
 *
 * @param [options={}] {object}
 *
 * @returns {Promise<Response>}
 */
function putResource (url, data, contentType, links, options = {}) {
  if (!url) {
    return Promise.reject(new Error('Cannot PUT resource - missing url'))
  }

  options.method = 'PUT'

  options.body = data

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = contentType || DEFAULT_CONTENT_TYPE

  links = links
    ? LDP_RESOURCE + ', ' + links
    : LDP_RESOURCE

  options.headers['Link'] = links

  return fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error writing resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * putResourceACL
 *
 * TODO: This doesn't seem to be used anywhere...
 *
 * @param accessToURL
 * @param aclURL
 * @param acl
 *
 * @returns {Promise<Response|null>}
 */
function putResourceACL (accessToURL, aclURL, acl) {
  if (!Config.User.IRI) {
    console.log('Go through sign-in or do: DO.C.User.IRI = "https://example.org/#i";')
    return Promise.resolve(null)
  }

  acl = acl || {
    'u': { 'iri': [Config.User.IRI], 'mode': ['acl:Control', 'acl:Read', 'acl:Write'] },
    'g': { 'iri': ['http://xmlns.com/foaf/0.1/Agent'], 'mode': ['acl:Read'] },
    'o': { 'iri': [], 'mode': [] }
  }

  let agent, agentClass, mode

  if ('u' in acl && 'iri' in acl.u && 'mode' in acl.u) {
    agent = '<' + acl.u.iri.join('> , <') + '>'
    mode = acl.u.mode.join(' , ')
  } else {
    agent = '<' + Config.User.IRI + '>'
    mode = 'acl:Control , acl:Read , acl:Write'
  }

  let authorizations = []

  authorizations.push(
    '[ a acl:Authorization ; acl:accessTo <' +
    accessToURL + '> ; acl:accessTo <' + aclURL + '> ; acl:mode ' + mode +
    ' ; acl:agent ' + agent + ' ] .'
  )

  if ('g' in acl && 'iri' in acl.g && acl.g.iri.length >= 0) {
    agentClass = '<' + acl.g.iri.join('> , <') + '>'
    mode = acl.g.mode.join(' , ')
    authorizations.push(
      '[ a acl:Authorization ; acl:accessTo <' + accessToURL +
      '> ; acl:mode ' + mode + ' ; acl:agentClass ' + agentClass + ' ] .'
    )
  }

  let data = '@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n' +
    authorizations.join('\n') + '\n'

  return putResource(aclURL, data, 'text/turtle; charset=utf-8')
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const config = __webpack_require__(7)

module.exports = {
  encodeString,
  decodeString,
  getAbsoluteIRI,
  getProxyableIRI,
  stripFragmentFromString
}

function encodeString (string) {
  return encodeURIComponent(string).replace(/'/g, '%27').replace(/"/g, '%22')
}

/**
 * UNUSED
 *
 * @param string {string}
 *
 * @returns {string}
 */
function decodeString (string) {
  return decodeURIComponent(string.replace(/\+/g, ' '))
}

function getAbsoluteIRI (base, location) {
  var iri = location

  if (location.toLowerCase().slice(0, 4) !== 'http') {
    if (location.startsWith('/')) {
      var x = base.toLowerCase().trim().split('/')

      iri = x[0] + '//' + x[2] + location
    } else if (!base.endsWith('/')) {
      iri = base.substr(0, base.lastIndexOf('/') + 1) + location
    } else {
      iri = base + location
    }
  }

  return iri
}

function getProxyableIRI (url, options = {}) {
  var pIRI = stripFragmentFromString(url)

  if ((typeof document !== 'undefined' && document.location.protocol === 'https:' && pIRI.slice(0, 5).toLowerCase() === 'http:') || 'forceProxy' in options) {
    var proxyURL = ('proxyURL' in options) ? options.proxyURL : config.ProxyURL
    pIRI = proxyURL + encodeString(pIRI)
  }

  return pIRI
}

function stripFragmentFromString (string) {
  if (typeof string === 'string') {
    let stringIndexFragment = string.indexOf('#')

    if (stringIndexFragment >= 0) {
      string = string.substring(0, stringIndexFragment)
    }
  }
  return string
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 * @ignore
 */

var _require = __webpack_require__(0),
    JSONSchema = _require.JSONSchema;

var _require2 = __webpack_require__(70

/**
 * JWK Schema
 */
),
    BASE64_REGEXP = _require2.BASE64_REGEXP;

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined

const Config = __webpack_require__(7)

module.exports = {
  getGraph,
  getGraphFromData,
  serializeData,
  serializeGraph
}

function getGraph (url) {
  return SimpleRDF(Config.Vocab, url, null, ld.store).get()
}

function getGraphFromData (data, options = {}) {
  if (!('contentType' in options)) {
    options['contentType'] = 'text/turtle'
  }
  if (!('subjectURI' in options)) {
    options['subjectURI'] = '_:dokieli'
  }

  return SimpleRDF.parse(data, options['contentType'], options['subjectURI'])
}

/**
 * @param data
 * @param fromContentType
 * @param toContentType
 * @param options
 *
 * @returns {Promise}
 */
function serializeData (data, fromContentType, toContentType, options) {
  if (fromContentType === toContentType) {
    return Promise.resolve(data)
  }

  options.contentType = fromContentType

  return getGraphFromData(data, options)
    .then(g => {
      options.contentType = toContentType

      return serializeGraph(g, options)
    })
    .then(data => {
      switch (toContentType) {
        case 'application/ld+json':
          var parsed = JSON.parse(data)

          parsed[0]['@context'] = [
            'http://www.w3.org/ns/anno.jsonld',
            {'as': 'https://www.w3.org/ns/activitystreams'}
          ]

          parsed[0]['@id'] = (parsed[0]['@id'].slice(0, 2) === '_:')
            ? ''
            : parsed[0]['@id']

          return JSON.stringify(parsed) + '\n'

        default:
          return data
      }
    })
}

function serializeGraph (g, options = {}) {
  if (!('contentType' in options)) {
    options['contentType'] = 'text/turtle'
  }

  return ld.store.serializers[options.contentType].serialize(g._graph)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
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
/* 15 */
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
var base64url = __webpack_require__(5);
var supportedAlgorithms = __webpack_require__(64);

var _require = __webpack_require__(28

/**
 * JWA
 * https://tools.ietf.org/html/rfc7518
 */
),
    NotSupportedError = _require.NotSupportedError;

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
      var normalizedAlgorithm = supportedAlgorithms.normalize('sign', alg

      // validate algorithm is supported
      );if (normalizedAlgorithm instanceof Error) {
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
      var normalizedAlgorithm = supportedAlgorithms.normalize('importKey', key.alg);
      return normalizedAlgorithm.importKey(key);
    }
  }]);

  return JWA;
}();

/**
 * Export
 */


module.exports = JWA;

/***/ }),
/* 16 */
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
function onHttpError (message = 'fetch error') {
  return (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    let errorMessage = `${message}: ${response.status} ${response.statusText}`
    let error = new Error(errorMessage)
    error.response = response
    error.statusCode = response.status
    throw error
  }
}

module.exports = onHttpError


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = __webpack_require__(4);
var onHttpError = __webpack_require__(18);
var PoPToken = __webpack_require__(80);

var Session = function () {
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
  function Session(options) {
    _classCallCheck(this, Session);

    this.credentialType = options.credentialType || 'access_token';

    this.issuer = options.issuer;

    this.authorization = options.authorization || {};

    this.sessionKey = options.sessionKey;

    this.idClaims = options.idClaims;
    this.accessClaims = options.accessClaims;
  }

  _createClass(Session, [{
    key: 'bearerTokenFor',


    /**
     * bearerTokenFor
     *
     * @param url {string}
     *
     * @returns {Promise<string>}
     */
    value: function bearerTokenFor(url) {
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

  }, {
    key: 'hasCredentials',
    value: function hasCredentials() {
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

  }, {
    key: 'fetchWithCredentials',
    value: function fetchWithCredentials(url, options) {
      options.headers = options.headers || {};

      return this.bearerTokenFor(url).then(function (token) {
        options.headers.authorization = 'Bearer ' + token;

        return fetch(url, options);
      });
    }
  }, {
    key: 'fetch',


    /**
     * Authenticated fetch() getter
     *
     * @returns {function}
     */
    get: function get() {
      var _this = this;

      /**
       * fetch() function signature
       *
       * @param url {RequestInfo|string}
       * @param options {object}
       *
       * @returns {Promise<Response>}
       */
      return function (url, options) {
        return fetch(url, options).then(function (response) {
          if (response.status === 401 && _this.hasCredentials()) {
            // Retry with credentials
            return _this.fetchWithCredentials(url, options);
          }

          if (!response.ok) {
            onHttpError()(response); // throw error
          }

          return response;
        });
      };
    }
  }], [{
    key: 'from',
    value: function from(options) {
      return new Session(options);
    }

    /**
     * @param response {AuthenticationResponse}
     *
     * @returns {Session}
     */

  }, {
    key: 'fromAuthResponse',
    value: function fromAuthResponse(response) {
      var RelyingParty = __webpack_require__(81); // import here due to circular dep

      var payload = response.decoded.payload;
      var registration = response.rp.registration;
      var rpAuthOptions = response.rp.authenticate || {};

      var sessionKey = response.session[RelyingParty.SESSION_PRIVATE_KEY];

      var options = {
        sessionKey: sessionKey,
        issuer: payload.iss,
        credentialType: rpAuthOptions['credential_type'],
        authorization: {
          client_id: registration['client_id'],
          access_token: response.params['access_token'],
          id_token: response.params['id_token'],
          refresh_token: response.params['refresh_token']
        },
        idClaims: response.decoded && response.decoded.payload
      };

      return Session.from(options);
    }
  }]);

  return Session;
}();

module.exports = Session;

/***/ }),
/* 18 */
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

function onHttpError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fetch error';

  return function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    var errorMessage = message + ': ' + response.status + ' ' + response.statusText;
    var error = new Error(errorMessage);
    error.response = response;
    error.statusCode = response.status;
    throw error;
  };
}

module.exports = onHttpError;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  uniqueArray
}

/**
 * @param a {Array}
 *
 * @returns {Array}
 */
function uniqueArray (a) {
  var n = {}
  var r = []
  for (var i = 0; i < a.length; i++) {
    if (!n[a[i]]) {
      n[a[i]] = true
      r.push(a[i])
    }
  }
  return r
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(21)


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Dependencies
 */
const assert = __webpack_require__(8)
const fetch = __webpack_require__(4)
const { URL } = __webpack_require__(2)
const Headers = fetch.Headers ? fetch.Headers : global.Headers
const {JSONDocument} = __webpack_require__(0)
const {JWKSet} = __webpack_require__(3)
const AuthenticationRequest = __webpack_require__(73)
const AuthenticationResponse = __webpack_require__(74)
const RelyingPartySchema = __webpack_require__(79)
const onHttpError = __webpack_require__(16)

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
 *    authenticate: {
 *      response_type: 'code',
 *      display: 'popup',
 *      scope: 'openid profile email'
 *    },
 *    register: {
 *      client_name: 'Example',
 *      client_uri: 'https://example.com',
 *      logo_uri: 'https://example.com/assets/logo.png',
 *      redirect_uris: ['https://app.example.com/callback'],
 *      response_types: ['code', 'code id_token token'],
 *      grant_types: ['authorization_code'],
 *      default_max_age: 7200,
 *      post_logout_redirect_uris: ['https://app.example.com']
 *    },
 *    registration: {
 *      // if you have it saved somewhere
 *    },
 *    store: localStorage || req.session,
 *    popup: { width: 400, height: 300 }
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
  static get schema () {
    return RelyingPartySchema
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
  static from (data) {
    let rp = new RelyingParty(data)
    let validation = rp.validate()

    // schema validation
    if (!validation.valid) {
      return Promise.reject(new Error(JSON.stringify(validation)))
    }

    let jwks = rp.provider.jwks

    // request the JWK Set if missing
    if (!jwks) {
      return rp.jwks().then(() => rp)
    }

    // otherwise import the JWK Set to webcrypto
    return JWKSet.importKeys(jwks).then(jwks => {
      rp.provider.jwks = jwks
      return rp
    })
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
  static register (issuer, registration, options) {
    let rp = new RelyingParty({
      provider: { url: issuer },
      defaults: Object.assign({}, options.defaults),
      store: options.store
    })

    return Promise.resolve()
      .then(() => rp.discover())
      .then(() => rp.jwks())
      .then(() => rp.register(registration))
      .then(() => rp)
  }

  /**
   * Discover
   *
   * @description Fetches the issuer's OpenID Configuration.
   * @returns {Promise<Object>} Resolves with the provider configuration response
   */
  discover () {
    try {
      let issuer = this.provider.url

      assert(issuer, 'RelyingParty provider must define "url"')

      let url = new URL(issuer)
      url.pathname = '.well-known/openid-configuration'

      return fetch(url.toString())
        .then(onHttpError('Error fetching openid configuration'))
        .then(response => {
          return response.json().then(json => this.provider.configuration = json)
        })

    } catch (error) {
      return Promise.reject(error)
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
  register (options) {
    try {
      let configuration = this.provider.configuration

      assert(configuration, 'OpenID Configuration is not initialized.')
      assert(configuration.registration_endpoint, 'OpenID Configuration is missing registration_endpoint.')

      let uri = configuration.registration_endpoint
      let method = 'post'
      let headers = new Headers({ 'Content-Type': 'application/json' })
      let params = this.defaults.register
      let body = JSON.stringify(Object.assign({}, params, options))

      return fetch(uri, {method, headers, body})
        .then(onHttpError('Error registering client'))
        .then(response => {
          return response.json().then(json => this.registration = json)
        })

    } catch (error) {
      return Promise.reject(error)
    }
  }

  serialize () {
    return JSON.stringify(this)
  }

  /**
   * jwks
   *
   * @description Promises the issuer's JWK Set.
   * @returns {Promise}
   */
  jwks () {
    try {
      let configuration = this.provider.configuration

      assert(configuration, 'OpenID Configuration is not initialized.')
      assert(configuration.jwks_uri, 'OpenID Configuration is missing jwks_uri.')

      let uri = configuration.jwks_uri

      return fetch(uri)
        .then(onHttpError('Error resolving provider keys'))
        .then(response => {
          return response
            .json()
            .then(json => JWKSet.importKeys(json))
            .then(jwks => this.provider.jwks = jwks)
        })

    } catch (error) {
      return Promise.reject(error)
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
  createRequest (options, session) {
    return AuthenticationRequest.create(this, options, session || this.store)
  }

  /**
   * Validate Response
   *
   * @param response {string} req.query or req.body.text
   * @param session {Session|Storage} req.session or localStorage or similar
   * @returns {Promise<Object>} Custom response object, with `params` and
   *   `mode` properties
   */
  validateResponse (response, session) {
    session = session || this.store

    if (response.match(/^http(s?):\/\//)) {
      response = { rp: this, redirect: response, session }
    } else {
      response = { rp: this, body: response, session }
    }

    return AuthenticationResponse.validateResponse(response)
  }

  /**
   * userinfo
   *
   * @description Promises the authenticated user's claims.
   * @returns {Promise}
   */
  userinfo () {
    try {
      let configuration = this.provider.configuration

      assert(configuration, 'OpenID Configuration is not initialized.')
      assert(configuration.userinfo_endpoint, 'OpenID Configuration is missing userinfo_endpoint.')

      let uri = configuration.userinfo_endpoint
      let access_token = this.store.access_token

      assert(access_token, 'Missing access token.')

      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })

      return fetch(uri, {headers})
        .then(onHttpError('Error fetching userinfo'))
        .then(response => response.json())

    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Logout
   *
   * @returns {Promise}
   */
  logout () {
    let configuration
    try {
      assert(this.provider, 'OpenID Configuration is not initialized.')
      configuration = this.provider.configuration
      assert(configuration, 'OpenID Configuration is not initialized.')
      assert(configuration.end_session_endpoint,
        'OpenID Configuration is missing end_session_endpoint.')
    } catch (error) {
      return Promise.reject(error)
    }

    this.clearSession()

    let uri = configuration.end_session_endpoint
    let method = 'get'

    return fetch(uri, {method})
      .then(onHttpError('Error logging out'))

    // TODO: Validate `frontchannel_logout_uri` if necessary
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

  clearSession () {
    let session = this.store

    if (!session) { return }

    delete session[SESSION_PRIVATE_KEY]
  }

  /**
   * @param uri {string} Target Resource Server URI
   * @param idToken {IDToken} ID Token to be embedded in the PoP token
   *
   * @returns {Promise<PoPToken>}
   */
  popTokenFor (uri, idToken) {
    return PoPToken.issueFor(uri, idToken, this)
  }
}

const SESSION_PRIVATE_KEY = 'oidc.session.privateKey'

RelyingParty.SESSION_PRIVATE_KEY = SESSION_PRIVATE_KEY

module.exports = RelyingParty

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPointer = __webpack_require__(14);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var formats = __webpack_require__(22);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TextEncoder = global.TextEncoder ? global.TextEncoder // browser
: __webpack_require__(67).TextEncoder; // node shim
module.exports = TextEncoder;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  DataError: __webpack_require__(29),
  NotSupportedError: __webpack_require__(27)
};

/***/ }),
/* 29 */
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
/* 30 */
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

var _require = __webpack_require__(0),
    JSONDocument = _require.JSONDocument;

var JWKSchema = __webpack_require__(12);
var JWA = __webpack_require__(15

/**
 * JWK Class
 */
);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var _require = __webpack_require__(0),
    JSONSchema = _require.JSONSchema;

var JWKSchema = __webpack_require__(12

/**
 * JWKSetSchema
 */
);var JWKSetSchema = new JSONSchema({
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var Base64URLSchema = __webpack_require__(33);
var JWTClaimsSetSchema = __webpack_require__(34);
var JOSEHeaderSchema = __webpack_require__(35);

var _require = __webpack_require__(0

/**
 * JWTSchema
 *
 * @description
 * This schema represents all the things a deserialized JWT can be, i.e.,
 * either a JWS or JWE, and any serialization of them. Validation of well-
 * formedness for a given serialization is accomplished at the time of
 * encoding.
 */
),
    JSONSchema = _require.JSONSchema;

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var _require = __webpack_require__(0

/**
 * Base64URLSchema
 */
),
    JSONSchema = _require.JSONSchema;

var Base64URLSchema = new JSONSchema({
  type: 'string',
  format: 'base64url'
});

/**
 * Export
 */
module.exports = Base64URLSchema;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var _require = __webpack_require__(0

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
),
    JSONSchema = _require.JSONSchema;

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var JWKSchema = __webpack_require__(12);

var _require = __webpack_require__(0

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
),
    JSONSchema = _require.JSONSchema;

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var base64url = __webpack_require__(5);
var JWA = __webpack_require__(15);

var _require = __webpack_require__(28

/**
 * JWS
 */
),
    DataError = _require.DataError;

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
      var payload = base64url(JSON.stringify(token.payload)

      // compact serialization
      );if (token.serialization === 'compact') {
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
/* 37 */
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
  static encode (data) {
     let pairs = []

     Object.keys(data).forEach(function (key) {
       pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
     })

     return pairs.join('&')
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
  static decode (data) {
    let obj = {}

    data.split('&').forEach(function (property) {
      let pair = property.split('=')
      let key = decodeURIComponent(pair[0])
      let val = decodeURIComponent(pair[1])

      obj[key] = val
    })

    return obj
  }
}

/**
 * Export
 */
module.exports = FormUrlEncoded


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */

/**
 * FormUrlEncoded
 */
var FormUrlEncoded = function () {
  function FormUrlEncoded() {
    _classCallCheck(this, FormUrlEncoded);
  }

  _createClass(FormUrlEncoded, null, [{
    key: 'encode',


    /**
     * Encode
     *
     * @description
     * Represent an object as x-www-form-urlencoded string.
     *
     * @param {Object} data
     * @returns {string}
     */
    value: function encode(data) {
      var pairs = [];

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

  }, {
    key: 'decode',
    value: function decode(data) {
      var obj = {};

      data.split('&').forEach(function (property) {
        var pair = property.split('=');
        var key = decodeURIComponent(pair[0]);
        var val = decodeURIComponent(pair[1]);

        obj[key] = val;
      });

      return obj;
    }
  }]);

  return FormUrlEncoded;
}();

/**
 * Export
 */


module.exports = FormUrlEncoded;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalJsonStore = function () {
  function LocalJsonStore(namespace) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, LocalJsonStore);

    this.namespace = namespace;
    this.className = options.className;
    this.store = options.store || global.localStorage;
  }

  _createClass(LocalJsonStore, [{
    key: 'get',
    value: function get(key) {
      var _this = this;

      key = key ? this.namespace + '.' + key : this.namespace;

      var contents = this.store.getItem(key);

      try {
        contents = JSON.parse(contents);
      } catch (err) {
        return Promise.resolve(null);
      }

      return Promise.resolve().then(function () {
        if (!_this.className) {
          return contents; // resolve with raw JSON
        }

        if (contents) {
          return _this.className.from(contents || {}); // resolve with instance
        } else {
          return null;
        }
      });
    }
  }, {
    key: 'save',
    value: function save(key, value) {
      if (!value) {
        value = key;
        key = this.namespace;
      } else {
        key = key ? this.namespace + '.' + key : this.namespace;
      }

      var contents = JSON.stringify(value);

      this.store.setItem(key, contents);

      return Promise.resolve(value); // async only to match get()
    }
  }, {
    key: 'clear',
    value: function clear() {
      // TODO: Clear only items starting with this.namespace
      this.store.clear();
    }
  }]);

  return LocalJsonStore;
}();

module.exports = LocalJsonStore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    URL = _require.URL;

// URI parameter types


var HASH = 'hash';
var QUERY = 'query';

module.exports = {
  clearAuthResponseFromUrl: clearAuthResponseFromUrl,
  currentLocation: currentLocation,
  currentLocationNoAuth: currentLocationNoAuth,
  currentUriHasAuthResponse: currentUriHasAuthResponse,
  stateFromUri: stateFromUri,
  redirectTo: redirectTo,
  replaceCurrentUrl: replaceCurrentUrl,
  HASH: HASH,
  QUERY: QUERY

  /**
   * Removes authentication response data (access token, id token etc) from
   * the current url's hash fragment.
   */
};function clearAuthResponseFromUrl() {
  var clearedUrl = currentLocationNoAuth();

  replaceCurrentUrl(clearedUrl);
}

/**
 * Returns the current url with the authentication response hash fragments
 * (containing access token, id token, state, etc) removed
 *
 * @returns {string}
 */
function currentLocationNoAuth() {
  var currentUrl = new URL(currentLocation());

  if (!currentUrl.hash) {
    return currentUrl.toString();
  } // nothing needs to be done

  var hashFragments = currentUrl.hash.slice(1); // drop leading #

  hashFragments = hashFragments.split('&');

  var authParams = ['id_token', 'access_token', 'state', 'token_type', 'expires_in'];

  hashFragments = hashFragments.filter(function (f) {
    var fragmentKey = f.split('=')[0];
    return !authParams.includes(fragmentKey);
  });

  currentUrl.hash = hashFragments.join('&');

  return currentUrl.toString();
}

/**
 * Returns the current window's URI
 *
 * @returns {string|null}
 */
function currentLocation() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window || !window.location) {
    return null;
  }

  return window.location.href;
}

/**
 * Tests whether the current URI is the result of an AuthenticationRequest
 * return redirect.
 *
 * @returns {boolean}
 */
function currentUriHasAuthResponse() {
  var currentUri = currentLocation();
  var stateParam = stateFromUri(currentUri, HASH);

  return !!stateParam;
}

/**
 * Extracts and returns the `state` query or hash fragment param from a uri
 *
 * @param uri {string}
 * @param uriType {string} 'hash' or 'query'
 *
 * @returns {string|null} Value of the `state` query or hash fragment param
 */
function stateFromUri(uri) {
  var uriType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HASH;

  if (!uri) {
    return null;
  }

  var uriObj = new URL(uri);
  var state = void 0;

  if (uriType === HASH) {
    var hash = uriObj.hash || '#';
    var params = new URLSearchParams(hash.substr(1));
    state = params.get('state');
  }

  if (uriType === QUERY) {
    state = uriObj.searchParams.get('state');
  }

  return state;
}

/**
 * Replaces the current document's URL (used to clear the credentials in
 * the hash fragment after a redirect from the provider).
 *
 * @param newUrl {string|null}
 */
function replaceCurrentUrl(newUrl) {
  if (typeof window === 'undefined') {
    return null;
  }

  var history = window.history;

  if (!history) {
    return null;
  }

  history.replaceState(history.state, history.title, newUrl);
}

/**
 * Redirects the current window to the given uri.
 *
 * Note: the `return false` is due to odd Chrome requirement/quirk
 *
 * @param uri {string}
 */
function redirectTo(uri) {
  if (typeof window === 'undefined') {
    return null;
  }

  window.location.href = uri;

  return false;
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Config = __webpack_require__(7)

module.exports = {
  domToString,
  dumpNode,
  getDoctype,
  getDocument
}

function domToString (node, options = {}) {
  var selfClosing = []

  if (options.selfClosing) {
    options.selfClosing.split(' ').forEach(function (n) {
      selfClosing[n] = true
    })
  }

  var skipAttributes = []

  if (options.skipAttributes) {
    options.skipAttributes.split(' ').forEach(function (n) {
      skipAttributes[n] = true
    })
  }

  var noEsc = [ false ]

  return dumpNode(node, options, skipAttributes, selfClosing, noEsc)
}

function dumpNode (node, options, skipAttributes, selfClosing, noEsc) {
  var out = ''

  if (typeof node.nodeType === 'undefined') return out

  if (node.nodeType === 1) {
    if (node.hasAttribute('class') && 'classWithChildText' in options &&
        node.matches(options.classWithChildText.class)) {
      out += node.querySelector(options.classWithChildText.element).textContent
    } else if (!(options.skipNodeWithClass && node.matches('.' + options.skipNodeWithClass))) {
      var ename = node.nodeName.toLowerCase()
      out += '<' + ename

      var attrList = []

      for (let i = node.attributes.length - 1; i >= 0; i--) {
        var atn = node.attributes[i]

        if (skipAttributes[atn.name]) continue

        if (/^\d+$/.test(atn.name)) continue

        if (atn.name === 'class' && 'replaceClassItemWith' in options) {
          atn.value.split(' ').forEach(function (aValue) {
            if (options.replaceClassItemWith.source.split(' ').indexOf(aValue) > -1) {
              var re = new RegExp(aValue, 'g')
              atn.value = atn.value.replace(re, options.replaceClassItemWith.target).trim()
            }
          })
        }

        if (!(atn.name === 'class' && 'skipClassWithValue' in options &&
            options.skipClassWithValue === atn.value)) {
          attrList.push(
            atn.name + '="' +
            atn.value
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;') +
            '"')
        }
      }

      if (attrList.length > 0) {
        if ('sortAttributes' in options && options.sortAttributes) {
          attrList.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase())
          })
        }
        out += ' ' + attrList.join(' ')
      }

      if (selfClosing[ename]) {
        out += ' />'
      } else {
        out += '>'
        out += (ename === 'html') ? '\n  ' : ''
        noEsc.push(ename === 'style' || ename === 'script')
        for (var i = 0; i < node.childNodes.length; i++) {
          out += dumpNode(node.childNodes[i], options, skipAttributes, selfClosing, noEsc)
        }
        noEsc.pop()
        out += (ename === 'body') ? '</' + ename + '>' + '\n' : '</' + ename + '>'
      }
    }
  } else if (node.nodeType === 8) {
    // FIXME: If comments are not tabbed in source, a new line is not prepended
    out += '<!--' + node.nodeValue + '-->'
  } else if (node.nodeType === 3 || node.nodeType === 4) {
    // XXX: Remove new lines which were added after DOM ready
    let nl = node.nodeValue.replace(/\n+$/, '')
    out += noEsc[noEsc.length - 1]
      ? nl
      : nl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  } else {
    console.log('Warning; Cannot handle serialising nodes of type: ' + node.nodeType)
  }

  return out
}

function getDoctype () {
  /* Get DOCTYPE from http://stackoverflow.com/a/10162353 */
  var node = document.doctype
  var doctype = ''

  if (node !== null) {
    doctype = '<!DOCTYPE ' +
      node.name +
      (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
      (!node.publicId && node.systemId ? ' SYSTEM' : '') +
      (node.systemId ? ' "' + node.systemId + '"' : '') +
      '>'
  }
  return doctype
}

function getDocument (cn, options) {
  let node = cn || document.documentElement.cloneNode(true)
  options = options || Config.DOMNormalisation

  let doctype = getDoctype()
  let s = (doctype.length > 0) ? doctype + '\n' : ''
  s += domToString(node, options)
  return s
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(43);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** dokieli
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://dokie.li/
 * https://github.com/linkeddata/dokieli
 */

const fetcher = __webpack_require__(10)
const auth = __webpack_require__(45)
const doc = __webpack_require__(41)
const uri = __webpack_require__(11)
const graph = __webpack_require__(13)
const inbox = __webpack_require__(88)
const util = __webpack_require__(19)

if(typeof DO === 'undefined'){
global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined;
var DO = {
  fetcher,

  C: __webpack_require__(7),

  U: {
    //Tries to authenticate with given URI. If authenticated, returns the 'User' header value.
    authenticateUser: function(url) {
      url = url || window.location.origin + window.location.pathname;
      var reasons = [];
      var response = '';

      return new Promise(function(resolve, reject) {
        var response = new Promise(function(resolve, reject) {
          if (url.slice(0, 5).toLowerCase() == 'https') {
            DO.U.getResourceHeadUser(url).then(
              function(i) {
                resolve(i);
              },
              function(reason) {
                DO.U.authenticateUserFallback(url, reasons).then(
                  function(i) {
                    resolve(i);
                  },
                  function(reason) {
                    reject(reasons);
                  }
                );
              }
            );
          }
          else {
            if(url.slice(0, 5).toLowerCase() == 'http:') {
              //TODO: First try document's proxy?
              DO.U.authenticateUserFallback(url, reasons).then(
                function(i) {
                  resolve(i);
                },
                function(reason) {
                  reject(reasons);
                }
              );
            }
          }
        });

        response.then(
          function(userIRI) {
            if (userIRI == url) {
              return resolve(userIRI);
            }
            else {
              console.log("--- WebID input (" + url +") did not match the one in the certificate (" + userIRI +").");
              var reason = {"message": "WebID input did not match the one in the certificate."};
              reasons.push(reason);
              return reject(reasons);
            }
          },
          function(reason) {
            return reject(reasons);
          }
        );
      });
    },

    authenticateUserFallback: function(url, reasons) {
// console.log("Try to authenticating through WebID's storage, if not found, try through a known authentication endpoint");
      url = url || window.location.origin + window.location.pathname;
      var pIRI = uri.getProxyableIRI(url);

      return graph.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
// console.log(s.storage);
            if (s.storage && s.storage._array.length > 0) {
// console.log("Try through WebID's storage: " + s.storage.at(0));
              return DO.U.getResourceHeadUser(s.storage.at(0));
            }
            else {
              console.log("---1 WebID's storage NOT FOUND");
              var reason = {"message": "WebID's storage was not found"};
              reasons.push(reason);
              return Promise.reject(reason);
            }
          },
          function(reason) {
            //XXX: Is this even hit?
            console.log("---2 WebID's storage NOT FOUND");
            reason["message"] = "WebID's storage was not found";
            reasons.push(reason);
            return Promise.reject(reason);
          }
        )
        .then(
          function(i) {
            return i;
          },
          function(reason) {
// console.log('Try through known authentication endpoint');
            DO.U.getResourceHeadUser(DO.C.AuthEndpoint).then(
              function(i) {
                return i;
              },
              function(reason) {
                console.log("--- Known authentication endpoint didn't work");
                reason["message"] = "Known authentication endpoint didn't work";
                reasons.push(reason);
                return Promise.reject(reasons);
              }
            );
          }
        );
    },

    getResourceHeadUser: function(url, options) {
      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200) {
              var user = this.getResponseHeader('User');
              if (user && user.length > 0 && user.slice(0, 4) == 'http') {
// console.log('User: ' + user);
                return resolve(user);
              }
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send();
      });
    },

    getResourceLabel: function(s) {
      return s.dctermstitle || s['http://purl.org/dc/elements/1.1/title'] || auth.getAgentName(s) || undefined;
    },

    setUserWorkspaces: function(userPreferenceFile){
      //XXX: Probably https so don't bother with proxy?
      graph.getGraph(userPreferenceFile).then(
        function(pf) {
          DO.C.User.PreferencesFileGraph = pf;
          var s = pf.child(DO.C.User.IRI);

          if (s.masterWorkspace) {
            DO.C.User.masterWorkspace = s.masterWorkspace;
          }

          if (s.workspace) {
            DO.C.User.Workspace = { List: s.workspace };
            s.workspace.forEach(function(wsGraph) {
              var workspace = wsGraph;
              var wstype = pf.child(workspace).rdftype || [];
              wstype.forEach(function(wGraph) {
                var w = wGraph;
                switch(w) {
                  case 'http://www.w3.org/ns/pim/space#PreferencesWorkspace':
                    DO.C.User.Workspace.Preferences = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#MasterWorkspace':
                    DO.C.User.Workspace.Master = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#PublicWorkspace':
                    DO.C.User.Workspace.Public = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#PrivateWorkspace':
                    DO.C.User.Workspace.Private = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#SharedWorkspace':
                    DO.C.User.Workspace.Shared = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#ApplicationWorkspace':
                    DO.C.User.Workspace.Application = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#Workspace':
                    DO.C.User.Workspace.Work = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#FamilyWorkspace':
                    DO.C.User.Workspace.Family = workspace;
                    break;
                }
              });
            });
          }
        }
      );
    },

    setLocalDocument: function() {
      if (document.location.protocol == 'file:') {
        DO.C.LocalDocument = true;
      }
    },

    getNotifications: function(url) {
      url = url || window.location.origin + window.location.pathname;
      var notifications = [];
      var pIRI = uri.getProxyableIRI(url);

      return graph.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
            s.ldpcontains.forEach(function(resource) {
// console.log(resource);
              var types = s.child(resource).rdftype;
// console.log(types);
              if(types.indexOf(DO.C.Vocab.ldpcontainer["@id"]) < 0) {
                notifications.push(resource);
              }
            });
// console.log(notifications);
            if (notifications.length > 0) {
              return notifications;
            }
            else {
              var reason = {"message": "There are no notifications."};
              return Promise.reject(reason);
            }
          },
          function(reason) {
            console.log(reason);
            return reason;
          }
        );
    },

    showInboxNotifications: function() {
      if (typeof SimpleRDF !== 'undefined') {
        inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id']).then(
          function(i) {
            i.forEach(function(inbox) {
              DO.U.showNotificationSources(inbox);
            });
          },
          function(reason) {
            console.log(reason);
          }
        );
      }
    },

    showNotificationSources: function(url) {
      DO.U.getNotifications(url).then(
        function(i) {
          i.forEach(function(notification) {
            var pIRI = uri.getProxyableIRI(notification);
            graph.getGraph(pIRI).then(
              function(g) {
// console.log(g);
                var subjects = [];
                g.graph().toArray().forEach(function(t){
                  subjects.push(t.subject.nominalValue);
                });
                subjects = util.uniqueArray(subjects);
// console.log(subjects);
                subjects.forEach(function(i){
                  var s = g.child(i)
                  var types = s.rdftype._array || [];

                  var currentPathURL = window.location.origin + window.location.pathname;

                  if (types.length > 0) {
                    var resourceTypes = types;
                    if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Like') > -1 ||
                       resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Dislike') > -1){
                      if(s.asobject && s.asobject.at(0)) {
                        if(s.ascontext && s.ascontext.at(0)){
                          if(DO.U.getPathURL(s.asobject.at(0)) == currentPathURL) {
                            var context = s.ascontext.at(0);
                            return DO.U.positionInteraction(context).then(
                              function(notificationIRI){
                                return notificationIRI;
                              },
                              function(reason){
                                console.log('Notification source is unreachable');
                              });
                          }
                        }
                        else {
                          var iri = s.iri().toString();
                          var targetIRI = s.asobject.at(0);
                          var motivatedBy = 'oa:assessing';
                          var id = String(Math.abs(DO.U.hashCode(iri)));
                          var refId = 'r-' + id;
                          var refLabel = id;

                          var bodyText = (resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Like') > -1) ? 'Liked' : 'Disliked';

                          var noteData = {
                            "type": 'article',
                            "mode": "read",
                            "motivatedByIRI": motivatedBy,
                            "id": id,
                            "refId": refId,
                            "refLabel": refLabel,
                            "iri": iri,
                            "creator": {},
                            "target": {
                              "iri": targetIRI
                            },
                            "body": bodyText,
                            "license": {}
                          };

                          if (s.asactor && s.asactor){
                            noteData['creator'] = {
                              'iri': s.asactor
                            }
                            var a = g.child(noteData['creator']['iri']);
                            var actorName = auth.getAgentName(a);
                            var actorImage = auth.getAgentImage(a);

                            if(typeof actorName != 'undefined') {
                              noteData['creator']['name'] = actorName;
                            }
                            if(typeof actorImage != 'undefined') {
                              noteData['creator']['image'] = actorImage;
                            }
                          }
                          else if(type == 'https://www.w3.org/ns/activitystreams#Dislike'){
                            noteData['creator'] = {
                              'name': 'Anonymous Coward'
                            }
                          }
                          if (s.asupdated){
                            noteData['datetime'] = s.asupdated;
                          }
                          if (s.schemalicense){
                            noteData.license["iri"] = s.schemalicense;
                            noteData.license["name"] = DO.C.License[noteData.license["iri"]].name;
                          }

                          DO.U.addInteraction(noteData);
                        }
                      }
                    }
                    else if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Relationship') > -1){
                      if(s.assubject && s.assubject.at(0) && s.asrelationship && s.asrelationship.at(0) && s.asobject && s.asobject.at(0) && DO.U.getPathURL(s.asobject.at(0)) == currentPathURL) {
                        var subject = s.assubject.at(0);
                        return DO.U.positionInteraction(subject).then(
                          function(notificationIRI){
                            return notificationIRI;
                          },
                          function(reason){
                            console.log('Notification source is unreachable');
                          });
                      }
                    }
                    else if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Announce') > -1) {
                      if(s.asobject && s.asobject.at(0) && s.astarget && s.astarget.at(0) && DO.U.getPathURL(s.astarget.at(0)) == currentPathURL) {
                        var object = s.asobject.at(0);

                        return DO.U.positionInteraction(object).then(
                          function(notificationIRI){
                            return notificationIRI;
                          },
                          function(reason){
                            console.log('Notification ' + notification + ' is unreachable');
                          });
                      }
                    }
                    else {
                      // console.log(i + ' has unrecognised types: ' + resourceTypes);
                      // return Promise.reject({'message': 'Unrecognised types ' + resourceTypes});
                    }
                  }
                  else {
                    // console.log('Skipping ' + i + ': No type.');
                    // return Promise.reject({'message': 'Notification has no type. What to do?'});
                  }
                });
              },
              function(reason) {
                console.log('Notification ' + notification + ' is unreachable. ' + reason);
                return reason;
              }
            );
          });
        },
        function(reason) {
          console.log('No notifications');
          return reason;
        }
      );
    },

    //Borrowed the d3 parts from https://bl.ocks.org/mbostock/4600693
    showVisualisationGraph: function(url, data, selector, options) {
      url = url || window.location.origin + window.location.pathname;
      data = data || doc.getDocument();
      selector = selector || 'body';
      options = options || {};
      options['contentType'] = options.contentType || 'text/html';
      options['subjectURI'] = options.subjectURI || url;
      options['license'] = options.license || 'https://creativecommons.org/licenses/by/4.0/';
      var width = options.width || '100%';
      var height = options.height || '100%';

      var id = DO.U.generateAttributeId();


      function positionLink(d) {
        return "M" + d[0].x + "," + d[0].y
             + "S" + d[1].x + "," + d[1].y
             + " " + d[2].x + "," + d[2].y;
      }

      function positionNode(d) {
        return "translate(" + d.x + "," + d.y + ")";
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x, d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x, d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null, d.fy = null;
      }

      var svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', id)
        .attr('class', 'graph')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('version', '1.1')
        .attr('xml:lang', 'en')
        .attr('prefix', 'rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# xsd: http://www.w3.org/2001/XMLSchema# schema: http://schema.org/');

      var s = document.getElementById(id);
      width = options.width || parseInt(s.ownerDocument.defaultView.getComputedStyle(s, null)["width"]);
      height = options.height || parseInt(s.ownerDocument.defaultView.getComputedStyle(s, null)["height"]);

      svg.append('metadata')
        .append('tspan')
          .attr('rel', 'schema:creator')
          .attr('resource', 'https://dokie.li/');

      if('license' in options) {
        svg.select('metadata')
          .append('tspan')
            .attr('rel', 'schema:license')
            .attr('resource', options.license);
      }

      if('title' in options) {
        svg.append('title')
          .attr('property', 'schema:name')
          .text(options.title);
      }

      svg.append('style').text('.node { stroke: #fff; stroke-width: 1px; } .link { fill: none; stroke: #bbb; }');

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().distance(10).strength(0.5))
          .force("charge", d3.forceManyBody())
          // .force("center", d3.forceCenter());
          .force("center", d3.forceCenter(width / 2, height / 2));

      DO.U.getVisualisationGraphData(url, data, options).then(
        function(graph){
// console.log(graph);
          var nodes = graph.nodes,
              nodeById = d3.map(nodes, function(d) { return d.id; }),
              links = graph.links,
              bilinks = [];

          links.forEach(function(link) {
            var s = link.source = nodeById.get(link.source),
                t = link.target = nodeById.get(link.target),
                i = {}; // intermediate node
            nodes.push(i);
            links.push({source: s, target: i}, {source: i, target: t});
            bilinks.push([s, i, t]);
          });

          var link = svg.selectAll(".link")
            .data(bilinks)
            .enter().append("path")
              .attr("class", "link");

          var node = svg.selectAll(".node")
            .data(nodes.filter(function(d) { return d.id; }))
            .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .attr("fill", function(d) { return color(d.group); })
              .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

          node.append("title")
              .text(function(d) { return d.id; });

          simulation
              .nodes(nodes)
              .on("tick", ticked);

          simulation.force("link")
              .links(links);

          function ticked() {
            link.attr("d", positionLink);
            node.attr("transform", positionNode);
          }
        });
    },

    getVisualisationGraphData: function(url, data, options) {
      return new Promise(function(resolve, reject) {
        graph.getGraphFromData(data, options).then(
          function(g){
// console.log(g);
            var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], g, ld.store).child(url);
            var graph = {"nodes":[], "links": []};
            var graphNodes = [];

            g.graph().toArray().forEach(function(t){
              var group = 1;
              switch(t.predicate.nominalValue){
                default:
                  group = 1;
                  break;
                // case DO.C.Vocab['rdftype']['@id']:
                //   group = 2;
                //   break;
              }

              if(graphNodes.indexOf(t.subject.nominalValue + ' ' + group) == -1) {
                graphNodes.push(t.subject.nominalValue + ' ' + group);
                graph.nodes.push({"id": t.subject.nominalValue, "group": group});
              }
              if(graphNodes.indexOf(t.object.nominalValue + ' ' + group) == -1) {
                graphNodes.push(t.object.nominalValue + ' ' + group);
                graph.nodes.push({"id": t.object.nominalValue, "group": group});
              }

              graph.links.push({"source": t.subject.nominalValue, "target": t.object.nominalValue, "value": t.predicate.nominalValue});
            });

            delete graphNodes;
            return resolve(graph);
          }
        );
      });
    },

    showInboxGraph: function(url, selector, options){
      var uri = url || location.href.split(location.search||location.hash||/[?#]/)[0];
      options = options || {};
      options['contentType'] = options.contentType || 'text/html';
      options['subjectURI'] = options.subjectURI || uri;

      inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id'], uri).then(
        function(i) {
          i.forEach(function(inbox) {
            DO.U.getNotifications(inbox).then(
              function(i) {
                var promises = [];

                i.forEach(function(notification) {
                  var pIRI = uri.getProxyableIRI(notification);
                  promises.push(graph.getGraph(pIRI));
                });

                var dataGraph = SimpleRDF();

                Promise.all(promises)
                  .then(function(graphs) {
                    graphs.forEach(function(g){
                      dataGraph.graph().addAll(g.graph());
                    });

                    graph.serializeGraph(dataGraph, { 'contentType': 'text/turtle' })
                      .then(function(data){
                        //FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
                        data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '');

                        //XXX: Workaround for rdf-parser-rdfa bug that gives '@langauge' instead of @type when encountering datatype in HTML+RDFa . TODO: Link to bug here
                        data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;');

                        return data;
                      })
                      .then(function(data){
                        options['contentType'] = 'text/turtle';
                        options['subjectURI'] = inbox;

                        DO.U.showVisualisationGraph(inbox, data, selector, options);
                      });
                  });
              });
          });
        },
        function(reason) {
          console.log(reason);
        }
      );
    },

    urlParam: function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results===null){
         return null;
      }
      else{
         return results[1] || 0;
      }
    },

    setDocumentMode: function(mode) {
      if (DO.C.EditorAvailable) {
        if (DO.U.urlParam('author') == 'true' || DO.U.urlParam('social') == 'true' || DO.U.urlParam('review') == 'true') {
          if (DO.U.urlParam('social') == 'true') {
            mode = 'social';
          }
          else if (DO.U.urlParam('author') == 'true') {
            mode = 'author';
          }
          else if (DO.U.urlParam('review') == 'true') {
            mode = 'review';
          }
          var url = document.location.href;
          window.history.replaceState({}, null, url.substr(0, url.lastIndexOf('?')));
        }

        switch(mode || '') {
          case 'social': default:
            DO.U.Editor.enableEditor('social');
            break;
          case 'author':
            DO.U.Editor.enableEditor('author');
            break;
          case 'review':
            DO.U.Editor.enableEditor('review');
            break;
        }
      }
    },

    initDocumentActions: function() {
      document.addEventListener('click', function(e) {
        if (e.target.closest('[about="#document-menu"][typeof="schema:ActivateAction"], [href="#document-menu"][typeof="schema:ActivateAction"], [resource="#document-menu"][typeof="schema:ActivateAction"]')) {
          e.preventDefault();
          e.stopPropagation();

          if (document.body.classList.contains('on-document-menu')) {
            DO.U.hideDocumentMenu(e);
          }
          else {
            DO.U.showDocumentMenu(e);
          }
        }
      });

      var annotationRights = document.querySelectorAll('[about="#annotation-rights"][typeof="schema:ChooseAction"], [href="#annotation-rights"][typeof="schema:ChooseAction"], [resource="#annotation-rights"][typeof="schema:ChooseAction"]');
      for (var i = 0; i < annotationRights.length; i++){
        annotationRights[i].parentNode.replaceChild(DO.U.fragmentFromString('<select>' + DO.U.getLicenseOptionsHTML() + '</select>'), annotationRights[i]);
      }
    },

    showDocumentInfo: function() {
      document.body.insertAdjacentHTML('beforeend', '<menu id="document-menu" class="do"><button class="show" title="Open Menu"><i class="fa fa-bars"></i></button><header></header><div></div><footer><dl><dt>About</dt><dd id="about-dokieli"><img alt="" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAn1BMVEUAAAAAjwAAkAAAjwAAjwAAjwAAjwAAjwAAkAAAdwAAjwAAjQAAcAAAjwAAjwAAiQAAjwAAjAAAjwAAjwAAjwAAjwAAkAAAjwAAjwAAjwAAjQAAjQAAhQAAhQAAkAAAkAAAkAAAjgAAjwAAiQAAhAAAkAAAjwAAjwAAkAAAjwAAjgAAjgAAjQAAjwAAjQAAjwAAkAAAjwAAjQAAiwAAkABp3EJyAAAANHRSTlMA+fH89enaabMF4iADxJ4SiSa+uXztyoNvQDcsDgvl3pRiXBcH1M+ppJlWUUpFMq6OdjwbMc1+ZgAABAhJREFUeNrt29nSmkAQBeAGZBMUxH3f993/vP+zJZVKVZKCRhibyc3/XVt6SimYPjPSt28Vmt5W/fu2T/9B9HIf7Tp+0RsgDC6DY6OLvzxJj8341DnsakgZUNUmo2XsORYYS6rOeugukhnyragiq56JIs5UEQ/FXKgidRTzompEKOhG1biioDFV44mCAqrGAQWtqRptA8VMqCpR6zpo9iy84VO1opWHPBZVb9QAzyQN/D1YNungJ+DMSYsbOFvSIwGjR3p0wGiQHkMw2qRHC4w76RGBcSA9NmAcSY8QjAdpYiFbTJoYyNYnTWrI1iFNusj2JE1sZBuQJtyE5pImc3Y21cRhZ1NNtsh2Ik127HCsSY8djjVpINuVhPnjVefobee2adXqu2S/6FyivABDEjQ9Lxo1pDlNd5wg24ikRK5ngKGhHhg1DSgZk4RrD6pa9LlRAnUBfWp6xCe+6EOvOT6yrmrigZaCZHPAp6b0gaiBFKvRd0/D1rr1OrvxDqiyoZmmPt9onib0t/VybyEXqdu0Cw16rUNVAfZFlzdjr5KOaoAUK6JsrgWGQapuBlIS4gy70gEmTrk1fuAgU40UxWXv6wvZAC2Dqfx0BfBK1z1H0aJ0WH7Ub4oG8JDlpBCgK1l5tSjHQSoAf0HVfMqxF+yqpzVk2ZGuAGdk8ijPHZlmpOCg0vh5cgE2JtN3qQSoU3lXpbKlLRegrzTpt+U2TNpKY2YiFiA0kS1Q6QccweZ/oinASm2B3RML0AGDNAU4qq3udmIXYVttD3YrFsBR24N1xG5EJpTeaiYWwILS5WRKBfChFsCSehpOwKi/yS0V4AsMWym3TWUFgMqIsRYL8AVOSDlaYgEitbZnDKll+UatchyJBSC1c3lDuQA2VHYAL3KneHpgLCjHSS7AHYyEciwh1g88wDB94rlyAVxwhsR7ygW4gRMTry8XwDdUDkXFgjVdD5wRsRaCAWJwPGI1Baval8Ie3Hqn8AjjhHbZr2DzrInumDTBGlCG8xy8QPY3MNLX4TiRP1q+BWs2pn9ECwu5+qTABc+80h++28UbTkjlTW3wrM6Ufrtu8d5J9Svg1Vch/RTcUYQdUHm+g1z1x2gSGyjGGVN5F7xjoTCjE0ndC3jJMzfCftmiciZ1lNGe3vCGufOWVMLIQHHehi3X1O8JJxR236SalUzninbu937BlwfV/I3k4KdGk2xm+MHuLa8Z0i9TC280qLRrF+8cw9RSjrOg8oIG8j2YgULsbGPomsgR0x9nsOzkOLh+kZr1owZGbfC2JJl78fIV0Wei/gxZDl85XWVtt++cxhuSEQ6bdfzLjlvM86PbaD4vQUjSglV8385My7CdXtO9+ZSyrLcf7nBN376V8gMpRztyq6RXYQAAAABJRU5ErkJggg==" width="16" /><a href="https://dokie.li/" target="_blank">dokieli</a> is an <i class="fa fa-github"></i> <a href="https://github.com/linkeddata/dokieli" target="_blank">open source</a> project. There is <i class="fa fa-flask"></i> <a href="https://dokie.li/docs" target="_blank">documentation</a> and public <i class="fa fa-comments-o"></i> <a href="https://gitter.im/linkeddata/dokieli" target="_blank">chat</a> available. Made with fun.</dd></dl></footer></menu>');
      document.querySelector('#document-menu').addEventListener('click', function(e) {
        var button = e.target.closest('button');
        if(button){
          if (button.classList.contains('show')) {
            DO.U.showDocumentMenu(e);
          }
          else if (button.classList.contains('hide')) {
            DO.U.hideDocumentMenu(e);
          }
        }
      });
    },

    showDocumentMenu: function showDocumentMenu (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      var body = document.body;
      var dMenu = document.querySelector('#document-menu.do');

      if(dMenu) {
        var dMenuButton = dMenu.querySelector('button');
        var dHead = dMenu.querySelector('header');
        var dInfo = dMenu.querySelector('div');

        dMenuButton.classList.remove('show');
        dMenuButton.classList.add('hide');
        dMenuButton.setAttribute('title', 'Hide Menu');
        dMenuButton.innerHTML = '<i class="fa fa-minus"></i>';
        dMenu.classList.add('on');
        body.classList.add('on-document-menu');

        auth.showUserSigninSignup(dHead);
        DO.U.showDocumentDo(dInfo);
        DO.U.showEmbedData(dInfo);
        DO.U.showStorage(dInfo);
        DO.U.showViews(dInfo);
        DO.U.showDocumentMetadata(dInfo);
        if(!body.classList.contains('on-slideshow')) {
          DO.U.showToC();
        }

        document.addEventListener('click', DO.U.eventLeaveDocumentMenu);
      }
      else {
        DO.U.showDocumentInfo();
        DO.U.showDocumentMenu();
      }
    },

    hideDocumentMenu: function(e) {
      document.removeEventListener('click', DO.U.eventLeaveDocumentMenu);

      var body = document.body;
      var dMenu = document.querySelector('#document-menu.do');
      var dMenuButton = dMenu.querySelector('button');

      dMenu.classList.remove('on');
      var sections = dMenu.querySelectorAll('section');
      for (var i = 0; i < sections.length; i++) {
        if(sections[i].id != 'user-info' && !sections[i].querySelector('button.signin-user')) {
          sections[i].parentNode.removeChild(sections[i]);
        }
      };
      var buttonSigninUser = dMenu.querySelector('button.signin-user');
      if(buttonSigninUser) {
        dMenu.querySelector('button.signin-user').disabled = false;
      }
      body.classList.remove('on-document-menu');
      dMenuButton.classList.remove('hide');
      dMenuButton.classList.add('show');
      dMenuButton.setAttribute('title', 'Open Menu');
      dMenuButton.innerHTML = '<i class="fa fa-bars"></i>';

      var removeElementsList = ['toc', 'embed-data-entry', 'create-new-document', 'open-document', 'source-view', 'save-as-document', 'user-identity-input', 'resource-browser', 'share-resource', 'reply-to-resource', 'snapshot-document', 'graph-view'];
      removeElementsList.forEach(function(id) {
        var element = document.getElementById(id);
        if(element) {
          element.parentNode.removeChild(element);
        }
      });
    },

    setPolyfill: function() {
      if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
      if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
        var el = this;
        while (el) {
          if (el.matches(selector)) {
            return el;
          }
          el = el.parentElement;
        }
      };
    },

    showXHRProgressHTML: function(http, options) {
      if ('progress' in options) {
        http.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            options.progress.value = (e.loaded / e.total) * 100;
            options.progress.textContent = options.progress.value; // Fallback for unsupported browsers.
          }
        };
      }
    },

    setDocRefType: function() {
      var link = document.querySelector('head link[rel="stylesheet"][title]');
      if (link) {
        DO.C.DocRefType = link.getAttribute('title');
      }
      if (Object.keys(DO.C.RefType).indexOf(DO.C.DocRefType) == -1) {
        DO.C.DocRefType = 'LNCS';
      }
    },

    getCurrentLinkStylesheet: function() {
      return document.querySelector('head link[rel="stylesheet"][title]:not([href$="do.css"]):not([disabled])');
    },

    showViews: function(node) {
      if(document.querySelector('#document-views')) { return; }

      var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

      var s = '<section id="document-views" class="do"><h2>Views</h2><i class="fa fa-magic"></i><ul>';
      if (DO.C.GraphViewerAvailable) {
        s += '<li><button class="resource-visualise" title="Change to graph view">Graph</button></li>';
      }
      s += '<li><button title="Change to native device/browser view">Native</button></li>';

      if (stylesheets.length > 0) {
        for (var i = 0; i < stylesheets.length; i++) {
          var stylesheet = stylesheets[i];
          var view = stylesheet.getAttribute('title');
          if(stylesheet.matches('[rel~="alternate"]')) {
            s += '<li><button title="Change to ‘' + view + '’ view">' + view + '</button></li>';
          }
          else {
            s += '<li><button disabled="disabled">' + view + '</button></li>';
          }
        }
      }

      s += '</ul></section>';
      node.insertAdjacentHTML('beforeend', s);

      var viewButtons = document.querySelectorAll('#document-views.do button:not([class~="resource-visualise"])');
      for (var i = 0; i < viewButtons.length; i++) {
        viewButtons[i].removeEventListener('click', DO.U.initCurrentStylesheet);
        viewButtons[i].addEventListener('click', DO.U.initCurrentStylesheet);
      }

      if(DO.C.GraphViewerAvailable) {
        document.querySelector('#document-views.do').addEventListener('click', function(e){
          if (e.target.closest('.resource-visualise')) {
            if(document.querySelector('#graph-view')) { return; }

            if (e) {
              e.target.disabled = true;
            }

            document.body.insertAdjacentHTML('beforeend', '<aside id="graph-view" class="do on"><button class="close" title="Close">❌</button><h2>Graph view</h2></aside>');

            var graphView = document.getElementById('graph-view');
            graphView.addEventListener('click', function(e) {
              if (e.target.matches('button.close')) {
                var rv = document.querySelector('#document-views .resource-visualise');
                if (rv) {
                  rv.disabled = false;
                }
              }
            });

            var optionsNormalisation = DO.C.DOMNormalisation;
            delete optionsNormalisation['skipNodeWithClass'];

            DO.U.showVisualisationGraph(document.location.href, doc.getDocument(null, optionsNormalisation), '#graph-view');
          }
        });
      }
    },

    initCurrentStylesheet: function(e) {
      var currentStylesheet = DO.U.getCurrentLinkStylesheet();
      currentStylesheet = (currentStylesheet) ? currentStylesheet.getAttribute('title') : '';
      var selected = (e && e.target) ? e.target.textContent.toLowerCase() : currentStylesheet.toLowerCase();
      var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

      for (var j = 0; j < stylesheets.length; j++) {
        (function(stylesheet) {
          if (stylesheet.getAttribute('title').toLowerCase() != selected) {
              stylesheet.disabled = true;
              stylesheet.setAttribute('rel', 'stylesheet alternate');
          }
        })(stylesheets[j]);
      };
      for (var j = 0; j < stylesheets.length; j++) {
        (function(stylesheet) {
          if (stylesheet.getAttribute('title').toLowerCase() == selected) {
              stylesheet.setAttribute('rel', 'stylesheet');
              stylesheet.disabled = false;
          }
        })(stylesheets[j]);
      }

      var bd = document.querySelectorAll('#document-views.do button');
      for(var j = 0; j < bd.length; j++) {
        bd[j].disabled = (e && e.target && (e.target.textContent == bd[j].textContent)) ? true : false;
      }

      DO.U.showRefs();

      if (selected == 'shower') {
        var slides = document.querySelectorAll('.slide');
        for(var j = 0; j < slides.length; j++) {
          slides[j].classList.add('do');
        }
        document.body.classList.add('on-slideshow', 'list');
        document.querySelector('head').insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=792, user-scalable=no" />');


        var body = document.body;
        var dMenu = document.querySelector('#document-menu.do');

        if(dMenu) {
          var dMenuButton = dMenu.querySelector('button');
          var dHead = dMenu.querySelector('header');
          var dInfo = dMenu.querySelector('div');

          dMenuButton.classList.remove('show');
          dMenuButton.classList.add('hide');
          dMenuButton.setAttribute('title', 'Open Menu');
          dMenuButton.innerHTML = '<i class="fa fa-minus"></i>';
          dMenu.classList.remove('on');
          body.classList.remove('on-document-menu');

          var dMenuSections = dMenu.querySelectorAll('section');
          for (var j = 0; j < dMenuSections.length; j++) {
            dMenuSections[j].parentNode.removeChild(dMSections[j]);
          }
        }

        var toc = document.getElementById('table-of-contents');
        toc = (toc) ? toc.parentNode.removeChild(toc) : false;

        DO.U.hideStorage();

        shower.initRun();
      }
      if (currentStylesheet.toLowerCase() == 'shower') {
        var slides = document.querySelectorAll('.slide');
        for (var c = 0; c < slides.length; c++){
          slides[c].classList.remove('do');
        }
        document.body.classList.remove('on-slideshow', 'list', 'full');
        document.body.removeAttribute('style');
        var mV = document.querySelector('head meta[name="viewport"][content="width=792, user-scalable=no"]');
        mV = (mV) ? mV.parentNode.removeChild(mV) : false;

        history.pushState(null, null, window.location.pathname);

        shower.removeEvents();
      }
    },

    showEmbedData: function(node) {
      if(document.querySelector('#embed-data-in-html')) { return; }

      node.insertAdjacentHTML('beforeend', '<section id="embed-data-in-html" class="do"><h2>Data</h2><ul><li><button class="embed-data-meta" title="Embed structured data (Turtle, JSON-LD, TriG)"><i class="fa fa-table fa-2x"></i>Embed Data</button></li></ul></section>');

      var eventEmbedData = function(e) {
        e.target.setAttribute('disabled', 'disabled');
        var scriptCurrent = document.querySelectorAll('head script[id^="meta-"]');

        var scriptType = {
          'meta-turtle': {
            scriptStart: '<script id="meta-turtle" title="Turtle" type="text/turtle">',
            cdataStart: '# ' + DO.C.CDATAStart + '\n',
            cdataEnd: '\n# ' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-json-ld': {
            scriptStart: '<script id="meta-json-ld" title="JSON-LD" type="application/ld+json">',
            cdataStart: DO.C.CDATAStart + '\n',
            cdataEnd: '\n' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-trig': {
            scriptStart: '<script id="meta-trig" title="TriG" type="application/trig">',
            cdataStart: '# ' + DO.C.CDATAStart + '\n',
            cdataEnd: '\n# ' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          }
        }

        var scriptCurrentData = {};
        if (scriptCurrent.length > 0) {
          for(var i = 0; i < scriptCurrent.length; i++) {
            var v = scriptCurrent[i];
            var id = v.id;
            scriptCurrentData[id] = v.innerHTML.split(/\r\n|\r|\n/);
            scriptCurrentData[id].shift();
            scriptCurrentData[id].pop();
            scriptCurrentData[id] = {
              'type': v.getAttribute('type') || '',
              'title': v.getAttribute('title') || '',
              'content' : scriptCurrentData[id].join('\n')
            };
          }
        }

        var embedMenu = '<aside id="embed-data-entry" class="do on tabs"><button class="close" title="Close">❌</button>\n\
        <h2>Embed Data</h2>\n\
        <nav><ul><li class="selected"><a href="#embed-data-turtle">Turtle</a></li><li><a href="#embed-data-json-ld">JSON-LD</a></li><li><a href="#embed-data-trig">TriG</a></li></ul></nav>\n\
        <div id="embed-data-turtle" class="selected"><textarea placeholder="Enter data in Turtle" name="meta-turtle" cols="80" rows="24">' + ((scriptCurrentData['meta-turtle']) ? scriptCurrentData['meta-turtle'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-json-ld"><textarea placeholder="Enter data in JSON-LD" name="meta-json-ld" cols="80" rows="24">' + ((scriptCurrentData['meta-json-ld']) ? scriptCurrentData['meta-json-ld'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-trig"><textarea placeholder="Enter data in TriG" name="meta-trig" cols="80" rows="24">' + ((scriptCurrentData['meta-trig']) ? scriptCurrentData['meta-trig'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        </aside>';

        document.body.insertAdjacentHTML('beforeend', embedMenu);
        document.querySelector('#embed-data-turtle textarea').focus();
        var a = document.querySelectorAll('#embed-data-entry nav a');
        for(var i = 0; i < a.length; i++) {
          a[i].addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var li = e.target.parentNode;
            if(!li.classList.contains('selected')) {
              document.querySelector('#embed-data-entry nav li.selected').classList.remove('selected');
              li.classList.add('selected');
              document.querySelector('#embed-data-entry > div.selected').classList.remove('selected');
              var d = document.querySelector('#embed-data-entry > div' + e.target.hash);
              d.classList.add('selected');
              d.querySelector('textarea').focus();
            }
          });
        }

        document.querySelector('#embed-data-entry button.close').addEventListener('click', function(e) {
          document.querySelector('#embed-data-in-html .embed-data-meta').removeAttribute('disabled');
        });

        var buttonSave = document.querySelectorAll('#embed-data-entry button.save');
        for (var i = 0; i < buttonSave.length; i++) {
          buttonSave[i].addEventListener('click', function(e) {
            var textarea = e.target.parentNode.querySelector('textarea');
            var name = textarea.getAttribute('name');
            var scriptEntry = textarea.value;
            var script = document.getElementById(name);

            if (scriptEntry.length > 0) {
              //If there was a script already
              if (script) {
                var scriptContent = scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd;
                script.innerHTML = scriptContent;
              }
              else {
                var scriptContent = '  ' + scriptType[name].scriptStart + scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd + scriptType[name].scriptEnd;
                document.querySelector('head').insertAdjacentHTML('beforeend', scriptContent);
              }
            }
            else {
              //Remove if no longer used
              script.parentNode.removeChild(script);
            }

            var ede = document.getElementById('embed-data-entry');
            ede.parentNode.removeChild(ede);
            document.querySelector('#embed-data-in-html .embed-data-meta').removeAttribute('disabled');
          });
        };
      };

      var edih = document.querySelector('#embed-data-in-html button');
      edih.removeEventListener('click', eventEmbedData);
      edih.addEventListener('click', eventEmbedData);
    },

    showTableOfStuff: function(node) {
      var disabledInput = '', s = '';
      if (!DO.C.EditorEnabled) {
        disabledInput = ' disabled="disabled"';
      }

      var tableList = [{'content': 'Contents'}, {'figure': 'Figures'}, {'table': 'Tables'}, {'abbr': 'Abbreviations'}];
      tableList.forEach(function(i) {
        var key = Object.keys(i)[0];
        var value = i[key];
        var checkedInput = '';
        if(document.getElementById('table-of-'+ key +'s')) {
          checkedInput = ' checked="checked"';
        }

        s+= '<li><input id="t-o-' + key +'" type="checkbox"' + disabledInput + checkedInput + '/><label for="t-o-' + key + '">' + value + '</label></li>';
      });

      node.insertAdjacentHTML('beforeend', '<section id="table-of-stuff" class="do"><h2>Table of Stuff</h2><ul>' + s + '</ul></section>');

      if(DO.C.EditorEnabled) {
        document.getElementById('table-of-stuff').addEventListener('click', function(e){
          if (e.target.matches('input')) {
            var id = e.target.id;
            var listType = id.slice(4, id.length);
            if(!e.target.getAttribute('checked')) {
              DO.U.buildTableOfStuff(listType);
              e.target.setAttribute('checked', 'checked');
            }
            else {
              var tol = document.getElementById('table-of-'+listType+'s');
              if(tol) {
                tol.parentNode.removeChild(tol);
              }
              e.target.removeAttribute('checked');
            }
          }
        });
      }
    },

    htmlEntities: function(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    showDocumentMetadata: function(node) {
      if(document.querySelector('#document-metadata')) { return; }

      var content = document.querySelector('main > article') || document.body;
      var count = DO.U.contentCount(content);
      var authors = [], contributors = [], editors = [];

      var data = doc.getDocument();
      var subjectURI = window.location.origin + window.location.pathname;
      var options = {'contentType': 'text/html', 'subjectURI': subjectURI };

      graph.getGraphFromData(data, options).then(
        function(i){
          var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], i, ld.store).child(options['subjectURI']);

          if(g.schemaeditor._array.length > 0) {
            g.schemaeditor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                editors.push('<li>' + label + '</li>');
              }
            });
            if(editors.length > 0){
              editors = '<tr class="people"><th>Editors</th><td><ul class="editors">' + editors.join('') + '</ul></td></tr>';
            }
          }

          if(g.schemaauthor._array.length > 0) {
            g.schemaauthor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                authors.push('<li>' + label + '</li>');
              }
            });
            if(authors.length > 0){
              authors = '<tr class="people"><th>Authors</th><td><ul class="authors">' + authors.join('') + '</ul></td></tr>';
            }
          }

          if(g.schemacontributor._array.length > 0) {
            g.schemacontributor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                contributors.push('<li>' + label + '</li>');
              }
            });
            if(contributors.length > 0){
              contributors = '<tr class="people"><th>Contributors</th><td><ul class="contributors">' + contributors.join('') + '</ul></td></tr>';
            }
          }

          return authors + contributors;
        }).then(
        function(people){
          var s = '<section id="document-metadata" class="do"><table>\n\
            <caption>Document Metadata</caption>\n\
            <tbody>\n\
              ' + people + '\n\
              <tr><th>Reading time</th><td>' + count.readingTime + ' minutes</td></tr>\n\
              <tr><th>Characters</th><td>' + count.chars + '</td></tr>\n\
              <tr><th>Words</th><td>' + count.words + '</td></tr>\n\
              <tr><th>Lines</th><td>' + count.lines + '</td></tr>\n\
              <tr><th>A4 Pages</th><td>' + count.pages.A4 + '</td></tr>\n\
              <tr><th>US Letter</th><td>' + count.pages.USLetter + '</td></tr>\n\
              <tr><th>Bytes</th><td>' + count.bytes + '</td></tr>\n\
            </tbody>\n\
          </table></section>';

          node.insertAdjacentHTML('beforeend', s);
        });
    },

    contentCount: function contentCount (c) {
      var content = DO.U.fragmentFromString(doc.domToString(c)).textContent.trim();
      var contentCount = { readingTime:1, words:0, chars:0, lines:0, pages:{A4:1, USLetter:1}, bytes:0 };
      if (content.length > 0) {
        var lineHeight = c.ownerDocument.defaultView.getComputedStyle(c, null)["line-height"];
        var linesCount = Math.ceil(c.clientHeight / parseInt(lineHeight));
        contentCount = {
          readingTime: Math.ceil(content.split(' ').length / 200),
          words: content.match(/\S+/g).length,
          chars: content.length,
          lines: linesCount,
          pages: { A4: Math.ceil(linesCount / 47), USLetter: Math.ceil(linesCount / 63) },
          bytes: encodeURI(document.documentElement.outerHTML).split(/%..|./).length - 1
        };
      }
      return contentCount;
    },

    showToC: function() {
      if(document.querySelector('#toc')) { return; }

      var sections = document.querySelectorAll('h1 ~ div > section:not([class~="slide"]):not([id^=table-of])');

      if (sections.length > 0) {
        var s = '';
        var sortable = '';

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          sortable = ' sortable';
        }

        s = '<aside id="toc" class="do on' + sortable + '"><button class="close" title="Close">❌</button></aside>';
        document.body.insertAdjacentHTML('beforeend', s);

        var toc = document.getElementById('toc');

        DO.U.showTableOfStuff(toc);

        s = '<section id="table-of-contents-i" class="do"><h2>Table of Contents</h2><ol class="toc' + sortable + '">';
        s += DO.U.getListOfSections(sections, DO.C.SortableList);
        s += '</ol></section>';
        toc.insertAdjacentHTML('beforeend', s);

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          DO.U.sortToC();
        }
      }
    },

    sortToC: function() {
    },

    getListOfSections: function(sections, sortable) {
      var s = '', attributeClass = '';
      if (sortable == true) { attributeClass = ' class="sortable"'; }

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if(section.id) {
          var heading = section.querySelector('h1, h2, h3, h4, h5, h6, header h1, header h2, header h3, header h4, header h5, header h6') || { 'textContent': section.id };
          if (heading) {
            s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + heading.textContent + '</a>';
            var subsections = section.parentNode.querySelectorAll('[id="' + section.id + '"] > div > section[rel*="hasPart"]:not([class~="slide"]), [id="' + section.id + '"] > section[rel*="hasPart"]:not([class~="slide"])');

            if (subsections.length > 0) {
              s += '<ol'+ attributeClass +'>';
              s += DO.U.getListOfSections(subsections, sortable);
              s += '</ol>';
            }
            s += '</li>';
          }
        }
      }

      return s;
    },

    buildTableOfStuff: function(listType) {
      var s = elementId = elementTitle = titleType = tableHeading = '';
      var tableList = [];

      tableList = (listType) ? [listType] : ['content', 'figure', 'table', 'abbr'];

      tableList.forEach(function(element) {
        var e = document.querySelectorAll('section:not([class~="do"]) ' + element);
        if (element == 'content' || e.length > 0) {
          switch(element) {
            case 'figure':
              titleType = 'figcaption';
              tableHeading = 'Table of Figures';
              break;
            case 'table':
              titleType = 'caption';
              tableHeading = 'Table of Tables';
              break;
            case 'abbr':
              titleType = 'title';
              tableHeading = 'Table of Abbreviations';
              break;
            case 'content': default:
              titleType = '';
              tableHeading = 'Table of Contents';
              break;
          }

          if (element == 'abbr') {
            s += '<section id="table-of-'+ element +'s">';
          }
          else {
            s += '<nav id="table-of-'+ element +'s">';
          }
          s += '<h2>' + tableHeading + '</h2>';
          s += '<div><ol class="toc">';

          if (element == 'content') {
            s += DO.U.getListOfSections(document.querySelectorAll('h1 ~ div > section:not([class~="slide"])'), false);
          }
          else {
            if (element == 'abbr') {
              if (e.length > 0) {
                [].slice.call(e).sort(function(a, b) {
                  var textA = a.textContent;
                  var textB = b.textContent;
                  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
              }

              for (var i = 0; i < e.length; i++) {
                s += '<dt>' + e[i].textContent + '</dt>';
                s += '<dd>' + e[i].getAttribute(titleType) + '</dd>';
              };
            }
            else {
              for (var i = 0; i < e.length; i++) {
                var title = e[i].querySelector(titleType);
                if(title) {
                  if(e[i].id){
                    s += '<li><a href="#' + e[i].id +'">' + title.textContent +'</a></li>';
                  }
                  else {
                    s += '<li>' + title.textContent +'</li>';
                  }
                }
              };
            }
          }

          if (element == 'abbr'){
            s += '</dl></div>';
            s += '</section>';
          } else {
            s += '</ol></div>';
            s += '</nav>';
          }
        }
      });

      //XXX: Tries to find a suitable place to insert.
      var i = document.getElementById('document-status');
      if (i) { i.insertAdjacentHTML('afterend', s); }
      else {
        i = document.getElementById('introduction');
        if (i) { i.insertAdjacentHTML('beforebegin', s); }
        else {
          i = document.getElementById('prologue');
          if (i) { i.insertAdjacentHTML('beforebegin', s); }
          else {
            i = document.getElementById('keywords');
            if (i) { i.insertAdjacentHTML('afterend', s); }
            else {
              i = document.getElementById('categories-and-subject-descriptors');
              if (i) { i.insertAdjacentHTML('afterend', s); }
              else {
                i = document.getElementById('authors');
                if (i) { i.insertAdjacentHTML('afterend', s); }
                else {
                  i = document.querySelector('article').insertAdjacentHTML('afterbegin', s);
                }
              }
            }
          }
        }
      }
    },

    buttonClose: function() {
      document.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          var parent = e.target.parentNode;
          parent.parentNode.removeChild(parent);
        }
      });
    },

    eventEscapeDocumentMenu: function(e) {
      if (e.keyCode == 27) { // Escape
        DO.U.hideDocumentMenu(e);
      }
    },

    eventLeaveDocumentMenu: function(e) {
      if (!e.target.closest('.do.on')) {
        DO.U.hideDocumentMenu(e);
      }
    },

    updateDocumentTitle: function(e) {
      if (!e.target.matches('h1')) {
        var h1 = document.querySelector('h1');
        if (h1) {
          document.title = h1.textContent.trim();
        }
      }
    },

    utf8Tob64: function(s) {
      return window.btoa(encodeURIComponent(s));
    },

    b64Toutf8: function(s) {
      return unescape(decodeURIComponent(window.atob(s)));
    },

    getSelectorSign: function(node) {
      if(!node) {
        return DO.C.SelectorSign["*"];
      }

      if (typeof node === 'object') {
        var nodeName = node.nodeName.toLowerCase();
        var nodeId = '';

        if(node.id) {
          switch(nodeName) {
            default: break;
            case 'section': case 'dl':
              nodeId = '#' + node.id;
              break;
          }
        }

        return DO.C.SelectorSign[nodeName + nodeId] || DO.C.SelectorSign["*"];
      }

      return DO.C.SelectorSign["*"];
    },

    showFragment: function(selector) {
      var ids = (selector) ? document.querySelectorAll(selector) : document.querySelectorAll('main *[id]:not(input):not(textarea):not(select):not(#content)');

      for(var i = 0; i < ids.length; i++){
        ids[i].addEventListener('mouseenter', function(e){
          var fragment = document.querySelector('*[id="' + e.target.id + '"] > .do.fragment');
          if (!fragment && e.target.parentNode.nodeName.toLowerCase() != 'aside'){
            sign = DO.U.getSelectorSign(e.target);

            e.target.insertAdjacentHTML('afterbegin', '<span class="do fragment"><a href="#' + e.target.id + '">' + sign + '</a></span>');
            fragment = document.querySelector('[id="' + e.target.id + '"] > .do.fragment');
            var fragmentClientWidth = fragment.clientWidth;

            var fragmentOffsetLeft = DO.U.getOffset(e.target).left;
            var bodyOffsetLeft = DO.U.getOffset(document.body).left;

            var offsetLeft = 0;
            if ((fragmentOffsetLeft - bodyOffsetLeft) > 200) {
              offsetLeft = e.target.offsetLeft;
            }

            fragment.style.top = Math.ceil(e.target.offsetTop) + 'px';
            fragment.style.left = (offsetLeft - fragmentClientWidth) + 'px';
            fragment.style.height = e.target.clientHeight + 'px';
            fragment.style.width = (fragmentClientWidth - 10) + 'px';
          }
        });

        ids[i].addEventListener('mouseleave', function(e){
          var fragment = document.querySelector('[id="' + e.target.id + '"] > .do.fragment');
          fragment.parentNode.removeChild(fragment);
        });
      }
    },

    getOffset: function(el) {
      var box = el.getBoundingClientRect();

      return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
      }
    },

    forceTrailingSlash: function(aString) {
      if (aString.slice(-1) == "/") return aString;
      return aString + "/";
    },

    getUrlPath: function(aString) {
      return aString.split("/");
    },

    exportAsHTML: function() {
      var data = doc.getDocument();
      //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
      var blob = new Blob([data], {type:'text/html;charset=utf-8'});
      var pattern = /[^\w]+/ig;
      var title = document.querySelector('h1').textContent.toLowerCase().replace(pattern, '-') || "index";
      var timestamp = DO.U.getDateTimeISO().replace(pattern, '') || "now";

      var fileName = title + '.' + timestamp + '.html';

      var a = document.createElement("a");
      a.download = fileName;

      a.href = window.URL.createObjectURL(blob);
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    snapshotAtEndpoint: function snapshotAtEndpoint (e, iri, endpoint, noteData, options = {}) {
      iri = iri || window.location.origin + window.location.pathname;
      endpoint = endpoint || 'https://pragma.archivelab.org';

      if(!('contentType' in options)){
        options['contentType'] = 'application/json';
      }

      noteData = noteData || {
        "url": iri,
        "annotation": {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          "@type": "Annotation",
          "motivation": "linking",
          "target": iri,
          "rights": "https://creativecommons.org/publicdomain/zero/1.0/"
        }
      };

      if (DO.C.User.IRI) {
        noteData.annotation['creator'] = {};
        noteData.annotation.creator["@id"] = DO.C.User.IRI;
      }
      if (DO.C.User.Name) {
        noteData.annotation.creator["http://schema.org/name"] = DO.C.User.Name;
      }
      if (DO.C.User.Image) {
        noteData.annotation.creator["http://schema.org/image"] = DO.C.User.Image;
      }
      if (DO.C.User.URL) {
        noteData.annotation.creator["http://schema.org/url"] = DO.C.User.URL;
      }

      // if(note.length > 0) {
      //   noteData.annotation["message"] = note;
      // }

      if (typeof e !== 'undefined' && e.target.closest('button')) {
        var archiveNode = e.target.closest('button').parentNode;
        archiveNode.insertAdjacentHTML('beforeend', ' <span class="progress"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>');
      }

      options.noCredentials = true

      return fetcher.postResource(endpoint, '', JSON.stringify(noteData), options.contentType, null, options)

        .then(response => response.json())

        .then(response => {
          switch (endpoint) {
            case 'https://pragma.archivelab.org':
            default:
              if (response['wayback_id']) {
                let location = 'https://web.archive.org' + response.wayback_id

                archiveNode
                  .innerHTML = '<i class="fa fa-archive fa-fw"></i> Archived at <a target="_blank" href="' +
                  location + '">' + location + '</a>'
              } else {
                archiveNode
                  .querySelector('.progress')
                  .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to archive. Try later.'
              }

              break
          }
        })

        .catch(() => {
          archiveNode
            .querySelector('.progress')
            .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to archive. Try later.'
        })
    },

    snapshotDocument: function(e) {
      if(typeof e !== 'undefined') {
        e.target.disabled = true;
      }

      var iri = uri.stripFragmentFromString(document.location.href);

      document.body.insertAdjacentHTML('beforeend', '<aside id="snapshot-document" class="do on"><button class="close" title="Close">❌</button><h2>Snapshot Document</h2><p><code>' + iri + '</code> will be snapshot. Note that behaviour differ for each action. See the links for more information.</p><ul><li><button class="export-as-html">Export</button> this article as HTML and save to file.</li><li><a href="http://web.archive.org/" target="_blank">Internet Archive</a>: <button class="snapshot-internet-archive">Capture</button> all crawlable resources referenced in this article.</li></ul></aside>');

      var snapshotDocument = document.getElementById('snapshot-document');
      snapshotDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-snapshot').disabled = false;
        }

        if (e.target.matches('button.export-as-html')) {
          DO.U.exportAsHTML(e);
        }

        if(e.target.matches('button.snapshot-internet-archive')){
          var options = {
            "contentType": 'application/json'
          };
          DO.U.snapshotAtEndpoint(e, iri, 'https://pragma.archivelab.org', '', options);
        }
      });
    },

    showDocumentDo: function showDocumentDo (node) {
      if (document.querySelector('#document-do')) { return; }

      var buttonDisabled = '';
      if (document.location.protocol === 'file:') {
        buttonDisabled = ' disabled="disabled"';
      }

      var s = '<section id="document-do" class="do"><h2>Do</h2><ul>';
      s += '<li><button class="resource-share" title="Share resource"><i class="fa fa-bullhorn fa-2x"></i>Share</button></li>';
      s += '<li><button class="resource-reply" title="Reply"><i class="fa fa-reply fa-2x"></i>Reply</button></li>';

      if (DO.C.EditorAvailable) {
        var reviewArticle = (DO.C.EditorEnabled && DO.C.User.Role == 'review')
          ? DO.C.Editor.DisableReviewButton
          : DO.C.Editor.EnableReviewButton;
        s += '<li>' + reviewArticle + '</li>';
      }

      s += '<li><button class="resource-new" title="Create new article"><i class="fa fa-lightbulb-o fa-2x"></i></i>New</button></li>';
      s += '<li><button class="resource-open" title="Open article"><i class="fa fa-coffee fa-2x"></i></i>Open</button></li>';
      s += '<li><button class="resource-save"' + buttonDisabled +
        ' title="Save article"><i class="fa fa-life-ring fa-2x"></i>Save</button></li>';
      s += '<li><button class="resource-save-as" title="Save as article"><i class="fa fa-paper-plane-o fa-2x"></i>Save As</button></li>';
      s += '<li><button class="resource-snapshot" title="Snapshot article"><i class="fa fa-external-link fa-2x"></i>Snapshot</button></li>';
      s += '<li><button class="resource-print" title="Print article"><i class="fa fa-print fa-2x"></i>Print</button></li>';

      if (DO.C.EditorAvailable) {
        var editFile = (DO.C.EditorEnabled && DO.C.User.Role === 'author')
          ? DO.C.Editor.DisableEditorButton
          : DO.C.Editor.EnableEditorButton;
        s += '<li>' + editFile + '</li>';
      }

      s += '<li><button class="resource-source"' + buttonDisabled +
        ' title="Edit article source code"><i class="fa fa-code fa-2x"></i>Source</button></li>';
      s += '</ul></section>';

      node.insertAdjacentHTML('beforeend', s);

      var dd = document.getElementById('document-do');

      dd.addEventListener('click', e => {
        if (e.target.closest('.resource-share')) {
          DO.U.shareResource(e);
        }

        if (e.target.closest('.resource-reply')) {
          DO.U.replyToResource(e);
        }

        if (DO.C.EditorAvailable) {
          if (e.target.closest('button.editor-disable') ||
            e.target.closest('button.review-disable')) {
            e.target.parentNode.innerHTML = DO.C.Editor.EnableEditorButton;
            DO.U.Editor.enableEditor('social', e);
          }
          else {
            if (e.target.closest('button.editor-enable')) {
              e.target.parentNode.innerHTML = DO.C.Editor.DisableEditorButton;
              DO.U.Editor.enableEditor('author', e);
            }
            else if (e.target.closest('button.review-enable')) {
              e.target.parentNode.innerHTML = DO.C.Editor.DisableEditorButton;
              DO.U.Editor.enableEditor('review', e);
            }
          }
        }

        if (e.target.closest('.resource-new')) {
          DO.U.createNewDocument(e);
        }

        if (e.target.closest('.resource-open')) {
          DO.U.openDocument(e);
        }

        if (e.target.closest('.resource-save')) {
          var url = window.location.origin + window.location.pathname;
          var data = doc.getDocument();

          fetcher.putResource(url, data)
            .then(() => {
              DO.U.showActionMessage(document.getElementById('document-menu'), 'Saved')
              DO.U.hideDocumentMenu(e)
            })
            .catch(error => {
              console.error(error)

              let message

              switch (error.status) {
                case 401:
                  message = 'Need to authenticate before saving'
                  break

                case 403:
                  message = 'You are not authorized to save'
                  break

                case 405:
                default:
                  e.target.disabled = true
                  message = 'Server doesn\'t allow this resource to be rewritten'
                  break
              }

              DO.U.showActionMessage(document.getElementById('document-menu'), message)
            })
        }

        if (e.target.closest('.resource-source')) {
          DO.U.viewSource(e);
        }

        if (e.target.closest('.resource-save-as')) {
          DO.U.saveAsDocument(e);
        }

        if (e.target.closest('.resource-snapshot')) {
          DO.U.snapshotDocument(e);
        }

        if (e.target.closest('.resource-print')) {
          DO.U.hideDocumentMenu(e);
          window.print();
          return false;
        }
      });
    },

    replyToResource: function replyToResource (e, iri) {
      iri = iri || fetcher.currentLocation()
      e.target.disabled = true

      document.body.insertAdjacentHTML('beforeend', '<aside id="reply-to-resource" class="do on"><button class="close" title="Close">❌</button><h2>Reply to this</h2><div id="reply-to-resource-input"><p>Reply to <code>' +
        iri +'</code></p><ul><li><p><label for="reply-to-resource-note">Quick reply (plain text note)</label></p><p><textarea id="reply-to-resource-note" rows="10" cols="40" name="reply-to-resource-note" placeholder="Great article!"></textarea></p></li><li><label for="reply-to-resource-license">License</label> <select id="reply-to-resource-license" name="reply-to-resource-license">' +
        DO.U.getLicenseOptionsHTML() + '</select></li></ul></div>')

      // TODO: License
      // TODO: ACL - can choose whether to make this reply private (to self), visible only to article author(s), visible to own contacts, public
      // TODO: Show name and face of signed in user reply is from, or 'anon' if article can host replies

      var replyToResource = document.getElementById('reply-to-resource')

      var id = 'location-reply-to'
      var action = 'write'

      DO.U.setupResourceBrowser(replyToResource, id, action)
      document.getElementById(id).insertAdjacentHTML('afterbegin', '<p>Choose a location to save your reply.</p>')

      replyToResource.insertAdjacentHTML('beforeend', '<p>Your reply will be saved at <samp id="' + id +'-' + action +
        '">https://example.org/path/to/article</samp></p>')

      var bli = document.getElementById(id + '-input')
      bli.focus()
      bli.placeholder = 'https://example.org/path/to/article'
      replyToResource.insertAdjacentHTML('beforeend', '<button class="reply">Send now</button>')

      // TODO: New in editor make this button do something.
      //     Question: when should the notification be sent?
      //replyToResource.insertAdjacentHTML('beforeend', 'or <button class="reply-new"><i class="fa fa-paper-plane-o"></i> Write reply in new window</button>');
      replyToResource.insertAdjacentHTML('beforeend', '</aside>')

      replyToResource.addEventListener('click', e => {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-reply').disabled = false
        }

        if (e.target.matches('button.reply')) {
          var note = document
            .querySelector('#reply-to-resource #reply-to-resource-note')
            .value.trim()

          var rm = replyToResource.querySelector('.response-message')
          if (rm) {
            rm.parentNode.removeChild(rm)
          }
          replyToResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>')
        }

        if (!iri || !note) {
          replyToResource
            .querySelector('.response-message')
            .innerHTML = '<p class="error">Need a note and a location to save it.</p>'
          return
        }

        var datetime = DO.U.getDateTimeISO()
        var attributeId = DO.U.generateAttributeId()
        var noteIRI = document.querySelector('#reply-to-resource #' + id +
          '-' + action).innerText.trim()
        var motivatedBy = "oa:replying"
        var noteData = {
          "type": 'article',
          "mode": "write",
          "motivatedByIRI": motivatedBy,
          "id": attributeId,
          "iri": noteIRI, //e.g., https://example.org/path/to/article
          "creator": {},
          "datetime": datetime,
          "target": {
            "iri": iri
          },
          "body": note, // content
          "license": {}
        }
        if (DO.C.User.IRI) {
          noteData.creator["iri"] = DO.C.User.IRI
        }
        if (DO.C.User.Name) {
          noteData.creator["name"] = DO.C.User.Name
        }
        if (DO.C.User.Image) {
          noteData.creator["image"] = DO.C.User.Image
        }
        if (DO.C.User.URL) {
          noteData.creator["url"] = DO.C.User.URL
        }

        var license = document.querySelector('#reply-to-resource-license')
        if (license && license.length > 0) {
          noteData.license["iri"] = license.value.trim()
          noteData.license["name"] = DO.C.License[license.value.trim()].name
        }

        var note = DO.U.createNoteDataHTML(noteData)

        var data = DO.U.createHTML(noteIRI, note)

        fetcher.putResource(noteIRI, data)

          .catch(error => {
            console.error('Could not save reply:', error)

            let errorMessage

            switch (error.status) {
              case 0:
              case 405:
                errorMessage = 'this location is not writable'
                break
              case 401:
              case 403:
                errorMessage = 'you do not have permission to write here'
                break
              case 406:
                errorMessage = 'enter a name for your resource'
                break
              default:
                // some other reason
                errorMessage = error.message
                break
            }

            // re-throw, to break out of the promise chain
            throw new Error('Cannot save your reply:', errorMessage)
          })

          .then(response => {
            replyToResource
              .querySelector('.response-message')
              .innerHTML = '<p class="success"><a href="' + response.url + '">Reply saved!</a></p>'

            // Determine the inbox endpoint, to send the notification to
            return inbox.getEndpoint(DO.C.Vocab[ 'ldpinbox' ][ '@id' ])
              .catch(error => {
                console.error('Could not fetch inbox endpoint:', error)

                // re-throw
                throw new Error('Could not determine the author inbox endpoint')
              })
          })

          .then(inbox => {
            if (!inbox) {
              throw new Error('Author inbox endpoint is empty or missing')
            }

            inbox = inbox[0]

            let notificationStatements = '    <dl about="' + noteIRI +
              '">\n<dt>Object type</dt><dd><a about="' +
              noteIRI + '" typeof="oa:Annotation" href="' +
              DO.C.Vocab['oaannotation']['@id'] +
              '">Annotation</a></dd>\n<dt>Motivation</dt><dd><a href="' +
              DO.C.Prefixes[motivatedBy.split(':')[0]] +
              motivatedBy.split(':')[1] + '" property="oa:motivation">' +
              motivatedBy.split(':')[1] + '</a></dd>\n</dl>\n'

            let notificationData = {
              "type": ['as:Announce'],
              "inbox": inbox,
              "object": noteIRI,
              "target": iri,
              "license": noteData.license["iri"],
              "statements": notificationStatements
            }

            inbox.notifyInbox(notificationData)
              .catch(error => {
                console.error('Failed sending notification to ' + inbox + ' :', error)

                throw new Error('Failed sending notification to author inbox')
              })
          })

          .then(() => {  // Success!
            replyToResource
              .querySelector('.response-message')
              .innerHTML += '<p class="success">Notification sent</p>';
          })

          .catch(error => {
            // Catch-all error, actually notify the user
            replyToResource
              .querySelector('.response-message')
              .innerHTML += '<p class="error">' +
                'We could not notify the author of your reply:' +
                error.message + '</p>'
          })
      })
    },

    showActionMessage: function(node, message) {
      var message = '<aside id="document-action-message" class="do on"><p>' + message + '</p></aside>';
      node.insertAdjacentHTML('afterend', message);
      window.setTimeout(function () {
        var dam = document.getElementById('document-action-message');
        dam.parentNode.removeChild(dam);
      }, 1500);
    },

    shareResource: function shareResource (e, iri) {
      iri = iri || fetcher.currentLocation();
      if (e) {
        e.target.disabled = true;
      }

      var addContactsButtonDisable = '', noContactsText = '';
      if(!(DO.C.User.Graph && ((DO.C.User.Knows && DO.C.User.Knows.length > 0) || (DO.C.User.Graph.owlsameAs && DO.C.User.Graph.owlsameAs._array.length > 0)))) {
        addContactsButtonDisable = ' disabled="disabled"';
        noContactsText = '<p>No contacts with an <i class="fa fa-inbox"></i> Inbox found. Acquire <i class="fa fa-thermometer-empty"></i> cool friends‽</p><p>Optionally enter targets individually:</p>';
      }
      var addContactsButton = '<li id="share-resource-address-book"><button class="add"' + addContactsButtonDisable + '><i class="fa fa-address-book"></i> Add from contacts</button>' + noContactsText + '</li>';

      document.body.insertAdjacentHTML('beforeend', '<aside id="share-resource" class="do on"><button class="close" title="Close">❌</button><h2>Share resource</h2><div id="share-resource-input"><p>Send a notification about <code>' + iri +'</code></p><ul>' + addContactsButton + '<li><label for="share-resource-to">To</label> <textarea id="share-resource-to" rows="2" cols="40" name="share-resource-to" placeholder="WebID or article IRI (one per line)"></textarea></li><li><label for="share-resource-note">Note</label> <textarea id="share-resource-note" rows="2" cols="40" name="share-resource-note" placeholder="Check this out!"></textarea></li></ul></div><button class="share">Share</button></aside>');

      var shareResource = document.getElementById('share-resource');
      shareResource.addEventListener('click', function (e) {
        if (e.target.matches('button.close')) {
          var rs = document.querySelector('#document-do .resource-share');
          if (rs) {
            rs.disabled = false;
          }
        }

        if (DO.C.User.IRI && e.target.matches('button.add')) {
          e.preventDefault();
          e.stopPropagation();
          e.target.parentNode.insertAdjacentHTML('beforeend', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
          DO.U.selectContacts(e, DO.C.User.IRI);
        }

        if (e.target.matches('button.share')) {
          var tos = document.querySelector('#share-resource #share-resource-to').value.trim();
          tos = (tos.length > 0) ? tos.split(/\r\n|\r|\n/) : [];
          var note = document.querySelector('#share-resource #share-resource-note').value.trim();

          var ps = document.querySelectorAll('#share-resource-contacts .progress');
          ps.forEach(function(p){
            p.parentNode.removeChild(p);
          });

          var srci = document.querySelectorAll('#share-resource-contacts input:checked');
          if (srci.length > 0) {
            for(var i = 0; i < srci.length; i++) {
              tos.push(srci[i].value);
            }
          }

          if (!iri) {
            return
          }

          // var rm = shareResource.querySelector('.response-message');
          // if (rm) {
          //   rm.parentNode.removeChild(rm);
          // }
          // shareResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>');

          return inbox.sendNotifications(tos, note, iri, shareResource)
        }
      });
    },

    getContacts: function(iri) {
      var processSameAs = function(s) {
        if (s.owlsameAs && s.owlsameAs._array.length > 0){
          var iris = s.owlsameAs._array;
          var promises = [];
          iris.forEach(function(iri){
// console.log(iri);
            if(iri != DO.C.User.IRI && DO.C.User.SameAs.indexOf(iri) < 0) {
              DO.C.User.SameAs.push(iri);
              DO.C.User.SameAs = util.uniqueArray(DO.C.User.SameAs);
              promises.push(DO.U.getContacts(iri));
            }
          });

          return Promise.all(promises)
            .then(function(results) {
// console.log(results);
              return Promise.resolve(([].concat.apply([], results)));
            })
            .catch(function(e) {
              console.log('--- catch ---');
// console.trace();
              //probably e.xhr.status == 0
              console.log(e);
              return Promise.resolve([]);
            });
        }
        else {
          return Promise.resolve([]);
        }
      };

      var fyn = function(iri){
        if (iri == DO.C.User.IRI && DO.C.User.SameAs.indexOf(iri) < 0) {
          DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(DO.C.User.Knows));

          return processSameAs(DO.C.User.Graph);
        }
        else {
          return fetcher.getResourceGraph(iri).then(
            function(g){
// console.log(g);
              if(typeof g._graph == 'undefined') {
                return Promise.resolve([]);
              }
              var s = g.child(iri);
              if(s.foafknows && s.foafknows._array.length > 0){
                DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(s.foafknows._array));
              }
              if(s.schemaknows && s.schemaknows._array.length > 0){
                DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(s.schemaknows._array));
              }

              return processSameAs(s);
            },
            function(reason){
              return Promise.resolve([]);
            });
        }
      }

      return fyn(iri).then(function(i){ return DO.C.User.TempKnows; });
    },

    selectContacts: function(e, url) {
      e.target.parentNode.innerHTML = '<p>Select from contacts</p><ul id="share-resource-contacts"></ul>';
      var shareResourceContacts = document.getElementById('share-resource-contacts');

      if(DO.C.User.Contacts.length > 0){
        DO.C.User.Contacts.forEach(function(s){
          // console.log(s);
          DO.U.addShareResourceContactInput(shareResourceContacts, s);
        });
      }
      else {
        DO.U.getContacts(url).then(
          function(contacts) {
            if(contacts.length > 0) {
              contacts.forEach(function(url) {
                fetcher.getResourceGraph(url).then(
                  function(i) {
                    // console.log(i);
                    var s = i.child(url);
                    DO.C.User.Contacts.push(s);

                    DO.U.addShareResourceContactInput(shareResourceContacts, s);
                  },
                  function(reason){
                    // console.log(reason);
                    console.log('No profile: ' + url);
                  }
                );
              });
            }
            else {
              e.target.parentNode.innerHTML = 'No contacts with <i class="fa fa-inbox"></i> Inboxes found. Acquire <i class="fa fa-thermometer-empty"></i> cool friends‽</p><p>Optionally enter targets individually:</p>';
            }
          },
          function(reason) {
             console.log(reason);
          }
        );
      }
    },

    addShareResourceContactInput: function(node, s) {
      var iri = s.iri().toString();
// console.log(iri.toString());
      var id = encodeURIComponent(iri);
      var name = auth.getAgentName(s) || iri;
      var img = auth.getAgentImage(s);
      img = (img && img.length > 0) ? '<img alt="" height="32" src="' + img + '" width="32" />' : '';
      var input = '<li><input id="share-resource-contact-' + id + '" type="checkbox" value="' + iri + '" /><label for="share-resource-contact-' + id + '">' + img + '<a href="' + iri + '" target="_blank">' + name + '</a></label></li>';


      //TODO: This should update DO.C.User.Contacts' Inbox value so that it is not checked again when #share-resource-contacts input:checked
      if(s.ldpinbox && s.ldpinbox._array.length > 0){
        node.insertAdjacentHTML('beforeend', input);
      }
      else {
        inbox.getEndpointFromHead(DO.C.Vocab['ldpinbox']['@id'], iri).then(
          function(i){
            // console.log(iri + ' has Inbox: ' + i);

            node.insertAdjacentHTML('beforeend', input);
          },
          function(reason){
            // console.log(reason);
            // console.log(iri + ' has no Inbox.');
          }
        );
      }
    },

    nextLevelButton: function(button, url, id, action) {
      var actionNode = document.getElementById(id + '-' + action);

      button.addEventListener('click', function(){
        if(button.parentNode.classList.contains('container')){
          fetcher.getResourceGraph(url).then(
            function(g){
              actionNode.textContent = (action == 'write') ? url + DO.U.generateAttributeId() : url;
              return DO.U.generateBrowserList(g, url, id, action);
            },
            function(reason){
              var inputBox = document.getElementById(id);
              switch(reason.slice(-3)) { // TODO: simplerdf needs to pass status codes better than in a string.
                default:
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
                  break;
                case '404':
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Not found.</p></div>');
                  break;
                case '401': case '403':
                  var msg = 'You don\'t have permission to access this location.';
                  if(!DO.C.User.IRI){
                    msg += '</p><p>Try signing in to access your datastore.';
                  }
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">' + msg + '</p></div>');
                  break;
              }
            }
          );
        }
        else {
          document.getElementById(id + '-input').value = url;
          var alreadyChecked = button.parentNode.querySelector('input[type="radio"]').checked;
          var radios = button.parentNode.parentNode.querySelectorAll('input[checked="true"]');

          actionNode.textContent =  url;

          for(var i = 0; i < radios.length; i++){
            radios[i].removeAttribute('checked');
          }
          if(alreadyChecked){
            button.parentNode.querySelector('input[type="radio"]').removeAttribute('checked');
          }
          else{
            button.parentNode.querySelector('input[type="radio"]').setAttribute('checked', 'true');
          }
        }
      }, false);
    },

    generateBrowserList: function(g, url, id, action) {
      return new Promise(function(resolve, reject){
        document.getElementById(id + '-input').value = url;

        var msgs = document.getElementById(id).querySelectorAll('.response-message');
        for(var i = 0; i < msgs.length; i++){
          msgs[i].parentNode.removeChild(msgs[i]);
        }

        var list = document.getElementById(id + '-ul');
        list.innerHTML = '';

        var urlPath = DO.U.getUrlPath(url);
        if(urlPath.length > 4){ // This means it's not the base URL
          urlPath.splice(-2,2);
          var prevUrl = DO.U.forceTrailingSlash(urlPath.join("/"));
          var upBtn = '<li class="container"><input type="radio" name="containers" value="' + prevUrl + '" id="' + prevUrl + '" /><label for="' + prevUrl + '" id="browser-up">..</label></li>';
          list.insertAdjacentHTML('afterbegin', upBtn);
        }

        var current = g.child(url);
        var contains = current.ldpcontains;
        var containersLi = Array();
        var resourcesLi = Array();
        contains.forEach(function(c){
          var cg = g.child(c);
          var types = cg.rdftype;
          var resourceTypes = [];
          types.forEach(function(type){
            resourceTypes.push(type);
          });

          var path = DO.U.getUrlPath(c);
          if(resourceTypes.indexOf('http://www.w3.org/ns/ldp#Container') > -1){
            var slug = path[path.length-2];
            containersLi.push('<li class="container"><input type="radio" name="resources" value="' + c + '" id="' + slug + '"/><label for="' + slug + '">' + slug + '</label></li>');
          }
          else {
            var slug = path[path.length-1];
            resourcesLi.push('<li><input type="radio" name="resources" value="' + c + '" id="' + slug + '"/><label for="' + slug + '">' + slug + '</label></li>');
          }

        });
        containersLi.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        resourcesLi.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        var liHTML = containersLi.join('\n') + resourcesLi.join('\n');
        list.insertAdjacentHTML('beforeend', liHTML);

        var buttons = list.querySelectorAll('label');
        if(buttons.length <= 1){
          list.insertAdjacentHTML('beforeend', '<p><em>(empty)</em></p>');
        }

        for(var i = 0; i < buttons.length; i++) {
          var nextUrl = buttons[i].parentNode.querySelector('input').value;
          DO.U.nextLevelButton(buttons[i], nextUrl, id, action);
        }

        return resolve(list);
      });
    },

    initBrowse: function(storageUrl, input, browseButton, id, action){
      input.value = storageUrl;
      fetcher.getResourceGraph(storageUrl).then(function(g){
        DO.U.generateBrowserList(g, storageUrl, id, action);
      }).then(function(i){
        document.getElementById(id + '-' + action).textContent = (action == 'write') ? input.value + DO.U.generateAttributeId() : input.value;
      });

      browseButton.addEventListener('click', function(){
        DO.U.triggerBrowse(input.value, id, action);
      }, false);
    },

    triggerBrowse: function(url, id, action){
      var inputBox = document.getElementById(id);
      if (url.length > 10 && url.match(/^https?:\/\//g) && url.slice(-1) == "/"){
        fetcher.getResourceGraph(url).then(function(g){
          DO.U.generateBrowserList(g, url, id, action).then(function(l){
            return l;
          },
          function(reason){
            console.log('???? ' + reason); // Probably no reason for it to get to here
          });
        },
        function(reason){
          var list = document.getElementById(id + '-ul');
          switch(reason.slice(-3)) { // TODO: simplerdf needs to pass status codes better than in a string.
            default:
              inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
              break;
            case '404':
              inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Not found.</p></div>');
              break;
            case '401': case '403':
              var msg = 'You don\'t have permission to access this location.';
              if(!DO.C.User.IRI){
                msg += '</p><p>Try signing in to access your datastore.';
              }
              inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">' + msg + '</p></div>');
              break;
          }
        });
      }
      else{
        inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">This is not a valid location.</p></div>');
      }
    },

    setupResourceBrowser: function(parent, id, action){
      id = id || 'browser-location';
      action = action || 'write';

      parent.insertAdjacentHTML('beforeend', '<div id="' + id + '"><label for="' + id +'-input">URL</label> <input type="text" id="' + id +'-input" name="' + id + '-input" placeholder="https://example.org/path/to/" /><button id="' + id +'-update" disabled="disabled">Browse</button></div>\n\
      <div id="' + id +'-contents"></div>');

      var inputBox = document.getElementById(id);
      var storageBox = document.getElementById(id + '-contents');
      var input = document.getElementById(id + '-input');
      var browseButton = document.getElementById(id + '-update');

      input.addEventListener('keyup', function(e){
        var actionNode = document.getElementById(id + '-' + action);
        if (input.value.length > 10 && input.value.match(/^https?:\/\//g) && input.value.slice(-1) == "/") {
          browseButton.removeAttribute('disabled');
          if(e.which == 13){
            DO.U.triggerBrowse(input.value, id, action);
          }
          if(action){
            action.textContent = input.value + DO.U.generateAttributeId();
          }
        }
        else {
          browseButton.disabled = 'disabled';
          if(actionNode) {
            actionNode.textContent = input.value;
          }
        }
      }, false);

      var browserul = document.getElementById(id + '-ul');
      if(!browserul){
        browserul = document.createElement('ul');
        browserul.id = id + '-ul';

        storageBox.appendChild(browserul);
      }

      var storageUrl;

      if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
        storageUrl = DO.U.forceTrailingSlash(DO.C.User.Storage[0]); // TODO: options for multiple storage
      }

      if(storageUrl){
        DO.U.initBrowse(storageUrl, input, browseButton, id, action);
      }
      else {
        inbox.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
          function(storageUrl) {
            DO.U.initBrowse(storageUrl[0], input, browseButton, id, action);
          },
          function(){
            browseButton.addEventListener('click', function(){
              DO.U.triggerBrowse(input.value, id, action);
            }, false);
          }
        )
      }
    },

    showResourceBrowser: function(id, action) {
      id = id || 'location-' + DO.U.generateAttributeId();
      action = action || 'write';

      var browserHTML = '<aside id="resource-browser-' + id + '" class="do on"><button class="close" title="Close">❌</button><h2>Resource Browser</h2></aside>';
      document.querySelector('body').insertAdjacentHTML('beforeend', browserHTML);

      DO.U.setupResourceBrowser(document.getElementById('resource-browser-' + id), id, action);
      document.getElementById('resource-browser-' + id).insertAdjacentHTML('beforeend', '<p><samp id="' + id + '-' + action + '"></samp></p>');
    },

    openInputFile: function(e) {
      var file = e.target.files[0];
// console.log(file);
      var contentType = file.type;

      var reader = new FileReader();
      reader.onload = function(){
// console.log(reader);

        DO.U.spawnDokieli(reader.result, contentType, 'file:' + file.name);
      };
      reader.readAsText(file);
    },

    openDocument: function (e) {
      if(typeof e !== 'undefined') {
        e.target.disabled = true;
      }
      document.body.insertAdjacentHTML('beforeend', '<aside id="open-document" class="do on"><button class="close" title="Close">❌</button><h2>Open Document</h2><p<label for="open-local-file">Open local file</label> <input type="file" id="open-local-file" name="open-local-file" /></p></aside>');

      var id = 'location-open-document';
      var action = 'read';

      var openDocument = document.getElementById('open-document');
      DO.U.setupResourceBrowser(openDocument , id, action);
      idSamp = (typeof DO.C.User.Storage == 'undefined') ? '' : '<p><samp id="' + id + '-' + action + '">https://example.org/path/to/article</samp></p>';
      openDocument.insertAdjacentHTML('beforeend', idSamp + '<button class="open">Open</button>');

      openDocument.addEventListener('click', function (e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-open').disabled = false;
        }

        if (e.target.matches('#open-local-file')){
          e.target.addEventListener('change', DO.U.openInputFile, false);
        }

        if (e.target.matches('button.open')) {
          var openDocument = document.getElementById('open-document');
          var rm = openDocument.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }

          var bli = document.getElementById(id + '-input');
          var iri = bli.value;
          var headers = { 'Accept': DO.C.AvailableMediaTypes.join(',') };
          var options = {};
          var pIRI = uri.getProxyableIRI(iri);
          if (pIRI.slice(0, 5).toLowerCase() == 'http:') {
            options['noCredentials'] = true;
          }

          var handleResource = function handleResource (pIRI, headers, options) {
            return fetcher.getResource(pIRI, headers, options)
              .catch(error => {
                if (error.status === 0) {
                  // retry with proxied uri
                  var pIRI = uri.getProxyableIRI(iri, {'forceProxy': true});
                  return handleResource(pIRI, headers, options);
                }

                throw error  // else, re-throw the error
              })
              .then(response => {
                var cT = response.headers.get('Content-Type');
                var contentType = (cT) ? cT.split(';')[0].trim() : 'text/turtle';

                return response.text()
                  .then(responseText => {
                    DO.U.spawnDokieli(responseText, contentType, iri);
                  })
              })
          }

          handleResource(pIRI, headers, options);
        }
      });
    },

    spawnDokieli: function(data, contentType, iri){
      if(DO.C.AvailableMediaTypes.indexOf(contentType) > -1) {
        var template = document.implementation.createHTMLDocument('template');
// console.log(template);

        switch(contentType){
          case 'text/html': case 'application/xhtml+xml':
            template.documentElement.innerHTML = data;
            break;

          default:
            template.documentElement.innerHTML = '<pre>' + data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
            break;
        }

// console.log(template);

        var documentHasDokieli = template.querySelectorAll('head script[src$="/do.js"]');
// console.log(documentHasDokieli);
// console.log(documentHasDokieli.length)
        if(documentHasDokieli.length == 0) {
          var doFiles = ['font-awesome.min.css', 'do.css', 'simplerdf.js', 'medium-editor.min.js', 'do.js'];
          doFiles.forEach(function(i){
// console.log(i);
            var media = i.endsWith('.css') ? template.querySelectorAll('head link[rel~="stylesheet"][href$="/' + i + '"]') : template.querySelectorAll('head script[src$="/' + i + '"]');
// console.log(media);
// console.log(media.length)
            if (media.length == 0) {
              switch(i) {
                case 'font-awesome.min.css':
                  template.querySelector('head').insertAdjacentHTML('beforeend', '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all" rel="stylesheet" />');
                  break;
                case 'do.css':
                  template.querySelector('head').insertAdjacentHTML('beforeend', '<link href="https://dokie.li/media/css/' + i + '" media="all" rel="stylesheet" />');
                  break;
                case 'simplerdf.js': case 'medium-editor.min.js': case 'do.js':
                  template.querySelector('head').insertAdjacentHTML('beforeend', '<script src="https://dokie.li/scripts/' + i + '"></script>')
                  break;
              }
            }
// console.log(template)
          });

          var nodes = template.querySelectorAll('head link, [src], object[data]');
          nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': 'base-url-absolute', 'iri': iri});

          document.documentElement.removeAttribute('id');
          document.documentElement.removeAttribute('class');
        }
        else if(!iri.startsWith('file:')) {
          window.open(iri, '_blank');
          return;
        }

        document.documentElement.innerHTML = template.documentElement.innerHTML;

// console.log(document.location.protocol);
        if(!iri.startsWith('file:')){
          var iriHost = iri.split('//')[1].split('/')[0];
          var iriProtocol = iri.split('//')[0];
// console.log(iriHost);
// console.log(iriProtocol);
          if(document.location.protocol == iriProtocol && document.location.host == iriHost) {
            try {
              history.pushState(null, null, iri);
            }
            catch(e) { console.log('Cannot change pushState due to cross-origin.'); }
          }
        }
        DO.U.init();
      }
      else {
console.log('//TODO: Handle server returning wrong Response/Content-Type for the Request/Accept');
      }
    },


    createNewDocument: function createNewDocument (e) {
      e.target.disabled = true
      document.body.insertAdjacentHTML('beforeend', '<aside id="create-new-document" class="do on"><button class="close" title="Close">❌</button><h2>Create New Document</h2></aside>')

      var newDocument = document.getElementById('create-new-document')
      newDocument.addEventListener('click', e => {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-new').disabled = false
        }
      })

      var id = 'location-new'
      var action = 'write'

      DO.U.setupResourceBrowser(newDocument, id, action)
      document.getElementById(id).insertAdjacentHTML('afterbegin', '<p>Choose a location to save your new article.</p>')
      var baseURLSelection = (document.location.protocol == 'file:') ? '' : DO.U.getBaseURLSelection()

      newDocument.insertAdjacentHTML('beforeend', baseURLSelection +
        '<p>Your new document will be saved at <samp id="' + id + '-' + action +
        '">https://example.org/path/to/article</samp></p><button class="create">Create</button>')

      var bli = document.getElementById(id + '-input')
      bli.focus()
      bli.placeholder = 'https://example.org/path/to/article'

      newDocument.addEventListener('click', e => {
        if (!e.target.matches('button.create')) {
          return
        }

        var newDocument = document.getElementById('create-new-document')
        var storageIRI = newDocument.querySelector('#' + id + '-' + action).innerText.trim()
        var rm = newDocument.querySelector('.response-message')
        if (rm) {
          rm.parentNode.removeChild(rm)
        }

        var html = document.documentElement.cloneNode(true)
        var baseURLSelectionChecked = newDocument.querySelector('select[name="base-url"]')
        // console.log(baseURLSelectionChecked);

        if (baseURLSelectionChecked.length > 0) {
          var baseURLType = baseURLSelectionChecked.value
          var nodes = html.querySelectorAll('head link, [src], object[data]')
          if (baseURLType == 'base-url-relative') {
            DO.U.copyRelativeResources(storageIRI, nodes)
          }
          // TODO: the variable nodes, below, is never used
          // nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': baseURLType})
        }

        html.querySelector('body').innerHTML = '<main><article about="" typeof="schema:Article"></article></main>'
        html.querySelector('head title').innerHTML = ''
        html = doc.getDocument(html)

        fetcher.putResource(storageIRI, html)
          .then(() => {
            newDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="success">' +
              'New document created at <a href="' + storageIRI +
              '?author=true">' + storageIRI + '</a></p></div>'
            )

            window.open(storageIRI + '?author=true', '_blank')
          })

          .catch(error => {
            console.error('Error creating a new document:', error)

            let message

            switch (error.status) {
              case 0:
              case 405:
                message = 'this location is not writable'
                break
              case 401:
              case 403:
                message = 'you do not have permission to write here'
                break
              case 406:
                message = 'enter a name for your resource'
                break
              default:
                message = error.message
                break
            }

            newDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="error">' +
              'Could not create new document: ' + message + '</p>'
            )
          })
      })
    },

    saveAsDocument: function saveAsDocument (e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="save-as-document" class="do on"><button class="close" title="Close">❌</button><h2>Save As Document</h2></aside>');

      var saveAsDocument = document.getElementById('save-as-document');
      saveAsDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-save-as').disabled = false;
        }
      });

      var fieldset = '';

      locationInboxId = 'location-inbox';
      locationInboxAction = 'read';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + locationInboxId + '-fieldset"><legend>Set Inbox</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[0];
      DO.U.setupResourceBrowser(fieldset, locationInboxId, locationInboxAction);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article\'s <em>inbox</em> will be set to: <samp id="' + locationInboxId + '-' + locationInboxAction + '"></samp></p>');
      var lii = document.getElementById(locationInboxId + '-input');
      lii.focus();
      lii.placeholder = 'https://example.org/path/to/inbox/';


      locationAnnotationServiceId = 'location-annotation-service';
      locationAnnotationServiceAction = 'read';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + locationAnnotationServiceId + '-fieldset"><legend>Set Annotation Service</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[1];
      DO.U.setupResourceBrowser(fieldset, locationAnnotationServiceId, locationAnnotationServiceAction);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article\'s <em>annotation service</em> will be set to: <samp id="' + locationAnnotationServiceId + '-' + locationAnnotationServiceAction + '"></samp></p>');
      var lasi = document.getElementById(locationAnnotationServiceId + '-input');
      lasi.focus();
      lasi.placeholder = 'https://example.org/path/to/annotation/';


      var id = 'location-save-as';
      var action = 'write';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + id + '-fieldset"><legend>Save to</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[2];
      DO.U.setupResourceBrowser(fieldset, id, action);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article will be saved at: <samp id="' + id + '-' + action + '"></samp></p>' + DO.U.getBaseURLSelection() + '<p><input type="checkbox" id="derivation-data" name="derivation-data" checked="checked" /><label for="derivation-data">Derivation data</label></p><button class="create">Save</button>');
      var bli = document.getElementById(id + '-input');
      bli.focus();
      bli.placeholder = 'https://example.org/path/to/article';


      saveAsDocument.addEventListener('click', e => {
        if (!e.target.matches('button.create')) {
          return
        }

        var currentDocumentURL = uri.stripFragmentFromString(document.location.href)
        var saveAsDocument = document.getElementById('save-as-document')
        var storageIRI = saveAsDocument.querySelector('#' + id + '-' + action).innerText.trim()

        var rm = saveAsDocument.querySelector('.response-message')
        if (rm) {
          rm.parentNode.removeChild(rm)
        }

        if(!storageIRI.length) {
          saveAsDocument.insertAdjacentHTML('beforeend',
            '<div class="response-message"><p class="error">' +
            'Specify the location to save the article to, and optionally set its <em>inbox</em> or <em>annotation service</em>.</p></div>'
          )

          return
        }

        var html = document.documentElement.cloneNode(true)
        var nodeInsertLocation = html.querySelector('main > article') || html.querySelector('body')

        var wasDerived = document.querySelector('#derivation-data')
        if (wasDerived.checked) {
          var wasDerivedOn = DO.U.getDateTimeISO()
          nodeInsertLocation.insertAdjacentHTML('beforebegin',
            '<dl id="document-derived-from"><dt>Derived From</dt><dd><a href="' +
            currentDocumentURL + '" rel="prov:wasDerivedFrom">' +
            currentDocumentURL + '</a></dd></dl><dl id="document-derived-on"><dt>Derived On</dt><dd><time datetime="' +
            wasDerivedOn + '">' + wasDerivedOn + '</time></dd></dl>' + '\n'
          )
        }

        var inboxLocation = saveAsDocument.querySelector('#' + locationInboxId + '-' + locationInboxAction).innerText.trim()
        if (inboxLocation) {
          nodeInsertLocation.insertAdjacentHTML('beforebegin', '<dl id="document-inbox"><dt>Notifications Inbox</dt><dd><a href="' + inboxLocation + '" rel="ldp:inbox">' + inboxLocation + '</a></dd></dl>' + "\n")
        }

        var annotationServiceLocation = saveAsDocument.querySelector('#' + locationAnnotationServiceId + '-' + locationAnnotationServiceAction).innerText.trim()
        if (annotationServiceLocation) {
          nodeInsertLocation.insertAdjacentHTML('beforebegin', '<dl id="document-annotation-service"><dt>Annotation Service</dt><dd><a href="' + annotationServiceLocation + '" rel="oa:annotationService">' + annotationServiceLocation + '</a></dd></dl>' + "\n")
        }

        var baseURLSelectionChecked = saveAsDocument.querySelector('select[name="base-url"]')
        if (baseURLSelectionChecked.length > 0) {
          var baseURLType = baseURLSelectionChecked.value
          var nodes = html.querySelectorAll('head link, [src], object[data]')
          if (baseURLType == 'base-url-relative') {
            DO.U.copyRelativeResources(storageIRI, nodes)
          }
          // TODO: 'nodes' not used anywhere:
          // nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': baseURLType})
        }

        html = doc.getDocument(html)

        var progress = saveAsDocument.querySelector('progress')
        if(progress) {
          progress.parentNode.removeChild(progress)
        }
        e.target.insertAdjacentHTML('afterend', '<progress min="0" max="100" value="0"></progress>')
        progress = saveAsDocument.querySelector('progress')

        fetcher.putResource(storageIRI, html, null, null, { 'progress': progress })

          .then(response => {
            progress.parentNode.removeChild(progress)

            let url = response.url || storageIRI

            saveAsDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="success">' +
              'Document saved at <a href="' + url + '?author=true">' + url + '</a></p></div>'
            )

            window.open(url + '?author=true', '_blank')
          })

          .catch(error => {
            console.error('Error saving document', error)

            let message

            switch (error.status) {
              case 0:
              case 405:
                message = 'this location is not writable'
                break
              case 401:
              case 403:
                message = 'you do not have permission to write here'
                break
              case 406:
                message = 'enter a name for your resource'
                break
              default:
                message = error.message
                break
            }

            saveAsDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="error">' +
              'Unable to save:' + message + '</p></div>'
            )
          })
      })
    },

    viewSource: function(e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="source-view" class="do on"><button class="close" title="Close">❌</button><h2>Source</h2><textarea id="source-edit" rows="24" cols="80"></textarea><p><button class="create">Update</button></p></aside>');
      var sourceBox = document.getElementById('source-view');
      var input = document.getElementById('source-edit');
      input.value = doc.getDocument();

      sourceBox.addEventListener('click', function(e) {
        if (e.target.matches('button.create')) {
          var url = window.location.origin + window.location.pathname;
          var data = document.getElementById('source-edit').value;
          document.documentElement.innerHTML = data;
          DO.U.showDocumentInfo();
          DO.U.showDocumentMenu(e);
          DO.U.viewSource();
          document.querySelector('#document-do .resource-source').disabled = true;
        }

        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-source').disabled = false;
        }
      });
    },

    getBaseURLSelection: function() {
      return '<div id="base-url-selection"><label>Location of media resources:</label>\n\
      <select name="base-url">\n\
      <option id="base-url-absolute" value="base-url-absolute" selected="selected">Use references as is</option>\n\
      <option id="base-url-relative" value="base-url-relative">Copy to your storage</option>\n\
      </select>\n\
      </div>';
    },

    rewriteBaseURL: function(nodes, options) {
      options = options || {};
      if (typeof nodes === 'object' && nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var url, ref;
          switch(node.tagName.toLowerCase()) {
            default:
              url = node.getAttribute('src');
              ref = 'src';
              break;
            case 'link':
              url = node.getAttribute('href');
              ref = 'href';
              break;
            case 'object':
              url = node.getAttribute('data');
              ref = 'data';
              break;
          }

          var s = url.split(':')[0];
          if (s != 'http' && s != 'https' && s != 'file' && s != 'data' && s != 'urn' && document.location.protocol != 'file:') {
            url = DO.U.setBaseURL(url, options);
          }
          node.setAttribute(ref, url);
        };
      }

      return nodes;
    },

    setBaseURL: function(url, options) {
      options = options || {};
      var urlType = ('baseURLType' in options) ? options.baseURLType : 'base-url-absolute';

      var matches = [];
      var regexp = /(https?:\/\/([^\/]*)\/|file:\/\/\/|data:|urn:|\/\/)?(.*)/;

      matches = url.match(regexp);

      if (matches) {
        switch(urlType) {
          case 'base-url-absolute': default:
            if(matches[1] == '//' && 'iri' in options){
              url = options.iri.split(':')[0] + ':' + url;
            }
            else {
              href = ('iri' in options) ? uri.getProxyableIRI(options.iri) : document.location.href;
              url = DO.U.getBaseURL(href) + matches[3].replace(/^\//g, '');
            }
            break;
          case 'base-url-relative':
            url = matches[3].replace(/^\//g, '');
            break;
        }
      }

      return url;
    },

    getBaseURL: function(url) {
      if(typeof url === 'string') {
        url = url.substr(0, url.lastIndexOf('/') + 1);
      }

      return url;
    },

    getPathURL: function(url) {
      if(typeof url === 'string') {
        var i  = url.indexOf('?');
        if(i > -1) {
          url = url.substr(0, i);
        }
        i = url.indexOf('#');
        if(i > -1) {
          url = url.substr(0, i);
        }
      }

      return url;
    },

    copyRelativeResources: function copyRelativeResources (storageIRI, relativeNodes) {
      var ref = '';
      var baseURL = DO.U.getBaseURL(storageIRI);

      for (var i = 0; i < relativeNodes.length; i++) {
        var node = relativeNodes[i];
        switch(node.tagName.toLowerCase()) {
          default:
            ref = 'src';
            break;
          case 'link':
            ref = 'href';
            break;
          case 'object':
            ref = 'data';
            break;
        }

        var fromURL = node.getAttribute(ref);
        var s = fromURL.split(':')[0];
        if (s != 'http' && s != 'https' && s != 'file' && s != 'data' && s != 'urn' && s != 'urn') {
          var pathToFile = DO.U.setBaseURL(fromURL, {'baseURLType': 'base-url-relative'});
          fromURL = DO.U.getBaseURL(document.location.href) + pathToFile.replace(/^\//g, '');
          var toURL = baseURL + pathToFile.replace(/^\//g, '');
          fetcher.copyResource(fromURL, toURL);
         }
      };
    },

    initStorage: function(item) {
      if (typeof window.localStorage != 'undefined') {
        DO.U.enableStorage(item);
      }
    },
    enableStorage: function(item) {
      DO.C.UseStorage = true;
      if(localStorage.getItem(item)) {
        document.documentElement.innerHTML = localStorage.getItem(item);
      }
      console.log(DO.U.getDateTimeISO() + ': Storage enabled.');
      DO.U.enableAutoSave(item);
    },
    disableStorage: function(item) {
      DO.C.UseStorage = false;
      localStorage.removeItem(item);
      DO.U.disableAutoSave(item);
      console.log(DO.U.getDateTimeISO() + ': Storage disabled.');
    },
    saveStorage: function(item) {
      switch(item) {
        case 'html': default:
          var object = doc.getDocument();
          break;
      }
      localStorage.setItem(item, object);
      console.log(DO.U.getDateTimeISO() + ': Document saved.');
    },
    enableAutoSave: function(item) {
      DO.C.AutoSaveId = setInterval(function() { DO.U.saveStorage(item) }, DO.C.AutoSaveTimer);
      console.log(DO.U.getDateTimeISO() + ': Autosave enabled.');
    },
    disableAutoSave: function(item) {
      clearInterval(DO.C.AutoSaveId);
      DO.C.AutoSaveId = '';
      console.log(DO.U.getDateTimeISO() + ': Autosave disabled.');
    },
    showStorage: function(node) {
      if(document.querySelector('#local-storage')) { return; }

      if (typeof window.localStorage != 'undefined') {
        var useStorage, checked;

        if (DO.C.UseStorage) {
          if (DO.C.AutoSaveId) {
            checked = ' checked="checked"';
          }
          useStorage = DO.C.DisableStorageButtons + '<input id="local-storage-html-autosave" class="autosave" type="checkbox"' + checked +' /> <label for="local-storage-html-autosave"><i class="fa fa-clock-o"></i> 1m autosave</label>';
        }
        else {
          useStorage = DO.C.EnableStorageButtons;
        }

        node.insertAdjacentHTML('beforeend', '<section id="local-storage" class="do"><h2>Local Storage</h2><p>' + useStorage + '</p></section>');

        document.getElementById('local-storage').addEventListener('click', function(e) {
          if (e.target.closest('button.local-storage-enable-html')) {
            e.target.outerHTML = DO.C.DisableStorageButtons;
            DO.U.enableStorage('html');
          }

          if (e.target.closest('button.local-storage-disable-html')) {
            e.target.outerHTML = DO.C.EnableStorageButtons;
            DO.U.disableStorage('html');
          }

          if (e.target.matches('input.autosave')) {
            if (e.target.getAttribute('checked')) {
              e.target.removeAttribute('checked');
              DO.U.disableAutoSave('html');
            }
            else {
              e.target.setAttribute('checked', 'checked');
              DO.U.enableAutoSave('html');
            }
          }
        });
      }
    },
    hideStorage: function() {
      if (DO.C.UseStorage) {
        var ls = document.getElementById('local-storage');
        ls.parentNode.removeChild(ls);
      }
    },

    getDateTimeISO: function() {
      var date = new Date();
      return date.toISOString();
    },

    createAttributeDateTime: function(element) {
      //Creates datetime attribute.
      //TODO: Include @data-author for the signed in user e.g., WebID or URL.
      var a = DO.U.getDateTimeISO();

      switch(element) {
        case 'mark': case 'article':
          a = 'data-datetime="' + a + '"';
          break;
        case 'del': case 'ins':
          a = 'datetime="' + a + '"';
          break;
        default:
          a = '';
          break;
      }

      return a;
    },

    getCitation: function(i, options) {
      options = options || {};
      var iri = i;
      // if (typeof options !== 'undefined' && 'type' in options && options.type == 'doi') {
      if (i.toLowerCase().slice(0,4) !== 'http') {
//        iri = 'http://dx.doi.org/' + i.trim();
        iri = 'http://data.crossref.org/' + i.trim();
      }
      else {
        var x = iri.toLowerCase().trim().split('/');
        if (x[2] == 'doi.org' || x[2] == 'dx.doi.org') {
          var y = x[0] + '//' + x[2] + '/';
          iri = 'http://data.crossref.org/' + iri.substr(y.length, iri.length);
        }
      }
//console.log(iri);

      return fetcher.getResourceGraph(iri);
    },

    getCitationHTML: function(citationGraph, citationURI, options) {
      options = options || {};
      // var citationId = ('citationId' in options) ? options.citationId : citationURI;
      var subject = citationGraph.child(citationURI);
// console.log(citationGraph);
// console.log('citationGraph.iri().toString(): ' + citationGraph.iri().toString());
// console.log('citationGraph.toString(): ' + citationGraph.toString());
// console.log('options.citationId: ' + options.citationId);
// console.log('citationURI: ' + citationURI);
// console.log('subject.iri().toString(): ' + subject.iri().toString());

      var title = DO.U.getResourceLabel(subject);
      //FIXME: This is a stupid hack because RDFa parser is not setting the base properly.
      if(typeof title == 'undefined') {
        subject = citationGraph.child(options.citationId);

        title = DO.U.getResourceLabel(subject) || '';
      }
      title = title.replace(/ & /g, " &amp; ");
      title = (title.length > 0) ? '<cite>' + title + '</cite>, ' : '';
      var datePublished = subject.schemadatePublished || subject.dctermsissued || subject.dctermsdate || subject.dctermscreated || '';
      datePublished = (datePublished) ? datePublished.substr(0,4) + ', ' : '';
      var dateAccessed = 'Accessed: ' + DO.U.getDateTimeISO();
      var authors = [], authorList = [];
// console.log(subject);
// console.log(subject.biboauthorList);
// console.log(subject.schemaauthor);
// console.log(subject.dctermscreator);

      //XXX: FIXME: Putting this off for now because SimpleRDF is not finding the bnode for some reason in citationGraph.child(item), or at least authorItem.rdffirst (undefined)
//       if (subject.biboauthorList) {
//         var traverseRDFList = function(item) {
//           var authorItem = citationGraph.child(item);
// // console.log(authorItem);
// // console.log(authorItem.iri().toString());
// // console.log(authorItem.rdffirst);
// // console.log(authorItem.rdfrest);
//           if (authorItem.rdffirst) {
//             authorList.push(authorItem.rdffirst);
//           }
//           if (authorItem.rdfrest && authorItem.rdfrest !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil') {
//             traverseRDFList(authorItem.rdfrest);
//           }
//         };

//         traverseRDFList(subject.biboauthorList);
//       }
//       else
      if (subject.schemaauthor && subject.schemaauthor._array.length > 0) {
        subject.schemaauthor.forEach(function(a) {
          authorList.push(a);
        });
      }
      else if (subject.dctermscreator && subject.dctermscreator._array.length > 0) {
        subject.dctermscreator.forEach(function(a) {
          authorList.push(a);
        });
      }
      else if (subject.asactor && subject.asactor._array.length > 0) {
        subject.asactor.forEach(function(a) {
          authorList.push(a);
        });
      }
// console.log(authorList);

      if(authorList.length > 0) {
        authorList.forEach(function(authorIRI) {
          var s = subject.child(authorIRI);
          var author = auth.getAgentName(s);

          if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
            author = DO.U.createRefName(s.schemafamilyName, s.schemagivenName);
          }
          else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
            author = DO.U.createRefName(s.foaffamilyName, s.foafgivenName);
          }

          if (author !== '') {
            authors.push(author);
          }
          else {
            authors.push(authorIRI);
          }
        });
        authors = authors.join(', ') + ': ';
      }

      var content = ('content' in options && options.content.length > 0) ? options.content + ', ' : '';

      var citationReason = 'Reason: ' + DO.C.Citation[options.citationRelation];

      var citationHTML = authors + title + datePublished + content + '<a about="#' + options.refId + '" href="' + options.citationId + '" rel="schema:citation ' + options.citationRelation  + '">' + options.citationId + '</a> [' + dateAccessed + ', ' + citationReason + ']';
//console.log(citationHTML);
      return citationHTML;
    },

    createRefName: function(familyName, givenName, refType) {
      refType = refType || DO.C.DocRefType;
      switch(refType) {
        case 'LNCS': default:
          return familyName + ', ' + givenName.slice(0,1) + '.';
          break;
        case 'ACM':
          return givenName.slice(0,1) + '. ' + familyName;
          break;
        case 'fullName':
          return givenName + ' ' + familyName;
          break;
      }
    },

    highlightItems: function() {
      var highlights = document.body.querySelectorAll('*[class*="highlight-"]');
      for (var i = 0; i < highlights.length; i++) {
        highlights[i].addEventListener('mouseenter', function(e) {
          var c = e.target.getAttribute('class').split(' ')
                    .filter(function(s) { return s.startsWith('highlight-'); });
          var highlightsX = document.body.querySelectorAll('*[class~="'+ c[0] +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.add('do', 'highlight');
          }
        });

        highlights[i].addEventListener('mouseleave', function(e) {
          var c = e.target.getAttribute('class');
          var c = e.target.getAttribute('class').split(' ')
                    .filter(function(s) { return s.startsWith('highlight-'); });
          var highlightsX = document.body.querySelectorAll('*[class~="'+ c[0] +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.remove('do', 'highlight');
          }
        });
      }
    },

    hashCode: function(s){
      var hash = 0;
      if (s.length == 0) return hash;
      for (i = 0; i < s.length; i++) {
        var char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },

    generateAttributeId: function(prefix, string) {
      prefix = prefix || '';

      if (string) {
        //XXX: I think we want to trim.
        string = string.trim();
        string = string.replace(/\W/g,'-');
        s1 = string.substr(0, 1);
        string = (prefix === '' && s1 == parseInt(s1)) ? 'x-' + string : prefix + string;
        return (document.getElementById(string)) ? string + '-x' : string;
      }
      else {
        return DO.U.generateUUID();
      }
    },

    // MIT license
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    generateUUID: function() {
      var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
      var s = function() {
        var d0 = Math.random()*0xffffffff|0;
        var d1 = Math.random()*0xffffffff|0;
        var d2 = Math.random()*0xffffffff|0;
        var d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
      };
      return s();
    },

    //http://stackoverflow.com/a/25214113
    fragmentFromString: function(strHTML) {
      return document.createRange().createContextualFragment(strHTML);
    },

    SPARQLQueryURL: {
      getResourcesOfTypeWithLabel: function(sparqlEndpoint, resourceType, textInput, options) {
        options = options || {};
        var labelsPattern = '', resourcePattern = '';

        if(!('lang' in options)) {
          options['lang'] = 'en';
        }

        if ('filter' in options) {
          if(resourceType == '<http://purl.org/linked-data/cube#DataSet>' || resourceType == 'qb:DataSet'
            && 'dimensionRefAreaNotation' in options.filter) {
              var dimensionPattern, dimensionDefault = '';
              var dataSetPattern = "\n\
    [] qb:dataSet ?resource";
            if ('dimensionProperty' in options.filter) {
              dimensionPattern = " ; " + options.filter.dimensionProperty;
            }
            else {
              var dimensionDefault = " .\n\
  { SELECT DISTINCT ?propertyRefArea WHERE { ?propertyRefArea rdfs:subPropertyOf* sdmx-dimension:refArea . } }";
              dimensionPattern = " ; ?propertyRefArea ";

            }
            var notationPattern = " [ skos:notation '" + options.filter.dimensionRefAreaNotation.toUpperCase() + "' ] ."
          }
          resourcePattern = dimensionDefault + dataSetPattern + dimensionPattern + notationPattern;
        }

        labelsPattern = "\n\
  ";
        if ('optional' in options) {
          if('prefLabels' in options.optional) {
            if (options.optional.prefLabels.length == 1) {
              labelsPattern += "  ?resource " + options.optional.prefLabels[0] + " ?prefLabel .";
            }
            else {
              labelsPattern += "  VALUES ?labelProperty {";
              options.optional.prefLabels.forEach(function(property){
                labelsPattern += ' ' + property;
              });
              labelsPattern += " } ?resource ?labelProperty ?prefLabel .";
            }
          }
        }
        else {
          labelsPattern += "  ?resource rdfs:label ?prefLabel .";
        }


//  FILTER (!STRSTARTS(STR(?resource), 'http://purl.org/linked-data/sdmx/'))\n\
      var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\
PREFIX dcterms: <http://purl.org/dc/terms/>\n\
PREFIX qb: <http://purl.org/linked-data/cube#>\n\
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>\n\
PREFIX sdmx-measure: <http://purl.org/linked-data/sdmx/2009/measure#>\n\
CONSTRUCT {\n\
  ?resource skos:prefLabel ?prefLabel .\n\
}\n\
WHERE {\n\
  ?resource a " + resourceType + " ."
+ labelsPattern + "\n\
  FILTER (CONTAINS(LCASE(?prefLabel), '" + textInput + "') && (LANG(?prefLabel) = '' || LANGMATCHES(LANG(?prefLabel), '" + options.lang + "')))"
+ resourcePattern + "\n\
}";
       return sparqlEndpoint + "?query=" + uri.encodeString(query);
      },

      getObservationsWithDimension: function(sparqlEndpoint, dataset, paramDimension, options) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\
PREFIX dcterms: <http://purl.org/dc/terms/>\n\
PREFIX qb: <http://purl.org/linked-data/cube#>\n\
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>\n\
PREFIX sdmx-measure: <http://purl.org/linked-data/sdmx/2009/measure#>\n\
CONSTRUCT {\n\
  ?observation sdmx-dimension:refPeriod ?refPeriod .\n\
  ?observation sdmx-measure:obsValue ?obsValue .\n\
}\n\
WHERE {\n\
  ?observation qb:dataSet <" + dataset + "> .\n\
  " + paramDimension + "\n\
  ?propertyRefPeriod rdfs:subPropertyOf* sdmx-dimension:refPeriod .\n\
  ?observation ?propertyRefPeriod ?refPeriod .\n\
  ?propertyMeasure rdfs:subPropertyOf* sdmx-measure:obsValue .\n\
  ?observation ?propertyMeasure ?obsValue .\n\
}";

        return sparqlEndpoint + "?query=" + uri.encodeString(query);
      },
    },

    getSparkline: function(data, options) {
      options = options || {};
      if(!('cssStroke' in options)) {
        options['cssStroke'] = '#333';
      }

      var svg = '<svg height="100%" prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# xsd: http://www.w3.org/2001/XMLSchema# qb: http://purl.org/linked-data/cube# prov: http://www.w3.org/ns/prov# schema: http://schema.org/" version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">/*<![CDATA[*/line { stroke:' + options.cssStroke + '; stroke-width:1px; } circle { stroke:#f00; fill:#f00; }/*]]>*/</style>';

      svg += DO.U.drawSparklineGraph(data, options);
      svg += '</svg>';

      return svg;
    },

    drawSparklineGraph: function(data, options) {
      options = options || {};
      if(!('cssStroke' in options)) {
        options['cssStroke'] = '#333';
      }
      var svg= '';

      var obsValue = 'http://purl.org/linked-data/sdmx/2009/measure#obsValue';
      var observation = 'http://purl.org/linked-data/cube#Observation';

      var dotSize = 1;
      var values = data.map(function(n) { return n[obsValue]; }),
        min = Math.min.apply(null, values),
        max = Math.max.apply(null, values);

      var new_max = 98;
      var new_min = 0;
      var range = new_max - new_min;

      var parts = values.map(function (v) {
        return (new_max - new_min) / (max - min) * (v - min) + new_min || 0;
      });

      var div = 100 / parts.length;
      var x1 = 0, y1 = 0, x2 = div / 2, y2 = range - parts[0];

      var lines = '';
      for (var i=0; i < parts.length; i++) {
        x1 = x2; y1 = y2;
        x2 = range * (i / parts.length) + (div / 2);
        y2 = range - parts[i];

        lines += '<a rel="rdfs:seeAlso" resource="' + data[i][observation] + '" target="_blank" xlink:href="' + data[i][observation] + '"><line' +
          ' x1="' + x1 + '%"' +
          ' x2="' + x2 + '%"' +
          ' y1="' + y1 + '%"' +
          ' y2="' + y2 + '%"' +
          ' /></a>';

        //Last data item
        if(i+1 === parts.length) {
          lines += '<a target="_blank" xlink:href="' + data[i][observation] + '"><circle' +
            ' cx="' + x2 + '%"' +
            ' cy="' + y2 + '%"' +
            ' r="' + dotSize + '"' +
            ' /></a>';
        }
      }

      var wasDerivedFrom = '';
      if(options && 'url' in options) {
        wasDerivedFrom = ' rel="prov:wasDerivedFrom" resource="' + options.url + '"';
      }
      svg += '<g' + wasDerivedFrom + '>';
      svg += '<metadata rel="schema:license" resource="https://creativecommons.org/publicdomain/zero/1.0/" />';
      if (options && 'title' in options) {
        svg += '<title property="schema:name">' + options['title'] + '</title>';
      }
      svg += lines + '</g>';

      return svg;
    },

    getTriplesFromGraph: function(url) {
      return graph.getGraph(url)
        .then(function(i){
          return i.graph();
        })
        .catch(function(error){
          console.log(error);
        });
    },

    sortTriples: function(triples, options) {
      options = options || {};
      if(!('sortBy' in options)) {
        options['sortBy'] = 'object';
      }

      triples._graph.sort(function (a, b) {
        return a[options.sortBy].nominalValue.toLowerCase().localeCompare(b[options.sortBy].nominalValue.toLowerCase());
      });

      return triples;
    },

    getListHTMLFromTriples: function(triples, options) {
      options = options || {element: 'ul'};
      var elementId = ('elementId' in options) ? ' id="' + options.elementId + '"' : '';
      var elementName = ('elementId' in options) ? ' name="' + options.elementId + '"' : '';
      var elementTitle = ('elementId' in options) ? options.elementId : '';
      var items = '';
      triples.forEach(function(t){
        var s = t.subject.nominalValue;
        var o = t.object.nominalValue;
        switch(options.element) {
          case 'ol': case 'ul': default:
            items += '<li><a href="' + s + '">' + o + '</a></li>';
            break;
          case 'dl':
            items += '<dd><a href="' + s + '">' + o + '</a></dd>';
            break;
          case 'select':
            items += '<option value="' +   s + '">' + o + '</option>';
            break;
        }
      });

      switch(options.element) {
        case 'ul': default:
          return '<ul' + elementId + '>' + items + '</ul>';
        case 'ol':
          return '<ol' + elementId + '>' + items + '</ol>';
        case 'dl':
          return '<dl' + elementId + '><dt>' + elementTitle + '</dt>' + items + '</dl>';
        case 'select':
          return '<select' + elementId + elementName + '>' + items + '</select>';
      }
    },

    showAsTabs: function(id) {
      document.querySelector('#' + id + ' nav').addEventListener('click', function(e) {
        var a = e.target;
        if (a.matches('a')) {
          e.preventDefault();
          e.stopPropagation();

          var li = a.parentNode;
          if(!li.classList.contains('class')) {
            var navLi = document.querySelectorAll('#' + id + ' nav li');
            for (var i = 0; i < navLi.length; i++) {
              navLi[i].classList.remove('selected');
            }
            li.classList.add('selected');
            var figures = document.querySelectorAll('#' + id + ' > figure');
            for (var i = 0; i < figures.length; i++) {
              figures[i].classList.remove('selected');
            }
            document.querySelector('#' + id + ' > figure' + a.hash).classList.add('selected');
          }
        }
      });
    },

    getReferenceLabel: function(motivatedBy) {
      var s = '🗨';
      motivatedBy = motivatedBy || '';
      //TODO: uriToPrefix
      motivatedBy = (motivatedBy.length > 0 && motivatedBy.slice(0, 4) == 'http' && motivatedBy.indexOf('#') > -1) ? 'oa:' + motivatedBy.substr(motivatedBy.lastIndexOf('#') + 1) : motivatedBy;

      switch(motivatedBy) {
        default: break;
        case 'oa:assessing':  s = '✪'; break;
        case 'oa:commenting': s = '🗨'; break;
        case 'oa:bookmark':   s = '🔖'; break;
        case 'oa:replying':   s = '💬'; break;
        case 'oa:describing': s = '※'; break;
      }

      return s;
    },

    showRefs: function() {
      var refs = document.querySelectorAll('span.ref');
      for (var i = 0; i < refs.length; i++) {
// console.log(this);
        var ref = refs[i].querySelector('mark[id]');
// console.log(ref);
        if (ref) {
          var refId = ref.id;
// console.log(refId);
          var refA = refs[i].querySelectorAll('[class*=ref-] a');
// console.log(refA);
          for (var j = 0; j < refA.length; j++) {
            //XXX: Assuming this is always an internal anchor?
            var noteId = refA[j].getAttribute('href').substr(1);
// console.log(noteId);
            var refLabel = refA[j].textContent;
// console.log(refLabel);

// console.log(refId + ' ' +  refLabel + ' ' + noteId);
            DO.U.positionNote(refId, refLabel, noteId);
          }
        }
      }
    },

    positionNote: function(refId, refLabel, noteId) {
      var ref = document.getElementById(refId);
      var note = document.getElementById(noteId);

      if (note.hasAttribute('style')) {
        note.removeAttribute('style');
      }

      //TODO: If there are articles already in the aside.note , the subsequent top values should come after one another
      var style = [
        'top: ' + Math.ceil(ref.parentNode.offsetTop) + 'px'
      ].join('; ');
      note.setAttribute('style', style);
    },

    positionInteraction: function(noteIRI, containerNode) {
      containerNode = containerNode || document.body;
      var pIRI = uri.getProxyableIRI(noteIRI);

      return graph.getGraph(pIRI)
        .then(
          function(i) {
            var note = i.child(noteIRI);
// console.log(note);
            var id = String(Math.abs(DO.U.hashCode(noteIRI)));
            var refId = 'r-' + id;
            var refLabel = id;

            var datetime = note.schemadatePublished || note.dctermscreated || note.aspublished;
// console.log(datetime);
            var annotatedBy = note.schemacreator || note.dctermscreator || note.asactor;
            var annotatedByIRI;
// console.log(annotatedBy);
            if (annotatedBy && annotatedBy.at(0)) {
              annotatedByIRI = annotatedBy.at(0);
// console.log(annotatedByIRI);
              annotatedBy = i.child(annotatedByIRI);
// console.log(annotatedBy);
            }
            var annotatedByName = auth.getAgentName(annotatedBy);
// console.log(annotatedByName);
            var annotatedByImage = auth.getAgentImage(annotatedBy);
// console.log(annotatedByImage);
            var annotatedByURL = annotatedBy.schemaurl || '';
            annotatedByURL = (annotatedByURL) ? annotatedByURL : undefined;

            var licenseIRI = note.schemalicense || note.dctermsrights || undefined;
// console.log(licenseIRI);

            var motivatedBy = 'oa:replying';

            var bodyText = note.schemadescription;
            if(!bodyText) {
              bodyText = note.dctermsdescription;
              if(!bodyText)  {
                bodyText = note.ascontent;
              }
            }

            var types = note.rdftype;
// console.log(types);
            var resourceTypes = [];
            types.forEach(function(type){
              resourceTypes.push(type);
// console.log(type);
            });

            if(resourceTypes.indexOf('http://www.w3.org/ns/oa#Annotation') > -1) {
              var body = i.child(note.oahasBody);
// console.log(body);
              var bodyLicenseIRI = body.schemalicense || body.dctermsrights || undefined;
// console.log(bodyLicenseIRI);
              bodyText = body.rdfvalue;
// console.log(bodyText);
              var target = i.child(note.oahasTarget);
// console.log(target);
              var targetIRI = target.iri().toString();
// console.log(targetIRI);

              var source = target.oahasSource;
// console.log(source);
// console.log(note.oamotivatedBy);

              if(note.oamotivatedBy) {
                motivatedBy = note.oamotivatedBy;
                refLabel = DO.U.getReferenceLabel(motivatedBy);
              }

              var exact, prefix, suffix;
              var selector = target.oahasSelector;
              if(selector) {
                selector = i.child(selector);
// console.log(selector);

// console.log(selector.rdftype);
// console.log(selector.rdftype._array);
                //FIXME: This is taking the first rdf:type. There could be multiple.
                var selectorTypes;
                if (selector.rdftype && selector.rdftype.at(0)) {
                  selectorTypes = selector.rdftype.at(0);
                }
// console.log(selectorTypes);
                if(selectorTypes == 'http://www.w3.org/ns/oa#TextQuoteSelector') {
                  exact = selector.oaexact;
                  prefix = selector.oaprefix;
                  suffix = selector.oasuffix;
                }
                else if (selectorTypes == 'http://www.w3.org/ns/oa#FragmentSelector') {
                  var refinedBy = i.child(selector["http://www.w3.org/ns/oa#refinedBy"].iri());
                  exact = refinedBy.oaexact;
                  prefix = refinedBy.oaprefix;
                  suffix = refinedBy.oasuffix;
                }
              }
// console.log(exact);
// console.log(prefix);
// console.log(suffix);

              var containerNodeTextContent = containerNode.textContent;
//console.log(containerNodeTextContent);
// console.log(prefix + exact + suffix);
              var selectorIndex = containerNodeTextContent.indexOf(prefix + exact + suffix);
// console.log(selectorIndex);
              if (selectorIndex >= 0) {
                var exactStart = selectorIndex + prefix.length
                var exactEnd = selectorIndex + prefix.length + exact.length;
                var selection = { start: exactStart, end: exactEnd };

                var ref = '<span class="ref do" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark><sup class="ref-annotation"><a rel="cito:hasReplyFrom" href="#' + id + '" resource="' + noteIRI + '">' + refLabel + '</a></sup></span>';

                MediumEditor.selection.importSelection(selection, containerNode, document);

                //XXX: Review
                var selection = window.getSelection();
                var r = selection.getRangeAt(0);
                selection.removeAllRanges();
                selection.addRange(r);
                r.collapse(true);
                var selectedParentNode = r.commonAncestorContainer.parentNode;
                var selectedParentNodeValue = r.commonAncestorContainer.nodeValue;

                var selectionUpdated = DO.U.fragmentFromString(selectedParentNodeValue.substr(0, r.startOffset) + ref + selectedParentNodeValue.substr(r.startOffset + exact.length));

                //XXX: Review. This feels a bit dirty
                for(var i = 0; i < selectedParentNode.childNodes.length; i++) {
                  var n = selectedParentNode.childNodes[i];
                  if (n.nodeType === 3 && n.nodeValue === selectedParentNodeValue) {
                    selectedParentNode.replaceChild(selectionUpdated, n);
                  }
                }

                var resourceIRI = uri.stripFragmentFromString(document.location.href);

                var parentNodeWithId = selectedParentNode.closest('[id]');
                var targetIRI = (parentNodeWithId) ? resourceIRI + '#' + parentNodeWithId.id : resourceIRI;

                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "iri": noteIRI, //e.g., https://example.org/path/to/article
                  "creator": {},
                  "datetime": datetime,
                  "target": {
                    "iri": targetIRI,
                    "source": source,
                    "selector": {
                      "exact": exact,
                      "prefix": prefix,
                      "suffix": suffix
                    }
                    //TODO: state
                  },
                  "body": bodyText,
                  "license": {}
                }
                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (annotatedByURL) {
                  noteData.creator["url"] = annotatedByURL;
                }

                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                }
// console.log(noteData);
                var note = DO.U.createNoteDataHTML(noteData);
                var nES = selectedParentNode.nextElementSibling;
                var asideNote = '\n\
<aside class="note do">\n\
<blockquote cite="' + noteIRI + '">'+ note + '</blockquote>\n\
</aside>\n\
';
                var asideNode = DO.U.fragmentFromString(asideNote);
                var parentSection = MediumEditor.util.getClosestTag(selectedParentNode, 'section')
                || MediumEditor.util.getClosestTag(selectedParentNode, 'div') || MediumEditor.util.getClosestTag(selectedParentNode, 'article');
                parentSection.appendChild(asideNode);
                //XXX: Keeping this comment around for emergency
  //                selectedParentNode.parentNode.insertBefore(asideNode, selectedParentNode.nextSibling);

                if(DO.C.User.IRI) {
                  var noteDelete = document.querySelector('aside.do blockquote[cite="' + noteIRI + '"] article button.delete');
                  if (noteDelete) {
                    noteDelete.addEventListener('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();

                      fetcher.deleteResource(noteIRI)
                        .then(() => {
                          var aside = noteDelete.closest('aside.do')
                          aside.parentNode.removeChild(aside)
                          var span = document.querySelector('span[about="#' + refId + '"]')
                          span.outerHTML = span.querySelector('mark').textContent
                          // TODO: Delete notification or send delete activity
                        })
                    });
                  }
                }
                DO.U.positionNote(refId, refLabel, id);

                //Perhaps return something more useful?
                return noteIRI;
              }

              //XXX: Annotation without a selection
              else {
                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "refLabel": refLabel,
                  "iri": noteIRI,
                  "creator": {},
                  "datetime": datetime,
                  "target": {
                    "iri": targetIRI
                  },
                  "body": bodyText,
                  "license": {}
                };

                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                  noteData.license["name"] = DO.C.License[noteData.license["iri"]].name;
                }
                if (datetime) {
                  noteData.datetime = datetime;
                }
// console.log(noteData)
                DO.U.addInteraction(noteData);
              }
            }
            else {
              var inReplyTo, inReplyToRel;
              if (note.asinReplyTo && note.asinReplyTo.at(0)) {
                inReplyTo = note.asinReplyTo.at(0);
                inReplyToRel = 'as:inReplyTo';
              }
              else if(note.siocreplyof && note.siocreplyof.at(0)) {
                inReplyTo = note.siocreplyof.at(0);
                inReplyToRel = 'sioc:reply_of';
              }

              if(inReplyTo && inReplyTo.indexOf(window.location.origin + window.location.pathname) >= 0) {
                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "refLabel": refLabel,
                  "iri": noteIRI,
                  "creator": {},
                  "inReplyTo": {
                    'iri': inReplyTo,
                    'rel': inReplyToRel
                  },
                  "body": bodyText,
                  "license": {}
                };
                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                }
                if (datetime) {
                  noteData.datetime = datetime;
                }
                DO.U.addInteraction(noteData);
              }
              else {
                console.log('Source is not an oa:Annotation and it is not a reply to');
              }
            }
          },
          function(reason) {
// console.log(reason);
            return reason;
          }
        );
    },

    addInteraction: function(noteData) {
      var interaction = DO.U.createNoteDataHTML(noteData);
      var interactions = document.getElementById('document-interactions');

      if(!interactions) {
        interactions = document.querySelector('main > article') || document.body;
        var interactionsSection = '<section id="document-interactions"><h2>Interactions</h2><div>';
// interactionsSection += '<p class="count"><data about="" datatype="xsd:nonNegativeInteger" property="sioc:num_replies" value="' + interactionsCount + '">' + interactionsCount + '</data> interactions</p>';
        interactionsSection += '</div></section>';
        interactions.insertAdjacentHTML('beforeend', interactionsSection);
      }

      interactions = document.querySelector('#document-interactions > div');
      interactions.insertAdjacentHTML('beforeend', interaction);
    },

    getRDFaPrefixHTML: function(prefixes){
      return Object.keys(prefixes).map(function(i){ return i + ': ' + prefixes[i]; }).join(' ');
    },

    createHTML: function(title, main, options) {
      options = options || {};
      var prefix = ('prefixes' in options && Object.keys(options.prefixes).length > 0) ? ' prefix="' + DO.U.getRDFaPrefixHTML(options.prefixes) + '"' : '';

      return '<!DOCTYPE html>\n\
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">\n\
  <head>\n\
    <meta charset="utf-8" />\n\
    <title>' + title + '</title>\n\
  </head>\n\
  <body' + prefix + '>\n\
    <main>' + main + '\n\
    </main>\n\
  </body>\n\
</html>\n\
';
    },

    createNoteDataHTML: function(n) {
// console.log(n);
      var published = '';
      var license = '';
      var creator = '', authors = '', creatorImage = '', creatorNameIRI = '', creatorURLNameIRI = '';
      var hasTarget = '', annotationTextSelector = '', target = '';
      var heading, hX;
      var aAbout = '', aPrefix = '';
      var noteType = '';
      var body = '';
      var buttonDelete = '';
      var note = '';
      var targetLabel = '';
      var articleClass = '';
      var prefixes = ' prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# schema: http://schema.org/ dcterms: http://purl.org/dc/terms/ oa: http://www.w3.org/ns/oa# as: https://www.w3.org/ns/activitystreams# i: ' + n.iri + '"';

      var motivatedByIRI = n.motivatedByIRI || '';
      var motivatedByLabel = '';
      switch(motivatedByIRI) {
        case 'oa:replying': default:
          motivatedByIRI = 'oa:replying';
          motivatedByLabel = 'replies';
          targetLabel = 'In reply to';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
        case 'oa:assessing':
          motivatedByLabel = 'reviews';
          targetLabel = 'Review of';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
        case 'oa:describing':
          motivatedByLabel = 'describes';
          targetLabel = 'Describes';
          aAbout = '#' + n.id;
          break;
        case 'oa:commenting':
          motivatedByLabel = 'comments';
          targetLabel = 'Comments on';
          aAbout = '#' + n.id;
          break;
        case 'oa:bookmarking':
          motivatedByLabel = 'bookmarks';
          targetLabel = 'Bookmarked';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
      }

      switch(n.mode) {
        default:
          hX = 'h3';
          if ('creator' in n && 'iri' in n.creator && DO.C.User.IRI) {
            buttonDelete = '<button class="delete"><i class="fa fa-trash"></i></button>' ;
          }
          articleClass = ' class="do"';
          break;
        case 'write':
          hX = 'h1';
          break;
      }

      var creatorName = '';
      var creatorIRI = 'i:#agent';
      if ('creator' in n) {
        if ('image' in n.creator) {
          creatorImage = '<img alt="" height="48" rel="schema:image" src="' + n.creator.image + '" width="48" /> ';
        }
        if('iri' in n.creator) {
          creatorIRI = n.creator.iri;
        }
        if('name' in n.creator) {
          creatorName = n.creator.name;
          creatorNameIRI = '<span about="' + creatorIRI + '" property="schema:name">' + creatorName + '</span>';
        }
        else {
          creatorNameIRI = DO.C.SecretAgentNames[Math.floor(Math.random() * DO.C.SecretAgentNames.length)];
        }

        creatorURLNameIRI = ('url' in n.creator) ? '<a href="' + n.creator.url + '" rel="schema:url">' + creatorNameIRI + '</a>' : '<a href="' + creatorIRI + '">' + creatorNameIRI + '</a>';

        creator = '<span about="' + creatorIRI + '" typeof="schema:Person">' + creatorImage + creatorURLNameIRI + '</span>';

        authors = '<dl class="author-name"><dt>Authors</dt><dd><span rel="schema:creator">' + creator + '</span></dd></dl>';
      }

      heading = '<' + hX + ' property="schema:name">' + creatorName + ' <span rel="oa:motivatedBy" resource="' + motivatedByIRI + '">' + motivatedByLabel + '</span></' + hX + '>';

      if ('datetime' in n){
        published = '<dl class="published"><dt>Published</dt><dd><a href="' + n.iri + '"><time datetime="' + n.datetime + '" datatype="xsd:dateTime" property="schema:datePublished" content="' + n.datetime + '">' + n.datetime.substr(0,19).replace('T', ' ') + '</time></a></dd></dl>';
      }

      if (n.license && 'iri' in n.license) {
        license = DO.U.createLicenseHTML(n.license);
      }

      switch(n.type) {
        case 'article': case 'note': case 'bookmark': case 'approve': case 'disapprove': case 'specificity':
          if (typeof n.target !== 'undefined' || typeof n.inReplyTo !== 'undefined') { //note, annotation, reply
            //FIXME: Could resourceIRI be a fragment URI or *make sure* it is the document URL without the fragment?
            //TODO: Use n.target.iri?

            if (typeof n.body !== 'undefined') {
              if(typeof n.body === 'object' && 'purpose' in n.body) {
                if ('describing' in n.body.purpose && 'text' in n.body.purpose.describing) {
                  body += '<section id="note-' + n.id + '" rel="oa:hasBody" resource="i:#note-' + n.id + '"><h2 property="schema:name" rel="oa:hasPurpose" resource="oa:describing">Note</h2><div datatype="rdf:HTML" property="rdf:value schema:description" resource="i:#note-' + n.id + '" typeof="oa:TextualBody">' + n.body.purpose.describing.text + '</div></section>';
                }
                if ('tagging' in n.body.purpose && 'text' in n.body.purpose.tagging) {
                  var tagsArray = [];
                  n.body.purpose.tagging.text.split(',').forEach(function(i){
                    var tag = DO.U.htmlEntities(i.trim());
                    if(tag.length > 0) {
                      tagsArray.push(tag);
                    }
                  });
                  if (tagsArray.length > 0){
                    tagsArray = util.uniqueArray(tagsArray);

                    body += '<dl id="tags" class="tags"><dt>Tags</dt><dd><ul rel="oa:hasBody">';
                    tagsArray.forEach(function(i){
                      body += '<li about="i:#tag-' + DO.U.generateAttributeId(null, i) + '" typeof="oa:TextualBody" property="rdf:value" rel="oa:hasPurpose" resource="oa:tagging" datatype="rdf:HTML">' + i + '</li>';
                    })
                    body += '</ul></dd></dl>';
                  }
                }

              }
              else if (n.body.length > 0) {
                if (n.license && 'iri' in n.license) {
                  license = DO.U.createLicenseHTML(n.license, {rel:'dcterms:rights', label:'Rights'});
                }

                body += '<section id="note-' + n.id + '" rel="oa:hasBody" resource="i:#note-' + n.id + '"><h2 property="schema:name">Note</h2>' + license + '<div datatype="rdf:HTML" property="rdf:value schema:description" resource="i:#note-' + n.id + '" typeof="oa:TextualBody">' + n.body + '</div></section>';
              }
            }

            var targetIRI = '';
            var targetRelation = 'oa:hasTarget';
            if (typeof n.target !== 'undefined' && 'iri' in n.target) {
              targetIRI = n.target.iri;
              var targetIRIFragment = n.target.iri.substr(n.target.iri.lastIndexOf('#'));
              //TODO: Handle when there is no fragment
              if (typeof n.target.selector !== 'undefined') {
                annotationTextSelector = '<div rel="oa:hasSelector" resource="i:#fragment-selector" typeof="oa:FragmentSelector"><dl class="conformsto"><dt>Fragment selector conforms to</dt><dd><a content="' + targetIRIFragment + '" lang="" property="rdf:value" rel="dcterms:conformsTo" resource="https://tools.ietf.org/html/rfc3987" xml:lang="">RFC 3987</a></dd></dl><dl rel="oa:refinedBy" resource="i:#text-quote-selector" typeof="oa:TextQuoteSelector"><dt>Refined by</dt><dd><span lang="en" property="oa:prefix" xml:lang="en">' + n.target.selector.prefix + '</span><mark lang="en" property="oa:exact" xml:lang="en">' + n.target.selector.exact + '</mark><span lang="en" property="oa:suffix" xml:lang="en">' + n.target.selector.suffix + '</span></dd></dl></div>';
              }
            }
            else if(typeof n.inReplyTo !== 'undefined' && 'iri' in n.inReplyTo) {
              targetIRI = n.inReplyTo.iri;
              targetRelation = ('rel' in n.inReplyTo) ? n.inReplyTo.rel : 'as:inReplyTo';
              // TODO: pass document title and maybe author so they can be displayed on the reply too.
            }

            hasTarget = '<a href="' + targetIRI + '" rel="' + targetRelation + '">' + targetLabel + '</a>';
            if (typeof n.target !== 'undefined' && typeof n.target.source !== 'undefined') {
              hasTarget += ' (<a about="' + n.target.iri + '" href="' + n.target.source +'" rel="oa:hasSource" typeof="oa:SpecificResource">part of</a>)';
            }

            target ='<dl class="target"><dt>' + hasTarget + '</dt>';
            if (typeof n.target !== 'undefined' && typeof n.target.selector !== 'undefined') {
              target += '<dd><blockquote about="' + targetIRI + '" cite="' + targetIRI + '">' + annotationTextSelector + '</blockquote></dd>';
            }
            target += '</dl>';

            target += '<dl class="renderedvia"><dt>Rendered via</dt><dd><a about="' + targetIRI + '" href="https://dokie.li/" rel="oa:renderedVia">dokieli</a></dd></dl>';

            var canonicalUUID = DO.U.generateUUID();
            var canonical = '<dl class="canonical"><dt>Canonical</dt><dd about="i:" rel="oa:canonical" resource="urn:uuid:' + canonicalUUID + '">' + canonicalUUID + '</dd></dl>';

            note = '\n\
<article id="' + n.id + '" about="' + aAbout + '" typeof="oa:Annotation' + noteType + '"' + aPrefix + articleClass + '>'+buttonDelete+'\n\
  ' + heading + '\n\
  ' + authors + '\n\
  ' + published + '\n\
  ' + license + '\n\
  ' + canonical + '\n\
  ' + target + '\n\
  ' + body + '\n\
</article>\n\
';
          }
          break;

        case 'ref-footnote':
          var citationURL = (typeof n.citationURL !== 'undefined' && n.citationURL != '') ? '<a href="' + n.citationURL + '" rel="rdfs:seeAlso">' + n.citationURL + '</a>' : '';
          var body = (typeof n.body !== 'undefined' && n.body != '') ? ((citationURL) ? ', ' + n.body : n.body) : '';

          note = '\n\
<dl about="#' + n.id +'" id="' + n.id +'" typeof="oa:Annotation">\n\
  <dt><a href="#' + n.refId + '" rel="oa:hasTarget">' + n.refLabel + '</a><meta rel="oa:motivation" resource="' + motivatedByIRI + '" /></dt>\n\
  <dd rel="oa:hasBody" resource="#n-' + n.id + '"><div datatype="rdf:HTML" property="rdf:value" resource="#n-' + n.id + '" typeof="oa:TextualBody">' + citationURL + body + '</div></dd>\n\
</dl>\n\
';
          break;

        default:
          break;
      }

      return note;
    },

    createLicenseHTML: function(n, options) {
      var license = '';
      var rel = (options && options.rel) ? options.rel : 'schema:license';
      var label = (options && options.label) ? options.label : 'License';

      if (typeof n.iri !== 'undefined') {
        license = '<dl class="' + label.toLowerCase() + '"><dt>' + label + '</dt><dd>';
        if('name' in n) {
          var title = ('description' in n) ? ' title="' + n.description + '"' : '';
          license += '<a href="' + n.iri + '" rel="' + rel + '"' + title + '>' + n.name + '</a>';
        }
        else {
          var licenseName = n.iri, licenseDescription = n.iri;
          if (n.iri in DO.C.License) {
            licenseName = DO.C.License[n.iri].name;
            licenseDescription = DO.C.License[n.iri].description;
          }
          license += '<a href="' + n.iri + '" rel="' + rel + '" title="' + licenseDescription + '">' + licenseName + '</a>';
        }
        license += '</dd></dl>';
      }

      return license;
    },

    createRDFaHTML: function(r) {
      var s = '', property = '', rel = '', resource = '', href = '', content = '', langDatatype = '', typeOf = '';
      var idValue = DO.U.generateAttributeId();
      var id = ' id="' + idValue + '"';

      if ('about' in r && r.about != '') {
        about = ' about="' + r.about + '"';
      }
      else {
        about = ' about="#' + idValue + '"';
      }
      if ('rel' in r && r.rel != '') {
        rel = ' rel="' + r.rel + '"';
      }
      if ('property' in r && r.property != '') {
        property = ' property="' + r.property + '"';
      }
      else {
        //TODO: Figure out how to use user's prefered vocabulary.
        property = ' property="rdfs:label"';
      }
      if ('resource' in r && r.resource != '') {
        resource = ' resource="' + r.resource + '"';
      }
      if ('href' in r && r.href != '') {
        href = ' href="' + r.href + '"';
      }
      if ('content' in r && r.content != '') {
        content = ' content="' + r.content + '"';
      }
      if ('lang' in r && r.lang != '') {
        langDatatype = ' xml:lang="' + r.lang + '" lang="' + r.lang + '"';
      }
      else {
        if ('datatype' in r && r.datatype != '') {
          langDatatype = ' datatype="' + r.datatype + '"';
        }
      }
      if ('typeOf' in r && r.typeOf != '') {
        typeOf = ' typeof="' + r.typeOf + '"';
      }

      var element = (href == '') ? 'span' : 'a';
      s = '<' + element + about + content + href + id + langDatatype + property + rel + resource + typeOf + '>' + r.textContent + '</' + element + '>';

      return s;
    },

    getAnnotationLocationHTML: function() {
      var s = '', inputs = [], checked = '';
      if(typeof DO.C.AnnotationService !== 'undefined') {
        checked = (DO.C.User.Storage && DO.C.User.Storage.length > 0) ? '': ' checked="checked" disabled="disabled"';
        inputs.push('<input type="checkbox" id="annotation-location-service" name="annotation-location-service"' + checked + ' /><label for="annotation-location-service">Annotation service</label>');
      }
      if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
        inputs.push('<input type="checkbox" id="annotation-location-personal-storage" name="annotation-location-personal-storage" checked="checked" /><label for="annotation-location-personal-storage">Personal storage</label>');
      }
      s = 'Store at: ' + inputs.join('');
      return s;
    },

    getLicenseOptionsHTML: function(type) {
      var type = type || 'cc';

      var s = '', selected = '';
      Object.keys(DO.C.License).forEach(function(uri){
        selected = (DO.C.License[uri].name === 'CC BY 4.0') ? ' selected="selected"' : '';
        s += '<option value="' + uri + '" title="' + DO.C.License[uri].description  + '"' + selected + '>' + DO.C.License[uri].name  + '</option>';
      })

      return s;
    },

    getCitationOptionsHTML: function(type) {
      var type = type || 'cites';

      var s = '';
      Object.keys(DO.C.Citation).forEach(function(uri){
        s += '<option value="' + uri + '">' + DO.C.Citation[uri]  + '</option>';
      })

      return s;
    },

    initMath: function(config) {
      if (!DO.C.MathAvailable) { return; }

      config = config || {
        skipTags: ["script","noscript","style","textarea","pre","code", "math"],
        ignoreClass: "equation",
        MathML: {
          useMathMLspacing: true
        },
        tex2jax: {
          inlineMath: [["$","$"],["\\(","\\)"]],
          processEscapes: true
        },
        asciimath2jax: {
          delimiters: [['$','$'], ['`','`']]
        }
      }

      MathJax.Hub.Config(config);

      MathJax.Hub.Register.StartupHook("End Jax",function () {
        var BROWSER = MathJax.Hub.Browser;
        var jax = "SVG";
        if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
        if (BROWSER.isFirefox) jax = "NativeMML";
        if (BROWSER.isSafari && BROWSER.versionAtLeast("5.0")) jax = "NativeMML";

        MathJax.Hub.setRenderer(jax);
      });

    },

    Editor: {
      disableEditor: function(e) {
    //    _mediumEditors[1].destroy();
        DO.C.EditorEnabled = false;
        document.removeEventListener('click', DO.U.updateDocumentTitle);
        return DO.U.Editor.MediumEditor.destroy();
      },

      enableEditor: function(editorMode, e, selector) {
        selector = selector || 'main > article';

        if (typeof DO.U.Editor.MediumEditor !== 'undefined') {
          DO.U.Editor.disableEditor();
        }

        if (!document.getElementById('document-editor')) {
          document.body.insertAdjacentHTML('beforeend', '<aside id="document-editor" class="do"></aside>');
        }

        var editorOptions = {
          author: {
            id: 'author',
            elementsContainer: document.getElementById('document-editor'),
            placeholder: {
              text: ["Make it so!", "This is not a Paper", "Cogito Ergo Sum", "Do One Thing and Do It Well", "Free Your Mind", "Do or Do Not"][Math.floor(Math.random() * 6)]
            },
            disableDoubleReturn: true,
            paste: {
              forcePlainText: false,
              cleanPastedHTML: true,
              cleanReplacements: [],
              cleanAttrs: ['class', 'style', 'dir'],
              cleanTags: ['area', 'basefont', 'br', 'font', 'hr', 'isindex', 'link', 'script', 'style', 'wbr']
            },
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['h2', 'h3', 'h4', 'em', 'strong', 'orderedlist', 'unorderedlist', 'code', 'pre', 'image', 'anchor', 'q', 'sparkline', 'rdfa', 'cite', 'note'],
              diffLeft: 0,
              diffTop: -10,
              allowMultiParagraphSelection: false
            },
            anchorPreview: false,
            extensions: {
              'h2': new DO.U.Editor.Button({action:'h2', label:'h2'}),
              'h3': new DO.U.Editor.Button({action:'h3', label:'h3'}),
              'h4': new DO.U.Editor.Button({action:'h4', label:'h4'}),
              'em': new DO.U.Editor.Button({action:'em', label:'em'}),
              'strong': new DO.U.Editor.Button({action:'strong', label:'strong'}),
              'code': new DO.U.Editor.Button({action:'code', label:'code'}),
              'q': new DO.U.Editor.Button({action:'q', label:'q'}),
              'sparkline': new DO.U.Editor.Note({action:'sparkline', label:'sparkline'}),
              'rdfa': new DO.U.Editor.Note({action:'rdfa', label:'rdfa'}),
              'cite': new DO.U.Editor.Note({action:'cite', label:'cite'}),
              'note': new DO.U.Editor.Note({action:'note', label:'note'})
            }
          },

          social: {
            id: 'social',
            elementsContainer: document.getElementById('document-editor'),
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['share', 'approve', 'bookmark', 'note'],
              allowMultiParagraphSelection: false
            },
            disableEditing: true,
            anchorPreview: false,
            extensions: {
              'note': new DO.U.Editor.Note({action:'article', label:'note'}),
              'bookmark': new DO.U.Editor.Note({action:'bookmark', label:'bookmark'}),
              'share': new DO.U.Editor.Note({action:'share', label:'share'}),
              'approve': new DO.U.Editor.Note({action:'approve', label:'approve'})
            }
          },

          review: {
            id: 'review',
            elementsContainer: document.getElementById('document-editor'),
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['approve', 'disapprove', 'specificity'],
              allowMultiParagraphSelection: false
            },
            disableEditing: true,
            anchorPreview: false,
            extensions: {
              'approve': new DO.U.Editor.Note({action:'approve', label:'approve'}),
              'disapprove': new DO.U.Editor.Note({action:'disapprove', label:'disapprove'}),
              'specificity': new DO.U.Editor.Note({action:'specificity', label:'specificity'})
            }
          }
        };

        if('MathJax' in window) {
          editorOptions.author.extensions['math'] = new DO.U.Editor.Button({action:'math', label:'math'});
          editorOptions.author.toolbar.buttons.splice(7, 0, 'math');
        }

        if('MediumEditorTable' in window) {
          editorOptions.author.extensions['table'] = new MediumEditorTable();
          editorOptions.author.toolbar.buttons.splice(10, 0, 'table');
        }

        var eNodes = document.querySelector(selector) || document.body;
        var eOptions = editorOptions[editorMode];
        DO.C.User.Role = editorMode;

        if (typeof MediumEditor !== 'undefined') {
          DO.U.Editor.MediumEditor = new MediumEditor(eNodes, eOptions);
          DO.C.EditorEnabled = true;

          if(editorMode == 'author') {
            document.addEventListener('click', DO.U.updateDocumentTitle);
          }

          document.querySelectorAll('.do').forEach(function(node){
            node.setAttribute('contenteditable', 'false');
          })

          return DO.U.Editor.MediumEditor;
        }
      },

      Button: (function () {
        if (typeof MediumEditor !== 'undefined') {
          return MediumEditor.extensions.button.extend({
            init: function () {
              this.name = this.label;
              this.action = this.action;
              this.aria = this.label;
              this.tagNames = [this.action];
              this.useQueryState = true;
              this.contentDefault = '<b>' + this.label + '</b>';

              switch(this.action) {
                case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': this.contentFA = '<i class="fa fa-header">' + parseInt(this.action.slice(-1)) + '</i>'; break;
                case 'em': this.contentFA = '<i class="fa fa-italic"></i>'; break;
                case 'strong': this.contentFA = '<i class="fa fa-bold"></i>'; break;
                case 'q': this.contentFA = '<i class="fa fa-quote-right"></i>'; break;
                case 'math': this.contentFA = '<i class="fa fa-calculator"></i>'; break;
                default: break;
              }

              this.button = this.createButton();
              this.on(this.button, 'click', this.handleClick.bind(this));

              //TODO: Listen to section hX changes and update section @id and span @class do.fragment
            },

            // getButton: function() {
            //   console.log('DO.U.Editor.Button.Note.getButton()');
            //   return this.button;
            // },

            handleClick: function(event) { //, editable
        //console.log('DO.U.Editor.Button.handleClick()');
// console.log(this);
              event.preventDefault();
              event.stopPropagation();

              var action = this.getAction();
              var tagNames = this.getTagNames();
              var button = this.getButton();

              if (this.isActive()) {
                return this.base.execAction('removeFormat');
              }
              else {
                var datetime = ' ' + DO.U.createAttributeDateTime(this.action);

                this.base.selectedDocument = this.document;
                this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument);
                //.replace(DO.C.Editor.regexEmptyHTMLTags, '');
// console.log('this.base.selection:');
// console.log(this.base.selection);

                var selectedParentElement = this.base.getSelectedParentElement();
// console.log('getSelectedParentElement:');
// console.log(selectedParentElement);
                var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
// console.log(parentSection);

                //XXX: DO NOT REMOVE. Saving the selection should be before inserting/updating HTML.
                this.base.saveSelection();

                switch(this.action) {
                  case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                    //XXX: Which heading level are we at?
                    var parentSectionHeading = '';
                    for (var i = 0; i < parentSection.childNodes.length; i++) {
                      parentSectionHeading = parentSection.childNodes[i].nodeName.toLowerCase();
                      if(DO.C.Editor.headings.indexOf(parentSectionHeading) > 0) {
// console.log(parentSectionHeading);
                        break;
                      }
                    }
                    var pSH = parseInt(parentSectionHeading.slice(-1));

                    //XXX: Which heading level is the action?
                    var cSH = parseInt(this.action.slice(-1));
// console.log("parentH: " + pSH);
// console.log("currentH: " + cSH);
// console.log(cSH-pSH);

                    var closePreviousSections = '';
                    // if (cSH > pSH) {}
                    for (i = 0; i <= (pSH-cSH); i++) {
                      console.log("i: " + i);
                      closePreviousSections += '</div></section>';
                    }
// console.log(closePreviousSections);
// console.log(this.base.selection);
// var doc = this.document;
                    var selection = window.getSelection();
// console.log(this.base.selection);
// console.log(selection);

                    if (selection.rangeCount) {
                      range = selection.getRangeAt(0);
                      parent = selectedParentElement;

// console.log(range);
                      //Section
                      var sectionId = DO.U.generateAttributeId(null, this.base.selection);
                      var section = document.createElement('section');
                      section.id = sectionId;
                      section.setAttribute('rel', 'schema:hasPart');
                      section.setAttribute('resource', '#' + sectionId);
// console.log(section);


                      //Heading
                      var heading = document.createElement(tagNames[0]);
                      heading.setAttribute('property', 'schema:name');
                      heading.innerHTML = this.base.selection;
// console.log(heading);
// console.log(selection);


                      var divDescription = parentSection.getElementsByTagName('div')[0];
// console.log(divDescription);
// console.log(divDescription.innerHTML);
// console.log(divDescription.childNodes);
// console.log(divDescription.length);
// console.log(selectedParentElement);
// console.log(selectedParentElement.childNodes);
// console.log(selectedParentElement.lastChild);
// console.log(selectedParentElement.lastChild.length);

                      r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
                      //Remaining nodes
                      var r = document.createRange();
                      r.setStart(selection.focusNode, selection.focusOffset);
                      r.setEnd(selectedParentElement.lastChild, selectedParentElement.lastChild.length);
// console.log(r.commonAncestorContainer.nodeType);

// console.log(r.startContainer);
// console.log(r.endContainer);
// console.log(selection.anchorNode);
// selection.removeAllRanges(); //XXX: is this doing anything?
// selection.addRange(r);

// console.log(selection.anchorNode);
                      var fragment = r.extractContents();
// console.log(fragment);
// console.log(selection);
// r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
                      if (fragment.firstChild.nodeType === 3) {
                        //TODO: trim only if there is one child which is a textnode
                        // fragment.firstChild.nodeValue = fragment.firstChild.nodeValue.trim();

// console.log(fragment);
                        var sPE = selectedParentElement.nodeName.toLowerCase();
                        switch(sPE) {
                          case "p": default:
                            var xSPE = document.createElement(sPE);
                            xSPE.appendChild(fragment.cloneNode(true));
                            fragment = DO.U.fragmentFromString(xSPE.outerHTML);
                            break;
                          //TODO: Other cases?
                        }
                      }
// console.log(fragment);
// console.log(selection);

                      r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
// var remainingNodes = document.createElement('div');
// remainingNodes.appendChild(fragment.cloneNode(true));
// console.log(remainingNodes);


                      //Description
                      var div = document.createElement('div');
                      div.setAttribute('property', 'schema:description');
                      div.appendChild(fragment.cloneNode(true));

                      //Put it together
                      section.appendChild(heading);
                      section.appendChild(div);
// console.log(range.startContainer);

                      var selectionUpdated = document.createElement('div');
                      selectionUpdated.appendChild(section);
                      selectionUpdated = selectionUpdated.innerHTML;
// console.log(selectionUpdated);
// range.deleteContents();
// MediumEditor.util.insertHTMLCommand(this.document, closePreviousSections);
// MediumEditor.extensions.paste(closePreviousSections);

                      //Sub-section
                      if (cSH-pSH > 0) {
                        MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                        // This doesn't seem to be needed anymore?
                        // MediumEditor.selection.select(this.base.selectedDocument, heading, 0);
                      }
                      else {
// console.log(selection);
// console.log(parentSection);
                        MediumEditor.selection.selectNode(parentSection, document);
                        r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startOffset);
// console.log(r.endOffset);


                        //This selection is based off previous operations; handling remaining Nodes after the selection. So, this is not accurate per se.. the range might be accurate.
                        selection = window.getSelection();
// console.log(selection);
                        r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startOffset);
// console.log(r.endOffset);


                        r = document.createRange();
                        r.setStartAfter(parentSection);
// console.log(r);
                        r.setEndAfter(parentSection);
// console.log(r);
                        r.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(r);
// console.log(selection);
                        var foo = document.createElement('div');
                        foo.appendChild(parentSection);
                        parentSection = foo.innerHTML;
// console.log(parentSection + selectionUpdated);
                        MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, parentSection + selectionUpdated);

                        // MediumEditor.selection.select(this.base.selectedDocument, heading, 0);
                        // parentSection.parentNode.insertBefore(section, parentSection.nextSibling);
                      }
                    }

                    this.base.restoreSelection();
                    this.base.checkSelection();
                    break;

                  case 'math':
                    var QUEUE = MathJax.Hub.Queue;  // shorthand for the queue
                    var math = null;                // the element jax for the math output.

                    var selection = this.base.selection;

                    var selectionId = DO.U.generateAttributeId();

                    var selectionUpdated = '<span id="' + selectionId + '">$$</span>';

                    MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, selectionId]);
                    var math = MathJax.Hub.getAllJax(selectionId)[0];
                    MathJax.Hub.Queue(["Text", math, selection]);

                    MediumEditor.selection.selectNode(document.getElementById(selectionId), document);
                    break;

                  default:
                    var selectionUpdated = '<' + tagNames[0] + datetime + '>' + this.base.selection + '</' + tagNames[0] + '>';
                    MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);
                    this.base.restoreSelection();
                    this.base.checkSelection();

                    break;
                }

                this.setActive();
              }
            }
          });
        }
      })(),

      //Adapted from MediumEditor's Anchor Form
      Note: (function() {
        if (typeof MediumEditor !== 'undefined') {
          return MediumEditor.extensions.form.extend({
            /* Textarea Form Options */

            /* customClassOption: [string]  (previously options.anchorButton + options.anchorButtonClass)
             * Custom class name the user can optionally have added to their created links (ie 'button').
             * If passed as a non-empty string, a checkbox will be displayed allowing the user to choose
             * whether to have the class added to the created link or not.
             */
            customClassOption: null,

            /* customClassOptionText: [string]
             * text to be shown in the checkbox when the __customClassOption__ is being used.
             */
            customClassOptionText: 'Button',

            /* linkValidation: [boolean]  (previously options.checkLinkFormat)
             * enables/disables check for common URL protocols on anchor links.
             */
            linkValidation: false,

            /* placeholderText: [string]  (previously options.anchorInputPlaceholder)
             * text to be shown as placeholder of the anchor input.
             */
            placeholderText: "What’s up?",

            /* targetCheckbox: [boolean]  (previously options.anchorTarget)
             * enables/disables displaying a "Open in new window" checkbox, which when checked
             * changes the `target` attribute of the created link.
             */
            targetCheckbox: false,

            /* targetCheckboxText: [string]  (previously options.anchorInputCheckboxLabel)
             * text to be shown in the checkbox enabled via the __targetCheckbox__ option.
             */
            targetCheckboxText: 'Open in new window',

            // Options for the Button base class
            // name: this.name,
            // action: 'createLink',
            // aria: 'link',
            // tagNames: ['a'],
            // contentDefault: '<b>#</b>',
            // contentFA: '<i class="fa fa-sticky-note"></i>',

            init: function () {
              this.name = this.label;
              this.action = this.action;
              this.aria = this.label;
              this.tagNames = [this.action];
              this.useQueryState = true;
              this.contentDefault = '<b>' + this.label + '</b>';
              this.signInRequired = false;

              switch(this.action) {
                case 'cite': default:
                  this.contentFA = '<i class="fa fa-hashtag"></i>';
                  break;
                case 'article':
                  this.contentFA = '<i class="fa fa-sticky-note"></i>';
                  this.signInRequired = true;
                  break;
                case 'note':
                  this.contentFA = '<i class="fa fa-sticky-note"></i>';
                  break;
                case 'rdfa':
                  this.contentFA = '<i class="fa fa-rocket"></i>';
                  break;
                case 'bookmark':
                  this.contentFA = '<i class="fa fa-bookmark"></i>';
                  this.signInRequired = true;
                  break;
                case 'share':
                  this.contentFA = '<i class="fa fa-bullhorn"></i>';
                  this.signInRequired = true;
                  break;
                case 'approve':
                  this.contentFA = '<i class="fa fa-thumbs-up"></i>';
                  this.signInRequired = true;
                  break;
                case 'disapprove':
                  this.contentFA = '<i class="fa fa-thumbs-down"></i>';
                  this.signInRequired = true;
                  break;
                case 'specificity':
                  this.contentFA = '<i class="fa fa-crosshairs"></i>';
                  this.signInRequired = true;
                  break;
                case 'sparkline':
                  this.contentFA = '<i class="fa fa-line-chart"></i>';
                  break;
              }
              MediumEditor.extensions.form.prototype.init.apply(this, arguments);

        //TODO: Change this bind key
        //      this.subscribe('editableKeydown', this.handleKeydown.bind(this));
        //      this.on(this.button, 'click', this.handleClick.bind(this));
            },

            // Called when the button the toolbar is clicked
            // Overrides ButtonExtension.handleClick
            handleClick: function (event) {
              event.preventDefault();
              event.stopPropagation();
              var _this = this;
              var showAction = function() {
                switch(_this.action) {
                  default:
                    var range = MediumEditor.selection.getSelectionRange(_this.document);

                    if (range.startContainer.nodeName.toLowerCase() === 'a' ||
                      range.endContainer.nodeName.toLowerCase() === 'a' ||
                      MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(range), 'a')) {
                      return _this.execAction('unlink');
                    }

                    if (_this.action == 'approve' && DO.U.Editor.MediumEditor.options.id == 'social'){
                      var opts = {
                        license: 'https://creativecommons.org/licenses/by/4.0/',
                        content: 'Liked'
                      }
                      _this.completeFormSave(opts);
                    }
                    else if (!_this.isDisplayed()) {
                      _this.showForm();
                    }
                    break;

                  case 'share':
                    _this.base.restoreSelection();
                    var resourceIRI = uri.stripFragmentFromString(document.location.href);
                    var id = _this.base.getSelectedParentElement().closest('[id]').id;
                    resourceIRI = (id) ? resourceIRI + '#' + id : resourceIRI;
                    _this.window.getSelection().removeAllRanges();
                    _this.base.checkSelection();
                    DO.U.shareResource(null, resourceIRI);
                    break;
                }
              };

              var updateAnnotationServiceForm = function() {
                var annotationServices = document.querySelectorAll('.annotation-location-selection');
                for (var i = 0; i < annotationServices.length; i++) {
                  annotationServices[i].innerHTML = DO.U.getAnnotationLocationHTML();
                }
              };

              return inbox.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
                function(url) {
                  DO.C.AnnotationService = url[0];
                  updateAnnotationServiceForm();
                  showAction();
                },
                function(reason) {
                  if(_this.signInRequired && !DO.C.User.IRI) {
                    DO.U.showUserIdentityInput();
                  }
                  else {
                    updateAnnotationServiceForm();
                    showAction();
                  }
                }
              );
            },

            // Called when user hits the defined shortcut (CTRL / COMMAND + K)
            handleKeydown: function (event) {
              if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.K) && MediumEditor.util.isMetaCtrlKey(event) && !event.shiftKey) {
                this.handleClick(event);
              }
            },

            // Called by medium-editor to append form to the toolbar
            getForm: function () {
              if (!this.form) {
                this.form = this.createForm();
              }
              return this.form;
            },

            getTemplate: function () {
              var template = [];
              switch(this.action) {
                case 'rdfa':
                  template = [
                  '<label for="rdfa-about">about</label><input id="rdfa-about" class="medium-editor-toolbar-input" placeholder="https://example.org/foo#bar" /><br/>',
                  '<label for="rdfa-resource">resource</label><input id="rdfa-resource" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-typeof">typeof</label><input id="rdfa-typeof" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-rel">rel</label><input id="rdfa-rel" class="medium-editor-toolbar-input" placeholder="schema:url"><br/>',
                  '<label for="rdfa-property">property</label><input id="rdfa-property" class="medium-editor-toolbar-input" placeholder="schema:name" /><br/>',
                  '<label for="rdfa-href">href</label><input id="rdfa-href" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-content">content</label><input id="rdfa-content" class="medium-editor-toolbar-input" placeholder="Baz" /><br/>',
                  '<label for="rdfa-datatype">datatype</label><input id="rdfa-datatype" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>'
                  ];
                  break;
                case 'article':
                  template = [
                  '<textarea id="article-content" name="content" cols="20" rows="5" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>',
                  '<select id="article-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'note':
                  template = [
                  '<label for="bookmark-tagging">Tags</label> <input id="bookmark-tagging" class="medium-editor-toolbar-input" placeholder="Separate tags with commas" /><br/>',
                  '<textarea id="article-content" name="content" cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>',
                  '<select id="article-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>'
                  ];
                  break;
                case 'approve':
                  template = [
                  '<textarea id="approve-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Strong point? Convincing argument?"></textarea>',
                  '<select id="approve-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'disapprove':
                  template = [
                  '<textarea id="disapprove-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Weak point? Error? Inaccurate?"></textarea>',
                  '<select id="disapprove-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'specificity':
                  template = [
                  '<textarea id="specificity-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Citation or specificity needed?"></textarea>',
                  '<select id="specificity-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'cite':
                  template = [
                  '<input type="radio" name="citation-type" value="ref-footnote" id="ref-footnote" /> <label for="ref-footnote">Footnote</label>',
                  '<input type="radio" name="citation-type" value="ref-reference" id="ref-reference" /> <label for="ref-reference">Reference</label>',
                  '<select id="citation-relation" name="citation-relation" class="medium-editor-toolbar-select">',
                  DO.U.getCitationOptionsHTML(),
                  '</select>',
                  '<input type="text" name="citation-url" value="" id="citation-url" class="medium-editor-toolbar-input" placeholder="http://example.org/article#results" />',
                  '<textarea id="citation-content" cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                  ];
                  break;
                case 'bookmark':
                  template = [
                  '<label for="bookmark-tagging">Tags</label> <input id="bookmark-tagging" class="medium-editor-toolbar-input" placeholder="Separate tags with commas" /><br/>',
                  '<textarea id="bookmark-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Description"></textarea>'
                  ];
                  break;
                case 'sparkline':
                  template = [
                  '<input type="text" name="sparkline-search" value="" id="sparkline-search" class="medium-editor-toolbar-input" placeholder="Enter search terms" /><br/>',
                  '<input type="hidden" name="sparkline-selection-dataset" value="" id="sparkline-selection-dataset" />',
                  '<input type="hidden" name="sparkline-selection-refarea" value="" id="sparkline-selection-refarea" />'
                  ];
                  break;
                default:
                  template = [
                  '<textarea cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                  ];
                  break;
              }

              template.push(
                '<a href="#" class="medium-editor-toolbar-save" title="Save">',
                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : this.formSaveLabel,
                '</a>'
              );

              template.push(
                '<a href="#" class="medium-editor-toolbar-close" title="Close">',
                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : this.formCloseLabel,
                '</a>'
              );

              // both of these options are slightly moot with the ability to
              // override the various form buildup/serialize functions.

              if (this.targetCheckbox) {
                // fixme: ideally, this targetCheckboxText would be a formLabel too,
                // figure out how to deprecate? also consider `fa-` icon default implcations.
                template.push(
                  '<div class="medium-editor-toolbar-form-row">',
                  '<input type="checkbox" class="medium-editor-toolbar-textarea-target">',
                  '<label>',
                  this.targetCheckboxText,
                  '</label>',
                  '</div>'
                );
              }

              if (this.customClassOption) {
                // fixme: expose this `Button` text as a formLabel property, too
                // and provide similar access to a `fa-` icon default.
                template.push(
                  '<div class="medium-editor-toolbar-form-row">',
                  '<input type="checkbox" class="medium-editor-toolbar-textarea-button">',
                  '<label>',
                  this.customClassOptionText,
                  '</label>',
                  '</div>'
                );
              }

              return template.join('');

            },

            // Used by medium-editor when the default toolbar is to be displayed
            isDisplayed: function () {
              return this.getForm().style.display === 'block';
            },

            hideForm: function () {
              this.getForm().style.display = 'none';
              this.getInput().value = '';
            },

            showForm: function (opts) {
              var _this = this;
              var input = this.getInput(),
                targetCheckbox = this.getAnchorTargetCheckbox(),
                buttonCheckbox = this.getAnchorButtonCheckbox();

              opts = opts || { url: '' };
              // TODO: This is for backwards compatability
              // We don't need to support the 'string' argument in 6.0.0
              if (typeof opts === 'string') {
                opts = {
                  url: opts
                };
              }

              var initialSelectedParentElement = this.base.getSelectedParentElement();
              var initialSelectionState = MediumEditor.selection.exportSelection(initialSelectedParentElement, this.document);

              //XXX: Get this before getForm.
              var selection = MediumEditor.selection.getSelectionHtml(this.document).trim();
              this.base.saveSelection();
              this.hideToolbarDefaultActions();
              var form = this.getForm();
              form.style.display = 'block';
              this.setToolbarPosition();

              input.value = opts.url;

              switch(this.action) {
                case 'rdfa':
                  input.about.focus();
                  break;
                case 'article': case 'note': case 'approve': case 'disapprove': case 'specificity':
                  input.content.focus();
                  break;
                case 'cite':
                  input.url.focus();
                  document.querySelector('.medium-editor-toolbar-form input[name="citation-type"]').checked = true;
                  break;
                case 'sparkline':
                  input.search.focus();
                  input.search.value = selection;

                  var inputSearch = function(e){
                    if(e.which == 13) {
                      e.preventDefault();
                      e.stopPropagation();
                      _this.base.restoreSelection();
                      MediumEditor.util.insertHTMLCommand(document, e.target.value);
                      var selection = { start: initialSelectionState.start, end: (initialSelectionState.start + e.target.value.length) };
                      MediumEditor.selection.importSelection(selection, initialSelectedParentElement, document);
                      _this.base.checkSelection();
                      e.target.setAttribute('data-event-keyup-enter', true);
                      _this.showForm();
                      return;
                    }
                  }
                  if(!input.search.getAttribute('data-event-keyup-enter')) {
                    input.search.addEventListener('keyup', inputSearch, false);
                  }

                  var sparqlEndpoint = 'http://worldbank.270a.info/';
                  var resourceType = '<http://purl.org/linked-data/cube#DataSet>';
                  var sparklineGraphId = 'sparkline-graph';
                  var resultContainerId = 'sparkline-select';
                  //TODO: This should be from user's preference?
                  var lang = 'en';

                  //TODO: What's the best way for user input? ' of '
                  var textInputA = selection.split(' of ')[0];
                  var textInputB = selection.substr(selection.indexOf(' of ') + 4);

                  if(!DO.C.RefAreas[textInputB.toUpperCase()]) {
                    Object.keys(DO.C.RefAreas).forEach(function(key) {
                      if(DO.C.RefAreas[key].toLowerCase() == textInputB.toLowerCase()) {
                        textInputB = key;
                      }
                    });
                  }

                  var sG = document.getElementById(sparklineGraphId);
                  if(sG) {
                    sG.parentNode.removeChild(sG);
                  }

                  if(!DO.C.RefAreas[textInputB.toUpperCase()]) {
                    var refAreas;
                    Object.keys(DO.C.RefAreas).forEach(function(key) {
                      refAreas += '<option value="' + key + '">' + key + ' - ' + DO.C.RefAreas[key] + '</option>';
                    });
                    form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<div id="' + sparklineGraphId + '">`' + textInputB + '` is not available. Try: ' + '<select name="refAreas"><option>Select a reference area</option>' + refAreas + '</select></div>');
                    var rA = document.querySelector('#' + sparklineGraphId + ' select[name="refAreas"]');
                    rA.addEventListener('change', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      textInputB = e.target.value;
                      input.search.value = textInputA + ' of ' + textInputB;
                      form.querySelector('#sparkline-selection-dataset').value = textInputA;
                      form.querySelector('#sparkline-selection-refarea').value = textInputB;

                      _this.base.restoreSelection();
                      MediumEditor.util.insertHTMLCommand(document, input.search.value);
                      var selection = { start: initialSelectionState.start, end: (initialSelectionState.start + input.search.value.length) };
                      MediumEditor.selection.importSelection(selection, initialSelectedParentElement, document);
                      _this.base.checkSelection();
                      _this.showForm();
                    });
                    return;
                  }

                  var options = {};
                  options.filter = {
                    dimensionProperty: 'sdmx-dimension:refArea',
                    dimensionRefAreaNotation: textInputB
                  };
                  options.optional = { prefLabels: ["dcterms:title"] };

                  var queryURL = DO.U.SPARQLQueryURL.getResourcesOfTypeWithLabel(sparqlEndpoint, resourceType, textInputA.toLowerCase(), options);

                  queryURL = uri.getProxyableIRI(queryURL);

                  form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<div id="' + sparklineGraphId + '"></div><i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
                  sG = document.getElementById(sparklineGraphId);

                  DO.U.getTriplesFromGraph(queryURL)
                    .then(function(triples){
                      sG.removeAttribute('class');
                      triples = DO.U.sortTriples(triples, { sortBy: 'object' });
                      return DO.U.getListHTMLFromTriples(triples, {element: 'select', elementId: resultContainerId});
                    })
                    .then(function(listHTML){
                      sG.innerHTML = listHTML;
                      form.removeChild(form.querySelector('.fa.fa-circle-o-notch.fa-spin'));
                    })
                    .then(function(x){
                      var rC = document.getElementById(resultContainerId);
                      rC.addEventListener('change', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var sparkline = sG.querySelectorAll('.sparkline, .sparkline-info');
                        for (var i = 0; i < sparkline.length; i++) {
                          sparkline[i].parentNode.removeChild(sparkline[i]);
                        }
                        form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

                        var dataset = e.target.value;
                        var title = e.target.querySelector('*[value="' + e.target.value + '"]').textContent.trim();
                        //XXX: Should this replace the initial search term?
                        form.querySelector('#sparkline-selection-dataset').value = title;
                        form.querySelector('#sparkline-selection-refarea').value = textInputB.toUpperCase();

                        var refArea = textInputB.toUpperCase();
                        var paramDimension = "\n\
  ?propertyRefArea rdfs:subPropertyOf* sdmx-dimension:refArea .\n\
  ?observation ?propertyRefArea [ skos:notation '" + refArea + "' ] .";

// console.log(dataset);
// console.log(refArea);
                        var queryURL = DO.U.SPARQLQueryURL.getObservationsWithDimension(sparqlEndpoint, dataset, paramDimension);
// console.log(queryURL);
                        queryURL = uri.getProxyableIRI(queryURL);

                        DO.U.getTriplesFromGraph(queryURL)
                          .then(function(triples){
// console.log(triples);
                            if(triples.length > 0) {
                              var observations = {};
                              triples.forEach(function(t){
                                var s = t.subject.nominalValue;
                                var p = t.predicate.nominalValue;
                                var o = t.object.nominalValue;
                                observations[s] = observations[s] || {};
                                observations[s][p] = o;
                              });
// console.log(observations);
                              var list = [], item;
                              Object.keys(observations).forEach(function(key) {
                                item = {};
                                observations[key]['http://purl.org/linked-data/cube#Observation'] = key;
                                item[key] = observations[key];
                                list.push(item[key]);
                              });
                              var sortByKey = 'http://purl.org/linked-data/sdmx/2009/dimension#refPeriod';
                              list.sort(function (a, b) {
                                return a[sortByKey].toLowerCase().localeCompare(b[sortByKey].toLowerCase());
                              });
// console.log(list);
                              var options = {
                                url: dataset,
                                title: title ,
                                cssStroke: '#000'
                              };
                              var sparkline = DO.U.getSparkline(list, options);
                              sG.insertAdjacentHTML('beforeend', '<span class="sparkline">' + sparkline + '</span> <span class="sparkline-info">' + triples.length + ' observations</span>');
                                form.removeChild(form.querySelector('.fa.fa-circle-o-notch.fa-spin'));
                            }
                            else {
                              //This shouldn't happen.
                              sG.insertAdjacentHTML('beforeend', '<span class="sparkline-info">0 observations. Select another.</span>');
                            }
                          });
                      });
                    });
                  break;
                case 'bookmark':
                  input.content.focus();
                  break;
                default:
                  input.focus();
                  break;
              }

              // If we have a target checkbox, we want it to be checked/unchecked
              // based on whether the existing link has target=_blank
              if (targetCheckbox) {
                targetCheckbox.checked = opts.target === '_blank';
              }

              // If we have a custom class checkbox, we want it to be checked/unchecked
              // based on whether an existing link already has the class
              if (buttonCheckbox) {
                var classList = opts.buttonClass ? opts.buttonClass.split(' ') : [];
                buttonCheckbox.checked = (classList.indexOf(this.customClassOption) !== -1);
              }
            },

            // Called by core when tearing down medium-editor (destroy)
            destroy: function () {
              if (!this.form) {
                return false;
              }

              if (this.form.parentNode) {
                this.form.parentNode.removeChild(this.form);
              }

              delete this.form;
            },

            // core methods

            getFormOpts: function () {
              // no notion of private functions? wanted `_getFormOpts`
              var targetCheckbox = this.getAnchorTargetCheckbox(),
                buttonCheckbox = this.getAnchorButtonCheckbox();
              var opts = {};

              switch(this.action) {
                case 'rdfa':
                  opts.about = this.getInput().about.value;
                  opts.rel = this.getInput().rel.value;
                  opts.href = this.getInput().href.value;
                  opts.typeOf = this.getInput().typeOf.value;
                  opts.resource = this.getInput().resource.value;
                  opts.property = this.getInput().property.value;
                  opts.content = this.getInput().content.value;
                  opts.datatype = this.getInput().datatype.value;
                  break;
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  opts.content = this.getInput().content.value;
                  var aLS = this.getInput().annotationLocationService;
                  if(aLS) { opts.annotationLocationService = aLS.checked };
                  var aLPS = this.getInput().annotationLocationPersonalStorage;
                  if(aLPS) { opts.annotationLocationPersonalStorage = aLPS.checked };
                  opts.license = this.getInput().license.value;
                  break;
                case 'note':
                  opts.content = this.getInput().content.value;
                  opts.tagging = this.getInput().tagging.value;
                  opts.license = this.getInput().license.value;
                  break;
                case 'cite':
                  opts.citationType = this.getInput().citationType.value;
                  opts.citationRelation = this.getInput().citationRelation.value;
                  opts.url = this.getInput().url.value;
                  opts.content = this.getInput().content.value;
                  break;
                case 'bookmark':
                  opts.content = this.getInput().content.value;
                  opts.tagging = this.getInput().tagging.value;
                  break;
                case 'sparkline':
                  opts.search = this.getInput().search.value;
                  opts.select = this.getInput().select.value;
                  opts.sparkline = this.getInput().sparkline.innerHTML;
                  opts.selectionDataSet = this.getInput().selectionDataSet.value;
                  opts.selectionRefArea = this.getInput().selectionRefArea.value;
                  break;
                default:
                  opts.url = this.getInput().value;
                  break;
              }

              opts.target = '_self';
              if (targetCheckbox && targetCheckbox.checked) {
                opts.target = '_blank';
              }

              if (buttonCheckbox && buttonCheckbox.checked) {
                opts.buttonClass = this.customClassOption;
              }

              Object.keys(opts).forEach(function(key) {
                if(typeof opts[key] === 'string') {
                  opts[key] = opts[key].trim();
                }
              });

              return opts;
            },

            doFormSave: function () {
              var opts = this.getFormOpts();
              this.completeFormSave(opts);
            },

            completeFormSave: function (opts) {
// console.log(opts);
// console.log('completeFormSave() with this.action: ' + this.action);
              this.base.restoreSelection();
              var range = MediumEditor.selection.getSelectionRange(this.document);
              var selectedParentElement = this.base.getSelectedParentElement();
// console.log('getSelectedParentElement:');
// console.log(selectedParentElement);

              //Mark the text which the note was left for (with reference to the note?)
              this.base.selectedDocument = this.document;
              this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument); //.replace(DO.C.Editor.regexEmptyHTMLTags, '');
// console.log('this.base.selection:');
// console.log(this.base.selection);

              var exact = this.base.selection;
              var selectionState = MediumEditor.selection.exportSelection(selectedParentElement, this.document);
              var start = selectionState.start;
              var end = selectionState.end;
              var prefixStart = Math.max(0, start - DO.C.ContextLength);
// console.log('pS ' + prefixStart);
              var prefix = selectedParentElement.textContent.substr(prefixStart, start - prefixStart);
// console.log('-' + prefix + '-');
              prefix = DO.U.htmlEntities(prefix);

              var suffixEnd = Math.min(selectedParentElement.textContent.length, end + DO.C.ContextLength);
// console.log('sE ' + suffixEnd);
              var suffix = selectedParentElement.textContent.substr(end, suffixEnd - end);
// console.log('-' + suffix + '-');
              suffix = DO.U.htmlEntities(suffix);

              var datetime = DO.U.getDateTimeISO();
              var id = DO.U.generateAttributeId();
              var refId = 'r-' + id;
              // var noteId = 'i-' + id;

              var resourceIRI = uri.stripFragmentFromString(document.location.href);
              var containerIRI = window.location.href;

              var contentType = 'text/html';
              var noteIRI, noteURL;
              var annotationDistribution = [] , aLS = {};

              if(opts.annotationLocationPersonalStorage || (!opts.annotationLocationPersonalStorage && !opts.annotationLocationService && DO.C.User.Storage && DO.C.User.Storage.length > 0)) {
                if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
                  containerIRI = DO.U.forceTrailingSlash(DO.C.User.Storage[0]);
                }
                else {
                  containerIRI = containerIRI.substr(0, containerIRI.lastIndexOf('/') + 1);
                }

                if (typeof DO.C.User.masterWorkspace != 'undefined' && DO.C.User.masterWorkspace.length > 0) {
                  containerIRI = DO.C.User.masterWorkspace + DO.C.InteractionPath;
                }
                else if(typeof DO.C.User.Workspace != 'undefined') {
                  if (typeof DO.C.User.Workspace.Master != 'undefined' && DO.C.User.Workspace.Master.length > 0) {
                    containerIRI = DO.C.User.Workspace.Master + DO.C.InteractionPath;
                  }
                  else if(typeof DO.C.User.Workspace.Public != 'undefined' && DO.C.User.Workspace.Public.length > 0) {
                    containerIRI = DO.C.User.Workspace.Public + DO.C.InteractionPath;
                  }
                }

                contentType = 'text/html';
                noteURL = noteIRI = containerIRI + id;
                aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                annotationDistribution.push(aLS);
              }
              if(opts.annotationLocationService && typeof DO.C.AnnotationService !== 'undefined') {
                containerIRI = DO.C.AnnotationService;
                contentType = 'application/ld+json';
                if(!opts.annotationLocationPersonalStorage && opts.annotationLocationService) {
                  noteURL = noteIRI = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                }
                else if(opts.annotationLocationPersonalStorage) {
                  noteURL = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType };
                }
                else {
                  noteURL = noteIRI = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                }
                annotationDistribution.push(aLS);
              }

// console.log(annotationDistribution);
              //XXX: Defaulting to id but overwritten by motivation symbol
              var refLabel = id;

              var parentNodeWithId = selectedParentElement.closest('[id]');
              var targetIRI = (parentNodeWithId) ? resourceIRI + '#' + parentNodeWithId.id : resourceIRI;

              //Role/Capability for Authors/Editors
              var ref = '', refType = ''; //TODO: reference types. UI needs input
              //TODO: replace refId and noteIRI IRIs

              //This class is added if it is only for display purposes e.g., loading an external annotation for view, but do not want to save it later on (as it will be stripped when 'do' is found)
              var doClass = '';

              //TODO: oa:TimeState's datetime should equal to hasSource value. Same for oa:HttpRequestState's rdfs:value
              // <span about="[this:#' + refId + ']" rel="oa:hasState">(timeState: <time typeof="oa:TimeState" datetime="' + datetime +'" datatype="xsd:dateTime"property="oa:sourceDate">' + datetime + '</time>)</span>\n\

              var noteData = {};
              var note = '';
              var licenseIRI = '';
              var motivatedBy = 'oa:replying';

              switch(this.action) {
                case 'sparkline':
                  var figureIRI = DO.U.generateAttributeId(null, opts.selectionDataSet);
                  ref = '<span rel="schema:hasPart" resource="#figure-' + figureIRI + '">\n\
                  <a href="' + opts.select + '" property="schema:name" rel="prov:wasDerivedFrom" resource="' + opts.select + '" typeof="qb:DataSet">' + opts.selectionDataSet + '</a> [' + DO.U.htmlEntities(DO.C.RefAreas[opts.selectionRefArea]) + ']\n\
                  <span class="sparkline" rel="schema:image" resource="#' + figureIRI + '">' + opts.sparkline + '</span></span>';
                  break;

                //External Note
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  if (DO.U.Editor.MediumEditor.options.id === 'review') {
                    motivatedBy = 'oa:assessing';
                    refLabel = DO.U.getReferenceLabel(motivatedBy);
                  }

                  ref = this.base.selection;
                  licenseIRI = opts.license;

                  noteData = {
                    "type": this.action,
                    "mode": "write",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": opts.content,
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  if (opts.license.length > 0) {
                    noteData.license["iri"] = opts.license;
                  }
                  note = DO.U.createNoteDataHTML(noteData);
                  break;

                //Internal Note
                case 'note':
                  motivatedBy = "oa:commenting";
                  refLabel = DO.U.getReferenceLabel(motivatedBy);
                  docRefType = '<sup class="ref-comment"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup>';
                  noteType = 'note';
                  noteData = {
                    "type": noteType,
                    "mode": "read",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": {
                      "purpose": {
                        "describing": {
                          "text": opts.content
                        },
                        "tagging": {
                          "text": opts.tagging
                        }
                      }
                    },
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  if (opts.license.length > 0) {
                    noteData.license["iri"] = opts.license;
                  }

                  note = DO.U.createNoteDataHTML(noteData);
                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark datatype="rdf:HTML" id="'+ refId +'" property="rdf:value">' + exact + '</mark>' + docRefType +'</span>';
                  break;

                case 'cite': //footnote reference
                  switch(opts.citationType) {
                    case 'ref-footnote': default:
                      motivatedBy = "oa:describing";
                      refLabel = DO.U.getReferenceLabel(motivatedBy);
                      docRefType = '<sup class="' + opts.citationType + '"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup>';
                      noteData = {
                        "type": opts.citationType,
                        "mode": "write",
                        "motivatedByIRI": motivatedBy,
                        "id": id,
                        "refId": refId,
                        "refLabel": refLabel,
                        "iri": noteIRI,
                        "datetime": datetime,
                        "body": opts.content,
                        "citationURL": opts.url
                      };
// console.log(noteData);
                      note = DO.U.createNoteDataHTML(noteData);
                      break;

                    case 'ref-reference':
                      refLabel = DO.U.getReferenceLabel('oa:describing');
                      docRefType = '<span class="' + opts.citationType + '">' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a href="#' + id + '">' + refLabel + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose + '</span>';
                      break;
                  }

                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark datatype="rdf:HTML" id="'+ refId +'" property="rdf:value">' + exact + '</mark>' + docRefType +'</span>';
                  break;
                // case 'reference':
                //   ref = '<span class="ref" about="[this:#' + refId + ']" typeof="dctypes:Text"><span id="'+ refId +'" property="schema:description">' + this.base.selection + '</span> <span class="ref-reference">' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose + '</span></span>';
//                  break;

                case 'rdfa':
                  //TODO: inlist, prefix
                  //TODO: lang/xmlllang
                  noteData = {
                    about: opts.about,
                    typeOf: opts.typeOf,
                    rel: opts.rel,
                    href: opts.href,
                    resource: opts.resource,
                    property: opts.property,
                    content: opts.content,
                    datatype: opts.datatype,
                    textContent: this.base.selection
                    // lang: '' and/or xmllang: ''
                  };
                  ref = DO.U.createRDFaHTML(noteData);
                  break;

                case 'bookmark':
                  noteType = 'bookmark';
                  motivatedBy = "oa:bookmarking";
                  refLabel = DO.U.getReferenceLabel(motivatedBy);
                  noteData = {
                    "type": noteType,
                    "mode": "write",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": {
                      "purpose": {
                        "describing": {
                          "text": opts.content
                        },
                        "tagging": {
                          "text": opts.tagging
                        }
                      }
                    },
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  note = DO.U.createNoteDataHTML(noteData);
                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark></span>';
                  break;
              }
// console.log(note);
// console.log(noteData);

              var selectionUpdated = ref;
              MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

              switch(this.action) {
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  var notificationType, notificationObject, notificationContext, notificationTarget, notificationStatements;
                  notificationStatements = '    <dl about="' + noteIRI + '">\n\
      <dt>Object type</dt><dd><a about="' + noteIRI + '" typeof="oa:Annotation" href="' + DO.C.Vocab['oaannotation']['@id'] + '">Annotation</a></dd>\n\
      <dt>Motivation</dt><dd><a href="' + DO.C.Prefixes[motivatedBy.split(':')[0]] + motivatedBy.split(':')[1] + '" property="oa:motivation">' + motivatedBy.split(':')[1] + '</a></dd>\n\
    </dl>\n\
';
                  switch(this.action) {
                    default: case 'article': case 'specificity':
                      notificationType = ['as:Announce'];
                      notificationObject = noteIRI;
                      notificationTarget = targetIRI;
                      break;
                    case 'approve':
                      notificationType = ['as:Like'];
                      notificationObject = targetIRI;
                      notificationContext = noteIRI;
                      break;
                    case 'disapprove':
                      notificationType = ['as:Dislike'];
                      notificationObject = targetIRI;
                      notificationContext = noteIRI;
                      break;
                  }

                  var data = DO.U.createHTML(noteIRI, note);

                  annotationDistribution.forEach(annotation => {
                    graph.serializeData(data, 'text/html', annotation['contentType'], { 'subjectURI': annotation['noteIRI'] })

                      .catch(error => {
                        console.log('Error serializing annotation:', error)

                        throw error  // re-throw, break out of promise chain
                      })

                      .then(data => {
                        if (!('canonical' in annotation)) {
                          switch (annotation[ 'contentType' ]) {
                            case 'application/ld+json':
                              let x = JSON.parse(data)
                              x[ 0 ][ "via" ] = x[ 0 ][ "@id" ]
                              x[ 0 ][ "@id" ] = annotation[ 'noteURL' ]
                              data = JSON.stringify(x)
                              break
                            default:
                              break
                          }
                        }

                        return fetcher.putResource(annotation[ 'noteURL' ], data, annotation[ 'contentType' ])
                          .catch(error => {
                            console.log('Error saving annotation:', error)
                            throw error // re-throw, break out of promise chain
                          })
                      })

                      .then(() => {
                        if (!annotation[ 'canonical' ]) {
                          // Nothing else needs to be done, go on to the
                          // next annotation (error will be suppressed in
                          // the catch-all .catch() clause below)
                          throw new Error()
                        }

                        return DO.U.positionInteraction(annotation[ 'noteIRI' ], document.body)
                          .catch(console.log)
                      })

                      .then(() => {
                        return inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id'])
                          .catch(error => {
                            console.log('Error fetching ldpinbox endpoint:', error)
                            throw error
                          })
                      })

                      .then(inbox => {
                        // TODO: resourceIRI for getEndpoint should be the
                        // closest IRI (not necessarily the document).
                        // Test resolve/reject better.

                        if (inbox.length > 0) {
                          inbox = inbox[0];
                          let notificationData = {
                            "type": notificationType,
                            "inbox": inbox,
                            "slug": id,
                            "object": notificationObject,
                            "license": opts.license
                          };

                          if(typeof notificationTarget !== 'undefined') {
                            notificationData['target'] = notificationTarget;
                          }
                          if(typeof notificationContext !== 'undefined') {
                            notificationData['context'] = notificationContext;
                          }
                          if(typeof notificationStatements !== 'undefined') {
                            notificationData['statements'] = notificationStatements;
                          }

                          return inbox.notifyInbox(notificationData)
                            .catch(error => {
                              console.log('Error notifying the inbox:', error)
                            })
                        }
                      })

                      .catch(() => {  // catch-all
                        // suppress the error, it was already logged to the console above
                        // nothing else needs to be done, the loop will proceed
                        // to the next annotation
                      })
                  })  // annotationDistribution.forEach
                  break;

                case 'note':
                  var nES = selectedParentElement.nextElementSibling;
                  var asideNote = '\n\
<aside class="note">\n\
'+ note + '\n\
</aside>';
                  var asideNode = DO.U.fragmentFromString(asideNote);
                  var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
                  parentSection.appendChild(asideNode);

                  DO.U.positionNote(refId, refLabel, id);
                  break;

                case 'cite': //footnote reference
                  //TODO: Refactor this what's in positionInteraction

                  switch(opts.citationType) {
                    case 'ref-footnote': default:
                      var nES = selectedParentElement.nextElementSibling;
                      var asideNote = '\n\
<aside class="note">\n\
'+ note + '\n\
</aside>';
                      var asideNode = DO.U.fragmentFromString(asideNote);
                      var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
                      parentSection.appendChild(asideNode);

                      DO.U.positionNote(refId, refLabel, id);
                      break;
                    case 'ref-reference':
                      var options = opts;
                      options['citationId'] = opts.url;
                      options['refId'] = refId;

                      DO.U.getCitation(opts.url, options).then(function(citationGraph) {
                        var citationURI = '';
                        if(opts.url.match(/^10\.\d+\//)) {
                          citationURI = 'http://dx.doi.org/' + opts.url;
                          options.citationId = citationURI;
                        }
                        //FIXME: subjectIRI shouldn't be set here. Bug in RDFaProcessor (see also SimpleRDF ES5/6). See also: https://github.com/linkeddata/dokieli/issues/132
                        else if (opts.url.toLowerCase().indexOf('//dx.doi.org/') >= 0) {
                          citationURI = opts.url;
                          if (opts.url.toLowerCase().startsWith('https:')) {
                            citationURI = opts.url.replace(/^https/, 'http');
                          }
                        }
                        else if (uri.stripFragmentFromString(options.citationId) !== uri.getProxyableIRI(options.citationId)) {
                          citationURI = window.location.origin + window.location.pathname;
                        }
                        else {
                          citationURI = options.citationId;
                        }

                        var citation = DO.U.getCitationHTML(citationGraph, citationURI, options);

                        var r = document.querySelector('#references ol');
                        if (!r) {
                          var nodeInsertLocation = document.querySelector('main > article > div') || document.body;
                          var section = '<section id="references"><h2>References</h2><div><ol></ol></div></section>';
                          nodeInsertLocation.insertAdjacentHTML('beforeend', section);
                          r = document.querySelector('#references ol');
                        }
                        var citationHTML = '<li id="' + id + '">' + citation + '</li>';
                        r.insertAdjacentHTML('beforeend', citationHTML);

// console.log(options.url);
                        var s = citationGraph.child(citationURI);
                        if(s.ldpinbox._array.length == 0) {
                          s = citationGraph.child(options.citationId);
                        }

                        if (s.ldpinbox._array.length > 0) {
                          var inbox = s.ldpinbox.at(0);
// console.log(inbox);

                          var citedBy = location.href.split(location.search||location.hash||/[?#]/)[0] + '#' + options.refId;

                          var notificationStatements = '<' + citedBy + '> <' + options.citationRelation + '> <' + options.url + '> .';

                          notificationStatements = '    <dl about="' + citedBy + '">\n\
      <dt>Action</dt><dd>Citation</dd>\n\
      <dt>Cited by</dt><dd><a href="' + citedBy + '">' + citedBy + '</a></dd>\n\
      <dt>Cites</dt><dd><a href="' + options.url + '" property="' + options.citationRelation + '">' + options.url + '</a></dd>\n\
      <dt>Citation type</dt><dd><a href="' + options.url + '">' + DO.C.Citation[options.citationRelation] + '</a></dd>\n\
    </dl>\n\
';

                          var notificationData = {
                            "type": ['as:Announce'],
                            "inbox": inbox,
                            "object": citedBy,
                            "target": options.url,
                            "statements": notificationStatements
                          };

                          inbox.notifyInbox(notificationData).then(
                            function(s){
                              console.log('Sent Linked Data Notification to ' + inbox);
                            });
                        }
                      });
                      break;
                  }
                  break;

                case 'bookmark':
                  var data = DO.U.createHTML(noteIRI, note);

                  fetcher.putResource(noteIRI, data)
                    .then(() => {
                      // TODO: Let the user know that it was bookmarked
                    })
                    .catch(error => {
                      console.log('Error saving bookmark:', error)
                    })

                  break
              }

              this.window.getSelection().removeAllRanges();
              this.base.checkSelection();
            },

            checkLinkFormat: function (value) {
              var re = /^(https?|ftps?|rtmpt?):\/\/|mailto:/;
              return (re.test(value) ? '' : 'http://') + value;
            },

            doFormCancel: function () {
              this.base.restoreSelection();
              this.base.checkSelection();
            },

            // form creation and event handling
            attachFormEvents: function (form) {
              var close = form.querySelector('.medium-editor-toolbar-close'),
                save = form.querySelector('.medium-editor-toolbar-save');

              this.on(form, 'click', this.handleFormClick.bind(this));
              this.on(close, 'click', this.handleCloseClick.bind(this));
              this.on(save, 'click', this.handleSaveClick.bind(this), true);
            },

            createForm: function () {
              var doc = this.document,
                form = doc.createElement('div');

              // Anchor Form (div)
              form.className = 'medium-editor-toolbar-form';
              //FIXME
              form.id = 'medium-editor-toolbar-form-textarea-' + this.getEditorId();
              form.innerHTML = this.getTemplate();
              this.attachFormEvents(form);

              return form;
            },

            getInput: function () {
              var r = {};
              switch(this.action) {
                case 'rdfa':
                  r.about = this.getForm().querySelector('#rdfa-about.medium-editor-toolbar-input');
                  r.rel = this.getForm().querySelector('#rdfa-rel.medium-editor-toolbar-input');
                  r.href = this.getForm().querySelector('#rdfa-href.medium-editor-toolbar-input');
                  r.typeOf = this.getForm().querySelector('#rdfa-typeof.medium-editor-toolbar-input');
                  r.resource = this.getForm().querySelector('#rdfa-resource.medium-editor-toolbar-input');
                  r.property = this.getForm().querySelector('#rdfa-property.medium-editor-toolbar-input');
                  r.content = this.getForm().querySelector('#rdfa-content.medium-editor-toolbar-input');
                  r.datatype = this.getForm().querySelector('#rdfa-datatype.medium-editor-toolbar-input');
                  break;
                case 'article':
                  r.content = this.getForm().querySelector('#article-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#article-license.medium-editor-toolbar-select');
                  break;
                case 'note':
                  r.content = this.getForm().querySelector('#article-content.medium-editor-toolbar-textarea');
                  r.tagging = this.getForm().querySelector('#bookmark-tagging.medium-editor-toolbar-input');
                  r.license = this.getForm().querySelector('#article-license.medium-editor-toolbar-select');
                  break;
                case 'approve':
                  r.content = this.getForm().querySelector('#approve-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#approve-license.medium-editor-toolbar-select');
                  break;
                case 'disapprove':
                  r.content = this.getForm().querySelector('#disapprove-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#disapprove-license.medium-editor-toolbar-select');
                  break;
                case 'specificity':
                  r.content = this.getForm().querySelector('#specificity-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#specificity-license.medium-editor-toolbar-select');
                  break;
                case 'cite':
                  r.citationType = this.getForm().querySelector('input[name="citation-type"]:checked');
                  r.citationRelation = this.getForm().querySelector('#citation-relation.medium-editor-toolbar-select');
                  r.url = this.getForm().querySelector('#citation-url.medium-editor-toolbar-input');
                  r.content = this.getForm().querySelector('#citation-content.medium-editor-toolbar-textarea');
                  break;
                case 'bookmark':
                  r.content = this.getForm().querySelector('#bookmark-content.medium-editor-toolbar-textarea');
                  r.tagging = this.getForm().querySelector('#bookmark-tagging.medium-editor-toolbar-input');
                  break;
                case 'sparkline':
                  r.search = this.getForm().querySelector('#sparkline-search.medium-editor-toolbar-input');
                  r.select = this.getForm().querySelector('#sparkline-select');
                  r.sparkline = this.getForm().querySelector('#sparkline-graph .sparkline');
                  r.selectionDataSet = this.getForm().querySelector('#sparkline-selection-dataset');
                  r.selectionRefArea = this.getForm().querySelector('#sparkline-selection-refarea');
                  break;

                default:
                  r = this.getForm().querySelector('textarea.medium-editor-toolbar-textarea');
                  break;
              }

              return r;
            },

            getAnchorTargetCheckbox: function () {
              return this.getForm().querySelector('.medium-editor-toolbar-textarea-target');
            },

            getAnchorButtonCheckbox: function () {
              return this.getForm().querySelector('.medium-editor-toolbar-textarea-button');
            },

            handleTextboxKeyup: function (event) {
              // For ENTER -> create the anchor
              if (event.keyCode === MediumEditor.util.keyCode.ENTER) {
                event.preventDefault();
                this.doFormSave();
                return;
              }

              // For ESCAPE -> close the form
              if (event.keyCode === MediumEditor.util.keyCode.ESCAPE) {
                event.preventDefault();
                this.doFormCancel();
              }
            },

            handleFormClick: function (event) {
              // make sure not to hide form when clicking inside the form
              event.stopPropagation();
            },

            handleSaveClick: function (event) {
              // Clicking Save -> create the anchor
              event.preventDefault();
              this.doFormSave();
            },

            handleCloseClick: function (event) {
              // Click Close -> close the form
              event.preventDefault();
              this.doFormCancel();
            }
          });
        }
      })()

    }, //DO.U.Editor

    init: function init () {
      if (document.body) {
        DO.U.initCurrentStylesheet()
        DO.U.setPolyfill()
        DO.U.setDocRefType()
        DO.U.showRefs()
        DO.U.setLocalDocument()

        auth.initClient(DO.C)
        auth.checkCurrentSession(DO.C)

        DO.U.buttonClose()
        DO.U.highlightItems()
        DO.U.initDocumentActions()
        DO.U.showDocumentInfo()
        DO.U.showFragment()
        DO.U.setDocumentMode()
        DO.U.showInboxNotifications()
        DO.U.initMath()
      }
    }
  } //DO.U
}; //DO

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function(){ DO.U.init(); });
  }
}

module.exports = DO

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  linkexp: /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g,

  paramexp: /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Config = __webpack_require__(7)
const fetcher = __webpack_require__(10)
const util = __webpack_require__(19)
const provider = __webpack_require__(46)

const { OIDCWebClient } = __webpack_require__(50)

module.exports = {
  afterSignIn,
  checkCurrentSession,
  enableDisableButton,
  getAgentImage,
  getAgentName,
  getUserHTML,
  initClient,
  setUserInfo,
  showUserIdentityInput,
  showUserSigninSignup,
  submitSignIn,
  webIdFromSession
}

function afterSignIn () {
  console.log('In afterSignIn()')

  var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + Config.User.IRI + '"]')
  for (let i = 0; i < user.length; i++) {
    var article = user[i].closest('article')
    article.insertAdjacentHTML('afterbegin', '<button class="delete"><i class="fa fa-trash"></i></button>')
  }

  var buttonDelete = document.querySelectorAll('aside.do blockquote[cite] article button.delete')

  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      var article = e.target.closest('article')
      var refId = 'r-' + article.id
      var noteIRI = article.closest('blockquote[cite]')
      noteIRI = noteIRI.getAttribute('cite')

      fetcher.deleteResource(noteIRI)
        .then(() => {
          var aside = e.target.closest('aside.do')
          aside.parentNode.removeChild(aside)
          var span = document.querySelector('span[about="#' + refId + '"]')
          span.outerHTML = span.querySelector('mark').textContent
          // TODO: Delete notification or send delete activity
        })
    })
  }
}

function checkCurrentSession (config) {
  return config.auth.currentSession()
    .then(session => initUserFromSession(session))
}

// TODO: Generalize this further so that it is not only for submitSignIn
function enableDisableButton (e, button) {
  var delay = (e.type === 'cut' || e.type === 'paste') ? 250 : 0
  var input

  window.setTimeout(function () {
    input = e.target.value
    if (input.length > 10 && input.match(/^https?:\/\//g)) {
      if (typeof e.which !== 'undefined' && e.which === 13) {
        if (!button.getAttribute('disabled')) {
          button.setAttribute('disabled', 'disabled')
          e.preventDefault()
          e.stopPropagation()
          submitSignIn()
        }
      } else {
        button.removeAttribute('disabled')
      }
    } else {
      if (!button.getAttribute('disabled')) {
        button.setAttribute('disabled', 'disabled')
      }
    }
  }, delay)
}

function getAgentImage (s) {
  return s.foafimg || s.schemaimage || s.asimage || s.siocavatar ||
    s.foafdepiction || undefined
}

function getAgentName (s) {
  var name = s.foafname || s.schemaname || s.asname || s.rdfslabel || undefined
  if (typeof name === 'undefined') {
    if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
      name = s.schemagivenName + ' ' + s.schemafamilyName
    } else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
      name = s.foafgivenName + ' ' + s.foaffamilyName
    } else if (s.foafnick && s.foafnick.length > 0) {
      name = s.foafnick
    }
  }
  return name
}

function getUserHTML () {
  let userName = Config.SecretAgentNames[Math.floor(Math.random() * Config.SecretAgentNames.length)]

  if (Config.User.Name) {
    // XXX: We have the IRI already
    userName = '<span about="' + Config.User.IRI + '" property="schema:name">' +
      Config.User.Name + '</span>'
  }

  let userImage = ''

  if ('Image' in Config.User && typeof Config.User.Image !== 'undefined' && Config.User.Image.length > 0) {
    userImage = '<img alt="" height="48" rel="schema:image" src="' +
      Config.User.Image + '" width="48" /> '
  }

  let user = ''

  if ('IRI' in Config.User && Config.User.IRI !== null && Config.User.IRI.length > 0) {
    user = '<span about="' + Config.User.IRI + '" typeof="schema:Person">' +
      userImage + '<a rel="schema:url" href="' + Config.User.IRI + '"> ' +
      userName + '</a></span>'
  } else {
    user = '<span typeof="schema:Person">' + userName + '</span>'
  }

  return user
}

function initClient (config) {
  config.auth = new OIDCWebClient({})
}

function initUserFromSession (session) {
  if (!session || !session.hasCredentials()) {
    return Promise.resolve()
  }

  console.log('Initializing user from session:', session)

  fetcher.initFetch(session.fetch)

  let webIdUrl = webIdFromSession(session)

  Config.session = session
  Config.webId = webIdUrl

  console.log('Setting user info for web id:', webIdUrl)

  return setUserInfo(webIdUrl)

    .then(() => {
      var uI = document.getElementById('user-info')
      if (uI) {
        uI.innerHTML = getUserHTML()
      }

      return afterSignIn()
    })
}

/**
 * @param userIRI {string}
 *
 * @returns {Promise}
 */
function setUserInfo (userIRI) {
  if (!userIRI) {
    return Promise.reject(new Error('Could not set user info - no user IRI'))
  }

  return fetcher.getResourceGraph(userIRI)
    .then(g => {
      var s = g.child(userIRI)

      Config.User.Graph = s
      Config.User.IRI = userIRI
      Config.User.Name = getAgentName(s)
      Config.User.Image = getAgentImage(s)
      Config.User.URL = s.foafhomepage ||
        s['http://xmlns.com/foaf/0.1/weblog'] || s.schemaurl

      Config.User.Knows = (s.foafknows && s.foafknows._array.length > 0)
        ? util.uniqueArray(s.foafknows._array)
        : []
      Config.User.Knows = (s.schemaknows && s.schemaknows._array.length > 0)
        ? util.uniqueArray(Config.User.Knows.concat(s.schemaknows._array))
        : Config.User.Knows

      Config.User.TempKnows = []
      Config.User.SameAs = []
      Config.User.Contacts = []

      if (s.storage) {
        Config.User.Storage = s.storage._array
      }

      if (s.preferencesFile && s.preferencesFile.length > 0) {
        Config.User.PreferencesFile = s.preferencesFile

        // TODO: Reconsider if/where to use this.
        // setUserWorkspaces(Config.User.PreferencesFile)
      }
      return Config.User
    })
}

function showUserIdentityInput (e) {
  if (typeof e !== 'undefined') {
    e.target.disabled = true
  }

  document.body.insertAdjacentHTML('beforeend', '<aside id="user-identity-input" class="do on"><button class="close" title="Close">❌</button><h2>Sign in with WebID</h2><label>HTTP(S) IRI</label> <input id="webid" type="text" placeholder="http://csarven.ca/#i" value="" name="webid"/> <button class="signin">Sign in</button></aside>')

  var buttonSignIn = document.querySelector('#user-identity-input button.signin')
  buttonSignIn.setAttribute('disabled', 'disabled')

  document.querySelector('#user-identity-input').addEventListener('click', e => {
    if (e.target.matches('button.close')) {
      var signinUser = document.querySelector('#document-menu button.signin-user')
      if (signinUser) {
        signinUser.disabled = false
      }
    }
  })

  var inputWebid = document.querySelector('#user-identity-input input#webid')

  buttonSignIn.addEventListener('click', submitSignIn)

  let events = ['keyup', 'cut', 'paste', 'input']

  events.forEach(eventType => {
    inputWebid.addEventListener(eventType, e => { enableDisableButton(e, buttonSignIn) })
  })

  inputWebid.focus()
}

function showUserSigninSignup (node) {
  if (!document.querySelector('#user-info')) {
    var s = '<button class="signin-user" title="Sign in to authenticate"><i class="fa fa-user-secret fa-2x"></i>Sign in</button>'
    if (Config.User.IRI) {
      s = getUserHTML()
    }
    node.insertAdjacentHTML('beforeend', '<section id="user-info">' + s + '</section>')

    var su = document.querySelector('#document-menu button.signin-user')
    if (su) {
      su.addEventListener('click', showUserIdentityInput)
    }
  }
}

// FIXME: This parameter value can be an event or a string
function submitSignIn (url) {
  if (typeof url !== 'string') {
    var userIdentityInput = document.getElementById('user-identity-input')

    if (userIdentityInput) {
      userIdentityInput.insertAdjacentHTML('beforeend',
        '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>')
    }

    url = userIdentityInput.querySelector('input#webid').value.trim()
  }

  if (!url) {
    console.log('submitSignIn - no user url input')
    return Promise.resolve()
  }

  // First, discover the authorized provider for a web id
  return provider.authorizedProviderFor(url)

    .then(providerUrl => {
      if (providerUrl) {
        // currently results in a window redirect
        return Config.auth.login(providerUrl)
      }

      console.log('No authorized provider discovered for:', url)
    })

  // if (userIdentityInput) {
  //   userIdentityInput.parentNode.removeChild(userIdentityInput)
  // }
}

function webIdFromSession (session) {
  if (!session || !session.hasCredentials()) { return null }

  return session.idClaims.sub
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { URL } = __webpack_require__(2)
const validUrl = __webpack_require__(47)
const fetch = __webpack_require__(4)
const li = __webpack_require__(49)
const fetcher = __webpack_require__(10)
const { getProxyableIRI } = __webpack_require__(11)

module.exports = {
  discoverProviderFor,
  parseProviderLink,
  authorizedProviderFor,
  providerExists,
  validateProviderUri
}

/**
 * @param uri {string} Provider URI or Web ID URI
 *
 * @returns {Promise<string>}
 */
function authorizedProviderFor (uri) {
  // First, determine if the uri is an OIDC provider
  return providerExists(uri)
    .then(providerUri => {
      if (providerUri) {
        return providerUri  // the given uri's origin hosts an OIDC provider
      }

      // Given uri is not a provider (for example, a static Web ID profile URI)
      // Discover its preferred provider
      return discoverProviderFor(uri)
    })
}

/**
 * @param uri {string} Provider URI or Web ID URI
 *
 * @returns {Promise<string|null>} Returns the Provider URI origin if an OIDC
 *   provider exists at the given uri, or `null` if none exists
 */
function providerExists (uri) {
  let providerOrigin = (new URL(uri)).origin
  let providerConfigUri = getProxyableIRI(providerOrigin + '/.well-known/openid-configuration')

  return fetch(providerConfigUri, { method: 'HEAD' })
    .then(result => {
      if (result.ok) {
        return providerOrigin
      }

      console.log('Could not discover provider via', providerConfigUri)
      return null
    })
    .catch(() => {
      console.log('Could not discover provider via', providerConfigUri)
    })
}

/**
 *
 * @param webId {string} Web ID URI
 *
 * @returns {Promise<string>} Resolves with the preferred provider uri for the
 *  given Web ID, extracted from Link rel header or profile body. If no
 *  provider URI was found, reject with an error.
 */
function discoverProviderFor (webId) {
  return discoverFromHeaders(webId)

    .then(providerFromHeaders => providerFromHeaders || discoverFromProfile(webId))

    .then(providerUri => {
      if (!providerUri) {
        console.log('Could not discover provider from headers or profile')
      }

      // drop the path (provider origin only)
      if (providerUri) {
        providerUri = (new URL(providerUri)).origin
      }

      validateProviderUri(providerUri, webId)  // Throw an error if empty or invalid

      return providerUri
    })
}

/**
 * @param webId {string}
 *
 * @returns {Promise<string|null>}
 */
function discoverFromHeaders (webId) {
  let profile = getProxyableIRI(webId)
  return fetch(profile, { method: 'OPTIONS' })
    .then(response => {
      if (response.ok) {
        return parseProviderLink(response.headers)
      }

      console.log('Could not discover provider from OPTIONS', profile)
      return null
    })
    .catch(() => {
      console.log('Could not discover provider from OPTIONS', profile)
    })
}

function discoverFromProfile (webId) {
  let profile = getProxyableIRI(webId)

  return fetcher.getResourceGraph(profile)
    .then(graph => {
      let subgraph = graph.child(webId)

      let providerUri = subgraph['http://www.w3.org/ns/solid/terms#oidcIssuer']

      return providerUri
    })

  // const store = rdf.graph()
  //
  // const fetcher = rdf.fetcher(store)
  //
  // return fetcher.fetch(webId, { force: true })
  //   .then(response => {
  //     if (!response.ok) {
  //       let error = new Error(`Could not reach Web ID ${webId} to discover provider`)
  //       error.status = 400
  //       throw error
  //     }
  //
  //     let providerTerm = rdf.namedNode('http://www.w3.org/ns/solid/terms#oidcIssuer')
  //     let providerUri = store.anyValue(rdf.namedNode(webId), providerTerm)
  //
  //     return providerUri
  //   })
}

/**
 * Returns the contents of the OIDC issuer Link rel header.
 *
 * @see https://openid.net/specs/openid-connect-discovery-1_0.html#IssuerDiscovery
 *
 * @param headers {Headers} Response headers from an OPTIONS call
 *
 * @return {string}
 */
function parseProviderLink (headers) {
  let links = li.parse(headers.get('link')) || {}

  return links['http://openid.net/specs/connect/1.0/issuer']
}

/**
 * Validates a preferred provider uri (makes sure it's a well-formed URI).
 *
 * @param provider {string} Identity provider URI
 *
 * @throws {Error} If the URI is invalid
 */
function validateProviderUri (provider, webId) {
  if (!provider) {
    let error = new Error(`OIDC issuer not advertised for ${webId}.
    See https://github.com/solid/webid-oidc-spec#authorized-oidc-issuer-discovery`)
    error.status = 400
    throw error
  }

  if (!validUrl.isUri(provider)) {
    let error = new Error(`OIDC issuer for ${webId} is not a valid URI: ${provider}`)
    error.status = 400
    throw error
  }
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function(module) {
    'use strict';

    module.exports.is_uri = is_iri;
    module.exports.is_http_uri = is_http_iri;
    module.exports.is_https_uri = is_https_iri;
    module.exports.is_web_uri = is_web_iri;
    // Create aliases
    module.exports.isUri = is_iri;
    module.exports.isHttpUri = is_http_iri;
    module.exports.isHttpsUri = is_https_iri;
    module.exports.isWebUri = is_web_iri;


    // private function
    // internal URI spitter method - direct from RFC 3986
    var splitUri = function(uri) {
        var splitted = uri.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
        return splitted;
    };

    function is_iri(value) {
        if (!value) {
            return;
        }

        // check for illegal characters
        if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) return;

        // check for hex escapes that aren't complete
        if (/%[^0-9a-f]/i.test(value)) return;
        if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) return;

        var splitted = [];
        var scheme = '';
        var authority = '';
        var path = '';
        var query = '';
        var fragment = '';
        var out = '';

        // from RFC 3986
        splitted = splitUri(value);
        scheme = splitted[1]; 
        authority = splitted[2];
        path = splitted[3];
        query = splitted[4];
        fragment = splitted[5];

        // scheme and path are required, though the path can be empty
        if (!(scheme && scheme.length && path.length >= 0)) return;

        // if authority is present, the path must be empty or begin with a /
        if (authority && authority.length) {
            if (!(path.length === 0 || /^\//.test(path))) return;
        } else {
            // if authority is not present, the path must not start with //
            if (/^\/\//.test(path)) return;
        }

        // scheme must begin with a letter, then consist of letters, digits, +, ., or -
        if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))  return;

        // re-assemble the URL per section 5.3 in RFC 3986
        out += scheme + ':';
        if (authority && authority.length) {
            out += '//' + authority;
        }

        out += path;

        if (query && query.length) {
            out += '?' + query;
        }

        if (fragment && fragment.length) {
            out += '#' + fragment;
        }

        return out;
    }

    function is_http_iri(value, allowHttps) {
        if (!is_iri(value)) {
            return;
        }

        var splitted = [];
        var scheme = '';
        var authority = '';
        var path = '';
        var port = '';
        var query = '';
        var fragment = '';
        var out = '';

        // from RFC 3986
        splitted = splitUri(value);
        scheme = splitted[1]; 
        authority = splitted[2];
        path = splitted[3];
        query = splitted[4];
        fragment = splitted[5];

        if (!scheme)  return;

        if(allowHttps) {
            if (scheme.toLowerCase() != 'https') return;
        } else {
            if (scheme.toLowerCase() != 'http') return;
        }

        // fully-qualified URIs must have an authority section that is
        // a valid host
        if (!authority) {
            return;
        }

        // enable port component
        if (/:(\d+)$/.test(authority)) {
            port = authority.match(/:(\d+)$/)[0];
            authority = authority.replace(/:\d+$/, '');
        }

        out += scheme + ':';
        out += '//' + authority;
        
        if (port) {
            out += port;
        }
        
        out += path;
        
        if(query && query.length){
            out += '?' + query;
        }

        if(fragment && fragment.length){
            out += '#' + fragment;
        }
        
        return out;
    }

    function is_https_iri(value) {
        return is_http_iri(value, true);
    }

    function is_web_iri(value) {
        return (is_http_iri(value) || is_https_iri(value));
    }

})(module);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else context[name] = definition();

})('li', function () {
  // compile regular expressions ahead of time for efficiency
  var relsRegExp = /^;\s*([^"=]+)=(?:"([^"]+)"|([^";,]+)(?:[;,]|$))/;
  var keysRegExp = /([^\s]+)/g;
  var sourceRegExp = /^<([^>]*)>/;
  var delimiterRegExp = /^\s*,\s*/;

  return {
    parse: function (linksHeader, options) {
      var match;
      var source;
      var rels;
      var extended = options && options.extended || false;
      var links = [];

      while (linksHeader) {
        linksHeader = linksHeader.trim();

        // Parse `<link>`
        source = sourceRegExp.exec(linksHeader);
        if (!source) break;

        var current = {
          link: source[1]
        };

        // Move cursor
        linksHeader = linksHeader.slice(source[0].length);

        // Parse `; attr=relation` and `; attr="relation"`

        var nextDelimiter = linksHeader.match(delimiterRegExp);
        while(linksHeader && (!nextDelimiter || nextDelimiter.index > 0)) {
          match = relsRegExp.exec(linksHeader);
          if (!match) break;

          // Move cursor
          linksHeader = linksHeader.slice(match[0].length);
          nextDelimiter = linksHeader.match(delimiterRegExp);


          if (match[1] === 'rel' || match[1] === 'rev') {
            // Add either quoted rel or unquoted rel
            rels = (match[2] || match[3]).split(/\s+/);
            current[match[1]] = rels;
          } else {
            current[match[1]] = match[2] || match[3];
          }
        }

        links.push(current);
        // Move cursor
        linksHeader = linksHeader.replace(delimiterRegExp, '');
      }

      if (!extended) {
        return links.reduce(function(result, currentLink) {
          if (currentLink.rel) {
            currentLink.rel.forEach(function(rel) {
              result[rel] = currentLink.link;
            });
          }
          return result;
        }, {});
      }

      return links;
    },
    stringify: function (headerObject, callback) {
      var result = "";
      for (var x in headerObject) {
        result += '<' + headerObject[x] + '>; rel="' + x + '", ';
      }
      result = result.substring(0, result.length - 2);

      return result;
    }
  };

}, this);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  'OIDCWebClient': __webpack_require__(51),
  'LocalJsonStore': __webpack_require__(39)
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelyingParty = __webpack_require__(20);
var Session = __webpack_require__(17);
var storage = __webpack_require__(87);

// URI parameter types

var _require = __webpack_require__(40),
    QUERY = _require.QUERY;

var OIDCWebClient = function () {
  /**
   * @constructor
   *
   * @param [options={}] {Object}
   *
   * @param options.provider {string} Provider (issuer) URL
   *
   * @param options.defaults {Object} Relying Party registration defaults
   *
   * @param options.clients {LocalJsonStore<RelyingParty>} Relying Party registration store
   * @param options.session {LocalJsonStore<Session>} Session store
   * @param options.providers {LocalJsonStore<string>} Stores provider URI by state
   *
   * @param options.store {LocalStorage} Storage to pass to RP instances
   */
  function OIDCWebClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OIDCWebClient);

    this.defaults = options.defaults || {};

    this.browser = options.browser || __webpack_require__(40);

    this.provider = options.provider || this.defaults.issuer || null;

    this.store = options.store || storage.defaultStore();

    this.clients = options.clients || storage.defaultClientStore(this.store);
    this.session = options.session || storage.defaultSessionStore(this.store);
    this.providers = options.providers || storage.defaultProviderStore(this.store);
  }

  /**
   * @returns {Promise<Session>}
   */


  _createClass(OIDCWebClient, [{
    key: 'currentSession',
    value: function currentSession() {
      var _this = this;

      return this.session.get() // try loading a saved session

      // If no session, attempt to parse it from authentication response
      .then(function (session) {
        return session || _this.sessionFromResponse();
      })

      // Failing that, return an empty session
      .then(function (session) {
        return session || Session.from({});
      });
    }

    /**
     * @param provider {string} Provider URI
     *
     * @param [options={}] {object}
     *
     * @returns {Promise} Currently ends in a window redirect
     */

  }, {
    key: 'login',
    value: function login(provider) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return Promise.resolve(provider)
      // .then(provider => provider || this.selectProviderUI())

      .then(function (provider) {
        return _this2.rpFor(provider, options);
      }).then(function (rp) {
        return _this2.sendAuthRequest(rp);
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      // TODO: send a logout request to the RP
      this.clients.clear();
      this.session.clear();
    }

    /**
     * sessionFromResponse
     *
     * @description
     * Determines if the current url has an authentication response in its
     * hash fragment, and initializes a session from it if present.
     * Resolves with an empty session otherwise.
     *
     * @returns {Promise<Session|null>}
     */

  }, {
    key: 'sessionFromResponse',
    value: function sessionFromResponse() {
      var _this3 = this;

      if (!this.browser.currentUriHasAuthResponse()) {
        return Promise.resolve(null);
      }

      var responseUri = this.browser.currentLocation();

      var state = this.browser.stateFromUri(responseUri);

      return this.providers.get(state).then(function (provider) {
        if (!provider) {
          throw new Error('Could not load provider uri from response state param');
        }

        return _this3.rpFor(provider);
      }).then(function (rp) {
        return rp.validateResponse(responseUri, _this3.store);
      }).then(function (session) {
        _this3.browser.clearAuthResponseFromUrl();

        return _this3.session.save(session); // returns session
      }).catch(function (error) {
        console.log(error);

        return null;
      });
    }

    /**
     * Open a Select Provider popup
     * @returns {Promise}
     */
    // selectProviderUI () {
    //   return Promise.resolve(null)
    // }

    /**
     * @param provider {string} Provider (issuer) url
     * @param options {object}
     *
     * @returns {Promise<RelyingParty>}
     */

  }, {
    key: 'rpFor',
    value: function rpFor(provider, options) {
      var _this4 = this;

      return this.clients.get(provider).then(function (rp) {
        return rp || _this4.register(provider, options);
      });
    }

    /**
     * Registers a public relying party client, saves the resulting
     * registration in the clients storage, and resolves with it (the rp instance)
     *
     * @param provider
     * @param options
     * @returns {Promise<RelyingParty>}
     */

  }, {
    key: 'register',
    value: function register(provider, options) {
      var _this5 = this;

      return this.registerPublicClient(provider, options).then(function (rp) {
        return _this5.clients.save(provider, rp);
      });
    }

    /**
     * @param provider
     * @param options
     * @returns {Promise<RelyingParty>}
     */

  }, {
    key: 'registerPublicClient',
    value: function registerPublicClient(provider) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      provider = provider || options.issuer;
      var redirectUri = options['redirect_uri'] || this.browser.currentLocation();

      var registration = {
        issuer: provider,
        grant_types: options['grant_types'] || ['implicit'],
        redirect_uris: [redirectUri],
        response_types: options['response_types'] || ['id_token token'],
        scope: options['scope'] || 'openid profile'
      };

      var rpOptions = {
        defaults: {
          authenticate: {
            redirect_uri: redirectUri,
            response_type: 'id_token token'
          }
        },
        store: this.store
      };

      return this.registerClient(provider, registration, rpOptions);
    }

    /**
     * @param provider
     * @param registration
     * @param rpOptions
     * @returns {Promise<RelyingParty>}
     */

  }, {
    key: 'registerClient',
    value: function registerClient(provider, registration, rpOptions) {
      return RelyingParty.register(provider, registration, rpOptions);
    }

    /**
     * @param rp {RelyingParty}
     *
     * @return {Promise}
     */

  }, {
    key: 'sendAuthRequest',
    value: function sendAuthRequest(rp) {
      var _this6 = this;

      var options = {};
      var providerUri = rp.provider.url;

      return rp.createRequest(options, this.store).then(function (authUri) {
        var state = _this6.browser.stateFromUri(authUri, QUERY);

        _this6.providers.save(state, providerUri); // save provider by state

        return _this6.browser.redirectTo(authUri);
      });
    }
  }]);

  return OIDCWebClient;
}();

module.exports = OIDCWebClient;

/***/ }),
/* 52 */
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

exports.isBuffer = __webpack_require__(54);

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
exports.inherits = __webpack_require__(55);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(53)))

/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 55 */
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPatch = __webpack_require__(24);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPointer = __webpack_require__(14);

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
/* 58 */
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

var Initializer = __webpack_require__(23);
var Validator = __webpack_require__(25);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var pad_string_1 = __webpack_require__(63);
function encode(input, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(new Buffer(input, encoding).toString("base64"));
}
;
function decode(base64url, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    return new Buffer(toBase64(base64url), "base64").toString(encoding);
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
    return new Buffer(toBase64(base64url), "base64");
}
var base64url = encode;
base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = base64url;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 60 */
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

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
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
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = nBytes * 8 - mLen - 1
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
      m = (value * c - 1) * Math.pow(2, mLen)
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
/* 62 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
function padString(input) {
    var segmentLength = 4;
    var stringLength = input.length;
    var diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    var position = stringLength;
    var padLength = segmentLength - diff;
    var paddedStringLength = stringLength + padLength;
    var buffer = new Buffer(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = padString;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */
var None = __webpack_require__(65);
var HMAC = __webpack_require__(66);
var RSASSA_PKCS1_v1_5 = __webpack_require__(68);
var SupportedAlgorithms = __webpack_require__(69

/**
 * Register Supported Algorithms
 */
);var supportedAlgorithms = new SupportedAlgorithms();

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
})
//supportedAlgorithms.define('ES256', 'sign', {})
//supportedAlgorithms.define('ES384', 'sign', {})
//supportedAlgorithms.define('ES512', 'sign', {})
//supportedAlgorithms.define('PS256', 'sign', {})
//supportedAlgorithms.define('PS384', 'sign', {})
//supportedAlgorithms.define('PS512', 'sign', {})

);supportedAlgorithms.define('none', 'sign', new None({
  // nothing goes here
})

/**
 * Verify
 */
);supportedAlgorithms.define('HS256', 'verify', new HMAC({
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
})
//supportedAlgorithms.define('ES256', 'verify', {})
//supportedAlgorithms.define('ES384', 'verify', {})
//supportedAlgorithms.define('ES512', 'verify', {})
//supportedAlgorithms.define('PS256', 'verify', {})
//supportedAlgorithms.define('PS384', 'verify', {})
//supportedAlgorithms.define('PS512', 'verify', {})

);supportedAlgorithms.define('none', 'verify', new None({
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
})

/**
 * Export
 */
);module.exports = supportedAlgorithms;

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/**
 * Dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base64url = __webpack_require__(5);
var crypto = __webpack_require__(9);
var TextEncoder = __webpack_require__(26

/**
 * HMAC with SHA-2 Functions
 */
);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_67__;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/**
 * Dependencies
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base64url = __webpack_require__(5);
var crypto = __webpack_require__(9);
var TextEncoder = __webpack_require__(26

/**
 * RSASSA-PKCS1-v1_5
 */
);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var NotSupportedError = __webpack_require__(27

/**
 * Operations
 */
);var operations = ['sign', 'verify', 'encrypt', 'decrypt', 'importKey'];

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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Package dependencies
 */
var _require = __webpack_require__(0

/**
 * Format extensions
 */
),
    Formats = _require.Formats;

Formats.register('StringOrURI', new RegExp());
Formats.register('NumericDate', new RegExp());
Formats.register('URI', new RegExp());
Formats.register('url', new RegExp());
Formats.register('base64', new RegExp());
Formats.register('base64url', new RegExp());
Formats.register('MediaType', new RegExp());

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(0),
    JSONDocument = _require.JSONDocument;

var JWKSetSchema = __webpack_require__(31);
var JWK = __webpack_require__(30

/**
 * JWKSet
 *
 * @class
 * JWKSet represents a JSON Web Key Set as described in Section 5 of RFC 7517:
 * https://tools.ietf.org/html/rfc7517#section-5
 */
);
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
/* 72 */
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
var base64url = __webpack_require__(5);

var _require = __webpack_require__(0),
    JSONDocument = _require.JSONDocument;

var JWTSchema = __webpack_require__(32);
var JWS = __webpack_require__(36);
var DataError = __webpack_require__(29

/**
 * JWT
 */
);
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

          var header = JSON.parse(base64url.decode(segments[0])

          // JSON Web Signature
          );if (length === 3) {
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Dependencies
 */
const assert = __webpack_require__(8)
const base64url = __webpack_require__(5)
const crypto = __webpack_require__(9)
const { JWT } = __webpack_require__(3)
const FormUrlEncoded = __webpack_require__(37)
const { URL } = __webpack_require__(2)

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
  static create (rp, options, session) {
    const {provider, defaults, registration} = rp

    let issuer, endpoint, client, params

    return Promise.resolve()
      .then(() => {
        // validate presence of OP configuration, RP client registration,
        // and default parameters
        assert(provider.configuration,
          'RelyingParty provider OpenID Configuration is missing')

        assert(defaults.authenticate,
          'RelyingParty default authentication parameters are missing')

        assert(registration,
          'RelyingParty client registration is missing')

        // define basic elements of the request
        issuer = provider.configuration.issuer
        endpoint = provider.configuration.authorization_endpoint
        client = { client_id: registration.client_id}
        params = Object.assign(defaults.authenticate, client, options)

        // validate presence of required configuration and parameters
        assert(issuer,
          'Missing issuer in provider OpenID Configuration')

        assert(endpoint,
          'Missing authorization_endpoint in provider OpenID Configuration')

        assert(params.scope,
          'Missing scope parameter in authentication request')

        assert(params.response_type,
          'Missing response_type parameter in authentication request')

        assert(params.client_id,
          'Missing client_id parameter in authentication request')

        assert(params.redirect_uri,
          'Missing redirect_uri parameter in authentication request')

        // generate state and nonce random octets
        params.state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        params.nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))

        // hash the state and nonce parameter values
        return Promise.all([
          crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.state)),
          crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.nonce))
        ])
      })

      // serialize the request with original values, store in session by
      // encoded state param, and replace state/nonce octets with encoded
      // digests
      .then(digests => {
        let state = base64url(Buffer.from(digests[0]))
        let nonce = base64url(Buffer.from(digests[1]))
        let key = `${issuer}/requestHistory/${state}`

        // store the request params for response validation
        // with serialized octet values for state and nonce
        session[key] = JSON.stringify(params)

        // replace state and nonce octets with base64url encoded digests
        params.state = state
        params.nonce = nonce
      })

      .then(() => AuthenticationRequest.generateSessionKeys())

      .then(sessionKeys => {
        AuthenticationRequest.storeSessionKeys(sessionKeys, params, session)
      })

      // optionally encode a JWT with the request parameters
      // and replace params with `{ request: <jwt> }
      .then(() => {
        if (provider.configuration.request_parameter_supported) {
          return AuthenticationRequest.encodeRequestParams(params)

            .then(encodedParams => { params = encodedParams })
        }
      })

      // render the request URI and terminate the algorithm
      .then(() => {
        let url = new URL(endpoint)
        url.search = FormUrlEncoded.encode(params)

        return url.href
      })
  }

  static generateSessionKeys () {
    return crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" },
      },
      true,
      ["sign", "verify"]
    )
      .then((keyPair) => {
        // returns a keypair object
        return Promise.all([
          crypto.subtle.exportKey('jwk', keyPair.publicKey),
          crypto.subtle.exportKey('jwk', keyPair.privateKey)
        ])
      })
      .then(jwkPair => {
        let [ publicJwk, privateJwk ] = jwkPair

        return { public: publicJwk, private: privateJwk }
      })
  }

  static storeSessionKeys (sessionKeys, params, session) {
    // store the private one in session, public one goes into params
    session['oidc.session.privateKey'] = JSON.stringify(sessionKeys.private)
    params.key = sessionKeys.public
  }

  static encodeRequestParams (params) {
    const excludeParams = ['scope', 'client_id', 'response_type', 'state']

    const keysToEncode = Object.keys(params).filter(key => !excludeParams.includes(key))

    let payload = {}

    keysToEncode.forEach(key => {
      payload[key] = params[key]
    })

    let requestParamJwt = new JWT({
      header: { alg: 'none' },
      payload
    }, { filter: false })

    return requestParamJwt.encode()
      .then(requestParamCompact => {
        let newParams = {
          scope: params['scope'],
          client_id: params['client_id'],
          response_type: params['response_type'],
          request: requestParamCompact,
          state: params['state']
        }

        return newParams
      })
  }
}

/**
 * Export
 */
module.exports = AuthenticationRequest

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {/**
 * Dependencies
 */
const { URL } = __webpack_require__(2)
const assert = __webpack_require__(8)
const crypto = __webpack_require__(9)
const base64url = __webpack_require__(5)
const fetch = __webpack_require__(4)
const Headers = fetch.Headers ? fetch.Headers : global.Headers
const FormUrlEncoded = __webpack_require__(37)
const IDToken = __webpack_require__(75)
const Session = __webpack_require__(77)
const onHttpError = __webpack_require__(16)

/**
 * AuthenticationResponse
 */
class AuthenticationResponse {

  /**
   * validateResponse
   *
   * @description
   * Authentication response validation.
   *
   * @param {string|Object} response
   * @returns {Promise}
   */
  static validateResponse (response) {
    return Promise.resolve(response)
      .then(this.parseResponse)
      .then(this.matchRequest)
      .then(this.validateStateParam)
      .then(this.errorResponse)
      .then(this.validateResponseMode)
      .then(this.validateResponseParams)
      .then(this.exchangeAuthorizationCode)
      .then(this.validateIDToken)
      .then(Session.fromAuthResponse)
  }

  /**
   * parseResponse
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static parseResponse (response) {
    let {redirect, body} = response

    // response must be either a redirect uri or request body, but not both
    if ((redirect && body) || (!redirect && !body)) {
      throw new Error('Invalid response mode')
    }

    // parse redirect uri
    if (redirect) {
      let url = new URL(redirect)
      let {search, hash} = url

      if ((search && hash) || (!search && !hash)) {
        throw new Error('Invalid response mode')
      }

      if (search) {
        response.params = FormUrlEncoded.decode(search.substring(1))
        response.mode = 'query'
      }

      if (hash) {
        response.params = FormUrlEncoded.decode(hash.substring(1))
        response.mode = 'fragment'
      }
    }

    // parse request form body
    if (body) {
      response.params = FormUrlEncoded.decode(body)
      response.mode = 'form_post'
    }

    return response
  }

  /**
   * matchRequest
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static matchRequest (response) {
    let {rp, params, session} = response
    let state = params.state
    let issuer = rp.provider.configuration.issuer

    if (!state) {
      throw new Error(
        'Missing state parameter in authentication response')
    }

    let key = `${issuer}/requestHistory/${state}`
    let request = session[key]

    if (!request) {
      throw new Error(
        'Mismatching state parameter in authentication response')
    }

    response.request = JSON.parse(request)
    return response
  }

  /**
   * validateStateParam
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateStateParam (response) {
    let octets = new Uint8Array(response.request.state)
    let encoded = response.params.state

    return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(digest => {
      if (encoded !== base64url(Buffer.from(digest))) {
        throw new Error(
          'Mismatching state parameter in authentication response')
      }

      return response
    })
  }

  /**
   * errorResponse
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static errorResponse (response) {
    let error = response.params.error

    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve(response)
  }

  /**
   * validateResponseMode
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateResponseMode (response) {
    if (response.request.response_type !== 'code' && response.mode === 'query') {
      throw new Error('Invalid response mode')
    }

    return response
  }

  /**
   * validateResponseParams
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateResponseParams (response) {
    let {request, params} = response
    let expectedParams = request.response_type.split(' ')

    if (expectedParams.includes('code')) {
      assert(params.code,
        'Missing authorization code in authentication response')
      // TODO assert novelty of code
    }

    if (expectedParams.includes('id_token')) {
      assert(params.id_token,
        'Missing id_token in authentication response')
    }

    if (expectedParams.includes('token')) {
      assert(params.access_token,
        'Missing access_token in authentication response')

      assert(params.token_type,
        'Missing token_type in authentication response')
    }

    return response
  }

  /**
   * exchangeAuthorizationCode
   *
   * @param {Object} response
   * @returns {Promise} response object
   */
  static exchangeAuthorizationCode (response) {
    let {rp, params, request} = response
    let code = params.code

    // only exchange the authorization code when the response type is "code"
    if (!code || request['response_type'] !== 'code') {
      return Promise.resolve(response)
    }

    let {provider, registration} = rp
    let id = registration['client_id']
    let secret = registration['client_secret']

    // verify the client is not public
    if (!secret) {
        return Promise.reject(new Error(
          'Client cannot exchange authorization code because ' +
          'it is not a confidential client'))
    }

    // initialize token request arguments
    let endpoint = provider.configuration.token_endpoint
    let method = 'POST'

    // initialize headers
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    // initialize the token request parameters
    let bodyContents = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': request['redirect_uri']
    }

    // determine client authentication method
    let authMethod = registration['token_endpoint_auth_method']
      || 'client_secret_basic'

    // client secret basic authentication
    if (authMethod === 'client_secret_basic') {
      let credentials = new Buffer(`${id}:${secret}`).toString('base64')
      headers.set('Authorization', `Basic ${credentials}`)
    }

    // client secret post authentication
    if (authMethod === 'client_secret_post') {
      bodyContents['client_id'] = id
      bodyContents['client_secret'] = secret
    }

    let body = FormUrlEncoded.encode(bodyContents)

    // TODO
    // client_secret_jwt authentication
    // private_key_jwt

    // make the token request

    return fetch(endpoint, {method, headers, body})
      .then(onHttpError('Error exchanging authorization code'))
      .then(tokenResponse => tokenResponse.json())
      .then(tokenResponse => {
        assert(tokenResponse['access_token'],
          'Missing access_token in token response')

        assert(tokenResponse['token_type'],
          'Missing token_type in token response')

        assert(tokenResponse['id_token'],
          'Missing id_token in token response')

        // anything else?

        // IS THIS THE RIGHT THING TO DO HERE?
        response.params = Object.assign(response.params, tokenResponse)
        return response
      })
  }


  /**
   * validateIDToken
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateIDToken (response) {
    // only validate the ID Token if present in the response
    if (!response.params.id_token) {
      return Promise.resolve(response)
    }

    return Promise.resolve(response)
      .then(AuthenticationResponse.decryptIDToken)
      .then(AuthenticationResponse.decodeIDToken)
      .then(AuthenticationResponse.validateIssuer)
      .then(AuthenticationResponse.validateAudience)
      .then(AuthenticationResponse.resolveKeys)
      .then(AuthenticationResponse.verifySignature)
      .then(AuthenticationResponse.validateExpires)
      .then(AuthenticationResponse.verifyNonce)
      .then(AuthenticationResponse.validateAcr)
      .then(AuthenticationResponse.validateAuthTime)
      .then(AuthenticationResponse.validateAccessTokenHash)
      .then(AuthenticationResponse.validateAuthorizationCodeHash)
  }

  /**
   * decryptIDToken
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static decryptIDToken (response) {
    // TODO
    return Promise.resolve(response)
  }

  /**
   * decodeIDToken
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static decodeIDToken (response) {
    let jwt = response.params.id_token

    if (jwt) {
      response.decoded = IDToken.decode(jwt)
    }

    return response
  }


  /**
   * validateIssuer
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateIssuer (response) {
    let configuration = response.rp.provider.configuration
    let payload = response.decoded.payload

    // validate issuer of token matches this relying party's provider
    if (payload.iss !== configuration.issuer) {
      throw new Error('Mismatching issuer in ID Token')
    }

    return response
  }

  /**
   * validateAudience
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateAudience (response) {
    let registration = response.rp.registration
    let {aud, azp} = response.decoded.payload

    // validate audience includes this relying party
    if (typeof aud === 'string' && aud !== registration['client_id']) {
      throw new Error('Mismatching audience in id_token')
    }

    // validate audience includes this relying party
    if (Array.isArray(aud) && !aud.includes(registration['client_id'])) {
      throw new Error('Mismatching audience in id_token')
    }

    // validate authorized party is present if required
    if (Array.isArray(aud) && !azp) {
      throw new Error('Missing azp claim in id_token')
    }

    // validate authorized party is this relying party
    if (azp && azp !== registration['client_id']) {
      throw new Error('Mismatching azp claim in id_token')
    }

    return response
  }


  /**
   * resolveKeys
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static resolveKeys (response) {
    let rp = response.rp
    let provider = rp.provider
    let decoded = response.decoded

    return Promise.resolve(provider.jwks)

      .then(jwks => jwks ? jwks : rp.jwks())

      .then(jwks => {
        if (decoded.resolveKeys(jwks)) {
          return Promise.resolve(response)
        } else {
          throw new Error('Cannot resolve signing key for ID Token')
        }
      })
  }

  /**
   * verifySignature
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static verifySignature (response) {
    let alg = response.decoded.header.alg
    let registration = response.rp.registration
    let expectedAlgorithm = registration['id_token_signed_response_alg'] || 'RS256'

    // validate signing algorithm matches expectation
    if (alg !== expectedAlgorithm) {
      throw new Error(
        `Expected ID Token to be signed with ${expectedAlgorithm}`)
    }

    return response.decoded.verify().then(verified => {
      if (!verified) {
        throw new Error('Invalid ID Token signature')
      }

      return response
    })
  }

  /**
   * validateExpires
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateExpires (response) {
    let exp = response.decoded.payload.exp

    // validate expiration of token
    if (exp <= Math.floor(Date.now() / 1000)) {
      throw new Error('Expired ID Token')
    }

    return response
  }

  /**
   * verifyNonce
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static verifyNonce (response) {
    let octets = new Uint8Array(response.request.nonce)
    let nonce = response.decoded.payload.nonce

    if (!nonce) {
      throw new Error('Missing nonce in ID Token')
    }

    return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(digest => {
      if (nonce !== base64url(Buffer.from(digest))) {
        throw new Error('Mismatching nonce in ID Token')
      }

      return response
    })
  }

  /**
   * validateAcr
   *
   * @param {Object} response
   * @returns {Object}
   */
  static validateAcr (response) {
    // TODO
    return response
  }

  /**
   * validateAuthTime
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateAuthTime (response) {
    // TODO
    return response
  }

  /**
   * validateAccessTokenHash
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateAccessTokenHash (response) {
    // TODO
    return response
  }

  /**
   * validateAuthorizationCodeHash
   *
   * @param {Object} response
   * @returns {Promise}
   */
  static validateAuthorizationCodeHash (response) {
    // TODO
    return response
  }
}

/**
 * Export
 */
module.exports = AuthenticationResponse

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(6).Buffer))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Local dependencies
 */
const {JWT} = __webpack_require__(3)
const IDTokenSchema = __webpack_require__(76)

/**
 * IDToken
 */
class IDToken extends JWT {

  /**
   * Schema
   */
  static get schema () {
    return IDTokenSchema
  }
}

/**
 * Export
 */
module.exports = IDToken


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Local dependencies
 */
const {JWTSchema} = __webpack_require__(3)

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
    header: {
      //not: { required: ['x5u', 'x5c', 'jku', 'jwk'] }
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
        iss: { type: 'string', format: 'url' },

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
        sub: { type: 'string', maxLength: 255 },

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
        auth_time: { type: 'integer', format: 'NumericDate' },

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
        nonce: { type: 'string' },

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
        acr: { type: 'string' },

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
        amr: { type: 'array', items: { type: 'string' } },

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
        azp: { type: 'string', format: 'StringOrURI' }
      },

      /**
       * Required Claims
       */
      required: ['iss', 'sub', 'aud', 'exp', 'iat']
    }
  }
})

/**
 * Export
 */
module.exports = IDTokenSchema


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fetch = __webpack_require__(4)
const onHttpError = __webpack_require__(16)
const PoPToken = __webpack_require__(78)

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
  constructor (options) {
    this.credentialType = options.credentialType || 'access_token'

    this.issuer = options.issuer

    this.authorization = options.authorization || {}

    this.sessionKey = options.sessionKey

    this.idClaims = options.idClaims
    this.accessClaims = options.accessClaims
  }

  static from (options) {
    return new Session(options)
  }

  /**
   * @param response {AuthenticationResponse}
   *
   * @returns {Session}
   */
  static fromAuthResponse (response) {
    const RelyingParty = __webpack_require__(21)  // import here due to circular dep

    let payload = response.decoded.payload
    let registration = response.rp.registration
    let rpAuthOptions = response.rp.authenticate || {}

    let sessionKey = response.session[RelyingParty.SESSION_PRIVATE_KEY]

    let options = {
      sessionKey,
      issuer: payload.iss,
      credentialType: rpAuthOptions['credential_type'],
      authorization: {
        client_id: registration['client_id'],
        access_token: response.params['access_token'],
        id_token: response.params['id_token'],
        refresh_token: response.params['refresh_token']
      },
      idClaims: response.decoded && response.decoded.payload,
    }

    return Session.from(options)
  }

  /**
   * Authenticated fetch() getter
   *
   * @returns {function}
   */
  get fetch () {
    /**
     * fetch() function signature
     *
     * @param url {RequestInfo|string}
     * @param options {object}
     *
     * @returns {Promise<Response>}
     */
    return (url, options) => {
      return fetch(url, options)

        .then(response => {
          if (response.status === 401 && this.hasCredentials()) {
            // Retry with credentials
            return this.fetchWithCredentials(url, options)
          }

          if (!response.ok) {
            onHttpError()(response)  // throw error
          }

          return response
        })
    }
  }

  /**
   * bearerTokenFor
   *
   * @param url {string}
   *
   * @returns {Promise<string>}
   */
  bearerTokenFor (url) {
    switch (this.credentialType) {
      case 'pop_token':
        return PoPToken.issueFor(url, this)

      default:  // 'access_token' etc
        return Promise.resolve(this.authorization[this.credentialType])
    }
  }

  /**
   * hasCredentials
   *
   * @returns {boolean}
   */
  hasCredentials () {
    switch (this.credentialType) {
      case 'pop_token':
        return !!this.authorization['id_token']

      default:  // 'access_token' etc
        return !!this.authorization[this.credentialType]
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
  fetchWithCredentials (url, options) {
    options.headers = options.headers || {}

    return this.bearerTokenFor(url)

      .then(token => {
        options.headers.authorization = `Bearer ${token}`

        return fetch(url, options)
      })
  }
}

module.exports = Session


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { URL } = __webpack_require__(2)
const {JWT, JWK} = __webpack_require__(3)

const DEFAULT_MAX_AGE = 3600  // Default token expiration, in seconds

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
  static issueFor (resourceServerUri, session) {
    if (!resourceServerUri) {
      throw new Error('Cannot issue PoPToken - missing resource server URI')
    }

    if (!session.sessionKey) {
      throw new Error('Cannot issue PoPToken - missing session key')
    }

    if (!session.authorization.id_token) {
      throw new Error('Cannot issue PoPToken - missing id token')
    }

    let jwk = JSON.parse(session.sessionKey)

    return JWK.importKey(jwk)
      .then(importedSessionJwk => {
        let options = {
          aud: (new URL(resourceServerUri)).origin,
          key: importedSessionJwk,
          iss: session.authorization.client_id,
          id_token: session.authorization.id_token
        }

        return PoPToken.issue(options)
      })
      .then(jwt => {
        return jwt.encode()
      })
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
  static issue (options) {
    let { aud, iss, key } = options

    let alg = key.alg
    let iat = options.iat || Math.floor(Date.now() / 1000)
    let max = options.max || DEFAULT_MAX_AGE

    let exp = iat + max  // token expiration

    let header = { alg }
    let payload = { iss, aud, exp, iat, id_token: options.id_token, token_type: 'pop' }

    let jwt = new PoPToken({ header, payload, key: key.cryptoKey }, { filter: false })

    return jwt
  }
}

module.exports = PoPToken


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Dependencies
 */
const {JSONSchema} = __webpack_require__(0)

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
        name: { type: 'string' },
        url: { type: 'string', format: 'uri' },
        // NOTE:
        // OpenID Configuration (discovery response) and JSON Web Keys Set for an
        // issuer can be cached here. However the cache should not be persisted or
        // relied upon.
        //
        configuration: {}, // .well-known/openid-configuration
        jwks: {}           // /jwks
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
              default: 'id_token token', // browser detection
              enum: [
                'code',
                'token',
                'id_token token',
                'id_token token code'
              ]
            },
            display: {
              type: 'string',
              default: 'page',
              enum: [
                'page',
                'popup'
              ]
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
    registration: {},// ClientMetadataSchema

    /**
     * store
     */
    store: {
      type: 'object',
      default: {}
    }
  }
})

/**
 * Export
 */
module.exports = RelyingPartySchema


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(2),
    URL = _require.URL;

var _require2 = __webpack_require__(3),
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

      var header = { alg: alg };
      var payload = { iss: iss, aud: aud, exp: exp, iat: iat, id_token: options.id_token, token_type: 'pop' };

      var jwt = new PoPToken({ header: header, payload: payload, key: key.cryptoKey }, { filter: false });

      return jwt;
    }
  }]);

  return PoPToken;
}(JWT);

module.exports = PoPToken;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dependencies
 */
var assert = __webpack_require__(8);
var fetch = __webpack_require__(4);

var _require = __webpack_require__(2),
    URL = _require.URL;

var Headers = fetch.Headers ? fetch.Headers : global.Headers;

var _require2 = __webpack_require__(0),
    JSONDocument = _require2.JSONDocument;

var _require3 = __webpack_require__(3),
    JWKSet = _require3.JWKSet;

var AuthenticationRequest = __webpack_require__(82);
var AuthenticationResponse = __webpack_require__(83);
var RelyingPartySchema = __webpack_require__(86);
var onHttpError = __webpack_require__(18);

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
 *    authenticate: {
 *      response_type: 'code',
 *      display: 'popup',
 *      scope: 'openid profile email'
 *    },
 *    register: {
 *      client_name: 'Example',
 *      client_uri: 'https://example.com',
 *      logo_uri: 'https://example.com/assets/logo.png',
 *      redirect_uris: ['https://app.example.com/callback'],
 *      response_types: ['code', 'code id_token token'],
 *      grant_types: ['authorization_code'],
 *      default_max_age: 7200,
 *      post_logout_redirect_uris: ['https://app.example.com']
 *    },
 *    registration: {
 *      // if you have it saved somewhere
 *    },
 *    store: localStorage || req.session,
 *    popup: { width: 400, height: 300 }
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

var RelyingParty = function (_JSONDocument) {
  _inherits(RelyingParty, _JSONDocument);

  function RelyingParty() {
    _classCallCheck(this, RelyingParty);

    return _possibleConstructorReturn(this, (RelyingParty.__proto__ || Object.getPrototypeOf(RelyingParty)).apply(this, arguments));
  }

  _createClass(RelyingParty, [{
    key: 'discover',


    /**
     * Discover
     *
     * @description Fetches the issuer's OpenID Configuration.
     * @returns {Promise<Object>} Resolves with the provider configuration response
     */
    value: function discover() {
      var _this2 = this;

      try {
        var issuer = this.provider.url;

        assert(issuer, 'RelyingParty provider must define "url"');

        var url = new URL(issuer);
        url.pathname = '.well-known/openid-configuration';

        return fetch(url.toString()).then(onHttpError('Error fetching openid configuration')).then(function (response) {
          return response.json().then(function (json) {
            return _this2.provider.configuration = json;
          });
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

  }, {
    key: 'register',
    value: function register(options) {
      var _this3 = this;

      try {
        var configuration = this.provider.configuration;

        assert(configuration, 'OpenID Configuration is not initialized.');
        assert(configuration.registration_endpoint, 'OpenID Configuration is missing registration_endpoint.');

        var uri = configuration.registration_endpoint;
        var method = 'post';
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var params = this.defaults.register;
        var body = JSON.stringify(Object.assign({}, params, options));

        return fetch(uri, { method: method, headers: headers, body: body }).then(onHttpError('Error registering client')).then(function (response) {
          return response.json().then(function (json) {
            return _this3.registration = json;
          });
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return JSON.stringify(this);
    }

    /**
     * jwks
     *
     * @description Promises the issuer's JWK Set.
     * @returns {Promise}
     */

  }, {
    key: 'jwks',
    value: function jwks() {
      var _this4 = this;

      try {
        var configuration = this.provider.configuration;

        assert(configuration, 'OpenID Configuration is not initialized.');
        assert(configuration.jwks_uri, 'OpenID Configuration is missing jwks_uri.');

        var uri = configuration.jwks_uri;

        return fetch(uri).then(onHttpError('Error resolving provider keys')).then(function (response) {
          return response.json().then(function (json) {
            return JWKSet.importKeys(json);
          }).then(function (jwks) {
            return _this4.provider.jwks = jwks;
          });
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

  }, {
    key: 'createRequest',
    value: function createRequest(options, session) {
      return AuthenticationRequest.create(this, options, session || this.store);
    }

    /**
     * Validate Response
     *
     * @param response {string} req.query or req.body.text
     * @param session {Session|Storage} req.session or localStorage or similar
     * @returns {Promise<Object>} Custom response object, with `params` and
     *   `mode` properties
     */

  }, {
    key: 'validateResponse',
    value: function validateResponse(response, session) {
      session = session || this.store;

      if (response.match(/^http(s?):\/\//)) {
        response = { rp: this, redirect: response, session: session };
      } else {
        response = { rp: this, body: response, session: session };
      }

      return AuthenticationResponse.validateResponse(response);
    }

    /**
     * userinfo
     *
     * @description Promises the authenticated user's claims.
     * @returns {Promise}
     */

  }, {
    key: 'userinfo',
    value: function userinfo() {
      try {
        var configuration = this.provider.configuration;

        assert(configuration, 'OpenID Configuration is not initialized.');
        assert(configuration.userinfo_endpoint, 'OpenID Configuration is missing userinfo_endpoint.');

        var uri = configuration.userinfo_endpoint;
        var access_token = this.store.access_token;

        assert(access_token, 'Missing access token.');

        var headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        });

        return fetch(uri, { headers: headers }).then(onHttpError('Error fetching userinfo')).then(function (response) {
          return response.json();
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }

    /**
     * Logout
     *
     * @returns {Promise}
     */

  }, {
    key: 'logout',
    value: function logout() {
      var configuration = void 0;
      try {
        assert(this.provider, 'OpenID Configuration is not initialized.');
        configuration = this.provider.configuration;
        assert(configuration, 'OpenID Configuration is not initialized.');
        assert(configuration.end_session_endpoint, 'OpenID Configuration is missing end_session_endpoint.');
      } catch (error) {
        return Promise.reject(error);
      }

      this.clearSession();

      var uri = configuration.end_session_endpoint;
      var method = 'get';

      return fetch(uri, { method: method }).then(onHttpError('Error logging out'));

      // TODO: Validate `frontchannel_logout_uri` if necessary
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
  }, {
    key: 'clearSession',
    value: function clearSession() {
      var session = this.store;

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

  }, {
    key: 'popTokenFor',
    value: function popTokenFor(uri, idToken) {
      return PoPToken.issueFor(uri, idToken, this);
    }
  }], [{
    key: 'from',


    /**
     * from
     *
     * @description
     * Create a RelyingParty instance from a previously registered client.
     *
     * @param {Object} data
     * @returns {Promise<RelyingParty>}
     */
    value: function from(data) {
      var rp = new RelyingParty(data);
      var validation = rp.validate();

      // schema validation
      if (!validation.valid) {
        return Promise.reject(new Error(JSON.stringify(validation)));
      }

      var jwks = rp.provider.jwks;

      // request the JWK Set if missing
      if (!jwks) {
        return rp.jwks().then(function () {
          return rp;
        });
      }

      // otherwise import the JWK Set to webcrypto
      return JWKSet.importKeys(jwks).then(function (jwks) {
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

  }, {
    key: 'register',
    value: function register(issuer, registration, options) {
      var rp = new RelyingParty({
        provider: { url: issuer },
        defaults: Object.assign({}, options.defaults),
        store: options.store
      });

      return Promise.resolve().then(function () {
        return rp.discover();
      }).then(function () {
        return rp.jwks();
      }).then(function () {
        return rp.register(registration);
      }).then(function () {
        return rp;
      });
    }
  }, {
    key: 'schema',


    /**
     * Schema
     */
    get: function get() {
      return RelyingPartySchema;
    }
  }]);

  return RelyingParty;
}(JSONDocument);

var SESSION_PRIVATE_KEY = 'oidc.session.privateKey';

RelyingParty.SESSION_PRIVATE_KEY = SESSION_PRIVATE_KEY;

module.exports = RelyingParty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var assert = __webpack_require__(8);
var base64url = __webpack_require__(5);
var crypto = __webpack_require__(9);

var _require = __webpack_require__(3),
    JWT = _require.JWT;

var FormUrlEncoded = __webpack_require__(38);

var _require2 = __webpack_require__(2),
    URL = _require2.URL;

/**
 * Authentication Request
 */


var AuthenticationRequest = function () {
  function AuthenticationRequest() {
    _classCallCheck(this, AuthenticationRequest);
  }

  _createClass(AuthenticationRequest, null, [{
    key: 'create',

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
    value: function create(rp, options, session) {
      var provider = rp.provider,
          defaults = rp.defaults,
          registration = rp.registration;


      var issuer = void 0,
          endpoint = void 0,
          client = void 0,
          params = void 0;

      return Promise.resolve().then(function () {
        // validate presence of OP configuration, RP client registration,
        // and default parameters
        assert(provider.configuration, 'RelyingParty provider OpenID Configuration is missing');

        assert(defaults.authenticate, 'RelyingParty default authentication parameters are missing');

        assert(registration, 'RelyingParty client registration is missing');

        // define basic elements of the request
        issuer = provider.configuration.issuer;
        endpoint = provider.configuration.authorization_endpoint;
        client = { client_id: registration.client_id };
        params = Object.assign(defaults.authenticate, client, options);

        // validate presence of required configuration and parameters
        assert(issuer, 'Missing issuer in provider OpenID Configuration');

        assert(endpoint, 'Missing authorization_endpoint in provider OpenID Configuration');

        assert(params.scope, 'Missing scope parameter in authentication request');

        assert(params.response_type, 'Missing response_type parameter in authentication request');

        assert(params.client_id, 'Missing client_id parameter in authentication request');

        assert(params.redirect_uri, 'Missing redirect_uri parameter in authentication request');

        // generate state and nonce random octets
        params.state = Array.from(crypto.getRandomValues(new Uint8Array(16)));
        params.nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)));

        // hash the state and nonce parameter values
        return Promise.all([crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.state)), crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.nonce))]);
      })

      // serialize the request with original values, store in session by
      // encoded state param, and replace state/nonce octets with encoded
      // digests
      .then(function (digests) {
        var state = base64url(Buffer.from(digests[0]));
        var nonce = base64url(Buffer.from(digests[1]));
        var key = issuer + '/requestHistory/' + state;

        // store the request params for response validation
        // with serialized octet values for state and nonce
        session[key] = JSON.stringify(params);

        // replace state and nonce octets with base64url encoded digests
        params.state = state;
        params.nonce = nonce;
      }).then(function () {
        return AuthenticationRequest.generateSessionKeys();
      }).then(function (sessionKeys) {
        AuthenticationRequest.storeSessionKeys(sessionKeys, params, session);
      })

      // optionally encode a JWT with the request parameters
      // and replace params with `{ request: <jwt> }
      .then(function () {
        if (provider.configuration.request_parameter_supported) {
          return AuthenticationRequest.encodeRequestParams(params).then(function (encodedParams) {
            params = encodedParams;
          });
        }
      })

      // render the request URI and terminate the algorithm
      .then(function () {
        var url = new URL(endpoint);
        url.search = FormUrlEncoded.encode(params);

        return url.href;
      });
    }
  }, {
    key: 'generateSessionKeys',
    value: function generateSessionKeys() {
      return crypto.subtle.generateKey({
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" }
      }, true, ["sign", "verify"]).then(function (keyPair) {
        // returns a keypair object
        return Promise.all([crypto.subtle.exportKey('jwk', keyPair.publicKey), crypto.subtle.exportKey('jwk', keyPair.privateKey)]);
      }).then(function (jwkPair) {
        var _jwkPair = _slicedToArray(jwkPair, 2),
            publicJwk = _jwkPair[0],
            privateJwk = _jwkPair[1];

        return { public: publicJwk, private: privateJwk };
      });
    }
  }, {
    key: 'storeSessionKeys',
    value: function storeSessionKeys(sessionKeys, params, session) {
      // store the private one in session, public one goes into params
      session['oidc.session.privateKey'] = JSON.stringify(sessionKeys.private);
      params.key = sessionKeys.public;
    }
  }, {
    key: 'encodeRequestParams',
    value: function encodeRequestParams(params) {
      var excludeParams = ['scope', 'client_id', 'response_type', 'state'];

      var keysToEncode = Object.keys(params).filter(function (key) {
        return !excludeParams.includes(key);
      });

      var payload = {};

      keysToEncode.forEach(function (key) {
        payload[key] = params[key];
      });

      var requestParamJwt = new JWT({
        header: { alg: 'none' },
        payload: payload
      }, { filter: false });

      return requestParamJwt.encode().then(function (requestParamCompact) {
        var newParams = {
          scope: params['scope'],
          client_id: params['client_id'],
          response_type: params['response_type'],
          request: requestParamCompact,
          state: params['state']
        };

        return newParams;
      });
    }
  }]);

  return AuthenticationRequest;
}();

/**
 * Export
 */


module.exports = AuthenticationRequest;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependencies
 */
var _require = __webpack_require__(2),
    URL = _require.URL;

var assert = __webpack_require__(8);
var crypto = __webpack_require__(9);
var base64url = __webpack_require__(5);
var fetch = __webpack_require__(4);
var Headers = fetch.Headers ? fetch.Headers : global.Headers;
var FormUrlEncoded = __webpack_require__(38);
var IDToken = __webpack_require__(84);
var Session = __webpack_require__(17);
var onHttpError = __webpack_require__(18);

/**
 * AuthenticationResponse
 */

var AuthenticationResponse = function () {
  function AuthenticationResponse() {
    _classCallCheck(this, AuthenticationResponse);
  }

  _createClass(AuthenticationResponse, null, [{
    key: 'validateResponse',


    /**
     * validateResponse
     *
     * @description
     * Authentication response validation.
     *
     * @param {string|Object} response
     * @returns {Promise}
     */
    value: function validateResponse(response) {
      return Promise.resolve(response).then(this.parseResponse).then(this.matchRequest).then(this.validateStateParam).then(this.errorResponse).then(this.validateResponseMode).then(this.validateResponseParams).then(this.exchangeAuthorizationCode).then(this.validateIDToken).then(Session.fromAuthResponse);
    }

    /**
     * parseResponse
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'parseResponse',
    value: function parseResponse(response) {
      var redirect = response.redirect,
          body = response.body;

      // response must be either a redirect uri or request body, but not both

      if (redirect && body || !redirect && !body) {
        throw new Error('Invalid response mode');
      }

      // parse redirect uri
      if (redirect) {
        var url = new URL(redirect);
        var search = url.search,
            hash = url.hash;


        if (search && hash || !search && !hash) {
          throw new Error('Invalid response mode');
        }

        if (search) {
          response.params = FormUrlEncoded.decode(search.substring(1));
          response.mode = 'query';
        }

        if (hash) {
          response.params = FormUrlEncoded.decode(hash.substring(1));
          response.mode = 'fragment';
        }
      }

      // parse request form body
      if (body) {
        response.params = FormUrlEncoded.decode(body);
        response.mode = 'form_post';
      }

      return response;
    }

    /**
     * matchRequest
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'matchRequest',
    value: function matchRequest(response) {
      var rp = response.rp,
          params = response.params,
          session = response.session;

      var state = params.state;
      var issuer = rp.provider.configuration.issuer;

      if (!state) {
        throw new Error('Missing state parameter in authentication response');
      }

      var key = issuer + '/requestHistory/' + state;
      var request = session[key];

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

  }, {
    key: 'validateStateParam',
    value: function validateStateParam(response) {
      var octets = new Uint8Array(response.request.state);
      var encoded = response.params.state;

      return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(function (digest) {
        if (encoded !== base64url(Buffer.from(digest))) {
          throw new Error('Mismatching state parameter in authentication response');
        }

        return response;
      });
    }

    /**
     * errorResponse
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'errorResponse',
    value: function errorResponse(response) {
      var error = response.params.error;

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(response);
    }

    /**
     * validateResponseMode
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'validateResponseMode',
    value: function validateResponseMode(response) {
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

  }, {
    key: 'validateResponseParams',
    value: function validateResponseParams(response) {
      var request = response.request,
          params = response.params;

      var expectedParams = request.response_type.split(' ');

      if (expectedParams.includes('code')) {
        assert(params.code, 'Missing authorization code in authentication response');
        // TODO assert novelty of code
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

  }, {
    key: 'exchangeAuthorizationCode',
    value: function exchangeAuthorizationCode(response) {
      var rp = response.rp,
          params = response.params,
          request = response.request;

      var code = params.code;

      // only exchange the authorization code when the response type is "code"
      if (!code || request['response_type'] !== 'code') {
        return Promise.resolve(response);
      }

      var provider = rp.provider,
          registration = rp.registration;

      var id = registration['client_id'];
      var secret = registration['client_secret'];

      // verify the client is not public
      if (!secret) {
        return Promise.reject(new Error('Client cannot exchange authorization code because ' + 'it is not a confidential client'));
      }

      // initialize token request arguments
      var endpoint = provider.configuration.token_endpoint;
      var method = 'POST';

      // initialize headers
      var headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      // initialize the token request parameters
      var bodyContents = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': request['redirect_uri']

        // determine client authentication method
      };var authMethod = registration['token_endpoint_auth_method'] || 'client_secret_basic';

      // client secret basic authentication
      if (authMethod === 'client_secret_basic') {
        var credentials = new Buffer(id + ':' + secret).toString('base64');
        headers.set('Authorization', 'Basic ' + credentials);
      }

      // client secret post authentication
      if (authMethod === 'client_secret_post') {
        bodyContents['client_id'] = id;
        bodyContents['client_secret'] = secret;
      }

      var body = FormUrlEncoded.encode(bodyContents);

      // TODO
      // client_secret_jwt authentication
      // private_key_jwt

      // make the token request

      return fetch(endpoint, { method: method, headers: headers, body: body }).then(onHttpError('Error exchanging authorization code')).then(function (tokenResponse) {
        return tokenResponse.json();
      }).then(function (tokenResponse) {
        assert(tokenResponse['access_token'], 'Missing access_token in token response');

        assert(tokenResponse['token_type'], 'Missing token_type in token response');

        assert(tokenResponse['id_token'], 'Missing id_token in token response');

        // anything else?

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

  }, {
    key: 'validateIDToken',
    value: function validateIDToken(response) {
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

  }, {
    key: 'decryptIDToken',
    value: function decryptIDToken(response) {
      // TODO
      return Promise.resolve(response);
    }

    /**
     * decodeIDToken
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'decodeIDToken',
    value: function decodeIDToken(response) {
      var jwt = response.params.id_token;

      if (jwt) {
        response.decoded = IDToken.decode(jwt);
      }

      return response;
    }

    /**
     * validateIssuer
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'validateIssuer',
    value: function validateIssuer(response) {
      var configuration = response.rp.provider.configuration;
      var payload = response.decoded.payload;

      // validate issuer of token matches this relying party's provider
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

  }, {
    key: 'validateAudience',
    value: function validateAudience(response) {
      var registration = response.rp.registration;
      var _response$decoded$pay = response.decoded.payload,
          aud = _response$decoded$pay.aud,
          azp = _response$decoded$pay.azp;

      // validate audience includes this relying party

      if (typeof aud === 'string' && aud !== registration['client_id']) {
        throw new Error('Mismatching audience in id_token');
      }

      // validate audience includes this relying party
      if (Array.isArray(aud) && !aud.includes(registration['client_id'])) {
        throw new Error('Mismatching audience in id_token');
      }

      // validate authorized party is present if required
      if (Array.isArray(aud) && !azp) {
        throw new Error('Missing azp claim in id_token');
      }

      // validate authorized party is this relying party
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

  }, {
    key: 'resolveKeys',
    value: function resolveKeys(response) {
      var rp = response.rp;
      var provider = rp.provider;
      var decoded = response.decoded;

      return Promise.resolve(provider.jwks).then(function (jwks) {
        return jwks ? jwks : rp.jwks();
      }).then(function (jwks) {
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

  }, {
    key: 'verifySignature',
    value: function verifySignature(response) {
      var alg = response.decoded.header.alg;
      var registration = response.rp.registration;
      var expectedAlgorithm = registration['id_token_signed_response_alg'] || 'RS256';

      // validate signing algorithm matches expectation
      if (alg !== expectedAlgorithm) {
        throw new Error('Expected ID Token to be signed with ' + expectedAlgorithm);
      }

      return response.decoded.verify().then(function (verified) {
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

  }, {
    key: 'validateExpires',
    value: function validateExpires(response) {
      var exp = response.decoded.payload.exp;

      // validate expiration of token
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

  }, {
    key: 'verifyNonce',
    value: function verifyNonce(response) {
      var octets = new Uint8Array(response.request.nonce);
      var nonce = response.decoded.payload.nonce;

      if (!nonce) {
        throw new Error('Missing nonce in ID Token');
      }

      return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(function (digest) {
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

  }, {
    key: 'validateAcr',
    value: function validateAcr(response) {
      // TODO
      return response;
    }

    /**
     * validateAuthTime
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'validateAuthTime',
    value: function validateAuthTime(response) {
      // TODO
      return response;
    }

    /**
     * validateAccessTokenHash
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'validateAccessTokenHash',
    value: function validateAccessTokenHash(response) {
      // TODO
      return response;
    }

    /**
     * validateAuthorizationCodeHash
     *
     * @param {Object} response
     * @returns {Promise}
     */

  }, {
    key: 'validateAuthorizationCodeHash',
    value: function validateAuthorizationCodeHash(response) {
      // TODO
      return response;
    }
  }]);

  return AuthenticationResponse;
}();

/**
 * Export
 */


module.exports = AuthenticationResponse;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(6).Buffer))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Local dependencies
 */
var _require = __webpack_require__(3),
    JWT = _require.JWT;

var IDTokenSchema = __webpack_require__(85);

/**
 * IDToken
 */

var IDToken = function (_JWT) {
  _inherits(IDToken, _JWT);

  function IDToken() {
    _classCallCheck(this, IDToken);

    return _possibleConstructorReturn(this, (IDToken.__proto__ || Object.getPrototypeOf(IDToken)).apply(this, arguments));
  }

  _createClass(IDToken, null, [{
    key: 'schema',


    /**
     * Schema
     */
    get: function get() {
      return IDTokenSchema;
    }
  }]);

  return IDToken;
}(JWT);

/**
 * Export
 */


module.exports = IDToken;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */
var _require = __webpack_require__(3),
    JWTSchema = _require.JWTSchema;

/**
 * IDToken Schema
 */


var IDTokenSchema = JWTSchema.extend({
  properties: {

    /**
     * header
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken
     * ID Tokens SHOULD NOT use the JWS or JWE x5u, x5c, jku, or jwk Header
     * Parameter fields. Instead, references to keys used are communicated in
     * advance using Discovery and Registration parameters, per Section 10.
     */
    header: {
      //not: { required: ['x5u', 'x5c', 'jku', 'jwk'] }
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
        iss: { type: 'string', format: 'url' },

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
        sub: { type: 'string', maxLength: 255 },

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
        auth_time: { type: 'integer', format: 'NumericDate' },

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
        nonce: { type: 'string' },

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
        acr: { type: 'string' },

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
        amr: { type: 'array', items: { type: 'string' } },

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
        azp: { type: 'string', format: 'StringOrURI' }
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
var _require = __webpack_require__(0),
    JSONSchema = _require.JSONSchema;

/**
 * RelyingParty Schema
 *
 * This schema initializes and verifies Relying Party client configuration.
 * RelyingParty objects can be persisted and rehydrated. By encapsulating this data in
 * it's own class, it's possible to have multiple RP configurations running
 * simultaneously.
 */


var RelyingPartySchema = new JSONSchema({
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
        name: { type: 'string' },
        url: { type: 'string', format: 'uri' },
        // NOTE:
        // OpenID Configuration (discovery response) and JSON Web Keys Set for an
        // issuer can be cached here. However the cache should not be persisted or
        // relied upon.
        //
        configuration: {}, // .well-known/openid-configuration
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
              default: 'id_token token', // browser detection
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
    registration: {}, // ClientMetadataSchema

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var RelyingParty = __webpack_require__(20);
var LocalJsonStore = __webpack_require__(39);
var Session = __webpack_require__(17);

module.exports = {
  defaultClientStore: defaultClientStore,
  defaultProviderStore: defaultProviderStore,
  defaultSessionStore: defaultSessionStore,
  defaultStore: defaultStore
};

function defaultStore() {
  return global.localStorage;
}

function defaultClientStore(store) {
  return new LocalJsonStore('oidc.clients', {
    className: RelyingParty,
    store: store || defaultStore()
  });
}

function defaultSessionStore(store) {
  return new LocalJsonStore('oidc.session', {
    className: Session,
    store: store || defaultStore()
  });
}

/**
 * Store Provider URIs by state param
 *
 * @param store
 *
 * @returns {LocalJsonStore}
 */
function defaultProviderStore(store) {
  return new LocalJsonStore('oidc.providers', {
    store: store || defaultStore()
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const doc = __webpack_require__(41)
const uri = __webpack_require__(11)
const graph = __webpack_require__(13)
const fetcher = __webpack_require__(10)
const Config = __webpack_require__(7)

module.exports = {
  getEndpoint,
  getEndpointFromHead,
  getEndpointFromRDF,
  getMatchFromData,
  notifyInbox,
  sendNotifications
}

function sendNotifications (tos, note, iri, shareResource) {
  return new Promise((resolve, reject) => {
    var notificationData = {
      'type': ['as:Announce'],
      'object': iri,
      'summary': note,
      'license': 'https://creativecommons.org/licenses/by/4.0/'
    }

    let data = doc.getDocument()

    let options = {
      'contentType': 'text/html',
      'subjectURI': iri
    }
    var spo = {
      'subject': iri,
      'predicate': Config.Vocab['rdftype']['@id']
    }

    getMatchFromData(data, spo, options)
      .then(supplementalData => {
        if (typeof supplementalData !== 'undefined' && supplementalData._array.length > 0) {
          notificationData['objectTypes'] = supplementalData._array
        }

        let spo = {
          'subject': iri,
          'predicate': Config.Vocab['schemalicense']['@id']
        }

        return getMatchFromData(data, spo, options)
          .then(data => {
            if (typeof data !== 'undefined' && data.length > 0) {
              notificationData['objectLicense'] = data
            }
          })
      })
      .then(() => {
        tos.forEach(to => {
          notificationData['to'] = to

          var toInput = shareResource.querySelector('[value="' + to + '"]') ||
            shareResource.querySelector('#share-resource-to')

          toInput.parentNode.insertAdjacentHTML('beforeend',
            '<span class="progress" data-to="' + to +
            '"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>')

          inboxResponse(to, toInput)

            .then(inbox => {
              notificationData['inbox'] = inbox

              notifyInbox(notificationData)

                .catch(error => {
                  console.log('Error in notifyInbox:', error)
                  toInput
                    .parentNode
                    .querySelector('.progress[data-to="' + to + '"]')
                    .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to notify. Try later.'
                })

                .then(response => {
                    var location = response.headers.get('Location')

                    if (location) {
                      location = uri.getAbsoluteIRI(inbox, location)

                      toInput
                        .parentNode
                        .querySelector('.progress[data-to="' + to + '"]')
                        .innerHTML = '<a target="_blank" href="' +
                        location + '"><i class="fa fa-check-circle fa-fw"></i></a>'
                    }
                  }
                )
            })
        })
      })
  })
}

function getMatchFromData (data, spo = {}, options = {}) {
  if (!data) { return Promise.resolve({}) }

  spo['subject'] = spo.subject || window.location.origin + window.location.pathname
  spo['predicate'] = spo.predicate || Config.Vocab['rdfslabel']

  options['contentType'] = options.contentType || 'text/html'
  options['subjectURI'] = options.subjectURI || spo.subject

  return graph.getGraphFromData(data, options)
    .then(g => {
      let s = SimpleRDF(Config.Vocab, spo.subject, g, ld.store).child(spo.subject)

      return s[spo.predicate]
    })
    .catch(() => {
      return undefined
    })
}

function inboxResponse (to, toInput) {
  return getEndpoint(Config.Vocab['ldpinbox']['@id'], to)
    .then(inboxes => inboxes[0])

    .catch(error => {
      console.log('Error in inboxResponse:', error)

      toInput
        .parentNode
        .querySelector('.progress[data-to="' + to + '"]')
        .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Inbox not responding. Try later.'
    })
}

function notifyInbox (o) {
  var slug, inbox

  if ('slug' in o) {
    slug = o.slug
  }
  if ('inbox' in o) {
    inbox = o.inbox
  }

  var types = '<dt>Types</dt>'

  o.type.forEach(function (t) {
    types += '<dd><a about="" href="' + Config.Prefixes[t.split(':')[0]] + t.split(':')[1] + '" typeof="'+ t +'">' + t.split(':')[1] + '</a></dd>'
  })

  var asObjectTypes = ''
  if ('object' in o && 'objectTypes' in o && o.objectTypes.length > 0) {
    asObjectTypes = '<dl><dt>Types</dt>'
    o.objectTypes.forEach(function(t){
      asObjectTypes += '<dd><a about="' + o.object + '" href="' + t + '" typeof="'+ t +'">' + t + '</a></dd>'
    })
    asObjectTypes += '</dl>'
  }

  var asObjectLicense = ''
  if ('object' in o && 'objectLicense' in o && o.objectLicense.length > 0) {
    asObjectLicense = '<dl><dt>License</dt><dd><a about="' + o.object + '" href="' + o.objectLicense + '" property="schema:license">' + o.objectLicense + '</a></dd></dl>'
  }

  var asobject = ('object' in o) ? '<dt>Object</dt><dd><a href="' + o.object + '" property="as:object">' + o.object + '</a>' + asObjectTypes + asObjectLicense + '</dd>' : ''

  var asinReplyTo = ('inReplyTo' in o) ? '<dt>In reply to</dt><dd><a href="' + o.inReplyTo + '" property="as:inReplyTo">' + o.inReplyTo + '</a></dd>' : ''

  var ascontext = ('context' in o && o.context.length > 0) ? '<dt>Context</dt><dd><a href="' + o.context + '" property="as:context">' + o.context + '</a></dd>' : ''

  var astarget = ('target' in o && o.target.length > 0) ? '<dt>Target</dt><dd><a href="' + o.target + '" property="as:target">' + o.target + '</a></dd>' : ''

  var datetime = DO.U.getDateTimeISO()
  var asupdated = '<dt>Updated</dt><dd><time datetime="' + datetime + '" datatype="xsd:dateTime" property="as:updated" content="' + datetime + '">' + datetime.substr(0,19).replace('T', ' ') + '</time></dd>'

  var assummary = ('summary' in o && o.summary.length > 0) ? '<dt>Summary</dt><dd property="as:summary" datatype="rdf:HTML">' + o.summary + '</dd>' : ''

  var ascontent = ('content' in o && o.content.length > 0) ? '<dt>Content</dt><dd property="as:content" datatype="rdf:HTML">' + o.content + '</dd>' : ''

  var asactor = (Config.User.IRI) ? '<dt>Actor</dt><dd><a href="' + Config.User.IRI + '" property="as:actor">' + Config.User.IRI + '</a></dd>' : ''

  var license = '<dt>License</dt><dd><a href="' + Config.NotificationLicense + '" property="schema:license">' + Config.NotificationLicense + '</a></dd>'

  var asto = ('to' in o && o.to.length > 0 && !o.to.match(/\s/g) && o.to.match(/^https?:\/\//gi)) ? '<dt>To</dt><dd><a href="' + o.to + '" property="as:to">' + o.to + '</a></dd>' : ''

  var statements = ('statements' in o) ? o.statements : ''

  var dl = [
    types,
    asobject,
    ascontext,
    astarget,
    asupdated,
    assummary,
    ascontent,
    asactor,
    license,
    asto
  ].map(function (n) { if (n !== '') { return '      ' + n + '\n' } }).join('')


  // TODO: Come up with a better title. reuse `types` e.g., Activity Created, Announced..
  var title = 'Notification'
  if(types.indexOf('as:Announce') > -1){
    title += ': Announced'
  } else if (types.indexOf('as:Created') > -1){
    title += ': Created'
  } else if (types.indexOf('as:Liked') > -1){
    title += ': Liked'
  } else if (types.indexOf('as:Disliked') > -1){
    title += ': Disliked'
  }

  var data = '\n\
<article>\n\
  <h1>' + title + '</h1>\n\
  <section>\n\
    <dl about="">\n\
' + dl +
    '    </dl>\n\
    ' + statements +
    '  </section>\n\
    </article>\n\
    '

  var options = {}
  options.prefixes = Config.Prefixes

  data = DO.U.createHTML(title, data, options)

  if (!inbox) {
    return Promise.reject(new Error('No inbox to send notification to'))
  }

  var pIRI = uri.getProxyableIRI(inbox)

  return fetcher.getAcceptPostPreference(pIRI)
    .then(preferredContentType => {
      let options = {
        'contentType': 'text/html',
        'subjectURI': 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d'
      }

      switch (preferredContentType) {
        case 'text/html':
        case 'application/xhtml+xml':
          return fetcher.postResource(pIRI, slug, data, 'text/html; charset=utf-8')

        case 'text/turtle':
          // FIXME: proxyURL + http URL doesn't work. https://github.com/solid/node-solid-server/issues/351
          // return DO.U.postResource(pIRI, slug, data, 'text/turtle; charset=utf-8')
          return graph.getGraphFromData(data, options)
            .then(g => {
              let options = {
                'contentType': 'text/turtle'
              }

              return graph.serializeGraph(g, options)
            })
            .then(data => {
              // FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
              data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '')

              // XXX: Workaround for rdf-parser-rdfa bug that gives
              // '@language' instead of @type when encountering datatype in HTML+RDFa .
              // TODO: Link to bug here
              data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;')

              return fetcher.postResource(pIRI, slug, data, 'text/turtle')
            })

        case 'application/ld+json':
        case 'application/json':
        case '*/*':
        default:
          return graph.getGraphFromData(data, options)
            .then(g => {
              let options = {
                'contentType': 'application/ld+json'
              }

              return graph.serializeGraph(g, options)
            })
            .then(serialized => {
              let parsedData = JSON.parse(serialized)

              parsedData[0]["@context"] = [
                "https://www.w3.org/ns/activitystreams",
                {"oa": "http://www.w3.org/ns/anno.jsonld"}
              ]
              // If from is Turtle:
              // x[0]["@id"] = (x[0]["@id"].slice(0,2) == '_:') ? '' : x[0]["@id"];
              parsedData[0]["@id"] = (parsedData[0]["@id"] === 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d') ? '' : parsedData[0]["@id"];

              // XXX: Workaround for rdf-parser-rdfa bug that gives
              // '@language' instead of @type when encountering datatype in HTML+RDFa .
              // TODO: Link to bug here
              for (let i = 0; i < parsedData.length; i++) {
                if ('https://www.w3.org/ns/activitystreams#updated' in parsedData[i]) {
                  parsedData[i]['https://www.w3.org/ns/activitystreams#updated'] = {
                    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                    '@value': parsedData[i]['https://www.w3.org/ns/activitystreams#updated']['@value']
                  }
                }
              }

              let data = JSON.stringify(parsedData) + '\n'

              return fetcher.postResource(pIRI, slug, data, 'application/ld+json; profile="http://www.w3.org/ns/anno.jsonld"')
            })
      }
    })
}

function getEndpoint (property, url) {
  if (url) {
    return getEndpointFromHead(property, url)
      .catch(() => getEndpointFromRDF(property, url))
  } else {
    var uri = window.location.href.split(window.location.search || window.location.hash || /[?#]/)[0]

    var options = {
      'contentType': 'text/html',
      'subjectURI': uri
    }

    return graph.getGraphFromData(doc.getDocument(), options)
      .then(function (result) {
          // TODO: Should this get all of the inboxes or a given subject's?
          var endpoints = result.match(uri, property).toArray()

          if (endpoints.length > 0) {
            return endpoints.map(function(t){ return t.object.nominalValue })
          }

          console.log(property + ' endpoint was not found in message body')
          return getEndpointFromHead(property, uri)
        })
      .catch(() => getEndpointFromHead(property, uri))
  }
}

function getEndpointFromHead (property, url) {
  var pIRI = uri.getProxyableIRI(url);

  return fetcher.getResourceHead(pIRI, {'header': 'Link'}).then(
    function (i) {
      var linkHeaders = fetcher.parseLinkHeader(i.headers)

      if (property in linkHeaders) {
        return linkHeaders[property]
      }
      return Promise.reject({'message': property + " endpoint was not found in 'Link' header"})
    },
    function (reason) {
      return Promise.reject({'message': "'Link' header not found"})
    }
  );
}

function getEndpointFromRDF (property, url, subjectIRI) {
  url = url || window.location.origin + window.location.pathname
  subjectIRI = subjectIRI || url

  return fetcher.getResourceGraph(subjectIRI)
    .then(function (i) {
        var s = i.child(subjectIRI)

        switch (property) {
          case Config.Vocab['ldpinbox']['@id']:
            if (s.ldpinbox._array.length > 0){
// console.log(s.ldpinbox._array)
              return [s.ldpinbox.at(0)]
            }
            break
          case Config.Vocab['oaannotationService']['@id']:
            if (s.oaannotationService._array.length > 0){
// console.log(s.oaannotationService._array)
              return [s.oaannotationService.at(0)]
            }
            break
        }

        throw new Error(property + ' endpoint was not found in message body')
      }
    )
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=do.js.map