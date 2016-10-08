#!/usr/bin/env sh

node ./tasks/subtasks/lintCSS.js
#./node_modules/.bin/stylelint './app/assets/styles/**/*.css'
./node_modules/.bin/eslint './app/assets/scripts/**/*.js'
echo 'asdf'
