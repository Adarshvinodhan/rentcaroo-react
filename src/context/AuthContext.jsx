import React, { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Load token and role from localStorage on initialization
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username,
                  userid:decoded.id,
                  email: decoded.email,
                  role: decoded.role
                 });
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
