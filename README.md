# dokieli

[![Join the chat at https://gitter.im/linkeddata/dokieli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/linkeddata/dokieli)

dokieli is a decentralized article authoring, annotation, and social pingback tool which works from a Web browser. While it is a general purpose tooling to write articles, it is fully compliant with the [Linked Research](https://github.com/csarven/linked-research) initiative and principles, and provides features and interactions for scholarly communication. Its architecture is progressively enhanced such that dokieli based articles are accessible anywhere from a Line Mode Browser to Firefox Nightly. Article or annotations can be `curl`ed and deferenced to get the complete content in HTML and RDF.

dokieli can employ WebID and personal online datastores where applicable for authors to store and give different access controls to the others e.g., co-authors, reviewers, or for general social interactions and feedback. Similarly, anyone that wants to annotate can store their notes at a webspace in which they control.


## Features
* In-browser document authoring and formatting, and semantic enrichments
* Information is represented and retrieved following the Linked Data design principles
* Employs WebID + ACL and personal online datastore where applicable (compliant with [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid](https://github.com/solid/solid-spec) servers)
* Using author's information from their online profile
* Creation of new documents from any dokieli document (anywhere on the Web given write access)
* Annotations and pingbacks (e.g., replies, peer-reviews, liking, resharing). Uses W3C Web Annotation and Social Web data models
* Assignment of URI fragments (to whatever is of interest) for other resources to reference
* Embedding data blocks (e.g., nanopublications)
* Embedding of media objects, tables, and interactions
* Automated references and citations
* Insertion of table of contents, figures, tables, abbreviations
* Drag and drop to reorganize the document's sections and table of contents
* In-browser local storage, and document exporting
* Document metadata
* Views for screen and print (e.g., ACM, LNCS) - yes, you can output to a paper user interface: PDF


## Examples
See the growing list of [examples in the wild](https://github.com/linkeddata/dokieli/wiki#examples-in-the-wild) in the wiki. Add the URLs of your article or interactions to the list.

This repository is published and accessible from [https://dokie.li/](https://dokie.li/).
dokie.li is intended to demo and exemplify what we can do with this technology.
You are welcome to use and experiment with dokieli there. You might also come
across it in the wild. There is no root, authority, or centralisation. If you
spot it, lets fix and improve together.

For the scholars among us, see the authoring guidelines below. View the ACM
guidelines using the LNCS typographical rules, and vice versa (see the menu) ;)
* [ACM SIG Proceedings Paper](http://linked-research.270a.info/acm-sigproc-sp)
* [LNCS Author Guidelines](http://linked-research.270a.info/lncs-splnproc)


## Design
There is nothing to install or setup, out of band tooling or account creations
for its core functionality. The Web browser is the only requirement. Reasonable?
It is entirely progressively enhanced: intended to minimize friction in
publishing and consuming. Works on local machine, and is functional from ground
up. Additional features can be used with the "pay-as-you-go" design approach
e.g., if authors or reviewers have a WebID and a personal storage space, their
feedback can be under their full control, meanwhile allowing who it can be
visible to. If they don't, or the authors don't wish to enable open dialogue,
that's okay too.

It works towards a solution e.g., proposed [acid test](http://csarven.ca/enabling-accessible-knowledge#acid-test) where authors and Webizens can both publish and consume,
and participate in discussions meanwhile having human and machine-friendly
information all within their control. Keep #dokieli #LinkedResearch #ControlYourself in mind.

dokieli is not perfect, but it is intended to evolve based on our collective
experience.

## Dependencies
Again, dokieli is progressively enhanced ("pay-as-you-go"). You can always use
curl or links/lynx from command-line and get all the content which includes
triple statements in RDFa.

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

The "dependencies" listed below only enhance the interaction for authoring.
They are entirely optional. We intended to further cut down on the dependent
libraries as we work out the optimizations.

* [jQuery Core](http://jquery.com/) (MIT License)
* [html5sortable](https://github.com/voidberg/html5sortable) (MIT License)
* [Shower](https://github.com/shower/shower) (MIT License) used for slideshows
* [Simplerdf](https://github.com/nicola/simplerdf) (MIT License) used for RDF
* [Green Turtle](https://github.com/alexmilowski/green-turtle) (MIT License) for RDFa
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome) (SIL OFL 1.1 / MIT License)
* [MediumEditor](https://gitter.im/yabwe/medium-editor) (MIT License)


## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)


## How to contribute
* Use it! Share your work with the others.
* Enable your colleagues to the same.
* Join the [dokieli chat](https://gitter.im/linkeddata/dokieli) for help and discussion.
* Break things. Report issues and document. Resolve issues.
* Optimize. Work on features.


## What does dokieli mean?
It is derived from "okie dokie" and "linked". You can pronounce just like Ned
Flanders from The Simpsons.
