import React from "react";
import ReactDOM from "react-dom";
import ReactModule from "./components/ReactModule";
import MyModule from "./components/MyModule";
import "./app.css";

if (document.querySelector("[data-my-module]")) {
  new MyModule();
}

if (document.querySelector("[data-react-module]")) {
  ReactDOM.render(
    <ReactModule greeting="Hello" />,
    document.querySelector("[data-react-module]")
  );
}

/**
 * Enable hot module reloading
 * During development this line allows your JavaScript to refresh without a full page reload
 */
if (module.hot) module.hot.accept();
