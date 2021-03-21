import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Head from "next/head";
import PropTypes from "prop-types";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import CartProvider from "../context/Cart";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content="Made by Melanie makes custom homemade crafts." />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap" rel="stylesheet" />
        <title>Made by Melanie</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4JM1YS152H" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4JM1YS152H');`
          }}
        />
      </Head>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
      </Container>
    </CartProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({})
};

MyApp.defaultProps = {
  Component: null,
  pageProps: {}
};

export default MyApp;
