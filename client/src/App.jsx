import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Auth/components/Login/LoginForm.jsx"; 
import Signup from "./pages/Auth/components/Signup/Signup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import PrivateRoute from "/src/components/PrivateRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AddService from "./components/AddService/AddService.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Services from "./pages/Services/Services.jsx";
import Service from "./pages/Service/Service.jsx";
import AddJob from "./components/AddJob/AddJob.jsx";
import Job from "./pages/Job/Job.jsx";
import Home from "./pages/Home/HomePage.jsx";
// import OrderReceived from "./pages/OrderReceived/OrderReceived.jsx";
import MyProposals from "./pages/MyProposals/MyProposals.jsx";
import ProposalReceived from "./pages/ProposalReceived/ProposalReceived.jsx"
import OrderReceived from "./pages/OrderReceived/OrderReceived.jsx"
import MyOrder from "./pages/MyOrder/MyOrder.jsx"






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
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/service/:id" element={<Service />} />
                <Route path="/job/:id" element={<Job />} />
                <Route path="/addService" element={<AddService />} />
                <Route path="/addJob" element={<AddJob />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/updateService/:id" element={<AddService />} />
                <Route path="/updateJob/:id" element={<AddJob />} />
                <Route path="/" element={<Home />} />
                <Route path="/myproposals" element={<MyProposals />} />
                <Route path="/proposalsreceived" element={<ProposalReceived />} />
                <Route path="/orderreceived" element={<OrderReceived />} />
                <Route path="/myorder" element={<MyOrder />} />
            </Routes>
            {/* <Profile /> */}
        </>
    )
}

export default App;    // Simulate API call