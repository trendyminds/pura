#!/usr/bin/env sh

./node_modules/.bin/postcss\
  --config ./tasks/configs/postcss.config.js\
  --output ./src/_compiled/app.css\
  ./src/assets/app.css

./node_modules/.bin/cleancss\
  src/_compiled/app.css\
  --output src/_compiled/app.css
