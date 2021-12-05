import {Dep} from './dep'
import {arrayMethods} from './array'
import {def} from 'src/core/utils/index'

export function defineReactive(obj:object,key:string|symbol,val?:any) {
  const dep = new Dep
  const argLen = arguments.length
  if(argLen === 2){
    val = (obj as any)[key]
  }
  Object.defineProperty(obj,key,{
    get() {
      const childObj = observer(val)
      if(Dep.target) {
        dep.depend()
        if(childObj){
          // 触发observer对象中的dep收集
          childObj.dep.depend()
          if(Array.isArray(val)){
            dependArray(val)
          }
        }
      }
      console.log('getter',dep);
      return val;
    },
    set(newVal) {
      console.log('setter');
      if(newVal === val) return;
      val = newVal;
      // 目标发生变化，通知订阅者  
      this.dep.notify()
    }
  })
}

// 将数组的方法挂载到数组对象原型上
function protoAugment(target:any,source:object) {
  target.__proto__ = source
}

function dependArray(data:any[]){
  for(let item of data) {
    item?.__ob__?.dep?.depend?.()
    if(Array.isArray(item)){
      dependArray(item)
    }
  }
}

// 将对象所有成员转成响应式
export class Observer {
  dep:Dep

  constructor(data:object) {
    this.dep = new Dep
    def(data,'__ob__',this)

    if(Array.isArray(data)) {
      protoAugment(data,arrayMethods)
      this.observerArray(data)
    } else if(typeof data === 'object') {
      this.walk(data)
    }
  }

  walk(data:any) {
    const keys = Reflect.ownKeys(data)
    for(let key of keys){
      defineReactive(data,key)
    }
  }

  observerArray(data:Array<any>) {
   for(let item of data) {
     observer(item)
   }
  }

}

export function observer(obj:any){
  if(typeof obj !== 'object' || obj === null) return;
  let ob;
  if(obj.__ob__){
    ob = obj.__ob__
  } else {
    ob = new Observer(obj)
  }

  return ob
}

