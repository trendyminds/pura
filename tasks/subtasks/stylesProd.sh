#!/usr/bin/env sh

./node_modules/.bin/postcss\
  -c ./tasks/configs/postcss.config.js\
  -o ./app/assets/_compiled/styles.css\
  ./app/assets/styles/styles.css

./node_modules/.bin/cleancss\
  app/assets/_compiled/styles.css\
  -o app/assets/_compiled/styles.css
