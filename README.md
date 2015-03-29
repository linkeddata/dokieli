# Linked Research

**Objective**: to enable researchers (in Web Science for example), to share and
reuse research knowledge by employing the native Web stack. This was
practically a solved problem 25 years ago, but here we are.

Linked Research is set out to socially and technically enable researchers to
take full control, ownership, and responsibility of their own knowledge, and
have their contributions accessible to the society at maximum capacity, by
dismantling the use of archaic and artificial barriers.

This is to work towards a solution where researchers can publish and consume
research documents that are both human and machine-friendly.

See also a proposed [acid test](http://csarven.ca/enabling-accessible-knowledge#acid-test)
aimed at this.

## Documentation
There is a [living documentation](http://linked-research.270a.info/linked-research.html)
(“nightly”) published as part of this repository. It is not versioned.

## Dive into Linked Research

Linked Research's technical approach:

Linked Research is a single <a href="http://dev.w3.org/html5/html-polyglot/">HTML 5 Polyglot</a>
document. Different CSS are used to present the information for different media
e.g., screen, print. JavaScript is used to <em>progressively enhance</em> the
document and bring in interactivity. In a nutshell, the minimum viable product
encloses the following:

* Documents are human and machine-<em>friendly</em>. Preferably humans first,
machines second (details).
* Using the <em>plain old semantic HTML</em> marking process, with further
semantic annotations using microformats and RDF.
* No server required. Works on local machine.
* No installation. No account creation.
* No out of band tooling required. Your Web browser is the only requirement.
* Using Apache License and CC0, and compatibilities where necessary.

See the [examples in the wild](https://github.com/csarven/linked-research/wiki#examples-in-the-wild)
in the wiki. Add the URLs to your articles!

This repository is published and accessible from [http://linked-research.270a.info/](http://linked-research.270a.info/) , e.g:

* `http://linked-research.270a.info/{filename}` (without .html)
* [ACM SIG Proceedings Paper](http://linked-research.270a.info/acm-sigproc-sp)
* [LNCS Author Guidelines](http://linked-research.270a.info/lncs-splnproc)

## Dependencies

The dependencies listed below are only enhancements, and so they are optional.
Everything is still functional from ground up (whether you are using a Line Mode
Browser or Firefox Nightly). If you do not want them, they can be removed or
turned-off without effecting core HTML or CSS.

* [jQuery Core](http://jquery.com/) (MIT License)
* [html5sortable](https://github.com/voidberg/html5sortable) (MIT License)
* [Shower](https://github.com/shower/shower) (MIT License)

## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## How to contribute
* Use it! Provide URLs to your work (see examples)
* Enable your colleagues to the same.
* Break things.
* Report issues and document.
* Resolve issues.
* Optimize.
* Work on features.
