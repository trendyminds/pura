import "promise-polyfill/src/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./Bling";
import ReactModule from "./ReactModule";
import MyModule from "./MyModule";

if ($("[data-my-module]").length) {
  new MyModule();
}

if ($("[data-react-module]").length) {
  ReactDOM.render(
    <ReactModule greeting="Hello" />,
    $("[data-react-module]")[0]
  );
}
