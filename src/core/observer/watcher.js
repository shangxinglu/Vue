'use strict';

import {
   parsePath
} from '../util/index';

import { setTarget } from './dep';

import {traverse} from './traverse';


// 收集依赖项dep
// 执行回调
export default class Wathcer {

   /**
    * @param {Object} 响应数据对象
    * @param {String|Function} expOrFn 需要收集依赖的属性路径或者获取该属性的方法
    * @param {Function} cb 回调函数
    * @param {Object} [option] 其他选项
    */
   constructor(vm, expOrFn, cb, option) {
      this.vm = vm,
         this.cb = cb;
         this.depIds = new Set();
         this.deps = []; // 存储依赖项dep可以用来操作回调

         // 添加deep用来开启深度监听
      if(option){
         this.deep = !!option.deep;
      } else {
         this.deep = false;
      }

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

      // 深度监听
      // 将water添加到每属性
      if(this.deep){
         // 编列属性
         traverse(value);
      }

      setTarget(null);

      return value;

   }

   // 添加依赖
   addDep(dep) {
      // 防止dep的sub数组里重复添加
      // if(this.deps.includes(dep)) return;
      const {id} = dep;
      console.log(id);

      if (this.depIds.has(id)) return;
      this.depIds.add(id);
      // debugger
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

      for(let item of this.deps){
         item.removeSub(this);
      }
   }
}

