//DEIXANDO MAIS USUAL
function mapGa4Ecommerce(ecommerce) {

  var mapEcommerce = {
    promotions: function(p) {
      var ec = {'ecommerce': {  } };
      var promotions = [];
      for (let i = 0; i < p.length; i++) {
        let promotion = {};
        p[i].name && (promotion.promotion_name = p[i].name);
        p[i].id && (promotion.promotion_id = p[i].id);
        p[i].creative && (promotion.creative_name = p[i].creative);
        p[i].position && (promotion.creative_slot = p[i].position);
        promotions.push(promotion);
      }
      return promotions;
    },
    impressions: function(ecommerce) {
      var ec = mapEcommerce.items(ecommerce.impressions);//aqui passa os produtos
      ecommerce.list && (ec.ecommerce.item_list_name = ecommerce.list) //recebe o nome da lista se existe
      ecommerce.currencyCode && (ec.ecommerce.currency = ecommerce.currencyCode)
      return ec;
    },
    items: function(products) {
      var items = [];
      for (let i = 0; i < products.length; i++) {
        let item = {};
        products[i].id && (item.item_id = products[i].id);
        products[i].name && (item.item_name = products[i].name);
        products[i].brand && (item.item_brand = products[i].brand);
        products[i].price && (item.price = products[i].price);
        products[i].variant && (item.item_variant = products[i].variant);
        products[i].quantity && (item.quantity = products[i].quantity);
        products[i].coupon && (item.coupon = products[i].coupon);
        products[i].list && (item.item_list_name = products[i].list);
        products[i].position && (item.index = products[i].position);

        let category = products[i].category ? products[i].category.split('/') : [];
        for (var j = 0; j < category.length; j++) {
          if (j === 0) item.item_category = category[j];
          else item['item_category' + (j + 1)] = category[j];
        }
        items.push(item);
      }
      return { 'ecommerce' : { 'items': items } };
    }
  }

  if (ecommerce.hasOwnProperty('click')) {
    var ec = mapEcommerce.items(ecommerce.click.products);
    if (ecommerce.click.hasOwnProperty('actionField'))
      ecommerce.click.actionField.list && (ec.ecommerce.item_list_name = ecommerce.click.actionField.list)
    return ec;
  }

  if (ecommerce.hasOwnProperty('detail')) {
    var ec = mapEcommerce.items(ecommerce.detail.products);
    if (ecommerce.detail.hasOwnProperty('actionField'))
      ecommerce.detail.actionField.list && (ec.ecommerce.item_list_name = ecommerce.detail.actionField.list)
    return ec;
  }

  if (ecommerce.hasOwnProperty('add')) {
    var ec = mapEcommerce.items(ecommerce.add.products);
    ecommerce.currencyCode && (ec.ecommerce.currency = ecommerce.currencyCode);
    if (ecommerce.add.hasOwnProperty('actionField'))
      ecommerce.add.actionField.list && (ec.ecommerce.item_list_name = ecommerce.add.actionField.list)
    return ec;
  }

  if (ecommerce.hasOwnProperty('remove')) {
    var ec = mapEcommerce.items(ecommerce.remove.products);
    ecommerce.currencyCode && (ec.ecommerce.currency = ecommerce.currencyCode);
    if (ecommerce.remove.hasOwnProperty('actionField'))
      ecommerce.remove.actionField.list && (ec.ecommerce.item_list_name = ecommerce.remove.actionField.list)
    return ec;
  }

  if (ecommerce.hasOwnProperty('checkout')) {
    return mapEcommerce.items(ecommerce.checkout.products);
  }

  if (ecommerce.hasOwnProperty('purchase')) {
    var ec = mapEcommerce.items(ecommerce.purchase.products);
    if (ecommerce.purchase.hasOwnProperty('actionField')) {
      ecommerce.purchase.actionField.id && (ec.ecommerce.transaction_id = ecommerce.purchase.actionField.id);
      ecommerce.purchase.actionField.affiliation && (ec.ecommerce.affiliation = ecommerce.purchase.actionField.affiliation);
      ecommerce.purchase.actionField.revenue && (ec.ecommerce.value = ecommerce.purchase.actionField.revenue);
      ecommerce.purchase.actionField.tax && (ec.ecommerce.tax = ecommerce.purchase.actionField.tax);
      ecommerce.purchase.actionField.shipping && (ec.ecommerce.shipping = ecommerce.purchase.actionField.shipping);
      ecommerce.purchase.actionField.coupon && (ec.ecommerce.coupon = ecommerce.purchase.actionField.coupon);
    }
    return ec;
  }

  if (ecommerce.hasOwnProperty('refund')) {
    var ec = mapEcommerce.items(ecommerce.refund.products);
    if (ecommerce.refund.hasOwnProperty('actionField'))
      ecommerce.refund.actionField.id && (ec.ecommerce.transaction_id = ecommerce.refund.actionField.id);
    return ec;
  }

  if (ecommerce.hasOwnProperty('impressions')) {
    return mapEcommerce.impressions(ecommerce);//aqui precisa passar o ecommerce inteiro
  }

  if (ecommerce.hasOwnProperty('promoView')) { //usar objeto ecommerce -> verificar se com modificacao no mapEcommerce.items resolve
    var _promotions = ecommerce.promoView.promotions ? ecommerce.promoView.promotions : [];
    return mapEcommerce.promotions(_promotions);
  }

  if (ecommerce.hasOwnProperty('promoClick')) { //usar objeto ecommerce -> verificar se com modificacao no mapEcommerce.items resolve
    var _promotions = ecommerce.promoClick.promotions ? ecommerce.promoClick.promotions : [];
    return mapEcommerce.promotions(_promotions);
  }
  console.log('nada')
  return undefined;
}
