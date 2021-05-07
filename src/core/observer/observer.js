'use strict';

import {defineReactive} from "./defineReact";

/**
 * @description 遍历对象，将对象中的所有属性包装成响应式的
 * 
 * @param {any} target 
 */
const observer = target=>{
    if(target instanceof Object){
        const keysArray = Object.keys(target);

        for(let item of keysArray){

            if(target[item] instanceof Object){
                observer(target[item]);
            } else if (target[item] instanceof Array){
                


            } else {
                defineReactive(target,item,target[item]);
            }

            
        }

        return;
    }



}

/**
 * @description 数组拦截器 监听数组的变化
 */
const interceptor = arr=>{
    const method = ['shift','unshift','pop','push','splice','reverse','sort']; // 监听方法
    const origin = {};
    const prop = {};

    for(let item of method){
        origin[item] = arr[item];

        prop[item] = function(...arg){
            console.log('dep',item,arg);
            origin[item].apply(arr,arg);
        }

    }
    Object.setPrototypeOf(arr,prop);


    return;

}

export {
    observer,
    interceptor,
};