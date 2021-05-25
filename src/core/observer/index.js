'use strict';

import Dep from './dep';
import { arrayMethod } from './array';
import { isObject, hasOwn, def, hasProto } from '../util/index';
import { OB_KEY } from '../shared/constant';

/**
 * @description 定义响应式数据
 */
export function defineReactive(data, key, val) {
    const dep = new Dep;
    if (arguments.length === 2) {
        val = data[key];
    }

    // 获取或创建观察者
    // 递归val中的对象
    const childOb = observer(val);

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        set(newVal) {

            if (val === newVal) {
                return;
            }

            val = newVal;

            dep.notify();

            return;
        },

        get() {
            // console.log(key);
            // debugger
            childOb?.dep.append();

            dep.append();
            return val;
        }
    })
}


/**
 * @description 将对象的所有属性转为响应式的
 */
export class Observer {

    constructor(obj) {
        if (typeof obj !== 'object') return;

        // 将Observer实例保存在OB_KEY
        def(obj, OB_KEY, this);

        // 将依赖存放到对象上
        this.dep = new Dep;

        if (Array.isArray(obj)) {
            Object.setPrototypeOf(obj, arrayMethod);
            this.observerArray(obj);
        } else {
            this.walk(obj);
        }
    }

    // 将属性转成响应式
    walk(obj) {
        const keyArr = Object.keys(obj);

        for (let item of keyArr) {
            defineReactive(obj, item);
        }
    }

    // 将数组内的成员转成响应式的
    observerArray(arr) {
        for (let item of arr) {
            observer(item);
        }
    }
}


/**
 * 为val添加观察者并返回观察者
 * 如果已经存则直接返回观察者
 */
export function observer(val) {
    if (!isObject(val)) return;

    let ob = null;

    if (hasOwn(val, OB_KEY) && val[OB_KEY] instanceof Observer) {
        ob = val[OB_KEY];
    } else {
        ob = new Observer(val);
    }

    return ob;
}

/**
   * @description 在响应式对象中添加一个响应式属性
   *              触发依赖通知
   * 
   * @param {Object|Array} target
   * @param {String|Number} key
   * @param {any} value
   * 
   * @returns {any} value
   */
export function set(target, key, value) {

    // 数组中添加响应式数据
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        const maxLen = Math.max(target.length, key);
        target.length = maxLen;
        target.splice(key, 1, value);
        return value;
    }

    // 如果key已存在
    // 避免阻止访问Object原型属性和方法
    if (key in target && !(key in Object.prototype)) {
        target[key] = value;
        return value;
    }

    const ob = target[OB_KEY];

    if (!ob) {
        target[key] = value;
        return value;
    }

    defineReactive(target, key, value);
    // 通知obj的依赖
    ob.dep.notify();

    return value;

}


/**
 * @description 删除响应对象中的某个属性
 *              触发依赖通知
 * 
 * @param {Object|Array} target 
 * @param {String|Number} key 
 */
export function del(target, key) {
    // 数组中删除响应式数据
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return value;
    }

    if(!hasOwn(target,key)) return;

    delete target[key];

    const ob = target[OB_KEY];

    ob?.dep.notify();

}
