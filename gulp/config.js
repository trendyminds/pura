let config = {
  templateDir: '/', // Relative to the app directory
  templateFiles: '*.html',
  assetsRelativeToTemplates: './',
  browserSync: {
    notify: false,
    xip: true,
    // Use the "server" option to browserSync an HTML site
    server: {
      baseDir: 'app'
    }
    // ..or use the "proxy" option to serve up a PHP site
    // proxy: 'project-starter.app'
  }
};

export default config;
