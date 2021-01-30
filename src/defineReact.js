'use strict';

/**
 * 依赖存放到window.vueDep
 */

/**
 * @description 定义响应式数据
 */
function defineReactive(data,key,val){
    const dep = [];
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        set(newVal){
            for(let item of dep){
                item();
            }

            if(val === newVal){
                return;
            }

            val = newVal;
            return;
        },

        get(){
            if(window.vueDep&&dep.indexOf(window.vueDep)<0){
                dep.push(window.vueDep);
            }
            
            return val;
        }
    })
}

export {defineReactive,};