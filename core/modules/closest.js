function closest(elm, seletor) {
    if ('closest' in elm) return elm.closest(seletor);
    if (typeof jQuery === 'function') return jQuery(elm).closest(seletor)[0];

    var parent = elm.parentNode;

    while (parent != document) {
        if (matches(parent, seletor)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return undefined;
}

module.exports = closest;
