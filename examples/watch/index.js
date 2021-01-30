'use strict';

import {defineReactive} from '../../src/defineReact';

import {Wathcer} from '../../src/watcher';

const update = ()=>{
    const obj = {};
    defineReactive(obj,'name','hzx');
    Wathcer(obj,'name',function(){
        console.log('my is watcher!');
    });

    obj.name = 'xlm';



}

export {update,}