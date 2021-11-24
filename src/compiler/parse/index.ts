import {parseHTML} from './parse-html'
import {HTMLTemplate} from 'src/type/compiler'



export function parse(template:HTMLTemplate):void{
    parseHTML(template,{
        start(tag,attrs){
            console.log('start',tag,attrs);
            
        },
        end(tag){
            console.log('end',tag);
        },
        comment(text){
           console.log('comment',text);

        },
        text(text){
            console.log('text',text);
        }
            
    })


}

