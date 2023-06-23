var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var auth = require('../auth/auth')

var User = require('../controllers/user')


router.get('/', function(req, res){
  User.list()
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/:usr/perfil', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.usr)
    .then(dados => res.status(200).jsonp({dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/', auth.verificaAcesso, function(req, res){
  User.addUser(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,19)
  userModel.register(
    new userModel({
      username: req.body.username,
      name: req.body.name, 
      email: req.body.email,
      idade: req.body.idade,
      profissao: req.body.profissao,
      level: req.body.level,
      active: true, 
      dateCreated: d,
      lastAccess: d,
      localidade: req.body.localidade
    }), 
    req.body.password, 
    function(err, user) {
      if (err){
        res.status(500).jsonp({error: "Erro no registo: " + err})
      } else {
          passport.authenticate("local")(req,res,function(){
            jwt.sign(
              { username: req.user.username, level: req.user.level, sub: 'login'}, 
              "BasesJuridicas",
              {expiresIn: 3600},
              function(e, token) {
                if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                else {
                  res.status(201).jsonp({token: token, user:{username: req.user.username, level: req.user.level}})
                }
              });
  
          })
      }     
  })
})

// POST /users/:usr/login  -  Efetua o login do utilizador
router.post('/:usr/login', passport.authenticate('local'), function(req, res){
  var d = new Date().toISOString().substring(0,19)
  jwt.sign(
    { username: req.params.usr, level: req.user.level, sub: 'login'}, 
    "BasesJuridicas",
    {expiresIn: 3600},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else {    
        User.userLogin(req.params.usr, d)
        .then(() => {
          res.status(201).jsonp({token: token, user:{username: req.user.username, level: req.user.level}})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
        })
      }
  });
})

router.put('/:id', auth.verificaAcesso, function(req, res) {
  User.updateUser(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})


// PUT /users/:usr/logout  -  Efetua o logout do utilizador
router.put('/:usr/logout', auth.verificaAcesso, function(req, res) {
  User.userLogout(req.params.usr)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/ativar', auth.verificaAcesso, function(req, res) {
  User.updateUserStatus(req.params.id, true)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/password', auth.verificaAcesso, function(req, res) {
  User.updateUserPassword(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.delete('/:id', auth.verificaAcesso, function(req, res) {
  User.deleteUser(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção do utilizador"})
    })
})

module.exports = router;