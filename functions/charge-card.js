const fs = require("fs");
const matter = require("gray-matter");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  const products = getProducts();
  
  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find(p => p.id === id);
    return {
      ...product,
      qty
    };
  });

  const lineItems = cartWithProducts.map(product => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name
        },
        unit_amount: product.price
      },
      quantity: product.qty
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/cancel`
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id
    })
  };
};