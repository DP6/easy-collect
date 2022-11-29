internal.ga4Queue = [];

function ga4Event(event_name, params, ecommerce, id) {
  try {
    if (internal.sentPageview === false && options.waitQueue) {
      log('Info', 'The event (' + arguments + ') has been add to the queue');
      return internal.ga4Queue.push(arguments);
    }

    var _params;
    if (ecommerce) {
      ecommerce = mapGa4Ecommerce(ecommerce, event_name);
    } else {
      _params = mapGa4Ecommerce(params, event_name);
    }

    var result = {
      event: options.customNameGA4Event,
      event_name: event_name,
      _tag: id
    };
    if (options.gtmCleanup) {
      options.historyParams = Object.keys(params || {});
      result.eventCallback = options.gtmCleanup;
    }

    var data = _params || merge(params || {}, ecommerce || {});
    log('info', data);
    window[options.dataLayerName].push(merge(result, data));
  } catch (err) {
    log('warn', err);
  }
}

function mapGa4Ecommerce(ecommerce, event_name) {
  if (!ecommerce) return undefined;
  if (ecommerce.items) return ecommerce;

  var mapEcommerce = {
    promotions: function (promotions) {
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
    impressions: function (ecommerce) {
      return mapEcommerce.items(ecommerce.impressions);
    },
    items: function (products) {
      var items = [];
      for (var i = 0; i < products.length; i++) {
        var item = {};
        if (products[i].id) item.item_id = products[i].id;
        if (products[i].name) item.item_name = products[i].name;
        if (products[i].brand) item.item_brand = products[i].brand;
        if (products[i].price) item.price = products[i].price;
        if (products[i].variant) item.item_variant = products[i].variant;
        if (products[i].quantity) item.quantity = products[i].quantity;
        if (products[i].coupon) item.coupon = products[i].coupon;
        if (products[i].list) item.item_list_name = products[i].list;
        if (products[i].position) item.index = products[i].position;

        var category = products[i].category ? products[i].category.split('/') : [];
        item.item_category = category[0];

        for (var j = 1; j < category.length; j++) {
          item['item_category' + (j + 1)] = category[j];
        }
        items.push(item);
      }
      return items;
    }
  };

  //Default Currency
  var ec = { ecommerce: {} };
  ec.ecommerce.currency = ecommerce.currencyCode || options.currencyCode;

  //UA Enhanced Ecommerce
  if (ecommerce.click) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.click.products);
    if (ecommerce.click.actionField && ecommerce.click.actionField.list)
      ec.ecommerce.item_list_name = ecommerce.click.actionField.list;
    return ec;
  }

  if (ecommerce.detail) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.detail.products);
    if (ecommerce.detail.actionField && ecommerce.detail.actionField.list)
      ec.ecommerce.item_list_name = ecommerce.detail.actionField.list;
    return ec;
  }

  if (ecommerce.add) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.add.products);
    if (ecommerce.add.actionField && ecommerce.add.actionField.list)
      ec.ecommerce.item_list_name = ecommerce.add.actionField.list;
    return ec;
  }

  if (ecommerce.remove) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.remove.products);

    if (ecommerce.remove.actionField && ecommerce.remove.actionField.list)
      ec.ecommerce.item_list_name = ecommerce.remove.actionField.list;
    return ec;
  }

  if (ecommerce.checkout) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.checkout.products);

    if (ecommerce.checkout.actionField && ecommerce.checkout.actionField.option) {
      if (event_name == 'add_shipping_info') {
        ec.ecommerce.shipping_tier = ecommerce.checkout.actionField.option;
      } else if (event_name == 'add_payment_info') {
        ec.ecommerce.payment_type = ecommerce.checkout.actionField.option;
      }
    }
    return ec;
  }

  if (ecommerce.purchase) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.purchase.products);
    if (ecommerce.purchase.actionField) {
      if (ecommerce.purchase.actionField.id) ec.ecommerce.transaction_id = ecommerce.purchase.actionField.id;
      if (ecommerce.purchase.actionField.affiliation)
        ec.ecommerce.affiliation = ecommerce.purchase.actionField.affiliation;
      if (ecommerce.purchase.actionField.revenue) ec.ecommerce.value = ecommerce.purchase.actionField.revenue;
      if (ecommerce.purchase.actionField.tax) ec.ecommerce.tax = ecommerce.purchase.actionField.tax;
      if (ecommerce.purchase.actionField.shipping) ec.ecommerce.shipping = ecommerce.purchase.actionField.shipping;
      if (ecommerce.purchase.actionField.coupon) ec.ecommerce.coupon = ecommerce.purchase.actionField.coupon;
    }
    return ec;
  }

  if (ecommerce.refund) {
    ec.ecommerce.items = mapEcommerce.items(ecommerce.refund.products);
    if (ecommerce.refund.actionField && ecommerce.refund.actionField.id)
      ec.ecommerce.transaction_id = ecommerce.refund.actionField.id;
    return ec;
  }

  if (ecommerce.impressions) {
    ec.ecommerce.items = mapEcommerce.impressions(ecommerce);
    if (ecommerce.list) ec.ecommerce.item_list_name = ecommerce.list;
    return ec;
  }

  if (ecommerce.promoView) {
    ec.ecommerce.items = mapEcommerce.promotions(ecommerce.promoView.promotions || []);
    return ec;
  }

  if (ecommerce.promoClick) {
    ec.ecommerce.items = mapEcommerce.promotions(ecommerce.promoClick.promotions || []);
    return ec;
  }

  return undefined;
}
