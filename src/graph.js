'use strict'

const ld = require('./simplerdf')
const SimpleRDF = ld.SimpleRDF
const Config = require('./config')
const uri = require('./uri')
const util = require('./util')
const fetcher = require('./fetcher')

module.exports = {
  getGraph,
  getGraphFromData,
  getMatchFromData,
  serializeData,
  serializeGraph,
  applyParserSerializerFixes,
  skolem,
  setDocumentBase,
  traverseRDFList,
  getResourceGraph,
  getLinkRelation,
  getLinkRelationFromHead,
  getLinkRelationFromRDF,
  isActorType,
  isActorProperty,
  getAgentPreferencesInfo,
  getAgentPreferredPolicyRule,
  getAgentSeeAlso,
  getAgentSupplementalInfo,
  getUserContacts,
  getAgentTypeIndex,
  processSameAs,
  getAgentPreferredProxy,
  getAgentPreferredPolicy,
  getAgentName,
  getAgentURL,
  getAgentDelegates,
  getAgentStorage,
  getAgentOutbox,
  getAgentInbox,
  getAgentKnows,
  getAgentFollowing,
  getAgentPublicTypeIndex,
  getAgentPrivateTypeIndex,
  getAgentPreferencesFile,
  getGraphImage,
  getGraphEmail,
  getGraphEditor,
  getGraphAuthor,
  getGraphPublished,
  getGraphUpdated,
  getGraphCreated,
  getGraphLicense,
  getGraphRights,
  getGraphLabel,
  getGraphTitle,
  getGraphDescription,
  sortGraphTriples
}

function getGraph (url) {
  return SimpleRDF(Config.Vocab, url, null, ld.store).get()
}

function getGraphFromData (data, options = {}) {
  if (!('contentType' in options)) {
    options['contentType'] = 'text/turtle'
  }

  // FIXME: These are fugly but a temporary fix to get around the baseURI not being passed to the DOM parser. This injects the `base` element into the document so that the parsers fallsback to that. The actual fix should happen upstream. See related issues:
  // https://github.com/linkeddata/dokieli/issues/132
  // https://github.com/rdf-ext/rdf-parser-dom/issues/2
  // https://github.com/rdf-ext/rdf-parser-rdfa/issues/3
  // https://github.com/simplerdf/simplerdf/issues/19

  if (!('subjectURI' in options)) {
    // console.log(options)
    options['subjectURI'] = 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d'
  }

  if (options.contentType == 'text/html' || options.contentType == 'application/xhtml+xml' || options.contentType == 'text/turtle' || options.contentType == 'application/ld+json' || options.contentType == 'application/activity+json') {

      data = setDocumentBase(data, options.subjectURI, options.contentType)
  }

  switch (options.contentType) {
    case 'application/activity+json': case 'application/json':
      options.contentType = 'application/ld+json';
      break;
    case 'text/plain':
    case 'text/markdown':
    case 'image/svg+xml':
      options.contentType = 'text/html';
      break;
    default:
      break;
  }

// console.log(data)
// console.log(options)
  return SimpleRDF.parse(data, options['contentType'], options['subjectURI'])
    .then(function(g){
      // var o = { 'contentType': 'application/n-triples' };
      var o = { 'contentType': 'text/turtle' };
      return serializeGraph(g, o).then(function(d){
        d = skolem(d, o);
        d = setDocumentBase(d, options.subjectURI, o.contentType);
// console.log(d)
        return SimpleRDF.parse(d, o['contentType'], options['subjectURI']);
      })});
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

                    search = 'http://schema.org/'
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
            //XXX: Is it ever possible that via could already exist and this mistakenly overwrites it?
            //Why is this specific to JSON-LD?
            if (!options['canonical'] && 'id' in data) {
              data[ "via" ] = data[ "id" ]
              data[ "id" ] = ""
            }
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

function skolem(data, options) {
  //XXX: Perhaps this should just be part of applyParserSerializerFixes or an option of it
  //TODO: Reuse an existing function/library for this (from parsers?) instead of the hack here. Proper skolem for different options.contentType needed?

  //XXX: Perhaps for Turtle
  data = data.replace(new RegExp('_:([^ \.\,\;]*)([ \.\,\;]+)', 'g'), "<http://example.com/.well-known/genid/$1>$2");
  //XXX: Simpler for N-Triples https://www.w3.org/TR/n-triples/#BNodes but not actually conforming:
  // data = data.replace(new RegExp('_:([^ \.]*)([ \.]+)', 'g'), "<http://example.com/.well-known/genid/$1>$2");

// console.log(data)
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

    case 'application/json': case 'application/ld+json': case 'application/activity+json':
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

function traverseRDFList(g, resource) {
  var b = g.child(resource);
  var result = [];

  if (b.rdffirst) {
    result.push(b.rdffirst);
  }
  if (b.rdfrest && b.rdfrest !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil') {
    result = result.concat(traverseRDFList(g, b.rdfrest));
  }

  return result;
}

function getResourceGraph (iri, headers, options = {}) {
  let defaultHeaders = {'Accept': fetcher.setAcceptRDFTypes() + ',*/*;q=0.1'}
  headers = headers || defaultHeaders
  if (!('Accept' in headers)) {
    Object.assign(headers, defaultHeaders)
  }

  if (iri.slice(0, 5).toLowerCase() === 'http:') {
    options['noCredentials'] = true

    if (document.location.host !== iri.split('/')[2]) {
      options['forceProxy'] = true
    }
  }

  let pIRI = uri.getProxyableIRI(iri, options)

  return fetcher.getResource(pIRI, headers, options)
    .then(response => {

      let cT = response.headers.get('Content-Type')
      options['contentType'] = (cT) ? cT.split(';')[ 0 ].trim() : 'text/turtle'

      if (!Config.MediaTypes.RDF.includes(options['contentType'])) {
        return Promise.reject({ resource: iri, response: response, message: 'Unsupported media type for RDF parsing: ' + options['contentType'] })
      }

      options['subjectURI'] = uri.stripFragmentFromString(iri)

      return response.text()
    })
    .then(data => {
      return getGraphFromData(data, options)
    })
    .then(g => {
      let fragment = (iri.lastIndexOf('#') >= 0) ? iri.substr(iri.lastIndexOf('#')) : ''

      return SimpleRDF(Config.Vocab, options['subjectURI'], g, ld.store).child(pIRI + fragment)
    })
    .catch(e => {
      if ('resource' in e) {
        return e;
      }
      console.log(e)
    })
}

function getLinkRelation (property, url, data) {
  if (url) {
    return getLinkRelationFromHead(property, url)
      .catch(() => getLinkRelationFromRDF(property, url))
  } else {
    var subjectURI = window.location.href.split(window.location.search || window.location.hash || /[?#]/)[0]

    var options = {
      'contentType': 'text/html',
      'subjectURI': subjectURI
    }

    return getGraphFromData(data, options)
      .then(function (result) {
          // TODO: Should this get all or a given subject's?
          var endpoints = result.match(subjectURI, property).toArray()
          if (endpoints.length > 0) {
            return endpoints.map(function(t){ return t.object.nominalValue })
          }

// console.log(property + ' endpoint was not found in message body')
          return getLinkRelationFromHead(property, subjectURI)
        })
  }
}

function getLinkRelationFromHead (property, url) {
  var properties = (Array.isArray(property)) ? property : [property];

  return getResourceHead(url).then(
    function (i) {
      var link = i.headers.get('Link')
      if (link && link.length > 0) {
        var linkHeaders = LinkHeader.parse(link)
  // console.log(property)
  // console.log(linkHeaders)
        var uris = [];
        properties.forEach(function(property){
          if (linkHeaders.has('rel', property)) {
            uris.push(linkHeaders.rel(property)[0].uri);
          }
        });

        if (uris.length > 0) {
          return uris;
        }

       return Promise.reject({'message': properties.join(', ') + " endpoint(s) was not found in 'Link' header"})
      }
      return Promise.reject({'message': properties.join(', ') + " endpoint(s) was not found in 'Link' header"})
    },
    function (reason) {
      return Promise.reject({'message': "'Link' header not found"})
    }
  );
}

function getLinkRelationFromRDF (property, url, subjectIRI) {
  url = url || window.location.origin + window.location.pathname
  subjectIRI = subjectIRI || url

  return getResourceGraph(subjectIRI)
    .then(function (i) {
        var s = i.child(subjectIRI)

//XXX: Why is this switch needed? Use default?
        switch (property) {
          case Config.Vocab['ldpinbox']['@id']:
            if (s.ldpinbox._array.length > 0){
// console.log(s.ldpinbox._array)
              return [s.ldpinbox.at(0)]
            }
            break
          case Config.Vocab['oaannotationService']['@id']:
            if (s.oaannotationService._array.length > 0){
// console.log(s.oaannotationService._array)
              return [s.oaannotationService.at(0)]
            }
            break
          default:
            if (s[property]._array.length > 0) {
              return [s[property].at(0)]
            }
            break
        }

        return Promise.reject({'message': property + " endpoint was not found in message body"})
      }
    )
}

function isActorType (s) {
  return Config.Actor.Type.hasOwnProperty(s)
}

function isActorProperty (s) {
  return Config.Actor.Property.hasOwnProperty(s)
}

function getAgentPreferencesInfo(g) {
  if (!g) { return; }

  var preferencesFile = (Config.User.PreferencesFile) ? Config.User.PreferencesFile : getAgentPreferencesFile(g);

  if (preferencesFile) {
    return getResourceGraph(preferencesFile).then(g => {
        return getAgentPreferredPolicyRule(g.child(Config.User.IRI));
      })
      .catch(function(e) {
        return getAgentPreferredPolicyRule(Config.User.Graph.child(Config.User.IRI));
      })
  }
  else {
    return getAgentPreferredPolicyRule(Config.User.Graph.child(Config.User.IRI));
  }
}


function getAgentPreferredPolicyRule(g) {
  Config.User['PreferredPolicy'] = getAgentPreferredPolicy(g);
  var s = g.child(Config.User.PreferredPolicy);

  Config.User['PreferredPolicyRule'] = Config.User.PreferredPolicyRule || {};

  if (s && s.odrlprohibition && s.odrlprohibition.at(0)) {
    var prohibitionG = s.child(s.odrlprohibition.at(0));

    if (prohibitionG.odrlaction && prohibitionG.odrlaction._array.length > 0) {
      Config.User.PreferredPolicyRule['Prohibition'] = {}
      Config.User.PreferredPolicyRule['Prohibition']['Actions'] = prohibitionG.odrlaction._array;
    }
  }

  if (s && s.odrlpermission && s.odrlpermission.at(0)) {
    var permissionG = s.child(s.odrlpermission.at(0));

    if (permissionG.odrlaction && permissionG.odrlaction._array.length > 0) {
      Config.User.PreferredPolicyRule['Permission'] = {}
      Config.User.PreferredPolicyRule['Permission']['Actions'] = permissionG.odrlaction._array;
    }
  }

  return Config.User.PreferredPolicyRule
}


function getAgentSupplementalInfo(iri) {
  if (iri == Config.User.IRI) {
    return processSameAs(Config.User.Graph, getAgentSupplementalInfo);
  }
  else {
    return getResourceGraph(iri).then(
      function(g){
        if(typeof g._graph == 'undefined') {
          return Promise.resolve([]);
        }
        var s = g.child(iri);

        Config.User.Name = Config.User.Name || getAgentName(s);

        Config.User.Image = Config.User.Image || getGraphImage(s);

        var storage = getAgentStorage(s) || [];
        var outbox = getAgentOutbox(s) || [];
        var knows = getAgentKnows(s) || [];
        //TODO publicTypeIndex privateTypeIndex ??

        if (storage.length > 0) {
          Config.User.Storage = (Config.User.Storage)
            ? util.uniqueArray(Config.User.Storage.concat(storage))
            : storage;
        }

        if (outbox.length > 0) {
          Config.User.Outbox = (Config.User.Outbox)
            ? util.uniqueArray(Config.User.Outbox.concat(outbox))
            : outbox;
        }

        if (knows.length > 0) {
          Config.User.Knows = (Config.User.Knows)
            ? util.uniqueArray(Config.User.Knows.concat(knows))
            : knows;
        }

        return processSameAs(s, getAgentSupplementalInfo)
                .then(function(){
                  return getAgentSeeAlso(s)
                });
      },
      function(reason){
        return Promise.resolve([]);
      });
  }
}

function getAgentSeeAlso(g, baseURI, subjectURI) {
  if (!g) { return; }

  subjectURI = baseURI = baseURI || g.iri().toString();

  var seeAlso = g.child(baseURI).rdfsseeAlso;

  if (seeAlso && seeAlso._array.length > 0) {
    var iris = [];
    var promises = [];

    seeAlso._array.forEach(function(iri){
      if (Config.User.SeeAlso.indexOf(iri) < 0) {
        iris.push(iri)
      }
    });

    iris.forEach(function(iri){
      Config.User.SeeAlso = util.uniqueArray(Config.User.SeeAlso.concat(iri));

      getResourceGraph(iri)
        .then(g => {

          var s = g.child(subjectURI)

          var knows = getAgentKnows(s) || [];

          if (knows.length > 0) {
            Config.User.Knows = (Config.User.Knows)
              ? util.uniqueArray(Config.User.Knows.concat(knows))
              : knows;
          }

          promises.push(getAgentSeeAlso(g, iri, subjectURI))
        })
    });

    Promise.all(promises)
      .then(function(results) {
        return Promise.resolve([]);
      })
      .catch(function(e) {
        return Promise.resolve([]);
      });
  }
  else {
    return Promise.resolve([])
  }
}

function getUserContacts(iri) {
  var fyn = function(iri){
    if ((iri == Config.User.IRI) && Config.User.Graph) {
      return processSameAs(Config.User.Graph, getUserContacts);
    }
    else {
      return getResourceGraph(iri).then(
        function(g){
          if(typeof g._graph == 'undefined') {
            return Promise.resolve([]);
          }

          var s = g.child(iri);

          var knows = getAgentKnows(s) || [];

          if (knows.length > 0) {
            Config.User.Knows = (Config.User.Knows)
              ? util.uniqueArray(Config.User.Knows.concat(knows))
              : knows;
          }

          return processSameAs(s, getUserContacts);
        },
        function(reason){
          return Promise.resolve([]);
        });
    }
  }

  return fyn(iri).then(function(i){ return Config.User.Knows || []; });
}

function getAgentTypeIndex(iri) {
  const TypeRegistrationClasses = [DO.C.Vocab['oaAnnotation']['@id'], DO.C.Vocab['asAnnounce']['@id']];

  var fetchTypeRegistration = function(iri) {
    var pIRI = uri.getProxyableIRI(iri);

    getResourceGraph(pIRI)
      .then(function(g){
        var triples = g.graph().toArray();
// console.log(triples);
        if(triples.length > 0) {
          var indexes = {};
          triples.forEach(function(t){
            var s = t.subject.nominalValue;
            var p = t.predicate.nominalValue;
            var o = t.object.nominalValue;

            //Check if class is of interest (that we can handle)
            if (p == Config.Vocab['solidforClass']['@id'] && TypeRegistrationClasses.indexOf(o) > -1) {
              //Keep track of subjects of interest
              indexes[s] = {}
              indexes[s][Config.Vocab['solidforClass']['@id']] = o;
            }
          });
// console.log(indexes)
          triples.forEach(function(t){
            var s = t.subject.nominalValue;
            var p = t.predicate.nominalValue;
            var o = t.object.nominalValue;

            if(indexes[s] && p == Config.Vocab['solidinstanceContainer']['@id']) {
              var forClass = indexes[s][Config.Vocab['solidforClass']['@id']]
              Config.User.TypeIndex[forClass] = o;
            }
          });

          return Config.User.TypeIndex
        }
      })
  }

  var promises = []

  if (Config.User.PublicTypeIndex) {
    promises.push(fetchTypeRegistration(Config.User.PublicTypeIndex))
  }
  if (Config.User.PrivateTypeIndex) {
    promises.push(fetchTypeRegistration(Config.User.PrivateTypeIndex))
  }

  return Promise.all(promises)
    .then(function(results) {
      results.filter(result => !(result instanceof Error));

      // results.forEach(function(result) {
      //   console.log(result)
      // });
    });
}

function processSameAs(s, callback) {
  if (s.owlsameAs && s.owlsameAs._array.length > 0){
    var iris = s.owlsameAs._array;
    var promises = [];
    iris.forEach(function(iri){
// console.log(iri);
      if(iri != Config.User.IRI && Config.User.SameAs.indexOf(iri) < 0) {
        Config.User.SameAs = util.uniqueArray(Config.User.SameAs.concat(iri));

        if (typeof callback !== 'undefined') {
          promises.push(callback(iri));
        }
        else {
          promises.push(Promise.resolve(Config.User.SameAs));
        }
      }
    });

    return Promise.all(promises)
      .then(function(results) {
        return Promise.resolve([]);
      })
      .catch(function(e) {
        return Promise.resolve([]);
      });
  }
  else {
    return Promise.resolve([]);
  }
}

function getAgentPreferredProxy (s) {
  return s.solidpreferredProxy || undefined
}

function getAgentPreferredPolicy (s) {
  return s.solidpreferredPolicy || undefined
}

function getAgentName (s) {
  var name = s.foafname || s.schemaname || s.vcardfn || s.asname || s.rdfslabel || undefined
  if (typeof name === 'undefined') {
    if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
      name = s.schemagivenName + ' ' + s.schemafamilyName
    } else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
      name = s.foafgivenName + ' ' + s.foaffamilyName
    } else if (s.vcardfamilyname && s.vcardfamilyname.length > 0 && s.vcardgivenname && s.vcardgivenname.length > 0) {
      name = s.vcardgivenname + ' ' + s.vcardfamilyname
    } else if (s.foafnick && s.foafnick.length > 0) {
      name = s.foafnick
    } else if (s.vcardnickname && s.vcardnickname.length > 0) {
      name = s.vcardnickname
    }
  }
  return name
}

function getAgentURL (s) {
  return s.foafhomepage || s.foafweblog || s.schemaurl || s.vcardurl || undefined
}

function getAgentDelegates (s) {
  return (s.acldelegates && s.acldelegates._array.length > 0)
    ? s.acldelegates._array
    : undefined
}

function getAgentStorage (s) {
  return (s.pimstorage && s.pimstorage._array.length > 0)
    ? s.pimstorage._array
    : undefined
}

function getAgentOutbox (s) {
  return (s.asoutbox && s.asoutbox._array.length > 0)
    ? s.asoutbox._array
    : undefined
}

function getAgentInbox (s) {
  return (s.ldpinbox && s.ldpinbox._array.length > 0)
    ? s.ldpinbox._array
    : (s.asinbox && s.asinbox._array.length > 0)
      ? s.asinbox._array
      : undefined
}

function getAgentKnows (s) {
  var knows = [];

  if(s.foafknows && s.foafknows._array.length > 0){
    knows = knows.concat(s.foafknows._array);
  }
  if(s.schemaknows && s.schemaknows._array.length > 0){
    knows = knows.concat(s.schemaknows._array);
  }

  knows = util.uniqueArray(knows);

  return (knows.length > 0) ? knows : undefined;
}

function getAgentFollowing (s) {
  var following = [];
// console.log(s.asfollowing)
  if (s.asfollowing) {
    var options = {
      headers: {'Accept': 'application/ld+json; profile="https://www.w3.org/ns/activitystreams", application/activity+json, text/turtle'},
      noCredentials: true
    };
    return DO.U.getItemsList(s.asfollowing, options).then(following => {
      following = util.uniqueArray(following);
// console.log(following);
      return (following.length > 0) ? following : undefined;
    });
  }
}

function getAgentPublicTypeIndex (s) {
  return (s.solidpublicTypeIndex && s.solidpublicTypeIndex.length > 0)
    ? s.solidpublicTypeIndex
    : undefined
}

function getAgentPrivateTypeIndex (s) {
  return (s.solidprivateTypeIndex && s.solidprivateTypeIndex.length > 0)
    ? s.solidprivateTypeIndex
    : undefined
}

function getAgentPreferencesFile (s) {
  return (s.pimpreferencesFile && s.pimpreferencesFile.length > 0)
    ? s.pimpreferencesFile
    : undefined
}

function getGraphImage (s) {
  if (s.asimage || s.asicon) {
    var image = s.asimage || s.asicon;
    s._graph.some(function(t){
      if(t.predicate.nominalValue == Config.Vocab['asurl']['@id'] || t.predicate.nominalValue == Config.Vocab['ashref']['@id']) {
        if (t.subject.nominalValue == s.asicon || "_:" + t.subject.nominalValue == s.asicon) {
          image = t.object.nominalValue;
          return true;
        }
        else if (t.subject.nominalValue == s.asimage || "_:" + t.subject.nominalValue == s.asimage) {
          image = t.object.nominalValue;
          return true;
        }
        return false;
      }
    });
    return image;
  }
  else {
    return s.foafimg || s.schemaimage || s.vcardphoto || s.vcardhasPhoto || s.siocavatar || s.foafdepiction || undefined
  }
}

function getGraphEmail(s) {
  return s.schemaemail || s.foafmbox || undefined ;
}

function getGraphEditor(s) {
  return (
    s.schemaeditor?._array?.length > 0 ? s.schemaeditor._array :
    undefined
  )
}

function getGraphAuthor(s) {
  return (
    s.schemaauthor?._array?.length > 0 ? s.schemaauthor._array :
    s.schemacreator?._array?.length > 0 ? s.schemacreator._array :
    s.asactor?._array?.length > 0 ? s.asactor._array :
    s.dctermscreator?._array?.length > 0 ? s.dctermscreator._array :
    undefined
  );
}

function getGraphPublished(s) {
  return s.schemadatePublished || s.aspublished || s.dctermsissued || s.dctermsdate || s.provgeneratedAtTime || undefined;
}

function getGraphUpdated(s) {
  return s.schemadateModified || s.asupdated || s.dctermsmodified || s.dctermsdate || s.provgeneratedAtTime || undefined;
}

function getGraphCreated(s) {
  return s.schemadateCreated || s.dctermscreated || s.dctermsdate || s.provgeneratedAtTime || undefined;
}

function getGraphLicense(s) {
  return s.schemalicense || s.cclicense || s.dctermslicense || s.xhvlicense || undefined;
}

function getGraphRights(s) {
  return s.dctermsrights || s.schemalicense || s.cclicense || undefined;
}

function getGraphLabel(s) {
  return s.schemaname || s.dctermstitle || s.dcelementstitle || getAgentName(s) || s.assummary || undefined;
}

function getGraphTitle(s) {
  return s.schemaname || s.dctermstitle || s.dcelementstitle || s.asname || undefined;
}

function getGraphDescription(s) {
  return s.schemadescription || s.dctermsdescription || s.dcelementsdescription || s.schemaname || s.asname || undefined;
}

function sortGraphTriples(g, options) {
  options = options || {};
  if (!("sortBy" in options)) {
    options["sortBy"] = "object";
  }

  g.toArray().sort(function (a, b) {
    return a[options.sortBy].nominalValue
      .toLowerCase()
      .localeCompare(b[options.sortBy].nominalValue.toLowerCase());
  });

  return g;
}