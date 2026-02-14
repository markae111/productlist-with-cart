import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Initialize state by checking localStorage first
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("dessert_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Save to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("dessert_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (name, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // 3. Helper to clear cart (useful for 'Start New Order' button)
  const resetCart = () => {
    setCart([]);
    localStorage.removeItem("dessert_cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
