'use strict';

import Vue from '../../src/core/instance/index';
import { defineReactive, Observer } from '../../src/core/observer/index';
import Watcher from '../../src/core/observer/watcher'
import {isDev} from '../../src/core/util/index'

const vue = new Vue;
console.log('isDev',isDev)

const obj = {
    x:[1,2,4,{x:1}],
    y: {
        x: 1
    },
    // z:20,
    // y:1
};
vue.data = obj;
// defineReactive(vue,'data',obj);
new Observer(vue.data);

// debugger
// new Watcher(vue.data,'y',function(){
//     console.log('run watcher');
// })
const unwatch = vue.$watch('data.y', function () {
    console.log('run watcher');
}, {
    // immediate:true,
    // deep: true,
})

const np = {
    vue,
    unwatch,
};

window.np = np;

// debugger