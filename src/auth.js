'use strict'

const Config = require('./config')
const fetcher = require('./fetcher')

module.exports = {
  afterSignIn,
  enableDisableButton,
  getUserHTML,
  setUserInfo,
  showUserIdentityInput,
  submitSignIn
}

function afterSignIn () {
  var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + DO.C.User.IRI + '"]')
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
          DO.U.submitSignIn()
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

      DO.C.User.Graph = s
      DO.C.User.IRI = userIRI
      DO.C.User.Name = DO.U.getAgentName(s)
      DO.C.User.Image = DO.U.getAgentImage(s)
      DO.C.User.URL = s.foafhomepage || s['http://xmlns.com/foaf/0.1/weblog'] || s.schemaurl || undefined
      DO.C.User.Knows = (s.foafknows && s.foafknows._array.length > 0) ? DO.U.uniqueArray(s.foafknows._array) : []
      DO.C.User.Knows = (s.schemaknows && s.schemaknows._array.length > 0) ? DO.U.uniqueArray(DO.C.User.Knows.concat(s.schemaknows._array)) : DO.C.User.Knows

      DO.C.User.TempKnows = []
      DO.C.User.SameAs = []
      DO.C.User.Contacts = []

      if (s.storage) {
        DO.C.User.Storage = s.storage._array
      }

      if (s.preferencesFile && s.preferencesFile.length > 0) {
        DO.C.User.PreferencesFile = s.preferencesFile

        // TODO: Reconsider if/where to use this.
        // DO.U.setUserWorkspaces(DO.C.User.PreferencesFile);
      }
      return DO.C.User
    })
}


function showUserIdentityInput (e) {
  if (typeof e !== 'undefined') {
    e.target.disabled = true
  }
  document.body.insertAdjacentHTML('beforeend', '<aside id="user-identity-input" class="do on"><button class="close" title="Close">❌</button><h2>Sign in with WebID</h2><label>HTTP(S) IRI</label> <input id="webid" type="text" placeholder="http://csarven.ca/#i" value="" name="webid"/> <button class="signin">Sign in</button></aside>')
  var buttonSignIn = document.querySelector('#user-identity-input button.signin')
  buttonSignIn.setAttribute('disabled', 'disabled')
  document.querySelector('#user-identity-input').addEventListener('click', function (e) {
    if (e.target.matches('button.close')) {
      var signinUser = document.querySelector('#document-menu button.signin-user')
      if (signinUser) {
        signinUser.disabled = false
      }
    }
  })

  var inputWebid = document.querySelector('#user-identity-input input#webid')
  buttonSignIn.addEventListener('click', DO.U.submitSignIn);
  ['keyup', 'cut', 'paste', 'input'].forEach(function (eventType) {
    inputWebid.addEventListener(eventType, function (e) { enableDisableButton(e, buttonSignIn) })
  })
  inputWebid.focus()
}

// FIXME: This parameter value can be an event or a string
function submitSignIn (url) {
  if (typeof url !== 'string') {
    var userIdentityInput = document.getElementById('user-identity-input')
    if (userIdentityInput) {
      userIdentityInput.insertAdjacentHTML('beforeend', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>')
    }

    url = userIdentityInput.querySelector('input#webid').value.trim()
  }

  if (url.length > 0) {
    DO.U.setUserInfo(url).then(
      function (i) {
// console.log(i);
        var uI = document.getElementById('user-info')
        if (uI) {
          uI.innerHTML = getUserHTML()
        }

        if (userIdentityInput) {
          userIdentityInput.parentNode.removeChild(userIdentityInput)
        }

        DO.U.afterSignIn()
      },
      function (reason) {
        console.log('--- NO USER')
        console.log(reason)
      }
    )
  }
}
