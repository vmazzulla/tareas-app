// src/components/TaskList.jsx
import { useState, useEffect } from "react";
import "../styles/TaskList.css";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import Tabs from "./Tabs";
import TaskListSection from "../components/TaskListSection";
import CalendarView from "../components/CalendarView";
import { useTaskManagerContext } from "../context/TaskManagerContext";

function TaskList() {
  const {
    tasks,
    categories,
    theme,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    deleteCategory,
  } = useTaskManagerContext();

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabajo");
  const [dueDate, setDueDate] = useState("");
  const [notificationDateTime, setNotificationDateTime] = useState("");

  const [activeTab, setActiveTab] = useState("Pendientes");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [editTaskData, setEditTaskData] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredTasks = tasks
    .filter(task => (activeTab === "Pendientes" ? !task.completed : task.completed))
    .filter(task => activeCategory === "Todas" || task.category === activeCategory)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleInputChange = (e) => setNewTask(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDateChange = (e) => setDueDate(e.target.value);
  const handleNotificationChange = (e) => setNotificationDateTime(e.target.value);

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      const taskToAdd = {
        id: Date.now(),
        name: newTask,
        category,
        dueDate: dueDate || "2099-12-31",
        notificationDateTime: notificationDateTime || null,
        description,
        completed: false,
      };
      addTask(taskToAdd);
      setNewTask("");
      setDescription("");
      setCategory("Trabajo");
      setDueDate("");
      setNotificationDateTime("");
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

  const handleToggleCalendar = (showCalendarView) => {
    setShowCalendar(showCalendarView);
  };

  const handleTaskDateChange = (taskId, newDate) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      editTask({ ...taskToUpdate, dueDate: newDate });
    }
  };

  return (
    <div className="task-container">
      <div className="layout">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onAddCategory={handleAddCategory}
          onDeleteCategory={deleteCategory}
          onToggleCalendar={handleToggleCalendar}
        />
        <main className="task-content">
          {showCalendar ? (
            <CalendarView tasks={tasks} onTaskDateChange={handleTaskDateChange} />
          ) : (
            <>
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
            </>
          )}

          {showModal && (
            <Modal>
              <TaskForm
                taskName={newTask}
                description={description}
                category={category}
                dueDate={dueDate}
                notificationDateTime={notificationDateTime}
                categories={categories}
                onNameChange={handleInputChange}
                onDescriptionChange={handleDescriptionChange}
                onCategoryChange={handleCategoryChange}
                onDateChange={handleDateChange}
                onNotificationChange={handleNotificationChange}
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
                notificationDateTime={editTaskData.notificationDateTime || ""}
                categories={categories}
                onNameChange={(e) => setEditTaskData({ ...editTaskData, name: e.target.value })}
                onDescriptionChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                onCategoryChange={(e) => setEditTaskData({ ...editTaskData, category: e.target.value })}
                onDateChange={(e) => setEditTaskData({ ...editTaskData, dueDate: e.target.value })}
                onNotificationChange={(e) => setEditTaskData({ ...editTaskData, notificationDateTime: e.target.value })}
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
