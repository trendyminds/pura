#!/usr/bin/env sh

./node_modules/.bin/stylelint './src/assets/styles/**/*.css' --cache --color &&
./node_modules/.bin/xo './src/assets/scripts/**/*.js' --color
