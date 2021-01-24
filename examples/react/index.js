'use strict';

import {defineReact} from  '../../src/defineReact';

const data = {}

function update(){
    window.vueDep = e=>{
        console.log('vue dep2');
    }
    defineReact(data,'name','hzx');
    data.name;
    data.name = 'xlm';
    
}

export {
    update,
}