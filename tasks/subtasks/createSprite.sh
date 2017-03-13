#!/usr/bin/env sh

rm -rf ./_sprite
./node_modules/.bin/svg-sprite --config ./tasks/configs/sprite.json ./app/assets/images/icons/*.svg
mv ./_sprite/_sprite.css ./app/assets/styles/base/_sprite.css
mv ./_sprite/sprite.svg ./app/assets/images/sprites/sprite.svg
rm -rf ./_sprite
