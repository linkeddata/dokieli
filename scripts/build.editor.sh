#!/bin/sh

sources="../media/css/medium-editor.css ../media/css/medium-editor-default.css ../media/css/medium-editor-tables.css";

echo > ../media/css/editor.css

for i in "$sources"; do cat $i >> ../media/css/editor.css ; done
