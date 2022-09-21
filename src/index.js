// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "./assets/vendor/fontawesome-free/css/all.min.css";
// import "./assets/css/sb-admin.css";
// import './assets/vendor/jquery/jquery.min.js'
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./app-assets/vendors/css/vendors.css";
import "./app-assets/css/bootstrap.css";
import "./app-assets/css/bootstrap-extended.css";
import "./app-assets/css/colors.css";
import "./app-assets/css/components.css";
import "./app-assets/css/themes/dark-layout.css";
import "./app-assets/css/themes/bordered-layout.css";
import "./app-assets/css/themes/semi-dark-layout.css";
import "./app-assets/css/core/menu/menu-types/horizontal-menu.css";
import "./app-assets/css/plugins/forms/form-validation.css";
import "./app-assets/css/pages/page-auth.css";

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
