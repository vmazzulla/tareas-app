import React, { useState } from "react";
import { useProjectManagerContext } from "../context/ProjectManagerContext";
import ProjectImages from "./ProjectImages";
import ProjectTasks from "./ProjectTasks"; // ✅ Importamos el nuevo componente

const ProjectDetails = ({ projectId, onBack }) => {
  const { projects, updateProject } = useProjectManagerContext();
  const project = projects.find(p => p.id === projectId);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");

  if (!project) return <p>Proyecto no encontrado.</p>;

  const handleSave = () => {
    updateProject(projectId, { name, description });
    setIsEditing(false);
  };

  return (
    <div className="project-details">
      {/* ✅ Edición de nombre */}
      {isEditing ? (
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nombre del proyecto"
        />
      ) : (
        <h2>{project.name}</h2>
      )}

      {/* ✅ Edición de descripción */}
      {isEditing ? (
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descripción del proyecto"
        />
      ) : (
        <p>{project.description || "No hay descripción aún."}</p>
      )}

      {/* ✅ Sección de imágenes */}
      <ProjectImages projectId={projectId} isEditing={isEditing} />

      {/* ✅ Sección de tareas dentro del proyecto */}
      <ProjectTasks projectId={projectId} />

      {/* ✅ Botones organizados en la parte inferior */}
      <div className="button-container">
        {isEditing ? (
          <>
            <button onClick={() => setIsEditing(false)}>Cancelar edición</button>
            <button onClick={handleSave}>Guardar cambios</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
      </div>

      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default ProjectDetails;
