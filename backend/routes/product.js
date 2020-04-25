const express = require('express')
const router = express.Router();

const {create, productById,read, remove, update, list, listRelated, listCategories,listSearch, listBySearch,photo } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


//Para criar categoria, precisa estar logado, autenticado e ser admin

//rota para ler um determinado produto
router.get('/product/:productId', read)

//rota para adicionar um determinado produto com base no usuario 
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)

//deletar um produto pelo ID e pelo USUARIO
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);


//editar um produto dependendo do ID do produto e do usuario
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

//pegar todos os produtos]
router.get('/products', list)

//pegar todos os produtos pesquisados
router.get('/products/search', listSearch)

//pegar produtos relacionados
router.get('/products/related/:productId', listRelated)

//pegar categoria relacionada a produos
router.get('/products/categories', listCategories)

//procurar por produto
router.post("/products/by/search", listBySearch);

//pegar photo do produto
router.get("/product/photo/:productId", photo);



router.param("userId", userById);
router.param("productId", productById);

module.exports = router;