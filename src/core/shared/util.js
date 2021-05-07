'use strict';

// 移除数组中的指定元素
const remove = (arr,sub)=>{
    if(!arr.length) return;

    const index = arr.indexOf(sub);
    
    if(index === -1) return;

    arr.splice(index,1);
}


export {
    remove,
}