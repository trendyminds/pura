#!/usr/bin/env sh

stylelint './src/assets/**/*.css' &&
eslint --ext .jsx,.js src/assets/
