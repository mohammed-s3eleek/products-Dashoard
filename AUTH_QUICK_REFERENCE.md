# Quick Reference: Frontend Authentication

## Routes

| Route          | Type      | Description             |
| -------------- | --------- | ----------------------- |
| `/`            | Protected | Home page with products |
| `/product/:id` | Protected | Product details page    |
| `/favorites`   | Protected | Favorites page          |
| `/login`       | Public    | User login page         |
| `/register`    | Public    | User registration page  |

## AuthContext API

```javascript
const {
	// State
	user, // { id, name, email }
	token, // JWT string
	loading, // boolean - true while checking auth
	error, // string - error message if any
	isAuthenticated, // boolean - true if user is logged in

	// Methods
	login, // async (email, password) → redirects to /
	register, // async (name, email, password, passwordConfirm) → redirects to /login
	logout, // () → clears token and redirects to /login
	setError, // (message) → sets error state
} = useContext(AuthContext);
```

## Component Usage Examples

### Check if User is Logged In

```javascript
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Header() {
	const { isAuthenticated, user, logout } = useContext(AuthContext);

	return (
		<header>
			{isAuthenticated ? (
				<div>
					<span>Welcome, {user.name}</span>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<a href="/login">Login</a>
			)}
		</header>
	);
}
```

### Making Protected API Calls

```javascript
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function ProductComponent() {
	const { token } = useContext(AuthContext);

	const fetchProducts = async () => {
		const response = await axios.get("http://localhost:5000/api/products", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	};
}
```

### Protect a Route

```javascript
import ProtectedRoute from "./components/ProtectedRoute";

<Route
	path="/dashboard"
	element={
		<ProtectedRoute>
			<Dashboard />
		</ProtectedRoute>
	}
/>;
```

## Common Tasks

### Log Out User

```javascript
const { logout } = useContext(AuthContext);
logout(); // Clears token and redirects to /login
```

### Get Current User

```javascript
const { user, isAuthenticated } = useContext(AuthContext);

if (isAuthenticated) {
	console.log(user.name, user.email);
}
```

### Handle Login Form

```javascript
const { login, setError } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogin = async (email, password) => {
	try {
		await login(email, password);
		navigate("/");
	} catch (error) {
		setError(error.message);
	}
};
```

### Handle Registration Form

```javascript
const { register, setError } = useContext(AuthContext);
const navigate = useNavigate();

const handleRegister = async (name, email, password, passwordConfirm) => {
	try {
		await register(name, email, password, passwordConfirm);
		navigate("/login");
	} catch (error) {
		setError(error.message);
	}
};
```

## Backend API Endpoints

**Base URL:** `http://localhost:5000/api/auth`

### POST /register

```javascript
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

// Response
{
  "message": "User registered successfully",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
  "token": "eyJhbGc..."
}
```

### POST /login

```javascript
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "message": "Login successful",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
  "token": "eyJhbGc..."
}
```

### GET /me (Protected)

```javascript
// Headers required
Authorization: Bearer {token}

// Response
{
  "message": "User profile retrieved",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

## Error Messages

| Error                                    | Cause                     | Solution                  |
| ---------------------------------------- | ------------------------- | ------------------------- |
| "Please fill in all fields"              | Missing form inputs       | Fill all required fields  |
| "Password must be at least 6 characters" | Password too short        | Use 6+ characters         |
| "Passwords do not match"                 | Confirm password mismatch | Make sure passwords match |
| "Email already in use"                   | Email exists in DB        | Use different email       |
| "Invalid email or password"              | Wrong credentials         | Check email and password  |
| "No token, authorization denied"         | Missing JWT token         | Login first               |
| "Token is not valid"                     | Invalid or expired JWT    | Login again               |
| "Cannot GET /api/auth/me"                | Backend not running       | Start backend server      |

## File Locations

- Auth State: `src/context/AuthContext.jsx`
- Login Page: `src/pages/Login.jsx`
- Register Page: `src/pages/Register.jsx`
- Protected Route: `src/components/ProtectedRoute.jsx`
- Main App: `src/App.jsx`

## Running the App

**Terminal 1: Backend**

```bash
cd server
npm run dev
```

**Terminal 2: Frontend**

```bash
npm run dev
```

Visit `http://localhost:5173`

## Local Storage

JWT token is stored in browser's localStorage:

- **Key:** `authToken`
- **Value:** JWT string
- **Persists:** Across page refreshes and browser restarts
- **Access:** `localStorage.getItem("authToken")`

## Testing Checklist

- [ ] Can register new user
- [ ] Can login with registered credentials
- [ ] Gets redirected to home after login
- [ ] Can logout
- [ ] Can't access protected routes when logged out
- [ ] Session persists after page refresh
- [ ] Error messages display correctly
- [ ] Loading states work properly
