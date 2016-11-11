#!/usr/bin/env sh

./node_modules/.bin/postcss -c ./tasks/configs/postcss.js
./node_modules/.bin/cleancss -o ./app/assets/_compiled/styles.css ./app/assets/_compiled/styles.css --safe
