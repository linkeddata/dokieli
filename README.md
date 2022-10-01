
# dokieli

[![Join the chat at https://gitter.im/linkeddata/dokieli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/linkeddata/dokieli)

There is no root, authority, or centralisation here. Control yourself!

dokieli is a decentralised article authoring, annotation, and social
notification tool which works from Web browsers. It is built with the
following principles in mind: freedom of expression, decentralisation,
interoperability, and accessibility.

It can be used as a:

* single-page application - open any dokieli embedded article
* browser extension - import this repository in your Web browser or install
Web Extension from [Chrome Web Store](https://chrome.google.com/webstore/detail/ddmhaonbhodhgkaljpjlglodncddalid) or [Add-ons for Firefox](https://dokie.li/docs#web-extension)

## License

* Code: [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* Content: [Creative Commons Attribution 4.0 Unported](https://creativecommons.org/licenses/by/4.0/)

## Documentation

* For brave developers and authors: the canonical [documentation](https://dokie.li/docs)
explains dokieli's principles, architectural and design patterns.
* For academics: [Decentralised Authoring, Annotations and Notifications for a Read-Write-Web with dokieli](http://csarven.ca/dokieli-rww)

## Specifications

* Information is represented and retrieved following the [Linked Data](https://www.w3.org/DesignIssues/LinkedData) design principles.
* [WebID](https://www.w3.org/2005/Incubator/webid/spec/identity/) for personal/agent identities.
* [WebID-TLS](https://www.w3.org/2005/Incubator/webid/spec/tls/) and [WebID-OIDC](https://github.com/solid/webid-oidc-spec) for authentication.
* [Web Access Control](https://solidproject.org/TR/wac)/ACL to set permissions on Web resources.
* W3C [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid Protocol](https://solidproject.org/TR/protocol) servers to read and write Web resources.
* W3C [Linked Data Notifications](https://www.w3.org/TR/ldn/) for inbox notifications for annotations and social sharing.
* W3C [ActivityPub](https://www.w3.org/TR/activitypub/) client to read/write from/to profile's outbox.
* W3C [Web Annotation Model](https://www.w3.org/TR/annotation-model/), W3C [Web Annotation Vocabulary](https://www.w3.org/TR/annotation-vocab/), W3C [Embedding Web Annotations in HTML](https://www.w3.org/TR/annotation-html), and W3C [Selectors and States](https://www.w3.org/TR/selectors-states/) to model and identify annotations (eg. replies, peer-reviews, liking, resharing, bookmarking)
* W3C [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary) for social activities.
* W3C [ODRL Information Model](https://www.w3.org/TR/odrl-model/) and W3C [ODRL Vocabulary & Expression](https://www.w3.org/TR/odrl-vocab/) to represent statements about the usage of content and services.
* [Memento](https://tools.ietf.org/html/rfc7089) for resource management eg. TimeMap.
* [Creative Commons](https://creativecommons.org/) to assign license to individual contributions and annotations.
* [Robust Links](http://robustlinks.mementoweb.org/) for hyperlinks eg. citations, and to show Link Decoration.
* [schema.org](http://schema.org/), [SPAR Ontologies](http://www.sparontologies.net/), [PROV-O](https://www.w3.org/TR/prov-o/), and various other vocabularies.

## Features

* In-browser document authoring and formatting, and semantic enrichments (RDFa annotations).
* Content negotiation is possible for RDFa, Turtle, JSON-LD, RDF/XML.
* Uses author's information from their online profile (WebID).
* Creation of new documents from any existing dokieli document - part of *self-replication*.
* Save document and its dependencies to a new location (anywhere on the Web given access) - part of *self-replication*.
* Open and edit (HTML+RDFa) URLs.
* Individually assign the language of articles and annotations and parts within.
* Assignment of URI fragments (to any unit of significance) so that other resources on the Web can link to it.
* Implements versioning and has the notion of immutable resources.
* Embedding data blocks, e.g., Turtle, N-Triples, JSON-LD, TriG (Nanopublications).
* Embedding of media objects, tables, and interactions.
* Automated references and citations (retrieves and reuses structured information).
* Insertion of table of contents, figures, tables, abbreviations.
* Drag and drop to reorganize the document's sections and table of contents.
* In-browser local storage, and document exporting.
* Document metadata.
* Views for screen and print (e.g., ACM, LNCS) - yes, you can output to a *paper user interface*: PDF
* .. and [many more on the way](https://github.com/linkeddata/dokieli/issues/).

"Yea, okay, whatever, it doesn't do *x*, *y*, *z*!" You are welcome to create [issues](https://github.com/linkeddata/dokieli/issues/), [discuss](https://gitter.im/linkeddata/dokieli), or pull requests. Make it so!

## Screencasts

Also available on <https://dokie.li/> (with captions):

* Overview: <https://dokie.li/media/video/dokieli.webm> (a little old, see shorter/newer Annotation below)
* Annotation: <https://dokie.li/media/video/dokieli-annotation.webm>
* Share: <https://dokie.li/media/video/dokieli-share.webm>
* Citation: <https://dokie.li/media/video/dokieli-citation.webm>
* Sparqlines: <https://dokie.li/media/video/dokieli.webm> (see also [article](http://csarven.ca/sparqlines))

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

These libraries are part of the dokieli distribution:

* [SimpleRDF](https://github.com/nicola/simplerdf) (MIT License) used for RDF.
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome) (CC BY 4.0 License / MIT License) for icons.
* [MediumEditor](https://github.com/yabwe/medium-editor) (MIT License) for document editing.
* [d3](https://github.com/d3/d3) (BSD 3-Clause) used for visualisations.
* [Shower](https://github.com/shower/core) (MIT License) used for slideshows.

## How to contribute

* Use it. Break it. Report it. Fix it! See [issues](https://github.com/linkeddata/dokieli/issues/).
* Improve documentation (for the website or repository)
* Publish articles with it.
* Join the [dokieli chat](https://gitter.im/linkeddata/dokieli) for help and discussion.
* Encourage the ideas/movement and however else you want to contribute.

## Development

* General background in [dokieli documentation](https://dokie.li/docs).
* See [fork a repo](https://help.github.com/articles/fork-a-repo/) to setup
your own development repository and stay
[synchronised](https://help.github.com/articles/syncing-a-fork). Useful later
to make pull requests. For example, using your fork at `https://github.com
/YOUR-USERNAME/dokieli` :

```text
# Clone your work repository, for example:
git clone git@github.com:YOUR-USERNAME/dokieli
cd dokieli

# Add the main repository to sync with
git remote add upstream https://github.com/linkeddata/dokieli

# Make sure to work off your main and synchronised
git checkout main
git fetch upstream
git merge upstream/main

# Install packages
npm ci

# Check out a branch for your changes
git checkout -b YOUR-WORK-BRANCHNAME

# Make your code updates at src/ , media/ etc.

# Build eg. to create scripts/dokieli.js
npm run build

# or automatically rebuild when files change
npm run watch

# or create a minified scripts/dokieli.js
npm run minify

# Test your changes, if all okay:

# Note: The add/commit lines below can be combined with `commit -am`
# If including scripts/dokieli.js, make sure that it is the minified version

# Add the changes you've made to staging
git add PATH/TO/FILE

# Commit staged changes with a useful message
git commit -m "Add x to do y"

# Push changes to your work repository
git push
```

Pull requests should be a single commit. It keeps the commit log concise and
helps a lot towards the review process. There should not be any commits about
merges or reverts in the commit history. See GitHub's [pull
requests](https://help.github.com/articles/about-pull-requests/) for the
remaining steps on how to propose your changes to be brought into dokieli's
repository.

## Tests

### Unit tests

dokieli uses [Jest](https://jestjs.io/) for unit tests. 

To run unit tests, run `npm test`.

Coverage reports are collected in `tests/coverage`.

### End-to-end tests

dokieli uses [Playwright](https://playwright.dev/) for end-to-end tests. 

To run end to end tests, run `npm run test:e2e`. 

Reports are collected in `playwright-report`.

## Supported By

* [Crosscloud](http://crosscloud.org/) (2015-10 — 2016-09)
* [MIT CSAIL](https://www.csail.mit.edu/) (2015-10 — 2016-09)

## Contributors

* [Amy Guy](https://github.com/rhiaro)
* [Amy van der Hiel](https://github.com/amyvdh)
* [Andrei Vlad Sambra](https://github.com/deiu)
* [Ben Companjen](https://github.com/bencomp)
* [Benjamin Young](https://github.com/bigbluehat)
* [Chris Chapman](https://github.com/cdchapman)
* [Dmitri Zagidulin](https://github.com/dmitrizagidulin)
* [Gerben Treora](https://github.com/treora)
* [Henry Story](https://github.com/bblfish)
* [Herbert Van de Sompel](https://github.com/hvdsomp)
* [Kingsley Idehen](https://github.com/kidehen)
* [Melvin Carvalho](https://github.com/melvincarvalho)
* [Nicola Greco](https://github.com/nicola)
* [Pascal Christoph](https://github.com/dr0i)
* [Renato Stauffer](https://github.com/reni99)
* [Ruben Taelman](https://github.com/rubensworks)
* [Ruben Verborgh](https://github.com/RubenVerborgh)
* [Sandro Hawke](https://github.com/sandhawke)
* [Sarven Capadisli](https://github.com/csarven) (maintainer)
* [Sergey Malinin](https://github.com/smalinin)
* [Thomas Bergwinkl](https://github.com/bergos)
* [Tim Berners-Lee](https://github.com/timbl)
* [Virginia Balseiro](https://github.com/VirginiaBalseiro)
