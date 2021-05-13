'use strict';

import {def} from '../util/index';
import {OB_KEY} from '../shared/constant';

/**
 * 用来覆盖可响应数组实例上的[[prototype]]
 * 实现对数组变化的监听
 */
const originPro = Array.prototype;

export const arrayMethod = Object.create(originPro);

const methodArr = [
    'shift',
    'unshift',
    'pop',
    'push',
    'splice',
    'sort',
    'reverse',
];



for (let item of methodArr) {
    const originMethod = originPro[item];
    
    def(arrayMethod,item,function mutator(...args) {
        console.log('arrayMethod mutator');
        this[OB_KEY].notice();
      return  originMethod.apply(this,args);
    })
}
