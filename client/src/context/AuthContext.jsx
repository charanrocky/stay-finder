import React, { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

// Create Auth Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On app load, check for token in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    } catch (err) {
      console.error("Login failed:", err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await registerUser({ name, email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    } catch (err) {
      console.error("Registration failed:", err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
