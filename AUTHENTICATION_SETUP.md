mongod# Frontend Authentication Setup Guide

This guide explains the frontend authentication system that has been set up for your React application.

## ✅ Files Created

```
src/
├── context/
│   └── AuthContext.jsx           # Auth state management and API calls
├── pages/
│   ├── Login.jsx                 # Login page component
│   └── Register.jsx              # Registration page component
├── components/
│   └── ProtectedRoute.jsx        # Route protection wrapper
└── App.jsx                       # Updated with auth routes and providers
```

## 📋 What Was Added

### 1. AuthContext.jsx

Manages the entire authentication state:

- `user` - Current logged-in user object
- `token` - JWT token stored in localStorage
- `loading` - Loading state during auth checks
- `error` - Error messages
- `isAuthenticated` - Boolean flag for auth status
- `login()` - Login function
- `register()` - Register function
- `logout()` - Logout function

The context automatically:

- Saves JWT token to localStorage after login/register
- Loads token from localStorage on app start
- Verifies token with backend to restore user session
- Includes token in API request headers automatically

### 2. Login.jsx

Login page with:

- Email input field
- Password input field
- Form validation
- Error message display
- Loading state
- Link to register page
- Redirects to `/` after successful login

### 3. Register.jsx

Registration page with:

- Name input field
- Email input field
- Password input field
- Password confirmation field
- Form validation (6+ characters, matching passwords)
- Error message display
- Loading state
- Link to login page
- Redirects to `/login` after successful registration

### 4. ProtectedRoute.jsx

Route wrapper that:

- Checks if user is authenticated
- Shows loading spinner while checking auth
- Redirects unauthenticated users to `/login`
- Shows protected content if user is authenticated

### 5. Updated App.jsx

- Wraps app with `AuthProvider` for auth context
- Wraps protected routes (/, /product/:id, /favorites) with `ProtectedRoute`
- Login and Register pages are public (not protected)
- Header and Footer only show on protected pages (not on login/register)

## 🚀 Getting Started

### Step 1: Ensure Backend is Running

Make sure your Node.js backend server is running:

```bash
cd server
npm run dev
```

It should be running on `http://localhost:5000`

### Step 2: Verify API Endpoint

The frontend makes requests to `http://localhost:5000/api/auth` (defined in AuthContext.jsx)

If your backend runs on a different port, update it in [src/context/AuthContext.jsx](src/context/AuthContext.jsx#L3):

```javascript
const API_URL = "http://localhost:5000/api/auth"; // Change this if needed
```

### Step 3: Install Dependencies

Axios is already in your package.json, but ensure all dependencies are installed:

```bash
npm install
```

### Step 4: Start Frontend

```bash
npm run dev
```

Your React app should run on `http://localhost:5173`

## 🔐 How Authentication Works

### 1. User Registration

1. User fills out register form (name, email, password)
2. Form validates: 6+ characters, passwords match
3. axios sends POST to `/api/auth/register`
4. Backend creates user and returns JWT token
5. Token saved to localStorage
6. Redirect to `/login`

### 2. User Login

1. User fills out login form (email, password)
2. axios sends POST to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Token saved to localStorage
5. User object updated in context
6. Redirect to `/`

### 3. Protected Routes

1. User tries to access `/` or `/product/:id` or `/favorites`
2. ProtectedRoute checks `isAuthenticated`
3. If authenticated → Show page
4. If not authenticated → Redirect to `/login`

### 4. Token Persistence

1. When app loads, AuthContext checks localStorage for token
2. If token found, verifies it with backend (`GET /api/auth/me`)
3. If valid, loads user and sets authenticated state
4. If invalid, clears token and redirects to login
5. User stays logged in across page refreshes

### 5. API Requests with Auth

AuthContext automatically includes JWT token in all API requests:

```javascript
headers: {
	Authorization: `Bearer ${token}`;
}
```

## 🧪 Testing the Authentication

### Test Registration

1. Visit `http://localhost:5173/register`
2. Fill in: name, email, password (6+ chars)
3. Click "Register"
4. Should redirect to `/login`

### Test Login

1. Visit `http://localhost:5173/login`
2. Enter registered email and password
3. Click "Login"
4. Should redirect to `/` (home page)
5. Should see the product catalog

### Test Protected Route

1. While logged in, visit any protected page
2. Logout by clicking logout button (if added to Header)
3. Try to visit `/` directly
4. Should redirect to `/login`

### Test Token Persistence

1. Login to the app
2. Refresh the page (F5 or Cmd+R)
3. Should stay logged in (token loaded from localStorage)
4. Check browser DevTools → Application → Local Storage for `authToken`

## 🔧 Using Auth in Components

### Access Auth Data in Any Component

```javascript
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function MyComponent() {
	const { user, token, isAuthenticated, logout } = useContext(AuthContext);

	return (
		<div>
			{isAuthenticated ? (
				<div>
					<p>Welcome, {user.name}!</p>
					<p>Email: {user.email}</p>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<p>Please login</p>
			)}
		</div>
	);
}
```

### Making Authenticated API Calls

To make API calls with authentication header:

```javascript
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function ProductComponent() {
	const { token } = useContext(AuthContext);

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/products", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return <button onClick={fetchData}>Fetch Products</button>;
}
```

## 🎨 Styling Notes

All components use **Tailwind CSS** classes for styling. The pages feature:

- Clean, modern design with shadow and rounded corners
- Blue accent color for primary buttons
- Red error messages with appropriate styling
- Responsive design for mobile/tablet/desktop
- Loading states with disabled buttons
- Smooth transitions and hover effects

## 🚨 Error Handling

The system handles various error scenarios:

### Registration Errors

- Empty fields: "Please fill in all fields"
- Short password: "Password must be at least 6 characters"
- Passwords don't match: "Passwords do not match"
- Email exists: Backend returns "Email already in use"
- Server error: Shows error message from backend

### Login Errors

- Empty fields: "Please fill in all fields"
- Invalid credentials: Backend returns "Invalid email or password"
- Server error: Shows error message from backend

### Auth Errors

- Invalid token: Clears token from localStorage
- Network error: axios catches and displays error

## 📝 API Endpoints Used

| Method | Endpoint             | Description      | Returns                    |
| ------ | -------------------- | ---------------- | -------------------------- |
| POST   | `/api/auth/register` | Create new user  | `{ user, token, message }` |
| POST   | `/api/auth/login`    | Login user       | `{ user, token, message }` |
| GET    | `/api/auth/me`       | Get current user | `{ user, message }`        |

## 🔐 Security Notes

⚠️ **Current Implementation:**

- JWT tokens stored in localStorage
- Tokens included in Authorization header
- Tokens verified by backend

**For Production, Consider:**

- Using HttpOnly cookies instead of localStorage
- Implementing token refresh mechanism
- Adding CSRF protection
- Implementing logout on all devices
- Setting appropriate CORS policies
- Using HTTPS only

## 🐛 Troubleshooting

### "Cannot POST /api/auth/register"

- Check if backend server is running on port 5000
- Verify API_URL in [AuthContext.jsx](src/context/AuthContext.jsx#L3)

### "Redirect loop between login and home"

- Check browser console for errors
- Verify MongoDB is running and has correct connection string
- Check backend logs for validation errors

### "Token not being saved"

- Check if browser allows localStorage
- Check browser DevTools → Application → Local Storage
- Ensure axios request to login/register is successful

### "Always redirected to login after refresh"

- Verify backend `/api/auth/me` endpoint is working
- Check token format in Authorization header
- Ensure JWT_SECRET is the same in backend and frontend isn't needed (backend handles it)

## 📂 File Locations

- Auth Context: [src/context/AuthContext.jsx](src/context/AuthContext.jsx)
- Login Page: [src/pages/Login.jsx](src/pages/Login.jsx)
- Register Page: [src/pages/Register.jsx](src/pages/Register.jsx)
- Protected Route: [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)
- Main App: [src/App.jsx](src/App.jsx)

## 🎯 Next Steps

1. **Add Logout Button**: Update [Header component](src/components/Header/Header.jsx) to show user name and logout button
2. **User Profile Page**: Create a profile page to show user info and allow editing
3. **Password Reset**: Implement password reset flow with backend
4. **Social Login**: Add Google/GitHub authentication
5. **Two-Factor Auth**: Implement 2FA for extra security

---

**Backend Documentation**: See [server/README.md](../../server/README.md)

**Frontend Integration Guide**: See [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)
