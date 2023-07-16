require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    const pr = await Product.create(jsonProducts);
    if (!pr) {
      console.log("unsucessful");
    }
    console.log(pr);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};
start();
