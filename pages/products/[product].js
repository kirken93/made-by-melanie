import fs from "fs";
import matter from "gray-matter";
import marked from "marked";

const Product = ({ product: { data, content } }) => {
  let price = null;
  if (data.price) {
    price = <p>${data.price/100}</p>;
  }
  return <div>
    <h1>{data.name}</h1>
    {price}
    <div dangerouslySetInnerHTML={{ __html: marked(content)}} />
  </div>;
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