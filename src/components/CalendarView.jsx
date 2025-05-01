import React, { useState } from "react";
import "../styles/TaskList.css";
import { DndContext } from '@dnd-kit/core';
import DraggableTask from './DraggableTask';
import DroppableDay from './DroppableDay';

function CalendarView({ tasks, onTaskDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const firstDayOfWeek = startOfMonth.getDay(); 
  const today = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const getTasksForDay = (day) => {
    const dayString = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day).toISOString().slice(0, 10);
    return tasks.filter(task => task.dueDate.slice(0, 10) === dayString);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id && over.id) {
      const taskId = active.id;
      const newDate = over.id;
      onTaskDateChange(taskId, newDate); // Propagamos la actualización
    }
  };

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const getPrevMonthDays = (firstDayOfWeek) => firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const getNextMonthDays = (daysInMonth, firstDayOfWeek) => {
    const totalDaysInGrid = Math.ceil((daysInMonth + getPrevMonthDays(firstDayOfWeek)) / 7) * 7;
    return totalDaysInGrid - (daysInMonth + getPrevMonthDays(firstDayOfWeek));
  };

  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToCurrentMonth = () => setCurrentDate(new Date());

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="calendar-view">
        <div className="calendar-header">
          <div className="left-buttons">
            <button className="calendar-btns" onClick={goToCurrentMonth}>Mes Actual</button>
          </div>
          <h2>Calendario - {currentMonth} {currentYear}</h2>
          <div className="right-buttons">
            <button className="calendar-btns" onClick={goToPreviousMonth}>Anterior</button>
            <button className="calendar-btns" onClick={goToNextMonth}>Siguiente</button>
          </div>
        </div>

        <div className="calendar-weekdays">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {/* Días del mes anterior */}
          {Array.from({ length: getPrevMonthDays(firstDayOfWeek) }, (_, index) => {
            const prevMonthDay = lastDayOfPrevMonth - getPrevMonthDays(firstDayOfWeek) + index + 1;
            return (
              <div key={`prev-${prevMonthDay}`} className="calendar-day prev-month">
                <div className="day-number">{prevMonthDay}</div>
              </div>
            );
          })}

          {/* Días del mes actual */}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const dayString = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day).toISOString().slice(0, 10);
            const dayTasks = getTasksForDay(day);
            const isToday = day === today.getDate() &&
                            currentDate.getMonth() === today.getMonth() &&
                            currentDate.getFullYear() === today.getFullYear();

            return (
              <DroppableDay key={day} id={dayString} className={`calendar-day ${isToday ? 'today' : ''}`}>
                <div className="day-number">{day}</div>
                <div className="tasks-list">
                  {dayTasks.map(task => (
                    <DraggableTask key={task.id} task={task} />
                  ))}
                </div>
              </DroppableDay>
            );
          })}

          {/* Días del mes siguiente */}
          {Array.from({ length: getNextMonthDays(daysInMonth, firstDayOfWeek) }, (_, index) => {
            const nextMonthDay = index + 1;
            return (
              <div key={`next-${nextMonthDay}`} className="calendar-day next-month">
                <div className="day-number">{nextMonthDay}</div>
              </div>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}

export default CalendarView;
