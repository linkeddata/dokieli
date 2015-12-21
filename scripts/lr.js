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
        User: {
            IRI: null
        },
        LocalDocument: false,
        UseStorage: false,
        AutoSaveId: '',
        AutoSaveTimer: 60000,
        DisableStorageButtons: '<button class="local-storage-disable-html">Disable</button> | <input id="local-storage-html-autosave" class="autosave" type="checkbox" checked="checked"/> <label for="local-storage-html-autosave">Autosave (1m)</label>',
        EnableStorageButtons: '<button class="local-storage-enable-html">Enable</button>',
        CDATAStart: '<!--//--><![CDATA[//><!--',
        CDATAEnd: '//--><!]]>',
        EditorAvailable: ($('head script[src$="medium-editor.min.js"]').length > 0),
        EditorEnabled: false,
        Editor: {
            headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
            regexEmptyHTMLTags: /<[^\/>][^>]*><\/[^>]+>/gim,
            DisableEditorButton: '<button class="editor-disable">Read</button>',
            EnableEditorButton: '<button class="editor-enable">Edit</button>'
        },
        InteractionPath: 'i/',

        Vocab: {
            "rdftype": {
                "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                "@type": "@id",
                "@array": true
            },
            "foafname": "http://xmlns.com/foaf/0.1/name",
            "foafhomepage": {
                "@id": "http://xmlns.com/foaf/0.1/homepage",
                "@type": "@id"
            },
            "foafimg": {
                "@id": "http://xmlns.com/foaf/0.1/img",
                "@type": "@id"
            },
            "foafnick": "http://xmlns.com/foaf/0.1/nick",
            "foafmaker": {
                "@id": "http://xmlns.com/foaf/0.1/maker",
                "@type": "@id"
            },

            "schemaname": "http://schema.org/name",
            "schemaurl": {
                "@id": "http://schema.org/url",
                "@type": "@id"
            },
            "schemaimage": {
                "@id": "http://schema.org/image",
                "@type": "@id"
            },
            "schemacreator": {
                "@id": "http://schema.org/creator",
                "@type": "@id"
            },

            "dctermstitle": "http://purl.org/dc/terms/title",

            "storage": {
                "@id": "http://www.w3.org/ns/pim/space#storage",
                "@type": "@id",
                "@array": true
            },
            "preferencesFile": {
                "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
                "@type": "@id"
            },
            "workspace": {
                "@id": "http://www.w3.org/ns/pim/space#workspace",
                "@type": "@id",
                "@array": true
            },
            "masterWorkspace": {
                "@id": "http://www.w3.org/ns/pim/space#masterWorkspace",
                "@type": "@id"
            },

            "pingbackto": {
                "@id": "http://purl.org/net/pingback/to",
                "@type": "@id",
                "@array": true
            },
            "solidinbox": {
                "@id": "http://www.w3.org/ns/solid/terms#inbox",
                "@type": "@id",
                "@array": true
            }
        }
    },

    U: {
        setUser: function() {
            var request = $.ajax({
                url: window.location.origin + window.location.pathname,
                method: "HEAD"
            });

            request.done(function(data, textStatus, xhr) {
                LR.C.User.IRI = xhr.getResponseHeader('User');

                //XXX: Decide whether to leave setUserInfo or call only when really needed
                LR.U.setUserInfo(LR.C.User.IRI);
            });

            request.fail(function(xhr, textStatus) {
                console.log("Request failed: " + textStatus);
                //TODO
            });
        },

        setUserInfo: function(userIRI) {
            if (LR.C.User.IRI) {
                var pIRI = userIRI;
                if (pIRI.slice(0, 5).toLowerCase() != 'https') {
                    pIRI = document.location.origin + '/,proxy?uri=' + LR.U.encodeString(pIRI);
                }
                console.log(pIRI);

                var g = SimpleRDF(LR.C.Vocab);
                g.iri(pIRI).get().then(
                    function(i) {
                        var s = i.iri(userIRI);
                        console.log(s);
                        if (s.foafname) {
                            LR.C.User.Name = s.foafname;
                            console.log(LR.C.User.Name);
                        }
                        else {
                            if (s.schemaname) {
                                LR.C.User.Name = s.schemaname;
                                console.log(LR.C.User.Name);
                            }
                        }

                        if (s.foafimg) {
                            LR.C.User.Image = s.foafimg;
                            console.log(LR.C.User.Image);
                        }
                        else {
                            if (s.schemaimage) {
                                LR.C.User.Image = s.schemaimage;
                                console.log(LR.C.User.Image);
                            }
                        }

                        if (s.storage) {
                            LR.C.User.Storage = s.storage;
                            console.log(LR.C.User.Storage);
                        }
                        if (s.preferencesFile) {
                            LR.C.User.PreferencesFile = s.preferencesFile;
                            console.log(LR.C.User.PreferencesFile);

                            //XXX: Probably https so don't bother with proxy?
                            g.iri(LR.C.User.PreferencesFile).get().then(
                                function(pf) {
                                    LR.C.User.PreferencesFileGraph = pf;
                                    var s = pf.iri(LR.C.User.IRI);

                                    if (s.masterWorkspace) {
                                        LR.C.User.masterWorkspace = s.masterWorkspace;
                                    }

                                    if (s.workspace) {
                                        LR.C.User.Workspace = { List: s.workspace };
                                        //XXX: Too early to tell if this is a good/bad idea. Will revise any way. A bit hacky right now.
                                        s.workspace.forEach(function(workspace) {
                                            var wstype = pf.iri(workspace).rdftype || [];
                                            wstype.forEach(function(w) {
                                                switch(w) {
                                                    case 'http://www.w3.org/ns/pim/space#PreferencesWorkspace':
                                                        LR.C.User.Workspace.Preferences = workspace;
                                                        ;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#MasterWorkspace':
                                                        LR.C.User.Workspace.Master = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#PublicWorkspace':
                                                        LR.C.User.Workspace.Public = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#PrivateWorkspace':
                                                        LR.C.User.Workspace.Private = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#SharedWorkspace':
                                                        LR.C.User.Workspace.Shared = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#ApplicationWorkspace':
                                                        LR.C.User.Workspace.Application = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#Workspace':
                                                        LR.C.User.Workspace.Work = workspace;
                                                        break;
                                                    case 'http://www.w3.org/ns/pim/space#FamilyWorkspace':
                                                        LR.C.User.Workspace.Family = workspace;
                                                        break;
                                                }
                                            });
                                        });
                                    }

                                    console.log(LR.C.User.Workspace);
                                },
                                function(reason) { console.log(reason);}
                            );
                        }
                    },
                    function(reason) { console.log(reason); }
                );
            }
        },

        setLocalDocument: function() {
            if (document.location.protocol == 'file:') {
                LR.C.LocalDocument = true;
            }
        },

        putPingbackTriple: function(url, pingbackOf, pingbackTo) {
            var data = '<'+ pingbackOf + '> <http://purl.org/net/pingback/to> <' + pingbackTo + '> .';

            LR.U.putResource(url, data, 'text/turtle');
        },

        //Copied from https://github.com/deiu/solid-plume/blob/gh-pages/app/solid.js
        parseLinkHeader: function(link) {
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
                    rels[rel] = href;
                }
            }
            return rels;
        },

        getInbox: function(url) {
            return new Promise(function(resolve, reject) {
                if (url.indexOf('#') != -1) {
                    return resolve(LR.U.getInboxFromRDF(url));
                }
                else {
                    var response = LR.U.getResourceHeader(url);
                    response.done(function(data, textStatus, xhr) {
                        console.log(data);
                        console.log(textStatus);
                        console.log(xhr);
                        // var link = LR.U.parseLinkHeader(xhr.getResponseHeader('Link'));
                        // if(link['pingback:to'] && link['pingback:to'].length > 0) {
                        //     return resolve(link['pingback:to']);
                        // }
                        // else {
                        //     if(link['meta'] && link['meta'].length > 0) {
                        //         var response = LR.U.getResourceHeader(link['meta']);
                        //         response.done(function(data, textStatus, xhr) {
                        //             console.log(data);
                        //             console.log(textStatus);
                        //             console.log(xhr);
                        //             return resolve(LR.U.getInboxFromRDF(link['meta'], url));
                        //         });
                        //     }

                            console.log('XXX: Our last chance');
                            return resolve(LR.U.getInboxFromRDF(url));
                        // }
                    });
                    response.fail(function(xhr, textStatus) {
                        console.log(xhr);
                        console.log("Request failed: " + textStatus);
                        return reject(xhr);
                    });
                }
            });
        },

        getInboxFromRDF: function(url, subjectIRI) {
            subjectIRI = subjectIRI || url;
            var pIRI = url;
            if (pIRI.slice(0, 5).toLowerCase() != 'https') {
                pIRI = document.location.origin + '/,proxy?uri=' + LR.U.encodeString(pIRI);
            }
            console.log(pIRI);
            console.log(subjectIRI);

            return new Promise(function(resolve, reject) {
                var g = SimpleRDF(LR.C.Vocab);
                g.iri(pIRI).get().then(
                    function(i) {
                        var s = i.iri(subjectIRI);
                        console.log(s);
                        if (s.solidinbox) {
                            console.log(s.solidinbox);
                            return resolve(s.solidinbox);
                        }
                    },
                    function(reason) {
                        console.log(reason);
                        return reject(reason);
                    }
                );
            });
        },

        getResourceHeader: function(url) {
            return $.ajax({
                url: url,
                method: "HEAD"
            });
        },

        getResource: function(url, headers) {
            headers = headers || {};
            console.log(headers['Accept']);
            if(typeof headers['Accept'] == 'undefined') {
                headers['Accept'] = 'text/turtle; charset=utf-8';
            }

            return $.ajax({
                method: "GET",
                headers: headers,
                url: url,
                xhrFields: {
                    withCredentials: true
                }
            });
        },

        xhrResponse: function(response) {
            response.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            response.fail(function(xhr, textStatus) {
                console.log(xhr);
                console.log("Request failed: " + textStatus);
            });
        },

        patchResource: function(url, headers, deleteBGP, insertBGP) {
            headers = headers || {};
            headers['Content-Type'] = 'application/sparql-update; charset=utf-8';

            //insertBGP and deleteBGP are basic graph patterns.
            if (deleteBGP) {
                deleteBGP = 'DELETE DATA { ' + deleteBGP + ' };';
            }

            if (insertBGP) {
                insertBGP = 'INSERT DATA { ' + insertBGP + ' };';
            }

            var request = $.ajax({
                method: "PATCH",
                url: url,
                headers: headers,
                data: deleteBGP + insertBGP,
                xhrFields: {
                    withCredentials: true
                }
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            request.fail(function(xhr, textStatus) {
                console.log(xhr);
                console.log("Request failed: " + textStatus);
            });
        },

        putResource: function(url, data, contentType, links) {
            //FIXME: index.html shouldn't be hardcoded.
            url = url || window.location.origin + window.location.pathname;
            contentType = contentType || 'text/html';
            var ldpResource = '<http://www.w3.org/ns/ldp#Resource>; rel="type"';
            links = (links) ? ldpResource + ', ' + links : ldpResource;

            var headers = {
                'Content-Type': contentType + '; charset=utf-8',
                'Link': links
            };
            data = data || LR.U.getDocument();

            return new Promise(function(resolve, reject) {
                var request = $.ajax({
                    method: "PUT",
                    url: url,
                    headers: headers,
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    }
                });
                request.done(function(data, textStatus, xhr) {
                    console.log(data);
                    console.log(textStatus);
                    console.log(xhr)
                    return resolve(xhr);
                });
                request.fail(function(xhr, textStatus) {
                    console.log("Request failed: " + textStatus);
                    return reject(xhr);
                });
            });
        },

        //TODO: Make sure that the Container is relative to the Container of the document e.g:
        //http://example.org/i/article (points to http://example.org/i/article/index.html)
        //http://example.org/i/article/ is an ldp:Container
        //http://example.org/i/article/i/ is an ldp:Container
        //TODO: get e.g., as:replies <object>, and post there (object is as:Collection)
        createContainer: function(url, slug) {
            var headers = {
                'Content-Type': 'text/turtle; charset=utf-8',
                'Link': '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"'
            };
            if (slug != '') {
                headers.Slug = slug;
            }

            var request = $.ajax({
                method: 'POST',
                url: url,
                headers: headers,
                xhrFields: { withCredentials: true },
                data: '<> <http://schema.org/name> "BasicContainer for interactions"@en .',
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            request.fail(function(xhr, textStatus) {
                console.log(xhr);
                console.log("Request failed: " + textStatus);
            });
        },

        //POST an interaction into Container
        createContainerReference: function(containerIRI, slug, noteURL) {
            //Store reference to the interaction at a pod
            // && LR.C.User.IRI.podURL
            console.log('POSTing interaction reference');
            var request = $.ajax({
                method: 'POST',
                url: containerIRI,
                headers: {
                    'Content-Type': 'text/turtle; charset=utf-8',
                    'Link': '<http://www.w3.org/ns/ldp#Resource>; rel="type"',
                    'Slug': slug
                },
                xhrFields: { withCredentials: true },
                data: '<> <http://schema.org/url> <' + noteURL + '> .'
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);

                //GET Location value from header
            });
            request.fail(function(xhr, textStatus) {
                console.log( "Request failed: " + textStatus);
            });
        },

        notifyInbox: function(inbox, slug, source, property, target) {
            var headers = {
                'Content-Type': 'text/turtle; charset=utf-8',
                'Link': '<http://www.w3.org/ns/ldp#Resource>; rel="type"'
            };
            if (slug != '') {
                headers.Slug = slug;
            }

            var data = '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\
@prefix sterms: <http://www.w3.org/ns/solid/terms#> .\n\
@prefix pingback: <http://purl.org/net/pingback/> .\n\
@prefix schema: <http://schema.org/> .\n\
<> a sterms:Notification , pingback:Request ;\n\
    pingback:source <' + source + '> ;\n\
    pingback:property <' + property + '> ;\n\
    pingback:target <' + target + '> ;\n\
    schema:dateModified "' + LR.U.getDateTimeISO() + '"^^xsd:dateTime ;\n\
    schema:creator <' + LR.C.User.IRI + '> ;\n\
    schema:license <http://creativecommons.org/licenses/by-sa/4.0/> .\n\
';

            var request = $.ajax({
                method: "POST",
                url: inbox,
                headers: headers,
                xhrFields: { withCredentials: true },
                data: data
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            request.fail(function(xhr, textStatus) {
                console.log(xhr);
                console.log("Request failed: " + textStatus);
            });

        },

        createResourceACL: function(accessToURL, aclSuffix, agentIRI) {
            var request = $.ajax({
                method: "PUT",
                url: accessToURL + aclSuffix,
                headers: {
                    'Content-Type': 'text/turtle; charset=utf-8'
                },
                xhrFields: { withCredentials: true },
                data: '@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n\
@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n\
[ acl:accessTo <' + accessToURL + '> ; acl:mode acl:Read ; acl:agentClass foaf:Agent ] .\n\
[ acl:accessTo <' + accessToURL + '> ; acl:mode acl:Read , acl:Write ; acl:agent <' + agentIRI + '> ] .'
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            request.fail(function(xhr, textStatus) {
                console.log("Request failed: " + textStatus);
            });
        },

        deleteResource: function(url) {
            var request = $.ajax({
                method: 'DELETE',
                url: url,
                xhrFields: { withCredentials: true }
            });
            request.done(function(data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
            });
            request.fail(function(xhr, textStatus) {
                console.log( "Request failed: " + textStatus);
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

        setDocumentMode: function() {
            if (LR.C.EditorAvailable && LR.U.urlParam('edit') == 'true') {
                LR.U.Editor.enableEditor();
                var url = document.location.href;
                url = url.substr(0, url.lastIndexOf('?'));
                window.history.replaceState({}, null, url);
            }
        },

        showDocumentInfo: function() {
            $('body').append('<aside id="document-menu" class="lr"><button class="show" title="Open Menu">☰</button><div></div><footer><dl><dt>About</dt><dd id="about-dokieli"><a target="source-dokieli" href="https://github.com/linkeddata/dokieli">dokieli</a></dd><dd id="about-linked-research"><a target="source-linked-research" href="https://github.com/csarven/linked-research">Linked Research</a></dd></footer></aside>');

            $('#document-menu.lr').on('click', '> button.show', LR.U.showDocumentMenu);
            $('#document-menu.lr').on('click', '> button:not([class="show"])', LR.U.hideDocumentMenu);
        },

        //TODO: Redo menu
        showDocumentMenu: function() {
            var body = $('body');
            var dMenu = $('#document-menu.lr');
            var dMenuButton = dMenu.find('> button');
            var dInfo = dMenu.find('> div');

            dMenuButton.removeClass('show');
            dMenuButton.attr('title', 'Hide Menu');
            dMenu.addClass('on');
            body.addClass('on-document-menu');

            LR.U.showDocumentDo(dInfo);
            LR.U.showViews(dInfo);
            LR.U.showEmbedData(dInfo);
            LR.U.showTableOfStuff(dInfo);
            LR.U.showStorage(dInfo);
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
            var dMenuButton = dMenu.find('> button');

            dMenu.removeClass('on').find('section').remove();
            body.removeClass('on-document-menu');
            dMenuButton.addClass('show');
            dMenuButton.attr('title', 'Open Menu');

            $('#toc').remove();
            $('#embed-data-entry').remove();
            $('#create-new-document').remove();
            $('#save-as-document').remove();
//            LR.U.hideStorage();
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
            $(node).append('<section id="embed-data-in-html" class="lr"><h2>Data</h2><ul><li><button class="embed-data-meta">Embed</button></li></ul></section>');

            $('#embed-data-in-html').on('click', 'button', function(e){
                var scriptCurrent = $('head script[id^="meta-"][class="lr"]');

                var scriptType = {
                    'meta-turtle': {
                        scriptStart: '<script id="meta-turtle" class="lr" type="text/turtle" title="Turtle">',
                        cdataStart: '# ' + LR.C.CDATAStart + '\n',
                        cdataEnd: '\n# ' + LR.C.CDATAEnd,
                        scriptEnd: '</script>'
                    },
                    'meta-json-ld': {
                        scriptStart: '<script id="meta-json-ld" class="lr" type="application/json+ld" title="JSON-LD">',
                        cdataStart: LR.C.CDATAStart,
                        cdataEnd: LR.C.CDATAEnd,
                        scriptEnd: '</script>'
                    },
                    'meta-nanopublication': {
                        scriptStart: '<script id="meta-nanopublication" class="lr" type="application/trig" title="Nanopublication">',
                        cdataStart: '# ' + LR.C.CDATAStart + '\n',
                        cdataEnd: '\n# ' + LR.C.CDATAEnd,
                        scriptEnd: '</script>'
                    }
                }

                var scriptCurrentData = {};
                scriptCurrent.each(function(i, v) {
                    var id = $(v).prop('id');
                    scriptCurrentData[id] = $(v).html().split(/\r\n|\r|\n/);
                    console.log(scriptCurrentData[id]);
                    scriptCurrentData[id].shift();
                    scriptCurrentData[id].pop();
                    scriptCurrentData[id] = {
                        'type': $(v).prop('type') || '',
                        'title': $(v).prop('title') || '',
                        'content' : scriptCurrentData[id].join('\n')
                    };
                });

                var embedMenu = '<aside id="embed-data-entry" class="lr on"><button class="close">❌</button>\n\
                <h2>Embed Data</h2>\n\
                <nav><ul><li class="selected"><a href="#embed-data-turtle">Turtle</a></li><li><a href="#embed-data-json-ld">JSON-LD</a></li><li><a href="#embed-data-nanopublication">Nanopublication</a></li></ul></nav>\n\
                <div id="embed-data-turtle" class="selected"><textarea placeholder="Enter data in text/turtle" name="meta-turtle" cols="80" rows="24">' + ((scriptCurrentData['meta-turtle']) ? scriptCurrentData['meta-turtle'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                <div id="embed-data-json-ld"><textarea placeholder="Enter data in application/json+ld" name="meta-json-ld" cols="80" rows="24">' + ((scriptCurrentData['meta-json-ld']) ? scriptCurrentData['meta-json-ld'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                <div id="embed-data-nanopublication"><textarea placeholder="Enter data in application/trig" name="meta-nanopublication" cols="80" rows="24">' + ((scriptCurrentData['meta-nanopublication']) ? scriptCurrentData['meta-nanopublication'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                </aside>';

                $('body').append(embedMenu);
                $('#embed-data-entry nav').on('click', 'a', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var li = $(this).parent();
                    if(!li.hasClass('class')) {
                        $('#embed-data-entry nav li').removeClass('selected');
                        li.addClass('selected');
                        $('#embed-data-entry > div').removeClass('selected');
                        $('#embed-data-entry > div' + $(this).prop('hash')).addClass('selected');
                    }
                });

                $('#embed-data-entry').on('click', 'button.save', function(e) {
                    var textarea = $(this).parent().find('textarea');
                    var name = textarea.prop('name');
                    var scriptEntry = textarea.val();
                    var script = $('#' + name);

                    if (scriptEntry.length > 0) {
                        var scriptContent = scriptType[name].scriptStart + scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd + scriptType[name].scriptEnd

                        //If there was a script already
                        if (script.length > 0) {
                            script.html(scriptContent);
                        }
                        else {
                            $('head').append(scriptContent);
                        }
                    }
                    else {
                        //Remove if no longer used
                        script.remove();
                    }

                    $('#embed-data-entry').remove();
                });
            });
        },

        showTableOfStuff: function(node) {
            $(node).append('<section id="table-of-stuff" class="lr"><h2>Table of Stuff</h2><ul><li><input id="t-o-content" type="checkbox"/><label for="t-o-content">Contents</label></li><li><input id="t-o-figure" type="checkbox"/><label for="t-o-figure">Figures</label></li><li><input id="t-o-table" type="checkbox"/><label for="t-o-table">Tables</label></li><li><input id="t-o-abbr" type="checkbox"/><label for="t-o-abbr">Abbreviations</label></li></ul></section>');

            $('#table-of-stuff').on('click', 'input', function(e){
                var id = $(this).prop('id');
                var listType = id.slice(4, id.length);

                if($(this).prop('checked')) {
                    LR.U.buildTableOfStuff(listType);
                }
                else {
                    $('#table-of-'+listType+'s').remove();
                }
            });
        },

        htmlEntities: function(s) {
            return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
                var isSortable = ($('head script[src$="html.sortable.min.js"]').length > 0) ? true : false;

                if(isSortable && LR.C.User.IRI) {
                    sortable = ' sortable';
                }

                s += '<aside id="toc" class="lr on' + sortable + '"><button class="close">❌</button><h2>Table of Contents</h2><ol class="toc' + sortable + '">';
                s += LR.U.getListOfSections(section, isSortable);
                s += '</ol></aside>';

                $('body').append(s);
                if(isSortable && LR.C.User.IRI) {
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
            else { tableList = ['content', 'figure', 'table', 'abbr']; }

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
                        s += LR.U.getListOfSections($('h1 ~ div section:not([class~="slide"])'), false);
                    }
                    else {
                        if (element == 'abbr') {
                            if (e.length > 0) {
                                e.sort(function(a, b) {
                                    var textA = $(a).text();
                                    var textB = $(b).text();
                                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                                });
                            }

                            e.each(function() {
                                var title = $(this).attr(titleType);
                                var text = $(this).text();
                                s += '<dt>' + text + '</dt>';
                                s += '<dd>' + title + '</dd>';
                            });
                        }
                        else {
                            e.each(function(i,v) {
                                elementId = $(this).attr('id');
                                elementTitle = $(this).find(titleType).text();

                                s += '<li><a href="#' + elementId +'">' + elementTitle  +'</a></li>';
                            });
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

        showFragment: function() {
            $(document).on({
                mouseenter: function () {
                    if($('#'+this.id+' > .lr.fragment').length == 0 && this.parentNode.nodeName.toLowerCase() != 'aside'){
                        $('#'+this.id).prepend('<span class="lr fragment" style="height:' + this.clientHeight + 'px; "><a href="#' + this.id + '">' + '🔗' + '</a></span>');
                        var fragment = $('#'+this.id+' > .lr.fragment');
                        var fragmentClientWidth = fragment.get(0).clientWidth;
                        fragment.css({
                            'top': 'calc(' + Math.ceil($(this).position().top) + 'px)',
                            'left': '-' + (fragmentClientWidth - 2) + 'px',
                            'width': (fragmentClientWidth - 10) + 'px'
                        });
                    }
                },
                mouseleave: function () {
                    $('#'+this.id+' > .lr.fragment').remove();
                    $('#'+this.id).filter('[class=""]').removeAttr('class');
                }
            }, '#content *[id], #interactions *[id]');
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

        getDocument: function(cn) {
            var html = cn || document.documentElement.cloneNode(true);
            var s = "<!DOCTYPE html>\n";
            s += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n    ';

            var selfClosing = {};
            "br img input area base basefont col colgroup source wbr isindex link meta param hr".split(' ').forEach(function (n) {
                selfClosing[n] = true;
            });
            var skipAttributes = {};
            "contenteditable spellcheck medium-editor-index data-medium-editor-element data-medium-focused data-placeholder role aria-multiline style".split(' ').forEach(function (n) {
                skipAttributes[n] = true;
            });
            var noEsc = [false];
            //Adapted from https://github.com/w3c/respec/blob/develop/js/ui/save-html.js#L194
            var dumpNode = function (node) {
                var out = '';
                // if the node is the document node.. process the children
                if (node.nodeType === 9 || (node.nodeType === 1 && node.nodeName.toLowerCase() == "html")) {
                    for (var i = 0; i < node.childNodes.length; i++) out += dumpNode(node.childNodes[i]);
                }
                else if (1 === node.nodeType) {
                    if (!(node.hasAttribute('class') && (node.getAttribute('class').split(' ').indexOf('lr') > -1 || node.getAttribute('class').split(' ').indexOf('firebugResetStyles') > -1))) {
                        var ename = node.nodeName.toLowerCase() ;
                        out += "<" + ename ;
                        //XXX: Regardless of the location of @lang, ends up at the end
                        for (var i = node.attributes.length - 1; i >= 0; i--) {
                            var atn = node.attributes[i];
                            if (skipAttributes[atn.name]) continue;
                            if (/^\d+$/.test(atn.name)) continue;
                            if (atn.name == 'class' && (atn.value.split(' ').indexOf('on-document-menu') > -1)) {
                                atn.value = atn.value.replace(/(on-document-menu)/, '').trim();
                            }
                            if (!(atn.name == 'class' && atn.value == '')) {
                                out += ' ' + atn.name + "=\"" + LR.U.htmlEntities(atn.value) + "\"";
                            }
                        }
                        if (selfClosing[ename]) { out += " />"; }
                        else {
                            out += '>';
                            noEsc.push(ename === "style" || ename === "script");
                            for (var i = 0; i < node.childNodes.length; i++) out += dumpNode(node.childNodes[i]);
                            noEsc.pop();
                            out += '</' + ename + '>';
                        }
                    }
                }
                else if (8 === node.nodeType) {
                    //XXX: If comments are not tabbed in source, a new line is not prepended
                    out += "<!--" + node.nodeValue + "-->";
                }
                else if (3 === node.nodeType || 4 === node.nodeType) {
                    //XXX: Remove new lines which were added after DOM ready
                    var nl = node.nodeValue.replace(/\n+$/, '');
                    out += noEsc[noEsc.length - 1] ? nl : LR.U.htmlEntities(nl);
                }
                else {
                    console.log("Warning; Cannot handle serialising nodes of type: " + node.nodeType);
                }
                return out;
            };
            s += dumpNode(html) + "\n</html>\n";
            return s;
        },

        exportAsHTML: function() {
            var data = LR.U.getDocument();
            //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
            var blob = new Blob([data], {type:'text/html;charset=utf-8'});
            var pattern = /[^\w]+/ig;
            var title = $('h1').text().toLowerCase().replace(pattern, '-') || "index";
            var timestamp = LR.U.getDateTimeISO().replace(pattern, '') || "now";

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

        showDocumentDo: function(node) {
            var s = '<section id="document-do" class="lr"><h2>Do</h2><ul>';

            if (LR.C.EditorAvailable) {
                var editFile = '';
                if (LR.C.EditorEnabled) {
                    editFile = LR.C.Editor.DisableEditorButton;
                }
                else {
                    editFile = LR.C.Editor.EnableEditorButton;
                }

                s += '<li>' + editFile + '</li>';
            }

            if (LR.C.User.IRI) {
                s += '<li><button class="new-file-html">New</button></li>';
                s += '<li><button class="update-file-html">Save</button></li>';
                s += '<li><button class="save-as-file-html">Save As</button></li>';
            }

            s += '<li><button class="export-file-html">Export</button></li>';
            s += '<li><button class="print-file-html">⎙ Print</button></li>';

            s += '</ul></section>';


            $(node).append(s);

            if (LR.C.EditorAvailable) {
                $('#document-do').on('click', 'button.editor-enable', function(e) {
                    $(this).parent().html(LR.C.Editor.DisableEditorButton);
                    LR.U.Editor.enableEditor();
                });
                $('#document-do').on('click', 'button.editor-disable', function(e) {
                    $(this).parent().html(LR.C.Editor.EnableEditorButton);
                    LR.U.Editor.disableEditor();
                });
            }

            if (LR.C.User.IRI) {
                $('#document-do').on('click', '.new-file-html', LR.U.createNewDocument);
                $('#document-do').on('click', '.update-file-html', function() {
                    LR.U.putResource().then(
                        function(i) {
                            LR.U.hideDocumentMenu();
                        },
                        function(reason) {
                            console.log(reason);
                        }
                    );
                });
                $('#document-do').on('click', '.save-as-file-html', LR.U.saveAsDocument);
            }

            $('#document-do').on('click', '.export-file-html', LR.U.exportAsHTML);

            $('#document-do').on('click', '.print-file-html', function(e) {
                LR.U.hideDocumentMenu();
                window.print();
                return false;
            });
        },

        createNewDocument: function() {
            $('body').append('<aside id="create-new-document" class="lr on"><button class="close">❌</button><h2>Create New Document</h2><label>URL to save to</label><input id="storage" type="text" placeholder="http://example.org/article" value="" name="storage"/> <button class="create">Create</button></aside>');

            $('#create-new-document').on('click', 'button.create', function(e) {
                var storageIRI = $(this).parent().find('input#storage').val().trim();

                var html = document.documentElement.cloneNode(true);
                $(html).find('main > article').empty();
                html = LR.U.getDocument(html);

                var w = window.open('', '_blank');

                LR.U.putResource(storageIRI, html).then(
                    function(i) {
                        console.log(i);
                        LR.U.hideDocumentMenu();
                        w.location.href = storageIRI + '?edit=true';
                    },
                    function(reason) {
                        console.log(reason);
                    }
                );
            });
        },

        saveAsDocument: function() {
            $('body').append('<aside id="save-as-document" class="lr on"><button class="close">❌</button><h2>Save As Document</h2><label>URL to save to</label><input id="storage" type="text" placeholder="http://example.org/article" value="" name="storage"/> <button class="create">Save</button></aside>');

            $('#save-as-document').on('click', 'button.create', function(e) {
                var storageIRI = $(this).parent().find('input#storage').val().trim();

                html = LR.U.getDocument();

                var w = window.open('', '_blank');

                LR.U.putResource(storageIRI, html).then(
                    function(i) {
                        console.log(i);
                        LR.U.hideDocumentMenu();
                        w.location.href = storageIRI;
                    },
                    function(reason) {
                        console.log(reason);
                    }
                );
            });
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
            console.log(LR.U.getDateTimeISO() + ': Storage enabled.');
            LR.U.enableAutoSave(item);
        },
        disableStorage: function(item) {
            LR.C.UseStorage = false;
            localStorage.removeItem(item);
            LR.U.disableAutoSave(item);
            console.log(LR.U.getDateTimeISO() + ': Storage disabled.');
        },
        saveStorage: function(item) {
            switch(item) {
                case 'html': default:
                    var object = LR.U.getDocument();
                    break;
            }
            localStorage.setItem(item, object);
            console.log(LR.U.getDateTimeISO() + ': Document saved.');
        },
        enableAutoSave: function(item) {
            LR.C.AutoSaveId = setInterval(function() { LR.U.saveStorage(item) }, LR.C.AutoSaveTimer);
            console.log(LR.U.getDateTimeISO() + ': Autosave enabled.');
        },
        disableAutoSave: function(item) {
            clearInterval(LR.C.AutoSaveId);
            console.log(LR.U.getDateTimeISO() + ': Autosave disabled.');
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

        getDateTimeISO: function() {
            var date = new Date();
            return date.toISOString();
        },

        createAttributeDateTime: function(element) {
            //Creates datetime attribute.
            //TODO: Include @data-author for the signed in user e.g., WebID or URL.
            var a = LR.U.getDateTimeISO();

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
                return LR.U.generateUUID();
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

        showRefs: function() {
            $('span.ref').each(function() {
                console.log(this);
                var ref = $(this).find('> *[id]').get(0);
                console.log(ref);
                var refId = $(ref).prop('id');
                console.log(refId);
                var refA = $(this).find('[class*=ref-] a');
                console.log(refA);
                refA.each(function() {
                    var noteIRI = $(this).prop('href');
//                    noteId = noteId.substr(noteId.indexOf("#") + 1);
                    console.log(noteIRI);
                    var refLabel = $(this).text();
                    console.log(refLabel);

                    //FIXME: the noteId parameter for positionNote shouldn't
                    //rely on refLabel. Grab it from somewhere else.
                    LR.U.positionNote(refId, refLabel, refLabel);
                });
            });
        },

        positionNote: function(refId, refLabel, noteId) {
            console.log('--------');
            var viewportWidthSplit = Math.ceil(parseInt($(window).width()) / 2);

            var parentPositionLeft, positionLeftCalc, noteWidth = '';

            var ref = $('#' + refId);
    console.log(ref);
    console.log(noteId);
            var note = $('#' + noteId);
    console.log(note);
            var refPP = ref.parent().parent();
    console.log(refPP);

    //        $('span.note').each(function(i,v) {
    //            a = $(this).find('a');
    //            if(a.length > 0) {
                    noteWidth = Math.ceil(($(window).width() - $('#content').width()) / 2 - 50);

            if (noteWidth >= 150) {
//                    id = a.attr('href');
                parentPositionLeft = Math.ceil(refPP.position().left);

console.log(parentPositionLeft);
console.log(viewportWidthSplit);
                if (parentPositionLeft <= viewportWidthSplit) {
                    positionRightCalc = parentPositionLeft + 'px + ' + noteWidth + 'px - 20px';
                }
                else {
                    positionRightCalc = parentPositionLeft + 'px + ' + refPP.get(0).clientWidth + 'px + 35px';
                }

// console.log($(this));
// console.log($(this).position().top);
// console.log($(this).offset().top);

// console.log($(this).parent());
// console.log($(this).parent().parent());
// console.log($(this).parent().parent().parent());

                var bodyWidthThird = ($('body').get(0).clientWidth) / 3;

                //TODO: If there are articles already in the aside.note , the subsequent top values should come after one another
                note.css({
                    'position': 'absolute',
                    'top': 'calc(' + Math.ceil(ref.parent().position().top) + 'px)',
                    'left': 'calc(' + positionRightCalc + ' + ' + bodyWidthThird + 'px + 2em)',
                    'z-index': '1',
                    'width': (bodyWidthThird) + 'px',
                    'font-size': '0.9em',
                    'text-align': 'left'
                });
            }
    //            }
    //        });
        },

        Editor: {
            disableEditor: function() {
        //        _mediumEditors[1].destroy();
                LR.C.EditorEnabled = false;
                return LR.U.Editor.MediumEditor.destroy();
            },

            enableEditor: function() {
                //XXX: Consider this as the main wrapper for the editor tool.
                if (!document.getElementById('document-editor')) {
                    $('body').append('<aside id="document-editor" class="lr"/>');
                }
        //        $('article:nth(0)').addClass('editable');

                var editableNodes = document.querySelectorAll('main > article');

                var pText = ["Make it so!", "This is not a Paper", "Cogito Ergo Sum", "Do One Thing and Do It Well", "Free Your Mind", "Do or Do Not"];
                pText = pText[Math.floor(Math.random() * pText.length)];

                if (typeof MediumEditor !== 'undefined') {
                    LR.U.Editor.MediumEditor = new MediumEditor(editableNodes, {
                        elementsContainer: document.getElementById('document-editor'),
                        placeholder: {
                            text: pText
                        },
                        disableDoubleReturn: true,
                        paste: {
                            forcePlainText: true,
                            cleanPastedHTML: false,
                            cleanReplacements: [],
                            cleanAttrs: ['class', 'style', 'dir'],
                            cleanTags: ['meta', 'link', 'style', 'script', 'br', 'hr']
                        },

                        buttonLabels: 'fontawesome',
            //          fileDragging: false, //https://github.com/yabwe/medium-editor/issues/789

                        toolbar: {
                            buttons: [
                                //Formatting
                                'h2', 'h3', 'h4',
                                'em', 'strong',
            // , 'dl' http://xinha.webfactional.com/browser/trunk/plugins/DefinitionList/definition-list.js?rev=516
                                'orderedlist', 'unorderedlist',
                                'code', 'pre',

                                //Media / Figure
                                'image',
                                'table', /*spreadshet, */
                                /*audio, video*/

                                //References
                                'anchor',
                                'cite',
                                'q',
                                {
                                    name: 'quote',
                                    contentFA: '<i class="fa fa-indent"></i>'
                                },
                                /*object, script*/

                                //Annotation
                                'mark',
                                'note'

                                //Editorial
                                // 'del',
                                // 'ins'
                            ],
                            diffTop: -10,
                            diffLeft: -317, //This should use relative units because text zoom in/out
                            allowMultiParagraphSelection: false
                        },

                        //TODO: medium-editor shouldn't just pass these commands to execAction but first check to see if there is a button extension with the same action name.
                        // https://github.com/yabwe/medium-editor/issues/802
                        // keyboardCommands: {
                        //     commands: [
                        //         {
                        //             command: 'strong',
                        //             key: 'B',
                        //             meta: true,
                        //             shift: false,
                        //             alt: false
                        //         },
                        //         {
                        //             command: 'em',
                        //             key: 'I',
                        //             meta: true,
                        //             shift: false,
                        //             alt: false
                        //         }
                        //     ]
                        // },


                        // anchor: {
                            // customClassOption: 'lr ref',
                            // customClassOptionText: 'Citation'
                            // linkValidation: false,
                            // placeholderText: 'Paste or type a link',
                            // targetCheckbox: false,
                            // targetCheckboxText: 'Open in new window'
                        // },
                        //XXX: may be useful but it adds extra <span> inside <a>.
                        // autoLink: true,
                        anchorPreview: false,

                        extensions: {
                            'h2': new LR.U.Editor.Button({action:'h2', label:'h2'}),
                            'h3': new LR.U.Editor.Button({action:'h3', label:'h3'}),
                            'h4': new LR.U.Editor.Button({action:'h4', label:'h4'}),

                            'em': new LR.U.Editor.Button({action:'em', label:'em'}),
                            'strong': new LR.U.Editor.Button({action:'strong', label:'strong'}),
                            'code': new LR.U.Editor.Button({action:'code', label:'code'}),

                            'cite': new LR.U.Editor.Button({action:'cite', label:'cite'}),
                            'q': new LR.U.Editor.Button({action:'q', label:'q'}),

                            'mark': new LR.U.Editor.Button({action:'mark', label:'mark'}),
                            'note': new LR.U.Editor.Note({action:'article', label:'note'}),

                            //XXX: Interesting for editor
                            // 'del': new LR.U.Editor.Button({action:'del', label:'del'}),
                            // 'ins': new LR.U.Editor.Button({action:'ins', label:'ins'})

                            'table': new MediumEditorTable()
            //                'spreadsheet': new MediumEditorSpreadsheet()
                        }
                    });

                    LR.C.EditorEnabled = true;
                    return LR.U.Editor.MediumEditor;
            //            $('.editable').mediumInsert({
            //                editor: editor
            //            });
                }
            },

            //Sets the selection to any given node. Same as MediumEditor.selection.select()
            //TODO: Remove.
            // selectNode: function(selection, node) {
            //     var h = document.createRange();
            //     h.selectNodeContents(node);
            //     selection.removeAllRanges();
            //     selection.addRange(h);
            //     console.log(h);
            // },

            //in-reply-to? author+ title? description? published updated? [actions: edit? delete? voteUp? voteDown? follow?]
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
                                case 'mark': this.contentFA = '<i class="fa fa-paint-brush"></i>'; break;
                                case 'note': this.contentFA = '<i class="fa fa-sticky-note"></i>'; break;
                                case 'q': this.contentFA = '<i class="fa fa-quote-right"></i>'; break;
                                default: break;
                            }

                            this.button = this.createButton();
                            this.on(this.button, 'click', this.handleClick.bind(this));

                            //TODO: Listen to section hX changes and update section @id and span @class lr.fragment
                        },

                        // getButton: function() {
                        //     console.log('LR.U.Editor.Button.Note.getButton()');
                        //     return this.button;
                        // },

                        handleClick: function(event) { //, editable
                //console.log('LR.U.Editor.Button.handleClick()');
                console.log(this);
                            event.preventDefault();
                            event.stopPropagation();


                            var action = this.getAction();
                            var tagNames = this.getTagNames();
                            var button = this.getButton();
                //console.log(action);
                //console.log(tagNames);
                //console.log(button);

                //                var selectedParentElement = MediumEditor.selection.getSelectedParentElement(MediumEditor.selection.getSelectionRange(this.document));
                //console.log('selectedParentElement');
                //console.log(selectedParentElement);
                //                var firstTextNode = MediumEditor.util.getFirstTextNode(selectedParentElement);
                //console.log('firstTextNode');
                //console.log(firstTextNode);
                            // if (MediumEditor.util.getClosestTag(firstTextNode, 'em')) {
                            //     return this.execAction('unlink');
                            // }

                //                var node = document.createElement(tagNames[0]);
                //console.log(node);

                //console.log('isActive: ' + this.isActive() + '-------');
                            if (this.isActive()) {
                                return this.base.execAction('removeFormat');
                            }
                            else {
                                var datetime = ' ' + LR.U.createAttributeDateTime(this.action);

                                this.base.selectedDocument = this.document;
                                this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument);
                                //.replace(LR.C.Editor.regexEmptyHTMLTags, '');
                                console.log('this.base.selection:');
                                console.log(this.base.selection);

                                var selectedParentElement = this.base.getSelectedParentElement();
                                console.log('getSelectedParentElement:');
                                console.log(selectedParentElement);
                                var parentSection = MediumEditor.util.getClosestTag(selectedParentElement, 'section');
                                console.log(parentSection);
                //                selectedParentElement.setAttribute('style', 'background:#ddd');
                //                parentSection.setAttribute('style', 'background:#eee');

                                //XXX: Saving the selection should be before inserting/updating HTML.
                                this.base.saveSelection();


                                switch(this.action) {
                                    case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                                        //XXX: Which heading level are we at?
                                        var parentSectionHeading = '';
                                        for (var i = 0; i < parentSection.childNodes.length; i++) {
                                            parentSectionHeading = parentSection.childNodes[i].nodeName.toLowerCase();
                                            if(LR.C.Editor.headings.indexOf(parentSectionHeading) > 0) {
                    //                            console.log(parentSectionHeading);
                                                break;
                                            }
                                        }
                                        var pSH = parseInt(parentSectionHeading.slice(-1));

                                        //XXX: Which heading level is the action?
                                        var cSH = parseInt(this.action.slice(-1));
                    console.log("parentH: " + pSH);
                    console.log("currentH: " + cSH);
                    console.log(cSH-pSH);

                                        var closePreviousSections = '';
                                        // if (cSH > pSH) {}
                                        for (i = 0; i <= (pSH-cSH); i++) {
                                            console.log("i: " + i);
                                            closePreviousSections += '</div></section>';
                                        }
                    console.log(closePreviousSections);
                    console.log(this.base.selection);
                    //                    var doc = this.document;
                                        var selection = window.getSelection();
                    console.log(this.base.selection);
                    console.log(selection);



                                        if (selection.rangeCount) {
                                            range = selection.getRangeAt(0);
                                            parent = selectedParentElement;

                    console.log(range);
                                            //Section
                                            var sectionId = LR.U.generateAttributeId(null, this.base.selection);
                                            var section = document.createElement('section');
                                            section.id = sectionId;
                                            section.setAttribute('rel', 'schema:hasPart');
                                            section.setAttribute('resource', '[this:#' + sectionId + ']');
                    console.log(section);


                                            //Heading
                                            var heading = document.createElement(tagNames[0]);
                                            heading.setAttribute('property', 'schema:name');
                                            heading.innerHTML = this.base.selection;
                    console.log(heading);
                    console.log(selection);
                    r = selection.getRangeAt(0);
                    console.log(r);
                    console.log(r.startContainer);
                    console.log(r.startOffset);
                    console.log(r.endOffset);


                                            var divDescription = parentSection.getElementsByTagName('div')[0];
                console.log(divDescription);
                console.log(divDescription.innerHTML);
                console.log(divDescription.childNodes);
                console.log(divDescription.length);
                console.log(selectedParentElement);
                console.log(selectedParentElement.childNodes);
                console.log(selectedParentElement.lastChild);
                console.log(selectedParentElement.lastChild.length);

                                            //Remaining nodes
                                            var r = document.createRange();
                                            r.setStart(selection.focusNode, selection.focusOffset);
                                            r.setEnd(selectedParentElement.lastChild, selectedParentElement.lastChild.length);
                //    console.log(r.commonAncestorContainer.nodeType);

                    // console.log(r.startContainer);
                    // console.log(r.endContainer);
                    //console.log(selection.anchorNode);
                    //                        selection.removeAllRanges(); //XXX: is this doing anything?
                    //                        selection.addRange(r);

                    //console.log(selection.anchorNode);
                                            var fragment = r.extractContents();
                console.log(fragment);
                    // console.log(selection);
                    // r = selection.getRangeAt(0);
                    // console.log(r);
                    // console.log(r.startContainer);
                    // console.log(r.startOffset);
                    // console.log(r.endOffset);
                                            if (fragment.firstChild.nodeType === 3) {
                                                //TODO: trim only if there is one child which is a textnode
                    //                            fragment.firstChild.nodeValue = fragment.firstChild.nodeValue.trim();

                    //console.log(fragment);
                                                var sPE = selectedParentElement.nodeName.toLowerCase();
                                                switch(sPE) {
                                                    case "p": default:
                                                        //TODO: There should be a simpler way to do wrap <p> (w/o jQuery)
                                                        var xSPE = document.createElement(sPE);
                                                        xSPE.appendChild(fragment.cloneNode(true));
                                                        fragment = LR.U.fragmentFromString(xSPE.outerHTML);
                                                        break;
                                                    //TODO: Other cases?
                                                }
                                            }
                console.log(fragment);

                    console.log(selection);
                    r = selection.getRangeAt(0);
                    console.log(r);
                    console.log(r.startContainer);
                    console.log(r.startOffset);
                    console.log(r.endOffset);
                    //                         var remainingNodes = document.createElement('div');
                    //                         remainingNodes.appendChild(fragment.cloneNode(true));
                    // console.log(remainingNodes);


                                            //Description
                                            var div = document.createElement('div');
                                            div.setAttribute('property', 'schema:description');
                                            div.appendChild(fragment.cloneNode(true));


                                            //Put it together
                                            section.appendChild(heading);
                                            section.appendChild(div);
                    console.log(range.startContainer);

                                            var selectionUpdated = document.createElement('div');
                                            selectionUpdated.appendChild(section);
                                            selectionUpdated = selectionUpdated.innerHTML;
                    console.log(selectionUpdated);
                    //                        range.deleteContents();

                    //                        MediumEditor.util.insertHTMLCommand(this.document, closePreviousSections);
                                            //MediumEditor.extensions.paste(closePreviousSections);

                                            //Sub-section
                                            if (cSH-pSH > 0) {
                                                MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                                                //This doesn't seem to be needed anymore?
                //                                MediumEditor.selection.select(this.base.selectedDocument, heading, 0);
                                            }
                                            else {
                    console.log(selection);
                    console.log(parentSection);
                                                MediumEditor.selection.selectNode(parentSection, document);
                    console.log(selection);
                    r = selection.getRangeAt(0);
                    console.log(r);
                    console.log(r.startOffset);
                    console.log(r.endOffset);


                //This selection is based off previous operations; handling remaining Nodes after the selection. So, this is not accurate per se.. the range might be accurate.
                                                selection = window.getSelection();
                    console.log(selection);
                    r = selection.getRangeAt(0);
                    console.log(r);
                    console.log(r.startOffset);
                    console.log(r.endOffset);


                    //                            r = document.createRange();
                    //                             r.setStartAfter(parentSection);
                    // console.log(r);
                    //                             r.setEndAfter(parentSection);
                    // console.log(r);
                    //r.collapse(true);
                                                selection.removeAllRanges();
                                                selection.addRange(r);
                    console.log(selection);
                    var foo = document.createElement('div');
                    foo.appendChild(parentSection);
                    parentSection = foo.innerHTML;
                    console.log(parentSection + selectionUpdated);
                                                MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, parentSection + selectionUpdated);

                //                                MediumEditor.selection.select(this.base.selectedDocument, heading, 0);

                    //                            parentSection.parentNode.insertBefore(section, parentSection.nextSibling);
                                            }
                                        }
                                        break;

                                    // case 'note':
                                    //     var selectionUpdated = '<' + tagNames[0] + datetime + '>' + this.base.selection + '</' + tagNames[0] + '>';
                                    //     MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                                    //     //Show Form for text entry;
                                    //     LR.U.Editor.Note();
                                    //     break;

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
                            this.contentFA = '<i class="fa fa-sticky-note"></i>';
                            MediumEditor.extensions.form.prototype.init.apply(this, arguments);

                //TODO: Change this bind key
                //            this.subscribe('editableKeydown', this.handleKeydown.bind(this));
                //            this.on(this.button, 'click', this.handleClick.bind(this));
                        },

                        // Called when the button the toolbar is clicked
                        // Overrides ButtonExtension.handleClick
                        handleClick: function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            var range = MediumEditor.selection.getSelectionRange(this.document);

                            if (range.startContainer.nodeName.toLowerCase() === 'a' ||
                                range.endContainer.nodeName.toLowerCase() === 'a' ||
                                MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(range), 'a')) {
                                return this.execAction('unlink');
                            }

                            if (!this.isDisplayed()) {
                                this.showForm();
                            }

                            return false;
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
                            var template = [
                                '<textarea cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                            ];

                            template.push(
                                '<a href="#" class="medium-editor-toolbar-save">',
                                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : this.formSaveLabel,
                                '</a>'
                            );

                            template.push('<a href="#" class="medium-editor-toolbar-close">',
                                this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : this.formCloseLabel,
                                '</a>');

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

                            this.base.saveSelection();
                            this.hideToolbarDefaultActions();
                            this.getForm().style.display = 'block';
                            this.setToolbarPosition();

                            input.value = opts.url;
                            input.focus();

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
                                buttonCheckbox = this.getAnchorButtonCheckbox(),
                                opts = {
                                    url: this.getInput().value
                                };

                            if (this.linkValidation) {
                                opts.url = this.checkLinkFormat(opts.url);
                            }

                            opts.target = '_self';
                            if (targetCheckbox && targetCheckbox.checked) {
                                opts.target = '_blank';
                            }

                            if (buttonCheckbox && buttonCheckbox.checked) {
                                opts.buttonClass = this.customClassOption;
                            }

                            return opts;
                        },

                        doFormSave: function () {
                            var opts = this.getFormOpts();
                            this.completeFormSave(opts);
                        },

                        completeFormSave: function (opts) {
                            console.log('completeFormSave()');
                            this.base.restoreSelection();
                            var range = MediumEditor.selection.getSelectionRange(this.document);
                //            this.execAction(this.action, opts);
                            var datetime = LR.U.getDateTimeISO();
                            var id = LR.U.generateAttributeId().slice(0, 6);
                            var refId = 'r-' + id;

                            //TODO: noteId can be external to this document e.g., User stores the note at their own space
                            // var noteId = 'i-' + id;

                            var resourceIRI = document.location.href;
                            //XXX: Temporarily setting this.
                            var containerIRI = window.location.href;
                            containerIRI = containerIRI.substr(0, containerIRI.lastIndexOf('/') + 1);

                            //XXX: Preferring masterWorkspace over the others. Good/bad idea?
                            //Need more granular workspace selection, e.g., PublicAnnotations. Defaulting to PublicWorkspace if no masterWorkspace
                            if (typeof LR.C.User.masterWorkspace != 'undefined' || typeof LR.C.User.Workspace.Master != 'undefined') {
                                containerIRI = LR.C.User.masterWorkspace + LR.C.InteractionPath;
                            }
                            else {
                                    if (typeof LR.C.User.Workspace.Public != 'undefined') {
                                        containerIRI = LR.C.User.Workspace.Public + LR.C.InteractionPath;
                                    }
                            }

                            var noteIRI = containerIRI + id;
                            //TODO: However this label is created
                            var refLabel = id;

                            //Role/Capability for Authors/Editors
                            var ref = '', refType = ''; //TODO: reference types. UI needs input
                            //TODO: replace refId and noteIRI IRIs

                            //Mark the text which the note was left for (with reference to the note?)
                            this.base.selectedDocument = this.document;
                            this.base.selection = MediumEditor.selection.getSelectionHtml(this.base.selectedDocument); //.replace(LR.C.Editor.regexEmptyHTMLTags, '');
                            console.log('this.base.selection:');
                            console.log(this.base.selection);

                            switch(refType) {
                                case 'annotation': case 'interaction': default:
                                    ref = '<span class="ref" about="[this:#' + refId + ']" typeof="http://purl.org/dc/dcmitype/Text"><mark id="'+ refId +'" property="schema:description">' + this.base.selection + '</mark><sup class="ref-annotation"><a rel="cito:hasReplyFrom" href="#' + id + '">' + refLabel + '</a></sup></span>';
                                    break;
                                case 'footnote':
                                    ref = '<span class="ref" about="[this:#' + refId + ']" typeof="http://purl.org/dc/dcmitype/Text"><span id="'+ refId +'" property="schema:description">' + this.base.selection + '</span><sup class="ref-footnote"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup></span>';
                                    break;
                                case 'reference':
                                    ref = '<span class="ref" about="[this:#' + refId + ']" typeof="http://purl.org/dc/dcmitype/Text"><span id="'+ refId +'" property="schema:description">' + this.base.selection + '</span> <span class="ref-reference">' + LR.C.RefType[LR.C.DocRefType].InlineOpen + '<a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a>' + LR.C.RefType[LR.C.DocRefType].InlineClose + '</span></span>';
                                    break;
                            }

                            var selectedParentElement = this.base.getSelectedParentElement();
                            console.log('getSelectedParentElement:');
                            console.log(selectedParentElement);


                            var selectionUpdated = ref;
                            MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);


                            //Add the note to the document.
                            //TODO: if signed-in
                            //TODO: If img available
                            //TODO: oa:TimeState's datetime should equal to hasSource value. Same for oa:HttpRequestState's rdfs:value
                            // <span about="[this:#' + refId + ']" rel="oa:hasState">(timeState: <time typeof="oa:TimeState" datetime="' + datetime +'" datatype="xsd:dateTime"property="oa:sourceDate">' + datetime + '</time>)</span>\n\

                            userImage = '';
                            if (LR.C.User.Image) {
                                userImage = '<img rel="schema:image" src="' + LR.C.User.Image + '" width="32" height="32"/>';
                            }

//                                    <sup><a href="#' + refId + '">' + refLabel + '</a></sup>\n\

                            var note = '\n\
            <article id="' + id + '" about="[i:]" typeof="oa:Annotation as:Activity" prefix="schema: http://schema.org/ oa: http://www.w3.org/ns/oa# as: http://www.w3.org/ns/activitystreams# i: ' + noteIRI +'">\n\
                <h3 property="schema:name">\n\
                    <span rel="schema:creator oa:annotatedBy as:actor">\n\
                        <span about="' + LR.C.User.IRI + '" typeof="schema:Person">\n\
                            ' + userImage + '\n\
                            <a rel="schema:url" href="' + LR.C.User.IRI + '">\n\
                                <span about="' + LR.C.User.IRI + '" property="schema:name">' + LR.C.User.Name + '</span>\n\
                            </a>\n\
                        </span>\n\
                    </span>\n\
                    <a rel="oa:hasTarget sioc:reply_of as:inReplyTo" href="' + resourceIRI + '">\n\
                        <span about="[i:]" rel="oa:motivatedBy" resource="oa:replying">replied</span>\n\
                    </a>\n\
                    on\n\
                    <a href="' + noteIRI + '">\n\
                        <time datetime="' + datetime +'" datatype="xsd:dateTime" property="oa:annotatedAt schema:datePublished">' + datetime + '</time>\n\
                    </a>\n\
                </h3>\n\
                <div property="schema:description" rel="oa:hasBody as:content">\n\
                    <div about="[i:]" typeof="oa:TextualBody as:Note" property="oa:text" datatype="rdf:HTML">\n\
                        <p>' + opts.url + '</p>\n\
                    </div>\n\
                </div>\n\
            </article>';
                //            console.log(note);

                            // var selectedParentElement = this.base.getSelectedParentElement();
                            // console.log('getSelectedParentElement:');
                            // console.log(selectedParentElement);
                            console.log('selectedParentElement.nextElementSibling:');
                            console.log(selectedParentElement.nextElementSibling);

                            var nES = selectedParentElement.nextElementSibling;
                            //Check if <aside class="note"> exists
                            if(nES && nES.nodeName.toLowerCase() == 'aside' && nES.classList.contains('note')) {
                                var noteNode = LR.U.fragmentFromString(note);
                                nES.appendChild(noteNode);
                            }
                            else {// id="n-' + LR.U.generateAttributeId() + '"
                                var asideNote = '\n\
                            <aside class="note">\n\
                            '+ note + '\n\
                            </aside>';
                                var asideNode = LR.U.fragmentFromString(asideNote);
                                selectedParentElement.parentNode.insertBefore(asideNode, selectedParentElement.nextSibling);
                            }

                            LR.U.positionNote(refId, refLabel, id);


                            var data = '<!DOCTYPE html>\n\
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\
     <head>\n\
         <title>' + noteIRI + '</title>\n\
     </head>\n\
     <body>\n\
         <main>' + note + '\n\
         </main>\n\
     </body>\n\
</html>\n\
';

                            LR.U.putResource(noteIRI, data);

                            console.log('resourceIRI: ' + resourceIRI);

                            //TODO: resourceIRI should be the closest IRI (not necessarily the document). Test resolve/reject better.
                            LR.U.getInbox(resourceIRI).then(
                                function(inbox) {
                                    if (inbox && inbox.length > 0) {
                                        console.log('inbox: ' + inbox);
                                        LR.U.notifyInbox(inbox, id, noteIRI, 'http://www.w3.org/ns/oa#hasTarget', resourceIRI);
                                    }
                                },
                                function(reason) {
                                    console.log('TODO: How can the interaction inform the target?');
                                    console.log(reason);
                                }
                            );

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
                                save = form.querySelector('.medium-editor-toolbar-save'),
                                input = form.querySelector('.medium-editor-toolbar-textarea');

                            // Handle clicks on the form itself
                            this.on(form, 'click', this.handleFormClick.bind(this));

                            // Handle typing in the textbox
                            this.on(input, 'keyup', this.handleTextboxKeyup.bind(this));

                            // Handle close button clicks
                            this.on(close, 'click', this.handleCloseClick.bind(this));

                            // Handle save button clicks (capture)
                            this.on(save, 'click', this.handleSaveClick.bind(this), true);

                        },

                        createForm: function () {
                            var doc = this.document,
                                form = doc.createElement('div');

                            // Anchor Form (div)
                            form.className = 'medium-editor-toolbar-form';
                            form.id = 'medium-editor-toolbar-form-textarea-' + this.getEditorId();
                            form.innerHTML = this.getTemplate();
                            this.attachFormEvents(form);

                            return form;
                        },

                        getInput: function () {
                            return this.getForm().querySelector('textarea.medium-editor-toolbar-textarea');
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

        } //LR.U.Editor
    } //LR.U
}; //LR

$(document).ready(function() {
//    LR.U.initStorage('html');
//    LR.U.getDocRefType();
    LR.U.showRefs();
    LR.U.setUser();
    LR.U.setLocalDocument();
    LR.U.buttonClose();
    LR.U.highlightItems();
    LR.U.showDocumentInfo();
//    LR.U.openTarget();
//    LR.U.buildReferences();
//    LR.U.getLinkedResearch();
    LR.U.showFragment();
    LR.U.setDocumentMode();
});
