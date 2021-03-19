function expose() {
  if (window[options.collectName] && !options.overwriteCollect) return;
  window[options.collectName] = collect;
}

expose();
