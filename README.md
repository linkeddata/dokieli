# dokieli

[![Join the chat at https://gitter.im/linkeddata/dokieli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/linkeddata/dokieli)

There is no root, authority, or centralisation here. Control yourself!

dokieli is a decentralised article authoring, annotation, and social
notification tool which works from a Web browser. While it is a general purpose
tooling to write articles, it is fully compliant with the [Linked
Research](https://linkedresearch.org/) initiative and principles, and provides
features and interactions for scholarly communication.

dokieli's architecture is progressively enhanced such that articles are
accessible anywhere from a text-browser to Firefox Nightly. Articles and
annotations can be `curl`ed and dereferenced to get the complete content in HTML
and RDF. Articles can be authored both online and offline.

Where applicable, dokieli can employ participant's e.g., authors, reviewers,
commenters, WebID and personal online datastores to store and give different
access controls to the information to different participants. Similarly, anyone
that wants to annotate can store their notes at a Webspace in which they
control.


## Features
* In-browser document authoring and formatting, and semantic enrichments (RDFa annotations)
* Information is represented and retrieved following the Linked Data design principles
* Employs [WebID](https://www.w3.org/2005/Incubator/webid/spec/identity/), [WebID+TLS](https://www.w3.org/2005/Incubator/webid/spec/tls/), [Web Access Control](https://www.w3.org/wiki/WebAccessControl)/ACL and personal online datastore where applicable (compliant with [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid](https://github.com/solid/solid-spec) servers)
* Uses author's information from their online profile (WebID)
* Creation of new documents from any existing dokieli document - part of *self-replication*
* Save document and its dependencies to a new location (anywhere on the Web with LDP support) - part of *self-replication*
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

"Yea, okay, whatever, but it doesn't do x, y, z!" -- We hear ye! You are welcome to create [issues](https://github.com/linkeddata/dokieli/issues/), [discuss](https://gitter.im/linkeddata/dokieli), or pull requests. Make it so!


## Screencasts
Also available on https://dokie.li/ (with captions):

* Overview: http://dokie.li/media/video/dokieli.webm (a little old, see shorter/newer Annotation below)
* Annotation: http://dokie.li/media/video/dokieli-annotation.webm
* Share: http://dokie.li/media/video/dokieli-share.webm
* Citation: http://dokie.li/media/video/dokieli-citation.webm
* Sparqlines: http://dokie.li/media/video/dokieli.webm (see also [article](http://csarven.ca/sparqlines))


## Examples
See the growing list of [examples in the
wild](https://github.com/linkeddata/dokieli/wiki#examples-in-the-wild) in the
wiki. Add the URLs of your articles or interactions to the list.

This repository is published and accessible from
[https://dokie.li/](https://dokie.li/). dokie.li is intended to demo and
exemplify what we can do with this technology. You are welcome to use and
experiment with dokieli there, or anywhere else you come across a dokieli
document.

For the scholars among us, see the authoring guidelines below. View the ACM
guidelines using the LNCS typographical rules, and vice versa (see the menu) ;)
* [ACM SIG Proceedings Paper](https://dokie.li/acm-sigproc-sp)
* [LNCS Author Guidelines](https://dokie.li/lncs-splnproc)


## Design
There is nothing to install or setup, out of band tooling or account creations
for its core functionality. The Web browser is the only requirement. It is
entirely progressively enhanced (complete separation of structure/data,
presentation, and behaviour layers): intended to minimize friction in publishing
and consuming. Works on local machine, and is functional from ground up.
Additional features can be used with the "pay-as-you-go" design approach e.g.,
if authors or reviewers have a WebID and a personal storage space, their
feedback can be under their full control, meanwhile allowing who it can be
visible to or writeable for. If they don't, or the authors don't wish to enable
open dialogue, that's okay too.

It works towards [acid test and user stories](http://csarven.ca/linked-research-scholarly-communication#user-stories)
where authors and all Webizens can publish and consume, and participate in
discussions meanwhile having human and machine-friendly information all within
their control.

dokieli is not perfect, but it is intended to evolve based on our collective
experience and pave the way for tooling with interopability in mind.


## Dependencies
Again, dokieli is progressively enhanced ("pay-as-you-go"). You can always use
curl or links/lynx from command-line and get all the content which includes
triple statements in RDFa, and optionally in Turtle, N-Triples, JSON-LD, TriG
(Nanopublications).

* For the purpose of reading, the only requirement is to serve the HTML+RDFa
and referenced files from a directory on your Web server. "Drag and drop"!
* If you want to write the document from within your Web browser, well, .. you
need a Web browser ;)
* If you have a WebID and a personal online storage, you can author your
documents wherever you like on the Web, and you can decide who gets to read and
write, e.g., your co-authors, or reviewers.
* If you want to work offline or on your local machine, open a dokieli file in
your Web browser and edit. You have the option to export the document or use
the Web browser's native local storage.

The libraries listed below are *optional* and progressively enhance the
interactions.

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
* Your name here. See below :)

## Acknowledgements
* [Nicola Greco](https://github.com/nicola)
* [Tim Berners-Lee](https://github.com/timbl)
* [Melvin Carvalho](https://github.com/melvincarvalho)
* [Andrei Vlad Sambra](https://github.com/deiu)
* [Dmitri Zagidulin](https://github.com/dmitrizagidulin)
* [Sandro Hawke](https://github.com/sandhawke)
* [Amy van der Hiel](https://github.com/amyvdh)
* [Henry Story](https://github.com/bblfish)
* Your name here. See below :)

## How to contribute
* Use it! Break things. Report [issues](https://github.com/linkeddata/dokieli/issues/) and document.
* Fix issues.
* Improve documentation (for the website or repository)
* Join the [dokieli chat](https://gitter.im/linkeddata/dokieli) for help and discussion.
* Request new features.
* Publish articles with it.
* Encourage the ideas/work/movement.
* .. and however else you want to contribute.
