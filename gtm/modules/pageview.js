/**
 * Utilizado para disparar pageviews virtuais
 * @param {*} path Valor do pagepath do disparo
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
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
