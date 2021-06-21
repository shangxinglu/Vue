
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

    Vue.prototype.$off = function (params) {
        
    }

    Vue.prototype.$once = function (params) {
        
    }

    Vue.prototype.$emit = function (params) {
        
    }



}