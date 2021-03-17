import Head from "next/head";
import Page from "../components/styled/Page";

const Cancel = () => (
  <Page>
    <Head>
      <title>Payment Cancelled | Made by Melanie</title>
    </Head>
    <h2>Payment Cancelled</h2>
    <p>Your card has not been charged.</p>
  </Page>
);

export default Cancel;
