import * as lights from './lights'

const defaultRequestObj: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
}
type SendRequestParams = {
  to: string
  handle(response: Response): Promise<any>
}
export function sendRequest<T = unknown>(
  { to: from, handle }: SendRequestParams,
  options: RequestInit = defaultRequestObj
): Promise<T> {
  return new Promise((resolve, reject) =>
    fetch(from, { ...defaultRequestObj, ...options })
      .then(resp => (resp.ok ? handle(resp) : reject(resp)))
      .then(_ => resolve(_))
      .catch(err => reject(err))
  )
}

export { lights }
