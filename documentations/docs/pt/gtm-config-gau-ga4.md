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

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-gau-ga4.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau-ga4.md)

---

# Guia de Implementação - Easy Collect + GTM + GAU -> GA4 (Migração de Enhanced Ecommerce)

Com a utilização desse guia, será possível enviar os dados de Enhanced Ecommerce para o ***GA4*** sem a necessidade de criar os eventos do `dataLayer` no formato esperado para a ferramenta, sendo possível utilizar o padrão adotado no ***GAU***.

### Observação:
Antes de seguir o guia, certifique-se que o Easy Collect e as configurações necessárias para coleta de dados via GA4 estão implementadas no GTM:

- [Guia de Implementação - Easy Collect + GA4](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-ga4.md)


Além disso, verifique se o parâmetro `options.waitQueue` está setado de acordo com a configuração utilizada:

- Parâmetro deve receber *'true'* se a coleta do *Universal Analytics* foi implementada usando o guia *[Guia de Implementação - Easy Collect + GAU](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-gau.md)* e utiliza o método de *hitCallback*;

- Parâmetro deve receber *'false'* caso contrário;

```
...
var options = {
  collectName: 'easyCollect',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || false),
  waitQueue: true, //put 'false' if only GA4 is implemented or hitCallback is not used in GAU
...
```

## 2. Implementação de Tags para coleta de eventos para o GA4

<u>Observações:</u>

- Nos exemplos abaixo o objeto `ecommerce` foi implementado no website seguindo o formato da camada de dados esperada para o Google Analytics Universal;
- Os acionadores representados são apenas ilustrativos. Para utilização num website real, será necessário modificar os acionadores de acordo com a arquitetura de camada de dados desenhada;

### 2.1. Impressão e Clique em Promoções

#### **Impressão das promoções:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém a lista de promoções}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Promotion Views', function(collect) {
  collect.ga4Event('view_promotion', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Promotions Views Input](/documentations/images/ecommerce/promoViews.png)

<u>Dados transformados para formato GA4:</u>

![Promotions Views Output](/documentations/images/ecommerce/promoViews_out.png)

#### **Clique na promoção:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém a promoção clicada}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Promotion Click', function(collect) {
  collect.ga4Event('select_promotion', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Promotion Click Input](/documentations/images/ecommerce/promoClick.png)

<u>Dados transformados para formato GA4:</u>

![Promotion Click Output](/documentations/images/ecommerce/promoClick_out.png)

### 2.2. Impressão e Clique em Produtos

#### **Impressão da lista de produtos:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém a lista de produtos}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Impressions', function(collect) {
  collect.ga4Event('view_item_list', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Impressions Input](/documentations/images/ecommerce/productViews.png)

<u>Dados transformados para formato GA4:</u>

![Impressions Output](/documentations/images/ecommerce/productViews_out.png)

#### **Clique no produto:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém o produto clicado}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Product Click', function(collect) {
  collect.ga4Event('select_item', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Product Click Input](/documentations/images/ecommerce/productClick.png)

<u>Dados transformados para formato GA4:</u>

![Product Click Output](/documentations/images/ecommerce/productClick_out.png)

### 2.3. Visualização de Detalhes do Produto

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém o detalhe de produto}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Product Details', function(collect) {
  collect.ga4Event('view_item', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Product Details Input](/documentations/images/ecommerce/productDetails.png)

<u>Dados transformados para formato GA4:</u>

![Product Details Output](/documentations/images/ecommerce/productDetails_out.png)

### 2.4. Adição ou Remoção do Carrinho

#### **Adição do produto ao carrinho:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém o produto adionado ao carrinho}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Add to Cart', function(collect) {
  collect.ga4Event('add_to_cart', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Add to Cart Input](/documentations/images/ecommerce/addToCart.png)

<u>Dados transformados para formato GA4:</u>

![Add to Cart Output](/documentations/images/ecommerce/addToCart_out.png)

#### **Remoção do produto do carrinho:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém o produto removido do carrinho}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Remove From Cart', function(collect) {
  collect.ga4Event('remove_from_cart', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Remove From Cart Input](/documentations/images/ecommerce/removeFromCart.png)

<u>Dados transformados para formato GA4:</u>

![Remove From Cart Output](/documentations/images/ecommerce/removeFromCart_out.png)

### 2.5. Mensuração de Checkout

#### **Início do Checkout:**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém os dados de checkout}}`

![Checkout](/documentations/images/ecommerce/checkout_tag.png)

***Atenção!** Enviar esse evento apenas na primeira etapa do checkout, sendo portanto, a etapa 1 do checkout.*

<u>Código da Tag:</u>

```
<script>
easyCollect.safeFn('GAU -> GA4 - Checkout', function(collect) {
  collect.ga4Event('begin_checkout', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Checkout Input](/documentations/images/ecommerce/checkout.png)

<u>Dados transformados para formato GA4:</u>

![Checkout Output](/documentations/images/ecommerce/checkout_out.png)

#### **Checkout (Opção de Entrega):**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém os dados checkout na etapa de entrega}}`

![Shipping](/documentations/images/ecommerce/checkout_shipping_tag.png)

***Atenção!** Enviar esse evento apenas na etapa do checkout que contém a opção de entrega. Neste exemplo, a entrega ocorre na etapa 2 do checkout.*

<u>Código da Tag:</u>

```
<script>
easyCollect.safeFn('GAU -> GA4 - Shipping', function(collect) {
  collect.ga4Event('add_shipping_info', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Shipping Input](/documentations/images/ecommerce/checkout_shipping.png)

<u>Dados transformados para formato GA4:</u>

![Shipping Output](/documentations/images/ecommerce/checkout_shipping_out.png)

#### **Checkout (Opção de Pagamento):**

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém os dados checkout na etapa de pagamento}}`

![Payment](/documentations/images/ecommerce/checkout_payment_tag.png)

***Atenção!** Enviar esse evento apenas na etapa do checkout que contém a opção de pagamento. Neste exemplo, o pagamento ocorre na etapa 3 do checkout.*

<u>Código da Tag:</u>

```
<script>
easyCollect.safeFn('GAU -> GA4 - Payment', function(collect) {
  collect.ga4Event('add_payment_info', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Payment Input](/documentations/images/ecommerce/checkout_payment.png)

<u>Dados transformados para formato GA4:</u>

![Payment Output](/documentations/images/ecommerce/checkout_payment_out.png)

### 2.6. Finalização da compra

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém os dados da compra}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Purchase', function(collect) {
  collect.ga4Event('purchase', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Purchase Input](/documentations/images/ecommerce/purchase.png)

<u>Dados transformados para formato GA4:</u>

![Purchase Output](/documentations/images/ecommerce/purchase_out.png)

### 2.7. Reembolso

- Tipo de Tag: Custom HTML
- Acionador: `{{evento dataLayer que contém os dados de reembolso}}`

<u>Código da Tag:</u>
```
<script>
easyCollect.safeFn('GAU -> GA4 - Refund', function(collect) {
  collect.ga4Event('refund', {{ecommerce}});
});
</script>
```

<u>Formato GAU recebido no dataLayer:</u>

![Refund Input](/documentations/images/ecommerce/refund.png)

<u>Dados transformados para formato GA4:</u>

![Refund Output](/documentations/images/ecommerce/refund_out.png)

### 2.8. Considerações

#### **Coleta de Custom Event Parameters + Ecommerce**

Caso o evento para o GA4 precise conter ***Custom Event Parameters*** (ou seja, parâmetros além dos nativos de *Enhanced Ecommerce*), é possível realizar o envio desses parâmetros atráves de um objeto que antecede o objeto de `ecommerce`:

<u>Exemplo:</u>

```
<script>
easyCollect.safeFn('GAU -> GA4 - Impressions', function(collect) {
  collect.ga4Event('view_item_list', {'custom_parameter1': 'value 1', 'custom_parameter2': 'value2'}, {{ecommerce}});
});
</script>
```

#### **Tratamento de Dados ausentes**

Caso o objeto `ecommerce` presente no `dataLayer` esteja com algumas chaves ausentes para o evento desejado, a transformação dos dados ocorrerá sem nenhum impeditivo. Vale ressaltar que as mesma chaves ausentes no `dataLayer` estarão ausentes no objeto `ecommerce` do ***GA4***. Abaixo um exemplo para o evento de ***finalização de compra*** com algumas chaves ausentes:

![Refund Output](/documentations/images/ecommerce/missing_data.png)

Chaves ausentes:
- `ecommerce.purchase.actionField.affiliation`;
- `ecommerce.purchase.actionField.coupon`;
- `ecommerce.purchase.products[0].brand`;


<u>Dados transformados para formato GA4:</u>

![Refund Output](/documentations/images/ecommerce/missing_data_ga4.png)

Chaves ausentes:
- `ecommerce.affiliation`;
- `ecommerce.coupon`;
- `ecommerce.items[0].item_brand`;

#### **Código da moeda padrão**

No ***Google Analytics 4*** é estritamente necessário definir o código de moeda utilizado no evento. Caso isso não seja feito, os valores monetários não são coletados na ferramenta.

Para garantir que todos os *eventos de Ecommerce* possuam o código de moeda, defina um **código de moeda padrão**.

1) Acesse tag principal que contém o código copiado do arquivo `main.js`;
2) Em seguinda, procure a variável `options` no corpo do código:

```
...
var options = {
  collectName: 'easyCollect',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || false),
  waitQueue: true,  //put 'false' if only GA4 is implemented or hitCallback is not used in GAU
  historyParams: [],
  containerId: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  customNameGA4Event: 'ga4_event',
  currencyCode: 'BRL', // change the currency code here
...
```

3) Em `options.currencyCode` adicione o código de moeda padrão a ser utilizado;

**Observação:** caso o objeto *ecommerce* recebido no `dataLayer` contém um código de moeda, este será considerado para preenchimento no *objeto transformado do GA4*.