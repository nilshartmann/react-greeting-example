// polyfill for IE
require("es6-promise").polyfill();
require("whatwg-fetch");

import * as React from "react";
import * as ReactDOM from "react-dom";

import GreetingApp from "./GreetingApp";

const mountNode = document.getElementById("mount");
ReactDOM.render(<GreetingApp />, mountNode);
