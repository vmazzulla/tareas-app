// src/components/Tabs.jsx
import React from "react";

function Tabs({ activeTab, onTabChange }) {
    return (
        <div className="task-tabs">
            <button
                className={`tab-button ${activeTab === "Pendientes" ? "active" : ""}`}
                onClick={() => onTabChange("Pendientes")}
            >
                Pendientes
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
