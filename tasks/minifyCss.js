// ./node_modules/.bin/cssnano ./dist/assets/_compiled/styles.css ./dist/assets/_compiled/styles.css
var cssnano = require('cssnano');
var fs = require('fs');

cssnano.process(css, opts).then(function (result) {
  fs.writeFileSync('./blah.css', result.css);
});
