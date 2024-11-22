export function objectKeys<K extends string | number | symbol, T>(obj: Record<K, T>) {
  return Object.keys(obj) as K[];
}
