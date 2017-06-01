#!/usr/bin/env sh

./node_modules/.bin/postcss\
  -c ./tasks/configs/postcss.config.js\
  -o ./src/assets/_compiled/styles.css\
  ./src/assets/styles/styles.css

./node_modules/.bin/cleancss\
  src/assets/_compiled/styles.css\
  -o src/assets/_compiled/styles.css
