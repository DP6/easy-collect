/**
 * Recupera o valor de uma chave encadeada de um objeto,
 * tratando o erro de acessar um objeto de undefined em qualquer
 * passo da cadeia de objetos
 * @param {*} key Chave para recuperar o seu valor
 * @param {*} opt_root Caso houver a necessidade de passar o objeto
 * root deste elemento.
 */
function getKey(key, opt_root) {
    if (!key || typeof key !== 'string') return undefined;

    var result = opt_root || window;
    var splitKey = key.split('.');

    for (var i = 0; i < splitKey.length && result != null; i++) {
        if (has(result, splitKey[i])) {
            result = result[splitKey[i]];
        } else {
            return undefined;
        }
    }
    return result;
}

module.exports = getKey;
