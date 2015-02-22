# Linked Research

**Objective**: to enable researchers (in Web Science for example), to share and
reuse research knowledge by employing the native Web technology stack. This was
practically a solved problem 25 years ago, but here we are.

Linked Research is set out to socially and technically enable researchers to
take full control, ownership, and responsibility of their own knowledge, and
have their contributions accessible to the society at maximum capacity, by
dismantling the use of archaic and artificial barriers.

This is to work towards a solution where researchers can publish and consume
research documents that are both human and machine-friendly.

See also a proposed [Acid Test](http://csarven.ca/enabling-accessible-knowledge#acid-test)
aimed at this mission:

## Dive into Linked Research

Linked Research's technical approach for MVP:

* One HTML to rule all HTMLs. Used by different CSS - academic paper layouts 
e.g., ACM, LNCS. This is not a yet-another-standard or format! It is POSH (plain
ol' semantic HTML) and RDF, right off W3C specs.
* No external server required. Works on your local machine.
* No installation. Open up index.html in your browser and edit. Or jump start by
copying an example document.
* No account creation. This is not a for-profit third-party service or software.
* No out of band tooling required. Your Web browser is the only requirement.
* Documents are intended to be human and machine-friendly (RDF, microformats)
i.e., they can be used on screen devices as well as be printed.
* Currently using and will try to stick to Apache License and CC0

The example documents in this repository were originally published at:

* [http://csarven.ca/enabling-accessible-knowledge](http://csarven.ca/enabling-accessible-knowledge)
* [http://csarven.ca/sense-of-lsd-analysis](http://csarven.ca/sense-of-lsd-analysis)
* [http://csarven.ca/linked-statistical-data-analysis](http://csarven.ca/linked-statistical-data-analysis)
* [http://csarven.ca/linked-sdmx-data](http://csarven.ca/linked-sdmx-data)
* [http://csarven.ca/call-for-linked-research](http://csarven.ca/call-for-linked-research)
* [http://csarven.ca/statistical-linked-dataspaces](http://csarven.ca/statistical-linked-dataspaces)

This repository is published and accessible from [http://linked-research.270a.info/](http://linked-research.270a.info/)
, e.g:

* [Enabling Accessible Knowledge](http://linked-research.270a.info/enabling-accessible-knowledge.html)
(i.e., `http://linked-research.270a.info/{filename}`)
* [ACM SIG Proceedings Paper](http://linked-research.270a.info/acm-sigproc-sp.html)
* [LNCS Author Guidelines](http://linked-research.270a.info/lncs-splnproc.html)

You are invited to send your Linked Research documents or their URL to be
included here as an example!


### Structure and Semantics

This repository contains a **single** HTML+RDFa template, and stylesheets which 
follows the LNCS, ACM style guidelines. See the examples. The markup structure 
is simple and flexible.

### Presentation

The stylesheets are mostly tested using the Gecko browser engine e.g., Firefox. 
However, the views are also in good condition in other engines e.g., WebKit 
(Chrome, Chromium, Opera), and Trident (Internet Explorer) - your mileage may 
vary. As browser engines improve their CSS implementations, so do these 
stylesheets.

### Interaction

* In browser editing (very soon!) No, you don't have to code HTML or trip over 
RDF syntaxes.
* Visiblity and identifiers for sections and other important enough declared
concepts.
* Document Metadata
* Export to HTML
* Local Storage (in the browser)
* Switch between ACM and LNCS views (without touching the HTML template)
* Other stuff.. stay tuned! `git clone https://github.com/csarven/linked-research.git`
:)

## Dependencies

Linked Research is built with the progressive enhancement strategy. Therefore, the dependencies are only used for JavaScript enhancements. If you do not want them, they can be removed or turned-off without effecting core HTML or CSS.

* [jQuery Core 2.1.3](http://code.jquery.com/jquery-2.1.3.min.js) (MIT License)
* [html5sortable](https://github.com/voidberg/html5sortable) (MIT License)

## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
