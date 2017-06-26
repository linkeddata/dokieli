# dokieli

[![Join the chat at https://gitter.im/linkeddata/dokieli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/linkeddata/dokieli)

There is no root, authority, or centralisation here. Control yourself!

dokieli is a decentralised article authoring, annotation, and social
notification tool which works from Web browsers. It is built with the
following principles in mind: accessibility, decentralisation,
interoperability, openness.

It can be used as a:
* single-page application - open any dokieli article
* browser extension - import this repository in your Web browser

An extended description of its design and architecture is available here:
[Decentralised Authoring, Annotations and Notifications for a Read-Write-Web
with dokieli](http://csarven.ca/dokieli-rww)


## Features
* In-browser document authoring and formatting, and semantic enrichments (RDFa annotations)
* Content negotiation is possible for RDFa, Turtle, JSON-LD, RDF/XML.
* Information is represented and retrieved following the Linked Data design principles
* Employs [WebID](https://www.w3.org/2005/Incubator/webid/spec/identity/), [WebID+TLS](https://www.w3.org/2005/Incubator/webid/spec/tls/), [Web Access Control](https://www.w3.org/wiki/WebAccessControl)/ACL and personal online datastore where applicable (compliant with [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid](https://github.com/solid/solid-spec) servers)
* Uses author's information from their online profile (WebID)
* Creation of new documents from any existing dokieli document - part of *self-replication*
* Save document and its dependencies to a new location (anywhere on the Web given access) - part of *self-replication*
* Open and edit (HTML+RDFa) URLs
* Uses W3C [Web Annotation Model](https://www.w3.org/TR/annotation-model/) and [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary)
* Annotations (e.g., replies, peer-reviews, liking, resharing, bookmarking)
* Inbox notifications for annotations and social sharing (implements W3C [Linked Data Notifications](https://www.w3.org/TR/ldn/))
* Assign license (e.g., [Creative Commons](https://creativecommons.org/)) to the contributions/annotations
* Uses [schema.org](http://schema.org/), [SPAR Ontologies](http://www.sparontologies.net/), [PROV-O](https://www.w3.org/TR/prov-o/)
* Assignment of URI fragments (to whatever is of interest) so that other resources on the Web can reference
* Embedding data blocks, e.g., Turtle, N-Triples, JSON-LD, TriG (Nanopublications)
* Embedding of media objects, tables, and interactions
* Automated references and citations (retrieves and reuses structured information)
* Insertion of table of contents, figures, tables, abbreviations
* Drag and drop to reorganize the document's sections and table of contents
* In-browser local storage, and document exporting
* Document metadata
* Views for screen and print (e.g., ACM, LNCS) - yes, you can output to a *paper user interface*: PDF
* .. and [many more on the way](https://github.com/linkeddata/dokieli/issues/)

"Yea, okay, whatever, it doesn't do x, y, z!" You are welcome to create [issues](https://github.com/linkeddata/dokieli/issues/), [discuss](https://gitter.im/linkeddata/dokieli), or pull requests. Make it so!


## Screencasts
Also available on https://dokie.li/ (with captions):

* Overview: http://dokie.li/media/video/dokieli.webm (a little old, see shorter/newer Annotation below)
* Annotation: http://dokie.li/media/video/dokieli-annotation.webm
* Share: http://dokie.li/media/video/dokieli-share.webm
* Citation: http://dokie.li/media/video/dokieli-citation.webm
* Sparqlines: http://dokie.li/media/video/dokieli.webm (see also [article](http://csarven.ca/sparqlines))


## Examples

See the growing list of [examples in the
wild](https://github.com/linkeddata/dokieli/wiki#examples-in-the-wild). Add
the URLs of your articles or interactions to the list.

This repository is published and accessible from
[https://dokie.li/](https://dokie.li/). dokie.li is intended to demo and
exemplify what we can do with this technology. You are welcome to use and
experiment with dokieli there, or anywhere else you come across a dokieli
document.

For the scholars among us, see the authoring guidelines below. View the ACM
guidelines using the LNCS typographical rules, and vice versa (see the menu) ;)
* [ACM SIG Proceedings Paper](https://dokie.li/acm-sigproc-sp)
* [LNCS Author Guidelines](https://dokie.li/lncs-splnproc)


## Dependencies
* Read: client either loads local HTML files or fetches remote URLs, in that case
the host sends HTML etc. All content is accessible at minimum from a text-browser
* Local write: Web browser with JavaScript enabled (use export or local storage)
* Remote write and access control: above plus WebID and personal online storage

These libraries *optional* when dokieli is used as single-page application:

* [SimpleRDF](https://github.com/nicola/simplerdf) (MIT License) used for RDF
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome) (SIL OFL 1.1 / MIT License)
* [MediumEditor](https://github.com/yabwe/medium-editor) (MIT License)


## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)


## Contributors
* [Sarven Capadisli](https://github.com/csarven)
* [Amy Guy](https://github.com/rhiaro)
* [Chris Chapman](https://github.com/cdchapman)
* [Renato Stauffer](https://github.com/reni99)
* [Kingsley Idehen](https://github.com/kidehen) (and [OpenLink Software](https://github.com/openlink))
* [Ruben Taelman](https://github.com/rubensworks)

### Acknowledgements
* [Nicola Greco](https://github.com/nicola)
* [Tim Berners-Lee](https://github.com/timbl)
* [Melvin Carvalho](https://github.com/melvincarvalho)
* [Andrei Vlad Sambra](https://github.com/deiu)
* [Dmitri Zagidulin](https://github.com/dmitrizagidulin)
* [Sandro Hawke](https://github.com/sandhawke)
* [Amy van der Hiel](https://github.com/amyvdh)
* [Henry Story](https://github.com/bblfish)

## How to contribute
* Use it. Break it. Report it. Fix it! See [issues](https://github.com/linkeddata/dokieli/issues/).
* Improve documentation (for the website or repository)
* Publish articles with it.
* Join the [dokieli chat](https://gitter.im/linkeddata/dokieli) for help and discussion.
* Encourage the ideas/movement and however else you want to contribute.
