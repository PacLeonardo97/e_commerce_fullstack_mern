const express = require("express");
const router = express.Router();

const { requireSignin, isAuth,isAdmin } = require("../controllers/auth");
const { userById, addOrderToUseHistory, purchaseHistory } = require("../controllers/user");
const { create,listOrders, getStatusValue,orderById,updateOrderStatus } = require('../controllers/order')
const { decreaseQuantity } = require("../controllers/product");

//verificar o status do pedido
router.get('/order/status-values/:userId', requireSignin, isAuth,isAdmin, getStatusValue)
//listar pedidos
router.get('/order/list/:userId', requireSignin, isAuth,isAdmin, listOrders)


//atualizar o status do pedido
router.put('/order/:orderId/status/:userId', requireSignin, isAuth,isAdmin, updateOrderStatus)

//fazer pedido
router.post('/order/create/:userId', requireSignin, isAuth,addOrderToUseHistory,decreaseQuantity, create)

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
