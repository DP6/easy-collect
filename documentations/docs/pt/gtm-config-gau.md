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

### Idiomas disponíveis

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-gau.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md)

---

# Configuração do Google Tag Manager - Easy Collect + Google Analytics Universal

Este documento descreve os passos para a utilização da biblioteca `easy-collect` em conjunto com o Google Tag Manager, e as configurações necessárias para coleta de dados via GAU.

## 1. Tag principal

O arquivo final, presente na pasta _build_, seja ele o arquivo de exemplo disponível neste repositório, ou uma versão personalizada gerada via Gulp, deverá ser copiado integralmente para uma Tag Custom HTML.

Em configurações avançadas, a opção de executar uma única vez por página deverá ser selecionada.

![Configuração uma por página](/documentations/images/once_per_page.png)

As tags que utilizarem o objeto easyCollect devem configurar esta tag principal como requisito na seção _sequência de tags_, para garantir que o objeto estará definido antes do uso.

## 2. Acionadores

Quatro acionadores do tipo _evento personalizado_ devem ser criados.

Os nomes dos eventos serão os mesmos nomes utilizados para identificá-los na camada de dados: _gtm_dataQuality_event_, _ga_pageview_, _ga_event_ e _ga_timing_.

![Triggers](/documentations/images/event_name.png)

## 3. Tags de template

Quatro tags de Universal Analytics devem ser criadas, uma para cada acionador criado acima.

Estas tags devem ser preenchidas com as variáveis de camada de dados listadas na próxima seção. Estes são os campos padrões, as tags podem ser modificadas para incluir ou remover dimensões personalizadas, dados de ecommerce e outras configurações.

### Template de Pageview (+ GA Settings)

![Tag de template de Pageview](/documentations/images/tag_pageview.png)

### Template de Evento (+ GA Settings)

![Tag de template de Evento](/documentations/images/tag_event.png)

### Template de Timing (+ GA Settings)

![Tag de template de Timing](/documentations/images/tag_timing.png)

### Template de Data Quality

![Tag de template de DataQuality](/documentations/images/tag_dataquality.png)

### Template de GA Settings

![Tag de template de GA Settings](/documentations/images/var_gasettings.png)

## 4. Variáveis

As variáveis padrão _Container ID_ e _Debug Mode_ devem ser habilitadas, pois elas são utilizadas pelo código da _tag principal_.

A tabela a seguir descreve todas as variáveis do tipo _variável de camada de dados_ que deverão ser criadas para o uso nas tags de template do Google Analytics:

| Nome da variável de Camada de Dados | Tag que utiliza     | Campo do template             |
| ----------------------------------- | ------------------- | ----------------------------- |
| eventCategory                       | Tag de Evento       | Categoria                     |
| eventAction                         | Tag de Evento       | Ação                          |
| eventLabel                          | Tag de Evento       | Rótulo                        |
| eventValue                          | Tag de Evento       | Valor                         |
| eventNoInteraction                  | Tag de Evento       | Hit de não-interação          |
| timingCategory                      | Tag de Evento       | Categoria                     |
| timingVariable                      | Tag de Evento       | Variável                      |
| timingValue                         | Tag de Evento       | Valor                         |
| timingLabel                         | Tag de Evento       | Rótulo                        |
| path                                | GA Settings         | Fields to Set -> page         |
| userId                              | GA Settings         | Fields to Set -> userId       |
| dataQuality.category                | Tag de Data Quality | Categoria                     |
| dataQuality.action                  | Tag de Data Quality | Ação                          |
| dataQuality.label                   | Tag de Data Quality | Rótulo                        |
| dataQuality.selector                | Tag de Data Quality | Dimensões Personalizadas -> 1 |
| dataQuality.event                   | Tag de Data Quality | Dimensões Personalizadas -> 2 |

Caso utilize a opção waitQueue (habilitada por padrão), a seguinte variável de _javascript personalizado_ deverá ser criada e adicionada ao campo _hitCallback_ em _Fields to Set_ nas tags de template de Google Analytics.

```javascript
function () {
  return function () {
    easyCollect.internal.sentPageview = true;
    while (easyCollect.internal.eventQueue.length) {
      easyCollect.event.apply(easyCollect, easyCollect.internal.eventQueue.shift());
    }
    while (easyCollect.internal.timingQueue.length) {
      easyCollect.timing.apply(easyCollect, easyCollect.internal.timingQueue.shift());
    }
  };
}
```

![Tag de template de GA Settings](/documentations/images/hit_callback.png)