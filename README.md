# Relatório de Projeto - AcordWEB, Engenharia Web (2022/2023)


## Resumo
O presente documento visa retratar o desenvolvimento de **AcordWEB**, uma plataforma web com a capacidade de agregar, disponibilizar e fornecer capacidade de manipulação sobre os vários acórdãos publicados pelo Ministério da Justiça português.


## Introdução
O Ministério da Justiça português é um departamento do Governo de Portugal, responsável pela gestão dos vários temas e assuntos pertencentes ao Sistema Judicial. Em termos organizacionais, o Ministério da Justiça é constituído por vários tribunais, que, periodicamente, disponibilizam, individualmente, um conjunto de acórdãos. Desta forma, os mesmos tornam-se públicos e de consulta aberta a todos os que assim o desejarem. Porém, apesar de possuírem uma estrutura aproximadamente igual, as interfaces de consulta dos mesmos não o são. Com isto, reitera-se o facto de que essa mesma consulta não é linear, havendo várias plataformas distintas para o fazer. Deste modo, surgiu a necessidade de desenvolvimento de uma plataforma capaz de disponibilizar a consulta de todos os acórdãos publicados, independentemente do tribunal ao qual pertencem e sob o qual foram publicados. Assim, desenvolveu-se a plataforma web **AcordWEB**, cujos processo de desenvolvimento e características serão detalhadamente explicados no presente relatório.


## Dataset
Como referido anteriormente, o desenvolvimento da plataforma nasceu da necessidade de consulta, essencialmente, de acórdãos de caráter público. Deste modo, surgiu, inicialmente, a exigência de compreensão dos vários conjuntos de dados que contêm os processos referidos. Partindo de 14 datasets, procedeu-se, então, à análise, ao estudo e à alteração dos mesmos, de modo a ser possível partir de uma base sólida para o desenvolvimento complexo da aplicação.

### Tratamento de Dados
Inicialmente, procedeu-se à codificação de scripts, na linguagem de programação *python*, que permitiram que se conseguisse capturar todos os atributos presentes em cada dataset. Posteriormente, observou-se a presença de uma grande quantidade de "lixo" nestes mesmos atributos, uma vez que os datasets possuíam formatações próprias (em tabelas, por exemplo) e os vários elementos das mesmas se encontravam armazenados em atributos. Com isto, codificou-se um script novo com a capacidade, não só, de captura dos vários atributos, como também de limpeza dos mesmos (através de uma verificação completa da presença dos atributos ruidosos no valor de outros atributos importantes). Assim, conseguiu-se executar uma limpeza complexa dos vários conjuntos de dados.
De seguida, transformou-se todos os atributos de modo a não haver conflitos e problemas futuros com a conexão e com a comunicação com a base de dados *MongoDB* e de modo a haver maior facilidade no uso dos mesmos. Com isto, reforça-se a ideia de que todos os atributos foram transformados, onde se retirou toda a acentuação, espaços e carateres especiais dos mesmos.

### Persistência de Dados
Depois da fase de tratamento dos dados, manifestou-se a necessidade de armazenamento dos mesmos numa base de dados. Uma vez que se possuía uma familiaridade extensa com o *MongoDB*, efetuou-se este mesmo processo de carregamento para o software mencionado. Deste modo, desenvolveu-se uma base global capaz de suportar todos os atributos diferentes presentes em cada conjunto de dados. Assim, elaborou-se um modelo completo, composto por 102 atributos. Posteriormente, apareceu o problema associado aos campos '_id', de presença obrigatória em cada objeto carregado para a base de dados. Porém, após discussão, decidiu-se não se transformar nenhum atributo dos objetos a serem carregados nesse mesmo atributo '_id', deixando, portanto, o *MongoDB* resolver esse conflito naturalmente, ou seja, adicionando esse mesmo atributo aquando a introdução dos dados.

## Software
De modo a simplificar e modular a estrutura dos vários componentes de software *Express* desenvolvidos, utilizou-se o *Express Generator*, um *package* que fornece uma estrutura bem definida de trabalho, com várias opções de personalização, para criação dos mesmos: API, Auth (Autenticação) e Interface. Todos esses componentes encontram-se 100% funcionais no *localhost*, nas portas 22231, 22230 e 22232, respetivamente. Para ser possível a realização do projeto, teve que se instalar todas as independências, individualmente, em cada um dos pacotes de software, através do comando *npm i*. Para execução, as aplicações conseguem ser postas em funcionamento através do comando *npm start*.

## API
De forma a ser possível aceder aos dados carregados no *MongoDB*, codificou-se uma API. 
