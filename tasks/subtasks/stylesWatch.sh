#!/usr/bin/env sh

./node_modules/.bin/postcss\
  -c ./tasks/configs/postcss.config.js\
  -o ./src/_compiled/styles.css\
  ./src/assets/styles/styles.css\
  -w
