export type ID = string | number

type StateSetter<T> = (state: T) => T
type Payload<T> = Partial<T> | StateSetter<T>

export interface Store<T extends Object> {
  /**
   * Returns updated state
   */
  getState(): T
  /**
   * Accepts either a object for shallow copy or a state setter function
   * returns a getState function
   */
  setState(payload: Payload<T>): () => T
}

export function createStore<T extends Object>(initialState: T): Store<T> {
  let state: T = { ...initialState }
  const getState = () => state

  // setState({ new:data })
  // setState(state => ({...state, something: 'asdf'}))

  const setState = (payload: Partial<T> | StateSetter<T>) => {
    switch (typeof payload) {
      case 'object':
        state = { ...state, ...payload }
        break
      case 'function':
        state = payload(state)
        break
    }

    return () => getState()
  }

  return { getState, setState }
}

type FindFn<T> = (x: T, index?: number) => boolean
type Insert<T> = { into: T[]; usingIndex: number | FindFn<T>; item: T }
export const insert = <T>({
  into: arr,
  usingIndex: index,
  item,
}: Insert<T>): T[] => {
  const newArr = [...arr]
  const getIndex = (): number => {
    switch (typeof index) {
      case 'number':
        return index
      case 'function':
        return newArr.findIndex((x, i) => index(x, i))
    }
  }

  newArr[getIndex()] = item

  return newArr
}
