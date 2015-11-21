var config = require('./config');

var paths = {
  app: {
    dir: './app',
    styles: './app/assets/{styles,styles/**}',
    scripts: './app/assets/{scripts,scripts/**}',
    images: './app/assets/{images,images/**}',
    imagesAll: './app/assets/images/**/*',
    bower: './app/{bower_components,bower_components/**}',
    stylesMain: './app/assets/styles/*.css',
    stylesAll: './app/assets/styles/**/*.css',
    scriptsMain: './app/assets/scripts/App.js',
    scriptsAll: './app/assets/scripts/**/*.js',
    hbsAll: './app/assets/scripts/**/*.hbs',
    tmp: './app/{_tmp,_tmp/**}',
    tmpCSS: './app/_tmp/styles/*.css',
    tmpCSSDir: './app/_tmp/styles',
    tmpJSMain: './app/_tmp/scripts/app.js',
    tmpJSDir: './app/_tmp/scripts/',
    templates: './app' + config.templateDir + config.templateFiles,
    assetsRelativeToTemplates: config.assetsRelativeToTemplates
  },
  dist: {
    dir: './dist',
    css: './dist/assets/styles/*.css',
    cssDir: './dist/assets/styles',
    imageDir: './dist/assets/images',
    templatesDir: './dist' + config.templateDir
  }
};

module.exports = paths;
