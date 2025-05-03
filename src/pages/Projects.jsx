import React, { useState } from "react";
import ProjectsList from "../components/ProjectsList";
import ProjectDetails from "../components/ProjectDetails";
import "../styles/Projects.css";


const ProjectsPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <div className="projects-page">
      <h1>Gestión de Proyectos</h1>
      
      {selectedProjectId ? (
        <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
      ) : (
        <ProjectsList onSelectProject={setSelectedProjectId} />
      )}
    </div>
  );
};

export default ProjectsPage;
