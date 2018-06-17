#!/usr/bin/env sh

./node_modules/.bin/stylelint './src/assets/**/*.css' --color &&
./node_modules/.bin/eslint './src/assets/**/*.js' --color
