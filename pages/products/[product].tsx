import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Head from "next/head";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import Page from "../../components/styled/Page";
import useCart from "../../hooks/useCart";
import { FullProduct } from "../../models/product";

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

const Product = ({ product }: { product: FullProduct }) => {
  const {
    cart, addToCart, reduceProductQuantity, removeFromCart
  } = useCart();

  const productInCart = cart.find((p: FullProduct) => p.id === product.id);
  const qtyInCart = productInCart ? productInCart.qty : 0;

  let image = null;
  if (product.imgSrc) {
    image = (
      <div>
        <img
          src={product.imgSrc}
          alt={`${product.name}`}
          height={500}
          width={500}
        />
      </div>
    );
  }

  return (
    <Page>
      <Head>
        <title>
          {`${product.name} | Made by Melanie`}
        </title>
      </Head>
      <h1>{product.name}</h1>
      {image}
      <Price>
        {`$${product.price / 100}`}
      </Price>
      <QuantityButtons>
        <QuantityButton type="button" onClick={() => addToCart(product)}>
          <FiPlus />
        </QuantityButton>
        <QuantityButton type="button" onClick={() => reduceProductQuantity(product)}>
          <FiMinus />
        </QuantityButton>
        <QuantityButton type="button" onClick={() => removeFromCart(product)}>
          <FiX />
        </QuantityButton>
      </QuantityButtons>
      <div>
        {qtyInCart
          ? `${qtyInCart} in your cart`
          : "This item is not in your cart."}
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(product.content) }} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<{ product: FullProduct }> = async (context) => {
  const productName = context.params.product;
  const filePath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filePath).toString();
  const { data, content } = matter(fileContent);
  return {
    props: {
      product: {
        id: data.id,
        name: data.name,
        price: data.price,
        imgSrc: data.imgSrc ? data.imgSrc : "",
        content
      }
    }
  };
};

export default Product;
