"use strict";

module.exports = {
  uniqueArray,
  getDateTimeISO,
  removeChildren,
  copyTextToClipboard,
  escapeRegExp,
  sleep,
  fragmentFromString,
  generateUUID,
  generateAttributeId,
  getHash,
  hashCode,
  sortTriples,
};

/**
 * @param a {Array}
 *
 * @returns {Array}
 */
function uniqueArray(a) {
  var n = {};
  var r = [];
  for (var i = 0; i < a.length; i++) {
    if (!n[a[i]]) {
      n[a[i]] = true;
      r.push(a[i]);
    }
  }
  return r;
}

function getDateTimeISO() {
  var date = new Date();
  return date.toISOString();
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    try {
      var successful = document.execCommand("copy");
    } catch (err) {}
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      // console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      // console.error('Async: Could not copy text: ', err);
    }
  );
}

//From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//http://stackoverflow.com/a/25214113
function fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}

// MIT license
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function generateUUID() {
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? "0" : "") + i.toString(16);
  }
  var s = function () {
    var d0 = (Math.random() * 0xffffffff) | 0;
    var d1 = (Math.random() * 0xffffffff) | 0;
    var d2 = (Math.random() * 0xffffffff) | 0;
    var d3 = (Math.random() * 0xffffffff) | 0;
    return (
      lut[d0 & 0xff] +
      lut[(d0 >> 8) & 0xff] +
      lut[(d0 >> 16) & 0xff] +
      lut[(d0 >> 24) & 0xff] +
      "-" +
      lut[d1 & 0xff] +
      lut[(d1 >> 8) & 0xff] +
      "-" +
      lut[((d1 >> 16) & 0x0f) | 0x40] +
      lut[(d1 >> 24) & 0xff] +
      "-" +
      lut[(d2 & 0x3f) | 0x80] +
      lut[(d2 >> 8) & 0xff] +
      "-" +
      lut[(d2 >> 16) & 0xff] +
      lut[(d2 >> 24) & 0xff] +
      lut[d3 & 0xff] +
      lut[(d3 >> 8) & 0xff] +
      lut[(d3 >> 16) & 0xff] +
      lut[(d3 >> 24) & 0xff]
    );
  };
  return s();
}

function generateAttributeId(prefix, string) {
  prefix = prefix || "";

  if (string) {
    //XXX: I think we want to trim.
    string = string.trim();
    string = string.replace(/\W/g, "-");
    var s1 = string.substr(0, 1);
    string =
      prefix === "" && s1 == parseInt(s1) ? "x-" + string : prefix + string;
    return document.getElementById(string) ? string + "-x" : string;
  } else {
    return generateUUID();
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
function getHash(message, algo = "SHA-256") {
  var buffer = new TextEncoder("utf-8").encode(message);
  return window.crypto.subtle.digest(algo, buffer).then(function (hash) {
    var hexCodes = [];
    var view = new DataView(hash);
    for (var i = 0; i < view.byteLength; i += 4) {
      var value = view.getUint32(i);
      var stringValue = value.toString(16);
      var padding = "00000000";
      var paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
  });
}

//From http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function hashCode(s) {
  var hash = 0;
  if (s.length == 0) return hash;
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function sortTriples(triples, options) {
  options = options || {};
  if (!("sortBy" in options)) {
    options["sortBy"] = "object";
  }

  triples._graph.sort(function (a, b) {
    return a[options.sortBy].nominalValue
      .toLowerCase()
      .localeCompare(b[options.sortBy].nominalValue.toLowerCase());
  });

  return triples;
}
