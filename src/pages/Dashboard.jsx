import API_BASE from "../config";
import { useEffect, useState } from "react";
import "./Dashboard.css";

import {
    FaBook,
    FaUsers,
    FaExchangeAlt,
    FaClock,
} from "react-icons/fa";

function Dashboard() {

    const [stats, setStats] = useState({
        totalBooks: 0,
        totalStudents: 0,
        issuedBooks: 0,
        dueBooks: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboardStats = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${API_BASE}/api/dashboard/stats`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard statistics");
                }

                const data = await response.json();

                console.log("Dashboard stats:", data);

                setStats({
                    totalBooks: data.totalBooks || 0,
                    totalStudents: data.totalStudents || 0,
                    issuedBooks: data.issuedBooks || 0,
                    dueBooks: data.dueBooks || 0
                });

            } catch (error) {

                console.error(error);

                setError("Unable to load dashboard statistics");

            } finally {

                setLoading(false);

            }
        };

        fetchDashboardStats();

    }, []);

    return (

        <div className="dashboard-content">

            <h1>BookFlow Dashboard</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="dashboard-cards">

                {/* Total Books */}
                <div className="dashboard-card">
                    {loading ? (
                        <div className="skeleton-card">
                            <div className="skeleton-icon" />
                            <div className="skeleton-number" />
                            <div className="skeleton-label" />
                        </div>
                    ) : (
                        <>
                            <FaBook className="card-icon blue" />
                            <h2>{stats.totalBooks}</h2>
                            <p>Total Books</p>
                        </>
                    )}
                </div>

                {/* Students */}
                <div className="dashboard-card">
                    {loading ? (
                        <div className="skeleton-card">
                            <div className="skeleton-icon" />
                            <div className="skeleton-number" />
                            <div className="skeleton-label" />
                        </div>
                    ) : (
                        <>
                            <FaUsers className="card-icon green" />
                            <h2>{stats.totalStudents}</h2>
                            <p>Students</p>
                        </>
                    )}
                </div>

                {/* Issued Books */}
                <div className="dashboard-card">
                    {loading ? (
                        <div className="skeleton-card">
                            <div className="skeleton-icon" />
                            <div className="skeleton-number" />
                            <div className="skeleton-label" />
                        </div>
                    ) : (
                        <>
                            <FaExchangeAlt className="card-icon orange" />
                            <h2>{stats.issuedBooks}</h2>
                            <p>Issued Books</p>
                        </>
                    )}
                </div>

                {/* Due Books */}
                <div className="dashboard-card">
                    {loading ? (
                        <div className="skeleton-card">
                            <div className="skeleton-icon" />
                            <div className="skeleton-number" />
                            <div className="skeleton-label" />
                        </div>
                    ) : (
                        <>
                            <FaClock className="card-icon red" />
                            <h2>{stats.dueBooks}</h2>
                            <p>Due Books</p>
                        </>
                    )}
                </div>

            </div>




        </div>
    );
}

export default Dashboard;