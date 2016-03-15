/** dokieli
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://github.com/linkeddata/dokieli
 */

var SimpleRDF = ld.SimpleRDF;
var DO = {
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
        DisableStorageButtons: '<button class="local-storage-disable-html"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
        EnableStorageButtons: '<button class="local-storage-enable-html"><i class="fa fa-database fa-2x"></i>Local Storage</button>',
        CDATAStart: '//<![CDATA[',
        CDATAEnd: '//]]>',
        SortableList: false,
        EditorAvailable: !!document.querySelector('head script[src$="medium-editor.min.js"]'),
        EditorEnabled: false,
        Editor: {
            headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
            regexEmptyHTMLTags: /<[^\/>][^>]*><\/[^>]+>/gim,
            DisableEditorButton: '<button class="editor-disable"><i class="fa fa-pencil fa-2x"></i>Edit</button>',
            EnableEditorButton: '<button class="editor-enable"><i class="fa fa-pencil fa-2x"></i>Edit</button>'
        },
        ContextLength: 32,
        InteractionPath: 'i/',
        ProxyURL: 'https://databox.me/,proxy?uri=',
        AuthEndpoint: 'https://databox.me/',
        License: {
            "NoLicense": "No license",
            "http://creativecommons.org/publicdomain/zero/1.0/": "CC0 1.0",
            "http://creativecommons.org/licenses/by/4.0/": "CC BY 4.0",
            "http://creativecommons.org/licenses/by-sa/4.0/": "CC BY-SA 4.0",
            "http://creativecommons.org/licenses/by-nc/4.0/": "CC BY-NC 4.0",
            "http://creativecommons.org/licenses/by-nd/4.0/": "CC BY-ND 4.0",
            "http://creativecommons.org/licenses/by-nc-sa/4.0/": "CC NC-SA 4.0",
            "http://creativecommons.org/licenses/by-nc-nd/4.0/": "CC NC-ND 4.0",
            "https://creativecommons.org/publicdomain/zero/1.0/": "CC0 1.0",
            "https://creativecommons.org/licenses/by/4.0/": "CC BY 4.0",
            "https://creativecommons.org/licenses/by-sa/4.0/": "CC BY-SA 4.0",
            "https://creativecommons.org/licenses/by-nc/4.0/": "CC BY-NC 4.0",
            "https://creativecommons.org/licenses/by-nd/4.0/": "CC BY-ND 4.0",
            "https://creativecommons.org/licenses/by-nc-sa/4.0/": "CC NC-SA 4.0",
            "https://creativecommons.org/licenses/by-nc-nd/4.0/": "CC NC-ND 4.0"
        },
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

            "schemaname": "https://schema.org/name",
            "schemaurl": {
                "@id": "https://schema.org/url",
                "@type": "@id"
            },
            "schemaimage": {
                "@id": "https://schema.org/image",
                "@type": "@id"
            },
            "schemacreator": {
                "@id": "https://schema.org/creator",
                "@type": "@id"
            },
            "schemalicense": {
                "@id": "https://schema.org/license",
                "@type": "@id"
            },
            "schemacitation": {
                "@id": "https://schema.org/citation",
                "@type": "@id",
                "@array": true
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
            "pingbacksource": {
                "@id": "http://purl.org/net/pingback/source",
                "@type": "@id"
            },
            "pingbackproperty": {
                "@id": "http://purl.org/net/pingback/property",
                "@type": "@id"
            },
            "pingbacktarget": {
                "@id": "http://purl.org/net/pingback/target",
                "@type": "@id"
            },
            "solidinbox": {
                "@id": "http://www.w3.org/ns/solid/terms#inbox",
                "@type": "@id",
                "@array": true
            },
            "solidnotification": {
                "@id": "http://www.w3.org/ns/solid/terms#Notification",
                "@type": "@id"
            },

            "oaannotation": {
                "@id": "http://www.w3.org/ns/oa#Annotation",
                "@type": "@id"
            },
            "oahasBody": {
                "@id": "http://www.w3.org/ns/oa#hasBody",
                "@type": "@id"
            },
            "oahasTarget": {
                "@id": "http://www.w3.org/ns/oa#hasTarget",
                "@type": "@id"
            },
            "oahasSource": {
                "@id": "http://www.w3.org/ns/oa#hasSource",
                "@type": "@id"
            },
            "oahasSelector": {
                "@id": "http://www.w3.org/ns/oa#hasSelector",
                "@type": "@id"
            },
            "oaexact": "http://www.w3.org/ns/oa#exact",
            "oaprefix": "http://www.w3.org/ns/oa#prefix",
            "oasuffix": "http://www.w3.org/ns/oa#suffix",
            "oatext": "http://www.w3.org/ns/oa#text",
            "oaAnnotatedAt": {
                "@id": "http://www.w3.org/ns/oa#annotatedAt",
                "@type": "@id"
            },
            "oaAnnotatedBy": {
                "@id": "http://www.w3.org/ns/oa#annotatedBy",
                "@type": "@id"
            },

            "asobject": {
                "@id": "http://www.w3.org/ns/activitystreams#object",
                "@type": "@id",
                "@array": true
            },
            "astarget": {
                "@id": "http://www.w3.org/ns/activitystreams#target",
                "@type": "@id",
                "@array": true
            },
            "ascontext": {
                "@id": "http://www.w3.org/ns/activitystreams#context",
                "@type": "@id",
                "@array": true
            },

            "ldpcontains": {
                "@id": "http://www.w3.org/ns/ldp#contains",
                "@type": "@id",
                "@array": true
            },
            "ldpresource": {
                "@id": "http://www.w3.org/ns/ldp#Resource",
                "@type": "@id"
            }
        }
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
                            DO.U.authenticateUserFallback(url, DO.C.ProxyURL, reasons).then(
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

            var pIRI = url;

            if (proxyURL) {
                pIRI = proxyURL + DO.U.encodeString(url);
            }

            pIRI = DO.U.stripFragmentFromString(pIRI);

            return new Promise(function(resolve, reject) {
                SimpleRDF(DO.C.Vocab, pIRI, null, ld.store).get().then(
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
                        //XXX: Is SimpleRDF even ever hitting this?
                        console.log("---2 WebID's storage NOT FOUND");
                        reason["message"] = "WebID's storage was not found";
                        reasons.push(reason);
                        return Promise.reject(reason);
                    }
                )
                .then(
                    function(i) {
                        resolve(i);
                    },
                    function(reason) {
// console.log('Try through known authentication endpoint');
                        DO.U.getResourceHeadUser(DO.C.AuthEndpoint).then(
                            function(i) {
                                return resolve(i);
                            },
                            function(reason) {
                                console.log("--- Known authentication endpoint didn't work");
                                reason["message"] = "Known authentication endpoint didn't work";
                                reasons.push(reason);
                                return reject(reasons);
                            }
                        );
                    }
                );

            });
        },

        getResourceHeadUser: function(url) {
            return new Promise(function(resolve, reject) {
                var http = new XMLHttpRequest();
                http.open('HEAD', url);
                http.withCredentials = true;
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

        setUser: function(url) {
            url = url || window.location.origin + window.location.pathname;
            return new Promise(function(resolve, reject) {
                DO.U.authenticateUser(url).then(
                    function(userIRI) {
// console.log('setUser resolve: ' + userIRI);
                        DO.C.User.IRI = userIRI;
// console.log(DO.C.User.IRI);
                        return resolve(userIRI);
                    },
                    function(xhr) {
                        console.log('setUser reject');
                        return reject(xhr);
                    }
                );
            });
        },

        setUserInfo: function(userIRI) {
// console.log("setUserInfo: " + userIRI);
            if (userIRI) {
                var pIRI = userIRI;

                pIRI = DO.U.stripFragmentFromString(pIRI);

                //TODO: Should use both document.location.origin + '/,proxy?uri= and then DO.C.ProxyURL .. like in setUser
                if (document.location.protocol == 'https:' && pIRI.slice(0, 5).toLowerCase() == 'http:') {
                    pIRI = DO.C.ProxyURL + DO.U.encodeString(pIRI);
                }
// console.log("pIRI: " + pIRI);

                return new Promise(function(resolve, reject) {
                    SimpleRDF(DO.C.Vocab, pIRI, null, ld.store).get().then(
                        function(i) {
                            var s = i.child(userIRI);
// console.log(s);
                            if (s.foafname) {
                                DO.C.User.Name = s.foafname;
// console.log(DO.C.User.Name);
                            }
                            else {
                                if (s.schemaname) {
                                    DO.C.User.Name = s.schemaname;
// console.log(DO.C.User.Name);
                                }
                            }

                            if (s.foafimg) {
                                DO.C.User.Image = s.foafimg;
// console.log(DO.C.User.Image);
                            }
                            else {
                                if (s.schemaimage) {
                                    DO.C.User.Image = s.schemaimage;
// console.log(DO.C.User.Image);
                                }
                            }

                            if (s.storage) {
                                DO.C.User.Storage = s.storage._array;
                                console.log(DO.C.User.Storage);
                            }
                            if (s.preferencesFile && s.preferencesFile.length > 0) {
                                DO.C.User.PreferencesFile = s.preferencesFile;
                                console.log(DO.C.User.PreferencesFile);

                                //XXX: Probably https so don't bother with proxy?
                                SimpleRDF(DO.C.Vocab, s.preferencesFile, null, ld.store).get().then(
                                    function(pf) {
                                        DO.C.User.PreferencesFileGraph = pf;
                                        var s = pf.child(userIRI);

                                        if (s.masterWorkspace) {
                                            DO.C.User.masterWorkspace = s.masterWorkspace;
                                        }

                                        if (s.workspace) {
                                            DO.C.User.Workspace = { List: s.workspace._array };
                                            //XXX: Too early to tell if this is a good/bad idea. Will revise any way. A bit hacky right now.
                                            s.workspace._array.forEach(function(workspace) {
                                                var wstype = pf.child(workspace).rdftype._array || [];
                                                wstype.forEach(function(w) {
                                                    switch(w) {
                                                        case 'http://www.w3.org/ns/pim/space#PreferencesWorkspace':
                                                            DO.C.User.Workspace.Preferences = workspace;
                                                            ;
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
                            }
                            return resolve(userIRI);
                        },
                        function(reason) { return reject(reason); }
                    );
                });
            }
            else {
                console.log('NO USER IRI');
                return Promise.reject();
            }
        },

        getUserHTML: function() {
            var userName = 'Anonymous';
            if (DO.C.User.Name) {
                //XXX: We have the IRI already
                userName = '<span about="' + DO.C.User.IRI + '" property="schema:name">' + DO.C.User.Name + '</span>';
            }

            var userImage = '';
            if (DO.C.User.Image) {
                userImage = '<img rel="schema:image" src="' + DO.C.User.Image + '" width="48" height="48"/>';
            }

            var user = ''
            if (DO.C.User.IRI) {
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

        putPingbackTriple: function(url, pingbackOf, pingbackTo) {
            var data = '<'+ pingbackOf + '> <http://purl.org/net/pingback/to> <' + pingbackTo + '> .';

            DO.U.putResource(url, data, 'text/turtle; charset=utf-8');
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
            url = url || window.location.origin + window.location.pathname;

            var promise = function() {
                return new Promise(function(resolve, reject) {
                    DO.U.getResourceHead(url).then(
                        function(i) {
                            resolve(i);
                        },
                        function(reason) {
                            reject(reason);
                        }
                    )
                });
            };

            return promise().then(
                function(i) {
                    return DO.U.getInboxFromRDF(url);
                },
                function(reason) {
                    return Promise.reject(reason);
                }
            );
        },

        getInboxFromRDF: function(url, subjectIRI) {
            url = url || window.location.origin + window.location.pathname;
            subjectIRI = subjectIRI || url;

            url = DO.U.stripFragmentFromString(url);

// console.log(url);
// console.log(subjectIRI);

            return new Promise(function(resolve, reject) {
                //FIXME: This doesn't work so well if the document's URL is different than input url
                SimpleRDF(DO.C.Vocab, url, null, ld.store).get().then(
                    function(i) {
                        var s = i.child(subjectIRI);
                        if (s.solidinbox._array.length > 0) {
// console.log(s.solidinbox._array);
                            return resolve(s.solidinbox._array);
                        }
                        var reason = {"message": "Inbox was not found"};
                        return Promise.reject(reason);
                    },
                    function(reason) {
                        console.log(reason);
                        return reject(reason);
                    }
                );
            });
        },

        getNotifications: function(url) {
            url = url || window.location.origin + window.location.pathname;
            var notifications = [];

            return new Promise(function(resolve, reject) {
                SimpleRDF(DO.C.Vocab, url, null, ld.store).get().then(
                    function(i) {
                        var s = i.child(url);
                        s.ldpcontains.forEach(function(resource) {
                            var types = s.child(resource).rdftype._array;
                            if(types.indexOf(DO.C.Vocab.ldpresource["@id"]) >= 0) {
                                notifications.push(resource);
                            }
                        });

                        if (notifications.length > 0) {
                            return resolve(notifications);
                        }
                        else {
                            var reason = {"message": "There are no notifications."};
                            return Promise.reject(reason);
                        }
                    },
                    function(reason) {
                        console.log(reason);
                        return reject(reason);
                    }
                );
            });
        },

        getNotificationSource: function(url) {
            url = url || window.location.origin + window.location.pathname;

            return new Promise(function(resolve, reject) {
                var g = SimpleRDF(DO.C.Vocab, url, null, ld.store).get().then(
                    function(i) {
                        var s = i.child(url);
                        if (s.ascontext.at(0) == DO.C.Vocab.oahasTarget["@id"] && s.astarget.at(0).indexOf(window.location.origin + window.location.pathname) >= 0) {
                            return resolve(s.asobject.at(0));
                        }
                        else {
                            return Promise.reject({'message': 'Notification source not found'});
                        }
                    },
                    function(reason) {
                        console.log(reason);
                        return reject(reason);
                    }
                );
            });
        },

        showInboxNotifications: function() {
            if (typeof SimpleRDF !== 'undefined') {
                DO.U.getInbox().then(
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
                        DO.U.getNotificationSource(notification).then(
                            function(source) {
                                DO.U.getResourceHead(source).then(
                                    function(head) {
                                        DO.U.positionQuoteSelector(source);
                                    },
                                    function(reason) {
                                        console.log('Notification source is unreachable');
                                    }
                                );
                            },
                            function(reason) {
                                console.log('Notification source does not exist');
                            }
                        );
                    });
                },
                function(reason) {
                    console.log(reason);
                }
            );
        },

        getResourceHead: function(url) {
            url = url || window.location.origin + window.location.pathname;
            return new Promise(function(resolve, reject) {
                var http = new XMLHttpRequest();
                http.open('HEAD', url);
                http.withCredentials = true;
                http.onreadystatechange = function() {
                    if (this.readyState == this.DONE) {
                        if (this.status === 200) {
                            return resolve({'headers': this.getAllResponseHeaders()});
                        }
                        return reject({status: this.status, xhr: this});
                    }
                };
                http.send();
            });
        },

        getResource: function(url, headers) {
            url = url || window.location.origin + window.location.pathname;
            headers = headers || {};
            if(typeof headers['Accept'] == 'undefined') {
                headers['Accept'] = 'text/turtle; charset=utf-8';
            }

            return new Promise(function(resolve, reject) {
                var http = new XMLHttpRequest();
                http.open('GET', url);
                Object.keys(headers).forEach(function(key) {
                    http.setRequestHeader(key, headers[key]);
                });
                http.withCredentials = true;
                http.onreadystatechange = function() {
                    if (this.readyState == this.DONE) {
                        if (this.status === 200 || this.status === 201 || this.status === 204) {
                            return resolve({xhr: this});
                        }
                        return reject({status: this.status, xhr: this});
                    }
                };
                http.send();
            });
        },

        putResource: function(url, data, contentType, links) {
            if (url && url.length > 0) {
                contentType = contentType || 'text/html; charset=utf-8';
                var ldpResource = '<http://www.w3.org/ns/ldp#Resource>; rel="type"';
                links = (links) ? ldpResource + ', ' + links : ldpResource;

                return new Promise(function(resolve, reject) {
                    var http = new XMLHttpRequest();
                    http.open('PUT', url);
                    http.setRequestHeader('Content-Type', contentType);
                    http.setRequestHeader('Link', links);
                    http.withCredentials = true;
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

        postResource: function(url, slug, data, contentType, links) {
            if (url && url.length > 0) {
                contentType = contentType || 'text/html; charset=utf-8';
                var ldpResource = '<http://www.w3.org/ns/ldp#Resource>; rel="type"';
                links = (links) ? ldpResource + ', ' + links : ldpResource;

                return new Promise(function(resolve, reject) {
                    var http = new XMLHttpRequest();
                    http.open('POST', url);
                    http.setRequestHeader('Content-Type', contentType);
                    http.setRequestHeader('Link', links);
                    if (slug && slug.length > 0) {
                        http.setRequestHeader('Slug', slug);
                    }
                    http.withCredentials = true;
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

        patchResource: function(url, deleteBGP, insertBGP) {
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
                http.withCredentials = true;
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

        deleteResource: function(url) {
            return new Promise(function(resolve, reject) {
                var http = new XMLHttpRequest();
                http.open('DELETE', url);
                http.withCredentials = true;
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

        putResourceACL: function(accessToURL, aclSuffix, agentIRI) {
            if (accessToURL && accessToURL.length > 10 && aclSuffix && aclSuffix.length > 0 && agentIRI && agentIRI.length > 10) {
                return new Promise(function(resolve, reject) {
                    var url = accessToURL + aclSuffix;
                    var data = '@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n\
@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n\
[ a acl:Authorization ; acl:accessTo <' + accessToURL + '> ; acl:mode acl:Read ; acl:agentClass foaf:Agent ] .\n\
[ a acl:Authorization ; acl:accessTo <' + accessToURL + '> ; acl:accessTo <' + accessToURL + aclSuffix + '> ; acl:mode acl:Control , acl:Read , acl:Write ; acl:agent <' + agentIRI + '> ] .';

                    DO.U.putResource(url, data, 'text/turtle; charset=utf-8').then(
                        function(i) {
// console.log(i);
                            return resolve(i);
                        },
                        function(reason) {
                            console.log(reason);
                            return reject(reason);
                        }
                    );
                });
            }
            else {
                return Promise.reject({'message': 'accessToURL: ' + accessToURL + ' or aclSuffix: ' + aclSuffix + ' or agentIRI: ' + agentIRI + ' not good.'});
            }
        },

        notifyInbox: function(url, slug, source, context, target, licenseIRI) {
            var data = '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\
@prefix as: <http://www.w3.org/ns/activitystreams#> .\n\
@prefix schema: <https://schema.org/> .\n\
<> a as:Announce\n\
    ; as:object <' + source + '>\n\
    ; as:context <' + context + '>\n\
    ; as:target <' + target + '>\n\
    ; as:updated "' + DO.U.getDateTimeISO() + '"^^xsd:dateTime\n\
';

            if (DO.C.User.IRI) {
                data += '    ; as:actor <' + DO.C.User.IRI + '>\n\
';
            }

            if (licenseIRI) {
                data += '    ; schema:license <' + licenseIRI + '>\n\
';
            }
            data += '    .\n\
';

            return DO.U.postResource(url, slug, data, 'text/turtle; charset=utf-8');
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
                if (DO.U.urlParam('edit') == 'true' || mode == 'edit') {
                    DO.U.Editor.enableEditor();
                }
                if (DO.U.urlParam('edit') == 'true') {
                    var url = document.location.href;
                    window.history.replaceState({}, null, url.substr(0, url.lastIndexOf('?')));
                }
            }
        },

        //TODO: Refactor
        showUserSigninSignup: function(node) {
            if (typeof SimpleRDF !== 'undefined') {
                var s = '<button class="signin-user"><i class="fa fa-user-secret fa-2x"></i>Sign in</button>';
                if(DO.C.User.IRI) {
                    s = DO.U.getUserHTML();
                }
                node.insertAdjacentHTML('beforeend', '<p id="user-info">' + s + '</p>');

                var su = document.querySelector('#document-menu button.signin-user');
                if(su) {
                    su.addEventListener('click', DO.U.showUserIdentityInput);
                }
            }
        },

        //TODO: Refactor
        showUserIdentityInput: function(e) {
            e.target.setAttribute('disabled', 'disabled');
            document.body.insertAdjacentHTML('beforeend', '<aside id="user-identity-input" class="do on"><button class="close">❌</button><h2>Enter WebID to sign in with</h2><label>HTTP(S) IRI</label><input id="webid" type="text" placeholder="http://csarven.ca/#i" value="" name="webid"/> <button class="signin">Sign in</button></aside>');
            var buttonSignIn = document.querySelector('#user-identity-input button.signin');
            buttonSignIn.setAttribute('disabled', 'disabled');
            document.querySelector('#user-identity-input button.close').addEventListener('click', function(e) {
                document.querySelector('#document-menu button.signin-user').removeAttribute('disabled');
            });
            var inputWebid = document.querySelector('#user-identity-input input#webid');
            buttonSignIn.addEventListener('click', DO.U.submitSignIn);
            ['keyup', 'cut', 'paste', 'input'].forEach(function(eventType) {
                inputWebid.addEventListener(eventType, function(e){ DO.U.enableDisableButton(e, buttonSignIn); });
            });
            webid.focus();
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
            var url = userIdentityInput.querySelector('input#webid').value.trim();
            if (url.length > 0) {
                var setUser = function() {
                    return new Promise(function(resolve, reject) {
                        DO.U.setUser(url).then(
                            function(i) {
                                userIdentityInput.parentNode.removeChild(userIdentityInput);
                                return resolve(i);
                            },
                            function(reason) {
                                var rm = userIdentityInput.querySelector('.response-message');
                                if (rm) {
                                    rm.parentNode.removeChild(rm);
                                }
                                if (reason.length > 0) {
                                    var reasonsList = '<p>Reasons:</p><ul>';
                                    reason.forEach(function(r) {
                                        reasonsList += '<li>' + r.message + '</li>';
                                    });
                                    reasonsList += '</ul>';
                                }

                                userIdentityInput.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">Unable to sign in with this WebID.</p>' + reasonsList + '</div>');
                                document.querySelector('#user-identity-input button.signin').removeAttribute('disabled');
                                console.log(reason);
                                return reject(reason);
                            }
                        );
                    });
                };

                setUser().then(
                    function(i) {
                        DO.U.setUserInfo(i).then(
                            function(i) {
// console.log(i);
                                document.getElementById('user-info').innerHTML = DO.U.getUserHTML();
                            },
                            function(reason) {
                                console.log(reason);
                            }
                        );
                    },
                    function(reason) {
                        console.log("--- NO USER");
                        console.log(reason);
                    }
                );
            }
        },

        showDocumentInfo: function() {
            document.body.insertAdjacentHTML('beforeend', '<menu id="document-menu" class="do"><button class="show" title="Open Menu">☰</button><header></header><div></div><footer><dl><dt>About</dt><dd id="about-dokieli"><a href="https://github.com/linkeddata/dokieli">dokieli</a></dd><dd id="about-linked-research"><a href="https://linkedresearch.org/">Linked Research</a></dd></dl></footer></menu>');
            document.querySelector('#document-menu > button').addEventListener('click', function(e) {
                if (e.target.classList.contains('show')) {
                    DO.U.showDocumentMenu();
                }
                else {
                    DO.U.hideDocumentMenu();
                }
            });
        },

        showDocumentMenu: function() {
            var body = document.body;
            var dMenu = document.querySelector('#document-menu.do');
            var dMenuButton = dMenu.querySelector('button');
            var dHead = dMenu.querySelector('header');
            var dInfo = dMenu.querySelector('div');

            dMenuButton.classList.remove('show');
            dMenuButton.classList.add('hide');
            dMenuButton.setAttribute('title', 'Hide Menu');
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

        hideDocumentMenu: function() {
            document.removeEventListener('click', DO.U.eventLeaveDocumentMenu);

            var body = document.body;
            var dMenu = document.querySelector('#document-menu.do');
            var dMenuButton = dMenu.querySelector('button');

            var uss = dMenu.querySelector('#user-info');
            uss.parentNode.removeChild(uss);
            dMenu.classList.remove('on');
            var sections = dMenu.querySelectorAll('section');
            for (var i = 0; i < sections.length; i++) {
                sections[i].parentNode.removeChild(sections[i]);
            };
            body.classList.remove('on-document-menu');
            dMenuButton.classList.add('show');
            dMenuButton.setAttribute('title', 'Open Menu');

            var removeElementsList = ['toc', 'embed-data-entry', 'create-new-document', 'save-as-document', 'user-identity-input', 'resource-browser'];
            removeElementsList.forEach(function(id) {
                var element = document.getElementById(id);
                if(element) {
                    element.parentNode.removeChild(element);
                }
            });

//            DO.U.hideStorage();
        },

        setDocRefType: function() {
            DO.C.DocRefType = document.querySelector('head link[rel="stylesheet"][title]').getAttribute('title');

            if (Object.keys(DO.C.RefType).indexOf(DO.C.DocRefType) == -1) {
                DO.C.DocRefType = 'LNCS';
            }
        },

        showViews: function(node) {
            var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

            if (stylesheets.length > 1) {
                var s = '<section id="document-views" class="do"><h2>Views</h2><i class="fa fa-magic"></i><ul>';
                s += '<li><button>Native</button></li>';
                for (var i = 0; i < stylesheets.length; i++) {
                    var stylesheet = stylesheets[i];
                    var view = stylesheet.getAttribute('title');
                    if(stylesheet.matches('[rel~="alternate"]')) {
                        s += '<li><button>' + view + '</button></li>';
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
                        var prevStylesheet = document.querySelector('head link[rel="stylesheet"][title]:not([href$="do.css"]):not(disabled)');
                        prevStylesheet = (prevStylesheet) ? prevStylesheet.getAttribute('title') : '';

                        for (var j = 0; j < stylesheets.length; j++) {
                            var stylesheet = stylesheets[j];
                            if (stylesheet.getAttribute('title').toLowerCase() == selected.textContent.toLowerCase()) {
                                stylesheet.setAttribute('rel', 'stylesheet');
                                stylesheet.disabled = false;
                            }
                            else {
                                stylesheet.disabled = true; //XXX: Leave this. WebKit wants to trigger this before for some reason.
                                stylesheet.setAttribute('rel', 'stylesheet alternate');
                            }
                        };

                        var bd = document.querySelectorAll('#document-views.do button:disabled');
                        for(var j = 0; j < bd.length; j++) {
                            bd[j].disabled = false;
                        }
                        selected.disabled = true;

                        var sr = document.querySelectorAll('span.ref');
                        for(var j = 0; j < sr.length; j++) {
                            var refId = sr[j].querySelector('mark').id;
                            var noteId = str[j].querySelector('a').textContent;
                            DO.U.positionNote(refId, noteId, noteId);
                        };

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
            node.insertAdjacentHTML('beforeend', '<section id="embed-data-in-html" class="do"><h2>Data</h2><ul><li><button class="embed-data-meta"><i class="fa fa-table fa-2x"></i>Embed Data</button></li></ul></section>');

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

                var embedMenu = '<aside id="embed-data-entry" class="do on tabs"><button class="close">❌</button>\n\
                <h2>Embed Data</h2>\n\
                <nav><ul><li class="selected"><a href="#embed-data-turtle">Turtle</a></li><li><a href="#embed-data-json-ld">JSON-LD</a></li><li><a href="#embed-data-nanopublication">Nanopublication</a></li></ul></nav>\n\
                <div id="embed-data-turtle" class="selected"><textarea placeholder="Enter data in text/turtle" name="meta-turtle" cols="80" rows="24">' + ((scriptCurrentData['meta-turtle']) ? scriptCurrentData['meta-turtle'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                <div id="embed-data-json-ld"><textarea placeholder="Enter data in application/ld+json" name="meta-json-ld" cols="80" rows="24">' + ((scriptCurrentData['meta-json-ld']) ? scriptCurrentData['meta-json-ld'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                <div id="embed-data-nanopublication"><textarea placeholder="Enter data in application/trig" name="meta-nanopublication" cols="80" rows="24">' + ((scriptCurrentData['meta-nanopublication']) ? scriptCurrentData['meta-nanopublication'].content : '') + '</textarea><button class="save">Save</button></div>\n\
                </aside>';

                document.body.insertAdjacentHTML('beforeEnd', embedMenu);
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
                            var scriptContent = '    ' + scriptType[name].scriptStart + scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd + scriptType[name].scriptEnd;
                            //If there was a script already
                            if (script) {
                                script.innerHTML = scriptContent;
                            }
                            else {
                                document.querySelector('head').insertAdjacentHTML('beforeEnd', scriptContent);
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
            var disabledInput = s = '';
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
            var content = document.getElementById('content');
            var count = DO.U.contentCount(content);

            var contributors = '<ul class="contributors">';
            var relContributors = document.querySelectorAll('#authors *[rel*="contributor"]');
            for (var i = 0; i < relContributors.length; i++) {
                contributors += '<li>' + relContributors[i].innerHTML + '</li>';
            }
            contributors += '</ul>';

            var s = '<section id="document-metadata" class="do"><table>\n\
                <caption>Document Metadata</caption>\n\
                <tbody>\n\
                    <tr><th>Authors</th><td>' + contributors + '</td></tr>\n\
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

                s = '<aside id="toc" class="do on' + sortable + '"><button class="close">❌</button></aside>';
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
                        var subsections = section.parentNode.querySelectorAll('#' + section.id + ' > div > section[rel*="hasPart"]:not([class~="slide"])');
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
                                s += '<li><a href="#' + e[i].id +'">' + e[i].querySelector(titleType).textContent +'</a></li>';
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
                DO.U.hideDocumentMenu();
            }
        },

        eventLeaveDocumentMenu: function(e) {
            if (!e.target.closest('.do.on')) {
                DO.U.hideDocumentMenu();
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

        stripFragmentFromString: function(string) {
            if (typeof string === "string") {
                stringIndexFragment = string.indexOf('#');

                if (stringIndexFragment >= 0) {
                    string = string.substring(0, stringIndexFragment);
                }
            }
            return string;
        },

        showFragment: function() {
            var ids = document.querySelectorAll('#content *[id], #document-interactions *[id]:not(input):not(textarea):not(select)');
            for(var i = 0; i < ids.length; i++){
                ids[i].addEventListener('mouseenter', function(e){
                    var fragment = document.querySelector('#' + e.target.id + ' > .do.fragment');
                    if (!fragment && e.target.parentNode.nodeName.toLowerCase() != 'aside'){
                        var sign;
                        switch(e.target.nodeName.toLowerCase()) {
                            default:        sign = '🔗'; break;
                            case 'section':
                                switch (e.target.id) {
                                    default:                  sign = '§'; break;
                                    case 'references':        sign = '☛'; break;
                                    case 'acknowledgements':  sign = '☺'; break;
                                    case 'results':           sign = '∞'; break;
                                    case 'related-work':      sign = '⌘'; break;
                                    case 'keywords':          sign = '🏷'; break;
                                    case 'conclusions':       sign = '∴'; break;
                                }
                                break;
                            case 'aside':   sign = '†'; break;
                            case 'p':       sign = '¶'; break;
                            case 'pre':     sign = '🖩'; break;
                            case 'nav':     sign = '☛'; break;
                            case 'figure':  sign = '❦'; break;
                            case 'img':     sign = '🖼'; break;
                            case 'video':   sign = '🎞'; break;
                            case 'audio':   sign = '🔊'; break;
                            case 'footer':  sign = '⸙'; break;
                        }
                        e.target.insertAdjacentHTML('afterbegin', '<span class="do fragment"><a href="#' + e.target.id + '">' + sign + '</a></span>');
                        fragment = document.querySelector('#' + e.target.id + ' > .do.fragment');
                        var fragmentClientWidth = fragment.clientWidth;

                        var fragmentOffsetLeft = DO.U.getOffset(e.target).left;
                        var bodyOffsetLeft = DO.U.getOffset(document.body).left;

                        var offsetLeft = 0;
                        if ((fragmentOffsetLeft - bodyOffsetLeft) > 200) {
                            offsetLeft = e.target.offsetLeft;
                        }

                        fragment.style.top = Math.ceil(e.target.offsetTop) + 'px';
                        fragment.style.left = (offsetLeft - fragmentClientWidth - 2) + 'px';
                        fragment.style.height = e.target.clientHeight + 'px';
                        fragment.style.width = (fragmentClientWidth - 10) + 'px';
                    }
                });

                ids[i].addEventListener('mouseleave', function(e){
                    var fragment = document.querySelector('#' + e.target.id + ' > .do.fragment');
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

        getGraph: function(url) {
            return new Promise(function(resolve, reject) {
                SimpleRDF(DO.C.Vocab, url, null, ld.store).get().then(
                    function(i){
                       return resolve(i);
                    },
                    function(reason) {
                      return reject(reason);
                    }
                );
            });
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
                    if (node.hasAttribute('class') && node.classList.contains('do') && node.classList.contains('ref')) {
                        out += node.querySelector('mark').textContent;
                    }
                    else if (!(node.hasAttribute('class') && (node.classList.contains('do') || node.classList.contains('firebugResetStyles')))) {
                        var ename = node.nodeName.toLowerCase() ;
                        out += "<" + ename ;

                        var attrList = [];
                        for (var i = node.attributes.length - 1; i >= 0; i--) {
                            var atn = node.attributes[i];
                            if (skipAttributes[atn.name]) continue;
                            if (/^\d+$/.test(atn.name)) continue;
                            if (atn.name == 'class' && (atn.value.split(' ').indexOf('on-document-menu') > -1)) {
                                atn.value = atn.value.replace(/(on-document-menu)/, '').trim();
                            }
                            if (!(atn.name == 'class' && atn.value == '')) {
                                attrList.push(atn.name + "=\"" + DO.U.htmlEntities(atn.value) + "\"");
                            }
                        }

                        if (attrList.length > 0) {
                            attrList.sort(function (a, b) {
                              return a.toLowerCase().localeCompare(b.toLowerCase());
                            });
                            out += ' ' + attrList.join(' ');
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
                    out += noEsc[noEsc.length - 1] ? nl : nl.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
            var data = DO.U.getDocument();
            //XXX: Encodes strings as UTF-8. Consider storing bytes instead?
            var blob = new Blob([data], {type:'text/html;charset=utf-8'});
            var pattern = /[^\w]+/ig;
            var title = document.querySelector('h1').textContent.toLowerCase().replace(pattern, '-') || "index";
            var timestamp = DO.U.getDateTimeISO().replace(pattern, '') || "now";

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
            var buttonDisabled = '';
            if (document.location.protocol == 'file:') {
                buttonDisabled = ' disabled="disabled"';
            }

            var s = '<section id="document-do" class="do"><h2>Do</h2><ul>';
            s += '<li><button class="resource-new"'+buttonDisabled+'><i class="fa fa-paper-plane-o fa-2x"></i>New</button></li>';
            s += '<li><button class="resource-save"'+buttonDisabled+'><i class="fa fa-life-ring fa-2x"></i>Save</button></li>';
            s += '<li><button class="resource-save-as"><i class="fa fa-clone fa-2x"></i>Save As</button></li>';
            if (DO.C.EditorAvailable) {
                var editFile = (DO.C.EditorEnabled) ? DO.C.Editor.DisableEditorButton : DO.C.Editor.EnableEditorButton;
                s += '<li>' + editFile + '</li>';
            }
            s += '<li><button class="resource-export"><i class="fa fa-external-link fa-2x"></i>Export</button></li>';
            s += '<li><button class="resource-print"><i class="fa fa-print fa-2x"></i>Print</button></li>';
            s += '</ul></section>';
            node.insertAdjacentHTML('beforeend', s);

            var dd = document.getElementById('document-do');
            dd.addEventListener('click', function(e) {
                if (DO.C.EditorAvailable) {
                    if (e.target.matches('button.editor-enable')) {
                        e.target.parentNode.innerHTML = DO.C.Editor.DisableEditorButton;
                        DO.U.Editor.enableEditor();
                    }
                    if (e.target.matches('button.editor-disable')) {
                        e.target.parentNode.innerHTML = DO.C.Editor.EnableEditorButton;
                        DO.U.Editor.disableEditor();
                    }
                }

                if (e.target.matches('.resource-new')) {
                    DO.U.createNewDocument(e);
                }

                if (e.target.matches('.resource-save')) {
                    var url = window.location.origin + window.location.pathname;
                    var data = DO.U.getDocument();
                    DO.U.putResource(url, data).then(
                        function(i) {
                            DO.U.hideDocumentMenu();
                        },
                        function(reason) {
                            console.log(reason);
                        }
                    );
                }

                if (e.target.matches('.resource-save-as')) {
                    DO.U.saveAsDocument(e);
                }

                if (e.target.matches('.resource-export')) {
                    DO.U.exportAsHTML();
                }

                if (e.target.matches('.resource-print')) {
                    DO.U.hideDocumentMenu();
                    window.print();
                    return false;
                }
            });
        },

        nextLevelButton: function(button, url) {
            var final = document.getElementById('location-final');
            button.addEventListener('click', function(){
                if(button.parentNode.classList.contains('container')){
                    DO.U.getGraph(url).then(
                        function(g){
                            if(final){
                                final.textContent = url + "{name}";
                            }
                            return DO.U.generateBrowserList(g, url);
                        },
                        function(reason){
                            var inputBox = document.getElementById('browser-location');
                            switch(reason.slice(-3)) { // TODO: simplerdf needs to pass status codes better than in a string.
                                default:
                                    inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
                                    break;
                                case '404':
                                    inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">Not found.</p></div>');
                                    break;
                                case '401': case '403':
                                    var msg = 'You don\'t have permission to access this location.';
                                    if(!DO.C.User.IRI){
                                        msg += '</p><p>Try signing in to access your datastore.';
                                    }
                                    inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">' + msg + '</p></div>');
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
                    list.insertAdjacentHTML('afterBegin', upBtn);
                }

                var current = g.child(url);
                var contains = current.ldpcontains;
                var containersLi = Array();
                var resourcesLi = Array();
                contains.forEach(function(c){
                    var cg = g.child(c);
                    var types = cg.rdftype._array;

                    var path = DO.U.getUrlPath(c);
                    if(types.indexOf('http://www.w3.org/ns/ldp#Container') > -1){
                        var slug = path[path.length-2];
                        containersLi.push('<li class="container"><input type="radio" name="resources" value="' + c + '" id="' + slug + '"/><label for="' + slug + '">' + slug + '</label></li>');
                    }else{
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
                list.insertAdjacentHTML('beforeEnd', liHTML);

                var buttons = list.querySelectorAll('label');
                if(buttons.length <= 1){
                    list.insertAdjacentHTML('beforeEnd', '<p><em>(empty)</em></p>');
                }

                for(var i = 0; i < buttons.length; i++) {
                    var nextUrl = buttons[i].parentNode.querySelector('input').value;
                    DO.U.nextLevelButton(buttons[i], nextUrl);
                }

                return resolve(list);
            });
        },

        setupResourceBrowser: function(parent){

            parent.insertAdjacentHTML('beforeEnd', '<div id="browser-location"><label for="browser-location-input">URL</label> <input type="text" id="browser-location-input" name="browser-location-input" placeholder="https://example.org/path/to/" /><button id="browser-location-update" disabled="disabled">Browse</button></div>\n\
            <div id="browser-contents"></div>');

            var triggerBrowse = function(url){
                var inputBox = document.getElementById('browser-location');
                if (url.length > 10 && url.match(/^https?:\/\//g) && url.slice(-1) == "/"){
                    DO.U.getGraph(url).then(function(g){
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
                                inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">Unable to access ('+ reason +').</p>');
                                break;
                            case '404':
                                inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">Not found.</p></div>');
                                break;
                            case '401': case '403':
                                var msg = 'You don\'t have permission to access this location.';
                                if(!DO.C.User.IRI){
                                    msg += '</p><p>Try signing in to access your datastore.';
                                }
                                inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">' + msg + '</p></div>');
                                break;
                        }
                    });
                }else{
                    inputBox.insertAdjacentHTML('beforeEnd', '<div class="response-message"><p class="error">This is not a valid location.</p></div>');
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
                        final.textContent = input.value + "{name}";
                    }
                }else{
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

            if(DO.C.User.Storage) {
                var storageUrl = DO.U.forceTrailingSlash(DO.C.User.Storage[0]); // TODO: options for multiple storage
                input.value = storageUrl;
                DO.U.getGraph(storageUrl).then(function(g){
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
        },

        showResourceBrowser: function() {
            this.disabled = "disabled";
            var browserHTML = '<aside id="resource-browser" class="do on"><button class="close">❌</button><h2>Resource Browser</h2></aside>';
            document.querySelector('body').insertAdjacentHTML('beforeEnd', browserHTML);

            document.getElementById('resource-browser').querySelector('button.close').addEventListener('click', function(e) {
                document.querySelector('#document-do .resource-browser').removeAttribute('disabled');
            }, false);

            DO.U.setupResourceBrowser(document.getElementById('resource-browser'));

        },

        createNewDocument: function(e) {
            e.target.disabled = true;
            document.body.insertAdjacentHTML('beforeend', '<aside id="create-new-document" class="do on"><button class="close">❌</button><h2>Create New Document</h2></aside>');

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
                    var storageIRI = newDocument.querySelector('input#browser-location-input').value.trim();
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

                    html.querySelector('main > article').innerHTML = '';
                    html.querySelector('head title').innerHTML = '';
                    html = DO.U.getDocument(html);

                    DO.U.putResource(storageIRI, html).then(
                        function(i) {
// console.log(i);
                            newDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="success">New document created at <a href="' + storageIRI + '?edit=true">' + storageIRI + '</a></p></div>');
                            window.open(storageIRI + '?edit=true', '_blank');
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
            document.body.insertAdjacentHTML('beforeend', '<aside id="save-as-document" class="do on"><button class="close">❌</button><h2>Save As Document</h2></aside>');

            var saveAsDocument = document.getElementById('save-as-document');
            saveAsDocument.addEventListener('click', function(e) {
                if (e.target.matches('button.close')) {
                    document.querySelector('#document-do .resource-save-as').disabled = false;
                }
            });

            DO.U.setupResourceBrowser(saveAsDocument);
            document.getElementById('browser-location').insertAdjacentHTML('afterbegin', '<p>Choose a location to save your new article.</p>');
            saveAsDocument.insertAdjacentHTML('beforeend', DO.U.getBaseURLSelection() + '<p>Your new document will be saved at <samp id="location-final">https://example.org/path/to/article</samp></p><button class="create">Save</button>');
            var bli = document.getElementById('browser-location-input');
            bli.focus();
            bli.placeholder = 'https://example.org/path/to/article';

           saveAsDocument.addEventListener('click', function(e) {
                if (e.target.matches('button.create')) {
                    var saveAsDocument = document.getElementById('save-as-document');
                    var storageIRI = saveAsDocument.querySelector('input#browser-location-input').value.trim();
                    var rm = saveAsDocument.querySelector('.response-message');
                    if (rm) {
                        rm.parentNode.removeChild(rm);
                    }

                    var html = document.documentElement.cloneNode(true);
                    var baseURLSelectionChecked = saveAsDocument.querySelector('select[name="base-url"]');
                    if (baseURLSelectionChecked.length > 0) {
                        var baseURLType = baseURLSelectionChecked.value;
                        var nodes = html.querySelectorAll('head link, [src], object[data]');
                        if (baseURLType == 'base-url-relative') {
                            DO.U.copyRelativeResources(storageIRI, nodes);
                        }
                        nodes = DO.U.rewriteBaseURL(nodes, baseURLType);
                    }
                    html = DO.U.getDocument(html);

                    DO.U.putResource(storageIRI, html).then(
                        function(i) {
                            saveAsDocument.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="success">Document saved at <a href="' + storageIRI + '?edit=true">' + storageIRI + '</a></p></div>');
                            window.open(storageIRI + '?edit=true', '_blank');
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

        getBaseURLSelection: function() {
            var s = '<div id="base-url-selection"><label>Location of media resources:</label>\n\
            <select name="base-url">\n\
            <option id="base-url-absolute" value="base-url-absolute" selected="selected">Use references as is</option>\n\
            <option id="base-url-relative" value="base-url-relative">Copy to your storage</option>\n\
            </select>\n\
            </div>';

            return s;
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

        //I want HTTP COPY and I want it now!
        copyResource: function(fromURL, toURL) {
            if (fromURL != '' && toURL != '') {
                var http = new XMLHttpRequest();
                http.open('GET', fromURL);
                http.withCredentials = true;
                http.onreadystatechange = function() {
                    if (this.readyState == this.DONE) {
                        if (this.status === 200 || this.status === 201 || this.status === 204) {
                            var responseText = this.responseText;
                            var contentType = this.getResponseHeader('Content-Type');
                            DO.U.putResource(toURL, responseText, contentType).then(
                                function(i) {
// console.log(i);
                                },
                                function(reason) {
                                    console.log(reason);
                                }
                            );
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
                    if (e.target.matches('button.local-storage-enable-html')) {
                        e.target.outerHTML = DO.C.DisableStorageButtons;
                        DO.U.enableStorage('html');
                    }

                    if (e.target.matches('button.local-storage-disable-html')) {
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

        buildReferences: function() {
            if (!document.querySelector('#references ol')) {
                //XXX: Not the best way of doing this, but it allows DO references to be added to the right place.
                var references = document.getElementById('references');
                references.insertAdjacentHTML('beforeend', '\n<div><ol>\n</ol></div>\n');

                var refs = document.querySelectorAll('#content span.ref');
                if (refs) {
                    for (var i = 0; i < refs.length; i++) {
                        var referenceText = '';
                        var referenceLink = '';
                        var refId = (i+1);
                        var href = refs[i].getAttribute('href');
                        var title = refs[i].getAttribute('title');

                        if (title) {
                            referenceText = title.replace(/ & /g, " &amp; ");
                        }
                        if (href) {
                            referenceLink = href.replace(/&/g, "&amp;");
                            referenceLink = '<a about="" rel="schema:citation" href="' + referenceLink + '">' + referenceLink + '</a>';
                            if (title) {
                                referenceLink = ', ' + referenceLink;
                            }
                        }

                        refs[i].outerHTML = ' ' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a class="ref" href="#ref-' + refId + '">' + refId + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose;

                        document.querySelector('#references ol').insertAdjacentHTML('beforeend', '\n    <li id="ref-' + refId + '"></li>');

                        if(refs[i].classList.contains('do')) {
                            DO.U.getLinkedResearch(href, document.querySelector('#references #ref-' + refId));
                        }
                        else {
                            document.querySelector('#references #ref-' + refId).innerHTML = referenceText + referenceLink;
                        }
                    }
                }
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
    FILTER (LANG(?prefLabel) = '' || LANGMATCHES(LANG(?prefLabel), '" + DO.C.Lang + "'))\n\
}\n\
LIMIT 1";

            var store = rdfstore.create();
            store.load('remote', iri, function(success, results){
                if (success) {
                    store.execute(queryA, function(success, results) {
                        if (results.length > 0) {
                            console.log(results);
                            resultsNode.innerHTML = results[0].prefLabel.value + ', <a class="href" href="' + iri + '">' + iri + '</a>';
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
                char = s.charCodeAt(i);
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

        showRefs: function() {
            var refs = document.querySelectorAll('span.ref');
            for (var i = 0; i < refs.length; i++) {
// console.log(this);
                var ref = refs[i].querySelector('mark[id]');
// console.log(ref);
                var refId = ref.id;
// console.log(refId);
                var refA = refs[i].querySelector('[class*=ref-] a');
// console.log(refA);
                for (var j = 0; j < refA.length; j++) {
                    var noteIRI = refA[j].href;
// console.log(noteIRI);
                    var refLabel = refA[j].textContent;
// console.log(refLabel);

                    //FIXME: the noteId parameter for positionNote shouldn't
                    //rely on refLabel. Grab it from somewhere else.
                    DO.U.positionNote(refId, refLabel, refLabel);
                };
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
                'position: absolute',
                'top: ' + Math.ceil(ref.parentNode.offsetTop) + 'px',
                'left: auto',
                'right: calc(-35% - 2.5em)',
                'z-index: 1',
                'width: 35%',
                'font-size: 0.9em',
                'text-align: left'
            ].join('; ');
            note.setAttribute('style', style);
        },

        positionQuoteSelector: function(noteIRI, containerNode) {
            containerNode = containerNode || document.body;
            return new Promise(function(resolve, reject) {
                SimpleRDF(DO.C.Vocab, noteIRI, null, ld.store).get().then(
                    function(i) {
                        var note = i.child(noteIRI);
                        var datetime = note.oaAnnotatedAt;
                        var annotatedByIRI = note.oaAnnotatedBy;
                        var annotatedBy = i.child(annotatedByIRI);
                        var annotatedByName = annotatedBy.schemaname;
                        var annotatedByImage = annotatedBy.schemaimage;
                        var body = i.child(note.oahasBody);
                        var bodyText = body.oatext;
                        var target = i.child(note.oahasTarget);

                        var selector = target.oahasSelector;
                        var exact = selector.oaexact;
                        var prefix = selector.oaprefix;
                        var suffix = selector.oasuffix;

                        var source = target.oahasSource;

                        var licenseIRI = note.schemalicense;

                        var containerNodeTextContent = containerNode.textContent;
                        var selectorIndex = containerNodeTextContent.indexOf(prefix + exact + suffix);
                        if (selectorIndex >= 0) {
                            var exactStart = selectorIndex + prefix.length
                            var exactEnd = selectorIndex + prefix.length + exact.length;
                            var selection = { start: exactStart, end: exactEnd };

                            var id = String(Math.abs(DO.U.hashCode(noteIRI))).substr(0, 6);
                            var refId = 'r-' + id;
                            var refLabel = id;
                            var ref = '<span class="ref do" about="#' + refId + '" typeof="http://purl.org/dc/dcmitype/Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark><sup class="ref-annotation"><a rel="cito:hasReplyFrom" href="#' + id + '" resource="' + noteIRI + '">' + id + '</a></sup></span>';

                            MediumEditor.selection.importSelection(selection, containerNode, document);

                            //XXX: Review
                            var selection = window.getSelection();
                            r = selection.getRangeAt(0);
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
                                "type": 'position-quote-selector', //e.g., 'article'
                                "purpose": "read",
                                "motivatedByIRI": "oa:replying",
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

                            if (licenseIRI) {
                                noteData.license["iri"] = licenseIRI;
                            }

                            var note = DO.U.createNoteHTML(noteData);
                            var nES = selectedParentNode.nextElementSibling;
                            var asideNote = '\n\
<aside class="note do">\n\
<blockquote cite="' + noteIRI + '">'+ note + '</blockquote>\n\
</aside>\n\
';
                            var asideNode = DO.U.fragmentFromString(asideNote);
                            var parentSection = MediumEditor.util.getClosestTag(selectedParentNode, 'section');
                            parentSection.appendChild(asideNode);
                            //XXX: Keeping this comment around for emergency
//                                selectedParentNode.parentNode.insertBefore(asideNode, selectedParentNode.nextSibling);

                            DO.U.positionNote(refId, refLabel, id);

                            //Perhaps return something more useful?
                            return resolve(noteIRI);
                        }
                        else {
                            return Promise.reject({'message': "Can't match the text"});
                        }
                    },
                    function(reason) {
                        console.log(reason);
                        return reject(reason);
                    }
                );
            });
        },

        createNoteHTML: function(n) {
// console.log(n);

            var published = '';
            var license = '';
            var creator = '', authors = '', creatorImage = '';
            var hasTarget = '', annotationTextSelector = '', target = '';
            var heading, hX;
            var aAbout = '', aPrefix = '';
            var license = '';

            var motivatedByIRI = n.motivatedByIRI || '';
            var motivatedByLabel = n.motivatedByLabel || '';
            switch(motivatedByIRI) {
                case 'oa:replying': default:
                    motivatedByIRI = 'oa:replying';
                    motivatedByLabel = 'replies';
                    targetLabel = 'In reply to';
                    aAbout = '[i:]';
                    aPrefix = ' prefix="schema: https://schema.org/ oa: http://www.w3.org/ns/oa# as: http://www.w3.org/ns/activitystreams# i: ' + n.iri +'"';
                    break;
                case 'oa:describing':
                    motivatedByIRI = 'oa:describing';
                    motivatedByLabel = 'describes';
                    targetLabel = 'Describes';
                    aAbout = n.id;
                break;
            }

            switch(n.purpose) {
                default:
                    hX = 'h3';
                    break;
                case 'write':
                    hX = 'h1';
                    break;
            }

            var creatorName = 'Anonymous';
            if ('creator' in n) {
                if ('image' in n.creator !== 'undefined') {
                    creatorImage = '<img rel="schema:image" src="' + n.creator.image + '" width="48" height="48" />';
                }
                if ('iri' in n.creator && 'name' in n.creator) {
                    creatorName = n.creator.name;

                    creator = '<span about="' + n.creator.iri + '" typeof="schema:Person">' + creatorImage + ' <a rel="schema:url" href="' + n.creator.iri + '"><span about="' + n.creator.iri + '" property="schema:name">' + creatorName + '</span></a></span>';
                }
                else {
                    creator = '<span about="[i:#agent]" typeof="schema:Person">' + creatorName + '</span>';
                }

                authors = '<dl class="author-name"><dt>Authors</dt><dd><span rel="schema:creator oa:annotatedBy as:actor">' + creator + '</span></dd></dl>';
            }

            heading = '<' + hX + ' property="schema:name">' + creatorName + ' <span rel="oa:motivatedBy" resource="' + motivatedByIRI + '">' + motivatedByLabel + '</span></' + hX + '>';

            published = '<dl class="published"><dt>Published</dt><dd><a href="' + n.iri + '"><time datetime="' + n.datetime + '" datatype="xsd:dateTime" property="oa:annotatedAt schema:datePublished" content="' + n.datetime + '">' + n.datetime.substr(0,19).replace('T', ' ') + '</time></a></dd></dl>';

            switch(n.type) {
                case 'position-quote-selector':
                    //TODO: Include `a oa:SpecificResource`?
                    if (typeof n.target !== 'undefined' && typeof n.target.selector !== 'undefined') { //note, annotation
                        //FIXME: Could resourceIRI be a fragment URI or *make sure* it is the document URL without the fragment?
                        //TODO: Use n.target.iri?

                        body = '<div property="schema:description" rel="oa:hasBody as:content"><div about="[i:#i]" typeof="oa:TextualBody as:Note" property="oa:text" datatype="rdf:HTML">' + n.body + '</div></div>';

                        hasTarget = '<a rel="oa:hasTarget as:inReplyTo sioc:reply_of" href="' + n.target.iri + '">' + targetLabel + '</a> (<a about="' + n.target.iri + '" typeof="oa:SpecificResource" rel="oa:hasSource" href="' + n.target.source +'">part of</a>)';

                        annotationTextSelector = '<span rel="oa:hasSelector" typeof="oa:TextQuoteSelector"><span property="oa:prefix" xml:lang="en" lang="en">' + n.target.selector.prefix + '</span><mark property="oa:exact" xml:lang="en" lang="en">' + n.target.selector.exact + '</mark><span property="oa:suffix" xml:lang="en" lang="en">' + n.target.selector.suffix + '</span></span>';

                        target ='<dl class="target"><dt>' + hasTarget + '</dt><dd><blockquote about="' + n.target.iri + '" cite="' + n.target.iri + '">' + annotationTextSelector + '</blockquote></dd></dl>';
                    }
                    break;

                case 'footnote':
                    body = '<div class="content" property="schema:description" rel="oa:hasBody as:content"><div about="#' + n.id + '" typeof="oa:TextualBody as:Note" property="oa:text" datatype="rdf:HTML">' + n.body + '</div></div>';

                    hasTarget = '<a rel="oa:hasTarget" href="#' + n.refId + '">' + n.refLabel + '</a>';

                    target ='<dl class="target"><dt>' + targetLabel + '</dt><dd>' + hasTarget + '</dd></dl>';
                    break;

                default:
                    break;
            }

            if (n.license && 'iri' in n.license) {
                license = '<dl class="license"><dt>License</dt><dd>';
                if('name' in n.license) {
                    license += '<a rel="schema:license" href="' + n.license.iri + '">' + n.license.name + '</a>';
                }
                else {
                    var licenseName = (n.license.iri in DO.C.License) ? DO.C.License[n.license.iri] : n.license.iri;

                    license += '<a rel="schema:license" href="' + n.license.iri + '">' + licenseName + '</a>';
                }
                license += '</dd></dl>';
            }

            var note = '\n\
<article id="' + n.id + '" about="' + aAbout + '" typeof="oa:Annotation as:Activity"' + aPrefix + '>\n\
    ' + heading + '\n\
    ' + authors + '\n\
    ' + published + '\n\
    ' + license + '\n\
    ' + target + '\n\
    ' + body + '\n\
</article>\n\
';

            return note;
        },

        createRDFaHTML: function(r) {
            var s = '', property = '', resource = '', content = '', langDatatype = '', typeOf = '';

            if (!('about' in r)) {
                r.about = '#' + DO.U.generateAttributeId().slice(0, 6);
            }
            if (!('property' in r)) {
                //TODO: Figure out how to use user's prefered vocabulary down the line.
                r.property = 'rdfs:label';
            }
            if ('resource' in r) {
                resource = ' resource="' + r.resource + '"';
            }
            if ('content' in r) {
                content = ' content="' + r.content + '"';
            }
            if ('lang' in r) {
                langDatatype = ' xml:lang="' + r.lang + '" lang="' + r.lang + '"';
            }
            else {
                if ('datatype' in r) {
                    langDatatype = ' datatype="' + r.content + '"';
                }
            }
            if ('typeOf' in r) {
                typeOf = ' typeof="' + r.typeOf + '"';
            }

            if ('rel' in r) {
                s = '<a about="' + r.about + '"' + typeOf + ' rel="' + r.rel + '" href="' + r.href + '"' + resource + ' property="' + r.property +'"' + content + langDatatype + '>' + r.textContent + '</a>';
            }
            else {
                s = '<span about="' + r.about + '" property="' + r.property + '"' + content + langDatatype + '>' + r.textContent + '</span>';
            }

           return s;
        },

        Editor: {
            disableEditor: function() {
        //        _mediumEditors[1].destroy();
                DO.C.EditorEnabled = false;
                return DO.U.Editor.MediumEditor.destroy();
            },

            enableEditor: function() {
                //XXX: Consider this as the main wrapper for the editor tool.
                if (!document.getElementById('document-editor')) {
                    document.body.insertAdjacentHTML('beforeend', '<aside id="document-editor" class="do"></aside>');
                }

                var editableNodes = document.querySelectorAll('main > article');

                var pText = ["Make it so!", "This is not a Paper", "Cogito Ergo Sum", "Do One Thing and Do It Well", "Free Your Mind", "Do or Do Not"];
                pText = pText[Math.floor(Math.random() * pText.length)];

                if (typeof MediumEditor !== 'undefined') {
                    DO.U.Editor.MediumEditor = new MediumEditor(editableNodes, {
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
                                // {
                                //     name: 'quote',
                                //     contentFA: '<i class="fa fa-indent"></i>'
                                // },
                                /*object, script*/

                                //Semantic Marking
                                'rdfa',

                                //Annotation
                                'mark',
                                'note'

                                //Editorial
                                // 'del',
                                // 'ins'
                            ],
                            //This should use relative units because text zoom in/out
                            diffLeft: 0,
                            diffTop: -10,
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
                            // customClassOption: 'do ref',
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
                            'h2': new DO.U.Editor.Button({action:'h2', label:'h2'}),
                            'h3': new DO.U.Editor.Button({action:'h3', label:'h3'}),
                            'h4': new DO.U.Editor.Button({action:'h4', label:'h4'}),

                            'em': new DO.U.Editor.Button({action:'em', label:'em'}),
                            'strong': new DO.U.Editor.Button({action:'strong', label:'strong'}),
                            'code': new DO.U.Editor.Button({action:'code', label:'code'}),

                            'cite': new DO.U.Editor.Button({action:'cite', label:'cite'}),
                            'q': new DO.U.Editor.Button({action:'q', label:'q'}),

                            'rdfa': new DO.U.Editor.Note({action:'rdfa', label:'rdfa'}),

                            'mark': new DO.U.Editor.Note({action:'mark', label:'mark'}),
                            'note': new DO.U.Editor.Note({action:'article', label:'note'}),

                            //XXX: Interesting for editor
                            // 'del': new DO.U.Editor.Button({action:'del', label:'del'}),
                            // 'ins': new DO.U.Editor.Button({action:'ins', label:'ins'})

                            'table': new MediumEditorTable()
            //                'spreadsheet': new MediumEditorSpreadsheet()
                        }
                    });

                    DO.C.EditorEnabled = true;
                    return DO.U.Editor.MediumEditor;
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
                                case 'q': this.contentFA = '<i class="fa fa-quote-right"></i>'; break;
                                default: break;
                            }

                            this.button = this.createButton();
                            this.on(this.button, 'click', this.handleClick.bind(this));

                            //TODO: Listen to section hX changes and update section @id and span @class do.fragment
                        },

                        // getButton: function() {
                        //     console.log('DO.U.Editor.Button.Note.getButton()');
                        //     return this.button;
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
                                                        //TODO: There should be a simpler way to do wrap <p> (w/o jQuery)
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
                            switch(this.action) {
                                case 'mark': default:
                                    this.contentFA = '<i class="fa fa-paint-brush"></i>';
                                    break;
                                case 'article':
                                    this.contentFA = '<i class="fa fa-sticky-note"></i>';
                                    break;
                                case 'rdfa':
                                    this.contentFA = '<i class="fa fa-rocket"></i>';
                                    break;
                            }
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
                            var template = [];
                            switch(this.action) {
                                case 'rdfa':
                                    template = [
                                    'about: <input id="rdfa-about" class="medium-editor-toolbar-input" placeholder="http://example.org/foo#bar" /><br/>',
                                    'rel: <input id="rdfa-rel" class="medium-editor-toolbar-input" placeholder="https://schema.org/name"><br/>',
                                    'href <input id="rdfa-href" class="medium-editor-toolbar-input" placeholder="http://example.net/baz" />'
                                    ];
                                    break;
                                case 'article':
                                    template = [
                                    '<textarea id="article-content" name="content" cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>',
                                    '<select id="article-license" name="license" class="medium-editor-toolbar-select">',
                                    '<option value="">No license</option>',
                                    '<option value="https://creativecommons.org/publicdomain/zero/1.0/" title="Creative Commons Zero">CC0</option>',
                                    '<option value="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution" selected="selected">CC BY</option>',
                                    '<option value="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons Attribution-ShareAlike">CC BY-SA</option>',
                                    '<option value="https://creativecommons.org/licenses/by-nc/4.0/" title="Creative Commons Attribution-NonCommercial">CC BY-NC</option>',
                                    '<option value="https://creativecommons.org/licenses/by-nd/4.0/" title="Creative Commons Attribution-NoDerivatives">CC BY-ND</option>',
                                    '<option value="https://creativecommons.org/licenses/by-nc-sa/4.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike">CC BY-NC-SA</option>',
                                    '<option value="https://creativecommons.org/licenses/by-nc-nd/4.0/" title="Creative Commons Attribution-NonCommercial-NoDerivates">CC BY-NC-ND</option>',
                                    '</select>'
                                    ];
                                    break;
                                default:
                                    template = [
                                    '<textarea cols="20" rows="1" class="medium-editor-toolbar-textarea" placeholder="', this.placeholderText, '"></textarea>'
                                    ];
                                    break;
                            }

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

                            switch(this.action) {
                                case 'rdfa':
                                    input.about.focus();
                                    break;
                                case 'article':
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
                                    break;
                                case 'article':
                                    opts.content = this.getInput().content.value;
                                    opts.license = this.getInput().license.value;
                                    break;
                                default:
                                    opts.url = this.getInput().value;
                                    break;
                            }

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
                            var id = DO.U.generateAttributeId().slice(0, 6);
                            var refId = 'r-' + id;
                            // var noteId = 'i-' + id;

                            var resourceIRI = DO.U.stripFragmentFromString(document.location.href);
                            //XXX: Temporarily setting this.
                            var containerIRI = window.location.href;
                            containerIRI = containerIRI.substr(0, containerIRI.lastIndexOf('/') + 1);

                            //XXX: Preferring masterWorkspace over the others. Good/bad idea?
                            //Need more granular workspace selection, e.g., PublicAnnotations. Defaulting to PublicWorkspace if no masterWorkspace
                            if (typeof DO.C.User.masterWorkspace != 'undefined' && DO.C.User.masterWorkspace.length > 0) {
                                containerIRI = DO.C.User.masterWorkspace + DO.C.InteractionPath;
                            }
                            else {
                                if (typeof DO.C.User.Workspace != 'undefined') {
                                    if (typeof DO.C.User.Workspace.Master != 'undefined' && DO.C.User.Workspace.Master.length > 0) {
                                        containerIRI = DO.C.User.Workspace.Master + DO.C.InteractionPath;
                                    }
                                    else {
                                        if (typeof DO.C.User.Workspace.Public != 'undefined' && DO.C.User.Workspace.Public.length > 0) {
                                            containerIRI = DO.C.User.Workspace.Public + DO.C.InteractionPath;
                                        }
                                    }
                                }
                            }

                            var noteIRI = containerIRI + id;
                            //TODO: However this label is created
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

                            var noteType = '';
                            var noteData = {};
                            var note = '';
                            var licenseIRI = '';

                            switch(this.action) {
                                //External Note
                                case 'article': //'note'
                                    //XXX: Experimental: We don't change the source, only refer to it because that's cool.

                                    noteType = 'position-quote-selector';
                                    ref = this.base.selection;
                                    refLabel = id;
                                    licenseIRI = opts.license;

                                    noteData = {
                                        "type": noteType, //e.g., 'article'
                                        "purpose": "write",
                                        "motivatedByIRI": "oa:replying",
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
                                    }
                                    if (DO.C.User.IRI) {
                                        noteData.creator["iri"] = DO.C.User.IRI;
                                    }
                                    if (DO.C.User.Name) {
                                        noteData.creator["name"] = DO.C.User.Name;
                                    }
                                    if (DO.C.User.Image) {
                                        noteData.creator["image"] = DO.C.User.Image;
                                    }
                                    if (opts.license.length > 0) {
                                        noteData.license["iri"] = opts.license;
                                        noteData.license["name"] = DO.C.License[opts.license];
                                    }

                                    note = DO.U.createNoteHTML(noteData);
                                    break;

                                //Internal Note
                                case 'mark': //'footnote':
                                    noteType = 'footnote';

                                    ref = '<span class="ref" about="#' + refId + '" typeof="http://purl.org/dc/dcmitype/Text"><mark id="'+ refId +'" property="schema:description">' + exact + '</mark><sup class="ref-footnote"><a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a></sup></span>';

                                    noteData = {
                                        "type": noteType, //e.g., 'article'
                                        "purpose": "write",
                                        "motivatedByIRI": "oa:describing",
                                        "id": id,
                                        "refId": refId,
                                        "refLabel": refLabel,
                                        "iri": noteIRI, //e.g., https://example.org/path/to/article
                                        "datetime": datetime,
                                        "body": opts.url //FIXME: This object name is not fun
                                    }

                                    note = DO.U.createNoteHTML(noteData);
                                    break;
                                // case 'reference':
                                //     ref = '<span class="ref" about="[this:#' + refId + ']" typeof="http://purl.org/dc/dcmitype/Text"><span id="'+ refId +'" property="schema:description">' + this.base.selection + '</span> <span class="ref-reference">' + DO.C.RefType[DO.C.DocRefType].InlineOpen + '<a rel="cito:isCitedBy" href="#' + id + '">' + refLabel + '</a>' + DO.C.RefType[DO.C.DocRefType].InlineClose + '</span></span>';
//                                    break;

                                case 'rdfa':
                                    //TODO: inlist, prefix, monkeys..
                                    //TODO: lang, datatype, content
                                    noteData = {
                                        about: opts.about,
                                        //typeOf: opts.typeOf,
                                        rel: opts.rel,
                                        // property: opts.property
                                        href: opts.href,
                                        // resource:
                                        // content:
                                        textContent: this.base.selection
                                        // lang: ''
                                        // datatype: ''
                                    };
                                    ref = DO.U.createRDFaHTML(noteData);

                                    break;
                            }
// console.log(note);

// console.log(noteData);


                            var selectionUpdated = ref;
                            MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                            switch(this.action) {
                                case 'article':
                                    var data = '<!DOCTYPE html>\n\
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\
    <head>\n\
        <meta charset="utf-8" />\n\
        <title>' + noteIRI + '</title>\n\
    </head>\n\
    <body>\n\
        <main>' + note + '\n\
        </main>\n\
    </body>\n\
</html>\n\
';

                                    DO.U.putResource(noteIRI, data).then(
                                        function(i) {
// console.log(i);
                                            DO.U.positionQuoteSelector(noteIRI, document.body).then(
                                                function(i) {
// console.log(i);
                                                },
                                                function(reason) {
                                                    console.log(reason);
                                                }
                                            );
                                        },
                                        function(reason) {
                                            console.log('PUT failed');
                                            console.log(reason);
                                        }
                                    );

// console.log('resourceIRI: ' + resourceIRI);

                                    //TODO: resourceIRI should be the closest IRI (not necessarily the document). Test resolve/reject better.
                                    DO.U.getInbox(resourceIRI).then(
                                        function(inbox) {
                                            if (inbox && inbox.length > 0) {
// console.log('inbox: ' + inbox);
                                                DO.U.notifyInbox(inbox, id, noteIRI, 'http://www.w3.org/ns/oa#hasTarget', targetIRI, opts.license).then(
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
                                break;

                                case 'mark': //footnote
                                    //TODO: Refactor this what's in positionQuoteSelector

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
                            }

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

                            if (this.action == 'rdfa') {
                                var input = form.querySelector('.medium-editor-toolbar-input');
                            }
                            else {
                                var input = form.querySelector('.medium-editor-toolbar-textarea');
                            }

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
                                    break;
                                case 'article':
                                    r.content = this.getForm().querySelector('#article-content.medium-editor-toolbar-textarea');
                                    r.license = this.getForm().querySelector('#article-license.medium-editor-toolbar-select');
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

        } //DO.U.Editor
    } //DO.U
}; //DO

document.addEventListener('DOMContentLoaded', function(){
//    DO.U.initStorage('html');
//    DO.U.setDocRefType();
    DO.U.showRefs();
    DO.U.setLocalDocument();
    DO.U.buttonClose();
    DO.U.highlightItems();
    DO.U.showDocumentInfo();
//    DO.U.buildReferences();
//    DO.U.getLinkedResearch();
    DO.U.showFragment();
    DO.U.setDocumentMode();
    DO.U.showInboxNotifications();
});
