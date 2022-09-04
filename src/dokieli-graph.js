/** dokieli
 *
 * Sarven Capadisli <info@csarven.ca> http://csarven.ca/#i
 * http://www.apache.org/licenses/LICENSE-2.0.html Apache License, Version 2.0
 * https://dokie.li/
 * https://github.com/linkeddata/dokieli
 */

global.fetcher = require('./fetcher')
global.doc = require('./doc')
const uri = require('./uri')
const graph = require('./graph')
const util = require('./util')
window.MediumEditor = require('medium-editor')
window.MediumEditorTable = require('medium-editor-tables')
global.auth = require('./auth')
global.template = require('./template')
const d3 = Object.assign({}, require("d3-selection"), require("d3-force"))

if (typeof DO === 'undefined') {
    const ld = require('./simplerdf')
    global.SimpleRDF = ld.SimpleRDF
    var DO = {
        fetcher,

        C: require('./config'),

        U: {

            //Borrowed some of the d3 parts from https://bl.ocks.org/mbostock/4600693
            showVisualisationGraph: function (url, data, selector, options) {
                url = url || window.location.origin + window.location.pathname;
                data = data || doc.getDocument();
                selector = selector || 'body';
                options = options || {};
                options['contentType'] = options.contentType || 'text/html';
                options['subjectURI'] = options.subjectURI || url;
                options['license'] = options.license || 'https://creativecommons.org/licenses/by/4.0/';
                var width = options.width || '100%';
                var height = options.height || '100%';
                var nodeRadius = 6;
                var simulation;

                var id = util.generateAttributeId();


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

                function runSimulation(graph, svgObject) {
                    // console.log(graph)
                    // console.log(svgObject)
                    simulation
                        .nodes(graph.nodes)
                        .on("tick", ticked);

                    simulation.force("link")
                        .links(graph.links);

                    function ticked() {
                        svgObject.link.attr("d", positionLink);
                        svgObject.node.attr("transform", positionNode);
                    }
                }

                // var color = d3.scaleOrdinal(d3.schemeCategory10);

                var group = {
                    "0": { color: '#fff', label: '' },
                    "1": { color: '#000', label: '', type: 'rdf:Resource' },
                    "2": { color: '#777', label: '' },
                    "3": { color: '#ccc', label: 'Literal' },
                    "4": { color: '#551a8b', label: 'Visited', type: 'rdf:Resource' },
                    "5": { color: '#ff0', label: 'Root', type: 'rdf:Resource' },
                    "6": { color: '#ff2900', label: 'Type', type: 'rdf:Resource' },
                    "7": { color: '#002af7', label: 'External', type: 'rdf:Resource' },
                    "8": { color: '#00cc00', label: 'Internal', type: 'rdf:Resource' },
                    "9": { color: '#00ffff', label: 'Citation', type: 'rdf:Resource' },
                    "10": { color: '#900090', label: 'Social', type: 'rdf:Resource' },
                    "11": { color: '#ff7f00', label: 'DataSet', type: 'rdf:Resource' },
                    "12": { color: '#9a3a00', label: 'Requirement', type: 'rdf:Resource' },
                    "13": { color: '#0088ee', label: 'Policy', type: 'rdf:Resource' }
                }

                if (selector == '#graph-view' && !document.getElementById('graph-view')) {
                    document.documentElement.appendChild(util.fragmentFromString('<aside id="graph-view" class="do on">' + DO.C.Button.Close + '<h2>Graph view</h2></aside>'));
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

                if ('license' in options) {
                    svg.select('metadata')
                        .append('tspan')
                        .attr('rel', 'schema:license')
                        .attr('resource', options.license);
                }

                if ('title' in options) {
                    svg.append('title')
                        .attr('property', 'schema:name')
                        .text(options.title);
                }

                function handleResource(pIRI, headers, options) {
                    return fetcher.getResource(pIRI, headers, options)
                        .catch(error => {
                            // console.log(error)
                            // if (error.status === 0) {
                            // retry with proxied uri
                            var pIRI = uri.getProxyableIRI(options['subjectURI'], { 'forceProxy': true });
                            return handleResource(pIRI, headers, options);
                            // }

                            // throw error  // else, re-throw the error
                        })
                        .then(response => {
                            // console.log(response)
                            var cT = response.headers.get('Content-Type');
                            options['contentType'] = (cT) ? cT.split(';')[0].trim() : 'text/turtle';

                            return response.text().then(data => {
                                options['mergeGraph'] = true;
                                initiateVisualisation(options['subjectURI'], data, options);
                            });
                        })
                }

                function createSVGMarker() {
                    svg.append("defs").selectAll("marker")
                        .data(["end"])
                        .enter().append("marker")
                        .attr("id", String)
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 20)
                        .attr("refY", -1)
                        .attr("markerWidth", 6)
                        .attr("markerHeight", 6)
                        .attr("orient", "auto")
                        .attr("fill", group[2].color)
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5");
                }

                // createSVGMarker();

                function buildGraphObject(graph) {
                    var graphObject = {};

                    var nodes = graph.nodes;
                    var nodeById = new Map();
                    nodes.forEach(function (n) {
                        nodeById.set(n.id, n);
                    })
                    var links = graph.links;
                    var bilinks = [];

                    // console.log(graph)
                    // console.log(nodeById)
                    var uniqueNodes = {};

                    links.forEach(function (link) {
                        var s = link.source = nodeById.get(link.source),
                            t = link.target = nodeById.get(link.target),
                            i = {}; // intermediate node
                        // linkValue = link.value
                        nodes.push(i);

                        if (uniqueNodes[s.id] > -1) {
                            s = uniqueNodes[s.id];
                        }
                        else {
                            uniqueNodes[s.id] = s;
                        }

                        if (uniqueNodes[t.id] > -1) {
                            t = uniqueNodes[t.id];
                        }
                        else {
                            uniqueNodes[t.id] = t;
                        }

                        links.push({ source: s, target: i }, { source: i, target: t });
                        bilinks.push([s, i, t]);
                    });

                    graphObject = {
                        'nodes': nodes,
                        'links': links,
                        'bilinks': bilinks,
                        'uniqueNodes': uniqueNodes
                    };
                    // console.log(graphObject)

                    return graphObject;
                }

                function buildSVGObject(go) {
                    var svgObject = {};

                    createSVGMarker();

                    var link = svg.selectAll("path")
                        .data(go.bilinks)
                        .enter().append("path")
                        // .attr("class", "link")
                        .attr('fill', 'none')
                        .attr('stroke', group[3].color)
                        .attr("marker-end", "url(#end)");

                    // link.transition();

                    var node = svg.selectAll("circle")
                        .data(go.nodes.filter(function (d) {
                            if (go.uniqueNodes[d.id] && go.uniqueNodes[d.id].index == d.index) {
                                return d.id;
                            }
                        }))
                        .enter().append("circle")
                        // .attr("class", "node")
                        .attr("r", nodeRadius)
                        .attr("fill", function (d) { return group[d.group].color; })
                        .attr('stroke', function (d) {
                            if (d.visited) { return group[4].color }
                            else if (d.group == 3) { return group[2].color }
                            else { return group[7].color }
                        })
                        // .call(d3.drag()
                        //     .on("start", dragstarted)
                        //     .on("drag", dragged)
                        //     .on("end", dragended));
                        .on('click', function (d) {
                            var iri = d.id;
                            if ('type' in group[d.group] && group[d.group].type == 'rdf:Resource' && !(d.id in DO.C.Graphs)) {
                                options = options || {};
                                options['subjectURI'] = iri;
                                var headers = { 'Accept': fetcher.setAcceptRDFTypes() };
                                var pIRI = uri.getProxyableIRI(iri);
                                if (pIRI.slice(0, 5).toLowerCase() == 'http:') {
                                    options['noCredentials'] = true;
                                }

                                handleResource(pIRI, headers, options);
                            }
                        })
                    node.append("title")
                        .text(function (d) { return d.id; });

                    svgObject = {
                        'link': link,
                        'node': node
                    }

                    // console.log(svgObject)
                    return svgObject;
                }

                function initiateVisualisation(url, data, options) {
                    url = uri.stripFragmentFromString(url);

                    return DO.U.getVisualisationGraphData(url, data, options).then(
                        function (graph) {
                            // console.log(graph);
                            var graphObject = buildGraphObject(graph);

                            simulation = d3.forceSimulation().nodes(graph.nodes)
                                .alphaDecay(0.025)
                                // .velocityDecay(0.1)
                                .force("link", d3.forceLink().distance(nodeRadius).strength(0.25))
                                .force('collide', d3.forceCollide().radius(nodeRadius * 2).strength(0.25))
                                // .force("charge", d3.forceManyBody().stength(-5))
                                .force("center", d3.forceCenter(width / 2, height / 2));

                            if ('mergeGraph' in options && options.mergeGraph) {
                                svg.selectAll("marker").remove();
                                svg.selectAll("path").remove();
                                svg.selectAll("circle").remove();
                                simulation.restart();
                            }

                            var svgObject = buildSVGObject(graphObject);

                            runSimulation(graph, svgObject);
                        });
                }

                initiateVisualisation(url, data, options);
            },

            getVisualisationGraphData: function (url, data, options) {
                var requestURL = uri.stripFragmentFromString(url);
                var documentURL = uri.stripFragmentFromString(document.location.href);

                return new Promise(function (resolve, reject) {
                    graph.getGraphFromData(data, options).then(
                        function (g) {
                            // console.log(g);
                            DO.C['Graphs'] = DO.C['Graphs'] || {};
                            var g = SimpleRDF(DO.C.Vocab, options['subjectURI'], g, ld.store).child(requestURL);
                            // console.log(g.toString())
                            var dataGraph = SimpleRDF();
                            var graphs = {};
                            graphs[options['subjectURI']] = g;

                            if ('mergeGraph' in options && options.mergeGraph) {
                                graphs = Object.assign(DO.C.Graphs, graphs);
                            }

                            DO.C['Graphs'][options['subjectURI']] = g;

                            Object.keys(graphs).forEach(function (i) {
                                var graph = graphs[i].graph();

                                dataGraph.graph().addAll(graph);
                            });

                            var graph = { "nodes": [], "links": [] };
                            var graphNodes = [];

                            dataGraph.graph().toArray().forEach(function (t) {
                                if (
                                    // t.predicate.nominalValue == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' ||
                                    // t.predicate.nominalValue == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' ||
                                    t.object.nominalValue == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'
                                ) {
                                    return;
                                }

                                var sGroup = 8;
                                var pGroup = 8;
                                var oGroup = 8;
                                var sVisited = false;
                                var oVisited = false;

                                switch (t.subject.interfaceName) {
                                    default: case 'NamedNode':
                                        if (uri.stripFragmentFromString(t.subject.nominalValue) != requestURL) {
                                            sGroup = 7;
                                        }
                                        break;
                                    case 'BlankNode':
                                        sGroup = 8;
                                        break;
                                }

                                switch (t.object.interfaceName) {
                                    default: case 'NamedNode':
                                        if (uri.stripFragmentFromString(t.object.nominalValue) != requestURL) {
                                            oGroup = 7;
                                        }
                                        break;
                                    case 'BlankNode':
                                        oGroup = 8;
                                        break;
                                    case 'Literal':
                                        oGroup = 3;
                                        break;
                                }

                                if (t.predicate.nominalValue == DO.C.Vocab['rdftype']['@id']) {
                                    oGroup = 6;

                                    if (auth.isActorType(t.object.nominalValue)) {
                                        sGroup = 10;
                                    }
                                    switch (t.object.nominalValue) {
                                        case DO.C.Vocab['qbDataSet']['@id']:
                                            oGroup = 11;
                                            break;
                                        case DO.C.Vocab['odrlAgreement']['@id']:
                                        case DO.C.Vocab['odrlAssertion']['@id']:
                                        case DO.C.Vocab['odrlOffer']['@id']:
                                        case DO.C.Vocab['odrlPolicy']['@id']:
                                        case DO.C.Vocab['odrlPrivacy']['@id']:
                                        case DO.C.Vocab['odrlRequest']['@id']:
                                        case DO.C.Vocab['odrlSet']['@id']:
                                        case DO.C.Vocab['odrlTicket']['@id']:
                                            sGroup = 13;
                                            break;
                                    }
                                }
                                if (auth.isActorProperty(t.predicate.nominalValue)) {
                                    oGroup = 10;
                                }
                                if (t.predicate.nominalValue.startsWith('http://purl.org/spar/cito/')) {
                                    oGroup = 9;
                                }
                                switch (t.predicate.nominalValue) {
                                    case DO.C.Vocab['foafknows']['@id']:
                                        sGroup = 10;
                                        oGroup = 10;
                                        break;
                                    case DO.C.Vocab['specrequirement']['@id']:
                                        oGroup = 12;
                                        break;
                                    case DO.C.Vocab['odrlhasPolicy']['@id']:
                                        oGroup = 13;
                                        break;
                                }

                                if (DO.C.Graphs[t.subject.nominalValue]) {
                                    // sGroup = 1;
                                    sVisited = true;
                                }
                                if (DO.C.Graphs[t.object.nominalValue]) {
                                    // oGroup = 1;
                                    oVisited = true;
                                }

                                //Initial root node
                                if (t.subject.nominalValue == requestURL) {
                                    sGroup = 5;
                                    sVisited = true;
                                }

                                if (t.object.nominalValue == requestURL) {
                                    oGroup = 5;
                                    oVisited = true;
                                }

                                //FIXME: groups are set once - not updated.

                                if (graphNodes.indexOf(t.subject.nominalValue) == -1) {
                                    graphNodes.push(t.subject.nominalValue);
                                    graph.nodes.push({ "id": t.subject.nominalValue, "group": sGroup, "visited": sVisited });
                                }
                                if (graphNodes.indexOf(t.object.nominalValue) == -1) {
                                    graphNodes.push(t.object.nominalValue);
                                    graph.nodes.push({ "id": t.object.nominalValue, "group": oGroup, "visited": oVisited });
                                }

                                graph.links.push({ "source": t.subject.nominalValue, "target": t.object.nominalValue, "value": t.predicate.nominalValue });
                            });
                            // console.log(graphNodes)
                            // console.log(graph)

                            delete graphNodes;
                            return resolve(graph);
                        }
                    );
                });
            },

            showGraph: function (resources, selector, options) {
                if (!DO.C.GraphViewerAvailable) { return; }

                options = options || {};
                options['contentType'] = options.contentType || 'text/html';
                options['subjectURI'] = options.subjectURI || location.href.split(location.search || location.hash || /[?#]/)[0];

                if (Array.isArray(resources)) {
                    DO.U.showGraphResources(resources, selector, options);
                }
                else {
                    var property = (resources && 'filter' in options && 'predicates' in options.filter && options.filter.predicates.length > 0) ? options.filter.predicates[0] : DO.C.Vocab['ldpinbox']['@id'];
                    var iri = (resources) ? resources : location.href.split(location.search || location.hash || /[?#]/)[0];

                    fetcher.getLinkRelation(property, iri).then(
                        function (resources) {
                            DO.U.showGraphResources(resources[0], selector, options);
                        },
                        function (reason) {
                            console.log(reason);
                        }
                    );
                }
            },

            processResources: function(resources, options) {
                if (Array.isArray(resources)) {
                  return Promise.resolve(resources);
                }
                else {
                  return DO.U.getItemsList(resources, options);
                }
              },

            showGraphResources: function (resources, selector, options) {
                selector = selector || document.body;
                options = options || {};
                resources = util.uniqueArray(resources);

                DO.U.processResources(resources, options).then(
                    function (url) {
                        var promises = [];
                        url.forEach(function (u) {
                            // console.log(u);
                            // window.setTimeout(function () {
                            var pIRI = uri.getProxyableIRI(u);
                            promises.push(fetcher.getResourceGraph(pIRI));
                            // }, 1000)
                        });

                        var dataGraph = SimpleRDF();

                        Promise.all(promises)
                            .then(function (graphs) {
                                graphs.forEach(function (graph) {
                                    graph = graph.graph();

                                    dataGraph.graph().addAll(graph);
                                });

                                if ('filter' in options) {
                                    dataGraph = dataGraph.graph().filter(function (g) {
                                        if ('subjects' in options.filter && options.filter.subjects.length > 0 && options.filter.subjects.indexOf(g.subject.nominalValue) >= 0) {
                                            return g;
                                        }
                                        if ('predicates' in options.filter && options.filter.predicates.length > 0 && options.filter.predicates.indexOf(g.predicate.nominalValue) >= 0) {
                                            return g;
                                        }
                                    });
                                }

                                graph.serializeGraph(dataGraph, { 'contentType': 'text/turtle' })
                                    .then(function (data) {
                                        options['contentType'] = 'text/turtle';
                                        // options['subjectURI'] = url;
                                        //FIXME: For multiple graphs (fetched resources), options.subjectURI is the last item, so it is inaccurate
                                        DO.U.showVisualisationGraph(options.subjectURI, data, selector, options);
                                    });
                            });
                    });
            }
        }
    }
}
document.getElementById("graph-view-container").appendChild(util.fragmentFromString('<aside id="graph-view" class="do on"></aside>'));

if (DO.C.GraphViewerAvailable) {
    var g = document.location.href;
    if (g) {
        var iri = decodeURIComponent(g);

        //TODO: Need a way to handle potential proxy use eg. https://dokie.li/?graph=https://dokie.li/proxy?uri=https://example.org/
        //XXX: if iri startsWith https://dokie.li/proxy? then the rest gets chopped.
        // var docURI = iri.split(/[?#]/)[0];

        //XXX: fugly
        var docURI = iri.split(/[#]/)[0];

        // var options = {'license': 'https://creativecommons.org/publicdomain/zero/1.0/', 'filter': { 'subjects': [docURI, iri] }, 'title': iri };
        var options = { 'subjectURI': iri, 'license': 'https://creativecommons.org/publicdomain/zero/1.0/', 'title': iri };

        // DO.U.showGraphResources([docURI], '#graph-view', options);
        DO.U.showGraph([docURI], '#graph-view', options);
    }
}

module.exports = DO
