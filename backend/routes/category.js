const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  remove,
  update,
  list,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//Para criar categoria, precisa estar logado, autenticado e ser admin
router.get("/category/:categoryId", read);
//criar categoria
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
//deletar categoria
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
//editar categoria
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
//mostrar todas categorias
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
