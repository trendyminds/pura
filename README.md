# Project Generator
The new TrendyMinds project generator (or project starter kit). Powered heavily by:

* Babel/ES2015
* Node.js + NPM
* Gulp

## Improvements over previous generator

### No longer tied to Yeoman
Using Yeoman made the generator a bit more convoluted. It gained nothing from it, and it discouraged collaboration because Yeoman had a learning curve to work around. Now the generator can be installed using the "Download Zip" button or

```sh
$ git clone git@github.com:trendyminds/project-generator.git
$ cd project-generator
$ rm -rf .git/
```

### Easily configure where your templates live
In previous generators it was difficult to tell Gulp where your template files lived. It usually involved editing the gulpfiles which is something we strongly discourage. Now there's a safe way to specify your template directory in `gulp/config.js`;

```js
var config = {
  templateDir: '/',               // Relative to the app directory
  templateFiles: '*.html',
  assetsRelativeToTemplates: './'
};
```

### Watch for new files
`gulp.watch()` has been replaced with the `gulp-watch` plugin. This allows for the watch task to pick up new CSS and JS files so you no longer need to start and stop the watch task when new files are added to the project.

### Automatic sprite generator
This is one of the most exciting parts of the new generator. It's very tedious to create a spritesheet and map all the coordinates correctly in the CSS. Now to add to the spritesheet you simply do the following:

1. Drop an SVG file in assets/images/icons/
2. Use `<div class="icon-img icon-img--FILENAME"></div>`

An SVG sprite will be created for you as well as the PNG fallback for browsers without SVG support.

### Dynamic SVG injection
Using [SVGInjector](https://github.com/iconic/SVGInjector), we can easily use JavaScript to inject an inline SVG into the DOM. This is exceedingly powerful. Here's an example of it in action,

```html
<!--
  Use our normal, spritesheet classes for fallbacks when JS is disabled or too slow
-->
<div class="icon-img icon-img--tie">
  <!--
    Use [data-svg] and [data-src] to inject the tie.svg in between our .icon-img div.
  -->
  <div data-src="/assets/images/icons/tie.svg" data-svg></div>
</div>
```

Now that our SVG is inline, we can use CSS to style it.

```css
// Set all the .stripe paths in the tie.svg to green
.icon-img--tie path.stripe {
  fill: green;
}
```

### Switch from Stylus to PostCSS
Stylus suits our needs fine, but with the push to NPM it's difficult to include styles from an NPM plugin. PostCSS makes this much easier and works very closely to `require()`.

```sh
# Install Normalize.css
$ npm install normalize.css --save

# Include it in the main stylesheet
@import "normalize.css";
```

With PostCSS, all the things you are used to still work: nesting, media queries, variables, etc. You can continue to author your CSS the same, but all files end with `.css` now.

### Ignored `_tmp/` directory in app folder
The biggest source of merge conflicts is from the `_tmp/` directory that contains the compiled styles and scripts for the `app/` version of the site. This directory is now ignored by Git so we should have far fewer merge conflicts. The caveat is that we'll need to run `gulp` and `gulp watch` when new style and script changes occur so our local `_tmp/` folders match each others.

### Removed Bower in favor of NPM
A [major shift away from Bower](https://gofore.com/ohjelmistokehitys/stop-using-bower/) has been happening for a while now. Many developers are favoring NPM because it's tedious to maintain OSS on both Bower and NPM and Bower doesn't support nested dependencies.

#### Using NPM instead of Bower
```sh
# Install packages with --save-dev or --save
# --save-dev is for packages you use in the build process and --save is for front-end packages like jQuery or Picturefill
$ npm install a-package --save-dev

# Require the package in App.js
require('a-package');
```
Sometimes, there are scripts that need to be in the `<head>` so placing a require statement in App.js will not work. To place these in the `<head>` simply:

```sh
# Install your package and use --save for front-end packages
$ npm install picturefill --save

# Require the package in Vendor.js
require('picturefill');
```

### Custom Modernizr builds
A new Modernizr task will now scrub through your CSS and JS styles to determine what tests to bundle for you. This will greatly reduce the amount of JavaScript being used on this plugin.

Caveat: To prevent this task from running upon each save of your CSS and JS, any _new_ Modernizr rules will only get picked up after you restart `gulp watch`.

### Faster builds/watches
Gulp's power (and Node's) is in running parallel tasks. The new generator uses a plugin called `runSequence()` which makes it easier to fire parallel and sequential tasks. Now many more tasks run in parallel to maximize the amount of work that can happen at once.

### gulp vs. gulp watch
Our previous generator had two tasks:

| Task       | Role                                              |
|------------|---------------------------------------------------|
| gulp       | Watch for changes to new files; the "dev" task.   |
| gulp build | Build the project to the `dist/` directory.       |

However, these tasks are backwards and are atypical of other Gulp projects. These are the new tasks:

| Task       | Role                                              |
|------------|---------------------------------------------------|
| gulp       | Build the project to the `dist/` directory.       |
| gulp build | Build the project to the `dist/` directory.       |
| gulp watch | Watch for changes to new files; the "dev" task.   |
| gulp dev   | Watch for changes to new files; the "dev" task.   |

### ESLint + Stylelint
We now use Stylelint and ESLint to ensure code is authored the same across all developers. These linters will warn you when using classes, imports, selectors, require, and more in an incorrect fashion.
