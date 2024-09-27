import React, { createContext, useState, useCallback } from 'react';

// Create the Cart context
export const CartContext = createContext();

// Cart provider component to wrap the app or specific components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart or update the quantity if it already exists
  const addToCart = useCallback((product) => {
    if (!product || !product.name || !product.quantity) {
      console.error("Invalid product data");  // Basic error handling
      return;
    }

    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.name === product.name);
      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  }, []);

  // Increment product quantity in the cart
  const incrementQuantity = useCallback((productName) => {
    if (!productName) {
      console.error("Product name is required");  // Error handling
      return;
    }

    setCart(prevCart => prevCart.map(item =>
      item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }, []);

  // Decrement product quantity in the cart, but prevent going below 1
  const decrementQuantity = useCallback((productName) => {
    if (!productName) {
      console.error("Product name is required");  // Error handling
      return;
    }

    setCart(prevCart => prevCart.map(item =>
      item.name === productName && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  }, []);

  // Clear the cart
  const emptyCart = useCallback(() => {
    setCart([]);  // Clear the cart
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};