;
(function () {
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var jQuery = window.jQuery;
  var fn = {};
  
  var options = {
    collectName: 'easyCollect',
    dataLayerName: 'dataLayer',
    debug: ({{Debug Mode}} || false),
    waitQueue: true, //arquitetura somente ga4, deve receber undefined
    historyParams: [],
    containerId: ({{Container ID}} || ''),
    exceptionEvent: 'gtm_dataQuality_event',
    exceptionCategory: 'GTM Exception',
    customNamePageview: 'ga_pageview',
    customNameEvent: 'ga_event',
    customNameGA4Event: 'ga4_event',
    dataLayerEcommerce: 'ga3' //colocar ga3 ou ga4 (é o formato do datalayer sendo passado)
    customNameTiming: 'ga_timing',
    errorSampleRate: 1,
    gtmCleanup: function (gtmId) {
      collect.setDataLayer('ecommerce', undefined);
      collect.setDataLayer('eventNoInteraction', undefined);

      for (var i = 0; i < historyParams.length; i++) { //For GA4
        collect.setDataLayer(historyParams[i], undefined);
      }
    }
  };
  
  var internal = {
      sentPageview: false
  };
  
  var collect = {
    internal: internal,
    init: init,
    pageview: pageview,
    event: event,
    ga4Event: ga4Event,
    timing: timing,
    sanitize: sanitize,
    getDataLayer: getDataLayer,
    setDataLayer: setDataLayer,
    cookie: cookie,
    getKey: getKey,
    safeFn: safeFn,
    fn: fn,
    options: options
  };
  
  function closest(elm, seletor) {
    if ('closest' in elm) return elm.closest(seletor);
    if (typeof jQuery === 'function') return jQuery(elm).closest(seletor)[0];
  
    var parent = elm.parentNode;
  
    while (parent != document) {
      if (matches(parent, seletor)) {
        return parent;
      }
      parent = parent.parentNode;
    }
    return undefined;
  }
  
  function getCookie(key) {
    key = '; ' + key + '=';
    var cookie = '; ' + document.cookie;
    var index = cookie.indexOf(key);
    var end;
    if (index === -1) {
      return '';
    }
    cookie = cookie.substring(index + key.length);
    end = cookie.indexOf(';');
    return window.unescape(end === -1 ? cookie : cookie.substring(0, end));
  }
  
  function setCookie(name, value, opts) {

    var cookie = name + '=' + window.escape(value);
  
    if (opts.exdays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + opts.exdays);
      cookie += '; expires=' + exdate.toUTCString();
      delete opts.exdays;
    }
  
    if (!opts.samesite) {
      cookie += '; samesite=none; secure';
    }
  
    for (var optKey in opts) {
      cookie += "; " + optKey;
      var optValue = opts[optKey];
      if (optValue !== true) {
        cookie += "=" + optValue;
      }
    }
  
    return (document.cookie = cookie);
  }
  
  function cookie(name, value, opts) {
    if (typeof value === 'undefined')
      return getCookie(name);
  
    return setCookie(name, value, opts);
  }
  
  function delegate(id, event, selector, oldHandler, parent) {
    var method, elm, handler;
    if (typeof jQuery === 'function') {
      elm = jQuery(parent || document);
      handler = safeFn(id, oldHandler, {
        event: event,
        selector: selector,
        immediate: false
      });
      if (typeof elm.on === 'function') {
        return elm.on(event, selector, handler);
      } else if (typeof elm.delegate === 'function') {
        return elm.delegate(selector, event, handler);
      }
    }
  
    if (typeof parent === 'string') {
      parent = document.querySelectorAll(parent);
    }
  
    if (typeof document.addEventListener === 'function') {
      method = 'addEventListener';
    } else {
      method = 'attachEvent';
      event = 'on' + event;
    }
  
    handler = function(e) {
      for (
        var target = e.target; target && target !== this; target = target.parentNode
      ) {
        if (matches(target, selector)) {
          var handler = safeFn(id, oldHandler, {
            event: event,
            selector: selector,
            immediate: false
          });
          handler.call(target, e);
          break;
        }
      }
    };
  
    if (Object.prototype.toString.call(parent) === '[object NodeList]') {
      for (var parentIndex = 0; parentIndex <= parent.length - 1; parentIndex++) {
        (parent[parentIndex] || document)[method](event, handler, false);
      }
    } else {
      (parent || document)[method](event, handler, false);
    }
  }
  
  function find(element, selector) {
    return element.querySelectorAll(selector);
  }
  
  function flatten(arrs) {
    var currentArray, currentElement, i, j;
    var result = [];
  
    if (arrs.length === 1) return arrs[0];
  
    while (arrs.length > 0) {
      currentArray = arrs.shift();
      for (i = 0; currentArray.length > i; i++) {
        currentElement = currentArray[i];
        j = 0;
        while (j < result.length && currentElement !== result[j]) {
          j += 1;
        }
        if (j === result.length) result.push(currentElement);
      }
    }
  
    return result;
  }
  
  function getKey(key, opt_root) {
    if (!key || typeof key !== 'string') return undefined;
  
    var result = opt_root || window;
    var splitKey = key.split('.');
  
    for (var i = 0; i < splitKey.length && result != null; i++) {
      if (has(result, splitKey[i])) {
        result = result[splitKey[i]];
      } else {
        return undefined;
      }
    }
    return result;
  }
  
  function has(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  
  function hasClass(e, className) {
    if ('classList' in e) return e.classList.contains(className);
  
    return new RegExp('\\b' + className + '\\b').test(e.className);
  }
  
  function init(opt_options) {
    options = merge(options, opt_options);
    expose();
  }
  
  function internalMap(elms, func, exArgs) {
    var elm, args;
    var ret = [];
    for (var index = 0; index < elms.length; index++) {
      elm = elms[index];
      if (elm instanceof HTMLElement === false)
        throw 'internalMap: Esperado elemento HTML';
      args = [elm].concat(exArgs);
      ret.push(func.apply(null, args));
    }
    return ret;
  }
  
  function log(type, info, obj) {
    if (options.debug && typeof getKey('console.' + type) === 'function') {
      console[type](info, obj);
    }
  }
  
  function matches(elm, seletor) {
    if ('matches' in elm) return elm.matches(seletor);
    if (typeof jQuery === 'function') return jQuery(elm).is(seletor);
  
    var elms = elm.parentNode.querySelectorAll(seletor);
  
    for (var i = 0; i < elms.length; i++) {
      if (elms[i] === elm) {
        return true;
      }
    }
    return false;
  }
  
  function merge(obj, obj2) {
    if (obj2) {
      for (var key in obj2) {
        if (has(obj2, key)) {
          obj[key] = obj2[key];
        }
      }
    }
    return obj;
  }
  
  function on(id, event, selector, oldCallback, parent) {
    var i, array, elm, callback;
  
    if (parent) return delegate(id, event, selector, oldCallback, parent);
  
    callback = safeFn(id, oldCallback, {
      event: event,
      selector: selector,
      immediate: false
    });
  
    if (typeof jQuery === 'function') {
      elm = jQuery(selector);
  
      if (typeof elm.on === 'function') {
        return elm.on(event, callback);
      } else if (typeof elm.bind === 'function') {
        return elm.bind(event, callback);
      }
    }
  
    if (typeof selector === 'string') {
      array = document.querySelectorAll(selector);
    } else if (typeof selector.length === 'undefined' || selector === window) {
      array = [selector];
    } else {
      array = selector;
    }
  
    for (i = 0; i < array.length; i++) {
      elm = array[i];
  
      if (typeof elm.addEventListener === 'function') {
        elm.addEventListener(event, callback);
      } else {
        elm.attachEvent('on' + event, callback);
      }
    }
  }
  
  function reduceBool(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i]) return true;
    }
    return false;
  }
  
  function sanitize(str, opts) {
    var split, i, spacer;
  
    if (!str) return '';
    opts = opts || {};
    spacer = typeof opts.spacer === 'string' ? opts.spacer : '_';
    str = str
      .toLowerCase()
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
      .replace(/\s+/g, '_')
      .replace(/[áàâãåäæª]/g, 'a')
      .replace(/[éèêëЄ€]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõöøº]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç¢©]/g, 'c')
      .replace(/[^a-z0-9_\-]/g, '_');
  
    if (opts.capitalized) {
      split = str.replace(/^_+|_+$/g, '').split(/_+/g);
      for (i = 0; i < split.length; i++) {
        if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
      }
      return split.join(spacer);
    }
  
    return str.replace(/^_+|_+$/g, '').replace(/_+/g, spacer);
  }
  
  function text(elm, opts) {
    var i, text, children;
    opts = opts || {};
  
    if (opts.onlyFirst) {
      children = elm.childNodes;
      text = '';
  
      for (i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
          text += children[i].nodeValue;
        }
      }
    } else {
      text = elm.innerText || elm.textContent || elm.innerHTML.replace(/<[^>]+>/g, '');
    }
  
    return opts.sanitize ? sanitize(text, opts.sanitize) : text;
  }
  
  function getDataLayer(key) {
    try {
      return google_tag_manager[options.containerId].dataLayer.get(key);
    } catch ($$e) {
      log('warn', 'Function getDataLayer: Object ' + key + ' is not defined');
    }
  }
  
  function setDataLayer(key, value) {
    try {
      return google_tag_manager[options.containerId].dataLayer.set(key, value);
    } catch ($$e) {
      log('warn', $$e);
    }
  }
  
  internal.eventQueue = [];
  
  function event(category, action, label, value, object, id) {
    try {
      if (internal.sentPageview === false && options.waitQueue) {
        log('Info', 'The event (' + arguments + ') has been add to the queue');
        return internal.eventQueue.push(arguments);
      }
  
      if (value != null && typeof value === 'object') {
        object = value;
        value = undefined;
      } else {
        object = object || {};
      }
  
      var result = {
        event: options.customNameEvent,
        eventCategory: category,
        eventAction: action,
        eventValue: value,
        eventLabel: label,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }

  function ga4Event(event_name, params, ecommerce, id) {
    try {
      if (internal.sentPageview === false && options.waitQueue) {
        log('Info', 'The event (' + arguments + ') has been add to the queue');
        return internal.eventQueue.push(arguments);
      }

      var _ecommerce = ecommerce;
      if (options.dataLayerEcommerce === 'ga3') {
        _ecommerce = undefined;
        if (ecommerce)
          _ecommerce = mapGa4Ecommerce(ecommerce);
        else {
          _ecommerce = mapGa4Ecommerce(params);
          if (_ecommerce) params = {}
        }
      }
      
      var result = {
        event: options.customNameGA4Event,
        event_name: event_name,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        historyParams = Object.keys(params);
        result.eventCallback = options.gtmCleanup;
      }

      var data = merge(params, _ecommerce);
      log('info', data);
      window[options.dataLayerName].push(merge(result, data));
    } catch (err) {
      log('warn', err);
    }
  }

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
      return mapEcommerce.impressions(ecommerce);
    }

    if (ecommerce.hasOwnProperty('promoView')) {
      var _promotions = ecommerce.promoView.promotions ? ecommerce.promoView.promotions : [];
      return mapEcommerce.promotions(_promotions);
    }

    if (ecommerce.hasOwnProperty('promoClick')) {
      var _promotions = ecommerce.promoClick.promotions ? ecommerce.promoClick.promotions : [];
      return mapEcommerce.promotions(_promotions);
    }

    return undefined;
  }
  
  function localCollectFactory(conf) {
    var localCollect = {
      event: function(category, action, label, value, object) {
        return event(category, action, label, value, object, conf.id);
      },
      pageview: function(path, object) {
        return pageview(path, object, conf.id);
      },
      timing: function(category, variable, value, label, object) {
        return timing(category, variable, value, label, object, conf.id);
      },
      safeFn: function(id, callback, opts) {
        return safeFn(conf.id + ':' + id, callback, opts);
      },
      on: function(event, selector, callback, parent) {
        return on(conf.id, event, selector, callback, parent);
      },
      delegate: function(event, selector, callback) {
        return on(conf.id, event, selector, callback, document.body);
      },
      wrap: function(elm) {
        if (typeof elm === 'object' && elm._type === 'wrapped') {
          return elm;
        } else if (typeof elm === 'string') {
          elm = find(window.document, elm);
        } else if (elm instanceof HTMLElement) {
          elm = [elm];
        } else if ((elm instanceof Array || elm instanceof NodeList) === false) {
          throw 'wrap: Esperado receber seletor, elemento HTML, NodeList ou Array';
        }
  
        return {
          _type: 'wrapped',
          hasClass: function(className, opts) {
            var arr = internalMap(elm, hasClass, [className]);
            return opts && opts.toArray ? arr : reduceBool(arr);
          },
          matches: function(selector, opts) {
            var arr = internalMap(elm, matches, [selector]);
            return opts && opts.toArray ? arr : reduceBool(arr);
          },
          closest: function(selector) {
            return localCollect.wrap(internalMap(elm, closest, [selector]));
          },
          text: function(opts) {
            var arr = internalMap(elm, text, [opts]);
            return opts && opts.toArray ? arr : arr.join('');
          },
          find: function(sel) {
            var elms = internalMap(elm, find, [sel]);
            return localCollect.wrap(flatten(elms));
          },
          map: function(func, params) {
            return internalMap(elm, func, params);
          },
          on: function(event, parent, callback) {
            if (typeof parent === 'function') {
              on(conf.id, event, elm, parent);
            } else {
              on(conf.id, event, parent, callback, elm);
            }
          },
          nodes: elm
        };
      },
      sanitize: sanitize,
      getDataLayer: getDataLayer,
      setDataLayer: setDataLayer,
      cookie: cookie,
      getKey: getKey,
      id: conf.id,
      args: conf.args,
      fn: fn,
      log: log,
      _event: conf.event,
      _selector: conf.selector
    };
    return localCollect;
  }
  
  function pageview(path, object, id) {
    try {
      var result = {
        event: options.customNamePageview,
        path: path,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }
  
  function safeFn(id, callback, opt) {
    opt = opt || {};
    var safe = function() {
      try {
        callback.call(
          this === window ? null : this,
          localCollectFactory({
            id: id,
            args: arguments,
            event: (typeof opt.event === 'string' && opt.event) || undefined,
            selector: (typeof opt.selector === 'string' && opt.selector) || undefined
          })
        );
      } catch ($$e) {
        if (!options.debug) {
          if (Math.random() <= options.errorSampleRate) {
            window[options.dataLayerName].push({
              event: options.exceptionEvent,
              dataQuality: {
                category: options.exceptionCategory,
                action: id,
                label: String($$e),
                event: (typeof opt.event === 'string' && opt.event) || undefined,
                selector: (typeof opt.selector === 'string' && opt.selector) || undefined
              }
            });
          }
        } else {
          log('warn', 'Exception: ', {
            exception: $$e,
            tag: id,
            event: (typeof opt.event === 'string' && opt.event) || undefined,
            selector: (typeof opt.selector === 'string' && opt.selector) || undefined
          });
        }
      }
    };
  
    return opt.immediate === false ? safe : safe();
  }
  internal.timingQueue = [];
  
  function timing(category, variable, value, label, object, id) {
    try {
      if (internal.sentPageview === false && options.waitQueue) {
        log(
          'Info',
          'The timing event (' + arguments + ') has been add to the queue'
        );
        return internal.timingQueue.push(arguments);
      }
  
      object = object || {};
  
      var result = {
        event: options.customNameTiming,
        timingCategory: category,
        timingVariable: variable,
        timingValue: value,
        timingLabel: label,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }
  function expose() {
    if (window[options.collectName] && !options.overwriteCollect) return;
    window[options.collectName] = collect;
  }
  
  expose();
  
})();