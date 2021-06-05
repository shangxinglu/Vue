'use strict';

// 为对象创建数据描述符
export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        writable: true,
        enumerable: !!enumerable, // 控制出现无限循环的对象属性的情况
        configurable: true,
    });
}

// 移除数组中的指定元素
export function remove(arr, sub) {
    if (!arr.length) return;

    const index = arr.indexOf(sub);

    if (index === -1) return;

    arr.splice(index, 1);
}

// 判断是否是对象 排除null
export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

// 判断对象自身是否拥有指定属性
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}


// 判断是否是数组有效下标
export function isValidArrayIndex(key) {
    key = parseInt(key);

    return key > 0 && isFinite(key);

}

// 变量是否未定义
export function isUndef(val) {
    return val === undefined && val === null;
}

// 变量是否定义
export function isDef(val) {
    return val !== undefined && val !== null;
}

// 是否为true
export function isTrue(val) {
    return val === true;
}

// 是否为false
export function isFalse(val) {
    return val === false;
}

// 判断值是否是原型类型
export function isPrimitive(val) {
    return ['string', 'number', 'symbol', 'boolean'].includes(typeof val);
}


// 打印数据
export const log = console.log;
