import styled from "styled-components"
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar"
import Cart from "../components/Cart"
import CartProvider from "../context/Cart";

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
  background: linear-gradient(to right, #faaca8, #ddd6f3);
  font-family: 'Shadows Into Light', cursive;
  color: #444;
`;

const Page = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

function MyApp({ Component, pageProps }) {
  return <CartProvider>
    <Container>
      <Normalize />
      <Navbar />
      <Page>
        <Component {...pageProps} />
      </Page>
      <Cart />
    </Container>
  </CartProvider>;
}

export default MyApp