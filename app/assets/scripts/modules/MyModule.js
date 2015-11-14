let $ = require('jquery');
let Template = require('../templates/myModule.hbs');

class MyModule {

  constructor () {
    $('body').append(Template());
  }

}

MyModule;

module.exports = MyModule;
