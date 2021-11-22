import {parseHTML} from './parse-html'
import {HTMLTemplate} from 'src/type/compiler'



export function parse(template:HTMLTemplate):void{
    parseHTML(template)


}

