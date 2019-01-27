'use strict'

const Config = require('./config')

module.exports = {
  encodeString,
  decodeString,
  getAbsoluteIRI,
  getProxyableIRI,
  stripFragmentFromString,
  getFragmentFromString
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
    var proxyURL = ('proxyURL' in options)
      ? options.proxyURL
      : (Config.User.ProxyURL)
        ? Config.User.ProxyURL
        : Config.ProxyURL
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

function getFragmentFromString (string) {
  if (typeof string === 'string') {
    let match = string.split('#')[1]

    string = (match) ? match : '';
  }
  return string 
}