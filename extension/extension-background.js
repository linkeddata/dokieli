
document.addEventListener('DOMContentLoaded', 

function()
{
  var opl_youid_id = null;
  var g_webid = null;

  function injectResources(tabId, files) {
    var getFileExtension = /(?:\.([^.]+))?$/;

    //helper function that returns appropriate Browser.api.tabs function to load resource
    var loadFunctionForExtension = (ext) => {
      switch(ext) {
          case 'js' : return Browser.api.tabs.executeScript;
          case 'css' : return Browser.api.tabs.insertCSS;
          default: throw new Error('Unsupported resource type')
      }
    };

    return Promise.all(tabId, files.map(resource => new Promise((resolve, reject) => {
        var ext = getFileExtension.exec(resource)[1];
        var loadFunction = loadFunctionForExtension(ext);

        loadFunction(tabId, {file: resource}, () => {
            if (Browser.api.runtime.lastError) {
                reject(Browser.api.runtime.lastError);
            } else {
                resolve();
            }
        });
    })));
  }



  function load_dokieli(tab) 
  {
    injectResources(tab.id, [ "media/css/do.css", "media/css/font-awesome.min.css", "media/css/editor.css"]).then(() => {
//     console.log('Injected sources');
    }).catch(err => {
       console.log('Error occurred: '+err);
    });
  }

  function show_Menu(tab)
  {
     Browser.api.tabs.sendMessage(tab.id, {action: "dokieli.menu", webid:g_webid}, 
       function(response) {
     });  
  }


  Browser.api.browserAction.onClicked.addListener(
     function(tab) 
     {
       if (Browser.isChromeWebExt){
         Browser.api.management.getAll(function(ext_info){
            for(var i =0; i < ext_info.length; i++) {
              if (ext_info[i].shortName==="opl_youid") {
                opl_youid_id = ext_info[i].id;
                break;
              }
            }

            Browser.api.runtime.sendMessage(opl_youid_id, {getWebId: true},
              function(response) {
                if (response)
                  g_webid = response.webid;

                Browser.api.tabs.sendMessage(tab.id, {action: "dokieli.status"}, 
                  function(response) {
                    if (response && !response.dokieli)
                      load_dokieli(tab);
                    show_Menu(tab);
                });  
              });

         });
       } else {
          Browser.api.tabs.sendMessage(tab.id, {action: "dokieli.status"}, 
            function(response) {
              if (response && !response.dokieli)
                load_dokieli(tab);
              show_Menu(tab);
          });  
       }

     }); 



  Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
    try {
      if (request.property == "webid" && g_webid)
      {
        sendResponse({"webid":g_webid}); 
      }
      else
      {
        sendResponse({}); /* stop */
      }
    } catch(e) {
      console.log("Dokieli: onMsg="+e);
    }

  });

});


