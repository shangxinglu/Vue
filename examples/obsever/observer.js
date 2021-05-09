'use strict';

import {Observer} from '../../src/core/observer/index';
import Watcher from '../../src/core/observer/watcher';

const obj = {
    x:1,
    y:2,
    z:{
        a:1,
        b:2,
        c:3,
    }
};

const sxl = {};
window.sxl = sxl;

sxl.obj = obj;

new Observer(obj);
new Watcher(obj,'z.a',function(){
    console.log('watcher cb x');
})
