"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import useStore from "../store/store";
import ProductCard from "../components/ProductCard";

const HomePage: React.FC = () => {
  const products = useStore((state) => state.products);
  const featuredProducts = products.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple parallax effect with reduced intensity to prevent flickering
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.2}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900"
      >
        {/* Animated background elements - reduced quantity and size for better performance */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 bg-white rounded-full blur-xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 400,
                opacity: Math.random() * 0.3 + 0.2,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 400,
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Premium 3D Printed Art
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Transform Your Space with Custom 3D Printed Art
              </h1>
              <p className="text-xl mb-8 text-white">
                Unique, customizable art pieces that bring your vision to life
                through the magic of 3D printing technology.
              </p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  to="/products"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 hover:shadow-lg hover:shadow-white/20 transition-all flex items-center"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                >
                  Custom Orders
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Model Visualization - replacing the printer image */}
            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                {/* 3D art visualization */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-2xl backdrop-blur-sm border border-white/20"></div>

                {/* Abstract 3D shapes */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                  <motion.div
                    className="absolute w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl"
                    animate={{
                      rotateX: [0, 45, 0],
                      rotateY: [0, 45, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                    }}
                  />
                  <motion.div
                    className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full"
                    animate={{
                      rotateZ: [0, 360],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-lg"
                    animate={{
                      rotateZ: [0, -360],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </div>

                {/* Floating particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    initial={{
                      x: Math.random() * 300 - 150 + 150,
                      y: Math.random() * 300 - 150 + 150,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      x: Math.random() * 300 - 150 + 150,
                      y: Math.random() * 300 - 150 + 150,
                      scale: [0.5, 1, 0.5],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>

              {/* Decorative glow effects */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[100px] opacity-30" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full blur-[100px] opacity-30" />
            </motion.div>
          </div>
        </div>

        {/* Wave separator - smoother curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="var(--background, #f9fafb)"
              fillOpacity="1"
              d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,122.7C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Bringing Art and Technology Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At 3D Art Prints, we combine artistic vision with cutting-edge 3D
              printing technology to create stunning, one-of-a-kind pieces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-card text-card-foreground p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"></path>
                  <path d="M5 4h14a1 1 0 0 1 1 1v4H4V5a1 1 0 0 1 1-1Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-muted-foreground">
                We use only the highest quality filaments and resins to ensure
                your art piece is durable and visually stunning.
              </p>
            </motion.div>

            <motion.div
              className="bg-card text-card-foreground p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Designs</h3>
              <p className="text-muted-foreground">
                Every piece can be customized to your specifications, from size
                and color to intricate design modifications.
              </p>
            </motion.div>

            <motion.div
              className="bg-card text-card-foreground p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <circle cx="13.5" cy="6.5" r="2.5"></circle>
                  <circle cx="19" cy="17" r="2"></circle>
                  <circle cx="5" cy="17" r="2"></circle>
                  <path d="M13.5 9v3a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5v-3a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 0 5 0v-3a2.5 2.5 0 0 1 5 0v3a5 5 0 0 1-5 5h0a4.95 4.95 0 0 1-3.57-1.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Artistic Vision</h3>
              <p className="text-muted-foreground">
                Our team of designers brings years of artistic experience to
                create pieces that are both beautiful and meaningful.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex justify-between items-end mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured <span className="text-primary">Creations</span>
              </h2>
              <p className="text-muted-foreground">
                Explore our most popular and innovative 3D printed art pieces
              </p>
            </div>
            <Link
              to="/products"
              className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white relative overflow-hidden">
        {/* Animated particles - reduced for better performance */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-white rounded-full opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 300,
              }}
              animate={{
                y: [Math.random() * 300, -20],
                opacity: [0.1, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white text-blue-600 mb-6 shadow-lg shadow-blue-700/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M13 3L4 9v12h16V9L13 3z"></path>
                <path d="M13 21v-9l-5-3v9"></path>
                <path d="M13 12l5-3"></path>
                <path d="M8 12v9"></path>
                <path d="M8 12l5-3"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Whether you're looking for a statement piece or a thoughtful gift,
              our custom 3D printed art is the perfect solution.
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/products"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 hover:shadow-lg hover:shadow-white/20 transition-all"
              >
                Browse Collection
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Request Custom Design
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements - reduced intensity */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
      </section>
    </div>
  );
};

export default HomePage;
