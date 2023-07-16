const express = require("express");
require("dotenv").config();
require("express-async-errors")
const NotFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const productRouter = require("./routes/products")

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='api/v1/products'>Products route</a>");
});

app.use("/api/v1/products", productRouter)

app.use(NotFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("App is listening on port " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

start()
