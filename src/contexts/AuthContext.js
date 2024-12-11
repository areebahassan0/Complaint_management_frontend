import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    // Load user from localStorage when the app starts
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userData = JSON.parse(localStorage.getItem("user"));

        if (token && userData) {
            setAccessToken(token);
            setUser(userData);
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                email,
                password,
            });

            const { access_token, refresh_token, user } = response.data;
            setAccessToken(access_token);
            setUser(user);

            // Store tokens and user data in localStorage
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            localStorage.setItem("user", JSON.stringify(user));

            return { success: true };
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.description || "Login failed" };
        }
    };

    // Logout function
    const logout = () => {
        setAccessToken(null);
        setUser(null);

        // Remove from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
