'use strict'

module.exports = {
  uniqueArray,
  getHash,
  getDateTimeISO,
  removeChildren,
  copyTextToClipboard,
  escapeRegExp
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