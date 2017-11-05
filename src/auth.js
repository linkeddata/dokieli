'use strict'

const Config = require('./config')
const fetcher = require('./fetcher')
const util = require('./util')

// const { OIDCWebClient } = require('@trust/oidc-web')

module.exports = {
  afterSignIn,
  enableDisableButton,
  getAgentImage,
  getAgentName,
  getUserHTML,
  setUserInfo,
  showUserIdentityInput,
  showUserSigninSignup,
  submitSignIn
}

function afterSignIn () {
  var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + Config.User.IRI + '"]')
  for (let i = 0; i < user.length; i++) {
    var article = user[i].closest('article')
    article.insertAdjacentHTML('afterbegin', '<button class="delete"><i class="fa fa-trash"></i></button>')
  }

  var buttonDelete = document.querySelectorAll('aside.do blockquote[cite] article button.delete')

  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      var article = e.target.closest('article')
      var refId = 'r-' + article.id
      var noteIRI = article.closest('blockquote[cite]')
      noteIRI = noteIRI.getAttribute('cite')

      fetcher.deleteResource(noteIRI)
        .then(() => {
          var aside = e.target.closest('aside.do')
          aside.parentNode.removeChild(aside)
          var span = document.querySelector('span[about="#' + refId + '"]')
          span.outerHTML = span.querySelector('mark').textContent
          // TODO: Delete notification or send delete activity
        })
    })
  }
}

// TODO: Generalize this further so that it is not only for submitSignIn
function enableDisableButton (e, button) {
  var delay = (e.type === 'cut' || e.type === 'paste') ? 250 : 0
  var input

  window.setTimeout(function () {
    input = e.target.value
    if (input.length > 10 && input.match(/^https?:\/\//g)) {
      if (typeof e.which !== 'undefined' && e.which === 13) {
        if (!button.getAttribute('disabled')) {
          button.setAttribute('disabled', 'disabled')
          e.preventDefault()
          e.stopPropagation()
          submitSignIn()
        }
      } else {
        button.removeAttribute('disabled')
      }
    } else {
      if (!button.getAttribute('disabled')) {
        button.setAttribute('disabled', 'disabled')
      }
    }
  }, delay)
}

function getAgentImage (s) {
  return s.foafimg || s.schemaimage || s.asimage || s.siocavatar ||
    s.foafdepiction || undefined
}

function getAgentName (s) {
  var name = s.foafname || s.schemaname || s.asname || s.rdfslabel || undefined
  if (typeof name === 'undefined') {
    if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
      name = s.schemagivenName + ' ' + s.schemafamilyName
    } else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
      name = s.foafgivenName + ' ' + s.foaffamilyName
    } else if (s.foafnick && s.foafnick.length > 0) {
      name = s.foafnick
    }
  }
  return name
}

function getUserHTML () {
  let userName = Config.SecretAgentNames[Math.floor(Math.random() * Config.SecretAgentNames.length)]

  if (Config.User.Name) {
    // XXX: We have the IRI already
    userName = '<span about="' + Config.User.IRI + '" property="schema:name">' +
      Config.User.Name + '</span>'
  }

  let userImage = ''

  if ('Image' in Config.User && typeof Config.User.Image !== 'undefined' && Config.User.Image.length > 0) {
    userImage = '<img alt="" height="48" rel="schema:image" src="' +
      Config.User.Image + '" width="48" /> '
  }

  let user = ''

  if ('IRI' in Config.User && Config.User.IRI !== null && Config.User.IRI.length > 0) {
    user = '<span about="' + Config.User.IRI + '" typeof="schema:Person">' +
      userImage + '<a rel="schema:url" href="' + Config.User.IRI + '"> ' +
      userName + '</a></span>'
  } else {
    user = '<span typeof="schema:Person">' + userName + '</span>'
  }

  return user
}

/**
 * @param userIRI {string}
 *
 * @returns {Promise}
 */
function setUserInfo (userIRI) {
  if (!userIRI) {
    return Promise.reject(new Error('Could not set user info - no user IRI'))
  }

  return fetcher.getResourceGraph(userIRI)
    .then(g => {
      var s = g.child(userIRI)

      Config.User.Graph = s
      Config.User.IRI = userIRI
      Config.User.Name = getAgentName(s)
      Config.User.Image = getAgentImage(s)
      Config.User.URL = s.foafhomepage ||
        s['http://xmlns.com/foaf/0.1/weblog'] || s.schemaurl

      Config.User.Knows = (s.foafknows && s.foafknows._array.length > 0)
        ? util.uniqueArray(s.foafknows._array)
        : []
      Config.User.Knows = (s.schemaknows && s.schemaknows._array.length > 0)
        ? util.uniqueArray(Config.User.Knows.concat(s.schemaknows._array))
        : Config.User.Knows

      Config.User.TempKnows = []
      Config.User.SameAs = []
      Config.User.Contacts = []

      if (s.pimstorage) {
        Config.User.Storage = s.pimstorage._array
      }

      if (s.preferencesFile && s.preferencesFile.length > 0) {
        Config.User.PreferencesFile = s.preferencesFile

        // TODO: Reconsider if/where to use this.
        // setUserWorkspaces(Config.User.PreferencesFile)
      }
      return Config.User
    })
}

function showUserIdentityInput (e) {
  if (typeof e !== 'undefined') {
    e.target.disabled = true
  }

  document.body.insertAdjacentHTML('beforeend', '<aside id="user-identity-input" class="do on"><button class="close" title="Close">❌</button><h2>Sign in with WebID</h2><label>HTTP(S) IRI</label> <input id="webid" type="text" placeholder="http://csarven.ca/#i" value="" name="webid"/> <button class="signin">Sign in</button></aside>')

  var buttonSignIn = document.querySelector('#user-identity-input button.signin')
  buttonSignIn.setAttribute('disabled', 'disabled')

  document.querySelector('#user-identity-input').addEventListener('click', e => {
    if (e.target.matches('button.close')) {
      var signinUser = document.querySelector('#document-menu button.signin-user')
      if (signinUser) {
        signinUser.disabled = false
      }
    }
  })

  var inputWebid = document.querySelector('#user-identity-input input#webid')

  buttonSignIn.addEventListener('click', submitSignIn)

  let events = ['keyup', 'cut', 'paste', 'input']

  events.forEach(eventType => {
    inputWebid.addEventListener(eventType, e => { enableDisableButton(e, buttonSignIn) })
  })

  inputWebid.focus()
}

function showUserSigninSignup (node) {
  if (!document.querySelector('#user-info')) {
    var s = '<button class="signin-user" title="Sign in to authenticate"><i class="fa fa-user-secret fa-2x"></i>Sign in</button>'
    if (Config.User.IRI) {
      s = getUserHTML()
    }
    node.insertAdjacentHTML('beforeend', '<section id="user-info">' + s + '</section>')

    var su = document.querySelector('#document-menu button.signin-user')
    if (su) {
      su.addEventListener('click', showUserIdentityInput)
    }
  }
}

// FIXME: This parameter value can be an event or a string
function submitSignIn (url) {
  if (typeof url !== 'string') {
    var userIdentityInput = document.getElementById('user-identity-input')

    if (userIdentityInput) {
      userIdentityInput.insertAdjacentHTML('beforeend',
        '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>')
    }

    url = userIdentityInput.querySelector('input#webid').value.trim()
  }

  if (!url) {
    console.log('submitSignIn - no user url input')
    return Promise.resolve()
  }

  return setUserInfo(url)
    .then(() => {
      var uI = document.getElementById('user-info')
      if (uI) {
        uI.innerHTML = getUserHTML()
      }

      if (userIdentityInput) {
        userIdentityInput.parentNode.removeChild(userIdentityInput)
      }

      afterSignIn()
    })
}
