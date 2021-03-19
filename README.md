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
</p>

# Easy Collect

O Easy Collect tem como objetivo facilitar a implementação, a manutenção e a padronização de *tags* no contexto de *digital analytics*.

Um exemplo dos esforços envolvidos no suporte à padronização está na implementação de funções similares às da biblioteca jQuery, comumente utilizada em projetos de tagueamento. Deste modo, mesmo na ausência desta, será possível garantir o padrão e qualidade da coleta dos dados (Consultar a tabela de compatibilidade). Caso a jQuery exista, o Easy Collect simplesmente delega a execução para ela, ou seja, o código nos dois casos será o mesmo.

Resumindo, o utilize o Easy Collect para:

- Ter acesso à funções de manipulação do DOM sem depender da jQuery;
- Enviar automaticamente alertas e eventos para o Google Analytics indicando possíveis erros de JavaScript no tagueamento;
- Funções simplificadas para coleta de dados;
- Padronização do código das tags.

### Estendendo o Easy Collect

Um dos principais conceitos do Easy Collect é a manutenção de sua API com o versionamento básico [SemVer](https://semver.org/). Para isso, recomendamos que a expansão de sua API para situações específicas, ou seja, utilizadas em projetos com particularidades que não irão se repetir, seja feita através do objeto `fn`.

#### Objeto `fn`

Se trata de uma variável global dentro do escopo do objeto Easy Collect, visando agrupar as funções que não pertencem ao escopo atual do projeto.

```javascript
easyCollect.fn.minhaFuncao = function(name) {
  console.log(name);
};
easyCollect.fn.minhaFuncao('DP6'); // DP6
```

### Compatibilidade

O Easy Collect depende da função nativa `querySelectorAll`. Os navegadores com suporte a essa funcionalidade são:

| Chrome | Firefox | IE  | Opera | Safari |
| ------ | ------- | --- | ----- | ------ |
| 1      | 3.5     | 8   | 10    | 3.2    |

## Tag Managers

Inicialmente, na versão 1.0, a biblioteca dá suporte para o Google Tag Manager com envio de dados para o Google Analytics, mas está planejado o suporte para demais ferramentas do mercado também.

### Google Tag Manager

- [Documento de Referência Técnica](https://github.com/DP6/easy-collect/blob/master/README-GTM-REFERENCE.md)
- [Configuração do GTM](https://github.com/DP6/easy-collect/blob/master/README-GTM-CONFIG.md)
