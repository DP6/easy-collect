function text(elm, opts) {
  var i, text, children;
  opts = opts || {};

  if (opts.onlyFirst) {
    children = elm.childNodes;
    text = '';

    for (i = 0; i < children.length; i++) {
      if (children[i].nodeType === 3) {
        text += children[i].nodeValue;
      }
    }
  } else {
    text = elm.innerText || elm.textContent || elm.innerHTML.replace(/<[^>]+>/g, '');
  }

  return opts.sanitize ? sanitize(text, opts.sanitize) : text;
}

module.exports = text;
