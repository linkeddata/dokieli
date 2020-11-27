'use strict'

const util = require('./util')
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
            '"><svg class="fas fa-circle-notch fa-spin fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/></svg></span>')

          inboxResponse(to, toInput)

            .then(inboxURL => {
              notificationData['inbox'] = inboxURL

              notifyInbox(notificationData)

                .catch(error => {
                  // console.log('Error in notifyInbox:', error)
                  toInput
                    .parentNode
                    .querySelector('.progress[data-to="' + to + '"]')
                    .innerHTML = '<svg class="fas fa-times-circle fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg> Unable to notify. Try later.'
                })

                .then(response => {
                    var location = response.headers.get('Location')

                    if (location) {
                      location = uri.getAbsoluteIRI(inboxURL, location)

                      toInput
                        .parentNode
                        .querySelector('.progress[data-to="' + to + '"]')
                        .innerHTML = '<a target="_blank" href="' +
                        location + '"><svg class="fas fa-check-circle fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg></a>'
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
      // console.log('Error in inboxResponse:', error)

      toInput
        .parentNode
        .querySelector('.progress[data-to="' + to + '"]')
        .innerHTML = '<svg class="fas fa-times-circle fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg> Inbox not responding. Try later.'
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

  //TODO title
  var title = '';
  var data = doc.createActivityHTML(o)

  data = doc.createHTML(title, data, { 'prefixes': Config.Prefixes })

  var options = {
    'contentType': 'text/html',
    'profile': 'https://www.w3.org/ns/activitystreams'
  }

  var pIRI = uri.getProxyableIRI(inboxURL)
  return fetcher.postActivity(pIRI, slug, data, options)
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

// console.log(property + ' endpoint was not found in message body')
          return getEndpointFromHead(property, subjectURI)
        })
      .catch(() => getEndpointFromHead(property, subjectURI))
  }
}

function getEndpointFromHead (property, url) {
  var pIRI = uri.getProxyableIRI(url);

  return fetcher.getResourceHead(pIRI).then(
    function (i) {
      var linkHeaders = fetcher.parseLinkHeader(i.headers.get('Link'))

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
          default:
            if (s[property]._array.length > 0) {
              return [s[property].at(0)]
            }
            break
        }

        throw new Error(property + ' endpoint was not found in message body')
      }
    )
}
