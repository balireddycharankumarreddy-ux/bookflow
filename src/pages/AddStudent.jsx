import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useNotifications } from "../components/NotificationContext";
import "./AddStudent.css";

function AddStudent() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [department, setDepartment] = useState("CSE");
    const [year, setYear] = useState("4th Year");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [studentAdded, setStudentAdded] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8081/api/students",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name: name,
                        rollNo: rollNo,
                        department: department,
                        year: year,
                        email: email,
                        phone: phone
                    })
                }
            );

            const text = await response.text();

            if (!response.ok) {

                throw new Error(
                    text || "Unable to add student"
                );
            }

            const data = text ? JSON.parse(text) : null;

            console.log("Student added:", data);

            setStudentAdded(true);
            toast("Student added successfully!", "success");
            addNotification(`New student "${name}" registered (${rollNo})`, "student");

        } catch (error) {

            console.error(error);
            toast(error.message || "Failed to add student", "error");
        }
    };

    const handleAddAnother = () => {

        setStudentAdded(false);

        setName("");
        setRollNo("");
        setDepartment("CSE");
        setYear("4th Year");
        setEmail("");
        setPhone("");
        setError("");
    };

    return (

        <div className="addstudent-container">

            <div className="addstudent-card">

                <h2>Add New Student</h2>

                {!studentAdded ? (

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter student name"
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
                                placeholder="Enter roll number"
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
                                placeholder="Enter email"
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
                                placeholder="Enter phone number"
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
                            className="btn btn-success w-100"
                        >
                            Add Student
                        </button>

                    </form>

                ) : (

                    <div className="success-message">

                        <h4>
                            ✅ Student added successfully!
                        </h4>

                        <div className="mt-3 d-flex justify-content-center gap-3">

                            <button
                                className="btn btn-primary"
                                onClick={handleAddAnother}
                            >
                                Add Another Student
                            </button>

                            <Link
                                to="/students"
                                className="btn btn-secondary"
                            >
                                Back to Students
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AddStudent;