import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./src/store/store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
