#!/usr/bin/env sh

./node_modules/.bin/stylelint './app/assets/styles/**/*.css' &&
./node_modules/.bin/eslint './app/assets/scripts/**/*.js' --cache
