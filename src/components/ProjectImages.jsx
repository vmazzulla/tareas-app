import React, { useRef, useState } from "react";
import { useProjectManagerContext } from "../context/ProjectManagerContext";

const ProjectImages = ({ projectId, isEditing }) => { // ✅ Pasamos isEditing como prop
  const { projects, addImageToProject, removeImageFromProject } = useProjectManagerContext();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      addImageToProject(projectId, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageFromUrl = () => {
    if (imageUrl.trim()) {
      addImageToProject(projectId, imageUrl);
      setImageUrl("");
    }
  };

  const project = projects.find(p => p.id === projectId);

  return (
    <div className="project-images">
      <h3>Imágenes del Proyecto</h3>

      {/* ✅ Botón para agregar imagen solo en modo edición */}
      {isEditing && (
        <>
          <button onClick={() => setShowOptions(!showOptions)}>Agregar Imagen</button>
          {showOptions && (
            <div className="image-options">
              <button onClick={() => fileInputRef.current.click()}>Subir desde archivo</button>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
              />

              <div className="image-url-input">
                <input 
                  type="text" 
                  placeholder="Pegar enlace de imagen..." 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button onClick={handleAddImageFromUrl}>Agregar desde enlace</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ✅ Las imágenes siempre se muestran, pero eliminar solo en edición */}
      <div className="image-gallery">
        {project?.images.map((src, index) => (
          <div key={index} className="image-container">
            <img src={src} alt={`Imagen ${index}`} className="thumbnail" />
            {isEditing && (
              <button className="delete-btn" onClick={() => removeImageFromProject(projectId, index)}>🗑️</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectImages;
