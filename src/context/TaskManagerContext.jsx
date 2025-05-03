import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";
import useCategories from "../hooks/useCategories";
import useNotifications from "../hooks/useNotifications";

const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const tasksManager = useTasks(); 
  const categoriesManager = useCategories();
  const notificationsManager = useNotifications(tasksManager.tasks);

  return (
    <TaskManagerContext.Provider value={{ 
      ...tasksManager, 
      ...categoriesManager,  // ✅ Aquí ya debe estar newCategory y setNewCategory
      ...notificationsManager 
    }}>
      {children}
    </TaskManagerContext.Provider>
  );
};

export const useTaskManagerContext = () => useContext(TaskManagerContext);
