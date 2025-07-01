export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
  password: string;
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
export const createProduct = async (product: any) => {
  return await databases.createDocument(
    databaseId,
    productCollectionId,
    ID.unique(),
    product
  );
};

export const getAllProducts = async () => {
  return await databases.listDocuments(databaseId, productCollectionId);
};

export const getProductById = async (id: string) => {
  return await databases.getDocument(databaseId, productCollectionId, id);
};

// Order APIs
export const createOrder = async (order: any) => {
  return await databases.createDocument(
    databaseId,
    orderCollectionId,
    ID.unique(),
    order
  );
};

export const getOrdersByUser = async (userId: string) => {
  return await databases.listDocuments(databaseId, orderCollectionId, [
    Query.equal("userId", userId),
  ]);
};

// Custom Request APIs
export const submitCustomRequestToDB = async (request: any) => {
  return await databases.createDocument(
    databaseId,
    requestCollectionId,
    ID.unique(),
    request
  );
};

export const getCustomRequestsByUser = async (userId: string) => {
  return await databases.listDocuments(databaseId, requestCollectionId, [
    Query.equal("userId", userId),
  ]);
};
