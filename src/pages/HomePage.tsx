import React from 'react';
import { Link } from 'react-router-dom';
import { Printer as Printer3D, Sparkles, Palette, Zap } from 'lucide-react';
import useStore from '../store/store';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const products = useStore(state => state.products);
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Space with Custom 3D Printed Art
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Unique, customizable art pieces that bring your vision to life through the magic of 3D printing technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
              >
                Explore Collection
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Bringing Art and Technology Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At 3D Art Prints, we combine artistic vision with cutting-edge 3D printing technology to create stunning, one-of-a-kind pieces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Printer3D className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-gray-600">
                We use only the highest quality filaments and resins to ensure your art piece is durable and visually stunning.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Designs</h3>
              <p className="text-gray-600">
                Every piece can be customized to your specifications, from size and color to intricate design modifications.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Palette className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Artistic Vision</h3>
              <p className="text-gray-600">
                Our team of designers brings years of artistic experience to create pieces that are both beautiful and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Creations
              </h2>
              <p className="text-gray-600">
                Explore our most popular and innovative 3D printed art pieces
              </p>
            </div>
            <Link 
              to="/products" 
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            >
              View All Products →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white text-indigo-600 mb-6">
            <Zap className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Whether you're looking for a statement piece or a thoughtful gift, our custom 3D printed art is the perfect solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products" 
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
            >
              Browse Collection
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Request Custom Design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;