import SVGInjector from './modules/SVGInjector';
import MyModule from './modules/MyModule';

if (Modernizr.svg) {
  new SVGInjector();
}

new MyModule();
