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

  util.getHash(content).then(digest => {
    var o = localStorage.getItem(key);

    if(!o || (o && JSON.parse(o).id != digest)) {
      var datetime = util.getDateTimeISO();

      var object = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "id": digest,
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
  });
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
  console.log(util.getDateTimeISO() + ': ' + key + ' removed.')
  localStorage.removeItem(key);
}

function removeStorageProfile() {
  var key = uri.stripFragmentFromString(document.location.href) + '#DO.C.User'
  removeStorageItem(key)
}

function getStorageProfile() {
  var key = uri.stripFragmentFromString(document.location.href) + '#DO.C.User'

  return util.getHash(key).then(digest => {
    var o = localStorage.getItem(key);

    if(o && JSON.parse(o).id == digest) {
      return JSON.parse(o)
    }
  });
}

function updateStorageProfile(User) {
  var key = uri.stripFragmentFromString(document.location.href) + '#DO.C.User'

  util.getHash(key).then(digest => {
    var datetime = util.getDateTimeISO();

    //cyclic
    if (User.Graph) {
      delete User.Graph
    }

    if (User.Contacts) {
      User.Contacts = {}
    }

    var object = {
      "@context": "https://www.w3.org/ns/activitystreams",
      "id": digest,
      "type": "Update",
      "object": {
        "id": key,
        "type": "Profile",
        "describes": User
      },
      "datetime": datetime,
      "actor": User.IRI
    };

    localStorage.setItem(key, JSON.stringify(object));
    console.log(datetime + ': User ' + User.IRI + ' saved.');
  });
}

function showStorage(node) {
  if(document.querySelector('#local-storage')) { return; }

  if (typeof window.localStorage != 'undefined') {
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
