'use strict'

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
