export const isPositiveFloat = (num: number): boolean => {
  return Number.isFinite(num) && num > 0;
};
