type FnIsEnv = (env: 'development' | 'production' | 'testing') => boolean
export const isEnv: FnIsEnv = env => process.env.NODE_ENV === env
