import { Consola } from 'consola'
const consola: Consola = require('consola')

type Logger = Record<
  'log' | 'info' | 'success' | 'error' | 'fatal' | 'warn',
  (...input: any[]) => void
>

export const createLogger: (logObj: Logger) => Logger = logObj => logObj

const defaultLogConf: Logger = {
  log: consola.log,
  error: consola.error,
  fatal: consola.fatal,
  info: consola.info,
  success: consola.success,
  warn: consola.warn,
}

export default createLogger(defaultLogConf)
