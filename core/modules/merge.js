function merge(obj, obj2) {
    if (obj2) {
        for (var key in obj2) {
            if (has(obj2, key)) {
                obj[key] = obj2[key];
            }
        }
    }
    return obj;
}

module.exports = merge;
