'use strict'

const config = require('./config')

module.exports = {
  encodeString,
  decodeString,
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
