import type React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-900/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-indigo-400"
              >
                <path d="M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"></path>
                <path d="M5 4h14a1 1 0 0 1 1 1v4H4V5a1 1 0 0 1 1-1Z"></path>
              </svg>
              <span className="text-xl font-bold">3D Art Prints</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating beautiful, customizable 3D printed art for your home or
              office. Each piece is carefully designed and printed with premium
              materials.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=Abstract"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Abstract
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Functional"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Functional
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Architecture"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Wall Art"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Wall Art
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-400 mt-0.5" />
                <span className="text-gray-400">
                  123 Print Street, Design District, CA 90210
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">info@3dartprints.com</span>
              </li>
            </ul>

            {/* Newsletter form */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 text-gray-300">
                Subscribe to our newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-indigo-500 text-white text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} 3D Art Prints. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
