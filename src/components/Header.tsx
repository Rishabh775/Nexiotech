"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import useStore from "../store/store";
import { useTheme } from "./ui/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses = "transition-colors relative";
    const activeClasses = "text-primary font-medium";
    const inactiveClasses = "text-foreground hover:text-primary";
    const homeActiveClasses =
      !isScrolled && location.pathname === "/"
        ? "text-white font-medium"
        : activeClasses;
    const homeInactiveClasses =
      !isScrolled && location.pathname === "/"
        ? "text-white/90 hover:text-white"
        : inactiveClasses;

    return `${baseClasses} ${
      isActivePath(path)
        ? path === "/" && location.pathname === "/"
          ? homeActiveClasses
          : activeClasses
        : path === "/" && location.pathname === "/"
        ? homeInactiveClasses
        : inactiveClasses
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-8 w-8 ${
                isScrolled || location.pathname !== "/"
                  ? "text-primary"
                  : "text-white"
              }`}
            >
              <path d="M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"></path>
              <path d="M5 4h14a1 1 0 0 1 1 1v4H4V5a1 1 0 0 1 1-1Z"></path>
            </svg>
            <span
              className={`text-xl font-bold ${
                isScrolled || location.pathname !== "/"
                  ? "text-foreground"
                  : "text-white"
              }`}
            >
              3D Art Prints
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link to="/" className={getNavLinkClasses("/")}>
                Home
                {isActivePath("/") && (
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-0.5 ${
                      !isScrolled && location.pathname === "/"
                        ? "bg-white"
                        : "bg-primary"
                    } rounded-full`}
                  ></span>
                )}
              </Link>
              <Link to="/products" className={getNavLinkClasses("/products")}>
                Products
                {isActivePath("/products") && (
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-0.5 ${
                      !isScrolled && location.pathname === "/"
                        ? "bg-white"
                        : "bg-primary"
                    } rounded-full`}
                  ></span>
                )}
              </Link>
              <Link to="/contact" className={getNavLinkClasses("/contact")}>
                Contact
                {isActivePath("/contact") && (
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-0.5 ${
                      !isScrolled && location.pathname === "/"
                        ? "bg-white"
                        : "bg-primary"
                    } rounded-full`}
                  ></span>
                )}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  !isScrolled && location.pathname === "/"
                    ? "text-white hover:bg-white/10"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                to="/cart"
                className={`relative p-2 rounded-full transition-colors ${
                  !isScrolled && location.pathname === "/"
                    ? "text-white hover:bg-white/10"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <button
                className={`p-2 rounded-full transition-colors ${
                  !isScrolled && location.pathname === "/"
                    ? "text-white hover:bg-white/10"
                    : "hover:bg-accent text-foreground"
                }`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`p-2 rounded-full transition-colors ${
                      !isScrolled && location.pathname === "/"
                        ? "text-white hover:bg-white/10"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <User className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/admin")}>
                          Admin Dashboard
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/auth"
                  className={`px-4 py-2 rounded-md transition-colors ${
                    !isScrolled && location.pathname === "/"
                      ? "bg-white text-blue-600 hover:bg-white/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className={`relative ${
                !isScrolled && location.pathname === "/"
                  ? "text-white"
                  : "text-foreground"
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none ${
                !isScrolled && location.pathname === "/"
                  ? "text-white"
                  : "text-foreground"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                    {isActivePath("/") && (
                      <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                    )}
                  </Link>
                  <Link
                    to="/products"
                    className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                    {isActivePath("/products") && (
                      <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                    )}
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                    {isActivePath("/contact") && (
                      <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                    )}
                  </Link>

                  <div className="border-t border-border pt-4 mt-4">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors relative"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-3" />
                          Profile
                          {isActivePath("/profile") && (
                            <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                          )}
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors relative"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Admin Dashboard
                            {isActivePath("/admin") && (
                              <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                            )}
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors"
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/auth"
                        className="flex items-center px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Sign In
                      </Link>
                    )}

                    <button
                      className="flex items-center w-full px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors mt-2"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 mr-3" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 mr-3" />
                          Dark Mode
                        </>
                      )}
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
