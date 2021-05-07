'use strict';

import {defineReactive} from  '../../src/defineReact';

const data = {}

function update(){
    window.vueDep = e=>{
        console.log('vue dep2');
    }
    defineReactive(data,'name','hzx');
    data.name;
    data.name = 'xlm';
    
}

export {
    update,
}