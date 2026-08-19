import API_BASE from "../config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";
import "./AddBook.css";

function EditBook() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("Programming");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");

    const [bookUpdated, setBookUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    // Load existing book
    useEffect(() => {

        const fetchBook = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `${API_BASE}/api/books/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load book");
                }

                const data = await response.json();

                setTitle(data.title);
                setAuthor(data.author);
                setCategory(data.category);
                setIsbn(data.isbn);
                setQuantity(data.quantity);

            } catch (error) {

                console.error(error);
                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchBook();

    }, [id, navigate]);


    // Update book
    const handleUpdate = async (e) => {

        e.preventDefault();

        setError("");
        setBookUpdated(false);
        setUpdating(true);

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const bookData = {
                title: title,
                author: author,
                category: category,
                isbn: isbn,
                quantity: Number(quantity),
                availableQuantity: Number(quantity)
            };

            const response = await fetch(
                `${API_BASE}/api/books/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(bookData)
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Failed to update book"
                );
            }

            const data = await response.json();

            console.log("Updated book:", data);

            setBookUpdated(true);
            toast("Book updated successfully!", "success");

        } catch (error) {

            console.error("UPDATE BOOK ERROR:", error);
            toast(error.message || "Failed to update book", "error");

        } finally {

            setUpdating(false);

        }
    };


    if (loading) {

        return (
            <div className="addbook-page">
                <div className="addbook-card">
                    <h2>Loading Book...</h2>
                </div>
            </div>
        );
    }


    return (

        <div className="addbook-page">

            <div className="addbook-card">

                <h2>Edit Book</h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {bookUpdated && (
                    <div className="alert alert-success">

                        <h4>✅ Book updated successfully!</h4>

                        <div className="mt-3">

                            <Link
                                to="/books"
                                className="btn btn-success"
                            >
                                Back to Books
                            </Link>

                        </div>

                    </div>
                )}

                <form onSubmit={handleUpdate}>

                    {/* Book Title */}

                    <div className="mb-3">

                        <label>Book Title</label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Author */}

                    <div className="mb-3">

                        <label>Author</label>

                        <input
                            type="text"
                            className="form-control"
                            value={author}
                            onChange={(e) =>
                                setAuthor(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Category */}

                    <div className="mb-3">

                        <label>Category</label>

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="Programming">
                                Programming
                            </option>

                            <option value="Database">
                                Database
                            </option>

                            <option value="Networking">
                                Networking
                            </option>

                            <option value="AI & ML">
                                AI & ML
                            </option>

                            <option value="Mathematics">
                                Mathematics
                            </option>

                        </select>

                    </div>


                    {/* ISBN */}

                    <div className="mb-3">

                        <label>ISBN</label>

                        <input
                            type="text"
                            className="form-control"
                            value={isbn}
                            onChange={(e) =>
                                setIsbn(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Quantity */}

                    <div className="mb-3">

                        <label>Quantity</label>

                        <input
                            type="number"
                            className="form-control"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            min="1"
                            required
                        />

                    </div>


                    {!bookUpdated && (

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={updating}
                        >

                            {updating
                                ? "Updating Book..."
                                : "Update Book"
                            }

                        </button>

                    )}

                </form>

            </div>

        </div>
    );
}

export default EditBook;