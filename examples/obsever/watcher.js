'use strict';

import Dep from '../../src/core/observer/dep';
import Watcher from '../../src/core/observer/watcher';
import {defineReactive} from '../../src/core/observer/index';

const dep = new Dep;

const obj = {};
const parent = {son:obj};

defineReactive(obj,'k1','k1');

new Watcher(parent,'son.k1',function(){
    console.log('watcher cb');
});


debugger;