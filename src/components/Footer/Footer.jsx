import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-50 border-t border-gray-200 px-8 py-12">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
					<div>
						<h3 className="text-sm font-semibold text-gray-900 mb-3">
							Shop Dashboard
						</h3>
						<p className="text-sm text-gray-600 leading-relaxed">
							Your trusted destination for quality products and exceptional
							shopping experiences.
						</p>
					</div>

					<div>
						<h4 className="text-sm font-medium text-gray-900 mb-3">
							Quick Links
						</h4>
						<ul className="grid grid-cols-2 gap-4 text-sm text-gray-600">
							<li>
								<Link
									to="/"
									className="hover:text-indigo-700 transition-colors"
									aria-label="Products">
									Products
								</Link>
							</li>
							<li>
								<Link
									to="/favorites"
									className="hover:text-indigo-700 transition-colors"
									aria-label="Favorites">
									Favorites
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="hover:text-indigo-700 transition-colors"
									aria-label="About">
									About
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="hover:text-indigo-700 transition-colors"
									aria-label="Contact">
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-200 mt-8 pt-6">
					<p className="text-xs text-gray-500 text-center">
						© 2026 Shop Dashboard. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
