(function () {

  WebExtension = (typeof browser !== 'undefined') ? browser : chrome;

  var C = {
    'tabIds': []
  };

  document.addEventListener('DOMContentLoaded', 

    function()
    {

      function injectResources(tabId, files) {
        var getFileExtension = /(?:\.([^.]+))?$/;

        //helper function that returns appropriate Browser.api.tabs function to load resource
        var loadFunctionForExtension = (ext) => {
          switch(ext) {
            case 'js' : return WebExtension.tabs.executeScript;
            case 'css' : return WebExtension.tabs.insertCSS;
            default: throw new Error('Unsupported resource type')
          }
        };

        return Promise.all(tabId, files.map(resource => new Promise((resolve, reject) => {
            var ext = getFileExtension.exec(resource)[1];
            var loadFunction = loadFunctionForExtension(ext);

            loadFunction(tabId, {file: resource}, () => {
                if (WebExtension.runtime.lastError) {
                    reject(WebExtension.runtime.lastError);
                } else {
                    resolve();
                }
            });
            
        })));
      }



      function dokieliInit(tab) 
      {
        injectResources(tab.id, [ "media/css/do.css", "media/css/font-awesome.min.css", "media/css/editor.css"]).then(() => {
        }).catch(err => {
           console.log('Error occurred: '+err);
        });

        WebExtension.tabs.insertCSS(tab.id, {"code": "@font-face{font-family:'FontAwesome' ;src:url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.eot?v=4.7.0') + "');src:url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') + "') format('embedded-opentype'),url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.woff2?v=4.7.0') + "') format('woff2'),url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.woff?v=4.7.0') + "') format('woff'),url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.ttf?v=4.7.0') + "') format('truetype'),url('" + WebExtension.extension.getURL('/media/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') + "') format('svg'); }"});
      }

      function showDocumentMenu(tab)
      {
        WebExtension.tabs.sendMessage(tab.id, {action: "dokieli.showDocumentMenu"}, function(r){
          if(C.tabIds.indexOf(tab.id) < 0) {
            C.tabIds.push(tab.id);
          }
        });
      }


      WebExtension.browserAction.onClicked.addListener(
         function(tab) 
         {
           WebExtension.tabs.sendMessage(tab.id, {action: "dokieli.status"}, 
             function(response) {
               if (response && !response.dokieli)
                 dokieliInit(tab);
               showDocumentMenu(tab);
           });  
         }); 

    });

})();

