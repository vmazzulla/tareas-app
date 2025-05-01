// src/components/TaskForm.jsx
import React from "react";

function TaskForm({
    taskName,
    description,
    category,
    dueDate,
    notificationDateTime,
    categories,
    onNameChange,
    onDescriptionChange,
    onCategoryChange,
    onDateChange,
    onNotificationChange,
    onSubmit,
    onClose,
    isEditing
}) {
    return (
        <div className="modal-content">
            <h2>{isEditing ? "Editar Tarea" : "Agregar Nueva Tarea"}</h2>

            <input
                type="text"
                placeholder="Nombre de la tarea"
                value={taskName}
                onChange={onNameChange}
            />

            <textarea
                placeholder="Descripción de la tarea"
                value={description}
                onChange={onDescriptionChange}
            ></textarea>

            <select value={category} onChange={onCategoryChange}>
                {categories
                    .filter(cat => cat !== "Todas")
                    .map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={onDateChange}
            />

            <label>Agregar recordatorio:</label>
            <input
                type="datetime-local"
                value={notificationDateTime}
                onChange={onNotificationChange}
            />
            

            <button className="add-button" onClick={onSubmit}>
                {isEditing ? "Guardar" : "Agregar"}
            </button>

            <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default TaskForm;
