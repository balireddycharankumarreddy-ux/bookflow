import { Link } from "react-router-dom";
import { FaBookOpen, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <FaBookOpen className="me-2" />
          Library Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" />
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FaSignInAlt className="me-1" />
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FaUserPlus className="me-1" />
                Register
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;