import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import { TaskManagerProvider } from "./context/TaskManagerContext";

function App() {
  return (
    <TaskManagerProvider>
      <div className="App">
        <TaskList />
      </div>
    </TaskManagerProvider>
  );
}

export default App;
