import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./global/reset.css";
import "./global/load-fonts.css";
import "./global/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
