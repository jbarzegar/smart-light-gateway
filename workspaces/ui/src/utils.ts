type FnIsEnv = (env: 'development' | 'production' | 'testing') => boolean
export const isEnv: FnIsEnv = env => process.env.NODE_ENV === env

/** Remove duplicates from array */
export const deDupeArray = <T extends any[]>(arr: T) =>
  Array.from<T[number]>(new Set(arr))
