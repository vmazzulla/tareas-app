import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import { TaskManagerProvider } from "./context/TaskManagerContext";
import Header from "./components/Header";

function App() {
  // Estado para manejar el tema
  const [theme, setTheme] = useState("light");

  // Función para alternar entre los temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <TaskManagerProvider>
      <Router>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </Router>
    </TaskManagerProvider>
  );
}

export default App;
