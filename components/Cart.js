import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useCart from "../hooks/useCart";

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
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
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
  const { cart, isOpen, closeCart } = useCart();

  return <Container isOpen={isOpen}>
    <XContainer>
      <X onClick={closeCart} />
    </XContainer>
    <Content>
      <Title>Cart</Title>
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
        <span>${cart.map(item => item.qty*item.price/100).reduce((a, b) => a + b, 0)}</span>
      </Total>
      <Button>Checkout</Button>
    </Content>
  </Container>;
}

export default Cart;