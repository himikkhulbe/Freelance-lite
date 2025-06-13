import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('freelancer'); // Default role
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password, role })
            });

            if (res.ok) {
                // Signup successful
                navigate("/login");
            } else {
                const error = await res.json();
                console.error(error?.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autocomplete="name"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autocomplete="email"
                />
                <input
                    type="password"
                    name="new-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autocomplete="new-password"
                />
                <label>
                    Role:
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="freelancer">Freelancer</option>
                        <option value="client">Client</option>
                    </select>
                </label>

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;
