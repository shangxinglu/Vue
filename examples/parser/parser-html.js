

import {parseHTML} from '../../src/compiler/parser/html-parser'
import VNode from '../../src/core/vdom/vnode'
import {log} from '../../src/core/util/index'

const html = `<div class="d1" id="d1">我是一个盒子<script>const login;<div></div></script></div>`;


let currentNode = tree;
parseHTML(html,{
    start(tagName,attrs,isUnary){
        log('start');
        const vnode = new VNode(tagName,attrs);
        
    },
    end(){

    },
    chars(text){
        log('chars hook',text);
    }

    
});
