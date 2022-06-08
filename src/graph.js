'use strict'

const ld = require('./simplerdf')
const SimpleRDF = ld.SimpleRDF
const Config = require('./config')
const doc = require('./doc')
const uri = require('./uri')

module.exports = {
  getGraph,
  getGraphFromData,
  getMatchFromData,
  serializeData,
  serializeGraph,
  applyParserSerializerFixes,
  setDocumentBase
}

function getGraph (url) {
  return SimpleRDF(Config.Vocab, url, null, ld.store).get()
}

function getGraphFromData (data, options = {}) {
  if (!('contentType' in options)) {
    options['contentType'] = 'text/turtle'
  }
  //Attempt to handle text/plain as text/html (for RDFa)
  options.contentType = (options.contentType == 'text/plain') ? 'text/html' : options.contentType

  // FIXME: These are fugly but a temporary fix to get around the baseURI not being passed to the DOM parser. This injects the `base` element into the document so that the parsers fallsback to that. The actual fix should happen upstream. See related issues:
  // https://github.com/linkeddata/dokieli/issues/132
  // https://github.com/rdf-ext/rdf-parser-dom/issues/2
  // https://github.com/rdf-ext/rdf-parser-rdfa/issues/3
  // https://github.com/simplerdf/simplerdf/issues/19

  if (!('subjectURI' in options)) {
    // console.log(options)
    options['subjectURI'] = 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d'
  }

  if (options.contentType == 'text/html' || options.contentType == 'application/xhtml+xml' || options.contentType == 'text/turtle' || options.contentType == 'application/ld+json') {
      data = setDocumentBase(data, options.subjectURI, options.contentType)
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

// console.log(data)

  return getGraphFromData(data, options)
    .then(g => {

      options.contentType = toContentType

      switch (toContentType) {
        case 'application/ld+json':
// console.log(g)
          return serializeGraph(g, options).then(subjectTriples => {
            subjectTriples = JSON.parse(subjectTriples)

            var data = {}
            if (options["@context"]) {
              data["@context"] = options["@context"]
            }

            var subjectsChecked = []
            var subjectsList = []
            var rootIndex = 0

            for(var i = 0; i < subjectTriples.length; i++) {
              subjectsList.push(subjectTriples[i]["@id"])

              if ("@id" in subjectTriples[i] && subjectTriples[i]["@id"] == options.subjectURI) {
                Object.assign(data, subjectTriples[i])

                subjectsChecked.push(options.subjectURI)

                rootIndex = i
              }
            }

            var processObject = function(subject) {
              var properties = Object.keys(subject)
              properties.forEach(property => {
                if (typeof subject[property] === 'object') {
                  if ("@id" in subject[property]
                    && subjectsChecked.indexOf(subject[property]["@id"]) < 0
                    && subjectsList.indexOf(subject[property]["@id"]) > -1) {

                    subjectTriples.forEach(o => {
                      if (o["@id"] == subject[property]["@id"]) {
                        subject[property] = o;

                        subjectsChecked.push(subject[property]["@id"])
                      }
                    })
                  }

                  return Object.assign({}, processObject(subject[property]))
                }
              })

              return subject
            }

            var subject = subjectTriples[rootIndex]

            Object.assign(data, processObject(subject))

// console.log(data)
// console.log(JSON.stringify(data))
            return JSON.stringify(data) + '\n'
          })

        default:
          return serializeGraph(g, options)
      }     
    })
    .then(data => {
      switch (toContentType) {
        default:
          break;

        case 'application/ld+json':
          //TODO: Lazy person's JSON-LD compacting. Expect errors!
          if (options["@context"]) {
            var context = (typeof options["@context"] === 'string') ? [options["@context"]] : options['@context']

            data = JSON.parse(data);
            delete data["@context"]
            data = JSON.stringify(data)

            data = data.replace(new RegExp('"@id"', 'g'), '"id"')
            data = data.replace(new RegExp('"@type"', 'g'), '"type"')

            context.forEach(function(c){
              var search = '';
              var replace = '';

              if (typeof c === 'string') {
                switch(c) {
                  case 'http://www.w3.org/ns/anno.jsonld':
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#autoDirection', 'g'), 'auto')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#cachedSource', 'g'), 'cached')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasBody', 'g'), 'body')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasEndSelector', 'g'), 'endSelector')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasPurpose', 'g'), 'purpose')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasScope', 'g'), 'scope')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasSelector', 'g'), 'selector')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasSource', 'g'), 'source')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasStartSelector', 'g'), 'startSelector')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#hasTarget', 'g'), 'target')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#ltrDirection', 'g'), 'ltr')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#motivatedBy', 'g'), 'motivation')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#rtlDirection', 'g'), 'rtl')
                    data = data.replace(new RegExp('http://www.w3.org/ns/oa#styledBy', 'g'), 'stylesheet')

                    data = data.replace(new RegExp('"oa:', 'g'), '"')

                    search = 'http://www.w3.org/ns/oa#'
                    break

                  case 'https://www.w3.org/ns/activitystreams':
                    data = data.replace(new RegExp('"as:', 'g'), '"')

                    search = 'https://www.w3.org/ns/activitystreams#'
                    break

                  case 'http://schema.org/':
                    data = data.replace(new RegExp('"schema:', 'g'), '"')

                    search = 'http:/schema.org/'
                    break
                }
              }
              else {
                replace = Object.keys(c)[0];

                switch(replace) {
                  case 'oa':
                    search = 'http://www.w3.org/ns/oa#'
                    break

                  case 'as':
                    search = 'https://www.w3.org/ns/activitystreams#'
                    break

                  case 'schema':
                    search = 'http://schema.org/'
                    break
                }

                replace = replace + ':'
              }

              data = data.replace(new RegExp(search, 'g'), replace)

            })

            data = JSON.parse(data)
            data = Object.assign({"@context": options["@context"]}, data)
            data = JSON.stringify(data)
          }

          break;
      }
// console.log(data)
      return data
    })
}

function serializeGraph (g, options = {}) {
  if (!('contentType' in options)) {
    options['contentType'] = 'text/turtle'
  }

  return ld.store.serializers[options.contentType].serialize(g._graph)
    .then(data => {
      data = applyParserSerializerFixes(data, options.contentType)

      // XXX: .compact doesn't work as advertised
      // if (options.contentType === 'application/ld+json' && '@context' in options) {
      //   return jsonld.promises().compact(data, options['@context'], {'skipExpansion': true})
      // }

      return data
    })
}

function applyParserSerializerFixes(data, contentType) {
  // FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
  data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '');

  switch(contentType) {
    case 'text/turtle':
      //XXX: Workaround for rdf-parser-rdfa bug that gives '@langauge' instead of @type when encountering datatype in HTML+RDFa . TODO: Link to bug here
      data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;');
      data = data.replace(/start> "(\d+)"@en;/, 'start> "$1"^^<http://www.w3.org/2001/XMLSchema#nonNegativeInteger>;');
      data = data.replace(/end> "(\d+)"@en;/, 'end> "$1"^^<http://www.w3.org/2001/XMLSchema#nonNegativeInteger>;');
      data = data.replace(/\%2523/, '%23');
      break;

    case 'application/ld+json':
      var x = JSON.parse(data);

      //XXX: Workaround for rdf-parser-rdfa bug that gives '@language' instead of @type when encountering datatype in HTML+RDFa . See also https://github.com/rdf-ext/rdf-parser-rdfa/issues/5
      var properties = ['https://www.w3.org/ns/activitystreams#published', 'https://www.w3.org/ns/activitystreams#updated', 'http://schema.org/dateCreated', 'http://schema.org/datePublished', 'http://schema.org/dateModified', 'http://www.w3.org/ns/oa#start', 'http://www.w3.org/ns/oa#end'];

      for(var i = 0; i < x.length; i++){
        for(var j = 0; j < properties.length; j++){
          if(properties[j] in x[i]) {
            if (properties[j] == 'http://www.w3.org/ns/oa#start' || properties[j] == 'http://www.w3.org/ns/oa#end') {
              x[i][properties[j]] = {
                '@type': 'http://www.w3.org/2001/XMLSchema#nonNegativeInteger',
                '@value': x[i][properties[j]]['@value']
              };
            }
            else {
              x[i][properties[j]] = {
                '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                '@value': x[i][properties[j]]['@value']
              };
            }
          }
        }
      }

      data = JSON.stringify(x);
      break;
  }        

  return data;
}

function setDocumentBase (data, baseURI, contentType) {
  baseURI = uri.stripFragmentFromString(baseURI)

  switch(contentType) {
    case 'text/html': case 'application/xhtml+xml':
      let template = document.implementation.createHTMLDocument()
      template.documentElement.innerHTML = data
      let base = template.querySelector('head base[href]')
      if (!base) {
        template.querySelector('head').insertAdjacentHTML('afterbegin', '<base href="' + baseURI + '" />')
        data = template.documentElement.outerHTML
      }
      break;

    case 'text/turtle':
      data = `@base <` + baseURI + `> .\n` + data;
      break;

    case 'application/json': case 'application/ld+json':
      data = JSON.parse(data);
      data['@context'] = (data['@context']) ? data['@context'] : {'@base': baseURI};

      if (Array.isArray(data['@context'])) {
        var found = false;
        data['@context'].forEach(function(a){
          if (typeof a === 'object' && '@base' in a) {
            found = true;
          }
        })
        if (!found) {
          data['@context'].push({'@base': baseURI});
        }
      }
      else if (typeof data['@context'] === 'object' && !('@base' in data['@context'])) {
        data['@context']['@base'] = baseURI;
      }

      data = JSON.stringify(data);
      break;

    default:
      break;
  }
// console.log(data)
  return data
}
