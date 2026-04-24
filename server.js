import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "your-production-url.com"
				: "http://localhost:5173", // Vite default port
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize and authenticate Sequelize (MySQL)
const initDb = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("✓ MySQL (Sequelize) connected and synced successfully");
	} catch (error) {
		console.error("✗ MySQL connection error:", error.message);
		process.exit(1);
	}
};

initDb();

// Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error("Error:", err);
	res.status(err.status || 500).json({
		message: err.message || "Internal server error",
	});
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`\n🚀 Server running on http://localhost:${PORT}`);
	console.log(`📝 Environment: ${process.env.NODE_ENV}\n`);
});
