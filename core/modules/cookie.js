/**
 * Encontra e retorna o cookie com o valor informado por parâmetro
 * Esta função é utilizada pela função cookie como facilitadora
 * @param {*} key Chave do cookie
 */
function getCookie(key) {
  key = '; ' + key + '=';
  var cookie = '; ' + document.cookie;
  var index = cookie.indexOf(key);
  var end;
  if (index === -1) {
    return '';
  }
  cookie = cookie.substring(index + key.length);
  end = cookie.indexOf(';');
  return window.unescape(end === -1 ? cookie : cookie.substring(0, end));
}

/**
 * Função utilizada para atribuir um novo cookie
 * Esta função é utilizada pela função cookie como facilitadora
 * @param {*} name Nome do cookie
 * @param {*} value Valor do cookie
 * @param {*} opts Opções do cookie, como vencimento e domínio
 */
function setCookie(name, value, opts) {
    var exdate, cookie;
    opts = opts || {};

  cookie = name + '=' + window.escape(value);
  if (opts.exdays) {
    exdate = new Date();
    exdate.setDate(exdate.getDate() + opts.exdays);
    cookie += '; expires=' + exdate.toUTCString();
  }
  if (opts.domain) {
    cookie += '; domain=' + opts.domain;
  }
  cookie += '; path=' + (opts.path || '/');
  return (document.cookie = cookie);
}

/**
 * Função exposta que pode recuperar ou criar um novo cookie
 * Caso somente o primeiro parâmetro 'name' seja informado,
 * a função irá procurar um cookie com este parâmetro.
 * Caso o usuário também informe o parâmetro 'value', a função
 * irá criar um novo cookie.
 * @param {*} name Nome do Cookie
 * @param {*} value Valor do Cookie
 * @param {*} opts Opções do cookie, como vencimento e domínio
 */
function cookie(name, value, opts) {
    if (typeof value === 'undefined')
        return getCookie(name);

    return setCookie(name, value, opts);
}

module.exports = {
    getCookie: getCookie,
    setCookie: setCookie,
    cookie: cookie
};
