#!/usr/bin/env sh

./node_modules/.bin/stylelint './app/assets/styles/**/*.css' --cache --color &&
./node_modules/.bin/xo './app/assets/scripts/**/*.js' --color
