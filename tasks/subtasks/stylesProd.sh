#!/usr/bin/env sh

./node_modules/.bin/node-sass\
  ./app/assets/styles/styles.scss\
  --importer node_modules/node-sass-import\
  --output-style compressed\
  app/assets/_compiled/styles.css;

./node_modules/.bin/postcss\
  ./app/assets/_compiled/styles.css\
  --use autoprefixer\
  -o ./app/assets/_compiled/styles.css\
  --no-map
