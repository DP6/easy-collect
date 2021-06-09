# Easy Collect

<div align="center">
<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/centro_de_inovacao_dp6.png" height="100px" />
</div>

<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://codecov.io/gh/DP6/easy-collect">
    <img src="https://codecov.io/gh/DP6/easy-collect/branch/master/graph/badge.svg?token=GAQ88UQJQN"/>
  </a>
  <a href="#badge">
    <img alt="Test" src="https://github.com/dp6/easy-collect/actions/workflows/test.yml/badge.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/easy-collect/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/easy-collect&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/741dc3805af14444b9e6b4cb9b4269f4"/>
  </a>
</p>

## 1. Para que serve?

O _Easy Collect_ tem como objetivo facilitar a implementação, a manutenção e a padronização de *tags* no contexto de *digital analytics*.

Um exemplo dos esforços envolvidos no suporte à padronização está na implementação de funções similares às da biblioteca _jQuery_, comumente utilizada em projetos de tagueamento. Deste modo, mesmo na ausência desta, será possível garantir o padrão e qualidade da coleta dos dados (Consultar a tabela de compatibilidade). Caso a _jQuery_ exista, o _Easy Collect_ simplesmente delega a execução para ela, ou seja, o código nos dois casos será o mesmo.

Resumindo, o utilize o _Easy Collect_ para:

- Ter acesso à funções de manipulação do DOM sem depender da _jQuery_;
- Enviar automaticamente alertas e eventos para o _Google Analytics_ indicando possíveis erros de JavaScript no tagueamento;
- Funções simplificadas para coleta de dados;
- Padronização do código das tags.

### 1.1. Estendendo o Easy Collect

Um dos principais conceitos do _Easy Collect_ é a manutenção de sua API com o versionamento básico [SemVer](https://semver.org/). Para isso, recomendamos que a expansão de sua API para situações específicas, ou seja, utilizadas em projetos com particularidades que não irão se repetir, seja feita através do objeto `fn`.

#### Objeto `fn`

Se trata de uma variável global dentro do escopo do objeto _Easy Collect_, visando agrupar as funções que não pertencem ao escopo atual do projeto.

```javascript
easyCollect.fn.minhaFuncao = function(name) {
  console.log(name);
};
easyCollect.fn.minhaFuncao('DP6'); // DP6
```

### 1.2. Compatibilidade

O _Easy Collect_ depende da função nativa `querySelectorAll`. Os navegadores com suporte a essa funcionalidade são:

| Chrome | Firefox | IE  | Opera | Safari |
| ------ | ------- | --- | ----- | ------ |
| 1      | 3.5     | 8   | 10    | 3.2    |

## 2. Tag Managers

Inicialmente, na versão 1.0, a biblioteca dá suporte para o _Google Tag Manager_ com envio de dados para o _Google Analytics_, mas está planejado o suporte para demais ferramentas do mercado também.

### 2.1. Google Tag Manager

- [Documento de Referência Técnica](https://github.com/DP6/easy-collect/blob/master/README-GTM-REFERENCE.md)
- [Configuração do GTM](https://github.com/DP6/easy-collect/blob/master/README-GTM-CONFIG.md)

## 3. Como contribuir

Pull requests são bem-vindos! Nós vamos adorar ajuda para evoluir esse modulo. Sinta-se livre para navegar por _open issues_ buscando por algo que possa fazer. Caso tenha uma nova _feature_ ou _bug_, por favor abra uma nova _issue_ para ser acompanhada pelo nosso time.

### 3.1 Requisitos obrigatórios

Só serão aceito as contribuições que estiverem seguindo os seguintes requisitos:

- [Padrão de commit](https://www.conventionalcommits.org/en/v1.0.0/)

## Suporte:

**DP6 Koopa-troopa Team**

_e-mail: <koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />