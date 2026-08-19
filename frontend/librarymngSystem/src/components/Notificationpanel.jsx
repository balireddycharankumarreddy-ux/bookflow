import "./NotificationPanel.css";

function NotificationPanel() {

  const notifications = [
    "📚 Java Programming was issued.",
    "👨‍🎓 New student registered.",
    "📖 Python book added.",
    "⚠️ 2 books are overdue.",
    "✅ React book returned."
  ];

  return (
    <div className="notification-panel">

      <h3>Notifications</h3>

      {notifications.map((item, index) => (
        <div
          key={index}
          className="notification-item"
        >
          {item}
        </div>
      ))}

    </div>
  );
}

export default NotificationPanel;