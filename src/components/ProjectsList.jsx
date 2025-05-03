import React from "react";
import { useProjectManagerContext } from "../context/ProjectManagerContext";

const ProjectsList = ({ onSelectProject }) => {
  const context = useProjectManagerContext();
  console.log("Contexto cargado:", context); // 🔎 Verifica si el contexto tiene valores

  // ✅ Corrección: destructuramos el contexto en una sola línea con validación
  const { projects, addProject } = context || {};

  return (
    <div className="projects-list">
      <h2>Proyectos</h2>
      
      <button onClick={() => addProject?.("Nuevo Proyecto")}> {/* ✅ Validación extra */}
        + Agregar Proyecto
      </button>

      <ul>
        {projects?.map((project) => (
          <li key={project.id} onClick={() => onSelectProject(project.id)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
