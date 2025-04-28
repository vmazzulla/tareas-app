// hooks/useTaskManager.js
import { useState, useEffect } from "react";

const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(["Todas", "Trabajo", "Estudio", "Personal"]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["Todas", "Trabajo", "Estudio", "Personal"];
    setCategories(savedCategories);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addCategory = (category) => {
    if (category.trim() && !categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  return {
    tasks,
    categories,
    theme,
    toggleTheme,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
  };
};

export default useTaskManager;
