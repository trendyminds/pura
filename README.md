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
# Install packages with --save-dev or --save
# --save-dev is for packages you use in the build process and --save is for front-end packages like jQuery or Picturefill
npm install a-package --save-dev

# Require the package in App.js
require('a-package');
```
Sometimes, there are scripts that need to be in the `<head>` so placing a require statement in App.js will not work. To place these in the `<head>` simply:

```sh
# Install your package and use --save for front-end packages
npm install picturefill --save

# Require the package in Vendor.js
require('picturefill');
```
