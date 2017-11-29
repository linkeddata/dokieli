'use strict'

const Config = require('./config')
const util = require('./util')
const uri = require('./uri')

module.exports = {
  initStorage,
  enableStorage,
  disableStorage,
  updateStorageDocument,
  enableAutoSave,
  disableAutoSave,
  removeStorageItem,
  removeStorageProfile,
  getStorageProfile,
  updateStorageProfile,
  showStorage,
  hideStorage
}


function initStorage(key) {
  if (typeof window.localStorage != 'undefined') {
    enableStorage(key);
  }
}

function enableStorage(key) {
  Config.UseStorage = true;
  var o = localStorage.getItem(key);
  try {
    JSON.parse(o).object.Document;
    document.documentElement.innerHTML = JSON.parse(o).object.content;
  } catch(e){}
  console.log(util.getDateTimeISO() + ': ' + key + ' storage enabled.');
  enableAutoSave(key);
}

function disableStorage(key) {
  Config.UseStorage = false;
  localStorage.removeItem(key);
  disableAutoSave(key);
  console.log(util.getDateTimeISO() + ': ' + key + ' storage disabled.');
}

function updateStorageDocument(key) {
  var content = doc.getDocument();

  var id = DO.U.generateUUID();
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
  console.log(datetime + ': Document saved.');
}

function enableAutoSave(key) {
  Config.AutoSaveId = setInterval(function() { updateStorageDocument(key) }, Config.AutoSaveTimer);
  console.log(util.getDateTimeISO() + ': ' + key + ' autosave enabled.');
}

function disableAutoSave(key) {
  clearInterval(Config.AutoSaveId);
  Config.AutoSaveId = '';
  console.log(util.getDateTimeISO() + ': ' + key + ' autosave disabled.');
}

function removeStorageItem(key) {
  if (!key) { Promise.resolve(); }

  console.log(util.getDateTimeISO() + ': ' + key + ' removed.')

  if (Config.WebExtension) {
    var browser = (typeof browser !== 'undefined') ? browser : chrome;

    return browser.storage.local.remove(key);
  }
  else if (window.localStorage) {
    return Promise.resolve(localStorage.removeItem(key));
  }
  else {
    return Promise.reject({'message': 'storage is unavailable'})
  }
}

function removeStorageProfile(key) {
  key = key || 'DO.C.User';

  return removeStorageItem(key)
}

function getStorageProfile(key) {
  key = key || 'DO.C.User'

  if (Config.WebExtension) {
    //WebExtension
    if (typeof browser !== 'undefined') {
      return browser.storage.local.get(key).then(function(o){ console.log(o[key]); return o[key]; });
    }
    else {
      var value = {};

      chrome.storage.local.get(key, function(o){ value = o[key]; })

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

function updateStorageProfile(User) {
  var key = 'DO.C.User'

  var id = DO.U.generateUUID();
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
      return browser.storage.local.set({[key]: object});
    }
    else {
      return Promise.resolve(chrome.storage.local.set({[key]: object}));
    }
  }
  else if (window.localStorage) {
    console.log(datetime + ': User ' + User.IRI + ' saved.');
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(object)));
  }
  else {
    return Promise.reject({'message': 'storage is unavailable'})
  }
}

function showStorage(node) {
  if (window.localStorage) {
    if(document.querySelector('#local-storage')) { return; }

    var useStorage, checked;

    if (Config.UseStorage) {
      // if (Config.AutoSaveId) {
      //   checked = ' checked="checked"';
      // }
      // useStorage = Config.DisableStorageButtons + '<input id="local-storage-html-autosave" class="autosave" type="checkbox"' + checked +' /> <label for="local-storage-html-autosave"><i class="fa fa-clock-o"></i> 1m autosave</label>';
      useStorage = Config.DisableStorageButtons;

    }
    else {
      useStorage = Config.EnableStorageButtons;
    }

    node.insertAdjacentHTML('beforeend', '<section id="local-storage" class="do"><h2>Local Storage</h2><p>' + useStorage + '</p></section>');

    var key = uri.stripFragmentFromString(document.location.href);

    document.getElementById('local-storage').addEventListener('click', function(e) {
      if (e.target.closest('button.local-storage-enable-html')) {
        e.target.outerHTML = Config.DisableStorageButtons;
        enableStorage(key);
      }

      if (e.target.closest('button.local-storage-disable-html')) {
        e.target.outerHTML = Config.EnableStorageButtons;
        disableStorage(key);
      }

      // if (e.target.matches('input.autosave')) {
      //   if (e.target.getAttribute('checked')) {
      //     e.target.removeAttribute('checked');
      //     disableAutoSave(key);
      //   }
      //   else {
      //     e.target.setAttribute('checked', 'checked');
      //     enableAutoSave(key);
      //   }
      // }
    });
  }
}

function hideStorage() {
  if (Config.UseStorage) {
    var ls = document.getElementById('local-storage');
    ls.parentNode.removeChild(ls);
  }
}
