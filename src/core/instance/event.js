
export function  eventsMixin(Vue) {
    this._event = Object.create(null);
    
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
        const index = this._event[e].indexOf(fn);
        this._event[e].splice(index,1);
    }

    
    Vue.prototype.$once = function (params) {
        
    }

    Vue.prototype.$emit = function (params) {
        
    }



}