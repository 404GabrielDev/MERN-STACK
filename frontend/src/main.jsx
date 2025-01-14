import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
  </StrictMode>
);
