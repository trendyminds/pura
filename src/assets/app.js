import "promise-polyfill/src/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./base/js/Bling";
import ReactModule from "./components/ReactModule";
import MyModule from "./components/MyModule";

if ($("[data-my-module]").length) {
  new MyModule();
}

if ($("[data-react-module]").length) {
  ReactDOM.render(
    <ReactModule greeting="Hello" />,
    $("[data-react-module]")[0]
  );
}
