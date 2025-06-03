"use client";

import type React from "react";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";

const CartPage: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const clearCart = useStore((state) => state.clearCart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-muted text-muted-foreground mb-6">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-card-foreground">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </h2>
              </div>

              <div className="divide-y divide-border">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-24 h-24 flex-shrink-0">
                        <img
                          src={
                            item.product.image ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md border border-border"
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-medium text-card-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Enhanced Quantity Controls */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-3 font-medium">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-border rounded-lg bg-background">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-3 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-6 py-3 text-center min-w-[4rem] border-x border-border text-card-foreground font-medium bg-muted/30">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-3 hover:bg-accent transition-colors rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Subtotal
                          </p>
                          <p className="text-lg font-semibold text-card-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center text-destructive hover:text-destructive/80 transition-colors p-2 hover:bg-destructive/10 rounded-md"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md p-6 sticky top-24 border border-border">
              <h2 className="text-xl font-semibold text-card-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="text-card-foreground font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-card-foreground font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-card-foreground font-medium">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-card-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${(totalPrice + totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors flex items-center justify-center"
                onClick={() =>
                  alert("Checkout functionality would be implemented here!")
                }
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>

              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Free Shipping Info */}
              <div className="mt-6 p-4 bg-muted rounded-md">
                <h3 className="font-medium text-card-foreground mb-2">
                  Free Shipping
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy free shipping on all orders. Your 3D printed art will be
                  carefully packaged and delivered to your door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
