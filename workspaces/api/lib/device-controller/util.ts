import { Light } from 'types'

export type ID = string | number

export const byId = (id: ID) => (x: Light) => id === x.id
