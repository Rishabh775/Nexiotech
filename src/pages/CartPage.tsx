import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 text-gray-400 mb-6">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link 
          to="/products" 
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <div key={item.product.id} className="p-6 flex flex-col md:flex-row items-start md:items-center">
                  <div className="w-full md:w-24 h-24 flex-shrink-0 mb-4 md:mb-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="md:ml-6 flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.product.category}
                    </p>
                    <div className="flex items-center">
                      <span className="text-gray-800 font-medium">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <span className="mx-2 text-gray-400">×</span>
                      <span className="text-gray-800">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800 font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-indigo-600">
                  ${(totalPrice + (totalPrice * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button
              className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              onClick={() => alert('Checkout functionality would be implemented here!')}
            >
              Proceed to Checkout
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            
            <div className="mt-6">
              <Link 
                to="/products" 
                className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;