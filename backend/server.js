require("dotenv").config();
const express = require("express");
var cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();

app.use(cors());

app.use(express.static(__dirname + "/public"));

// this code should placed :
// after call express
// before routes
app.use(express.json());

// this code should placed :
// before routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "*");
    return res.status(200).json();
  }
  next();
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/productCategory", productCategoryRoutes);
app.use("/api/v1/order", orderRoutes);

// app.use((req, res, next) => {
//   res.status(404).json({
//     msg: "Not Found",
//   });
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
