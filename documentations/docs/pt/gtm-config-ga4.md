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

- [Read this page in English](https://github.com/DP6/easy-collect/blob/master/documentations/docs/en/gtm-config-ga4.md)
- [Leia esta página em Português](https://github.com/DP6/easy-collect/blob/master/documentations/docs/pt/gtm-config-ga4.md)

---
# Configuração do Google Tag Manager - Easy Collect + GA4

Este documento descreve os passos para a utilização da biblioteca Easy-collect em conjunto com o Google Tag Manager, e as configurações necessárias para coleta de dados via GA4.

## **Indice**

 * [1-Configuração do Easy Collect](#1-configuração-do-easy-collect)  
    * [1.1 Tag Easy Collect](#1-1-tag-easy-collect)  
    * [1.2 Tag de Configuração GA4](#1-2-tag-de-configuração-ga4)  
    * [1.3 Tag coleta Event](#1-3-tag-coleta-event)    

    <br/>

 * [2. Templates](#templates)  
   * [2.1. Template para coleta somente de *Eventos Recomendados*](#2-1-template-para-coleta-somente-de-eventos-recomendados)      
   * [2.2. Template para coleta somente de *Enhanced Ecommerce*](#2-2-template-para-coleta-somente-de-enhanced-ecommerce)    
   * [2.3. Template para coleta  de *Enhanced Ecommerce* e *Eventos Recomendados*](#2-3-template-para-coleta-de-enhanced-ecommerce-e-eventos-recomendados)     

<br/>

## 1 Configuração do Easy Collect ⚙️

A seguir um breve tutorial da configuração do Easy Collect em seu Google Tag Manager, lembrando que a configuração pode ser manual ou via template disponivel no tópico [templates](#templates).

<br/>

## 1-1 Tag Easy Collect     

  O arquivo há ser instalado está presente na pasta [build](https://github.com/DP6/easy-collect/blob/master/build/gtm/main.js), seja ele o arquivo de exemplo disponível neste repositório, ou uma versão personalizada gerada via Gulp, deverá ser copiado integralmente para uma Tag Custom HTML.
 
 - É necessario que as variáveis incorporadas *DebugMode* e *Container ID* estejam habilitadas para seu perfeito funcionamento.

 - Em configurações avançadas, a opção de executar uma única vez por página deverá ser selecionada.

<br/>

**Tag Modelo**

<img src='https://user-images.githubusercontent.com/103647128/188479825-6de619dc-413a-47c2-8054-55bdc13ac0ce.gif'   height="500" width="700" aling="center"> 



<br/>

##  1-2 Tag de Configuração GA4


  O template utilizado será o padrão de configuração do GA4 , nele deverá ser inserido o id referente ao *data streams* desejado .
  - Caso o site a ser taggueado seja SPA a opção de coleta de  *pageview* automatica, pode ser ignorada, caso o site seja MPA o uso deste fica a criterio da estratégia de coleta.
<br/>

**Tag Modelo**


<img src="https://user-images.githubusercontent.com/103647128/188482596-6cad3a91-8953-413d-b9d8-1a7b68d32607.gif" height="500" width="800">



<br/>

## 1-3 Tag coleta Event


  Deve-se utilizar o template padrão de eventos do Google Tag Manager para coleta de eventos GA4 com as seguintes configurações:

  - A tag de configuração que contém o id do data streams 
  - Uma variável de evento personalizado anexada, contendo: *{{event_name}}*
  - O acionador será um evento personalizado contendo: *{{ga4_event}}*
  - É possivel fazer o envio de parametros para coleta de *enhanced ecommerce* e *eventos personalizados* ja nesta tag de event, exemplos destas configurações estão disponiveis em [templates](#templates)
<br/>

  **Tag Modelo**

<img src="https://user-images.githubusercontent.com/103647128/188487990-35e419f8-26c6-43ce-aaf0-2d18006b5a46.gif" height="500" width="800">

<br/>

--------------------- 


##  Templates
<br/>

  A utilização do template permite automatização na coleta dos eventos GA4, para que os desenvolvedores tenham a um click todos os parâmetros recomendados pelo Google ja configurados na tag *event_name*, havendo necessidade de coleta de parâmetros adicionais em alguma tag especifica é possivel alterar apenas a tag do respectivo evento e caso seja necessario adicionar um parâmetro em todas as tags que o coletam, o mesmo pode ser adicionado na tag *event_name*, lembrando que atualmente há um **limite de 25 parâmetros** por evento  



 Como demonstrativo de instalação utilizaremos o template de eventos recomendados, porém , o processo de configuração abrange todos os demais templates.


<img src="https://user-images.githubusercontent.com/103647128/193691208-0196f8db-8bc9-4a11-aa9b-06fd757b6eed.gif" height="500" width="700">



  <br/>

### 2-1 Template para coleta somente de  *Eventos Recomendados*   
<br/>
    
Faça o dowload do template <a href="https://raw.githubusercontent.com/Milene055/easy-collect/master/docs/pt/template_recomendados.json" dowload="template_ecommerce.json" type="application/json"> Aqui.</a>   

  Acompanhe na tabela os parâmetros que serão disponibilizados para a coleta de eventos recomendados:

|Eventos|   Parâmetros  |      |     |
|---------------------|-----------|------|------|
|earn_virtual_currency| virtual_currency_name|
|join_group|group_id |
|login|method
|refund | currency|value|transaction_id
|search|	search_term|
| select_content | content_type|item_id|
|share	|method | item_id| content_type|
|sign_up	|method |
|spend_virtual_currency	|virtual_currency_name|value|item_name|
|tutorial_begin	|
|tutorial_complete|
------------------------------

<br/>

### 2-2 Template para coleta somente de *Enhanced Ecommerce*
<br/>
 Faça o dowload do template <a href="https://raw.githubusercontent.com/Milene055/easy-collect/master/docs/pt/template_ecommerce.json" dowload="template_ecommerce.json" type="application/json"> Aqui</a>      

   Acompanhe na tabela os parâmetros que serão disponibilizados para a coleta de eventos enhanced ecommerce:



|Eventos |   Parâmetros  |      |     |      | | | | | 
|---------------------|-----------|------|------|------|------|------|------|------|
|add_payment_info| | currency|value|items|
|add_shipping_info|currency| value | items|
|add_to_cart|currency|value |items|
|add_to_wishlist|currency|value |items|
|begin_checkout|currency|value |items| coupon| payment_type
|generate_lead|currency|value |
|purchase |currency|affiliation|items|transaction_id|value|coupon|shipping|tax|
|refund|currency|value |items|transaction_id|affiliation|coupon|shipping|tax|
|remove_from_cart|currency|value |items|
|select_item|items|item_list_id|item_list_name|
|select_promotion|items|creative_name|creative_slot|location_id|promotion_id|promotion_name|
|view_cart|currency|value |items|
|view_item|currency|value |items|
|view_item_list|items|item_list_id|item_list_name|
|view_promotion|items|creative_name|creative_slot|location_id|promotion_id|promotion_name|
-------------
   
     

<br/>

### 2-3 Template para coleta  de *Enhanced Ecommerce* e *Eventos Recomendados*

<br/>

Faça o dowload do template <a href="https://raw.githubusercontent.com/Milene055/easy-collect/master/docs/pt/template_ecommerce_recomendados.json" dowload="template_ecommerce.json" type="application/json"> Aqui.</a>   

 Acompanhe na tabela os parâmetros que serão disponibilizados para a coleta de eventos recomendados e enhanced ecommerce:

<div class="table" >

|Eventos  |   Parâmetros  |      |     |      | | | | | 
|---------------------|-----------|------|------|------|------|------|------|------|
|add_payment_info| | currency|value|items|
|add_shipping_info|currency| value | items|
|add_to_cart|currency|value |items|
|add_to_wishlist|currency|value |items|
|begin_checkout|currency|value |items| coupon| payment_type
|generate_lead|currency|value |
|purchase |currency|affiliation|items|transaction_id|value|coupon|shipping|tax|
|refund|currency|value |items|transaction_id|affiliation|coupon|shipping|tax|
|remove_from_cart|currency|value |items|
|select_item|items|item_list_id|item_list_name|
|select_promotion|items|creative_name|creative_slot|location_id|promotion_id|promotion_name|
|view_cart|currency|value |items|
|view_item|currency|value |items|
|view_item_list|items|item_list_id|item_list_name|
|view_promotion|items|creative_name|creative_slot|location_id|promotion_id|promotion_name|
|earn_virtual_currency| virtual_currency_name|
|join_group|group_id |
|login|method
|refund | currency|value|transaction_id
|search|	search_term|
| select_content | content_type|item_id|
|share	|method | item_id| content_type|
|sign_up	|method |
|spend_virtual_currency	|virtual_currency_name|value|item_name|
|tutorial_begin	|
|tutorial_complete|
-----------------------

