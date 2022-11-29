var hasOwnProperty = Object.prototype.hasOwnProperty;
var jQuery = window.jQuery;
var fn = {};

var options = {
  collectName: 'easyCollect',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || false),
  waitQueue: true, //put 'false' if only GA4 is implemented
  historyParams: [],
  containerId: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  customNameGA4Event: 'ga4_event',
  currencyCode: 'BRL',
  customNameTiming: 'ga_timing',
  errorSampleRate: 1,
  gtmCleanup: function (gtmId) {
    collect.setDataLayer('ecommerce', undefined);
    collect.setDataLayer('eventNoInteraction', undefined);

    // For GA4
    for (var i = 0; i < options.historyParams.length; i++) {
      collect.setDataLayer(options.historyParams[i], undefined);
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
