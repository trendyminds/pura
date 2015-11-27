let $ = require('jquery');
let MyModule = require('./modules/MyModule');
let SVGInjector = require('./modules/SVGInjector');

class App {

  constructor () {
    if (Modernizr.svg) {
      new SVGInjector();
    }

    new MyModule();
  }

}

App;

new App;
