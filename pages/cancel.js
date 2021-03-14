import Page from "../components/styled/Page";
import Head from "next/head";

const Cancel = () => {
  return <Page>
    <Head>
      <title>Payment Cancelled | Made by Melanie</title>
    </Head>
    <h2>Payment Cancelled</h2>
    <p>Your card has not been charged.</p>
  </Page>;
};

export default Cancel;