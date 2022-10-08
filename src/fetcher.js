'use strict'

const ld = require('./simplerdf')
const SimpleRDF = ld.SimpleRDF
const Config = require('./config')
const util = require('./util')
const doc = require('./doc')
const uri = require('./uri')
const graph = require('./graph')
const fetch = require('node-fetch')  // Uses native fetch() in the browser
const solidAuth = require('solid-auth-client')

const DEFAULT_CONTENT_TYPE = 'text/html; charset=utf-8'
const LDP_RESOURCE = '<http://www.w3.org/ns/ldp#Resource>; rel="type"'

module.exports = {
  setAcceptRDFTypes,
  getLinkRelation,
  getLinkRelationFromHead,
  getLinkRelationFromRDF,
  copyResource,
  currentLocation,
  deleteResource,
  getAcceptPostPreference,
  getAcceptPatchPreference,
  getAcceptPutPreference,
  getResource,
  getResourceHead,
  getResourceGraph,
  getTriplesFromGraph,
  getResourceOptions,
  parseLinkHeader,
  patchResource,
  patchResourceGraph,
  postResource,
  putResource,
  putResourceACL,
  postActivity,
  fetchPreferredMethod,
  fetchPreferredMethodContentType,
  processSave,
  patchResourceWithAcceptPatch,
  putResourceWithAcceptPut
}

function setAcceptRDFTypes(options) {
  options = options || {};

  return Config.AvailableMediaTypes.map(i => {
    if (i == 'application/xhtml+xml' || i == 'text/html') {
      // q = Number(Math.round((q-0.1)+'e2')+'e-2');
      return i + ';q=0.9';
    }
    return i;
  }).join(',');
}

function getLinkRelation (property, url) {
  if (url) {
    return getLinkRelationFromHead(property, url)
      .catch(() => getLinkRelationFromRDF(property, url))
  } else {
    var subjectURI = window.location.href.split(window.location.search || window.location.hash || /[?#]/)[0]

    var options = {
      'contentType': 'text/html',
      'subjectURI': subjectURI
    }

    return graph.getGraphFromData(doc.getDocument(), options)
      .then(function (result) {
          // TODO: Should this get all of the inboxes or a given subject's?
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
  var pIRI = uri.getProxyableIRI(url);

  return getResourceHead(pIRI).then(
    function (i) {
      var linkHeaders = parseLinkHeader(i.headers.get('Link'))
// console.log(property)
// console.log(linkHeaders)
      if (property in linkHeaders) {
        return linkHeaders[property]
      }
      return Promise.reject({'message': property + " endpoint was not found in 'Link' header"})
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

// I want HTTP COPY and I want it now!
function copyResource (fromURL, toURL, options = {}) {
  let headers = { 'Accept': '*/*' }
  let contentType

  if (!fromURL || !toURL) {
    return Promise.reject(new Error('Missing fromURL or toURL in copyResource'))
  }

  return getResource(fromURL, headers, options)
    .then(response => {
      contentType = response.headers.get('Content-Type')

      return (Config.AcceptBinaryTypes.indexOf(contentType))
        ? response.arrayBuffer()
        : response.text()
    })
    .then(contents => {
      return putResource(toURL, contents, contentType, null, options)
        .catch(error => {
          if (error.status === 0) {
            // Retry with no credentials
            options.noCredentials = true
            return putResource(toURL, contents, contentType, null, options)
          }

          throw error  // re-throw error
        })
    })
}

/**
 * @returns {string}
 */
function currentLocation () {
  return window.location.origin + window.location.pathname
}

/**
 * deleteResource
 *
 * @param url {string}
 * @param options {object}
 *
 * @returns {Promise<Response>}
 */
function deleteResource (url, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;

  if (!url) {
    return Promise.reject(new Error('Cannot DELETE resource - missing url'))
  }

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.method = 'DELETE'

  return _fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error deleting resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

function getAcceptPostPreference (url) {
  const pIRI = uri.getProxyableIRI(url)

  return getResourceOptions(pIRI, {'header': 'Accept-Post'})
    .catch(error => {
//      console.log(error)
      return {'headers': 'application/ld+json'}
    })
    .then(result => {
      let header = result.headers.trim().split(/\s*,\s*/)

      if (header.indexOf('text/html') > -1 || header.indexOf('application/xhtml+xml') > -1) {
        return 'text/html'
      } else if (header.indexOf('text/turtle') > -1 || header.indexOf('*/*') > -1) {
        return 'text/turtle'
      } else if (header.indexOf('application/ld+json') > -1 || header.indexOf('application/json') > -1) {
        return 'application/ld+json'
      } else {
        console.log('Accept-Post contains unrecognised media-range; ' + result.headers)
        return result.headers
      }
    })
}

function getAcceptPatchPreference (url) {
  const pIRI = url || uri.getProxyableIRI(url)

  return getResourceOptions(pIRI, {'header': 'Accept-Patch'})
    .catch(error => {
//      console.log(error)
      return {'headers': 'text/n3'}
    })
    .then(result => {
      let header = result.headers.trim().split(/\s*,\s*/)

      if (header.indexOf('text/html') > -1 || header.indexOf('application/xhtml+xml') > -1) {
        return 'text/html'
      } else if (header.indexOf('text/n3') > -1 || header.indexOf('*/*') > -1) {
        return 'text/n3'
      } else if (header.indexOf('application/sparql-update') > -1) {
        return 'application/sparql-update'
      } else {
        console.log('Accept-Patch contains unrecognised media-range; ' + result.headers)
        return result.headers
      }
    })
}

function getAcceptPutPreference (url) {
  const pIRI = url || uri.getProxyableIRI(url)

  return getResourceOptions(pIRI, {'header': 'Accept-Put'})
    .catch(error => {
//      console.log(error)
      return {'headers': 'text/html'}
    })
    .then(result => {
      let header = result.headers.trim().split(/\s*,\s*/)

      if (header.indexOf('text/html') > -1 || header.indexOf('application/xhtml+xml') > -1) {
        return 'text/html'
      } else if (header.indexOf('text/turtle') > -1 || header.indexOf('*/*') > -1) {
        return 'text/turtle'
      } else if (header.indexOf('application/ld+json') > -1 || header.indexOf('application/json') > -1) {
        return 'application/ld+json'
      } else {
        console.log('Accept-Patch contains unrecognised media-range; ' + result.headers)
        return result.headers
      }
    })
}


/**
 * getResource
 *
 * @param url {string}
 *
 * @param headers {object}
 * @param [headers.accept='text/turtle'] {string}
 *
 * @param options {object}
 *
 * @returns {Promise<string>|Promise<ArrayBuffer>}
 */
function getResource (url, headers = {}, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;

  url = url || currentLocation()
  options.method = 'GET'

  if (!headers['Accept']) {
    headers['Accept'] = 'text/turtle'
  }

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = Object.assign({}, headers)

  return _fetch(url, options)
    .catch(error => {
      if (!options.noCredentials) {
        // Possible CORS error, retry with no credentials
        options.noCredentials = true
        options.credentials = 'omit'
        return getResource(url, headers, options)
      }

      throw error
    })
    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * getResourceHead
 *
 * @param [url] {string}
 *
 * @param options {object}
 * @param options.header {string}
 *
 * @returns {Promise<Response>}
 */
function getResourceHead (url, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;
  url = url || currentLocation()

  options.method = 'HEAD'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  return _fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource HEAD: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      // let header = response.headers.get(options.header)

      // if (!header) {
      //   throw new Error("'" + options.header + "' header not found")
      // }

      return response
    })
}

function getResourceGraph (iri, headers, options = {}) {
  let defaultHeaders = {'Accept': setAcceptRDFTypes()}
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

  return getResource(pIRI, headers, options)
    .then(response => {

      let cT = response.headers.get('Content-Type')
      options['contentType'] = (cT) ? cT.split(';')[ 0 ].trim() : 'text/turtle'

      options['subjectURI'] = uri.stripFragmentFromString(iri)

      return response.text()
    })
    .then(data => {
      return graph.getGraphFromData(data, options)
    })
    .then(g => {
      let fragment = (iri.lastIndexOf('#') >= 0) ? iri.substr(iri.lastIndexOf('#')) : ''

      return SimpleRDF(Config.Vocab, options['subjectURI'], g, ld.store).child(pIRI + fragment)
    })
    .catch(e => {
      console.log(e)
    })
}


function getTriplesFromGraph (url) {
  return getResourceGraph(url)
    .then(function(i){
      return i.graph();
    })
    .catch(function(error){
      // console.log(error);
      throw error;
    });
}

/**
 * getResourceOptions
 *
 * @param [url] {string} Defaults to current url
 *
 * @param [options={}] {object}
 * @param [options.header] {string} Specific response header to return
 * @param [options.noCredentials] {boolean}
 *
 * @returns {Promise} Resolves with `{ headers: ... }` object
 */
function getResourceOptions (url, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;
  url = url || currentLocation()

  options.method = 'OPTIONS'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  return _fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error fetching resource OPTIONS: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }
      else if (options.header && !response.headers.get(options.header)){
        let error = new Error('OPTIONS without ' + options.header + ' header: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      if (options.header) {  // specific header requested
        return { headers: response.headers.get(options.header) }
      }

      return { headers: response.headers }  // Not currently used anywhere
    })
}

function parseLinkHeader (link) {
  if (!link) {
    return {}
  }
  var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g
  var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;
  var matches = link.match(linkexp)
  var rels = {}
  for (var i = 0; i < matches.length; i++) {
    var split = matches[i].split('>')
    var href = split[0].substring(1)
    var ps = split[1]
    var s = ps.match(paramexp)
    for (var j = 0; j < s.length; j++) {
      var p = s[j]
      var paramsplit = p.split('=')
      // var name = paramsplit[0]
      var rel = paramsplit[1].replace(/["']/g, '')
      if (!rels[rel]) {
        rels[rel] = []
      }
      rels[rel].push(href)
      if (rels[rel].length > 1) {
        rels[rel].sort()
      }
    }
  }
  return rels
}

function patchResourceGraph (url, patches, options = {}) {
  options.headers = options.headers || {}
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'text/n3'
  patches = (Array.isArray(patches)) ? patches : [patches]

  var data = '@prefix solid: <http://www.w3.org/ns/solid/terms#> .\n\
@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n\
'

  switch (options.headers['Content-Type']) {
    case 'application/sparql-update':
      if (patches[0].delete) {
        data += 'DELETE DATA { ' + patches[0].delete + ' };\n\
'
      }

      if (patches[0].insert) {
        data += 'INSERT DATA { ' + patches[0].insert + ' };\n\
'
      }

      if (patches[0].where) {
        data += 'WHERE { ' + patches[0].where + ' };\n\
'
      }
      break

    case 'text/n3':
    default :
      patches.forEach(function(patch){
        var patchId = '_:' + util.generateUUID();

        data += '\n\
' + patchId + ' a solid:Patch, solid:InsertDeletePatch .\n\
'
// ' + patchId + ' solid:patches <' + patchesResource + '> .\n\

        if (patch.delete) {
          data += patchId + ' solid:deletes { ' + patch.delete + ' } .\n\
'
        }
        if (patch.insert) {
          data += patchId + ' solid:inserts { ' + patch.insert + ' } .\n\
'
        }
        if (patch.where) {
          data += patchId + ' solid:where { ' + patch.where + ' } .\n\
'
        }
      });

      break
  }

  return patchResource (url, data, options);
}

function patchResource (url, data, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;

  options.headers = options.headers || {}

  options.headers['Content-Type'] = options.headers['Content-Type'] || 'text/n3'

  options.body = data

  options.method = 'PATCH'

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  return _fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error patching resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

function postResource (url, slug, data, contentType, links, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;
  if (!url) {
    return Promise.reject(new Error('Cannot POST resource - missing url'))
  }

  options.method = 'POST'

  options.body = data

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = contentType || DEFAULT_CONTENT_TYPE

  links = links
    ? LDP_RESOURCE + ', ' + links
    : LDP_RESOURCE

  options.headers['Link'] = links

  if (slug) {
    options.headers['Slug'] = slug
  }

  return _fetch(url, options)

    .catch(error => {
      if (error.status === 0 && !options.noCredentials) {
        // Possible CORS error, retry with no credentials
        options.noCredentials = true
        return postResource(url, slug, data, contentType, options)
      }

      throw error
    })

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error creating resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * putResource
 *
 * @param url {string}
 *
 * @param data {string|object}
 *
 * @param [contentType=DEFAULT_CONTENT_TYPE] {string}
 *
 * @param [links=LDP_RESOURCE] {string}
 *
 * @param [options={}] {object}
 *
 * @returns {Promise<Response>}
 */
function putResource (url, data, contentType, links, options = {}) {
  var _fetch = Config.User.OIDC? solidAuth.fetch : fetch;
  if (!url) {
    return Promise.reject(new Error('Cannot PUT resource - missing url'))
  }

  options.method = 'PUT'

  options.body = data

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = contentType || DEFAULT_CONTENT_TYPE

  links = links
    ? LDP_RESOURCE + ', ' + links
    : LDP_RESOURCE

  options.headers['Link'] = links

  return _fetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error writing resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}

/**
 * putResourceACL
 *
 * TODO: This doesn't seem to be used anywhere...
 *
 * @param accessToURL
 * @param aclURL
 * @param acl
 *
 * @returns {Promise<Response|null>}
 */
function putResourceACL (accessToURL, aclURL, acl) {
  if (!Config.User.IRI) {
    console.log('Go through sign-in or do: DO.C.User.IRI = "https://example.org/#i";')
    return Promise.resolve(null)
  }

  acl = acl || {
    'u': { 'iri': [Config.User.IRI], 'mode': ['acl:Control', 'acl:Read', 'acl:Write'] },
    'g': { 'iri': ['http://xmlns.com/foaf/0.1/Agent'], 'mode': ['acl:Read'] },
    'o': { 'iri': [], 'mode': [] }
  }

  let agent, agentClass, mode

  if ('u' in acl && 'iri' in acl.u && 'mode' in acl.u) {
    agent = '<' + acl.u.iri.join('> , <') + '>'
    mode = acl.u.mode.join(' , ')
  } else {
    agent = '<' + Config.User.IRI + '>'
    mode = 'acl:Control , acl:Read , acl:Write'
  }

  let authorizations = []

  authorizations.push(
    '[ a acl:Authorization ; acl:accessTo <' +
    accessToURL + '> ; acl:accessTo <' + aclURL + '> ; acl:mode ' + mode +
    ' ; acl:agent ' + agent + ' ] .'
  )

  if ('g' in acl && 'iri' in acl.g && acl.g.iri.length >= 0) {
    agentClass = '<' + acl.g.iri.join('> , <') + '>'
    mode = acl.g.mode.join(' , ')
    authorizations.push(
      '[ a acl:Authorization ; acl:accessTo <' + accessToURL +
      '> ; acl:mode ' + mode + ' ; acl:agentClass ' + agentClass + ' ] .'
    )
  }

  let data = '@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n' +
    authorizations.join('\n') + '\n'

  return putResource(aclURL, data, 'text/turtle; charset=utf-8')
}

function postActivity(url, slug, data, options) {
  return getAcceptPostPreference(url)
    .then(preferredContentType => {
      options = options || {};
      options['preferredContentType'] = preferredContentType;
      options['method'] = 'POST';
      return fetchPreferredMethodContentType(url, slug, data, options);
    })
}

//FIXME: May be better to have fetchPreferredMethod call fetchPreferredMethodContentType

function fetchPreferredMethod(url, slug, data, options) {
  var contentType = options['preferredContentType'] + '; charset=utf-8';

  switch(options['method'].toLowerCase()) {
    case 'post':
      return postResource(url, slug, data, contentType);
      break;
    case 'put':
      return putResource(url, data, contentType);
      break;
  }
}

function fetchPreferredMethodContentType(url, slug, data, options) {
  switch (options['preferredContentType']) {
    case 'text/html':
    case 'application/xhtml+xml':
      return fetchPreferredMethod(url, slug, data, options);
      break;

    case 'text/turtle':
      // FIXME: proxyURL + http URL doesn't work. https://github.com/solid/node-solid-server/issues/351

      return graph.serializeData(data, options['contentType'], 'text/turtle', options)
        .then(data => {
          return fetchPreferredMethod(url, slug, data, options);
        })
      break;

    case 'application/ld+json':
    case 'application/json':
    case '*/*':
    default:
      return graph.serializeData(data, options['contentType'], 'application/ld+json', options)
        .then(data => {
          if (!options['canonical']) {
            let x = JSON.parse(data)
            if ('id' in x) {
              x[ "via" ] = x[ "id" ]
              x[ "id" ] = ""
              data = JSON.stringify(x)
            }
          }

          var profile = ('profile' in options) ? '; profile="' + options.profile + '"' : ''

          return fetchPreferredMethod(url, slug, data, options['preferredContentType'] + profile)
        })
      break;
  }
}

function processSave(url, slug, data, options) {
  options = options || {};
  var request = (slug)
                ? postResource(url, slug, data)
                : putResource(url, data)

  return request
    .then(response => {
      doc.showActionMessage(document.documentElement, 'Saved')
      return response
    })
    .catch(error => {
      console.log(error)

      let message

      switch (error.status) {
        case 401:
          message = 'Need to authenticate before saving'
          break

        case 403:
          message = 'You are not authorized to save'
          break

        case 405:
        default:
          message = 'Server doesn\'t allow this resource to be rewritten'
          break
      }

      doc.showActionMessage(document.documentElement, message)
    })
}

//TODO: Use OPTIONS (getResourceOptions). Check/use Allow: PATCH and Accept-Patch. Check/use Allow: PUT using Accept-Put. Fallback to PUT.

function patchResourceWithAcceptPatch(url, patch, options) {
  return getAcceptPatchPreference(url)
    .then(preferredContentType => {
      options = options || {}
      options['headers'] = options['headers'] || {}
      options.headers['Content-Type'] = options.headers['Content-Type'] || preferredContentType

      return patchResourceGraph(url, patch, options)
    })
}

function putResourceWithAcceptPut(url, html, options) {
  return getAcceptPutPreference(url)
    .then(preferredContentType => {
      options = options || {}
      options['headers'] = options['headers'] || {}
      options.headers['Content-Type'] = options.headers['Content-Type'] || preferredContentType

      return putResource(url, html, null, null, options)
    })
}

