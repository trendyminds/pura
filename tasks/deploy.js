const execa = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: '🚧  Version and minify assets',
    task: () => {
      return new Listr([
        {
          title: 'Version Assets',
          task: () => execa.shell('node ./tasks/subtasks/revAssets.js')
        },
        {
          title: 'Minify Images',
          task: () => execa.shell('node ./tasks/subtasks/minifyImages.js')
        }
      ], { concurrent: true });
    }
  }
]);

tasks.run().catch(err => {
  console.error(err.message);
});
