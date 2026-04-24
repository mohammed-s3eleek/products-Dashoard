import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d", // Token expires in 7 days
	});
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
	try {
		const { name, email, password, passwordConfirm } = req.body;

		// Validation
		if (!name || !email || !password || !passwordConfirm) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password !== passwordConfirm) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		}

		// Check if user already exists
		const userExists = await User.findOne({ where: { email } });
		if (userExists) {
			return res.status(400).json({ message: "Email already in use" });
		}

		// Create new user
		const user = await User.create({ name, email, password });

		// Generate token
		const token = generateToken(user.id);

		// Return user and token (excluding password)
		const userResponse = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		res.status(201).json({
			message: "User registered successfully",
			user: userResponse,
			token,
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ message: error.message });
	}
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validation
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Please provide email and password" });
		}

		// Check for user
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		// Check password
		const isPasswordMatch = await user.matchPassword(password);
		if (!isPasswordMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		// Generate token
		const token = generateToken(user.id);

		// Return user and token (excluding password)
		const userResponse = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		res.status(200).json({
			message: "Login successful",
			user: userResponse,
			token,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: error.message });
	}
});

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", authMiddleware, async (req, res) => {
	try {
		const user = await User.findByPk(req.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({
			message: "User profile retrieved",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.error("Get user error:", error);
		res.status(500).json({ message: error.message });
	}
});

export default router;
