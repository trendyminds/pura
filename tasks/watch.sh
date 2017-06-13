#!/usr/bin/env sh

# Halt the build process if any one script fails
set -e

./tasks/subtasks/cleanAssets.sh

./tasks/subtasks/stylesWatch.sh &
./tasks/subtasks/scriptsWatch.sh &
./tasks/subtasks/browsersync.sh

wait
