import Vue from './instance/index'
import { compiler } from '../compiler'

(Vue as any).compiler = compiler

export default Vue