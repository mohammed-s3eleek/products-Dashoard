<<<<<<< HEAD
# Mini Product Dashboard Backend API

A Node.js + Express backend with JWT authentication and MongoDB integration for the mini product dashboard.

## Features

- ✅ User registration and login with JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with authentication middleware
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for React frontend
- ✅ Environment variables with dotenv

## Project Structure

```
server/
├── models/
│   └── User.js              # User schema and model
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── authMiddleware.js    # JWT verification middleware
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables (template)
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `server` directory and configure:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/mini-product-dashboard
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-product-dashboard

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 3. Install MongoDB (Local Setup)

**Option A: Using MongoDB Community Edition locally**

- Download: https://www.mongodb.com/try/download/community
- Install and start the MongoDB service
- Default connection: `mongodb://localhost:27017`

**Option B: Using MongoDB Atlas (Cloud)**

- Sign up at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database`
- Update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run on `http://localhost:5000` (or your configured PORT)

## API Endpoints

### Authentication Routes

#### 1. Register User

**POST** `/api/auth/register`

Request body:

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "password123",
	"passwordConfirm": "password123"
}
```

Response:

```json
{
	"message": "User registered successfully",
	"user": {
		"id": "65f...",
		"name": "John Doe",
		"email": "john@example.com"
	},
	"token": "eyJhbGc..."
}
```

#### 2. Login User

**POST** `/api/auth/login`

Request body:

```json
{
	"email": "john@example.com",
	"password": "password123"
}
```

Response:

```json
{
	"message": "Login successful",
	"user": {
		"id": "65f...",
		"name": "John Doe",
		"email": "john@example.com"
	},
	"token": "eyJhbGc..."
}
```

#### 3. Get Current User (Protected)

**GET** `/api/auth/me`

Headers:

```
Authorization: Bearer <token>
```

Response:

```json
{
	"message": "User profile retrieved",
	"user": {
		"id": "65f...",
		"name": "John Doe",
		"email": "john@example.com"
	}
}
```

#### 4. Health Check

**GET** `/api/health`

Response:

```json
{
	"message": "Server is running"
}
```

## Using Auth Middleware in Routes

To protect a route, import and use the `authMiddleware`:

```javascript
import authMiddleware from "../middleware/authMiddleware.js";

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
	// req.userId contains the user ID from the JWT
	res.json({ message: "This is a protected route", userId: req.userId });
});
```

## Frontend Integration

### Setting up the React Frontend to use the Backend

1. **Register/Login** - Send credentials to `/api/auth/register` or `/api/auth/login`
2. **Store Token** - Save the returned JWT token in localStorage
3. **API Requests** - Include token in Authorization header:

```javascript
// Example fetch with authentication
const response = await fetch("http://localhost:5000/api/auth/me", {
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
```

### Update CORS in server.js

If using a different frontend port, update the CORS origin:

```javascript
app.use(
	cors({
		origin: "http://localhost:YOUR_PORT", // Update to your frontend port
		credentials: true,
	}),
);
```

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB credentials if using Atlas

### CORS Error

- Update the `origin` in `server.js` to match your frontend URL
- Ensure the frontend includes proper headers

### Token Errors

- Ensure `JWT_SECRET` is set in `.env`
- Check that token format is `Bearer <token>` in headers
- Verify token hasn't expired (7 days)

## Security Notes

⚠️ **Important for Production:**

- Change `JWT_SECRET` to a strong, unique value
- Use HTTPS instead of HTTP
- Set `NODE_ENV=production`
- Use MongoDB Atlas instead of local MongoDB
- Add rate limiting for login/register endpoints
- Add input validation/sanitization
- Use helmet.js for security headers

## Dependencies

- **express** - Web server framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation/verification
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemon** (dev) - Auto-reload during development

## License

MIT
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# products-Dashoard" 
>>>>>>> 98db3a179c243d9dfed7da9171b46e67034405bc
