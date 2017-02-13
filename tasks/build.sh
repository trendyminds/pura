#!/usr/bin/env sh

# Halt the build process if any one script fails
set -e

./tasks/subtasks/lint.sh
./tasks/subtasks/cleanAssets.sh

./tasks/subtasks/scriptsProd.sh &
./tasks/subtasks/stylesProd.sh &
./tasks/subtasks/createSprite.sh &
./tasks/subtasks/cleanDist.sh &

wait

./tasks/subtasks/copyDist.sh

node ./tasks/subtasks/versionSprite.js
node ./tasks/subtasks/versionAssets.js

node ./tasks/subtasks/minifyImages.js &
./tasks/subtasks/cleanDistAssets.sh &

wait
