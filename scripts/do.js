/** dokieli
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://dokie.li/
 * https://github.com/linkeddata/dokieli
 */

if(typeof DO === 'undefined'){
var SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined;
var DO = {
  C: {
    Lang: document.documentElement.lang,
    DocRefType: '',
    RefType: {
      LNCS: { InlineOpen: '[', InlineClose: ']' },
      ACM: { InlineOpen: '[', InlineClose: ']' }
    },
    Stylesheets: [],
    User: {
      IRI: null,
      Role: null
    },
    LocalDocument: false,
    UseStorage: false,
    AutoSaveId: '',
    AutoSaveTimer: 60000,
    DisableStorageButtons: '<button class="local-storage-disable-html" title="Disable local storage (temporary) in the browser"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
    EnableStorageButtons: '<button class="local-storage-enable-html" title="Enable local storage (temporary) in the browser"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
    CDATAStart: '//<![CDATA[',
    CDATAEnd: '//]]>',
    SortableList: false,
    EditorAvailable: ('MediumEditor' in window),
    EditorEnabled: false,
    Editor: {
      headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
      regexEmptyHTMLTags: /<[^\/>][^>]*><\/[^>]+>/gim,
      ButtonLabelType: ((window.chrome && chrome.runtime && chrome.runtime.id) ? 'fontawesome' : (document.querySelector('head link[rel~="stylesheet"][href*="font-awesome"]') ? (!navigator.onLine && document.querySelector('head link[rel~="stylesheet"][href*="font-awesome"][href^="http"]') ? '': 'fontawesome') : '' )),
      DisableReviewButton: '<button class="review-disable" title="Disable review"><i class="fa fa-balance-scale fa-2x"></i>Review</button>',
      EnableReviewButton: '<button class="review-enable" title="Enable review"><i class="fa fa-balance-scale fa-2x"></i>Review</button>',
      DisableEditorButton: '<button class="editor-disable" title="Disable editor"><i class="fa fa-i-cursor fa-2x"></i>Edit</button>',
      EnableEditorButton: '<button class="editor-enable" title="Enable editor"><i class="fa fa-i-cursor fa-2x"></i>Edit</button>'
    },
    DOMNormalisation: {
      'selfClosing': "area base basefont br col colgroup embed hr img input isindex link meta metadata param source wbr",
      'skipAttributes': "contenteditable spellcheck medium-editor-index data-medium-editor-element data-medium-editor-editor-index data-medium-focused data-placeholder role aria-multiline style",
      'sortAttributes': true,
      'skipNodeWithClass': 'do',
      'classWithChildText': {
        'class': '.do.ref',
        'element': 'mark'
      },
      'replaceClassItemWith': {
        'source': "on-document-menu medium-editor-element",
        'target': ''
      },
      'skipClassWithValue': ''
    },

    ContextLength: 32,
    InteractionPath: 'i/',
    ProxyURL: ((window.location.hostname == 'localhost' || !navigator.onLine) ? window.location.protocol + '//' + window.location.host + '/proxy?uri=' : 'https://dokie.li/proxy?uri='),
    AuthEndpoint: ((window.location.hostname == 'localhost' || !navigator.onLine) ? window.location.protocol + '//' + window.location.host + '/' : 'https://dokie.li/'),
    License: {
      "NoLicense": { 'name': 'No license', 'description': 'No license' },
      "https://creativecommons.org/publicdomain/zero/1.0/": {'name': 'CC0 1.0', 'description': 'Creative Commons Zero'},
      "https://creativecommons.org/licenses/by/4.0/": {'name': 'CC BY 4.0', 'description': 'Creative Commons Attribution'},
      "https://creativecommons.org/licenses/by-sa/4.0/": {'name': 'CC BY-SA 4.0', 'description': 'Creative Commons Attribution-ShareAlike'},
      "https://creativecommons.org/licenses/by-nc/4.0/": {'name': 'CC BY-NC 4.0', 'description': 'Creative Commons Attribution-NonCommercial'},
      "https://creativecommons.org/licenses/by-nd/4.0/": {'name': 'CC BY-ND 4.0', 'description': 'Creative Commons Attribution-NoDerivatives'},
      "https://creativecommons.org/licenses/by-nc-sa/4.0/": {'name': 'CC BY-NC-SA 4.0', 'description': 'Creative Commons Attribution-NonCommercial-ShareAlike'},
      "https://creativecommons.org/licenses/by-nc-nd/4.0/": {'name': 'CC BY-NC-ND 4.0', 'description': 'Creative Commons Attribution-NonCommercial-NoDerivates'}
    },
    Citation: {
      'http://purl.org/spar/cito/agreesWith': 'agrees with',
      'http://purl.org/spar/cito/cites': 'cites',
      'http://purl.org/spar/cito/citesAsAuthority': 'cites as authority',
      'http://purl.org/spar/cito/citesAsDataSource': 'cites as data source',
      'http://purl.org/spar/cito/citesAsEvidence': 'cites as evidence',
      'http://purl.org/spar/cito/citesAsMetadataDocument': 'cites as metadata document',
      'http://purl.org/spar/cito/citesAsPotentialSolution': 'cites as potential solution',
      'http://purl.org/spar/cito/citesAsRecommendedReading': 'cites as potential reading',
      'http://purl.org/spar/cito/citesAsRelated': 'cites as related',
      'http://purl.org/spar/cito/citesAsSourceDocument': 'cites as source document',
      'http://purl.org/spar/cito/citesForInformation': 'cites for information',
      'http://purl.org/spar/cito/compiles': 'compiles',
      'http://purl.org/spar/cito/confirms': 'confirms',
      'http://purl.org/spar/cito/containsAssertionFrom': 'contains assertion from',
      'http://purl.org/spar/cito/corrects': 'corrects',
      'http://purl.org/spar/cito/credits': 'credits',
      'http://purl.org/spar/cito/critiques': 'critiques',
      'http://purl.org/spar/cito/derides': 'derides',
      'http://purl.org/spar/cito/describes': 'describes',
      'http://purl.org/spar/cito/disagreesWith': 'disagrees with',
      'http://purl.org/spar/cito/discusses': 'discusses',
      'http://purl.org/spar/cito/disputes': 'disputes',
      'http://purl.org/spar/cito/documents': 'documents',
      'http://purl.org/spar/cito/extends': 'extends',
      'http://purl.org/spar/cito/includesExcerptFrom': 'includes excerpt from',
      'http://purl.org/spar/cito/includesQuotationFrom': 'includes quotation from',
      'http://purl.org/spar/cito/obtainsBackgroundFrom': 'obtains background from',
      'http://purl.org/spar/cito/obtainsSupportFrom': 'obtains support from',
      'http://purl.org/spar/cito/parodies': 'parodies',
      'http://purl.org/spar/cito/plagiarizes': 'plagiarizes',
      'http://purl.org/spar/cito/qualifies': 'qualifies',
      'http://purl.org/spar/cito/refutes': 'refutes',
      'http://purl.org/spar/cito/repliesTo': 'replies to',
      'http://purl.org/spar/cito/retracts': 'retracts',
      'http://purl.org/spar/cito/reviews': 'reviews',
      'http://purl.org/spar/cito/ridicules': 'ridicules',
      'http://purl.org/spar/cito/speculatesOn': 'speculates on',
      'http://purl.org/spar/cito/supports': 'supports',
      'http://purl.org/spar/cito/updates': 'updates',
      'http://purl.org/spar/cito/usesConclusionsFrom': 'uses conclusions from',
      'http://purl.org/spar/cito/usesDataFrom': 'uses data from',
      'http://purl.org/spar/cito/usesMethodIn': 'uses method in'
    },

    AvailableMediaTypes: ['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/xhtml+xml', 'text/html'],

    Prefixes: {
      'xsd': 'http://www.w3.org/2001/XMLSchema#',
      'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      'as': 'https://www.w3.org/ns/activitystreams#',
      'oa': 'http://www.w3.org/ns/oa#',
      'schema': 'http://schema.org/'
    },

    Vocab: {
      "rdftype": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", "@type": "@id", "@array": true },
      "rdffirst": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#first", "@type": "@id" },
      "rdfrest": { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest", "@type": "@id" },
      "rdfvalue": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
      "rdfslabel": { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
      "rdfsseeAlso": { "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlso", "@type": "@id", "@array": true },

      "owlsameAs": { "@id": "http://www.w3.org/2002/07/owl#sameAs", "@type": "@id", "@array": true },

      "foafname": "http://xmlns.com/foaf/0.1/name",
      "foaffamilyName": "http://xmlns.com/foaf/0.1/familyName",
      "foafgivenName": "http://xmlns.com/foaf/0.1/givenName",
      "foafhomepage": { "@id": "http://xmlns.com/foaf/0.1/homepage", "@type": "@id" },
      "foafimg": { "@id": "http://xmlns.com/foaf/0.1/img", "@type": "@id" },
      "foafdepiction": { "@id": "http://xmlns.com/foaf/0.1/depiction", "@type": "@id" },
      "foafnick": "http://xmlns.com/foaf/0.1/nick",
      "foafmaker": { "@id": "http://xmlns.com/foaf/0.1/maker", "@type": "@id" },
      "foafknows": { "@id": "http://xmlns.com/foaf/0.1/knows", "@type": "@id", "@array": true },

      "schemaname": "http://schema.org/name",
      "schemafamilyName": "http://schema.org/familyName",
      "schemagivenName": "http://schema.org/givenName",
      "schemaurl": { "@id": "http://schema.org/url", "@type": "@id" },
      "schemaimage": { "@id": "http://schema.org/image", "@type": "@id" },
      "schemacreator": { "@id": "http://schema.org/creator", "@type": "@id", "@array": true },
      "schemaauthor": { "@id": "http://schema.org/author", "@type": "@id", "@array": true },
      "schemacontributor": { "@id": "http://schema.org/contributor", "@type": "@id", "@array": true },
      "schemalicense": { "@id": "http://schema.org/license", "@type": "@id" },
      "schemacitation": { "@id": "http://schema.org/citation", "@type": "@id", "@array": true },
      "schemaknows": { "@id": "http://schema.org/knows", "@type": "@id", "@array": true },
      "schemadatePublished": "http://schema.org/datePublished",
      "schemadescription": "http://schema.org/description",

      "dctermstitle": "http://purl.org/dc/terms/title",
      "dctermsdescription": "http://purl.org/dc/terms/description",
      "dctermscreator": { "@id": "http://purl.org/dc/terms/creator", "@type": "@id", "@array": true },
      "dctermsdate": "http://purl.org/dc/terms/date",
      "dctermsissued": "http://purl.org/dc/terms/issued",
      "dctermscreated": "http://purl.org/dc/terms/created",
      "dctermsrights": { "@id": "http://purl.org/dc/terms/rights", "@type": "@id" },

      "skosprefLabel": { "@id": "http://www.w3.org/2004/02/skos/core#prefLabel", "@type": "@id", "@array": true },

      "refPeriod": "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod",
      "obsValue": "http://purl.org/linked-data/sdmx/2009/measure#obsValue",

      "biboauthorList": { "@id": "http://purl.org/ontology/bibo/authorList", "@type": "@id" },

      "storage": { "@id": "http://www.w3.org/ns/pim/space#storage", "@type": "@id", "@array": true },
      "preferencesFile": { "@id": "http://www.w3.org/ns/pim/space#preferencesFile", "@type": "@id" },
      "workspace": { "@id": "http://www.w3.org/ns/pim/space#workspace", "@type": "@id", "@array": true },
      "masterWorkspace": { "@id": "http://www.w3.org/ns/pim/space#masterWorkspace", "@type": "@id" },

      "ldpinbox": { "@id": "http://www.w3.org/ns/ldp#inbox", "@type": "@id", "@array": true },
      "solidinbox": { "@id": "http://www.w3.org/ns/solid/terms#inbox", "@type": "@id", "@array": true },

      "oaannotation": { "@id": "http://www.w3.org/ns/oa#Annotation", "@type": "@id" },
      "oahasBody": { "@id": "http://www.w3.org/ns/oa#hasBody", "@type": "@id" },
      "oahasTarget": { "@id": "http://www.w3.org/ns/oa#hasTarget", "@type": "@id" },
      "oahasSource": { "@id": "http://www.w3.org/ns/oa#hasSource", "@type": "@id" },
      "oahasSelector": { "@id": "http://www.w3.org/ns/oa#hasSelector", "@type": "@id" },
      "oaexact": "http://www.w3.org/ns/oa#exact",
      "oaprefix": "http://www.w3.org/ns/oa#prefix",
      "oasuffix": "http://www.w3.org/ns/oa#suffix",
      "oamotivatedBy": { "@id": "http://www.w3.org/ns/oa#motivatedBy", "@type": "@id" },
      "oaannotationService": { "@id": "http://www.w3.org/ns/oa#annotationService", "@type": "@id", "@array": true },

      "assubject": { "@id": "https://www.w3.org/ns/activitystreams#subject", "@type": "@id", "@array": true },
      "asobject": { "@id": "https://www.w3.org/ns/activitystreams#object", "@type": "@id", "@array": true },
      "astarget": { "@id": "https://www.w3.org/ns/activitystreams#target", "@type": "@id", "@array": true },
      "asrelationship": { "@id": "https://www.w3.org/ns/activitystreams#relationship", "@type": "@id", "@array": true },
      "ascontext": { "@id": "https://www.w3.org/ns/activitystreams#context", "@type": "@id", "@array": true },
      "asinReplyTo": { "@id": "https://www.w3.org/ns/activitystreams#inReplyTo", "@type": "@id", "@array": true },
      "asactor": { "@id": "https://www.w3.org/ns/activitystreams#actor", "@type": "@id" },
      "asupdated": "https://www.w3.org/ns/activitystreams#updated",
      "aspublished": "https://www.w3.org/ns/activitystreams#published",
      "ascontent": "https://www.w3.org/ns/activitystreams#content",
      "asname": "https://www.w3.org/ns/activitystreams#name",
      "asimage": { "@id": "https://www.w3.org/ns/activitystreams#image", "@type": "@id" },

      "siocreplyof": { "@id": "http://rdfs.org/sioc/ns#reply_of", "@type": "@id", "@array": true },

      "ldpcontains": { "@id": "http://www.w3.org/ns/ldp#contains", "@type": "@id", "@array": true },
      "ldpresource": { "@id": "http://www.w3.org/ns/ldp#Resource", "@type": "@id", "@array": true  },
      "ldpcontainer": { "@id": "http://www.w3.org/ns/ldp#Container", "@type": "@id", "@array": true  }
    },

    SecretAgentNames: ['Abraham Lincoln', 'Admiral Awesome', 'Anonymous Coward', 'Creative Monkey', 'Dog from the Web', 'ekruB', 'Elegant Banana', 'Foo Bar', 'LBmiT', 'Lunatic Scholar', 'Middle-class Artist', 'nahuLcM', 'nosleN', 'Okie Dokie', 'Samurai Cat', 'Vegan Superstar'],

    RefAreas: {"AF":"Afghanistan","A9":"Africa","AL":"Albania","DZ":"Algeria","AS":"American Samoa","L5":"Andean Region","AD":"Andorra","AO":"Angola","AG":"Antigua and Barbuda","1A":"Arab World","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas, The","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BR":"Brazil","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","CV":"Cabo Verde","KH":"Cambodia","CM":"Cameroon","CA":"Canada","S3":"Caribbean small states","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","JG":"Channel Islands","CL":"Chile","CN":"China","CO":"Colombia","KM":"Comoros","CD":"Congo, Dem. Rep.","CG":"Congo, Rep.","CR":"Costa Rica","CI":"Cote d'Ivoire","HR":"Croatia","CU":"Cuba","CW":"Curacao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","Z4":"East Asia & Pacific (all income levels)","4E":"East Asia & Pacific (developing only)","C4":"East Asia and the Pacific (IFC classification)","EC":"Ecuador","EG":"Egypt, Arab Rep.","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","XC":"Euro area","Z7":"Europe & Central Asia (all income levels)","7E":"Europe & Central Asia (developing only)","C5":"Europe and Central Asia (IFC classification)","EU":"European Union","FO":"Faeroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","PF":"French Polynesia","GA":"Gabon","GM":"Gambia, The","GE":"Georgia","DE":"Germany","GH":"Ghana","GR":"Greece","GL":"Greenland","GD":"Grenada","GU":"Guam","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","XE":"Heavily indebted poor countries (HIPC)","XD":"High income","XS":"High income: OECD","XR":"High income: nonOECD","HN":"Honduras","HK":"Hong Kong SAR, China","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Rep.","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Dem. Rep.","KR":"Korea, Rep.","KV":"Kosovo","KW":"Kuwait","KG":"Kyrgyz Republic","LA":"Lao PDR","ZJ":"Latin America & Caribbean (all income levels)","XJ":"Latin America & Caribbean (developing only)","L4":"Latin America and the Caribbean","C6":"Latin America and the Caribbean (IFC classification)","LV":"Latvia","XL":"Least developed countries: UN classification","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","XO":"Low & middle income","XM":"Low income","XN":"Lower middle income","LU":"Luxembourg","MO":"Macao SAR, China","MK":"Macedonia, FYR","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MR":"Mauritania","MU":"Mauritius","MX":"Mexico","L6":"Mexico and Central America","FM":"Micronesia, Fed. Sts.","ZQ":"Middle East & North Africa (all income levels)","XQ":"Middle East & North Africa (developing only)","C7":"Middle East and North Africa (IFC classification)","XP":"Middle income","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","M2":"North Africa","XU":"North America","MP":"Northern Mariana Islands","NO":"Norway","XY":"Not classified","OE":"OECD members","OM":"Oman","S4":"Other small states","S2":"Pacific island small states","PK":"Pakistan","PW":"Palau","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten (Dutch part)","SK":"Slovak Republic","SI":"Slovenia","S1":"Small states","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","8S":"South Asia","C8":"South Asia (IFC classification)","SS":"South Sudan","L7":"Southern Cone Extended","ES":"Spain","LK":"Sri Lanka","KN":"St. Kitts and Nevis","LC":"St. Lucia","MF":"St. Martin (French part)","VC":"St. Vincent and the Grenadines","C9":"Sub-Saharan Africa (IFC classification)","ZG":"Sub-Saharan Africa (all income levels)","ZF":"Sub-Saharan Africa (developing only)","A4":"Sub-Saharan Africa excluding South Africa","A5":"Sub-Saharan Africa excluding South Africa and Nigeria","SD":"Sudan","SR":"Suriname","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","XT":"Upper middle income","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela, RB","VN":"Vietnam","VI":"Virgin Islands (U.S.)","PS":"West Bank and Gaza","1W":"World","YE":"Yemen, Rep.","ZM":"Zambia","ZW":"Zimbabwe"}
  },

  U: {
    //Tries to authenticate with given URI. If authenticated, returns the 'User' header value.
    authenticateUser: function(url) {
      url = url || window.location.origin + window.location.pathname;
      var reasons = [];
      var response = '';

      return new Promise(function(resolve, reject) {
        var response = new Promise(function(resolve, reject) {
          if (url.slice(0, 5).toLowerCase() == 'https') {
            DO.U.getResourceHeadUser(url).then(
              function(i) {
                resolve(i);
              },
              function(reason) {
                DO.U.authenticateUserFallback(url, '', reasons).then(
                  function(i) {
                    resolve(i);
                  },
                  function(reason) {
                    reject(reasons);
                  }
                );
              }
            );
          }
          else {
            if(url.slice(0, 5).toLowerCase() == 'http:') {
              //TODO: First try document's proxy?
              DO.U.authenticateUserFallback(url, '', reasons).then(
                function(i) {
                  resolve(i);
                },
                function(reason) {
                  reject(reasons);
                }
              );
            }
          }
        });

        response.then(
          function(userIRI) {
            if (userIRI == url) {
              return resolve(userIRI);
            }
            else {
              console.log("--- WebID input (" + url +") did not match the one in the certificate (" + userIRI +").");
              var reason = {"message": "WebID input did not match the one in the certificate."};
              reasons.push(reason);
              return reject(reasons);
            }
          },
          function(reason) {
            return reject(reasons);
          }
        );
      });
    },

    authenticateUserFallback: function(url, proxyURL, reasons) {
// console.log("Try to authenticating through WebID's storage, if not found, try through a known authentication endpoint");
      url = url || window.location.origin + window.location.pathname;
      var pIRI = DO.U.getProxyableIRI(url, proxyURL);

      return DO.U.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
// console.log(s.storage);
            if (s.storage && s.storage._array.length > 0) {
// console.log("Try through WebID's storage: " + s.storage.at(0));
              return DO.U.getResourceHeadUser(s.storage.at(0));
            }
            else {
              console.log("---1 WebID's storage NOT FOUND");
              var reason = {"message": "WebID's storage was not found"};
              reasons.push(reason);
              return Promise.reject(reason);
            }
          },
          function(reason) {
            //XXX: Is this even hit?
            console.log("---2 WebID's storage NOT FOUND");
            reason["message"] = "WebID's storage was not found";
            reasons.push(reason);
            return Promise.reject(reason);
          }
        )
        .then(
          function(i) {
            return i;
          },
          function(reason) {
// console.log('Try through known authentication endpoint');
            DO.U.getResourceHeadUser(DO.C.AuthEndpoint).then(
              function(i) {
                return i;
              },
              function(reason) {
                console.log("--- Known authentication endpoint didn't work");
                reason["message"] = "Known authentication endpoint didn't work";
                reasons.push(reason);
                return Promise.reject(reasons);
              }
            );
          }
        );
    },

    getResourceHeadUser: function(url, options) {
      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200) {
              var user = this.getResponseHeader('User');
              if (user && user.length > 0 && user.slice(0, 4) == 'http') {
// console.log('User: ' + user);
                return resolve(user);
              }
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send();
      });
    },

    getResourceLabel: function(s) {
      return s.dctermstitle || s['http://purl.org/dc/elements/1.1/title'] || DO.U.getAgentName(s) || undefined;
    },

    getAgentName: function(s) {
      var name = s.foafname || s.schemaname || s.asname || s.rdfslabel || undefined;
      if (typeof name === 'undefined') {
        if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
          name = s.schemagivenName + ' ' + s.schemafamilyName;
        }
        else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
          name = s.foafgivenName + ' ' + s.foaffamilyName;
        }
        else if(s.foafnick && s.foafnick.length > 0){
          name = s.foafnick;
        }
      }
      return name;
    },

    getAgentImage: function(s) {
      return s.foafimg || s.schemaimage || s.asimage || s.foafdepiction || undefined;
    },

    setUserInfo: function(userIRI) {
// console.log("setUserInfo: " + userIRI);
      if (userIRI) {
        return DO.U.getResourceGraph(userIRI).then(
          function(g){
            var s = g.child(userIRI);
// console.log(s);
            DO.C.User.Graph = s;
            DO.C.User.IRI = userIRI;
            DO.C.User.Name = DO.U.getAgentName(s);
            DO.C.User.Image = DO.U.getAgentImage(s);
            DO.C.User.URL = s.foafhomepage || s["http://xmlns.com/foaf/0.1/weblog"] || s.schemaurl || undefined;
            DO.C.User.Knows = (s.foafknows && s.foafknows._array.length > 0) ? DO.U.uniqueArray(s.foafknows._array) : [];
            DO.C.User.Knows = (s.schemaknows && s.schemaknows._array.length > 0) ? DO.U.uniqueArray(DO.C.User.Knows.concat(s.schemaknows._array)) : DO.C.User.Knows;

            DO.C.User.TempKnows = [];
            DO.C.User.SameAs = [];
            DO.C.User.Contacts = [];

            if (s.storage) {
              DO.C.User.Storage = s.storage._array;
            }

            if (s.preferencesFile && s.preferencesFile.length > 0) {
              DO.C.User.PreferencesFile = s.preferencesFile;

              //TODO: Reconsider if/where to use this.
              // DO.U.setUserWorkspaces(DO.C.User.PreferencesFile);
            }
            return DO.C.User;
          },
          function(reason) { return reason; }
        );
      }
      else {
        console.log('No user IRI');
        return Promise.reject();
      }
    },

    setUserWorkspaces: function(userPreferenceFile){
      //XXX: Probably https so don't bother with proxy?
      DO.U.getGraph(userPreferenceFile).then(
        function(pf) {
          DO.C.User.PreferencesFileGraph = pf;
          var s = pf.child(DO.C.User.IRI);

          if (s.masterWorkspace) {
            DO.C.User.masterWorkspace = s.masterWorkspace;
          }

          if (s.workspace) {
            DO.C.User.Workspace = { List: s.workspace };
            s.workspace.forEach(function(wsGraph) {
              var workspace = wsGraph;
              var wstype = pf.child(workspace).rdftype || [];
              wstype.forEach(function(wGraph) {
                var w = wGraph;
                switch(w) {
                  case 'http://www.w3.org/ns/pim/space#PreferencesWorkspace':
                    DO.C.User.Workspace.Preferences = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#MasterWorkspace':
                    DO.C.User.Workspace.Master = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#PublicWorkspace':
                    DO.C.User.Workspace.Public = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#PrivateWorkspace':
                    DO.C.User.Workspace.Private = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#SharedWorkspace':
                    DO.C.User.Workspace.Shared = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#ApplicationWorkspace':
                    DO.C.User.Workspace.Application = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#Workspace':
                    DO.C.User.Workspace.Work = workspace;
                    break;
                  case 'http://www.w3.org/ns/pim/space#FamilyWorkspace':
                    DO.C.User.Workspace.Family = workspace;
                    break;
                }
              });
            });
          }
        }
      );
    },

    getUserHTML: function() {
      var userName = 'Anonymous';
      if (DO.C.User.Name) {
        //XXX: We have the IRI already
        userName = '<span about="' + DO.C.User.IRI + '" property="schema:name">' + DO.C.User.Name + '</span>';
      }

      var userImage = '';
      if ('Image' in DO.C.User && typeof DO.C.User.Image !== 'undefined' && DO.C.User.Image.length > 0) {
        userImage = '<img alt="" height="48" rel="schema:image" src="' + DO.C.User.Image + '" width="48" />';
      }

      var user = ''
      if ('IRI' in DO.C.User && DO.C.User.IRI !== null && DO.C.User.IRI.length > 0) {
        user = '<span about="' + DO.C.User.IRI + '" typeof="schema:Person">' + userImage + ' <a rel="schema:url" href="' + DO.C.User.IRI + '"> ' + userName + '</a></span>';
      }
      else {
        user = '<span typeof="schema:Person">' + userName + '</span>';
      }

      return user;
    },

    setLocalDocument: function() {
      if (document.location.protocol == 'file:') {
        DO.C.LocalDocument = true;
      }
    },

    //https://github.com/solid/solid.js/blob/master/lib/util/web-util.js
    parseLinkHeader: function(link) {
      if (!link) {
        return {}
      }
      var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
      var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;
      var matches = link.match(linkexp);
      var rels = {};
      for (var i = 0; i < matches.length; i++) {
        var split = matches[i].split('>');
        var href = split[0].substring(1);
        var ps = split[1];
        var s = ps.match(paramexp);
        for (var j = 0; j < s.length; j++) {
          var p = s[j];
          var paramsplit = p.split('=');
          var name = paramsplit[0];
          var rel = paramsplit[1].replace(/["']/g, '');
          if (!rels[rel]) {
            rels[rel] = []
          }
          rels[rel].push(href)
          if (rels[rel].length > 1) {
            rels[rel].sort()
          }
        }
      }
      return rels;
    },

    getEndpoint: function(property, url) {
      if (url) {
        return DO.U.getEndpointFromHead(property, url).then(
          function(i){
            return i;
          },
          function(x){
            return DO.U.getEndpointFromRDF(property, url);
          }
        );
      }
      else {
        var uri = location.href.split(location.search||location.hash||/[?#]/)[0];
        var options = {
          'contentType': 'text/html',
          'subjectURI': uri
        }
        return DO.U.getGraphFromData(DO.U.getDocument(), options)
          .then(
            function(i){
              //TODO: Should this get all of the inboxes or a given subject's?
              var endpoints = i.match(uri, property).toArray();

              //TODO: Remove solidinbox (when LDN goes through).
              if (endpoints.length == 0 && property == DO.C.Vocab['ldpinbox']) {
                endpoints = i.match(uri, DO.C.Vocab['solidinbox']['@id']).toArray();
              }

              if (endpoints.length > 0) {
                return endpoints.map(function(t){ return t.object.nominalValue; });
              }

              console.log(property + ' endpoint was not found in message body');
              return DO.U.getEndpointFromHead(property, uri);
            },
            function(reason){
              return DO.U.getEndpointFromHead(property, uri);
            }
          );
      }
    },

    getEndpointFromHead: function(property, url) {
      var pIRI = DO.U.getProxyableIRI(url);

      return DO.U.getResourceHead(pIRI, {'header': 'Link'}).then(
        function(i){
          var linkHeaders = DO.U.parseLinkHeader(i.headers);

          if (property in linkHeaders) {
            return linkHeaders[property];
          }
          else if (property == 'http://www.w3.org/ns/ldp#inbox' && 'http://www.w3.org/ns/solid/terms#inbox' in linkHeaders) {
            return linkHeaders['http://www.w3.org/ns/solid/terms#inbox'];
          }
          return Promise.reject({'message': property + " endpoint was not found in 'Link' header"});
        },
        function(reason){
          return Promise.reject({'message': "'Link' header not found"});
        }
      );
    },

    getEndpointFromRDF: function(property, url, subjectIRI) {
      url = url || window.location.origin + window.location.pathname;
      subjectIRI = subjectIRI || url;

      return DO.U.getResourceGraph(subjectIRI)
        .then(
          function(i) {
            var s = i.child(subjectIRI);

            switch(property) {
              case DO.C.Vocab['ldpinbox']['@id']:
              case DO.C.Vocab['solidinbox']['@id']:
                if (s.ldpinbox._array.length > 0){
// console.log(s.ldpinbox._array);
                  return [s.ldpinbox.at(0)];
                }
                else if (s.solidinbox._array.length > 0){
// console.log(s.solidinbox._array);
                  return [s.solidinbox.at(0)];
                }
                break;
              case DO.C.Vocab['oaannotationService']['@id']:
                if (s.oaannotationService._array.length > 0){
// console.log(s.oaannotationService._array);
                  return [s.oaannotationService.at(0)];
                }
                break;
            }

            var reason = {"message": property + " endpoint was not found in message body"};
            return Promise.reject(reason);
          },
          function(reason) {
            console.log(reason);
            return reason;
          }
        );
    },

    getNotifications: function(url) {
      url = url || window.location.origin + window.location.pathname;
      var notifications = [];
      var pIRI = DO.U.getProxyableIRI(url);

      return DO.U.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
            s.ldpcontains.forEach(function(resource) {
// console.log(resource);
              var types = s.child(resource).rdftype;
// console.log(types);
              if(types.indexOf(DO.C.Vocab.ldpcontainer["@id"]) < 0) {
                notifications.push(resource);
              }
            });
// console.log(notifications);
            if (notifications.length > 0) {
              return notifications;
            }
            else {
              var reason = {"message": "There are no notifications."};
              return Promise.reject(reason);
            }
          },
          function(reason) {
            console.log(reason);
            return reason;
          }
        );
    },

    showInboxNotifications: function() {
      if (typeof SimpleRDF !== 'undefined') {
        DO.U.getEndpoint(DO.C.Vocab['ldpinbox']['@id']).then(
          function(i) {
            i.forEach(function(inbox) {
              DO.U.showNotificationSources(inbox);
            });
          },
          function(reason) {
            console.log(reason);
          }
        );
      }
    },

    showNotificationSources: function(url) {
      DO.U.getNotifications(url).then(
        function(i) {
          i.forEach(function(notification) {
            var pIRI = DO.U.getProxyableIRI(notification);
            DO.U.getGraph(pIRI).then(
              function(g) {
// console.log(g);
                var subjects = [];
                g.graph().toArray().forEach(function(t){
                  subjects.push(t.subject.nominalValue);
                });
                subjects = DO.U.uniqueArray(subjects);
// console.log(subjects);
                subjects.forEach(function(i){
                  var s = g.child(i)
                  var types = s.rdftype._array || [];

                  var currentPathURL = window.location.origin + window.location.pathname;

                  if (types.length > 0) {
                    var resourceTypes = types;
                    if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Like') > -1 ||
                       resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Dislike') > -1){
                      if(s.asobject && s.asobject.at(0)) {
                        if(s.ascontext && s.ascontext.at(0) && DO.U.getPathURL(s.asobject.at(0)) == currentPathURL) {
                          var context = s.ascontext.at(0);
                          return DO.U.positionInteraction(context).then(
                            function(notificationIRI){
                              return notificationIRI;
                            },
                            function(reason){
                              console.log('Notification source is unreachable');
                            });
                        }
                        else {
                          var targetIRI = s.asobject.at(0);
                          var motivatedBy = 'oa:assessing';
                          var id = String(Math.abs(DO.U.hashCode(notification)));
                          var refId = 'r-' + id;
                          var refLabel = id;

                          var bodyText = (resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Like') > -1) ? 'Liked' : 'Disliked';

                          var noteData = {
                            "type": 'article',
                            "mode": "read",
                            "motivatedByIRI": motivatedBy,
                            "id": id,
                            "refId": refId,
                            "refLabel": refLabel,
                            "iri": notification,
                            "creator": {},
                            "target": {
                              "iri": targetIRI
                            },
                            "body": bodyText,
                            "license": {}
                          };

                          if (s.asactor && s.asactor){
                            noteData['creator'] = {
                              'iri': s.asactor
                            }
                            var a = g.child(noteData['creator']['iri']);
                            var actorName = DO.U.getAgentName(a);
                            var actorImage = DO.U.getAgentImage(a);

                            if(typeof actorName != 'undefined') {
                              noteData['creator']['name'] = actorName;
                            }
                            if(typeof actorImage != 'undefined') {
                              noteData['creator']['image'] = actorImage;
                            }
                          }
                          else if(type == 'https://www.w3.org/ns/activitystreams#Dislike'){
                            noteData['creator'] = {
                              'name': 'Anonymous Coward'
                            }
                          }
                          if (s.asupdated){
                            noteData['datetime'] = s.asupdated;
                          }
                          if (s.schemalicense){
                            noteData.license["iri"] = s.schemalicense;
                            noteData.license["name"] = DO.C.License[noteData.license["iri"]].name;
                          }

                          DO.U.addInteraction(noteData);
                        }
                      }
                    }
                    else if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Relationship') > -1){
                      if(s.assubject && s.assubject.at(0) && s.asrelationship && s.asrelationship.at(0) && s.asobject && s.asobject.at(0) && DO.U.getPathURL(s.asobject.at(0)) == currentPathURL) {
                        var subject = s.assubject.at(0);
                        return DO.U.positionInteraction(subject).then(
                          function(notificationIRI){
                            return notificationIRI;
                          },
                          function(reason){
                            console.log('Notification source is unreachable');
                          });
                      }
                    }
                    else if(resourceTypes.indexOf('https://www.w3.org/ns/activitystreams#Announce') > -1) {
                      if(s.asobject && s.asobject.at(0) && s.astarget && s.astarget.at(0) && DO.U.getPathURL(s.astarget.at(0)) == currentPathURL) {
                        var object = s.asobject.at(0);

                        return DO.U.positionInteraction(object).then(
                          function(notificationIRI){
                            return notificationIRI;
                          },
                          function(reason){
                            console.log('Notification ' + notification + ' is unreachable');
                          });
                      }
                    }
                    else {
                      console.log(i + ' has unrecognised types: ' + resourceTypes);
                      // return Promise.reject({'message': 'Unrecognised types ' + resourceTypes});
                    }
                  }
                  else {
                    // console.log('Skipping ' + i + ': No type.');
                    // return Promise.reject({'message': 'Notification has no type. What to do?'});
                  }
                });
              },
              function(reason) {
                console.log('Notification ' + notification + ' is unreachable. ' + reason);
                return reason;
              }
            );
          });
        },
        function(reason) {
          console.log('No notifications');
          return reason;
        }
      );
    },

    getAbsoluteIRI: function(base, location){
      var iri = location;

      if(location.toLowerCase().slice(0,4) != 'http') {
        if(location.startsWith('/')){
          var x = base.toLowerCase().trim().split('/');

          iri = x[0]+'//'+x[2]+location;
        }
        else if(!base.endsWith('/')){
          iri = base.substr(0, base.lastIndexOf('/') + 1) + location;
        }
        else {
          iri = base + location;
        }
      }

      return iri;
    },

    getProxyableIRI: function(url, proxyURL) {
      var pIRI = DO.U.stripFragmentFromString(url);

      if (typeof document !== 'undefined' && document.location.protocol == 'https:' && pIRI.slice(0, 5).toLowerCase() == 'http:') {
        proxyURL = proxyURL || DO.C.ProxyURL;
        pIRI = proxyURL + DO.U.encodeString(pIRI);
      }
      return pIRI;
    },

    getResourceOptions: function(url, options) {
      url = url || window.location.origin + window.location.pathname;
      options = options || {};
      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('OPTIONS', url);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200 || this.status === 204) {
              if('header' in options) {
                if(this.getResponseHeader(options.header)) {
                  return resolve({'headers': this.getResponseHeader(options.header)});
                }
                else {
                  return reject({'message': "'" + options.header + "' header not found"});
                }
              }
              return resolve({'headers': this.getAllResponseHeaders()});
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.onerror = function () {
          return reject({status: this.status, xhr: this});
        }
        http.send();
      });
    },

    getResourceHead: function(url, options) {
      url = url || window.location.origin + window.location.pathname;
      options = options || {};
      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if('header' in options) {
              if(this.getResponseHeader(options.header)) {
                return resolve({'headers': this.getResponseHeader(options.header)});
              }
              else {
                return reject({'message': "'" + options.header + "' header not found"});
              }
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send();
      });
    },

    getResource: function(url, headers, options) {
      url = url || window.location.origin + window.location.pathname;
      headers = headers || {};
      if(typeof headers['Accept'] == 'undefined') {
        headers['Accept'] = 'text/turtle';
      }

      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('GET', url);
        Object.keys(headers).forEach(function(key) {
          http.setRequestHeader(key, headers[key]);
        });
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200) {
              return resolve({xhr: this});
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send();
      });
    },

    putResource: function(url, data, contentType, links, options) {
      if (url && url.length > 0) {
        contentType = contentType || 'text/html; charset=utf-8';
        var ldpResource = '<http://www.w3.org/ns/ldp#Resource>; rel="type"';
        links = (links) ? ldpResource + ', ' + links : ldpResource;
        options = options || {};

        return new Promise(function(resolve, reject) {
          var http = new XMLHttpRequest();
          http.open('PUT', url);
          http.setRequestHeader('Content-Type', contentType);
          http.setRequestHeader('Link', links);
          if (!options.noCredentials) {
            http.withCredentials = true;
          }
          http.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
              if (this.status === 200 || this.status === 201 || this.status === 204) {
                return resolve({xhr: this});
              }
              return reject({status: this.status, xhr: this});
            }
          };
          http.send(data);
        });
      }
      else {
        return Promise.reject({'message': 'url parameter not valid'});
      }
    },

    postResource: function(url, slug, data, contentType, links, options) {
      if (url && url.length > 0) {
        contentType = contentType || 'text/html; charset=utf-8';
        var ldpResource = '<http://www.w3.org/ns/ldp#Resource>; rel="type"';
        links = (links) ? ldpResource + ', ' + links : ldpResource;
        options = options || {};

        return new Promise(function(resolve, reject) {
          var http = new XMLHttpRequest();
          http.open('POST', url);
          http.setRequestHeader('Content-Type', contentType);
          http.setRequestHeader('Link', links);
          if (slug && slug.length > 0) {
            http.setRequestHeader('Slug', slug);
          }
          if (!options.noCredentials) {
            http.withCredentials = true;
          }
          http.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
              if (this.status === 200 || this.status === 201 || this.status === 204) {
                return resolve({xhr: this});
              }
              return reject({status: this.status, xhr: this});
            }
          };
          http.send(data);
        });
      }
      else {
        return Promise.reject({'message': 'url parameter not valid'});
      }
    },

    patchResource: function(url, deleteBGP, insertBGP, options) {
      //insertBGP and deleteBGP are basic graph patterns.
      if (deleteBGP) {
        deleteBGP = 'DELETE DATA { ' + deleteBGP + ' };';
      }

      if (insertBGP) {
        insertBGP = 'INSERT DATA { ' + insertBGP + ' };';
      }

      data = deleteBGP + insertBGP;

      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('PATCH', url);
        http.setRequestHeader('Content-Type', 'application/sparql-update; charset=utf-8');
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200 || this.status === 201 || this.status === 204) {
              return resolve({xhr: this});
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send(data);
      });
    },

    deleteResource: function(url, options) {
      return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open('DELETE', url);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200 || this.status === 202 || this.status === 204) {
              return resolve(true);
            }
            return reject({status: this.status, xhr: this});
          }
        };
        http.send();
      });
    },

    putResourceACL: function(accessToURL, aclURL, acl) {
      acl = acl || {
        'u': { 'iri': [DO.C.User.IRI], 'mode': ['acl:Control', 'acl:Read', 'acl:Write'] },
        'g': { 'iri': ['http://xmlns.com/foaf/0.1/Agent'], 'mode': ['acl:Read'] },
        'o': { 'iri': [], 'mode': [] }
      };

      var agent, agentClass, mode;
      if('u' in acl && 'iri' in acl.u && 'mode' in acl.u) {
        agent = '<' + acl.u.iri.join('> , <') + '>';
        mode = acl.u.mode.join(' , ');
      }
      else {
        agent = '<' + DO.C.User.IRI + '>';
        mode = 'acl:Control , acl:Read , acl:Write';
      }

      var authorizations = [];

      authorizations.push('[ a acl:Authorization ; acl:accessTo <' + accessToURL + '> ; acl:accessTo <' + aclURL + '> ; acl:mode ' + mode + ' ; acl:agent ' + agent + ' ] .');

      if('g' in acl && 'iri' in acl.g && acl.g.iri.length >= 0) {
        agentClass = '<' + acl.g.iri.join('> , <') + '>';
        mode = acl.g.mode.join(' , ');
        authorizations.push('[ a acl:Authorization ; acl:accessTo <' + accessToURL + '> ; acl:mode ' + mode + ' ; acl:agentClass ' + agentClass + ' ] .');
      }

      var data = '@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n\
'+ authorizations.join('\n') + '\n\
';
      return DO.U.putResource(aclURL, data, 'text/turtle; charset=utf-8');
    },

    notifyInbox: function(o) {
      var slug, inbox;
      if ('slug' in o) {
        slug = o.slug;
      }
      if ('inbox' in o) {
        inbox = o.inbox;
      }

      var types = '<dt>Types</dt>';
      o.type.forEach(function(t){
        types += '<dd><a about="" href="' + DO.C.Prefixes[t.split(':')[0]] + t.split(':')[1] + '" typeof="'+ t +'">' + t.split(':')[1] + '</a></dd>';
      });

      var asobject = ('object' in o) ? '<dt>Object</dt><dd><a href="' + o.object + '" property="as:object">' + o.object + '</a></dd>' : '';

      var asinReplyTo = ('inReplyTo' in o) ? '<dt>In reply to</dt><dd><a href="' + o.inReplyTo + '" property="as:inReplyTo">' + o.inReplyTo + '</a></dd>' : '';

      var ascontext = ('context' in o && o.context.length > 0) ? '<dt>Context</dt><dd><a href="' + o.context + '" property="as:context">' + o.context + '</a></dd>' : '';

      var astarget = ('target' in o && o.target.length > 0) ? '<dt>Target</dt><dd><a href="' + o.target + '" property="as:target">' + o.target + '</a></dd>' : '';

      var datetime = DO.U.getDateTimeISO();
      var asupdated = '<dt>Updated</dt><dd><time datetime="' + datetime + '" datatype="xsd:dateTime" property="as:updated" content="' + datetime + '">' + datetime.substr(0,19).replace('T', ' ') + '</time></dd>';

      var assummary = ('summary' in o && o.summary.length > 0) ? '<dt>Summary</dt><dd property="as:summary" datatype="rdf:HTML">' + o.summary + '</dd>' : '';

      var ascontent = ('content' in o && o.content.length > 0) ? '<dt>Content</dt><dd property="as:content" datatype="rdf:HTML">' + o.content + '</dd>' : '';

      var asactor = (DO.C.User.IRI) ? '<dt>Actor</dt><dd><a href="' + DO.C.User.IRI + '" property="as:actor">' + DO.C.User.IRI + '</a></dd>' : '';

      var license = ('license' in o && o.license.length > 0) ? '<dt>License</dt><dd><a href="' + o.license + '" property="schema:license">' + o.license + '</a></dd>' : '';

      var asto = ('to' in o && o.to.length > 0 && !o.to.match(/\s/g) && o.to.match(/^https?:\/\//gi)) ? '<dt>To</dt><dd><a href="' + o.to + '" property="as:to">' + o.to + '</a></dd>' : '';


      var statements = ('statements' in o) ? o.statements : '';

      var dl = [
                types,
                asobject,
                ascontext,
                astarget,
                asupdated,
                assummary,
                ascontent,
                asactor,
                license,
                asto
                ].map(function(n) { if (n != '') { return '      ' + n + '\n'; } }).join('');


      //TODO: Come up with a better title. reuse `types` e.g., Activity Created, Announced..
      var title = 'Notification';
      if(types.indexOf('as:Announce') > -1){
        title += ': Announced';
      }
      else if (types.indexOf('as:Created') > -1){
        title += ': Created';
      }
      else if (types.indexOf('as:Liked') > -1){
        title += ': Liked';
      }
      else if (types.indexOf('as:Disliked') > -1){
        title += ': Disliked';
      }

      var data = '\n\
<article>\n\
  <h1>' + title + '</h1>\n\
  <section>\n\
    <dl about="">\n\
' + dl +
'    </dl>\n\
' + statements +
'  </section>\n\
</article>\n\
';

      var options = {};
      options.prefixes = DO.C.Prefixes;

      data = DO.U.createHTML(title, data, options);
// console.log(data);

      if (inbox && inbox.length > 0) {
        var pIRI = DO.U.getProxyableIRI(inbox);

        return DO.U.getAcceptPostPreference(pIRI)
          .catch(function(reason){
            return reason;
          })
          .then(function(preferredContentType){
// console.log(preferredContentType);
            var options = {
              'contentType': 'text/html',
              'subjectURI': 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d'
            };

            switch(preferredContentType) {
              case 'text/html': case 'application/xhtml+xml':
                return DO.U.postResource(pIRI, slug, data, 'text/html; charset=utf-8').catch(function(reason){
                  if(reason.xhr.status == 0){
                    var options = {'noCredentials': true};
                    DO.U.postResource(pIRI, slug, data, 'text/html; charset=utf-8');
                  }
                });
                break;
              case 'text/turtle':
                //FIXME: proxyURL + http URL doesn't work. https://github.com/solid/node-solid-server/issues/351
                // return DO.U.postResource(pIRI, slug, data, 'text/turtle; charset=utf-8');
                return DO.U.getGraphFromData(data, options).then(
                  function(g) {
// console.log(g);
                    var options = {
                      'contentType': 'text/turtle'
                    };
                    return DO.U.serializeGraph(g, options).then(
                      function(data){
// console.log(data);

                        //FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
                        data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '');

                        //XXX: Workaround for rdf-parser-rdfa bug that gives '@langauge' instead of @type when encountering datatype in HTML+RDFa . TODO: Link to bug here
                        data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;');

                        return DO.U.postResource(pIRI, slug, data, 'text/turtle').catch(function(reason){
                          if(reason.xhr.status == 0){
                            var options = {'noCredentials': true};
                            DO.U.postResource(pIRI, slug, data, 'text/turtle', null, options);
                          }
                        });
                      }
                    );
                  },
                  function(reason) {
                    return reason;
                  }
                );

                break;
              case 'application/ld+json': case 'application/json':  case '*/*': default:
                return DO.U.getGraphFromData(data, options).then(
                  function(g) {
// console.log(g);
                    var options = {
                      'contentType': 'application/ld+json'
                    };
                    return DO.U.serializeGraph(g, options).then(
                      function(i){
                        var x = JSON.parse(i);
// console.log(x);
                        x[0]["@context"] = ["https://www.w3.org/ns/activitystreams", {"oa": "http://www.w3.org/ns/anno.jsonld"}];
                        // If from is Turtle:
                        // x[0]["@id"] = (x[0]["@id"].slice(0,2) == '_:') ? '' : x[0]["@id"];
                        x[0]["@id"] = (x[0]["@id"] == 'http://localhost/d79351f4-cdb8-4228-b24f-3e9ac74a840d') ? '' : x[0]["@id"];

                        //XXX: Workaround for rdf-parser-rdfa bug that gives '@langauge' instead of @type when encountering datatype in HTML+RDFa . TODO: Link to bug here
                        for(var i = 0; i < x.length; i++){
                          if('https://www.w3.org/ns/activitystreams#updated' in x[i]) {
                            x[i]['https://www.w3.org/ns/activitystreams#updated'] = {
                              '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                              '@value': x[i]['https://www.w3.org/ns/activitystreams#updated']['@value']
                            };
                          }
                        }

                        var data = JSON.stringify(x) + '\n';
// console.log(data);
                        return DO.U.postResource(pIRI, slug, data, 'application/ld+json; profile="http://www.w3.org/ns/anno.jsonld"').catch(function(reason){
                            if(reason.xhr.status == 0){
                              var options = {'noCredentials': true};
                              DO.U.postResource(pIRI, slug, data, 'application/ld+json; profile="http://www.w3.org/ns/anno.jsonld"', null, options);
                            }
                        });
                      }
                    );
                  },
                  function(reason) {
                    return reason;
                  }
                );
                break;
            }
          });
      }
      else {
        return Promise.reject({'message': "No inbox to send notification to"});
      }
    },

    getAcceptPostPreference: function(url) {
      var pIRI = DO.U.getProxyableIRI(url);

      return DO.U.getResourceOptions(pIRI, {'header': 'Accept-Post'})
        .catch(function(reason) {
          return {'headers': 'application/ld+json'};
        })
        .then(function(i){
          var header = i.headers.trim().split(/\s*,\s*/);
          if (header.indexOf('text/html') > -1 || header.indexOf('application/xhtml+xml') > -1) {
            return 'text/html';
          }
          else if (header.indexOf('text/turtle') > -1 || header.indexOf('*/*') > -1) {
            return 'text/turtle';
          }
          else if (header.indexOf('application/ld+json') > -1 || header.indexOf('application/json') > -1) {
            return 'application/ld+json';
          }
          else {
            console.log('Accept-Post contains unrecognised media-range; ' + i.headers);
            return i.headers;
          }
        });
    },

    urlParam: function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results===null){
         return null;
      }
      else{
         return results[1] || 0;
      }
    },

    setDocumentMode: function(mode) {
      if (DO.C.EditorAvailable) {
        if (DO.U.urlParam('author') == 'true' || DO.U.urlParam('social') == 'true' || DO.U.urlParam('review') == 'true') {
          if (DO.U.urlParam('social') == 'true') {
            mode = 'social';
          }
          else if (DO.U.urlParam('author') == 'true') {
            mode = 'author';
          }
          else if (DO.U.urlParam('review') == 'true') {
            mode = 'review';
          }
          var url = document.location.href;
          window.history.replaceState({}, null, url.substr(0, url.lastIndexOf('?')));
        }

        switch(mode || '') {
          case 'social': default:
            DO.U.Editor.enableEditor('social');
            break;
          case 'author':
            DO.U.Editor.enableEditor('author');
            break;
          case 'review':
            DO.U.Editor.enableEditor('review');
            break;
        }
      }
    },

    //TODO: Refactor
    showUserSigninSignup: function(node) {
      if (typeof SimpleRDF !== 'undefined') {
        var s = '<button class="signin-user" title="Sign in to authenticate"><i class="fa fa-user-secret fa-2x"></i>Sign in</button>';
        if(DO.C.User.IRI) {
          s = DO.U.getUserHTML();
        }
        node.insertAdjacentHTML('beforeend', '<section id="user-info">' + s + '</section>');

        var su = document.querySelector('#document-menu button.signin-user');
        if(su) {
          su.addEventListener('click', DO.U.showUserIdentityInput);
        }
      }
    },

    //TODO: Refactor
    showUserIdentityInput: function(e) {
      if (e) {
        e.target.setAttribute('disabled', 'disabled');
      }
      document.body.insertAdjacentHTML('beforeend', '<aside id="user-identity-input" class="do on"><button class="close" title="Close">❌</button><h2>Sign in with WebID</h2><label>HTTP(S) IRI</label> <input id="webid" type="text" placeholder="http://csarven.ca/#i" value="" name="webid"/> <button class="signin">Sign in</button></aside>');
      var buttonSignIn = document.querySelector('#user-identity-input button.signin');
      buttonSignIn.setAttribute('disabled', 'disabled');
      document.querySelector('#user-identity-input button.close').addEventListener('click', function(e) {
        var sU = document.querySelector('#document-menu button.signin-user');
        if(sU) {
          sU.removeAttribute('disabled');
        }
      });
      var inputWebid = document.querySelector('#user-identity-input input#webid');
      buttonSignIn.addEventListener('click', DO.U.submitSignIn);
      ['keyup', 'cut', 'paste', 'input'].forEach(function(eventType) {
        inputWebid.addEventListener(eventType, function(e){ DO.U.enableDisableButton(e, buttonSignIn); });
      });
      inputWebid.focus();
    },

    //TODO: Generalize this further so that it is not only for submitSignIn
    enableDisableButton: function(e, button) {
      var delay = (e.type == 'cut' || e.type == 'paste') ? 250 : 0;
      var input;

      window.setTimeout(function () {
        input = e.target.value;
        if (input.length > 10 && input.match(/^https?:\/\//g)) {
          if (typeof e.which !== 'undefined' && e.which == 13) {
            if(!button.getAttribute('disabled')) {
              button.setAttribute('disabled', 'disabled');
              e.preventDefault();
              e.stopPropagation();
              DO.U.submitSignIn();
            }
          }
          else {
            button.removeAttribute('disabled');
          }
        }
        else {
          if (!button.getAttribute('disabled')) {
            button.setAttribute('disabled', 'disabled');
          }
        }
      }, delay);
    },

    submitSignIn: function() {
      var userIdentityInput = document.getElementById('user-identity-input');
      userIdentityInput.insertAdjacentHTML('beforeend', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

      var url = userIdentityInput.querySelector('input#webid').value.trim();
      if (url.length > 0) {
        DO.U.setUserInfo(url).then(
          function(i) {
// console.log(i);
            var uI = document.getElementById('user-info');
            if(uI) {
              uI.innerHTML = DO.U.getUserHTML();
            }

            userIdentityInput.parentNode.removeChild(userIdentityInput);
            DO.U.afterSignIn();

            //TODO: Refactor this elsewhere. Especially the reasonList for not authenticating.
            // DO.U.authenticateUser(url).then(
            //   function(userIRI) {
            //     DO.C.User.IRI = userIRI;
            //     return userIRI;
            //   },
            //   function(xhr) {
            //     console.log('setUser reject');
            //     return xhr;
            //   }
            // ).then(
            //   function(i) {
            //     userIdentityInput.parentNode.removeChild(userIdentityInput);
            //     return i;
            //   },
            //   function(reason) {
            //     var rm = userIdentityInput.querySelector('.response-message');
            //     if (rm) {
            //       rm.parentNode.removeChild(rm);
            //     }
            //     if (reason.length > 0) {
            //       var reasonsList = '<p>Reasons:</p><ul>';
            //       reason.forEach(function(r) {
            //         reasonsList += '<li>' + r.message + '</li>';
            //       });
            //       reasonsList += '</ul>';
            //     }

            //     userIdentityInput.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to sign in with this WebID.</p>' + reasonsList + '</div>');
            //     document.querySelector('#user-identity-input button.signin').removeAttribute('disabled');
            //     console.log(reason);
            //     return reason;
            //   }
            // ).then(
            //   function(i){
            //     DO.U.afterSignIn();
            //   },
            //   function(reason){
            //     console.log('--- ' + url + ' is not authenticated.');
            //   }
            // );
          },
          function(reason) {
            console.log("--- NO USER");
            console.log(reason);
          }
        );
      }
    },

    afterSignIn: function() {
      var user = document.querySelectorAll('aside.do article *[rel~="schema:creator"] > *[about="' + DO.C.User.IRI + '"]');
      for(var i = 0; i < user.length; i++) {
        var article = user[i].closest('article');
        article.insertAdjacentHTML('afterbegin', '<button class="delete"><i class="fa fa-trash"></i></button>');
      }

      var buttonDelete = document.querySelectorAll('aside.do blockquote[cite] article button.delete');
      for(var i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var article = e.target.closest('article');
          var refId = 'r-' + article.id;
          var noteIRI = article.closest('blockquote[cite]');
          noteIRI = noteIRI.getAttribute('cite');

          DO.U.deleteResource(noteIRI).then(
            function(i){
              var aside = e.target.closest('aside.do');
              aside.parentNode.removeChild(aside);
              var span = document.querySelector('span[about="#' + refId + '"]');
              span.outerHTML = span.querySelector('mark').textContent;
              //TODO: Delete notification or send delete activity
            },
            function(reason){
              console.log(reason);
            }
          );
        });
      }
    },

    showDocumentInfo: function() {
      document.body.insertAdjacentHTML('beforeend', '<menu id="document-menu" class="do"><button class="show" title="Open Menu"><i class="fa fa-bars"></i></button><header></header><div></div><footer><dl><dt>About</dt><dd id="about-dokieli"><i class="fa fa-github"></i> <a href="https://github.com/linkeddata/dokieli">dokieli</a></dd></dl></footer></menu>');
      document.querySelector('#document-menu').addEventListener('click', function(e) {
        var button = e.target.closest('button');
        if(button){
          if (button.classList.contains('show')) {
            DO.U.showDocumentMenu(e);
          }
          else if (button.classList.contains('hide')) {
            DO.U.hideDocumentMenu(e);
          }
        }
      });
    },

    showDocumentMenu: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var body = document.body;
      var dMenu = document.querySelector('#document-menu.do');
      var dMenuButton = dMenu.querySelector('button');
      var dHead = dMenu.querySelector('header');
      var dInfo = dMenu.querySelector('div');

      dMenuButton.classList.remove('show');
      dMenuButton.classList.add('hide');
      dMenuButton.setAttribute('title', 'Hide Menu');
      dMenuButton.innerHTML = '<i class="fa fa-minus"></i>';
      dMenu.classList.add('on');
      body.classList.add('on-document-menu');

      DO.U.showUserSigninSignup(dHead);
      DO.U.showDocumentDo(dInfo);
      DO.U.showEmbedData(dInfo);
      DO.U.showStorage(dInfo);
      DO.U.showViews(dInfo);
      DO.U.showDocumentMetadata(dInfo);
      if(!body.classList.contains('on-slideshow')) {
        DO.U.showToC();
      }

      document.addEventListener('click', DO.U.eventLeaveDocumentMenu);
    },

    hideDocumentMenu: function(e) {
      document.removeEventListener('click', DO.U.eventLeaveDocumentMenu);

      var body = document.body;
      var dMenu = document.querySelector('#document-menu.do');
      var dMenuButton = dMenu.querySelector('button');

      dMenu.classList.remove('on');
      var sections = dMenu.querySelectorAll('section');
      for (var i = 0; i < sections.length; i++) {
        sections[i].parentNode.removeChild(sections[i]);
      };
      body.classList.remove('on-document-menu');
      dMenuButton.classList.remove('hide');
      dMenuButton.classList.add('show');
      dMenuButton.setAttribute('title', 'Open Menu');
      dMenuButton.innerHTML = '<i class="fa fa-bars"></i>';

      var removeElementsList = ['toc', 'embed-data-entry', 'create-new-document', 'open-document', 'source-view', 'save-as-document', 'user-identity-input', 'resource-browser', 'share-resource', 'reply-to-resource'];
      removeElementsList.forEach(function(id) {
        var element = document.getElementById(id);
        if(element) {
          element.parentNode.removeChild(element);
        }
      });
    },

    setPolyfill: function() {
      if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
      if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
        var el = this;
        while (el) {
          if (el.matches(selector)) {
            return el;
          }
          el = el.parentElement;
        }
      };
    },

    setDocRefType: function() {
      var link = document.querySelector('head link[rel="stylesheet"][title]');
      if (link) {
        DO.C.DocRefType = link.getAttribute('title');
      }
      if (Object.keys(DO.C.RefType).indexOf(DO.C.DocRefType) == -1) {
        DO.C.DocRefType = 'LNCS';
      }
    },

    getCurrentLinkStylesheet: function() {
      return document.querySelector('head link[rel="stylesheet"][title]:not([href$="do.css"]):not(disabled)');
    },

    showViews: function(node) {
      var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

      if (stylesheets.length > 0) {
        var s = '<section id="document-views" class="do"><h2>Views</h2><i class="fa fa-magic"></i><ul>';
        s += '<li><button title="Change to native device/browser view">Native</button></li>';
        for (var i = 0; i < stylesheets.length; i++) {
          var stylesheet = stylesheets[i];
          var view = stylesheet.getAttribute('title');
          if(stylesheet.matches('[rel~="alternate"]')) {
            s += '<li><button title="Change to ‘' + view + '’ view">' + view + '</button></li>';
          }
          else {
            s += '<li><button disabled="disabled">' + view + '</button></li>';
          }
        }
        s += '</ul></section>';

        node.insertAdjacentHTML('beforeend', s);

        var viewButtons = document.querySelectorAll('#document-views.do button');
        for (var i = 0; i < viewButtons.length; i++) {
          viewButtons[i].addEventListener('click', function(e) {
            var selected = e.target;
            var prevStylesheet = DO.U.getCurrentLinkStylesheet();
            prevStylesheet = (prevStylesheet) ? prevStylesheet.getAttribute('title') : '';

            for (var j = 0; j < stylesheets.length; j++) {
              (function(stylesheet) {
                if (stylesheet.getAttribute('title').toLowerCase() == selected.textContent.toLowerCase()) {
                  stylesheet.disabled = false;
                  stylesheet.setAttribute('rel', 'stylesheet');
                }
                else {
                  stylesheet.disabled = true; //XXX: Leave this. WebKit wants to trigger this before for some reason.
                  stylesheet.setAttribute('rel', 'stylesheet alternate');
                }
              })(stylesheets[j]);
            };

            var bd = document.querySelectorAll('#document-views.do button:disabled');
            for(var j = 0; j < bd.length; j++) {
              bd[j].disabled = false;
            }
            selected.disabled = true;

            DO.U.showRefs();

            if (selected.textContent.toLowerCase() == 'shower') {
              var slides = document.querySelectorAll('.slide');
              for(var j = 0; j < slides.length; j++) {
                slides[j].classList.add('do');
              }
              document.body.classList.add('on-slideshow', 'list');
              document.querySelector('head').insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=792, user-scalable=no" />');

              var dM = document.getElementById('document-menu');
              var dMButton = dM.querySelector('header button');

              dM.classList.remove('on');
              var dMSections = dM.querySelectorAll('section');
              for (var j = 0; j < dMSections.length; j++) {
                dMSections[j].parentNode.removeChild(dMSections[j]);
              }
              document.body.classList.remove('on-document-menu');
              dMButton.classList.add('show');
              dMButton.setAttribute('title', 'Open Menu');
              var toc = document.getElementById('table-of-contents');
              toc = (toc) ? toc.parentNode.removeChild(toc) : false;

              DO.U.hideStorage();

              shower.initRun();
            }
            if (prevStylesheet.toLowerCase() == 'shower') {
              var slides = document.querySelectorAll('.slide');
              for (var c = 0; c < slides.length; c++){
                slides[c].classList.remove('do');
              }
              document.body.classList.remove('on-slideshow', 'list', 'full');
              document.body.removeAttribute('style');
              var mV = document.querySelector('head meta[name="viewport"][content="width=792, user-scalable=no"]');
              mV = (mV) ? mV.parentNode.removeChild(mV) : false;

              history.pushState(null, null, window.location.pathname);

              shower.removeEvents();
            }
          });
        }
      }
    },

    showEmbedData: function(node) {
      node.insertAdjacentHTML('beforeend', '<section id="embed-data-in-html" class="do"><h2>Data</h2><ul><li><button class="embed-data-meta" title="Embed structured data (Turtle, JSON-LD, TRiG)"><i class="fa fa-table fa-2x"></i>Embed Data</button></li></ul></section>');

      var eventEmbedData = function(e) {
        e.target.setAttribute('disabled', 'disabled');
        var scriptCurrent = document.querySelectorAll('head script[id^="meta-"]');

        var scriptType = {
          'meta-turtle': {
            scriptStart: '<script id="meta-turtle" type="text/turtle" title="Turtle">',
            cdataStart: '# ' + DO.C.CDATAStart + '\n',
            cdataEnd: '\n# ' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-json-ld': {
            scriptStart: '<script id="meta-json-ld" type="application/ld+json" title="JSON-LD">',
            cdataStart: DO.C.CDATAStart + '\n',
            cdataEnd: '\n' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-nanopublication': {
            scriptStart: '<script id="meta-nanopublication" type="application/trig" title="Nanopublication">',
            cdataStart: '# ' + DO.C.CDATAStart + '\n',
            cdataEnd: '\n# ' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          }
        }

        var scriptCurrentData = {};
        if (scriptCurrent.length > 0) {
          for(var i = 0; i < scriptCurrent.length; i++) {
            var v = scriptCurrent[i];
            var id = v.id;
            scriptCurrentData[id] = v.innerHTML.split(/\r\n|\r|\n/);
            scriptCurrentData[id].shift();
            scriptCurrentData[id].pop();
            scriptCurrentData[id] = {
              'type': v.getAttribute('type') || '',
              'title': v.getAttribute('title') || '',
              'content' : scriptCurrentData[id].join('\n')
            };
          }
        }

        var embedMenu = '<aside id="embed-data-entry" class="do on tabs"><button class="close" title="Close">❌</button>\n\
        <h2>Embed Data</h2>\n\
        <nav><ul><li class="selected"><a href="#embed-data-turtle">Turtle</a></li><li><a href="#embed-data-json-ld">JSON-LD</a></li><li><a href="#embed-data-nanopublication">Nanopublication</a></li></ul></nav>\n\
        <div id="embed-data-turtle" class="selected"><textarea placeholder="Enter data in Turtle" name="meta-turtle" cols="80" rows="24">' + ((scriptCurrentData['meta-turtle']) ? scriptCurrentData['meta-turtle'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-json-ld"><textarea placeholder="Enter data in JSON-LD" name="meta-json-ld" cols="80" rows="24">' + ((scriptCurrentData['meta-json-ld']) ? scriptCurrentData['meta-json-ld'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-nanopublication"><textarea placeholder="Enter data in TriG" name="meta-nanopublication" cols="80" rows="24">' + ((scriptCurrentData['meta-nanopublication']) ? scriptCurrentData['meta-nanopublication'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        </aside>';

        document.body.insertAdjacentHTML('beforeend', embedMenu);
        document.querySelector('#embed-data-turtle textarea').focus();
        var a = document.querySelectorAll('#embed-data-entry nav a');
        for(var i = 0; i < a.length; i++) {
          a[i].addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var li = e.target.parentNode;
            if(!li.classList.contains('selected')) {
              document.querySelector('#embed-data-entry nav li.selected').classList.remove('selected');
              li.classList.add('selected');
              document.querySelector('#embed-data-entry > div.selected').classList.remove('selected');
              var d = document.querySelector('#embed-data-entry > div' + e.target.hash);
              d.classList.add('selected');
              d.querySelector('textarea').focus();
            }
          });
        }

        document.querySelector('#embed-data-entry button.close').addEventListener('click', function(e) {
          document.querySelector('#embed-data-in-html .embed-data-meta').removeAttribute('disabled');
        });

        var buttonSave = document.querySelectorAll('#embed-data-entry button.save');
        for (var i = 0; i < buttonSave.length; i++) {
          buttonSave[i].addEventListener('click', function(e) {
            var textarea = e.target.parentNode.querySelector('textarea');
            var name = textarea.getAttribute('name');
            var scriptEntry = textarea.value;
            var script = document.getElementById(name);

            if (scriptEntry.length > 0) {
              var scriptContent = '  ' + scriptType[name].scriptStart + scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd + scriptType[name].scriptEnd;
              //If there was a script already
              if (script) {
                script.innerHTML = scriptContent;
              }
              else {
                document.querySelector('head').insertAdjacentHTML('beforeend', scriptContent);
              }
            }
            else {
              //Remove if no longer used
              script.parentNode.removeChild(script);
            }

            var ede = document.getElementById('embed-data-entry');
            ede.parentNode.removeChild(ede);
            document.querySelector('#embed-data-in-html .embed-data-meta').removeAttribute('disabled');
          });
        };
      };

      var edih = document.querySelector('#embed-data-in-html button');
      edih.removeEventListener('click', eventEmbedData);
      edih.addEventListener('click', eventEmbedData);
    },

    showTableOfStuff: function(node) {
      var disabledInput = '', s = '';
      if (!DO.C.EditorEnabled) {
        disabledInput = ' disabled="disabled"';
      }

      tableList = [{'content': 'Contents'}, {'figure': 'Figures'}, {'table': 'Tables'}, {'abbr': 'Abbreviations'}];
      tableList.forEach(function(i) {
        var key = Object.keys(i)[0];
        var value = i[key];
        var checkedInput = '';
        if(document.getElementById('table-of-'+ key +'s')) {
          checkedInput = ' checked="checked"';
        }

        s+= '<li><input id="t-o-' + key +'" type="checkbox"' + disabledInput + checkedInput + '/><label for="t-o-' + key + '">' + value + '</label></li>';
      });

      node.insertAdjacentHTML('beforeend', '<section id="table-of-stuff" class="do"><h2>Table of Stuff</h2><ul>' + s + '</ul></section>');

      if(DO.C.EditorEnabled) {
        document.getElementById('table-of-stuff').addEventListener('click', function(e){
          if (e.target.matches('input')) {
            var id = e.target.id;
            var listType = id.slice(4, id.length);
            if(!e.target.getAttribute('checked')) {
              DO.U.buildTableOfStuff(listType);
              e.target.setAttribute('checked', 'checked');
            }
            else {
              var tol = document.getElementById('table-of-'+listType+'s');
              if(tol) {
                tol.parentNode.removeChild(tol);
              }
              e.target.removeAttribute('checked');
            }
          }
        });
      }
    },

    htmlEntities: function(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    showDocumentMetadata: function(node) {
      var content = document.body;
      var count = DO.U.contentCount(content);
      var authors = [], contributors = [];

      var data = DO.U.getDocument();
      var subjectURI = window.location.origin + window.location.pathname;
      var options = {'contentType': 'text/html', 'subjectURI': subjectURI };

      DO.U.getGraphFromData(data, options).then(
        function(i){
          var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], i, ld.store).child(options['subjectURI']);

          if(g.schemaauthor._array.length > 0) {
            g.schemaauthor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                authors.push('<li>' + label + '</li>');
              }
            });
            if(authors.length > 0){
              authors = '<tr class="people"><th>Authors</th><td><ul class="authors">' + authors.join('') + '</ul></td></tr>';
            }
          }

          if(g.schemacontributor._array.length > 0) {
            g.schemacontributor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                contributors.push('<li>' + label + '</li>');
              }
            });
            if(contributors.length > 0){
              contributors = '<tr class="people"><th>Contributors</th><td><ul class="contributors">' + contributors.join('') + '</ul></td></tr>';
            }
          }

          return authors + contributors;
        }).then(
        function(people){
          var s = '<section id="document-metadata" class="do"><table>\n\
            <caption>Document Metadata</caption>\n\
            <tbody>\n\
              ' + people + '\n\
              <tr><th>Reading time</th><td>' + count.readingTime + ' minutes</td></tr>\n\
              <tr><th>Characters</th><td>' + count.chars + '</td></tr>\n\
              <tr><th>Words</th><td>' + count.words + '</td></tr>\n\
              <tr><th>Lines</th><td>' + count.lines + '</td></tr>\n\
              <tr><th>A4 Pages</th><td>' + count.pages.A4 + '</td></tr>\n\
              <tr><th>US Letter</th><td>' + count.pages.USLetter + '</td></tr>\n\
              <tr><th>Bytes</th><td>' + count.bytes + '</td></tr>\n\
            </tbody>\n\
          </table></section>';

          node.insertAdjacentHTML('beforeend', s);
        });
    },

    contentCount: function(c) {
      var content = c.textContent.trim();
      var contentCount = { readingTime:1, words:0, chars:0, lines:0, pages:{A4:1, USLetter:1}, bytes:0 };
      if (content.length > 0) {
        var lineHeight = c.ownerDocument.defaultView.getComputedStyle(c, null)["line-height"];
        var linesCount = Math.ceil(c.clientHeight / parseInt(lineHeight));
        contentCount = {
          readingTime: Math.ceil(content.split(' ').length / 200),
          words: content.match(/\S+/g).length,
          chars: content.length,
          lines: linesCount,
          pages: { A4: Math.ceil(linesCount / 47), USLetter: Math.ceil(linesCount / 63) },
          bytes: encodeURI(document.documentElement.outerHTML).split(/%..|./).length - 1
        };
      }
      return contentCount;
    },

    showToC: function() {
      var sections = document.querySelectorAll('h1 ~ div > section:not([class~="slide"]):not([id^=table-of])');

      if (sections.length > 0) {
        var s = '';
        var sortable = '';

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          sortable = ' sortable';
        }

        s = '<aside id="toc" class="do on' + sortable + '"><button class="close" title="Close">❌</button></aside>';
        document.body.insertAdjacentHTML('beforeend', s);

        var toc = document.getElementById('toc');

        DO.U.showTableOfStuff(toc);

        s = '<section id="table-of-contents-i" class="do"><h2>Table of Contents</h2><ol class="toc' + sortable + '">';
        s += DO.U.getListOfSections(sections, DO.C.SortableList);
        s += '</ol></section>';
        toc.insertAdjacentHTML('beforeend', s);

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          DO.U.sortToC();
        }
      }
    },

    sortToC: function() {
    },

    getListOfSections: function(sections, sortable) {
      var s = attributeClass = '';
      if (sortable == true) { attributeClass = ' class="sortable"'; }

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if(section.id) {
          var heading = section.querySelector(':first-child');
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(heading.tagName.toLowerCase()) > -1) {
            s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + heading.textContent + '</a>';
            var subsections = section.parentNode.querySelectorAll('[id="' + section.id + '"] > div > section[rel*="hasPart"]:not([class~="slide"])');
            if (subsections.length > 0) {
              s += '<ol'+ attributeClass +'>';
              s += DO.U.getListOfSections(subsections, sortable);
              s += '</ol>';
            }
            s += '</li>';
          }
        }
      }

      return s;
    },

    buildTableOfStuff: function(listType) {
      var s = elementId = elementTitle = titleType = tableHeading = '';
      var tableList = [];

      tableList = (listType) ? [listType] : ['content', 'figure', 'table', 'abbr'];

      tableList.forEach(function(element) {
        var e = document.querySelectorAll(element);
        if (element == 'content' || e.length > 0) {
          switch(element) {
            case 'figure':
              titleType = 'figcaption';
              tableHeading = 'Table of Figures';
              break;
            case 'table':
              titleType = 'caption';
              tableHeading = 'Table of Tables';
              break;
            case 'abbr':
              titleType = 'title';
              tableHeading = 'Table of Abbreviations';
              break;
            case 'content': default:
              titleType = '';
              tableHeading = 'Table of Contents';
              break;
          }

          if (element == 'abbr') {
            s += '<section id="table-of-'+ element +'s">';
          }
          else {
            s += '<nav id="table-of-'+ element +'s">';
          }
          s += '<h2>' + tableHeading + '</h2>';
          s += '<div><ol class="toc">';

          if (element == 'content') {
            s += DO.U.getListOfSections(document.querySelectorAll('h1 ~ div > section:not([class~="slide"])'), false);
          }
          else {
            if (element == 'abbr') {
              if (e.length > 0) {
                [].slice.call(e).sort(function(a, b) {
                  var textA = a.textContent;
                  var textB = b.textContent;
                  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
              }

              for (var i = 0; i < e.length; i++) {
                s += '<dt>' + e[i].textContent + '</dt>';
                s += '<dd>' + e[i].getAttribute(titleType) + '</dd>';
              };
            }
            else {
              for (var i = 0; i < e.length; i++) {
                var title = e[i].querySelector(titleType);
                if(title) {
                  s += '<li><a href="#' + e[i].id +'">' + title.textContent +'</a></li>';
                }
              };
            }
          }

          if (element == 'abbr'){
            s += '</dl></div>';
            s += '</section>';
          } else {
            s += '</ol></div>';
            s += '</nav>';
          }
        }
      });

      //XXX: Tries to find a suitable place to insert.
      var i = document.getElementById('document-status');
      if (i) { i.insertAdjacentHTML('afterend', s); }
      else {
        i = document.getElementById('introduction');
        if (i) { i.insertAdjacentHTML('beforebegin', s); }
        else {
          i = document.getElementById('prologue');
          if (i) { i.insertAdjacentHTML('beforebegin', s); }
          else {
            i = document.getElementById('keywords');
            if (i) { i.insertAdjacentHTML('afterend', s); }
            else {
              i = document.getElementById('categories-and-subject-descriptors');
              if (i) { i.insertAdjacentHTML('afterend', s); }
              else { document.getElementById('content').insertAdjacentHTML('afterbegin', s); }
            }
          }
        }
      }
    },

    buttonClose: function() {
      document.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          var parent = e.target.parentNode;
          parent.parentNode.removeChild(parent);
        }
      });
    },

    eventEscapeDocumentMenu: function(e) {
      if (e.keyCode == 27) { // Escape
        DO.U.hideDocumentMenu(e);
      }
    },

    eventLeaveDocumentMenu: function(e) {
      if (!e.target.closest('.do.on')) {
        DO.U.hideDocumentMenu(e);
      }
    },

    updateDocumentTitle: function(e) {
      if (!e.target.matches('h1')) {
        var h1 = document.querySelector('main article > h1');
        if (h1) {
          document.title = h1.textContent.trim();
        }
      }
    },

    utf8Tob64: function(s) {
      return window.btoa(encodeURIComponent(s));
    },

    b64Toutf8: function(s) {
      return unescape(decodeURIComponent(window.atob(s)));
    },

    encodeString: function(string) {
      return encodeURIComponent(string).replace(/'/g,"%27").replace(/"/g,"%22");
    },

    decodeString: function(string) {
      return decodeURIComponent(string.replace(/\+/g,  " "));
    },

    uniqueArray: function(a){
      var n = {}, r = [];
      for(var i = 0; i < a.length; i++) {
        if (!n[a[i]]) {
          n[a[i]] = true;
          r.push(a[i]);
        }
      }
      return r;
    },

    stripFragmentFromString: function(string) {
      if (typeof string === "string") {
        var stringIndexFragment = string.indexOf('#');

        if (stringIndexFragment >= 0) {
          string = string.substring(0, stringIndexFragment);
        }
      }
      return string;
    },

    showFragment: function(selector) {
      var ids = (selector) ? document.querySelectorAll(selector) : document.querySelectorAll('main *[id]:not(input):not(textarea):not(select):not(#content)');

      for(var i = 0; i < ids.length; i++){
        ids[i].addEventListener('mouseenter', function(e){
          var fragment = document.querySelector('*[id="' + e.target.id + '"] > .do.fragment');
          if (!fragment && e.target.parentNode.nodeName.toLowerCase() != 'aside'){
            var sign;
            switch(e.target.nodeName.toLowerCase()) {
              default:    sign = '🔗'; break;
              case 'section':
                switch (e.target.id) {
                  default:          sign = '§'; break;
                  case 'references':    sign = '☛'; break;
                  case 'acknowledgements':  sign = '☺'; break;
                  case 'results':       sign = '∞'; break;
                  case 'related-work':    sign = '⌘'; break;
                  case 'keywords':      sign = '🏷'; break;
                  case 'conclusions':     sign = '∴'; break;
                }
                break;
              case 'aside':   sign = '†'; break;
              case 'p':     sign = '¶'; break;
              case 'pre':   sign = '🖩'; break;
              case 'nav':   sign = '☛'; break;
              case 'dfn':   sign = '📇'; break;
              case 'table':   sign = '𝄜'; break;
              case 'figure':  sign = '❦'; break;
              case 'img':   sign = '🖼'; break;
              case 'video':   sign = '🎞'; break;
              case 'audio':   sign = '🔊'; break;
              case 'footer':  sign = '⸙'; break;
            }
            e.target.insertAdjacentHTML('afterbegin', '<span class="do fragment"><a href="#' + e.target.id + '">' + sign + '</a></span>');
            fragment = document.querySelector('[id="' + e.target.id + '"] > .do.fragment');
            var fragmentClientWidth = fragment.clientWidth;

            var fragmentOffsetLeft = DO.U.getOffset(e.target).left;
            var bodyOffsetLeft = DO.U.getOffset(document.body).left;

            var offsetLeft = 0;
            if ((fragmentOffsetLeft - bodyOffsetLeft) > 200) {
              offsetLeft = e.target.offsetLeft;
            }

            fragment.style.top = Math.ceil(e.target.offsetTop) + 'px';
            fragment.style.left = (offsetLeft - fragmentClientWidth) + 'px';
            fragment.style.height = e.target.clientHeight + 'px';
            fragment.style.width = (fragmentClientWidth - 10) + 'px';
          }
        });

        ids[i].addEventListener('mouseleave', function(e){
          var fragment = document.querySelector('[id="' + e.target.id + '"] > .do.fragment');
          fragment.parentNode.removeChild(fragment);
        });
      }
    },

    getOffset: function(el) {
      var box = el.getBoundingClientRect();

      return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
      }
    },

    forceTrailingSlash: function(aString) {
      if (aString.slice(-1) == "/") return aString;
      return aString + "/";
    },

    getUrlPath: function(aString) {
      return aString.split("/");
    },

    getGraphFromData: function(data, options) {
      options = options || {};
      if (!('contentType' in options)) {
        options['contentType'] = 'text/turtle';
      }
      if (!('subjectURI' in options)) {
        options['subjectURI'] = '_:dokieli';
      }

      return SimpleRDF.parse(data, options['contentType'], options['subjectURI']);
    },

    getGraph: function(url) {
      return SimpleRDF(DO.C.Vocab, url, null, ld.store).get();
    },

    serializeGraph: function(g, options) {
      options = options || {};
      if (!('contentType' in options)) {
        options['contentType'] = 'text/turtle';
      }

      return ld.store.serializers[options.contentType].serialize(g._graph);
    },

    serializeData: function(data, fromContentType, toContentType, options) {
      if (fromContentType == toContentType) {
        return Promise.resolve(data);
      }
      else {
        var o = {
          'contentType': fromContentType,
          'subjectURI': options.subjectURI
        };
        return DO.U.getGraphFromData(data, o).then(
          function(g) {
            var o = {
              'contentType': toContentType
            };
            return DO.U.serializeGraph(g, o).then(
              function(i){
                switch(toContentType) {
                  case 'application/ld+json':
                    var x = JSON.parse(i);
                    x[0]["@context"] = ["http://www.w3.org/ns/anno.jsonld", {"as": "https://www.w3.org/ns/activitystreams"}];
                    x[0]["@id"] = (x[0]["@id"].slice(0,2) == '_:') ? '' : x[0]["@id"];
                    return JSON.stringify(x) + '\n';
                  default:
                    return i;
                }
              }
            );
          },
          function(reason) {
            return reason;
          }
        );
      }
    },

    getDoctype: function() {
      /* Get DOCTYPE from http://stackoverflow.com/a/10162353 */
      var node = document.doctype;
      var doctype = '';
      if (node !== null) {
        doctype = "<!DOCTYPE "
          + node.name
          + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
          + (!node.publicId && node.systemId ? ' SYSTEM' : '')
          + (node.systemId ? ' "' + node.systemId + '"' : '')
          + '>';
      }
      return doctype;
    },

    getDocument: function(cn, options) {
      var node = cn || document.documentElement.cloneNode(true);
      options = options || DO.C.DOMNormalisation;

      var doctype = DO.U.getDoctype();
      var s =  (doctype.length > 0) ? doctype + "\n" : '';
      s += DO.U.domToString(node, options);
      return s;
    },

    domToString: function(node, options) {
      options = options || {};
      var selfClosing = [];
      if ('selfClosing' in options) {
        options.selfClosing.split(' ').forEach(function (n) {
          selfClosing[n] = true;
        });
      }
      var skipAttributes = []
      if ('skipAttributes' in options) {
        options.skipAttributes.split(' ').forEach(function (n) {
          skipAttributes[n] = true;
        });
      }

      var noEsc = [false];

      var dumpNode = function(node) {
        var out = '';
        if (typeof node.nodeType === 'undefined') return out
        if (1 === node.nodeType) {
          if (node.hasAttribute('class') && 'classWithChildText' in options && node.matches(options.classWithChildText.class)) {
            out += node.querySelector(options.classWithChildText.element).textContent;
          }
          else if (!('skipNodeWithClass' in options && node.matches('.' + options.skipNodeWithClass))) {
            var ename = node.nodeName.toLowerCase();
            out += "<" + ename ;

            var attrList = [];
            for (var i = node.attributes.length - 1; i >= 0; i--) {
              var atn = node.attributes[i];
              if (skipAttributes[atn.name]) continue;
              if (/^\d+$/.test(atn.name)) continue;
              if (atn.name == 'class' && 'replaceClassItemWith' in options) {
                atn.value.split(' ').forEach(function(aValue){
                  if(options.replaceClassItemWith.source.split(' ').indexOf(aValue) > -1) {
                    var re = new RegExp(aValue, 'g');
                    atn.value = atn.value.replace(re, options.replaceClassItemWith.target).trim();
                  }
                });
              }
              if (!(atn.name == 'class' && 'skipClassWithValue' in options && options.skipClassWithValue == atn.value)) {
                attrList.push(atn.name + "=\"" + atn.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') + "\"");
              }
            }

            if (attrList.length > 0) {
              if('sortAttributes' in options && options.sortAttributes) {
                attrList.sort(function (a, b) {
                  return a.toLowerCase().localeCompare(b.toLowerCase());
                });
              }
              out += ' ' + attrList.join(' ');
            }

            if (selfClosing[ename]) { out += " />"; }
            else {
              out += '>';
              out += (ename == 'html') ? "\n  " : '';
              noEsc.push(ename === "style" || ename === "script");
              for (var i = 0; i < node.childNodes.length; i++) out += dumpNode(node.childNodes[i]);
              noEsc.pop();
              out += (ename == 'body') ? '</' + ename + '>' + "\n" : '</' + ename + '>';
            }
          }
        }
        else if (8 === node.nodeType) {
          //FIXME: If comments are not tabbed in source, a new line is not prepended
          out += "<!--" + node.nodeValue + "-->";
        }
        else if (3 === node.nodeType || 4 === node.nodeType) {
          //XXX: Remove new lines which were added after DOM ready
          var nl = node.nodeValue.replace(/\n+$/, '');
          out += noEsc[noEsc.length - 1] ? nl : nl.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        else {
          console.log("Warning; Cannot handle serialising nodes of type: " + node.nodeType);
        }
        return out;
      };

      return dumpNode(node);
    },

    exportAsHTML: function() {
      var data = DO.U.getDocument();
      //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
      var blob = new Blob([data], {type:'text/html;charset=utf-8'});
      var pattern = /[^\w]+/ig;
      var title = document.querySelector('h1').textContent.toLowerCase().replace(pattern, '-') || "index";
      var timestamp = DO.U.getDateTimeISO().replace(pattern, '') || "now";

      var fileName = title + '.' + timestamp + '.html';

      var a = document.createElement("a");
      a.download = fileName;

      a.href = window.URL.createObjectURL(blob);
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    showDocumentDo: function(node) {
      var buttonDisabled = '';
      if (document.location.protocol == 'file:') {
        buttonDisabled = ' disabled="disabled"';
      }

      var s = '<section id="document-do" class="do"><h2>Do</h2><ul>';
      s += '<li><button class="resource-share" title="Share resource"><i class="fa fa-bullhorn fa-2x"></i>Share</button></li>';
      s += '<li><button class="resource-reply" title="Reply"><i class="fa fa-reply fa-2x"></i>Reply</button></li>';
      if (DO.C.EditorAvailable) {
        var reviewArticle = (DO.C.EditorEnabled && DO.C.User.Role == 'review') ? DO.C.Editor.DisableReviewButton : DO.C.Editor.EnableReviewButton;
        s += '<li>' + reviewArticle + '</li>';
      }
      s += '<li><button class="resource-new"'+buttonDisabled+' title="Create new article"><i class="fa fa-lightbulb-o fa-2x"></i></i>New</button></li>';
      s += '<li><button class="resource-open"'+buttonDisabled+' title="Open article"><i class="fa fa-coffee fa-2x"></i></i>Open</button></li>';
      s += '<li><button class="resource-save"'+buttonDisabled+' title="Save article"><i class="fa fa-life-ring fa-2x"></i>Save</button></li>';
      s += '<li><button class="resource-save-as" title="Save as article"><i class="fa fa-paper-plane-o fa-2x"></i>Save As</button></li>';
      s += '<li><button class="resource-snapshot" title="Snapshot article"><i class="fa fa-external-link fa-2x"></i>Snapshot</button></li>';
      s += '<li><button class="resource-print" title="Print article"><i class="fa fa-print fa-2x"></i>Print</button></li>';
      if (DO.C.EditorAvailable) {
        var editFile = (DO.C.EditorEnabled && DO.C.User.Role == 'author') ? DO.C.Editor.DisableEditorButton : DO.C.Editor.EnableEditorButton;
        s += '<li>' + editFile + '</li>';
      }
      s += '<li><button class="resource-source"'+buttonDisabled+' title="Edit article source code"><i class="fa fa-code fa-2x"></i>Source</button></li>';
      s += '</ul></section>';
      node.insertAdjacentHTML('beforeend', s);

      var dd = document.getElementById('document-do');
      dd.addEventListener('click', function(e) {
        if (e.target.closest('.resource-share')) {
          DO.U.shareResource(e);
        }

        if (e.target.closest('.resource-reply')) {
          DO.U.replyToResource(e);
        }

        if (DO.C.EditorAvailable) {
          if (e.target.closest('button.editor-disable') ||
            e.target.closest('button.review-disable')) {
            e.target.parentNode.innerHTML = DO.C.Editor.EnableEditorButton;
            DO.U.Editor.enableEditor('social', e);
          }
          else {
            if (e.target.closest('button.editor-enable')) {
              e.target.parentNode.innerHTML = DO.C.Editor.DisableEditorButton;
              DO.U.Editor.enableEditor('author', e);
            }
            else if (e.target.closest('button.review-enable')) {
              e.target.parentNode.innerHTML = DO.C.Editor.DisableEditorButton;
              DO.U.Editor.enableEditor('review', e);
            }
          }
        }

        if (e.target.closest('.resource-new')) {
          DO.U.createNewDocument(e);
        }

        if (e.target.closest('.resource-open')) {
          DO.U.openDocument(e);
        }

        if (e.target.closest('.resource-save')) {
          var url = window.location.origin + window.location.pathname;
          var data = DO.U.getDocument();
          DO.U.putResource(url, data).then(
            function(i) {
              DO.U.showActionMessage(document.getElementById('document-menu'), 'Saved');
              DO.U.hideDocumentMenu(e);
            },
            function(reason) {
              console.log(reason);
            }
          );
        }

        if (e.target.closest('.resource-source')) {
          DO.U.viewSource(e);
        }

        if (e.target.closest('.resource-save-as')) {
          DO.U.saveAsDocument(e);
        }

        if (e.target.closest('.resource-snapshot')) {
          DO.U.exportAsHTML(e);
        }

        if (e.target.closest('.resource-print')) {
          DO.U.hideDocumentMenu(e);
          window.print();
          return false;
        }
      });
    },

    replyToResource: function(e, iri){
      iri = iri || window.location.origin + window.location.pathname;
      e.target.disabled = true;

      document.body.insertAdjacentHTML('beforeend', '<aside id="reply-to-resource" class="do on"><button class="close" title="Close">❌</button><h2>Reply to this</h2><div id="reply-to-resource-input"><p>Reply to <code>' + iri +'</code></p><ul><li><p><label for="reply-to-resource-note">Quick reply (plain text note)</label></p><p><textarea id="reply-to-resource-note" rows="10" cols="40" name="reply-to-resource-note" placeholder="Great article!"></textarea></p></li><li><label for="reply-to-resource-license">License</label> <select id="reply-to-resource-license" name="reply-to-resource-license">' + DO.U.getLicenseOptionsHTML() + '</select></li></ul></div>');

      // TODO: License
      // TODO: ACL - can choose whether to make this reply private (to self), visible only to article author(s), visible to own contacts, public
      // TODO: Show name and face of signed in user reply is from, or 'anon' if article can host replies

      var replyToResource = document.getElementById('reply-to-resource');

      DO.U.setupResourceBrowser(replyToResource);
      document.getElementById('browser-location').insertAdjacentHTML('afterbegin', '<p>Choose a location to save your reply.</p>');
      replyToResource.insertAdjacentHTML('beforeend', '<p>Your reply will be saved at <samp id="location-final">https://example.org/path/to/article</samp></p>');
      var bli = document.getElementById('browser-location-input');
      bli.focus();
      bli.placeholder = 'https://example.org/path/to/article';
      replyToResource.insertAdjacentHTML('beforeend', '<button class="reply">Send now</button>');
      // TODO: New in editor make this button do something.
      //     Question: when should the notification be sent?
      //replyToResource.insertAdjacentHTML('beforeend', 'or <button class="reply-new"><i class="fa fa-paper-plane-o"></i> Write reply in new window</button>');
      replyToResource.insertAdjacentHTML('beforeend', '</aside>');

      replyToResource.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-reply').disabled = false;
        }

        if (e.target.matches('button.reply')) {
          var note = document.querySelector('#reply-to-resource #reply-to-resource-note').value.trim();

          var rm = replyToResource.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }
          replyToResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>');
          if (iri.length > 0 && note.length > 0) {

            var datetime = DO.U.getDateTimeISO();
            var id = DO.U.generateAttributeId();
            var noteIRI = document.querySelector('#reply-to-resource #location-final').innerText.trim();
            var motivatedBy = "oa:replying";
            var noteData = {
              "type": 'article',
              "mode": "write",
              "motivatedByIRI": motivatedBy,
              "id": id,
              "iri": noteIRI, //e.g., https://example.org/path/to/article
              "creator": {},
              "datetime": datetime,
              "target": {
                "iri": iri
              },
              "body": note, // content
              "license": {}
            };
            if (DO.C.User.IRI) {
              noteData.creator["iri"] = DO.C.User.IRI;
            }
            if (DO.C.User.Name) {
              noteData.creator["name"] = DO.C.User.Name;
            }
            if (DO.C.User.Image) {
              noteData.creator["image"] = DO.C.User.Image;
            }
            if (DO.C.User.URL) {
              noteData.creator["url"] = DO.C.User.URL;
            }

            var license = document.querySelector('#reply-to-resource-license');
            if (license && license.length > 0) {
              noteData.license["iri"] = license.value.trim();
              noteData.license["name"] = DO.C.License[license.value.trim()].name;
            }

            var note = DO.U.createNoteDataHTML(noteData);

            var data = DO.U.createHTML(noteIRI, note);

            DO.U.putResource(noteIRI, data).then(
              function(i){
                replyToResource.querySelector('.response-message').innerHTML = '<p class="success"><a href="' + i.xhr.responseURL + '">Reply saved!</a></p>';
                // Then send notification
                DO.U.getEndpoint(DO.C.Vocab['ldpinbox']['@id']).then(
                  function(inbox) {
console.log(inbox);
                    if (inbox.length > 0) {
                      inbox = inbox[0];

                      var notificationStatements = '    <dl about="' + noteIRI + '">\n\
      <dt>Object type</dt><dd><a about="' + noteIRI + '" typeof="oa:Annotation" href="' + DO.C.Vocab['oaannotation']['@id'] + '">Annotation</a></dd>\n\
      <dt>Motivation</dt><dd><a href="' + DO.C.Prefixes[motivatedBy.split(':')[0]] + motivatedBy.split(':')[1] + '" property="oa:motivation">' + motivatedBy.split(':')[1] + '</a></dd>\n\
    </dl>\n\
';
                      var notificationData = {
                        "type": ['as:Announce'],
                        "inbox": inbox,
                        "object": noteIRI,
                        "target": iri,
                        "license": noteData.license["iri"],
                        "statements": notificationStatements
                      };

                      DO.U.notifyInbox(notificationData).then(
                        function(response) {
    // console.log("Notification: " + response.xhr.getResponseHeader('Location'));
                          replyToResource.querySelector('.response-message').innerHTML += '<p class="success">Notification sent.</p>';
                        },
                        function(reason) {
                          console.log(reason);
                          replyToResource.querySelector('.response-message').innerHTML += '<p class="error">We couldn\'t notify the author of your reply.</p>';
                        }
                      );
                     }
                  },
                  function(reason) {
                    // FIXME: this isn't getting thrown, gets stuck in getEndpoint
                    console.log('No inbox, no notification sent');
                    console.log(reason);
                    replyToResource.querySelector('.response-message').innerHTML += '<p class="error">We couldn\'t notify the author of your reply.</p>';
                  }
                );
              },
              function(reason){
                console.log(reason);
                switch(reason.status){
                  default:
                    replyToResource.querySelector('.response-message').innerHTML = '<p class="error">Can\'t save your reply.</p>';
                    break;
                  case 0: case 405:
                    replyToResource.querySelector('.response-message').innerHTML = '<p class="error">Can\'t save your reply: this location is not writeable.</p>';
                    break;
                  case 401: case 403:
                    replyToResource.querySelector('.response-message').innerHTML = '<p class="error">Can\'t save your reply: you don\'t have permission to write here.</p>';
                    break;
                  case 406:
                    replyToResource.querySelector('.response-message').innerHTML = '<p class="error">Can\'t save your reply: enter a name for your resource.</p>';
                    break;
                }
              }
            );
          }else{
            replyToResource.querySelector('.response-message').innerHTML = '<p class="error">Need a note and a location to save it.</p>';
          }
        }
      });
    },

    showActionMessage: function(node, message) {
      var message = '<aside id="document-action-message" class="do on"><p>' + message + '</p></aside>';
      node.insertAdjacentHTML('afterend', message);
      window.setTimeout(function () {
        var dam = document.getElementById('document-action-message');
        dam.parentNode.removeChild(dam);
      }, 1500);
    },

    shareResource: function(e, iri) {
      iri = iri || window.location.origin + window.location.pathname;
      if (e) {
        e.target.disabled = true;
      }

      var addContactsButtonDisable = '', noContactsText = '';
      if(!(DO.C.User.Graph && ((DO.C.User.Knows && DO.C.User.Knows.length > 0) || (DO.C.User.Graph.owlsameAs && DO.C.User.Graph.owlsameAs._array.length > 0)))) {
        addContactsButtonDisable = ' disabled="disabled"';
        noContactsText = '<p>No contacts with <i class="fa fa-inbox"></i> Inboxes found. Acquire <i class="fa fa-thermometer-empty"></i> cool friends‽</p><p>Optionally enter targets individually:</p>';
      }
      var addContactsButton = '<li id="share-resource-address-book"><button class="add"' + addContactsButtonDisable + '><i class="fa fa-address-book"></i> Add from contacts</button>' + noContactsText + '</li>';

      document.body.insertAdjacentHTML('beforeend', '<aside id="share-resource" class="do on"><button class="close" title="Close">❌</button><h2>Share resource</h2><div id="share-resource-input"><p>Send a notification about <code>' + iri +'</code></p><ul>' + addContactsButton + '<li><label for="share-resource-to">To</label> <textarea id="share-resource-to" rows="2" cols="40" name="share-resource-to" placeholder="WebID or article IRI (one per line)"></textarea></li><li><label for="share-resource-note">Note</label> <textarea id="share-resource-note" rows="2" cols="40" name="share-resource-note" placeholder="Check this out!"></textarea></li></ul></div><button class="share">Share</button></aside>');

      var shareResource = document.getElementById('share-resource');
      shareResource.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          var rs = document.querySelector('#document-do .resource-share');
          if (rs) {
            rs.disabled = false;
          }
        }

        if (DO.C.User.IRI && e.target.matches('button.add')) {
          e.preventDefault();
          e.stopPropagation();
          e.target.parentNode.insertAdjacentHTML('beforeend', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
          DO.U.selectContacts(e, DO.C.User.IRI);
        }

        if (e.target.matches('button.share')) {
          var tos = document.querySelector('#share-resource #share-resource-to').value.trim();
          tos = (tos.length > 0) ? tos.split(/\r\n|\r|\n/) : [];
          var note = document.querySelector('#share-resource #share-resource-note').value.trim();

          var ps = document.querySelectorAll('#share-resource-contacts .progress');
          ps.forEach(function(p){
            p.parentNode.removeChild(p);
          });

          var srci = document.querySelectorAll('#share-resource-contacts input:checked');
          if (srci.length > 0) {
            for(var i = 0; i < srci.length; i++) {
              tos.push(srci[i].value);
            }
          }

          if (iri.length > 0) {
            // var rm = shareResource.querySelector('.response-message');
            // if (rm) {
            //   rm.parentNode.removeChild(rm);
            // }
            // shareResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>');

            var sendNotifications = function(tos){
              return new Promise(function(resolve, reject){
                tos.forEach(function(to) {
                  var toInput = shareResource.querySelector('[value="' + to + '"]') || shareResource.querySelector('#share-resource-to');
                  toInput.parentNode.insertAdjacentHTML('beforeend', '<span class="progress"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>');

                  var inboxResponse = function() {
                    return DO.U.getEndpoint(DO.C.Vocab['ldpinbox']['@id'], to).then(
                        function(inboxes){
                          return inboxes[0];
                        },
                        function(reason){
                          console.log(reason);
                          return reason;
                        }
                      );
                  };

                  inboxResponse().then(
                    function(inbox) {
                      var notificationData = {
                        "type": ['as:Announce'],
                        "inbox": inbox,
                        "object": iri,
                        "to": to,
                        "summary": note,
                        "license": "https://creativecommons.org/licenses/by/4.0/"
                      };
// console.log(notificationData);
                      DO.U.notifyInbox(notificationData).then(
                        function(response) {
                          var location = response.xhr.getResponseHeader('Location');

                          if(typeof response !== 'undefined' && location) {
                            location = DO.U.getAbsoluteIRI(inbox, location);

                            toInput.parentNode.querySelector('.progress').innerHTML = '<span class="progress"><a target="_blank" href="' + location + '"><i class="fa fa-check-circle fa-fw"></i></a></span>';

                            // var rm = shareResource.querySelector('.response-message');
                            // rm.insertAdjacentHTML('beforeend', '<p class="success">Notification sent: <a target="_blank" href="' + location + '">' + location + '</a></p>');
                            // return location;
                          }
                          else {
                            toInput.parentNode.querySelector('.progress').innerHTML = '<span class="progress"><i class="fa fa-times-circle fa-fw "></i> Unable to notify. Try later.</span>';
                            // return Promise.reject(response);
                          }
                        },
                        function(reason) {
// console.log(reason);
                          toInput.parentNode.querySelector('.progress').innerHTML = '<span class="progress"><i class="fa fa-times-circle fa-fw "></i> Unable to notify. Try later.</span>';
//                           return reason;
                        }
                      );
                    },
                    function(reason) {
// console.log(reason);
                         toInput.parentNode.querySelector('.progress').innerHTML = '<span class="progress"><i class="fa fa-times-circle fa-fw "></i> Inbox not responding. Try later.</span>';
//                       return reason;
                    }
                  );
                });
              });
            };

            sendNotifications(tos);
          }
        }
      });
    },

    getResourceGraph: function(iri, headers, options){
      var defaultHeaders = {'Accept': DO.C.AvailableMediaTypes.join(',')};
      headers = headers || defaultHeaders;
      if (!('Accept' in headers)){
        Object.assign(headers, defaultHeaders);
      }
      options = options || {};
      var pIRI = DO.U.getProxyableIRI(iri);
      var options = {};
      if (iri.slice(0, 5).toLowerCase() == 'http:') {
        options['noCredentials'] = true;
      }

      return DO.U.getResource(pIRI, headers, options).then(
        function(response){
          var cT = response.xhr.getResponseHeader('Content-Type');
          var contentType = (cT) ? cT.split(';')[0].trim() : 'text/turtle';

          var options = {
            'contentType': contentType,
            'subjectURI': DO.U.stripFragmentFromString(iri)
          };

          return DO.U.getGraphFromData(response.xhr.responseText, options).then(
            function(g){
              var fragment = (iri.lastIndexOf('#') >= 0) ? iri.substr(iri.lastIndexOf('#')) : '';
              return SimpleRDF(DO.C.Vocab, options['subjectURI'], g, ld.store).child(pIRI + fragment);
            },
            function(reason) { return reason; }
          );
        },
        function(reason) { return reason; }
      );
    },

    getContacts: function(iri) {
      var processSameAs = function(s) {
        if (s.owlsameAs && s.owlsameAs._array.length > 0){
          var iris = s.owlsameAs._array;
          var promises = [];
          iris.forEach(function(iri){
// console.log(iri);
            if(iri != DO.C.User.IRI && DO.C.User.SameAs.indexOf(iri) < 0) {
              DO.C.User.SameAs.push(iri);
              DO.C.User.SameAs = DO.U.uniqueArray(DO.C.User.SameAs);
              promises.push(DO.U.getContacts(iri));
            }
          });

          return Promise.all(promises)
            .then(function(results) {
// console.log(results);
              return Promise.resolve(([].concat.apply([], results)));
            })
            .catch(function(e) {
              console.log('--- catch ---');
// console.trace();
              //probably e.xhr.status == 0
              console.log(e);
              return Promise.resolve([]);
            });
        }
        else {
          return Promise.resolve([]);
        }
      };

      var fyn = function(iri){
        if (iri == DO.C.User.IRI && DO.C.User.SameAs.indexOf(iri) < 0) {
          DO.C.User.TempKnows = DO.U.uniqueArray(DO.C.User.TempKnows.concat(DO.C.User.Knows));

          return processSameAs(DO.C.User.Graph);
        }
        else {
          return DO.U.getResourceGraph(iri).then(
            function(g){
// console.log(g);
              if(typeof g._graph == 'undefined') {
                return Promise.resolve([]);
              }
              var s = g.child(iri);
              if(s.foafknows && s.foafknows._array.length > 0){
                DO.C.User.TempKnows = DO.U.uniqueArray(DO.C.User.TempKnows.concat(s.foafknows._array));
              }
              if(s.schemaknows && s.schemaknows._array.length > 0){
                DO.C.User.TempKnows = DO.U.uniqueArray(DO.C.User.TempKnows.concat(s.schemaknows._array));
              }

              return processSameAs(s);
            },
            function(reason){
              return Promise.resolve([]);
            });
        }
      }

      return fyn(iri).then(function(i){ return DO.C.User.TempKnows; });
    },

    selectContacts: function(e, url) {
      e.target.parentNode.innerHTML = '<p>Select from contacts</p><ul id="share-resource-contacts"></ul>';
      var shareResourceContacts = document.getElementById('share-resource-contacts');

      if(DO.C.User.Contacts.length > 0){
        DO.C.User.Contacts.forEach(function(s){
          // console.log(s);
          DO.U.addShareResourceContactInput(shareResourceContacts, s);
        });
      }
      else {
        DO.U.getContacts(url).then(
          function(contacts) {
            if(contacts.length > 0) {
              contacts.forEach(function(url) {
                DO.U.getResourceGraph(url).then(
                  function(i) {
                    // console.log(i);
                    var s = i.child(url);
                    DO.C.User.Contacts.push(s);

                    DO.U.addShareResourceContactInput(shareResourceContacts, s);
                  },
                  function(reason){
                    // console.log(reason);
                    console.log('No profile: ' + url);
                  }
                );
              });
            }
            else {
              e.target.parentNode.innerHTML = 'No contacts with <i class="fa fa-inbox"></i> Inboxes found. Acquire <i class="fa fa-thermometer-empty"></i> cool friends‽</p><p>Optionally enter targets individually:</p>';
            }
          },
          function(reason) {
             console.log(reason);
          }
        );
      }
    },

    addShareResourceContactInput: function(node, s) {
      var iri = s.iri().toString();
// console.log(iri.toString());
      var id = encodeURIComponent(iri);
      var name = DO.U.getAgentName(s) || iri;
      var img = DO.U.getAgentImage(s);
      img = (img && img.length > 0) ? '<img alt="" height="32" src="' + img + '" width="32" />' : '';
      var input = '<li><input id="share-resource-contact-' + id + '" type="checkbox" value="' + iri + '" /><label for="share-resource-contact-' + id + '">' + img + '<a href="' + iri + '" target="_blank">' + name + '</a></label></li>';


      //TODO: This should update DO.C.User.Contacts' Inbox value so that it is not checked again when #share-resource-contacts input:checked
      if((s.ldpinbox && s.ldpinbox._array.length > 0) || (s.solidinbox && s.solidinbox._array.length > 0)) {
        node.insertAdjacentHTML('beforeend', input);
      }
      else {
        DO.U.getEndpointFromHead(DO.C.Vocab['ldpinbox']['@id'], iri).then(
          function(i){
            // console.log(iri + ' has Inbox: ' + i);

            node.insertAdjacentHTML('beforeend', input);
          },
          function(reason){
            // console.log(reason);
            // console.log(iri + ' has no Inbox.');
          }
        );
      }
    },

    nextLevelButton: function(button, url) {
      var final = document.getElementById('location-final');
      button.addEventListener('click', function(){
        if(button.parentNode.classList.contains('container')){
          DO.U.getResourceGraph(url).then(
            function(g){
              if(final){
                final.textContent = url + DO.U.generateAttributeId();
              }
              return DO.U.generateBrowserList(g, url);
            },
            function(reason){
              var inputBox = document.getElementById('browser-location');
              switch(reason.slice(-3)) { // TODO: simplerdf needs to pass status codes better than in a string.
                default:
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
                  break;
                case '404':
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Not found.</p></div>');
                  break;
                case '401': case '403':
                  var msg = 'You don\'t have permission to access this location.';
                  if(!DO.C.User.IRI){
                    msg += '</p><p>Try signing in to access your datastore.';
                  }
                  inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">' + msg + '</p></div>');
                  break;
              }
            }
          );
        }else{
          document.getElementById('browser-location-input').value = url;
          var alreadyChecked = button.parentNode.querySelector('input[type="radio"]').checked;
          var radios = button.parentNode.parentNode.querySelectorAll('input[checked="true"]');
          if(final){
            final.textContent = url;
          }
          for(var i = 0; i < radios.length; i++){
            radios[i].removeAttribute('checked');
          }
          if(alreadyChecked){
            button.parentNode.querySelector('input[type="radio"]').removeAttribute('checked');
          }else{
            button.parentNode.querySelector('input[type="radio"]').setAttribute('checked', 'true');
          }
        }
      }, false);
    },

    generateBrowserList: function(g, url) {
      return new Promise(function(resolve, reject){
        document.getElementById('browser-location-input').value = url;

        var msgs = document.getElementById('browser-location').querySelectorAll('.response-message');
        for(var i = 0; i < msgs.length; i++){
          msgs[i].parentNode.removeChild(msgs[i]);
        }

        var list = document.getElementById('browser-ul');
        list.innerHTML = '';

        var urlPath = DO.U.getUrlPath(url);
        if(urlPath.length > 4){ // This means it's not the base URL
          urlPath.splice(-2,2);
          var prevUrl = DO.U.forceTrailingSlash(urlPath.join("/"));
          var upBtn = '<li class="container"><input type="radio" name="containers" value="' + prevUrl + '" id="' + prevUrl + '" /><label for="' + prevUrl + '" id="browser-up">..</label></li>';
          list.insertAdjacentHTML('afterbegin', upBtn);
        }

        var current = g.child(url);
        var contains = current.ldpcontains;
        var containersLi = Array();
        var resourcesLi = Array();
        contains.forEach(function(c){
          var cg = g.child(c);
          var types = cg.rdftype;
          var resourceTypes = [];
          types.forEach(function(type){
            resourceTypes.push(type);
          });

          var path = DO.U.getUrlPath(c);
          if(resourceTypes.indexOf('http://www.w3.org/ns/ldp#Container') > -1){
            var slug = path[path.length-2];
            containersLi.push('<li class="container"><input type="radio" name="resources" value="' + c + '" id="' + slug + '"/><label for="' + slug + '">' + slug + '</label></li>');
          }
          else {
            var slug = path[path.length-1];
            resourcesLi.push('<li><input type="radio" name="resources" value="' + c + '" id="' + slug + '"/><label for="' + slug + '">' + slug + '</label></li>');
          }

        });
        containersLi.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        resourcesLi.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        var liHTML = containersLi.join('\n') + resourcesLi.join('\n');
        list.insertAdjacentHTML('beforeend', liHTML);

        var buttons = list.querySelectorAll('label');
        if(buttons.length <= 1){
          list.insertAdjacentHTML('beforeend', '<p><em>(empty)</em></p>');
        }

        for(var i = 0; i < buttons.length; i++) {
          var nextUrl = buttons[i].parentNode.querySelector('input').value;
          DO.U.nextLevelButton(buttons[i], nextUrl);
        }

        return resolve(list);
      });
    },

    setupResourceBrowser: function(parent){
      parent.insertAdjacentHTML('beforeend', '<div id="browser-location"><label for="browser-location-input">URL</label> <input type="text" id="browser-location-input" name="browser-location-input" placeholder="https://example.org/path/to/" /><button id="browser-location-update" disabled="disabled">Browse</button></div>\n\
      <div id="browser-contents"></div>');

      var triggerBrowse = function(url){
        var inputBox = document.getElementById('browser-location');
        if (url.length > 10 && url.match(/^https?:\/\//g) && url.slice(-1) == "/"){
          DO.U.getResourceGraph(url).then(function(g){
            DO.U.generateBrowserList(g, url).then(function(l){
              return l;
            },
            function(reason){
              console.log('???? ' + reason); // Probably no reason for it to get to here
            });
          },
          function(reason){
            var list = document.getElementById('browser-ul');
            switch(reason.slice(-3)) { // TODO: simplerdf needs to pass status codes better than in a string.
              default:
                inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
                break;
              case '404':
                inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Not found.</p></div>');
                break;
              case '401': case '403':
                var msg = 'You don\'t have permission to access this location.';
                if(!DO.C.User.IRI){
                  msg += '</p><p>Try signing in to access your datastore.';
                }
                inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">' + msg + '</p></div>');
                break;
            }
          });
        }else{
          inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">This is not a valid location.</p></div>');
        }
      }

      var inputBox = document.getElementById('browser-location');
      var storageBox = document.getElementById('browser-contents');
      var input = document.getElementById('browser-location-input');
      var browseButton = document.getElementById('browser-location-update');

      input.addEventListener('keyup', function(e){
        var final = document.getElementById('location-final');
        if (input.value.length > 10 && input.value.match(/^https?:\/\//g) && input.value.slice(-1) == "/") {
          browseButton.removeAttribute('disabled');
          if(e.which == 13){
            triggerBrowse(input.value);
          }
          if(final){
            var d = new Date();
            final.textContent = input.value + DO.U.generateAttributeId();
          }
        }
        else {
          browseButton.disabled = 'disabled';
          if(final){
            final.textContent = input.value;
          }
        }
      }, false);

      var browserul = document.getElementById('browser-ul');
      if(!browserul){
        browserul = document.createElement('ul');
        browserul.id = "browser-ul";

        storageBox.appendChild(browserul);
      }

      var storageUrl;
      DO.U.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
        function(url) {
          storageUrl = url[0];
        }
      ).then(
        function(i) {
          if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
            storageUrl = DO.U.forceTrailingSlash(DO.C.User.Storage[0]); // TODO: options for multiple storage
          }

          if(storageUrl){
            input.value = storageUrl;
            DO.U.getResourceGraph(storageUrl).then(function(g){
              DO.U.generateBrowserList(g, storageUrl);
            });
          }

          browseButton.addEventListener('click', function(){
            triggerBrowse(input.value);
          }, false);
          /* TODO: Replace/augment button with live updates from typing; this needs a delay on the keyup.
          document.getElementById('browser-location-input').addEventListener('keyup', function(){
            var url = this.value;
            DO.U.getGraph(url).then(function(g){
              DO.U.generateBrowserList(g, url);
            });
          }, false);
          */
        }
      ).then(
        function(i){
          document.getElementById('location-final').textContent = input.value + DO.U.generateAttributeId();
        }
      );
    },

    showResourceBrowser: function() {
      this.disabled = "disabled";
      var browserHTML = '<aside id="resource-browser" class="do on"><button class="close" title="Close">❌</button><h2>Resource Browser</h2></aside>';
      document.querySelector('body').insertAdjacentHTML('beforeend', browserHTML);

      document.getElementById('resource-browser').querySelector('button.close').addEventListener('click', function(e) {
        document.querySelector('#document-do .resource-browser').removeAttribute('disabled');
      }, false);

      DO.U.setupResourceBrowser(document.getElementById('resource-browser'));
    },

    openDocument: function(e) {
      if(typeof e !== 'undefined') {
        e.target.disabled = true;
      }
      document.body.insertAdjacentHTML('beforeend', '<aside id="open-document" class="do on"><button class="close" title="Close">❌</button><h2>Open Document</h2></aside>');

      var openDocument = document.getElementById('open-document');
      openDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-open').disabled = false;
        }
      });

      DO.U.setupResourceBrowser(openDocument);
      openDocument.insertAdjacentHTML('beforeend', '<button class="open">Open</button>');

      openDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.open')) {
          var openDocument = document.getElementById('open-document');
          var rm = openDocument.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }

          var bli = document.getElementById('browser-location-input');
          var iri = bli.value;
          var headers = { 'Accept': 'text/html, application/xhtml+xml' };
          var options = {};
          var pIRI = DO.U.getProxyableIRI(iri);
          if (pIRI.slice(0, 5).toLowerCase() == 'http:') {
            options['noCredentials'] = true;
          }
          DO.U.getResource(pIRI, headers, options).then(
            function(response){
// console.log(response);
              var cT = response.xhr.getResponseHeader('Content-Type');
              var contentType = (cT) ? cT.split(';')[0].trim() : 'text/turtle';
              // console.log(contentType);

              if(contentType == 'text/html' || contentType == 'application/xhtml+xml') {
                // var fragment = DO.U.fragmentFromString(response.xhr.responseText);
                var template = document.implementation.createHTMLDocument('template');
// console.log(template);
                template.documentElement.innerHTML = response.xhr.responseText;
// console.log(template);

                var documentHasDokieli = template.querySelectorAll('head script[src$="/do.js"]');
// console.log(documentHasDokieli);
// console.log(documentHasDokieli.length)
                if(documentHasDokieli.length == 0) {
                  var doFiles = ['font-awesome.min.css', 'do.css', 'simplerdf.js', 'medium-editor.min.js', 'do.js'];
                  doFiles.forEach(function(i){
// console.log(i);
                    var media = i.endsWith('.css') ? template.querySelectorAll('head link[rel~="stylesheet"][href$="/' + i + '"]') : template.querySelectorAll('head script[src$="/' + i + '"]');
// console.log(media);
// console.log(media.length)
                    if (media.length == 0) {
                      switch(i) {
                        case 'font-awesome.min.css':
                          template.querySelector('head').insertAdjacentHTML('beforeend', '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all" rel="stylesheet" />');
                          break;
                        case 'do.css':
                          template.querySelector('head').insertAdjacentHTML('beforeend', '<link href="https://dokie.li/media/css/' + i + '" media="all" rel="stylesheet" />');
                          break;
                        case 'simplerdf.js': case 'medium-editor.min.js': case 'do.js':
                          template.querySelector('head').insertAdjacentHTML('beforeend', '<script src="https://dokie.li/scripts/' + i + '"></script>')
                          break;
                      }
                    }
// console.log(template)
                  });

                  document.documentElement.removeAttribute('id');
                  document.documentElement.removeAttribute('class');
                  document.documentElement.innerHTML = template.documentElement.innerHTML;
                  history.pushState(null, null, iri);
                  DO.U.init();
                  // openDocument.parentNode.removeChild(openDocument);
                }
                else {
                  window.open(iri, '_blank');
                  return;
                }
              }
              else {
                //TODO: Handle server returning wrong Response/Content-Type for the Request/Accept
              }

            },
            function(reason){
              console.log(reason);
            }
          );
        }
      });
    },

    createNewDocument: function(e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="create-new-document" class="do on"><button class="close" title="Close">❌</button><h2>Create New Document</h2></aside>');

      var newDocument = document.getElementById('create-new-document');
      newDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-new').disabled = false;
        }
      });

      DO.U.setupResourceBrowser(newDocument);
      document.getElementById('browser-location').insertAdjacentHTML('afterbegin', '<p>Choose a location to save your new article.</p>');
      newDocument.insertAdjacentHTML('beforeend', DO.U.getBaseURLSelection() + '<p>Your new document will be saved at <samp id="location-final">https://example.org/path/to/article</samp></p><button class="create">Create</button>');
      var bli = document.getElementById('browser-location-input');
      bli.focus();
      bli.placeholder = 'https://example.org/path/to/article';

      newDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.create')) {
          var newDocument = document.getElementById('create-new-document');
          var storageIRI = newDocument.querySelector('#location-final').innerText.trim();
          var rm = newDocument.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }

          var html = document.documentElement.cloneNode(true);
          var baseURLSelectionChecked = newDocument.querySelector('select[name="base-url"]');
// console.log(baseURLSelectionChecked);
          if (baseURLSelectionChecked.length > 0) {
            var baseURLType = baseURLSelectionChecked.value;
            var nodes = html.querySelectorAll('head link, [src], object[data]');
            if (baseURLType == 'base-url-relative') {
              DO.U.copyRelativeResources(storageIRI, nodes);
            }
            nodes = DO.U.rewriteBaseURL(nodes, baseURLType);
          }

          html.querySelector('main article').innerHTML = '';
          html.querySelector('head title').innerHTML = '';
          html = DO.U.getDocument(html);

          DO.U.putResource(storageIRI, html).then(
            function(i) {
              newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="success">New document created at <a href="' + storageIRI + '?author=true">' + storageIRI + '</a></p></div>');
              window.open(storageIRI + '?author=true', '_blank');
            },
            function(reason) {
              switch(reason.status) {
                default:
                  newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to create new.</p>');
                  break;
                case 0: case 405:
                  newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to create new: this location is not writeable.</p></div>');
                  break;
                case 401: case 403:
                  newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to create new: you don\'t have permission to write here.</p></div>');
                  break;
                case 406:
                  newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to create new: enter a name for your resource.</p></div>');
                  break;
              }
              console.log(reason);
            }
          );
        }
      });
    },

    saveAsDocument: function(e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="save-as-document" class="do on"><button class="close" title="Close">❌</button><h2>Save As Document</h2></aside>');

      var saveAsDocument = document.getElementById('save-as-document');
      saveAsDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-save-as').disabled = false;
        }
      });

      DO.U.setupResourceBrowser(saveAsDocument);
      document.getElementById('browser-location').insertAdjacentHTML('afterbegin', '<p>Choose a location to save your new article.</p>');
      saveAsDocument.insertAdjacentHTML('beforeend', DO.U.getBaseURLSelection() + '<p>Your new document will be saved at <samp id="location-final">https://example.org/path/to/article</samp></p><p><input type="checkbox" id="derivation-data" name="derivation-data" checked="checked"><label for="derivation-data">Derivation data</label></p><button class="create">Save</button>');

      var bli = document.getElementById('browser-location-input');
      bli.focus();
      bli.placeholder = 'https://example.org/path/to/article';

      saveAsDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.create')) {
          var currentDocumentURL = window.location.origin + window.location.pathname;
          var saveAsDocument = document.getElementById('save-as-document');
          var storageIRI = saveAsDocument.querySelector('#location-final').innerText.trim();
          var rm = saveAsDocument.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }

          var html = document.documentElement.cloneNode(true);
          var wasDerived = document.querySelector('#derivation-data');
          if (wasDerived.checked) {
            var wasDerivedOn = DO.U.getDateTimeISO();
            html.querySelector('main article').insertAdjacentHTML('beforebegin', '<dl id="document-derived-from"><dt>Derived From</dt><dd><a href="' + currentDocumentURL + '" rel="prov:wasDerivedFrom">' + currentDocumentURL + '</a></dd></dl><dl id="document-derived-on"><dt>Derived On</dt><dd><time datetime="' + wasDerivedOn + '">' + wasDerivedOn + '</time></dd></dl>' + "\n");
            var baseURLSelectionChecked = saveAsDocument.querySelector('select[name="base-url"]');
            if (baseURLSelectionChecked.length > 0) {
              var baseURLType = baseURLSelectionChecked.value;
              var nodes = html.querySelectorAll('head link, [src], object[data]');
              if (baseURLType == 'base-url-relative') {
                DO.U.copyRelativeResources(storageIRI, nodes);
              }
              nodes = DO.U.rewriteBaseURL(nodes, baseURLType);
            }
          }
          html = DO.U.getDocument(html);

          DO.U.putResource(storageIRI, html).then(
            function(i) {
              saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="success">Document saved at <a href="' + storageIRI + '?author=true">' + storageIRI + '</a></p></div>');
              window.open(storageIRI + '?author=true', '_blank');
            },
            function(reason) {
              switch(reason.status) {
                default:
                  saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to save.</p></div>');
                  break;
                case 0: case 405:
                  saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to save: this location is not writeable.</p></div>');
                  break;
                case 401: case 403:
                  saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to save: you don\'t have permission to write here.</p></div>');
                  break;
                case 406:
                  saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to save: enter a name for your resource.</p></div>');
                  break;
              }
              console.log(reason);
            }
          );
        }
      });
    },

    viewSource: function(e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="source-view" class="do on"><button class="close" title="Close">❌</button><h2>Source</h2><textarea id="source-edit" rows="24" cols="80"></textarea><p><button class="create">Update</button></p></aside>');
      var sourceBox = document.getElementById('source-view');
      var input = document.getElementById('source-edit');
      input.value = DO.U.getDocument();

      sourceBox.addEventListener('click', function(e) {
        if (e.target.matches('button.create')) {
          var url = window.location.origin + window.location.pathname;
          var data = document.getElementById('source-edit').value;
          document.documentElement.innerHTML = data;
          DO.U.showDocumentInfo();
          DO.U.showDocumentMenu(e);
          DO.U.viewSource();
          document.querySelector('#document-do .resource-source').disabled = true;
        }

        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-source').disabled = false;
        }
      });
    },

    getBaseURLSelection: function() {
      return '<div id="base-url-selection"><label>Location of media resources:</label>\n\
      <select name="base-url">\n\
      <option id="base-url-absolute" value="base-url-absolute" selected="selected">Use references as is</option>\n\
      <option id="base-url-relative" value="base-url-relative">Copy to your storage</option>\n\
      </select>\n\
      </div>';
    },

    rewriteBaseURL: function(nodes, urlType) {
      urlType = urlType || 'base-url-absolute';
      if (typeof nodes === 'object' && nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var url, ref;
          switch(node.tagName.toLowerCase()) {
            default:
              url = node.getAttribute('src');
              ref = 'src';
              break;
            case 'link':
              url = node.getAttribute('href');
              ref = 'href';
              break;
            case 'object':
              url = node.getAttribute('data');
              ref = 'data';
              break;
          }

          var p = url.slice(0, 4);
          if (p != 'http' && p != 'file') {
            url = DO.U.setBaseURL(url, urlType);
          }
          node.setAttribute(ref, url);
        };
      }

      return nodes;
    },

    setBaseURL: function(url, urlType) {
      urlType = urlType || 'base-url-absolute';
      var matches = [];
      var regexp = /(https?:\/\/([^\/]*)\/|file:\/\/\/)?(.*)/;

      matches = url.match(regexp);
      if (matches) {
        switch(urlType) {
          case 'base-url-absolute': default:
            url = DO.U.getBaseURL(document.location.href) + matches[3].replace(/^\//g, '');
            break;
          case 'base-url-relative':
            url = matches[3].replace(/^\//g, '');
            break;
        }
      }

      return url;
    },

    getBaseURL: function(url) {
      if(typeof url === 'string') {
        url = url.substr(0, url.lastIndexOf('/') + 1);
      }

      return url;
    },

    getPathURL: function(url) {
      if(typeof url === 'string') {
        var i  = url.indexOf('?');
        if(i > -1) {
          url = url.substr(0, i);
        }
        i = url.indexOf('#');
        if(i > -1) {
          url = url.substr(0, i);
        }
      }

      return url;
    },

    //I want HTTP COPY and I want it now!
    copyResource: function(fromURL, toURL, options) {
      if (fromURL != '' && toURL != '') {
        var http = new XMLHttpRequest();
        http.open('GET', fromURL);
        if (!options.noCredentials) {
          http.withCredentials = true;
        }
        http.onreadystatechange = function() {
          if (this.readyState == this.DONE) {
            if (this.status === 200 || this.status === 201 || this.status === 204) {
              var responseText = this.responseText;
              var contentType = this.getResponseHeader('Content-Type');
              DO.U.putResource(toURL, responseText, contentType);
            }
          }
        };
        http.send();
      }
    },

    copyRelativeResources: function(storageIRI, relativeNodes) {
      var ref = '';
      var baseURL = DO.U.getBaseURL(storageIRI);

      for (var i = 0; i < relativeNodes.length; i++) {
        var node = relativeNodes[i];
        switch(node.tagName.toLowerCase()) {
          default:
            ref = 'src';
            break;
          case 'link':
            ref = 'href';
            break;
          case 'object':
            ref = 'data';
            break;
        }

        var fromURL = node.getAttribute(ref);
        var p = fromURL.slice(0, 4);
        if (p != 'http' && p != 'file') {
          var pathToFile = DO.U.setBaseURL(fromURL, 'base-url-relative');
          var toURL = baseURL + pathToFile.replace(/^\//g, '');
          DO.U.copyResource(fromURL, toURL);
         }
      };
    },

    initStorage: function(item) {
      if (typeof window.localStorage != 'undefined') {
        DO.U.enableStorage(item);
      }
    },
    enableStorage: function(item) {
      DO.C.UseStorage = true;
      if(localStorage.getItem(item)) {
        document.documentElement.innerHTML = localStorage.getItem(item);
      }
      console.log(DO.U.getDateTimeISO() + ': Storage enabled.');
      DO.U.enableAutoSave(item);
    },
    disableStorage: function(item) {
      DO.C.UseStorage = false;
      localStorage.removeItem(item);
      DO.U.disableAutoSave(item);
      console.log(DO.U.getDateTimeISO() + ': Storage disabled.');
    },
    saveStorage: function(item) {
      switch(item) {
        case 'html': default:
          var object = DO.U.getDocument();
          break;
      }
      localStorage.setItem(item, object);
      console.log(DO.U.getDateTimeISO() + ': Document saved.');
    },
    enableAutoSave: function(item) {
      DO.C.AutoSaveId = setInterval(function() { DO.U.saveStorage(item) }, DO.C.AutoSaveTimer);
      console.log(DO.U.getDateTimeISO() + ': Autosave enabled.');
    },
    disableAutoSave: function(item) {
      clearInterval(DO.C.AutoSaveId);
      DO.C.AutoSaveId = '';
      console.log(DO.U.getDateTimeISO() + ': Autosave disabled.');
    },
    showStorage: function(node) {
      if (typeof window.localStorage != 'undefined') {
        var useStorage, checked;

        if (DO.C.UseStorage) {
          if (DO.C.AutoSaveId) {
            checked = ' checked="checked"';
          }
          useStorage = DO.C.DisableStorageButtons + '<input id="local-storage-html-autosave" class="autosave" type="checkbox"' + checked +' /> <label for="local-storage-html-autosave"><i class="fa fa-clock-o"></i> 1m autosave</label>';
        }
        else {
          useStorage = DO.C.EnableStorageButtons;
        }

        node.insertAdjacentHTML('beforeend', '<section id="local-storage" class="do"><h2>Local Storage</h2><p>' + useStorage + '</p></section>');

        document.getElementById('local-storage').addEventListener('click', function(e) {
          if (e.target.closest('button.local-storage-enable-html')) {
            e.target.outerHTML = DO.C.DisableStorageButtons;
            DO.U.enableStorage('html');
          }

          if (e.target.closest('button.local-storage-disable-html')) {
            e.target.outerHTML = DO.C.EnableStorageButtons;
            DO.U.disableStorage('html');
          }

          if (e.target.matches('input.autosave')) {
            if (e.target.getAttribute('checked')) {
              e.target.removeAttribute('checked');
              DO.U.disableAutoSave('html');
            }
            else {
              e.target.setAttribute('checked', 'checked');
              DO.U.enableAutoSave('html');
            }
          }
        });
      }
    },
    hideStorage: function() {
      if (DO.C.UseStorage) {
        var ls = document.getElementById('local-storage');
        ls.parentNode.removeChild(ls);
      }
    },

    getDateTimeISO: function() {
      var date = new Date();
      return date.toISOString();
    },

    createAttributeDateTime: function(element) {
      //Creates datetime attribute.
      //TODO: Include @data-author for the signed in user e.g., WebID or URL.
      var a = DO.U.getDateTimeISO();

      switch(element) {
        case 'mark': case 'article':
          a = 'data-datetime="' + a + '"';
          break;
        case 'del': case 'ins':
          a = 'datetime="' + a + '"';
          break;
        default:
          a = '';
          break;
      }

      return a;
    },

    getCitation: function(i, options) {
      var iri = i;
      // if (typeof options !== 'undefined' && 'type' in options && options.type == 'doi') {
      if (i.toLowerCase().slice(0,4) !== 'http') {
//        iri = 'http://dx.doi.org/' + i.trim();
        iri = 'http://data.crossref.org/' + i.trim();
      }
      else {
        var x = iri.toLowerCase().trim().split('/');
        if (x[2] == 'doi.org' || x[2] == 'dx.doi.org') {
          var y = x[0] + '//' + x[2] + '/';
          iri = 'http://data.crossref.org/' + iri.substr(y.length, iri.length);
        }
      }
//console.log(iri);

      return DO.U.getResourceGraph(iri);
    },

    getCitationHTML: function(citationGraph, citationURI, options) {
      options = options || {};
      // var citationId = ('citationId' in options) ? options.citationId : citationURI;
      var subject = citationGraph.child(citationURI);
// console.log(citationGraph);
// console.log('citationGraph.iri().toString(): ' + citationGraph.iri().toString());
// console.log('citationGraph.toString(): ' + citationGraph.toString());
// console.log('options.citationId: ' + options.citationId);
// console.log('citationURI: ' + citationURI);
// console.log('subject.iri().toString(): ' + subject.iri().toString());

      var title = DO.U.getResourceLabel(subject);
      //FIXME: This is a stupid hack because RDFa parser is not setting the base properly.
      if(typeof title == 'undefined') {
        subject = citationGraph.child(options.citationId);

        title = DO.U.getResourceLabel(subject) || '';
      }
      title = title.replace(/ & /g, " &amp; ");
      title = (title.length > 0) ? '<cite>' + title + '</cite>, ' : '';
      var datePublished = subject.schemadatePublished || subject.dctermsissued || subject.dctermsdate || subject.dctermscreated || '';
      datePublished = (datePublished) ? datePublished.substr(0,4) + ', ' : '';
      var dateAccessed = 'Accessed: ' + DO.U.getDateTimeISO();
      var authors = [], authorList = [];
// console.log(subject);
// console.log(subject.biboauthorList);
// console.log(subject.schemaauthor);
// console.log(subject.dctermscreator);

      //XXX: FIXME: Putting this off for now because SimpleRDF is not finding the bnode for some reason in citationGraph.child(item), or at least authorItem.rdffirst (undefined)
//       if (subject.biboauthorList) {
//         var traverseRDFList = function(item) {
//           var authorItem = citationGraph.child(item);
// // console.log(authorItem);
// // console.log(authorItem.iri().toString());
// // console.log(authorItem.rdffirst);
// // console.log(authorItem.rdfrest);
//           if (authorItem.rdffirst) {
//             authorList.push(authorItem.rdffirst);
//           }
//           if (authorItem.rdfrest && authorItem.rdfrest !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil') {
//             traverseRDFList(authorItem.rdfrest);
//           }
//         };

//         traverseRDFList(subject.biboauthorList);
//       }
//       else
      if (subject.schemaauthor && subject.schemaauthor._array.length > 0) {
        subject.schemaauthor.forEach(function(a) {
          authorList.push(a);
        });
      }
      else if (subject.dctermscreator && subject.dctermscreator._array.length > 0) {
        subject.dctermscreator.forEach(function(a) {
          authorList.push(a);
        });
      }
      else if (subject.asactor && subject.asactor._array.length > 0) {
        subject.asactor.forEach(function(a) {
          authorList.push(a);
        });
      }
// console.log(authorList);

      if(authorList.length > 0) {
        authorList.forEach(function(authorIRI) {
          var s = subject.child(authorIRI);
          var author = DO.U.getAgentName(s);

          if (s.schemafamilyName && s.schemafamilyName.length > 0 && s.schemagivenName && s.schemagivenName.length > 0) {
            author = DO.U.createRefName(s.schemafamilyName, s.schemagivenName);
          }
          else if (s.foaffamilyName && s.foaffamilyName.length > 0 && s.foafgivenName && s.foafgivenName.length > 0) {
            author = DO.U.createRefName(s.foaffamilyName, s.foafgivenName);
          }

          if (author !== '') {
            authors.push(author);
          }
          else {
            authors.push(authorIRI);
          }
        });
        authors = authors.join(', ') + ': ';
      }

      var content = ('content' in options && options.content.length > 0) ? options.content + ', ' : '';

      var citationReason = 'Reason: ' + DO.C.Citation[options.citationRelation];

      var citationHTML = authors + title + datePublished + content + '<a about="#' + options.refId + '" href="' + options.citationId + '" rel="schema:citation ' + options.citationRelation  + '">' + options.citationId + '</a> [' + dateAccessed + ', ' + citationReason + ']';
//console.log(citationHTML);
      return citationHTML;
    },

    createRefName: function(familyName, givenName, refType) {
      refType = refType || DO.C.DocRefType;
      switch(refType) {
        case 'LNCS': default:
          return familyName + ', ' + givenName.slice(0,1) + '.';
          break;
        case 'ACM':
          return givenName.slice(0,1) + '. ' + familyName;
          break;
        case 'fullName':
          return givenName + ' ' + familyName;
          break;
      }
    },

    highlightItems: function() {
      var highlights = document.body.querySelectorAll('*[class*="highlight-"]');
      for (var i = 0; i < highlights.length; i++) {
        highlights[i].addEventListener('mouseenter', function(e) {
          var c = e.target.getAttribute('class');
          var highlightsX = document.body.querySelectorAll('*[class*="'+ c +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.add('do', 'highlight');
          }
        });

        highlights[i].addEventListener('mouseleave', function(e) {
          var c = e.target.getAttribute('class');
          var highlightsX = document.body.querySelectorAll('*[class*="'+ c +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.remove('do', 'highlight');
          }
        });
      }
    },

    hashCode: function(s){
      var hash = 0;
      if (s.length == 0) return hash;
      for (i = 0; i < s.length; i++) {
        var char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },

    generateAttributeId: function(prefix, string) {
      prefix = prefix || '';

      if (string) {
        //XXX: I think we want to trim.
        string = string.trim();
        string = string.replace(/\W/g,'-');
        s1 = string.substr(0, 1);
        string = (prefix === '' && s1 == parseInt(s1)) ? 'x-' + string : prefix + string;
        return (document.getElementById(string)) ? string + '-x' : string;
      }
      else {
        return DO.U.generateUUID();
      }
    },

    // MIT license
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    generateUUID: function() {
      var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
      var s = function() {
        var d0 = Math.random()*0xffffffff|0;
        var d1 = Math.random()*0xffffffff|0;
        var d2 = Math.random()*0xffffffff|0;
        var d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
      };
      return s();
    },

    //http://stackoverflow.com/a/25214113
    fragmentFromString: function(strHTML) {
      return document.createRange().createContextualFragment(strHTML);
    },

    SPARQLQueryURL: {
      getResourcesOfTypeWithLabel: function(sparqlEndpoint, resourceType, textInput, options) {
        options = options || {};
        var labelsPattern = '', resourcePattern = '';

        if(!('lang' in options)) {
          options['lang'] = 'en';
        }

        if ('filter' in options) {
          if(resourceType == '<http://purl.org/linked-data/cube#DataSet>' || resourceType == 'qb:DataSet'
            && 'dimensionRefAreaNotation' in options.filter) {
              var dimensionPattern, dimensionDefault = '';
              var dataSetPattern = "\n\
    [] qb:dataSet ?resource";
            if ('dimensionProperty' in options.filter) {
              dimensionPattern = " ; " + options.filter.dimensionProperty;
            }
            else {
              var dimensionDefault = " .\n\
  { SELECT DISTINCT ?propertyRefArea WHERE { ?propertyRefArea rdfs:subPropertyOf* sdmx-dimension:refArea . } }";
              dimensionPattern = " ; ?propertyRefArea ";

            }
            var notationPattern = " [ skos:notation '" + options.filter.dimensionRefAreaNotation.toUpperCase() + "' ] ."
          }
          resourcePattern = dimensionDefault + dataSetPattern + dimensionPattern + notationPattern;
        }

        labelsPattern = "\n\
  ";
        if ('optional' in options) {
          if('prefLabels' in options.optional) {
            if (options.optional.prefLabels.length == 1) {
              labelsPattern += "  ?resource " + options.optional.prefLabels[0] + " ?prefLabel .";
            }
            else {
              labelsPattern += "  VALUES ?labelProperty {";
              options.optional.prefLabels.forEach(function(property){
                labelsPattern += ' ' + property;
              });
              labelsPattern += " } ?resource ?labelProperty ?prefLabel .";
            }
          }
        }
        else {
          labelsPattern += "  ?resource rdfs:label ?prefLabel .";
        }


//  FILTER (!STRSTARTS(STR(?resource), 'http://purl.org/linked-data/sdmx/'))\n\
      var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\
PREFIX dcterms: <http://purl.org/dc/terms/>\n\
PREFIX qb: <http://purl.org/linked-data/cube#>\n\
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>\n\
PREFIX sdmx-measure: <http://purl.org/linked-data/sdmx/2009/measure#>\n\
CONSTRUCT {\n\
  ?resource skos:prefLabel ?prefLabel .\n\
}\n\
WHERE {\n\
  ?resource a " + resourceType + " ."
+ labelsPattern + "\n\
  FILTER (CONTAINS(LCASE(?prefLabel), '" + textInput + "') && (LANG(?prefLabel) = '' || LANGMATCHES(LANG(?prefLabel), '" + options.lang + "')))"
+ resourcePattern + "\n\
}";
       return sparqlEndpoint + "?query=" + DO.U.encodeString(query);
      },

      getObservationsWithDimension: function(sparqlEndpoint, dataset, paramDimension, options) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\
PREFIX dcterms: <http://purl.org/dc/terms/>\n\
PREFIX qb: <http://purl.org/linked-data/cube#>\n\
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>\n\
PREFIX sdmx-measure: <http://purl.org/linked-data/sdmx/2009/measure#>\n\
CONSTRUCT {\n\
  ?observation sdmx-dimension:refPeriod ?refPeriod .\n\
  ?observation sdmx-measure:obsValue ?obsValue .\n\
}\n\
WHERE {\n\
  ?observation qb:dataSet <" + dataset + "> .\n\
  " + paramDimension + "\n\
  ?propertyRefPeriod rdfs:subPropertyOf* sdmx-dimension:refPeriod .\n\
  ?observation ?propertyRefPeriod ?refPeriod .\n\
  ?propertyMeasure rdfs:subPropertyOf* sdmx-measure:obsValue .\n\
  ?observation ?propertyMeasure ?obsValue .\n\
}";

        return sparqlEndpoint + "?query=" + DO.U.encodeString(query);
      },
    },

    getSparkline: function(data, options) {
      options = options || {};
      if(!('cssStroke' in options)) {
        options['cssStroke'] = '#333';
      }

      var svg = '<svg height="100%" prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# xsd: http://www.w3.org/2001/XMLSchema# qb: http://purl.org/linked-data/cube# prov: http://www.w3.org/ns/prov# schema: http://schema.org/" version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">/*<![CDATA[*/line { stroke:' + options.cssStroke + '; stroke-width:1px; } circle { stroke:#f00; fill:#f00; }/*]]>*/</style>';

      svg += DO.U.drawSparklineGraph(data, options);
      svg += '</svg>';

      return svg;
    },

    drawSparklineGraph: function(data, options) {
      options = options || {};
      if(!('cssStroke' in options)) {
        options['cssStroke'] = '#333';
      }
      var svg= '';

      var obsValue = 'http://purl.org/linked-data/sdmx/2009/measure#obsValue';
      var observation = 'http://purl.org/linked-data/cube#Observation';

      var dotSize = 1;
      var values = data.map(function(n) { return n[obsValue]; }),
        min = Math.min.apply(null, values),
        max = Math.max.apply(null, values);

      var new_max = 98;
      var new_min = 0;
      var range = new_max - new_min;

      var parts = values.map(function (v) {
        return (new_max - new_min) / (max - min) * (v - min) + new_min || 0;
      });

      var div = 100 / parts.length;
      var x1 = 0, y1 = 0, x2 = div / 2, y2 = range - parts[0];

      var lines = '';
      for (var i=0; i < parts.length; i++) {
        x1 = x2; y1 = y2;
        x2 = range * (i / parts.length) + (div / 2);
        y2 = range - parts[i];

        lines += '<a rel="rdfs:seeAlso" resource="' + data[i][observation] + '" target="_blank" xlink:href="' + data[i][observation] + '"><line' +
          ' x1="' + x1 + '%"' +
          ' x2="' + x2 + '%"' +
          ' y1="' + y1 + '%"' +
          ' y2="' + y2 + '%"' +
          ' /></a>';

        //Last data item
        if(i+1 === parts.length) {
          lines += '<a target="_blank" xlink:href="' + data[i][observation] + '"><circle' +
            ' cx="' + x2 + '%"' +
            ' cy="' + y2 + '%"' +
            ' r="' + dotSize + '"' +
            ' /></a>';
        }
      }

      var wasDerivedFrom = '';
      if(options && 'url' in options) {
        wasDerivedFrom = ' rel="prov:wasDerivedFrom" resource="' + options.url + '"';
      }
      svg += '<g' + wasDerivedFrom + '>';
      svg += '<metadata rel="schema:license" resource="https://creativecommons.org/publicdomain/zero/1.0/" />';
      if (options && 'title' in options) {
        svg += '<title property="schema:name">' + options['title'] + '</title>';
      }
      svg += lines + '</g>';

      return svg;
    },

    getTriplesFromGraph: function(url) {
      return DO.U.getGraph(url)
        .then(function(i){
          return i.graph();
        })
        .catch(function(error){
          console.log(error);
        });
    },

    sortTriples: function(triples, options) {
      options = options || {};
      if(!('sortBy' in options)) {
        options['sortBy'] = 'object';
      }

      triples._graph.sort(function (a, b) {
        return a[options.sortBy].nominalValue.toLowerCase().localeCompare(b[options.sortBy].nominalValue.toLowerCase());
      });

      return triples;
    },

    getListHTMLFromTriples: function(triples, options) {
      options = options || {element: 'ul'};
      var elementId = ('elementId' in options) ? ' id="' + options.elementId + '"' : '';
      var elementName = ('elementId' in options) ? ' name="' + options.elementId + '"' : '';
      var elementTitle = ('elementId' in options) ? options.elementId : '';
      var items = '';
      triples.forEach(function(t){
        var s = t.subject.nominalValue;
        var o = t.object.nominalValue;
        switch(options.element) {
          case 'ol': case 'ul': default:
            items += '<li><a href="' + s + '">' + o + '</a></li>';
            break;
          case 'dl':
            items += '<dd><a href="' + s + '">' + o + '</a></dd>';
            break;
          case 'select':
            items += '<option value="' +   s + '">' + o + '</option>';
            break;
        }
      });

      switch(options.element) {
        case 'ul': default:
          return '<ul' + elementId + '>' + items + '</ul>';
        case 'ol':
          return '<ol' + elementId + '>' + items + '</ol>';
        case 'dl':
          return '<dl' + elementId + '><dt>' + elementTitle + '</dt>' + items + '</dl>';
        case 'select':
          return '<select' + elementId + elementName + '>' + items + '</select>';
      }
    },

    showAsTabs: function(id) {
      document.querySelector('#' + id + ' nav').addEventListener('click', function(e) {
        var a = e.target;
        if (a.matches('a')) {
          e.preventDefault();
          e.stopPropagation();

          var li = a.parentNode;
          if(!li.classList.contains('class')) {
            var navLi = document.querySelectorAll('#' + id + ' nav li');
            for (var i = 0; i < navLi.length; i++) {
              navLi[i].classList.remove('selected');
            }
            li.classList.add('selected');
            var figures = document.querySelectorAll('#' + id + ' > figure');
            for (var i = 0; i < figures.length; i++) {
              figures[i].classList.remove('selected');
            }
            document.querySelector('#' + id + ' > figure' + a.hash).classList.add('selected');
          }
        }
      });
    },

    getReferenceLabel: function(motivatedBy) {
      var s = '🗨';
      motivatedBy = motivatedBy || '';
      //TODO: uriToPrefix
      motivatedBy = (motivatedBy.length > 0 && motivatedBy.slice(0, 4) == 'http' && motivatedBy.indexOf('#') > -1) ? 'oa:' + motivatedBy.substr(motivatedBy.lastIndexOf('#') + 1) : motivatedBy;

      switch(motivatedBy) {
        default: break;
        case 'oa:assessing':  s = '✪'; break;
        case 'oa:commenting': s = '🗨'; break;
        case 'oa:bookmark':   s = '🔖'; break;
        case 'oa:replying':   s = '💬'; break;
        case 'oa:describing': s = '※'; break;
      }

      return s;
    },

    showRefs: function() {
      var refs = document.querySelectorAll('span.ref');
      for (var i = 0; i < refs.length; i++) {
// console.log(this);
        var ref = refs[i].querySelector('mark[id]');
// console.log(ref);
        if (ref) {
          var refId = ref.id;
// console.log(refId);
          var refA = refs[i].querySelectorAll('[class*=ref-] a');
// console.log(refA);
          for (var j = 0; j < refA.length; j++) {
            //XXX: Assuming this is always an internal anchor?
            var noteId = refA[j].getAttribute('href').substr(1);
// console.log(noteId);
            var refLabel = refA[j].textContent;
// console.log(refLabel);

// console.log(refId + ' ' +  refLabel + ' ' + noteId);
            DO.U.positionNote(refId, refLabel, noteId);
          }
        }
      }
    },

    positionNote: function(refId, refLabel, noteId) {
      var ref = document.getElementById(refId);
      var note = document.getElementById(noteId);

      if (note.hasAttribute('style')) {
        note.removeAttribute('style');
      }

      //TODO: If there are articles already in the aside.note , the subsequent top values should come after one another
      var style = [
        'top: ' + Math.ceil(ref.parentNode.offsetTop) + 'px'
      ].join('; ');
      note.setAttribute('style', style);
    },

    positionInteraction: function(noteIRI, containerNode) {
      containerNode = containerNode || document.body;
      var pIRI = DO.U.getProxyableIRI(noteIRI);

      return DO.U.getGraph(pIRI)
        .then(
          function(i) {
            var note = i.child(noteIRI);
// console.log(note);
            var id = String(Math.abs(DO.U.hashCode(noteIRI)));
            var refId = 'r-' + id;
            var refLabel = id;

            var datetime = note.schemadatePublished || note.dctermscreated || note.aspublished;
// console.log(datetime);
            var annotatedBy = note.schemacreator || note.dctermscreator || note.asactor;
            var annotatedByIRI;
// console.log(annotatedBy);
            if (annotatedBy && annotatedBy.at(0)) {
              annotatedByIRI = annotatedBy.at(0);
// console.log(annotatedByIRI);
              annotatedBy = i.child(annotatedByIRI);
// console.log(annotatedBy);
            }
            var annotatedByName = DO.U.getAgentName(annotatedBy);
// console.log(annotatedByName);
            var annotatedByImage = DO.U.getAgentImage(annotatedBy);
// console.log(annotatedByImage);
            var annotatedByURL = annotatedBy.schemaurl || '';
            annotatedByURL = (annotatedByURL) ? annotatedByURL : undefined;

            var licenseIRI = note.schemalicense || note.dctermsrights || undefined;
// console.log(licenseIRI);

            var motivatedBy = 'oa:replying';

            var bodyText = note.schemadescription;
            if(!bodyText) {
              bodyText = note.dctermsdescription;
              if(!bodyText)  {
                bodyText = note.ascontent;
              }
            }

            var types = note.rdftype;
// console.log(types);
            var resourceTypes = [];
            types.forEach(function(type){
              resourceTypes.push(type);
// console.log(type);
            });

            if(resourceTypes.indexOf('http://www.w3.org/ns/oa#Annotation') > -1) {
              var body = i.child(note.oahasBody);
// console.log(body);
              var bodyLicenseIRI = body.schemalicense || body.dctermsrights || undefined;
// console.log(bodyLicenseIRI);
              bodyText = body.rdfvalue;
// console.log(bodyText);
              var target = i.child(note.oahasTarget);
// console.log(target);
              var targetIRI = target.iri().toString();
// console.log(targetIRI);

              var source = target.oahasSource;
// console.log(source);
// console.log(note.oamotivatedBy);

              if(note.oamotivatedBy) {
                motivatedBy = note.oamotivatedBy;
                refLabel = DO.U.getReferenceLabel(motivatedBy);
              }

              var exact, prefix, suffix;
              var selector = target.oahasSelector;
              if(selector) {
                selector = i.child(selector);
// console.log(selector);

// console.log(selector.rdftype);
// console.log(selector.rdftype._array);
                //FIXME: This is taking the first rdf:type. There could be multiple.
                var selectorTypes;
                if (selector.rdftype && selector.rdftype.at(0)) {
                  selectorTypes = selector.rdftype.at(0);
                }
// console.log(selectorTypes);
                if(selectorTypes == 'http://www.w3.org/ns/oa#TextQuoteSelector') {
                  exact = selector.oaexact;
                  prefix = selector.oaprefix;
                  suffix = selector.oasuffix;
                }
                else if (selectorTypes == 'http://www.w3.org/ns/oa#FragmentSelector') {
                  var refinedBy = i.child(selector["http://www.w3.org/ns/oa#refinedBy"].iri());
                  exact = refinedBy.oaexact;
                  prefix = refinedBy.oaprefix;
                  suffix = refinedBy.oasuffix;
                }
              }
// console.log(exact);
// console.log(prefix);
// console.log(suffix);

              var containerNodeTextContent = containerNode.textContent;
//console.log(containerNodeTextContent);
// console.log(prefix + exact + suffix);
              var selectorIndex = containerNodeTextContent.indexOf(prefix + exact + suffix);
// console.log(selectorIndex);
              if (selectorIndex >= 0) {
                var exactStart = selectorIndex + prefix.length
                var exactEnd = selectorIndex + prefix.length + exact.length;
                var selection = { start: exactStart, end: exactEnd };

                var ref = '<span class="ref do" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark><sup class="ref-annotation"><a rel="cito:hasReplyFrom" href="#' + id + '" resource="' + noteIRI + '">' + refLabel + '</a></sup></span>';

                MediumEditor.selection.importSelection(selection, containerNode, document);

                //XXX: Review
                var selection = window.getSelection();
                var r = selection.getRangeAt(0);
                selection.removeAllRanges();
                selection.addRange(r);
                r.collapse(true);
                var selectedParentNode = r.commonAncestorContainer.parentNode;
                var selectedParentNodeValue = r.commonAncestorContainer.nodeValue;

                var selectionUpdated = DO.U.fragmentFromString(selectedParentNodeValue.substr(0, r.startOffset) + ref + selectedParentNodeValue.substr(r.startOffset + exact.length));

                //XXX: Review. This feels a bit dirty
                for(var i = 0; i < selectedParentNode.childNodes.length; i++) {
                  var n = selectedParentNode.childNodes[i];
                  if (n.nodeType === 3 && n.nodeValue == selectedParentNodeValue) {
                    selectedParentNode.replaceChild(selectionUpdated, n);
                  }
                }

                var resourceIRI = DO.U.stripFragmentFromString(document.location.href);

                var parentNodeWithId = selectedParentNode.closest('[id]');
                var targetIRI = (parentNodeWithId) ? resourceIRI + '#' + parentNodeWithId.id : resourceIRI;

                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "iri": noteIRI, //e.g., https://example.org/path/to/article
                  "creator": {},
                  "datetime": datetime,
                  "target": {
                    "iri": targetIRI,
                    "source": source,
                    "selector": {
                      "exact": exact,
                      "prefix": prefix,
                      "suffix": suffix
                    }
                    //TODO: state
                  },
                  "body": bodyText,
                  "license": {}
                }
                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (annotatedByURL) {
                  noteData.creator["url"] = annotatedByURL;
                }

                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                }
// console.log(noteData);
                var note = DO.U.createNoteDataHTML(noteData);
                var nES = selectedParentNode.nextElementSibling;
                var asideNote = '\n\
<aside class="note do">\n\
<blockquote cite="' + noteIRI + '">'+ note + '</blockquote>\n\
</aside>\n\
';
                var asideNode = DO.U.fragmentFromString(asideNote);
                var parentSection = MediumEditor.util.getClosestTag(selectedParentNode, 'section')
                || MediumEditor.util.getClosestTag(selectedParentNode, 'div') || MediumEditor.util.getClosestTag(selectedParentNode, 'article');
                parentSection.appendChild(asideNode);
                //XXX: Keeping this comment around for emergency
  //                selectedParentNode.parentNode.insertBefore(asideNode, selectedParentNode.nextSibling);

                if(DO.C.User.IRI) {
                  var noteDelete = document.querySelector('aside.do blockquote[cite="' + noteIRI + '"] article button.delete');
                  if (noteDelete) {
                    noteDelete.addEventListener('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();

                      DO.U.deleteResource(noteIRI).then(
                        function(i){
                          var aside = noteDelete.closest('aside.do');
                          aside.parentNode.removeChild(aside);
                          var span = document.querySelector('span[about="#' + refId + '"]');
                          span.outerHTML = span.querySelector('mark').textContent;
                          //TODO: Delete notification or send delete activity
                        },
                        function(reason){
                          console.log(reason);
                        }
                      );
                    });
                  }
                }
                DO.U.positionNote(refId, refLabel, id);

                //Perhaps return something more useful?
                return noteIRI;
              }

              //XXX: Annotation without a selection
              else {
                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "refLabel": refLabel,
                  "iri": noteIRI,
                  "creator": {},
                  "datetime": datetime,
                  "target": {
                    "iri": targetIRI
                  },
                  "body": bodyText,
                  "license": {}
                };

                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                  noteData.license["name"] = DO.C.License[noteData.license["iri"]].name;
                }
                if (datetime) {
                  noteData.datetime = datetime;
                }
// console.log(noteData)
                DO.U.addInteraction(noteData);
              }
            }
            else {
              var inReplyTo, inReplyToRel;
              if (note.asinReplyTo && note.asinReplyTo.at(0)) {
                inReplyTo = note.asinReplyTo.at(0);
                inReplyToRel = 'as:inReplyTo';
              }
              else if(note.siocreplyof && note.siocreplyof.at(0)) {
                inReplyTo = note.siocreplyof.at(0);
                inReplyToRel = 'sioc:reply_of';
              }

              if(inReplyTo && inReplyTo.indexOf(window.location.origin + window.location.pathname) >= 0) {
                var noteData = {
                  "type": 'article',
                  "mode": "read",
                  "motivatedByIRI": motivatedBy,
                  "id": id,
                  "refId": refId,
                  "refLabel": refLabel,
                  "iri": noteIRI,
                  "creator": {},
                  "inReplyTo": {
                    'iri': inReplyTo,
                    'rel': inReplyToRel
                  },
                  "body": bodyText,
                  "license": {}
                };
                if (annotatedByIRI) {
                  noteData.creator["iri"] = annotatedByIRI;
                }
                if (annotatedByName) {
                  noteData.creator["name"] = annotatedByName;
                }
                if (annotatedByImage) {
                  noteData.creator["image"] = annotatedByImage;
                }
                if (licenseIRI) {
                  noteData.license["iri"] = licenseIRI;
                }
                if (datetime) {
                  noteData.datetime = datetime;
                }
                DO.U.addInteraction(noteData);
              }
              else {
                console.log('Source is not an oa:Annotation and it is not a reply to');
              }
            }
          },
          function(reason) {
// console.log(reason);
            return reason;
          }
        );
    },

    addInteraction: function(noteData) {
      var interaction = DO.U.createNoteDataHTML(noteData);
      var interactions = document.getElementById('document-interactions');

      if(!interactions) {
        interactions = document.querySelector('main article');
        var interactionsSection = '<section id="document-interactions"><h2>Interactions</h2><div>';
// interactionsSection += '<p class="count"><data about="" datatype="xsd:nonNegativeInteger" property="sioc:num_replies" value="' + interactionsCount + '">' + interactionsCount + '</data> interactions</p>';
        interactionsSection += '</div></section>';
        interactions.insertAdjacentHTML('beforeend', interactionsSection);
      }

      interactions = document.querySelector('#document-interactions > div');
      interactions.insertAdjacentHTML('beforeend', interaction);
    },

    getRDFaPrefixHTML: function(prefixes){
      return Object.keys(prefixes).map(function(i){ return i + ': ' + prefixes[i]; }).join(' ');
    },

    createHTML: function(title, main, options) {
      options = options || {};
      var prefix = ('prefixes' in options && Object.keys(options.prefixes).length > 0) ? ' prefix="' + DO.U.getRDFaPrefixHTML(options.prefixes) + '"' : '';

      return '<!DOCTYPE html>\n\
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\
  <head>\n\
    <meta charset="utf-8" />\n\
    <title>' + title + '</title>\n\
  </head>\n\
  <body' + prefix + '>\n\
    <main>' + main + '\n\
    </main>\n\
  </body>\n\
</html>\n\
';
    },

    createNoteDataHTML: function(n) {
// console.log(n);
      var published = '';
      var license = '';
      var creator = '', authors = '', creatorImage = '', creatorNameIRI = '', creatorURLNameIRI = '';
      var hasTarget = '', annotationTextSelector = '', target = '';
      var heading, hX;
      var aAbout = '', aPrefix = '';
      var noteType = '';
      var body = '';
      var buttonDelete = '';
      var note = '';
      var targetLabel = '';
      var articleClass = '';
      var prefixes = ' prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# schema: http://schema.org/ dcterms: http://purl.org/dc/terms/ oa: http://www.w3.org/ns/oa# as: https://www.w3.org/ns/activitystreams# i: ' + n.iri + '"';

      var motivatedByIRI = n.motivatedByIRI || '';
      var motivatedByLabel = '';
      switch(motivatedByIRI) {
        case 'oa:replying': default:
          motivatedByIRI = 'oa:replying';
          motivatedByLabel = 'replies';
          targetLabel = 'In reply to';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
        case 'oa:assessing':
          motivatedByLabel = 'reviews';
          targetLabel = 'Review of';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
        case 'oa:describing':
          motivatedByLabel = 'describes';
          targetLabel = 'Describes';
          aAbout = '#' + n.id;
          break;
        case 'oa:commenting':
          motivatedByLabel = 'comments';
          targetLabel = 'Comments on';
          aAbout = '#' + n.id;
          break;
        case 'oa:bookmarking':
          motivatedByLabel = 'bookmarks';
          targetLabel = 'Bookmarked';
          aAbout = 'i:';
          aPrefix = prefixes;
          break;
      }

      switch(n.mode) {
        default:
          hX = 'h3';
          if ('creator' in n && 'iri' in n.creator && DO.C.User.IRI) {
            buttonDelete = '<button class="delete"><i class="fa fa-trash"></i></button>' ;
          }
          articleClass = ' class="do"';
          break;
        case 'write':
          hX = 'h1';
          break;
      }

      var creatorName = '';
      var creatorIRI = 'i:#agent';
      if ('creator' in n) {
        if ('image' in n.creator) {
          creatorImage = '<img alt="" height="48" rel="schema:image" src="' + n.creator.image + '" width="48" /> ';
        }
        if('iri' in n.creator) {
          creatorIRI = n.creator.iri;
        }
        if('name' in n.creator) {
          creatorName = n.creator.name;
          creatorNameIRI = '<span about="' + creatorIRI + '" property="schema:name">' + creatorName + '</span>';
        }
        else {
          creatorNameIRI = creatorName = creatorIRI;
        }

        creatorURLNameIRI = ('url' in n.creator) ? '<a href="' + n.creator.url + '" rel="schema:url">' + creatorNameIRI + '</a>' : '<a href="' + creatorIRI + '">' + creatorNameIRI + '</a>';

        creator = '<span about="' + creatorIRI + '" typeof="schema:Person">' + creatorImage + creatorURLNameIRI + '</span>';

        authors = '<dl class="author-name"><dt>Authors</dt><dd><span rel="schema:creator">' + creator + '</span></dd></dl>';
      }

      heading = '<' + hX + ' property="schema:name">' + creatorName + ' <span rel="oa:motivatedBy" resource="' + motivatedByIRI + '">' + motivatedByLabel + '</span></' + hX + '>';

      if ('datetime' in n){
        published = '<dl class="published"><dt>Published</dt><dd><a href="' + n.iri + '"><time datetime="' + n.datetime + '" datatype="xsd:dateTime" property="schema:datePublished" content="' + n.datetime + '">' + n.datetime.substr(0,19).replace('T', ' ') + '</time></a></dd></dl>';
      }

      if (n.license && 'iri' in n.license) {
        license = DO.U.createLicenseHTML(n.license);
      }

      switch(n.type) {
        case 'article': case 'note': case 'bookmark': case 'approve': case 'disapprove': case 'specificity':
          if (typeof n.target !== 'undefined' || typeof n.inReplyTo !== 'undefined') { //note, annotation, reply
            //FIXME: Could resourceIRI be a fragment URI or *make sure* it is the document URL without the fragment?
            //TODO: Use n.target.iri?

            if (typeof n.body !== 'undefined') {
              if(typeof n.body === 'object' && 'purpose' in n.body) {
                if ('describing' in n.body.purpose && 'text' in n.body.purpose.describing) {
                  body += '<section id="note-' + n.id + '" rel="oa:hasBody" resource="i:#note-' + n.id + '"><h2 property="schema:name" rel="oa:hasPurpose" resource="oa:describing">Note</h2><div datatype="rdf:HTML" property="rdf:value schema:description" resource="i:#note-' + n.id + '" typeof="oa:TextualBody">' + n.body.purpose.describing.text + '</div></section>';
                }
                if ('tagging' in n.body.purpose && 'text' in n.body.purpose.tagging) {
                  var tagsArray = [];
                  n.body.purpose.tagging.text.split(',').forEach(function(i){
                    var tag = DO.U.htmlEntities(i.trim());
                    if(tag.length > 0) {
                      tagsArray.push(tag);
                    }
                  });
                  if (tagsArray.length > 0){
                    tagsArray = DO.U.uniqueArray(tagsArray);

                    body += '<dl id="tags" class="tags"><dt>Tags</dt><dd><ul rel="oa:hasBody">';
                    tagsArray.forEach(function(i){
                      body += '<li about="i:#tag-' + DO.U.generateAttributeId(null, i) + '" typeof="oa:TextualBody" property="rdf:value" rel="oa:hasPurpose" resource="oa:tagging" datatype="rdf:HTML">' + i + '</li>';
                    })
                    body += '</ul></dd></dl>';
                  }
                }

              }
              else if (n.body.length > 0) {
                if (n.license && 'iri' in n.license) {
                  license = DO.U.createLicenseHTML(n.license, {rel:'dcterms:rights', label:'Rights'});
                }

                body += '<section id="note-' + n.id + '" rel="oa:hasBody" resource="i:#note-' + n.id + '"><h2 property="schema:name">Note</h2><div datatype="rdf:HTML" property="rdf:value schema:description" resource="i:#note-' + n.id + '" typeof="oa:TextualBody">' + n.body + '</div>' + license + '</section>';
              }
            }

            var targetIRI = '';
            var targetRelation = 'oa:hasTarget';
            if (typeof n.target !== 'undefined' && 'iri' in n.target) {
              targetIRI = n.target.iri;
              var targetIRIFragment = n.target.iri.substr(n.target.iri.lastIndexOf('#'));
              //TODO: Handle when there is no fragment
              if (typeof n.target.selector !== 'undefined') {
                annotationTextSelector = '<span rel="oa:hasSelector" resource="i:#fragment-selector" typeof="oa:FragmentSelector"><meta property="rdf:value" content="' + targetIRIFragment + '" xml:lang="" lang="" rel="dcterms:conformsTo" resource="https://tools.ietf.org/html/rfc3987" /><span rel="oa:refinedBy" resource="i:#text-quote-selector" typeof="oa:TextQuoteSelector"><span property="oa:prefix" xml:lang="en" lang="en">' + n.target.selector.prefix + '</span><mark property="oa:exact" xml:lang="en" lang="en">' + n.target.selector.exact + '</mark><span property="oa:suffix" xml:lang="en" lang="en">' + n.target.selector.suffix + '</span></span></span>';
              }
            }
            else if(typeof n.inReplyTo !== 'undefined' && 'iri' in n.inReplyTo) {
              targetIRI = n.inReplyTo.iri;
              targetRelation = ('rel' in n.inReplyTo) ? n.inReplyTo.rel : 'as:inReplyTo';
              // TODO: pass document title and maybe author so they can be displayed on the reply too.
            }

            hasTarget = '<a href="' + targetIRI + '" rel="' + targetRelation + '">' + targetLabel + '</a>';
            if (typeof n.target !== 'undefined' && typeof n.target.source !== 'undefined') {
              hasTarget += ' (<a about="' + n.target.iri + '" href="' + n.target.source +'" rel="oa:hasSource" typeof="oa:SpecificResource">part of</a>)';
            }

            target ='<dl class="target"><dt>' + hasTarget + '</dt>';
            if (typeof n.target !== 'undefined' && typeof n.target.selector !== 'undefined') {
              target += '<dd><blockquote about="' + targetIRI + '" cite="' + targetIRI + '">' + annotationTextSelector + '</blockquote></dd>';
            }
            target += '</dl>';

            target += '<dl class="renderedvia"><dt>Rendered via</dt><dd><a about="' + targetIRI + '" href="https://dokie.li/" rel="oa:renderedVia">dokieli</a></dd></dl>';

            var canonicalUUID = DO.U.generateUUID();
            var canonical = '<dl class="canonical"><dt>Canonical</dt><dd about="i:" rel="oa:canonical" resource="urn:uuid:' + canonicalUUID + '">' + canonicalUUID + '</dd></dl>';

            note = '\n\
<article id="' + n.id + '" about="' + aAbout + '" typeof="oa:Annotation' + noteType + '"' + aPrefix + articleClass + '>'+buttonDelete+'\n\
  ' + heading + '\n\
  ' + authors + '\n\
  ' + published + '\n\
  ' + license + '\n\
  ' + canonical + '\n\
  ' + target + '\n\
  ' + body + '\n\
</article>\n\
';
          }
          break;

        case 'ref-footnote':
          var citationURL = (typeof n.citationURL !== 'undefined' && n.citationURL != '') ? '<a href="' + n.citationURL + '" rel="rdfs:seeAlso">' + n.citationURL + '</a>' : '';
          var body = (typeof n.body !== 'undefined' && n.body != '') ? ((citationURL) ? ', ' + n.body : n.body) : '';

          note = '\n\
<dl about="#' + n.id +'" id="' + n.id +'" typeof="oa:Annotation">\n\
  <dt><a href="#' + n.refId + '" rel="oa:hasTarget">' + n.refLabel + '</a><meta rel="oa:motivation" resource="' + motivatedByIRI + '" /></dt>\n\
  <dd rel="oa:hasBody" resource="#n-' + n.id + '"><div datatype="rdf:HTML" property="rdf:value" resource="#n-' + n.id + '" typeof="oa:TextualBody">' + citationURL + body + '</div></dd>\n\
</dl>\n\
';
          break;

        default:
          break;
      }

      return note;
    },

    createLicenseHTML: function(n, options) {
      var license = '';
      var rel = (options && options.rel) ? options.rel : 'schema:license';
      var label = (options && options.label) ? options.label : 'License';

      if (typeof n.iri !== 'undefined') {
        license = '<dl class="' + label.toLowerCase() + '"><dt>' + label + '</dt><dd>';
        if('name' in n) {
          var title = ('description' in n) ? ' title="' + n.description + '"' : '';
          license += '<a href="' + n.iri + '" rel="' + rel + '"' + title + '>' + n.name + '</a>';
        }
        else {
          var licenseName = n.iri, licenseDescription = n.iri;
          if (n.iri in DO.C.License) {
            licenseName = DO.C.License[n.iri].name;
            licenseDescription = DO.C.License[n.iri].description;
          }
          license += '<a href="' + n.iri + '" rel="' + rel + '" title="' + licenseDescription + '">' + licenseName + '</a>';
        }
        license += '</dd></dl>';
      }

      return license;
    },

    createRDFaHTML: function(r) {
      var s = '', property = '', rel = '', resource = '', href = '', content = '', langDatatype = '', typeOf = '';
      var idValue = DO.U.generateAttributeId();
      var id = ' id="' + idValue + '"';

      if ('about' in r && r.about != '') {
        about = ' about="' + r.about + '"';
      }
      else {
        about = ' about="#' + idValue + '"';
      }
      if ('rel' in r && r.rel != '') {
        rel = ' rel="' + r.rel + '"';
      }
      if ('property' in r && r.property != '') {
        property = ' property="' + r.property + '"';
      }
      else {
        //TODO: Figure out how to use user's prefered vocabulary.
        property = ' property="rdfs:label"';
      }
      if ('resource' in r && r.resource != '') {
        resource = ' resource="' + r.resource + '"';
      }
      if ('href' in r && r.href != '') {
        href = ' href="' + r.href + '"';
      }
      if ('content' in r && r.content != '') {
        content = ' content="' + r.content + '"';
      }
      if ('lang' in r && r.lang != '') {
        langDatatype = ' xml:lang="' + r.lang + '" lang="' + r.lang + '"';
      }
      else {
        if ('datatype' in r && r.datatype != '') {
          langDatatype = ' datatype="' + r.datatype + '"';
        }
      }
      if ('typeOf' in r && r.typeOf != '') {
        typeOf = ' typeof="' + r.typeOf + '"';
      }

      var element = (href == '') ? 'span' : 'a';
      s = '<' + element + about + content + href + id + langDatatype + property + rel + resource + typeOf + '>' + r.textContent + '</' + element + '>';

      return s;
    },

    getAnnotationLocationHTML: function() {
      var s = '', inputs = [], checked = '';
      if(typeof DO.C.AnnotationService !== 'undefined') {
        checked = (DO.C.User.Storage && DO.C.User.Storage.length > 0) ? '': ' checked="checked" disabled="disabled"';
        inputs.push('<input type="checkbox" id="annotation-location-service" name="annotation-location-service"' + checked + ' /><label for="annotation-location-service">Annotation service</label>');
      }
      if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
        inputs.push('<input type="checkbox" id="annotation-location-personal-storage" name="annotation-location-personal-storage" checked="checked" /><label for="annotation-location-personal-storage">Personal storage</label>');
      }
      s = 'Store at: ' + inputs.join('');
      return s;
    },

    getLicenseOptionsHTML: function(type) {
      var type = type || 'cc';

      var s = '', selected = '';
      Object.keys(DO.C.License).forEach(function(uri){
        selected = (DO.C.License[uri].name === 'CC BY 4.0') ? ' selected="selected"' : '';
        s += '<option value="' + uri + '" title="' + DO.C.License[uri].description  + '"' + selected + '>' + DO.C.License[uri].name  + '</option>';
      })

      return s;
    },

    getCitationOptionsHTML: function(type) {
      var type = type || 'cites';

      var s = '';
      Object.keys(DO.C.Citation).forEach(function(uri){
        s += '<option value="' + uri + '">' + DO.C.Citation[uri]  + '</option>';
      })

      return s;
    },

    Editor: {
      disableEditor: function(e) {
    //    _mediumEditors[1].destroy();
        DO.C.EditorEnabled = false;
        document.removeEventListener('click', DO.U.updateDocumentTitle);
        return DO.U.Editor.MediumEditor.destroy();
      },

      enableEditor: function(editorMode, e, selector) {
        selector = selector || 'main article';

        if (typeof DO.U.Editor.MediumEditor !== 'undefined') {
          DO.U.Editor.disableEditor();
        }

        if (!document.getElementById('document-editor')) {
          document.body.insertAdjacentHTML('beforeend', '<aside id="document-editor" class="do"></aside>');
        }

        var editorOptions = {
          author: {
            id: 'author',
            elementsContainer: document.getElementById('document-editor'),
            placeholder: {
              text: ["Make it so!", "This is not a Paper", "Cogito Ergo Sum", "Do One Thing and Do It Well", "Free Your Mind", "Do or Do Not"][Math.floor(Math.random() * 6)]
            },
            disableDoubleReturn: true,
            paste: {
              forcePlainText: false,
              cleanPastedHTML: true,
              cleanReplacements: [],
              cleanAttrs: ['class', 'style', 'dir'],
              cleanTags: ['area', 'basefont', 'br', 'font', 'hr', 'isindex', 'link', 'script', 'style', 'wbr']
            },
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['h2', 'h3', 'h4', 'em', 'strong', 'orderedlist', 'unorderedlist', 'code', 'pre', 'image', 'anchor', 'q', 'sparkline', 'rdfa', 'cite', 'note'],
              diffLeft: 0,
              diffTop: -10,
              allowMultiParagraphSelection: false
            },
            anchorPreview: false,
            extensions: {
              'h2': new DO.U.Editor.Button({action:'h2', label:'h2'}),
              'h3': new DO.U.Editor.Button({action:'h3', label:'h3'}),
              'h4': new DO.U.Editor.Button({action:'h4', label:'h4'}),
              'em': new DO.U.Editor.Button({action:'em', label:'em'}),
              'strong': new DO.U.Editor.Button({action:'strong', label:'strong'}),
              'code': new DO.U.Editor.Button({action:'code', label:'code'}),
              'q': new DO.U.Editor.Button({action:'q', label:'q'}),
              'sparkline': new DO.U.Editor.Note({action:'sparkline', label:'sparkline'}),
              'rdfa': new DO.U.Editor.Note({action:'rdfa', label:'rdfa'}),
              'cite': new DO.U.Editor.Note({action:'cite', label:'cite'}),
              'note': new DO.U.Editor.Note({action:'note', label:'note'})
            }
          },

          social: {
            id: 'social',
            elementsContainer: document.getElementById('document-editor'),
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['share', 'approve', 'bookmark', 'note'],
              allowMultiParagraphSelection: false
            },
            disableEditing: true,
            anchorPreview: false,
            extensions: {
              'note': new DO.U.Editor.Note({action:'article', label:'note'}),
              'bookmark': new DO.U.Editor.Note({action:'bookmark', label:'bookmark'}),
              'share': new DO.U.Editor.Note({action:'share', label:'share'}),
              'approve': new DO.U.Editor.Note({action:'approve', label:'approve'})
            }
          },

          review: {
            id: 'review',
            elementsContainer: document.getElementById('document-editor'),
            buttonLabels: DO.C.Editor.ButtonLabelType,
            toolbar: {
              buttons: ['approve', 'disapprove', 'specificity'],
              allowMultiParagraphSelection: false
            },
            disableEditing: true,
            anchorPreview: false,
            extensions: {
              'approve': new DO.U.Editor.Note({action:'approve', label:'approve'}),
              'disapprove': new DO.U.Editor.Note({action:'disapprove', label:'disapprove'}),
              'specificity': new DO.U.Editor.Note({action:'specificity', label:'specificity'})
            }
          }
        };

        if('MediumEditorTable' in window) {
          editorOptions.author.extensions['table'] = new MediumEditorTable();
          editorOptions.author.toolbar.buttons.splice(10, 0, 'table');
        }

        var eNodes = document.querySelector(selector);
        var eOptions = editorOptions[editorMode];
        DO.C.User.Role = editorMode;

        if (typeof MediumEditor !== 'undefined') {
          DO.U.Editor.MediumEditor = new MediumEditor(eNodes, eOptions);
          DO.C.EditorEnabled = true;

          if(editorMode == 'author') {
            document.addEventListener('click', DO.U.updateDocumentTitle);
          }

          return DO.U.Editor.MediumEditor;
        }
      },

      Button: (function () {
        if (typeof MediumEditor !== 'undefined') {
          return MediumEditor.extensions.button.extend({
            init: function () {
              this.name = this.label;
              this.action = this.action;
              this.aria = this.label;
              this.tagNames = [this.action];
              this.useQueryState = true;
              this.contentDefault = '<b>' + this.label + '</b>';

              switch(this.action) {
                case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': this.contentFA = '<i class="fa fa-header">' + parseInt(this.action.slice(-1)) + '</i>'; break;
                case 'em': this.contentFA = '<i class="fa fa-italic"></i>'; break;
                case 'strong': this.contentFA = '<i class="fa fa-bold"></i>'; break;
                case 'q': this.contentFA = '<i class="fa fa-quote-right"></i>'; break;
                default: break;
              }

              this.button = this.createButton();
              this.on(this.button, 'click', this.handleClick.bind(this));

              //TODO: Listen to section hX changes and update section @id and span @class do.fragment
            },

            // getButton: function() {
            //   console.log('DO.U.Editor.Button.Note.getButton()');
            //   return this.button;
            // },

            handleClick: function(event) { //, editable
        //console.log('DO.U.Editor.Button.handleClick()');
// console.log(this);
              event.preventDefault();
              event.stopPropagation();

              var action = this.getAction();
              var tagNames = this.getTagNames();
              var button = this.getButton();

              if (this.isActive()) {
                return this.base.execAction('removeFormat');
              }
              else {
                var datetime = ' ' + DO.U.createAttributeDateTime(this.action);

                this.base.selectedDocument = this.document;
                this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument);
                //.replace(DO.C.Editor.regexEmptyHTMLTags, '');
// console.log('this.base.selection:');
// console.log(this.base.selection);

                var selectedParentElement = this.base.getSelectedParentElement();
// console.log('getSelectedParentElement:');
// console.log(selectedParentElement);
                var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
// console.log(parentSection);

                //XXX: DO NOT REMOVE. Saving the selection should be before inserting/updating HTML.
                this.base.saveSelection();

                switch(this.action) {
                  case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                    //XXX: Which heading level are we at?
                    var parentSectionHeading = '';
                    for (var i = 0; i < parentSection.childNodes.length; i++) {
                      parentSectionHeading = parentSection.childNodes[i].nodeName.toLowerCase();
                      if(DO.C.Editor.headings.indexOf(parentSectionHeading) > 0) {
// console.log(parentSectionHeading);
                        break;
                      }
                    }
                    var pSH = parseInt(parentSectionHeading.slice(-1));

                    //XXX: Which heading level is the action?
                    var cSH = parseInt(this.action.slice(-1));
// console.log("parentH: " + pSH);
// console.log("currentH: " + cSH);
// console.log(cSH-pSH);

                    var closePreviousSections = '';
                    // if (cSH > pSH) {}
                    for (i = 0; i <= (pSH-cSH); i++) {
                      console.log("i: " + i);
                      closePreviousSections += '</div></section>';
                    }
// console.log(closePreviousSections);
// console.log(this.base.selection);
// var doc = this.document;
                    var selection = window.getSelection();
// console.log(this.base.selection);
// console.log(selection);

                    if (selection.rangeCount) {
                      range = selection.getRangeAt(0);
                      parent = selectedParentElement;

// console.log(range);
                      //Section
                      var sectionId = DO.U.generateAttributeId(null, this.base.selection);
                      var section = document.createElement('section');
                      section.id = sectionId;
                      section.setAttribute('rel', 'schema:hasPart');
                      section.setAttribute('resource', '#' + sectionId);
// console.log(section);


                      //Heading
                      var heading = document.createElement(tagNames[0]);
                      heading.setAttribute('property', 'schema:name');
                      heading.innerHTML = this.base.selection;
// console.log(heading);
// console.log(selection);


                      var divDescription = parentSection.getElementsByTagName('div')[0];
// console.log(divDescription);
// console.log(divDescription.innerHTML);
// console.log(divDescription.childNodes);
// console.log(divDescription.length);
// console.log(selectedParentElement);
// console.log(selectedParentElement.childNodes);
// console.log(selectedParentElement.lastChild);
// console.log(selectedParentElement.lastChild.length);

                      r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
                      //Remaining nodes
                      var r = document.createRange();
                      r.setStart(selection.focusNode, selection.focusOffset);
                      r.setEnd(selectedParentElement.lastChild, selectedParentElement.lastChild.length);
// console.log(r.commonAncestorContainer.nodeType);

// console.log(r.startContainer);
// console.log(r.endContainer);
// console.log(selection.anchorNode);
// selection.removeAllRanges(); //XXX: is this doing anything?
// selection.addRange(r);

// console.log(selection.anchorNode);
                      var fragment = r.extractContents();
// console.log(fragment);
// console.log(selection);
// r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
                      if (fragment.firstChild.nodeType === 3) {
                        //TODO: trim only if there is one child which is a textnode
                        // fragment.firstChild.nodeValue = fragment.firstChild.nodeValue.trim();

// console.log(fragment);
                        var sPE = selectedParentElement.nodeName.toLowerCase();
                        switch(sPE) {
                          case "p": default:
                            var xSPE = document.createElement(sPE);
                            xSPE.appendChild(fragment.cloneNode(true));
                            fragment = DO.U.fragmentFromString(xSPE.outerHTML);
                            break;
                          //TODO: Other cases?
                        }
                      }
// console.log(fragment);
// console.log(selection);

                      r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startContainer);
// console.log(r.startOffset);
// console.log(r.endOffset);
// var remainingNodes = document.createElement('div');
// remainingNodes.appendChild(fragment.cloneNode(true));
// console.log(remainingNodes);


                      //Description
                      var div = document.createElement('div');
                      div.setAttribute('property', 'schema:description');
                      div.appendChild(fragment.cloneNode(true));

                      //Put it together
                      section.appendChild(heading);
                      section.appendChild(div);
// console.log(range.startContainer);

                      var selectionUpdated = document.createElement('div');
                      selectionUpdated.appendChild(section);
                      selectionUpdated = selectionUpdated.innerHTML;
// console.log(selectionUpdated);
// range.deleteContents();
// MediumEditor.util.insertHTMLCommand(this.document, closePreviousSections);
// MediumEditor.extensions.paste(closePreviousSections);

                      //Sub-section
                      if (cSH-pSH > 0) {
                        MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                        // This doesn't seem to be needed anymore?
                        // MediumEditor.selection.select(this.base.selectedDocument, heading, 0);
                      }
                      else {
// console.log(selection);
// console.log(parentSection);
                        MediumEditor.selection.selectNode(parentSection, document);
                        r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startOffset);
// console.log(r.endOffset);


                        //This selection is based off previous operations; handling remaining Nodes after the selection. So, this is not accurate per se.. the range might be accurate.
                        selection = window.getSelection();
// console.log(selection);
                        r = selection.getRangeAt(0);
// console.log(r);
// console.log(r.startOffset);
// console.log(r.endOffset);


                        r = document.createRange();
                        r.setStartAfter(parentSection);
// console.log(r);
                        r.setEndAfter(parentSection);
// console.log(r);
                        r.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(r);
// console.log(selection);
                        var foo = document.createElement('div');
                        foo.appendChild(parentSection);
                        parentSection = foo.innerHTML;
// console.log(parentSection + selectionUpdated);
                        MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, parentSection + selectionUpdated);

                        // MediumEditor.selection.select(this.base.selectedDocument, heading, 0);
                        // parentSection.parentNode.insertBefore(section, parentSection.nextSibling);
                      }
                    }
                    break;

                  default:
                    var selectionUpdated = '<' + tagNames[0] + datetime + '>' + this.base.selection + '</' + tagNames[0] + '>';
                    MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);
                    break;
                }

                this.base.restoreSelection();
                this.base.checkSelection();
                this.setActive();
              }
            }
          });
        }
      })(),

      //Adapted from MediumEditor's Anchor Form
      Note: (function() {
        if (typeof MediumEditor !== 'undefined') {
          return MediumEditor.extensions.form.extend({
            /* Textarea Form Options */

            /* customClassOption: [string]  (previously options.anchorButton + options.anchorButtonClass)
             * Custom class name the user can optionally have added to their created links (ie 'button').
             * If passed as a non-empty string, a checkbox will be displayed allowing the user to choose
             * whether to have the class added to the created link or not.
             */
            customClassOption: null,

            /* customClassOptionText: [string]
             * text to be shown in the checkbox when the __customClassOption__ is being used.
             */
            customClassOptionText: 'Button',

            /* linkValidation: [boolean]  (previously options.checkLinkFormat)
             * enables/disables check for common URL protocols on anchor links.
             */
            linkValidation: false,

            /* placeholderText: [string]  (previously options.anchorInputPlaceholder)
             * text to be shown as placeholder of the anchor input.
             */
            placeholderText: "What’s up?",

            /* targetCheckbox: [boolean]  (previously options.anchorTarget)
             * enables/disables displaying a "Open in new window" checkbox, which when checked
             * changes the `target` attribute of the created link.
             */
            targetCheckbox: false,

            /* targetCheckboxText: [string]  (previously options.anchorInputCheckboxLabel)
             * text to be shown in the checkbox enabled via the __targetCheckbox__ option.
             */
            targetCheckboxText: 'Open in new window',

            // Options for the Button base class
            // name: this.name,
            // action: 'createLink',
            // aria: 'link',
            // tagNames: ['a'],
            // contentDefault: '<b>#</b>',
            // contentFA: '<i class="fa fa-sticky-note"></i>',

            init: function () {
              this.name = this.label;
              this.action = this.action;
              this.aria = this.label;
              this.tagNames = [this.action];
              this.useQueryState = true;
              this.contentDefault = '<b>' + this.label + '</b>';
              this.signInRequired = false;

              switch(this.action) {
                case 'cite': default:
                  this.contentFA = '<i class="fa fa-hashtag"></i>';
                  break;
                case 'article':
                  this.contentFA = '<i class="fa fa-sticky-note"></i>';
                  this.signInRequired = true;
                  break;
                case 'note':
                  this.contentFA = '<i class="fa fa-sticky-note"></i>';
                  break;
                case 'rdfa':
                  this.contentFA = '<i class="fa fa-rocket"></i>';
                  break;
                case 'bookmark':
                  this.contentFA = '<i class="fa fa-bookmark"></i>';
                  this.signInRequired = true;
                  break;
                case 'share':
                  this.contentFA = '<i class="fa fa-bullhorn"></i>';
                  this.signInRequired = true;
                  break;
                case 'approve':
                  this.contentFA = '<i class="fa fa-thumbs-up"></i>';
                  this.signInRequired = true;
                  break;
                case 'disapprove':
                  this.contentFA = '<i class="fa fa-thumbs-down"></i>';
                  this.signInRequired = true;
                  break;
                case 'specificity':
                  this.contentFA = '<i class="fa fa-crosshairs"></i>';
                  this.signInRequired = true;
                  break;
                case 'sparkline':
                  this.contentFA = '<i class="fa fa-line-chart"></i>';
                  break;
              }
              MediumEditor.extensions.form.prototype.init.apply(this, arguments);

        //TODO: Change this bind key
        //      this.subscribe('editableKeydown', this.handleKeydown.bind(this));
        //      this.on(this.button, 'click', this.handleClick.bind(this));
            },

            // Called when the button the toolbar is clicked
            // Overrides ButtonExtension.handleClick
            handleClick: function (event) {
              event.preventDefault();
              event.stopPropagation();
              var _this = this;
              var showAction = function() {
                switch(_this.action) {
                  default:
                    var range = MediumEditor.selection.getSelectionRange(_this.document);

                    if (range.startContainer.nodeName.toLowerCase() === 'a' ||
                      range.endContainer.nodeName.toLowerCase() === 'a' ||
                      MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(range), 'a')) {
                      return _this.execAction('unlink');
                    }

                    if (_this.action == 'approve' && DO.U.Editor.MediumEditor.options.id == 'social'){
                      var opts = {
                        license: 'https://creativecommons.org/licenses/by/4.0/',
                        content: 'Liked'
                      }
                      _this.completeFormSave(opts);
                    }
                    else if (!_this.isDisplayed()) {
                      _this.showForm();
                    }
                    break;

                  case 'share':
                    _this.base.restoreSelection();
                    var resourceIRI = DO.U.stripFragmentFromString(document.location.href);
                    var id = _this.base.getSelectedParentElement().closest('[id]').id;
                    resourceIRI = (id) ? resourceIRI + '#' + id : resourceIRI;
                    _this.window.getSelection().removeAllRanges();
                    _this.base.checkSelection();
                    DO.U.shareResource(null, resourceIRI);
                    break;
                }
              };

              var updateAnnotationServiceForm = function() {
                var annotationServices = document.querySelectorAll('.annotation-location-selection');
                for (var i = 0; i < annotationServices.length; i++) {
                  annotationServices[i].innerHTML = DO.U.getAnnotationLocationHTML();
                }
              };

              return DO.U.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
                function(url) {
                  DO.C.AnnotationService = url[0];
                  updateAnnotationServiceForm();
                  showAction();
                },
                function(reason) {
                  if(_this.signInRequired && !DO.C.User.IRI) {
                    DO.U.showUserIdentityInput();
                  }
                  else {
                    updateAnnotationServiceForm();
                    showAction();
                  }
                }
              );
            },

            // Called when user hits the defined shortcut (CTRL / COMMAND + K)
            handleKeydown: function (event) {
              if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.K) && MediumEditor.util.isMetaCtrlKey(event) && !event.shiftKey) {
                this.handleClick(event);
              }
            },

            // Called by medium-editor to append form to the toolbar
            getForm: function () {
              if (!this.form) {
                this.form = this.createForm();
              }
              return this.form;
            },

            getTemplate: function () {
              var template = [];
              switch(this.action) {
                case 'rdfa':
                  template = [
                  '<label for="rdfa-about">about</label><input id="rdfa-about" class="medium-editor-toolbar-input" placeholder="https://example.org/foo#bar" /><br/>',
                  '<label for="rdfa-resource">resource</label><input id="rdfa-resource" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-typeof">typeof</label><input id="rdfa-typeof" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-rel">rel</label><input id="rdfa-rel" class="medium-editor-toolbar-input" placeholder="schema:url"><br/>',
                  '<label for="rdfa-property">property</label><input id="rdfa-property" class="medium-editor-toolbar-input" placeholder="schema:name" /><br/>',
                  '<label for="rdfa-href">href</label><input id="rdfa-href" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>',
                  '<label for="rdfa-content">content</label><input id="rdfa-content" class="medium-editor-toolbar-input" placeholder="Baz" /><br/>',
                  '<label for="rdfa-datatype">datatype</label><input id="rdfa-datatype" class="medium-editor-toolbar-input" placeholder="https://example.net/baz" /><br/>'
                  ];
                  break;
                case 'article':
                  template = [
                  '<textarea id="article-content" name="content" cols="20" rows="5" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>',
                  '<select id="article-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'note':
                  template = [
                  '<label for="bookmark-tagging">Tags</label> <input id="bookmark-tagging" class="medium-editor-toolbar-input" placeholder="Separate tags with commas" /><br/>',
                  '<textarea id="article-content" name="content" cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>',
                  '<select id="article-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>'
                  ];
                  break;
                case 'approve':
                  template = [
                  '<textarea id="approve-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Strong point? Convincing argument?"></textarea>',
                  '<select id="approve-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'disapprove':
                  template = [
                  '<textarea id="disapprove-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Weak point? Error? Inaccurate?"></textarea>',
                  '<select id="disapprove-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'specificity':
                  template = [
                  '<textarea id="specificity-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Citation or specificity needed?"></textarea>',
                  '<select id="specificity-license" name="license" class="medium-editor-toolbar-select">',
                  DO.U.getLicenseOptionsHTML(),
                  '</select>',
                  '<span class="annotation-location-selection">' + DO.U.getAnnotationLocationHTML() + '</span>'
                  ];
                  break;
                case 'cite':
                  template = [
                  '<input type="radio" name="citation-type" value="ref-footnote" id="ref-footnote" /> <label for="ref-footnote">Footnote</label>',
                  '<input type="radio" name="citation-type" value="ref-reference" id="ref-reference" /> <label for="ref-reference">Reference</label>',
                  '<select id="citation-relation" name="citation-relation" class="medium-editor-toolbar-select">',
                  DO.U.getCitationOptionsHTML(),
                  '</select>',
                  '<input type="text" name="citation-url" value="" id="citation-url" class="medium-editor-toolbar-input" placeholder="http://example.org/article#results" />',
                  '<textarea id="citation-content" cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                  ];
                  break;
                case 'bookmark':
                  template = [
                  '<label for="bookmark-tagging">Tags</label> <input id="bookmark-tagging" class="medium-editor-toolbar-input" placeholder="Separate tags with commas" /><br/>',
                  '<textarea id="bookmark-content" name="content" cols="20" rows="2" class="medium-editor-toolbar-textarea" placeholder="Description"></textarea>'
                  ];
                  break;
                case 'sparkline':
                  template = [
                  '<input type="text" name="sparkline-search" value="" id="sparkline-search" class="medium-editor-toolbar-input" placeholder="Enter search terms" /><br/>',
                  '<input type="hidden" name="sparkline-selection-dataset" value="" id="sparkline-selection-dataset" />',
                  '<input type="hidden" name="sparkline-selection-refarea" value="" id="sparkline-selection-refarea" />'
                  ];
                  break;
                default:
                  template = [
                  '<textarea cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                  ];
                  break;
              }

              template.push(
                '<a href="#" class="medium-editor-toolbar-save" title="Save">',
                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : this.formSaveLabel,
                '</a>'
              );

              template.push(
                '<a href="#" class="medium-editor-toolbar-close" title="Close">',
                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : this.formCloseLabel,
                '</a>'
              );

              // both of these options are slightly moot with the ability to
              // override the various form buildup/serialize functions.

              if (this.targetCheckbox) {
                // fixme: ideally, this targetCheckboxText would be a formLabel too,
                // figure out how to deprecate? also consider `fa-` icon default implcations.
                template.push(
                  '<div class="medium-editor-toolbar-form-row">',
                  '<input type="checkbox" class="medium-editor-toolbar-textarea-target">',
                  '<label>',
                  this.targetCheckboxText,
                  '</label>',
                  '</div>'
                );
              }

              if (this.customClassOption) {
                // fixme: expose this `Button` text as a formLabel property, too
                // and provide similar access to a `fa-` icon default.
                template.push(
                  '<div class="medium-editor-toolbar-form-row">',
                  '<input type="checkbox" class="medium-editor-toolbar-textarea-button">',
                  '<label>',
                  this.customClassOptionText,
                  '</label>',
                  '</div>'
                );
              }

              return template.join('');

            },

            // Used by medium-editor when the default toolbar is to be displayed
            isDisplayed: function () {
              return this.getForm().style.display === 'block';
            },

            hideForm: function () {
              this.getForm().style.display = 'none';
              this.getInput().value = '';
            },

            showForm: function (opts) {
              var _this = this;
              var input = this.getInput(),
                targetCheckbox = this.getAnchorTargetCheckbox(),
                buttonCheckbox = this.getAnchorButtonCheckbox();

              opts = opts || { url: '' };
              // TODO: This is for backwards compatability
              // We don't need to support the 'string' argument in 6.0.0
              if (typeof opts === 'string') {
                opts = {
                  url: opts
                };
              }

              var initialSelectedParentElement = this.base.getSelectedParentElement();
              var initialSelectionState = MediumEditor.selection.exportSelection(initialSelectedParentElement, this.document);

              //XXX: Get this before getForm.
              var selection = MediumEditor.selection.getSelectionHtml(this.document).trim();
              this.base.saveSelection();
              this.hideToolbarDefaultActions();
              var form = this.getForm();
              form.style.display = 'block';
              this.setToolbarPosition();

              input.value = opts.url;

              switch(this.action) {
                case 'rdfa':
                  input.about.focus();
                  break;
                case 'article': case 'note': case 'approve': case 'disapprove': case 'specificity':
                  input.content.focus();
                  break;
                case 'cite':
                  input.url.focus();
                  document.querySelector('.medium-editor-toolbar-form input[name="citation-type"]').checked = true;
                  break;
                case 'sparkline':
                  input.search.focus();
                  input.search.value = selection;

                  var inputSearch = function(e){
                    if(e.which == 13) {
                      e.preventDefault();
                      e.stopPropagation();
                      _this.base.restoreSelection();
                      MediumEditor.util.insertHTMLCommand(document, e.target.value);
                      var selection = { start: initialSelectionState.start, end: (initialSelectionState.start + e.target.value.length) };
                      MediumEditor.selection.importSelection(selection, initialSelectedParentElement, document);
                      _this.base.checkSelection();
                      e.target.setAttribute('data-event-keyup-enter', true);
                      _this.showForm();
                      return;
                    }
                  }
                  if(!input.search.getAttribute('data-event-keyup-enter')) {
                    input.search.addEventListener('keyup', inputSearch, false);
                  }

                  var sparqlEndpoint = 'http://worldbank.270a.info/';
                  var resourceType = '<http://purl.org/linked-data/cube#DataSet>';
                  var sparklineGraphId = 'sparkline-graph';
                  var resultContainerId = 'sparkline-select';
                  //TODO: This should be from user's preference?
                  var lang = 'en';

                  //TODO: What's the best way for user input? ' of '
                  var textInputA = selection.split(' of ')[0];
                  var textInputB = selection.substr(selection.indexOf(' of ') + 4);

                  if(!DO.C.RefAreas[textInputB.toUpperCase()]) {
                    Object.keys(DO.C.RefAreas).forEach(function(key) {
                      if(DO.C.RefAreas[key].toLowerCase() == textInputB.toLowerCase()) {
                        textInputB = key;
                      }
                    });
                  }

                  var sG = document.getElementById(sparklineGraphId);
                  if(sG) {
                    sG.parentNode.removeChild(sG);
                  }

                  if(!DO.C.RefAreas[textInputB.toUpperCase()]) {
                    var refAreas;
                    Object.keys(DO.C.RefAreas).forEach(function(key) {
                      refAreas += '<option value="' + key + '">' + key + ' - ' + DO.C.RefAreas[key] + '</option>';
                    });
                    form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<div id="' + sparklineGraphId + '">`' + textInputB + '` is not available. Try: ' + '<select name="refAreas"><option>Select a reference area</option>' + refAreas + '</select></div>');
                    var rA = document.querySelector('#' + sparklineGraphId + ' select[name="refAreas"]');
                    rA.addEventListener('change', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      textInputB = e.target.value;
                      input.search.value = textInputA + ' of ' + textInputB;
                      form.querySelector('#sparkline-selection-dataset').value = textInputA;
                      form.querySelector('#sparkline-selection-refarea').value = textInputB;

                      _this.base.restoreSelection();
                      MediumEditor.util.insertHTMLCommand(document, input.search.value);
                      var selection = { start: initialSelectionState.start, end: (initialSelectionState.start + input.search.value.length) };
                      MediumEditor.selection.importSelection(selection, initialSelectedParentElement, document);
                      _this.base.checkSelection();
                      _this.showForm();
                    });
                    return;
                  }

                  var options = {};
                  options.filter = {
                    dimensionProperty: 'sdmx-dimension:refArea',
                    dimensionRefAreaNotation: textInputB
                  };
                  options.optional = { prefLabels: ["dcterms:title"] };

                  var queryURL = DO.U.SPARQLQueryURL.getResourcesOfTypeWithLabel(sparqlEndpoint, resourceType, textInputA.toLowerCase(), options);

                  queryURL = DO.U.getProxyableIRI(queryURL);

                  form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<div id="' + sparklineGraphId + '"></div><i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
                  sG = document.getElementById(sparklineGraphId);

                  DO.U.getTriplesFromGraph(queryURL)
                    .then(function(triples){
                      sG.removeAttribute('class');
                      triples = DO.U.sortTriples(triples, { sortBy: 'object' });
                      return DO.U.getListHTMLFromTriples(triples, {element: 'select', elementId: resultContainerId});
                    })
                    .then(function(listHTML){
                      sG.innerHTML = listHTML;
                      form.removeChild(form.querySelector('.fa.fa-circle-o-notch.fa-spin'));
                    })
                    .then(function(x){
                      var rC = document.getElementById(resultContainerId);
                      rC.addEventListener('change', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var sparkline = sG.querySelectorAll('.sparkline, .sparkline-info');
                        for (var i = 0; i < sparkline.length; i++) {
                          sparkline[i].parentNode.removeChild(sparkline[i]);
                        }
                        form.querySelector('.medium-editor-toolbar-save').insertAdjacentHTML('beforebegin', '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

                        var dataset = e.target.value;
                        var title = e.target.querySelector('*[value="' + e.target.value + '"]').textContent.trim();
                        //XXX: Should this replace the initial search term?
                        form.querySelector('#sparkline-selection-dataset').value = title;
                        form.querySelector('#sparkline-selection-refarea').value = textInputB.toUpperCase();

                        var refArea = textInputB.toUpperCase();
                        var paramDimension = "\n\
  ?propertyRefArea rdfs:subPropertyOf* sdmx-dimension:refArea .\n\
  ?observation ?propertyRefArea [ skos:notation '" + refArea + "' ] .";

// console.log(dataset);
// console.log(refArea);
                        var queryURL = DO.U.SPARQLQueryURL.getObservationsWithDimension(sparqlEndpoint, dataset, paramDimension);
// console.log(queryURL);
                        queryURL = DO.U.getProxyableIRI(queryURL);

                        DO.U.getTriplesFromGraph(queryURL)
                          .then(function(triples){
// console.log(triples);
                            if(triples.length > 0) {
                              var observations = {};
                              triples.forEach(function(t){
                                var s = t.subject.nominalValue;
                                var p = t.predicate.nominalValue;
                                var o = t.object.nominalValue;
                                observations[s] = observations[s] || {};
                                observations[s][p] = o;
                              });
// console.log(observations);
                              var list = [], item;
                              Object.keys(observations).forEach(function(key) {
                                item = {};
                                observations[key]['http://purl.org/linked-data/cube#Observation'] = key;
                                item[key] = observations[key];
                                list.push(item[key]);
                              });
                              var sortByKey = 'http://purl.org/linked-data/sdmx/2009/dimension#refPeriod';
                              list.sort(function (a, b) {
                                return a[sortByKey].toLowerCase().localeCompare(b[sortByKey].toLowerCase());
                              });
// console.log(list);
                              var options = {
                                url: dataset,
                                title: title ,
                                cssStroke: '#000'
                              };
                              var sparkline = DO.U.getSparkline(list, options);
                              sG.insertAdjacentHTML('beforeend', '<span class="sparkline">' + sparkline + '</span> <span class="sparkline-info">' + triples.length + ' observations</span>');
                                form.removeChild(form.querySelector('.fa.fa-circle-o-notch.fa-spin'));
                            }
                            else {
                              //This shouldn't happen.
                              sG.insertAdjacentHTML('beforeend', '<span class="sparkline-info">0 observations. Select another.</span>');
                            }
                          });
                      });
                    });
                  break;
                case 'bookmark':
                  input.content.focus();
                  break;
                default:
                  input.focus();
                  break;
              }

              // If we have a target checkbox, we want it to be checked/unchecked
              // based on whether the existing link has target=_blank
              if (targetCheckbox) {
                targetCheckbox.checked = opts.target === '_blank';
              }

              // If we have a custom class checkbox, we want it to be checked/unchecked
              // based on whether an existing link already has the class
              if (buttonCheckbox) {
                var classList = opts.buttonClass ? opts.buttonClass.split(' ') : [];
                buttonCheckbox.checked = (classList.indexOf(this.customClassOption) !== -1);
              }
            },

            // Called by core when tearing down medium-editor (destroy)
            destroy: function () {
              if (!this.form) {
                return false;
              }

              if (this.form.parentNode) {
                this.form.parentNode.removeChild(this.form);
              }

              delete this.form;
            },

            // core methods

            getFormOpts: function () {
              // no notion of private functions? wanted `_getFormOpts`
              var targetCheckbox = this.getAnchorTargetCheckbox(),
                buttonCheckbox = this.getAnchorButtonCheckbox();
              var opts = {};

              switch(this.action) {
                case 'rdfa':
                  opts.about = this.getInput().about.value;
                  opts.rel = this.getInput().rel.value;
                  opts.href = this.getInput().href.value;
                  opts.typeOf = this.getInput().typeOf.value;
                  opts.resource = this.getInput().resource.value;
                  opts.property = this.getInput().property.value;
                  opts.content = this.getInput().content.value;
                  opts.datatype = this.getInput().datatype.value;
                  break;
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  opts.content = this.getInput().content.value;
                  var aLS = this.getInput().annotationLocationService;
                  if(aLS) { opts.annotationLocationService = aLS.checked };
                  var aLPS = this.getInput().annotationLocationPersonalStorage;
                  if(aLPS) { opts.annotationLocationPersonalStorage = aLPS.checked };
                  opts.license = this.getInput().license.value;
                  break;
                case 'note':
                  opts.content = this.getInput().content.value;
                  opts.tagging = this.getInput().tagging.value;
                  opts.license = this.getInput().license.value;
                  break;
                case 'cite':
                  opts.citationType = this.getInput().citationType.value;
                  opts.citationRelation = this.getInput().citationRelation.value;
                  opts.url = this.getInput().url.value;
                  opts.content = this.getInput().content.value;
                  break;
                case 'bookmark':
                  opts.content = this.getInput().content.value;
                  opts.tagging = this.getInput().tagging.value;
                  break;
                case 'sparkline':
                  opts.search = this.getInput().search.value;
                  opts.select = this.getInput().select.value;
                  opts.sparkline = this.getInput().sparkline.innerHTML;
                  opts.selectionDataSet = this.getInput().selectionDataSet.value;
                  opts.selectionRefArea = this.getInput().selectionRefArea.value;
                  break;
                default:
                  opts.url = this.getInput().value;
                  break;
              }

              opts.target = '_self';
              if (targetCheckbox && targetCheckbox.checked) {
                opts.target = '_blank';
              }

              if (buttonCheckbox && buttonCheckbox.checked) {
                opts.buttonClass = this.customClassOption;
              }

              Object.keys(opts).forEach(function(key) {
                if(typeof opts[key] === 'string') {
                  opts[key] = opts[key].trim();
                }
              });

              return opts;
            },

            doFormSave: function () {
              var opts = this.getFormOpts();
              this.completeFormSave(opts);
            },

            completeFormSave: function (opts) {
// console.log(opts);
// console.log('completeFormSave() with this.action: ' + this.action);
              this.base.restoreSelection();
              var range = MediumEditor.selection.getSelectionRange(this.document);
              var selectedParentElement = this.base.getSelectedParentElement();
// console.log('getSelectedParentElement:');
// console.log(selectedParentElement);

              //Mark the text which the note was left for (with reference to the note?)
              this.base.selectedDocument = this.document;
              this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument); //.replace(DO.C.Editor.regexEmptyHTMLTags, '');
// console.log('this.base.selection:');
// console.log(this.base.selection);

              var exact = this.base.selection;
              var selectionState = MediumEditor.selection.exportSelection(selectedParentElement, this.document);
              var start = selectionState.start;
              var end = selectionState.end;
              var prefixStart = Math.max(0, start - DO.C.ContextLength);
// console.log('pS ' + prefixStart);
              var prefix = selectedParentElement.textContent.substr(prefixStart, start - prefixStart);
// console.log('-' + prefix + '-');
              prefix = DO.U.htmlEntities(prefix);

              var suffixEnd = Math.min(selectedParentElement.textContent.length, end + DO.C.ContextLength);
// console.log('sE ' + suffixEnd);
              var suffix = selectedParentElement.textContent.substr(end, suffixEnd - end);
// console.log('-' + suffix + '-');
              suffix = DO.U.htmlEntities(suffix);

              var datetime = DO.U.getDateTimeISO();
              var id = DO.U.generateAttributeId();
              var refId = 'r-' + id;
              // var noteId = 'i-' + id;

              var resourceIRI = DO.U.stripFragmentFromString(document.location.href);
              var containerIRI = window.location.href;

              var contentType = 'text/html';
              var noteIRI, noteURL;
              var annotationDistribution = [] , aLS = {};

              if(opts.annotationLocationPersonalStorage || (!opts.annotationLocationPersonalStorage && !opts.annotationLocationService && DO.C.User.Storage && DO.C.User.Storage.length > 0)) {
                if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
                  containerIRI = DO.U.forceTrailingSlash(DO.C.User.Storage[0]);
                }
                else {
                  containerIRI = containerIRI.substr(0, containerIRI.lastIndexOf('/') + 1);
                }

                if (typeof DO.C.User.masterWorkspace != 'undefined' && DO.C.User.masterWorkspace.length > 0) {
                  containerIRI = DO.C.User.masterWorkspace + DO.C.InteractionPath;
                }
                else if(typeof DO.C.User.Workspace != 'undefined') {
                  if (typeof DO.C.User.Workspace.Master != 'undefined' && DO.C.User.Workspace.Master.length > 0) {
                    containerIRI = DO.C.User.Workspace.Master + DO.C.InteractionPath;
                  }
                  else if(typeof DO.C.User.Workspace.Public != 'undefined' && DO.C.User.Workspace.Public.length > 0) {
                    containerIRI = DO.C.User.Workspace.Public + DO.C.InteractionPath;
                  }
                }

                contentType = 'text/html';
                noteURL = noteIRI = containerIRI + id;
                aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                annotationDistribution.push(aLS);
              }
              if(opts.annotationLocationService && typeof DO.C.AnnotationService !== 'undefined') {
                containerIRI = DO.C.AnnotationService;
                contentType = 'application/ld+json';
                if(!opts.annotationLocationPersonalStorage && opts.annotationLocationService) {
                  noteURL = noteIRI = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                }
                else if(opts.annotationLocationPersonalStorage) {
                  noteURL = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType };
                }
                else {
                  noteURL = noteIRI = containerIRI + id;
                  aLS = { 'noteURL': noteURL, 'noteIRI': noteIRI, 'contentType': contentType, 'canonical': true };
                }
                annotationDistribution.push(aLS);
              }

// console.log(annotationDistribution);
              //XXX: Defaulting to id but overwritten by motivation symbol
              var refLabel = id;

              var parentNodeWithId = selectedParentElement.closest('[id]');
              var targetIRI = (parentNodeWithId) ? resourceIRI + '#' + parentNodeWithId.id : resourceIRI;

              //Role/Capability for Authors/Editors
              var ref = '', refType = ''; //TODO: reference types. UI needs input
              //TODO: replace refId and noteIRI IRIs

              //This class is added if it is only for display purposes e.g., loading an external annotation for view, but do not want to save it later on (as it will be stripped when 'do' is found)
              var doClass = '';

              //TODO: oa:TimeState's datetime should equal to hasSource value. Same for oa:HttpRequestState's rdfs:value
              // <span about="[this:#' + refId + ']" rel="oa:hasState">(timeState: <time typeof="oa:TimeState" datetime="' + datetime +'" datatype="xsd:dateTime"property="oa:sourceDate">' + datetime + '</time>)</span>\n\

              var noteData = {};
              var note = '';
              var licenseIRI = '';
              var motivatedBy = 'oa:replying';

              switch(this.action) {
                case 'sparkline':
                  var figureIRI = DO.U.generateAttributeId(null, opts.selectionDataSet);
                  ref = '<span rel="schema:hasPart" resource="#figure-' + figureIRI + '">\n\
                  <a href="' + opts.select + '" property="schema:name" rel="prov:wasDerivedFrom" resource="' + opts.select + '" typeof="qb:DataSet">' + opts.selectionDataSet + '</a> [' + DO.U.htmlEntities(DO.C.RefAreas[opts.selectionRefArea]) + ']\n\
                  <span class="sparkline" rel="schema:image" resource="#' + figureIRI + '">' + opts.sparkline + '</span></span>';
                  break;

                //External Note
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  if (DO.U.Editor.MediumEditor.options.id == 'review') {
                    motivatedBy = 'oa:assessing';
                    refLabel = DO.U.getReferenceLabel(motivatedBy);
                  }

                  ref = this.base.selection;
                  licenseIRI = opts.license;

                  noteData = {
                    "type": this.action,
                    "mode": "write",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": opts.content,
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  if (opts.license.length > 0) {
                    noteData.license["iri"] = opts.license;
                  }
                  note = DO.U.createNoteDataHTML(noteData);
                  break;

                //Internal Note
                case 'note':
                  motivatedBy = "oa:commenting";
                  refLabel = DO.U.getReferenceLabel(motivatedBy);
                  docRefType = '<sup class="ref-comment"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup>';
                  noteType = 'note';
                  noteData = {
                    "type": noteType,
                    "mode": "read",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": {
                      "purpose": {
                        "describing": {
                          "text": opts.content
                        },
                        "tagging": {
                          "text": opts.tagging
                        }
                      }
                    },
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  if (opts.license.length > 0) {
                    noteData.license["iri"] = opts.license;
                  }

                  note = DO.U.createNoteDataHTML(noteData);
                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark datatype="rdf:HTML" id="'+ refId +'" property="rdf:value">' + exact + '</mark>' + docRefType +'</span>';
                  break;

                case 'cite': //footnote reference
                  switch(opts.citationType) {
                    case 'ref-footnote': default:
                      motivatedBy = "oa:describing";
                      refLabel = DO.U.getReferenceLabel(motivatedBy);
                      docRefType = '<sup class="' + opts.citationType + '"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup>';
                      noteData = {
                        "type": opts.citationType,
                        "mode": "write",
                        "motivatedByIRI": motivatedBy,
                        "id": id,
                        "refId": refId,
                        "refLabel": refLabel,
                        "iri": noteIRI,
                        "datetime": datetime,
                        "body": opts.content,
                        "citationURL": opts.url
                      };
// console.log(noteData);
                      note = DO.U.createNoteDataHTML(noteData);
                      break;

                    case 'ref-reference':
                      refLabel = DO.U.getReferenceLabel('oa:describing');
                      docRefType = '<span class="' + opts.citationType + '">' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a href="#' + id + '">' + refLabel + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose + '</span>';
                      break;
                  }

                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark datatype="rdf:HTML" id="'+ refId +'" property="rdf:value">' + exact + '</mark>' + docRefType +'</span>';
                  break;
                // case 'reference':
                //   ref = '<span class="ref" about="[this:#' + refId + ']" typeof="dctypes:Text"><span id="'+ refId +'" property="schema:description">' + this.base.selection + '</span> <span class="ref-reference">' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose + '</span></span>';
//                  break;

                case 'rdfa':
                  //TODO: inlist, prefix
                  //TODO: lang/xmlllang
                  noteData = {
                    about: opts.about,
                    typeOf: opts.typeOf,
                    rel: opts.rel,
                    href: opts.href,
                    resource: opts.resource,
                    property: opts.property,
                    content: opts.content,
                    datatype: opts.datatype,
                    textContent: this.base.selection
                    // lang: '' and/or xmllang: ''
                  };
                  ref = DO.U.createRDFaHTML(noteData);
                  break;

                case 'bookmark':
                  noteType = 'bookmark';
                  motivatedBy = "oa:bookmarking";
                  refLabel = DO.U.getReferenceLabel(motivatedBy);
                  noteData = {
                    "type": noteType,
                    "mode": "write",
                    "motivatedByIRI": motivatedBy,
                    "id": id,
                    "refId": refId,
                    "refLabel": refLabel,
                    "iri": noteIRI, //e.g., https://example.org/path/to/article
                    "creator": {},
                    "datetime": datetime,
                    "target": {
                      "iri": targetIRI,
                      "source": resourceIRI,
                      "selector": {
                        "exact": exact,
                        "prefix": prefix,
                        "suffix": suffix
                      }
                      //TODO: state
                    },
                    "body": {
                      "purpose": {
                        "describing": {
                          "text": opts.content
                        },
                        "tagging": {
                          "text": opts.tagging
                        }
                      }
                    },
                    "license": {}
                  };
                  if (DO.C.User.IRI) {
                    noteData.creator["iri"] = DO.C.User.IRI;
                  }
                  if (DO.C.User.Name) {
                    noteData.creator["name"] = DO.C.User.Name;
                  }
                  if (DO.C.User.Image) {
                    noteData.creator["image"] = DO.C.User.Image;
                  }
                  if (DO.C.User.URL) {
                    noteData.creator["url"] = DO.C.User.URL;
                  }
                  note = DO.U.createNoteDataHTML(noteData);
                  ref = '<span class="ref" rel="schema:hasPart" resource="#' + refId + '" typeof="dctypes:Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark></span>';
                  break;
              }
// console.log(note);
// console.log(noteData);

              var selectionUpdated = ref;
              MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

              switch(this.action) {
                case 'article': case 'approve': case 'disapprove': case 'specificity':
                  var notificationType, notificationObject, notificationContext, notificationTarget, notificationStatements;
                  notificationStatements = '    <dl about="' + noteIRI + '">\n\
      <dt>Object type</dt><dd><a about="' + noteIRI + '" typeof="oa:Annotation" href="' + DO.C.Vocab['oaannotation']['@id'] + '">Annotation</a></dd>\n\
      <dt>Motivation</dt><dd><a href="' + DO.C.Prefixes[motivatedBy.split(':')[0]] + motivatedBy.split(':')[1] + '" property="oa:motivation">' + motivatedBy.split(':')[1] + '</a></dd>\n\
    </dl>\n\
';
                  switch(this.action) {
                    default: case 'article': case 'specificity':
                      notificationType = ['as:Announce'];
                      notificationObject = noteIRI;
                      notificationTarget = targetIRI;
                      break;
                    case 'approve':
                      notificationType = ['as:Like'];
                      notificationObject = targetIRI;
                      notificationContext = noteIRI;
                      break;
                    case 'disapprove':
                      notificationType = ['as:Dislike'];
                      notificationObject = targetIRI;
                      notificationContext = noteIRI;
                      break;
                  }

                  var data = DO.U.createHTML(noteIRI, note);

                  annotationDistribution.forEach(function(i){
                    DO.U.serializeData(data, 'text/html', i['contentType'], { 'subjectURI': i['noteIRI'] }).then(
                      function(data) {
                        if(!('canonical' in i)) {
                          switch(i['contentType']) {
                            default: break;
                            case 'application/ld+json':
                              var x = JSON.parse(data);
                              x[0]["via"] = x[0]["@id"];
                              x[0]["@id"] = i['noteURL'];
                              data = JSON.stringify(x);
                              break;
                          }
                        }

                        DO.U.putResource(i['noteURL'], data, i['contentType']).then(
                          function(response) {
                            if(i['canonical']) {
                              DO.U.positionInteraction(i['noteIRI'], document.body).then(
                                function(r) {
// console.log(i);
                                },
                                function(reason) {
                                  console.log(reason);
                                }
                              );

                              //TODO: resourceIRI for getEndpoint should be the closest IRI (not necessarily the document). Test resolve/reject better.
                              DO.U.getEndpoint(DO.C.Vocab['ldpinbox']['@id']).then(
                                function(inbox) {
                                  if (inbox.length > 0) {
                                    inbox = inbox[0];
                                    var notificationData = {
                                      "type": notificationType,
                                      "inbox": inbox,
                                      "slug": id,
                                      "object": notificationObject,
                                      "license": opts.license
                                    };

                                    if(typeof notificationTarget !== 'undefined') {
                                      notificationData['target'] = notificationTarget;
                                    }
                                    if(typeof notificationContext !== 'undefined') {
                                      notificationData['context'] = notificationContext;
                                    }
                                    if(typeof notificationStatements !== 'undefined') {
                                      notificationData['statements'] = notificationStatements;
                                    }

                                    DO.U.notifyInbox(notificationData).then(
                                      function(response) {
// console.log("Notification: " + response.xhr.getResponseHeader('Location'));
                                      },
                                      function(reason) {
                                        console.log(reason);
                                      }
                                    );
                                  }
                                },
                                function(reason) {
                                  console.log('TODO: How can the interaction inform the target?');
                                  console.log(reason);
                                }
                              );
                            }
                          },
                          function(reason) {
                            console.log('PUT failed');
                            console.log(reason);
                          }
                        );
                      }
                    );
                  });
                  break;

                case 'note':
                  var nES = selectedParentElement.nextElementSibling;
                  var asideNote = '\n\
<aside class="note">\n\
'+ note + '\n\
</aside>';
                  var asideNode = DO.U.fragmentFromString(asideNote);
                  var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
                  parentSection.appendChild(asideNode);

                  DO.U.positionNote(refId, refLabel, id);
                  break;

                case 'cite': //footnote reference
                  //TODO: Refactor this what's in positionInteraction

                  switch(opts.citationType) {
                    case 'ref-footnote': default:
                      var nES = selectedParentElement.nextElementSibling;
                      var asideNote = '\n\
<aside class="note">\n\
'+ note + '\n\
</aside>';
                      var asideNode = DO.U.fragmentFromString(asideNote);
                      var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
                      parentSection.appendChild(asideNode);

                      DO.U.positionNote(refId, refLabel, id);
                      break;
                    case 'ref-reference':
                      var options = opts;
                      options['citationId'] = opts.url;
                      options['refId'] = refId;

                      DO.U.getCitation(opts.url, options).then(function(citationGraph) {
                        var citationURI = '';
                        if(opts.url.match(/^10\.\d+\//)) {
                          citationURI = 'http://dx.doi.org/' + opts.url;
                          options.citationId = citationURI;
                        }
                        //FIXME: subjectIRI shouldn't be set here. Bug in RDFaProcessor (see also SimpleRDF ES5/6). See also: https://github.com/linkeddata/dokieli/issues/132
                        else if (opts.url.toLowerCase().indexOf('//dx.doi.org/') >= 0) {
                          citationURI = opts.url;
                          if (opts.url.toLowerCase().startsWith('https:')) {
                            citationURI = opts.url.replace(/^https/, 'http');
                          }
                        }
                        else if (DO.U.stripFragmentFromString(options.citationId) != DO.U.getProxyableIRI(options.citationId)) {
                          citationURI = window.location.origin + window.location.pathname;
                        }
                        else {
                          citationURI = options.citationId;
                        }

                        var citation = DO.U.getCitationHTML(citationGraph, citationURI, options);

                        var r = document.querySelector('#references ol');
                        if (!r) {
                          var section = '<section id="references"><h2>References</h2><div><ol></ol></div></section>';
                          document.querySelector('main article > div').insertAdjacentHTML('beforeend', section);
                          r = document.querySelector('#references ol');
                        }
                        var citationHTML = '<li id="' + id + '">' + citation + '</li>';
                        r.insertAdjacentHTML('beforeend', citationHTML);

// console.log(options.url);
                        var s = citationGraph.child(citationURI);
                        if(s.ldpinbox._array.length == 0) {
                          s = citationGraph.child(options.citationId);
                        }

                        if (s.ldpinbox._array.length > 0) {
                          var inbox = s.ldpinbox.at(0);
// console.log(inbox);

                          var citedBy = location.href.split(location.search||location.hash||/[?#]/)[0] + '#' + options.refId;

                          var notificationStatements = '<' + citedBy + '> <' + options.citationRelation + '> <' + options.url + '> .';

                          notificationStatements = '    <dl about="' + citedBy + '">\n\
      <dt>Action</dt><dd>Citation</dd>\n\
      <dt>Cited by</dt><dd><a href="' + citedBy + '">' + citedBy + '</a></dd>\n\
      <dt>Cites</dt><dd><a href="' + options.url + '" property="' + options.citationRelation + '">' + options.url + '</a></dd>\n\
      <dt>Citation type</dt><dd><a href="' + options.url + '">' + DO.C.Citation[options.citationRelation] + '</a></dd>\n\
    </dl>\n\
';

                          var notificationData = {
                            "type": ['as:Announce'],
                            "inbox": inbox,
                            "object": citedBy,
                            "target": options.url,
                            "statements": notificationStatements
                          };

                          DO.U.notifyInbox(notificationData).then(
                            function(s){
                              console.log('Sent Linked Data Notification to ' + inbox);
                            });
                        }
                      });
                      break;
                  }
                  break;

                case 'bookmark':
                  var data = DO.U.createHTML(noteIRI, note);

                  DO.U.putResource(noteIRI, data).then(
                    function(i) {
                      //TODO: Let the user know that it was bookmarked
                    },
                    function(reason) {
                      console.log('PUT failed');
                      console.log(reason);
                    }
                  );
                  break;
              }

              this.window.getSelection().removeAllRanges();
              this.base.checkSelection();
            },

            checkLinkFormat: function (value) {
              var re = /^(https?|ftps?|rtmpt?):\/\/|mailto:/;
              return (re.test(value) ? '' : 'http://') + value;
            },

            doFormCancel: function () {
              this.base.restoreSelection();
              this.base.checkSelection();
            },

            // form creation and event handling
            attachFormEvents: function (form) {
              var close = form.querySelector('.medium-editor-toolbar-close'),
                save = form.querySelector('.medium-editor-toolbar-save');

              this.on(form, 'click', this.handleFormClick.bind(this));
              this.on(close, 'click', this.handleCloseClick.bind(this));
              this.on(save, 'click', this.handleSaveClick.bind(this), true);
            },

            createForm: function () {
              var doc = this.document,
                form = doc.createElement('div');

              // Anchor Form (div)
              form.className = 'medium-editor-toolbar-form';
              //FIXME
              form.id = 'medium-editor-toolbar-form-textarea-' + this.getEditorId();
              form.innerHTML = this.getTemplate();
              this.attachFormEvents(form);

              return form;
            },

            getInput: function () {
              var r = {};
              switch(this.action) {
                case 'rdfa':
                  r.about = this.getForm().querySelector('#rdfa-about.medium-editor-toolbar-input');
                  r.rel = this.getForm().querySelector('#rdfa-rel.medium-editor-toolbar-input');
                  r.href = this.getForm().querySelector('#rdfa-href.medium-editor-toolbar-input');
                  r.typeOf = this.getForm().querySelector('#rdfa-typeof.medium-editor-toolbar-input');
                  r.resource = this.getForm().querySelector('#rdfa-resource.medium-editor-toolbar-input');
                  r.property = this.getForm().querySelector('#rdfa-property.medium-editor-toolbar-input');
                  r.content = this.getForm().querySelector('#rdfa-content.medium-editor-toolbar-input');
                  r.datatype = this.getForm().querySelector('#rdfa-datatype.medium-editor-toolbar-input');
                  break;
                case 'article':
                  r.content = this.getForm().querySelector('#article-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#article-license.medium-editor-toolbar-select');
                  break;
                case 'note':
                  r.content = this.getForm().querySelector('#article-content.medium-editor-toolbar-textarea');
                  r.tagging = this.getForm().querySelector('#bookmark-tagging.medium-editor-toolbar-input');
                  r.license = this.getForm().querySelector('#article-license.medium-editor-toolbar-select');
                  break;
                case 'approve':
                  r.content = this.getForm().querySelector('#approve-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#approve-license.medium-editor-toolbar-select');
                  break;
                case 'disapprove':
                  r.content = this.getForm().querySelector('#disapprove-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#disapprove-license.medium-editor-toolbar-select');
                  break;
                case 'specificity':
                  r.content = this.getForm().querySelector('#specificity-content.medium-editor-toolbar-textarea');
                  r.annotationLocationService = this.getForm().querySelector('#annotation-location-service');
                  r.annotationLocationPersonalStorage = this.getForm().querySelector('#annotation-location-personal-storage');
                  r.license = this.getForm().querySelector('#specificity-license.medium-editor-toolbar-select');
                  break;
                case 'cite':
                  r.citationType = this.getForm().querySelector('input[name="citation-type"]:checked');
                  r.citationRelation = this.getForm().querySelector('#citation-relation.medium-editor-toolbar-select');
                  r.url = this.getForm().querySelector('#citation-url.medium-editor-toolbar-input');
                  r.content = this.getForm().querySelector('#citation-content.medium-editor-toolbar-textarea');
                  break;
                case 'bookmark':
                  r.content = this.getForm().querySelector('#bookmark-content.medium-editor-toolbar-textarea');
                  r.tagging = this.getForm().querySelector('#bookmark-tagging.medium-editor-toolbar-input');
                  break;
                case 'sparkline':
                  r.search = this.getForm().querySelector('#sparkline-search.medium-editor-toolbar-input');
                  r.select = this.getForm().querySelector('#sparkline-select');
                  r.sparkline = this.getForm().querySelector('#sparkline-graph .sparkline');
                  r.selectionDataSet = this.getForm().querySelector('#sparkline-selection-dataset');
                  r.selectionRefArea = this.getForm().querySelector('#sparkline-selection-refarea');
                  break;

                default:
                  r = this.getForm().querySelector('textarea.medium-editor-toolbar-textarea');
                  break;
              }

              return r;
            },

            getAnchorTargetCheckbox: function () {
              return this.getForm().querySelector('.medium-editor-toolbar-textarea-target');
            },

            getAnchorButtonCheckbox: function () {
              return this.getForm().querySelector('.medium-editor-toolbar-textarea-button');
            },

            handleTextboxKeyup: function (event) {
              // For ENTER -> create the anchor
              if (event.keyCode === MediumEditor.util.keyCode.ENTER) {
                event.preventDefault();
                this.doFormSave();
                return;
              }

              // For ESCAPE -> close the form
              if (event.keyCode === MediumEditor.util.keyCode.ESCAPE) {
                event.preventDefault();
                this.doFormCancel();
              }
            },

            handleFormClick: function (event) {
              // make sure not to hide form when clicking inside the form
              event.stopPropagation();
            },

            handleSaveClick: function (event) {
              // Clicking Save -> create the anchor
              event.preventDefault();
              this.doFormSave();
            },

            handleCloseClick: function (event) {
              // Click Close -> close the form
              event.preventDefault();
              this.doFormCancel();
            }
          });
        }
      })()

    }, //DO.U.Editor

    init: function() {
      if(document.body) {
        DO.U.setPolyfill();
        DO.U.setDocRefType();
        DO.U.showRefs();
        DO.U.setLocalDocument();
        DO.U.buttonClose();
        DO.U.highlightItems();
        DO.U.showDocumentInfo();
        DO.U.showFragment();
        DO.U.setDocumentMode();
        DO.U.showInboxNotifications();
      }
    }
  } //DO.U
}; //DO

document.addEventListener('DOMContentLoaded', function(){ DO.U.init(); });
}
