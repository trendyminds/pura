var paths = {
  app: './app',
  dist: './dist',
  assets: '/assets',
  tmp: '_tmp',
  styles: 'styles',
  scripts: 'scripts',
  images: 'images',
  templates: 'templates',
  bower: 'bower_components',
  icons: 'icons'
};

var assetPaths = {
  app: paths.app,
  dist: paths.dist,
  tmp: paths.app + '/' + paths.tmp,
  tmpStyles: paths.app + '/' + paths.tmp + '/' + paths.styles,
  tmpScripts: paths.app + '/' + paths.tmp + '/' + paths.scripts,
  tmpCSS: paths.app + '/' + paths.tmp + '/' + paths.styles + '/*.css',
  tmpJSAll: paths.app + '/' + paths.tmp + '/' + paths.scripts + '/**/*.js',
  tmpJSMain: paths.app + '/' + paths.tmp + '/' + paths.scripts + '/app.js',
  appStylesDir: paths.app + paths.assets + '/' + paths.styles,
  appStyles: paths.app + paths.assets + '/' + paths.styles + '/*.styl',
  appStylesAll: paths.app + paths.assets + '/' + paths.styles + '/**/*.styl',
  appScripts: paths.app + paths.assets + '/' + paths.scripts + '/App.js',
  appScriptsDir: paths.app + paths.assets + '/' + paths.scripts,
  appScriptsAll: paths.app + paths.assets + '/' + paths.scripts + '/**/*.js',
  appHBS: paths.app + paths.assets + '/' + paths.scripts + '/**/*.hbs',
  appImages: paths.app + paths.assets + '/' + paths.images + '/**/*',
  appImagesDir: paths.app + paths.assets + '/' + paths.images,
  appIconsDir: paths.app + paths.assets + '/' + paths.images + '/' + paths.icons + '/app/',
  appIconsDirCompiled: paths.app + paths.assets + '/' + paths.images + '/' + paths.icons + '/dist/',
  distImages: paths.dist + paths.assets + '/' + paths.images,
  allTemplates: paths.app + '/{' + paths.templates + ',' + paths.templates + '/**}',
  allTemplateFiles: paths.app + '/' + paths.templates + '/**/*.*',
  allStyles: paths.app + paths.assets + '/{' + paths.styles + ',' + paths.styles + '/**}',
  allScripts: paths.app + paths.assets + '/{' + paths.scripts + ',' + paths.scripts + '/**}',
  allImages: paths.app + paths.assets + '/{' + paths.images + ',' + paths.images + '/**}',
  allBower: paths.app + '/{' + paths.bower + ',' + paths.bower + '/**}',
  allTmp: paths.app + '/{' + paths.tmp + ',' + paths.tmp + '/**}',
  distTemplateFiles: paths.dist + '/' + paths.templates
};

module.exports = assetPaths;
