import React, { useState } from "react";
import { useProjectManagerContext } from "../context/ProjectManagerContext";

const ProjectTasks = ({ projectId }) => {
  const { projects, addTaskToProject, toggleTaskCompletion, removeTaskFromProject } = useProjectManagerContext();
  const project = projects.find(p => p.id === projectId);
  const [newTask, setNewTask] = useState("");

  if (!project) return <p>Proyecto no encontrado.</p>;

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTaskToProject(projectId, newTask);
      setNewTask("");
    }
  };

  return (
    <div className="project-tasks">
      <h3>Tareas del Proyecto</h3>

      <div className="task-input">
        <input 
          type="text" 
          placeholder="Agregar nueva tarea..." 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>➕</button>
      </div>

      <ul className="task-list">
        {project.tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTaskCompletion(projectId, task.id)}>
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => removeTaskFromProject(projectId, task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
