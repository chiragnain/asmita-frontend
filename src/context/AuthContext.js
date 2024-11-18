// authentication context
// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        try {
            // Attempt to decode the token only if it's valid
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        } catch (error) {
            console.error("Invalid token:", error);
            // Optionally clear any invalid token
            localStorage.removeItem('token');
            setUser(null);
        }
        }
    }, []);

    const login = async (credentials) => {
        const res = await axios.post('/auth/login', credentials);
        const token = res.data.token;
        localStorage.setItem('token', token);
        setUser(jwtDecode(token));
    };

    const register = async (userData) => {
        try {
        const response = await axios.post('/auth/register', userData);
        return response.data; // Return response to handle messages
        } catch (err) {
        throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

   return (
      <AuthContext.Provider value={{ user, login,register, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
 };