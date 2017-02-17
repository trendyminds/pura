# Project Starter
The new TrendyMinds project starting point. Powered heavily by:

* Babel/ES2015
* Node.js + NPM
* Webpack

## Requirements
* Node 6.9+ (use [nvm](https://github.com/creationix/nvm) to manage your Node versions!)

## Setting up
1. Clone/download the starter to your machine
2. Run `npm i` to install dependencies

## Compiling
| Task          | Role                                              |
|:--------------|:--------------------------------------------------|
| npm start     | Watch for changes to new files.                   |
| npm run dev   | Watch for changes to new files.                   |
| npm run build | Build the project to the `dist/` directory.       |

## Documentation

### Project configuation
Modifying `tasks/settings.js` allows you to change Browsersync settings or where your templates live so they can be built properly.

```js
module.exports = {
  "browsersync": {
    "files": [
      "./app/assets/_compiled/styles.css",
      "./app/assets/_compiled/*.js"
    ],
    "server": "app",
    "notify": false,
    "open": false
  },
  "templatePath": "/*.html" // Relative to the app directory
}
```

### PostCSS
PostCSS provides features like mixins, variables and works very closely to `require()` or `import` for CSS. For example:

```bash
# Install Normalize.css and save it to package.json
$ npm i normalize.css -S
```

```css
/* Include it in the main stylesheet */
@import "normalize.css";
```

### CSS Globbing
CSS `@imports` can be globbed so you don't need to go into the styles.css file to add your new modules. This means instead of this...

```css
@import "modules/_module-one";
@import "modules/_module-two";
@import "modules/_module-three";
```

...you can glob files within a directory:

```css
@import "modules/*";
```

### Webpack

Webpack is the most significant change to the project starter. One of the benefits of Webpack is creating code "splits". Rather than loading all of your JavaScript on the very first page (in an app.js file) it's more optimal to only load the code necessary for that page. Webpack allows us to do this in a simple ways. Some example scenarios are detailed here.

#### Example 1: Header.js (a frequently used module)
Modules like headers, footers, and navigations are used very frequently and should be loaded directly in the main App.js file.

**App.js:**
```js
/**
 * Frequently used modules
 */
import Header from './Header'
import Footer from './Footer'

new Header();
new Footer();
```

"Splitting" these modules doesn't provide a benefit because most (if not all) parts of the site will require these.

#### Example 2: Accordion.js (an infrequently used module)
Accordions, tooltips, and similar modules are used infrequently. They might exist on several pages, but they don't exist on most or all pages. In cases like these, you'll see a large benefit in asynchronously loading these modules. This allows the App.js file to remain small, and infrequently used modules will be loaded asynchronously when a specified DOM element exists on the page.

**App.js:**
```js
/**
 * Asynchronously load in infrequently used modules
 */
if (document.querySelectorAll('[data-tooltip]')) {
  System.import('./Tooltip').then(module => new module.default());
};

if (document.querySelectorAll('[data-accordion]')) {
  System.import('./Accordion').then(module => new module.default());
};
```

#### Example 3: FindADoctor.js (a complex section of a site)
There are cases where you need to create a singular, complex part of a site. This might be a blog, a job board, or something like Find A Doctor for IU Health.

Say you decide to use React for the blog of a website. You can optimely load this in by doing the following:

**App.js:**
```js
// If a DOM element with a data-blog attribute exists, load the blog application
if (document.querySelectorAll('[data-blog]')) {
  System.import('./BlogApp');
};
```

**BlogApp/index.js**
```js
import BlogPagination from './BlogPagination'
import BlogPost from './BlogPost'

new BlogPagination();
new BlogPost();
```

For even more control, use Example 2 to asynchronously load infrequently used blog modules:

**BlogApp/index.js**
```js
import BlogPagination from './BlogPagination'
import BlogPost from './BlogPost'

new BlogPagination();
new BlogPost();

if (document.querySelectorAll('[data-blog-tags]')) {
  System.import('./BlogTags').then(module => new module.default());
};
```

### Icons/Sprites
To add to the spritesheet do the following:

1. Drop an SVG file in assets/images/icons/
2. Use `<div class="icon icon--FILENAME"></div>` or...
3. Use `@mixin icon--FILENAME` on a `::before` or `::after` pseudo selector
4. An SVG sprite will be created for you as well as the PNG fallback for browsers without SVG support.

### Linters
We use [Stylelint](https://github.com/stylelint/stylelint) and [XO](https://github.com/sindresorhus/xo) to ensure code is authored the same across all developers. These linters will warn you when using classes, imports, selectors, require, and more in an incorrect fashion.
