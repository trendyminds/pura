#!/usr/bin/env sh

# Halt the build process if any one script fails
set -e

node ./tasks/subtasks/revAssets.js

wait
