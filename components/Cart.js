import { useRouter } from "next/router";
import styled from "styled-components";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import useCart from "../hooks/useCart";
import Link from "next/link";
import UnsytledLink from "../components/styled/UnstyledLink";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 400px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.2s ease-in;
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const X = styled(FiX)`
  font-size: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
`;

const ItemRow = styled.span`
  display: flex;
  justify-content: space-between;
`;

const QuantityButtons = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const QuantityButton = styled.button`
  border: 0;
  background: none;
  outline: 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }
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

const Cart = () => {
  const { cart, total, isOpen, closeCart, addToCart, reduceProductQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const navigateToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return <Container isOpen={isOpen}>
    <XContainer>
      <X onClick={closeCart} />
    </XContainer>
    <Content>
      <Title>Cart</Title>
      {cart.length > 0
        ? (<>
          <Ul>
            {cart.map(item => {
              return <Item key={item.id}>
                <ItemRow>
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>${item.qty*item.price/100}</span>
                </ItemRow>
                <QuantityButtons>
                  <QuantityButton type="button" onClick={() => addToCart(item)}><FiPlus /></QuantityButton>
                  <QuantityButton type="button" onClick={() => reduceProductQuantity(item)}><FiMinus /></QuantityButton>
                  <QuantityButton type="button" onClick={() => removeFromCart(item)}><FiX /></QuantityButton>
                </QuantityButtons>
              </Item>;
            })}
          </Ul>
          <Total>
            <span>Total</span>
            <span>${total}</span>
          </Total>
          <Button onClick={navigateToCheckout}>Checkout</Button>
        </>) : (
          <p>Your cart is empty</p>
        )}
      
    </Content>
  </Container>;
};

export default Cart;