import Promise from 'promise-polyfill';

// Add promise-polyfill to window
if (!window.Promise) {
  window.Promise = Promise;
}

if (document.querySelectorAll('[data-my-module]').length) {
  System.import('./MyModule').then(module => new module.default());
}
