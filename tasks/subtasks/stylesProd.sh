#!/usr/bin/env sh

./node_modules/.bin/postcss\
  -c ./tasks/configs/postcss.config.js\
  -o ./src/_compiled/styles.css\
  ./src/assets/styles/styles.css

./node_modules/.bin/cleancss\
  src/_compiled/styles.css\
  -o src/_compiled/styles.css
