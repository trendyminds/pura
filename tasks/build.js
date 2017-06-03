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
        }
      ], { concurrent: true });
    }
  }
]);

tasks.run().catch(err => {
  console.error(err.message);
});
