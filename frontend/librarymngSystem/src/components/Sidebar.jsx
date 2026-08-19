import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaBookReader, FaTimes } from "react-icons/fa";

import {
  FaHome,
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaUndo,
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

      <div className="logo">
        <span className="logo-text">📚 BookFlow Admin</span>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
          <FaTimes />
        </button>
      </div>

      <ul>
        <li>
    <Link to="/" onClick={onClose}>
        <FaHome />
        <span>Home</span>
    </Link>
     </li>

        <li>
          <Link to="/dashboard" onClick={onClose}>
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/books" onClick={onClose}>
            <FaBook /> Books
          </Link>
        </li>

        <li>
          <Link to="/students" onClick={onClose}>
            <FaUsers /> Students
          </Link>
        </li>
        <li>
        <Link to="/issue-book" onClick={onClose}>
         <FaBookReader /> Issue Book
        </Link>
        </li>

        <li>
        <Link to="/return-book" onClick={onClose}>
       🔄 Return Book
         </Link>
         </li>

        <li>
          <Link to="/reports" onClick={onClose}>
            <FaChartBar /> Reports
          </Link>
        </li>

        <li>
          <Link to="/profile" onClick={onClose}>
            <FaUserCircle /> Profile
          </Link>
        </li>

        <li>
          <Link to="/" onClick={onClose}>
            <FaSignOutAlt /> Logout
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;