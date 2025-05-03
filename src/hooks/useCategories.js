import { useState, useEffect } from "react";

const useCategories = () => {
  const defaultCategories = ["Todas", "Trabajo", "Estudio", "Personal"];
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = JSON.parse(localStorage.getItem("categories"));
      return Array.isArray(savedCategories) && savedCategories.length ? savedCategories : defaultCategories;
    } catch (error) {
      console.error("Error al cargar categorías desde localStorage:", error);
      return defaultCategories;
    }
  });

  const [newCategory, setNewCategory] = useState("");  

  useEffect(() => {
    try {
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error al guardar categorías en localStorage:", error);
    }
  }, [categories]);

  const addCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      const updatedCategories = [...categories, trimmedCategory];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory(""); // 🔹 Limpia el input después de agregar la categoría
    }
  };

  const deleteCategory = (categoryToDelete) => {
    setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
  };

  return { categories, newCategory, setNewCategory, addCategory, deleteCategory };
};

export default useCategories;
