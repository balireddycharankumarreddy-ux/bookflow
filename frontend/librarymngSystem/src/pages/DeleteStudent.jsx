import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./DeleteStudent.css";

function DeleteStudent() {

    const { id } = useParams();
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8081/api/students/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const text = await response.text();

            if (!response.ok) {
                throw new Error(
                    text || "Unable to delete student"
                );
            }

            console.log("Delete response:", text);

            setDeleted(true);
            toast("Student deleted successfully!", "success");
            addNotification(`Student with ID ${id} has been deleted`, "deleted");

        } catch (error) {

            console.error(error);
            toast(error.message || "Failed to delete student", "error");
        }
    };

    return (

        <div className="deletestudent-container">

            <div className="deletestudent-card">

                {!deleted ? (

                    <>
                        <h2>Delete Student</h2>

                        <p>
                            Are you sure you want to delete this student?
                        </p>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="buttons">

                            <Link
                                to="/students"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>

                        </div>
                    </>

                ) : (

                    <>
                        <h2>
                            ✅ Student Deleted Successfully!
                        </h2>

                        <Link
                            to="/students"
                            className="btn btn-success mt-4"
                        >
                            Back to Students
                        </Link>
                    </>

                )}

            </div>

        </div>
    );
}

export default DeleteStudent;