browser = (typeof browser !== 'undefined') ? browser : chrome;
var opl_youid_id = null;
var g_webid = null;

function injectResources(tabId, files) {
  var getFileExtension = /(?:\.([^.]+))?$/;

  //helper function that returns appropriate chrome.tabs function to load resource
  var loadFunctionForExtension = (ext) => {
    switch(ext) {
      case 'js' : return browser.tabs.executeScript;
      case 'css' : return browser.tabs.insertCSS;
      default: throw new Error('Unsupported resource type')
    }
  };

  return Promise.all(tabId, files.map(resource => new Promise((resolve, reject) => {
    var ext = getFileExtension.exec(resource)[1];
    var loadFunction = loadFunctionForExtension(ext);

    loadFunction(tabId, {file: resource}, () => {
      if (browser.runtime.lastError) {
        reject(browser.runtime.lastError);
      }
      else {
        resolve();
      }
    });

    browser.tabs.insertCSS({"code": "@font-face{font-family:'FontAwesome' ;src:url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.eot?v=4.7.0') + "');src:url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') + "') format('embedded-opentype'),url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.woff2?v=4.7.0') + "') format('woff2'),url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.woff?v=4.7.0') + "') format('woff'),url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.ttf?v=4.7.0') + "') format('truetype'),url('" + browser.extension.getURL('/media/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') + "') format('svg'); }"});
  })));
}

function load_dokieli(tab) {
  injectResources(tab.id, ["media/css/font-awesome.min.css", "media/css/do.css"]).then(() => {
  }).catch(err => {
     console.log('Error occurred: '+err);
  });
}

function show_Menu(tab) {
  browser.tabs.sendMessage(tab.id, {action: "dokieli.menu", webid:g_webid},
    function(response) {
  });
}

browser.browserAction.onClicked.addListener(function(tab){
  if(typeof browser.management.getAll !== 'undefined') {
    browser.management.getAll(function(ext_info){
      for(var i =0; i < ext_info.length; i++) {
        if (ext_info[i].shortName==="opl_youid") {
          opl_youid_id = ext_info[i].id;
          break;
        }
      }
    });
  }

  browser.runtime.sendMessage(opl_youid_id, {getWebId: true},
    function(response) {
    if (response) {
      g_webid = response.webid;
    }

    browser.tabs.sendMessage(tab.id, {action: "dokieli.status"},
      function(response) {
        if (response && !response.dokieli) {
          load_dokieli(tab);
        }
        show_Menu(tab);
      });
  });
});

browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
  try {
    if (request.property == "webid" && g_webid) {
      sendResponse({"webid":g_webid});
    }
    else {
      sendResponse({}); /* stop */
    }
  }
  catch(e) {
    console.log("Dokieli: onMsg="+e);
  }
});
