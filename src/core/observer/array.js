'use strict';

import {def} from '../util/lang';

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
      return  originMethod.apply(this,args);
    })
}
