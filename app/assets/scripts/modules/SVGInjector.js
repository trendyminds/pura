const $ = require('jquery');
const injector = require('svg-injector');

class SVGInjector {

  constructor () {
    // Grab the elements that should be swapped with the embedded SVG
    let docSVGs = $('[data-svg]');

    // Set the background-image to none so we no longer use the sprite image
    $('[data-svg]').parent().css('background-image', 'none');

    // Inject the SVGs inline
    injector(docSVGs);
  }

}

SVGInjector;

module.exports = SVGInjector;
