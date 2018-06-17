/* eslint-disable no-multi-assign, no-proto, no-unused-vars, prefer-arrow-callback */
window.$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = (name, fn) => {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = (name, fn) => {
  this.forEach((elem, i) => {
    elem.on(name, fn);
  });
};
/* eslint-enable */
