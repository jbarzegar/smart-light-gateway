export const getEnv = (
  str: string,
  defaultVal: string | number | undefined = undefined
): typeof defaultVal | undefined => process.env?.[str] || defaultVal
