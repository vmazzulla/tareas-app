// src/components/Header.jsx
import React from "react";

function Header({ theme, toggleTheme }) {
    return (
        <header className="header">
            <h1>TareasAPP</h1>
            <div className="tabs">
                <a href="/" className="tab-link">Tareas</a>
                <a href="/proyectos" className="tab-link">Proyectos</a>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
            </button>
        </header>
    );
}

export default Header;
