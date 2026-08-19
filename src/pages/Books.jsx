import API_BASE from "../config";
import "./Books.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";

function Books() {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return books;
    }
    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title?.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query) ||
        book.category?.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);
useEffect(() => {

    const fetchBooks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/books`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }

            const data = await response.json();

            setBooks(data);

        } catch (err) {

            console.error(err);
            setError("Unable to load books");
            toast("Unable to load books", "error");

        } finally {

            setLoading(false);

        }
    };

    fetchBooks();

}, []);
  return (
    <div className="books-container">

      <div className="books-header">
        <h1>Book Management</h1>

        <Link to="/add-book" className="add-book-btn">
    <FaPlus /> Add Book
</Link>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search books by title, author or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="books-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        

        
        <tbody>

    {loading && (
        <tr>
            <td colSpan="6">
                Loading books...
            </td>
        </tr>
    )}

    {error && (
        <tr>
            <td colSpan="6">
                {error}
            </td>
        </tr>
    )}

    {!loading && !error && books.length === 0 && (
        <tr>
            <td colSpan="6">
                No books found
            </td>
        </tr>
    )}

    {!loading && !error && books.length > 0 && filteredBooks.length === 0 && (
        <tr>
            <td colSpan="6">
                No books match your search
            </td>
        </tr>
    )}

    {!loading && !error && filteredBooks.map((book) => (

        <tr key={book.id}>

            <td>{book.id}</td>

            <td>{book.title}</td>

            <td>{book.author}</td>

            <td>{book.category}</td>

            <td>
                {book.availableQuantity > 0 ? "Yes" : "No"}
            </td>

            <td>

                <Link
                    to={`/edit-book/${book.id}`}
                    className="edit-btn"
                >
                    Edit
                </Link>
                <Link
    to={`/delete-book/${book.id}`}
    className="delete-btn"
>
    Delete
</Link>



            </td>

        </tr>

    ))}

</tbody>

      </table>

    </div>
  );
}

export default Books;