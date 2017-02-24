if (document.querySelector('[data-svg]')) {
  System.import('./SVGInjector').then(module => new module.default());
}
