import { useEffect } from "react";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import Head from "next/head";

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return <Page>
    <Head>
      <title>Payment Successful | Made by Melanie</title>
    </Head>
    <h2>Payment Successful</h2>
    <p>Thank you for your purchase!</p>
  </Page>;
};

export default Success;