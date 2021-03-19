function reduceBool(arr) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i]) return true;
  }
  return false;
}

module.exports = reduceBool;
