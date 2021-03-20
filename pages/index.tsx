import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import { GetStaticProps } from "next";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";
import { ProductWithSlug } from "../models/product";

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns 1fr 1fr;
  grid-gap: 0.5rem;
`;

const Container = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
  min-height: 200px;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.02);
  }
`;

const Price = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2rem;
  font-size: 3rem;
`;
const ProductTile = ({ product, add }: { product: ProductWithSlug, add: Function }) => {
  const handleClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    add(product);
  };

  return (
    <Link href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <button type="button" onClick={handleClick}>Add to cart</button>
          <Price>
            {`$${product.price / 100}`}
          </Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = ({ products }: { products: Array<ProductWithSlug> }) => {
  const { addToCart } = useCart();
  return (
    <ProductsContainer>
      {products.map((p) => <ProductTile key={p.id} product={p} add={addToCart} />)}
    </ProductsContainer>
  );
};

export const getStaticProps: GetStaticProps<{products: Array<ProductWithSlug>}> = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map((filename) => {
    // read file
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    // pull out front matter
    const { data } = matter(fileContent);

    // return data, adding slug
    const slug = `/products/${filename.replace(".md", "")}`;
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      slug
    };
  });

  return {
    props: {
      products
    }
  };
};

export default HomePage;
