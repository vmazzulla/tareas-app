import { useEffect, useRef } from "react";

const useNotifications = (tasks) => {
  const notificationTimeouts = useRef([]);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Limpiar notificaciones previas
    notificationTimeouts.current.forEach(clearTimeout);
    notificationTimeouts.current = [];

    tasks.forEach((task) => {
      if (task.notificationDateTime) {
        const notificationTime = new Date(task.notificationDateTime).getTime();
        const currentTime = Date.now();
        const timeDifference = notificationTime - currentTime;

        if (timeDifference > 0) {
          const timeoutId = setTimeout(() => {
            new Notification("Tarea pendiente!", { body: task.name });
          }, timeDifference);

          notificationTimeouts.current.push(timeoutId);
        }
      }
    });

    return () => notificationTimeouts.current.forEach(clearTimeout);
  }, [tasks]);

  return { notificationTimeouts };
};

export default useNotifications;
