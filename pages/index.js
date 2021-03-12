import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";

function HomePage(props) {
  const { products } = props;
  return products.map((product, i) => {
    return <div key={i}>
      <Link href={product.slug}>
        <a>
          <h1>{product.name}</h1>
        </a>
      </Link>
    </div>;
  });
}

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