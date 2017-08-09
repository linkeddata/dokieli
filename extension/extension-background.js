
document.addEventListener('DOMContentLoaded', 

function()
{

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
     Browser.api.tabs.sendMessage(tab.id, {action: "dokieli.menu"}, 
       function(response) {
     });  
  }


  Browser.api.browserAction.onClicked.addListener(
     function(tab) 
     {
       Browser.api.tabs.sendMessage(tab.id, {action: "dokieli.status"}, 
         function(response) {
           if (response && !response.dokieli)
             load_dokieli(tab);
           show_Menu(tab);
       });  
     }); 

});


