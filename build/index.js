'use strict';

import { update as updateReact } from '/examples/react/index.js';
import { update as updateWatch } from '/examples/watch/index.js';

const update = updateWatch;

update();

if (module.hot) {

    module.hot.accept(['/examples/react/index.js',
        '/examples/watch/index.js'], function () {
        update();
    })
}

