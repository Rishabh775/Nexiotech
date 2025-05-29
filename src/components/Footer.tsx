import React from 'react';
import { Link } from 'react-router-dom';
import { Printer as Printer3D, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Printer3D className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">3D Art Prints</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating beautiful, customizable 3D printed art for your home or office.
              Each piece is carefully designed and printed with premium materials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Abstract" className="text-gray-400 hover:text-white transition-colors">
                  Abstract
                </Link>
              </li>
              <li>
                <Link to="/products?category=Functional" className="text-gray-400 hover:text-white transition-colors">
                  Functional
                </Link>
              </li>
              <li>
                <Link to="/products?category=Architecture" className="text-gray-400 hover:text-white transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link to="/products?category=Wall Art" className="text-gray-400 hover:text-white transition-colors">
                  Wall Art
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-400 mt-0.5" />
                <span className="text-gray-400">123 Print Street, Design District, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">info@3dartprints.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 3D Art Prints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;