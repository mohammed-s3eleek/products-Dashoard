import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Initialize auth state from localStorage
	useEffect(() => {
		const savedToken = localStorage.getItem("authToken");
		if (savedToken) {
			setToken(savedToken);
			// Optionally verify token with backend
			verifyToken(savedToken);
		} else {
			setLoading(false);
		}
	}, []);

	// Verify token with backend
	const verifyToken = async (token) => {
		try {
			const response = await axios.get(`${API_URL}/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(response.data.user);
			setLoading(false);
		} catch (err) {
			console.error("Token verification failed:", err);
			localStorage.removeItem("authToken");
			setToken(null);
			setUser(null);
			setLoading(false);
		}
	};

	// Register user
	const register = async (name, email, password, passwordConfirm) => {
		setError(null);
		try {
			const response = await axios.post(`${API_URL}/register`, {
				name,
				email,
				password,
				passwordConfirm,
			});

			const { token, user } = response.data;
			localStorage.setItem("authToken", token);
			setToken(token);
			setUser(user);
			return response.data;
		} catch (err) {
			const message =
				err.response?.data?.message || "Registration failed. Please try again.";
			setError(message);
			throw new Error(message);
		}
	};

	// Login user
	const login = async (email, password) => {
		setError(null);
		try {
			const response = await axios.post(`${API_URL}/login`, {
				email,
				password,
			});

			const { token, user } = response.data;
			localStorage.setItem("authToken", token);
			setToken(token);
			setUser(user);
			return response.data;
		} catch (err) {
			const message =
				err.response?.data?.message || "Login failed. Please try again.";
			setError(message);
			throw new Error(message);
		}
	};

	// Logout user
	const logout = () => {
		localStorage.removeItem("authToken");
		setToken(null);
		setUser(null);
		setError(null);
	};

	const value = {
		user,
		token,
		loading,
		error,
		isAuthenticated: !!token,
		register,
		login,
		logout,
		setError,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
