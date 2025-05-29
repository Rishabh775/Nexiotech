import { create } from 'zustand';
import productsData from '../data/demo-products.json';

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

interface StoreState {
  products: Product[];
  cart: CartItem[];
  customRequests: CustomRequest[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  submitCustomRequest: (request: CustomRequest) => void;
}

const useStore = create<StoreState>((set) => ({
  products: productsData as Product[],
  cart: [],
  customRequests: [],
  
  addToCart: (product: Product) => 
    set((state) => {
      const existingItem = state.cart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          cart: state.cart.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      } else {
        return {
          cart: [...state.cart, { product, quantity: 1 }]
        };
      }
    }),
  
  removeFromCart: (productId: number) => 
    set((state) => ({
      cart: state.cart.filter(item => item.product.id !== productId)
    })),
  
  submitCustomRequest: (request: CustomRequest) => 
    set((state) => ({
      customRequests: [...state.customRequests, request]
    }))
}));

export default useStore;