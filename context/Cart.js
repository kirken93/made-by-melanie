import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

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
    setTotal(cart.map((item) => ((item.qty * item.price) / 100)).reduce((a, b) => a + b, 0));
  }, [cart]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((i) => i.id !== product.id));
  };

  const reduceProductQuantity = (product) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      if (item.qty > 1) {
        item.qty -= 1;
        setCart([...cart]);
      } else {
        removeFromCart(product);
      }
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const exposed = {
    cart,
    total,
    isOpen,
    addToCart,
    reduceProductQuantity,
    removeFromCart,
    openCart,
    closeCart,
    clearCart
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

Cart.propTypes = {
  children: PropTypes.node
};

Cart.defaultProps = {
  children: null
};

export default Cart;
