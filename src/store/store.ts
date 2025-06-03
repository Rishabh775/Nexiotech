import { create } from "zustand";
import productsData from "../data/demo-products.json";

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

// Demo user data - In a real app, this would be in a database
const demoUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Demo User",
    role: "user" as const,
  },
];

const useStore = create<StoreState>((set) => ({
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
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { product, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (productId: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  submitCustomRequest: (request: CustomRequest) =>
    set((state) => ({
      customRequests: [...state.customRequests, request],
    })),

  login: async (email: string, password: string) => {
    // Simulate API call
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword });
  },

  logout: () => {
    set({ user: null });
  },

  register: async (email: string, password: string, name: string) => {
    // Simulate API call
    const existingUser = demoUsers.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: String(demoUsers.length + 1),
      email,
      name,
      role: "user" as const,
    };

    set({ user: newUser });
  },
}));

export default useStore;
