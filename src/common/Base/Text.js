export const removeNotNumbers = text => (text || '').replace(/[^0-9]+/g, '');

export const removeNotNumbersAndKeepPercent = text =>
  (text || '').replace(/[^0-9%]+/g, '');

export const removeWhiteSpaces = text => (text || '').replace(/\s/g, '');
