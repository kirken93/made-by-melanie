import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  margin: 1rem 0;
`;

const Price = styled.span`
  font-size: 2rem;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  background: #ddd6f3;
  color: white;
  margin-bottom: 1rem;
  display: inline-block;
`;

const Product = ({ product: { data, content } }) => {
  let price = null;
  if (data.price) {
    price = <Price>${data.price/100}</Price>;
  }
  return <Container>
    <h1>{data.name}</h1>
    {price}
    <div dangerouslySetInnerHTML={{ __html: marked(content)}} />
  </Container>;
};

export const getStaticPaths = () => {
  // product pages to generate
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map(filename => {
    return {
      params: {
        product: filename.replace(".md", "")
      }
    };
  });

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