
import {HTMLTemplate} from 'src/type/compiler'
import {parse} from './parse'


export function compiler(template:HTMLTemplate):void{
    parse(template)
}
