
import { 
    parsePath
} from "../utils";
import {
    Dep,
    pushTarget,
    popTarget
}  from "./dep";

let id = 0


export class Watcher {
    vm: Component
    expOrFn:string|Function
    cb: Function
    getter:Function
    id:number
    newVal: any
    oldVal:any
    deps:Array<Dep>
    depIds:Set<number>
    lazy?:boolean

    constructor(vm:Component, expOrFn:string|Function, cb:Function,options:WatcherOptions){
        this.vm = vm;
        this.cb = cb;
        this.expOrFn = expOrFn;
        this.id = id++;
        this.deps = []
        this.depIds = new Set

        if(options){
            this.lazy = !!options.lazy;
        }

        if(typeof expOrFn === 'string'){
            this.getter = parsePath(expOrFn);
        } else {
            this.getter = expOrFn;
        }

        


        this.newVal = this.get()
    }

    get(){
        pushTarget(this as Watcher);
        const value  = this.getter(this.vm)
        this.oldVal = this.newVal;
        this.newVal = value;
        popTarget();
    }

    run(){


    }

    update(){
        this.cb(this.newVal, this.oldVal)
    }

    // 收集相关的dep
    addDep(dep:Dep){
        // 防止重复添加同一个dep
        if(!this.depIds.has(dep.id))
        this.depIds.add(dep.id)
        dep.addSub(this)
    }

    // 当前watcher依赖的所有dep
    depend(){
    }

    // 移除dep
    removeDep(){

    }

    // 从与自身相关的dep中移除
    teardown(){
        for(let item of this.deps){
            item.removeSub(this)
        }
    }
}

