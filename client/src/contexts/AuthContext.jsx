// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

// 1️⃣ Create AuthContext
export const AuthContext = createContext(null);

// 2️⃣ Provide AuthContext to components
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user/profile', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Error fetching profile!', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3️⃣ Custom Hook to consume AuthContext easily
export function useAuth() {
  return useContext(AuthContext);
}
