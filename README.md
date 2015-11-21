# Project Generator
The new TrendyMinds project generator (or project starter kit). Powered heavily by:

* Babel/ES2015
* Node.js + NPM
* Gulp

## Improvements over previous generator
The previous generator was built on top of Yeoman and many things have changed in this latest build.

### Removed Bower in favor of NPM
A [major shift away from Bower](https://gofore.com/ohjelmistokehitys/stop-using-bower/) has been happening for a while now. Many developers are favoring NPM because it's tedious to maintain OSS on both Bower and NPM and Bower doesn't support nested dependencies.

#### Using NPM instead of Bower
```sh
// Install packages with --save-dev or --save
// --save-dev is for packages you use in the build process and --save is for front-end packages like jquery or Picturefill
npm install a-package --save-dev
```

lways use `npm install a-package --save` and `require('a-package')` in `assets/scripts/App,js`. However, there are some scripts that need to be in the `<head>` so placing a require statement in App.js will not work. In cases like these, you can now add require statements to Vendor.js. Vendor.js is a single file that sits in the `<head>` and handles JS that must be run before the document loads (like Modernizr and Picturefill).
