// App.jsx
import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "/src/components/Signup.jsx";
import Login from "/src/components/Login.jsx";
import Profile from "/src/components/Profile.jsx";
import Logout from "/src/components/Logout.jsx";
import PrivateRoute from "/src/components/PrivateRoute.jsx";
import { useAuth } from "/src/contexts/AuthContext.jsx";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-200" style={{ marginBottom: '20px' }}>
      <Link to="/">Home</Link>{" | "}
      {user ? (
        <>
          <Link to="/profile">Profile</Link>{" | "}
          <Logout />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/signup">Signup</Link>
        </>
      )}

    </nav>
  )
}

function SignupGuarded() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }
  return <Signup />;
}

function LoginGuarded() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }
  return <Login />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginGuarded />} />
        <Route path="/signup" element={<SignupGuarded />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </>
  )
}

export default App;


