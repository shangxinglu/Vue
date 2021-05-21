'use strict';

import {
   parsePath
} from '../util/index';

import { setTarget } from './dep';

export default class Wathcer {

   /**
    * @param {Object} 响应数据对象
    * @param {String|Function} expOrFn 需要收集依赖的属性路径或者获取该属性的方法
    * @param {Function} cb 回调函数
    */
   constructor(vm, expOrFn, cb) {
      this.vm = vm,
         this.cb = cb;
         this.deps = []; // 存储dep可以用来操作依赖
      let getter = null;

      if (typeof expOrFn === 'function') {
         getter = expOrFn;
      } else {
         getter = parsePath(expOrFn);
         if (!getter) {
            throw new Error('expOrFn');
         }
      }
      this.getter = getter;

     this.value =  this.get();
   }

   // 触发依赖的收集
   get() {
      let value = null;
      // 挂载依赖
      // setTarget(this.cb);
      setTarget(this);

      value = this.getter(this.vm);

      setTarget(null);

      return value;

   }

   // 添加依赖
   addDep(dep) {
      // 防止dep的sub数组里重复添加
      // 会造成update不断的迭代
      // if(this.deps.includes(dep)) return;
      this.deps.push(dep);
      // 将watch放入dep的依赖数组内
      // 不然dep的notify无法通知依赖的执行
      dep.addSub(this);
   }

   // 当依赖项发生了变化
   // 执行回调
   update() {
      const oldValue = this.value,
      value = this.get();
      this.cb(this.vm,oldValue,value);
   }

   // 取消观察
   teardown() {

   }
}

