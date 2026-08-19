import API_BASE from "../config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./ReturnBook.css";

function ReturnBook() {
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [issueId, setIssueId] = useState("");
    const [returned, setReturned] = useState(false);
    const [error, setError] = useState("");

    const handleReturn = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/issues/return/${issueId}`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            const text = await response.text();

if (!response.ok) {
    throw new Error(
        text || "Unable to return book"
    );
}

const data = text ? JSON.parse(text) : null;
            

            console.log("Return response:", data);

            setReturned(true);
            toast("Book returned successfully!", "success");
            addNotification(`Book with Issue ID ${issueId} has been returned`, "returned");

        } catch (error) {

            console.error(error);
            toast(error.message || "Failed to return book", "error");

        }
    };

    return (

        <div className="returnbook-container">

            <div className="returnbook-card">

                <h2>Return Book</h2>

                <form onSubmit={handleReturn}>

                    <div className="mb-3">

                        <label>Issue ID</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Issue ID"
                            value={issueId}
                            onChange={(e) =>
                                setIssueId(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (

                        <div className="alert alert-danger">
                            {error}
                        </div>

                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Return Book
                    </button>

                </form>

                {returned && (

                    <div className="success-message">

                        <h4>
                            ✅ Book Returned Successfully!
                        </h4>

                        <div className="return-buttons">

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setReturned(false);
                                    setIssueId("");
                                }}
                            >
                                Return Another Book
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

export default ReturnBook;