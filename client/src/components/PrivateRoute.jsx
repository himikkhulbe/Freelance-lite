import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext.jsx";

// This route lets you view children ONLY if you're authenticated
function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
