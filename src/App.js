import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import { TaskManagerProvider } from "./context/TaskManagerContext";
import { ProjectManagerProvider } from "./context/ProjectManagerContext";  // ✅ Agregamos el provider de proyectos
import Header from "./components/Header";  
import useTaskManager from "./hooks/useTaskManager";  

function App() {
  const {
    theme, 
    toggleTheme, 
  } = useTaskManager();  

  return (
    <TaskManagerProvider>
      <ProjectManagerProvider> {/* ✅ Ahora los proyectos tienen su propio contexto */}
        <Router>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/proyectos" element={<Projects />} />
          </Routes>
        </Router>
      </ProjectManagerProvider>
    </TaskManagerProvider>
  );
}

export default App;
