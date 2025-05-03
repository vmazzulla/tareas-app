import React from "react";
import { ProjectManagerProvider } from "./context/ProjectManagerContext"; // ✅ Importamos el provider
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <ProjectManagerProvider> {/* ✅ Aquí envuelve toda la app */}
      <ProjectsPage />
    </ProjectManagerProvider>
  );
}

export default App;
