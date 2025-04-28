import { useState, useEffect } from "react";
import "../styles/TaskList.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import Tabs from "./Tabs";
import TaskListSection from "../components/TaskListSection";
import useTaskManager from "../hooks/useTaskManager";  // Usamos el hook

function TaskList() {
  const {
    tasks,
    categories,
    theme,
    toggleTheme,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
  } = useTaskManager();

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabajo");
  const [dueDate, setDueDate] = useState("");
  const [activeTab, setActiveTab] = useState("Pendientes");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [editTaskData, setEditTaskData] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const filteredTasks = tasks
    .filter(task => (activeTab === "Pendientes" ? !task.completed : task.completed))
    .filter(task => activeCategory === "Todas" || task.category === activeCategory)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleInputChange = (event) => setNewTask(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleDateChange = (event) => setDueDate(event.target.value);

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      const taskToAdd = {
        id: Date.now(),
        name: newTask,
        category,
        dueDate: dueDate || "2099-12-31",
        description,
        completed: false,
      };
      addTask(taskToAdd);
      setNewTask("");
      setDescription("");
      setCategory("Trabajo");
      setDueDate("");
      setShowModal(false);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskData(taskToEdit);
    }
  };

  const handleSaveEdit = () => {
    editTask(editTaskData);
    setEditTaskData(null);
  };

  const handleCloseEditModal = () => setEditTaskData(null);
  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory("");
  };

  return (
    <div className="task-container">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="layout">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onAddCategory={handleAddCategory}
        />

        <main className="task-content">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

          <button className="new-task-button" onClick={() => setShowModal(!showModal)}>
            Nueva tarea
          </button>

          <TaskListSection
            tasks={filteredTasks}
            activeTab={activeTab}
            activeCategory={activeCategory}
            onComplete={toggleTaskCompletion}
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />

          {showModal && (
            <Modal>
              <TaskForm
                taskName={newTask}
                description={description}
                category={category}
                dueDate={dueDate}
                categories={categories}
                onNameChange={handleInputChange}
                onDescriptionChange={handleDescriptionChange}
                onCategoryChange={handleCategoryChange}
                onDateChange={handleDateChange}
                onSubmit={handleSubmit}
                onClose={() => setShowModal(false)}
                isEditing={false}
              />
            </Modal>
          )}

          {editTaskData && (
            <Modal>
              <TaskForm
                taskName={editTaskData.name}
                description={editTaskData.description || ""}
                category={editTaskData.category}
                dueDate={editTaskData.dueDate}
                categories={categories}
                onNameChange={(e) => setEditTaskData({ ...editTaskData, name: e.target.value })}
                onDescriptionChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                onCategoryChange={(e) => setEditTaskData({ ...editTaskData, category: e.target.value })}
                onDateChange={(e) => setEditTaskData({ ...editTaskData, dueDate: e.target.value })}
                onSubmit={handleSaveEdit}
                onClose={handleCloseEditModal}
                isEditing={true}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

export default TaskList;
