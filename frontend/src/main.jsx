import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
