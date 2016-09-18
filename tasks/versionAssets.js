const Version = require("node-version-assets");
const globby = require("globby");
const assets = [
  'dist/assets/_compiled/styles.css',
  'dist/assets/_compiled/*.js'
];

globby(assets).then(paths => {
  const versionInstance = new Version({
    assets: paths,
    grepFiles: [
      './dist/index.html'
    ]
  });

  versionInstance.run();
});
