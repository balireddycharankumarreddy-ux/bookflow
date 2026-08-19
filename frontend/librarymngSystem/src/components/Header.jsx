import "./Header.css";
import { useState } from "react";

import {
    FaBell,
    FaSearch,
    FaUserCircle,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import NotificationPanel from "./NotificationPanel";

function Header({ onToggleSidebar }) {

    const [showNotification, setShowNotification] = useState(false);

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
};

    return (
        <header className="header">

            <div className="header-left">
                {/* Hamburger Menu */}
                <button
                    className="hamburger-btn"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaBars className="hamburger-icon" />
                </button>

                <h2>
                    BookFlow Dashboard
                </h2>
            </div>

            <div className="header-right">

                {/* Notification */}
                <div className="notification-container">

                    <FaBell
                        className="header-icon"
                        onClick={() =>
                            setShowNotification(!showNotification)
                        }
                    />

                    {showNotification && (
                        <NotificationPanel />
                    )}

                </div>

                {/* Admin Profile */}
                <div
                    className="admin-profile"
                    onClick={handleProfileClick}
                >

                    <FaUserCircle className="profile-icon" />

                    <span>Admin</span>

                </div>

                {/* Logout */}
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Header;