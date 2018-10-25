import "promise-polyfill/src/polyfill";
import "regenerator-runtime/runtime";
import "picturefill";
import React from "react";
import ReactDOM from "react-dom";
import "./base/js/Bling";
import ReactModule from "./components/ReactModule";
import MyModule from "./components/MyModule";
import "./app.css";

if ($("[data-my-module]").length) {
  new MyModule();
}

if ($("[data-react-module]").length) {
  ReactDOM.render(
    <ReactModule greeting="Hello" />,
    $("[data-react-module]")[0]
  );
}

/**
 * Enable hot module reloading
 * During development this line allows your JavaScript to refresh without a full page reload
 */
if (module.hot) module.hot.accept();
