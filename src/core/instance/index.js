'use strict';

import {initMixin} from './init';
import {stateMixin} from './state';
import {eventsMixin} from './event';
import {lifecycleMixin} from './lifecycle';

export default class Vue {
    constructor(options){
        this._init(options);
    }
}

initMixin(Vue);

stateMixin(Vue);

eventsMixin(Vue);

lifecycleMixin(Vue);


