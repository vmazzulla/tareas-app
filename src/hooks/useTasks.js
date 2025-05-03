import { useState, useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // ✅ Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // ✅ Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => setTasks(prev => [...prev, task]);

  const editTask = (updatedTask) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(task => task.id !== id));

  const toggleTaskCompletion = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return { tasks, addTask, editTask, deleteTask, toggleTaskCompletion };
};

export default useTasks;
