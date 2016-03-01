const MyModule = require('./modules/MyModule');
const SVGInjector = require('./modules/SVGInjector');

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
