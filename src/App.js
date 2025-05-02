import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import { TaskManagerProvider } from "./context/TaskManagerContext";
import Header from "./components/Header";  // Importar Header aquí
import useTaskManager from "./hooks/useTaskManager";  // Importar el hook

function App() {
  const {
    theme, // El estado del tema
    toggleTheme, // Función para cambiar el tema
  } = useTaskManager(); // Llamar al hook

  return (
    <TaskManagerProvider>
      <Router>
        <Header theme={theme} toggleTheme={toggleTheme} /> {/* Pasar el tema y la función al Header */}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </Router>
    </TaskManagerProvider>
  );
}

export default App;
