'use strict';

import {remove} from '../util/index';

export default class Dep {

    constructor(){
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
            // this.addSub(Dep.target);

            // 为了让watcher能够控制依赖
            // 需要将dep传递到watcher
            Dep.target.addDep(this);

        }
    }

    // 通知依赖
    notify(){
        for(let item of this.subs){
            item.update();
        }
    }

}

Dep.target = null;


export function setTarget(target){
    Dep.target = target;
}
