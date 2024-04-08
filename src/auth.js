'use strict'

import Config from './config.js'
import { deleteResource } from './fetcher.js'
import { removeChildren, fragmentFromString } from './util.js'
import { getAgentHTML, showActionMessage, showGeneralMessages, getResourceSupplementalInfo, updateDocumentDoButtonStates, updateFeatureStatesOfResourceInfo } from './doc.js'
import { Icon } from './template.js'
import { getResourceGraph, getAgentName, getGraphImage, getAgentURL, getAgentPreferredProxy, getAgentPreferredPolicy, getAgentDelegates, getAgentKnows, getAgentFollowing, getAgentStorage, getAgentOutbox, getAgentInbox, getAgentPreferencesFile, getAgentPublicTypeIndex, getAgentPrivateTypeIndex, getAgentTypeIndex, getAgentSupplementalInfo, getAgentSeeAlso, getAgentPreferencesInfo, getAgentOccupations } from './graph.js'
import { removeLocalStorageProfile, updateLocalStorageProfile } from './storage.js'
import solidAuth, { logout, popupLogin } from 'solid-auth-client'

// const { OIDCWebClient } = require('@trust/oidc-web')


function getUserSignedInHTML() {
  return getAgentHTML() + '<button class="signout-user" title="Live long and prosper">' + Icon[".far.fa-spock-hand"] + '</button>'
}


async function showUserSigninSignout (node) {
  const session = await solidAuth.currentSession();
  var webId = session ? session.webId : null;
  // was LoggedId with new OIDC WebID
  if (webId && (webId != Config.User.IRI || !Config.User.IRI)) {
     await setUserInfo(webId, true)
          .then(() => {
            afterSignIn()
          })
  }
  // was LoggedOut as OIDC
  if (!webId && Config.User.IRI && Config.User.OIDC) {
    removeLocalStorageProfile()

    Config.User = {
      IRI: null,
      Role: 'social',
      UI: {}
    }

    removeChildren(node);
  }


  var userInfo = document.getElementById('user-info');

  if (!userInfo) {
    var s = ''

    if (Config.User.IRI) {
      s = getUserSignedInHTML()
    }
    else {
      s = '<button class="signin-user" title="Sign in to authenticate">' + Icon['.fas.fa-user-astronaut.fa-2x'] + 'Sign in</button>'
    }

    node.insertAdjacentHTML('beforeend', '<section id="user-info">' + s + '</section>')

    userInfo = document.getElementById('user-info')

    userInfo.addEventListener('click', async function(e) {
      if (e.target.closest('.signout-user')) {
        if (Config.User.OIDC) {
          await logout();
        }

        removeLocalStorageProfile()

        Config.User = {
          IRI: null,
          Role: 'social',
          UI: {}
        }

        removeChildren(node);

        var documentMenu = document.querySelector('#document-menu')

        showUserSigninSignout(documentMenu.querySelector('header'))

        getResourceSupplementalInfo(Config.DocumentURL).then(resourceInfo => {
          updateFeatureStatesOfResourceInfo(resourceInfo);
          updateDocumentDoButtonStates();
        });

        var ra = documentMenu.querySelector('.resource-activities');
        ra.disabled = true;
        ra.innerHTML = Icon[".fas.fa-bolt.fa-2x"] + 'Activities';
      }
    });

    var su = document.querySelector('#document-menu button.signin-user')
    if (su) {
      su.addEventListener('click', showUserIdentityInput)
    }

    var rA = document.querySelector('#document-menu .resource-activities')
    if(rA) { rA.setAttribute('disabled', 'disabled') }
  }
}


function showUserIdentityInput (e) {
  if (typeof e !== 'undefined') {
    e.target.disabled = true
  }

  var webid = Config.User.WebIdDelegate ? Config.User.WebIdDelegate : "";
  var code = '<aside id="user-identity-input" class="do on">' + Config.Button.Close + '<h2>Sign in</h2><p id="user-identity-input-webid"><label>WebID</label> <input id="webid" type="text" placeholder="https://csarven.ca/#i" value="'+webid+'" name="webid"/> <button class="signin">Sign in</button></p>';
  //XXX: This limitation may not be necessary.
  // if (window.location.protocol === "https:") {
    code += '<p id="user-identity-input-oidc">or with <label>OpenID Connect</label> <button class="signin-oidc">Sign in</button></p>';
  // }
  code += '</aside>';

  document.documentElement.appendChild(fragmentFromString(code))

  var buttonSignIn = document.querySelector('#user-identity-input button.signin')
  if (! Config.User.WebIdDelegate)
    buttonSignIn.setAttribute('disabled', 'disabled')

  document.querySelector('#user-identity-input').addEventListener('click', e => {
    if (e.target.closest('button.close')) {
      var signinUser = document.querySelector('#document-menu button.signin-user')
      if (signinUser) {
        signinUser.disabled = false
      }
    }
  })

  var inputWebID = document.querySelector('#user-identity-input input#webid')
  if(inputWebID) {
    buttonSignIn.addEventListener('click', submitSignIn)

    let events = ['keyup', 'cut', 'paste', 'input']

    events.forEach(eventType => {
      inputWebID.addEventListener(eventType, e => { enableDisableButton(e, buttonSignIn) })
    })
  }

  var buttonSignInOIDC = document.querySelector('#user-identity-input button.signin-oidc')
  if (buttonSignInOIDC) {
    buttonSignInOIDC.addEventListener('click', submitSignInOIDC)
  }

  inputWebID.focus()
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

// FIXME: This parameter value can be an event or a string
function submitSignIn (url) {
  var userIdentityInput = document.getElementById('user-identity-input')

  if (typeof url !== 'string') {
    if (userIdentityInput) {
      userIdentityInput.querySelector('#user-identity-input-webid').insertAdjacentHTML('beforeend', Icon[".fas.fa-circle-notch.fa-spin.fa-fw"])
    }

    url = userIdentityInput.querySelector('input#webid').value.trim()
  }

  if (!url) {
    console.log('submitSignIn - no user url input')
    return Promise.resolve()
  }

  return setUserInfo(url, false)
    .then(() => {
      var uI = document.getElementById('user-info')
      if (uI) {
        removeChildren(uI);
        uI.insertAdjacentHTML('beforeend', getUserSignedInHTML());
      }

      if (userIdentityInput) {
        userIdentityInput.parentNode.removeChild(userIdentityInput)
      }

      afterSignIn()
    })
}


function submitSignInOIDC (url) {
  var userIdentityInput = document.getElementById('user-identity-input')

  var popupUri = Config.OidcPopupUrl;

  if (solidAuth) {
    popupLogin({ popupUri })
      .then((session) => {
         if (session && session.webId) {
           console.log("Connected:", session.webId);
           setUserInfo(session.webId, true)
            .then(() => {
              var uI = document.getElementById('user-info')
              if (uI) {
                removeChildren(uI);
                uI.insertAdjacentHTML('beforeend', getUserSignedInHTML());
              }

              if (userIdentityInput) {
                userIdentityInput.parentNode.removeChild(userIdentityInput)
              }

              afterSignIn()
            })
         }
      }).catch((err) => {
        console.log('submitSignInOIDC - '+err);
        return Promise.resolve();
      });
  }
}

/**
 * @param userIRI {string}
 *
 * @returns {Promise}
 */
function setUserInfo (userIRI, oidc) {
  if (!userIRI) {
    return Promise.reject(new Error('Could not set user info - no user IRI'))
  }

  var options = { 'noCredentials': true }

  return getResourceGraph(userIRI, {}, options)
    .then(g => {
      var s = g.child(userIRI)

      Config.User.Graph = s
      Config.User.IRI = userIRI
      Config.User.Name = getAgentName(s)
      Config.User.Image = getGraphImage(s)
      Config.User.URL = getAgentURL(s)
      Config.User.OIDC = oidc ? true : false;

      Config.User.ProxyURL = getAgentPreferredProxy(s)
      Config.User.PreferredPolicy = getAgentPreferredPolicy(s)

      Config.User.Delegates = getAgentDelegates(s)

      Config.User.Contacts = {}
      Config.User.Knows = getAgentKnows(s)
      Config.User.Following = getAgentFollowing(s)
      Config.User.SameAs = []
      Config.User.SeeAlso = []

      Config.User.Storage = getAgentStorage(s)
      Config.User.Outbox = getAgentOutbox(s)
      Config.User.Inbox = getAgentInbox(s)
      Config.User.TypeIndex = {}

      Config.User.PreferencesFile = getAgentPreferencesFile(s)
      Config.User.PublicTypeIndex = getAgentPublicTypeIndex(s)
      Config.User.PrivateTypeIndex = getAgentPrivateTypeIndex(s)

      Config.User.Occupations = getAgentOccupations(s)

      return Config.User
    })
}

function afterSignIn () {
  getResourceSupplementalInfo(Config.DocumentURL).then(resourceInfo => {
    updateFeatureStatesOfResourceInfo(resourceInfo);
    updateDocumentDoButtonStates();
  });

  var promises = [];

  promises.push(getAgentTypeIndex(Config.User))

  promises.push(getAgentSupplementalInfo(Config.User.IRI))

  promises.push(getAgentSeeAlso(Config.User.Graph))

  promises.push(getAgentPreferencesInfo(Config.User.Graph))

  Promise.all(promises)
    .then(function(results) {
      var uI = document.getElementById('user-info')
      if (uI) {
        uI.innerHTML = getUserSignedInHTML()
      }

      //XXX: Run this after all promises are settled
      showGeneralMessages();

      return updateLocalStorageProfile(Config.User)
    })
    .catch(function(e) {
      return Promise.resolve();
    });

  var rA = document.querySelector('#document-menu .resource-activities')
  if(rA) { rA.removeAttribute('disabled') }

  var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + Config.User.IRI + '"]')
  for (let i = 0; i < user.length; i++) {
    var article = user[i].closest('article')
    article.insertAdjacentHTML('afterbegin', '<button class="delete">' + Icon[".fas.fa-trash-alt"] + '</button>')
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

      deleteResource(noteIRI)
        .then(() => {
          var aside = e.target.closest('aside.do')
          aside.parentNode.removeChild(aside)
          var span = document.querySelector('span[resource="#' + refId + '"]')
          span.outerHTML = span.querySelector('mark').textContent
          // TODO: Delete notification or send delete activity
        })
    })
  }
}

export {
  afterSignIn,
  enableDisableButton,
  getUserSignedInHTML,
  setUserInfo,
  showUserIdentityInput,
  showUserSigninSignout,
  submitSignIn,
  submitSignInOIDC
}