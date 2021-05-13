'use strict';

import Dep from './dep';
import { arrayMethod } from './array';
import { isObject, hasOwn } from '../util/index';
import { OB_KEY } from '../shared/constant';

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
            if(Array.isArray(val)){
                // debugger
                val[OB_KEY].append();

            } else {
                dep.append();
            }



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

        /**
         * 将依赖存放到对象上
         */
        this.dep = new Dep;
        if (Array.isArray(obj)) {
            // obj[OB_KEY] = dep;
        } else {
            this.walk(obj);
        }
    }

    // 转换每个属性
    walk(obj) {
        const keyArr = Object.keys(obj);

        for (let item of keyArr) {
            const val = obj[item];
            debugger
            if (typeof val === 'object') {
                if (Array.isArray(val)) {
                    Object.setPrototypeOf(val, arrayMethod);
                    val[OB_KEY] = this.dep;
                   
                    defineReactive(obj, item, val);

                    // this.observerArray(val);
                } else {
                    this.walk(val);
                }

                continue;
            }

            defineReactive(obj, item, val);
        }
    }

    // // 将数组转成响应式的
    // observerArray(arr){


    // }
}


/**
 * 为val添加观察者并返回观察者
 * 如果已经存则直接返回观察者
 */
export function observer(val) {
    if (!isObject(val)) return;
    let ob = null;
    // if () {
    //     // ob = val.
    // }
}
