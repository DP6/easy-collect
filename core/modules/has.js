function has(obj, key) {
    return hasOwnProperty.call(obj, key);
}

module.exports = has;
