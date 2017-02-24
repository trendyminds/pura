#!/usr/bin/env sh

./node_modules/.bin/stylelint './app/assets/styles/**/*.css' &&
./node_modules/.bin/xo './app/assets/scripts/**/*.js'
