'use strict';

import {remove} from '../util/index';

export default class Dep {

    constructor(){
        this.subs=[];
    }


    addSub(sub){
        this.subs.push(sub);
    }

    removeSub(sub){
        remove(this.subs,sub);
    }

    append(){
        if(Dep.target){
            this.addSub(Dep.target);
        }
    }

    notice(){
        for(let item of this.subs){
            item();
        }
    }

}

Dep.target = null;


export function setTarget(target){
    Dep.target = target;
}
