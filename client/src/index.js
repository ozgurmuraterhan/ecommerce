import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";

import "font-awesome/css/font-awesome.min.css";
import "./assets/css/grid.css";
import "./assets/css/main.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

_redux.setupAxios(axios, store);

ReactDOM.render(
  <StrictMode>
    <App store={store} persistor={persistor} basename={PUBLIC_URL} />
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
