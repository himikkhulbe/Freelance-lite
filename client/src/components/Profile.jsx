import React from "react";
import { useAuth } from "/src/contexts/AuthContext.jsx";

function Profile() {
    const { user } = useAuth();

    if (!user) return <div>Not authenticated</div>;

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
        </div>
    )
}

export default Profile;
