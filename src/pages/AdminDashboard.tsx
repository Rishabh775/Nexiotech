import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import {
  Package,
  FileText,
  TrendingUp,
  DollarSign,
  Plus,
  X,
} from "lucide-react";
import { createProduct } from "../api/appwrite";
import { toast } from "../hooks/use-toast";

const AdminDashboard: React.FC = () => {
  const user = useStore((state) => state.user);
  const products = useStore((state) => state.products);
  const customRequests = useStore((state) => state.customRequests);

  // State for add product form
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    image: "",
    description: "",
    detailedDescription: "",
    category: "",
    price: "",
    customizable: false,
    dimensions: "",
    material: "",
    weight: "",
  });

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/auth" replace />;
  }

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
      };

      await createProduct(productData);

      toast({
        variant: "success",
        title: "Product Added",
        description: `${productForm.name} has been successfully added to the catalog.`,
      });

      // Reset form and close modal
      setProductForm({
        name: "",
        image: "",
        description: "",
        detailedDescription: "",
        category: "",
        price: "",
        customizable: false,
        dimensions: "",
        material: "",
        weight: "",
      });
      setShowAddProductForm(false);

      // Refresh products (you might want to add this to your store)
      window.location.reload(); // Temporary solution - ideally update store
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate some basic stats
  const totalProducts = products.length;
  const totalRequests = customRequests.length;
  const totalRevenue = products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalProducts}
              </p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Custom Requests
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalRequests}
              </p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Orders
              </p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Recent Custom Requests */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Custom Requests
        </h2>
        {customRequests.length > 0 ? (
          <div className="space-y-4">
            {customRequests.slice(0, 5).map((request, index) => (
              <div
                key={index}
                className="border-b border-border pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {request.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {request.email}
                    </p>
                    <p className="text-sm text-foreground mt-1">
                      Product: {request.product.name}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    New
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {request.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No custom requests yet.</p>
        )}
      </div>

      {/* Products Overview */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Products Overview
          </h2>
          <button
            onClick={() => setShowAddProductForm(true)}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="border border-border rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="font-medium text-foreground text-sm mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {product.category}
              </p>
              <p className="text-lg font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {products.length > 6 && (
          <div className="mt-4 text-center">
            <button className="text-primary hover:underline text-sm">
              View all {products.length} products
            </button>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Add New Product
              </h2>
              <button
                onClick={() => setShowAddProductForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  >
                    <option value="">Select category</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Camera">Camera</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Smart Watch">Smart Watch</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={productForm.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={productForm.dimensions}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="e.g. 10 x 5 x 2 cm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={productForm.material}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="e.g. Aluminum, Plastic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={productForm.weight}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                    placeholder="e.g. 250g"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="customizable"
                      checked={productForm.customizable}
                      onChange={handleInputChange}
                      className="rounded border-input"
                    />
                    <span className="text-sm font-medium text-foreground">
                      Product is customizable
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  placeholder="Brief product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="detailedDescription"
                  value={productForm.detailedDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  placeholder="Detailed product description, features, specifications"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProductForm(false)}
                  className="px-4 py-2 border border-input rounded-lg text-foreground hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
