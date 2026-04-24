# Adding Logout Button to Header

This guide shows how to add user authentication UI to your Header component.

## Updated Header.jsx

Here's the updated [Header.jsx](src/components/Header/Header.jsx) with authentication features:

### Changes to make:

1. **Add import** for AuthContext at the top:

```javascript
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
```

2. **Get auth data** in the component function:

```javascript
const Header = ({ onSearch, onCategoryChange }) => {
	const { user, isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	// ... rest of the code
```

3. **Add logout handler**:

```javascript
const handleLogout = () => {
	logout();
	navigate("/login");
	setIsMobileMenuOpen(false);
};
```

4. **Add user menu in desktop navigation** (replace the current navigation section):

Replace this section:

```javascript
{
	/* Desktop Navigation */
}
<nav className="hidden md:flex items-center gap-6 lg:gap-8">
	<Link
		to="/"
		className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
		Products
	</Link>
	<Link
		to="/favorites"
		className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
		Favorites
	</Link>
</nav>;
```

With this:

```javascript
{
	/* Desktop Navigation */
}
<nav className="hidden md:flex items-center gap-6 lg:gap-8">
	<Link
		to="/"
		className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
		Products
	</Link>
	<Link
		to="/favorites"
		className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
		Favorites
	</Link>

	{isAuthenticated ? (
		<div className="flex items-center gap-4 pl-4 border-l border-gray-200">
			<div className="text-sm">
				<p className="font-medium text-gray-900">{user?.name}</p>
				<p className="text-gray-500 text-xs">{user?.email}</p>
			</div>
			<button
				onClick={handleLogout}
				className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
				Logout
			</button>
		</div>
	) : (
		<div className="flex items-center gap-3">
			<Link
				to="/login"
				className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
				Login
			</Link>
			<Link
				to="/register"
				className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
				Register
			</Link>
		</div>
	)}
</nav>;
```

5. **Add user menu in mobile navigation** (add this before the closing `</nav>`):

```javascript
{
	/* Mobile Auth Section */
}
{
	isAuthenticated ? (
		<div className="border-t border-gray-200 pt-4 mt-4">
			<div className="px-3 py-2 bg-gray-50 rounded-md mb-3">
				<p className="font-medium text-gray-900 text-sm">{user?.name}</p>
				<p className="text-gray-500 text-xs">{user?.email}</p>
			</div>
			<button
				onClick={handleLogout}
				className="w-full px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
				Logout
			</button>
		</div>
	) : (
		<div className="border-t border-gray-200 pt-4 mt-4 flex flex-col gap-2">
			<Link
				to="/login"
				className="px-3 py-2 text-sm font-medium text-center text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
				onClick={() => setIsMobileMenuOpen(false)}>
				Login
			</Link>
			<Link
				to="/register"
				className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
				onClick={() => setIsMobileMenuOpen(false)}>
				Register
			</Link>
		</div>
	);
}
```

## Complete Updated Header.jsx

Here's the complete updated file:

```javascript
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../Api/index";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "../SearchBar/SearchBar";

const Header = ({ onSearch, onCategoryChange }) => {
	const { user, isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	React.useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				!event.target.closest(".category-dropdown") &&
				!event.target.closest(".mobile-menu")
			) {
				setIsDropdownOpen(false);
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleCategorySelect = (categorySlug) => {
		setSelectedCategory(categorySlug);
		onCategoryChange(categorySlug);
		setIsDropdownOpen(false);
	};

	const handleAllCategories = () => {
		setSelectedCategory("");
		onCategoryChange("");
		setIsDropdownOpen(false);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
		setIsMobileMenuOpen(false);
	};

	return (
		<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo/Title */}
					<h1 className="text-lg sm:text-xl font-semibold text-gray-900">
						Shop Dashboard
					</h1>

					{/* Desktop Search and Category */}
					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
						{/* Category Dropdown */}
						<div className="relative category-dropdown">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors w-full">
								<span className="truncate">
									{categories.find((c) => c.slug === selectedCategory)?.name ||
										"All Categories"}
								</span>
								<svg
									className={`w-4 h-4 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isDropdownOpen && (
								<div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
									<div className="py-1">
										<button
											onClick={handleAllCategories}
											className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
											All Categories
										</button>
										{categories.map((category) => (
											<button
												key={category.slug}
												onClick={() => handleCategorySelect(category.slug)}
												className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize">
												{category.name}
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						<SearchBar onSearch={onSearch} />
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6 lg:gap-8">
						<Link
							to="/"
							className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
							Products
						</Link>
						<Link
							to="/favorites"
							className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
							Favorites
						</Link>

						{isAuthenticated ? (
							<div className="flex items-center gap-4 pl-4 border-l border-gray-200">
								<div className="text-sm">
									<p className="font-medium text-gray-900">{user?.name}</p>
									<p className="text-gray-500 text-xs">{user?.email}</p>
								</div>
								<button
									onClick={handleLogout}
									className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
									Logout
								</button>
							</div>
						) : (
							<div className="flex items-center gap-3">
								<Link
									to="/login"
									className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
									Login
								</Link>
								<Link
									to="/register"
									className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
									Register
								</Link>
							</div>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									isMobileMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden mt-4 pb-4 border-t border-gray-200 mobile-menu">
						<div className="pt-4 space-y-4">
							{/* Mobile Search */}
							<SearchBar onSearch={onSearch} />

							{/* Mobile Category Dropdown */}
							<div className="relative category-dropdown">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
									<span className="truncate">
										{categories.find((c) => c.slug === selectedCategory)
											?.name || "All Categories"}
									</span>
									<svg
										className={`w-4 h-4 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{isDropdownOpen && (
									<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
										<div className="py-1">
											<button
												onClick={handleAllCategories}
												className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												All Categories
											</button>
											{categories.map((category) => (
												<button
													key={category.slug}
													onClick={() => handleCategorySelect(category.slug)}
													className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize">
													{category.name}
												</button>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Mobile Navigation */}
							<nav className="flex flex-col space-y-2">
								<Link
									to="/"
									className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}>
									Products
								</Link>
								<Link
									to="/favorites"
									className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}>
									Favorites
								</Link>

								{/* Mobile Auth Section */}
								{isAuthenticated ? (
									<div className="border-t border-gray-200 pt-4 mt-4">
										<div className="px-3 py-2 bg-gray-50 rounded-md mb-3">
											<p className="font-medium text-gray-900 text-sm">
												{user?.name}
											</p>
											<p className="text-gray-500 text-xs">{user?.email}</p>
										</div>
										<button
											onClick={handleLogout}
											className="w-full px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
											Logout
										</button>
									</div>
								) : (
									<div className="border-t border-gray-200 pt-4 mt-4 flex flex-col gap-2">
										<Link
											to="/login"
											className="px-3 py-2 text-sm font-medium text-center text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
											onClick={() => setIsMobileMenuOpen(false)}>
											Login
										</Link>
										<Link
											to="/register"
											className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
											onClick={() => setIsMobileMenuOpen(false)}>
											Register
										</Link>
									</div>
								)}
							</nav>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
```

## What This Adds

### Desktop View

- Shows user's name and email when logged in
- Red "Logout" button when logged in
- "Login" and "Register" buttons when not logged in

### Mobile View

- User info in a styled box when logged in
- Red logout button on mobile
- Login/Register buttons on mobile

## Features

- ✅ User name and email displayed
- ✅ One-click logout
- ✅ Responsive design (mobile + desktop)
- ✅ Smooth transitions
- ✅ Conditional rendering (show different UI based on auth state)
- ✅ Redirects to login after logout

## Optional Enhancements

### Add User Avatar

```javascript
<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
	{user?.name.charAt(0).toUpperCase()}
</div>
```

### Add Profile Link

```javascript
<Link
	to="/profile"
	className="text-sm font-medium text-gray-700 hover:text-gray-900">
	Profile
</Link>
```

### Add a Dropdown Menu

Instead of inline logout, create a dropdown:

```javascript
const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

{
	isAuthenticated && (
		<div className="relative">
			<button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>Menu</button>
			{isUserMenuOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
					<Link to="/profile" className="block px-4 py-2">
						Profile
					</Link>
					<button
						onClick={handleLogout}
						className="block w-full text-left px-4 py-2">
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
```

---

For more authentication examples, see [AUTH_QUICK_REFERENCE.md](AUTH_QUICK_REFERENCE.md)
