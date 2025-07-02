export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
  password: string;
}

export interface Product {
  id?: string;
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

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  orderDate?: string;
}

export interface CustomRequest {
  id?: string;
  userId: string;
  name: string;
  email: string;
  productId?: string;
  message: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  requestDate?: string;
}

import { Client, Account, Avatars, Databases, Query, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

const userCollectionId = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const productCollectionId = import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID;
const orderCollectionId = import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID;
const requestCollectionId = import.meta.env.VITE_APPWRITE_REQUEST_COLLECTION_ID;

// Signup
export const signUp = async ({ email, name, password }: User) => {
  try {
    const user = await account.create("unique()", email, password, name);
    // console.log("✅ Signup successful:", user);
    const avatarUrl = avatar.getInitials(name);

    await logIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      "unique()",
      {
        userId: user.$id,
        name,
        email,
        role: "user", // Default role, can be updated later
        avatar: avatarUrl, // Store the avatar URL
      }
    );
    return newUser;
  } catch (err) {
    console.error("❌ Signup error:", err);
    throw err;
  }
};

// Login
export const logIn = async ({ email, password }: User) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    // console.log("✅ Login successful:", session);
    return session;
  } catch (err) {
    console.error("❌ Login error:", err);
    throw err;
  }
};

// Logout
export const logOut = async () => {
  try {
    await account.deleteSession("current");
    console.log("✅ Logged out");
  } catch (err) {
    console.error("❌ Logout error:", err);
    throw err;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch {
    return null;
  }
};

// Get user by ID
export const getUserById = async (userId: string) => {
  try {
    const res = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("userId", userId),
    ]);
    if (res.documents.length === 0) {
      throw new Error("User not found in DB");
    }
    return res.documents[0];
  } catch (err) {
    console.error("❌ Error fetching user by userId:", err);
    throw err;
  }
};

// Product APIs
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await databases.createDocument(
      databaseId,
      productCollectionId,
      ID.unique(),
      product
    );
    return { ...product, id: response.$id };
  } catch (err) {
    console.error("❌ Error creating product:", err);
    throw err;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await databases.listDocuments(databaseId, productCollectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      name: doc.name,
      image: doc.image,
      description: doc.description,
      detailedDescription: doc.detailedDescription,
      category: doc.category,
      price: doc.price,
      customizable: doc.customizable,
      dimensions: doc.dimensions,
      material: doc.material,
      weight: doc.weight,
    }));
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    throw err;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await databases.getDocument(databaseId, productCollectionId, id);
    return {
      id: response.$id,
      name: response.name,
      image: response.image,
      description: response.description,
      detailedDescription: response.detailedDescription,
      category: response.category,
      price: response.price,
      customizable: response.customizable,
      dimensions: response.dimensions,
      material: response.material,
      weight: response.weight,
    };
  } catch (err) {
    console.error("❌ Error fetching product by ID:", err);
    throw err;
  }
};

// Order APIs
export const createOrder = async (order: Omit<Order, 'id' | 'orderDate'>): Promise<Order> => {
  try {
    const orderData = {
      ...order,
      orderDate: new Date().toISOString(),
    };
    
    const response = await databases.createDocument(
      databaseId,
      orderCollectionId,
      ID.unique(),
      orderData
    );
    
    return {
      id: response.$id,
      userId: response.userId,
      items: response.items,
      totalAmount: response.totalAmount,
      status: response.status,
      shippingAddress: response.shippingAddress,
      orderDate: response.orderDate,
    };
  } catch (err) {
    console.error("❌ Error creating order:", err);
    throw err;
  }
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  try {
    const response = await databases.listDocuments(databaseId, orderCollectionId, [
      Query.equal("userId", userId),
    ]);
    
    return response.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      items: doc.items,
      totalAmount: doc.totalAmount,
      status: doc.status,
      shippingAddress: doc.shippingAddress,
      orderDate: doc.orderDate,
    }));
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    throw err;
  }
};

// Custom Request APIs
export const submitCustomRequestToDB = async (request: Omit<CustomRequest, 'id' | 'requestDate'>): Promise<CustomRequest> => {
  try {
    const requestData = {
      ...request,
      requestDate: new Date().toISOString(),
      status: "pending" as const,
    };
    
    const response = await databases.createDocument(
      databaseId,
      requestCollectionId,
      ID.unique(),
      requestData
    );
    
    return {
      id: response.$id,
      userId: response.userId,
      name: response.name,
      email: response.email,
      productId: response.productId,
      message: response.message,
      status: response.status,
      requestDate: response.requestDate,
    };
  } catch (err) {
    console.error("❌ Error submitting custom request:", err);
    throw err;
  }
};

export const getCustomRequestsByUser = async (userId: string): Promise<CustomRequest[]> => {
  try {
    const response = await databases.listDocuments(databaseId, requestCollectionId, [
      Query.equal("userId", userId),
    ]);
    
    return response.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      email: doc.email,
      productId: doc.productId,
      message: doc.message,
      status: doc.status,
      requestDate: doc.requestDate,
    }));
  } catch (err) {
    console.error("❌ Error fetching user custom requests:", err);
    throw err;
  }
};

// Admin functions to get all requests
export const getAllCustomRequests = async (): Promise<CustomRequest[]> => {
  try {
    const response = await databases.listDocuments(databaseId, requestCollectionId);
    
    return response.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      email: doc.email,
      productId: doc.productId,
      message: doc.message,
      status: doc.status,
      requestDate: doc.requestDate,
    }));
  } catch (err) {
    console.error("❌ Error fetching all custom requests:", err);
    throw err;
  }
};

export const updateCustomRequestStatus = async (requestId: string, status: CustomRequest['status']): Promise<CustomRequest> => {
  try {
    const response = await databases.updateDocument(
      databaseId,
      requestCollectionId,
      requestId,
      { status }
    );
    
    return {
      id: response.$id,
      userId: response.userId,
      name: response.name,
      email: response.email,
      productId: response.productId,
      message: response.message,
      status: response.status,
      requestDate: response.requestDate,
    };
  } catch (err) {
    console.error("❌ Error updating custom request status:", err);
    throw err;
  }
};
