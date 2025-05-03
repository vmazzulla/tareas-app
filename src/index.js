import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TaskManagerProvider } from "./context/TaskManagerContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Nuevo contexto */}
      <TaskManagerProvider>
        <App />
      </TaskManagerProvider>
    </ThemeProvider>
  </React.StrictMode>
);


