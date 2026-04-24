import React, { useState, useEffect, useContext } from "react";
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

	const handleLogout = () => {
		logout();
		navigate("/login");
		setIsMobileMenuOpen(false);
	};

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	useEffect(() => {
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
	return (
		<header className="bg-indigo-600 px-4 sm:px-6 lg:px-8 py-4 text-white">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo/Title */}
					<h1 className="text-lg sm:text-xl font-semibold">Shop Dashboard</h1>

					{/* Desktop Search and Category */}
					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
						{/* Category Dropdown */}
						<div className="relative category-dropdown">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors w-full">
								<span className="truncate">
									{categories.find((c) => c.slug === selectedCategory)?.name ||
										"All Categories"}
								</span>
								<svg
									className={`w-4 h-4 transition-transform shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
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
								<div className="absolute top-full left-0 mt-1 w-48 bg-white border border-indigo-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
									<div className="py-1">
										<button
											onClick={handleAllCategories}
											className="w-full text-left px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors">
											All Categories
										</button>
										{categories.map((category) => (
											<button
												key={category.slug}
												onClick={() => handleCategorySelect(category.slug)}
												className="w-full text-left px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors capitalize">
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
							className="text-sm font-medium text-white/90 hover:text-white transition-colors">
							Products
						</Link>
						<Link
							to="/favorites"
							className="text-sm font-medium text-white/90 hover:text-white transition-colors">
							Favorites
						</Link>

						{isAuthenticated ? (
							<div className="flex items-center gap-4 pl-4 border-l border-gray-200">
								{/* quick links for authenticated users */}
								<Link
									to="/cart"
									className="text-sm font-medium text-white/90 hover:text-white transition-colors">
									Cart
								</Link>
								<Link
									to="/profile"
									className="text-sm font-medium text-white/90 hover:text-white transition-colors">
									Profile
								</Link>
								<div className="text-sm">
									<p className="font-medium text-gray-900">{user?.name}</p>
									<p className="text-gray-500 text-xs">{user?.email}</p>
								</div>
								<button
									onClick={handleLogout}
									className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors">
									Logout
								</button>
							</div>
						) : (
							<div className="flex items-center gap-3">
								<Link
									to="/login"
									className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
									Login
								</Link>
								<Link
									to="/register"
									className="px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors">
									Register
								</Link>
							</div>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-md text-white/90 hover:bg-indigo-500 transition-colors">
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
					<div className="md:hidden mt-4 pb-4 border-t border-indigo-500 mobile-menu">
						<div className="pt-4 space-y-4">
							{/* Mobile Search */}
							<SearchBar onSearch={onSearch} />

							{/* Mobile Category Dropdown */}
							<div className="relative category-dropdown">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors">
									<span className="truncate">
										{categories.find((c) => c.slug === selectedCategory)
											?.name || "All Categories"}
									</span>
									<svg
										className={`w-4 h-4 transition-transform shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
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
									<div className="border-t border-indigo-500 pt-4 mt-4">
										<div className="px-3 py-2 bg-gray-50 rounded-md mb-3">
											<p className="font-medium text-gray-900 text-sm">
												{user?.name}
											</p>
											<p className="text-gray-500 text-xs">{user?.email}</p>
										</div>
										<div className="flex items-center gap-2 mb-3">
											<Link
												to="/cart"
												className="flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors">
												Cart
											</Link>
											<Link
												to="/profile"
												className="flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors">
												Profile
											</Link>
										</div>
										<button
											onClick={handleLogout}
											className="w-full px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors">
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
								)}{" "}
							</nav>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
