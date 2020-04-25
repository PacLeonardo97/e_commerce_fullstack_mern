const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken,processPayment } = require("../controllers/braintree");

//gerar o token para o pagmento
router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);

//lidar com o processo de pagamento
router.post("/braintree/payment/:userId", requireSignin, isAuth, processPayment);


router.param("userId", userById);

module.exports = router;
