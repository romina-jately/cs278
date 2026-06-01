import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./lib/toast";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <App/>
      </ToastProvider>
    </HashRouter>
  </StrictMode>,
);
