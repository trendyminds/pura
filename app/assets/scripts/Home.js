import SVGInjector from './SVGInjector';
import MyModule from './MyModule';

if (Modernizr.svg) {
  new SVGInjector();
}

new MyModule();
