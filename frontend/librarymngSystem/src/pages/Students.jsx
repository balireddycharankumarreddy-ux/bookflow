import "./Students.css";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "../components/Toast";

function Students() {
    const { toast } = useToast();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter students based on search query
    const filteredStudents = useMemo(() => {
        if (!searchQuery.trim()) {
            return students;
        }
        const query = searchQuery.toLowerCase();
        return students.filter(
            (student) =>
                student.name?.toLowerCase().includes(query) ||
                student.rollNo?.toLowerCase().includes(query) ||
                student.department?.toLowerCase().includes(query)
        );
    }, [students, searchQuery]);

    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8081/api/students",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                const data = await response.json();

                setStudents(data);

            } catch (err) {

                console.error(err);

                setError("Unable to load students");
                toast("Unable to load students", "error");

            } finally {

                setLoading(false);
            }
        };

        fetchStudents();

    }, []);

    return (

        <div className="students-container">

            <div className="students-header">

                <h1>Student Management</h1>

                <Link
                    to="/add-student"
                    className="add-student-btn"
                >
                    <FaPlus /> Add Student
                </Link>

            </div>


            <div className="search-box">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search by Name, Roll No or Department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

            </div>


            <table className="students-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>

                </thead>


                <tbody>

                    {loading && (

                        <tr>
                            <td colSpan="6">
                                Loading students...
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


                    {!loading &&
                        !error &&
                        students.length === 0 && (

                            <tr>
                                <td colSpan="6">
                                    No students found
                                </td>
                            </tr>

                        )}

                    {!loading &&
                        !error &&
                        students.length > 0 &&
                        filteredStudents.length === 0 && (

                            <tr>
                                <td colSpan="6">
                                    No students match your search
                                </td>
                            </tr>

                        )}


                    {!loading &&
                        !error &&
                        filteredStudents.map((student) => (

                            <tr key={student.id}>

                                <td>
                                    {student.id}
                                </td>

                                <td>
                                    {student.name}
                                </td>

                                <td>
                                    {student.rollNo}
                                </td>

                                <td>
                                    {student.department}
                                </td>

                                <td>
                                    {student.year}
                                </td>

                                <td>

                                    <Link
                                        to={`/edit-student/${student.id}`}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </Link>


                                    <Link
                                        to={`/delete-student/${student.id}`}
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

export default Students;