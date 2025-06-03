import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Printer as Printer3D,
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
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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

    return `${baseClasses} ${
      isActivePath(path) ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Printer3D className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              3D Art Prints
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link to="/" className={getNavLinkClasses("/")}>
                Home
                {isActivePath("/") && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
              <Link to="/products" className={getNavLinkClasses("/products")}>
                Products
                {isActivePath("/products") && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
              <Link to="/contact" className={getNavLinkClasses("/contact")}>
                Contact
                {isActivePath("/contact") && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <Search className="h-5 w-5 text-foreground" />
              </button>

              <Link
                to="/cart"
                className="relative p-2 hover:bg-accent rounded-full transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <button
                className="p-2 hover:bg-accent rounded-full transition-colors"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 hover:bg-accent rounded-full transition-colors">
                    <User className="h-5 w-5 text-foreground" />
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
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none"
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
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-background border rounded-md focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`${getNavLinkClasses("/")} block`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                {isActivePath("/") && (
                  <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                )}
              </Link>
              <Link
                to="/products"
                className={`${getNavLinkClasses("/products")} block`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
                {isActivePath("/products") && (
                  <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                )}
              </Link>
              <Link
                to="/contact"
                className={`${getNavLinkClasses("/contact")} block`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
                {isActivePath("/contact") && (
                  <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                )}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={`${getNavLinkClasses("/profile")} block`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                    {isActivePath("/profile") && (
                      <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className={`${getNavLinkClasses("/auth")} block`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                  {isActivePath("/auth") && (
                    <span className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"></span>
                  )}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
