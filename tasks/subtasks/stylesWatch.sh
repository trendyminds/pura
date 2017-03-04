#!/usr/bin/env sh

./node_modules/.bin/node-sass app/assets/styles/styles.css -w --importer node_modules/node-sass-import ./.tmp/styles.css | ./node_modules/.bin/postcss ./.tmp/styles.css -u autoprefixer -o ./app/assets/_compiled/styles.css -w
