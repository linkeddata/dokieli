/** Linked Research
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://github.com/csarven/linked-research
 */

var LR = {
    C: {
        Lang: document.documentElement.lang,
        DocRefType: '',
        RefType: {
            LNCS: {
                InlineOpen: '[',
                InlineClose: ']'
            },
            ACM: {
                InlineOpen: '[',
                InlineClose: ']'
            },
            APA: {
                InlineOpen: '(',
                InlineClose: ')'
            }
        },
        Stylesheets: [],
        UseStorage: false,
        AutoSaveTimer: 60000,
        DisableStorageButtons: '<button class="local-storage-disable-html">Disable</button> | <input id="local-storage-html-autosave" class="autosave" type="checkbox" checked="checked"/> <label for="local-storage-html-autosave">Autosave (1m)</label>',
        EnableStorageButtons: '<button class="local-storage-enable-html">Enable</button>'
    },

    U: {
        showDocumentInfo: function() {
            $('body').append('<aside id="document-info" class="lr"><button class="show">☰</button></aside>');

            $('#document-info.lr').on('click', 'button.show', function() {
                $(this).parent().addClass('on');
                $(this).removeClass('show').addClass('hide');
                LR.U.showStorage();
                LR.U.showViews();
                LR.U.showDocumentMetadata();
                LR.U.showToC();
            });
            $('#document-info.lr').on('click', 'button.hide', function() {
                $(this).parent().removeClass('on').find('section').remove();
                $(this).removeClass('hide').addClass('show');
                $('#table-of-contents').remove();
                LR.U.hideStorage();
            });
        },

        getDocRefType: function() {
            LR.C.DocRefType = $('head link[rel="stylesheet"][title]').attr('title').toUpperCase();

            if(LR.C.DocRefType != 'LNCS' || LR.C.DocRefType != 'ACM' || LR.C.DocRefType != 'APA' || LR.C.DocRefType != 'REC') {
                LR.C.DocRefType = 'LNCS';
            }
        },

        showViews: function() {
            var stylesheets = $('head link[rel~="stylesheet"]:not([href$="lr.css"])');

            if (stylesheets.length > 1) {
                var s = '<section id="views" class="lr"><h2>Views</h2><ul>';
                LR.C.Stylesheets = stylesheets;
                stylesheets.each(function(i, stylesheet) {
                    var view = $(this).attr('href').split("/").pop().slice(0,-4).toUpperCase();
                    if($(this).is('[rel~="alternate"]')) {
                        s += '<li><button>' + view + '</button></li>';
                    }
                    else {
                        s += '<li><button disabled="disabled">' + view + '</button></li>';
                    }
                });
                s += '</ul></section>';

                $('#document-info.lr').append(s);

                $('#views.lr button').on('click', function(event) {
                    var selected = $(this);
                    $('head link[rel~="stylesheet"]:not([href$="lr.css"])').remove();

                    LR.C.Stylesheets.each(function(i, stylesheet) {
                        if ($(this).attr('href').split("/").pop().slice(0,-4).toUpperCase() == selected.text()) {
                            $(this).attr('rel', 'stylesheet');
                        }
                        else {
                            $(this).attr('rel', 'stylesheet alternate');
                        }

                        $(this).attr('media', 'all');
                        $(this).removeAttr('title');
                        $('head').append($(this));
                    });

                    $('#views.lr button:disabled').removeAttr('disabled');
                    $(this).attr('disabled', 'disabled');
                });
            }
        },

        showDocumentMetadata: function() {
            var content = $('#content');
            var count = LR.U.contentCount(content);

            var contributors = '<ul class="contributors">';
            $('#authors .entry-author').each(function(i,contributor) {
                contributors += '<li>' + $(this).find('*[rel~="dcterms:contributor"]').html() + '</li>';
            });
            contributors += '</ul>';

            var documentID = $('#document-identifier a');
            if (documentID.length > 0) {
                documentID = '<tr><th>Document ID</th><td>' + documentID.text() + '</td></tr>';
            }
            else {
                documentID = '';
            }

            var s = '<section id="document-metadata" class="lr"><table>\n\
                <caption>Document Metadata</caption>\n\
                <tbody>\n\
                    ' + documentID + '\n\
                    <tr><th>Authors</th><td>' + contributors + '</td></tr>\n\
                    <tr><th>Characters</th><td>' + count.chars + '</td></tr>\n\
                    <tr><th>Words</th><td>' + count.words + '</td></tr>\n\
                    <tr><th>Lines</th><td>' + count.lines + '</td></tr>\n\
                    <tr><th>A4 Pages</th><td>' + count.pages.A4 + '</td></tr>\n\
                    <tr><th>Bytes</th><td>' + count.bytes + '</td></tr>\n\
                </tbody>\n\
            </table></section>';

            $('#document-info.lr').append(s);
        },

        contentCount: function(c) {
            var content = c.text();
            var linesCount = Math.ceil(c.height() / parseInt(c.css('line-height')));
            return {
                words: content.match(/\S+/g).length,
                chars: content.length,
                lines: linesCount,
                pages: { A4: Math.ceil(linesCount / 47) },
                bytes: encodeURI(document.documentElement.outerHTML).split(/%..|./).length - 1
            };
        },

        showToC: function() {
            var s = '';
            var section = $('h1 ~ div section[rel="dcterms:hasPart"]:not([id="acknowledgements"])');
            if (section.length > 0) {
                s += '<aside id="table-of-contents" class="lr"><button class="close">❌</button><h2>Table of Contents</h2><ol class="toc sortable">';
                section.each(function(i,section) {
                    var h = $(section).find('h2');
                    if (h.length > 0) {
                        s += '<li id="toc.' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a>';
                        section = $(section).find('section[rel="dcterms:hasPart"]');
                        if (section.length > 0) {
                            s += '<ol>';
                            section.each(function(j, section) {
                                var h = $(section).find('h3');
                                if (h.length > 0) {
                                    s += '<li id="toc.' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a>';
                                    section = $(section).find('section[rel="dcterms:hasPart"]');
                                    if (section.length > 0) {
                                        s += '<ol>';
                                        section.each(function(k, section) {
                                            var h = $(section).find('h4');
                                            if (h.length > 0) {
                                                s += '<li id="toc.' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a></li>';
                                            }
                                        });
                                        s += '</ol>';
                                    }
                                    s += '</li>';
                                }
                            });
                            s += '</ol>';
                        }
                        s += '</li>';
                    }
                });
                s += '</ol></aside>';
            }

            $('body').append(s);
            LR.U.sortToC();
            LR.U.buttonClose();
        },

        sortToC: function() {
            $('.sortable').nestedSortable({
                handle: '',
                items: 'li',
                toleranceElement: '',
                placeholder: 'placeholder',
                change: LR.U.updateDocFromToC
            });
        },

        updateDocFromToC: function() {
        },

        buttonClose: function() {
            $('button.close').on('click', function(event) { $(this).parent().remove(); });
        },

        escape: function() {
            $(document).on('keyup', function(event) {
                if(event.keyCode == 27) { // Escape Key
                    $('.toc').remove();
                }
            });
        },

        utf8Tob64: function(s) {
            return window.btoa(encodeURIComponent(escape(s)));
        },

        b64Toutf8: function(s) {
            return unescape(decodeURIComponent(window.atob(s)));
        },

        showFragment: function() {
            $(document).on({
                mouseenter: function () {
                    if($('#'+this.id+' > .lr.fragment').length == 0){
                        $('#'+this.id).append('<span class="lr fragment" style="height:' + this.clientHeight + 'px; "><a href="#' + this.id + '">' + '#' + this.id + '</a></span>');
                        var fragment = $('#'+this.id+' > .lr.fragment');
                        var fragmentClientWidth = fragment.get(0).clientWidth;
                        fragment.css({'right': '-' + (fragmentClientWidth - 2) + 'px'});
                    }

//                    $(this).attr('contenteditable', 'true');
                },
                mouseleave: function () {
                    $('#'+this.id+' > .lr.fragment').remove();

//                    $(this).attr('contenteditable', 'false');
                }
            }, '#content *[id]');
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

        getDocument: function() {
            var html = $('html').clone().wrap('<div></div>').parent();
            html.find('.lr').remove();
            return LR.U.getDoctype() + '\n' + html.html();
        },

        saveToFile: function() {
            var data = LR.U.getDocument();
            //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
            var blob = new Blob([data], {type:'text/html;charset=utf-8'});
            var fileName = 'index.bak.html';

            var a = document.createElement("a");
            a.download = fileName;

            if (window.webkitURL != null) {
                a.href = window.webkitURL.createObjectURL(blob);
            }
            else {
                a.href = window.URL.createObjectURL(blob);
                a.style.display = "none";
                document.body.appendChild(a);
            }

            a.click();
            document.body.removeChild(a);
        },

        initStorage: function(item) {
            if (typeof window.localStorage != 'undefined') {
                LR.U.enableStorage(item);
            }
        },
        enableStorage: function(item) {
            LR.C.UseStorage = true;
            if(localStorage.getItem(item)) {
                document.documentElement.innerHTML = localStorage.getItem(item);
            }
            console.log(LR.U.now() + ': Storage enabled.');
            LR.U.autoSave(item);
        },
        disableStorage: function(item) {
            LR.C.UseStorage = false;
            localStorage.removeItem(item);
            console.log(LR.U.now() + ': Storage disabled.');
        },
        saveStorage: function(item) {
            switch(item) {
                case 'html': default:
                    var object = LR.U.getDocument();
                    break;
            }
            localStorage.setItem(item, object);
        },
        autoSave: function(item) {
            LR.U.saveStorage(item);
            console.log(LR.U.now() + ': Autosaved.');
            setTimeout(function() { LR.U.autoSave(item) }, LR.C.AutoSaveTimer);
        },
        showStorage: function() {
            if (typeof window.localStorage != 'undefined') {
                var useStorage = '';

                if (LR.C.UseStorage) {
                    useStorage = LR.C.DisableStorageButtons;
                }
                else {
                    useStorage = LR.C.EnableStorageButtons;
                }

                $('#document-info').append('<section id="local-storage" class="lr"><h2>Local Storage</h2>\n\
                <p>' + useStorage + '</p>\n\
                </section>');

                $('#local-storage').on('click', 'button.local-storage-enable-html', function(event) {
                    $(this).parent().html(LR.C.DisableStorageButtons);
                    LR.U.enableStorage('html');
                });
                $('#local-storage').on('click', 'button.local-storage-disable-html', function(event) {
                    $(this).parent().html(LR.C.EnableStorageButtons);
                    LR.U.disableStorage('html');
                });
                $('#local-storage').on('click', 'input.autosave', function(event) {
                    if ($(this).attr('checked') == 'checked') {
                        $(this).removeAttr('checked');
                        console.log(LR.U.now() + ': Autosave disabled.');
                    }
                    else {
                        $(this).attr('checked', 'checked');
                        LR.U.autoSave('html');
                        console.log(LR.U.now() + ': Autosave enabled.');
                    }
                });
            }
        },
        hideStorage: function() {
            if (LR.C.UseStorage) {
                $('#local-storage.lr').remove();
            }
        },

        now: function() {
            var date = new Date();
            return date.toISOString();
        },

        openTarget: function() {
            $(document).find("a.external").attr("target", "_blank");
        },

        buildReferences: function() {
            if ($('#references ol').length == 0) {
                //XXX: Not the best way of doing this, but it allows LR references to be added to the right place.
                $('#references').append('\n<ol about="[this:]">\n</ol>\n');

                $('#content span.ref').each(function(i,v) {
                    var referenceText = '';
                    var referenceLink = '';
                    var refId = (i+1);
                    var href = $(v).attr('href');
                    var title = $(v).attr('title');

                    if (title) {
                        referenceText = title.replace(/ & /g, " &amp; ");
                    }
                    if (href) {
                        referenceLink = href.replace(/&/g, "&amp;");
                        referenceLink = '<a href="' + referenceLink + '">' + referenceLink + '</a>';
                        if (title) {
                            referenceLink = ', ' + referenceLink;
                        }
                    }

                    v.outerHTML = ' ' + LR.C.RefType[LR.C.DocRefType].InlineOpen + '<a class="ref" href="#ref-' + refId + '">' + refId + '</a>' + LR.C.RefType[LR.C.DocRefType].InlineClose;

                    $('#references ol').append('\n    <li id="ref-' + refId + '"></li>');

                    if($(v).hasClass('lr')) {
                        LR.U.getLinkedResearch(href, $('#references #ref-' + refId));
                    }
                    else {
                        $('#references #ref-' + refId).html(referenceText + referenceLink);
                    }
                });
            }
        },

        getLinkedResearch: function(iri, resultsNode) {
            //TODO: rdfstore may not be parsing or loading RDFa properly.
            var queryA = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\
PREFIX dcterms: <http://purl.org/dc/terms/>\n\
SELECT ?prefLabel\n\
WHERE {\n\
    OPTIONAL { <" + iri + "> skos:prefLabel ?prefLabel . }\n\
    OPTIONAL { <" + iri + "> rdfs:label ?prefLabel . }\n\
    OPTIONAL { <" + iri + "> dcterms:title ?prefLabel . }\n\
    OPTIONAL { <" + iri + "> skos:notation ?prefLabel . }\n\
    OPTIONAL { <" + iri + "> dcterms:identifier ?prefLabel . }\n\
    FILTER (LANG(?prefLabel) = '' || LANGMATCHES(LANG(?prefLabel), '" + LR.C.Lang + "'))\n\
}\n\
LIMIT 1";

            var store = rdfstore.create();
            store.load('remote', iri, function(success, results){
                if (success) {
                    store.execute(queryA, function(success, results) {
                        if (results.length > 0) {
                            console.log(results);
                            resultsNode.html(results[0].prefLabel.value + ', <a class="href" href="' + iri + '">' + iri + '</a>');
                        }
                        else {
                            console.log("NOPE 2");
                        }
                    });
                }
                else {
                    console.log("NOPE 1");
                }
            });
        }
    }
};

$(document).ready(function() {
//    LR.U.initStorage('html');
//    LR.U.getDocRefType();
    LR.U.showDocumentInfo();
//    LR.U.escape();
//    LR.U.saveToFile();
//    LR.U.openTarget();
//    LR.U.buildReferences();
//    LR.U.getLinkedResearch();
    LR.U.showFragment();
});
