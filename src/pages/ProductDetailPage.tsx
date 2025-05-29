import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/store';
import CustomRequestForm from '../components/CustomRequestForm';
import { ShoppingCart, Ruler, Package, Weight, Palette, ArrowLeft } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  
  const [product, setProduct] = useState(products.find(p => p.id === Number(id)));
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  useEffect(() => {
    // Find the product based on the ID from URL params
    const foundProduct = products.find(p => p.id === Number(id));
    setProduct(foundProduct);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id, products]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/products" 
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        to="/products" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6">
              {product.detailedDescription}
            </p>
          </div>
          
          {/* Product Specifications */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Ruler className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-gray-600">
                  <strong>Dimensions:</strong> {product.dimensions}
                </span>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-gray-600">
                  <strong>Material:</strong> {product.material}
                </span>
              </div>
              <div className="flex items-center">
                <Weight className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-gray-600">
                  <strong>Weight:</strong> {product.weight}
                </span>
              </div>
              <div className="flex items-center">
                <Palette className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-gray-600">
                  <strong>Customizable:</strong> {product.customizable ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            
            {product.customizable && (
              <button
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="flex-1 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
              >
                {showCustomForm ? 'Hide Custom Form' : 'Request Custom Order'}
              </button>
            )}
          </div>
          
          {/* Custom Request Form */}
          {showCustomForm && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Custom Order Request
              </h3>
              <CustomRequestForm product={product} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;