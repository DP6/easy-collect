var hasOwnProperty = Object.prototype.hasOwnProperty;
var jQuery = window.jQuery;
var fn = {};

var options = {
  collectName: 'easyCollect',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || false),
  waitQueue: true,
  containerId: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  customNameTiming: 'ga_timing',
  errorSampleRate: 1,
  gtmCleanup: function (gtmId) {
    collect.setDataLayer('ecommerce', undefined);
    collect.setDataLayer('noInteraction', undefined);
  },
  customNameGA4Event: 'ga4_event'
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
