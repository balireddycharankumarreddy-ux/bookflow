import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        // Load notifications from localStorage on initial render
        const saved = localStorage.getItem("notifications");
        return saved ? JSON.parse(saved) : [];
    });

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (message, type = "info") => {
        const newNotification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toISOString(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const clearNotification = (id) => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                markAllAsRead,
                clearNotification,
                clearAllNotifications,
                unreadCount
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
