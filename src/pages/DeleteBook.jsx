import API_BASE from "../config";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./DeleteBook.css";

function DeleteBook() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [deleted, setDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        setDeleting(true);
        setError("");

        try {

            const token = localStorage.getItem("token");

            // Check login
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE}/api/books/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Failed to delete book"
                );
            }

            setDeleted(true);
            toast("Book deleted successfully!", "success");
            addNotification(`Book with ID ${id} has been deleted`, "deleted");

        } catch (error) {

            console.error("DELETE BOOK ERROR:", error);
            toast(error.message || "Failed to delete book", "error");

        } finally {

            setDeleting(false);
        }
    };

    return (

        <div className="delete-page">

            <div className="delete-card">

                {!deleted ? (

                    <>

                        <h2>Delete Book</h2>

                        <p>
                            Are you sure you want to delete this book?
                        </p>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="buttons">

                            <Link
                                to="/books"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >

                                {deleting
                                    ? "Deleting..."
                                    : "Delete"
                                }

                            </button>

                        </div>

                    </>

                ) : (

                    <>

                        <h2>
                            ✅ Book Deleted Successfully!
                        </h2>

                        <p>
                            The book has been removed from the library.
                        </p>

                        <Link
                            to="/books"
                            className="btn btn-success mt-4"
                        >
                            Back to Books
                        </Link>

                    </>

                )}

            </div>

        </div>
    );
}

export default DeleteBook;