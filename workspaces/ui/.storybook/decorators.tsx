import { Store } from 'redux'
import { StateProvider } from '../src/global/Providers'

export const withStore = (store: Store) => (Story: Function) => {
  return (
    <StateProvider store={store}>
      <Story />
    </StateProvider>
  )
}
