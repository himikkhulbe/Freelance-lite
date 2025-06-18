import React from "react";
import { useAuth } from "/src/contexts/AuthContext.jsx";

function Profile() {
    const { user } = useAuth();

    if (!user) return <div>Not authenticated</div>;

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Phone:</strong> {user?.contactInfo?.phone || "N/A"}</p>
            <p><strong>Average Rating:</strong> {user?.averageRating}</p>
            <p><strong>Skills:</strong> {user?.skills?.length ? user.skills.join(', ') : "None"}</p>
            <p><strong>Languages:</strong> {user?.Languages?.length ? user.Languages.join(', ') : "None"}</p>
            <p><strong>LinkedIn:</strong> {user?.socialMedia?.Linkedin || "N/A"}</p>
            <p><strong>GitHub:</strong> {user?.socialMedia?.Github || "N/A"}</p>
            <p><strong>Twitter:</strong> {user?.socialMedia?.Twitter || "N/A"}</p>
            <p><strong>Portfolio:</strong> {user?.socialMedia?.Portfolio || "N/A"}</p>
            <p><strong>Joined On:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default Profile;
