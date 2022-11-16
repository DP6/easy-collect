function localCollectFactory(conf) {
  var localCollect = {
    ga4Event: function (event_name, params, ecommerce) {
      return ga4Event(event_name, params, ecommerce, conf.id);
    },
    event: function (category, action, label, value, object) {
      return event(category, action, label, value, object, conf.id);
    },
    pageview: function (path, object) {
      return pageview(path, object, conf.id);
    },
    timing: function (category, variable, value, label, object) {
      return timing(category, variable, value, label, object, conf.id);
    },
    safeFn: function (id, callback, opts) {
      return safeFn(conf.id + ':' + id, callback, opts);
    },
    on: function (event, selector, callback, parent) {
      return on(conf.id, event, selector, callback, parent);
    },
    delegate: function (event, selector, callback) {
      return on(conf.id, event, selector, callback, document.body);
    },
    wrap: function (elm) {
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
        hasClass: function (className, opts) {
          var arr = internalMap(elm, hasClass, [className]);
          return opts && opts.toArray ? arr : reduceBool(arr);
        },
        matches: function (selector, opts) {
          var arr = internalMap(elm, matches, [selector]);
          return opts && opts.toArray ? arr : reduceBool(arr);
        },
        closest: function (selector) {
          return localCollect.wrap(internalMap(elm, closest, [selector]));
        },
        text: function (opts) {
          var arr = internalMap(elm, text, [opts]);
          return opts && opts.toArray ? arr : arr.join('');
        },
        find: function (sel) {
          var elms = internalMap(elm, find, [sel]);
          return localCollect.wrap(flatten(elms));
        },
        map: function (func, params) {
          return internalMap(elm, func, params);
        },
        on: function (event, parent, callback) {
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
