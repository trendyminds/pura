#!/usr/bin/env sh

postcss\
  --config ./tasks/configs/postcss.config.js\
  --output ./src/_compiled/app.css\
  ./src/assets/app.css

cleancss\
  src/_compiled/app.css\
  --output src/_compiled/app.css
