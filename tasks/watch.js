const execa = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: '🗑  Purge old assets',
    task: () => execa.shell("./tasks/subtasks/cleanAssets.sh")
  },
  {
    title: '🕓  Watching...',
    task: () => {
      return new Listr([
        {
          title: '🚧  Compiling new CSS changes',
          task: () => execa.shell("./tasks/subtasks/stylesWatch.sh")
        },
        {
          title: '🚧  Compiling new JS changes',
          task: () => execa.shell("./tasks/subtasks/scriptsWatch.sh")
        },
        {
          title: '🏞  Compiling sprite changes',
          task: () => execa.shell("node ./tasks/subtasks/watchSprite.js")
        },
        {
          title: '🖥  Running Browsersync at http://localhost:3000',
          task: () => execa("./tasks/subtasks/browsersync.sh")
        }
      ], { concurrent: true });
    }
  }
]);

tasks.run().then(msg => {
  console.log(msg);
}).catch(err => {
  console.error(err.message);
});
