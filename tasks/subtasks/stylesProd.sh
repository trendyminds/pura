#!/usr/bin/env sh

./node_modules/.bin/postcss\
  --config ./tasks/configs/postcss.config.js\
  --output ./src/_compiled/styles.css\
  ./src/assets/styles/styles.css

./node_modules/.bin/cleancss\
  src/_compiled/styles.css\
  --output src/_compiled/styles.css
