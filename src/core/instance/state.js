'use strict';

import Watcher from '../observer/watcher';



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
    Vue.prototype.$watch = function(expOrFn,cb,options){
        // debugger
        
        const vm = this,
        watch = new Watcher(vm,expOrFn,cb);

        if(options?.immediate){
            cb.call(vm,watch.value);
        }

        return watch.teardown;
    }
}

