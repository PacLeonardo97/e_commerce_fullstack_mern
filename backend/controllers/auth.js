const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");


//Cadastrar usuário
exports.signup = (req, res) => {
  console.log("req.body", req.body);
  
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
        return res.status(400).json({
            error: 'Email is taken'
        });
    }

    const { name, email, password } = req.body;
    let newUser = new User({ name, email, password});
    
    newUser.save((err, success) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Signup success! Please signin.'
        });
    });
});
}

// Fazer Login
exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "Usuário com este email não existe, por favor cadastre-se",
      });
    }
    //if user is found make sure the email and password match
    // create authenticte method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email e senha incorretos",
      });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend cliente
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//DESLOGAR
exports.signout = (req, res, next) => {
  res.clearCookie("t");
  res.json({ message: "Deslogado com sucesso" });
};

// PROTEGER ROTAS
exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,
    userProperty:"auth",
    
})

// PERMITIR AUTORIZAÇÃO PARA TAIS ROTAS
exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if(!user) { 
    return res.status(403).json({
      error:"Acesso negado"
    })
  } 
  console.log(req.profile.name)
  next(); 
}

// SE FOR ADMIN TER DETERMINADOS ACESSOS.
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
      return res.status(403).json({
          error: 'Admin resourse! Access denied'
      });
  }
  next();
};