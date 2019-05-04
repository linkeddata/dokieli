'use strict'

const Config = require('./config')

module.exports = {
  uniqueArray,
  getHash,
  getDateTimeISO,
  removeChildren,
  copyTextToClipboard,
  escapeRegExp,
  sleep,
  fragmentFromString,
  generateUUID,
  isActor
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

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
function getHash (message, algo = "SHA-256") {
  var buffer = new TextEncoder("utf-8").encode(message);
  return window.crypto.subtle.digest(algo, buffer).then(function (hash) {
    var hexCodes = [];
    var view = new DataView(hash);
    for (var i = 0; i < view.byteLength; i += 4) {
      var value = view.getUint32(i)
      var stringValue = value.toString(16)
      var padding = '00000000'
      var paddedValue = (padding + stringValue).slice(-padding.length)
      hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
  });
}

function getDateTimeISO() {
  var date = new Date();
  return date.toISOString();
}


function removeChildren (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function copyTextToClipboard(text){
console.log(text)
  if (!navigator.clipboard) {
    try {
      var successful = document.execCommand('copy');
    } catch (err) {}
    return;
  }

  navigator.clipboard.writeText(text).then(function() {
    // console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    // console.error('Async: Could not copy text: ', err);
  });
}

//From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//http://stackoverflow.com/a/25214113
function fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}

// MIT license
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function generateUUID() {
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
}

function isActor (s) {
  var actorTypes = [
    'foafAgent', 'foafPerson', 'foafGroup', 'foafOrganization',
    'vcardVCard', 'vcardIndividual', 'vcardGroup', 'vcardOrganization',
    'schemaPerson', 'schemaOrganization',
    'dctermsAgent',
    'asApplication', 'asGroup', 'asOrganization', 'asPerson', 'asService'
  ];

  actorTypes = actorTypes.map(a => { if (Config.Vocab[a]["@id"]) return Config.Vocab[a]["@id"]; });

  if (actorTypes.indexOf(s) > -1) {
    return true;
  }

  return false;
}
