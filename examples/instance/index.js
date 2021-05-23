'use strict';

import Vue from '../../src/core/instance/index';
import {defineReactive} from '../../src/core/observer/index';

const vue = new Vue;

const obj = {
    // x:[1,2,4],
    // y:{
    //     x:1
    // },
    // z:20,
    y:1
};

defineReactive(vue,'data',obj);

vue.$watch('data.y',function(){
    console.log('run watcher');
},{
    // immediate:true,
    // deep:false,
})

debugger