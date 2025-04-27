function TaskItem({ task, onComplete, onEdit, onDelete }) {
    return (
        <li
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={() => onEdit()}
        >
            <span
                className="task-circle"
                onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                }}
            >
                {task.completed ? "🟢" : "⚪"}
            </span>

            <span>
                {task.name}{" "}
                <span className="category">#{task.category}</span>
            </span>

            <span className="due-date">
                📅 {task.dueDate || "Sin fecha"}
            </span>

            <button
                className="delete-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                ❌
            </button>
        </li>
    );
}

export default TaskItem;
