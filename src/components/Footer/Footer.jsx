import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-50 border-t border-gray-200 px-6 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
						<ul className="space-y-2">
							<li>
								<a
									href="/"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									Products
								</a>
							</li>
							<li>
								<a
									href="/offers"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									Favorites
								</a>
							</li>
							<li>
								<a
									href="/about"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									About
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-900 mb-3">Support</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="/help"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									Help Center
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="/shipping"
									className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
									Shipping Info
								</a>
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
