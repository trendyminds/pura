#!/usr/bin/env sh

./tasks/subtasks/cleanAssets.sh
./tasks/subtasks/stylesWatch.sh &
./tasks/subtasks/scriptsWatch.sh &
node ./tasks/subtasks/watchSprite.js &
./tasks/subtasks/browsersync.sh &
wait
