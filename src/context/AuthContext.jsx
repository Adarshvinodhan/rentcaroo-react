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
    localStorage.setItem("role", decoded.role); // Save role in localStorage
    setLoading(false);
  };

  const handleGoogleAuth = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      try {
        // Process token from Google Auth
        login(token);

        // Clear the token from the URL
        const url = new URL(window.location);
        url.searchParams.delete("token");
        window.history.replaceState({}, document.title, url.pathname);

        console.log("Google Auth token processed and stored successfully.");
      } catch (error) {
        console.error("Error processing Google Auth token:", error);
      }
    }
  };

  // Load token and role from localStorage on initialization
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      setLoading(false);
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.username,
          userid: decoded.id,
          email: decoded.email,
          role: decoded.role,
        });
        localStorage.setItem("role", decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      setLoading(false);
    }

    // Handle Google Auth if redirected with a token
    handleGoogleAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
