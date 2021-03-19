function flatten(arrs) {
  var currentArray, currentElement, i, j;
  var result = [];

  if (arrs.length === 1) return arrs[0];

  while (arrs.length > 0) {
    currentArray = arrs.shift();
    for (i = 0; currentArray.length > i; i++) {
      currentElement = currentArray[i];
      j = 0;
      while (j < result.length && currentElement !== result[j]) {
        j += 1;
      }
      if (j === result.length) result.push(currentElement);
    }
  }

  return result;
}

module.exports = flatten;
