import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import { store } from "./Store/store.js";
import { Provider } from "react-redux";
import AuthContext from "../src/Contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </Provider>
);
