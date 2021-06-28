
import { isPromise } from "../shared/util";

// 处理错误
export function handlerError(err,vm,info){

}

/**
 * @description 处理调用时发生的错误
 * 
 * @param {Function} handler 调用函数
 * @param {Object} context 函数调用的上下文
 * @param {Array} args 参数
 * @param {Object} vm 组价上下文
 * @param {String} info 调用错误时的信息
 */
export function invokeWithErrorHandling(handler,context,args,vm,info){
    try{
        const res = args? handler.apply(context,args):handler.call(context);

        if(isPromise(res)){
            res.catch(e=>logError(e,vm,info))
        }
        
    } catch(e){
        logError(e,vm,info);
    }
}

// 打印错误
function logError(err,vm,info){
    console.error(err,vm,info);
}