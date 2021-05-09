'use strict';

import {
   parsePath
} from '../util/index';

import {setTarget} from './dep';

export default class Wathcer {

   /**
    * @param {Object} 响应数据对象
    * @param {String|Function} expOrFn 需要收集依赖的属性路径或者获取该属性的方法
    * @param {Function} cb 回调函数
    */
   constructor(vm,expOrFn, cb) {
      this.vm = vm,
      this.cb = cb;

      let getter = null;

      if(typeof expOrFn === 'function'){
         getter = expOrFn;
      } else {
         getter = parsePath(expOrFn);
         if(!getter){
            throw new Error('expOrFn');
         }
      }
      this.getter = getter;

      this.get();
   }

   // 触发依赖的收集
   get() {
      setTarget(this.cb);

     this.getter(this.vm);

      setTarget(null);

   }
}

