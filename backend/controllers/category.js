const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category não existe       ",
      });
    }
    req.category = category;
    next();
  });
};

//criar categoria
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data: data });
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.remove = (req, res) => {
  //pegar a categoria selecionada, para isso o req.category(pegar tudo de uma categoria)
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    console.log(data)
    res.json({
      message: "Produto deletado com sucesso" + data.name,
    });
  });
};

//editar uma categoria
exports.update = (req, res) => {
  //pegar a categoria selecionada, para isso o req.category(pegar tudo de uma categoria)
  const category = req.category;
  /// pegar o nome da categoria, não pegar tudo, como por exemplo id, data de criação nada..., apenas nome
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    console.log(data)
    res.json(data);
  });
};

// mostrar todos as categorias
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.status(200).json(data);
  });
};

