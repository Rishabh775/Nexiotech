import { create } from "zustand";
import { toast } from "../hooks/use-toast";
import productsData from "../data/demo-products.json";
import {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  getUserById,
} from "../api/appwrite";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  detailedDescription: string;
  category: string;
  price: number;
  customizable: boolean;
  dimensions: string;
  material: string;
  weight: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CustomRequest {
  name: string;
  email: string;
  product: Product;
  message: string;
  file?: File | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string; // Optional avatar URL
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  customRequests: CustomRequest[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  submitCustomRequest: (request: CustomRequest) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  products: productsData as Product[],
  cart: [],
  customRequests: [],
  user: null,

  addToCart: (product: Product) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Show toast for quantity increase
        toast({
          variant: "success",
          title: "Quantity Updated!",
          description: `${product.name} quantity increased to ${
            existingItem.quantity + 1
          }`,
        });

        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Show toast for new item added
        toast({
          variant: "success",
          title: "Added to Cart!",
          description: `${product.name} has been added to your cart`,
        });

        return {
          cart: [...state.cart, { product, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (productId: number) =>
    set((state) => {
      const item = state.cart.find((item) => item.product.id === productId);
      if (item) {
        toast({
          variant: "default",
          title: "Removed from Cart",
          description: `${item.product.name} has been removed from your cart`,
        });
      }

      return {
        cart: state.cart.filter((item) => item.product.id !== productId),
      };
    }),

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => {
      const item = state.cart.find((item) => item.product.id === productId);
      if (item) {
        toast({
          variant: "success",
          title: "Quantity Updated",
          description: `${item.product.name} quantity changed to ${quantity}`,
        });
      }

      return {
        cart: state.cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      };
    }),

  clearCart: () => {
    const cartLength = get().cart.length;
    if (cartLength > 0) {
      toast({
        variant: "default",
        title: "Cart Cleared",
        description: `Removed ${cartLength} item${
          cartLength > 1 ? "s" : ""
        } from your cart`,
      });
    }
    set({ cart: [] });
  },

  submitCustomRequest: (request: CustomRequest) =>
    set((state) => ({
      customRequests: [...state.customRequests, request],
    })),

  login: async (email, password) => {
    try {
      await logIn({ email, password });
      const currentUser = await getCurrentUser();
      console.log("Logged in User:", currentUser);

      if (!currentUser) {
        throw new Error("Failed to get current user after login");
      }

      const userData = await getUserById(currentUser.$id);
      console.log("User Data:", userData);

      set({
        user: {
          id: userData.$id,
          email: userData.email,
          name: userData.name,
          role: userData.role || "user", // Default to 'user' if role is not set
          avatar: userData.avatar || "", // Optional avatar URL
        },
      });

      toast({
        variant: "success",
        title: "Login Successful",
        description: `Welcome back, ${userData.name}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid credentials";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logOut();
      set({ user: null });
      toast({
        variant: "default",
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: errorMessage,
      });
    }
  },

  register: async (email, password, name) => {
    try {
      const result = await signUp({ email, password, name });
      console.log("Registered User:", result);

      set({
        user: {
          id: result.userId,
          email: result.email,
          name: result.name,
          role: result.role,
          avatar: result.avatar || "", // Optional avatar URL
        },
      });

      toast({
        variant: "success",
        title: "Account Created",
        description: `Welcome, ${result.name}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: errorMessage,
      });
      throw error;
    }
  },
}));

export default useStore;
