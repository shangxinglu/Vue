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
            } else {
                defineReactive(target,item,target[item]);
            }

            
        }

        return;
    }



}

export {
    observer
};