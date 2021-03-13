const fs = require("fs");
const matter = require("gray-matter");

const getProducts = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map(filename => {
    // read file
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    // pull out front matter
    const { data } = matter(fileContent);
    return data;
  });

  return products;
};

const filepath = `${process.cwd()}/functions/products.json`;
fs.writeFileSync(filepath, JSON.stringify(getProducts()));