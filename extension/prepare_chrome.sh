#!/bin/bash
EXT_DIRNAME=./Dokieli_Chrome

rm -rf $EXT_DIRNAME

mkdir -pv $EXT_DIRNAME
mkdir -pv $EXT_DIRNAME/media/css
mkdir -pv $EXT_DIRNAME/media/fonts
mkdir -pv $EXT_DIRNAME/media/images
mkdir -pv $EXT_DIRNAME/scripts




SRC_DIR=.

cp -va $SRC_DIR/extension-background.js      $EXT_DIRNAME/
cp -va $SRC_DIR/extension-content-script.js  $EXT_DIRNAME/

cp -va $SRC_DIR/browser.js    $EXT_DIRNAME/
cp -va $SRC_DIR/manifest.json $EXT_DIRNAME/


SRC_DIR=..

sh $SRC_DIR/scripts/build.editor.sh

cp -va $SRC_DIR/media/css/do.css               $EXT_DIRNAME/media/css/
cp -va $SRC_DIR/media/css/editor.css           $EXT_DIRNAME/media/css/
cp -va $SRC_DIR/media/css/font-awesome.min.css $EXT_DIRNAME/media/css/

cp -va $SRC_DIR/media/fonts/FontAwesome.otf           $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/cmunbi.otf                $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/cmunbx.otf                $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/cmunrm.otf                $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/cmunti.otf                $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/cmuntt.otf                $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/fontawesome-webfont.eot   $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/fontawesome-webfont.svg   $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/fontawesome-webfont.ttf   $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/fontawesome-webfont.woff  $EXT_DIRNAME/media/fonts/
cp -va $SRC_DIR/media/fonts/fontawesome-webfont.woff2 $EXT_DIRNAME/media/fonts/

cp -va $SRC_DIR/media/images/logo.png                 $EXT_DIRNAME/media/images/
cp -va $SRC_DIR/media/images/logo128.png              $EXT_DIRNAME/media/images/
cp -va $SRC_DIR/media/images/logo16.png               $EXT_DIRNAME/media/images/
cp -va $SRC_DIR/media/images/logo48.png               $EXT_DIRNAME/media/images/

cp -va $SRC_DIR/scripts/do.js                         $EXT_DIRNAME/scripts/
cp -va $SRC_DIR/scripts/medium-editor-tables.min.js   $EXT_DIRNAME/scripts/
cp -va $SRC_DIR/scripts/medium-editor.min.js          $EXT_DIRNAME/scripts/
cp -va $SRC_DIR/scripts/simplerdf.js                  $EXT_DIRNAME/scripts/

