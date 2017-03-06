if (document.querySelector('[data-svg]').length) {
  System.import('./SVGInjector').then(module => new module.default());
}
