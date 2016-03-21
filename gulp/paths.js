import config from './config';

let paths = {
  app: {
    dir: './app',
    styles: './app/assets/{styles,styles/**}',
    scripts: './app/assets/{scripts,scripts/**}',
    images: './app/assets/{images,images/**}',
    imagesAll: './app/assets/images/**/*',
    imagesSrcAll: './app/assets/images/icons/*.svg',
    stylesMain: './app/assets/styles/*.css',
    stylesAll: './app/assets/styles/**/*.css',
    scriptsMain: './app/assets/scripts/App.js',
    scriptsVendor: './app/assets/scripts/Vendor.js',
    scriptsAll: './app/assets/scripts/**/*.js',
    hbsAll: './app/assets/scripts/**/*.hbs',
    tmp: './app/{_tmp,_tmp/**}',
    tmpCSS: './app/_tmp/styles/*.css',
    tmpCSSDir: './app/_tmp/styles',
    tmpJSMain: './app/_tmp/scripts/app.js',
    tmpJSVendor: './app/_tmp/scripts/vendor.js',
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

export default paths;
