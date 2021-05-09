'use strict';

import Dep from './dep';

/**
 * @description 定义响应式数据
 */
export function defineReactive(data,key,val){
    const dep = new Dep;
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        set(newVal){
           dep.notice();

            if(val === newVal){
                return;
            }

            val = newVal;
            return;
        },

        get(){
          dep.append();
            
            return val;
        }
    })
}

