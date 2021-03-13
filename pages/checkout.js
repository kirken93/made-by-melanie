import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Ul = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #faaca8, #ddd6f3);
  outline: none;
  border: none;
  font-size: 2rem;
  width: 100%;
  padding: 1rem;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const Checkout = () => {
  const { cart, total } = useCart();

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map(({ id, qty }) => ({ id, qty }));
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.post(url, { cart: newCart });
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return <Page>
    <h2>Checkout</h2>
    {cart.length > 0
      ? (<>
          <Ul>
            {cart.map(item => {
              return <Item key={item.id}>
                <span>{item.qty}x {item.name}</span>
                <span>${item.qty*item.price/100}</span>
              </Item>;
            })}
          </Ul>
          <Total>
            <span>Total</span>
            <span>${total}</span>
          </Total>
          <Button onClick={processPayment}>Process Payment</Button>
        </>)
      : <p>Your cart is empty!</p>}
  </Page>;
};

export default Checkout;