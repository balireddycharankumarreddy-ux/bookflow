import { useEffect, useState } from "react";
import { useToast } from "../components/Toast";
import "./Profile.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const loggedInUser =
                    JSON.parse(localStorage.getItem("user"));

                if (!loggedInUser || !loggedInUser.email) {
                    throw new Error("User information not found");
                }

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:8081/api/users/profile/${encodeURIComponent(loggedInUser.email)}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load profile");
                }

                const data = await response.json();

                setUser(data);
                setName(data.name || "");
                setPhone(data.phone || "");

            } catch (err) {

                console.error(err);
                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();

    }, []);

    // UPDATE PROFILE
    const handleSave = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8081/api/users/profile/${encodeURIComponent(user.email)}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();

            setUser(updatedUser);

            // Update localStorage also
            const storedUser =
                JSON.parse(localStorage.getItem("user"));

            const updatedLocalUser = {
                ...storedUser,
                name: updatedUser.name,
                phone: updatedUser.phone
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedLocalUser)
            );

            setEditing(false);

            toast("Profile updated successfully!", "success");

        } catch (err) {

            console.error(err);
            toast("Failed to update profile", "error");

        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <h2>Loading profile...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <h2>{error}</h2>
            </div>
        );
    }

    return (

        <div className="profile-container">

            <div className="profile-card">

                <h1>
                    {editing ? "Edit Profile" : "My Profile"}
                </h1>

                {!editing ? (

                    <>
                        <div className="profile-info">

                            <div>
                                <strong>Name:</strong>
                                <span>{user?.name}</span>
                            </div>

                            <div>
                                <strong>Email:</strong>
                                <span>{user?.email}</span>
                            </div>

                            <div>
                                <strong>Phone:</strong>
                                <span>
                                    {user?.phone || "Not provided"}
                                </span>
                            </div>

                            <div>
                                <strong>Role:</strong>
                                <span>{user?.role}</span>
                            </div>

                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </>

                ) : (

                    <>
                        <div className="edit-profile-form">

                            <div className="form-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>

                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                />
                            </div>

                        </div>

                        <div className="profile-buttons">

                            <button
                                className="save-profile-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                            <button
                                className="cancel-profile-btn"
                                onClick={() => {
                                    setName(user.name || "");
                                    setPhone(user.phone || "");
                                    setEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                        </div>
                    </>

                )}

            </div>

        </div>
    );
}

export default Profile;