'use strict';

import { update } from '/examples/react/index.js';

if (module.hot) {

    module.hot.accept(['/examples/react/index.js'], function () {
        update();
    })
}

