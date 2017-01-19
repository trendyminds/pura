#!/usr/bin/env sh

./tasks/subtasks/cleanAssets.sh
./tasks/subtasks/modernizr.sh
./tasks/subtasks/stylesWatch.sh &
./tasks/subtasks/scriptsWatch.sh &
./tasks/subtasks/createSprite.sh &
./tasks/subtasks/browsersync.sh &
wait
