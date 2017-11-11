/** dokieli
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://dokie.li/
 * https://github.com/linkeddata/dokieli
 */

const fetcher = require('./fetcher')
const doc = require('./doc')
const uri = require('./uri')
const graph = require('./graph')
const inbox = require('./inbox')
const util = require('./util')
const auth = require('./auth')

if(typeof DO === 'undefined'){
global.SimpleRDF = (typeof ld !== 'undefined') ? ld.SimpleRDF : undefined;
var DO = {
  fetcher,

  C: require('./config'),

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
                DO.U.authenticateUserFallback(url, reasons).then(
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
              DO.U.authenticateUserFallback(url, reasons).then(
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

    authenticateUserFallback: function(url, reasons) {
// console.log("Try to authenticating through WebID's storage, if not found, try through a known authentication endpoint");
      url = url || window.location.origin + window.location.pathname;
      var pIRI = uri.getProxyableIRI(url);

      return graph.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
// console.log(s.pimstorage);
            if (s.pimstorage && s.pimstorage._array.length > 0) {
// console.log("Try through WebID's storage: " + s.pimstorage.at(0));
              return DO.U.getResourceHeadUser(s.pimstorage.at(0));
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
      return s.dctermstitle || s['http://purl.org/dc/elements/1.1/title'] || auth.getAgentName(s) || undefined;
    },

    setUserWorkspaces: function(userPreferenceFile){
      //XXX: Probably https so don't bother with proxy?
      graph.getGraph(userPreferenceFile).then(
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

    getNotifications: function(url) {
      url = url || window.location.origin + window.location.pathname;
      var notifications = [];
      var pIRI = uri.getProxyableIRI(url);

      return graph.getGraph(pIRI)
        .then(
          function(i) {
            var s = i.child(url);
            s.ldpcontains.forEach(function(resource) {
// console.log(resource);
              var types = s.child(resource).rdftype;
// console.log(types);
              if(types.indexOf(DO.C.Vocab['ldpContainer']["@id"]) < 0) {
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
        inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id']).then(
          function(i) {
            i.forEach(function(inboxURL) {
              DO.U.showNotificationSources(inboxURL);
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
            var pIRI = uri.getProxyableIRI(notification);
            graph.getGraph(pIRI).then(
              function(g) {
// console.log(g);
                var subjects = [];
                g.graph().toArray().forEach(function(t){
                  subjects.push(t.subject.nominalValue);
                });
                subjects = util.uniqueArray(subjects);
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
                        if(s.ascontext && s.ascontext.at(0)){
                          if(DO.U.getPathURL(s.asobject.at(0)) == currentPathURL) {
                            var context = s.ascontext.at(0);
                            return DO.U.positionInteraction(context).then(
                              function(notificationIRI){
                                return notificationIRI;
                              },
                              function(reason){
                                console.log('Notification source is unreachable');
                              });
                          }
                        }
                        else {
                          var iri = s.iri().toString();
                          var targetIRI = s.asobject.at(0);
                          var motivatedBy = 'oa:assessing';
                          var id = String(Math.abs(DO.U.hashCode(iri)));
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
                            "iri": iri,
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
                            var actorName = auth.getAgentName(a);
                            var actorImage = auth.getAgentImage(a);

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
                      // console.log(i + ' has unrecognised types: ' + resourceTypes);
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

    //Borrowed the d3 parts from https://bl.ocks.org/mbostock/4600693
    showVisualisationGraph: function(url, data, selector, options) {
      url = url || window.location.origin + window.location.pathname;
      data = data || doc.getDocument();
      selector = selector || 'body';
      options = options || {};
      options['contentType'] = options.contentType || 'text/html';
      options['subjectURI'] = options.subjectURI || url;
      options['license'] = options.license || 'https://creativecommons.org/licenses/by/4.0/';
      var width = options.width || '100%';
      var height = options.height || '100%';

      var id = DO.U.generateAttributeId();


      function positionLink(d) {
        return "M" + d[0].x + "," + d[0].y
             + "S" + d[1].x + "," + d[1].y
             + " " + d[2].x + "," + d[2].y;
      }

      function positionNode(d) {
        return "translate(" + d.x + "," + d.y + ")";
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x, d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x, d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null, d.fy = null;
      }

      var svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', id)
        .attr('class', 'graph')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('version', '1.1')
        .attr('xml:lang', 'en')
        .attr('prefix', 'rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# rdfs: http://www.w3.org/2000/01/rdf-schema# xsd: http://www.w3.org/2001/XMLSchema# schema: http://schema.org/');

      var s = document.getElementById(id);
      width = options.width || parseInt(s.ownerDocument.defaultView.getComputedStyle(s, null)["width"]);
      height = options.height || parseInt(s.ownerDocument.defaultView.getComputedStyle(s, null)["height"]);

      svg.append('metadata')
        .append('tspan')
          .attr('rel', 'schema:creator')
          .attr('resource', 'https://dokie.li/');

      if('license' in options) {
        svg.select('metadata')
          .append('tspan')
            .attr('rel', 'schema:license')
            .attr('resource', options.license);
      }

      if('title' in options) {
        svg.append('title')
          .attr('property', 'schema:name')
          .text(options.title);
      }

      svg.append('style').text('.node { stroke: #fff; stroke-width: 1px; } .link { fill: none; stroke: #bbb; }');

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().distance(10).strength(0.5))
          .force("charge", d3.forceManyBody())
          // .force("center", d3.forceCenter());
          .force("center", d3.forceCenter(width / 2, height / 2));

      DO.U.getVisualisationGraphData(url, data, options).then(
        function(graph){
// console.log(graph);
          var nodes = graph.nodes,
              nodeById = d3.map(nodes, function(d) { return d.id; }),
              links = graph.links,
              bilinks = [];

          links.forEach(function(link) {
            var s = link.source = nodeById.get(link.source),
                t = link.target = nodeById.get(link.target),
                i = {}; // intermediate node
            nodes.push(i);
            links.push({source: s, target: i}, {source: i, target: t});
            bilinks.push([s, i, t]);
          });

          var link = svg.selectAll(".link")
            .data(bilinks)
            .enter().append("path")
              .attr("class", "link");

          var node = svg.selectAll(".node")
            .data(nodes.filter(function(d) { return d.id; }))
            .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .attr("fill", function(d) { return color(d.group); })
              .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));

          node.append("title")
              .text(function(d) { return d.id; });

          simulation
              .nodes(nodes)
              .on("tick", ticked);

          simulation.force("link")
              .links(links);

          function ticked() {
            link.attr("d", positionLink);
            node.attr("transform", positionNode);
          }
        });
    },

    getVisualisationGraphData: function(url, data, options) {
      return new Promise(function(resolve, reject) {
        graph.getGraphFromData(data, options).then(
          function(g){
// console.log(g);
            var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], g, ld.store).child(url);
            var graph = {"nodes":[], "links": []};
            var graphNodes = [];

            g.graph().toArray().forEach(function(t){
              var group = 1;
              switch(t.predicate.nominalValue){
                default:
                  group = 1;
                  break;
                // case DO.C.Vocab['rdftype']['@id']:
                //   group = 2;
                //   break;
              }

              if(graphNodes.indexOf(t.subject.nominalValue + ' ' + group) == -1) {
                graphNodes.push(t.subject.nominalValue + ' ' + group);
                graph.nodes.push({"id": t.subject.nominalValue, "group": group});
              }
              if(graphNodes.indexOf(t.object.nominalValue + ' ' + group) == -1) {
                graphNodes.push(t.object.nominalValue + ' ' + group);
                graph.nodes.push({"id": t.object.nominalValue, "group": group});
              }

              graph.links.push({"source": t.subject.nominalValue, "target": t.object.nominalValue, "value": t.predicate.nominalValue});
            });

            delete graphNodes;
            return resolve(graph);
          }
        );
      });
    },

    showInboxGraph: function(url, selector, options){
      var iri = url || location.href.split(location.search||location.hash||/[?#]/)[0];
      options = options || {};
      options['contentType'] = options.contentType || 'text/html';
      options['subjectURI'] = options.subjectURI || iri;

      inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id'], iri).then(
        function(i) {
          i.forEach(function(inboxURL) {
            DO.U.getNotifications(inboxURL).then(
              function(i) {
                var promises = [];

                i.forEach(function(notification) {
                  var pIRI = uri.getProxyableIRI(notification);
                  promises.push(graph.getGraph(pIRI));
                });

                var dataGraph = SimpleRDF();

                Promise.all(promises)
                  .then(function(graphs) {
                    graphs.forEach(function(g){
                      dataGraph.graph().addAll(g.graph());
                    });

                    graph.serializeGraph(dataGraph, { 'contentType': 'text/turtle' })
                      .then(function(data){
                        //FIXME: FUGLY because parser defaults to localhost. Using UUID to minimise conflict
                        data = data.replace(/http:\/\/localhost\/d79351f4-cdb8-4228-b24f-3e9ac74a840d/g, '');

                        //XXX: Workaround for rdf-parser-rdfa bug that gives '@langauge' instead of @type when encountering datatype in HTML+RDFa . TODO: Link to bug here
                        data = data.replace(/Z"@en;/, 'Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;');

                        return data;
                      })
                      .then(function(data){
                        options['contentType'] = 'text/turtle';
                        options['subjectURI'] = inboxURL;

                        DO.U.showVisualisationGraph(inboxURL, data, selector, options);
                      });
                  });
              });
          });
        },
        function(reason) {
          console.log(reason);
        }
      );
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

    initDocumentActions: function() {
      document.addEventListener('click', function(e) {
        if (e.target.closest('[about="#document-menu"][typeof="schema:ActivateAction"], [href="#document-menu"][typeof="schema:ActivateAction"], [resource="#document-menu"][typeof="schema:ActivateAction"]')) {
          e.preventDefault();
          e.stopPropagation();

          if (document.body.classList.contains('on-document-menu')) {
            DO.U.hideDocumentMenu(e);
          }
          else {
            DO.U.showDocumentMenu(e);
          }
        }
      });

      var annotationRights = document.querySelectorAll('[about="#annotation-rights"][typeof="schema:ChooseAction"], [href="#annotation-rights"][typeof="schema:ChooseAction"], [resource="#annotation-rights"][typeof="schema:ChooseAction"]');
      for (var i = 0; i < annotationRights.length; i++){
        annotationRights[i].parentNode.replaceChild(DO.U.fragmentFromString('<select>' + DO.U.getLicenseOptionsHTML() + '</select>'), annotationRights[i]);
      }
    },

    showDocumentInfo: function() {
      document.body.insertAdjacentHTML('beforeend', '<menu id="document-menu" class="do"><button class="show" title="Open Menu"><i class="fa fa-bars"></i></button><header></header><div></div><footer><dl><dt>About</dt><dd id="about-dokieli"><img alt="" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAn1BMVEUAAAAAjwAAkAAAjwAAjwAAjwAAjwAAjwAAkAAAdwAAjwAAjQAAcAAAjwAAjwAAiQAAjwAAjAAAjwAAjwAAjwAAjwAAkAAAjwAAjwAAjwAAjQAAjQAAhQAAhQAAkAAAkAAAkAAAjgAAjwAAiQAAhAAAkAAAjwAAjwAAkAAAjwAAjgAAjgAAjQAAjwAAjQAAjwAAkAAAjwAAjQAAiwAAkABp3EJyAAAANHRSTlMA+fH89enaabMF4iADxJ4SiSa+uXztyoNvQDcsDgvl3pRiXBcH1M+ppJlWUUpFMq6OdjwbMc1+ZgAABAhJREFUeNrt29nSmkAQBeAGZBMUxH3f993/vP+zJZVKVZKCRhibyc3/XVt6SimYPjPSt28Vmt5W/fu2T/9B9HIf7Tp+0RsgDC6DY6OLvzxJj8341DnsakgZUNUmo2XsORYYS6rOeugukhnyragiq56JIs5UEQ/FXKgidRTzompEKOhG1biioDFV44mCAqrGAQWtqRptA8VMqCpR6zpo9iy84VO1opWHPBZVb9QAzyQN/D1YNungJ+DMSYsbOFvSIwGjR3p0wGiQHkMw2qRHC4w76RGBcSA9NmAcSY8QjAdpYiFbTJoYyNYnTWrI1iFNusj2JE1sZBuQJtyE5pImc3Y21cRhZ1NNtsh2Ik127HCsSY8djjVpINuVhPnjVefobee2adXqu2S/6FyivABDEjQ9Lxo1pDlNd5wg24ikRK5ngKGhHhg1DSgZk4RrD6pa9LlRAnUBfWp6xCe+6EOvOT6yrmrigZaCZHPAp6b0gaiBFKvRd0/D1rr1OrvxDqiyoZmmPt9onib0t/VybyEXqdu0Cw16rUNVAfZFlzdjr5KOaoAUK6JsrgWGQapuBlIS4gy70gEmTrk1fuAgU40UxWXv6wvZAC2Dqfx0BfBK1z1H0aJ0WH7Ub4oG8JDlpBCgK1l5tSjHQSoAf0HVfMqxF+yqpzVk2ZGuAGdk8ijPHZlmpOCg0vh5cgE2JtN3qQSoU3lXpbKlLRegrzTpt+U2TNpKY2YiFiA0kS1Q6QccweZ/oinASm2B3RML0AGDNAU4qq3udmIXYVttD3YrFsBR24N1xG5EJpTeaiYWwILS5WRKBfChFsCSehpOwKi/yS0V4AsMWym3TWUFgMqIsRYL8AVOSDlaYgEitbZnDKll+UatchyJBSC1c3lDuQA2VHYAL3KneHpgLCjHSS7AHYyEciwh1g88wDB94rlyAVxwhsR7ygW4gRMTry8XwDdUDkXFgjVdD5wRsRaCAWJwPGI1Baval8Ie3Hqn8AjjhHbZr2DzrInumDTBGlCG8xy8QPY3MNLX4TiRP1q+BWs2pn9ECwu5+qTABc+80h++28UbTkjlTW3wrM6Ufrtu8d5J9Svg1Vch/RTcUYQdUHm+g1z1x2gSGyjGGVN5F7xjoTCjE0ndC3jJMzfCftmiciZ1lNGe3vCGufOWVMLIQHHehi3X1O8JJxR236SalUzninbu937BlwfV/I3k4KdGk2xm+MHuLa8Z0i9TC280qLRrF+8cw9RSjrOg8oIG8j2YgULsbGPomsgR0x9nsOzkOLh+kZr1owZGbfC2JJl78fIV0Wei/gxZDl85XWVtt++cxhuSEQ6bdfzLjlvM86PbaD4vQUjSglV8385My7CdXtO9+ZSyrLcf7nBN376V8gMpRztyq6RXYQAAAABJRU5ErkJggg==" width="16" /><a href="https://dokie.li/" target="_blank">dokieli</a> is an <i class="fa fa-github"></i> <a href="https://github.com/linkeddata/dokieli" target="_blank">open source</a> project. There is <i class="fa fa-flask"></i> <a href="https://dokie.li/docs" target="_blank">documentation</a> and public <i class="fa fa-comments-o"></i> <a href="https://gitter.im/linkeddata/dokieli" target="_blank">chat</a> available. Made with fun.</dd></dl></footer></menu>');
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

    showDocumentMenu: function showDocumentMenu (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      DO.U.getResourceInfo().then(function(resourceInfo){
        var body = document.body;
        var dMenu = document.querySelector('#document-menu.do');

        if(dMenu) {
          var dMenuButton = dMenu.querySelector('button');
          var dHead = dMenu.querySelector('header');
          var dInfo = dMenu.querySelector('div');

          dMenuButton.classList.remove('show');
          dMenuButton.classList.add('hide');
          dMenuButton.setAttribute('title', 'Hide Menu');
          dMenuButton.innerHTML = '<i class="fa fa-minus"></i>';
          dMenu.classList.add('on');
          body.classList.add('on-document-menu');

          auth.showUserSigninSignup(dHead);
          DO.U.showDocumentDo(dInfo);
          DO.U.showEmbedData(dInfo);
          DO.U.showStorage(dInfo);
          DO.U.showViews(dInfo);
          DO.U.showDocumentMetadata(dInfo);
          if(!body.classList.contains('on-slideshow')) {
            DO.U.showDocumentItems();
          }

          document.addEventListener('click', DO.U.eventLeaveDocumentMenu);
        }
        else {
          DO.U.showDocumentInfo();
          DO.U.showDocumentMenu();
        }
      });
    },

    hideDocumentMenu: function(e) {
      document.removeEventListener('click', DO.U.eventLeaveDocumentMenu);

      var body = document.body;
      var dMenu = document.querySelector('#document-menu.do');
      var dMenuButton = dMenu.querySelector('button');

      dMenu.classList.remove('on');
      var sections = dMenu.querySelectorAll('section');
      for (var i = 0; i < sections.length; i++) {
        if(sections[i].id != 'user-info' && !sections[i].querySelector('button.signin-user')) {
          sections[i].parentNode.removeChild(sections[i]);
        }
      };
      var buttonSigninUser = dMenu.querySelector('button.signin-user');
      if(buttonSigninUser) {
        dMenu.querySelector('button.signin-user').disabled = false;
      }
      body.classList.remove('on-document-menu');
      dMenuButton.classList.remove('hide');
      dMenuButton.classList.add('show');
      dMenuButton.setAttribute('title', 'Open Menu');
      dMenuButton.innerHTML = '<i class="fa fa-bars"></i>';

      var removeElementsList = ['document-items', 'embed-data-entry', 'create-new-document', 'open-document', 'source-view', 'save-as-document', 'user-identity-input', 'resource-browser', 'share-resource', 'reply-to-resource', 'memento-document', 'graph-view'];
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

    showXHRProgressHTML: function(http, options) {
      if ('progress' in options) {
        http.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            options.progress.value = (e.loaded / e.total) * 100;
            options.progress.textContent = options.progress.value; // Fallback for unsupported browsers.
          }
        };
      }
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
      return document.querySelector('head link[rel="stylesheet"][title]:not([href$="do.css"]):not([disabled])');
    },

    showViews: function(node) {
      if(document.querySelector('#document-views')) { return; }

      var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

      var s = '<section id="document-views" class="do"><h2>Views</h2><i class="fa fa-magic"></i><ul>';
      if (DO.C.GraphViewerAvailable) {
        s += '<li><button class="resource-visualise" title="Change to graph view">Graph</button></li>';
      }
      s += '<li><button title="Change to native device/browser view">Native</button></li>';

      if (stylesheets.length > 0) {
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
      }

      s += '</ul></section>';
      node.insertAdjacentHTML('beforeend', s);

      var viewButtons = document.querySelectorAll('#document-views.do button:not([class~="resource-visualise"])');
      for (var i = 0; i < viewButtons.length; i++) {
        viewButtons[i].removeEventListener('click', DO.U.initCurrentStylesheet);
        viewButtons[i].addEventListener('click', DO.U.initCurrentStylesheet);
      }

      if(DO.C.GraphViewerAvailable) {
        document.querySelector('#document-views.do').addEventListener('click', function(e){
          if (e.target.closest('.resource-visualise')) {
            if(document.querySelector('#graph-view')) { return; }

            if (e) {
              e.target.disabled = true;
            }

            document.body.insertAdjacentHTML('beforeend', '<aside id="graph-view" class="do on"><button class="close" title="Close">❌</button><h2>Graph view</h2></aside>');

            var graphView = document.getElementById('graph-view');
            graphView.addEventListener('click', function(e) {
              if (e.target.matches('button.close')) {
                var rv = document.querySelector('#document-views .resource-visualise');
                if (rv) {
                  rv.disabled = false;
                }
              }
            });

            var optionsNormalisation = DO.C.DOMNormalisation;
            delete optionsNormalisation['skipNodeWithClass'];

            DO.U.showVisualisationGraph(document.location.href, doc.getDocument(null, optionsNormalisation), '#graph-view');
          }
        });
      }
    },

    initCurrentStylesheet: function(e) {
      var currentStylesheet = DO.U.getCurrentLinkStylesheet();
      currentStylesheet = (currentStylesheet) ? currentStylesheet.getAttribute('title') : '';
      var selected = (e && e.target) ? e.target.textContent.toLowerCase() : currentStylesheet.toLowerCase();
      var stylesheets = document.querySelectorAll('head link[rel~="stylesheet"][title]:not([href$="do.css"])');

      for (var j = 0; j < stylesheets.length; j++) {
        (function(stylesheet) {
          if (stylesheet.getAttribute('title').toLowerCase() != selected) {
              stylesheet.disabled = true;
              stylesheet.setAttribute('rel', 'stylesheet alternate');
          }
        })(stylesheets[j]);
      };
      for (var j = 0; j < stylesheets.length; j++) {
        (function(stylesheet) {
          if (stylesheet.getAttribute('title').toLowerCase() == selected) {
              stylesheet.setAttribute('rel', 'stylesheet');
              stylesheet.disabled = false;
          }
        })(stylesheets[j]);
      }

      var bd = document.querySelectorAll('#document-views.do button');
      for(var j = 0; j < bd.length; j++) {
        bd[j].disabled = (e && e.target && (e.target.textContent == bd[j].textContent)) ? true : false;
      }

      DO.U.showRefs();

      if (selected == 'shower') {
        var slides = document.querySelectorAll('.slide');
        for(var j = 0; j < slides.length; j++) {
          slides[j].classList.add('do');
        }
        document.body.classList.add('on-slideshow', 'list');
        document.querySelector('head').insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=792, user-scalable=no" />');


        var body = document.body;
        var dMenu = document.querySelector('#document-menu.do');

        if(dMenu) {
          var dMenuButton = dMenu.querySelector('button');
          var dHead = dMenu.querySelector('header');
          var dInfo = dMenu.querySelector('div');

          dMenuButton.classList.remove('show');
          dMenuButton.classList.add('hide');
          dMenuButton.setAttribute('title', 'Open Menu');
          dMenuButton.innerHTML = '<i class="fa fa-minus"></i>';
          dMenu.classList.remove('on');
          body.classList.remove('on-document-menu');

          var dMenuSections = dMenu.querySelectorAll('section');
          for (var j = 0; j < dMenuSections.length; j++) {
            dMenuSections[j].parentNode.removeChild(dMSections[j]);
          }
        }

        var toc = document.getElementById('table-of-contents');
        toc = (toc) ? toc.parentNode.removeChild(toc) : false;

        DO.U.hideStorage();

        shower.initRun();
      }
      if (currentStylesheet.toLowerCase() == 'shower') {
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
    },

    showEmbedData: function(node) {
      if(document.querySelector('#embed-data-in-html')) { return; }

      node.insertAdjacentHTML('beforeend', '<section id="embed-data-in-html" class="do"><h2>Data</h2><ul><li><button class="embed-data-meta" title="Embed structured data (Turtle, JSON-LD, TriG)"><i class="fa fa-table fa-2x"></i>Embed Data</button></li></ul></section>');

      var eventEmbedData = function(e) {
        e.target.setAttribute('disabled', 'disabled');
        var scriptCurrent = document.querySelectorAll('head script[id^="meta-"]');

        var scriptType = {
          'meta-turtle': {
            scriptStart: '<script id="meta-turtle" title="Turtle" type="text/turtle">',
            cdataStart: '# ' + DO.C.CDATAStart + '\n',
            cdataEnd: '\n# ' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-json-ld': {
            scriptStart: '<script id="meta-json-ld" title="JSON-LD" type="application/ld+json">',
            cdataStart: DO.C.CDATAStart + '\n',
            cdataEnd: '\n' + DO.C.CDATAEnd,
            scriptEnd: '</script>'
          },
          'meta-trig': {
            scriptStart: '<script id="meta-trig" title="TriG" type="application/trig">',
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
        <nav><ul><li class="selected"><a href="#embed-data-turtle">Turtle</a></li><li><a href="#embed-data-json-ld">JSON-LD</a></li><li><a href="#embed-data-trig">TriG</a></li></ul></nav>\n\
        <div id="embed-data-turtle" class="selected"><textarea placeholder="Enter data in Turtle" name="meta-turtle" cols="80" rows="24">' + ((scriptCurrentData['meta-turtle']) ? scriptCurrentData['meta-turtle'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-json-ld"><textarea placeholder="Enter data in JSON-LD" name="meta-json-ld" cols="80" rows="24">' + ((scriptCurrentData['meta-json-ld']) ? scriptCurrentData['meta-json-ld'].content : '') + '</textarea><button class="save">Save</button></div>\n\
        <div id="embed-data-trig"><textarea placeholder="Enter data in TriG" name="meta-trig" cols="80" rows="24">' + ((scriptCurrentData['meta-trig']) ? scriptCurrentData['meta-trig'].content : '') + '</textarea><button class="save">Save</button></div>\n\
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
              //If there was a script already
              if (script) {
                var scriptContent = scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd;
                script.innerHTML = scriptContent;
              }
              else {
                var scriptContent = '  ' + scriptType[name].scriptStart + scriptType[name].cdataStart + scriptEntry + scriptType[name].cdataEnd + scriptType[name].scriptEnd;
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

    htmlEntities: function(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    showDocumentMetadata: function(node) {
      if(document.querySelector('#document-metadata')) { return; }

      var content = document.querySelector('main > article') || document.body;
      var count = DO.U.contentCount(content);
      var authors = [], contributors = [], editors = [];

      var data = doc.getDocument();
      var subjectURI = window.location.origin + window.location.pathname;
      var options = {'contentType': 'text/html', 'subjectURI': subjectURI };

      graph.getGraphFromData(data, options).then(
        function(i){
          var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], i, ld.store).child(options['subjectURI']);

          if(g.schemaeditor._array.length > 0) {
            g.schemaeditor.forEach(function(s){
              var label = DO.U.getResourceLabel(g.child(s));
              if(typeof label !== 'undefined'){
                editors.push('<li>' + label + '</li>');
              }
            });
            if(editors.length > 0){
              editors = '<tr class="people"><th>Editors</th><td><ul class="editors">' + editors.join('') + '</ul></td></tr>';
            }
          }

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

    contentCount: function contentCount (c) {
      var content = DO.U.fragmentFromString(doc.domToString(c)).textContent.trim();
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

    showDocumentItems: function() {
      var documentItems = document.querySelector('#document-items');

      if(documentItems) { return; }

      documentItems = '<aside id="document-items" class="do on"><button class="close" title="Close">❌</button></aside>';
      document.body.insertAdjacentHTML('beforeend', documentItems);
      documentItems = document.getElementById('document-items');

      var sections = document.querySelectorAll('h1 ~ div > section:not([class~="slide"]):not([id^=table-of])');
      if (sections.length > 0) {
        DO.U.showTableOfStuff(documentItems);

        var sortable = '';

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          sortable = ' sortable';
        }

        var toc = '<section id="table-of-contents-i" class="do"' + sortable + '><h2>Table of Contents</h2><ol class="toc' + sortable + '">';
        toc += DO.U.getListOfSections(sections, DO.C.SortableList);
        toc += '</ol></section>';

        document.getElementById('document-items').insertAdjacentHTML('beforeend', toc);

        if(DO.C.SortableList && DO.C.EditorEnabled) {
          DO.U.sortToC();
        }
      }
    },

    showTableOfStuff: function(node) {
      var disabledInput = '', s = '';
      if (!DO.C.EditorEnabled) {
        disabledInput = ' disabled="disabled"';
      }

      var tableList = [{'content': 'Contents'}, {'figure': 'Figures'}, {'table': 'Tables'}, {'abbr': 'Abbreviations'}];
      tableList.forEach(function(i) {
        var key = Object.keys(i)[0];
        var value = i[key];
        var checkedInput = '';
        if(document.getElementById('table-of-'+ key +'s')) {
          checkedInput = ' checked="checked"';
        }

        s += '<li><input id="t-o-' + key +'" type="checkbox"' + disabledInput + checkedInput + '/><label for="t-o-' + key + '">' + value + '</label></li>';
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

    sortToC: function() {
    },

    getListOfSections: function(sections, sortable) {
      var s = '', attributeClass = '';
      if (sortable == true) { attributeClass = ' class="sortable"'; }

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if(section.id) {
          var heading = section.querySelector('h1, h2, h3, h4, h5, h6, header h1, header h2, header h3, header h4, header h5, header h6') || { 'textContent': section.id };
          if (heading) {
            s += '<li data-id="' + section.id +'"><a href="#' + section.id + '">' + heading.textContent + '</a>';
            var subsections = section.parentNode.querySelectorAll('[id="' + section.id + '"] > div > section[rel*="hasPart"]:not([class~="slide"]), [id="' + section.id + '"] > section[rel*="hasPart"]:not([class~="slide"])');

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
        var e = document.querySelectorAll('section:not([class~="do"]) ' + element);
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

          elementId = 'table-of-' + element + 's';

          if (element == 'abbr') {
            s += '<section id="' + elementId + '">';
          }
          else {
            s += '<nav id="' + elementId + '">';
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
                  if(e[i].id){
                    s += '<li><a href="#' + e[i].id +'">' + title.textContent +'</a></li>';
                  }
                  else {
                    s += '<li>' + title.textContent +'</li>';
                  }
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

      DO.U.insertDocumentLevelHTML(s, { 'id': elementId });
    },

    setDocumentStatus: function(options) {
      options = options || {};

      var s = DO.U.getDocumentStatusHTML(options);

      DO.U.insertDocumentLevelHTML(s, options);
    },

    getDocumentStatusHTML: function(options) {
      options = options || {};
      options['mode'] = ('mode' in options) ? options.mode : '';
      options['id'] = ('id' in options) ? options.id : 'document-status';
      var subjectURI = ('subjectURI' in options) ? ' about="' + options.subjectURI + '"' : '';
      var typeLabel = '', typeOf = '';

      switch(options.type) {
        case 'ldp:ImmutableResource':
          typeLabel = 'Immutable';
          typeOf = ' typeof="' + options.type + '"';
          break;
      }

      var id = ' id="' + options.id + '"';
      var c = ('class' in options && options.class.length > 0) ? ' class="' + options.class + '"' : '';
      // var datetime = ('datetime' in options) ? options.datetime : DO.U.getDateTimeISO();

      var dd = '<dd><span' + subjectURI + typeOf + '>' + typeLabel + '</span></dd>';

      var s = '';
      var dl = document.getElementById(options.id);

      //FIXME: mode should be an array of operations.

      //TODO: s/update/append
      if (options.mode == 'update') {
        if(dl) {
          var clone = dl.cloneNode(true);
          dl.parentNode.removeChild(dl);
          clone.insertAdjacentHTML('beforeend', dd);
          s = clone.outerHTML;
        }
        else  {
          s = '<dl'+c+id+'><dt>Document Status</dt>' + dd + '</dl>';
        }
      }
      else if (options.mode == 'delete') {
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
      }
      else {
        s = '<dl'+c+id+'><dt>Document Status</dt>' + dd + '</dl>';
      }

// console.log(s);
      return s;
    },

    insertDocumentLevelHTML: function(h, options) {
      options = options || {};

      var documentItems = [
        'authors',
        'document-identifier',
        'document-created',
        'document-modified',
        'document-published',
        'document-latest-version',
        'document-predecessor-version',
        'document-timegate',
        'document-timemap',
        'document-license',
        'document-inbox',
        'document-annotation-service',
        'document-in-reply-to',
        'document-status',
        'table-of-contents',
        'table-of-figures',
        'table-of-tables',
        'table-of-abbreviations',
        'authors',
        'keywords',
        'categories-and-subject-descriptors',
        'abstract',
        'introduction',
        'prologue'
      ];

      options['id'] = ('id' in options) ? options.id : documentItems[documentItems.length-1];

      var item = documentItems.indexOf(options.id);

      if(item >= -1) {
        for(var i = item; i >= 0; i--) {
          var node = document.getElementById(documentItems[i]);

          if (node) {
            node.insertAdjacentHTML('afterend', h);
            break;
          }
          else if (i == 0) {
            document.querySelector('article').insertAdjacentHTML('afterbegin', h);
            break;
          }
        }
      }
      else {
        document.querySelector('article').insertAdjacentHTML('afterbegin', h);
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
        var h1 = document.querySelector('h1');
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

    getSelectorSign: function(node) {
      if(!node) {
        return DO.C.SelectorSign["*"];
      }

      if (typeof node === 'object') {
        var nodeName = node.nodeName.toLowerCase();
        var nodeId = '';

        if(node.id) {
          switch(nodeName) {
            default: break;
            case 'section': case 'dl':
              nodeId = '#' + node.id;
              break;
          }
        }

        return DO.C.SelectorSign[nodeName + nodeId] || DO.C.SelectorSign["*"];
      }

      return DO.C.SelectorSign["*"];
    },

    showFragment: function(selector) {
      var ids = (selector) ? document.querySelectorAll(selector) : document.querySelectorAll('main *[id]:not(input):not(textarea):not(select):not(#content)');

      for(var i = 0; i < ids.length; i++){
        ids[i].addEventListener('mouseenter', function(e){
          var fragment = document.querySelector('*[id="' + e.target.id + '"] > .do.fragment');
          if (!fragment && e.target.parentNode.nodeName.toLowerCase() != 'aside'){
            sign = DO.U.getSelectorSign(e.target);

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

    exportAsHTML: function() {
      var data = doc.getDocument();
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

    snapshotAtEndpoint: function snapshotAtEndpoint (e, iri, endpoint, noteData, options = {}) {
      iri = iri || window.location.origin + window.location.pathname;
      endpoint = endpoint || 'https://pragma.archivelab.org';

      if(!('contentType' in options)){
        options['contentType'] = 'application/json';
      }

      noteData = noteData || {
        "url": iri,
        "annotation": {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          "@type": "Annotation",
          "motivation": "linking",
          "target": iri,
          "rights": "https://creativecommons.org/publicdomain/zero/1.0/"
        }
      };

      if (DO.C.User.IRI) {
        noteData.annotation['creator'] = {};
        noteData.annotation.creator["@id"] = DO.C.User.IRI;
      }
      if (DO.C.User.Name) {
        noteData.annotation.creator["http://schema.org/name"] = DO.C.User.Name;
      }
      if (DO.C.User.Image) {
        noteData.annotation.creator["http://schema.org/image"] = DO.C.User.Image;
      }
      if (DO.C.User.URL) {
        noteData.annotation.creator["http://schema.org/url"] = DO.C.User.URL;
      }

      // if(note.length > 0) {
      //   noteData.annotation["message"] = note;
      // }

      if (typeof e !== 'undefined' && e.target.closest('button')) {
        var archiveNode = e.target.closest('button').parentNode;
        archiveNode.insertAdjacentHTML('beforeend', ' <span class="progress"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>');
      }

      options.noCredentials = true

      return fetcher.postResource(endpoint, '', JSON.stringify(noteData), options.contentType, null, options)

        .then(response => response.json())

        .then(response => {
          switch (endpoint) {
            case 'https://pragma.archivelab.org':
            default:
              if (response['wayback_id']) {
                let location = 'https://web.archive.org' + response.wayback_id

                archiveNode
                  .innerHTML = '<i class="fa fa-archive fa-fw"></i> Archived at <a target="_blank" href="' +
                  location + '">' + location + '</a>'
              } else {
                archiveNode
                  .querySelector('.progress')
                  .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to archive. Try later.'
              }

              break
          }
        })

        .catch(() => {
          archiveNode
            .querySelector('.progress')
            .innerHTML = '<i class="fa fa-times-circle fa-fw "></i> Unable to archive. Try later.'
        })
    },

    mementoDocument: function(e) {
      if(typeof e !== 'undefined') {
        e.target.disabled = true;
      }

      var iri = uri.stripFragmentFromString(document.location.href);

      document.body.insertAdjacentHTML('beforeend', '<aside id="memento-document" class="do on"><button class="close" title="Close">❌</button><h2>Memento</h2><ul><li><button class="create-version">Version</button> this article.</li><li>Make this article <button class="create-immutable">Immutable</button> and version it.</li><li><button class="export-as-html">Export</button> and save to file.</li><li><button class="snapshot-internet-archive">Capture</button> with <a href="http://web.archive.org/" target="_blank">Internet Archive</a>.</li></ul></aside>');

      var mementoDocument = document.getElementById('memento-document');
      mementoDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-memento').disabled = false;
        }

        if (e.target.matches('button.create-version') || e.target.matches('button.create-immutable')) {
          DO.U.resourceSave(e);
        }

        if (e.target.matches('button.export-as-html')) {
          DO.U.exportAsHTML(e);
        }

        if(e.target.matches('button.snapshot-internet-archive')){
          var options = {
            "contentType": 'application/json'
          };
          DO.U.snapshotAtEndpoint(e, iri, 'https://pragma.archivelab.org', '', options);
        }
      });
    },

    showDocumentDo: function showDocumentDo (node) {
      if (document.getElementById('document-do')) { return; }

      var buttonDisabled = '';
      if (document.location.protocol === 'file:') {
        buttonDisabled = ' disabled="disabled"';
      }

      var s = '<section id="document-do" class="do"><h2>Do</h2><ul>';
      s += '<li><button class="resource-share" title="Share resource"><i class="fa fa-bullhorn fa-2x"></i>Share</button></li>';
      s += '<li><button class="resource-reply" title="Reply"><i class="fa fa-reply fa-2x"></i>Reply</button></li>';

      if (DO.C.EditorAvailable) {
        var reviewArticle = (DO.C.EditorEnabled && DO.C.User.Role == 'review')
          ? DO.C.Editor.DisableReviewButton
          : DO.C.Editor.EnableReviewButton;
        s += '<li>' + reviewArticle + '</li>';
      }

      s += '<li><button class="resource-new" title="Create new article"><i class="fa fa-lightbulb-o fa-2x"></i></i>New</button></li>';
      s += '<li><button class="resource-open" title="Open article"><i class="fa fa-coffee fa-2x"></i></i>Open</button></li>';
      s += '<li><button class="resource-save"' + buttonDisabled +
        ' title="Save article"><i class="fa fa-life-ring fa-2x"></i>Save</button></li>';
      s += '<li><button class="resource-save-as" title="Save as article"><i class="fa fa-paper-plane-o fa-2x"></i>Save As</button></li>';
      s += '<li><button class="resource-memento" title="Memento article"><i class="fa fa-clock-o fa-2x"></i>Memento</button></li>';
      s += '<li><button class="resource-print" title="Print article"><i class="fa fa-print fa-2x"></i>Print</button></li>';

      if (DO.C.EditorAvailable) {
        var editFile = (DO.C.EditorEnabled && DO.C.User.Role === 'author')
          ? DO.C.Editor.DisableEditorButton
          : DO.C.Editor.EnableEditorButton;
        s += '<li>' + editFile + '</li>';
      }

      s += '<li><button class="resource-source"' + buttonDisabled +
        ' title="Edit article source code"><i class="fa fa-code fa-2x"></i>Source</button></li>';
      s += '</ul></section>';

      node.insertAdjacentHTML('beforeend', s);

      var dd = document.getElementById('document-do');

      dd.addEventListener('click', e => {
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
          DO.U.resourceSave(e);
        }

        if (e.target.closest('.resource-source')) {
          DO.U.viewSource(e);
        }

        if (e.target.closest('.resource-save-as')) {
          DO.U.saveAsDocument(e);
        }

        if (e.target.closest('.resource-memento')) {
          DO.U.mementoDocument(e);
        }

        if (e.target.closest('.resource-print')) {
          DO.U.hideDocumentMenu(e);
          window.print();
          return false;
        }
      });
    },

    resourceSave: function(e, options) {
      var url = window.location.origin + window.location.pathname;
      var data = doc.getDocument();
      options = options || {};

      DO.U.getResourceInfo(data, options).then(function(i) {
        if (e.target.matches('.create-version')) {
          DO.U.createMutableResource(url);
        }
        else if (e.target.matches('.create-immutable')) {
          DO.U.createImmutableResource(url);
        }
        else {
          DO.U.updateMutableResource(url);   
        }
      });
    },

    createImmutableResource: function(url, data, options) {
      if(!url) return;

      DO.U.setDate(null, { 'type': 'Created' });

      var documentStatus = document.getElementById('document-status');
      var dSO = {
        'id': 'document-status',
        'subjectURI': '',
        'type': 'ldp:ImmutableResource'
      }

      if(documentStatus) {
        dSO['mode'] = 'update';
      }
      else {
        dSO['mode'] = 'create';
      }

      DO.U.setDocumentStatus(dSO);

      var immutableURL = url.substr(0, url.lastIndexOf('/') + 1) + DO.U.generateAttributeId();

console.log('createImmutableResource ' + immutableURL);

      DO.U.setDocumentIdentifier(immutableURL);

//setDocumentIdentifier
//setDocumentOriginal
//setDocumentPredecessorVersion
//setDocumentLatestVersion
//setDocumenTimeMap
//setDocumenTimeGate

      // Create URI-M
      //TODO: Change to POST
      data = doc.getDocument();
      DO.U.processPut(immutableURL, data, options);

      //Update URI-R
//setDocumentIdentifier
//setDocumentPredecessorVersion
//setDocumentLatestVersion
//setDocumenTimeMap
//setDocumenTimeGate

      //PUT

      //TODO: PATCH URI-T
    },

    createMutableResource: function(url, data, options) {
      if(!url) return;

      DO.U.setDate(null, { 'type': 'Created' } );

      var mutableURL = url.substr(0, url.lastIndexOf('/') + 1) + DO.U.generateAttributeId();

console.log('createMutableResource ' + mutableURL);

      //TODO: Change to POST
      data = doc.getDocument();
      DO.U.processPut(url, data, options);
    },

    updateMutableResource: function(url, data, options) {
      if(!url) return;

      DO.U.setDate(null, { 'type': 'Modified' } );

console.log('updateMutableResource' + url);

      data = doc.getDocument();
      DO.U.processPut(url, data, options);
    },

    processPut: function(url, data, options) {
      fetcher.putResource(url, data)
        .then(() => {
          DO.U.showActionMessage(document.getElementById('document-menu'), 'Saved')
          DO.U.hideDocumentMenu(e)
        })
        .catch(error => {
          console.error(error)

          let message

          switch (error.status) {
            case 401:
              message = 'Need to authenticate before saving'
              break

            case 403:
              message = 'You are not authorized to save'
              break

            case 405:
            default:
              message = 'Server doesn\'t allow this resource to be rewritten'
              break
          }

          DO.U.showActionMessage(document.getElementById('document-menu'), message)
        })
    },

    replyToResource: function replyToResource (e, iri) {
      iri = iri || fetcher.currentLocation()
      e.target.disabled = true

      document.body.insertAdjacentHTML('beforeend', '<aside id="reply-to-resource" class="do on"><button class="close" title="Close">❌</button><h2>Reply to this</h2><div id="reply-to-resource-input"><p>Reply to <code>' +
        iri +'</code></p><ul><li><p><label for="reply-to-resource-note">Quick reply (plain text note)</label></p><p><textarea id="reply-to-resource-note" rows="10" cols="40" name="reply-to-resource-note" placeholder="Great article!"></textarea></p></li><li><label for="reply-to-resource-license">License</label> <select id="reply-to-resource-license" name="reply-to-resource-license">' +
        DO.U.getLicenseOptionsHTML() + '</select></li></ul></div>')

      // TODO: License
      // TODO: ACL - can choose whether to make this reply private (to self), visible only to article author(s), visible to own contacts, public
      // TODO: Show name and face of signed in user reply is from, or 'anon' if article can host replies

      var replyToResource = document.getElementById('reply-to-resource')

      var id = 'location-reply-to'
      var action = 'write'

      DO.U.setupResourceBrowser(replyToResource, id, action)
      document.getElementById(id).insertAdjacentHTML('afterbegin', '<p>Choose a location to save your reply.</p>')

      replyToResource.insertAdjacentHTML('beforeend', '<p>Your reply will be saved at <samp id="' + id +'-' + action +
        '">https://example.org/path/to/article</samp></p>')

      var bli = document.getElementById(id + '-input')
      bli.focus()
      bli.placeholder = 'https://example.org/path/to/article'
      replyToResource.insertAdjacentHTML('beforeend', '<button class="reply">Send now</button>')

      // TODO: New in editor make this button do something.
      //     Question: when should the notification be sent?
      //replyToResource.insertAdjacentHTML('beforeend', 'or <button class="reply-new"><i class="fa fa-paper-plane-o"></i> Write reply in new window</button>');
      replyToResource.insertAdjacentHTML('beforeend', '</aside>')

      replyToResource.addEventListener('click', e => {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-reply').disabled = false
        }

        if (e.target.matches('button.reply')) {
          var note = document
            .querySelector('#reply-to-resource #reply-to-resource-note')
            .value.trim()

          var rm = replyToResource.querySelector('.response-message')
          if (rm) {
            rm.parentNode.removeChild(rm)
          }
          replyToResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>')
        }

        if (!iri || !note) {
          replyToResource
            .querySelector('.response-message')
            .innerHTML = '<p class="error">Need a note and a location to save it.</p>'
          return
        }

        var datetime = DO.U.getDateTimeISO()
        var attributeId = DO.U.generateAttributeId()
        var noteIRI = document.querySelector('#reply-to-resource #' + id +
          '-' + action).innerText.trim()
        var motivatedBy = "oa:replying"
        var noteData = {
          "type": 'article',
          "mode": "write",
          "motivatedByIRI": motivatedBy,
          "id": attributeId,
          "iri": noteIRI, //e.g., https://example.org/path/to/article
          "creator": {},
          "datetime": datetime,
          "target": {
            "iri": iri
          },
          "body": note, // content
          "license": {}
        }
        if (DO.C.User.IRI) {
          noteData.creator["iri"] = DO.C.User.IRI
        }
        if (DO.C.User.Name) {
          noteData.creator["name"] = DO.C.User.Name
        }
        if (DO.C.User.Image) {
          noteData.creator["image"] = DO.C.User.Image
        }
        if (DO.C.User.URL) {
          noteData.creator["url"] = DO.C.User.URL
        }

        var license = document.querySelector('#reply-to-resource-license')
        if (license && license.length > 0) {
          noteData.license["iri"] = license.value.trim()
          noteData.license["name"] = DO.C.License[license.value.trim()].name
        }

        var note = DO.U.createNoteDataHTML(noteData)

        var data = DO.U.createHTML(noteIRI, note)

        fetcher.putResource(noteIRI, data)

          .catch(error => {
            console.error('Could not save reply:', error)

            let errorMessage

            switch (error.status) {
              case 0:
              case 405:
                errorMessage = 'this location is not writable'
                break
              case 401:
              case 403:
                errorMessage = 'you do not have permission to write here'
                break
              case 406:
                errorMessage = 'enter a name for your resource'
                break
              default:
                // some other reason
                errorMessage = error.message
                break
            }

            // re-throw, to break out of the promise chain
            throw new Error('Cannot save your reply:', errorMessage)
          })

          .then(response => {
            replyToResource
              .querySelector('.response-message')
              .innerHTML = '<p class="success"><a href="' + response.url + '">Reply saved!</a></p>'

            // Determine the inbox endpoint, to send the notification to
            return inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id'])
              .catch(error => {
                console.error('Could not fetch inbox endpoint:', error)

                // re-throw
                throw new Error('Could not determine the author inbox endpoint')
              })
          })

          .then(inboxes => {
            if (!inboxes) {
              throw new Error('Author inbox endpoint is empty or missing')
            }

            var inboxURL = inboxes[0]

            let notificationStatements = '    <dl about="' + noteIRI +
              '">\n<dt>Object type</dt><dd><a about="' +
              noteIRI + '" typeof="oa:Annotation" href="' +
              DO.C.Vocab['oaannotation']['@id'] +
              '">Annotation</a></dd>\n<dt>Motivation</dt><dd><a href="' +
              DO.C.Prefixes[motivatedBy.split(':')[0]] +
              motivatedBy.split(':')[1] + '" property="oa:motivation">' +
              motivatedBy.split(':')[1] + '</a></dd>\n</dl>\n'

            let notificationData = {
              "type": ['as:Announce'],
              "inbox": inboxURL,
              "object": noteIRI,
              "target": iri,
              "license": noteData.license["iri"],
              "statements": notificationStatements
            }

            inbox.notifyInbox(notificationData)
              .catch(error => {
                console.error('Failed sending notification to ' + inboxURL + ' :', error)

                throw new Error('Failed sending notification to author inbox')
              })
          })

          .then(() => {  // Success!
            replyToResource
              .querySelector('.response-message')
              .innerHTML += '<p class="success">Notification sent</p>';
          })

          .catch(error => {
            // Catch-all error, actually notify the user
            replyToResource
              .querySelector('.response-message')
              .innerHTML += '<p class="error">' +
                'We could not notify the author of your reply:' +
                error.message + '</p>'
          })
      })
    },

    showActionMessage: function(node, message) {
      var message = '<aside id="document-action-message" class="do on"><p>' + message + '</p></aside>';
      node.insertAdjacentHTML('afterend', message);
      window.setTimeout(function () {
        var dam = document.getElementById('document-action-message');
        dam.parentNode.removeChild(dam);
      }, 1500);
    },

    shareResource: function shareResource (e, iri) {
      iri = iri || fetcher.currentLocation();
      if (e) {
        e.target.disabled = true;
      }

      var addContactsButtonDisable = '', noContactsText = '';
      if(!(DO.C.User.Graph && ((DO.C.User.Knows && DO.C.User.Knows.length > 0) || (DO.C.User.Graph.owlsameAs && DO.C.User.Graph.owlsameAs._array.length > 0)))) {
        addContactsButtonDisable = ' disabled="disabled"';
        noContactsText = '<p>No contacts with an <i class="fa fa-inbox"></i> Inbox found. Acquire <i class="fa fa-thermometer-empty"></i> cool friends‽</p><p>Optionally enter targets individually:</p>';
      }
      var addContactsButton = '<li id="share-resource-address-book"><button class="add"' + addContactsButtonDisable + '><i class="fa fa-address-book"></i> Add from contacts</button>' + noContactsText + '</li>';

      document.body.insertAdjacentHTML('beforeend', '<aside id="share-resource" class="do on"><button class="close" title="Close">❌</button><h2>Share resource</h2><div id="share-resource-input"><p>Send a notification about <code>' + iri +'</code></p><ul>' + addContactsButton + '<li><label for="share-resource-to">To</label> <textarea id="share-resource-to" rows="2" cols="40" name="share-resource-to" placeholder="WebID or article IRI (one per line)"></textarea></li><li><label for="share-resource-note">Note</label> <textarea id="share-resource-note" rows="2" cols="40" name="share-resource-note" placeholder="Check this out!"></textarea></li></ul></div><button class="share">Share</button></aside>');

      var shareResource = document.getElementById('share-resource');
      shareResource.addEventListener('click', function (e) {
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

          if (!iri) {
            return
          }

          // var rm = shareResource.querySelector('.response-message');
          // if (rm) {
          //   rm.parentNode.removeChild(rm);
          // }
          // shareResource.insertAdjacentHTML('beforeend', '<div class="response-message"></div>');

          return inbox.sendNotifications(tos, note, iri, shareResource)
        }
      });
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
              DO.C.User.SameAs = util.uniqueArray(DO.C.User.SameAs);
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
          DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(DO.C.User.Knows));

          return processSameAs(DO.C.User.Graph);
        }
        else {
          return fetcher.getResourceGraph(iri).then(
            function(g){
// console.log(g);
              if(typeof g._graph == 'undefined') {
                return Promise.resolve([]);
              }
              var s = g.child(iri);
              if(s.foafknows && s.foafknows._array.length > 0){
                DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(s.foafknows._array));
              }
              if(s.schemaknows && s.schemaknows._array.length > 0){
                DO.C.User.TempKnows = util.uniqueArray(DO.C.User.TempKnows.concat(s.schemaknows._array));
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
                fetcher.getResourceGraph(url).then(
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
      var name = auth.getAgentName(s) || iri;
      var img = auth.getAgentImage(s);
      img = (img && img.length > 0) ? '<img alt="" height="32" src="' + img + '" width="32" />' : '';
      var input = '<li><input id="share-resource-contact-' + id + '" type="checkbox" value="' + iri + '" /><label for="share-resource-contact-' + id + '">' + img + '<a href="' + iri + '" target="_blank">' + name + '</a></label></li>';


      //TODO: This should update DO.C.User.Contacts' Inbox value so that it is not checked again when #share-resource-contacts input:checked
      if(s.ldpinbox && s.ldpinbox._array.length > 0){
        node.insertAdjacentHTML('beforeend', input);
      }
      else {
        inbox.getEndpointFromHead(DO.C.Vocab['ldpinbox']['@id'], iri).then(
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

    nextLevelButton: function(button, url, id, action) {
      var actionNode = document.getElementById(id + '-' + action);

      button.addEventListener('click', function(){
        if(button.parentNode.classList.contains('container')){
          fetcher.getResourceGraph(url).then(
            function(g){
              actionNode.textContent = (action == 'write') ? url + DO.U.generateAttributeId() : url;
              return DO.U.generateBrowserList(g, url, id, action);
            },
            function(reason){
              var inputBox = document.getElementById(id);
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
        }
        else {
          document.getElementById(id + '-input').value = url;
          var alreadyChecked = button.parentNode.querySelector('input[type="radio"]').checked;
          var radios = button.parentNode.parentNode.querySelectorAll('input[checked="true"]');

          actionNode.textContent =  url;

          for(var i = 0; i < radios.length; i++){
            radios[i].removeAttribute('checked');
          }
          if(alreadyChecked){
            button.parentNode.querySelector('input[type="radio"]').removeAttribute('checked');
          }
          else{
            button.parentNode.querySelector('input[type="radio"]').setAttribute('checked', 'true');
          }
        }
      }, false);
    },

    generateBrowserList: function(g, url, id, action) {
      return new Promise(function(resolve, reject){
        document.getElementById(id + '-input').value = url;

        var msgs = document.getElementById(id).querySelectorAll('.response-message');
        for(var i = 0; i < msgs.length; i++){
          msgs[i].parentNode.removeChild(msgs[i]);
        }

        var list = document.getElementById(id + '-ul');
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
          DO.U.nextLevelButton(buttons[i], nextUrl, id, action);
        }

        return resolve(list);
      });
    },

    initBrowse: function(storageUrl, input, browseButton, id, action){
      input.value = storageUrl;
      fetcher.getResourceGraph(storageUrl).then(function(g){
        DO.U.generateBrowserList(g, storageUrl, id, action);
      }).then(function(i){
        document.getElementById(id + '-' + action).textContent = (action == 'write') ? input.value + DO.U.generateAttributeId() : input.value;
      });

      browseButton.addEventListener('click', function(){
        DO.U.triggerBrowse(input.value, id, action);
      }, false);
    },

    triggerBrowse: function(url, id, action){
      var inputBox = document.getElementById(id);
      if (url.length > 10 && url.match(/^https?:\/\//g) && url.slice(-1) == "/"){
        fetcher.getResourceGraph(url).then(function(g){
          DO.U.generateBrowserList(g, url, id, action).then(function(l){
            return l;
          },
          function(reason){
            console.log('???? ' + reason); // Probably no reason for it to get to here
          });
        },
        function(reason){
          var list = document.getElementById(id + '-ul');
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
      }
      else{
        inputBox.insertAdjacentHTML('beforeend', '<div class="response-message"><p class="error">This is not a valid location.</p></div>');
      }
    },

    setupResourceBrowser: function(parent, id, action){
      id = id || 'browser-location';
      action = action || 'write';

      parent.insertAdjacentHTML('beforeend', '<div id="' + id + '"><label for="' + id +'-input">URL</label> <input type="text" id="' + id +'-input" name="' + id + '-input" placeholder="https://example.org/path/to/" /><button id="' + id +'-update" disabled="disabled">Browse</button></div>\n\
      <div id="' + id +'-contents"></div>');

      var inputBox = document.getElementById(id);
      var storageBox = document.getElementById(id + '-contents');
      var input = document.getElementById(id + '-input');
      var browseButton = document.getElementById(id + '-update');

      input.addEventListener('keyup', function(e){
        var actionNode = document.getElementById(id + '-' + action);
        if (input.value.length > 10 && input.value.match(/^https?:\/\//g) && input.value.slice(-1) == "/") {
          browseButton.removeAttribute('disabled');
          if(e.which == 13){
            DO.U.triggerBrowse(input.value, id, action);
          }
          if(action){
            action.textContent = input.value + DO.U.generateAttributeId();
          }
        }
        else {
          browseButton.disabled = 'disabled';
          if(actionNode) {
            actionNode.textContent = input.value;
          }
        }
      }, false);

      var browserul = document.getElementById(id + '-ul');
      if(!browserul){
        browserul = document.createElement('ul');
        browserul.id = id + '-ul';

        storageBox.appendChild(browserul);
      }

      var storageUrl;

      if(DO.C.User.Storage && DO.C.User.Storage.length > 0) {
        storageUrl = DO.U.forceTrailingSlash(DO.C.User.Storage[0]); // TODO: options for multiple storage
      }

      if(storageUrl){
        DO.U.initBrowse(storageUrl, input, browseButton, id, action);
      }
      else {
        inbox.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
          function(storageUrl) {
            DO.U.initBrowse(storageUrl[0], input, browseButton, id, action);
          },
          function(){
            browseButton.addEventListener('click', function(){
              DO.U.triggerBrowse(input.value, id, action);
            }, false);
          }
        )
      }
    },

    showResourceBrowser: function(id, action) {
      id = id || 'location-' + DO.U.generateAttributeId();
      action = action || 'write';

      var browserHTML = '<aside id="resource-browser-' + id + '" class="do on"><button class="close" title="Close">❌</button><h2>Resource Browser</h2></aside>';
      document.querySelector('body').insertAdjacentHTML('beforeend', browserHTML);

      DO.U.setupResourceBrowser(document.getElementById('resource-browser-' + id), id, action);
      document.getElementById('resource-browser-' + id).insertAdjacentHTML('beforeend', '<p><samp id="' + id + '-' + action + '"></samp></p>');
    },

    openInputFile: function(e) {
      var file = e.target.files[0];
// console.log(file);
      var contentType = file.type;

      var reader = new FileReader();
      reader.onload = function(){
// console.log(reader);

        DO.U.spawnDokieli(reader.result, contentType, 'file:' + file.name);
      };
      reader.readAsText(file);
    },

    openDocument: function (e) {
      if(typeof e !== 'undefined') {
        e.target.disabled = true;
      }
      document.body.insertAdjacentHTML('beforeend', '<aside id="open-document" class="do on"><button class="close" title="Close">❌</button><h2>Open Document</h2><p<label for="open-local-file">Open local file</label> <input type="file" id="open-local-file" name="open-local-file" /></p></aside>');

      var id = 'location-open-document';
      var action = 'read';

      var openDocument = document.getElementById('open-document');
      DO.U.setupResourceBrowser(openDocument , id, action);
      idSamp = (typeof DO.C.User.Storage == 'undefined') ? '' : '<p><samp id="' + id + '-' + action + '">https://example.org/path/to/article</samp></p>';
      openDocument.insertAdjacentHTML('beforeend', idSamp + '<button class="open">Open</button>');

      openDocument.addEventListener('click', function (e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-open').disabled = false;
        }

        if (e.target.matches('#open-local-file')){
          e.target.addEventListener('change', DO.U.openInputFile, false);
        }

        if (e.target.matches('button.open')) {
          var openDocument = document.getElementById('open-document');
          var rm = openDocument.querySelector('.response-message');
          if (rm) {
            rm.parentNode.removeChild(rm);
          }

          var bli = document.getElementById(id + '-input');
          var iri = bli.value;
          var headers = { 'Accept': DO.C.AvailableMediaTypes.join(',') };
          var options = {};
          var pIRI = uri.getProxyableIRI(iri);
          if (pIRI.slice(0, 5).toLowerCase() == 'http:') {
            options['noCredentials'] = true;
          }

          var handleResource = function handleResource (pIRI, headers, options) {
            return fetcher.getResource(pIRI, headers, options)
              .catch(error => {
                if (error.status === 0) {
                  // retry with proxied uri
                  var pIRI = uri.getProxyableIRI(iri, {'forceProxy': true});
                  return handleResource(pIRI, headers, options);
                }

                throw error  // else, re-throw the error
              })
              .then(response => {
                var cT = response.headers.get('Content-Type');
                var contentType = (cT) ? cT.split(';')[0].trim() : 'text/turtle';

                return response.text()
                  .then(responseText => {
                    DO.U.spawnDokieli(responseText, contentType, iri);
                  })
              })
          }

          handleResource(pIRI, headers, options);
        }
      });
    },

    spawnDokieli: function(data, contentType, iri){
      if(DO.C.AvailableMediaTypes.indexOf(contentType) > -1) {
        var template = document.implementation.createHTMLDocument('template');
// console.log(template);

        switch(contentType){
          case 'text/html': case 'application/xhtml+xml':
            template.documentElement.innerHTML = data;
            break;

          default:
            template.documentElement.innerHTML = '<pre>' + data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
            break;
        }

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

          var nodes = template.querySelectorAll('head link, [src], object[data]');
          nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': 'base-url-absolute', 'iri': iri});

          document.documentElement.removeAttribute('id');
          document.documentElement.removeAttribute('class');
        }
        else if(!iri.startsWith('file:')) {
          window.open(iri, '_blank');
          return;
        }

        document.documentElement.innerHTML = template.documentElement.innerHTML;

// console.log(document.location.protocol);
        if(!iri.startsWith('file:')){
          var iriHost = iri.split('//')[1].split('/')[0];
          var iriProtocol = iri.split('//')[0];
// console.log(iriHost);
// console.log(iriProtocol);
          if(document.location.protocol == iriProtocol && document.location.host == iriHost) {
            try {
              history.pushState(null, null, iri);
            }
            catch(e) { console.log('Cannot change pushState due to cross-origin.'); }
          }
        }
        DO.U.init();
      }
      else {
console.log('//TODO: Handle server returning wrong Response/Content-Type for the Request/Accept');
      }
    },


    createNewDocument: function createNewDocument (e) {
      e.target.disabled = true
      document.body.insertAdjacentHTML('beforeend', '<aside id="create-new-document" class="do on"><button class="close" title="Close">❌</button><h2>Create New Document</h2></aside>')

      var newDocument = document.getElementById('create-new-document')
      newDocument.addEventListener('click', e => {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-new').disabled = false
        }
      })

      var id = 'location-new'
      var action = 'write'

      DO.U.setupResourceBrowser(newDocument, id, action)
      document.getElementById(id).insertAdjacentHTML('afterbegin', '<p>Choose a location to save your new article.</p>')
      var baseURLSelection = (document.location.protocol == 'file:') ? '' : DO.U.getBaseURLSelection()

      newDocument.insertAdjacentHTML('beforeend', baseURLSelection +
        '<p>Your new document will be saved at <samp id="' + id + '-' + action +
        '">https://example.org/path/to/article</samp></p><button class="create">Create</button>')

      var bli = document.getElementById(id + '-input')
      bli.focus()
      bli.placeholder = 'https://example.org/path/to/article'

      newDocument.addEventListener('click', e => {
        if (!e.target.matches('button.create')) {
          return
        }

        var newDocument = document.getElementById('create-new-document')
        var storageIRI = newDocument.querySelector('#' + id + '-' + action).innerText.trim()
        var rm = newDocument.querySelector('.response-message')
        if (rm) {
          rm.parentNode.removeChild(rm)
        }

        var html = document.documentElement.cloneNode(true)
        var baseURLSelectionChecked = newDocument.querySelector('select[name="base-url"]')
        // console.log(baseURLSelectionChecked);

        if (baseURLSelectionChecked.length > 0) {
          var baseURLType = baseURLSelectionChecked.value
          var nodes = html.querySelectorAll('head link, [src], object[data]')
          if (baseURLType == 'base-url-relative') {
            DO.U.copyRelativeResources(storageIRI, nodes)
          }
          // TODO: the variable nodes, below, is never used
          // nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': baseURLType})
        }

        html.querySelector('body').innerHTML = '<main><article about="" typeof="schema:Article"></article></main>'
        html.querySelector('head title').innerHTML = ''
        html = doc.getDocument(html)

        fetcher.putResource(storageIRI, html)
          .then(() => {
            newDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="success">' +
              'New document created at <a href="' + storageIRI +
              '?author=true">' + storageIRI + '</a></p></div>'
            )

            window.open(storageIRI + '?author=true', '_blank')
          })

          .catch(error => {
            console.error('Error creating a new document:', error)

            let message

            switch (error.status) {
              case 0:
              case 405:
                message = 'this location is not writable'
                break
              case 401:
              case 403:
                message = 'you do not have permission to write here'
                break
              case 406:
                message = 'enter a name for your resource'
                break
              default:
                message = error.message
                break
            }

            newDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="error">' +
              'Could not create new document: ' + message + '</p>'
            )
          })
      })
    },

    saveAsDocument: function saveAsDocument (e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="save-as-document" class="do on"><button class="close" title="Close">❌</button><h2>Save As Document</h2></aside>');

      var saveAsDocument = document.getElementById('save-as-document');
      saveAsDocument.addEventListener('click', function(e) {
        if (e.target.matches('button.close')) {
          document.querySelector('#document-do .resource-save-as').disabled = false;
        }
      });

      var fieldset = '';

      locationInboxId = 'location-inbox';
      locationInboxAction = 'read';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + locationInboxId + '-fieldset"><legend>Set Inbox</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[0];
      DO.U.setupResourceBrowser(fieldset, locationInboxId, locationInboxAction);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article\'s <em>inbox</em> will be set to: <samp id="' + locationInboxId + '-' + locationInboxAction + '"></samp></p>');
      var lii = document.getElementById(locationInboxId + '-input');
      lii.focus();
      lii.placeholder = 'https://example.org/path/to/inbox/';


      locationAnnotationServiceId = 'location-annotation-service';
      locationAnnotationServiceAction = 'read';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + locationAnnotationServiceId + '-fieldset"><legend>Set Annotation Service</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[1];
      DO.U.setupResourceBrowser(fieldset, locationAnnotationServiceId, locationAnnotationServiceAction);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article\'s <em>annotation service</em> will be set to: <samp id="' + locationAnnotationServiceId + '-' + locationAnnotationServiceAction + '"></samp></p>');
      var lasi = document.getElementById(locationAnnotationServiceId + '-input');
      lasi.focus();
      lasi.placeholder = 'https://example.org/path/to/annotation/';


      var id = 'location-save-as';
      var action = 'write';
      saveAsDocument.insertAdjacentHTML('beforeend', '<fieldset id="' + id + '-fieldset"><legend>Save to</legend></fieldset>');
      fieldset = saveAsDocument.querySelectorAll('fieldset')[2];
      DO.U.setupResourceBrowser(fieldset, id, action);
      fieldset.insertAdjacentHTML('beforeend', '<p>Article will be saved at: <samp id="' + id + '-' + action + '"></samp></p>' + DO.U.getBaseURLSelection() + '<p><input type="checkbox" id="derivation-data" name="derivation-data" checked="checked" /><label for="derivation-data">Derivation data</label></p><button class="create">Save</button>');
      var bli = document.getElementById(id + '-input');
      bli.focus();
      bli.placeholder = 'https://example.org/path/to/article';


      saveAsDocument.addEventListener('click', e => {
        if (!e.target.matches('button.create')) {
          return
        }

        var currentDocumentURL = uri.stripFragmentFromString(document.location.href)
        var saveAsDocument = document.getElementById('save-as-document')
        var storageIRI = saveAsDocument.querySelector('#' + id + '-' + action).innerText.trim()

        var rm = saveAsDocument.querySelector('.response-message')
        if (rm) {
          rm.parentNode.removeChild(rm)
        }

        if(!storageIRI.length) {
          saveAsDocument.insertAdjacentHTML('beforeend',
            '<div class="response-message"><p class="error">' +
            'Specify the location to save the article to, and optionally set its <em>inbox</em> or <em>annotation service</em>.</p></div>'
          )

          return
        }

        var html = document.documentElement.cloneNode(true)
        var nodeInsertLocation = html.querySelector('main > article') || html.querySelector('body')

        var wasDerived = document.querySelector('#derivation-data')
        if (wasDerived.checked) {
          var wasDerivedOn = DO.U.getDateTimeISO()
          nodeInsertLocation.insertAdjacentHTML('beforebegin',
            '<dl id="document-derived-from"><dt>Derived From</dt><dd><a href="' +
            currentDocumentURL + '" rel="prov:wasDerivedFrom">' +
            currentDocumentURL + '</a></dd></dl><dl id="document-derived-on"><dt>Derived On</dt><dd><time datetime="' +
            wasDerivedOn + '">' + wasDerivedOn + '</time></dd></dl>' + '\n'
          )
        }

        var inboxLocation = saveAsDocument.querySelector('#' + locationInboxId + '-' + locationInboxAction).innerText.trim()
        if (inboxLocation) {
          nodeInsertLocation.insertAdjacentHTML('beforebegin', '<dl id="document-inbox"><dt>Notifications Inbox</dt><dd><a href="' + inboxLocation + '" rel="ldp:inbox">' + inboxLocation + '</a></dd></dl>' + "\n")
        }

        var annotationServiceLocation = saveAsDocument.querySelector('#' + locationAnnotationServiceId + '-' + locationAnnotationServiceAction).innerText.trim()
        if (annotationServiceLocation) {
          nodeInsertLocation.insertAdjacentHTML('beforebegin', '<dl id="document-annotation-service"><dt>Annotation Service</dt><dd><a href="' + annotationServiceLocation + '" rel="oa:annotationService">' + annotationServiceLocation + '</a></dd></dl>' + "\n")
        }

        var baseURLSelectionChecked = saveAsDocument.querySelector('select[name="base-url"]')
        if (baseURLSelectionChecked.length > 0) {
          var baseURLType = baseURLSelectionChecked.value
          var nodes = html.querySelectorAll('head link, [src], object[data]')
          if (baseURLType == 'base-url-relative') {
            DO.U.copyRelativeResources(storageIRI, nodes)
          }
          // TODO: 'nodes' not used anywhere:
          // nodes = DO.U.rewriteBaseURL(nodes, {'baseURLType': baseURLType})
        }

        html = doc.getDocument(html)

        var progress = saveAsDocument.querySelector('progress')
        if(progress) {
          progress.parentNode.removeChild(progress)
        }
        e.target.insertAdjacentHTML('afterend', '<progress min="0" max="100" value="0"></progress>')
        progress = saveAsDocument.querySelector('progress')

        fetcher.putResource(storageIRI, html, null, null, { 'progress': progress })

          .then(response => {
            progress.parentNode.removeChild(progress)

            let url = response.url || storageIRI

            saveAsDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="success">' +
              'Document saved at <a href="' + url + '?author=true">' + url + '</a></p></div>'
            )

            window.open(url + '?author=true', '_blank')
          })

          .catch(error => {
            console.error('Error saving document', error)

            let message

            switch (error.status) {
              case 0:
              case 405:
                message = 'this location is not writable'
                break
              case 401:
              case 403:
                message = 'you do not have permission to write here'
                break
              case 406:
                message = 'enter a name for your resource'
                break
              default:
                message = error.message
                break
            }

            saveAsDocument.insertAdjacentHTML('beforeend',
              '<div class="response-message"><p class="error">' +
              'Unable to save:' + message + '</p></div>'
            )
          })
      })
    },

    viewSource: function(e) {
      e.target.disabled = true;
      document.body.insertAdjacentHTML('beforeend', '<aside id="source-view" class="do on"><button class="close" title="Close">❌</button><h2>Source</h2><textarea id="source-edit" rows="24" cols="80"></textarea><p><button class="create">Update</button></p></aside>');
      var sourceBox = document.getElementById('source-view');
      var input = document.getElementById('source-edit');
      input.value = doc.getDocument();

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

    rewriteBaseURL: function(nodes, options) {
      options = options || {};
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

          var s = url.split(':')[0];
          if (s != 'http' && s != 'https' && s != 'file' && s != 'data' && s != 'urn' && document.location.protocol != 'file:') {
            url = DO.U.setBaseURL(url, options);
          }
          node.setAttribute(ref, url);
        };
      }

      return nodes;
    },

    setBaseURL: function(url, options) {
      options = options || {};
      var urlType = ('baseURLType' in options) ? options.baseURLType : 'base-url-absolute';

      var matches = [];
      var regexp = /(https?:\/\/([^\/]*)\/|file:\/\/\/|data:|urn:|\/\/)?(.*)/;

      matches = url.match(regexp);

      if (matches) {
        switch(urlType) {
          case 'base-url-absolute': default:
            if(matches[1] == '//' && 'iri' in options){
              url = options.iri.split(':')[0] + ':' + url;
            }
            else {
              href = ('iri' in options) ? uri.getProxyableIRI(options.iri) : document.location.href;
              url = DO.U.getBaseURL(href) + matches[3].replace(/^\//g, '');
            }
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

    copyRelativeResources: function copyRelativeResources (storageIRI, relativeNodes) {
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
        var s = fromURL.split(':')[0];
        if (s != 'http' && s != 'https' && s != 'file' && s != 'data' && s != 'urn' && s != 'urn') {
          var pathToFile = DO.U.setBaseURL(fromURL, {'baseURLType': 'base-url-relative'});
          fromURL = DO.U.getBaseURL(document.location.href) + pathToFile.replace(/^\//g, '');
          var toURL = baseURL + pathToFile.replace(/^\//g, '');
          fetcher.copyResource(fromURL, toURL);
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
      var o = localStorage.getItem(item);
      if(o) {
        document.documentElement.innerHTML = JSON.parse(o).object.content;
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
      var content = doc.getDocument();

      DO.U.getHash(content).then(digest => {
        var o = localStorage.getItem(item);

        if(!o || (o && JSON.parse(o).id != digest)) {
          var datetime = DO.U.getDateTimeISO();

          var object = {
            "@context": "https://www.w3.org/ns/activitystreams",
            "id": digest,
            "type": "Update",
            "object": {
              "id": item,
              "type": "Document",
              "updated": datetime,
              "mediaType": "text/html",
              "content": content
            }
          };

          localStorage.setItem(item, JSON.stringify(object));
          console.log(datetime + ': Document saved.');
        }
      });
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
      if(document.querySelector('#local-storage')) { return; }

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

        var item = uri.stripFragmentFromString(document.location.href);

        document.getElementById('local-storage').addEventListener('click', function(e) {
          if (e.target.closest('button.local-storage-enable-html')) {
            e.target.outerHTML = DO.C.DisableStorageButtons;
            DO.U.enableStorage(item);
          }

          if (e.target.closest('button.local-storage-disable-html')) {
            e.target.outerHTML = DO.C.EnableStorageButtons;
            DO.U.disableStorage(item);
          }

          if (e.target.matches('input.autosave')) {
            if (e.target.getAttribute('checked')) {
              e.target.removeAttribute('checked');
              DO.U.disableAutoSave(item);
            }
            else {
              e.target.setAttribute('checked', 'checked');
              DO.U.enableAutoSave(item);
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
      options = options || {};
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

      return fetcher.getResourceGraph(iri);
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
          var author = auth.getAgentName(s);

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
          var c = e.target.getAttribute('class').split(' ')
                    .filter(function(s) { return s.startsWith('highlight-'); });
          var highlightsX = document.body.querySelectorAll('*[class~="'+ c[0] +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.add('do', 'highlight');
          }
        });

        highlights[i].addEventListener('mouseleave', function(e) {
          var c = e.target.getAttribute('class');
          var c = e.target.getAttribute('class').split(' ')
                    .filter(function(s) { return s.startsWith('highlight-'); });
          var highlightsX = document.body.querySelectorAll('*[class~="'+ c[0] +'"]');
          for (var j = 0; j < highlightsX.length; j++) {
            highlightsX[j].classList.remove('do', 'highlight');
          }
        });
      }
    },

    //From http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
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

    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
    getHash: function(message, algo = "SHA-256") {
      var buffer = new TextEncoder("utf-8").encode(message);
      return crypto.subtle.digest(algo, buffer).then(function (hash) {
        var hexCodes = [];
        var view = new DataView(hash);
        for (var i = 0; i < view.byteLength; i += 4) {
          var value = view.getUint32(i)
          var stringValue = value.toString(16)
          var padding = '00000000'
          var paddedValue = (padding + stringValue).slice(-padding.length)
          hexCodes.push(paddedValue);
        }
        return hexCodes.join("");
      });
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
       return sparqlEndpoint + "?query=" + uri.encodeString(query);
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

        return sparqlEndpoint + "?query=" + uri.encodeString(query);
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
      return graph.getGraph(url)
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
      var pIRI = uri.getProxyableIRI(noteIRI);

      return graph.getGraph(pIRI)
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
            var annotatedByName = auth.getAgentName(annotatedBy);
// console.log(annotatedByName);
            var annotatedByImage = auth.getAgentImage(annotatedBy);
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
                  if (n.nodeType === 3 && n.nodeValue === selectedParentNodeValue) {
                    selectedParentNode.replaceChild(selectionUpdated, n);
                  }
                }

                var resourceIRI = uri.stripFragmentFromString(document.location.href);

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

                      fetcher.deleteResource(noteIRI)
                        .then(() => {
                          var aside = noteDelete.closest('aside.do')
                          aside.parentNode.removeChild(aside)
                          var span = document.querySelector('span[about="#' + refId + '"]')
                          span.outerHTML = span.querySelector('mark').textContent
                          // TODO: Delete notification or send delete activity
                        })
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
        interactions = document.querySelector('main > article') || document.body;
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
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">\n\
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
          creatorNameIRI = DO.C.SecretAgentNames[Math.floor(Math.random() * DO.C.SecretAgentNames.length)];
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
                    tagsArray = util.uniqueArray(tagsArray);

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

                body += '<section id="note-' + n.id + '" rel="oa:hasBody" resource="i:#note-' + n.id + '"><h2 property="schema:name">Note</h2>' + license + '<div datatype="rdf:HTML" property="rdf:value schema:description" resource="i:#note-' + n.id + '" typeof="oa:TextualBody">' + n.body + '</div></section>';
              }
            }

            var targetIRI = '';
            var targetRelation = 'oa:hasTarget';
            if (typeof n.target !== 'undefined' && 'iri' in n.target) {
              targetIRI = n.target.iri;
              var targetIRIFragment = n.target.iri.substr(n.target.iri.lastIndexOf('#'));
              //TODO: Handle when there is no fragment
              if (typeof n.target.selector !== 'undefined') {
                annotationTextSelector = '<div rel="oa:hasSelector" resource="i:#fragment-selector" typeof="oa:FragmentSelector"><dl class="conformsto"><dt>Fragment selector conforms to</dt><dd><a content="' + targetIRIFragment + '" lang="" property="rdf:value" rel="dcterms:conformsTo" resource="https://tools.ietf.org/html/rfc3987" xml:lang="">RFC 3987</a></dd></dl><dl rel="oa:refinedBy" resource="i:#text-quote-selector" typeof="oa:TextQuoteSelector"><dt>Refined by</dt><dd><span lang="en" property="oa:prefix" xml:lang="en">' + n.target.selector.prefix + '</span><mark lang="en" property="oa:exact" xml:lang="en">' + n.target.selector.exact + '</mark><span lang="en" property="oa:suffix" xml:lang="en">' + n.target.selector.suffix + '</span></dd></dl></div>';
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

    createRDFaHTML: function(r, mode) {
      var s = '', about = '', property = '', rel = '', resource = '', href = '', content = '', langDatatype = '', typeOf = '', idValue = '', id = '';

      if ('rel' in r && r.rel != '') {
        rel = ' rel="' + r.rel + '"';
      }

      if ('href' in r && r.href != '') {
        href = ' href="' + r.href + '"';
      }

      if(mode == 'expanded') {
        idValue = DO.U.generateAttributeId();
        id = ' id="' + idValue + '"';

        if ('about' in r && r.about != '') {
          about = ' about="' + r.about + '"';
        }
        else {
          about = ' about="#' + idValue + '"';
        }

        if ('property' in r && r.property != '') {
          property = ' property="' + r.property + '"';
        }
        else {
          //TODO: Figure out how to use user's preferred vocabulary.
          property = ' property="rdfs:label"';
        }

        if ('resource' in r && r.resource != '') {
          resource = ' resource="' + r.resource + '"';
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
      }

      var element = ('datatype' in r && r.datatype == 'xsd:dateTime') ? 'time' : ((href == '') ? 'span' : 'a');
      var textContent = r.textContent || r.href || '';

      s = '<' + element + about + content + href + id + langDatatype + property + rel + resource + typeOf + '>' + textContent + '</' + element + '>';

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

    getPublicationStatusOptionsHTML: function(options) {
      options = options || {};
      var s = '', selectedIRI = '';

      if ('selected' in options) {
        selectedIRI = options.selected;
        if (selectedIRI == '') {
          s += '<option selected="selected" value="">Choose a publication status</option>';
        }
      }
      else {
        selectedIRI = DO.C.Vocab['psodraft']['@id'];
      }

      Object.keys(DO.C.PublicationStatus).forEach(function(iri){
        var selected = (iri == selectedIRI) ? ' selected="selected"' : '';
        s += '<option value="' + iri + '" title="' + DO.C.PublicationStatus[iri].description  + '"' + selected + '>' + DO.C.PublicationStatus[iri].name  + '</option>';
      })

      return s;
    },

    getLicenseOptionsHTML: function(options) {
      options = options || {};
      var s = '', selectedIRI = '';

      if ('selected' in options) {
        selectedIRI = options.selected;
        if (selectedIRI == '') {
          s += '<option selected="selected" value="">Choose a license</option>';
        }
      }
      else {
        selectedIRI = 'https://creativecommons.org/licenses/by/4.0/';
      }

      Object.keys(DO.C.License).forEach(function(iri){
        if(iri != 'NoLicense') {
          var selected = (iri == selectedIRI) ? ' selected="selected"' : '';
          s += '<option value="' + iri + '" title="' + DO.C.License[iri].description  + '"' + selected + '>' + DO.C.License[iri].name  + '</option>';
        }
      })

      return s;
    },

    getCitationOptionsHTML: function(type) {
      var type = type || 'cites';

      var s = '';
      Object.keys(DO.C.Citation).forEach(function(iri){
        s += '<option value="' + iri + '">' + DO.C.Citation[iri]  + '</option>';
      })

      return s;
    },

    initMath: function(config) {
      if (!DO.C.MathAvailable) { return; }

      config = config || {
        skipTags: ["script","noscript","style","textarea","pre","code", "math"],
        ignoreClass: "equation",
        MathML: {
          useMathMLspacing: true
        },
        tex2jax: {
          inlineMath: [["$","$"],["\\(","\\)"]],
          processEscapes: true
        },
        asciimath2jax: {
          delimiters: [['$','$'], ['`','`']]
        }
      }

      MathJax.Hub.Config(config);

      MathJax.Hub.Register.StartupHook("End Jax",function () {
        var BROWSER = MathJax.Hub.Browser;
        var jax = "SVG";
        if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
        if (BROWSER.isFirefox) jax = "NativeMML";
        if (BROWSER.isSafari && BROWSER.versionAtLeast("5.0")) jax = "NativeMML";

        MathJax.Hub.setRenderer(jax);
      });
    },

    setDocumentIdentifier: function(url) {
      var elementId = 'document-identifier';
      url = url || uri.stripFragmentFromString(document.location.href);

      node = document.querySelector('#' + elementId + ' [rel="owl:sameAs"]');

      var documentIdentifier = '<dd><a href="' + url + '" rel="owl:sameAs">' + url + '</a></dd>';

      if(node) {
        dd = node.closest('dd');
        var dl = dd.parentNode;
        dl.removeChild(dd);
        dl.insertAdjacentHTML('beforeend', documentIdentifier);
      }
      else {
        var s = '<dl id="' + elementId + '"><dt>Identifier</dt>' + documentIdentifier + '</dl>';
        DO.U.insertDocumentLevelHTML(s, { 'id': elementId });
      }
    },

    setDate: function(node, options) {
      options = options || {};
      var type;

      switch(options.type) {
        case 'Created': default: type = 'Created'; break;
        case 'Published': type = 'Published'; break;
        case 'Modified': type = 'Modified'; break;
      }

      var elementId = (options.id) ? options.id : 'document-' + type.toLowerCase();

      node = node || document.querySelector('#' + elementId + ' [property*=":date' + type + '"]');

      var datetime = ('datetime' in options) ? options.datetime : DO.U.getDateTimeISO();

      if(node) {
        if(node.getAttribute('datetime')) {
          node.setAttribute('datetime', datetime);
        }
        if(node.getAttribute('content')) {
          node.setAttribute('content', datetime);
        }
        node.textContent = datetime.substr(0, datetime.indexOf('T'));
      }
      else {
        DO.U.insertDocumentLevelHTML(DO.U.createDateHTML(options), { 'id': elementId });
      }
    },

    createDateHTML: function(options) {
      options = options || {};
      var type;

      switch(options.type) {
        case 'Created': default: type = 'Created'; break;
        case 'Published': type = 'Published'; break;
        case 'Modified': type = 'Modified'; break;
      }

      var c = ('class' in options && options.class.length > 0) ? ' class="' + options.class + '"' : '';
      var id = ('id' in options && options.id.length > 0) ? ' id="' + options.id + '"' : ' id="document-' + type.toLowerCase() + '"';
      var datetime = ('datetime' in options) ? options.datetime : DO.U.getDateTimeISO();

      var date = '        <dl'+c+id+'>\n\
          <dt>' + type + '</dt>\n\
          <dd><time content="' + datetime + '" datatype="xsd:dateTime" datetime="' + datetime + '" property="schema:date' + type + '">' + datetime.substr(0, datetime.indexOf('T')) + '</time></dd>\n\
        </dl>\n\
';

      return date;
    },

    getResourceInfo: function(data, options) {
      data = data || doc.getDocument();

      var info = {
        'state': DO.C.Vocab['ldpRDFSource']['@id'],
        'profile': DO.C.Vocab['ldpRDFSource']['@id']
      };

      options = options || {};

      options['contentType'] = ('contentType' in options) ? options.contentType : 'text/html';
      options['subjectURI'] = ('subjectURI' in options) ? options.subjectURI : uri.stripFragmentFromString(document.location.href);

      return graph.getGraphFromData(data, options).then(
        function(i){
          var s = SimpleRDF(DO.C.Vocab, options['subjectURI'], i, ld.store).child(options['subjectURI']);
// console.log(s);

          info['rdftype'] = s.rdftype._array;
          info['profile'] = DO.C.Vocab['ldpRDFSource']['@id'];

          //Check if the resource is immutable
          s.rdftype.forEach(function(resource) {
            if (resource == DO.C.Vocab['ldpImmutableResource']['@id']) {
              info['state'] = DO.C.Vocab['ldpImmutableResource']['@id'];
            }
          });

          if (s.reloriginal) {
            info['state'] = DO.C.Vocab['ldpImmutableResource']['@id'];
            info['original'] = s.reloriginal;

            if (s.reloriginal == options['subjectURI']) {
              //URI-R (The Original Resource is a Fixed Resource)

              info['profile'] = DO.C.Vocab['memOriginal']['@id'];
            }
            else {
              //URI-M
  
              info['profile'] = DO.C.Vocab['memMemento']['@id'];
            }
          }

          if (s.relmemento) {
            //URI-R

            info['profile'] = DO.C.Vocab['memOriginal']['@id'];
            info['memento'] = s.relmemento;
          }

          if(s.reloriginal && s.relmemento && s.reloriginal != s.relmemento) {
            //URI-M (Memento without a TimeGate)

            info['profile'] = DO.C.Vocab['memMemento']['@id'];
            info['original'] = s.reloriginal;
            info['memento'] = s.relmento;
          }

          if(s.rellatestversion) {
            info['latest-version'] = s.rellatestversion;
          }

          if(s.relpredecessorversion) {
            info['predecessor-version'] = s.relpredecessorversion;
          }

          if(s.reltimemap) {
            info['timemap'] = s.reltimemap;
          }

          if(s.reltimegate) {
            info['timegate'] = s.reltimegate; 
          }

// console.log(info);

          if(!DO.C.OriginalResourceInfo) {
            DO.C['OriginalResourceInfo'] = info;
          }

          DO.C['ResourceInfo'] = info;

          return info;
      });
    },

    Editor: {
      disableEditor: function(e) {
    //    _mediumEditors[1].destroy();
        DO.C.EditorEnabled = false;
        document.removeEventListener('click', DO.U.updateDocumentTitle);
        return DO.U.Editor.MediumEditor.destroy();
      },

      enableEditor: function(editorMode, e, selector) {
        selector = selector || 'main > article';

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

        if('MathJax' in window) {
          editorOptions.author.extensions['math'] = new DO.U.Editor.Button({action:'math', label:'math'});
          editorOptions.author.toolbar.buttons.splice(7, 0, 'math');
        }

        if('MediumEditorTable' in window) {
          editorOptions.author.extensions['table'] = new MediumEditorTable();
          editorOptions.author.toolbar.buttons.splice(10, 0, 'table');
        }

        var eNodes = document.querySelector(selector) || document.body;
        var eOptions = editorOptions[editorMode];
        DO.C.User.Role = editorMode;

        if (typeof MediumEditor !== 'undefined') {
          DO.U.Editor.MediumEditor = new MediumEditor(eNodes, eOptions);
          DO.C.EditorEnabled = true;

          if (e && e.target.closest('button.editor-enable')) {
            DO.C.ContentEditable = true;
            document.addEventListener('click', DO.U.updateDocumentTitle);

            var documentLicense = 'document-license';
            var license = document.getElementById(documentLicense);
            if(!license) {
              var dl = '<dl class="do" id="' + documentLicense + '"><dt>License</dt><dd><select contenteditable="false" name="license">' + DO.U.getLicenseOptionsHTML({ 'selected': '' }) + '</select></dd></dl>';
              DO.U.insertDocumentLevelHTML(dl, { 'id': documentLicense });

              var dLS = document.querySelector('#' + documentLicense + ' select');
              dLS.addEventListener('change', function(e){
                dLS.querySelectorAll('option').forEach(function(o){
                  o.removeAttribute('selected');
                });
                dLS.querySelector('option[value="' + e.target.value + '"]').setAttribute('selected', 'selected');
              });
            }

            var documentStatus = 'document-status';
            var status = document.getElementById(documentStatus);
            if(!status) {
              var dl = '<dl class="do" id="' + documentStatus + '"><dt>Document Status</dt><dd><select contenteditable="false" name="status">' + DO.U.getPublicationStatusOptionsHTML({ 'selected': '' }) + '</select></dd></dl>';
              DO.U.insertDocumentLevelHTML(dl, { 'id': documentStatus });

              var dSS = document.querySelector('#' + documentStatus + ' select');
              dSS.addEventListener('change', function(e){
                dSS.querySelectorAll('option').forEach(function(o){
                  o.removeAttribute('selected');
                });
                dSS.querySelector('option[value="' + e.target.value + '"]').setAttribute('selected', 'selected');
              });
            }

          }
          else if (e && (e.target.closest('button.editor-disable') || e.target.closest('button.review-enable'))) {
            DO.C.ContentEditable = false;
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
                dd = '<dd><a href="' + licenseIRI+ '" rel="schema:license" title="' + DO.C.License[licenseIRI].description + '">' + DO.C.License[licenseIRI].name + '</a></dd>';
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
                dd = '<dd rel="pso:holdsStatusInTime" resource="#' + DO.U.generateAttributeId() + '"><span rel="pso:withStatus" resource="' + statusIRI  + '" typeof="pso:PublicationStatus">' + DO.C.PublicationStatus[statusIRI].name + '</span></dd>';

                dl.insertAdjacentHTML('beforeend', dd);
              }
            }
          }

          document.querySelectorAll('.do').forEach(function(node){
            node.setAttribute('contenteditable', 'false');
          })

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
                case 'math': this.contentFA = '<i class="fa fa-calculator"></i>'; break;
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

                    this.base.restoreSelection();
                    this.base.checkSelection();
                    break;

                  case 'math':
                    var QUEUE = MathJax.Hub.Queue;  // shorthand for the queue
                    var math = null;                // the element jax for the math output.

                    var selection = this.base.selection;

                    var selectionId = DO.U.generateAttributeId();

                    var selectionUpdated = '<span id="' + selectionId + '">$$</span>';

                    MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);

                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, selectionId]);
                    var math = MathJax.Hub.getAllJax(selectionId)[0];
                    MathJax.Hub.Queue(["Text", math, selection]);

                    MediumEditor.selection.selectNode(document.getElementById(selectionId), document);
                    break;

                  default:
                    var selectionUpdated = '<' + tagNames[0] + datetime + '>' + this.base.selection + '</' + tagNames[0] + '>';
                    MediumEditor.util.insertHTMLCommand(this.base.selectedDocument, selectionUpdated);
                    this.base.restoreSelection();
                    this.base.checkSelection();

                    break;
                }

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
                    var resourceIRI = uri.stripFragmentFromString(document.location.href);
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

              return inbox.getEndpoint(DO.C.Vocab['oaannotationService']['@id']).then(
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

                  queryURL = uri.getProxyableIRI(queryURL);

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
                        queryURL = uri.getProxyableIRI(queryURL);

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

              var resourceIRI = uri.stripFragmentFromString(document.location.href);
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
                  containerIRI = DO.C.User.masterWorkspace;
                }
                else if(typeof DO.C.User.Workspace != 'undefined') {
                  if (typeof DO.C.User.Workspace.Master != 'undefined' && DO.C.User.Workspace.Master.length > 0) {
                    containerIRI = DO.C.User.Workspace.Master;
                  }
                  else if(typeof DO.C.User.Workspace.Public != 'undefined' && DO.C.User.Workspace.Public.length > 0) {
                    containerIRI = DO.C.User.Workspace.Public;
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
                  if (DO.U.Editor.MediumEditor.options.id === 'review') {
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
                  ref = DO.U.createRDFaHTML(noteData, 'expanded');
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

                  annotationDistribution.forEach(annotation => {
                    graph.serializeData(data, 'text/html', annotation['contentType'], { 'subjectURI': annotation['noteIRI'] })

                      .catch(error => {
                        console.log('Error serializing annotation:', error)

                        throw error  // re-throw, break out of promise chain
                      })

                      .then(data => {
                        if (!('canonical' in annotation)) {
                          switch (annotation[ 'contentType' ]) {
                            case 'application/ld+json':
                              let x = JSON.parse(data)
                              x[ 0 ][ "via" ] = x[ 0 ][ "@id" ]
                              x[ 0 ][ "@id" ] = annotation[ 'noteURL' ]
                              data = JSON.stringify(x)
                              break
                            default:
                              break
                          }
                        }

                        return fetcher.putResource(annotation[ 'noteURL' ], data, annotation[ 'contentType' ])
                          .catch(error => {
                            console.log('Error saving annotation:', error)
                            throw error // re-throw, break out of promise chain
                          })
                      })

                      .then(() => {
                        if (!annotation[ 'canonical' ]) {
                          // Nothing else needs to be done, go on to the
                          // next annotation (error will be suppressed in
                          // the catch-all .catch() clause below)
                          throw new Error()
                        }

                        return DO.U.positionInteraction(annotation[ 'noteIRI' ], document.body)
                          .catch(console.log)
                      })

                      .then(() => {
                        return inbox.getEndpoint(DO.C.Vocab['ldpinbox']['@id'])
                          .catch(error => {
                            console.log('Error fetching ldpinbox endpoint:', error)
                            throw error
                          })
                      })

                      .then(inboxes => {
                        // TODO: resourceIRI for getEndpoint should be the
                        // closest IRI (not necessarily the document).
                        // Test resolve/reject better.

                        if (inboxes.length > 0) {
                          var inboxURL = inboxes[0];
                          let notificationData = {
                            "type": notificationType,
                            "inbox": inboxURL,
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

                          return inbox.notifyInbox(notificationData)
                            .catch(error => {
                              console.log('Error notifying the inbox:', error)
                            })
                        }
                      })

                      .catch(() => {  // catch-all
                        // suppress the error, it was already logged to the console above
                        // nothing else needs to be done, the loop will proceed
                        // to the next annotation
                      })
                  })  // annotationDistribution.forEach
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
                        else if (uri.stripFragmentFromString(options.citationId) !== uri.getProxyableIRI(options.citationId)) {
                          citationURI = window.location.origin + window.location.pathname;
                        }
                        else {
                          citationURI = options.citationId;
                        }

                        var citation = DO.U.getCitationHTML(citationGraph, citationURI, options);

                        var r = document.querySelector('#references ol');
                        if (!r) {
                          var nodeInsertLocation = document.querySelector('main > article > div') || document.body;
                          var section = '<section id="references"><h2>References</h2><div><ol></ol></div></section>';
                          nodeInsertLocation.insertAdjacentHTML('beforeend', section);
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
                          var inboxURL = s.ldpinbox.at(0);
// console.log(inboxURL);

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
                            "inbox": inboxURL,
                            "object": citedBy,
                            "target": options.url,
                            "statements": notificationStatements
                          };

                          inbox.notifyInbox(notificationData).then(
                            function(s){
                              console.log('Sent Linked Data Notification to ' + inboxURL);
                            });
                        }
                      });
                      break;
                  }
                  break;

                case 'bookmark':
                  var data = DO.U.createHTML(noteIRI, note);

                  fetcher.putResource(noteIRI, data)
                    .then(() => {
                      // TODO: Let the user know that it was bookmarked
                    })
                    .catch(error => {
                      console.log('Error saving bookmark:', error)
                    })

                  break
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
        DO.U.initCurrentStylesheet();
        DO.U.setPolyfill();
        DO.U.setDocRefType();
        DO.U.showRefs();
        DO.U.buttonClose();
        DO.U.highlightItems();
        DO.U.initDocumentActions();
        DO.U.getResourceInfo();
        DO.U.showDocumentInfo();
        DO.U.showFragment();
        DO.U.setDocumentMode();
        DO.U.showInboxNotifications();
        DO.U.initMath();
      }
    }
  } //DO.U
}; //DO

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function(){ DO.U.init(); });
  }
}

module.exports = DO
