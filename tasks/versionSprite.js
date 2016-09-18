const Version = require("node-version-assets");
const globby = require("globby");
const assets = [
  'dist/assets/images/sprites/*.svg',
];

globby(assets).then(path => {
  new Version({
    assets: path,
    grepFiles: [
      './dist/assets/_compiled/*.css'
    ]
  }).run();
});
