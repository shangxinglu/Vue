'use strict';

// import { update as updateReact } from '/examples/react/index.js';
// import { update as updateWatch } from '/examples/watch/index.js';
// import { update as updateObserver } from '/examples/react/observer.js';

// const update = updateObserver;

// update();

// if (module.hot) {

//     module.hot.accept(['/examples/react/index.js',
//         '/examples/watch/index.js',
//         '/examples/react/observer.js'], function () {
//             update();
//         })
// }


import Dep from '../src/core/observer/dep';
import Watcher from '../src/core/observer/watcher';
import {defineReactive} from '../src/core/observer/index';

const dep = new Dep;

const obj = {};
const parent = {son:obj};

defineReactive(obj,'k1','k1');

new Watcher(parent,'son.k1',function(){
    console.log('watcher cb');
});


debugger;
