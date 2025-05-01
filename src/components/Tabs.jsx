// src/components/Tabs.jsx
import React from "react";
import { useTaskManagerContext } from "../context/TaskManagerContext";


function Tabs({ activeTab, onTabChange }) {
    const { tasks } = useTaskManagerContext();

    const pendingCount = tasks.filter(task => !task.completed).length;

    return (
        <div className="task-tabs">
            <button
                className={`tab-button ${activeTab === "Pendientes" ? "active" : ""}`}
                onClick={() => onTabChange("Pendientes")}
            >
                Pendientes {pendingCount >= 0 && <span className="count">{pendingCount}</span>}
            </button>
            <button
                className={`tab-button ${activeTab === "Completadas" ? "active" : ""}`}
                onClick={() => onTabChange("Completadas")}
            >
                Completadas
            </button>
        </div>
    );
}

export default Tabs;
