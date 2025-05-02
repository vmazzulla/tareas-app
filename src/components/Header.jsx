// src/components/Header.jsx
import React from "react";
import { Link } from 'react-router-dom'; // Asegúrate de que se importa desde react-router-dom


function Header({ theme, toggleTheme }) {
    return (
        <header className="header">
            <h1>TareasAPP</h1>
            <div className="tabs">
                <Link to="/" className="tab-link">Tareas</Link>
                <Link to="/proyectos" className="tab-link">Proyectos</Link>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
            </button>
        </header>
    );
}

export default Header;
