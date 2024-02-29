const LdpStore = require('rdf-store-ldp/lite')
const SimpleRDF = require('simplerdf')
const N3Parser = require('rdf-parser-n3')
const JsonLdParser = require('rdf-parser-jsonld')
const RdfaParser = require('rdf-parser-rdfa')
const SimpleRDFParse = require('simplerdf-parse')

var formats = {parsers: {}}
formats.parsers['text/turtle'] = N3Parser
formats.parsers['application/trig'] = N3Parser
formats.parsers['application/ld+json'] = JsonLdParser
formats.parsers['application/activity+json'] = JsonLdParser
formats.parsers['application/xhtml+xml'] = RdfaParser
formats.parsers['text/html'] = RdfaParser
var parser = SimpleRDFParse(formats.parsers)

SimpleRDF.parse = parser.parse.bind(parser)

var storeFormats = {parsers:{}}
storeFormats.parsers['text/turtle'] = N3Parser
storeFormats.parsers['application/trig'] = N3Parser
storeFormats.parsers['application/ld+json'] = JsonLdParser
storeFormats.parsers['application/activity+json'] = JsonLdParser
storeFormats.parsers['application/xhtml+xml'] = RdfaParser
storeFormats.parsers['text/html'] = RdfaParser

exports.store = new LdpStore(storeFormats)
exports.SimpleRDF = SimpleRDF