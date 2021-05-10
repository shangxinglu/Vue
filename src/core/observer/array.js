'use strict';

/**
 * @description 利用数组原型方法监听数组的变化
 */

const methodArr = [
    'shift',
    'unshift',
    'pop',
    'push',
    'splice',
    'sort',
    'reverse',
];


const originPro = Array.prototype;

for (let item of methodArr) {
    const originMethod = originPro[item];
    originPro[item] = function (...args) {
        console.log('dep run');
        // debugger
        originMethod.apply(this,args);
    }
}
