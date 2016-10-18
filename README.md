# Project Starter
The new TrendyMinds project starting point. Powered heavily by:

* Babel/ES2015
* Node.js + NPM
* Webpack

## Requirements
* Node 5.12+ (we highly encourage using [nvm](https://github.com/creationix/nvm) to manage your Node versions)
* [Yarn](https://yarnpkg.com/). Install using `npm i -g yarn`

## Setting up
1. Clone/download the starter to your machine
2. Run `yarn` to install dependencies

## Build scripts
| Task          | Role                                              |
|---------------|---------------------------------------------------|
| npm start     | Build the project to the `dist/` directory.       |
| npm run watch | Watch for changes to new files.                   |

## Features

### Easily configure settings
If you open `tasks/settings.js` you'll see a list of options that modify how Browsersync behaves and which templates are crawled to perform CSS & JS revving. These make it much simpler to modify the build and watch tasks without changing the script of the build tool.

### Automatic sprite generator
It's very tedious to create a spritesheet and map all the coordinates correctly in the CSS. To add to the spritesheet you simply do the following:

1. Drop an SVG file in assets/images/icons/
2. Use `<div class="icon icon--FILENAME"></div>` or...
2. Use `@mixin icon--FILENAME` on a `:before` or `:after` pseudo selector

An SVG sprite will be created for you as well as the PNG fallback for browsers without SVG support.

### PostCSS
PostCSS provides the power of preprocessors and makes it easy to `require()` third-party CSS.

```sh
# Install Normalize.css and save it to package.json
$ npm i normalize.css -S

# Include it in the main stylesheet
@import "normalize.css";
```

With PostCSS, all the things you are used to still work: nesting, media queries, variables, etc. However, all PostCSS files use the .css file format as opposed to .styl, .scss, or .sass.

### Custom Modernizr builds
After running `npm start` or `npm run watch` Modernizr will crawl through your CSS and JS to determine what Modernizr tests are needed.

### ESLint + Stylelint
We use Stylelint and ESLint to ensure code is authored the same across all developers. These linters will warn you when using classes, imports, selectors, require, and more in an incorrect fashion.
