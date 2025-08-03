import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "../src/pages/Auth/components/Login/Login.jsx";
import Signup from "../src/pages/Auth/components/Signup/Signup.jsx";
import Profile from "../src/components/Profile/Profile.jsx";
import PrivateRoute from "/src/components/PrivateRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import AddService from "../src/components/AddService/AddService.jsx";
import Jobs from "../src/pages/Jobs/Jobs.jsx";
import Services from "./pages/Services/Services.jsx";
import Service from "./pages/Service/Service.jsx";
import AddJob from "./components/AddJob/AddJob.jsx";
import Job from "./pages/Job/Job.jsx";


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
    const { user } = useAuth();
    console.log("User in App:", user);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginGuarded />} />
                <Route path="/signup" element={<SignupGuarded />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/service/:id" element={<Service />} />
                <Route path="/job" element={<Job />} />
                <Route path="/addService" element={<AddService />} />
                <Route path="/addJob" element={<AddJob />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/updateService/:id" element={<AddService />} />
                <Route path="/updateJob/:id" element={<AddJob />} />
            </Routes>
            {/* <Profile /> */}
        </>
    )
}

export default App;    // Simulate API call
