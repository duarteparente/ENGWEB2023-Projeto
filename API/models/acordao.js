const mongoose = require('mongoose')


var tSchema = new mongoose.Schema({
    Processo: String,
    url: String,
    tribunal: String,
    Descritores: [String],
    Relator: String,
    Privacidade: String,
    Votacao: String,
    NConvencional: String,
    Data: String,
    DataAcordao: String,
    Acordao: String,
    NDocumento: String,
    Especie: String,
    Requerente: String,
    Requerido: String,
    NormasApreciadas: String,
    NormasJulgadasInconst: String,
    AreaTematica1: String,
    AreaTematica2: String,
    Decisao: String,
    Sumario: String,
    TextoIntegral: String,
    VolumeAcordaosTC: String,
    Constituicao: String,
    LegislacaoNacional: String,
    NDiarioRepublica: String,
    SerieDiarioRepublica: String,
    DataDiarioRepublica: String,
    PaginaDiarioRepublica: String,
    NBoletimMJ: String,
    PaginaBoletimMJ: String,
    JurisprudenciaConstitucional: String,
    NormasSuscitadas: String,
    DeclaracaoVoto: String,
    VotoVencido: String,
    IndicacoesEventuais: String,
    NormasDeclaradasInconst: String,
    PaginaVolume: String,
    OutrasPublicacoes: String,
    LegislacaoComunitaria: String,
    ReferenciaPareceres: String,
    ReferenciasInternacionais: String,
    OutraJurisprudencia: String,
    JurisprudenciaInternacional: String,
    JurisprudenciaEstrangeira: String,
    LegislacaoEstrangeira: String,
    Tribunal: String,
    Recorrente: String,
    Recorrido1: String,
    Recorrido2: String,
    DataEntrada: String,
    MeioProcessual: String,
    Objecto: String,
    ReferenciaDoutrina: String,
    JurisprudenciaNacional: String,
    NVolume: String,
    RecusaAplicacao: String,
    AnoPublicacao: String,
    Apendice: String,
    DataApendice: String,
    PPagPublicacaoAcordao: String,
    ReferenciaPublicacao1: String,
    Tribunal1instancia: String,
    JuizoSeccao: String,
    TipoAcao: String,
    TipoContrato: String,
    Autor: String,
    Reu: String,
    DataDecisao: String,
    TextoClausulasAbusivas: String,
    Recursos: String,
    Pagina: String,
    ReferenciaPublicacao2: String,
    DecisaoTextoIntegral: String,
    Apenso: String,
    ReferenciaPublicacao: String,
    DataDecisaoSumaria: String,
    NUnicoProcesso: String,
    TribunalRecurso: String,
    Doutrina: String,
    AreaTematica: String,
    DataDecisaoSingular: String,
    DataReclamacao: String,
    ReferenciaProcesso: String,
    ProcessoTribunalRecurso: String,
    Recurso: String,
    Seccao: String,
    Contencioso: String,
    NProcessoTAF: String,
    SubSeccao: String,
    Magistrado: String,
    Observacoes: String,
    DisponivelJTCA: String,
    PecaProcessual: String,
    Tema: String,
    ParecerMinisterioPublico: String,
    TribunalRecorrido: String,
    ProcessoTribunalRecorrido: String,
    TextoParcial: String,
    Estrangeiro1: String,
    Reclamacoes: String,
    DataDecRecorrida: String,
    Added: String,
    AdicionadoPor: String,
    Edited: String,
    EditadoPor: String
},
{
versionKey: false
});

module.exports = mongoose.model('acordao', tSchema)