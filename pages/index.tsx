import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";
import { GetStaticProps } from "next";

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

const renderProduct = ({ product, add }: { product: any; add; }) => {
  const handleClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    add(product);
  };

  return <Link href={product.slug} key={product.id}>
    <UnstyledLink>
      <Container>
        <h1>{product.name}</h1>
        <button onClick={handleClick}>Add to cart</button>
        <Price>
          ${product.price/100}
        </Price>
      </Container>
    </UnstyledLink>
  </Link>;
};

const HomePage = (props: { products: any[]; }) => {
  const { addToCart } = useCart();
  return <ProductsContainer>
    {props.products.map(p => renderProduct({ product: p, add: addToCart }))}
  </ProductsContainer>
};

export const getStaticProps : GetStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map(filename => {
    // read file
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    // pull out front matter
    const { data } = matter(fileContent);

    // return data, adding slug
    const slug = `/products/${filename.replace(".md", "")}`;
    return {
      ...data,
      slug
    };
  });

  return {
    props: {
      products
    }
  }
};

export default HomePage;