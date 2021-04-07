 
import { Container } from './Container'
import { Sized } from './Sized'

 
export interface Collection<T> extends Sized, Iterable<T>, Container<T> {}
 