/**
 * Recupera uma chave do dataLayer utilizando o objeto
 * padrão do GTM 'google_tag_manager'
 * Obs: Possui dependência com a ativação da variável 'container ID'
 * @param {*} key
 */
function getDataLayer(key) {
  try {
    return google_tag_manager[options.containerId].dataLayer.get(key);
  } catch ($$e) {
    log('warn', 'Function getDataLayer: Object ' + key + ' is not defined');
  }
}

/**
 * Define uma chave do dataLayer utilizando o objeto
 * padrão do GTM 'google_tag_manager'
 * Obs: Possui dependência com a ativação da variável 'container ID'
 * @param {*} key
 */
function setDataLayer(key, value) {
  try {
    return google_tag_manager[options.containerId].dataLayer.set(key, value);
  } catch ($$e) {
    log('warn', $$e);
  }
}
