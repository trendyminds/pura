import './Bling';
import 'promise-polyfill/src/polyfill';

if ($('[data-my-module]').length) {
  System.import('./MyModule').then(module => new module.default());
}

if ($('[data-react-module]').length) {
  System.import('./ReactModule');
}
