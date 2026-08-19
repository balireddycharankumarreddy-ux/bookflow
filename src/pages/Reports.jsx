import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {

    const [report, setReport] = useState({
        totalBooks: 0,
        totalStudents: 0,
        issuedBooks: 0,
        dueBooks: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchReport = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8081/api/reports/summary",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch report");
                }

                const data = await response.json();

                console.log("Report:", data);

                setReport({
                    totalBooks: data.totalBooks || 0,
                    totalStudents: data.totalStudents || 0,
                    issuedBooks: data.issuedBooks || 0,
                    dueBooks: data.dueBooks || 0
                });

            } catch (error) {

                console.error(error);
                setError("Unable to load report");

            } finally {

                setLoading(false);

            }
        };

        fetchReport();

    }, []);

    return (

        <div className="reports-container">

            <h1>BookFlow Reports</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="report-cards">

                <div className="report-card">
                    <h2>
                        {loading ? "..." : report.totalBooks}
                    </h2>
                    <p>Total Books</p>
                </div>

                <div className="report-card">
                    <h2>
                        {loading ? "..." : report.totalStudents}
                    </h2>
                    <p>Total Students</p>
                </div>

                <div className="report-card">
                    <h2>
                        {loading ? "..." : report.issuedBooks}
                    </h2>
                    <p>Issued Books</p>
                </div>

                <div className="report-card">
                    <h2>
                        {loading ? "..." : report.dueBooks}
                    </h2>
                    <p>Due Books</p>
                </div>

            </div>

        </div>
    );
}

export default Reports;