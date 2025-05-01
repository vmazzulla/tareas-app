import { useState, useEffect, useRef } from "react";

const useTaskManager = () => {
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(["Todas", "Trabajo", "Estudio", "Personal"]);
  const [theme, setTheme] = useState(defaultTheme);

  const notificationTimeouts = useRef([]); // Ref para almacenar los timeouts de notificación

  // Cargar tareas, categorías y tema desde localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["Todas", "Trabajo", "Estudio", "Personal"];
    setCategories(savedCategories);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Solicitar permisos para las notificaciones
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Copiar el valor de notificationTimeouts.current en una variable temporal
    const currentTimeouts = [...notificationTimeouts.current];

    tasks.forEach((task) => {
      if (task.notificationDateTime) {
        const notificationTime = new Date(task.notificationDateTime).getTime();
        const currentTime = Date.now();
        const timeDifference = notificationTime - currentTime;

        if (timeDifference > 0) {
          const timeoutId = setTimeout(() => {
            new Notification("Tarea pendiente!", {
              body: `${task.name}`,
            });
          }, timeDifference);

          // Guardar el timeout para cancelarlo si es necesario
          currentTimeouts.push(timeoutId);
        }
      }
    });

    // Limpiar los temporizadores cuando las tareas cambian
    return () => {
      currentTimeouts.forEach(clearTimeout); // Limpiar los timeouts almacenados en la variable
    };
  }, [tasks]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Agregar tarea
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Editar tarea
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta tarea?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Si la tarea eliminada tenía un timeout pendiente, cancelarlo
      const task = tasks.find((task) => task.id === id);
      if (task && task.notificationDateTime) {
        const timeoutIndex = notificationTimeouts.current.findIndex((timeoutId) => timeoutId === task.notificationTimeoutId);
        if (timeoutIndex !== -1) {
          clearTimeout(notificationTimeouts.current[timeoutIndex]);
          notificationTimeouts.current.splice(timeoutIndex, 1);
        }
      }
    }
  };

  // Cambiar estado de tarea (completar/desmarcar)
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Si la tarea fue completada, cancelar la notificación pendiente
    const task = tasks.find((task) => task.id === id);
    if (task && task.notificationDateTime) {
      const timeoutIndex = notificationTimeouts.current.findIndex((timeoutId) => timeoutId === task.notificationTimeoutId);
      if (timeoutIndex !== -1) {
        clearTimeout(notificationTimeouts.current[timeoutIndex]);
        notificationTimeouts.current.splice(timeoutIndex, 1);
      }
    }
  };

  const addCategory = (category) => {
    if (category.trim() && !categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = (categoryToDelete) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoryToDelete}"?`);
    if (confirmDelete) {
      const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  const getPendingTasksCount = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  return {
    tasks,
    categories,
    theme,
    getPendingTasksCount,
    toggleTheme,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    deleteCategory,
  };
};

export default useTaskManager;
