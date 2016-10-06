const Version = require("node-version-assets");
const globby = require("globby");
const assets = [
  'dist/assets/_compiled/*.css',
  'dist/assets/_compiled/*.js',
];

globby(assets).then(paths => {
  new Version({
    assets: paths,
    grepFiles: [
      './dist/index.html'
    ]
  }).run();
});
