'use strict';

import {isObject} from '../util/index';
import {OB_KEY} from '../shared/constant';

const seenObjects = new Set;  // 可见的对象

// 负责管理seenObject
export function traverse(value) {
    _traverse(value,seenObjects);

    seenObjects.clear();
}

// 负责添加属性
function _traverse(value,seen){
    
    const isA = Array.isArray(value);
    // 排除基本数据类型
    if(!(isA||isObject(value))) return;

    // 防止重复收集
    if(value[OB_KEY]){
        const id = value[OB_KEY].dep.id;
        
        if(seen.has(id)) return;

        seen.add(id);
    }

    // 通过getter去触发属性依赖的收集
    if(isA){
        for(let item of value){
            _traverse(item,seen);
        }
    
    } else {
        const keyArr = Object.keys(value);
        
        for(let item of keyArr){
            _traverse(value[item],seen)
        }
    }




}