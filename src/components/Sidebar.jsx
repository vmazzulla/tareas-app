import React from "react";
import { useTaskManagerContext } from "../context/TaskManagerContext";

function Sidebar({
  categories,
  activeCategory,
  onCategoryChange,
  onAddCategory,
  onDeleteCategory,
  onToggleCalendar, 
}) {
  const { newCategory, setNewCategory, deleteCategory } = useTaskManagerContext(); // ✅ Ahora dentro del componente

  return (
    <aside className="sidebar">
      <div className="sidebar-buttons">
        <button className="calendar-button" onClick={() => onToggleCalendar(true)}>
          Calendario
        </button>
        <button className="tasks-button" onClick={() => onToggleCalendar(false)}>
          Lista
        </button>
      </div>

      <ul className="category-list">
        {categories.map(cat => (
          <li key={cat} className={`category-item ${activeCategory === cat ? "active" : ""}`}>
            <button className="category-button" onClick={() => onCategoryChange(cat)}>
              {cat}
            </button>
            <button className="delete-category-btn" onClick={() => deleteCategory(cat)}>
              x
            </button>
          </li>
        ))}
      </ul>

      <div className="nueva-categoria">
        <input 
          type="text" 
          placeholder="Nueva categoría" 
          value={newCategory || ""}  // ✅ Evita errores si newCategory es undefined
          onChange={(e) => setNewCategory?.(e.target?.value || "")} // ✅ Validación extra para evitar errores
        />
        <button className="add-category-btn" onClick={onAddCategory}>+</button>
      </div>
    </aside>
  );
}

export default Sidebar;
