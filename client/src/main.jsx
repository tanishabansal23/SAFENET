import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "./App.jsx";

// Configure axios globally. Uses Vite env var if provided, else falls back to localhost.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
