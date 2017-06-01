const execa = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: '🐞  Lint all CSS and JS',
    task: () => execa.shell("./tasks/subtasks/lint.sh")
  },
  {
    title: '🗑  Purge old assets',
    task: () => execa.shell("./tasks/subtasks/cleanAssets.sh")
  },
  {
    title: '🚧  Compile new assets',
    task: () => {
      return new Listr([
        {
          title: 'Compile JS',
          task: () => execa.shell("./tasks/subtasks/scriptsProd.sh")
        },
        {
          title: 'Compile CSS',
          task: () => execa.shell("./tasks/subtasks/stylesProd.sh")
        },
        {
          title: 'Minify Images',
          task: () => execa.shell('node ./tasks/subtasks/minifyImages.js')
        }
      ], { concurrent: true });
    }
  },
  {
    title: '📝  Rev assets',
    task: () => execa.shell('node ./tasks/subtasks/revAssets.js')
  }
]);

tasks.run().catch(err => {
  console.error(err.message);
});
