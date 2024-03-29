const WebExtension = (typeof browser !== 'undefined') ? browser : chrome;

var C = {
  'tabIds': [],
  'WebID': null
};

function injectResources(tabId, files) {
  var getFileExtension = /(?:\.([^.]+))?$/;

  //helper function that returns appropriate chrome.tabs function to load resource
  var loadFunctionForExtension = (ext) => {
    switch(ext) {
      case 'js' : return WebExtension.tabs.executeScript;
      case 'css' : return WebExtension.tabs.insertCSS;
      default: throw new Error('Unsupported resource type')
    }
  };

  return Promise.all(files.map(resource => new Promise((resolve, reject) => {
    var ext = getFileExtension.exec(resource)[1];
    var loadFunction = loadFunctionForExtension(ext);

    // loadFunction(C.tabId, {file: resource}).then(() => {
    loadFunction(tabId, {file: resource}, () => {
      if (WebExtension.runtime.lastError) {
        reject(WebExtension.runtime.lastError);
      }
      else {
        resolve();
      }
    });
  })));
}

function dokieliInit(tab) {
// console.log(tab);

  injectResources(tab.id, ["media/css/dokieli.css"]).then(() => {
  }).catch(err => {
     // console.log('Error occurred: '+err);
  });
}

function showDocumentMenu(tab) {
  WebExtension.tabs.sendMessage(tab.id, {action: "dokieli.showDocumentMenu", webid: C.WebID}, function(r){
    if(C.tabIds.indexOf(tab.id) < 0) {
      C.tabIds.push(tab.id);
    }
  });
}

WebExtension.browserAction.onClicked.addListener(function(tab){
  WebExtension.tabs.sendMessage(tab.id, {action: "dokieli.status"},
    function(response) {
      if (response && !response.dokieli) {
        dokieliInit(tab);
      }
      showDocumentMenu(tab);
    });
});

WebExtension.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.property == "webid" && C.WebID) {
    sendResponse({ "webid": C.WebID });
  }
  else {
    sendResponse({});
  }

  return true;
});
