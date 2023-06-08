import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./Forms.css";
import "./Listings.css";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={process.env.REACT_APP_PAWGRESS_API_HOST}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
