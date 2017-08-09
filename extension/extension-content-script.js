
(function () {

  var g_loaded = false;
  var cur_webid = null;

  //iteraction with YouID content script for get current WebId
  window.addEventListener("message", recvMessage, false);

  function recvMessage(event)
  {
    var ev_data;

    if (String(event.data).lastIndexOf("youid_rc:",0)!==0)
      return;

    try {
      ev_data = JSON.parse(event.data.substr(9));
    } catch(e) {}


    if (ev_data && ev_data.webid) {
      var iri = ev_data.webid;

      if (g_loaded && (cur_webid==null || cur_webid!=iri)) 
         DO.U.setUserWebId(iri);

      cur_webid = iri;
    }
  }




  Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
    var initialized = (DO!==undefined && DO.U!==undefined && g_loaded);
    try {
      if (request.action == "dokieli.status")
      {
        // request current WebId from YouID.extension content script
        window.postMessage('youid:{"getWebId": true}', "*");
        // send to Dokieli backgroud script
        sendResponse({"dokieli":initialized}); 
      }
      else if (request.action == "dokieli.menu")
      {
        var iri = null;


        if (!g_loaded) {

        document.head.insertAdjacentHTML('beforeend', "<style>@font-face{font-family:'FontAwesome' ;src:url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.eot?v=4.7.0') + "');src:url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') + "') format('embedded-opentype'),url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.woff2?v=4.7.0') + "') format('woff2'),url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.woff?v=4.7.0') + "') format('woff'),url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.ttf?v=4.7.0') + "') format('truetype'),url('" + Browser.api.extension.getURL('/media/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') + "') format('svg'); }</style>");

        document.body.setAttribute('about', '');
        document.body.setAttribute('prefix', "rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# owl: http://www.w3.org/2002/07/owl# xsd: http://www.w3.org/2001/XMLSchema# dcterms: http://purl.org/dc/terms/ dctypes: http://purl.org/dc/dcmitype/ foaf: http://xmlns.com/foaf/0.1/ v: http://www.w3.org/2006/vcard/ns# pimspace: http://www.w3.org/ns/pim/space# cc: http://creativecommons.org/ns# skos: http://www.w3.org/2004/02/skos/core# prov: http://www.w3.org/ns/prov# qb: http://purl.org/linked-data/cube# schema: http://schema.org/ rsa: http://www.w3.org/ns/auth/rsa# cert: http://www.w3.org/ns/auth/cert# cal: http://www.w3.org/2002/12/cal/ical# wgs: http://www.w3.org/2003/01/geo/wgs84_pos# org: http://www.w3.org/ns/org# biblio: http://purl.org/net/biblio# bibo: http://purl.org/ontology/bibo/ book: http://purl.org/NET/book/vocab# ov: http://open.vocab.org/terms/ sioc: http://rdfs.org/sioc/ns# doap: http://usefulinc.com/ns/doap# dbr: http://dbpedia.org/resource/ dbp: http://dbpedia.org/property/ sio: http://semanticscience.org/resource/ opmw: http://www.opmw.org/ontology/ deo: http://purl.org/spar/deo/ doco: http://purl.org/spar/doco/ cito: http://purl.org/spar/cito/ fabio: http://purl.org/spar/fabio/ oa: http://www.w3.org/ns/oa# as: http://www.w3.org/ns/activitystreams# ldp: http://www.w3.org/ns/ldp# solid: http://www.w3.org/ns/solid/terms# dio: https://w3id.org/dio#");
//orig        document.body.setAttribute('typeof', "schema:CreativeWork sioc:Post prov:Entity");
        document.body.setAttribute('typeof', "schema:CreativeWork sioc:Post prov:Entity schema:Article");

//--    document.body.innerHTML = '<main><article about="" typeof="schema:Article"><div id="content">' + document.body.innerHTML + '</div></article></main>';
//--        document.body.innerHTML = '<main><article about="" typeof="schema:Article" id="content">' + document.body.innerHTML + '</article></main>';

        document.body.innerHTML = '<main class="article" id="content" about="" typeof="schema:Article">' + document.body.innerHTML + '</main>';

          DO.U.initExtensionMode();
          g_loaded = true;
        }

        sendResponse({}); /* stop */

        if (cur_webid!==null)
          DO.U.setUserWebId(cur_webid);

        DO.U.showDocumentMenu();
      }
      else
      {
        sendResponse({}); /* stop */
      }
    } catch(e) {
      console.log("Dokieli: onMsg="+e);
    }

  });



})();
