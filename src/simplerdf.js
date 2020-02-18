var LdpStore = require('rdf-store-ldp/lite')
var SimpleRDF = require('simplerdf')
var N3Parser = require('rdf-parser-n3')
var JsonLdParser = require('rdf-parser-jsonld')
var RdfaParser = require('rdf-parser-rdfa')
var RdfXmlParser = require('rdf-parser-rdfxml')
var SimpleRDFParse = require('simplerdf-parse')

var formats = {parsers: {}}
formats.parsers['text/turtle'] = N3Parser
formats.parsers['application/ld+json'] = JsonLdParser
formats.parsers['application/activity+json'] = JsonLdParser
formats.parsers['application/xhtml+xml'] = RdfaParser
formats.parsers['text/html'] = RdfaParser
formats.parsers['application/rdf+xml'] = RdfXmlParser
var parser = SimpleRDFParse(formats.parsers)

SimpleRDF.parse = parser.parse.bind(parser)

var storeFormats = {parsers:{}}
storeFormats.parsers['text/turtle'] = N3Parser
storeFormats.parsers['application/ld+json'] = JsonLdParser
storeFormats.parsers['application/activity+json'] = JsonLdParser
storeFormats.parsers['application/xhtml+xml'] = RdfaParser
storeFormats.parsers['text/html'] = RdfaParser
storeFormats.parsers['application/rdf+xml'] = RdfXmlParser

exports.store = new LdpStore(storeFormats)
exports.SimpleRDF = SimpleRDF
