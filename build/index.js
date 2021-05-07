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

const dep = new Dep;

dep.addSub(1);

debugger;
