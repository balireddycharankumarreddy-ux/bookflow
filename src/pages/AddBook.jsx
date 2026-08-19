import API_BASE from "../config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./AddBook.css";

function AddBook() {
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [bookAdded, setBookAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("Programming");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const bookData = {
                title: title,
                author: author,
                category: category,
                isbn: isbn,
                quantity: Number(quantity),
                availableQuantity: Number(quantity)
            };

            const response = await fetch(
                `${API_BASE}/api/books`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(bookData)
                }
            );

            if (!response.ok) {

                const errorData = await response.text();

                throw new Error(
                    errorData || "Failed to add book"
                );
            }

            const data = await response.json();

            console.log("Book added:", data);

            setBookAdded(true);
            toast("Book added successfully!", "success");
            addNotification(`New book "${title}" added by ${author}`, "book");

            setTitle("");
            setAuthor("");
            setCategory("Programming");
            setIsbn("");
            setQuantity("");

        } catch (error) {

    console.error("ADD BOOK ERROR:", error);
    toast(error.message || "Failed to add book", "error");
} finally {
    setLoading(false);
}
    };

    return (

        <div className="addbook-page">

            <div className="addbook-card">

                <h2>Add New Book</h2>

                {bookAdded && (
                    <div className="alert alert-success">
                        Book added successfully!
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Book Title</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Book Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Author</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Author Name"
                            value={author}
                            onChange={(e) =>
                                setAuthor(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Category</label>

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option>Programming</option>
                            <option>Database</option>
                            <option>Networking</option>
                            <option>AI & ML</option>
                            <option>Mathematics</option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>ISBN Number</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter ISBN"
                            value={isbn}
                            onChange={(e) =>
                                setIsbn(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Quantity</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            min="1"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >
                        {loading ? "Adding Book..." : "Add Book"}
                    </button>

                </form>

                {bookAdded && (

                    <div className="mt-3 d-flex gap-3 justify-content-center">

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                setBookAdded(false)
                            }
                        >
                            Add Another Book
                        </button>

                        <Link
                            to="/books"
                            className="btn btn-secondary"
                        >
                            Back to Books
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AddBook;