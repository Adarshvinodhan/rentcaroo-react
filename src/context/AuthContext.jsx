import React, { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({
      username: decoded.username,
      userid: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    setLoading(false); // Token is now loaded
  };

  // Load token and role from localStorage on initialization
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      setLoading(false);
    }
    else{
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username,
                  userid:decoded.id,
                  email: decoded.email,
                  role: decoded.role
                 });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      setLoading(false);
    }

  }, []);
  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
