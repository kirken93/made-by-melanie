import styled from "styled-components"
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar.js"
import Cart from "../components/Cart"
import CartProvider from "../context/Cart";
import Head from "next/head";
import { AppProps } from "next/app";

const Container = styled.div`
  background: linear-gradient(to right, #faaca8, #ddd6f3);
  font-family: 'Shadows Into Light Two', cursive;
  color: #444;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

function MyApp({ Component, pageProps } : AppProps) {
  return <CartProvider>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="description" content="Made by Melanie makes custom homemade crafts."/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap" rel="stylesheet"/>
      <title>Made by Melanie</title>
    </Head>
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
