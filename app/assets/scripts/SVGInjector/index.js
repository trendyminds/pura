import injector from 'svg-injector';

export default class SVGInjector {
  constructor() {
    // Grab the elements that should be swapped with the embedded SVG
    let docSVGs = document.querySelectorAll('[data-svg]');

    // Set the background-image to none so we no longer use the sprite image
    for (let i = 0, len = docSVGs.length; i < len; i++) {
      docSVGs[i].parentNode.style.backgroundImage = 'none';
    }

    // Inject the SVGs inline
    injector(docSVGs);
  }
}
