'use strict'

const Config = require('./config')
const util = require('./util')
const uri = require('./uri')
const ld = require('./simplerdf')
const SimpleRDF = ld.SimpleRDF
const graph = require('./graph')
const template = require('./template')

module.exports = {
  domToString,
  dumpNode,
  getDoctype,
  getDocument,
  createHTML,
  createActivityHTML,
  getClosestSectionNode,
  removeSelectorFromNode,
  getNodeLanguage,
  showActionMessage,
  selectArticleNode,
  insertDocumentLevelHTML,
  setDate,
  createDateHTML,
  setEditSelections,
  getRDFaPrefixHTML,
  setDocumentRelation,
  setDocumentStatus,
  getDocumentStatusHTML,
  buttonClose,
  showTimeMap,
  getResourceInfo
}

function domToString (node, options = {}) {
  var selfClosing = options.selfClosing || []

  var skipAttributes = options.skipAttributes || []

  var noEsc = [ false ]

  return dumpNode(node, options, skipAttributes, selfClosing, noEsc)
}

function dumpNode (node, options, skipAttributes, selfClosing, noEsc) {
  var out = ''

  if (typeof node.nodeType === 'undefined') return out

  if (node.nodeType === 1) {
    if (node.hasAttribute('class') && 'classWithChildText' in options &&
        node.matches(options.classWithChildText.class)) {
      out += node.querySelector(options.classWithChildText.element).textContent
    } else if (!(options.skipNodeWithClass && node.matches('.' + options.skipNodeWithClass))) {
      var ename = node.nodeName.toLowerCase()
      out += '<' + ename

      var attrList = []

      for (let i = node.attributes.length - 1; i >= 0; i--) {
        var atn = node.attributes[i]

        if (skipAttributes.indexOf(atn.name) > -1) continue

        if (/^\d+$/.test(atn.name)) continue

        if (atn.name === 'class' && 'replaceClassItemWith' in options) {
          atn.value.split(' ').forEach(function (aValue) {
            if (options.replaceClassItemWith.source.indexOf(aValue) > -1) {
              var re = new RegExp(aValue, 'g')
              atn.value = atn.value.replace(re, options.replaceClassItemWith.target).trim()
            }
          })
        }

        if (!(atn.name === 'class' && 'skipClassWithValue' in options &&
            options.skipClassWithValue === atn.value)) {
          attrList.push(
            atn.name + '="' +
            atn.value
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;') +
            '"')
        }
      }

      if (attrList.length > 0) {
        if ('sortAttributes' in options && options.sortAttributes) {
          attrList.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase())
          })
        }
        out += ' ' + attrList.join(' ')
      }

      if (selfClosing.indexOf(ename) > -1) {
        out += ' />'
      } else {
        out += '>'
        out += (ename === 'html') ? '\n  ' : ''
        noEsc.push(ename === 'style' || ename === 'script' || ename === 'pre')
        for (var i = 0; i < node.childNodes.length; i++) {
          out += dumpNode(node.childNodes[i], options, skipAttributes, selfClosing, noEsc)
        }
        noEsc.pop()
        out += (ename === 'body' || ename === 'html') ? '</' + ename + '>' + '\n' : '</' + ename + '>'
      }
    }
  } else if (node.nodeType === 8) {
    // FIXME: If comments are not tabbed in source, a new line is not prepended
    out += '\n\
<!--' + node.nodeValue + '-->'
  } else if (node.nodeType === 3 || node.nodeType === 4) {
    // XXX: Remove new lines which were added after DOM ready
    let nl = node.nodeValue.replace(/\n+$/, '')
    out += noEsc[noEsc.length - 1]
      ? nl
      : nl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  } else {
    console.log('Warning; Cannot handle serialising nodes of type: ' + node.nodeType)
  }

  return out
}

function getDoctype () {
  /* Get DOCTYPE from http://stackoverflow.com/a/10162353 */
  var node = document.doctype
  var doctype = ''

  if (node !== null) {
    doctype = '<!DOCTYPE ' +
      node.name +
      (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
      (!node.publicId && node.systemId ? ' SYSTEM' : '') +
      (node.systemId ? ' "' + node.systemId + '"' : '') +
      '>'
  }
  return doctype
}

function getDocument (cn, options) {
  let node = cn || document.documentElement.cloneNode(true)
  options = options || Config.DOMNormalisation

  let doctype = getDoctype()
  let s = (doctype.length > 0) ? doctype + '\n' : ''
  s += domToString(node, options)
  return s
}

function createHTML(title, main, options) {
  title = title || '';
  options = options || {};
  var prefix = ('prefixes' in options && Object.keys(options.prefixes).length > 0) ? ' prefix="' + getRDFaPrefixHTML(options.prefixes) + '"' : '';

  return '<!DOCTYPE html>\n\
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">\n\
  <head>\n\
    <meta charset="utf-8" />\n\
    <title>' + title + '</title>\n\
  </head>\n\
  <body' + prefix + '>\n\
    <main>\n\
' + main + '\n\
    </main>\n\
  </body>\n\
</html>\n\
';
}


function createActivityHTML(o) {
  var prefixes = ' prefix="rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# schema: http://schema.org/ oa: http://www.w3.org/ns/oa# as: https://www.w3.org/ns/activitystreams#"';

  var types = '<dt>Types</dt>'

  o.type.forEach(function (t) {
    types += '<dd><a about="" href="' + Config.Prefixes[t.split(':')[0]] + t.split(':')[1] + '" typeof="'+ t +'">' + t.split(':')[1] + '</a></dd>'
  })

  var asObjectTypes = ''
  if ('object' in o && 'objectTypes' in o && o.objectTypes.length > 0) {
    asObjectTypes = '<dl><dt>Types</dt>'
    o.objectTypes.forEach(function(t){
      asObjectTypes += '<dd><a about="' + o.object + '" href="' + t + '" typeof="'+ t +'">' + t + '</a></dd>'
    })
    asObjectTypes += '</dl>'
  }

  var asObjectLicense = ''
  if ('object' in o && 'objectLicense' in o && o.objectLicense.length > 0) {
    asObjectLicense = '<dl><dt>License</dt><dd><a about="' + o.object + '" href="' + o.objectLicense + '" property="schema:license">' + o.objectLicense + '</a></dd></dl>'
  }

  var asobject = ('object' in o) ? '<dt>Object</dt><dd><a href="' + o.object + '" property="as:object">' + o.object + '</a>' + asObjectTypes + asObjectLicense + '</dd>' : ''

  var asinReplyTo = ('inReplyTo' in o) ? '<dt>In reply to</dt><dd><a href="' + o.inReplyTo + '" property="as:inReplyTo">' + o.inReplyTo + '</a></dd>' : ''

  var ascontext = ('context' in o && o.context.length > 0) ? '<dt>Context</dt><dd><a href="' + o.context + '" property="as:context">' + o.context + '</a></dd>' : ''

  var astarget = ('target' in o && o.target.length > 0) ? '<dt>Target</dt><dd><a href="' + o.target + '" property="as:target">' + o.target + '</a></dd>' : ''

  var datetime = util.getDateTimeISO()
  var asupdated = '<dt>Updated</dt><dd><time datetime="' + datetime + '" datatype="xsd:dateTime" property="as:updated" content="' + datetime + '">' + datetime.substr(0,19).replace('T', ' ') + '</time></dd>'

  var assummary = ('summary' in o && o.summary.length > 0) ? '<dt>Summary</dt><dd property="as:summary" datatype="rdf:HTML">' + o.summary + '</dd>' : ''

  var ascontent = ('content' in o && o.content.length > 0) ? '<dt>Content</dt><dd property="as:content" datatype="rdf:HTML">' + o.content + '</dd>' : ''

  var asactor = (Config.User.IRI) ? '<dt>Actor</dt><dd><a href="' + Config.User.IRI + '" property="as:actor">' + Config.User.IRI + '</a></dd>' : ''

  var license = '<dt>License</dt><dd><a href="' + Config.NotificationLicense + '" property="schema:license">' + Config.NotificationLicense + '</a></dd>'

  var asto = ('to' in o && o.to.length > 0 && !o.to.match(/\s/g) && o.to.match(/^https?:\/\//gi)) ? '<dt>To</dt><dd><a href="' + o.to + '" property="as:to">' + o.to + '</a></dd>' : ''

  var statements = ('statements' in o) ? o.statements : ''

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
  ].map(function (n) { if (n !== '') { return '      ' + n + '\n' } }).join('')


  // TODO: Come up with a better title. reuse `types` e.g., Activity Created, Announced..
  var title = 'Notification'
  if(types.indexOf('as:Announce') > -1){
    title += ': Announced'
  } else if (types.indexOf('as:Create') > -1){
    title += ': Created'
  } else if (types.indexOf('as:Like') > -1){
    title += ': Liked'
  } else if (types.indexOf('as:Dislike') > -1){
    title += ': Disliked'
  } else if (types.indexOf('as:Add') > -1){
    title += ': Added'
  }

  var data = '<article'+prefixes+'>\n\
  <h1>' + title + '</h1>\n\
  <section>\n\
    <dl about="">\n\
' + dl +
'    </dl>\n\
  </section>\n\
  <section>\n\
' + statements + '\n\
  </section>\n\
</article>'

  return data
}

function getClosestSectionNode(node) {
  return node.closest('section') || node.closest('div') || node.closest('article') || node.closest('main') || node.closest('body');
}

function removeSelectorFromNode(node, selector) {
  var clone = node.cloneNode(true);
  var x = clone.querySelectorAll(selector);

  x.forEach(function(i){
    i.parentNode.removeChild(i);
  })

  return clone;
}

function getNodeLanguage(node) {
  node = node || document.body;

  var lang = '';
  var closestLang = node.closest('[lang], [xml\\:lang]');

  if (closestLang) {
    lang = closestLang.getAttribute('lang') || closestLang.getAttributeNS('', 'xml:lang');
  }

  return lang;
}

function showActionMessage(node, message, options) {
  options = options || {};
  options['timer'] = ('timer' in options) ? options.timer : Config.ActionMessage.Timer;

  var message = '<aside id="document-action-message" class="do on"><p>' + message + '</p></aside>';
  node.appendChild(util.fragmentFromString(message));
  window.setTimeout(function () {
    var dam = document.getElementById('document-action-message');
    dam.parentNode.removeChild(dam);
  }, options.timer);
}

function selectArticleNode(node) {
  var x = node.querySelectorAll(Config.ArticleNodeSelectors.join(','));
  return x[x.length - 1];
}

function insertDocumentLevelHTML(rootNode, h, options) {
  rootNode = rootNode || document;
  options = options || {};

  options['id'] = ('id' in options) ? options.id : Config.DocumentItems[Config.DocumentItems.length-1];

  var item = Config.DocumentItems.indexOf(options.id);

  var article = selectArticleNode(rootNode);

  h = '\n\
' + h;

  if(item > -1) {
    for(var i = item; i >= 0; i--) {
      var node = rootNode.querySelector('#' + Config.DocumentItems[i]);

      if (node) {
        node.insertAdjacentHTML('afterend', h);
        break;
      }
      else if (i == 0) {
        var a = article.querySelector('h1');

        if (a) {
          a.insertAdjacentHTML('afterend', h);
        }
        else {
          article.insertAdjacentHTML('afterbegin', h);
        }
        break;
      }
    }
  }
  else {
    article.insertAdjacentHTML('afterbegin', h);
  }

  return rootNode;
}

function setDate(rootNode, options) {
  rootNode = rootNode || document;
  options = options || {};

  var title = ('title' in options) ? options.title : 'Created';

  var id = (options.id) ? options.id : 'document-' + title.toLowerCase().replace(/\W/g, '-');

  var node = ('property' in options) ? rootNode.querySelector('#' + id + ' [property="' + options.property + '"]') : rootNode.querySelector('#' + id + ' time');

  if(node) {
    var datetime = ('datetime' in options) ? options.datetime.toISOString() : util.getDateTimeISO();

    if(node.getAttribute('datetime')) {
      node.setAttribute('datetime', datetime);
    }
    if(node.getAttribute('content')) {
      node.setAttribute('content', datetime);
    }
    node.textContent = datetime.substr(0, datetime.indexOf('T'));
  }
  else {
    rootNode = insertDocumentLevelHTML(rootNode, createDateHTML(options), { 'id': id });
  }

  return rootNode;
}

function createDateHTML(options) {
  options = options || {};

  var title = ('title' in options) ? options.title : 'Created';

  var id = ('id' in options && options.id.length > 0) ? ' id="' + options.id + '"' : ' id="document-' + title.toLowerCase().replace(/\W/g, '-') + '"';

  var c = ('class' in options && options.class.length > 0) ? ' class="' + options.class + '"' : '';

  var datetime = ('datetime' in options) ? options.datetime.toISOString() : util.getDateTimeISO();
  var datetimeLabel = datetime.substr(0, datetime.indexOf('T'));

  var time = ('property' in options)
    ? '<time content="' + datetime + '" datatype="xsd:dateTime" datetime="' + datetime + '" property="' + options.property + '">' + datetimeLabel + '</time>'
    : '<time datetime="' + datetime + '">' + datetimeLabel + '</time>';

  var date = '        <dl'+c+id+'>\n\
      <dt>' + title + '</dt>\n\
      <dd>' + time + '</dd>\n\
    </dl>\n\
';

  return date;
}

function setEditSelections(options) {
  var options = options || {};

  if (!('datetime' in options)) {
    options['datetime'] = new Date();
  }

  var documentAuthor = 'authors';
  var documentAuthorName = 'author-name';
  var dA = document.getElementById(documentAuthor);

  if(dA) {
    if (dA.classList && dA.classList.contains('do') > -1) {
      dA.removeAttribute('class');
    }
    dA.removeAttribute('contenteditable');
  }

  var dANS = document.querySelectorAll('#' + documentAuthorName + ' .selected');
  dANS.forEach(function(authorNameSelected) {
    authorNameSelected.removeAttribute('class');
    authorNameSelected.removeAttribute('contenteditable');
  });

  var dANE = document.querySelectorAll('#' + documentAuthorName + ' .do');
  dANE.forEach(function(i){
    i.parentNode.removeChild(i);
  });

  var dd = document.querySelectorAll('#' + documentAuthorName + ' dd');
  if(dA && dd.length == 0) {
    dA = document.getElementById(documentAuthor);
    dA.parentNode.removeChild(dA);
  }


  var documentLanguage = 'document-language';
  var dLangS = document.querySelector('#' + documentLanguage + ' option:checked');

  if (dLangS) {
    var languageValue = dLangS.value;

    var dl = dLangS.closest('#' + documentLanguage);
    dl.removeAttribute('contenteditable');

    if(languageValue == '') {
      dl.parentNode.removeChild(dl);
    }
    else {
      dl.removeAttribute('class');
      var dd = dLangS.closest('dd');
      dd.parentNode.removeChild(dd);
      dd = '<dd><span content="' + languageValue + '" lang="" property="dcterms:language" xml:lang="">' + Config.Languages[languageValue] + '</span></dd>';
      dl.insertAdjacentHTML('beforeend', dd);
    }
  }


  var documentLicense = 'document-license';
  var dLS = document.querySelector('#' + documentLicense + ' option:checked');

  if (dLS) {
    var licenseIRI = dLS.value;

    var dl = dLS.closest('#' + documentLicense);
    dl.removeAttribute('contenteditable');

    if(licenseIRI == '') {
      dl.parentNode.removeChild(dl);
    }
    else {
      dl.removeAttribute('class');
      var dd = dLS.closest('dd');
      dd.parentNode.removeChild(dd);
      dd = '<dd><a href="' + licenseIRI+ '" rel="schema:license" title="' + Config.License[licenseIRI].description + '">' + Config.License[licenseIRI].name + '</a></dd>';
      dl.insertAdjacentHTML('beforeend', dd);
    }
  }


  var documentStatus = 'document-status';
  var dLS = document.querySelector('#' + documentStatus + ' option:checked');

  if (dLS) {
    var statusIRI = dLS.value;

    var dl = dLS.closest('#' + documentStatus);
    dl.removeAttribute('contenteditable');

    if(statusIRI == '') {
      dl.parentNode.removeChild(dl);
    }
    else {
      dl.removeAttribute('class');
      var dd = dLS.closest('dd');
      dd.parentNode.removeChild(dd);
      dd = '<dd prefix="pso: http://purl.org/spar/pso/" rel="pso:holdsStatusInTime" resource="#' + util.generateAttributeId() + '"><span rel="pso:withStatus" resource="' + statusIRI  + '" typeof="pso:PublicationStatus">' + Config.PublicationStatus[statusIRI].name + '</span></dd>';

      dl.insertAdjacentHTML('beforeend', dd);

      if (statusIRI == 'http://purl.org/spar/pso/published') {
        setDate(document, { 'id': 'document-published', 'property': 'schema:datePublished', 'title': 'Published', 'datetime': options.datetime });
      }
    }
  }
}

function getRDFaPrefixHTML(prefixes){
  return Object.keys(prefixes).map(function(i){ return i + ': ' + prefixes[i]; }).join(' ');
}

function setDocumentRelation(rootNode, data, options) {
  rootNode = rootNode || document;
  if(!data || !options) { return; }

  var h = [];

  var dl = rootNode.querySelector('#' + options.id);

  data.forEach(function(d){
    var documentRelation = '<dd>' + template.createRDFaHTML(d) + '</dd>';

    if(dl) {
      if (Config.DocumentItems.indexOf(options.id) > -1) {
        dd = dl.querySelector('dd');
        dl.removeChild(dd);
      }
      else {
        var relation = dl.querySelector('[rel="' + d.rel +  '"][href="' + d.href  + '"]');

        if(relation) {
          dd = relation.closest('dd');
          if(dd) {
            dl.removeChild(dd);
          }
        }
      }
      dl.insertAdjacentHTML('beforeend', documentRelation);
    }
    else {
      h.push(documentRelation);
    }
  });

  if(h.length > 0) {
    var html = '<dl id="' + options.id + '"><dt>' + options.title + '</dt>' + h.join('') + '</dl>';
    rootNode = insertDocumentLevelHTML(rootNode, html, { 'id': options.id });
  }

  return rootNode;
}

function showTimeMap(node, url) {
  url = url || Config.OriginalResourceInfo['timemap']
  if(!url) { return; }

  var elementId = 'memento-document';

  var displayMemento = '';

  fetcher.getTriplesFromGraph(url)
    .then(triples => {
// console.log(triples)
      if (!node) {
        node = document.getElementById(elementId);
        if(!node) {
          document.documentElement.appendChild(util.fragmentFromString('<aside id="' + elementId + '" class="do on"><h2>Memento</h2>' + Config.Button.Close + '<dl><dt>TimeMap</dt><dd><a href="' + url + '">' + url + '</a></dd></dl></aside>'));
          node = document.getElementById(elementId);
        }
      }

      var timemap = node.querySelector('.timemap');
      if (timemap) {
        node.removeChild(timemap);
      }

      triples = util.sortTriples(triples, { sortBy: 'object' });

      var items = [];
      triples.forEach(function(t){
        var s = t.subject.nominalValue;
        var p = t.predicate.nominalValue;
        var o = t.object.nominalValue;

        if(p === Config.Vocab['schemadateCreated']) {
          items.push('<li><a href="' + s + '" target="_blank">' + o + '</a></li>');
        }
      });

      var html = '<dl class="memento"><dt>Memento</dt><dd><ul>' + items.join('') + '</ul></dd></dl>';

      node.insertAdjacentHTML('beforeend', html);
    })
    .catch(error => {
// console.error(error)
    });
}

function setDocumentStatus(rootNode, options) {
  rootNode = rootNode || document;
  options = options || {};

  var s = getDocumentStatusHTML(rootNode, options);

  rootNode = insertDocumentLevelHTML(rootNode, s, options);

  return rootNode;
}

function getDocumentStatusHTML(rootNode, options) {
  rootNode = rootNode || document;
  options = options || {};
  options['mode'] = ('mode' in options) ? options.mode : '';
  options['id'] = ('id' in options) ? options.id : 'document-status';
  var subjectURI = ('subjectURI' in options) ? ' about="' + options.subjectURI + '"' : '';
  var typeLabel = '', typeOf = '';

  switch(options.type) {
    default:
      definitionTitle = 'Document Status';
      break;
    case 'mem:Memento':
      definitionTitle = 'Resource State';
      typeLabel = 'Memento';
      typeOf = ' typeof="' + options.type + '"';
      break;
  }

  var id = ' id="' + options.id + '"';
  var c = ('class' in options && options.class.length > 0) ? ' class="' + options.class + '"' : '';
  // var datetime = ('datetime' in options) ? options.datetime : util.getDateTimeISO();

  var dd = '<dd><span' + subjectURI + typeOf + '>' + typeLabel + '</span></dd>';

  var s = '';
  var dl = rootNode.querySelector('#' + options.id);

  //FIXME: mode should be an array of operations.

  //TODO: s/update/append
  switch (options.mode) {
    case 'create': default:
      s = '<dl'+c+id+'><dt>' + definitionTitle + '</dt>' + dd + '</dl>';
      break;

    case 'update':
      if(dl) {
        var clone = dl.cloneNode(true);
        dl.parentNode.removeChild(dl);
        clone.insertAdjacentHTML('beforeend', dd);
        s = clone.outerHTML;
      }
      else  {
        s = '<dl'+c+id+'><dt>' + definitionTitle + '</dt>' + dd + '</dl>';
      }
      break;

    case 'delete':
      if(dl) {
        var clone = dl.cloneNode(true);
        dl.parentNode.removeChild(dl);

        var t = clone.querySelector('[typeof="' + options.type + '"]');
        if (t) {
          t.closest('dl').removeChild(t.parentNode);
        }

        var cloneDD = clone.querySelectorAll('#' + options.id + ' dd');
        if (cloneDD.length > 0) {
          s = clone.outerHTML;
        }
      }
      break;
  }

// console.log(s);
  return s;
}

function buttonClose() {
  document.addEventListener('click', function(e) {
    var button = e.target.closest('button.close')
    if (button) {
      var parent = button.parentNode;
      parent.parentNode.removeChild(parent);
    }
  });
}

function getResourceInfo(data, options) {
  data = data || getDocument();

  var info = {
    'state': Config.Vocab['ldpRDFSource']['@id'],
    'profile': Config.Vocab['ldpRDFSource']['@id']
  };

  options = options || {};

  options['contentType'] = ('contentType' in options) ? options.contentType : 'text/html';
  options['subjectURI'] = ('subjectURI' in options) ? options.subjectURI : uri.stripFragmentFromString(document.location.href);

  return graph.getGraphFromData(data, options).then(
    function(i){
      var s = SimpleRDF(Config.Vocab, options['subjectURI'], i, ld.store).child(options['subjectURI']);
// console.log(s);

      info['graph'] = s;
      info['rdftype'] = s.rdftype._array;
      info['profile'] = Config.Vocab['ldpRDFSource']['@id'];

      //Check if the resource is immutable
      s.rdftype.forEach(function(resource) {
        if (resource == Config.Vocab['memMemento']['@id']) {
          info['state'] = Config.Vocab['memMemento']['@id'];
        }
      });

      if (s.reloriginal) {
        info['state'] = Config.Vocab['memMemento']['@id'];
        info['original'] = s.memoriginal;

        if (s.reloriginal == options['subjectURI']) {
          //URI-R (The Original Resource is a Fixed Resource)

          info['profile'] = Config.Vocab['memOriginalResource']['@id'];
        }
        else {
          //URI-M

          info['profile'] = Config.Vocab['memMemento']['@id'];
        }
      }

      if (s.memmemento) {
        //URI-R

        info['profile'] = Config.Vocab['memOriginalResource']['@id'];
        info['memento'] = s.memmemento;
      }

      if(s.memoriginal && s.memmemento && s.memoriginal != s.memmemento) {
        //URI-M (Memento without a TimeGate)

        info['profile'] = Config.Vocab['memMemento']['@id'];
        info['original'] = s.memoriginal;
        info['memento'] = s.memmemento;
      }

      if(s.rellatestversion) {
        info['latest-version'] = s.rellatestversion;
      }

      if(s.relpredecessorversion) {
        info['predecessor-version'] = s.relpredecessorversion;
      }

      if(s.memtimemap) {
        info['timemap'] = s.memtimemap;
      }

      if(s.memtimegate) {
        info['timegate'] = s.memtimegate;
      }

// console.log(info);

      if(!Config.OriginalResourceInfo || ('mode' in options && options.mode == 'update' )) {
        Config['OriginalResourceInfo'] = info;
      }

      Config['ResourceInfo'] = info;

      return info;
  });
}
