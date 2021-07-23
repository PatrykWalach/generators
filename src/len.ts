import { Sized } from './abs/Sized'

interface Len {
  (sized: Sized): number
}

export const len: Len = (sized) => sized.length
