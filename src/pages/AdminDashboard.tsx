import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import { Package, FileText, TrendingUp, DollarSign, Plus } from "lucide-react";
// import { createProduct } from "../api/appwrite";
// import { toast } from "../hooks/use-toast";
import AddProductForm from "../components/AddProductForm";

const AdminDashboard: React.FC = () => {
  const user = useStore((state) => state.user);
  const products = useStore((state) => state.products);
  const customRequests = useStore((state) => state.customRequests);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to="/auth" replace />;
  }

  const totalProducts = products.length;
  const totalRequests = customRequests.length;
  const totalRevenue = products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-8 w-8 text-primary" />}
        />
        <StatCard
          title="Custom Requests"
          value={totalRequests}
          icon={<FileText className="h-8 w-8 text-primary" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-8 w-8 text-primary" />}
        />
        <StatCard
          title="Active Orders"
          value={12}
          icon={<TrendingUp className="h-8 w-8 text-primary" />}
        />
      </div>

      {/* Custom Requests */}
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
        <AddProductForm
          onClose={() => setShowAddProductForm(false)}
          onSuccess={() => window.location.reload()} // Replace with store refresh later
        />
      )}
    </div>
  );
};

// Utility Stat Card component
const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) => (
  <div className="bg-card border rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default AdminDashboard;
