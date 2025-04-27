import { useState, useEffect } from "react";
import "../styles/TaskList.css";
import TaskItem from "../components/TaskItem";

function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabajo");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Pendientes");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [editTask, setEditTask] = useState(null);
  const [theme, setTheme] = useState("light");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Todas", "Trabajo", "Estudio", "Personal"]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["Todas", "Trabajo", "Estudio", "Personal"];
    setCategories(savedCategories);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleDateChange(event) {
    setDueDate(event.target.value);
  }

  function handleSubmit() {
    if (newTask.trim() !== "") {
      const taskToAdd = {
        id: Date.now(),
        name: newTask,
        category,
        dueDate: dueDate || "2099-12-31",
        description,
        completed: false,
      };
      const updatedTasks = [...tasks, taskToAdd];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
      setDescription("");
      setCategory("Trabajo");
      setDueDate("");
      setShowModal(false);
    }
  }

  function handleCompleteTask(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setTimeout(() => {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }, 50);
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleSidebarCategoryChange(category) {
    setActiveCategory(category);
  }

  function handleEditTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditTask(taskToEdit);
    }
  }

  function handleCloseEditModal() {
    setEditTask(null);
  }

  function handleSaveEdit() {
    const updatedTasks = tasks.map(task =>
      task.id === editTask.id ? editTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditTask(null);
  }

  function handleAddCategory() {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory("");
    }
  }

  const filteredTasks = tasks
    .filter(task => (activeTab === "Pendientes" ? !task.completed : task.completed))
    .filter(task => activeCategory === "Todas" || task.category === activeCategory)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="task-container">
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

      <div className="layout">
        <aside className="sidebar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-button ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleSidebarCategoryChange(cat)}
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
            <button className="add-category" onClick={handleAddCategory}>+</button>
          </div>
        </aside>

        <main className="task-content">
          <div className="task-tabs">
            <button
              className={`tab-button ${activeTab === "Pendientes" ? "active" : ""}`}
              onClick={() => handleTabChange("Pendientes")}
            >
              Pendientes
            </button>
            <button
              className={`tab-button ${activeTab === "Completadas" ? "active" : ""}`}
              onClick={() => handleTabChange("Completadas")}
            >
              Completadas
            </button>
          </div>

          <button className="new-task-button" onClick={toggleModal}>Nueva tarea</button>

          <section className="task-section">
            <ul>
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={() => handleCompleteTask(task.id)}
                  onEdit={() => handleEditTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </ul>
          </section>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Agregar Nueva Tarea</h2>
                <input
                  type="text"
                  placeholder="Nombre de la tarea"
                  value={newTask}
                  onChange={handleInputChange}
                />
                <textarea
                  placeholder="Descripción de la tarea"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
                <select value={category} onChange={handleCategoryChange}>
                  {categories
                    .filter(cat => cat !== "Todas")
                    .map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input type="date" value={dueDate} onChange={handleDateChange} />
                <button className="add-button" onClick={handleSubmit}>Agregar</button>
                <button className="close-button" onClick={toggleModal}>Cerrar</button>
              </div>
            </div>
          )}

          {editTask && (
            <div className="modal">
              <div className="modal-content">
                <h2>Editar Tarea</h2>
                <input
                  type="text"
                  value={editTask.name}
                  onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
                />
                <textarea
                  placeholder="Descripción"
                  value={editTask.description || ""}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                ></textarea>
                <select
                  value={editTask.category}
                  onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                >
                  {categories
                    .filter(cat => cat !== "Todas")
                    .map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                  type="date"
                  value={editTask.dueDate}
                  onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                />
                <button className="add-button" onClick={handleSaveEdit}>Guardar</button>
                <button className="close-button" onClick={handleCloseEditModal}>Cerrar</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TaskList;
