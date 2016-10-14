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

### Easily configure where your templates live (Coming soon)

### Watch for new files (Coming soon)

### Automatic sprite generator
It's very tedious to create a spritesheet and map all the coordinates correctly in the CSS. To add to the spritesheet you simply do the following:

1. Drop an SVG file in assets/images/icons/
2. Use `<div class="icon icon--FILENAME"></div>` or...
2. Use `@mixin icon--FILENAME` on a `:before` or `:after` pseudo selector

An SVG sprite will be created for you as well as the PNG fallback for browsers without SVG support.

### Dynamic SVG injection
Using [SVGInjector](https://github.com/iconic/SVGInjector), we can use JavaScript to inject an inline SVG into the DOM. Here's an example of it in action,

```html
<!--
  Use our normal, spritesheet classes for fallbacks when JS is disabled or too slow
-->
<div class="icon icon--tie">
  <!--
    Use [data-svg] and [data-src] to inject the tie.svg in between our .icon div.
  -->
  <div data-src="/assets/images/icons/tie.svg" data-svg></div>
</div>
```

Now that our SVG is inline, we can use CSS to style it.

```css
// Set all the .stripe paths in the tie.svg to green
.icon--tie path.stripe {
  fill: green;
}
```

### PostCSS
PostCSS provides the power of preprocessors and makes it easy to `require()` third-party CSS.

```sh
# Install Normalize.css and save it to package.json
$ npm i normalize.css -S

# Include it in the main stylesheet
@import "normalize.css";
```

With PostCSS, all the things you are used to still work: nesting, media queries, variables, etc. You can continue to author your CSS the same, but all files end with `.css` now.

### CSS file globbing
CSS @imports are [glob-driven](https://camo.githubusercontent.com/d0cccd8d3b074fd523d8de7d126994b6f87b718a/687474703a2f2f692e696d6775722e636f6d2f37766a4f326d462e676966) so you do not need to go into the styles.css file to add your new modules.

### Custom Modernizr builds
After running `npm start` or `npm run watch` Modernizr will crawl through your CSS and JS to determine what Modernizr tests are needed.

### ESLint + Stylelint
We use Stylelint and ESLint to ensure code is authored the same across all developers. These linters will warn you when using classes, imports, selectors, require, and more in an incorrect fashion.
