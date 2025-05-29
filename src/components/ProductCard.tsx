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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            
            <Link 
              to={`/products/${product.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;