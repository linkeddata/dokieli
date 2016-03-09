/** dokieli templating
 *
 * Amy Guy http://rhiaro.co.uk#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://github.com/linkeddata/dokieli
**/

var SimpleRDF = ld.SimpleRDF;
var TPL = {
  
  getLastModified: function(){
    if(document.getElementById('template-modified') != null){
        return document.getElementById('template-modified').getAttribute('datetime');
    }else{
      return '';
    }
  },
  
  getLastBuilt: function(){
    if(document.getElementById('template-built') != null){
        return document.getElementById('template-built').getAttribute('datetime');
    }else{
      return '';
    }
  },
  
  setLastBuilt: function(time){
    if(!time){
      time = new Date();
      time = time.toUTCString();
    }
    if(document.getElementById('template-built') != null){
        document.getElementById('template-built').setAttribute('datetime', time);
        document.getElementById('template-built').textContent = time;
    }else{
        document.querySelector('main').insertAdjacentHTML('afterBegin', '<time datetime="' + time + '">' + time + '</time>');
    }
  },

  buildAll: function(){
      var build = function(result){
          return new Promise(function(resolve, reject){
              // Get template DOM
              var template = document.cloneNode(true);
              // Get article DOM
              var article = document.implementation.createHTMLDocument("article");
              article.documentElement.innerHTML = result.xhr.responseText;
              // replace template <main> with article <main>
              var title = article.querySelector('title');
              var main = article.querySelector('main');
              if(!main){
                  return reject({url: result.xhr.responseURL, error: 'Invalid article (needs a &lt;main&gt;)'});
              }
              template.querySelector('#do-template-script').remove();
              template.querySelector('main').innerHTML = main.innerHTML;
              if(title){
                  template.querySelector('title').textContent = title.textContent;
              }
              // Normalise
              var html = DO.U.getDocument(template);
              if(!html || html.length < 1){
                  return reject({url: result.xhr.responseURL, error: 'Something went wrong with generating new HTML'});
              }
              // return article
              return resolve({url: result.xhr.responseURL, html: html});
          });
      };
      var update_list = function(url, message, time){
          var li = document.querySelector('[href="' + url + '"]').parentNode;
          if(time){
              time = new Date();
              time = time.toUTCString();
              var timeEle = li.querySelector('time');
              if(!timeEle){
                  li.appendChild(document.createElement('time'));
              }
              li.querySelector('time').textContent = ' (' + time + ')';
              li.querySelector('time').setAttribute('datetime', time);
          }
          li.insertAdjacentHTML('beforeEnd', ' <strong class="do">' + message + '</strong>');
          console.log(time + ' ' + url + ' ' + message);
      };
    
      var pages = document.querySelectorAll('main ul a');
      if(pages.length > 0){
          var build_pages = function(){
              return new Promise(function(resolve, reject) {
                  for(var i = 0; i < pages.length; i++){
                      update_list(pages[i].href, "...building...");
                      if(pages[i].href.match(/^https:\/\//g)){
                          DO.U.getResource(pages[i].href).then(build).then(
                              function(response){
                                  // * PUT that back to content page URL
                                  DO.U.putResource(response.url, response.html).then(
                                      function(r){
                                          update_list(r.xhr.responseURL, "Built successfully", true);
                                          return resolve(r);
                                      },
                                      function(r){
                                          var error = "";
                                          switch(r.status){
                                              default:
                                                  error += "for unknown reasons ("+r.status+")";
                                                  break;
                                              case 405:
                                                  error += "not writeable";
                                                  break;
                                              case 404:
                                                  error += "not found";
                                                  break;
                                              case 401: case 403:
                                                  error += "not authorised to write";
                                                  break;
                                          }
                                          update_list(r.xhr.responseURL, "Failed ("+error+")");
                                      }
                                  );
                              },
                              function(reason){
                                  console.log(reason);
                                  var error = "";
                                  switch(reason.status){
                                      default:
                                          error += "for unknown reasons ("+r.status+")";
                                          break;
                                      case 405:
                                          error += "not retrievable";
                                          break;
                                      case 404:
                                          error += "not found";
                                          break;
                                      case 401: case 403:
                                          error += "not authorised to read";
                                          break;
                                  }
                                  update_list(reason.xhr.responseURL, "Failed ("+error+")");
                              }
                          );
                      }else{
                          // TODO: pass through a proxy maybe
                          update_list(pages[i].href, "Failed (can't get insecure content, please use https)");
                      }
                  }
              });
          }
          build_pages().then(
              function(r){
                  TPL.setLastBuilt();
                  window.setTimeout(function () {
                      DO.U.putResource(window.location.href, DO.U.getDocument()).then(
                          function(r){
                              console.log('saved template');
                              console.log(r);
                          },
                          function(r){
                              console.log('failed to save template');
                              console.log(r);
                          }
                      );
                  }, 500);
              },
              function(r){
                  console.log('build loop failed');
                  console.log(r);
              }
          );
      }else{
          console.log('No pages to build');
      }
  },
  
  showMenu: function(){
    var lastMod = TPL.getLastModified();
    var lastBuilt = TPL.getLastBuilt();
    var templatesMenu = document.getElementById('templating');
    templatesMenu.innerHTML = '<h2>Template</h2><section id="templating"><ul><li><button id="build-template"><i class="fa fa-desktop fa-2x"></i>Build Template</button></li></ul></section>';
    var doBuild = document.getElementById('build-template');
    var pages = document.querySelectorAll('main ul a');
    if(pages.length < 1){
        doBuild.disabled = "disabled";
    }
    doBuild.addEventListener("click", function(e){
      e.preventDefault();
      TPL.buildAll();
    }, false);
    
  }
  
}

document.addEventListener("DOMContentLoaded", function(event) {

  document.querySelector('main').style.backgroundColor = '#e0e0e0';
  document.querySelector('main').insertAdjacentHTML('afterBegin', '<p>This is a template. You can make changes to everything outside of the gray area (<code>main</code>), and when you click "build", each article which uses this template (those listed below) will be updated (if you have write access).');
  document.querySelector('#document-menu button').addEventListener('click', function(){
      TPL.showMenu();
  });

});