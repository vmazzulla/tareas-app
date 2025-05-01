// DraggableTask.jsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
    padding: "4px",
    borderRadius: "4px",
    marginBottom: "4px",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="task-item"
    >
      • {task.name}
    </div>
  );
}

export default DraggableTask;
