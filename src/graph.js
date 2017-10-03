'use strict'

global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined

const graph = require('./graph')

module.exports = {
  getGraphFromData,
  serializeData,
  serializeGraph
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

  return graph.getGraphFromData(data, options)
    .then(g => {
      options.contentType = toContentType

      return graph.serializeGraph(g, options)
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
