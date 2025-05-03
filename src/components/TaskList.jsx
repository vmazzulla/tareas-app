import { useReducer, useEffect } from "react";
import "../styles/TaskList.css";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import Tabs from "./Tabs";
import TaskListSection from "../components/TaskListSection";
import CalendarView from "../components/CalendarView";
import { useTaskManagerContext } from "../context/TaskManagerContext";

const initialState = {
  showModal: false,
  newTask: "",
  description: "",
  category: "Trabajo",
  dueDate: "",
  notificationDateTime: "",
  activeTab: "Pendientes",
  activeCategory: "Todas",
  editTaskData: null,
  newCategory: "",
  showCalendar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, showModal: !state.showModal };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_ACTIVE_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "SET_NEW_TASK":
      return { ...state, newTask: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_DUE_DATE":
      return { ...state, dueDate: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notificationDateTime: action.payload };
    case "SET_EDIT_TASK":
      return { ...state, editTaskData: action.payload };
    case "CLOSE_EDIT_MODAL":
      return { ...state, editTaskData: null };
    case "SET_NEW_CATEGORY":
      return { ...state, newCategory: action.payload };
    case "TOGGLE_CALENDAR":
      return { ...state, showCalendar: action.payload };
    default:
      return state;
  }
};

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

  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTasks = tasks
    .filter(task => (state.activeTab === "Pendientes" ? !task.completed : task.completed))
    .filter(task => state.activeCategory === "Todas" || task.category === state.activeCategory)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = () => {
    if (state.newTask.trim() !== "") {
      const taskToAdd = {
        id: Date.now(),
        name: state.newTask,
        category: state.category,
        dueDate: state.dueDate || "2099-12-31",
        notificationDateTime: state.notificationDateTime || null,
        description: state.description,
        completed: false,
      };
      addTask(taskToAdd);
      dispatch({ type: "TOGGLE_MODAL" });
      dispatch({ type: "SET_NEW_TASK", payload: "" });
      dispatch({ type: "SET_DESCRIPTION", payload: "" });
      dispatch({ type: "SET_CATEGORY", payload: "Trabajo" });
      dispatch({ type: "SET_DUE_DATE", payload: "" });
      dispatch({ type: "SET_NOTIFICATION", payload: "" });
    }
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
          activeCategory={state.activeCategory}
          onCategoryChange={(category) => dispatch({ type: "SET_ACTIVE_CATEGORY", payload: category })}
          newCategory={state.newCategory}
          setNewCategory={(e) => dispatch({ type: "SET_NEW_CATEGORY", payload: e.target.value })}
          onAddCategory={() => {
            addCategory(state.newCategory);
            dispatch({ type: "SET_NEW_CATEGORY", payload: "" });
          }}
          onDeleteCategory={deleteCategory}
          onToggleCalendar={(showCalendarView) => dispatch({ type: "TOGGLE_CALENDAR", payload: showCalendarView })}
        />
        <main className="task-content">
          {state.showCalendar ? (
            <CalendarView tasks={tasks} onTaskDateChange={handleTaskDateChange} />
          ) : (
            <>
              <Tabs activeTab={state.activeTab} onTabChange={(tab) => dispatch({ type: "SET_ACTIVE_TAB", payload: tab })} />
              <button className="new-task-button" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>
                Nueva tarea
              </button>
              <TaskListSection
                tasks={filteredTasks}
                activeTab={state.activeTab}
                activeCategory={state.activeCategory}
                onComplete={toggleTaskCompletion}
                onEdit={(id) => dispatch({ type: "SET_EDIT_TASK", payload: tasks.find(task => task.id === id) })}
                onDelete={deleteTask}
              />
            </>
          )}

          {state.showModal && (
            <Modal>
              <TaskForm
                taskName={state.newTask}
                description={state.description}
                category={state.category}
                dueDate={state.dueDate}
                notificationDateTime={state.notificationDateTime}
                categories={categories}
                onNameChange={(e) => dispatch({ type: "SET_NEW_TASK", payload: e.target.value })}
                onDescriptionChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
                onCategoryChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}
                onDateChange={(e) => dispatch({ type: "SET_DUE_DATE", payload: e.target.value })}
                onNotificationChange={(e) => dispatch({ type: "SET_NOTIFICATION", payload: e.target.value })}
                onSubmit={handleSubmit}
                onClose={() => dispatch({ type: "TOGGLE_MODAL" })}
                isEditing={false}
              />
            </Modal>
          )}

          {state.editTaskData && (
            <Modal>
              <TaskForm
                taskName={state.editTaskData.name}
                description={state.editTaskData.description || ""}
                category={state.editTaskData.category}
                dueDate={state.editTaskData.dueDate}
                notificationDateTime={state.editTaskData.notificationDateTime || ""}
                categories={categories}
                onNameChange={(e) => dispatch({ type: "SET_EDIT_TASK", payload: { ...state.editTaskData, name: e.target.value } })}
                onDescriptionChange={(e) => dispatch({ type: "SET_EDIT_TASK", payload: { ...state.editTaskData, description: e.target.value } })}
                onCategoryChange={(e) => dispatch({ type: "SET_EDIT_TASK", payload: { ...state.editTaskData, category: e.target.value } })}
                onDateChange={(e) => dispatch({ type: "SET_EDIT_TASK", payload: { ...state.editTaskData, dueDate: e.target.value } })}
                onNotificationChange={(e) => dispatch({ type: "SET_EDIT_TASK", payload: { ...state.editTaskData, notificationDateTime: e.target.value } })}
                onSubmit={() => {
                  editTask(state.editTaskData);
                  dispatch({ type: "CLOSE_EDIT_MODAL" });
                }}
                onClose={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
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
