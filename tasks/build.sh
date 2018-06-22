#!/usr/bin/env sh

# Halt the build process if any one script fails
set -e

yarn test
./tasks/subtasks/lint.sh
./tasks/subtasks/cleanAssets.sh

./tasks/subtasks/scriptsProd.sh &
./tasks/subtasks/stylesProd.sh

wait
