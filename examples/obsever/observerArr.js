'use strict';

import {Observer} from '../../src/core/observer/index';
import Watcher from '../../src/core/observer/watcher';
const obj = {
    arr:[1,2,3],
    x:1
};

new Observer(obj);

new Watcher(obj,'arr',function(){
    console.log('array dep run');
});

// new Watcher(obj,'x',function(){
//     console.log('x dep run');
// });

debugger

