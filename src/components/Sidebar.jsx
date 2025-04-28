// src/components/Sidebar.jsx
import React from "react";

function Sidebar({
  categories,
  activeCategory,
  onCategoryChange,
  newCategory,
  setNewCategory,
  onAddCategory,
  onDeleteCategory,
  onToggleCalendar, // nuevo
}) {
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

      {categories.map(cat => (
        <div key={cat} className="category-item">
          #<button
            className={`category-button ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
          <button
            className="delete-category-btn"
            onClick={() => onDeleteCategory(cat)}
          >
            x
          </button>
        </div>
      ))}

      <div className="nueva-categoria">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="add-category" onClick={onAddCategory}>
          +
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
