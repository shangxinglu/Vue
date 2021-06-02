

import {parseHTML} from '../../src/compiler/parser/html-parser'

const html =  `<div>
    <span>124</span>
</div>
`;
const log = console.log;

const start = '[a-zA-Z_][\\w\\-\\.]*',
qname = `((?:${start}\\:)?${start})`,
regexp = new RegExp(qname);

window.sxl = {
    regexp,
};

log(qname);

// parseHTML(html,{
//     start(){
//         log('start');
//     }
// })