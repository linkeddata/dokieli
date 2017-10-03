'use strict'

global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined

module.exports = {
  getGraphFromData
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
