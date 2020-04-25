const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { addItem, list } = require("../controllers/cartShop");
const {productById } = require('../controllers/product');

//Para criar categoria, precisa estar logado, autenticado e ser admin
// router.get("/category/:categoryId", read);
// //criar categoria
router.post("/cartShop/addItem/:userId/:productId", requireSignin, isAuth, addItem);


// router.get("/cartShop", list);

// router.param("categoryId", categoryById);
router.param("userId", userById);
router.param("productId", productById);


module.exports = router;
