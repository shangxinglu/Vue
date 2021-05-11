'use strict';

// 为对象创建数据描述符
export function def(obj,key,val){
    Object.defineProperty(obj,key,{
        value:val,
        writable:true,
        enumerable:true,
        configurable:true,
    });
}

// 移除数组中的指定元素
export function remove(arr,sub){
    if(!arr.length) return;

    const index = arr.indexOf(sub);
    
    if(index === -1) return;

    arr.splice(index,1);
}
