import API_BASE from "../config";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";
import "./EditStudent.css";

function EditStudent() {

    const { id } = useParams();
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState("");

    // Get student details
    useEffect(() => {

        const fetchStudent = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${API_BASE}/api/students/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Student not found");
                }

                const student = await response.json();

                setName(student.name);
                setRollNo(student.rollNo);
                setDepartment(student.department);
                setYear(student.year);
                setEmail(student.email);
                setPhone(student.phone);

            } catch (error) {

                console.error(error);
                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchStudent();

    }, [id]);


    // Update student
    const handleUpdate = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/students/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        rollNo,
                        department,
                        year,
                        email,
                        phone
                    })
                }
            );

            const text = await response.text();

            if (!response.ok) {

                throw new Error(
                    text || "Unable to update student"
                );
            }

            console.log("Updated student:", text);

            setUpdated(true);
            toast("Student updated successfully!", "success");

        } catch (error) {

            console.error(error);
            toast(error.message || "Failed to update student", "error");

        }
    };


    if (loading) {

        return (
            <div className="editstudent-container">
                <h3>Loading student...</h3>
            </div>
        );

    }


    return (

        <div className="editstudent-container">

            <div className="editstudent-card">

                {!updated ? (

                    <>
                        <h2>Edit Student</h2>

                        <form onSubmit={handleUpdate}>

                            <div className="mb-3">

                                <label>Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="mb-3">

                                <label>Roll Number</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={rollNo}
                                    onChange={(e) =>
                                        setRollNo(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="mb-3">

                                <label>Department</label>

                                <select
                                    className="form-select"
                                    value={department}
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                >
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                </select>

                            </div>


                            <div className="mb-3">

                                <label>Year</label>

                                <select
                                    className="form-select"
                                    value={year}
                                    onChange={(e) =>
                                        setYear(e.target.value)
                                    }
                                >
                                    <option value="1st Year">
                                        1st Year
                                    </option>
                                    <option value="2nd Year">
                                        2nd Year
                                    </option>
                                    <option value="3rd Year">
                                        3rd Year
                                    </option>
                                    <option value="4th Year">
                                        4th Year
                                    </option>
                                </select>

                            </div>


                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="mb-3">

                                <label>Phone</label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
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
                                Update Student
                            </button>

                        </form>
                    </>

                ) : (

                    <div className="success-message">

                        <h4>
                            ✅ Student updated successfully!
                        </h4>

                        <Link
                            to="/students"
                            className="btn btn-success mt-3"
                        >
                            Back to Students
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );
}

export default EditStudent;