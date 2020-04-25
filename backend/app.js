const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require('express-validator')
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");
const cartShopRoutes = require("./routes/cartShop");
//faze de teste \/

//app
const app = express();




//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

//midlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expressValidator())
app.use(cors());
// response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartShopRoutes);
//faze de teste \/

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("online"));
