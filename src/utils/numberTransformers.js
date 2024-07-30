// Source: https://stackoverflow.com/a/11832950
export function roundToNumberOfDecimals(num, numDecimals = 2) {
  return Math.round((num + Number.EPSILON) * (10**numDecimals)) / (10**numDecimals);
}
