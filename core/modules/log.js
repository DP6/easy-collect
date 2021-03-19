function log(type, info, obj) {
  if (options.debug && typeof getKey('console.' + type) === 'function') {
    console[type](info, obj);
  }
}

module.exports = log;
