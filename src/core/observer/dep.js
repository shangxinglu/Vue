'use strict';

import {remove} from '../util/index';

let uid = 0; // dep实例标识id

export default class Dep {

    constructor(){
        this.id = uid++;
        this.subs=[];
    }


    // 添加依赖
    addSub(sub){
        this.subs.push(sub);
    }

    // 移除依赖
    removeSub(sub){
        remove(this.subs,sub);
    }

    // 获取依赖
    append(){
        if(Dep.target){
            // debugger
            // this.addSub(Dep.target);

            // 为了让watcher能够控制依赖
            // 需要将dep传递到watcher
            Dep.target.addDep(this);

        }
    }

    // 通知依赖
    notify(){
        // 防止执行修改后的回调
        const subs = this.subs.slice();
        for(let item of subs){
            item.update();
        }
    }

}

Dep.target = null;


export function setTarget(target){
    Dep.target = target;
}
