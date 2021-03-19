/**
 * Disparo personalizado de timing
 * @param {*} category Categoria do evento
 * @param {*} action Ação do evento
 * @param {*} label Rótulo do evento
 * @param {*} value Valor do evento
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
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
