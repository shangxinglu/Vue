// Language: typescript
// Path: src/type/observer.ts
// Compare this snippet from /Users/huangzhixin/Desktop/Code/front/Vue/my-vue/src/type/observer.ts:
// declare interface Watcher{
//     new ({
//         vm:Component,
//         expOrFn:string,
//         cb:Function
//     }) : Watcher
// 
// }
// 
// declare interface Watcher {
    declare interface Watcher{
        vm:Component;
        cb:Function;
        expOrFn:string|Function
        id:number;
        newVal:any;
        oldVal:any;
        deps:Array<Dep>;
        depIds:Set<number>;
        lazy?:boolean;
        run():void;
        get():any;
        addDep(dep:Dep):void;
        depend():void;
        removeDep(dep:Dep):void;
        update():void;
    }

    declare interface WatcherOptions{
        lazy?:boolean // 惰性求值

    }
    
    // Language: typescript
    // Path: src/type/observer.ts
    // Compare this snippet from /Users/huangzhixin/Desktop/Code/front/Vue/my-vue/src/type/observer.ts:
    // declare interface Dep {
    declare interface Dep{

        id:number;
        subs:Watcher[];
        addSub(watcher:Watcher):void;
        depend():void;
        removeSub(watcher:Watcher):void;
        notify():void;
    }

    declare interface Observer {
        __ob__:Observer
    }