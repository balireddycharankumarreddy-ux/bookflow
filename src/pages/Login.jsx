import API_BASE from "../config";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../components/Toast";

import loginBg from "../assets/images/login-bg.jpg";

function Login() {

  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        `${API_BASE}/api/users/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

     const data = await response.json();

if (response.ok) {

    toast("Login successful!", "success");

    localStorage.setItem("token", data.token);

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    setTimeout(() => navigate("/dashboard"), 500);

} else {

    toast(data.message || "Invalid email or password", "error");
}

    } catch (error) {

      console.error(error);

      toast(
        "Unable to connect to the server. Make sure Spring Boot is running.",
        "error"
      );
    }
  };

  return (

    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p>
          Login to your Library Management System
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="login-links">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;