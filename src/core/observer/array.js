'use strict';

import {def} from '../util/index';
import {OB_KEY} from '../shared/constant';

/**
 * 用来覆盖可响应数组实例上的[[prototype]]
 * 实现对数组变化的监听
 */
const originPro = Array.prototype;

export const arrayMethod = Object.create(originPro);

const methodArr = [
    'shift',
    'unshift',
    'pop',
    'push',
    'splice',
    'sort',
    'reverse',
];



for (let item of methodArr) {
    const originMethod = originPro[item];
    
    def(arrayMethod,item,function mutator(...args) {
        console.log('arrayMethod mutator');
       
      const result =  originMethod.apply(this,args);

      // 将新增元素转成响应试数据
      let insert = null;
      switch(item){
          case 'unshift':
              case 'push':
                insert = args;

                break;
            
            case 'splice':
            insert = args.slice(2);
            break;
      }
      const ob = this[OB_KEY];
      if(insert?.length){
        ob.observerArray(insert);
      }

      ob.dep.notice();


      return result;
    })
}
