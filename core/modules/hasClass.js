/**
 * Procura no atributo class de um dado elemento
 * alguma classe que contenha determinado nome.
 * Caso exista, retorna true caso haja e
 * false caso contrário.
 * @param {*} e Elemento no qual se realiza a verificação
 * @param {*} className Classe para qual verifica-se a
 * existência no elemento
 */
function hasClass(e, className) {
  if ('classList' in e) return e.classList.contains(className);

  return new RegExp('\\b' + className + '\\b').test(e.className);
}

module.exports = hasClass;
