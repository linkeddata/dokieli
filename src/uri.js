'use strict'

module.exports = {
  encodeString,
  decodeString
}

function encodeString (string) {
  return encodeURIComponent(string).replace(/'/g,"%27").replace(/"/g,"%22")
}

/**
 * UNUSED
 *
 * @param string {string}
 *
 * @returns {string}
 */
function decodeString (string) {
  return decodeURIComponent(string.replace(/\+/g,  ' '))
}
