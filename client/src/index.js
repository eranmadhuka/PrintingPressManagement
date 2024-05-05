import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContextProvider } from "./components/context/AuthContext";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

const stripePromise = loadStripe('pk_test_51PCvlA01WOktj22OUQfJWjznDW6RukNEc3Co8PzAbd7Z9mgxTWX86Y74VTbfgBNtc5wVHvy4ZQyTRpJmA24FvwJd00D6V6i1Kk');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
