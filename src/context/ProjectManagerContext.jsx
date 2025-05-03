import { createContext, useContext } from "react";
import useProjects from "../hooks/useProjects"; // ✅ Importamos el hook

const ProjectManagerContext = createContext();

export const ProjectManagerProvider = ({ children }) => {
  const projectsManager = useProjects();  

  return (
    <ProjectManagerContext.Provider value={projectsManager}> {/* ✅ Pasamos el objeto directamente */}
      {children}
    </ProjectManagerContext.Provider>
  );
};

export const useProjectManagerContext = () => useContext(ProjectManagerContext);
