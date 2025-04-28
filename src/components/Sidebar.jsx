// src/components/Sidebar.jsx
import React from "react";

function Sidebar({ categories, activeCategory, onCategoryChange, newCategory, setNewCategory, onAddCategory }) {
    return (
        <aside className="sidebar">
            {categories.map(cat => (
                <button
                    key={cat}
                    className={`category-button ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => onCategoryChange(cat)}
                >
                    {cat}
                </button>
            ))}
            <div className="nueva-categoria">
                <input
                    type="text"
                    placeholder="Nueva categoría"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="add-category" onClick={onAddCategory}>+</button>
            </div>
        </aside>
    );
}

export default Sidebar;
