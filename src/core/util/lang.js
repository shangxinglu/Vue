'use strict';

/**
 * 用来解析HTML标签、组件名称、属性路径
 */

/**
 * @description 将字路径解析成数组，解析成功返回一个读取指定对象该路径的属性
 * 
 * @param {String} path 属性路径
 * 
 * @returns {undefined|Function}
 */
const pathReg = /[^\w.]/;

export function parsePath(path) {
    // 过滤格式错误的路径
    if (pathReg.test(path)) return;

    const pathArr = path.split('.');

    return function (obj) {

        for (let item of pathArr) {
            if (!obj) return;

            obj = obj[item];
        }

        return obj;

    }
};