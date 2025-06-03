import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import { ShoppingCart } from 'lucide-react';

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
  const addToCart = useStore(state => state.addToCart);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <Link 
              to={`/products/${product.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {product.name}
            </Link>
            <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {product.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;