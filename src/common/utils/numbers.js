export const convertNumbers = (n, rtl) => {
  if (!rtl || !n) {
    return n;
  }

  const num = String(n);
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.replace(/[0-9]/g, w => id[+w]);
};
