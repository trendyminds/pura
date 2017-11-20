require('es6-promise').polyfill();

if (document.querySelectorAll('[data-my-module]').length) {
  System.import('./MyModule').then(module => new module.default());
}
