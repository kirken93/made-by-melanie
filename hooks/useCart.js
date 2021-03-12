import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  // localStorage isn't available on server side, so need to use effect to load initial cart
  // after mount
  useEffect(() => {
    const initialCart = () => JSON.parse(localStorage.getItem("cart"));
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  // update cart in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, qty = 1) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { id, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
  }

  return {
    cart,
    addToCart,
    removeFromCart
  };
};

export default useCart;