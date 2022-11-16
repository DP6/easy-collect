function safeFn(id, callback, opt) {
  opt = opt || {};
  var safe = function () {
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
