import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";

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
  return <Page>
    <h1>{data.name}</h1>
    <Price>${data.price/100}</Price>
    <div dangerouslySetInnerHTML={{ __html: marked(content)}} />
  </Page>;
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