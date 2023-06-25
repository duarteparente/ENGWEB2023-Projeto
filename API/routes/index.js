var express = require('express');
var router = express.Router();
var Acordao = require('../controllers/acordao')


router.get('/acordaos', function(req, res) {
  if (req.query.processo != undefined){
    Acordao.getAcordaoProcesso(req.query.processo)
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter o acórdão!"}))
  }

  else {
    Acordao.count()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a contagem de acórdãos!"}))
  }
});


router.get('/acordaos/tribunal', function(req, res) {
  Acordao.getSearchAcordaosTribunal(req.query.tribunal, decodeURI(req.query.Descritor), req.query.DataAcordao)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de acórdãos pertencentes a essa instituição!"}))
});


router.put('/acordaos/editar/:id', function(req, res) {
  Acordao.updateAcordao(req.params.id, req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui atualizar o acórdão pretendido!"}))

});


router.post('/acordaos', function(req,res) {
  Acordao.createAcordao(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui adicionar um novo acórdão!"}))
})


router.delete('/acordaos/:id', function(req,res) {
  Acordao.deleteAcordao(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui eliminar o acórdão pretendido!"}))
})


module.exports = router;