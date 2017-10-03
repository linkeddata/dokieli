'use strict'

module.exports = {
  encodeString
}

function encodeString (string) {
  return encodeURIComponent(string).replace(/'/g,"%27").replace(/"/g,"%22");
}
