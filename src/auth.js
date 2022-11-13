'use strict'

const Config = require('./config')
const fetcher = require('./fetcher')
const util = require('./util')
const uri = require('./uri')
const storage = require('./storage')
const solidAuth = require('solid-auth-client')

// const { OIDCWebClient } = require('@trust/oidc-web')

module.exports = {
  isActorType,
  isActorProperty,
  afterSignIn,
  enableDisableButton,
  getAgentImage,
  getAgentName,
  getAgentURL,
  getAgentStorage,
  getAgentOutbox,
  getAgentInbox,
  getAgentKnows,
  getAgentSupplementalInfo,
  getAgentSeeAlso,
  getAgentTypeIndex,
  getAgentPreferencesFile,
  getAgentPreferencesInfo,
  getAgentPreferredProxy,
  getAgentPreferredPolicy,
  getAgentPreferredPolicyRule,
  getAgentPublicTypeIndex,
  getAgentPrivateTypeIndex,
  getUserContacts,
  getUserHTML,
  getUserSignedInHTML,
  setUserInfo,
  showUserIdentityInput,
  showUserSigninSignout,
  submitSignIn,
  processSameAs
}


function isActorType (s) {
  var actorTypes = [
    'foafAgent', 'foafPerson', 'foafGroup', 'foafOrganization',
    'vcardVCard', 'vcardIndividual', 'vcardGroup', 'vcardOrganization',
    'schemaPerson', 'schemaOrganization',
    'dctermsAgent',
    'asApplication', 'asGroup', 'asOrganization', 'asPerson', 'asService'
  ];

  actorTypes = actorTypes.map(a => { if (Config.Vocab[a]["@id"]) return Config.Vocab[a]["@id"]; });

  if (actorTypes.indexOf(s) > -1) {
    return true;
  }

  return false;
}

function isActorProperty (s) {
  var actorTypes = [
    'foafknows',
    'asactor',
    'schemacreator', 'schemaauthor', 'schemacontributor', 'schemaeditor',
    'dctermscreator'
  ];

  actorTypes = actorTypes.map(a => { if (Config.Vocab[a]["@id"]) return Config.Vocab[a]["@id"]; });

  if (actorTypes.indexOf(s) > -1) {
    return true;
  }

  return false;
}


function getUserHTML (options) {
  options = options || {};
  var avatarSize = ('avatarSize' in options) ? options.avatarSize : Config['AvatarSize'];

  let userName = Config.SecretAgentNames[Math.floor(Math.random() * Config.SecretAgentNames.length)]

  if (Config.User.Name) {
    // XXX: We have the IRI already
    userName = '<span about="' + Config.User.IRI + '" property="schema:name">' +
      Config.User.Name + '</span>'
  }

  let userImage = ''

  if (!('omitImage' in options && options.omitImage) && 'Image' in Config.User && typeof Config.User.Image !== 'undefined' && Config.User.Image.length > 0) {
    userImage = '<img alt="" height="' + avatarSize + '" rel="schema:image" src="' +
      Config.User.Image + '" width="' + avatarSize + '" /> '
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

function getUserSignedInHTML() {
  return getUserHTML() + '<button class="signout-user" title="Live long and prosper"><svg class="far fa-hand-spock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M21.096 381.79l129.092 121.513a32 32 0 0 0 21.932 8.698h237.6c14.17 0 26.653-9.319 30.68-22.904l31.815-107.313A115.955 115.955 0 0 0 477 348.811v-36.839c0-4.051.476-8.104 1.414-12.045l31.73-133.41c10.099-42.412-22.316-82.738-65.544-82.525-4.144-24.856-22.543-47.165-49.85-53.992-35.803-8.952-72.227 12.655-81.25 48.75L296.599 184 274.924 52.01c-8.286-36.07-44.303-58.572-80.304-50.296-29.616 6.804-50.138 32.389-51.882 61.295-42.637.831-73.455 40.563-64.071 81.844l31.04 136.508c-27.194-22.515-67.284-19.992-91.482 5.722-25.376 26.961-24.098 69.325 2.871 94.707zm32.068-61.811l.002-.001c7.219-7.672 19.241-7.98 26.856-.813l53.012 49.894C143.225 378.649 160 371.4 160 357.406v-69.479c0-1.193-.134-2.383-.397-3.546l-34.13-150.172c-5.596-24.617 31.502-32.86 37.054-8.421l30.399 133.757a16 16 0 0 0 15.603 12.454h8.604c10.276 0 17.894-9.567 15.594-19.583l-41.62-181.153c-5.623-24.469 31.39-33.076 37.035-8.508l45.22 196.828A16 16 0 0 0 288.956 272h13.217a16 16 0 0 0 15.522-12.119l42.372-169.49c6.104-24.422 42.962-15.159 36.865 9.217L358.805 252.12c-2.521 10.088 5.115 19.88 15.522 19.88h9.694a16 16 0 0 0 15.565-12.295L426.509 146.6c5.821-24.448 42.797-15.687 36.966 8.802L431.72 288.81a100.094 100.094 0 0 0-2.72 23.162v36.839c0 6.548-.943 13.051-2.805 19.328L397.775 464h-219.31L53.978 346.836c-7.629-7.18-7.994-19.229-.814-26.857z"/></svg></button>'
}


async function showUserSigninSignout (node) {

  const session = await solid.auth.currentSession();
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
    storage.removeLocalStorageProfile()

    Config.User = {
      IRI: null,
      Role: 'social',
      UI: {}
    }

    util.removeChildren(node);
  }


  var userInfo = document.getElementById('user-info');

  if (!userInfo) {
    var s = ''

    if (Config.User.IRI) {
      s = getUserSignedInHTML()
    }
    else {
      s = '<button class="signin-user" title="Sign in to authenticate"><svg class="fas fa-user-secret fa-2x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z"/></svg>Sign in</button>'
    }

    node.insertAdjacentHTML('beforeend', '<section id="user-info">' + s + '</section>')

    userInfo = document.getElementById('user-info')

    userInfo.addEventListener('click', async function(e) {
      if (e.target.closest('.signout-user')) {
        if (Config.User.OIDC) {
          await solidAuth.logout();
        }

        storage.removeLocalStorageProfile()

        Config.User = {
          IRI: null,
          Role: 'social',
          UI: {}
        }

        util.removeChildren(node);

        var documentMenu = document.querySelector('#document-menu')

        showUserSigninSignout(documentMenu.querySelector('header'))

        var ra = documentMenu.querySelector('.resource-activities');
        ra.disabled = true;
        ra.innerHTML = '<svg class="fas fa-bolt fa-2x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"/></svg>Activities';
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

  document.documentElement.appendChild(util.fragmentFromString(code))

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
      userIdentityInput.querySelector('#user-identity-input-webid').insertAdjacentHTML('beforeend',
        '<svg class="fas fa-circle-notch fa-spin fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/></svg>')
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
        util.removeChildren(uI);
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
    solidAuth
      .popupLogin({ popupUri })
      .then((session) => {
         if (session && session.webId) {
           console.log("Connected:", session.webId);
           setUserInfo(session.webId, true)
            .then(() => {
              var uI = document.getElementById('user-info')
              if (uI) {
                util.removeChildren(uI);
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

  return fetcher.getResourceGraph(userIRI)
    .then(g => {
      var s = g.child(userIRI)

      Config.User.Graph = s
      Config.User.IRI = userIRI
      Config.User.Name = getAgentName(s)
      Config.User.Image = getAgentImage(s)
      Config.User.URL = getAgentURL(s)
      Config.User.OIDC = oidc ? true : false;

      Config.User.Delegates = getAgentDelegates(s)

      Config.User.Contacts = {}
      Config.User.Knows = getAgentKnows(s)
      Config.User.SameAs = []
      Config.User.SeeAlso = []

      Config.User.Storage = getAgentStorage(s)
      Config.User.Outbox = getAgentOutbox(s)
      Config.User.Inbox = getAgentInbox(s)
      Config.User.TypeIndex = {}

      Config.User.PreferencesFile = getAgentPreferencesFile(s)
      Config.User.PublicTypeIndex = getAgentPublicTypeIndex(s)
      Config.User.PrivateTypeIndex = getAgentPrivateTypeIndex(s)

      Config.User.ProxyURL = getAgentPreferredProxy(s)
      Config.User.PreferredPolicy = getAgentPreferredPolicy(s)

      return Config.User
    })
}

function afterSignIn () {
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

      return storage.updateLocalStorageProfile(Config.User)
    })
    .catch(function(e) {
      return Promise.resolve();
    });

  var rA = document.querySelector('#document-menu .resource-activities')
  if(rA) { rA.removeAttribute('disabled') }

  var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + Config.User.IRI + '"]')
  for (let i = 0; i < user.length; i++) {
    var article = user[i].closest('article')
    article.insertAdjacentHTML('afterbegin', '<button class="delete"><svg class="fas fa-trash-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg></button>')
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
          var span = document.querySelector('span[resource="#' + refId + '"]')
          span.outerHTML = span.querySelector('mark').textContent
          // TODO: Delete notification or send delete activity
        })
    })
  }
}

function getAgentPreferencesInfo(g) {
  if (!g) { return; }

  var preferencesFile = (Config.User.PreferencesFile) ? Config.User.PreferencesFile : getAgentPreferencesFile(g);

  if (preferencesFile) {
    return fetcher.getResourceGraph(preferencesFile).then(g => {
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
    return fetcher.getResourceGraph(iri).then(
      function(g){
        if(typeof g._graph == 'undefined') {
          return Promise.resolve([]);
        }
        var s = g.child(iri);

        Config.User.Name = Config.User.Name || getAgentName(s);

        Config.User.Image = Config.User.Image || getAgentImage(s);

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

        return processSameAs(s, getAgentSupplementalInfo);
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

      fetcher.getResourceGraph(iri)
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
      return fetcher.getResourceGraph(iri).then(
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

    fetcher.getTriplesFromGraph(pIRI)
      .then(function(triples){
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

function getAgentImage (s) {
  return s.foafimg || s.schemaimage || s.vcardphoto || s.vcardhasPhoto || s.asimage ||
    s.siocavatar || s.foafdepiction || undefined
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
