import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { createProduct } from "../api/appwrite";

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

const AddProductForm: React.FC<Props> = ({ onClose }) => {
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
        description: `${productForm.name} has been successfully added.`,
      });

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

      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Add New Product
          </h2>
          <button
            onClick={onClose}
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
                <option value="sculpture">Sculpture</option>
                <option value="figurine">Figurine</option>
                <option value="wall-art">Wall-art</option>
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
              onClick={onClose}
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
  );
};

export default AddProductForm;
