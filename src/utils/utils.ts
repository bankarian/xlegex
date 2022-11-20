export const containsByKey = <T>(arr: T[], e: T, key: keyof T): boolean => {
  return arr.filter((o) => o[key] === e[key]).length > 0;
};

export const containsByAssert = <T>(
  arr: T[],
  e: T,
  assert: (a: T, b: T) => boolean
): boolean => {
  return arr.filter((o) => assert(o, e)).length > 0;
};
