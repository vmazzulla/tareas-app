import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import Projects from "./pages/Projects";
import { TaskManagerProvider } from "./context/TaskManagerContext";

function App() {
  return (
    <TaskManagerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </Router>
    </TaskManagerProvider>
  );
}

export default App;
