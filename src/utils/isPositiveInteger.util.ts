export const isPositiveInteger = (num: number): boolean => {
  const n = Number(`${num}`);
  return n > 0 && n % parseInt(`${num}`) === 0;
};
