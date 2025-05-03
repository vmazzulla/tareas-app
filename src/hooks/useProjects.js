import { useState, useEffect } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem("projects"));
      return Array.isArray(savedProjects) ? savedProjects : [];
    } catch (error) {
      console.error("Error al cargar proyectos desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
      console.error("Error al guardar proyectos en localStorage:", error);
    }
  }, [projects]);

  const addProject = (name, description = "") => {
    const newProject = {
      id: Date.now(),
      name: name.trim(),
      description,
      tasks: [],
      images: [],
      progress: 0,
    };

    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev =>
      prev.map(project => (project.id === id ? { ...project, ...updatedFields } : project))
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addImageToProject = (projectId, imageData) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, images: [...project.images, imageData] } 
        : project
    ));
  };
  
  const removeImageFromProject = (projectId, imageIndex) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, images: project.images.filter((_, index) => index !== imageIndex) } 
        : project
    ));
  };
  
  const addTaskToProject = (projectId, taskText) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, tasks: [...project.tasks, { id: Date.now(), text: taskText, completed: false }] }
        : project
    ));
  };
  
  const toggleTaskCompletion = (projectId, taskId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? {
            ...project, 
            tasks: project.tasks.map(task => 
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : project
    ));
  };
  
  const removeTaskFromProject = (projectId, taskId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
        : project
    ));
  };
  

  return { projects, addProject, updateProject, deleteProject, addImageToProject, removeImageFromProject, addTaskToProject, toggleTaskCompletion, removeTaskFromProject };
};

export default useProjects;
