'use strict';

import { set,del } from '../observer';
import Watcher from '../observer/watcher';
import { OB_KEY } from '../shared/constant';



export function stateMixin(Vue) {

    /**
     * @desc 监听对象上一个表达式或者一个函数的变化
     * 
     * @param {String|Function} expOrFn 要监听的表达式
     * @param {Function} cb 变化后的回调函数
     * @param {Object} [options] 可选参数 
     * @param {Boolean} deep 是监听监听对象的内部变化
     * @param {Boolean} immediate 是否先立即触发一次
     * 
     * @returns {Function} unwatch 取消监听
     */
    Vue.prototype.$watch = function (expOrFn, cb, options) {

        const vm = this,
            watch = new Watcher(vm, expOrFn, cb, options);

        if (options?.immediate) {
            cb.call(vm, watch.value);
        }

        return function unwatch() {
            watch.teardown();

        }
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
    Vue.prototype.$set = set;

    /**
     * @description 删除响应对象中的某个属性
     *              触发依赖通知
     * 
     * @param {Object|Array} target 
     * @param {String|Number} key 
     */
    Vue.prototype.$delete = del;


}

