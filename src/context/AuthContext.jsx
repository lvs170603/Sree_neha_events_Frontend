import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token or just set state (basic implementation)
            // In a real app, you might want to verify token with backend
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const sendOtp = async (email) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { email });
            return { success: true, message: res.data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Failed to send OTP' };
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email, otp });
            localStorage.setItem('token', res.data.token);
            setUser({ token: res.data.token });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Verification failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, sendOtp, verifyOtp, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
