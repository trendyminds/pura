#!/usr/bin/env sh

./node_modules/.bin/stylelint './src/assets/styles/**/*.css' --color &&
./node_modules/.bin/xo './src/assets/scripts/**/*.js' --color
