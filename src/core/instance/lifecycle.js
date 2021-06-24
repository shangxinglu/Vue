

// 初始化生命周期
export function initLifecycle(vm){
    const options = vm.$options;

    const parent = options.parent;

    if(parent){
        parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent? parent.$root:vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._isMounted = false; // 挂载
    vm._isBeingDestroyed = false; // 正在销毁
    vm._isDestroyed = false; // 已销毁


}

export function lifecycleMixin(Vue) {
    
    // 强制更新Vue实例
    // 只影响实例本身和插槽内的子组件，不是所有子组件
    Vue.prototype.$forceUpdate = function () {
        
        this._watcher?.update?.();
    }

    /**
     * 销毁组件实例
     * 清理与其他实例的连接
     * 解绑该实例全部指令和监听器
     * 触发beforeDestroy和destroyed钩子函数 
     */ 
    Vue.prototype.$destroy = function(){

    }
}

// 钩子函数执行
export function callHook(vm,hook){
    const handler = vm.$options[hook];
    
}