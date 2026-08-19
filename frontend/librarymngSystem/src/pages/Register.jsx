import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8081/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.text();

            if (!response.ok) {
                throw new Error(data || "Registration failed");
            }

            setMessage("Registration successful!");

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);
            setError(error.message);

        }
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h2>Create Account</h2>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                </form>

                <p className="login-link">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;