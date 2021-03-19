function sanitize(str, opts) {
  var split, i, spacer;
  
  if (!str) return '';
  opts = opts || {};
  spacer = typeof opts.spacer === 'string' ? opts.spacer : '_';
  str = str
  .toLowerCase()
  .replace(/^\s+/, '')
  .replace(/\s+$/, '')
  .replace(/\s+/g, '_')
  .replace(/[áàâãåäæª]/g, 'a')
  .replace(/[éèêëЄ€]/g, 'e')
  .replace(/[íìîï]/g, 'i')
  .replace(/[óòôõöøº]/g, 'o')
  .replace(/[úùûü]/g, 'u')
  .replace(/[ç¢©]/g, 'c')
  .replace(/[^a-z0-9_\-]/g, '_');
  
  if (opts.capitalized) {
    split = str.replace(/^_+|_+$/g, '').split(/_+/g);
    for (i = 0; i < split.length; i++) {
      if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
    }
    return split.join(spacer);
  }
  
  return str.replace(/^_+|_+$/g, '').replace(/_+/g, spacer);
}

module.exports = sanitize;
