import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import { Package, FileText, TrendingUp, DollarSign } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const user = useStore((state) => state.user);
  const products = useStore((state) => state.products);
  const customRequests = useStore((state) => state.customRequests);

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/auth" replace />;
  }

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
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Products Overview
        </h2>
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
    </div>
  );
};

export default AdminDashboard;
