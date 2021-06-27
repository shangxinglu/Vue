
import { initLifecycle,callHook } from "./lifecycle"
import {initEvents} from './event';
import {initRender} from './render';

export function initMixin(Vue){

    // 初始化Vue
    Vue.prototype._init = function(options){
        const vm = this;

        vm.$options = options;
        
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm,'beforeCreate');
    }
}