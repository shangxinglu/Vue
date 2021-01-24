'use strict';

import {defineReact} from '../../src/defineReact';

import {Wathcer} from '../../src/watcher';

const update = ()=>{
    const obj = {};
    defineReact(obj,'name','hzx');
    Wathcer(obj,'name',function(){
        console.log('my is watcher!');
    });

    obj.name = 'xlm';



}

export {update,}