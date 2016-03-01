const injector = require('svg-injector');

class SVGInjector {

  constructor () {
    // Grab the elements that should be swapped with the embedded SVG
    let docSVGs = document.querySelectorAll('[data-svg]');

    // Set the background-image to none so we no longer use the sprite image
    Array.from(docSVGs).forEach(function (el) {
      el.parentNode.style.backgroundImage = 'none';
    });

    // Inject the SVGs inline
    injector(docSVGs);
  }

}

SVGInjector;

module.exports = SVGInjector;
