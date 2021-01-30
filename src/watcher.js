'use strict';



/**
 * @description 观察者
 * 
 * @param {Object}  obj 观察对象
 * @param {String|Function} express  观察的属性表达式
 * @param {Function} listener 监听器
 */
 const Wathcer = (obj,express,listener)=>{
    
    // 设置依赖
    window.vueDep = listener;

    // 依赖注入
    if(typeof express === 'function'){

    }
    obj[express];


    
 }

 export {Wathcer,};