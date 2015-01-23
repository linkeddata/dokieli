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
        }
    },

    U: {
        getDocRefType: function() {
            LR.C.DocRefType = $('link[rel="stylesheet"]').attr('href').slice(0, -4).toUpperCase();

            if(LR.C.DocRefType != 'LNCS' || LR.C.DocRefType != 'ACM' || LR.C.DocRefType != 'APA') {
                LR.C.DocRefType = 'LNCS';
            }
        },

        showToC: function() {
            var s = '';
            var section = $('h1 ~ div section[rel="dcterms:hasPart"]:not([id="acknowledgements"]');
            if (section.length > 0) {
                s += '<ol class="toc sortable"><button class="close">x</button>';
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
                s += '</ol>';
            }

            $('body').append(s);
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
            console.log($('.toc > li:first-child > span').text());
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
                    if($('#'+this.id+' > .fragment').length == 0){
                        $('#'+this.id).append('<span class="fragment" style="height:' + this.clientHeight + 'px; "><a href="#' + this.id + '">' + '#' + this.id + '</a></span>');
                        var fragment = $('#'+this.id+' > .fragment');
                        var fragmentClientWidth = fragment.get(0).clientWidth;
                        fragment.css({'right': '-' + (fragmentClientWidth - 2) + 'px'});
                    }

//                    $(this).attr('contenteditable', 'true');
                },
                mouseleave: function () {
                    $('#'+this.id+' > .fragment').remove();

//                    $(this).attr('contenteditable', 'false');
                }
            }, '#content *[id]');
        },

        saveToFile: function(data) {
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

                data = doctype + '\n' + data;
            }
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

        autoSave: function() {
        //TODO
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
        },

        showDocumentStatistics: function() {
            var s = '';
            var count = LR.U.contentCount($('#content').text());

            s += '<div id="document-statistics"><button class="close">x</button><table>\n\
                <caption>Document Statistics</caption>\n\
                <thead>\n\
                    <tr><th>Characters</th><th>Words</th><th>Lines</th></tr>\n\
                </thead>\n\
                <tbody>\n\
                    <tr><td>' + count.characters + '</td><td>' + count.words + '</td><td>' + count.lines + '</td></tr>\n\
                </tbody>\n\
            </table></div>';

            $('body').append(s);
            LR.U.buttonClose();
        },

        contentCount: function(content) {
            return {
                charactersNoSpaces : content.replace(/\s+/g, '').length,
                characters         : content.length,
                words              : content.match(/\S+/g).length,
                lines              : content.split(/\r*\n/).length
            };
        }
    }
};

$(document).ready(function() {
    LR.U.getDocRefType();
//    LR.U.showDocumentStatistics();
//    LR.U.showToC();
//    LR.U.sortToC();
//    LR.U.escape();
//    LR.U.saveToFile(document.documentElement.outerHTML);
    LR.U.openTarget();
    LR.U.buildReferences();
//    LR.U.getLinkedResearch();
    LR.U.showFragment();
});
