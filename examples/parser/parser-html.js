

import {parseHTML} from '../../src/compiler/parser/html-parser'
import {log} from '../../src/core/util/index'

const html = `<div class="d1" id="d1"><span></span></div>`;

parseHTML(html,{
    start(){
        log('start');
    }
});
