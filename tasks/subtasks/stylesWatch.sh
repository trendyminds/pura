#!/usr/bin/env sh

./node_modules/.bin/postcss\
  --config ./tasks/configs/postcss.config.js\
  --output ./src/_compiled/app.css\
  ./src/assets/app.css\
  --watch
