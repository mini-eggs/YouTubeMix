import { h, render } from "preact";
import App from "./App";

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");
}

render(<App />, document.body);
