'use strict';

import Dep from './dep';
import {arrayMethod} from './array';
import {isObject} from '../util/index';

/**
 * @description 定义响应式数据
 */
export function defineReactive(data, key, val) {
    const dep = new Dep;
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        set(newVal) {

            if (val === newVal) {
                return;
            }

            val = newVal;

            dep.notice();

            return;
        },

        get() {
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
        if (typeof obj === 'object') {
            if(Array.isArray(obj)){
                this.observerArray(val);
            } else {
                this.walk(obj);
            }
        }
    }

    // 转换每个属性
    walk(obj) {
        const keyArr = Object.keys(obj);
        for (let item of keyArr) {
            const val =  obj[item];
            if(typeof val === 'object'){
                if(Array.isArray(val)){
                    Object.setPrototypeOf(val,arrayMethod);
                    // this.observerArray(val);
                } else {
                    this.walk(val);
                }

                return;
            }

            defineReactive(obj, item,val);
        }
    }

    // // 将数组转成响应式的
    // observerArray(arr){
       

    // }
}


/**
 * 为val添加观察者
 * 如果已经存在返回观察者
 */
export function observer(val){
    if(!isObject(val)) return;
}
