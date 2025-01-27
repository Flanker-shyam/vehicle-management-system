export function findUpperBound(arr: number[], num: number): number | null {
  const upperBounds = arr.filter((value) => value >= num);
  return upperBounds.length > 0 ? Math.min(...upperBounds) : null;
}
