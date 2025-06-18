import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch('https://freelance-lite.onrender.com/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                setUser(null);
                navigate('/login'); // Redirect back to login
            } else {
                console.error('Failed to logout');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleLogout}>
        Logout
    </button>;
}

export default Logout;
