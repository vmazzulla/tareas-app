import React, { useState, useEffect } from "react";
import "../styles/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [expandedProjectIds, setExpandedProjectIds] = useState([]);
  const [viewingProject, setViewingProject] = useState(null);  // Nuevo estado para la vista detallada del proyecto

  // Cargar proyectos desde localStorage al inicio
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
  
        // 🔁 Cargar proyecto activo si existe
        const savedViewingId = localStorage.getItem("viewingProjectId");
        if (savedViewingId) {
          const projectToView = parsedProjects.find(p => p.id === Number(savedViewingId));
          if (projectToView) {
            setViewingProject(projectToView);
          }
        }
      } catch (error) {
        console.error("Error al parsear los proyectos desde localStorage:", error);
      }
    }
  }, []);
  
  
  useEffect(() => {
    // Guardar solo si hay proyectos
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleAddProject = () => {
    if (newProjectName.trim() === "") return;

    const newProject = {
      id: Date.now(),
      name: newProjectName,
      description: "",
      tasks: [],
      images: [],
      reminders: [],
      progress: 0,
    };

    setProjects([...projects, newProject]);
    setNewProjectName("");
  };

  const handleDeleteProject = (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar este proyecto?");
    if (!confirmDelete) return;
  
    setProjects(projects.filter((project) => project.id !== id));
    setExpandedProjectIds(expandedProjectIds.filter(pid => pid !== id));
    if (viewingProject?.id === id) {
      setViewingProject(null);
    }
  };

  const handleDescriptionChange = (id, newDescription) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, description: newDescription } : project
      )
    );
  };

  const handleProjectClick = (id) => {
    const project = projects.find((project) => project.id === id);
    setViewingProject(project);
    localStorage.setItem("viewingProjectId", id); // 🧠 guardar el id
  };
  

  const handleBackToProjects = () => {
    setViewingProject(null);
    localStorage.removeItem("viewingProjectId"); // 🧼 limpiar
  };
  

  if (viewingProject) {
    // Mostrar solo el proyecto seleccionado con su información
    return (
      <div className="project-detail-view">
        <button onClick={handleBackToProjects}>Volver a la lista de proyectos</button>

        <div className="project-detail">
          <h2>{viewingProject.name}</h2>
          <textarea
            placeholder="Descripción del proyecto..."
            value={viewingProject.description}
            onChange={(e) =>
              handleDescriptionChange(viewingProject.id, e.target.value)
            }
          />
          <div className="project-section"><strong>🖼️ Imágenes:</strong> (pendiente)</div>
          <div className="project-section"><strong>✅ Tareas:</strong> (pendiente)</div>
          <div className="project-section"><strong>🔔 Recordatorios:</strong> (pendiente)</div>
          <div className="project-section"><strong>📊 Progreso:</strong> {viewingProject.progress}%</div>

          <button 
            className="delete-btn"
            onClick={() => handleDeleteProject(viewingProject.id)}
          >
            Eliminar Proyecto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h1>Proyectos</h1>

      <div className="add-project">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={handleAddProject}>Agregar</button>
      </div>

      <div className="projects-gallery">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div
              className="project-header"
              onClick={() => handleProjectClick(project.id)} // Cambiar la vista a detalle
            >
              <h3>{project.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
