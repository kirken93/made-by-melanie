import { createContext, useState, useEffect } from "react";
export const Context = createContext();

const Cart = ({children}) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addToCart = (product, qty = 1) => {
    const item = cart.find(i => i.id === product.id);
    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
  }

  const exposed = {
    cart,
    isOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;