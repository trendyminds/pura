const fs = require('fs');
const exec = require('child_process').exec;
const cmd = './tasks/subtasks/createSprite.sh';

// Recreate the sprite when first running the command
exec(cmd, function(error, stdout, stderr) {
  console.log('The sprite image has been updated.');
});

// Re-run the command on changes to the directory
fs.watch('./app/assets/images/icons', (eventType, filename) => {
  exec(cmd, function(error, stdout, stderr) {
    console.log('The sprite image has been updated.');
  });
});
