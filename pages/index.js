import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

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

  &:hover {
    transform: scale(1.02);
  }
`;

const renderProduct = (product, add) => {
  const handleClick = (event) => {
    event.stopPropagation();
    add(product);
  };

  return <Link href={product.slug} key={product.id}>
    <UnstyledLink>
      <Container>
        <h1>{product.name}</h1>
        <button onClick={handleClick}>Add to cart</button>
      </Container>
    </UnstyledLink>
  </Link>;
};

const HomePage = (props) => {
  const { cart, addToCart, removeFromCart } = useCart();
  console.log(cart);
  return <ProductsContainer>
    {props.products.map(p => renderProduct(p, addToCart))}
  </ProductsContainer>
};

export const getStaticProps = async () => {
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