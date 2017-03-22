const execa = require('execa');
const Listr = require('listr');
const os = require('os');

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
          title: `🖥  Running Browsersync at http://localhost:3000 and ${externalIp}`,
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

/**
 * Get IP address for external Browsersync address
 */
let interfaces = os.networkInterfaces();
let ipAddresses = [];
for (let k in interfaces) {
  for (let k2 in interfaces[k]) {
    let address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      ipAddresses.push(address.address);
    }
  }
}

const externalIp = `http://${ipAddresses[0]}:3000`;
