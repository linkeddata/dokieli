'use strict'

global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined

const Config = require('./config')

module.exports = {
  getGraph,
  getGraphFromData,
  getMatchFromData,
  serializeData,
  serializeGraph
}

function getGraph (url) {
  return SimpleRDF(Config.Vocab, url, null, ld.store).get()
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

function getMatchFromData (data, spo = {}, options = {}) {
  if (!data) { return Promise.resolve({}) }

  spo['subject'] = spo.subject || window.location.origin + window.location.pathname
  spo['predicate'] = spo.predicate || Config.Vocab['rdfslabel']

  options['contentType'] = options.contentType || 'text/html'
  options['subjectURI'] = options.subjectURI || spo.subject

  return getGraphFromData(data, options)
    .then(g => {
      let s = SimpleRDF(Config.Vocab, spo.subject, g, ld.store).child(spo.subject)

      return s[spo.predicate]
    })
    .catch(() => {
      return undefined
    })
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

  return getGraphFromData(data, options)
    .then(g => {
      options.contentType = toContentType

      return serializeGraph(g, options)
    })
    .then(data => {
      switch (toContentType) {
        case 'application/ld+json':
          var parsed = JSON.parse(data)

          if(options['@context'] && options['@context'] == 'https://www.w3.org/ns/activitystreams') {
            parsed[0]['@context'] = [
              'https://www.w3.org/ns/activitystreams',
              {'oa': 'http://www.w3.org/ns/anno.jsonld'}
            ]            
          }
          else {
            parsed[0]['@context'] = [
              'http://www.w3.org/ns/anno.jsonld',
              {'as': 'https://www.w3.org/ns/activitystreams'}
            ]   
          }

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
    .then((data) => {
      if (options.contentType === 'application/ld+json' && 'context' in options) {
        return jsonld.promises().compact(data, options['context'])
      }

      return data
    })
}
