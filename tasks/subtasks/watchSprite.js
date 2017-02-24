const fs = require('fs');
const exec = require('child_process').exec;
const cmd = './tasks/subtasks/createSprite.sh';
const message = 'The sprite image has been updated.';

// Recreate the sprite when first running the command
exec(cmd, () => {
  console.log(message);
});

// Re-run the command on changes to the directory
fs.watch('./app/assets/images/icons', (eventType, filename) => {
  exec(cmd, () => {
    console.log(message);
  });
});
