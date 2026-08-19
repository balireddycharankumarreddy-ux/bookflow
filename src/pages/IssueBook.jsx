import API_BASE from "../config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./IssueBook.css";

function IssueBook() {
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [issued, setIssued] = useState(false);
    const [error, setError] = useState("");

    const [studentId, setStudentId] = useState("");
    const [bookId, setBookId] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/issues`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        studentId: Number(studentId),
                        bookId: Number(bookId),
                        issueDate: issueDate,
                        returnDate: returnDate
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data || "Unable to issue book"
                );
            }

            console.log("Issue response:", data);

            setIssued(true);
            toast("Book issued successfully!", "success");
            addNotification(`Book ID ${bookId} issued to Student ID ${studentId}`, "issued");

        } catch (error) {

            console.error(error);
            toast(error.message || "Failed to issue book", "error");
        }
    };

    return (
        <div className="issuebook-container">

            <div className="issuebook-card">

                <h2>Issue Book</h2>

                <form onSubmit={handleSubmit}>

                    {/* Student */}

                    <div className="mb-3">

                        <label>Student ID</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Student ID"
                            value={studentId}
                            onChange={(e) =>
                                setStudentId(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Book */}

                    <div className="mb-3">

                        <label>Book ID</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Book ID"
                            value={bookId}
                            onChange={(e) =>
                                setBookId(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Issue Date */}

                    <div className="mb-3">

                        <label>Issue Date</label>

                        <input
                            type="date"
                            className="form-control"
                            value={issueDate}
                            onChange={(e) =>
                                setIssueDate(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Return Date */}

                    <div className="mb-3">

                        <label>Return Date</label>

                        <input
                            type="date"
                            className="form-control"
                            value={returnDate}
                            onChange={(e) =>
                                setReturnDate(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Issue Book
                    </button>

                </form>


                {/* Success */}

                {issued && (

                    <div className="success-message">

                        <h4>
                            ✅ Book Issued Successfully!
                        </h4>

                        <div className="success-buttons">

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIssued(false);
                                    setStudentId("");
                                    setBookId("");
                                    setIssueDate("");
                                    setReturnDate("");
                                }}
                            >
                                Issue Another Book
                            </button>

                            <Link
                                to="/dashboard"
                                className="btn btn-success"
                            >
                                Back to Dashboard
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default IssueBook;