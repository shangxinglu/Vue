import Vue from './runtime/index'
import { compiler } from 'src/compiler'

(Vue as any).compiler = compiler
export default Vue