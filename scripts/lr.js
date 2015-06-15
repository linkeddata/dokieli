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
        AutoSaveId: '',
        AutoSaveTimer: 60000,
        DisableStorageButtons: '<button class="local-storage-disable-html">Disable</button> | <input id="local-storage-html-autosave" class="autosave" type="checkbox" checked="checked"/> <label for="local-storage-html-autosave">Autosave (1m)</label>',
        EnableStorageButtons: '<button class="local-storage-enable-html">Enable</button>',
        CDATAStart: '<!--//--><![CDATA[//><!--',
        CDATAEnd: '//--><!]]>'
    },

    U: {
        showDocumentInfo: function() {
            $('body').append('<aside id="document-menu" class="lr"><header><p id="about-linked-research">About <a target="LinkedResearchSource" href="https://github.com/csarven/linked-research">Linked Research</a></p><button class="show" title="Open Menu">☰</button></header><div></div></aside>');

            $('#document-menu.lr').on('click', 'header button.show', LR.U.showDocumentMenu);
            $('#document-menu.lr').on('click', 'header button:not([class="show"])', LR.U.hideDocumentMenu);
        },

        showDocumentMenu: function() {
            var body = $('body');
            var dMenu = $('#document-menu.lr');
            var dMenuButton = dMenu.find('header button');
            var dInfo = dMenu.find('> div');

            dMenuButton.removeClass('show');
            dMenuButton.attr('title', 'Hide Menu');
            dMenu.addClass('on');
            body.addClass('on-document-menu');

            LR.U.showViews(dInfo);
            LR.U.showPrint(dInfo);
            LR.U.showEmbedData(dInfo);
            LR.U.showStorage(dInfo);
            LR.U.showExports(dInfo);
            LR.U.showDocumentMetadata(dInfo);
            if(!body.hasClass("on-slideshow")) {
                LR.U.showToC();
            }

            $(document).on('keyup', LR.U.eventEscapeDocumentMenu);
            $(document).on('click', LR.U.eventLeaveDocumentMenu);
        },

        hideDocumentMenu: function() {
            $(document).off('keyup', LR.U.eventEscapeDocumentMenu);
            $(document).off('click', LR.U.eventLeaveDocumentMenu);

            var body = $('body');
            var dMenu = $('#document-menu.lr');
            var dMenuButton = dMenu.find('header button');

            dMenu.removeClass('on').find('section').remove();
            body.removeClass('on-document-menu');
            dMenuButton.addClass('show');
            dMenuButton.attr('title', 'Open Menu');

            $('#toc').remove();
            $('#embed-data-entry').remove();
            LR.U.hideStorage();
        },

        getDocRefType: function() {
            LR.C.DocRefType = $('head link[rel="stylesheet"][title]').prop('title');

            if (Object.keys(LR.C.RefType).indexOf(LR.C.DocRefType) == -1) {
                LR.C.DocRefType = 'LNCS';
            }
        },

        showViews: function(node) {
            var stylesheets = $('head link[rel~="stylesheet"][title]:not([href$="lr.css"])');

            if (stylesheets.length > 1) {
                var s = '<section id="views" class="lr"><h2>Views</h2><ul>';
                stylesheets.each(function(i, stylesheet) {
                    var view = $(this).prop('title');
                    if($(this).is('[rel~="alternate"]')) {
                        s += '<li><button>' + view + '</button></li>';
                    }
                    else {
                        s += '<li><button disabled="disabled">' + view + '</button></li>';
                    }
                });
                s += '<li><button>Native</button></li>';
                s += '</ul></section>';

                $(node).append(s);

                $('#views.lr button').on('click', function(e) {
                    var selected = $(this);
                    var prevStylesheet = $('head link[rel="stylesheet"][title]:not([href$="lr.css"]):not(disabled)').prop('title') || '';

                    $('head link[rel~="stylesheet"][title]:not([href$="lr.css"])').each(function(i, stylesheet) {
                        $(this).prop('disabled', true); //XXX: Leave this. WebKit wants to trigger this before for some reason.

                        if ($(this).prop('title').toLowerCase() == selected.text().toLowerCase()) {
                            $(this).prop({'rel': 'stylesheet', 'disabled': false});
                        }
                        else {
                            $(this).prop({'rel': 'stylesheet alternate'});
                        }
                    });

                    $('#views.lr button:disabled').removeAttr('disabled');
                    $(this).prop('disabled', 'disabled');

                    if (selected.text().toLowerCase() == 'shower') {
                        $('.slide').addClass('lr');
                        $('body').addClass('on-slideshow list');
                        $('head').append('<meta name="viewport" content="width=792, user-scalable=no"/>');

                        var dM = $('#document-menu');
                        var dMButton = dM.find('header button');

                        dM.removeClass('on').find('section').remove();
                        $('body').removeClass('on-document-menu');
                        dMButton.addClass('show');
                        dMButton.attr('title', 'Open Menu');
                        $('#table-of-contents').remove();
                        LR.U.hideStorage();

                        shower.initRun();
//                        $('head').append('<script src="scripts/shower.js"></script>');
                    }
                    if (prevStylesheet.toLowerCase() == 'shower') {
                        $('.slide').removeClass('lr');
                        $('body').removeClass('on-slideshow list full');
                        $('body').removeAttr('style');
                        $('head meta[name="viewport"][content="width=792, user-scalable=no"]').remove();
//                        $('head script[src="scripts/shower.js"]').remove();

                        history.pushState(null, null, window.location.pathname);
//                        var lH = window.location.href;
//                        window.location.href = lH.substr(0, lH.lastIndexOf('?'));

                        shower.removeEvents();
                    }
                });
            }
        },

        showEmbedData: function(node) {
            $(node).append('<section id="embed-data-in-html" class="lr"><h2>Embed Data</h2><ul><li><button class="embed-data-text-turtle" data-type="text/turtle">Turtle</button></li><li><button class="embed-data-ld-json" data-type="application/ld+json">JSON-LD</button></li></ul></section>');

            $('#embed-data-in-html').on('click', 'button', function(e){
                var scriptType = $(this).data('type');
                var scriptHead = '';
                var cdataStart = cdataEnd = '';

                switch(scriptType) {
                    case 'text/turtle': default:
                        scriptHead += '<script type="text/turtle"';
                        cdataStart = '# ' + LR.C.CDATAStart + '\n';
                        cdataEnd = '\n# ' + LR.C.CDATAEnd;
                        break;
                    case 'application/ld+json':
                        scriptHead += '<script type="application/ld+json"';
                        break;
                }

                var scriptCurrent = $('head script[type="' + scriptType +'"][class="lr"]');
                var scriptCurrentData = '';

                if (scriptCurrent.length > 0) {
                    scriptCurrentData = scriptCurrent.html().split(/\r\n|\r|\n/);
                    scriptCurrentData.shift();
                    scriptCurrentData.pop();
                    scriptCurrentData = scriptCurrentData.join('\n');
                }

                $('body').append('<aside id="embed-data-entry" class="lr on"><button class="close">❌</button><h2>Embed Data</h2><p><code>' + LR.U.htmlEntities(scriptHead) + '></code></p><textarea cols="80" rows="24">' + scriptCurrentData + '</textarea><p><code>&lt;/script&gt;</code></p><button class="save">Save</button></aside>');

                $('#embed-data-entry').on('click', 'button.save', function(e) {
                    var scriptEntry = $(this).parent().find('textarea').val();

                    if (scriptEntry.length > 0) {
                        if (scriptCurrent.length > 0) {
                            scriptCurrent.html(cdataStart + scriptEntry +  cdataEnd);
                        }
                        else {
                            $('head').append(scriptHead + ' class="lr">' + cdataStart + scriptEntry + cdataEnd + '</script>');
                        }
                    }
                    else {
                        scriptCurrent.remove();
                    }

                    $('#embed-data-entry').remove();
                });
            });
        },

        htmlEntities: function(s) {
            return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g,'&apos');
        },

        showDocumentMetadata: function(node) {
            var content = $('#content');
            var count = LR.U.contentCount(content);

            var contributors = '<ul class="contributors">';
            $('#authors *[rel*="contributor"]').each(function(i,contributor) {
                contributors += '<li>' + $(this).html() + '</li>';
            });
            contributors += '</ul>';

//            var documentID = $('#document-identifier a');
//            if (documentID.length > 0) {
//                documentID = '<tr><th>Document ID</th><td>' + documentID.text() + '</td></tr>';
//            }
//            else {
//                documentID = '';
//            }

            var s = '<section id="document-metadata" class="lr"><table>\n\
                <caption>Document Metadata</caption>\n\
                <tbody>\n\
                    <tr><th>Authors</th><td>' + contributors + '</td></tr>\n\
                    <tr><th>Characters</th><td>' + count.chars + '</td></tr>\n\
                    <tr><th>Words</th><td>' + count.words + '</td></tr>\n\
                    <tr><th>Lines</th><td>' + count.lines + '</td></tr>\n\
                    <tr><th>A4 Pages</th><td>' + count.pages.A4 + '</td></tr>\n\
                    <tr><th>Bytes</th><td>' + count.bytes + '</td></tr>\n\
                </tbody>\n\
            </table></section>';

            $(node).append(s);
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
            var section = $('h1 ~ div section:not([class~="slide"]):not([id^=table-of])');

            if (section.length > 0) {
                var s = '';
                var sortable = '';

                if($('head script[src$="html.sortable.min.js"]').length > 0) {
                    sortable = ' sortable';
                }

                s += '<aside id="toc" class="lr on' + sortable + '"><button class="close">❌</button><h2>Table of Contents</h2><ol class="toc' + sortable + '">';
                s += LR.U.getListOfSections(section, true);
                s += '</ol></aside>';

                $('body').append(s);
                if($('head script[src$="html.sortable.min.js"]').length > 0) {
                    LR.U.sortToC();
                }
            }
        },

        sortToC: function() {
            $('.sortable').sortable({
                connectWith: '.connected'
            });

            $('.sortable').sortable().bind('sortupdate', function(e, ui) {
//ui.item contains the current dragged element.
//ui.item.index() contains the new index of the dragged element
//ui.oldindex contains the old index of the dragged element
//ui.startparent contains the element that the dragged item comes from
//ui.endparent contains the element that the dragged item was added to

//console.log(ui);
//console.log(ui.item);
//console.log(ui.startparent);
//console.log(ui.oldindex);
//console.log(ui.endparent);
//console.log(ui.item.index());

                var id  = $(ui.item).attr('data-id');
                var node = $('#' + id);

                var endParentId = $(ui.endparent).parent().attr('data-id') || 'content';
                var endParent = $('#' + endParentId);
                var endParentHeading = endParent.find('> :header');
                endParentHeading = (endParentHeading.length > 0) ? parseInt(endParentHeading.prop("tagName").substring(1)) : 1;
                var afterNode = (endParentHeading == 1) ? endParent.find('> section:nth-of-type(' + ui.item.index() +')')  : endParent.find('*:nth-of-type(1) > section:nth-of-type(' + ui.item.index() +')');

                var aboutContext = (endParentId == 'content') ? '' : '#' + endParentId;
                node.attr('about', '[this:' + aboutContext +']');

                var nodeDetached = node.detach();

                var nodeDetachedHeading = nodeDetached.find('> :header');
                nodeDetachedHeading = (nodeDetachedHeading.length > 0) ? parseInt(nodeDetachedHeading.prop("tagName").substring(1)) : 1;

                var nH = (endParentHeading + 1) - nodeDetachedHeading;
                nodeDetached.find(':header:nth-of-type(1)').each(function(i, heading) {
                    var oldHeadingIndex = parseInt($(heading).prop("tagName").substring(1));
                    var newHeadingIndex = oldHeadingIndex + nH;

                    var newHeading = $('<h' + newHeadingIndex + '></h' + newHeadingIndex + '>');
                    $.each(heading.attributes, function(index) {
                        $(newHeading).attr(heading.attributes[index].name, heading.attributes[index].value);
                    });
                    $(newHeading).html($(heading).html());
                    $(heading).after(newHeading).remove();
                });

                afterNode.after(nodeDetached);
            });
        },

        getListOfSections: function(section, sortable) {
            var s = attributeClass = '';
            if (sortable == true) { attributeClass = ' class="sortable"'; }

            section.each(function(i,section) {
                var h = $(section).find('> h2');
                if (h.length > 0) {
                    s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a>';
                    section = $(section).find('section[rel*="hasPart"]:not([class~="slide"])');
                    if (section.length > 0) {
                        s += '<ol'+ attributeClass +'>';
                        section.each(function(j, section) {
                            var h = $(section).find('> h3');
                            if (h.length > 0) {
                                s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a>';
                                section = $(section).find('section[rel*="hasPart"]:not([class~="slide"])');
                                if (section.length > 0) {
                                    s += '<ol'+ attributeClass +'>';
                                    section.each(function(k, section) {
                                        var h = $(section).find('> h4');
                                        if (h.length > 0) {
                                            s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a>';
                                            section = $(section).find('section[rel*="hasPart"]:not([class~="slide"])');
                                            if (section.length > 0) {
                                                s += '<ol'+ attributeClass +'>';
                                                section.each(function(k, section) {
                                                    var h = $(section).find('> h5');
                                                    if (h.length > 0) {
                                                        s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + h.text() + '</a></li>';
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
                    s += '</li>';
                }
            });

            return s;
        },

        buildTableOfStuff: function(listType) {
            var s = elementId = elementTitle = titleType = tableHeading = '';
            var tableList = [];

            if (listType) { tableList = [listType]; }
            else { tableList = ['content', 'figure', 'table']; }

            tableList.forEach(function(element) {
                var e = $(element);
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
                        case 'content': default:
                            titleType = '';
                            tableHeading = 'Table of Contents';
                            break;
                    }

                    s += '<nav id="table-of-'+ element +'s">';
                    s += '<h2>' + tableHeading + '</h2>';
                    s += '<div><ol class="toc">';
                    if (element == 'content') {
                        s += LR.U.getListOfSections($('h1 ~ div section:not([class~="slide"])'), false);
                    }
                    else {
                        e.each(function(i,v) {
                            elementId = $(this).attr('id');
                            elementTitle = $(this).find(titleType).text();

                            s += '<li><a href="#' + elementId +'">' + elementTitle  +'</a></li>';
                        });
                    }
                    s += '</ol></div>';
                    s += '</nav>';
                }
            });

            //XXX: Tries to find a suitable place to insert.
            var i = $('#document-status');
            if (i.length > 0) { i.after(s); }
            else {
                i = $('#introduction');
                if (i.length > 0) { i.before(s); }
                else {
                    i = $('#prologue');
                    if (i.length > 0) { i.before(s); }
                    else {
                        i = $('#keywords');
                        if (i.length > 0) { i.after(s); }
                        else {
                            i = $('#categories-and-subject-descriptors');
                            if (i.length > 0) { i.after(s); }
                            else { $('#content').prepend(s); }
                        }
                    }
                }
            }
        },

        buttonClose: function() {
            $(document).on('click', 'button.close', function(e) { $(this).parent().remove(); });
        },

        eventEscapeDocumentMenu: function(e) {
            if (e.keyCode == 27) { // Escape
                LR.U.hideDocumentMenu();
            }
        },

        eventLeaveDocumentMenu: function(e) {
            if (!$(e.target).closest('aside.lr.on').length) {
                LR.U.hideDocumentMenu();
            }
        },

        utf8Tob64: function(s) {
            return window.btoa(encodeURIComponent(escape(s)));
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

        showFragment: function() {
            $(document).on({
                mouseenter: function () {
                    if($('#'+this.id+' > .lr.fragment').length == 0){
                        $('#'+this.id).append('<span class="lr fragment" style="height:' + this.clientHeight + 'px; "><a href="#' + this.id + '">' + '#' + this.id + '</a></span>');
                        var fragment = $('#'+this.id+' > .lr.fragment');
                        var fragmentClientWidth = fragment.get(0).clientWidth;
                        fragment.css({'right': '-' + (fragmentClientWidth - 2) + 'px'});
                    }
                },
                mouseleave: function () {
                    $('#'+this.id+' > .lr.fragment').remove();
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

        saveAsHTML: function() {
            var data = LR.U.getDocument();
            //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
            var blob = new Blob([data], {type:'text/html;charset=utf-8'});
            var pattern = /[^\w]+/ig;
            var title = $('h1').text().toLowerCase().replace(pattern, '-') || "index";
            var timestamp = LR.U.now().replace(pattern, '') || "now";

            var fileName = title + '.' + timestamp + '.html';

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

        showExports: function(node) {
            $(node).append('<section id="export-files" class="lr"><h2>Export</h2><ul><li><button class="export-file-html">HTML</button></li></ul></section>');
            $('#export-files').on('click', '.export-file-html', LR.U.saveAsHTML);
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
            LR.U.enableAutoSave(item);
        },
        disableStorage: function(item) {
            LR.C.UseStorage = false;
            localStorage.removeItem(item);
            LR.U.disableAutoSave(item);
            console.log(LR.U.now() + ': Storage disabled.');
        },
        saveStorage: function(item) {
            switch(item) {
                case 'html': default:
                    var object = LR.U.getDocument();
                    break;
            }
            localStorage.setItem(item, object);
            console.log(LR.U.now() + ': Document saved.');
        },
        enableAutoSave: function(item) {
            LR.C.AutoSaveId = setInterval(function() { LR.U.saveStorage(item) }, LR.C.AutoSaveTimer);
            console.log(LR.U.now() + ': Autosave enabled.');
        },
        disableAutoSave: function(item) {
            clearInterval(LR.C.AutoSaveId);
            console.log(LR.U.now() + ': Autosave disabled.');
        },
        showStorage: function(node) {
            if (typeof window.localStorage != 'undefined') {
                var useStorage = '';

                if (LR.C.UseStorage) {
                    useStorage = LR.C.DisableStorageButtons;
                }
                else {
                    useStorage = LR.C.EnableStorageButtons;
                }

                $(node).append('<section id="local-storage" class="lr"><h2>Local Storage</h2>\n\
                <p>' + useStorage + '</p>\n\
                </section>');

                $('#local-storage').on('click', 'button.local-storage-enable-html', function(e) {
                    $(this).parent().html(LR.C.DisableStorageButtons);
                    LR.U.enableStorage('html');
                });
                $('#local-storage').on('click', 'button.local-storage-disable-html', function(e) {
                    $(this).parent().html(LR.C.EnableStorageButtons);
                    LR.U.disableStorage('html');
                });
                $('#local-storage').on('click', 'input.autosave', function(e) {
                    if ($(this).attr('checked') == 'checked') {
                        $(this).removeAttr('checked');
                        LR.U.disableAutoSave('html');
                    }
                    else {
                        $(this).attr('checked', 'checked');
                        LR.U.enableAutoSave('html');
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
                $('#references').append('\n<ol>\n</ol>\n');

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
                        referenceLink = '<a about="[this:]" rel="schema:citation" href="' + referenceLink + '">' + referenceLink + '</a>';
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
    OPTIONAL { <" + iri + "> schema:name ?prefLabel . }\n\
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

        showPrint: function(node) {
            $(node).append('<section id="document-print" class="lr"><h2>Digital</h2></section>');

            var actionPrint = $('<p></p>');
            $('#document-print').append(actionPrint);
            LR.U.showPrintButton(actionPrint);
            actionPrint.append(' (current view)');
        },

        showPrintButton: function(node) {
            $('<button>⎙ Print</button>').on('click', function(e) {
                LR.U.hideDocumentMenu();
                window.print();
                return false;
            }).appendTo(node);
        },

        highlightItems: function() {
            var d = $(document);
            d.on({
                mouseenter: function () {
                    var c = $(this).prop('class');
                    d.find('*[class="'+ c +'"]').addClass('lr highlight');
                },
                mouseleave: function () {
                    var c = $(this).prop('class');
                    d.find('*[class="'+ c +'"]').removeClass('lr highlight');
                }
            }, '*[class*="highlight-"]');
        }
    }
};

$(document).ready(function() {
//    LR.U.initStorage('html');
//    LR.U.getDocRefType();
    LR.U.buttonClose();
    LR.U.highlightItems();
    LR.U.showDocumentInfo();
//    LR.U.openTarget();
//    LR.U.buildReferences();
//    LR.U.getLinkedResearch();
    LR.U.showFragment();
});
