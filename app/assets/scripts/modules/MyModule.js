let $ = require('jquery');
let Template = require('../templates/myModule.hbs');

class MyModule {

  constructor () {
    $('body').append(Template());
    console.log('constructor: MyModule with template');
  }

}

MyModule

module.exports = MyModule
