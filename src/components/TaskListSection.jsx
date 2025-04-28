// components/TaskListSection.jsx
import React from "react";
import TaskItem from "./TaskItem";

function TaskListSection({ tasks, activeTab, activeCategory, onComplete, onEdit, onDelete }) {
    const filteredTasks = tasks
        .filter(task => (activeTab === "Pendientes" ? !task.completed : task.completed))
        .filter(task => activeCategory === "Todas" || task.category === activeCategory)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return (
        <section className="task-section">
            <ul>
                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={() => onComplete(task.id)}
                        onEdit={() => onEdit(task.id)}
                        onDelete={() => onDelete(task.id)}
                    />
                ))}
            </ul>
        </section>
    );
}

export default TaskListSection;
