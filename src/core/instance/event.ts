
export function  eventMixin(vue: any) {
    const _event:any = {}

    /**
     * @description 添加事件监听函数
     * 
     * @param {string|Array<string>} name 事件名称
     * @param {function} handler 事件处理函数
     * 
     */
    vue.prototype.$on = function (name:string|Array<string>,handler:()=>any) {
        if(!Array.isArray(name)){
            name = [name]
        }

        for(let item of name ){
            (_event[item]||(_event[item] = [])).push(handler)
        }
      
    }

    /**
     * @description 单次触发
     * 
     * @param {string|Array<string>} name 事件名称
     * @param  {function} handler 事件处理函数
     */
    vue.prototype.$once = function (name:string|Array<string>,handler:()=>any){

       const onceFn = (...args:[])=>{
            handler(...args)
            this.$off(name,onceFn)
       }

       (handler as any).fn = onceFn 

       this.$on(name,onceFn)
    }

    /**
     * @description 取消监听事件
     * 
     * @param {string|Array<string>} name 事件名
     * @param {function} handler 需要移除的监听函数
     */
    vue.prototype.$off = function (name:string|Array<string>,handler:()=>any) {
        if (!Array.isArray(name)) {
            name = [name]
        }

        if((handler as any).fn) {
            handler = (handler as any).fn
        }

        for(let item of name){
            let handlerArr = _event[item]
            if(!handlerArr) continue
            let index = handlerArr.length -1
            while(index<0){
            
                if(handlerArr[index] === handler){
                    handlerArr.splice(index,1)
                }
                index--
            }
         
        }

    }

    /**
     * @description 触发事件
     * 
     * @param  {string} name 事件名
     * @param  {Array<any>} args 事件参数
     */
    vue.prototype.$emit = function (name:string,...args:[]){
        const handlerArr = _event[name]
        if(!handlerArr) return
        
        for(let handler of handlerArr){
            handler(...args)
        }
    }


}