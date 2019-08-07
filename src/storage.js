'use strict'

const Config = require('./config')
const util = require('./util')
const uri = require('./uri')
const doc = require('./doc')

module.exports = {
  initLocalStorage,
  enableLocalStorage,
  disableLocalStorage,
  updateLocalStorageDocument,
  updateHTTPStorageDocument,
  enableAutoSave,
  disableAutoSave,
  removeLocalStorageItem,
  removeLocalStorageProfile,
  getLocalStorageProfile,
  updateLocalStorageProfile,
  showAutoSaveStorage,
  hideAutoSaveStorage
}


function initLocalStorage(key) {
  if (typeof window.localStorage != 'undefined') {
    enableLocalStorage(key);
  }
}

function enableLocalStorage(key) {
  Config.UseLocalStorage = true;
  var o = localStorage.getItem(key);
  try {
    document.documentElement.innerHTML = JSON.parse(o).object.content;
    Config.init();
  } catch(e){}
  console.log(util.getDateTimeISO() + ': ' + key + ' storage enabled.');
  enableAutoSave(key, {'method': 'localStorage'});
}

function disableLocalStorage(key) {
  Config.UseLocalStorage = false;
  localStorage.removeItem(key);
  disableAutoSave(key, {'method': 'localStorage'});
  console.log(util.getDateTimeISO() + ': ' + key + ' storage disabled.');
}

function updateLocalStorageDocument(key, options) {
  options = options || {};
  var content = doc.getDocument();

  var id = util.generateUUID();
  var o = localStorage.getItem(key);

  var datetime = util.getDateTimeISO();

  var object = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": id,
    "type": "Update",
    "object": {
      "id": key,
      "type": "Document",
      "updated": datetime,
      "mediaType": "text/html",
      "content": content
    }
  };

  localStorage.setItem(key, JSON.stringify(object));

  if (options.autosave) {
    Config.AutoSave.Items[key]['localStorage']['updated'] = object.object.updated;
  }

  console.log(datetime + ': Document saved.');
}

function updateHTTPStorageDocument(url) {
  doc.updateMutableResource(url);

  var datetime = util.getDateTimeISO();
  console.log(datetime + ': Document saved.');
}

function enableAutoSave(key, options) {
  options = options || {};
  options['method'] = ('method' in options) ? options.method : 'localStorage';
  Config.AutoSave.Items[key] = (Config.AutoSave.Items[key]) ? Config.AutoSave.Items[key] : {};
  Config.AutoSave.Items[key][options.method] = (Config.AutoSave.Items[key][options.method]) ? Config.AutoSave.Items[key][options.method] : {};

  var id;

  switch (options.method) {
    default:
    case 'localStorage':
      id = setInterval(function() { updateLocalStorageDocument(key, {'autosave': true}) }, Config.AutoSave.Timer);
      break;

    case 'http':
      id = setInterval(function() { updateHTTPStorageDocument(key) }, Config.AutoSave.Timer);
      break;
  }

  Config.AutoSave.Items[key][options.method]['id'] = id;

  console.log(util.getDateTimeISO() + ': ' + key + ' ' + options.method + ' autosave enabled.');
}

function disableAutoSave(key, options) {
  options = options || {};
  var methods;
  if(!Config.AutoSave.Items[key]) { return; }

  if('method' in options) {
    methods = (Array.isArray(options.method)) ? options.method : [options.method];

    methods.forEach(method => {
      if (Config.AutoSave.Items[key][method]) {
        clearInterval(Config.AutoSave.Items[key][method].id);
        Config.AutoSave.Items[key][method] = undefined;
        console.log(util.getDateTimeISO() + ': ' + key + ' ' + options.method + ' autosave disabled.');
      }
    })
  }
}

function removeLocalStorageItem(key) {
  if (!key) { Promise.resolve(); }

  // console.log(util.getDateTimeISO() + ': ' + key + ' removed.')

  if (Config.WebExtension) {
    var browser = (typeof browser !== 'undefined') ? browser : chrome;

    return browser.storage.sync.remove(key);
  }
  else if (window.localStorage) {
    return Promise.resolve(localStorage.removeItem(key));
  }
  else {
    return Promise.reject({'message': 'storage is unavailable'})
  }
}

function removeLocalStorageProfile(key) {
  key = key || 'DO.C.User';

  return removeLocalStorageItem(key)
}

function getLocalStorageProfile(key) {
  key = key || 'DO.C.User'

  if (Config.WebExtension) {
    if (typeof browser !== 'undefined') {
      return browser.storage.sync.get(key).then(function(o){ return o[key]; });
    }
    else {
      var value = {};
      chrome.storage.sync.get(key, function(o){ value = o[key]; })

      return new Promise(function(resolve, reject){
        window.setTimeout(function() {
          return resolve(value)
        }, 50);
      });
    }
  }
  else if (window.localStorage) {
    var o = localStorage.getItem(key);
    return Promise.resolve(JSON.parse(o));
  }
  else {
    return Promise.reject({'message': 'storage is unavailable'})
  }
}

function updateLocalStorageProfile(User) {
  if (!User.IRI) { return Promise.resolve({'message': 'User.IRI is not set'}); }

  var key = 'DO.C.User'

  var id = util.generateUUID();
  var datetime = util.getDateTimeISO();

  //because.. cyclic
  if (User.Graph) {
    delete User.Graph
  }

  if (User.Contacts) {
    User.Contacts = {}
  }

  var object = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": id,
    "type": "Update",
    "object": {
      "id": key,
      "type": "Profile",
      "describes": User
    },
    "datetime": datetime,
    "actor": User.IRI
  };

  if (Config.WebExtension) {
    if (typeof browser !== 'undefined') {
      return browser.storage.sync.set({[key]: object});
    }
    else {
      return Promise.resolve(chrome.storage.sync.set({[key]: object}));
    }
  }
  else if (window.localStorage) {
    // console.log(datetime + ': User ' + User.IRI + ' saved.');
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(object)));
  }
  else {
    return Promise.reject({'message': 'storage is unavailable'})
  }
}

function showAutoSaveStorage(node, iri) {
  iri = iri || uri.stripFragmentFromString(document.location.href);

  if(document.querySelector('#autosave-items')) { return; }

  var checked;
  if (window.localStorage) {
    checked = (Config.AutoSave.Items[iri] && Config.AutoSave.Items[iri]['localStorage'] && Config.AutoSave.Items[iri]['localStorage']) ? ' checked="checked"' : '';

    var useLocalStorage = '<li class="local-storage-html-autosave"><input id="local-storage-html-autosave" class="autosave" type="checkbox"' + checked +' /> <label for="local-storage-html-autosave">' + (Config.AutoSave.Timer / 60000) + 'm autosave (local storage)</label></li>';
  }

  checked = (Config.AutoSave.Items[iri] && Config.AutoSave.Items[iri]['http'] && Config.AutoSave.Items[iri]['localStorage']) ? ' checked="checked"' : '';

  var useHTTPStorage = '<li class="http-storage-html-autosave"><input id="http-storage-html-autosave" class="autosave" type="checkbox"' + checked +' /> <label for="http-storage-html-autosave">' + (Config.AutoSave.Timer / 60000) + 'm autosave (http)</label></li>';
  // var useHTTPStorage = '';

  node.insertAdjacentHTML('beforeend', '<ul id="autosave-items" class="on">' + useLocalStorage + useHTTPStorage + '</ul>');

  node.querySelector('#autosave-items').addEventListener('click', function(e) {
    if (e.target.closest('input.autosave')) {
      var method;
      switch (e.target.id){
        default:
        case 'local-storage-html-autosave':
          method = 'localStorage';
          break;
        case 'http-storage-html-autosave':
          method = 'http';
          break;
      }

      if (e.target.getAttribute('checked')) {
        e.target.removeAttribute('checked');
        disableAutoSave(iri, {'method': method});
      }
      else {
        e.target.setAttribute('checked', 'checked');
        enableAutoSave(iri, {'method': method});
      }
    }
  });
}

function hideAutoSaveStorage(node, iri) {
  node = node || document.getElementById('autosave-items');
  iri = iri || uri.stripFragmentFromString(document.location.href);
  node.parentNode.removeChild(node);
  disableAutoSave(iri);
}
