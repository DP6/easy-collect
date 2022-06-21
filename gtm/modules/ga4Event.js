function ga4Event(event_name, params, ecommerce, id) {
  try {
    if (internal.sentPageview === false && options.waitQueue) {
      log('Info', 'The event (' + arguments + ') has been add to the queue');
      return internal.eventQueue.push(arguments);
    }

    var _params;
    if (ecommerce) ecommerce = mapGa4Ecommerce(ecommerce, event_name);
    else _params = mapGa4Ecommerce(params, event_name);

    var result = {
      event: options.customNameGA4Event,
      event_name: event_name,
      _tag: id
    };
    if (options.gtmCleanup) {
      options.historyParams = Object.keys(params || {});
      result.eventCallback = options.gtmCleanup;
    }

    var data = _params ? _params : merge(params || {}, ecommerce || {});
    log('info', data);
    window[options.dataLayerName].push(merge(result, data));
  } catch (err) {
    log('warn', err);
  }
}

function mapGa4Ecommerce(ecommerce, event_name) {

  var mapEcommerce = {
    promotions: function(promotions) {
      var items = [];
      for (var i = 0; i < promotions.length; i++) {
        var item = {};
        promotions[i].name && (item.promotion_name = promotions[i].name);
        promotions[i].id && (item.promotion_id = promotions[i].id);
        promotions[i].creative && (item.creative_name = promotions[i].creative);
        promotions[i].position && (item.creative_slot = promotions[i].position);
        items.push(item);
      }
      return items;
    },
    impressions: function(ecommerce) {
      var ec = mapEcommerce.items(ecommerce.impressions);
      return ec;
    },
    items: function(products) {
      var items = [];
      for (var i = 0; i < products.length; i++) {
        var item = {};
        products[i].id && (item.item_id = products[i].id);
        products[i].name && (item.item_name = products[i].name);
        products[i].brand && (item.item_brand = products[i].brand);
        products[i].price && (item.price = products[i].price);
        products[i].variant && (item.item_variant = products[i].variant);
        products[i].quantity && (item.quantity = products[i].quantity);
        products[i].coupon && (item.coupon = products[i].coupon);
        products[i].list && (item.item_list_name = products[i].list);
        products[i].position && (item.index = products[i].position);

        var category = products[i].category ? products[i].category.split('/') : [];
        for (var j = 0; j < category.length; j++) {
          if (j === 0) item.item_category = category[j];
          else item['item_category' + (j + 1)] = category[j];
        }
        items.push(item);
      }
      return items;
    }
  }

  if (!ecommerce) return undefined;
  if(ecommerce.hasOwnProperty('items')) return ecommerce;

  //Default Currency
  var ec = { 'ecommerce' : { } };
  ec.ecommerce.currency = ecommerce.currencyCode ? ecommerce.currencyCode : options.currencyCode;

  //UA Enhanced Ecommerce
  if (ecommerce.hasOwnProperty('click')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.click.products);
    if (ecommerce.click.hasOwnProperty('actionField'))
      ecommerce.click.actionField.list && (ec.ecommerce.item_list_name = ecommerce.click.actionField.list)
    return ec;
  }
  if (ecommerce.hasOwnProperty('detail')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.detail.products);
    if (ecommerce.detail.hasOwnProperty('actionField'))
      ecommerce.detail.actionField.list && (ec.ecommerce.item_list_name = ecommerce.detail.actionField.list)
    return ec;
  }
  if (ecommerce.hasOwnProperty('add')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.add.products);
    if (ecommerce.add.hasOwnProperty('actionField'))
      ecommerce.add.actionField.list && (ec.ecommerce.item_list_name = ecommerce.add.actionField.list)
    return ec;
  }
  if (ecommerce.hasOwnProperty('remove')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.remove.products);
    if (ecommerce.remove.hasOwnProperty('actionField'))
      ecommerce.remove.actionField.list && (ec.ecommerce.item_list_name = ecommerce.remove.actionField.list)
    return ec;
  }
  if (ecommerce.hasOwnProperty('checkout')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.checkout.products);
    
    if (event_name == 'add_shipping_info' && ecommerce.checkout.hasOwnProperty('actionField')) {
      ecommerce.checkout.actionField.option && (ec.ecommerce.shipping_tier = ecommerce.checkout.actionField.option);
    }
    else if (event_name == 'add_payment_info' && ecommerce.checkout.hasOwnProperty('actionField')) {
      ecommerce.checkout.actionField.option && (ec.ecommerce.payment_type = ecommerce.checkout.actionField.option);
    }
    return ec;
  }
  if (ecommerce.hasOwnProperty('purchase')) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.purchase.products);
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
    ec.ecommerce.items = mapEcommerce.items(ecommerce.refund.products);
    if (ecommerce.refund.hasOwnProperty('actionField'))
      ecommerce.refund.actionField.id && (ec.ecommerce.transaction_id = ecommerce.refund.actionField.id);
    return ec;
  }
  if (ecommerce.hasOwnProperty('impressions')) {
    ec.ecommerce.items = mapEcommerce.impressions(ecommerce);
    ecommerce.list && (ec.ecommerce.item_list_name = ecommerce.list);
    return ec;
  }
  if (ecommerce.hasOwnProperty('promoView')) {
    var _promotions = ecommerce.promoView.promotions ? ecommerce.promoView.promotions : [];
    ec.ecommerce.items = mapEcommerce.promotions(_promotions)
    return ec;
  }
  if (ecommerce.hasOwnProperty('promoClick')) {
    var _promotions = ecommerce.promoClick.promotions ? ecommerce.promoClick.promotions : [];
    ec.ecommerce.items = mapEcommerce.promotions(_promotions)
    return ec;
  }

  return undefined;
}