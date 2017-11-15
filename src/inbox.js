'use strict'

const doc = require('./doc')
const uri = require('./uri')
const graph = require('./graph')
const fetcher = require('./fetcher')
const Config = require('./config')

module.exports = {
  getEndpoint,
  getEndpointFromHead,
  getEndpointFromRDF,
  notifyInbox,
  sendNotifications
}

function sendNotifications (tos, note, iri, shareResource) {
  return new Promise((resolve, reject) => {
    var notificationData = {
      'type': ['as:Announce'],
      'object': iri,
      'summary': note,
      'license': 'https://creativecommons.org/licenses/by/4.0/'
    }

    let data = doc.getDocument()

    let options = {
      'contentType': 'text/html',
      'subjectURI': iri
    }
    var spo = {
      'subject': iri,
      'predicate': Config.Vocab['rdftype']['@id']
    }

    graph.getMatchFromData(data, spo, options)
      .then(supplementalData => {
        if (typeof supplementalData !== 'undefined' && supplementalData._array.length > 0) {
          notificationData['objectTypes'] = supplementalData._array
        }

        let spo = {
          'subject': iri,
          'predicate': Config.Vocab['schemalicense']['@id']
        }

        return graph.getMatchFromData(data, spo, options)
          .then(data => {
            if (typeof data !== 'undefined' && data.length > 0) {
              notificationData['objectLicense'] = data
            }
          })
      })
      .then(() => {
        tos.forEach(to => {
          notificationData['to'] = to

          var toInput = shareResource.querySelector('[value="' + to + '"]') ||
            shareResource.querySelector('#share-resource-to')

          toInput.parentNode.insertAdjacentHTML('beforeend',
            '<span class="progress" data-to="' + to +
            '"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>')

          inboxResponse(to, toInput)

            .then(inboxURL => {
              notificationData['inbox'] = inboxURL

              notifyInbox(notificationData)

                .catch(error => {
                  console.log('Error in notifyInbox:', error)
                  toInput
                    .parentNode
                    .querySelector('.progress[data-to="' + to + '"]')
                    .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to notify. Try later.'
                })

                .then(response => {
                    var location = response.headers.get('Location')

                    if (location) {
                      location = uri.getAbsoluteIRI(inboxURL, location)

                      toInput
                        .parentNode
                        .querySelector('.progress[data-to="' + to + '"]')
                        .innerHTML = '<a target="_blank" href="' +
                        location + '"><i class="fa fa-check-circle fa-fw"></i></a>'
                    }
                  }
                )
            })
        })
      })
  })
}

function inboxResponse (to, toInput) {
  return getEndpoint(Config.Vocab['ldpinbox']['@id'], to)
    .then(inboxes => inboxes[0])

    .catch(error => {
      console.log('Error in inboxResponse:', error)

      toInput
        .parentNode
        .querySelector('.progress[data-to="' + to + '"]')
        .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Inbox not responding. Try later.'
    })
}

function notifyInbox (o) {
  var slug, inboxURL

  if ('slug' in o) {
    slug = o.slug
  }
  if ('inbox' in o) {
    inboxURL = o.inbox
  }

  if (!inboxURL) {
    return Promise.reject(new Error('No inbox to send notification to'))
  }

  var types = '<dt>Types</dt>'

  o.type.forEach(function (t) {
    types += '<dd><a about="" href="' + Config.Prefixes[t.split(':')[0]] + t.split(':')[1] + '" typeof="'+ t +'">' + t.split(':')[1] + '</a></dd>'
  })

  var asObjectTypes = ''
  if ('object' in o && 'objectTypes' in o && o.objectTypes.length > 0) {
    asObjectTypes = '<dl><dt>Types</dt>'
    o.objectTypes.forEach(function(t){
      asObjectTypes += '<dd><a about="' + o.object + '" href="' + t + '" typeof="'+ t +'">' + t + '</a></dd>'
    })
    asObjectTypes += '</dl>'
  }

  var asObjectLicense = ''
  if ('object' in o && 'objectLicense' in o && o.objectLicense.length > 0) {
    asObjectLicense = '<dl><dt>License</dt><dd><a about="' + o.object + '" href="' + o.objectLicense + '" property="schema:license">' + o.objectLicense + '</a></dd></dl>'
  }

  var asobject = ('object' in o) ? '<dt>Object</dt><dd><a href="' + o.object + '" property="as:object">' + o.object + '</a>' + asObjectTypes + asObjectLicense + '</dd>' : ''

  var asinReplyTo = ('inReplyTo' in o) ? '<dt>In reply to</dt><dd><a href="' + o.inReplyTo + '" property="as:inReplyTo">' + o.inReplyTo + '</a></dd>' : ''

  var ascontext = ('context' in o && o.context.length > 0) ? '<dt>Context</dt><dd><a href="' + o.context + '" property="as:context">' + o.context + '</a></dd>' : ''

  var astarget = ('target' in o && o.target.length > 0) ? '<dt>Target</dt><dd><a href="' + o.target + '" property="as:target">' + o.target + '</a></dd>' : ''

  var datetime = DO.U.getDateTimeISO()
  var asupdated = '<dt>Updated</dt><dd><time datetime="' + datetime + '" datatype="xsd:dateTime" property="as:updated" content="' + datetime + '">' + datetime.substr(0,19).replace('T', ' ') + '</time></dd>'

  var assummary = ('summary' in o && o.summary.length > 0) ? '<dt>Summary</dt><dd property="as:summary" datatype="rdf:HTML">' + o.summary + '</dd>' : ''

  var ascontent = ('content' in o && o.content.length > 0) ? '<dt>Content</dt><dd property="as:content" datatype="rdf:HTML">' + o.content + '</dd>' : ''

  var asactor = (Config.User.IRI) ? '<dt>Actor</dt><dd><a href="' + Config.User.IRI + '" property="as:actor">' + Config.User.IRI + '</a></dd>' : ''

  var license = '<dt>License</dt><dd><a href="' + Config.NotificationLicense + '" property="schema:license">' + Config.NotificationLicense + '</a></dd>'

  var asto = ('to' in o && o.to.length > 0 && !o.to.match(/\s/g) && o.to.match(/^https?:\/\//gi)) ? '<dt>To</dt><dd><a href="' + o.to + '" property="as:to">' + o.to + '</a></dd>' : ''

  var statements = ('statements' in o) ? o.statements : ''

  var dl = [
    types,
    asobject,
    ascontext,
    astarget,
    asupdated,
    assummary,
    ascontent,
    asactor,
    license,
    asto
  ].map(function (n) { if (n !== '') { return '      ' + n + '\n' } }).join('')


  // TODO: Come up with a better title. reuse `types` e.g., Activity Created, Announced..
  var title = 'Notification'
  if(types.indexOf('as:Announce') > -1){
    title += ': Announced'
  } else if (types.indexOf('as:Created') > -1){
    title += ': Created'
  } else if (types.indexOf('as:Liked') > -1){
    title += ': Liked'
  } else if (types.indexOf('as:Disliked') > -1){
    title += ': Disliked'
  }

  var data = '\n\
<article>\n\
  <h1>' + title + '</h1>\n\
  <section>\n\
    <dl about="">\n\
' + dl +
    '    </dl>\n\
' + statements +
'  </section>\n\
</article>\n\
'

  data = DO.U.createHTML(title, data, { 'prefixes': Config.Prefixes })

  var options = {
    'contentType': 'text/html',
    'subjectURI': 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d',
    'profile': 'https://www.w3.org/ns/activitystreams'
  }

  var pIRI = uri.getProxyableIRI(inboxURL)
  return postActivity(pIRI, slug, data, options)
}

function postActivity(url, slug, data, options) {
  return fetcher.getAcceptPostPreference(url)
    .then(preferredContentType => {
      switch (preferredContentType) {
        case 'text/html':
        case 'application/xhtml+xml':
          return fetcher.postResource(url, slug, data, 'text/html; charset=utf-8')

        case 'text/turtle':
          // FIXME: proxyURL + http URL doesn't work. https://github.com/solid/node-solid-server/issues/351

          data = doc.setHTMLBase(data, options.subjectURI)

          return graph.getGraphFromData(data, options)
            .then(g => {
              return graph.serializeGraph(g, { 'contentType': 'text/turtle' })
            })
            .then(data => {
              // FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
              data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '')

              // XXX: Workaround for rdf-parser-rdfa bug that gives
              // '@language' instead of @type when encountering datatype in HTML+RDFa .
              // TODO: Link to bug here
              data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;')

              return fetcher.postResource(url, slug, data, 'text/turtle')
            })

        case 'application/ld+json':
        case 'application/json':
        case '*/*':
        default:
          data = doc.setHTMLBase(data, options.subjectURI)

          return graph.getGraphFromData(data, options)
            .then(g => {
              return graph.serializeGraph(g, { 'contentType': 'application/ld+json' })
            })
            .then(serialized => {
              let parsedData = JSON.parse(serialized)

              parsedData[0]["@context"] = [
                "https://www.w3.org/ns/activitystreams",
                {"oa": "http://www.w3.org/ns/anno.jsonld"}
              ]
              // If from is Turtle:
              // x[0]["@id"] = (x[0]["@id"].slice(0,2) == '_:') ? '' : x[0]["@id"];
              parsedData[0]["@id"] = (parsedData[0]["@id"] === 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d') ? '' : parsedData[0]["@id"];

              // XXX: Workaround for rdf-parser-rdfa bug that gives
              // '@language' instead of @type when encountering datatype in HTML+RDFa .
              // TODO: Link to bug here
              for (let i = 0; i < parsedData.length; i++) {
                if ('https://www.w3.org/ns/activitystreams#updated' in parsedData[i]) {
                  parsedData[i]['https://www.w3.org/ns/activitystreams#updated'] = {
                    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                    '@value': parsedData[i]['https://www.w3.org/ns/activitystreams#updated']['@value']
                  }
                }
              }

              let data = JSON.stringify(parsedData) + '\n'

              var profile = ('profile' in options) ? '; profile="' + options.profile + '"' : ''

              return fetcher.postResource(url, slug, data, preferredContentType + profile)
            })
      }
    })
}

function getEndpoint (property, url) {
  if (url) {
    return getEndpointFromHead(property, url)
      .catch(() => getEndpointFromRDF(property, url))
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

          console.log(property + ' endpoint was not found in message body')
          return getEndpointFromHead(property, subjectURI)
        })
      .catch(() => getEndpointFromHead(property, subjectURI))
  }
}

function getEndpointFromHead (property, url) {
  var pIRI = uri.getProxyableIRI(url);

  return fetcher.getResourceHead(pIRI, {'header': 'Link'}).then(
    function (i) {
      var linkHeaders = fetcher.parseLinkHeader(i.headers)

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

function getEndpointFromRDF (property, url, subjectIRI) {
  url = url || window.location.origin + window.location.pathname
  subjectIRI = subjectIRI || url

  return fetcher.getResourceGraph(subjectIRI)
    .then(function (i) {
        var s = i.child(subjectIRI)

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
        }

        throw new Error(property + ' endpoint was not found in message body')
      }
    )
}
