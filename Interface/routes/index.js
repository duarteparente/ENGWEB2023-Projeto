var express = require('express');
var router = express.Router();
var axios = require('axios')
var user, admin
var dict = {
  Votacao: "Votação",
  NConvencional: "Número Convencional",
  DataAcordao: "Data do Acórdão",
  Acordao: "Acordão",
  NDocumento: "Número do Documento",
  Especie: "Espécie",
  NormasApreciadas: "Normas Apreciadas",
  NormasJulgadasInconst: "Normas Julgadas Inconstitucionais",
  AreaTematica1: "Área Temática 1",
  AreaTematica2: "Área Temática 2",
  Decisao: "Decisão",
  Sumario: "Sumário",
  TextoIntegral: "Texto Integral",
  VolumeAcordaosTC: "Volume dos Acordãos do Tribunal Constitucional",
  Constituicao: "Constituição",
  LegislacaoNacional: "Legislação Nacional",
  NDiarioRepublica: "Número do Diário da República",
  SerieDiarioRepublica: "Série do Diário da República",
  DataDiarioRepublica: "Data do Diário da República",
  PaginaDiarioRepublica: "Página do Diário da República",
  NBoletimMJ: "Nº do Boletim do Ministério da Justiça",
  PaginaBoletimMJ: "Página do Boletim do Ministério da Justiça",
  JurisprudenciaConstitucional: "Jurisprudência Constitucional",
  NormasSuscitadas: "Normas Suscitadas",
  DeclaracaoVoto: "Declaração de Voto",
  VotoVencido: "Voto Vencido",
  IndicacoesEventuais: "Indicações Eventuais",
  NormasDeclaradasInconst: "Normas Declaradas Inconstitucionais",
  PaginaVolume: "Página do Volume",
  OutrasPublicacoes: "Outras Publicações",
  LegislacaoComunitaria: "Legislação Comunitária",
  ReferenciaPareceres: "Referência a Pareceres",
  ReferenciasInternacionais: "Referências Internacionais",
  OutraJurisprudencia: "Outra Jurisprudência",
  JurisprudenciaInternacional: "Jurisprudência Internacional",
  JurisprudenciaEstrangeira: "Jurisprudência Estrangeira",
  LegislacaoEstrangeira: "Legislação Estrangeira",
  Recorrido1: "Recorrido 1",
  Recorrido2: "Recorrido 2",
  DataEntrada: "Data de Entrada",
  MeioProcessual: "Meio Processual",
  ReferenciaDoutrina: "Referência a Doutrina",
  JurisprudenciaNacional: "Jurisprudência Nacional",
  NVolume: "Número do Volume",
  RecusaAplicacao: "Recusa Aplicação",
  AnoPublicacao: "Ano de Publicação",
  Apendice: "Apêndice",
  DataApendice: "Data do Apêndice",
  PPagPublicacaoAcordao: "1ª Página de Publicação do Acordão",
  ReferenciaPublicacao1: "Referência de Publicação 1",
  Tribunal1instancia: "Tribunal de 1ª Instância",
  JuizoSeccao: "Juízo ou Secção",
  TipoAcao: "Tipo de Ação",
  TipoContrato: "Tipo de Contrato",
  Reu: "Réu",
  DataDecisao: "Data da Decisão",
  TextoClausulasAbusivas: "Texto das Cláusulas Abusivas",
  Pagina: "Página",
  ReferenciaPublicacao2: "Referência de Publicação 2",
  DecisaoTextoIntegral: "Decisão Texto Integral",
  ReferenciaPublicacao: "Referência de Publicação",
  DataDecisaoSumaria: "Data da Decisão Sumária",
  NUnicoProcesso: "Número Único do Processo",
  TribunalRecurso: "Tribunal Recurso",
  AreaTematica: "Área Temática",
  DataDecisaoSingular: "Data da Decisão Singular",
  DataReclamacao: "Data da Reclamação",
  ReferenciaProcesso: "Referência do Processo",
  ProcessoTribunalRecurso: "Processo no Tribunal Recurso",
  Seccao: "Secção",
  NProcessoTAF: "Número do Processo/TAF",
  SubSeccao: "Sub-Secção",
  Observacoes: "Observações",
  DisponivelJTCA: "Disponível na JTCA",
  PecaProcessual: "Peça Processual",
  ParecerMinisterioPublico: "Parecer do Ministério Publico",
  TribunalRecorrido: "Tribunal Recorrido",
  ProcessoTribunalRecorrido: "Processo no Tribunal Recorrido",
  TextoParcial: "Texto Parcial",
  Estrangeiro1: "Estrangeiro 1",
  Reclamacoes: "Reclamações",
  DataDecRecorrida: "Data Dec. Recorrida"
}

var tribs = {
  atco1: "Acórdãos do Tribunal Constitucional",
  jcon: "Acórdãos do Tribunal dos Conflitos",
  jdgpj: "Cláusulas Abusivas julgadas pelos Tribunais",
  jsta: "Acórdãos do Supremo Tribunal Administrativo",
  jstj: "Acórdãos do Supremo Tribunal de Justiça",
  jtca: "Acórdãos do Tribunal Central Administrativo Sul",
  jtcampca: "Pareceres do MP do Tribunal Central Administrativo Sul - Contencioso Administrativo",
  jtcampct: "Pareceres do MP do Tribunal Central Administrativo Sul - Contencioso Tributário",
  jtcn: "Acórdãos do Tribunal Central Administrativo Norte",
  jtrc: "Acórdãos do Tribunal da Relação de Coimbra",
  jtre: "Acórdãos do Tribunal da Relação de Évora",
  jtrg: "Acórdãos do Tribunal da Relação de Guimarães",
  jtrl: "Acórdãos do Tribunal da Relação de Lisboa",
  jtrp: "Acórdãos do Tribunal da Relação do Porto"
}


router.get('/', function(req, res){
  var token = req.cookies.token;
  if(token && user){
    (user.level == 'admin') ? admin = true : admin = false
    res.render('main-page', {log: true, adm: admin, username: user.username, lvl: user.level })
  }
  else{
    res.render('main-page', {log: false})
  }
})


router.get('/tribunal', function(req, res, next) {
  axios.get('http://localhost:22231/acordaos' + req.url)
    .then(resposta => {
      if (resposta.data.length == 0){
        res.render('not-found');
      }
      else {
        var token = req.cookies.token;
        var tribunal = tribs[req.query.tribunal]
        if(token && user){
          (user.level == 'admin') ? admin = true : admin = false
          res.render('tribunal-page', {log: true, adm: admin, username: user.username, lvl: user.level, ft: tribunal, acs: resposta.data })
        }
        else{
          res.render('tribunal-page', {log: false, ft: tribunal, acs: resposta.data })
        }
      }
    })
    .catch(error => {
      res.render('error', {err: error})
    })
});


router.post('/processo/editar/:id', function(req, res, next) {
  var token = req.cookies.token;
      if(token && user){
        (user.level == 'admin') ? admin = true : admin = false
        if (admin == true) {
          console.log(req.body)
          axios.put('http://localhost:22231/acordaos/editar/' + req.params.id, req.body)
            .then(resposta => {
              res.render('acordao-page', {log: true, adm: admin, username: user.username, lvl: user.level, d: dict, a: resposta.data })
            })
            .catch(error => {
              res.render('error', {err: error})
            })
        }
        else {
          res.render('main-page', {log: true, adm: admin, username: user.username, lvl: user.level })
        }      
      }
      else{
        res.render('loginForm', {message: 'OK'})
      }
});


router.get('/processo/:id', function(req, res, next) {
  axios.get('http://localhost:22231/acordaos?processo=' + req.params.id)
    .then(resposta => {
      if (resposta.data == null){
        res.render('not-found');
      }
      else {
        var token = req.cookies.token;
        if(token && user){
          (user.level == 'admin') ? admin = true : admin = false
          res.render('acordao-page', {log: true, adm: admin, username: user.username, lvl: user.level, d: dict, a: resposta.data })
        }
        else{
          //res.render('profile', {username: "duarteparente", active:true})
          res.render('acordao-page', {log: false, d: dict, a: resposta.data })
        }
      }
    })
    .catch(error => {
      res.render('error', {err: error})
    })
});


router.get('/perfil', function(req, res, next) {
  var token = req.cookies.token;
  if(token && user){
    (user.level == 'admin') ? admin = true : admin = false
    console.log(token)
    axios.post("http://localhost:22230/users/" + user.username + "/perfil", {tkn: token})
      .then(response => {
        res.render('profile', {profile: response.data, active: true })
      })
      .catch(e => {
        res.render('error', {error: e})
      })
  }
  else{
    res.render('loginForm', {message: 'OK'})
  }
});


// LOGIN
router.get('/login', function(req, res){
  res.render('loginForm', {message: 'OK'})
})


router.post('/login', function(req, res){
  axios.post('http://localhost:22230/users/' + req.body.username + '/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      user = response.data.user
      res.redirect('/');
    })
    .catch(e =>{
      res.render('loginForm', {message: "Credenciais inválidas. Tente outra vez!"})
    })
})


// REGISTER
router.get('/registo', function(req, res){
  res.render('registerForm', {message: 'OK'})
})


router.post('/registo', function(req, res){
  axios.post('http://localhost:22230/users/registo', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      user = response.data.user
      res.redirect('/');
    })
    .catch(e =>{
      res.render('registerForm', {message: 'Username já existente!'})
    })
})


// LOGOUT
router.get('/logout', function(req, res){
  var token = req.cookies.token;
  axios.put('http://localhost:22230/users/' + user.username + '/logout', { tkn: token })
  .then(() => {
    res.clearCookie('token');
    res.redirect('/');
  })
  .catch(e =>{
    res.render('error', {error: e})
  })
})


module.exports = router;