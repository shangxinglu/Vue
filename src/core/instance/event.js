
// 初始化事件
export function initEvents(vm){
    vm._event = Object.create(null);
    vm._hasHookEvent = false;

}


export function eventsMixin(Vue) {
    
    /**
     * @description 添加自定义事件
     * 
     * @param {String|Array} e 事件名|事件名数组
     * @param {Function} fn 事件监听器
     */
     Vue.prototype.$on = function (e,fn) {
        if(Array.isArray(e)){
            for(let eventName of e){
                this.$on(eventName,fn);
            }
            return;
        }

        (this._event[e]||(this._event[e] = [])).push(fn);
        
        return this;
    }

    /**
     * @description 移除事件监听器
     *      
     * @param {String|Array} e 需要移除的事件名|事件名数组
     * @param {Function} [fn] 移除的事件监听器
     */
    Vue.prototype.$off = function (e,fn) {
        // 参数为清空所有事件
        if(arguments.length===0){
            this._event = Object.create(null);
            return;
        }


        if(Array.isArray(e)){
            for(let eventName of e){
                this.$off(eventName,fn);
            }
            return;
        }

        // 移除指定事件的所有监听器
        if(arguments.length===1){
            this._event[e] = null;
            return;
        }

        // 移除某个监听器
        for(let i= this._event[e].length,event = this._event[e];i>=0;i--){
            let item = event[i];
            if(item===fn|| item.fn===fn){
                event.splice(i,1);
                break;
            }
        }

        return this;
       
    }

    
     /**
     * @description 添加单次的自定义事件
     * 
     * @param {String|Array} e 事件名|事件名数组
     * @param {Function} fn 事件监听器
     */
    Vue.prototype.$once = function (e,fn) {
        const vm = this;

        // 对fn函数进行装饰
        // 添加移除功能
       function deFn(){
            fn.apply(vm,arguments);
            vm.$off(e,deFn);
        }

        deFn.fn = fn; // 为了移除监听器

        vm.$on(e,deFn);

        return vm;
    }

    /**
     * @description 触发当前的事件
     * 
     * @param {String} eventName 触发的事件名
     * @param {Array} arg 传递给监听器的参数 以数组形式传递
     */
    Vue.prototype.$emit = function (eventName,[...arg]) {
        const handler = this._event[eventName]||[];

        for(let item of handler){
            item.apply(this,arg);
        }

        return this;

    }



}