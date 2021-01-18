'use strict';
/**
 * 依赖函数
 */
window.dep = function(){
    console.log('My is depend',obj);
    return;
}

/**
 * @description 定义响应式数据
 */
function defineReact(data,key){
    const dep = [];
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        set(newVal){
            for(let item of dep){
                item();
            }
            console.log(key);
        },

        get(){
            if(dep.indexOf(window.dep)<0){
                dep.push(window.dep);
            }
            console.log('get');
        }
    })
}

const obj = {};
defineReact(obj,'name','hzx');