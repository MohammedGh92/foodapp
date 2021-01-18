Object.getDeepProp = (obj, path) =>
  path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .reduce((acc, part) => acc && acc[part], obj);
