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
    title: '🚧  Compile build',
    task: () => {
      return new Listr([
        {
          title: 'Compile JavaScript using Webpack',
          task: () => execa.shell("./tasks/subtasks/scriptsProd.sh")
        },
        {
          title: 'Compile CSS using PostCSS',
          task: () => execa.shell("./tasks/subtasks/stylesProd.sh")
        },
        {
          title: 'Build new spritesheet',
          task: () => execa.shell("./tasks/subtasks/createSprite.sh")
        },
        {
          title: 'Purge current dist/ directory',
          task: () => execa.shell("./tasks/subtasks/cleanDist.sh")
        }
      ], { concurrent: true });
    }
  },
  {
    title: '🚚  Copy all files to dist/',
    task: () => execa.shell('./tasks/subtasks/copyDist.sh')
  },
  {
    title: '📝  Rev assets',
    task: () => {
      return new Listr([
        {
          title: 'Updating sprite version',
          task: () => execa.shell('node ./tasks/subtasks/versionSprite.js')
        },
        {
          title: 'Update CSS and JS versions',
          task: () => execa.shell('node ./tasks/subtasks/versionAssets.js')
        }
      ])
    },
  },
  {
    title: '🏁  Tidy up',
    task: () => {
      return new Listr([
        {
          title: 'Minify production images',
          task: () => execa.shell('node ./tasks/subtasks/minifyImages.js')
        },
        {
          title: 'Remove temporary files/folders',
          task: () => execa.shell('./tasks/subtasks/cleanDistAssets.sh')
        }
      ], { concurrent: true })
    }
  }
]);

tasks.run().catch(err => {
  console.error(err.message);
});
