let $ = require('jquery');
let MyModule = require('./modules/MyModule');
let SVGInjector = require('./modules/SVGInjector');

class App {

  constructor () {
    new SVGInjector();
    new MyModule();
  }

}

App;

new App;
