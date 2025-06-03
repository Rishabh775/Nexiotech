"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import useStore from "../store/store";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  customizable: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <motion.div
      className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="aspect-square overflow-hidden relative group">
        <img
          src={product.image || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 text-sm font-medium text-white bg-primary px-3 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs font-medium text-white rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <Link
              to={`/products/${product.id}`}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
