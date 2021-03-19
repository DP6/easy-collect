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

module.exports = matches;
