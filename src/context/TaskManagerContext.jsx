import { createContext, useContext } from "react";
import useTaskManager from "../hooks/useTaskManager";

const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const taskManager = useTaskManager();
  return (
    <TaskManagerContext.Provider value={taskManager}>
      {children}
    </TaskManagerContext.Provider>
  );
};

export const useTaskManagerContext = () => useContext(TaskManagerContext);
