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

module.exports = internalMap;
