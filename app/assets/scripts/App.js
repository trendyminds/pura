if (document.querySelector('[data-my-module]')) {
  System.import('./MyModule').then(module => new module.default());
}
