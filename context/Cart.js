import { createContext, useState, useEffect } from "react";
export const Context = createContext();

const Cart = ({children}) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);

  // localStorage isn't available on server side, so need to use effect to load initial cart
  // after mount
  useEffect(() => {
    const initialCart = getInitialCart();
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

  const exposed = {
    cart,
    addToCart,
    removeFromCart
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;