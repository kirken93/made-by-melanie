import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Head from "next/head";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import Page from "../../components/styled/Page";
import useCart from "../../hooks/useCart";

const Price = styled.span`
  font-size: 2rem;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  background: #ddd6f3;
  color: white;
  margin-bottom: 1rem;
  display: inline-block;
`;

const QuantityButtons = styled.span`
  display: flex;
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

const Product = ({ product: { data, content } }) => {
  const {
    cart, addToCart, reduceProductQuantity, removeFromCart
  } = useCart();

  const productInCart = cart.find((p) => p.id === data.id);
  const qtyInCart = productInCart ? productInCart.qty : 0;

  return (
    <Page>
      <Head>
        <title>
          {data.name}
          {" "}
          | Made by Melanie
        </title>
      </Head>
      <h1>{data.name}</h1>
      <Price>
        $
        {data.price / 100}
      </Price>
      <QuantityButtons>
        <QuantityButton type="button" onClick={() => addToCart(data)}>
          <FiPlus />
        </QuantityButton>
        <QuantityButton type="button" onClick={() => reduceProductQuantity(data)}>
          <FiMinus />
        </QuantityButton>
        <QuantityButton type="button" onClick={() => removeFromCart(data)}>
          <FiX />
        </QuantityButton>
      </QuantityButtons>
      <div>
        {qtyInCart
          ? `${qtyInCart} in your cart`
          : "This item is not in your cart."}
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </Page>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number
    }),
    content: PropTypes.string
  }).isRequired
};

export const getStaticPaths = () => {
  // product pages to generate
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map((filename) => ({
    params: {
      product: filename.replace(".md", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filePath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filePath).toString();
  const { data, content } = matter(fileContent);
  return {
    props: {
      product: {
        data,
        content
      }
    }
  };
};

export default Product;
